// DUE SENDS (Instantly, 26 Oct; safe retries 26 Oct later). Instantly's reply endpoint has no scheduled send, so a
// reply written by the agent is stored in its log row (status "scheduled", send_at, pending_send) and sent from here,
// on the first live run after send_at (3 to 7 minutes after it was written). Follow-ups that Instantly did not accept
// in the follow-ups workflow are queued the same way (kind "followup") so they are retried here, minutes apart.
//
// pending_send is JSON: { request, tries, first_try_at, kind, block_after, on_success } (older rows hold only the
// request itself, which counts as tries 0, kind "reply").
//
// Never twice:
// - "Claim Send" moves the row from "scheduled" to "sending" only if it is still "scheduled" (one database update with
//   both conditions), and only the run that made that change goes on.
// - "Check Thread" then reads the Instantly thread and "Ready To Send" (ins_ready_to_send.js) sends only if our text is
//   not already there (and, on a retry, no email from us arrived in the thread since the first try).
// - A failed try goes back to "scheduled" a few minutes later (Settings in the Platform node: SEND_TRIES, RETRY_MINUTES).
//   Only after the last try fails is the row marked send_failed and Farhan told on Slack, once.
// - A row left in "sending" for over 10 minutes (the run stopped between claim and result) counts as one failed try:
//   it goes back to "scheduled" right away, and the next run checks the thread before sending again.
// 28 Oct: every "update" item carries the full row update for "Requeue Or Fail" (status, send_at, pending_send, note,
// handled_at, followups, history) and, when Farhan must be told, the Slack text in alert ("Stuck Failed?" posts it).
// A queued FOLLOW-UP that runs out of tries is not left as send_failed (that would stop all later follow-ups): it is
// counted as follow-up N (followed_up, with the draft in the history), and Farhan is asked to send it by hand.
// Test runs never send.
const cfg = $('Settings').first().json;
if (cfg.TEST || !cfg.SEND_FOR_REAL) return [];
let P = {};
try { P = $('Platform').first().json || {}; } catch (e) { P = {}; }
const MAX = Math.max(1, Number(P.SEND_TRIES) || 3);
const IGNORE = new Set((Array.isArray(P.IGNORE_MAILBOXES) ? P.IGNORE_MAILBOXES : ['mavixmarketing@gmail.com', 'hello@mavixmarketing.com', 'team@mavixmarketing.com', 'farhan@mavixmarketing.com']).map(x => String(x).toLowerCase().trim()));
const now = Date.now();
const iso = t => new Date(t).toISOString();
function readPending(raw) {
  let o = null;
  try { o = JSON.parse(String(raw || '')); } catch (e) { o = null; }
  if (!o || typeof o !== 'object') return null;
  if (o.request && typeof o.request === 'object') return { tries: 0, kind: 'reply', ...o };
  if (o.eaccount || o.reply_to_uuid || o.body) return { request: o, tries: 0, kind: 'reply' }; // older rows
  return null;
}
const out = [];
const rows = $('Read Log').all().map(r => r.json || {}).filter(j => String(j.platform || '') === 'instantly' && j.event_id && !String(j.event_id).startsWith('test:'));
rows.sort((a, b) => (Date.parse(a.send_at || '') || 0) - (Date.parse(b.send_at || '') || 0));
for (const j of rows) {
  const id = String(j.event_id);
  const status = String(j.status || '');
  const keep = { event_id: id, email: j.email, our_reply: j.our_reply || '', note: j.note || '', thread_id: String(j.message_id || '') };
  const row = { handled_at: j.handled_at || null, followups: j.followups === undefined ? null : j.followups, history: j.history === undefined ? null : j.history, updatedAt: j.updatedAt || null, createdAt: j.createdAt || null };
  const upd = (from, to, extra) => ({ json: { ...keep, action: 'update', from_status: from, new_status: to, send_at: j.send_at || null, pending_send: String(j.pending_send || ''), new_note: keep.note, handled_at: row.handled_at, followups: row.followups, history: row.history, alert: '', ...extra } });
  if (status === 'scheduled') {
    const at = Date.parse(j.send_at || '');
    if (isFinite(at) && at > now) continue;
    const pend = readPending(j.pending_send);
    const req = pend && pend.request;
    if (!req || !req.eaccount || !req.reply_to_uuid || !req.body || !j.message_id) {
      out.push(upd('scheduled', 'send_failed', { new_note: (keep.note ? keep.note + ' · ' : '') + 'NOT SENT: the stored reply could not be read',
        alert: '(Instantly) Reply not sent, the stored reply could not be read. Please send it by hand from Instantly: ' + j.email + '\n\nDraft: ' + (keep.our_reply || '(none)') }));
      continue;
    }
    if (IGNORE.has(String(req.eaccount).toLowerCase().trim())) { // never send from Farhan's own inboxes
      out.push(upd('scheduled', pend.kind === 'followup' ? String(pend.restore_status || 'followed_up') : 'skipped: own inbox', { pending_send: '' }));
      continue;
    }
    out.push({ json: { ...keep, action: 'send', pending: pend, request: req, row } });
  } else if (status === 'sending') {
    const up = Date.parse(j.updatedAt || j.handled_at || '');
    if (!isFinite(up) || now - up <= 10 * 60000) continue;
    const pend = readPending(j.pending_send) || { tries: 0, kind: 'reply' };
    const tries = Number(pend.tries || 0) + 1; // the try that stopped half way counts
    const next = { ...pend, tries, first_try_at: pend.first_try_at || iso(up), last_error: 'the run stopped while sending' };
    if (tries < MAX) { out.push(upd('sending', 'scheduled', { send_at: iso(now), pending_send: JSON.stringify(next) })); continue; } // the next run reads the thread first
    const fu = pend.kind === 'followup';
    const os = pend.on_success || {};
    const text = String(((pend.request || {}).body || {}).text || keep.our_reply || '');
    const why = 'NOT SENT after ' + tries + ' tries (the run stopped while sending; it may or may not have gone, please check the thread in Instantly)';
    if (fu) out.push(upd('sending', 'followed_up', { pending_send: JSON.stringify(next), handled_at: iso(now), followups: os.followups !== undefined ? os.followups : row.followups, history: os.history !== undefined ? os.history : row.history,
      new_note: (keep.note ? keep.note + ' · ' : '') + 'follow-up ' + why,
      alert: '(Instantly) Follow-up could not be sent, please check the thread and send it by hand from Instantly if it is not there: ' + j.email + '\n\nFollow-up: ' + text }));
    else out.push(upd('sending', 'send_failed', { pending_send: JSON.stringify(next), new_note: (keep.note ? keep.note + ' · ' : '') + why,
      alert: '(Instantly) Reply not sent, please check: ' + j.email + ' · the run stopped while sending; it may or may not have gone, please check the thread in Instantly and send it by hand if it is not there.\n\nDraft: ' + text }));
  }
}
return out;

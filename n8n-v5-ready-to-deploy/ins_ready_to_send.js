// READY TO SEND (Instantly, 26 Oct): the last look before a reply or follow-up goes out. Input: the Instantly thread
// of each claimed row ("Check Thread", GET /api/v2/emails?search=thread:<id>), in the same order as "Claim Send".
// For each one it decides:
// - "skip": the thread is not an Instantly campaign thread (no email in it has a campaign_id), or it would go from one
//   of Farhan's own inboxes (IGNORE_MAILBOXES): nothing is sent, the row is closed quietly.
// - "done": our text is already in the thread (or, on a retry, an email from us arrived in the thread after the first
//   try and it is not one of our other logged replies): it went out before, so it is marked sent and NOT sent again.
// - "fail": the thread could not be read. Nothing is sent this time; it counts as a failed try (see below).
// - "send": none of the above; "Send Reply" sends it.
// A failed try goes back to "scheduled" RETRY_MINUTES later; after SEND_TRIES tries the row is send_failed and Farhan
// gets one Slack message. Every output item carries the exact row update ("Log Send Result") and, when needed, the
// Slack text (alert) and the block-list address (block_email). "Send Result" (ins_send_result.js) does the same
// after a real send.
let P = {};
try { P = $('Platform').first().json || {}; } catch (e) { P = {}; }
const MAX = Math.max(1, Number(P.SEND_TRIES) || 3);
const GAPS = Array.isArray(P.RETRY_MINUTES) && P.RETRY_MINUTES.length ? P.RETRY_MINUTES.map(Number) : [3, 5];
const IGNORE = new Set((Array.isArray(P.IGNORE_MAILBOXES) ? P.IGNORE_MAILBOXES : ['mavixmarketing@gmail.com', 'hello@mavixmarketing.com', 'team@mavixmarketing.com', 'farhan@mavixmarketing.com']).map(x => String(x).toLowerCase().trim()));
const s = v => (v === null || v === undefined) ? '' : String(v);
const now = Date.now();
const iso = t => new Date(t).toISOString();
const norm = x => s(x).replace(/<(script|style|head|title)[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&#39;|&rsquo;|&lsquo;|&apos;/gi, "'").replace(/&[a-z#0-9]+;/gi, ' ').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const bodyOf = m => { const b = m.body || {}; return s(b.text) + ' ' + s(b.html) + ' ' + s(m.content_preview); };
const OUR_DOMAIN = /^(mavix|maavix|mavex|mavvix|maviks|mavixx)[a-z0-9-]*\./i;
const when = m => { const t = Date.parse(m.timestamp_email || m.timestamp_created || ''); return isFinite(t) ? t : 0; };
// the end of a try, shared with ins_send_result.js (keep the two the same)
function success(d, how) {
  const pend = d.pending || {};
  const fu = pend.kind === 'followup';
  const os = pend.on_success || {};
  const out = { event_id: d.event_id, email: d.email, outcome: how, status: fu ? 'followed_up' : 'replied', handled_at: iso(now), send_at: d.send_at || null,
    followups: fu && os.followups !== undefined ? os.followups : d.row.followups, history: fu && os.history !== undefined ? os.history : d.row.history,
    note: d.note, pending_send: JSON.stringify({ sent: true, sent_at: iso(now), tries: Number(pend.tries || 0) + (how === 'sent' ? 1 : 0), kind: pend.kind || 'reply', block_after: !!pend.block_after, how }), alert: '', block_email: '' };
  if (how === 'already_in_thread') out.note = (d.note ? d.note + ' · ' : '') + 'found already sent in Instantly, not sent again';
  if (!fu && pend.block_after) out.block_email = s(d.email).toLowerCase(); // a second no: our goodbye has gone, now the block list
  return out;
}
function failure(d, why) {
  const pend = d.pending || {};
  const tries = Number(pend.tries || 0) + 1;
  const next = { ...pend, tries, first_try_at: pend.first_try_at || d.first_try_at || iso(now), last_error: s(why).slice(0, 300) };
  const text = s(((d.request || {}).body || {}).text) || s(d.our_reply);
  if (tries >= MAX) {
    return { event_id: d.event_id, email: d.email, outcome: 'gave_up', status: 'send_failed', handled_at: d.row.handled_at || null, send_at: d.send_at || null, followups: d.row.followups, history: d.row.history,
      note: (d.note ? d.note + ' · ' : '') + 'NOT SENT after ' + tries + ' tries: ' + s(why).slice(0, 200), pending_send: JSON.stringify(next),
      alert: '(Instantly) Could not send after ' + tries + ' tries, please send it by hand from Instantly: ' + d.email + ' · ' + s(why).slice(0, 200) + '\n\n' + (pend.kind === 'followup' ? 'Follow-up' : 'Reply') + ', not sent: ' + text, block_email: '' };
  }
  const gap = GAPS[Math.min(tries - 1, GAPS.length - 1)] || 3;
  return { event_id: d.event_id, email: d.email, outcome: 'retry', status: 'scheduled', handled_at: d.row.handled_at || null, send_at: iso(now + gap * 60000), followups: d.row.followups, history: d.row.history,
    note: d.note, pending_send: JSON.stringify(next), alert: '', block_email: '' };
}
const due = {};
for (const it of $('Due Sends').all()) if (it.json.action === 'send') due[s(it.json.event_id)] = it.json;
const claims = $('Claim Send').all();
// our other logged replies in each thread, so an earlier reply of ours is never taken for this one
const otherKeys = {};
try { for (const r of $('Read Log').all()) { const j = r.json || {}; if (String(j.platform || '') === 'instantly' && j.message_id && j.our_reply) (otherKeys[s(j.message_id)] = otherKeys[s(j.message_id)] || []).push({ id: s(j.event_id), key: norm(j.our_reply).slice(0, 80) }); } } catch (e) { /* none */ }
const out = [];
$input.all().forEach((it, i) => {
  const claim = claims[i] ? claims[i].json : {};
  const d0 = due[s(claim.event_id)];
  if (!d0) return;
  const pend = d0.pending || { tries: 0, kind: 'reply' };
  const d = { ...d0, pending: pend, send_at: claim.send_at || null, first_try_at: pend.first_try_at || iso(now) };
  const tries = Number(pend.tries || 0);
  const res = it.json || {};
  if (res.error || !Array.isArray(res.items)) { out.push({ json: { ...failure(d, 'could not read the Instantly thread before sending (' + s((res.error || {}).message || 'no answer').slice(0, 120) + ')'), decision: 'fail' } }); return; }
  const thread = res.items.filter(m => m && m.id && Number(m.ue_type) !== 4);
  const eaccount = s((d.request || {}).eaccount).toLowerCase().trim();
  if (!thread.some(m => s(m.campaign_id)) || IGNORE.has(eaccount)) {
    out.push({ json: { event_id: d.event_id, email: d.email, outcome: 'skipped', status: 'skipped: not an instantly campaign', handled_at: d.row.handled_at || null, send_at: d.send_at, followups: d.row.followups, history: d.row.history, note: d.note, pending_send: '', alert: '', block_email: '', decision: 'skip' } });
    return;
  }
  const isOurs = m => Number(m.ue_type) !== 2 || s(m.from_address_email).toLowerCase() === eaccount || OUR_DOMAIN.test(s(m.from_address_email).toLowerCase().split('@')[1] || '');
  const ours = thread.filter(isOurs);
  const key = norm(s(((d.request || {}).body || {}).text) || ((d.request || {}).body || {}).html || d.our_reply).slice(0, 80);
  let found = key.length >= 20 && ours.some(m => norm(bodyOf(m)).includes(key));
  if (!found && tries > 0) {
    const since = Date.parse(d.first_try_at) - 60000;
    const others = (otherKeys[s(d.thread_id)] || []).filter(o => o.id !== d.event_id && o.key.length >= 20).map(o => o.key);
    found = ours.some(m => Number(m.ue_type) === 3 && when(m) >= since && !others.some(k => norm(bodyOf(m)).includes(k)));
  }
  if (found) { out.push({ json: { ...success(d, 'already_in_thread'), decision: 'done' } }); return; }
  out.push({ json: { event_id: d.event_id, decision: 'send', request: d.request, ready: { ...d, pending: { ...pend, first_try_at: d.first_try_at } } } });
});
return out;

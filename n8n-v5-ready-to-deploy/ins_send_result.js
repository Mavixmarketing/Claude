// SEND RESULT (Instantly, 26 Oct; finished 28 Oct): what happened to each reply or follow-up that "Ready To Send" let
// through. Two inputs (n8n runs this node once for each): the items "Ready To Send" did NOT send ("Go?" false: skip,
// done, guard, fail; already worked out there, passed through unchanged), and the answers of "Send Reply" for the ones
// it sent (same order as the "send" items of "Ready To Send"). An answer with an error is a failed try: back to
// "scheduled" RETRY_MINUTES later, or, after the last try, send_failed with one Slack message (alert) holding the
// draft (a follow-up is then counted as done instead, so later follow-ups still come). An answer without an error is
// sent: status "replied" (or "followed_up" for a queued follow-up). For a second-no goodbye (block_after),
// block_email is set so "Block After Goodbye" adds them to Instantly's block list now that the goodbye has gone.
// The output items are the exact row updates for "Log Send Result" plus alert and block_email.
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
// ---- the end of a try, shared with ins_send_result.js (keep the two the same) ----
const EMAIL_OK = e => /^[^@\s<>",;]+@[^@\s<>",;]+\.[a-z]{2,}$/i.test(s(e).trim()); // a full address, never a domain
const base = (d, extra) => ({ event_id: d.event_id, email: d.email, send_at: d.send_at || null, handled_at: d.row.handled_at || null, followups: d.row.followups, history: d.row.history, note: d.note, our_reply: s(d.our_reply), alert: '', block_email: '', ...extra });
function success(d, how) {
  const pend = d.pending || {};
  const fu = pend.kind === 'followup';
  const os = pend.on_success || {};
  const out = base(d, { outcome: how, status: fu ? 'followed_up' : 'replied', handled_at: iso(now),
    followups: fu && os.followups !== undefined ? os.followups : d.row.followups, history: fu && os.history !== undefined ? os.history : d.row.history,
    pending_send: JSON.stringify({ sent: true, sent_at: iso(now), tries: Number(pend.tries || 0) + (how === 'sent' ? 1 : 0), kind: pend.kind || 'reply', block_after: !!pend.block_after, how }) });
  if (how === 'already_in_thread') out.note = (d.note ? d.note + ' · ' : '') + 'found already sent in Instantly, not sent again';
  if (!fu && pend.block_after && EMAIL_OK(d.email)) out.block_email = s(d.email).trim().toLowerCase(); // a second no: our goodbye has gone, now the block list
  return out;
}
function failure(d, why) {
  const pend = d.pending || {};
  const fu = pend.kind === 'followup';
  const os = pend.on_success || {};
  const tries = Number(pend.tries || 0) + 1;
  const next = { ...pend, tries, first_try_at: pend.first_try_at || d.first_try_at || iso(now), last_error: s(why).slice(0, 300) };
  const text = s(((d.request || {}).body || {}).text) || s(d.our_reply);
  if (tries < MAX) {
    const gap = GAPS[Math.min(tries - 1, GAPS.length - 1)] || 3;
    return base(d, { outcome: 'retry', status: 'scheduled', send_at: iso(now + gap * 60000), pending_send: JSON.stringify(next) });
  }
  if (fu) { // count follow-up N as done (with the draft in the history), so the next follow-ups still come and a hand-sent copy is recognised
    return base(d, { outcome: 'gave_up', status: 'followed_up', handled_at: iso(now), followups: os.followups !== undefined ? os.followups : d.row.followups, history: os.history !== undefined ? os.history : d.row.history,
      note: (d.note ? d.note + ' · ' : '') + 'follow-up NOT SENT after ' + tries + ' tries: ' + s(why).slice(0, 200), pending_send: JSON.stringify(next),
      alert: '(Instantly) Follow-up could not be sent after ' + tries + ' tries, please send it by hand from Instantly: ' + d.email + ' · ' + s(why).slice(0, 200) + '\n\nFollow-up, not sent: ' + text });
  }
  return base(d, { outcome: 'gave_up', status: 'send_failed', note: (d.note ? d.note + ' · ' : '') + 'NOT SENT after ' + tries + ' tries: ' + s(why).slice(0, 200), pending_send: JSON.stringify(next),
    alert: '(Instantly) Could not send after ' + tries + ' tries, please send it by hand from Instantly: ' + d.email + ' · ' + s(why).slice(0, 200) + '\n\nReply, not sent: ' + text });
}
function skipped(d, status, note, extra) {
  const pend = d.pending || {};
  if (pend.kind === 'followup') return base(d, { outcome: 'skipped', status: s(pend.restore_status) || 'followed_up', note: (d.note ? d.note + ' · ' : '') + 'follow-up not sent: ' + note, pending_send: '' });
  return base(d, { outcome: 'skipped', status, note: (d.note ? d.note + ' · ' : '') + note, pending_send: '', ...(extra || {}) });
}
// ---- end of the shared part ----
const sent = $('Ready To Send').all().filter(x => x.json.decision === 'send');
return $input.all().map((it, i) => {
  const j = it.json || {};
  if (j.decision && j.decision !== 'send' && !j.error) return { json: j }; // not sent: already decided in Ready To Send
  const r = sent[i] ? sent[i].json.ready : null;
  if (!r) return { json: { event_id: '', outcome: 'unknown', alert: '', block_email: '' } };
  if (j.error) {
    const e = j.error;
    const why = 'Instantly did not accept it (' + s(e.message || e.description || (typeof e === 'string' ? e : JSON.stringify(e))).slice(0, 160) + ')';
    return { json: { ...failure(r, why), decision: 'sent_failed' } };
  }
  return { json: { ...success(r, 'sent'), decision: 'sent', instantly_email_id: s(j.id) } };
});

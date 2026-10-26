// DUE SENDS (Instantly, 26 Oct). Instantly's reply endpoint has no scheduled send, so a reply written by the agent is
// stored in its log row (status "scheduled", send_at, pending_send = the exact reply request) and sent here, on the
// first live run after send_at (3 to 7 minutes after it was written, at most a minute later than SalesBlink would).
// Never twice: "Claim Send" moves the row from "scheduled" to "sending" only if it is still "scheduled" (one
// database update with both conditions), and only the run that made that change sends it.
// A row left in "sending" for over 10 minutes (the run stopped between claim and send) is NOT sent again: it is
// marked send_failed and Farhan is asked on Slack to check the thread in Instantly (it may or may not have gone).
// Test runs never send.
const cfg = $('Settings').first().json;
if (cfg.TEST || !cfg.SEND_FOR_REAL) return [];
const now = Date.now();
const out = [];
for (const r of $('Read Log').all()) {
  const j = r.json || {};
  const id = String(j.event_id || '');
  if (String(j.platform || '') !== 'instantly' || !id || id.startsWith('test:')) continue;
  const status = String(j.status || '');
  if (status === 'scheduled') {
    const at = Date.parse(j.send_at || '');
    if (isFinite(at) && at > now) continue;
    let request = null;
    try { request = JSON.parse(String(j.pending_send || '')); } catch (e) { request = null; }
    if (!request || !request.eaccount || !request.reply_to_uuid || !request.body) {
      out.push({ json: { action: 'problem', event_id: id, email: j.email, our_reply: j.our_reply || '', why: 'the stored reply could not be read, so nothing was sent' } });
      continue;
    }
    out.push({ json: { action: 'send', event_id: id, email: j.email, our_reply: j.our_reply || '', request } });
  } else if (status === 'sending') {
    const up = Date.parse(j.updatedAt || j.handled_at || '');
    if (isFinite(up) && now - up > 10 * 60000) out.push({ json: { action: 'problem', event_id: id, email: j.email, our_reply: j.our_reply || '', why: 'the run stopped while sending; it may or may not have gone, please check the thread in Instantly' } });
  }
}
return out;

// PICK THE THREAD: the SalesBlink inbox record for this prospect's message.
// SalesBlink lists only conversations where the prospect wrote last. If the
// record is missing it is either not saved yet (retry) or the conversation was
// answered or deleted in SalesBlink: after an hour it is logged not_in_inbox.
// 28 Oct: items the cross-platform guard (Pick New Replies) logged as answered_already are skipped, like gave_up.
const claims = $('Pick New Replies').all(); // same order as the claims and the searches
const now = Date.now();
const out = [];
$input.all().forEach((it, i) => {
  const claim = claims[i] ? claims[i].json : {};
  if (claim.status && claim.status !== 'working') return; // gave_up, or answered_already from the cross-platform guard (28 Oct)
  const list = ((it.json.data || {}).result) || [];
  const rec = list.find(m => String(m.email || '').toLowerCase() === String(claim.email || '').toLowerCase() && !m.self && !m.log) || null;
  if (rec && rec.messageId) out.push({ json: { event_id: claim.event_id, email: claim.email, messageId: rec.messageId } });
  else if (now - Number(claim.msg_time || now) > 60 * 60000) out.push({ json: { event_id: claim.event_id, email: claim.email, status: 'not_in_inbox' } });
});
return out;

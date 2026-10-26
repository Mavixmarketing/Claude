// PICK THREAD (Instantly, 26 Oct): the Instantly thread of each claimed reply. Every claim comes from a received
// email in "Read Received" (event_id "inst:<email id>"), and that email carries its thread_id. The claims are in
// the same order as "Pick New Replies" (gave-up items go last and take the other branch), like the SalesBlink agent.
// A claim whose email is no longer in the list (older than the lookback, or more than 100 newer replies) is
// logged not_in_inbox after an hour, like SalesBlink.
const byId = {};
for (const it of $('Read Received').all()) for (const m of (Array.isArray(it.json.items) ? it.json.items : [])) if (m && m.id) byId[String(m.id)] = m;
const claims = $('Pick New Replies').all();
const now = Date.now();
const out = [];
$input.all().forEach((it, i) => {
  const claim = claims[i] ? claims[i].json : {};
  if (claim.status === 'gave_up') return;
  const id = String(claim.event_id || '').replace(/^test:/, '').replace(/^inst:/, '');
  const m = byId[id];
  if (m && m.thread_id) out.push({ json: { event_id: claim.event_id, email: claim.email, messageId: String(m.thread_id), email_uuid: String(m.id), campaign_name: String(claim.note || '') } });
  else if (now - Number(claim.msg_time || now) > 60 * 60000) out.push({ json: { event_id: claim.event_id, email: claim.email, status: 'not_in_inbox' } });
});
return out;

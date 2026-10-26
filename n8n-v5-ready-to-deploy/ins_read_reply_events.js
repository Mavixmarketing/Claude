// READ REPLY EVENTS (Instantly adapter, 26 Oct). Turns Instantly's received emails ("Read Received",
// GET /api/v2/emails?email_type=received) into the list the shared Pick New Replies code (ra_pick_new_replies.js)
// already reads from SalesBlink: one entry per received email { id, email, time, sequence, sequence_name }.
// id is "inst:<Instantly email id>", so the log's event_id is "inst:<id>" (test runs: "test:inst:<id>").
// time is when Instantly stored the email (timestamp_created), like the arrival time SalesBlink gives.
// Skipped here: emails sent from one of our own mailboxes (the account list, any mailbox on the same domain as one
// of ours, or a mavix-style domain), so warm-up mail or our own test mail between mailboxes is never answered.
// Auto-replies are NOT skipped here: like the SalesBlink agent, the sorter (Luna) marks them "automated", which
// keeps the morning report counts the same (and a message about a meeting time still gets an answer).
const s = v => (v === null || v === undefined) ? '' : String(v);
const boxes = new Set();
const boxDomains = new Set();
try {
  for (const it of $('Read Accounts').all()) for (const a of (it.json.items || [])) {
    const e = s(a && a.email).toLowerCase();
    if (e) { boxes.add(e); boxDomains.add(e.split('@')[1]); }
  }
} catch (e) { /* account list not available: the domain rule still applies */ }
const OUR_DOMAIN = /^(mavix|maavix|mavex|mavvix|maviks|mavixx)[a-z0-9-]*\./i;
const isOurs = addr => { const a = s(addr).toLowerCase(); const d = a.split('@')[1] || ''; return !!a && (boxes.has(a) || boxDomains.has(d) || OUR_DOMAIN.test(d)); };
const camp = {};
try { for (const it of $('Read Campaigns').all()) for (const c of (it.json.items || [])) if (c && c.id) camp[String(c.id)] = s(c.name); } catch (e) { /* no names */ }
const data = [];
const seen = new Set();
for (const it of $('Read Received').all()) {
  for (const m of (Array.isArray(it.json.items) ? it.json.items : [])) {
    if (!m || !m.id || seen.has(m.id)) continue;
    seen.add(m.id);
    if (m.ue_type !== undefined && m.ue_type !== null && Number(m.ue_type) !== 2) continue; // received only
    const from = s(m.from_address_email).toLowerCase();
    const email = s(m.lead || from).toLowerCase().trim();
    if (!email || isOurs(from) || isOurs(email)) continue;
    const time = Date.parse(m.timestamp_created || m.timestamp_email || '');
    if (!isFinite(time)) continue;
    data.push({ id: 'inst:' + m.id, email, time, sequence: s(m.campaign_id), sequence_name: camp[s(m.campaign_id)] || '', thread_id: s(m.thread_id) });
  }
}
return [{ json: { data } }];

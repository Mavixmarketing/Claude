// READ REPLY EVENTS (Instantly adapter, 26 Oct). Turns Instantly's received emails ("Read Received",
// GET /api/v2/emails?email_type=received) into the list the shared Pick New Replies code (ra_pick_new_replies.js)
// already reads from SalesBlink: one entry per received email { id, email, time, sequence, sequence_name }.
// id is "inst:<Instantly email id>", so the log's event_id is "inst:<id>" (test runs: "test:inst:<id>").
// time is when Instantly stored the email (timestamp_created), like the arrival time SalesBlink gives.
// Skipped here: emails sent from one of our own mailboxes (the account list, any mailbox on the same domain as one
// of ours, or a mavix-style domain), so warm-up mail or our own test mail between mailboxes is never answered.
// Auto-replies are NOT skipped here: like the SalesBlink agent, the sorter (Luna) marks them "automated", which
// keeps the morning report counts the same (and a message about a meeting time still gets an answer).
// 26 Oct, later: ONLY REPLIES TO AN INSTANTLY CAMPAIGN. Instantly is also connected to mailboxes that are not cold-email
// senders (Farhan's personal inbox) and to mailboxes SalesBlink also sends from. So an email is kept only if
// 1. it was not received by one of the IGNORE_MAILBOXES (Platform node, ins_platform.js), and
// 2. Instantly linked it to a campaign (campaign_id), or it is in a thread the log already knows as an Instantly
//    campaign thread (a later reply where Instantly left campaign_id empty).
// Everything else (receipts, Google mail, newsletters, old SalesBlink conversations in shared mailboxes) is dropped
// here, before any log row or AI call. An old SalesBlink conversation that is also an Instantly lead is handled here
// only when the email carries an Instantly campaign_id.
const s = v => (v === null || v === undefined) ? '' : String(v);
let IGNORE = ['mavixmarketing@gmail.com', 'hello@mavixmarketing.com', 'team@mavixmarketing.com', 'farhan@mavixmarketing.com'];
try { const l = $('Platform').first().json.IGNORE_MAILBOXES; if (Array.isArray(l)) IGNORE = l.map(x => s(x).toLowerCase().trim()).filter(Boolean); } catch (e) { /* default list */ }
const ignored = new Set(IGNORE);
const addrs = v => (Array.isArray(v) ? v : s(v).split(/[,;\s]+/)).map(x => s(x).toLowerCase().replace(/^.*</, '').replace(/>.*$/, '').trim()).filter(Boolean);
const toIgnored = m => ignored.has(s(m.eaccount).toLowerCase().trim()) || addrs(m.to_address_email_list).some(a => ignored.has(a));
// threads the log already knows as Instantly campaign threads
const campaignThreads = new Set();
try {
  for (const r of $('Read Log').all()) {
    const j = r.json || {};
    if (String(j.platform || '') !== 'instantly' || !j.message_id) continue;
    if (s(j.campaign_name) || ['replied', 'followed_up', 'scheduled', 'sending'].includes(s(j.status))) campaignThreads.add(s(j.message_id));
  }
} catch (e) { /* no log: campaign_id only */ }
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
    if (toIgnored(m)) continue; // Farhan's own inboxes: never read further
    if (!s(m.campaign_id) && !campaignThreads.has(s(m.thread_id))) continue; // not a reply to an Instantly campaign
    const from = s(m.from_address_email).toLowerCase();
    const email = s(m.lead || from).toLowerCase().trim();
    if (!email || isOurs(from) || isOurs(email)) continue;
    const time = Date.parse(m.timestamp_created || m.timestamp_email || '');
    if (!isFinite(time)) continue;
    data.push({ id: 'inst:' + m.id, email, time, sequence: s(m.campaign_id), sequence_name: camp[s(m.campaign_id)] || '', thread_id: s(m.thread_id) });
  }
}
return [{ json: { data } }];

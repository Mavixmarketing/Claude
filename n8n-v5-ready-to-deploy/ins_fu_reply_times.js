// READ REPLY TIMES (Instantly adapter, 26 Oct). The shared Who Is Due code (fu_who_is_due.js) learns at what hour
// each person replies, and the campaign they came from, from a list of replies { email, time, sequence,
// sequence_name } (in SalesBlink: the 400 newest reply events). Here the same list is made from Instantly's newest
// received emails ("Read Received", up to 4 pages of 100) and the campaign names ("Read Campaigns"). The campaign
// name also gives the region (uk / australia / canada in the name, otherwise the usa), whose busiest reply hour is
// the fallback for someone with no reply time of their own, exactly as for SalesBlink lists.
const s = v => (v === null || v === undefined) ? '' : String(v);
const camp = {};
try { for (const it of $('Read Campaigns').all()) for (const c of (it.json.items || [])) if (c && c.id) camp[String(c.id)] = s(c.name); } catch (e) { /* no names */ }
const OUR_DOMAIN = /^(mavix|maavix|mavex|mavvix|maviks|mavixx)[a-z0-9-]*\./i;
// 26 Oct, later: only replies to an Instantly campaign count (campaign_id set), and never mail received by one of
// Farhan's own inboxes (IGNORE_MAILBOXES in the Platform node, ins_platform.js).
let IGNORE = ['mavixmarketing@gmail.com', 'hello@mavixmarketing.com', 'team@mavixmarketing.com', 'farhan@mavixmarketing.com'];
try { const l = $('Platform').first().json.IGNORE_MAILBOXES; if (Array.isArray(l)) IGNORE = l.map(x => s(x).toLowerCase().trim()).filter(Boolean); } catch (e) { /* default list */ }
const ignored = new Set(IGNORE);
const result = [];
const seen = new Set();
try {
  for (const it of $('Read Received').all()) for (const m of (Array.isArray(it.json.items) ? it.json.items : [])) {
    if (!m || !m.id || seen.has(m.id) || (m.ue_type !== undefined && m.ue_type !== null && Number(m.ue_type) !== 2)) continue;
    seen.add(m.id);
    if (!s(m.campaign_id) || ignored.has(s(m.eaccount).toLowerCase().trim())) continue;
    const email = s(m.lead || m.from_address_email).toLowerCase();
    if (!email || OUR_DOMAIN.test(email.split('@')[1] || '')) continue;
    const time = Date.parse(m.timestamp_email || m.timestamp_created || '');
    if (!isFinite(time)) continue;
    result.push({ email, time, sequence: s(m.campaign_id), sequence_name: camp[s(m.campaign_id)] || '' });
  }
} catch (e) { /* Instantly did not answer: Who Is Due uses the default hour */ }
return [{ json: { result } }];

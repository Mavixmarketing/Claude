// LIST CHECK (29 Oct 2026). Removes everyone we should not cold-email from a new list before it goes into
// Instantly, and writes the reason for each removal. Run it from the form: paste the Google Sheet link and the tab.
// Sources, all read fresh on every run:
// - the tab itself (rows without a valid email, and repeats of the same email, are removed)
// - our reply log: anyone in it, at any status; colleagues (same company domain) of people who said no or stop,
//   or who are mid-conversation
// - the Instantly block list (emails and whole domains) and every lead already in Instantly (campaigns and lists)
// - the do_not_email table: people older lists already emailed, until the row's "until" date, plus manual rows
// - SalesBlink's send history: fingerprints of everyone SalesBlink emailed (node "SalesBlink History"), until
//   24 Jan 2027 (90 days after SalesBlink stopped sending). A business address is matched on its domain, a
//   free-mail or shared address (gmail, kw.com and the like) on the full address.
// Rows that stay are checked for promises we do not make (refunds, "50%", one thousand dollars), and flagged.
// The check stops with an error (the workflow's error branch posts it to Slack) when the tab is empty, the email
// column is missing, or the log, the block list or the Instantly leads come back empty: a half-checked list is worse
// than none.
const cfg = $('Read Form').first().json;
const norm = s => String(s == null ? '' : s).trim().toLowerCase();
const today = $now.toISODate();
const FREE = /^(gmail|googlemail|yahoo|ymail|rocketmail|hotmail|outlook|live|msn|aol|icloud|me|mac|comcast|sbcglobal|att|verizon|bellsouth|cox|charter|earthlink|juno|optonline|frontier|windstream|protonmail|proton|gmx|mail|zoho|yandex|qq|163|126|bigpond|optusnet|iinet|tpg|internode|westnet|btinternet|sky|virginmedia|talktalk|ntlworld|blueyonder|xtra|shaw|rogers|sympatico|videotron|telus|cogeco|eastlink|bell|orange|free|laposte|web|t-online|libero|tiscali|wanadoo|singnet|pacific|ozemail|twc|q|qwest|qwestoffice|embarqmail|centurytel|centurylink|netzero|aim|inbox|fastmail|hey|atomicmail|baskmail|telstra|dodo|iprimus|adam|people|clear|paradise|ihug|y7mail|godaddybd)\./;
const SHARED = new Set(['kw.com', 'remax.com', 'compass.com', 'cbrealty.com', 'exprealty.com', 'century21.com', 'coldwellbanker.com', 'sothebysrealty.com', 'bhhs.com', 'anytimefitness.com', 'steward.org']);
const domainOf = e => e.split('@')[1] || '';
// a company domain says something about the business; a free-mail or shared one says nothing
const isCompany = d => !!d && !FREE.test(d) && !/(^|\.)rr\.com$/.test(d) && !SHARED.has(d);
const host = u => norm(u).replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[\/?#]/)[0];
const fnv = s => {
  let h = 0x811c9dc5;
  const str = unescape(encodeURIComponent(s));
  for (let i = 0; i < str.length; i++) { h = (h ^ str.charCodeAt(i)) >>> 0; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36);
};

// our reply log: newest real row per email decides the status (test rows never count)
const NO = new Set(['skipped: not_interested', 'unsubscribed', 'skipped: unsubscribe']);
const LIVE = new Set(['replied', 'followed_up', 'answered_already', 'held', 'drafted_not_sent', 'scheduled', 'sending', 'working', 'context']);
const logRows = $('Read Log').all().map(r => r.json || {}).filter(j => j.email);
if (!logRows.length) throw new Error('Our reply log came back empty, so the check stopped. Nobody was removed. Try again in a few minutes.');
const logLast = {};
for (const j of logRows) {
  const e = norm(j.email);
  if (!e.includes('@') || String(j.event_id || '').startsWith('test:')) continue;
  if (!logLast[e] || Number(j.id) > Number(logLast[e].id)) logLast[e] = j;
}
const noDomains = new Map();
const liveDomains = new Map();
for (const [e, j] of Object.entries(logLast)) {
  const d = domainOf(e);
  if (!isCompany(d)) continue;
  if (NO.has(String(j.status))) noDomains.set(d, e);
  else if (LIVE.has(String(j.status))) liveDomains.set(d, e);
}

// Instantly: block list (emails and domains) and every lead already there
const blockEmails = new Set();
const blockDomains = new Set();
for (const page of $('Read Block List').all()) {
  for (const b of (page.json.items || [])) {
    const v = norm(b.bl_value);
    if (!v) continue;
    if (b.is_domain || !v.includes('@')) blockDomains.add(v); else blockEmails.add(v);
  }
}
const instLeads = new Set();
for (const page of $('Read Instantly Leads').all()) {
  for (const l of (page.json.items || [])) { const v = norm(l.email); if (v) instLeads.add(v); }
}
if (!blockEmails.size && !blockDomains.size) throw new Error('The Instantly block list came back empty, so the check stopped. Try again in a few minutes.');
if (!instLeads.size) throw new Error('The Instantly lead list came back empty, so the check stopped. Try again in a few minutes.');

// do_not_email table: older lists and manual rows, each until its date (no date = for good)
const dneEmails = new Map();
const dneSites = new Map();
for (const r of $('Read Do Not Email').all()) {
  const j = r.json || {};
  if (j.until && String(j.until) < today) continue;
  const e = norm(j.email);
  if (e) dneEmails.set(e, j.source || 'do_not_email');
  const w = host(j.website);
  if (w) dneSites.set(w, j.source || 'do_not_email');
}

// SalesBlink send history
const sb = $('SalesBlink History').first().json;
const sbSet = (sb.until && String(sb.until) >= today) ? new Set(String(sb.hashes || '').split(',').filter(Boolean)) : new Set();

// the tab: find the email and website columns whatever their case
// (blank rows are skipped; when the email column name is not found, the column holding the most emails is used)
const rows = $('Read Input Rows').all().map(r => r.json || {})
  .filter(r => Object.keys(r).some(k => k !== 'row_number' && norm(r[k]) !== ''));
if (!rows.length) throw new Error('Tab "' + cfg.tab + '" has no rows to check.');
const cols = [...new Set(rows.flatMap(r => Object.keys(r)))].filter(k => k !== 'row_number');
const exact = want => cols.find(c => norm(c) === norm(want));
const EMAIL = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/;
const emailsIn = {};
for (const c of cols) emailsIn[c] = rows.filter(r => EMAIL.test(norm(r[c]))).length;
const byEmails = cols.filter(c => emailsIn[c] > 0).sort((a, b) => emailsIn[b] - emailsIn[a]);
const emailCol = exact(cfg.emailCol || 'Email') || byEmails[0] || '';
if (!emailCol) throw new Error('Could not find an email column in tab "' + cfg.tab + '". Columns found: ' + cols.join(', '));
const siteCol = exact(cfg.websiteCol || 'Website') || cols.find(c => /web ?site|url|domain/i.test(c)) || '';
const keepWanted = String(cfg.keepCols || '').split(',').map(s => s.trim()).filter(Boolean);
const missingCols = keepWanted.filter(w => !exact(w));
const keep = keepWanted.length ? keepWanted.map(exact).filter(Boolean) : cols;
if (!keep.includes(emailCol)) keep.unshift(emailCol);
const PROMISE = /refund|money[- ]back|payment back|paid back|\b50\s?%|\$\s?1,?000\b|one thousand dollars|guarantee/i;

const clean = [];
const removed = [];
const counts = {};
const seen = new Set();
for (const row of rows) {
  const e = norm(row[emailCol]);
  const d = domainOf(e);
  const site = host(row[siteCol]);
  let reason = '';
  if (!EMAIL.test(e)) reason = 'no valid email';
  else if (seen.has(e)) reason = 'repeat of an email higher up in this tab';
  else if (blockEmails.has(e) || blockDomains.has(d)) reason = 'on the Instantly block list (said no, unsubscribed or bounced)';
  else if (logLast[e]) reason = 'already in our reply log (' + (logLast[e].status || 'no status') + ')';
  else if (instLeads.has(e)) reason = 'already a lead in Instantly';
  else if (sbSet.has(fnv(e)) || (isCompany(d) && sbSet.has(fnv(d)))) reason = 'emailed by SalesBlink in the last 90 days';
  else if (dneEmails.has(e)) reason = 'emailed before (' + dneEmails.get(e) + ')';
  else if (site && dneSites.has(site)) reason = 'same business emailed before (' + dneSites.get(site) + ', website ' + site + ')';
  else if (isCompany(d) && noDomains.has(d)) reason = 'a colleague said no (' + noDomains.get(d) + ')';
  else if (isCompany(d) && liveDomains.has(d)) reason = 'a colleague is mid-conversation with us (' + liveDomains.get(d) + ')';
  if (e) seen.add(e);
  if (reason) {
    const key = reason.replace(/ \(.*$/, '');
    counts[key] = (counts[key] || 0) + 1;
    removed.push({ email: e || String(row[emailCol] || ''), reason, website: String(row[siteCol] || '') });
    continue;
  }
  const out = {};
  for (const c of keep) out[c] = row[c];
  const promises = keep.filter(c => typeof row[c] === 'string' && PROMISE.test(row[c]));
  out.check_note = promises.length ? 'text in ' + promises.join(', ') + ' promises a refund, 50% or one thousand dollars: rewrite before sending' : '';
  clean.push(out);
}
const flagged = clean.filter(r => r.check_note).length;
const stamp = $now.setZone('Asia/Kolkata').toFormat('d LLL HHmm') + ' IST';
const tabClean = cfg.tab + ' - clean ' + stamp;
const tabRemoved = cfg.tab + ' - removed ' + stamp;
const summary = [
  'List check done for tab "' + cfg.tab + '": ' + rows.length + ' rows checked, ' + clean.length + ' clean, ' + removed.length + ' removed.',
  removed.length ? 'Why rows were removed:\n' + Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, v]) => '- ' + k + ': ' + v).join('\n') : '',
  flagged ? flagged + (flagged === 1 ? ' clean row has' : ' clean rows have') + ' text that promises a refund, 50% or one thousand dollars. Rewrite before sending.' : '',
  missingCols.length ? 'These columns were not found and were left out: ' + missingCols.join(', ') + '.' : '',
  'New tabs in the same sheet: "' + tabClean + '" and "' + tabRemoved + '".',
  'https://docs.google.com/spreadsheets/d/' + cfg.sheetId + '/edit'
].filter(Boolean).join('\n');
return [{ json: {
  sheetId: cfg.sheetId,
  tab: cfg.tab,
  tabClean,
  tabRemoved,
  total: rows.length,
  cleanCount: clean.length,
  removedCount: removed.length,
  flagged,
  counts,
  summary,
  sources: { log: Object.keys(logLast).length, blockList: blockEmails.size + blockDomains.size, instantlyLeads: instLeads.size, doNotEmail: dneEmails.size, salesblink: sbSet.size },
  clean,
  removed
} }];

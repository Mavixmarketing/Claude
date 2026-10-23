// BUILD THE MORNING REPORT from the reply log (seo_reply_log) and SalesBlink's daily numbers.
// Days are India days (IST). Every morning: yesterday only. Mondays: a separate weekly post (last week,
// Monday to Sunday). The 1st of the month: a separate monthly post, next to the usual cold email standards.
// Test runs show all three so you can see them.
const IST = 330 * 60000;
const now = Date.now();
const ist = new Date(now + IST);
const todayStart = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()) - IST;
const DAY = 86400000;
const test = $execution.mode !== 'production';
const YESTERDAY = ['Yesterday', todayStart - DAY, todayStart];
const LAST_WEEK = ['Last week', todayStart - 7 * DAY, todayStart];
const LAST_MONTH = ['Last month', Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth() - 1, 1) - IST, Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), 1) - IST];
const showWeekly = ist.getUTCDay() === 1 || test;
const showMonthly = ist.getUTCDate() === 1 || test;
const t = v => { const x = Date.parse(v || ''); return isFinite(x) ? x : NaN; };
const inW = (x, w) => x >= w[1] && x < w[2];
const day = ms => new Date(ms + IST).toISOString().slice(0, 10);
const short = (s, n) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

const all = $('Read Log').all().map(r => r.json || {}).filter(j => j.email && !/^test:/.test(String(j.event_id || '')));
const rows = all.filter(j => !/^manual:/.test(String(j.event_id || '')));
const latest = {};
const byPerson = {};
for (const j of all) {
  const k = String(j.email).toLowerCase();
  (byPerson[k] = byPerson[k] || []).push(j);
  if (!latest[k] || Number(j.id) > Number(latest[k].id)) latest[k] = j;
}

// what kind of reply each row is
const isQuestion = m => /\?|\b(how much|price|pricing|cost|what|which|who|how|why|when|where|can you|do you)\b/i.test(String(m || ''));
function kind(j) {
  const s = String(j.status || '');
  if (s === 'working' || s === 'skipped: duplicate') return null;
  if (s === 'skipped: automated') return 'automated';
  if (s === 'skipped: not_interested' || s === 'closed') return 'not_interested';
  if (s === 'unsubscribed') return 'unsubscribe';
  if (s === 'skipped: no_reply_needed') return 'nothing_to_answer';
  if (['send_failed', 'held', 'gave_up', 'not_in_inbox', 'drafted_not_sent'].includes(s)) return 'error';
  if (String(j.category) === 'needs_reply') return isQuestion(j.their_message) ? 'question' : 'interested';
  return 'other';
}
const KINDS = [['interested', 'Interested'], ['question', 'Asked a question'], ['not_interested', 'Not interested'], ['unsubscribe', 'Asked to unsubscribe'], ['automated', 'Automated (out of office, bounces)'], ['nothing_to_answer', 'Nothing to answer'], ['error', 'Errors / held for you']];
const seen = new Set();
const replies = [];
for (const j of rows.slice().sort((a, b) => Number(b.id) - Number(a.id))) {
  if (String(j.status) === 'working') continue;
  const key = String(j.email).toLowerCase() + '|' + String(j.their_message || '').replace(/\s+/g, ' ').trim().slice(0, 80).toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);
  replies.push(j);
}
function logStats(w) {
  const o = { total: 0, answered: 0, followups: 0 };
  for (const j of replies) {
    const k = kind(j);
    if (k && inW(t(j.createdAt), w)) { o[k] = (o[k] || 0) + 1; o.total++; }
    if (['replied', 'followed_up', 'farhan_handling'].includes(String(j.status)) && inW(t(j.createdAt), w)) o.answered++;
    if (String(j.status) === 'followed_up' && inW(t(j.handled_at), w)) o.followups++;
  }
  return o;
}

// SalesBlink numbers (sent, bounces, unsubscribes), if SalesBlink answered
let sbList = null;
try {
  const raw = $('SalesBlink Daily Numbers').first().json || {};
  const list = Array.isArray(raw.data) ? raw.data : (Array.isArray(raw.result && raw.result.data) ? raw.result.data : (Array.isArray(raw) ? raw : null));
  if (list && list.length && list[0].date !== undefined) sbList = list;
} catch (e) { sbList = null; }
function sbStats(w) {
  if (!sbList) return null;
  const o = { sent: 0, replies: 0, bounces: 0, unsubscribes: 0 };
  for (const d of sbList) { const x = Date.parse(d.date + 'T00:00:00Z') - IST; if (x >= w[1] && x < w[2]) for (const k of Object.keys(o)) o[k] += Number(d[k] || 0); }
  return o;
}
const pct = (a, b) => b ? (100 * a / b).toFixed(2) + '%' : '-';

// one block of numbers for a period: plain sentences, no columns
function block(w, withRate) {
  const L = [];
  const s = sbStats(w);
  const m = logStats(w);
  if (s) {
    L.push('Sent: ' + s.sent + ' · replies: ' + s.replies + ' (' + pct(s.replies, s.sent) + ')');
    L.push('Bounces: ' + s.bounces + ' (' + pct(s.bounces, s.sent) + ')');
    L.push('Unsubscribes: ' + s.unsubscribes + ' (' + pct(s.unsubscribes, s.sent) + ')');
  } else L.push('SalesBlink sending numbers were not available.');
  L.push('');
  L.push('Replies sorted by the agent: ' + m.total);
  L.push('Asked a question & interested: ' + ((m.question || 0) + (m.interested || 0)));
  L.push('Not interested & unsubscribe: ' + ((m.not_interested || 0) + (m.unsubscribe || 0)));
  L.push('Automated & nothing to answer: ' + ((m.automated || 0) + (m.nothing_to_answer || 0)));
  if (m.error) L.push('Errors or held for you: ' + m.error);
  L.push('');
  L.push('Replies: ' + m.answered);
  L.push('Follow-ups: ' + m.followups);
  if (withRate && s && s.sent) L.push('Interested or asking a question, per 1,000 emails sent: ' + (1000 * ((m.interested || 0) + (m.question || 0)) / s.sent).toFixed(1));
  return L;
}

// AUDITS YOU STILL OWE: our last answer promised the audit (or to send it again) and nothing was sent
// since. The follow-ups wait for you on these, so this list is the reminder.
// 22 Oct: the same promise check as the follow-ups (Who Is Due); a promise counts even when the email also asked a question.
// A PROMISE TO SEND THE AUDIT: a first-person "I'll / we're / let me" sentence about preparing, putting
// together, sending or doing an audit, review, breakdown, plan or report (with a/your/the/free in between),
// or "I'll put it together" / "I'll take a (proper) look". Offers and conditions ("would you like me to...",
// "if you want...", "once you confirm...") and questions are not promises.
const PROMISE = /\b(i['’]?ll|i will|we['’]?ll|we will|i['’]?m|i am|we['’]?re|we are|let me|i['’]?ve|we['’]?ve)( now| also| just| happily| go ahead and| get going and)? (start(ed|ing)? (preparing|on|working on) |prepar(e|ing) |put(ting)? together |work(ing)? on |finish(ing)? |send(ing)? (you |over )?|build(ing)? |do(ing)? |get(ting)? |creat(e|ing) )(you )?(a |an |your |the |free |quick |short |proper |full |simple |personali[sz]ed |detailed )*(seo )?(audit|review|breakdown|plan|report)\b|\b(i['’]?ll|i will|we['’]?ll|we will|i['’]?m|i am|we['’]?re|we are|let me) (put(ting)? (it|this|that|one|them) together|take a (proper |quick |closer |good |real |careful )?look|(put(ting)?|get(ting)?) (a |an |your |the |free |quick |short |proper |full |simple )*(seo )?(audit|review|breakdown|plan|report) together|send [^.?!]{0,40} with (your|the) (free )?(audit|review|breakdown|plan|report))|audit (is )?on its way|send it (over )?(to you )?when it['’]?s? (is )?ready|send (it|the audit) (again|over again)|\bresend|(start(ed|ing)? (preparing|on|working on)|prepar(e|ing) (your|the)|work on (your|the)) (free )?audit/i;
const CONDITION = /\b(if you|if it|if that|would you|do you want|want me to|shall i|should i|once you|as soon as you|when you|happy to .* if)\b/i;
const isPromise = text => String(text || '').split(/(?<=[.?!])\s+|\n+/).some(s => PROMISE.test(s) && !/\?\s*$/.test(s.trim()) && !CONDITION.test(s));
const PROMISE_NOTE = /^(prepare|resend) the audit/i;
const DELIVERED_NOTE = /(audit|proposal|roadmap|plan)( pdf| and (the )?(proposal|pricing|lead plan))? (was |were )?(already )?sent|sent the (audit|proposal|roadmap)|hand-sent (audit|proposal)|(already )?has the audit/i;
const WAITING = /focus not given|not given yet|no site yet|(site|website) (is )?(still )?(being built|in progress|under construction|not live)|when (it is|it's|its) live|once (they|he|she) (send|share)|never (shared|sent) the (website|link|site)|still need (their|the|his|her|a|town|website|area)|waiting (on|for) (them|their|him|her)/i;
function owed(list, history) {
  let promiseRow = -1, deliveredRow = -1, promiseNote = '', promiseAt = -1;
  for (const r of list) {
    const id = Number(r.id), note = String(r.note || ''), ours = String(r.our_reply || '');
    if (PROMISE_NOTE.test(note) || isPromise(ours)) { if (id > promiseRow) { promiseRow = id; promiseNote = note; } }
    if (DELIVERED_NOTE.test(note)) deliveredRow = Math.max(deliveredRow, id);
  }
  const blocks = String(history || '').split(/\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/);
  blocks.forEach((b, k) => { if (/^US[ (:]/.test(b) && !/^US \(follow-up/.test(b) && isPromise(b)) promiseAt = k; });
  if (promiseRow < 0 && promiseAt < 0) return null;
  if (deliveredRow > promiseRow && promiseRow >= 0) return null;
  if (promiseAt < 0 && /(^|\n\n)FARHAN/.test(String(history || ''))) return null;
  if (promiseRow < 0 && deliveredRow >= 0) return null;
  if (promiseAt >= 0 && blocks.slice(promiseAt + 1).some(b => /^(FARHAN|THEM)/.test(b))) return null;
  // we are waiting on them, not the other way round: a note says so (our own follow-ups never count)
  if (list.some(r => Number(r.id) >= promiseRow && WAITING.test(String(r.note || '')))) return null;
  const since = list.filter(r => Number(r.id) === promiseRow).map(r => t(r.createdAt))[0];
  return { note: promiseNote, since: isFinite(since) ? since : NaN };
}
// AUDITS SENT: the first time each person got an audit, from notes ("audit was sent") and Farhan's hand-sent lines
const MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
const firstAudit = {};
for (const j of all) {
  const k = String(j.email).toLowerCase();
  const seen = x => { if (isFinite(x) && (!firstAudit[k] || x < firstAudit[k])) firstAudit[k] = x; };
  if (DELIVERED_NOTE.test(String(j.note || ''))) seen(t(j.createdAt));
  const re = /FARHAN \((?:sent )?by hand(?: from gmail)?(?:,| on) (\d{4}-\d{2}-\d{2}|\d{1,2} [a-z]{3})([^)]*)\):([^\n]*)/gi;
  let m;
  while ((m = re.exec(String(j.history || '')))) {
    if (!/audit|proposal|attached|pdf/i.test(m[2] + m[3])) continue;
    let x = NaN;
    if (/^\d{4}/.test(m[1])) x = Date.parse(m[1] + 'T12:00:00Z');
    else { const [d, mo] = m[1].toLowerCase().split(' '); if (MON[mo] !== undefined) x = Date.UTC(ist.getUTCFullYear() - (MON[mo] > ist.getUTCMonth() ? 1 : 0), MON[mo], Number(d), 12); }
    seen(x);
  }
}
const auditsSent = w => Object.values(firstAudit).filter(x => inW(x, w)).length;

const owing = [];
for (const k of Object.keys(latest)) {
  const j = latest[k];
  if (!['replied', 'followed_up'].includes(String(j.status))) continue;
  if (t(j.follow_up_on) > now) continue; // they asked us to wait
  const list = byPerson[k].slice().sort((a, b) => Number(a.id) - Number(b.id));
  const o = owed(list, j.history);
  if (o) owing.push({ email: j.email, ...o });
}
owing.sort((a, b) => (a.since || 0) - (b.since || 0));

const L = [];
const clean = n => String(n || '').replace(/website not known[^,;.]*(\([^)]*\))?[,;.]?\s*/gi, '').replace(/,?\s*please find it[^,;.]*[,;.]?/gi, '').replace(/^\s*[,;.]\s*/, '').trim();
L.push('*Cold email report for ' + day(todayStart - DAY) + '*');
L.push('');
L.push(...block(YESTERDAY, false));
L.push('');

// AUDITS TO PREPARE: people who told us everything we asked and became owed yesterday (each shown once)
const owedNew = owing.filter(o => inW(o.since, YESTERDAY));
L.push('*Audits to prepare*');
if (owedNew.length) for (const o of owedNew) L.push(o.email); else L.push('none');
L.push('');

// IMPORTANT FLAGS from yesterday: one line per person (the newest), never for a no or a stop,
// never the audit (that is above) and never "website not known" (you find the site yourself)
const DEAD = /said no|remove .{0,30}(from|off) (the|our|my) list|not interested|unsubscribe|do not (contact|email|follow)|stop (emailing|contacting)|declined/i;
const flagBy = {};
for (const j of rows) {
  const note = clean(j.note);
  if (!note || !['replied', 'followed_up'].includes(String(j.status)) || !inW(t(j.createdAt), YESTERDAY)) continue;
  if (/^(prepare|resend) the audit/i.test(String(j.note || '')) || DEAD.test(note)) continue;
  const k = String(j.email).toLowerCase();
  const lt = latest[k] && String(latest[k].status);
  if (['skipped: not_interested', 'unsubscribed', 'closed'].includes(lt)) continue;
  if (!flagBy[k] || Number(j.id) > Number(flagBy[k].id)) flagBy[k] = { ...j, note };
}
const flags = Object.values(flagBy);
L.push('*Flags from yesterday*');
if (flags.length) for (const j of flags) L.push(j.email + ': ' + short(j.note, 200)); else L.push('none');
L.push('');

// REACH OUT YOURSELF: had the audit, quiet through all 5 follow-ups (shown on the two mornings after the 5th)
const auditSentTo = list => list.some(r => DELIVERED_NOTE.test(String(r.note || ''))) || list.some(r => /(^|\n\n)FARHAN/.test(String(r.history || '')));
const nudge = [];
for (const k of Object.keys(latest)) {
  const j = latest[k];
  if (String(j.status) !== 'followed_up' || Number(j.followups) !== 5 || !/\n\nUS \(follow-up 5\)/.test(String(j.history || ''))) continue;
  const sent = t(j.handled_at);
  if (!isFinite(sent)) continue;
  const d0 = new Date(sent + IST);
  const ago = Math.round((todayStart - (Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), d0.getUTCDate()) - IST)) / DAY);
  if (ago !== 1 && ago !== 2) continue;
  if (!auditSentTo(byPerson[k] || [j])) continue;
  nudge.push(j.email + (ago === 2 ? ' (second reminder)' : ''));
}
if (nudge.length) {
  L.push('*Reach out on WhatsApp and LinkedIn (had the audit, no reply after 5 follow-ups)*');
  L.push(...nudge);
  L.push('');
}

// COMING UP: date follow-ups in the next 15 days (they asked us to come back), time to prepare first
const dated = {};
for (const j of all) { const k = String(j.email).toLowerCase(); if (j.follow_up_on && (!dated[k] || Number(j.id) > Number(dated[k].id))) dated[k] = j; }
const soon = Object.values(dated).filter(j => { const f = t(j.follow_up_on); return isFinite(f) && f >= todayStart && f < todayStart + 15 * DAY; }).sort((a, b) => t(a.follow_up_on) - t(b.follow_up_on));
if (soon.length) {
  L.push('*Coming up in the next 15 days (they asked us to come back)*');
  for (const j of soon) L.push(day(t(j.follow_up_on)) + ': ' + j.email);
  L.push('');
}

// UNANSWERED: replies from yesterday still waiting on us (last, each listed once)
const stuck = Object.values(latest).filter(j => {
  const st = String(j.status || '');
  const c = t(j.createdAt);
  if (!inW(c, YESTERDAY)) return false;
  return ['send_failed', 'held', 'gave_up', 'not_in_inbox'].includes(st) || (st === 'working' && now - c > 3600000);
});
L.push('*Emails from yesterday still not answered*');
if (stuck.length) for (const j of stuck) L.push(j.email + ': ' + short(j.their_message || j.note, 160)); else L.push('none');

// THREE SEPARATE SLACK POSTS: daily every morning, weekly on Mondays (with every audit still owed),
// monthly on the 1st (with audits sent and the usual cold email standards).
const posts = [{ json: { text: L.join('\n').trim() } }];
if (showWeekly) {
  const Wk = ['*Weekly report: ' + day(LAST_WEEK[1]) + ' to ' + day(LAST_WEEK[2] - DAY) + '*', ''];
  Wk.push(...block(LAST_WEEK, true));
  Wk.push('Audits sent: ' + auditsSent(LAST_WEEK));
  Wk.push('');
  Wk.push('*Audits still to prepare (' + owing.length + ')*');
  if (owing.length) for (const o of owing) Wk.push(o.email + (isFinite(o.since) ? ' · waiting ' + Math.max(0, Math.floor((now - o.since) / DAY)) + ' days' : ''));
  else Wk.push('none');
  posts.push({ json: { text: Wk.join('\n').trim() } });
}
// TEMPLATES THAT GOT REPLIES: SalesBlink's reply events (one event per first reply, with the template name).
// "Interested" means our log sorted that person as interested or asking a question.
const events = [];
try {
  for (const it of $('Read Reply Events').all()) {
    const j = it.json || {};
    const list = Array.isArray(j.result) ? j.result : (Array.isArray(j.data) ? j.data : (j.time ? [j] : []));
    for (const e of list) if (e && e.time && e.email) events.push(e);
  }
} catch (e) { /* no events, the ranking is left out */ }
const goodEmail = {};
for (const j of replies) { const k = kind(j); if (k === 'interested' || k === 'question') goodEmail[String(j.email).toLowerCase()] = true; }
function templateRanking(w) {
  const seenEv = new Set();
  const tally = {};
  for (const e of events) {
    if (seenEv.has(e.id)) continue; seenEv.add(e.id);
    if (!inW(Number(e.time), w)) continue;
    const name = String(e.template_name || 'unknown template').trim();
    const camp = String(e.sequence_name || '').trim();
    const key = name + '|' + camp;
    const x = tally[key] || (tally[key] = { name, camp, replies: 0, good: 0, followup: /follow|follwo|\bfu\b/i.test(name) });
    x.replies++;
    if (goodEmail[String(e.email).toLowerCase()]) x.good++;
  }
  const line = x => x.name + ' (' + x.camp + '): ' + x.replies + ' replies, ' + x.good + ' interested';
  const sorted = Object.values(tally).sort((a, b) => b.good - a.good || b.replies - a.replies);
  const L = [];
  L.push('');
  L.push('*First emails, most interested replies first*');
  const first = sorted.filter(x => !x.followup);
  if (first.length) L.push(...first.slice(0, 10).map(line)); else L.push('no data');
  L.push('');
  L.push('*Follow-up emails, most interested replies first*');
  const fus = sorted.filter(x => x.followup);
  if (fus.length) L.push(...fus.slice(0, 10).map(line)); else L.push('no data');
  return L;
}

// MAILBOXES DOING WORST (23 Oct, monthly post): SalesBlink's numbers per sending mailbox for the last 30 days
// ("SalesBlink Mailbox Stats", analytics/mailbox-stats). Only mailboxes with at least 100 sent count; those with
// 0 replies come first, then the lowest replies per 100 sent, up to 10. Then every mailbox SalesBlink shows with
// a connection error ("SalesBlink Sender Errors", senders with filter has-error). If SalesBlink did not answer,
// the section says so and the rest of the report is unchanged.
function worstMailboxes() {
  const L = ['*Mailboxes doing worst (last 30 days)*'];
  let stats = null, errors = null;
  try {
    const raw = $('SalesBlink Mailbox Stats').first().json || {};
    const list = Array.isArray(raw.data) ? raw.data : (raw.result && Array.isArray(raw.result.data) ? raw.result.data : null);
    if (list) stats = list;
  } catch (e) { stats = null; }
  try {
    const raw = $('SalesBlink Sender Errors').first().json || {};
    const list = Array.isArray(raw.data) ? raw.data : (raw.result && Array.isArray(raw.result.data) ? raw.result.data : null);
    if (list && raw.success !== false) errors = list;
  } catch (e) { errors = null; }
  if (!stats) L.push('SalesBlink mailbox numbers were not available.');
  else {
    const boxes = stats.map(m => ({ email: String((m.sender && m.sender.email) || m.email || m.sender_id || ''), sent: Number(m.sent || 0), replies: Number(m.replies || 0) }))
      .filter(m => m.email && m.sent >= 100)
      .map(m => ({ ...m, rate: 100 * m.replies / m.sent }))
      .sort((a, b) => a.rate - b.rate || b.sent - a.sent);
    const zero = boxes.filter(m => m.replies === 0).length;
    if (!boxes.length) L.push('No mailbox sent 100 or more emails.');
    for (const m of boxes.slice(0, 10)) L.push(m.email + ': ' + m.replies + ' ' + (m.replies === 1 ? 'reply' : 'replies') + ' from ' + m.sent + ' sent');
    if (zero > 10) L.push('(' + zero + ' mailboxes in all had 0 replies from 100 or more sent)');
  }
  if (errors === null) L.push('Could not check SalesBlink for mailbox connection errors.');
  else if (errors.length) {
    L.push('Connection errors in SalesBlink:');
    for (const x of errors) L.push(String(x.alias || x.google_email || x.email || x.smtp_username || x.id || 'unknown mailbox') + (x.error || x.errorMessage || x.last_error ? ': ' + short(x.error || x.errorMessage || x.last_error, 120) : ''));
  } else L.push('No mailbox shows a connection error in SalesBlink.');
  return L;
}

if (showMonthly) {
  const s = sbStats(LAST_MONTH);
  const name = new Date(LAST_MONTH[1] + IST).toLocaleString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const M = ['*Monthly report: ' + name + '*', ''];
  M.push(...block(LAST_MONTH, true));
  M.push('Audits sent: ' + auditsSent(LAST_MONTH));
  if (events.length) M.push(...templateRanking(LAST_MONTH));
  if (s && s.sent) {
    const rr = 100 * s.replies / s.sent, br = 100 * s.bounces / s.sent;
    M.push('');
    M.push('Reply rate ' + rr.toFixed(2) + '%: the usual range is about 1.4% to 9%, average around 3.4%. ' + (rr < 1.4 ? 'Below the usual range.' : rr < 3.4 ? 'Inside the range, below average.' : 'At or above average.'));
    M.push('Bounce rate ' + br.toFixed(2) + '%: keep it under 2%, over 3% puts your domains at risk. ' + (br < 2 ? 'Healthy.' : br < 3 ? 'Getting high.' : 'Too high, clean the lists.'));
    M.push('Unsubscribes: no reliable public standard. More unsubscribes than replies is a warning sign.');
  }
  M.push('', ...worstMailboxes());
  posts.push({ json: { text: M.join('\n').trim() } });
}
return posts;

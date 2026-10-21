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
function block(w) {
  const L = [];
  const s = sbStats(w);
  const m = logStats(w);
  if (s) L.push('• Emails sent: ' + s.sent + ' · replies: ' + s.replies + ' (' + pct(s.replies, s.sent) + ') · bounces: ' + s.bounces + ' (' + pct(s.bounces, s.sent) + ') · unsubscribes: ' + s.unsubscribes + ' (' + pct(s.unsubscribes, s.sent) + ')');
  else L.push('• SalesBlink sending numbers were not available.');
  L.push('• Replies sorted by the agent: ' + m.total + (m.total ? ' (' + KINDS.filter(([k]) => m[k]).map(([k, label]) => label.split(' (')[0].toLowerCase() + ' ' + m[k]).join(', ') + ')' : ''));
  L.push('• Agent replies sent: ' + m.answered + ' · follow-ups sent: ' + m.followups);
  if (s && s.sent) L.push('• Interested or asking a question, per 1,000 emails sent: ' + (1000 * ((m.interested || 0) + (m.question || 0)) / s.sent).toFixed(1));
  return L;
}

// AUDITS YOU STILL OWE: our last answer promised the audit (or to send it again) and nothing was sent
// since. The follow-ups wait for you on these, so this list is the reminder.
const PROMISE = /(start(ed|ing)? (preparing|on|working on)|prepar(e|ing) (your|the)|put (your|the) (free )?audit together|work on (your|the)) (free )?audit|audit (is )?on its way|send it (over )?(to you )?when it is ready|send (it|the audit) (again|over again)|resend/i;
const PROMISE_NOTE = /^(prepare|resend) the audit/i;
const DELIVERED_NOTE = /(audit|proposal|roadmap|plan)( pdf| and (the )?(proposal|pricing|lead plan))? (was |were )?(already )?sent|sent the (audit|proposal|roadmap)|hand-sent (audit|proposal)|(already )?has the audit/i;
function owed(list, history) {
  let promiseRow = -1, deliveredRow = -1, promiseNote = '', promiseAt = -1;
  for (const r of list) {
    const id = Number(r.id), note = String(r.note || ''), ours = String(r.our_reply || '');
    if (PROMISE_NOTE.test(note) || (PROMISE.test(ours) && !/\?/.test(ours))) { if (id > promiseRow) { promiseRow = id; promiseNote = note; } }
    if (DELIVERED_NOTE.test(note)) deliveredRow = Math.max(deliveredRow, id);
  }
  const blocks = String(history || '').split(/\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/);
  blocks.forEach((b, k) => { if (/^US[ (:]/.test(b) && !/^US \(follow-up/.test(b) && PROMISE.test(b) && !/\?/.test(b)) promiseAt = k; });
  if (promiseRow < 0 && promiseAt < 0) return null;
  if (deliveredRow > promiseRow && promiseRow >= 0) return null;
  if (promiseAt < 0 && /(^|\n\n)FARHAN/.test(String(history || ''))) return null;
  if (promiseRow < 0 && deliveredRow >= 0) return null;
  if (promiseAt >= 0 && blocks.slice(promiseAt + 1).some(b => /^(FARHAN|THEM)/.test(b))) return null;
  const since = list.filter(r => Number(r.id) === promiseRow).map(r => t(r.createdAt))[0];
  return { note: promiseNote, since: isFinite(since) ? since : NaN };
}
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
L.push('☀️ *Cold email report for ' + day(todayStart - DAY) + '*');
L.push('');
L.push(...block(YESTERDAY));
L.push('');

// REMINDERS: flags from yesterday, shown once (uses the time the reply came in)
const flags = rows.filter(j => String(j.note || '').trim() && ['replied', 'followed_up'].includes(String(j.status)) && inW(t(j.createdAt), YESTERDAY));
L.push('*🚩 Reminders from yesterday (shown once)*');
if (flags.length) for (const j of flags) L.push('• ' + j.email + ': ' + short(j.note, 220));
else L.push('• none');
L.push('');

// UNANSWERED: replies from yesterday still waiting on us, each listed once
const stuck = Object.values(latest).filter(j => {
  const s = String(j.status || '');
  const c = t(j.createdAt);
  if (!inW(c, YESTERDAY)) return false;
  return ['send_failed', 'held', 'gave_up', 'not_in_inbox'].includes(s) || (s === 'working' && now - c > 3600000);
});
L.push('*❗ Emails from yesterday still not answered (shown once)*');
if (stuck.length) for (const j of stuck) L.push('• ' + j.email + ' (' + String(j.status) + '): ' + short(j.their_message || j.note, 160));
else L.push('• none, every reply from yesterday has been answered or correctly skipped');
L.push('');

// AUDITS OWED: no follow-ups go out to these people until you send the audit
L.push('*📝 Audits you still owe (' + owing.length + '). No follow-ups go to these people until you send it*');
if (owing.length) for (const o of owing.slice(0, 20)) L.push('• ' + o.email + (isFinite(o.since) ? ' · waiting ' + Math.max(0, Math.floor((now - o.since) / DAY)) + ' days' : '') + (o.note ? ': ' + short(o.note.replace(/^(prepare|resend) the audit for /i, ''), 140) : ''));
else L.push('• none');
L.push('');

// REACH OUT YOURSELF: people who have the audit and stayed quiet through all 5 follow-ups (the last one
// is the polite close a week after the 4th). Shown on the two mornings after follow-up 5 went out.
const auditSentTo = list => list.some(r => DELIVERED_NOTE.test(String(r.note || ''))) || list.some(r => /(^|\n\n)FARHAN/.test(String(r.history || '')));
const nudge = [];
for (const k of Object.keys(latest)) {
  const j = latest[k];
  if (String(j.status) !== 'followed_up' || Number(j.followups) !== 5 || !/\n\nUS \(follow-up 5\)/.test(String(j.history || ''))) continue;
  const sent = t(j.handled_at);
  if (!isFinite(sent)) continue;
  const ago = Math.round((todayStart - (Date.UTC(new Date(sent + IST).getUTCFullYear(), new Date(sent + IST).getUTCMonth(), new Date(sent + IST).getUTCDate()) - IST)) / DAY);
  if (ago !== 1 && ago !== 2) continue;
  if (!auditSentTo(byPerson[k] || [j])) continue;
  const site = (String(j.site_notes || '').match(/the page is called: ([^\n]+)/) || [])[1] || '';
  nudge.push('• ' + j.email + (site ? ' (' + short(site, 60) + ')' : '') + (ago === 2 ? ' · second reminder' : ''));
}
L.push('*📲 Reach out on WhatsApp and LinkedIn (had the audit, no reply after all 5 follow-ups)*');
if (nudge.length) L.push(...nudge); else L.push('• none today');
L.push('');

// COMING UP: date follow-ups in the next 15 days (people who asked us to come back on a date), so there
// is time to prepare an audit or write to them yourself first. Uses the newest row that has a date.
const dated = {};
for (const j of all) { const k = String(j.email).toLowerCase(); if (j.follow_up_on && (!dated[k] || Number(j.id) > Number(dated[k].id))) dated[k] = j; }
const soon = Object.values(dated).filter(j => { const f = t(j.follow_up_on); return isFinite(f) && f >= todayStart && f < todayStart + 15 * DAY; }).sort((a, b) => t(a.follow_up_on) - t(b.follow_up_on));
if (soon.length) {
  L.push('*📅 Coming up in the next 15 days (they asked us to come back; the email goes out on that day)*');
  for (const j of soon) L.push('• ' + day(t(j.follow_up_on)) + ' · ' + j.email + ': ' + short(j.note, 140));
  L.push('');
}

// THREE SEPARATE SLACK POSTS: the daily one every morning, a weekly one on Mondays (last week,
// Monday to Sunday), and a monthly one on the 1st (last month, next to the usual cold email standards).
const posts = [{ json: { text: L.join('\n').trim() } }];
if (showWeekly) {
  const Wk = ['*🗓️ Weekly report: ' + day(LAST_WEEK[1]) + ' to ' + day(LAST_WEEK[2] - DAY) + '*', ''];
  Wk.push(...block(LAST_WEEK));
  posts.push({ json: { text: Wk.join('\n').trim() } });
}
if (showMonthly) {
  const s = sbStats(LAST_MONTH);
  const name = new Date(LAST_MONTH[1] + IST).toLocaleString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const M = ['*📊 Monthly report: ' + name + ', against the usual cold email standards*', ''];
  M.push(...block(LAST_MONTH));
  if (s && s.sent) {
    const rr = 100 * s.replies / s.sent, br = 100 * s.bounces / s.sent;
    M.push('• Reply rate ' + rr.toFixed(2) + '%: usual range in published studies is about 1.4% to 9%, averages around 3.4% (Woodpecker: 3.43%). ' + (rr < 1.4 ? '⚠️ below the usual range' : rr < 3.4 ? 'inside the range, below average' : 'at or above average'));
    M.push('• Bounce rate ' + br.toFixed(2) + '%: keep it under 2%; over 3% puts your domains at risk. ' + (br < 2 ? '✅ healthy' : br < 3 ? '⚠️ getting high' : '🚨 too high, clean the lists'));
    M.push('• Unsubscribes: there is no reliable public standard; watch it month to month. More unsubscribes than replies is a warning sign.');
  }
  posts.push({ json: { text: M.join('\n').trim() } });
}
return posts;

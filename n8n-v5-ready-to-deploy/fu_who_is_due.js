// WHO IS DUE A FOLLOW-UP, read from our own log (seo_reply_log).
// A prospect is due when the newest row for their email is one we replied to or followed up,
// they have not written since, and the gap has passed. Farhan's timetable (17 oct):
//   follow-up 1: 4 hours after our last email (in their daytime, never on their weekend)
//   follow-up 2: the next day          follow-up 3: 3 days after that (two quiet days in between)
//   follow-up 4: 4 days after that      follow-up 5: a week after that (a polite close)
//   then light check-ins about 1, 2 and 3 months after our first answer.
// A new reply from them creates a newer row, which resets the count.
// SENT AT THEIR OWN TIME: from follow-up 2 on, each person gets the follow-up in the hour of the day
// they usually reply to us (real reply times from SalesBlink), or the busiest hour of their list.
// NO FOLLOW-UPS WHILE WE OWE THEM THE AUDIT: once our last email said we are preparing the audit,
// nothing goes out until Farhan sends it. We still look at the thread at their hour, so the day
// after Farhan sends the audit by hand, the follow-up about it goes out (stage C).
// DATE FOLLOW-UPS: if the row has follow_up_on (someone asked us to come back on a date),
// nothing is sent before that date, and on that date one follow-up goes out for it.
// THEY ALREADY HAVE SOMEONE (another agency, an in-house person, happy with their current setup): the
// first two follow-ups go as normal, then nothing until one check-in about 3 months after our last email.
// CAMPAIGN (23 Oct): each person carries the campaign they came from (sequence id and name, from the reply
// events), so the writer can pick the right price list.
// FARHAN'S OWN CHOICES (Settings): STOP = never follow up these people. PLAN = nothing before the
// date he set, then one follow-up that carries his note, then the light monthly check-ins.
const cfg = $('Settings').first().json;
// days after the previous email; the first is 4 hours
const GAP_DAYS = [4 / 24, 0.6, 3, 4, 7, 15, 30, 30];
const now = Date.now();
const hourNow = new Date(now).getUTCHours();
if (cfg.TEST) {
  const samples = [
    { seq: 'c4697abb-1c97-4cfb-b56b-eb9f1781ed6c', email: 'charesemb@gmail.com', history: 'THEM: yes please\n\nUS: great, i will put the audit together for 719cleaningcompany.com.\n\nwhich cleaning services do you most want more enquiries for?' },
    { email: 'mariflores2412@gmail.com', history: 'THEM: we would like to wait until next year, budgets are set in january.\n\nUS: that makes sense. google takes a few months to trust a site, so many owners start the groundwork a little before their busy season. i will write again in january.' },
    { seq: '38eb9458-6fd2-48e8-be34-fd88e328a183', email: 'hello@nevuu.com', history: 'THEM: yes, send it\n\nUS: great, which services do you want more customers for, and which area do you cover?\n\nTHEM: corporate events, london\n\nUS: great, i will start preparing your audit for nevuu.com, focused on corporate events in london, and send it over when it is ready.\n\nFARHAN (sent by hand on 2026-10-16, may have had the audit, case studies or a proposal attached): here is your audit. the short version: people in london searching for corporate event venues are not finding you yet.' },
    { n: 4, q: 4, email: 'owner@example-roofing.com', history: 'THEM: we already rank number 1 on google for roofing in plano, so not sure we need this\n\nUS: that is a strong spot to hold. a free audit would show whether that carries over to nearby towns like frisco and allen, where people search for the same job. would you like me to send it over?\n\nUS (follow-up 1): would frisco or allen be the better town to check first?\n\nUS (follow-up 2): a local plumbing company we worked with went from showing up on google under 200 times a day to about 1,000 a day in eight weeks. https://mavixmarketing.com/case-studies/plumbing-company-seo\n\nUS (follow-up 3): a new roof is one of the biggest jobs a homeowner pays for, so one extra booking a month adds up over a year.' },
    { n: 5, q: 7, email: 'info@example-dentalcare.com', history: 'THEM: what would the audit cover?\n\nUS: it shows how people near you searching for a dentist find you on google and google maps, and the first things that would bring more of them to book. would you like me to put it together?\n\nUS (follow-up 1): would implants or general check-ups be the better focus?\n\nUS (follow-up 2): a dental clinic we worked with went from under 15 clicks a day from google to over 100 a day. https://mavixmarketing.com/case-studies/dental-clinic-seo\n\nUS (follow-up 3): most patients who find a dentist they trust stay for years.\n\nUS (follow-up 4): bringing this back to the top of your inbox in case it slipped through the cracks. more people now get their answer from google ai overviews before they click anything.' },
    // 23 Oct: the second follow-up after the audit (no call link), and the third one after the audit in each price list
    { n: 2, q: 1, seq: 'c4697abb-1c97-4cfb-b56b-eb9f1781ed6c', email: 'office@example-hvac.com', history: 'THEM: sure, go ahead\n\nUS: Great, which do you want more of, new AC installs, repairs or maintenance plans?\n\nTHEM: ac installs in mesa and gilbert\n\nUS: Got it, AC installs in Mesa and Gilbert. I\'ll start preparing your free audit and send it over when it\'s ready.\n\nFARHAN (sent by hand on 2026-10-20, may have had the audit, case studies or a proposal attached): Here is your audit. The short version: people in Mesa searching for a new AC install mostly find three competitors on Google Maps before they find you, and your install page never says which towns you cover.\n\nUS (follow-up 1): Did you get the time to go through the audit? If you like, I can walk you through it on a quick 15-minute call: https://cal.id/mavixmarketing/strategy-call .\n\nAnd feel free to ask me if you have any questions.' },
    { n: 3, q: 3, seq: '38eb9458-6fd2-48e8-be34-fd88e328a183', email: 'hello@example-smiledental.com', history: 'THEM: yes please\n\nUS: Great, which treatments do you want more patients for, implants, Invisalign or general check-ups?\n\nTHEM: implants mainly, in austin\n\nUS: Got it, implants in Austin. I\'ll start preparing your free audit and send it over when it\'s ready.\n\nFARHAN (sent by hand on 2026-10-17, may have had the audit, case studies or a proposal attached): Here is your audit. The short version: your implants page is not showing up for Austin searches and the Google listing has no implant photos.\n\nUS (follow-up 1): Did you get the time to go through the audit? If you like, I can walk you through it on a quick 15-minute call: https://cal.id/mavixmarketing/strategy-call .\n\nAnd feel free to ask me if you have any questions.\n\nUS (follow-up 2): Did you get a chance to look through the audit for the implants page? The Google listing photos are a quick win on their own.' },
    { n: 3, q: 3, seq: 'c4697abb-1c97-4cfb-b56b-eb9f1781ed6c', email: 'info@example-plumbingpros.com', history: 'THEM: ok, send it\n\nUS: Great, which do you want more of, water heater installs, drain cleaning or emergency call outs?\n\nTHEM: water heaters, phoenix\n\nUS: Got it, water heaters in Phoenix. I\'ll start preparing your free audit and send it over when it\'s ready.\n\nFARHAN (sent by hand on 2026-10-17, may have had the audit, case studies or a proposal attached): Here is your audit. The short version: you are on page two for water heater installation in Phoenix and there is no page for tankless water heaters.\n\nUS (follow-up 1): Did you get the time to go through the audit? If you like, I can walk you through it on a quick 15-minute call: https://cal.id/mavixmarketing/strategy-call .\n\nAnd feel free to ask me if you have any questions.\n\nUS (follow-up 2): Did you get a chance to look at the audit? The tankless page alone could bring in a few more installs a month.' },
  ];
  const NUM = [2, 6, 1], QUIET = [1, 30, 1];
  return samples.map((x, k) => ({ json: { site_notes: '', email: x.email, messageId: 'test', sequence: x.seq || '', number: x.n || NUM[k], days_quiet: x.q || QUIET[k], history: x.history, transcript: x.history, handled_at: new Date(now - 86400000).toISOString() } }));
}

// CATCH-UP AFTER A MISSED HOURLY RUN (25 Oct): a run can fail when the server is overloaded (24 Oct 22:00 and
// 25 Oct 02:00 UTC). Everyone due in a failed hour would then slip a whole day, because only people whose send
// hour is this hour are picked. The live run remembers the last hour that ran (workflow static data, which n8n
// only saves when the run succeeds, so a failed run leaves the older hour). When the hour before this one did
// not run, people whose send hour fell in the missed hours (at most 3 back) are due now too. Only real
// follow-ups are caught up (not the quiet looks at a thread), weekend and daytime rules still apply, and
// anyone whose row changed since the missed hours began (handled_at, for example already followed up) is left alone.
const bucketNow = Math.floor(now / 3600000);
const missedHours = [];
let missedFrom = Infinity;
try {
  const sd = $getWorkflowStaticData('global');
  const prev = Number(sd.lastHourBucket);
  if (isFinite(prev) && prev > 0 && prev < bucketNow - 1) {
    const first = Math.max(prev + 1, bucketNow - 3);
    for (let b = first; b < bucketNow; b++) missedHours.push(b % 24);
    missedFrom = first * 3600000;
  }
  if (!(prev >= bucketNow)) sd.lastHourBucket = bucketNow;
} catch (e) { /* no static data: no catch-up */ }
const caughtUp = h => h !== hourNow && missedHours.includes(h);
const isMyHour = h => h === hourNow || caughtUp(h);

// 1. Real reply times from SalesBlink: each person's own reply hours, and each list's busiest hour.
const REGION_OFFSET = { uk: 0, usa: -5, canada: -5, aus: 10, nz: 12, sing: 8 };
function regionOf(seq, email) {
  const s = String(seq || '').toLowerCase();
  const tld = String(email || '').toLowerCase().split('.').pop();
  if (tld === 'au') return 'aus';
  if (tld === 'nz') return 'nz';
  if (tld === 'sg') return 'sing';
  if (tld === 'uk') return 'uk';
  if (tld === 'ca') return 'canada';
  if (!s) return '';
  if (/\buk\b/.test(s) && /aus|new zea|\bnz\b|sing/.test(s)) return 'mixed'; // one list for uk, australia, nz, singapore
  if (/\buk\b/.test(s)) return 'uk';
  if (/australia|\baus\b/.test(s)) return 'aus';
  if (/canada/.test(s)) return 'canada';
  return 'usa'; // the usa, ai written and other lists are us lists
}
// the mixed list: someone who replies in the uk working day is in the uk, otherwise australia or nz
const settle = (r, h) => r === 'mixed' ? ((h >= 20 || h <= 6) ? 'aus' : 'uk') : r;
const personHours = {};
const personRegion = {};
const personSeq = {}; // the campaign each person came from (prices depend on it)
const regionHours = {};
for (const it of $('Read Reply Times').all()) {
  const list = Array.isArray(it.json.result) ? it.json.result : (Array.isArray(it.json.data) ? it.json.data : [it.json]); // one reply per item
  for (const e of list) {
    const t = Number(e.time);
    if (!e.email || !isFinite(t) || t <= 0) continue;
    const em = String(e.email).toLowerCase();
    const h = new Date(t).getUTCHours();
    (personHours[em] = personHours[em] || []).push(h);
    if (e.sequence || e.sequence_name) personSeq[em] = { sequence: String(e.sequence || ''), sequence_name: String(e.sequence_name || '') };
    const r = settle(regionOf(e.sequence_name, em), h);
    if (r) { personRegion[em] = r; (regionHours[r] = regionHours[r] || []).push(h); }
  }
}
const mode = hs => { const c = {}; let best = null; for (const h of hs) { c[h] = (c[h] || 0) + 1; if (best === null || c[h] > c[best]) best = h; } return best; };
const DEFAULT_HOUR = 14; // 7:30pm IST, only when we know nothing else
function sendHour(em) {
  if (personHours[em] && personHours[em].length) return mode(personHours[em]);
  const r = personRegion[em] || regionOf('', em);
  if (r && r !== 'mixed' && regionHours[r] && regionHours[r].length) return mode(regionHours[r]);
  return DEFAULT_HOUR;
}
function offsetOf(em) { const r = personRegion[em] || regionOf('', em) || 'usa'; return REGION_OFFSET[r] === undefined ? -5 : REGION_OFFSET[r]; }
const localSunday = em => { const d = new Date(now + offsetOf(em) * 3600000).getUTCDay(); return d === 0 || d === 6; }; // their weekend: Saturday and Sunday
const localDaytime = em => { const h = new Date(now + offsetOf(em) * 3600000).getUTCHours(); return h >= 8 && h < 20; };

// 2. Do we owe them the audit? Our last answer promised it (or promised to send it again) and
// nothing was sent since: no note saying it was sent, no FARHAN line and no new message from them after it.
// 22 Oct: a promise counts even when the same email also asked them a question (for example "I'll put it
// together. Which patients do you want more of?"): Farhan builds the audit anyway, so we never chase them
// while we owe it. Our own follow-ups after the promise never count as us waiting on them.
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
function auditOwed(rowsOfPerson, history) {
  let promiseRow = -1, deliveredRow = -1;
  for (const r of rowsOfPerson) {
    const id = Number(r.id), note = String(r.note || ''), ours = String(r.our_reply || '');
    if (PROMISE_NOTE.test(note) || isPromise(ours)) promiseRow = Math.max(promiseRow, id);
    if (DELIVERED_NOTE.test(note)) deliveredRow = Math.max(deliveredRow, id);
  }
  const blocks = String(history || '').split(/\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/);
  let promiseAt = -1;
  blocks.forEach((b, k) => { if (/^US[ (:]/.test(b) && !/^US \(follow-up/.test(b) && isPromise(b)) promiseAt = k; });
  if (promiseRow < 0 && promiseAt < 0) return false;
  if (deliveredRow > promiseRow && promiseRow >= 0) return false;
  if (promiseAt < 0 && /(^|\n\n)FARHAN/.test(String(history || ''))) return false;
  if (promiseRow < 0 && deliveredRow >= 0) return false;
  // we are waiting on them, not the other way round: a note says so
  if (rowsOfPerson.some(r => Number(r.id) >= promiseRow && WAITING.test(String(r.note || '')))) return false;
  // a promise written in the note of the newest row (added by hand, for example after a call: "prepare the audit: ...")
  // counts until Farhan's next hand-sent message is logged on that row: Log Hand-sent then moves the row's
  // handled_at past the time the row was made (23 Oct, ryan@willoughbycpa.net)
  const newest = rowsOfPerson[rowsOfPerson.length - 1] || {};
  const nn = String(newest.note || '');
  if (PROMISE_NOTE.test(nn) && !WAITING.test(nn) && !DELIVERED_NOTE.test(nn) && !(Date.parse(newest.handled_at || '') > Date.parse(newest.createdAt || '') + 10 * 60000)) return true;
  // anything Farhan sent, or anything they wrote, after the promise in the conversation
  return !(promiseAt >= 0 && blocks.slice(promiseAt + 1).some(b => /^(FARHAN|THEM)/.test(b)));
}

const SOFT_NO = /\b(at this (time|moment|stage|point)|right now|at the moment|for now|not now|this year|currently|not yet|maybe later|in the future|down the (road|line))\b/i;
const HARD_NO = /\b(stop|remove|unsubscribe|do not (contact|email)|don'?t (contact|email)|never|leave (me|us) alone|spam)\b/i;
const HAS_SOMEONE = /\b(already|currently)\s+(have|has|got|use|using|work(ing)? with|employ)\b|\b(another|other|current|existing) (seo )?(company|agency|firm|provider|team|arrangements?)\b|\bin[- ]house\b|\bwe (have|use) (an? |our own )?(seo|marketing|web) (company|agency|team|person|guy|firm)\b|\bhappy with (our|my|the) (current|existing)/i;
const hasSomeone = history => String(history || '').split(/\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/).some(b => /^THEM/.test(b) && HAS_SOMEONE.test(b));

// 3. Who is due this hour.
// PLATFORM (26 Oct): this code runs in the SalesBlink follow-ups and in the Instantly follow-ups (Settings.PLATFORM).
// Rows with no platform are SalesBlink, rows with platform "instantly" are Instantly (message_id is then the
// Instantly thread id). A person is followed up only by the workflow of the platform of their NEWEST row, and only
// conversations (message_id) of that platform are used, so nobody is ever followed up twice or in the wrong tool.
const PLATFORM = cfg.PLATFORM === 'instantly' ? 'instantly' : 'salesblink';
const platformOf = r => String((r && r.platform) || '').toLowerCase() === 'instantly' ? 'instantly' : 'salesblink';
// 28 Oct: a row that only says "answered_already" with no reply of ours, made by the OTHER platform than the row
// before it (the cross-platform guard in Pick New Replies, or row 1143 for Howard), does not move the person's
// conversation to that platform: it is left out when finding their newest row, so the platform that really answered
// keeps following them up. Same-platform rows are treated exactly as before.
const latest = {};
const lastThread = {}; // newest row per person that still has a conversation (message_id)
const byPerson = {};
for (const r of $('Read Log').all()) {
  const j = r.json || {};
  if (!j.email || String(j.event_id || '').startsWith('test:')) continue;
  if (String(j.event_id || '').startsWith('context:') || String(j.status || '') === 'context') continue; // earlier conversation kept only as context for the writers: never changes who is due
  const k = String(j.email).toLowerCase();
  (byPerson[k] = byPerson[k] || []).push(j);
  if (j.message_id && platformOf(j) === PLATFORM && ['replied', 'followed_up'].includes(String(j.status)) && (!lastThread[k] || Number(j.id) > Number(lastThread[k].id))) lastThread[k] = j;
}
for (const k of Object.keys(byPerson)) {
  byPerson[k].sort((a, b) => Number(a.id) - Number(b.id));
  for (const j of byPerson[k]) {
    const crossGuard = latest[k] && String(j.status) === 'answered_already' && !String(j.our_reply || '').trim() && platformOf(j) !== platformOf(latest[k]);
    if (!crossGuard) latest[k] = j;
  }
}
// the newest row we logged for each person (every row is made when one of their messages is handled, or by hand):
// a message from them in the thread newer than this has not been seen by the reply agent (Skip Archived checks)
const loggedAt = k => new Date(Math.max(...(byPerson[k] || []).map(r => Date.parse(r.createdAt || '')).filter(isFinite), 0)).toISOString();
const out = [];
const STOP = (cfg.STOP || []).map(e => String(e).toLowerCase());
const PLAN = cfg.PLAN || {};
for (const key of Object.keys(latest)) {
  if (STOP.includes(key)) continue;
  if (platformOf(latest[key]) !== PLATFORM) continue; // their newest row belongs to the other tool's workflow
  const plan = PLAN[key];
  // a plan works from their last real conversation, even if their newest row is a "no"
  const j = plan && lastThread[key] && !['replied', 'followed_up'].includes(String(latest[key].status)) ? lastThread[key] : latest[key];
  // They wrote something with nothing to answer (for example "i will wait for your email"):
  // no normal follow-ups, but we still watch the thread at their hour, so that when Farhan
  // sends the audit or anything else by hand, the follow-up about it goes out the next day.
  if (!plan && String(j.status) === 'skipped: no_reply_needed' && lastThread[key]) {
    const t = lastThread[key];
    const em0 = String(t.email).toLowerCase();
    if (sendHour(em0) !== hourNow || localSunday(em0)) continue;
    const seen = Date.parse(j.handled_at || j.createdAt);
    out.push({ json: { ...(personSeq[em0] || {}), them_logged_at: loggedAt(key), email: t.email, messageId: t.message_id, history: String(t.history || '') + '\n\nTHEM: ' + String(j.their_message || '').trim(), transcript: String(t.history || '') + '\n\nTHEM: ' + String(j.their_message || '').trim(), site_notes: String(t.site_notes || ''), handled_at: new Date(isFinite(seen) ? seen : Date.now()).toISOString(), send_hour_utc: hourNow, number: Number(t.followups || 0) + 1, days_quiet: 0, not_due: true } });
    continue;
  }
  // A POLITE "NOT RIGHT NOW" (no reason, no stop): one friendly check-in about 80 days later, before
  // SalesBlink deletes the archived chat at 90 days. Never for "stop", "remove me" or "never".
  if (!plan && String(j.status) === 'skipped: not_interested' && j.message_id) {
    const said = String(j.their_message || '');
    if (!SOFT_NO.test(said) || HARD_NO.test(said)) continue;
    const at = Date.parse(j.handled_at || j.createdAt);
    const due = at + 80 * 86400000;
    const em1 = String(j.email).toLowerCase();
    if (!isFinite(at) || now < due || now > due + 30 * 86400000 || !isMyHour(sendHour(em1)) || localSunday(em1)) continue;
    if (caughtUp(sendHour(em1)) && at >= missedFrom) continue;
    const h = String(j.history || ('THEM: ' + said));
    out.push({ json: { ...(personSeq[em1] || {}), them_logged_at: loggedAt(key), email: j.email, messageId: j.message_id, history: h, transcript: h, site_notes: String(j.site_notes || ''), handled_at: new Date(at).toISOString(), send_hour_utc: sendHour(em1), catch_up: caughtUp(sendHour(em1)), number: 8, days_quiet: Math.round((now - at) / 86400000), date_followup: true, follow_up_on: new Date(due).toISOString().slice(0, 10), farhan_note: 'About three months ago they said not right now. One short, friendly check-in: ask how things are going and whether now is a better time to look at the free audit. No pressure, no link.' } });
    continue;
  }
  if (!['replied', 'followed_up'].includes(String(j.status)) || !j.message_id) continue;
  // we already closed the conversation (a warm goodbye after a second no, with no question): nothing more to send
  if (String(j.status) === 'replied' && !/\?/.test(String(j.our_reply || '')) && /(all the best|best of luck|wish(ing)? you|take care|good luck)/i.test(String(j.our_reply || ''))) continue;
  const em = String(j.email).toLowerCase();
  if (localSunday(em)) continue; // never on their weekend
  const hour = sendHour(em);
  const n = Number(j.followups || 0);
  const last = Date.parse(j.handled_at || j.updatedAt || j.createdAt);
  if (!isFinite(last)) continue;
  const base = { ...(personSeq[em] || {}), row_event_id: String(j.event_id || ''), them_logged_at: loggedAt(key), email: j.email, messageId: j.message_id, history: String(j.history || ''), transcript: String(j.history || ''), site_notes: String(j.site_notes || ''), handled_at: new Date(last).toISOString(), send_hour_utc: hour, catch_up: caughtUp(hour), farhan_note: plan ? String(plan.note || '') : '' };
  const days = (now - last) / 86400000;
  // this hour, or a missed hour being caught up, unless their row changed since the missed hours began (no double send)
  const myHour = hour === hourNow || (caughtUp(hour) && last < missedFrom);
  const fu = plan ? Date.parse(plan.from) : (j.follow_up_on ? Date.parse(j.follow_up_on) : NaN);
  if (isFinite(fu)) {
    if (fu > now) continue; // they asked us to wait until this date
    if (fu > last) { if (myHour) out.push({ json: { ...base, number: n + 1, date_followup: true, follow_up_on: new Date(fu).toISOString().slice(0, 10), days_quiet: Math.round(days) } }); continue; }
  }
  // we owe them the audit: no follow-up, only a look at the thread at their hour for a hand-sent audit
  if (auditOwed(byPerson[key] || [j], j.history)) {
    if (hour === hourNow && days < 100) out.push({ json: { ...base, number: n + 1, days_quiet: Math.round(days), not_due: true, audit_owed: true } });
    continue;
  }
  if (n >= GAP_DAYS.length) continue;
  // Farhan's hand-sent message (written back to the log by Skip Archived) is the newest thing and went out
  // less than 18 hours ago: the follow-up about it waits for the next day's run
  if (/^FARHAN/.test(String(j.history || '').split(/\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/).pop()) && days < 0.75) {
    if (hour === hourNow) out.push({ json: { ...base, number: n + 1, days_quiet: Math.round(days), not_due: true } });
    continue;
  }
  if (/\n\nUS \(follow-up 8\)/.test(String(j.history || ''))) continue; // the last check-in has gone
  if (!plan && n >= 2 && hasSomeone(j.history)) {
    if (n >= 8) continue; // the 3-month check-in has gone
    if (!myHour) continue;
    if (days < 90 - 0.5) { if (hour === hourNow && days < 100) out.push({ json: { ...base, number: 8, days_quiet: Math.round(days), not_due: true, has_someone: true } }); continue; }
    out.push({ json: { ...base, number: 8, days_quiet: Math.round(days), has_someone: true } });
    continue;
  }
  if (n === 0) { // follow-up 1: four hours after our email, in their daytime (after the first day, once a day at their hour)
    const fresh = days < 1;
    if (days >= GAP_DAYS[0] && (fresh ? localDaytime(em) : myHour)) out.push({ json: { ...base, number: 1, days_quiet: Math.round(days) } });
    else if (hour === hourNow && days < 100) out.push({ json: { ...base, number: 1, days_quiet: Math.round(days), not_due: true } });
    continue;
  }
  if (!myHour) continue; // from follow-up 2 on: their time of day (or a missed hour, caught up)
  const need = n === 1 ? GAP_DAYS[1] : GAP_DAYS[n] - 0.5; // half a day of slack: the first time their hour comes round after the gap
  if (days < need) {
    if (hour === hourNow && days < 100) out.push({ json: { ...base, number: n + 1, days_quiet: Math.round(days), not_due: true } });
    continue;
  }
  out.push({ json: { ...base, number: n + 1, days_quiet: Math.round(days) } });
}
return out;

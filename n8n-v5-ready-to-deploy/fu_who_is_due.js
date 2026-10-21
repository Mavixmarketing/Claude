// WHO IS DUE A FOLLOW-UP, read from our own log (seo_reply_log).
// A prospect is due when the newest row for their email is one we replied to or followed up,
// they have not written since, and the gap has passed. Farhan's timetable (17 oct):
//   follow-up 1: 4 hours after our last email (in their daytime, never on their Sunday)
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
// FARHAN'S OWN CHOICES (Settings): STOP = never follow up these people. PLAN = nothing before the
// date he set, then one follow-up that carries his note, then the light monthly check-ins.
const cfg = $('Settings').first().json;
// days after the previous email; the first is 4 hours
const GAP_DAYS = [4 / 24, 0.6, 3, 4, 7, 15, 30, 30];
const now = Date.now();
const hourNow = new Date(now).getUTCHours();
if (cfg.TEST) {
  const samples = [
    { email: 'charesemb@gmail.com', history: 'THEM: yes please\n\nUS: great, i will put the audit together for 719cleaningcompany.com.\n\nwhich cleaning services do you most want more enquiries for?' },
    { email: 'mariflores2412@gmail.com', history: 'THEM: we would like to wait until next year, budgets are set in january.\n\nUS: that makes sense. google takes a few months to trust a site, so many owners start the groundwork a little before their busy season. i will write again in january.' },
    { email: 'hello@nevuu.com', history: 'THEM: yes, send it\n\nUS: great, which services do you want more customers for, and which area do you cover?\n\nTHEM: corporate events, london\n\nUS: great, i will start preparing your audit for nevuu.com, focused on corporate events in london, and send it over when it is ready.\n\nFARHAN (sent by hand on 2026-10-16, may have had the audit, case studies or a proposal attached): here is your audit. the short version: people in london searching for corporate event venues are not finding you yet.' },
  ];
  return samples.map((x, k) => ({ json: { site_notes: '', email: x.email, messageId: 'test', number: k === 2 ? 1 : (k === 1 ? 6 : 2), days_quiet: k === 2 ? 1 : (k === 1 ? 30 : 1), history: x.history, transcript: x.history, handled_at: new Date(now - 86400000).toISOString() } }));
}

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
const regionHours = {};
for (const it of $('Read Reply Times').all()) {
  const list = Array.isArray(it.json.result) ? it.json.result : (Array.isArray(it.json.data) ? it.json.data : [it.json]); // one reply per item
  for (const e of list) {
    const t = Number(e.time);
    if (!e.email || !isFinite(t) || t <= 0) continue;
    const em = String(e.email).toLowerCase();
    const h = new Date(t).getUTCHours();
    (personHours[em] = personHours[em] || []).push(h);
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
const localSunday = em => new Date(now + offsetOf(em) * 3600000).getUTCDay() === 0;
const localDaytime = em => { const h = new Date(now + offsetOf(em) * 3600000).getUTCHours(); return h >= 8 && h < 20; };

// 2. Do we owe them the audit? Our last answer promised it (or promised to send it again) and
// nothing was sent since: no note saying it was sent, no FARHAN line and no new message from them after it.
const PROMISE = /(start(ed|ing)? (preparing|on|working on)|prepar(e|ing) (your|the)|put (your|the) (free )?audit together|work on (your|the)) (free )?audit|audit (is )?on its way|send it (over )?(to you )?when it is ready|send (it|the audit) (again|over again)|resend/i;
const PROMISE_NOTE = /^(prepare|resend) the audit/i;
const DELIVERED_NOTE = /(audit|proposal|roadmap|plan)( pdf| and (the )?(proposal|pricing|lead plan))? (was |were )?(already )?sent|sent the (audit|proposal|roadmap)|hand-sent (audit|proposal)|(already )?has the audit/i;
function auditOwed(rowsOfPerson, history) {
  let promiseRow = -1, deliveredRow = -1;
  for (const r of rowsOfPerson) {
    const id = Number(r.id), note = String(r.note || ''), ours = String(r.our_reply || '');
    if (PROMISE_NOTE.test(note) || (PROMISE.test(ours) && !/\?/.test(ours))) promiseRow = Math.max(promiseRow, id);
    if (DELIVERED_NOTE.test(note)) deliveredRow = Math.max(deliveredRow, id);
  }
  const blocks = String(history || '').split(/\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/);
  let promiseAt = -1;
  blocks.forEach((b, k) => { if (/^US[ (:]/.test(b) && !/^US \(follow-up/.test(b) && PROMISE.test(b) && !/\?/.test(b)) promiseAt = k; });
  if (promiseRow < 0 && promiseAt < 0) return false;
  if (deliveredRow > promiseRow && promiseRow >= 0) return false;
  if (promiseAt < 0 && /(^|\n\n)FARHAN/.test(String(history || ''))) return false;
  if (promiseRow < 0 && deliveredRow >= 0) return false;
  // anything Farhan sent, or anything they wrote, after the promise in the conversation
  return !(promiseAt >= 0 && blocks.slice(promiseAt + 1).some(b => /^(FARHAN|THEM)/.test(b)));
}

const HAS_SOMEONE = /\b(already|currently)\s+(have|has|got|use|using|work(ing)? with|employ)\b|\b(another|other|current|existing) (seo )?(company|agency|firm|provider|team|arrangements?)\b|\bin[- ]house\b|\bwe (have|use) (an? |our own )?(seo|marketing|web) (company|agency|team|person|guy|firm)\b|\bhappy with (our|my|the) (current|existing)/i;
const hasSomeone = history => String(history || '').split(/\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/).some(b => /^THEM/.test(b) && HAS_SOMEONE.test(b));

// 3. Who is due this hour.
const latest = {};
const lastThread = {}; // newest row per person that still has a conversation (message_id)
const byPerson = {};
for (const r of $('Read Log').all()) {
  const j = r.json || {};
  if (!j.email || String(j.event_id || '').startsWith('test:')) continue;
  const k = String(j.email).toLowerCase();
  (byPerson[k] = byPerson[k] || []).push(j);
  if (!latest[k] || Number(j.id) > Number(latest[k].id)) latest[k] = j;
  if (j.message_id && ['replied', 'followed_up'].includes(String(j.status)) && (!lastThread[k] || Number(j.id) > Number(lastThread[k].id))) lastThread[k] = j;
}
for (const k of Object.keys(byPerson)) byPerson[k].sort((a, b) => Number(a.id) - Number(b.id));
const out = [];
const STOP = (cfg.STOP || []).map(e => String(e).toLowerCase());
const PLAN = cfg.PLAN || {};
for (const key of Object.keys(latest)) {
  if (STOP.includes(key)) continue;
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
    out.push({ json: { email: t.email, messageId: t.message_id, history: String(t.history || '') + '\n\nTHEM: ' + String(j.their_message || '').trim(), transcript: String(t.history || '') + '\n\nTHEM: ' + String(j.their_message || '').trim(), site_notes: String(t.site_notes || ''), handled_at: new Date(isFinite(seen) ? seen : Date.now()).toISOString(), send_hour_utc: hourNow, number: Number(t.followups || 0) + 1, days_quiet: 0, not_due: true } });
    continue;
  }
  if (!['replied', 'followed_up'].includes(String(j.status)) || !j.message_id) continue;
  const em = String(j.email).toLowerCase();
  if (localSunday(em)) continue; // never on their Sunday
  const hour = sendHour(em);
  const n = Number(j.followups || 0);
  const last = Date.parse(j.handled_at || j.updatedAt || j.createdAt);
  if (!isFinite(last)) continue;
  const base = { email: j.email, messageId: j.message_id, history: String(j.history || ''), transcript: String(j.history || ''), site_notes: String(j.site_notes || ''), handled_at: new Date(last).toISOString(), send_hour_utc: hour, farhan_note: plan ? String(plan.note || '') : '' };
  const days = (now - last) / 86400000;
  const fu = plan ? Date.parse(plan.from) : (j.follow_up_on ? Date.parse(j.follow_up_on) : NaN);
  if (isFinite(fu)) {
    if (fu > now) continue; // they asked us to wait until this date
    if (fu > last) { if (hour === hourNow) out.push({ json: { ...base, number: n + 1, date_followup: true, follow_up_on: new Date(fu).toISOString().slice(0, 10), days_quiet: Math.round(days) } }); continue; }
  }
  // we owe them the audit: no follow-up, only a look at the thread at their hour for a hand-sent audit
  if (auditOwed(byPerson[key] || [j], j.history)) {
    if (hour === hourNow && days < 100) out.push({ json: { ...base, number: n + 1, days_quiet: Math.round(days), not_due: true, audit_owed: true } });
    continue;
  }
  if (n >= GAP_DAYS.length) continue;
  if (!plan && n >= 2 && hasSomeone(j.history)) {
    if (n >= 8) continue; // the 3-month check-in has gone
    if (hour !== hourNow) continue;
    if (days < 90 - 0.5) { if (days < 100) out.push({ json: { ...base, number: 8, days_quiet: Math.round(days), not_due: true, has_someone: true } }); continue; }
    out.push({ json: { ...base, number: 8, days_quiet: Math.round(days), has_someone: true } });
    continue;
  }
  if (n === 0) { // follow-up 1: four hours after our email, in their daytime (after the first day, once a day at their hour)
    const fresh = days < 1;
    if (days >= GAP_DAYS[0] && (fresh ? localDaytime(em) : hour === hourNow)) out.push({ json: { ...base, number: 1, days_quiet: Math.round(days) } });
    else if (hour === hourNow && days < 100) out.push({ json: { ...base, number: 1, days_quiet: Math.round(days), not_due: true } });
    continue;
  }
  if (hour !== hourNow) continue; // from follow-up 2 on: their time of day
  const need = n === 1 ? GAP_DAYS[1] : GAP_DAYS[n] - 0.5; // half a day of slack: the first time their hour comes round after the gap
  if (days < need) {
    if (days < 100) out.push({ json: { ...base, number: n + 1, days_quiet: Math.round(days), not_due: true } });
    continue;
  }
  out.push({ json: { ...base, number: n + 1, days_quiet: Math.round(days) } });
}
return out;

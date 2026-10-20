// PICK NEW REPLIES that still need handling. Two sources:
// 1. SalesBlink "someone replied" events. SalesBlink raises one only for a
//    person's FIRST reply.
// 2. The SalesBlink inbox, which lists every conversation where the prospect
//    wrote last. This is what catches a second, third or later reply.
// A message counts as handled when the log shows a final outcome for it, or a
// final outcome for the same prospect that is newer than the message (so an
// older message is covered once the conversation has been dealt with).
// Until then it is retried, every 2 minutes at first and at most every 30.
// After 12 hours without an outcome it is marked gave_up and Farhan gets a
// Slack alert, once. Claims made before outcomes were logged (30 Sep 07:40 UTC)
// count from then. Only one message per prospect per run, and never a prospect
// that another run touched in the last 3 minutes, so nobody gets two replies.
// Gave-up items go LAST so the first items stay in step with the searches.
const CUTOFF = Date.parse('2026-09-30T07:40:00Z');
const cfg = $('Settings').first().json;
const now = Date.now();
const pre = cfg.TEST ? 'test:' : '';
const info = {};
const busyEmail = {};
const doneEmail = {};
for (const r of $('Read Log').all()) {
  const j = r.json || {};
  if (!j.event_id) continue;
  const k = String(j.event_id);
  const em = String(j.email || '').toLowerCase();
  const x = info[k] || (info[k] = { final: false, touched: 0, first: Infinity });
  const up = Date.parse(j.updatedAt || j.handled_at || j.createdAt);
  const cr = Date.parse(j.createdAt || j.handled_at);
  if (j.status && j.status !== 'working') {
    x.final = true;
    if (em && (pre ? k.startsWith(pre) : !k.startsWith('test:')) && j.status !== 'gave_up' && isFinite(up)) doneEmail[em] = Math.max(doneEmail[em] || 0, up);
  }
  if (isFinite(up)) x.touched = Math.max(x.touched, up);
  if (isFinite(cr)) x.first = Math.min(x.first, cr);
  if (j.status === 'working' && isFinite(up) && now - up < 3 * 60000 && em && (pre ? k.startsWith(pre) : !k.startsWith('test:'))) busyEmail[em] = true;
}
const candidates = [];
const since = now - cfg.LOOKBACK_HOURS * 3600000;
for (const i of $('Read Reply Events').all()) {
  const list = Array.isArray(i.json.data) ? i.json.data : [i.json];
  for (const e of list) {
    const t = Number(e.time) || 0;
    if (e.email && e.id && t >= since) candidates.push({ key: pre + String(e.id), time: t, email: String(e.email).toLowerCase(), note: e.sequence_name || '' });
  }
}
for (const i of $('Read Inbox').all()) {
  const list = ((i.json.data || {}).result) || [];
  for (const m of list) {
    if (!m.email || !m._id || m.self === true || (m.log && typeof m.log === 'object') || m.created_on !== undefined) continue;
    const t = parseInt(String(m._id).slice(0, 8), 16) * 1000;
    if (!isFinite(t) || t < since) continue;
    candidates.push({ key: pre + 'msg:' + String(m.id || m._id), time: t, email: String(m.email).toLowerCase(), note: 'inbox' });
  }
}
const latest = {};
const gaveUp = [];
const HANDS_OFF = (cfg.HANDS_OFF || []).map(e => String(e).toLowerCase());
for (const c of candidates) {
  if (HANDS_OFF.includes(c.email)) continue; // Farhan handles this person himself
  if (busyEmail[c.email]) continue;
  if (doneEmail[c.email] && doneEmail[c.email] > c.time) continue;
  const x = info[c.key];
  if (x) {
    if (x.final) continue;
    const age = now - Math.max(x.first, CUTOFF);
    if (age > 12 * 3600000) { gaveUp.push({ ...c, status: 'gave_up' }); continue; }
    const wait = Math.min(30 * 60000, Math.max(2 * 60000, age / 4));
    if (now - x.touched < wait) continue;
  }
  if (!latest[c.email] || latest[c.email].time < c.time) latest[c.email] = c;
}
const picked = Object.values(latest).sort((a, b) => b.time - a.time).slice(0, cfg.MAX_PER_RUN);
return picked.concat(gaveUp).map(c => ({ json: {
  event_id: c.key,
  email: c.email,
  status: c.status || 'working',
  note: c.note,
  msg_time: c.time,
  handled_at: new Date().toISOString(),
} }));

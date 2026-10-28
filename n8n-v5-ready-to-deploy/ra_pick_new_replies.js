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
// CROSS-PLATFORM GUARD (28 Oct): a mailbox can be connected to SalesBlink and Instantly, and a lead can be in both
// (26 Oct: 422 people got cold emails from both), so the same reply can reach both agents. Before a message from
// someone is answered here, the log is checked for a row of THE OTHER platform for the same email that shows a
// reply actually sent (our_reply not empty and status replied, followed_up or answered_already) or one being
// handled (working, scheduled, sending), made or changed at or after the message time minus 30 minutes. If there is
// one, the message is not answered here: it is logged answered_already with a short "cross-platform guard" note
// (our_reply stays empty, so this row never counts as an answer for the other agent). Each agent's own
// handled/busy bookkeeping above still uses only its own platform's rows; the guard is an extra check on top.
// HOME PLATFORM: when the person's newest real log row is on the other platform (their conversation lives there),
// a new message is left for 5 minutes first, so the other agent, which owns the conversation, gets to it first
// (then the guard stops this one). If the other agent has not taken it by then, it is answered here.
// Guarded items go after the picked ones and before the gave-up ones.
const CUTOFF = Date.parse('2026-09-30T07:40:00Z');
const cfg = $('Settings').first().json;
const now = Date.now();
const pre = cfg.TEST ? 'test:' : '';
// 26 Oct: each agent only counts its own log rows (SalesBlink rows have no platform, Instantly rows say "instantly"),
// so a reply handled on one platform never marks a message on the other as handled, busy or done.
const PLATFORM = cfg.PLATFORM === 'instantly' ? 'instantly' : 'salesblink';
const platformOf = j => String(j.platform || '').toLowerCase() === 'instantly' ? 'instantly' : 'salesblink';
// 28 Oct: "context" rows (event_id "context:<email>", status "context": an earlier conversation from Farhan's own
// mailbox, added by hand for the Instantly writer) are never a reply, never an outcome and never busy: ignored here.
const isContext = j => String(j.event_id || '').startsWith('context:') || String(j.status || '') === 'context';
const info = {};
const busyEmail = {};
const doneEmail = {};
for (const r of $('Read Log').all()) {
  const j = r.json || {};
  if (!j.event_id || platformOf(j) !== PLATFORM || isContext(j)) continue;
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
// the other platform's rows (test rows never count: nothing was sent in a test)
const OTHER_NAME = PLATFORM === 'instantly' ? 'SalesBlink' : 'Instantly';
const isGuardRow = j => String(j.status || '') === 'answered_already' && !String(j.our_reply || '').trim();
const otherActive = {}; // email -> rows of the other platform with a reply sent or being handled
const newestReal = {}; // email -> newest real row (any platform), to know where their conversation lives
for (const r of $('Read Log').all()) {
  const j = r.json || {};
  const em = String(j.email || '').toLowerCase();
  if (!em || !j.event_id || String(j.event_id).startsWith('test:') || isContext(j)) continue;
  if (!isGuardRow(j) && (!newestReal[em] || Number(j.id) > Number(newestReal[em].id))) newestReal[em] = j;
  if (platformOf(j) === PLATFORM) continue;
  const st = String(j.status || '');
  const sent = !!String(j.our_reply || '').trim() && ['replied', 'followed_up', 'answered_already'].includes(st);
  const busy = ['working', 'scheduled', 'sending'].includes(st);
  if (!sent && !busy) continue;
  const at = Math.max(Date.parse(j.createdAt || '') || 0, Date.parse(j.updatedAt || '') || 0);
  if (at) (otherActive[em] = otherActive[em] || []).push({ at, id: j.id, st });
}
const guardFor = c => {
  const hits = (otherActive[c.email] || []).filter(o => o.at >= c.time - 30 * 60000).sort((a, b) => b.at - a.at);
  return hits[0] || null;
};
const guardNote = g => 'cross-platform guard: not answered here, ' + (['working', 'scheduled', 'sending'].includes(g.st) ? 'the ' + OTHER_NAME + ' agent is already answering it' : 'already answered on ' + OTHER_NAME) + ' (row ' + g.id + ', ' + new Date(g.at).toISOString().slice(0, 16).replace('T', ' ') + ' UTC)';
const homeIsOther = em => !!newestReal[em] && platformOf(newestReal[em]) !== PLATFORM;
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
const guarded = [];
const ready = [];
for (const c of Object.values(latest)) {
  const g = guardFor(c);
  if (g) { guarded.push({ ...c, status: 'answered_already', campaign_name: c.note, note: guardNote(g) }); continue; }
  if (homeIsOther(c.email) && now - c.time < 5 * 60000) continue; // their conversation lives on the other platform: give that agent the first go
  ready.push(c);
}
const gaveUpLeft = [];
for (const c of gaveUp) {
  const g = guardFor(c);
  if (g) guarded.push({ ...c, status: 'answered_already', campaign_name: c.note, note: guardNote(g) });
  else gaveUpLeft.push(c);
}
const picked = ready.sort((a, b) => b.time - a.time).slice(0, cfg.MAX_PER_RUN);
return picked.concat(guarded, gaveUpLeft).map(c => ({ json: {
  event_id: c.key,
  email: c.email,
  status: c.status || 'working',
  note: c.note,
  ...(c.campaign_name !== undefined ? { campaign_name: c.campaign_name } : {}),
  msg_time: c.time,
  handled_at: new Date().toISOString(),
} }));

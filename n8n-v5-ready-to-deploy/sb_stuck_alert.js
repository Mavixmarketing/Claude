// STUCK SALESBLINK REPLIES (30 Oct 2026). From about 29 Oct 00:00 to 30 Oct 12:00 UTC SalesBlink sent none of the
// replies scheduled in it: they stayed under Inbox > Scheduled ("completed": false) and nobody noticed for a day and
// a half. This runs every hour and posts in Slack when a reply is still waiting more than 2 hours after its send
// time. Read only: it never sends, deletes or changes anything. Input: GET /api/public/v1.0.0/inbox?type=scheduled
// ({ data: { result: [task] } }). Only replies count (task_type "reply"), not sequence steps.
// The same stuck replies are posted again at most once a day (workflow static data remembers when each one was
// posted; n8n saves it only on live runs, so a test run always posts).
const STUCK_AFTER = 2 * 3600000;
const REPEAT_AFTER = 24 * 3600000;
const now = Date.now();
const list = (($input.first().json.data || {}).result) || [];
const idOf = m => String(m.id || m._id || m.messageId);
const stuck = list.filter(m => m && String(m.task_type || '') === 'reply' && m.completed === false && m.approved !== false
  && Number(m.scheduled_time) > 0 && now - Number(m.scheduled_time) > STUCK_AFTER)
  .sort((a, b) => Number(a.scheduled_time) - Number(b.scheduled_time));
let sd = {};
try { sd = $getWorkflowStaticData('global'); } catch (e) { /* no static data: post every time */ }
const posted = sd.posted || {};
for (const id of Object.keys(posted)) if (!stuck.some(m => idOf(m) === id)) delete posted[id]; // sent or deleted since
sd.posted = posted;
// post when a reply is newly stuck, or a day after the last post while replies are still stuck (the whole list each time)
if (!stuck.some(m => !(now - Number(posted[idOf(m)] || 0) < REPEAT_AFTER))) return [];
for (const m of stuck) posted[idOf(m)] = now;
const ist = t => new Date(Number(t) + 5.5 * 3600000).toISOString().slice(0, 16).replace('T', ' ') + ' IST';
const plain = s => String(s || '').replace(/<\/(p|div)>|<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const lines = stuck.map(m => {
  const body = plain(((m.data || {}).email || {}).body);
  const hours = Math.floor((now - Number(m.scheduled_time)) / 3600000);
  return '- ' + (m.email || 'unknown') + ', due ' + ist(m.scheduled_time) + ' (' + hours + ' hours ago): "' + body.slice(0, 90) + (body.length > 90 ? '...' : '') + '"';
});
const n = stuck.length;
const text = 'SalesBlink has not sent ' + n + (n === 1 ? ' reply' : ' replies') + ' (stuck in Inbox > Scheduled for more than 2 hours):\n'
  + lines.join('\n')
  + '\nAsk Claude to send ' + (n === 1 ? 'it' : 'them') + ' again, then delete the stuck ' + (n === 1 ? 'copy' : 'copies') + ' in SalesBlink (Inbox, Scheduled) so nothing goes out twice.';
return [{ json: { text, stuck: n } }];

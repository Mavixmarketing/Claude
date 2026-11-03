// SKIP WAITING (3 Nov, cost audit): the writer already decided NOT to send this person a follow-up in the last 20
// hours (Remember Wait). Leave them out until then, unless they wrote to us since (a newer log row). Before this,
// the same thread went back to Opus every hour of their daytime.
let w = {};
try { w = $getWorkflowStaticData('global').fuWait || {}; } catch (e) { /* no memory on manual runs */ }
const now = Date.now();
return $input.all().filter(it => {
  const j = it.json || {};
  const k = String(j.email || '').toLowerCase();
  const x = w[k];
  if (!x || !(x.until > now)) return true;
  const last = Date.parse(j.them_logged_at || j.handled_at || 0);
  return isFinite(last) && last > x.at;
});
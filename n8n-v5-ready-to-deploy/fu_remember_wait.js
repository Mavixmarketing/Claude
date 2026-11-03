// REMEMBER WAIT (3 Nov, cost audit): the writer decided not to send this follow-up. Remember it for 20 hours so
// Skip Waiting does not hand the same thread back to Opus every hour. Live runs only.
const cfg = $('Settings').first().json;
if (!cfg.SEND_FOR_REAL || cfg.TEST) return [];
const sd = $getWorkflowStaticData('global');
const w = sd.fuWait || {};
const now = Date.now();
for (const k of Object.keys(w)) if (!(w[k] && w[k].until > now)) delete w[k];
for (const it of $input.all()) {
  const j = it.json || {};
  if (j.send === false && j.email) w[String(j.email).toLowerCase()] = { at: now, until: now + 20 * 3600000 };
}
sd.fuWait = w;
return [];
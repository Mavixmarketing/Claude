// ---------------------------------------------------------------------------
// HAVE WE ALREADY SAID THIS?
//
// The first time a problem appears, it is sent. The same problem from the same
// engine is then held for QUIET_HOURS, however many times it happens. A different
// problem, or the same one after the quiet period, goes straight through.
// Returning nothing stops the chain: no Slack post, and the run still shows as a
// normal completion.
//
// 23 Oct: the key could end in a space (it is cut at 240 characters), while the
// saved copy is read back trimmed, so they never matched and a SalesBlink outage
// sent one alert every minute. The key is now trimmed before it is saved and
// compared, and keys are compared with spaces squeezed out.
// ---------------------------------------------------------------------------
const QUIET_HOURS = 12;

function s(v) { return (v === null || v === undefined) ? '' : String(v).trim(); }

let incoming = {};
try { incoming = $('Explain What Broke').first().json || {}; } catch (e) { incoming = {}; }

let engineName = 'unknown';
try { engineName = String((($('When Any Engine Fails').first().json || {}).workflow || {}).name || 'unknown'); }
catch (e) { engineName = 'unknown'; }

const text = s(incoming.text);
// A workflow that runs every minute and trips on a few seconds of lost internet lookup has already
// run again by the time anyone reads the alert, so that one case is not worth a message.
if (engineName.toLowerCase().indexOf('every minute') > -1 && text.toLowerCase().indexOf('dns server returned an error') > -1) {
  console.log('Passing DNS blip on an every-minute workflow. The next run a minute later covers it, so no Slack message.');
  return [];
}
if (!text) {
  console.log('No alert text came through, so there is nothing to send.');
  return [];
}

// The engine plus the words of the error, with run numbers, ids and the link removed.
function fingerprint(t) {
  let f = t.toLowerCase();
  const cut = f.indexOf('run: ');
  if (cut > -1) f = f.slice(0, cut);
  let out = '';
  for (let i = 0; i < f.length; i++) {
    const c = f.charAt(i);
    if (c >= '0' && c <= '9') continue;
    out += c;
  }
  const words = out.split(' ').filter(function (w) { return w.length > 0; });
  return words.join(' ').trim().slice(0, 200);
}
// compare keys without any whitespace, so a trimmed or re-spaced copy still matches
function squeeze(k) { return String(k || '').split('').filter(function (c) { return c.trim() !== ''; }).join(''); }

const key = (engineName + ' :: ' + fingerprint(text)).slice(0, 240).trim();
(function () {
  const a = fingerprint('Broke at: Check SERP Health. All 330 searches failed. Run: http://x/executions/17499');
  const b = fingerprint('Broke at: Check SERP Health. All 330 searches failed. Run: http://x/executions/17519');
  if (a !== b) throw new Error('SELF-TEST FAILED - the same problem from two different runs must look the same');
  const c = fingerprint('Broke at: Save To Sheet. Google refused the write.');
  if (a === c) throw new Error('SELF-TEST FAILED - two different problems must not look the same');
  if (squeeze('abc the ') !== squeeze('abc the')) throw new Error('SELF-TEST FAILED - a trimmed key must still match');
})();

let history = [];
try { history = $('Read Recent Alerts').all().map(function (i) { return (i && i.json) || {}; }); }
catch (e) { history = []; }

const now = Date.now();
const want = squeeze(key);
let lastSent = 0;
let timesHeld = 0;
for (let i = 0; i < history.length; i++) {
  if (squeeze(history[i].alert_key) !== want) continue;
  const t = Date.parse(s(history[i].last_sent_at));
  if (isFinite(t) && t > lastSent) lastSent = t;
  timesHeld++;
}

const hoursSince = lastSent ? (now - lastSent) / 3600000 : null;

// If the history cannot be read, nothing matches and the alert is sent: better a duplicate than silence.
if (lastSent && hoursSince < QUIET_HOURS) {
  console.log('ALREADY REPORTED ' + Math.round(hoursSince * 10) / 10 + ' hours ago, so it is being held.');
  return [];
}

console.log(lastSent
  ? ('Last reported ' + Math.round(hoursSince) + ' hours ago, past the quiet period, so it is being sent again.')
  : 'This is a new problem, sending it.');

let outText = text;
if (timesHeld > 0) {
  outText = text + String.fromCharCode(10) + String.fromCharCode(10)
    + '(this has now happened more than once - it was last reported '
    + Math.round(hoursSince) + ' hours ago)';
}

return [{ json: {
  text: outText,
  alert_key: key,
  workflow_name: engineName,
  cause: text.slice(0, 300),
  last_sent_at: new Date().toISOString()
} }];

// Workflow meSLjgKRwDakCefa: "📣 Slack: Instantly long-term emails sent (every 15 min)"
// Two Code nodes. Paste each part into its node (mode runOnceForAllItems).

// ===== Code node: Load State =====
// Load State: where to start reading Instantly sent emails.
// Live runs: from the last processed timestamp kept in workflow static data.
// First live run: start from now (posts nothing, no backlog flood).
// Test runs: from the saved timestamp if any, else the last TEST_LOOKBACK_MINUTES.
const TEST_LOOKBACK_MINUTES = 15;
const MAX_CATCHUP_HOURS = 24;

const state = $getWorkflowStaticData('global');
const live = $execution.mode === 'production';
const now = new Date();
const nowIso = now.toISOString();
let since;
let firstRun = false;

if (live) {
  if (!state.lastTs) {
    firstRun = true;
    since = nowIso;
  } else {
    const floor = new Date(now.getTime() - MAX_CATCHUP_HOURS * 3600000).toISOString();
    since = state.lastTs > floor ? state.lastTs : floor;
  }
} else {
  since = state.lastTs || new Date(now.getTime() - TEST_LOOKBACK_MINUTES * 60000).toISOString();
}

const lastIds = since === state.lastTs && Array.isArray(state.lastIds) ? state.lastIds : [];

return [{ json: { since, lastIds, firstRun, live, startedAt: nowIso } }];

// ===== Code node: Pick New LT Emails =====
// Pick New LT Emails: keep campaign emails Instantly sent since the last run
// from campaigns named "LT |...", build one Slack message each, and move the
// saved timestamp forward (live runs only; static data is not saved in test runs).
const BODY_MAX = 700;

const st = $('Load State').first().json;
const state = $getWorkflowStaticData('global');

const emails = [];
for (const it of $('Read Sent Emails').all()) {
  const b = it.json || {};
  for (const e of (Array.isArray(b.items) ? b.items : [])) emails.push(e);
}

const ltNames = {};
for (const it of $('Read LT Campaigns').all()) {
  const b = it.json || {};
  for (const c of (Array.isArray(b.items) ? b.items : [])) {
    const name = String(c.name || '').trim();
    if (c.id && name.startsWith('LT |')) ltNames[c.id] = name;
  }
}

const tsOf = (e) => String(e.timestamp_created || e.timestamp_email || '');

// Emails are read oldest first from the saved cursor, so a busy period is
// caught up over the next runs instead of being skipped. The cursor moves to
// the newest email read; ids at exactly that time are kept so none repeat.
const sinceMs = Date.parse(st.since);
const doneIds = new Set(Array.isArray(st.lastIds) ? st.lastIds : []);
let newestMs = sinceMs;
for (const e of emails) {
  const ms = Date.parse(tsOf(e));
  if (Number.isFinite(ms) && ms > newestMs) newestMs = ms;
}
const idsAtNewest = emails
  .filter((e) => Date.parse(tsOf(e)) === newestMs)
  .map((e) => e.id);
const nextIds = newestMs === sinceMs ? [...new Set([...doneIds, ...idsAtNewest])] : idsAtNewest;

if (st.live) {
  state.lastTs = st.firstRun ? st.startedAt : new Date(newestMs).toISOString();
  state.lastIds = st.firstRun ? [] : nextIds;
  if (st.firstRun) return [];
}

const decode = (s) => s
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(Number(n)));

function plainText(body) {
  let html = '';
  let text = '';
  if (body && typeof body === 'object') {
    html = String(body.html || '');
    text = String(body.text || '');
  } else if (typeof body === 'string') {
    html = body;
  }
  let out;
  if (html) {
    out = html
      .replace(/<(style|script|head)[^>]*>[\s\S]*?<\/\1>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi, '\n')
      .replace(/<[^>]+>/g, '');
    out = decode(out);
  } else {
    out = text;
  }
  out = out
    .replace(/\r/g, '')
    .replace(/[ \t\u00a0]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (out.length > BODY_MAX) out = out.slice(0, BODY_MAX).trimEnd() + '…';
  return out;
}

function stepLabel(step) {
  const parts = String(step || '').split('_');
  if (parts.length < 2) return '';
  const n = Number(parts[1]);
  return Number.isFinite(n) ? 'Email ' + (n + 1) + ' of the sequence' : '';
}

const out = [];
const seen = new Set();
for (const e of emails) {
  const t = tsOf(e);
  const ms = Date.parse(t);
  if (!Number.isFinite(ms) || ms < sinceMs) continue;
  if (ms === sinceMs && doneIds.has(e.id)) continue;
  if (e.ue_type !== undefined && Number(e.ue_type) !== 1) continue;
  const campaign = ltNames[e.campaign_id];
  if (!campaign) continue;
  if (seen.has(e.id)) continue;
  seen.add(e.id);

  const to = String(e.to_address_email_list || '').trim();
  const from = String(e.from_address_email || e.eaccount || '').trim();
  const subject = String(e.subject || '').trim();
  const stepText = stepLabel(e.step);
  const body = plainText(e.body);

  const lines = [
    '(Instantly long-term) Sent to: ' + to + ' from ' + from,
    'Campaign: ' + campaign + (stepText ? ' · ' + stepText : ''),
    'Subject: ' + subject,
    body,
  ];
  out.push({
    json: {
      slack_text: lines.join('\n'),
      to, from, subject, campaign,
      step: e.step || '',
      sent_at: t,
      email_id: e.id,
    },
  });
}

out.sort((a, b) => Date.parse(a.json.sent_at) - Date.parse(b.json.sent_at));
return out;

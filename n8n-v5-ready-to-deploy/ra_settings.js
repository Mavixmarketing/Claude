// SETTINGS. The only switches you normally touch.
// SEND_FOR_REAL: the live schedule sends replies, unsubscribes and posts to Slack.
// Any run that is not the live schedule (editor, API test, "Test On Last 7 Days")
// is a test: it looks back 7 days, never sends, and its log rows start with "test:".
const manual = $execution.mode !== 'production';
// PLATFORM (26 Oct): the same Settings code runs in the SalesBlink reply agent and in the Instantly reply agent.
// The Instantly workflow puts a small "Platform" node ({ PLATFORM: 'instantly' }) in front of this node; the
// SalesBlink workflow has only its triggers in front, so it stays 'salesblink'. Each agent only looks at its own log rows.
let PLATFORM = 'salesblink';
try { const p = String((($input.first() || {}).json || {}).PLATFORM || '').toLowerCase(); if (p === 'instantly') PLATFORM = 'instantly'; } catch (e) { /* no input: salesblink */ }
return [{ json: {
  PLATFORM,
  SEND_FOR_REAL: manual ? false : true,
  TEST: manual,
  LOOKBACK_HOURS: manual ? 168 : 48,
  MAX_PER_RUN: manual ? 30 : 10,
  SORT_MODEL: 'openai/gpt-6-luna',
  WRITE_MODEL: 'anthropic/claude-opus-5.5',
  SLACK_CHANNEL: 'C0BL2Q14QH5',
  BOOKING_LINK: 'https://cal.id/mavixmarketing/strategy-call',
  // HANDS OFF: people Farhan handles himself (whatsapp, calls). The agent never replies to them. Lower case.
  HANDS_OFF: ['arihantkothari93@gmail.com', 'fellinlovewithslovenia@gmail.com'], // 24 oct: slovenia is on whatsapp with Farhan
} }];

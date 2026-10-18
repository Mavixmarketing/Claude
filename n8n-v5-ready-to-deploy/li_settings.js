// SETTINGS. The only switches you normally touch.
// SEND_FOR_REAL: a real reply arriving from Prosp is answered on LinkedIn.
// Any other run (the editor, a test) never sends, and its log rows start with "test:".
// LIVE_SENDING: false = real replies are written and logged but not sent.
const LIVE_SENDING = true;
const manual = $execution.mode !== 'production';
return [{ json: {
  SEND_FOR_REAL: manual ? false : LIVE_SENDING,
  TEST: manual,
  // a different wait each time, between 60 and 180 seconds
  WAIT_SECONDS: manual ? 2 : 60 + Math.floor(Math.random() * 121),
  // Only replies in Prosp campaigns whose name contains one of these words are answered (any capitals).
  // Replies in every other campaign are logged and left for Farhan. An empty list answers every campaign.
  ONLY_CAMPAIGNS_CONTAINING: ['seo'],
  // true = every sent reply is also shown in Slack (first weeks). false = Slack only hears about problems and flags.
  TELL_SLACK_EVERY_REPLY: true,
  MAX_OUR_REPLIES_PER_PERSON: 6,
  SORT_MODEL: 'openai/gpt-6-luna',
  WRITE_MODEL: 'anthropic/claude-opus-5.5',
  SLACK_CHANNEL: 'C0BL2Q14QH5',
  BOOKING_LINK: 'https://cal.id/mavixmarketing/strategy-call',
  // The only links a reply may contain. A reply with any other link is not sent.
  ALLOWED_LINKS: ["https://lnkd.in/p/gMHV49kf", "https://mavixmarketing.com/case-studies", "https://mavixmarketing.com/case-studies/plumbing-company-seo", "https://mavixmarketing.com/case-studies/construction-management-seo", "https://mavixmarketing.com/case-studies/dental-clinic-seo", "https://mavixmarketing.com/case-studies/my-favorite-therapists", "https://mavixmarketing.com/case-studies/orthopaedic-clinic-seo", "https://mavixmarketing.com/case-studies/all-dogs-rock", "https://mavixmarketing.com/case-studies/martial-arts-academy-seo", "https://mavixmarketing.com/case-studies/real-estate-brokerage-seo", "https://mavixmarketing.com/case-studies/financial-advisers-seo", "https://mavixmarketing.com/case-studies/la-vela-coffee", "https://mavixmarketing.com/case-studies/home-goods-retailer-seo", "https://mavixmarketing.com/case-studies/skincare-brand-seo", "https://mavixmarketing.com/case-studies/online-pharmacy-seo", "https://mavixmarketing.com/case-studies/hr-software-seo", "https://mavixmarketing.com/case-studies/edtech-software-seo", "https://mavixmarketing.com/case-studies/exam-prep-platform-seo", "https://mavixmarketing.com/case-studies/freight-forwarding-seo", "https://mavixmarketing.com/seo-pricing", "https://mavixmarketing.com"].concat(['https://cal.id/mavixmarketing/strategy-call']),
} }];


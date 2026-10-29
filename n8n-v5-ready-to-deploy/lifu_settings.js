// SETTINGS. The live hourly run sends; any other run is a test that sends nothing
// and uses two sample conversations so you can read the drafts.
const test = $execution.mode !== 'production';
return [{ json: {
  SEND_FOR_REAL: !test,
  TEST: test,
  MAX_PER_DAY: 20,
  // true = every follow-up sent is also shown in Slack (first weeks). false = Slack only hears about problems.
  TELL_SLACK_EVERY_FOLLOWUP: true,
  WRITE_MODEL: 'anthropic/claude-opus-5.5',
  BOOKING_LINK: 'https://cal.id/mavixmarketing/strategy-call',
  // The only links a follow-up may contain.
  ALLOWED_LINKS: ["https://lnkd.in/p/gMHV49kf", "https://mavixmarketing.com/case-studies", "https://mavixmarketing.com/case-studies/plumbing-company-seo", "https://mavixmarketing.com/case-studies/construction-management-seo", "https://mavixmarketing.com/case-studies/dental-clinic-seo", "https://mavixmarketing.com/case-studies/my-favorite-therapists", "https://mavixmarketing.com/case-studies/orthopaedic-clinic-seo", "https://mavixmarketing.com/case-studies/all-dogs-rock", "https://mavixmarketing.com/case-studies/martial-arts-academy-seo", "https://mavixmarketing.com/case-studies/real-estate-brokerage-seo", "https://mavixmarketing.com/case-studies/financial-advisers-seo", "https://mavixmarketing.com/case-studies/la-vela-coffee", "https://mavixmarketing.com/case-studies/home-goods-retailer-seo", "https://mavixmarketing.com/case-studies/skincare-brand-seo", "https://mavixmarketing.com/case-studies/online-pharmacy-seo", "https://mavixmarketing.com/case-studies/hr-software-seo", "https://mavixmarketing.com/case-studies/edtech-software-seo", "https://mavixmarketing.com/case-studies/exam-prep-platform-seo", "https://mavixmarketing.com/case-studies/freight-forwarding-seo", "https://mavixmarketing.com/seo-pricing", "https://mavixmarketing.com"].concat(['https://cal.id/mavixmarketing/strategy-call']),
} }];

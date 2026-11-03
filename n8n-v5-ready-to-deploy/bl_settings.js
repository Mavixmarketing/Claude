// BACKLINK REPLY AGENT SETTINGS (updated 1 Nov 2026 on Farhan's instruction: full auto-reply).
// Handles ONLY replies to the Instantly campaign "Mavix | Backlink Outreach | Editorial & Partnerships".
// The SEO reply agents ignore farhan@mavixmarketing.com, so the two never touch the same email.
// SEND_FOR_REAL: the live schedule sends replies and adds unsubscribes to the block list.
// Manual test runs never send.
// Rules from Farhan: we never pay for links or placements, and we never do link exchanges.
// Every fact the bot may use is listed below; it may not invent anything else.
const manual = $execution.mode !== 'production';
const B = 'https://mavixmarketing.com';
return [{ json: {
  SEND_FOR_REAL: manual ? false : true,
  CAMPAIGN_ID: 'd773781f-2785-405d-83bc-f14d35e5ae63',
  MAILBOX: 'farhan@mavixmarketing.com',
  LOOKBACK_HOURS: manual ? 336 : 72,
  MAX_PER_RUN: 5,
  MODEL: 'anthropic/claude-opus-5.5',
  SLACK_CHANNEL: 'C0BL2Q14QH5',
  GOAL: [
    'Why we email: Mavix wants relevant, editorial links and mentions from real marketing, business and industry sites,',
    'earned by giving their readers something useful: a free guest article written by our team, an expert quote,',
    'a data point from our sourced statistics reports, one of our free tools or guides as a resource, or a listing.',
    'We never pay for links, sponsored posts or placements, and we never do link exchanges or reciprocal links.',
    'A good outcome: they agree to a guest article or quote, tell us their guidelines and topics, or add our resource.',
  ].join(' '),
  // 4 Nov (Farhan): 500+ clients is the true number, the same as the SEO agents (was "150+ businesses scaled across three countries").
  MAVIX_FACTS: [
    'Mavix Marketing: digital marketing agency, trading since 2019. Offices: Dubai (ASPIN Commercial Tower, 16th Floor, Office 12, Sheikh Zayed Road), Los Angeles (3435 Wilshire Blvd, 14th Floor) and New Delhi.',
    'Website facts: 500+ clients served, $10M+ trackable revenue driven for clients, 30+ specialists all on the payroll (no subcontractors), rated 4.9/5 from 22 published reviews.',
    'Partners: Google Ads Partner, Meta Business Partner, TikTok Marketing Partner, Shopify Partner, Semrush Agency Partner.',
    'Services: SEO (technical, local, ecommerce, content), Google Ads and PPC, Meta and TikTok ads, media buying, email marketing and automation, conversion optimisation, landing pages, tracking, lead generation, website builds.',
    'Principles stated on the site: no bought links, no private blog networks, no fake reviews, no mass-generated pages.',
    'Founder: Mohd Farhan (the sender, signs as Farhan). Blog authors include Aman Mishra.',
    'Case studies (23 on ' + B + '/case-studies), e.g. La Vela Coffee +146% organic clicks in six months; retail Google Ads account 6.74x ROAS; Meta lead gen 2,631 leads at GBP 2.68 each; online home goods retailer 470K organic clicks in 12 months; HR software company 326K organic clicks in 16 months.',
    'Writing samples and resources we can share (all on our own site):',
    '- Blog: ' + B + '/blog (80+ posts)',
    '- Statistics reports with every number sourced: ' + B + '/blog/dental-marketing-statistics-2026, ' + B + '/blog/law-firm-marketing-statistics-2026, ' + B + '/blog/hvac-marketing-statistics-2026, ' + B + '/blog/real-estate-marketing-statistics-2026, ' + B + '/blog/ecommerce-marketing-statistics-2026, ' + B + '/blog/med-spa-marketing-statistics-2026, ' + B + '/blog/plumbing-marketing-statistics-2026, ' + B + '/blog/roofing-marketing-statistics-2026',
    '- Cost guides: ' + B + '/blog/how-much-does-seo-cost, ' + B + '/blog/google-ads-cost-2026, ' + B + '/blog/meta-ads-cost-2026, ' + B + '/blog/email-marketing-cost-2026, ' + B + '/blog/digital-marketing-agency-cost-2026, ' + B + '/blog/small-business-website-cost-2026',
    '- Checklists and templates: ' + B + '/blog/seo-audit-checklist, ' + B + '/blog/local-seo-checklist, ' + B + '/blog/google-ads-audit-checklist, ' + B + '/blog/conversion-audit-checklist, ' + B + '/blog/email-flows-checklist, ' + B + '/blog/marketing-strategy-template, ' + B + '/blog/seo-reporting-template',
    '- Guides: ' + B + '/blog/technical-seo-audit-complete-guide-2026, ' + B + '/blog/how-to-show-up-in-ai-search, ' + B + '/blog/consent-mode-v2-why-google-ads-conversions-dropped, ' + B + '/blog/email-sender-requirements, ' + B + '/guides/link-building-guide, ' + B + '/guides/google-business-profile-guide, ' + B + '/guides/landing-page-guide, ' + B + '/guides/keyword-research-guide',
    '- Free tools: ' + B + '/tools/seo-roi-calculator, ' + B + '/tools/google-ads-roi-calculator, ' + B + '/tools/marketing-budget-calculator, ' + B + '/tools/lead-generation-calculator, ' + B + '/tools/website-audit-tool, ' + B + '/tools/keyword-clustering-tool',
    'Topics we write about: SEO and local SEO (UAE, US, UK), Google Ads and Meta ads costs and audits, conversion tracking and Consent Mode v2, email deliverability and flows, lead generation for service businesses, AI search visibility, industry marketing (dental, law firms, HVAC, plumbing, roofing, med spas, real estate, ecommerce).',
  ].join('\n'),
} }];

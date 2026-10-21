// OPUS WRITES THE LINKEDIN REPLY. Short and human, the same selling rules as the email replies,
// the shared facts, and only the case studies closest to this person's business (picked in the code).
const cfg = $('Settings').first().json;
// CASE STUDIES: the code picks the two or three closest to their business, so the writer only sees those.
const CASES = [
  { k: 'plumbing', t: 'Plumbing company (local trade): went from showing up on google under 200 times a day to about 1,000 times a day in eight weeks.', u: 'https://mavixmarketing.com/case-studies/plumbing-company-seo', w: /plumb|electric|hvac|heating|cooling|air ?con|roof|clean|repair|septic|drain|pest|garage door|locksmith|handyman|landscap|lawn|tree|paint|floor|window|weather|towing|tow\b|mov(ing|ers)|junk|clearance|pool|spa|appliance|carpet|pressure wash|gutter|solar|fenc|concrete|paving|glaz|blind|curtain/ },
  { k: 'construction', t: 'Construction management firm: 9.94K clicks from google in seven months, daily clicks roughly doubled.', u: 'https://mavixmarketing.com/case-studies/construction-management-seo', w: /construct|builder|build|contractor|renovat|remodel|kitchen|bathroom|basement|adu|architect|engineer|deck|cabinet|joinery|carpent|drywall|dry ?lining|scaffold/ },
  { k: 'dental', t: 'Dental clinic: from under 15 clicks a day from google to over 100 a day, 4.58K clicks in six months.', u: 'https://mavixmarketing.com/case-studies/dental-clinic-seo', w: /dent|orthodont|teeth|smile|implant|veneer/ },
  { k: 'therapy', t: 'My Favorite Therapists (therapy practice, Florida): now on the first page of google for its main therapy searches in its own town, and showed up in google searches 99.6K times.', u: 'https://mavixmarketing.com/case-studies/my-favorite-therapists', w: /therap|counsel|psycholog|mental|rehab|clinic|health|medical|doctor|physio|chiro|med ?spa|aesthetic|laser|wellness|nurs|care home|home care|autism|speech|hearing|optom|vet\b|veterin/ },
  { k: 'ortho', t: 'Orthopaedic and sports injury clinic group: clicks from google up 17% in 28 days.', u: 'https://mavixmarketing.com/case-studies/orthopaedic-clinic-seo', w: /orthop|sport|injur|physio|chiro|pain|spine|massage/ },
  { k: 'dogs', t: 'All Dogs Rock (dog daycare and boarding, West Palm Beach): google now brings more of its engaged visitors than paid ads.', u: 'https://mavixmarketing.com/case-studies/all-dogs-rock', w: /dog|pet|groom|kennel|board|tour|travel|safari|taxi|limo|event|wedding|celebrant|photograph|salon|beauty|barber|restaurant|cafe|bakery|hotel|bnb|rental|hire|venue|party/ },
  { k: 'martial', t: 'Martial arts academy (local classes): 1.81K clicks from google in six months, with a page for each class and each nearby area.', u: 'https://mavixmarketing.com/case-studies/martial-arts-academy-seo', w: /martial|karate|bjj|jiu|boxing|gym|fitness|yoga|pilates|dance|studio|class|course|school|lesson|driving|tutor|academy|training|swim|music|climb/ },
  { k: 'realestate', t: 'Real estate brokerage: about 90 clicks a day from google within three months.', u: 'https://mavixmarketing.com/case-studies/real-estate-brokerage-seo', w: /real estate|realtor|estate agent|property|broker|mortgage|letting|realty|homes for sale/ },
  { k: 'finance', t: 'Financial advisory firm: from almost no visits from google to about 7,965 a month.', u: 'https://mavixmarketing.com/case-studies/financial-advisers-seo', w: /account|bookkeep|tax|cpa|financ|advis|law|legal|attorney|solicitor|insur|consult|payroll|cfo|controller|audit firm|wealth|notary|immigration|contracting|dcaa/ },
  { k: 'coffee', t: 'La Vela Coffee (commercial coffee equipment, Miami): clicks from google up 146% in six months, and google started bringing sales for the first time.', u: 'https://mavixmarketing.com/case-studies/la-vela-coffee', w: /coffee|equipment|supplier|wholesale|machine|b2b|distribut|manufactur|industrial|chemical|e-?bike|bike/ },
  { k: 'homegoods', t: 'Online home goods store: 470K clicks from google in 12 months.', u: 'https://mavixmarketing.com/case-studies/home-goods-retailer-seo', w: /shop|store|ecommerce|e-commerce|online|retail|furniture|decor|gift|jewel|cloth|fashion|boutique|organic|salve|herbal|herb|product/ },
  { k: 'skincare', t: 'Skincare brand selling online: clicks from google up 55% in 28 days.', u: 'https://mavixmarketing.com/case-studies/skincare-brand-seo', w: /skin|cosmetic|beauty product|soap|candle|supplement|vitamin|natural/ },
  { k: 'pharmacy', t: 'Online pharmacy: clicks from google went from 7.17K to 12.9K in three months.', u: 'https://mavixmarketing.com/case-studies/online-pharmacy-seo', w: /pharma|drug ?store|chemist/ },
  { k: 'hr', t: 'HR software company: 326K clicks from google in 16 months.', u: 'https://mavixmarketing.com/case-studies/hr-software-seo', w: /software|saas|app\b|platform|hr\b|recruit|staffing|payroll software|tech|it services|it support|computer|web design|digital/ },
  { k: 'edtech', t: 'Education software company: from under 5 clicks a day from google to more than 40.', u: 'https://mavixmarketing.com/case-studies/edtech-software-seo', w: /edtech|education software|e-?learning|lms/ },
  { k: 'exam', t: 'Exam preparation platform: 27K clicks from google in two months.', u: 'https://mavixmarketing.com/case-studies/exam-prep-platform-seo', w: /exam|prep course|test prep|certif|licen[cs]e course|online course/ },
  { k: 'freight', t: 'Freight forwarding consultancy: moved from position 20.6 to 12.6 on google.', u: 'https://mavixmarketing.com/case-studies/freight-forwarding-seo', w: /freight|logistic|shipping|courier|import|export|customs|trucking|transport/ },
];
const DEFAULT_KEYS = ['plumbing', 'therapy', 'dogs'];
function pickCases(text, n) {
  const s = String(text || '').toLowerCase();
  const scored = CASES.map(c => ({ c, n: (s.match(new RegExp(c.w.source, 'g')) || []).length })).filter(x => x.n > 0).sort((a, b) => b.n - a.n).map(x => x.c);
  const out = scored.slice(0, n || 3);
  for (const k of DEFAULT_KEYS) if (out.length < (n || 3) && !out.some(c => c.k === k)) out.push(CASES.find(c => c.k === k));
  return out;
}
const caseLines = list => list.map(c => '- ' + c.t + ' ' + c.u).join('\n');
const caseSent = text => /mavixmarketing\.com\/case-studies\/[a-z]/.test(String(text || '')) || /lnkd\.in\/p\/gMHV49kf/.test(String(text || ''));

// FACTS AND SELLING RULES shared by every writer (email replies, email follow-ups, LinkedIn).
// Farhan's rules from 18 Oct. Change prices or promises here only.
const FACTS = `FACTS YOU MAY USE (only these; never invent anything else)
- Mavix Marketing: SEO agency, running since 2019, 500+ clients served.
- PRICE BEFORE THEY HAVE THE AUDIT: our price is personalised. It depends on how much work their site needs, what they need and their end goal. Farhan sets it after assessing their site, and the price comes with the free audit, so they know it before they decide anything. No setup fee and no long contract. Only if they ask again or insist on a number: our plans run from $349 to $1,699 a month, and most businesses like theirs start on our Growth plan at $549, the plan that comes with the money back promise.
- PRICE AFTER THEY HAVE THE AUDIT: Starter $349, Growth $549, Premium $1,699 a month. Recommend Growth at $549 first: it is the plan with the money back promise and the one most businesses like theirs need. Mention Starter only if money is clearly tight.
- MONEY BACK: a 90 day money back guarantee. We agree a clear target with them before we start, and if we miss it within 90 days, they get their money back plus $1,000 on top from us. It comes with Growth and Premium (Starter has none; say that only if they ask about Starter). Always call it the 90 day money back guarantee, never a 2 month or 3 month promise. Use this when they worry about risk, results or wasting money, or when it helps them decide.
- HOW WE WORK (use when they ask how it works, worry about agencies, or are close to deciding): they get their own business manager and SEO manager, a shared channel between their team and ours, a weekly update and a monthly meeting, so nothing gets missed. Reports are simple: before, after, and what it brought them. No confusing reports.
- NO LONG CONTRACT: we never tie clients into a long contract, because we know we can deliver. Our agreement has no time limit; the only thing it ties is us, to deliver.
- SEO TAKES TIME, AND THAT IS WHY IT PAYS: nobody can honestly guarantee a position on google, and SEO usually takes 3 to 6 months to build. But once it works it keeps bringing customers without paying for every click. Ads stop the day you stop paying and keep getting more expensive. SEO and ads work well together: ads for now, SEO for the long run and as a safety net when ad costs rise or budgets get cut.
- SHOW THE VALUE WITH NUMBERS when it helps: use a rough, typical figure for what one customer or job is worth for their kind of business in their city, state or country (say it as a rough figure, for example "a new boiler install in leeds is often around £2,500"), then compare it with what SEO costs, and do the arithmetic correctly (one booking of $2,999 a month is $35,988 a year, not more). Before the audit, compare value only, never our price. Never present a rough figure as a fact about them, and never promise a number of customers.
- NEVER SAY NO TO A BUSINESS: we never turn anyone away and never make them feel we cannot handle it, are not a good fit, or that it is not worth it for them. Even if they are fully booked or happy with ads, things change (ad costs rise, budgets get cut, a busy season ends), so having google bring customers is how they stay prepared. Only Farhan decides who we do not work with; if a business seems risky (crypto recovery, gambling, adult, chemicals, weapons, loans), still answer normally and flag "check this business before the audit: <why>".
- NO PAY ON RESULTS: we never offer pay per lead, pay per call or appointment, commission, pay after results or any performance-only deal, for SEO or anything else, and we never switch someone to ads, lead generation or any other service to make that work. SEO cannot be paid that way: google decides rankings and it takes 3 to 6 months to build. If they ask for it: say kindly, once, that SEO doesn't work that way, and that our way of taking the risk is the clear target we agree up front, with their money back plus $1,000 if we miss it (Growth and Premium). If they insist again on paying only for results, do not write (send false) and say "wants pay on results only, Farhan to decide".
- Prices are always in US dollars.`;

const SYSTEM = `You reply on LinkedIn for Mavix Marketing, from the owner's personal account, to people who answered our LinkedIn outreach about SEO. Write as "I" and "we", like a real person typing a quick message on their phone. Never state your own name or mention Farhan. If they ask who you are: "I run Mavix Marketing." You decide everything yourself; never say you'll check or get back on something you can answer now.

WHAT THEY WERE SENT BEFORE (so you understand short replies)
We liked and commented on their latest post, connected, then sent: 1. "Hey {first name}, are you doing any SEO for {company}?" 2. A day later, a firm in Dublin went from a flat line on Google to 9,940 website visitors in five months, no ads; "would that be useful?" 3. The report from that firm: https://lnkd.in/p/gMHV49kf 4. A short nudge. 5. "If you ever want me to look at the {company} website, just send the link. It is free." 6 and 7, about one and two months later: "how are things going" check-ins, which can land mid-conversation (treat a reply to them as a fresh start). Our profile tells people to message "SEO" for a free website check.
A one word reply answers our last message: "yes" or "no" to message 1 means they do or don't do SEO; "seo" alone means yes to the free check. If they mention our comment on their post, answer naturally; never bring it up yourself. If our messages are clearly from a different, non-SEO campaign, set send to false and flag "reply belongs to a different campaign".

HOW TO REPLY
- Read the whole chat. Answer what they asked first, then one step toward the free check (we also call it the free audit). Never ask for something they already told us.
- 1 to 3 short sentences, 45 words at most. Normal capitals and contractions, no greeting, no sign-off, no em dashes, no exclamation marks, no bullet points. Simple everyday words, no jargon. Never the words AI, automated or automation, except "AI search".
- When they push back or doubt something, agree with what is fair in it first, then answer. If the reason for a question isn't obvious, add a few words on why you ask ("only asking because...").
- At most one question, last. Make it easy: offer two or three likely options for their business so they can just pick one.
- One useful, specific detail about them (their service, city or customers, from what you're given) beats a general line. Never flatter or comment on their profile.

BY SITUATION (write your own words)
- "Yes" to message 1: they do SEO; ask lightly whether it's in house or an agency, and whether it's bringing enquiries.
- They have someone: that's fine, never criticise. Offer the free check once as a second opinion they can hand to their team. If they decline again: one warm line of thanks and stop.
- "No" or "not really" to message 1: ask lightly whether it hasn't been a priority or didn't work before.
- "Tried it, didn't work": offer a free look and the first thing we'd fix; mention we agree a clear target up front and the money back promise if it fits.
- "seo", "yes, take a look", "interested": ask which services they want more enquiries for (offer likely options). Never ask for their website.
- They told us the services: "Great, I'll start on the audit and send it over when it's ready." Offer the booking link {{BOOKING}} once, as an option, saying it's not a pitch. Flag "prepare the audit for <website, or 'website not known, please find it'>, focus <services>".
- Price, results, guarantee, "later" or "next year", "how does it work", "can't afford it", "fully booked": follow the facts below (personalised price, range only if they insist, Growth at $549 after the audit, money back plus $1,000, how we work, no long contract, SEO vs ads, value with rough numbers, never say no). For "later": give one solid reason waiting costs them and offer the free check now; put any date in the flag.
- They want a call or WhatsApp: USA or Canada +1 510 312 5086 (calls only); everyone else +971 56 632 0456 (calls and WhatsApp); if unsure give both. Booking link as the other option. If they give their number, say "I'll give you a call" and flag "call <name> on <number>".
- "Who are you" / "what's this about": I run Mavix Marketing, we do SEO for small businesses; I was curious how {company} gets enquiries from Google.
- "How did you get my details": we came across their profile on LinkedIn while looking for businesses like theirs. No pitch.
- "Not the right person": thank them and ask who is; flag any name.
- The audit was already promised or sent: answer like a person, don't restart.

WHEN NOT TO WRITE (send false, reply "", reason in the flag)
- They ask for ads, a website build, social media or anything that isn't SEO: flag "asks for <what>, not SEO".
- They ask whether this is a bot or written by a person: flag "asked if this is a bot".
- Nothing useful can be said.

NEVER: ask for their website or a link; invent clients, numbers or results; change a price or promise; send a link already sent in the chat; more than one link per message (only links given to you); mention the Dublin firm's name (say "the firm in Dublin"; it's a construction management firm only if they ask).

${FACTS}

Return JSON only: {"send": true, "reply": "the message text, paragraphs separated by \\n\\n", "flag": ""}
flag is a short, clear action for Farhan when he must do something or needs to know what was agreed, else "".`.split('{{BOOKING}}').join(cfg.BOOKING_LINK);
return $input.all().map(it => {
  const c = it.json;
  const about = [c.job_title, c.company, c.headline, c.bio, c.company_overview, c.site_summary].filter(Boolean).join('\n');
  const theirs = String(c.transcript || '').split(/\n\n(?=(?:THEM|US)[ (:])/).filter(b => /^THEM/.test(b)).join('\n') + '\n' + about;
  const cases = 'CASE STUDIES you may use (closest first; say the result in plain words, then the link; never change a number):' + (caseSent(c.transcript) ? '\nA case study link was already sent in this chat, so do not send another one.' : '') + '\n' + caseLines(pickCases(theirs, 3)) + '\nThe firm in Dublin (construction management): about 406,000 times shown on Google and 9,940 clicks in about five months, no ads. https://lnkd.in/p/gMHV49kf\nAll results, client videos and reviews: https://mavixmarketing.com/case-studies';
  const user = 'Their linkedin profile: ' + c.lead_url + (c.first_name ? '\nTheir first name: ' + c.first_name : '') + (c.job_title ? '\nTheir job: ' + c.job_title : '') + (c.company ? '\nTheir company: ' + c.company : '') + (c.website_guess ? '\nTheir website (from their profile): ' + c.website_guess : '\nTheir website: not known (never ask for it; flag it instead)') + (c.headline ? '\nTheir linkedin headline: ' + c.headline : '') + (c.bio ? '\nTheir linkedin about section: ' + c.bio : '') + (c.company_overview ? '\nAbout their company: ' + c.company_overview : '') + (c.site_summary ? '\nWhat their website home page says:\n' + c.site_summary : '') +
    (c.campaign ? '\nProsp campaign: ' + c.campaign : '') +
    '\n\n' + cases +
    '\n\nThe whole conversation (oldest first):\n\n' + c.transcript + '\n\nWrite the reply to their newest message.';
  return { json: { ...c, opus_body: JSON.stringify({
    model: cfg.WRITE_MODEL,
    max_tokens: 4000,
    reasoning: { effort: 'medium' },
    messages: [
      { role: 'system', content: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }] },
      { role: 'user', content: user },
    ],
  }) } };
});

// OPUS WRITES THE FOLLOW-UP (or decides not to send one). The core rules, the shared facts, and only
// the two or three case studies closest to this business (picked here in the code).
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
- PRICE BEFORE THEY HAVE THE AUDIT: our price is personalised. It depends on how much work their site needs, what they need and their end goal. Farhan sets it after assessing their site, and the price comes with the free audit, so they know it before they decide anything. No setup fee and no long contract. Only if they ask again or insist on a number: our plans run from $349 to $1,649 a month, and most businesses like theirs start on our Growth plan at $549, the plan that comes with the money back promise.
- PRICE AFTER THEY HAVE THE AUDIT: Starter $349, Growth $549, Premium $1,649 a month. Recommend Growth at $549 first: it is the plan with the money back promise and the one most businesses like theirs need. Mention Starter only if money is clearly tight.
- MONEY BACK: a 90 day money back guarantee. We agree a clear target with them before we start, and if we miss it within 90 days, they get their money back plus $1,000 on top from us. It comes with Growth and Premium (Starter has none; say that only if they ask about Starter). Always call it the 90 day money back guarantee, never a 2 month or 3 month promise. Use this when they worry about risk, results or wasting money, or when it helps them decide.
- HOW WE WORK (use when they ask how it works, worry about agencies, or are close to deciding): they get their own business manager and SEO manager, a shared channel between their team and ours, a weekly update and a monthly meeting, so nothing gets missed. Reports are simple: before, after, and what it brought them. No confusing reports.
- NO LONG CONTRACT: we never tie clients into a long contract, because we know we can deliver. Our agreement has no time limit; the only thing it ties is us, to deliver.
- SEO TAKES TIME, AND THAT IS WHY IT PAYS: nobody can honestly guarantee a position on google, and SEO usually takes 3 to 6 months to build. But once it works it keeps bringing customers without paying for every click. Ads stop the day you stop paying and keep getting more expensive. SEO and ads work well together: ads for now, SEO for the long run and as a safety net when ad costs rise or budgets get cut.
- SHOW THE VALUE WITH NUMBERS when it helps: use a rough, typical figure for what one customer or job is worth for their kind of business in their city, state or country (say it as a rough figure, for example "a new boiler install in leeds is often around £2,500"), then compare it with what SEO costs, and do the arithmetic correctly (one booking of $2,999 a month is $35,988 a year, not more). Before the audit, compare value only, never our price. Never present a rough figure as a fact about them, and never promise a number of customers.
- NEVER SAY NO TO A BUSINESS: we never turn anyone away and never make them feel we cannot handle it, are not a good fit, or that it is not worth it for them. Even if they are fully booked or happy with ads, things change (ad costs rise, budgets get cut, a busy season ends), so having google bring customers is how they stay prepared. Only Farhan decides who we do not work with; if a business seems risky (crypto recovery, gambling, adult, chemicals, weapons, loans), still answer normally and flag "check this business before the audit: <why>".
- NO PAY ON RESULTS: we never offer pay per lead, pay per call or appointment, commission, pay after results or any performance-only deal, for SEO or anything else, and we never switch someone to ads, lead generation or any other service to make that work. SEO cannot be paid that way: google decides rankings and it takes 3 to 6 months to build. If they ask for it: say kindly, once, that SEO doesn't work that way, and that our way of taking the risk is the clear target we agree up front, with their money back plus $1,000 if we miss it (Growth and Premium). If they insist again on paying only for results, do not write (send false) and say "wants pay on results only, Farhan to decide".
- WE ARE SELECTIVE: we only take on businesses we are confident we can get results for. That is why we look at their site first (the audit) and agree a clear target before we start. Say it when it builds trust. It is never a reason to turn anyone away: never tell anyone they are not a fit.
- Prices are always in US dollars.`;

const SYSTEM = `You write follow-up emails for Mohd Farhan, owner of Mavix Marketing (an SEO agency), to people who replied to his cold email, got an answer from us, and then went quiet. Write as "I" and "we". Never mention Farhan by name.

OUR PROCESS: the cold email offers a free audit of their website. When they say yes, we ask what they want more of. When they tell us, we say we'll start preparing the audit; Farhan builds it and sends it by hand (lines starting FARHAN), usually the same day. We never follow up while we owe them the audit.

FIRST DECIDE IF A FOLLOW-UP MAKES SENSE. Return send false when:
- they said no, not now with no date, or asked to stop
- they booked a call, or said they will come back to us on a date that hasn't come yet
- the conversation clearly came to an end (for example we thanked them after a second no)
- our last answer promised the audit and Farhan hasn't sent it yet (we're the ones they are waiting on)
- they asked us something we haven't answered yet (flag it instead in "why")
- there's nothing new and useful left to say: close the loop instead of chasing

THEY ALREADY HAVE SOMEONE (another agency, an in-house person, happy with their current setup): that is not a no. Never criticise who they use. Follow-ups 1 and 2: offer the free audit once more as a second opinion they can hand to their own people, short and light. If the input says THIS IS THE 3-MONTH CHECK-IN: one or two friendly lines asking how things are going with their current setup, and whether a fresh second opinion would help now. No pitch, no link.

WHERE THEY ARE
A. We offered the audit and they haven't said yes: give them one solid, specific reason it's worth a word back.
B. They said yes but haven't told us what they want more of: ask again in an easier way, offering two or three likely options for their kind of business so they can just pick one.
C. Farhan sent the audit or a proposal: never offer the audit again and never repeat what he wrote.
   - The first follow-up after it: ask whether they've had a chance to look at the audit and whether anything in it raised a question, and name the one first thing we'd fix for them, in plain words.
   - Later ones: make the next step obvious and small, for example "would you like me to send the scope and start steps for the Growth plan?" Use the facts below when they help: Growth at $549 with the money back promise, how we work (their own business manager and SEO manager, a shared channel, weekly updates, a monthly meeting, simple before and after reports), and no long contract.

EVERY FOLLOW-UP
- Bring one new, specific, useful thing each time, never the same point twice: something about how people search for a business like theirs, what a result means for them in calls and customers, a value comparison with rough numbers for their kind of business and area, why SEO pays off over ads in the long run, or the case study. One thing, said well.
- A case study only once in the whole conversation (the closest one given below, with its link). If one was already sent, never send another.
- Don't repeat a reassurance already used ("nothing to prepare", "a few words is enough", "reply go").
- Mention AI search (ChatGPT, Google AI results) only if it truly fits this business; never as a filler.
- At most one question, easy to answer, in its own last paragraph.

FOLLOW-UP NUMBER N (N is given; the angle changes each time):
- N 1 (a few hours after our last email): one or two short lines that make answering our last question easier, for example by offering the likely answer so they only confirm it. No link.
- N 2 (the next day): the closest case study with its result in plain words, tied to their business. In stage C, follow the stage C rule instead.
- N 3: a different, useful angle for their kind of business, ideally with rough numbers on what one more customer is worth to them.
- N 4: one more solid reason to act: how SEO keeps bringing customers after ads stop, or how we work and report, whichever fits them best.
- N 5 (a week after N 4, the last one for now): say plainly this is your last email for a while because you don't want to keep filling their inbox, and end with one very easy question they can answer in a word or two, for example "Is this still something you want to look at, or should I close your file for now?" or "Is it a no for now, or is it just not the right time?" No link, no case study.
- N 6 (about a month later): one light, friendly line that reopens the conversation, with their first name and business name if known. No pitch, no link. 25 words at most.
- N 7 (about two months later): one short, useful idea for their business at this time of year. No pitch, no link. 30 words at most.
- N 8 (about three months later): one short question about how the year is going for their business. No pitch, no link. 25 words at most. The last one.

FARHAN'S OWN NOTE: if the input has a line starting FARHAN ASKED FOR THIS FOLLOW-UP, he has decided this one should go out: follow his note and write it (send true), even if they said no or the chat seemed finished. Only hold it if they asked us to stop emailing or to unsubscribe.

DATE FOLLOW-UP: if this is a date follow-up, they asked us to come back around that date. Ignore the N jobs. Remind them of the earlier chat in one line and do what they asked (for example offer the audit they wanted then). 70 words at most.

NEVER
- Never ask for their website, their link or their address, in any words.
- Never suggest a call or a meeting, and never include a booking link.
- Never give a price before they have the audit. After the audit, only the prices in the facts below.
- Never write "just following up", "bringing this back", "checking in" or "top of your inbox".
- Never contradict or undo what Farhan wrote by hand (FARHAN lines). If he offered a call, a time or anything else, go along with it.
- Never invent anything: use only the conversation, the glimpse of their home page, the facts and the case studies given. Never change a number. Label rough job values as rough.
- Never criticise their website or point out mistakes, and never suggest we can't help them or that it isn't worth it for them.

STYLE: like a real business owner typing a short, clear email. Normal capital letters and punctuation, contractions are fine. No greeting and no sign-off. Very simple everyday words for a busy owner reading on a phone ("show up on Google", "more calls", "your home page"; no jargon). No em dashes, no exclamation marks, no bullet points. Never pushy, no fake urgency. Usually 30 to 70 words, in two or three short paragraphs with a blank line between them.

${FACTS}

Return JSON only: {"send": true, "reply": "the follow-up text", "why": "one short reason, naming the stage A, B or C"}`;
return $input.all().map(it => {
  const c = it.json;
  const transcript = String(c.transcript || '');
  const theirs = transcript.split(/\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/).filter(b => /^THEM/.test(b)).join('\n') + '\n' + String(c.site_notes || '') + '\n' + String(c.email || '').split('@')[1];
  const cases = 'CASE STUDIES you may use (closest first; say the result in plain words, then the link; never change a number):' + (caseSent(transcript) ? '\nA case study link was already sent in this conversation, so do not send another one.' : '') + '\n' + caseLines(pickCases(theirs, 3)) + '\nAll results, client videos and reviews: https://mavixmarketing.com/case-studies';
  return { json: { ...c, opus_body: JSON.stringify({
    model: cfg.WRITE_MODEL,
    max_tokens: 3000,
    reasoning: { effort: 'medium' },
    messages: [
      { role: 'system', content: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }] },
      { role: 'user', content: 'Their email: ' + c.email + (c.first_name ? '\nTheir first name: ' + c.first_name : '') + (c.farhan_note ? '\nFARHAN ASKED FOR THIS FOLLOW-UP: ' + c.farhan_note : c.has_someone ? '\nTHIS IS THE 3-MONTH CHECK-IN: they told us they already work with someone.' : c.date_followup ? '\nTHIS IS A DATE FOLLOW-UP: they asked us to come back to them around ' + c.follow_up_on + '.' : '\nFollow-up number N = ' + c.number) + ' (they have been quiet ' + c.days_quiet + ' days since our last email).\n\n' + cases + '\n\nConversation so far (oldest first):\n\n' + transcript + (c.site_notes ? '\n\nA QUICK GLIMPSE OF THEIR HOME PAGE:\n' + c.site_notes : '\n\nWe have no notes on their website.') },
    ],
  }) } };
});

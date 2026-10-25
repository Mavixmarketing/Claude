// OPUS WRITES THE LINKEDIN REPLY. Short and human, the same selling rules as the email replies,
// the shared facts, and only the case studies closest to this person's business (picked in the code).
const cfg = $('Settings').first().json;
// CASE STUDIES: the code picks the two or three closest to their business, so the writer only sees those.
const CASES = [
  { k: 'plumbing', t: 'Plumbing company (local trade): went from showing up on google under 200 times a day to about 1,000 times a day in eight weeks.', u: 'https://mavixmarketing.com/case-studies/plumbing-company-seo', w: /plumb|electric|hvac|(?<!c)heating|cooling|air ?con|(?<!p)roof|clean|repair|septic|drain|(?<!chea)(?<!buda)pest|garage door|locksmith|handyman|landscap|lawn|(?<!s)tree|paint|floor|window|weather|towing|tow\b|(?<!re)mov(ing|ers)(?! (forward|on|ahead)\b)|junk(?! ?mail)|clearance|(?<!liver)pool|spas?(?![a-z])|appliance|carpet|pressure wash|gutter|solar|fenc|concrete|paving|glaz|blind(?! spot)|curtain/ },
  { k: 'construction', t: 'Construction management firm: 9.94K clicks from google in seven months, daily clicks roughly doubled.', u: 'https://mavixmarketing.com/case-studies/construction-management-seo', w: /construct(?!ive)|builders?|building (company|contractor|firm|work|services|projects?)|contractor|renovat|remodel|kitchen(?!er)|bathroom|basement|\badus?\b|architect(?!ure)|architecture (firm|practice|studio)|engineer|(?<!(pitch|slide) )deck|cabinet|joinery|carpent|drywall|dry ?lining|scaffold/ },
  { k: 'dental', t: 'Dental clinic: from under 15 clicks a day from google to over 100 a day, 4.58K clicks in six months.', u: 'https://mavixmarketing.com/case-studies/dental-clinic-seo', w: /dental|dentist|denture|orthodont|teeth|smile|implant|veneer/ },
  { k: 'therapy', t: 'My Favorite Therapists (therapy practice, Florida): now on the first page of google for its main therapy searches in its own town, and showed up in google searches 99.6K times.', u: 'https://mavixmarketing.com/case-studies/my-favorite-therapists', w: /therap|counsel|psycholog|\bmental|rehab|clinic|health|medical|doctor|physio|chiro|med ?spa|aesthetic|laser|wellness|nurs|care home|home care|autism|speech|hearing(?! (from|back|about|more)\b)|optom|\bvets?\b|veterin/ },
  { k: 'ortho', t: 'Orthopaedic and sports injury clinic group: clicks from google up 17% in 28 days.', u: 'https://mavixmarketing.com/case-studies/orthopaedic-clinic-seo', w: /orthop|(?<!tran)(?<!pas)sport|injur|physio|chiro|(?<!s)pain(?!t|ful|ed)|spine|massage/ },
  { k: 'dogs', t: 'All Dogs Rock (dog daycare and boarding, West Palm Beach): google now brings more of its engaged visitors than paid ads.', u: 'https://mavixmarketing.com/case-studies/all-dogs-rock', w: /dog|(?<!com)(?<!re)(?<!car)(?<!trum)(?<!pup)pet(?!er|it|e|ition|rol)|groom|kennel|(?<!on)(?<!on )(?<!dash)(?<!key)(?<!cup)(?<!white)(?<!bill)board(?!room)|(?<!de)(?<!con)tour|travel|safari|taxi|limo|(?<!pr)event(?!ual)|wedding|celebrant|photograph|salon|beauty|barber|restaurant|cafe(?!teria)|bakery|hotel|bnb|rental|hire (company|business|services?)|(car|van|equipment|party|marquee|plant|tool|bike|boat|coach|minibus|dress|suit) ?hire|(?<!re)(?<!a)venue|(?<!third[- ])party/ },
  { k: 'martial', t: 'Martial arts academy (local classes): 1.81K clicks from google in six months, with a page for each class and each nearby area.', u: 'https://mavixmarketing.com/case-studies/martial-arts-academy-seo', w: /martial|karate|bjj|jiu|boxing|gym|fitness|yoga|pilates|(?<!gui)(?<!accor)(?<!atten)(?<!abun)(?<!avoi)(?<!ascen)(?<!redun)dance|studio|(?<!de)(?<!world[- ])class(?!ic|y|ified)|(?<!of )course|(?<!old[- ])school|lesson|driving(?! (more|traffic|calls|customers|leads|results|sales|growth|business|visitors|enquiries|bookings)\b)|tutor(?!ial)|academy|training|swim|music|climb/ },
  { k: 'realestate', t: 'Real estate brokerage: about 90 clicks a day from google within three months.', u: 'https://mavixmarketing.com/case-studies/real-estate-brokerage-seo', w: /real estate|realtor|estate agent|property|broker|mortgage|letting(?! (you|me|us|them|it|go|people)\b)|realty|homes for sale/ },
  { k: 'finance', t: 'Financial advisory firm: from almost no visits from google to about 7,965 a month.', u: 'https://mavixmarketing.com/case-studies/financial-advisers-seo', w: /accountan|accounting|bookkeep|(?<!syn)tax(?!i|onom)|cpa|financ|advis(or|ory|er)|(?<!f)(?<!c)(?<!un)(?<!out)(?<!by)law(?!n|ful)|legal|attorney|solicitor|insur|consult(?!ation)|payroll|cfo|controller|audit firm|(?<!common)wealth|notary|immigration|contracting|dcaa/ },
  { k: 'coffee', t: 'La Vela Coffee (commercial coffee equipment, Miami): clicks from google up 146% in six months, and google started bringing sales for the first time.', u: 'https://mavixmarketing.com/case-studies/la-vela-coffee', w: /coffee|equipment|supplier|wholesale|machine|\bb2b\b|distribut|manufactur|industrial|chemical|e-?bike|bike/ },
  { k: 'homegoods', t: 'Online home goods store: 470K clicks from google in 12 months.', u: 'https://mavixmarketing.com/case-studies/home-goods-retailer-seo', w: /(?<!work)(?<!bi)(?<!barber)shop|(?<!re)store(?!y)|ecommerce|e-commerce|online ?(store|shop|boutique|retail)|retail|furniture|decor|gift|jewel|cloth|(?<!old)(?<!old-)fashion|boutique|organic(?! (traffic|search|results|rankings?|visits|clicks|growth|seo|reach)\b)|salve|herbal|herb|product(?!ion|iv)/ },
  { k: 'skincare', t: 'Skincare brand selling online: clicks from google up 55% in 28 days.', u: 'https://mavixmarketing.com/case-studies/skincare-brand-seo', w: /(?<!a)(?<!bu)(?<!ma)skin|cosmetic|beauty product|soap|candle|supplement(?!a)|vitamin|natural(?!ly)/ },
  { k: 'pharmacy', t: 'Online pharmacy: clicks from google went from 7.17K to 12.9K in three months.', u: 'https://mavixmarketing.com/case-studies/online-pharmacy-seo', w: /pharma|drug ?store|chemist(?!ry)/ },
  { k: 'hr', t: 'HR software company: 326K clicks from google in 16 months.', u: 'https://mavixmarketing.com/case-studies/hr-software-seo', w: /software|saas|(?<!whats)app\b|platform|\bhr\b|recruit|staffing|payroll software|tech(?!ni|nobab)|it services|it support|computer|web design|digital/ },
  { k: 'edtech', t: 'Education software company: from under 5 clicks a day from google to more than 40.', u: 'https://mavixmarketing.com/case-studies/edtech-software-seo', w: /edtech|education software|e-?learning|\blms\b/ },
  { k: 'exam', t: 'Exam preparation platform: 27K clicks from google in two months.', u: 'https://mavixmarketing.com/case-studies/exam-prep-platform-seo', w: /exam(?!ple|in)|prep course|test prep|certif(?!ied)|licen[cs]e course|online course/ },
  { k: 'freight', t: 'Freight forwarding consultancy: moved from position 20.6 to 12.6 on google.', u: 'https://mavixmarketing.com/case-studies/freight-forwarding-seo', w: /freight|logistic|shipping|courier|import(?!an)|export|customs|trucking|transport/ },
];
// 25 Oct (Farhan): case studies are used at more stages now (see UNSPOKEN WORRIES): one per message, never the same
// one twice in a conversation. The code finds the ones our earlier messages already sent (never theirs) and offers
// only the others: the closest to their business, or, when nothing is close, our strongest three.
// The firm in Dublin's LinkedIn post (lnkd.in/p/gMHV49kf) is the construction management case study.
const STRONGEST_KEYS = ['homegoods', 'hr', 'construction'];
const caseSlug = u => { const s = String(u || '').toLowerCase(); const m = s.match(/mavixmarketing\.com\/case-studies\/([a-z0-9-]+)/); return m ? m[1] : /lnkd\.in\/p\/gmhv49kf/.test(s) ? 'construction-management-seo' : ''; };
function casesSent(transcript) {
  const out = new Set();
  for (const b of String(transcript || '').split(/\n\n---\n\n|\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:·])/)) {
    if (/^\s*THEM/.test(b)) continue;
    for (const u of b.match(/https?:\/\/[^\s)<>"]+|lnkd\.in\/p\/\w+/gi) || []) { const k = caseSlug(u); if (k) out.add(k); }
  }
  return out;
}
function pickCases(text, n, sent) {
  const s = String(text || '').toLowerCase();
  const fresh = c => !(sent && sent.has(caseSlug(c.u)));
  const close = CASES.map(c => ({ c, n: (s.match(new RegExp(c.w.source, 'g')) || []).length })).filter(x => x.n > 0 && fresh(x.c)).sort((a, b) => b.n - a.n).map(x => x.c).slice(0, n || 3);
  const strong = close.length ? [] : STRONGEST_KEYS.map(k => CASES.find(c => c.k === k)).filter(fresh);
  return { close, strong };
}
const caseLines = list => list.map(c => '- ' + c.t + ' ' + c.u).join('\n');
// 25 Oct (Farhan): match case studies on everything we know about the business: their words, our replies (they name
// the business and its services, e.g. "719 Cleaning Company", "roofing in Plano"), Farhan's notes, the glimpse of their
// site and their email domain. Our sentences that describe a case study are left out, so they never steer the match.
const CASE_TALK = /mavixmarketing\.com\/case-studies|lnkd\.in\/|\bwe (helped|worked with)\b|closest work|case stud|one of our strongest|clicks from google|times a day/i;
function aboutBusiness(transcript) {
  return String(transcript || '').split(/\n\n---\n\n|\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:·])/).map(b => /^\s*THEM/.test(b) ? b : b.split(/(?<=[.?!])\s+|\n+/).filter(x => !CASE_TALK.test(x)).join(' ')).join('\n');
}
// the CASE STUDIES part of the message: what was already sent, then the closest (or the strongest) of the rest
function caseBlock(transcript, theirs, intro, tail) {
  const sent = casesSent(transcript);
  const p = pickCases(theirs, 3, sent);
  const was = CASES.filter(c => sent.has(caseSlug(c.u))).map(c => c.k === 'construction' ? c.u + ' (the same firm as the firm in Dublin report, https://lnkd.in/p/gMHV49kf)' : c.u);
  return intro + ' One case study per message at most, and never one already sent in this conversation.' +
    (was.length ? '\nAlready sent in this conversation, never send these again: ' + was.join(', ') : '') +
    (p.close.length ? '\nClosest to their business (use the first unless another fits better; you may call it the closest work to theirs):\n' + caseLines(p.close)
      : p.strong.length ? '\nNone of our case studies is close to their business, so use one of our strongest. Call it one of our strongest results, never "the closest work to yours", never "same work" and never as if it were their kind of business:\n' + caseLines(p.strong)
      : '\nEvery case study that fits was already sent, so send no case study.') + (tail || '');
}

// PRICES BY CAMPAIGN (23 Oct). Every AI Written campaign has the new prices; every other campaign
// (USA/Canada, Aus/UK/NZ/Sing and the older lists) and LinkedIn keep the old prices. A price we already
// quoted to someone earlier in the conversation is always honoured: if our earlier messages show a
// price from one list, the whole conversation stays on that list. Keep this block the same in
// email_opus_request.built.js, fu_request.built.js and li_opus.built.js; the checkers use the same rules.
// 25 Oct: EVERY AI Written campaign has the new prices, old and archived ones too. A campaign counts as AI Written
// when its id is in this list (all of them in SalesBlink on 25 Oct) OR its name has "ai written" in it (any case).
const AI_WRITTEN_SEQUENCES = [
  '38eb9458-6fd2-48e8-be34-fd88e328a183', // Ai Written - | State = Email Body | City = Subject Line | Mon - Wed - Fri
  '8aff816b-160b-4d86-8b2d-fc82d869958d', // AI Written Email USA
  'eb4c854b-ecaa-4119-a6c2-4b463c073784', // SEO | Ai Written
  '9a70eae6-ea80-4599-8e4e-88223e7e9788', // SEO | AI Written
  '4ac77a36-c3a6-44bd-9865-74d3c7786c36', // AI Written Email Canada
  'c014f62a-e4d6-44ac-9c82-0105e50c12ac', // AI Written Email UK
  '127730cc-429e-449e-9d0c-49035c033046', // AI Written Email Australia
  'd40c29d0-5108-46b6-b431-3ec8ca561fa4', // AI Written Email Europe
  '1483e867-0c22-45ce-b18d-999454da91e3', // Ai Written E-mails
];
const AI_WRITTEN_NAME = /\bai[\s_-]*written\b/i;
const isAiWritten = (id, name) => AI_WRITTEN_SEQUENCES.includes(String(id || '').trim()) || AI_WRITTEN_NAME.test(String(name || ''));
const PRICE_SETS = {
  old: { name: 'old', starter: '$349', growth: '$549', premium: '$1,649', nums: [349, 549, 1649] },
  new: { name: 'new', starter: '$999', growth: '$1,349', premium: '$1,999', nums: [999, 1349, 1999] },
};
const PRICE_SENT = /(a|per) month|\/mo\b|monthly|\bplans?\b|our (price|fee)|we charge|(starts?|starting|ranges?) (at|from)|\b(starter|growth|premium)\b/i;
const VALUE_SENT = /worth|\bjob|customer|booking|install|patient|client|often around|roughly|typical|usually around/i;
// every plan price we have ever used: found in any sentence of ours, even next to a rough job value
const KNOWN_PRICES = [349, 549, 799, 1099, 1649, 1699, 999, 1349, 1999];
// dollar amounts in the price sentences of OUR earlier messages (never theirs, never rough job values)
function quotedPrices(transcript) {
  const found = new Set();
  const blocks = String(transcript || '').split(/\n\n---\n\n|\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:·])/);
  for (const b of blocks) {
    if (/^\s*THEM/.test(b)) continue;
    for (const sent of b.split(/(?<=[.?!])\s+|\n+/)) {
      if (!PRICE_SENT.test(sent)) continue;
      const value = VALUE_SENT.test(sent);
      for (const v of sent.match(/\$\s*[\d,]+/g) || []) { const d = Number(v.replace(/[^\d]/g, '')); if (d >= 100 && d !== 1000 && (!value || KNOWN_PRICES.includes(d))) found.add(d); }
    }
  }
  return [...found];
}
function pricesFor(sequence, sequenceName, transcript, forceOld) {
  const quoted = quotedPrices(transcript);
  const hits = k => PRICE_SETS[k].nums.filter(d => quoted.includes(d)).length;
  let set;
  if (hits('old') || hits('new')) set = hits('new') > hits('old') ? PRICE_SETS.new : PRICE_SETS.old;
  else if (forceOld) set = PRICE_SETS.old;
  else {
    set = isAiWritten(sequence, sequenceName) ? PRICE_SETS.new : PRICE_SETS.old;
  }
  const fmt = d => '$' + String(d).replace(/(\d)(\d{3})$/, '$1,$2');
  const lines = ['PRICES FOR THIS CONVERSATION (US dollars a month; prices depend on the campaign this person came from, so use only these numbers):',
    '- Before they have the audit: the price is personalised (see the price rules in the facts). Only if they ask again or insist on a number: "it ranges from ' + set.starter + ' to ' + set.premium + ' a month", and most clients start on our Growth plan at ' + set.growth + ', the plan that comes with the 90 day money back guarantee.',
    '- After they have the audit: Starter ' + set.starter + ' (no money back guarantee), Growth ' + set.growth + ' (the plan we recommend and where most clients start, with the 90 day money back guarantee), Premium ' + set.premium + ' (also with the 90 day money back guarantee).',
    '- MONEY BACK GUARANTEE: only Growth and Premium come with it. Starter (' + set.starter + ') has none. When the price in play is the Starter price (for example ' + set.starter + ' was quoted to them), never mention the guarantee or the $1,000 unless they ask about it; if they ask, say honestly that Starter has no money back guarantee and that Growth (' + set.growth + ') has it.',
    quoted.length ? '- ALREADY QUOTED to this person earlier in the conversation: ' + quoted.map(fmt).join(', ') + '. Keep to it: use the same number if price comes up, never contradict it, never put a different price next to it, and never say our prices changed or differ for anyone else.' : '- No price has been quoted to this person yet.'];
  return { price_set: set.name, price_nums: set.nums, prices_quoted: quoted, prices_block: lines.join('\n') };
}

// FACTS AND SELLING RULES shared by every writer (email replies, email follow-ups, LinkedIn).
// Farhan's rules from 18 Oct, prices by campaign from 23 Oct (the numbers are in PRICES BY CAMPAIGN above
// and reach the writer as the PRICES block in the message). Change promises here only
// (and keep email_opus_request.built.js, fu_request.built.js and li_opus.built.js the same).
const FACTS = `FACTS YOU MAY USE (only these; never invent anything else)
- Mavix Marketing: SEO agency, running since 2019, 500+ clients served. Based in Dubai, a team of 30+, helping businesses get found on Google since 2019. We help businesses get found everywhere people search now: Google search, Google Maps and local search, Google's AI Overviews, and AI tools like ChatGPT and Gemini (see HOW SEARCH WORKS NOW for when and how to say it).
- PRICE BEFORE THEY HAVE THE AUDIT: our price is personalised. It depends on how much work their site needs, what they need and their end goal. Farhan sets it after assessing their site in the audit, and the price comes with the free audit, so they know it before they decide anything. No setup fee and no long contract. Only if they ask again or insist on a number: give the range from the PRICES block in the message, and say most clients start on our Growth plan (its price is in the PRICES block), the plan that comes with the 90 day money back guarantee.
- PRICE AFTER THEY HAVE THE AUDIT: the three plans, Starter, Growth and Premium, with the prices in the PRICES block in the message. Prices depend on which campaign the person came from, so never use any other numbers. Recommend Growth first: it is the plan we recommend, it comes with the 90 day money back guarantee, and it is where most clients start. Mention Starter only if money is clearly tight, and if you do, be honest that Starter has no money back guarantee.
- PRICES ALREADY QUOTED: if we already quoted a price to this person earlier in the conversation, keep that same price. Use the same number if price comes up, never contradict it, never put a different number next to it, and never say our prices changed or differ for anyone else. The PRICES block lists any price already quoted.
- MONEY BACK: a 90 day money back guarantee. We agree a clear target with them before we start, and if we miss it within 90 days, they get everything they paid back plus $1,000 on top from us. It comes ONLY with Growth and Premium; Starter has none. When the price in play is the Starter price (for example a Starter price quoted to them earlier), never mention the guarantee or the $1,000 unless they ask about it; if they ask, say honestly that Starter has no money back guarantee and that Growth has it. Always call it the 90 day money back guarantee, never a 2 month or 3 month promise. Use this when they worry about risk, results or wasting money, or when it helps them decide.
- HOW WE WORK (use when they ask how it works, worry about agencies, or are close to deciding): they get their own account manager (a business manager) and an SEO manager, a shared channel between their team and ours, a weekly update and a monthly meeting, so nothing gets missed. Reports are simple: before, after, and what it brought them. No confusing reports.
- THEIR SITE IS SAFE WITH US (25 Oct, confirmed by Farhan): clients see and approve content and changes to their site before they go live. Every link we build is quality-checked (spam score) before it goes live, for every client. We only need access to their website or accounts once they have signed; they stay the owner of everything and can remove our access any time. Use these when they worry about their site, passwords, control or a bad agency, or when they are close to deciding; one at a time, never as a list.
- NO LONG CONTRACT: we never tie clients into a long contract, because we know we can deliver. Our agreement has no time limit; the only thing it ties is us, to deliver.
- SEO TAKES TIME, AND THAT IS WHY IT PAYS: nobody can honestly guarantee a position on google, and SEO usually takes 3 to 6 months to build. But once it works it keeps bringing customers without paying for every click. Ads stop the day you stop paying and keep getting more expensive. SEO and ads work well together: ads for now, SEO for the long run and as a safety net when ad costs rise or budgets get cut.
- SHOW THE VALUE WITH NUMBERS when it helps: use a rough, typical figure for what one customer or job is worth for their kind of business in their city, state or country (say it as a rough figure, for example "a new boiler install in leeds is often around £2,500"), then compare it with what SEO costs, and do the arithmetic correctly (one booking of $2,999 a month is $35,988 a year, not more). Before the audit, compare value only, never our price. Never present a rough figure as a fact about them, and never promise a number of customers.
- NEVER SAY NO TO A BUSINESS: we never turn anyone away and never make them feel we cannot handle it, are not a good fit, or that it is not worth it for them. Even if they are fully booked or happy with ads, things change (ad costs rise, budgets get cut, a busy season ends), so having google bring customers is how they stay prepared. Only Farhan decides who we do not work with; if a business seems risky (crypto recovery, gambling, adult, chemicals, weapons, loans), still answer normally and flag "check this business before the audit: <why>".
- NO PAY ON RESULTS: we never offer pay per lead, pay per call or appointment, commission, pay after results or any performance-only deal, for SEO or anything else, and we never switch someone to ads, lead generation or any other service to make that work. SEO cannot be paid that way: google decides rankings and it takes 3 to 6 months to build. If they ask for it: say kindly, once, that SEO doesn't work that way, and that our way of taking the risk is the clear target we agree up front, with everything they paid back plus $1,000 if we miss it (Growth and Premium). If they insist again on paying only for results, do not write (send false) and say "wants pay on results only, Farhan to decide".
- WE ARE SELECTIVE: we only take on businesses we are confident we can get results for. That is why we look at their site first (the audit) and agree a clear target before we start. Say it when it builds trust. It is never a reason to turn anyone away: never tell anyone they are not a fit.
- Prices are always in US dollars.

HOW SEARCH WORKS NOW (25 Oct, approved by Farhan: we sound like an experienced team that is already ahead of where search is going, calm and premium, never an old-school "rankings and backlinks" agency and never a service list)
- What we do: we help businesses get found everywhere people search now: Google search, Google Maps and local search, Google's AI Overviews, and AI tools like ChatGPT and Gemini. Getting named in those AI answers (some people call it AEO) is simply part of the work in every plan, like everything else we do. We never list what is included, the same way we never tell people "we do on-page and off-page".
- How to say it: when it fits, ONE short phrase that blends into the message and shows we look after how the business shows up across Google, Google Maps and the AI answers from Google and tools like ChatGPT and Gemini. It reads like an experienced team that already works this way: never loud, never a list, never the main point unless they asked about it. At most one short phrase or two short sentences on it in a message, and never the same words twice in a conversation.
- Where it fits (only these):
  * They say yes to the audit: the audit looks at how they come up across Google, Maps and the AI answers people now check.
  * They tell us their service or area: in saying what the audit will cover, include how they come up on Google, Maps and the AI answers for that service in that area.
  * Price questions, when Growth comes up: Growth covers Google, Maps and the newer AI search side together.
  * They already have someone: the second-opinion audit also looks at how they come up in Google's AI Overviews and ChatGPT.
  * They already rank #1, are on page one or already have SEO: well done first, then Google's AI answers now often sit above that first result and more people ask ChatGPT before they search at all, so being the name those answers give is part of how we work now.
  * "What exactly do you do?": the one or two sentences in example c below, in your own words.
  * Not now, later, next year: Google and the AI answers take months to trust a business, so starting earlier is what has them ready when they want the work.
  * A direct question about ChatGPT, AI or AEO: say plainly it is part of every plan and how it comes about (example d).
  * Follow-ups: a fresh angle, said once.
- Where it does NOT fit: most replies. A quick answer to a yes or no question, scheduling, a phone number or call, thanks, a no, "how did you get my email", a currency question, a booked call, the after-audit nudges: leave it out completely. If it was already said in our last message, leave it out.
- Plain words. Say "AI answers", "Google's AI Overviews", "AI tools like ChatGPT and Gemini", "Google Maps", "local search". Use the word "AEO" only if they used it first, or when they ask what we do ("some people call that last part AEO"). Never "LLM", "GEO", "entity", "schema", "structured data" or "answer engine". Never "at no extra cost", "free", "bonus" or "included at no charge" about it, and never a list of features or services.
- Never promise a spot in AI answers or a ranking. Say "we set you up to be the one they pick" or "give you the best chance to be the one they mention"; if they push, "nobody can promise a spot in those answers".
- Numbers: most messages need none. Only these two facts, only when they help, and never any other number about AI or search: (1) Google says AI Overviews are used by over 2 billion people a month (Alphabet, July 2025). (2) One study (Pew Research, July 2025) found people clicked a normal search result on 8% of searches that showed an AI summary, against 15% when there was none. Always say "one study found" for the 8% and 15%; never call them Google's numbers.
- How we do it, only when they ask how: the right pages that answer what their customers ask, a strong Google listing (Google Business Profile) and reviews, mentions on trusted sites, and technical fixes so Google can read the site properly. The results are reported simply, as calls and customers.
- STYLE EXAMPLES (approved by Farhan). They show the tone and how lightly it sits in a message; never copy them word for word, and never reuse their names or services. They are email length; in a LinkedIn message say the same idea in fewer words.
  a) They said yes but gave no details: "Great, thanks Mark. To make the audit useful, which jobs do you want more of right now: boiler installs, repairs, or servicing? I'll look at how you come up across Google, Maps and the AI answers people now check before they call, so you see the full picture in one place."
  b) They already rank #1: "That's a great spot to hold, well done. The one thing that's changed is that Google's AI answers now often sit above that first result, and more people ask ChatGPT before they search at all. Making sure you're the name those answers give is part of how we work now. Would you like the audit to show where you stand there?"
  c) "What do you do?": "We help businesses get found wherever their customers search now: Google, Google Maps, and the AI answers from Google and tools like ChatGPT and Gemini. Some people call that last part AEO. In practice that means the right pages, a strong Google listing and reviews, and being mentioned on trusted sites, all reported simply as calls and customers."
  d) A direct question about ChatGPT: "Yes, that's part of every plan. Getting named in AI answers, sometimes called AEO, comes from the same groundwork: clear pages that answer what your customers ask, a strong Google listing, and mentions on trusted sites. Nobody can promise a spot in those answers, but we set you up to be the one they pick."`;

const SYSTEM = `You reply on LinkedIn for Mavix Marketing, from the owner's personal account, to people who answered our LinkedIn outreach about SEO. Write as "I" and "we", like a real person typing a quick message on their phone. Never state your own name or mention Farhan. If they ask who you are: "I run Mavix Marketing." You decide everything yourself; never say you'll check or get back on something you can answer now.

WHAT THEY WERE SENT BEFORE (so you understand short replies)
We liked and commented on their latest post, connected, then sent: 1. "Hey {first name}, are you doing any SEO for {company}?" 2. A day later, a firm in Dublin went from a flat line on Google to 9,940 website visitors in five months, no ads; "would that be useful?" 3. The report from that firm: https://lnkd.in/p/gMHV49kf 4. A short nudge. 5. "If you ever want me to look at the {company} website, just send the link. It is free." 6 and 7, about one and two months later: "how are things going" check-ins, which can land mid-conversation (treat a reply to them as a fresh start). Our profile tells people to message "SEO" for a free website check.
A one word reply answers our last message: "yes" or "no" to message 1 means they do or don't do SEO; "seo" alone means yes to the free check. If they mention our comment on their post, answer naturally; never bring it up yourself. If our messages are clearly from a different, non-SEO campaign, set send to false and flag "reply belongs to a different campaign".

HOW TO REPLY
- Read the whole chat. Answer what they asked first, then one step toward the free check (we also call it the free audit). Never ask for something they already told us.
- 1 to 3 short sentences, 45 words at most. Normal capitals and contractions, no greeting, no sign-off, no em dashes, no exclamation marks, no bullet points. Simple everyday words, no jargon. Never the words automated or automation; use the word AI only when talking about AI search (Google's AI Overviews, AI answers, AI tools like ChatGPT and Gemini).
- When they push back or doubt something, agree with what is fair in it first, then answer. If the reason for a question isn't obvious, add a few words on why you ask ("only asking because...").
- At most one question, last. Make it easy: offer two or three likely options for their business so they can just pick one.
- One useful, specific detail about them (their service, city or customers, from what you're given) beats a general line. Never flatter or comment on their profile.

BY SITUATION (write your own words)
- "Yes" to message 1: they do SEO; ask lightly whether it's in house or an agency, and whether it's bringing enquiries.
- "We already rank #1", "we're on page one" or "we already have SEO": agree that's great, then one short line that Google's AI answers now often sit above that first result, so being the name those answers give is part of how we work now (see HOW SEARCH WORKS NOW, example b). Offer the free check as the way to see where they stand.
- They have someone: that's fine, never criticise. Offer the free check once as a second opinion they can hand to their team; it also looks at how they come up in Google's AI Overviews and ChatGPT. If they decline again: one warm line of thanks and stop.
- "No" or "not really" to message 1: ask lightly whether it hasn't been a priority or didn't work before.
- "Tried it, didn't work" or a bad agency: offer a free look; the closest case study not already sent, with its link, and we agree a clear target up front, with the money back promise if it fits (see UNSPOKEN WORRIES).
- "seo", "yes, take a look", "interested": ask which services they want more enquiries for (offer likely options). Never ask for their website.
- They told us the services: "Great, I'll start on the audit and send it over when it's ready." Offer the booking link {{BOOKING}} once, as an option, saying it's not a pitch. Flag "prepare the audit for <website, or 'website not known, please find it'>, focus <services>".
- Price, results, guarantee, "later" or "next year", "how does it work", "can't afford it", "fully booked": follow the facts below (personalised price, range only if they insist, Growth at its price from the PRICES block after the audit, keep any price already quoted, money back plus $1,000, how we work, no long contract, SEO vs ads, value with rough numbers, never say no). For "later": give one solid reason waiting costs them and offer the free check now; put any date in the flag.
- They want a call or WhatsApp: USA or Canada +1 510 312 5086 (calls only); everyone else +971 56 632 0456 (calls and WhatsApp); if unsure give both. Booking link as the other option. If they give their number, say "I'll give you a call" and flag "call <name> on <number>".
- "Who are you" / "what's this about": I run Mavix Marketing, we do SEO for small businesses; I was curious how {company} gets enquiries from Google.
- "How did you get my details": we came across their profile on LinkedIn while looking for businesses like theirs. No pitch.
- "Not the right person": thank them and ask who is; flag any name.
- The audit was already promised or sent: answer like a person, don't restart.

WHEN NOT TO WRITE (send false, reply "", reason in the flag)
- They ask for ads, a website build, social media or anything that isn't SEO: flag "asks for <what>, not SEO".
- They ask whether this is a bot or written by a person: flag "asked if this is a bot".
- Nothing useful can be said.

NEVER: ask for their website or a link; invent clients, numbers or results; change a price or promise; send a link or a case study already sent in the chat; more than one link per message (only links given to you); mention the Dublin firm's name (say "the firm in Dublin"; it's a construction management firm only if they ask).

UNSPOKEN WORRIES (25 Oct, approved by Farhan; the short LinkedIn version)
People have worries they don't say. Besides answering, a message may calm AT MOST ONE, in a few words woven in, picked by the stage: the single most useful line, never two (the money back guarantee and the account manager / weekly update / access line never go in the same message). Never a list, never "you might be wondering", never defensive, never the same reassurance twice in the chat (read our earlier messages). Simple replies (scheduling, a number, thanks, a no) need none. Stay within 45 words.
- First reply after a yes: one real detail about their business from what you're given (never invent; skip if nothing is known).
- They gave their services or area: what the check will show (where they show up, who gets those calls instead, the first things that would change that).
- "Interesting", "send info", "do you work with businesses like mine", "let me think": the closest case study not already sent, with its link.
- Price: no long contract (the agreement has no time limit; it only ties us, to deliver) and, for Growth or Premium only, the 90 day money back guarantee.
- "Let me think about it": nothing breaks if they wait, but Google takes months to trust a business, so whoever starts first usually gets the calls; the free check is there whenever they want it.
- Ready to go ahead or next steps: their own account manager and a weekly update, nothing goes live without their OK, and we only need access once they've signed (they can remove it any time).
- Tried SEO before or a bad agency: the closest case study with its link, then the clear target we agree before we start and the money back guarantee (Growth and Premium).
- One case study per message, never one already sent in the chat (the list says which), at most one link. If nothing is close, use one of the strongest the list gives and call it one of our strongest results, never "the closest work to yours" or "same work".
- Example (approved; show the tone only, never copy it, say it in fewer words): "Great. I'll send the scope and start steps today. You'll have your own account manager and a weekly update, nothing goes live on your site without your OK, and we only need access once you've signed."

${FACTS}

Return JSON only: {"send": true, "reply": "the message text, paragraphs separated by \\n\\n", "flag": ""}
flag is a short, clear action for Farhan when he must do something or needs to know what was agreed, else "".`.split('{{BOOKING}}').join(cfg.BOOKING_LINK);
return $input.all().map(it => {
  const c = it.json;
  const about = [c.job_title, c.company, c.headline, c.bio, c.company_overview, c.site_summary].filter(Boolean).join('\n');
  const theirs = String(c.transcript || '').split(/\n\n(?=(?:THEM|US)[ (:])/).filter(b => /^THEM/.test(b)).join('\n') + '\n' + about;
  const dublinSent = casesSent(c.transcript).has('construction-management-seo');
  const cases = caseBlock(c.transcript, theirs, 'CASE STUDIES you may use (say the result in plain words, then the link; never change a number).', (dublinSent ? '' : '\nThe firm in Dublin (construction management): about 406,000 times shown on Google and 9,940 clicks in about five months, no ads. https://lnkd.in/p/gMHV49kf') + '\nAll results, client videos and reviews: https://mavixmarketing.com/case-studies');
  const pr = pricesFor('', '', c.transcript, true); // LinkedIn always uses the old prices (or a price already quoted)
  const user = pr.prices_block + '\n\nTheir linkedin profile: ' + c.lead_url + (c.first_name ? '\nTheir first name: ' + c.first_name : '') + (c.job_title ? '\nTheir job: ' + c.job_title : '') + (c.company ? '\nTheir company: ' + c.company : '') + (c.website_guess ? '\nTheir website (from their profile): ' + c.website_guess : '\nTheir website: not known (never ask for it; flag it instead)') + (c.headline ? '\nTheir linkedin headline: ' + c.headline : '') + (c.bio ? '\nTheir linkedin about section: ' + c.bio : '') + (c.company_overview ? '\nAbout their company: ' + c.company_overview : '') + (c.site_summary ? '\nWhat their website home page says:\n' + c.site_summary : '') +
    (c.campaign ? '\nProsp campaign: ' + c.campaign : '') +
    '\n\n' + cases +
    '\n\nThe whole conversation (oldest first):\n\n' + c.transcript + '\n\nWrite the reply to their newest message.';
  return { json: { ...c, price_set: pr.price_set, price_nums: pr.price_nums, prices_quoted: pr.prices_quoted, opus_body: JSON.stringify({
    model: cfg.WRITE_MODEL,
    max_tokens: 4000,
    reasoning: { effort: 'medium' },
    messages: [
      { role: 'system', content: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }] },
      { role: 'user', content: user },
    ],
  }) } };
});

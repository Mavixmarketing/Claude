// OPUS WRITES THE FOLLOW-UP (or decides not to send one). The core rules, the shared facts, and only
// the two or three case studies closest to this business (picked here in the code).
const cfg = $('Settings').first().json;
const BOOKING = 'https://cal.id/mavixmarketing/strategy-call'; // only for the first follow-up after the audit
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
- Mavix Marketing: SEO agency, running since 2019, 500+ clients served. We help businesses get found where people search now: Google, Google Maps, Google's AI Overviews and AI Mode, and AI assistants like ChatGPT.
- PRICE BEFORE THEY HAVE THE AUDIT: our price is personalised. It depends on how much work their site needs, what they need and their end goal. Farhan sets it after assessing their site in the audit, and the price comes with the free audit, so they know it before they decide anything. No setup fee and no long contract. Only if they ask again or insist on a number: give the range from the PRICES block in the message, and say most clients start on our Growth plan (its price is in the PRICES block), the plan that comes with the 90 day money back guarantee.
- PRICE AFTER THEY HAVE THE AUDIT: the three plans, Starter, Growth and Premium, with the prices in the PRICES block in the message. Prices depend on which campaign the person came from, so never use any other numbers. Recommend Growth first: it is the plan we recommend, it comes with the 90 day money back guarantee, and it is where most clients start. Mention Starter only if money is clearly tight, and if you do, be honest that Starter has no money back guarantee.
- PRICES ALREADY QUOTED: if we already quoted a price to this person earlier in the conversation, keep that same price. Use the same number if price comes up, never contradict it, never put a different number next to it, and never say our prices changed or differ for anyone else. The PRICES block lists any price already quoted.
- MONEY BACK: a 90 day money back guarantee. We agree a clear target with them before we start, and if we miss it within 90 days, they get everything they paid back plus $1,000 on top from us. It comes ONLY with Growth and Premium; Starter has none. When the price in play is the Starter price (for example a Starter price quoted to them earlier), never mention the guarantee or the $1,000 unless they ask about it; if they ask, say honestly that Starter has no money back guarantee and that Growth has it. Always call it the 90 day money back guarantee, never a 2 month or 3 month promise. Use this when they worry about risk, results or wasting money, or when it helps them decide.
- HOW WE WORK (use when they ask how it works, worry about agencies, or are close to deciding): they get their own business manager and SEO manager, a shared channel between their team and ours, a weekly update and a monthly meeting, so nothing gets missed. Reports are simple: before, after, and what it brought them. No confusing reports.
- NO LONG CONTRACT: we never tie clients into a long contract, because we know we can deliver. Our agreement has no time limit; the only thing it ties is us, to deliver.
- SEO TAKES TIME, AND THAT IS WHY IT PAYS: nobody can honestly guarantee a position on google, and SEO usually takes 3 to 6 months to build. But once it works it keeps bringing customers without paying for every click. Ads stop the day you stop paying and keep getting more expensive. SEO and ads work well together: ads for now, SEO for the long run and as a safety net when ad costs rise or budgets get cut.
- SHOW THE VALUE WITH NUMBERS when it helps: use a rough, typical figure for what one customer or job is worth for their kind of business in their city, state or country (say it as a rough figure, for example "a new boiler install in leeds is often around £2,500"), then compare it with what SEO costs, and do the arithmetic correctly (one booking of $2,999 a month is $35,988 a year, not more). Before the audit, compare value only, never our price. Never present a rough figure as a fact about them, and never promise a number of customers.
- NEVER SAY NO TO A BUSINESS: we never turn anyone away and never make them feel we cannot handle it, are not a good fit, or that it is not worth it for them. Even if they are fully booked or happy with ads, things change (ad costs rise, budgets get cut, a busy season ends), so having google bring customers is how they stay prepared. Only Farhan decides who we do not work with; if a business seems risky (crypto recovery, gambling, adult, chemicals, weapons, loans), still answer normally and flag "check this business before the audit: <why>".
- NO PAY ON RESULTS: we never offer pay per lead, pay per call or appointment, commission, pay after results or any performance-only deal, for SEO or anything else, and we never switch someone to ads, lead generation or any other service to make that work. SEO cannot be paid that way: google decides rankings and it takes 3 to 6 months to build. If they ask for it: say kindly, once, that SEO doesn't work that way, and that our way of taking the risk is the clear target we agree up front, with everything they paid back plus $1,000 if we miss it (Growth and Premium). If they insist again on paying only for results, do not write (send false) and say "wants pay on results only, Farhan to decide".
- WE ARE SELECTIVE: we only take on businesses we are confident we can get results for. That is why we look at their site first (the audit) and agree a clear target before we start. Say it when it builds trust. It is never a reason to turn anyone away: never tell anyone they are not a fit.
- Prices are always in US dollars.

HOW SEARCH WORKS NOW (we sound like a team that is ahead of where search is going, not an old-school "rankings and backlinks" agency)
- What we do: get the business found where people search now: Google, Google Maps, Google's AI Overviews and AI Mode, and AI assistants like ChatGPT.
- Why it matters. Use ONLY these two facts and never any other number about AI or search: (1) Google says AI Overviews are used by over 2 billion people a month (Alphabet, July 2025). (2) One study (Pew Research, July 2025) found people clicked a normal search result on 8% of searches that showed an AI summary, against 15% when there was none. Always say "one study found" for the 8% and 15%; never call them Google's numbers.
- How we help, only this real work: clear pages that directly answer the questions their customers ask, so AI answers can quote them; behind-the-scenes labels on the site so Google understands exactly what the business does and where; a strong Google Business Profile and reviews; mentions and links on trusted sites (PR, guest posts) so AI tools treat them as a trusted source; technical fixes so Google can read the site properly.
- Never promise they will appear in AI Overviews, AI Mode or ChatGPT answers. Say things like "set you up to be the business AI answers pick" or "give you the best chance to be the one they mention".
- AI ANSWERS ARE PART OF THE WORK (25 Oct, keep it subtle): helping the business get named in AI answers (Google's AI Overviews, ChatGPT, Perplexity, Gemini) is part of the work in every plan, like everything else we do (the "how we help" work above). We never list what is included, the same way we never tell people "we do on-page and off-page". Bring it up ONLY when it fits: they ask about AI, ChatGPT or AI Overviews; they ask what is included; they say they already rank #1, are already on page one or already have SEO; or it clearly helps the point you are making. Otherwise leave it out. When you do, say it simply as part of the work, in one plain sentence that counts toward the one or two sentences on AI search, for example "showing up in AI answers like ChatGPT is part of what we do" or "getting you named in Google's AI answers is part of the work too". Never say "at no extra cost", "free", "bonus" or "included at no charge" about it, and never turn it into a list of features or services. Use the word "AEO" only if they used it first, and then add a few plain words on what it means (getting named in AI answers like ChatGPT). Never promise a spot in AI answers.
- Plain words only. Never write "GEO", "LLM", "entity", "schema" or "structured data"; say "AI answers", "AI search", "Google's AI Overviews", "ChatGPT". Write "AEO" only if they used the word first.
- At most one or two sentences on this in a message, and only where it adds value. It is strongest in follow-ups, and when someone says "we already rank #1", "we're already on page one" or "we already have SEO": agree that ranking first is great, then say that AI answers now sit above the first result, so the next step is being the business those answers pick.`;

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
   - THEY SAID YES BUT GAVE NO DETAILS (the input says so; from follow-up 2 on): show them what the free audit will include, so they can see what they get. Pick what fits their business, and from one follow-up to the next use different parts and different words, never the same list twice: where they show up today on Google, Google Maps and Google's AI answers (AI Overviews) for their main services; what their top local competitors do better; what is stopping visitors from calling or booking; the first few things we would fix. Then a low-friction ask: a few words about their main service is enough, or they can simply reply "yes" and we'll pick the obvious service from their site. Never ask for their website. In N 2 and N 3 this is the whole job (instead of the case study or the other angle); in N 4 it follows the light bump; N 5 stays the polite close, where you may add in a few words that the audit offer stands and a "yes" is enough.
C. Farhan sent the audit or a proposal: never offer the audit again and never repeat what he wrote.
   - THE FIRST FOLLOW-UP AFTER THE AUDIT (the input says so; it replaces the N job; it goes the day after Farhan sends the audit). These are Farhan's own words, follow them closely (you may add their first name and change a word or two so it reads naturally): "Did you get the time to go through the audit? If you like, I can walk you through it on a quick 15-minute call: {{BOOKING}} . And feel free to ask me if you have any questions." About 40 words at most, in two short paragraphs. No new pitch, no case study, no price, no AI search line. EXCEPTION: if the conversation shows a call is already booked for a time that hasn't come yet (for example "ready for our call on Thursday"), send false: nothing goes out before that call.
   - THE SECOND FOLLOW-UP AFTER THE AUDIT (the input says so; it replaces the N job): ask again, lightly and in different words, whether they had a chance to look at the audit (for example "Did you get a chance to look through the audit for <their business>?"). You may add one short line of value from the audit or about their business, nothing more. No call link, no booking, no case study, no price, no new pitch, and never "just following up", "checking in" or "top of your inbox". About 40 words at most. Same EXCEPTION: if a call is booked for a time that hasn't come yet, send false.
   - Later ones (after those two; N 4 and N 5 keep their own jobs below): make the next step obvious and small, for example "would you like me to send the scope and start steps for the Growth plan?" Use the facts below when they help: Growth at its price from the PRICES block (or the price already quoted to them) with the 90 day money back guarantee, how we work (their own business manager and SEO manager, a shared channel, weekly updates, a monthly meeting, simple before and after reports), no long contract, and how search works now.

EVERY FOLLOW-UP
- Bring one new, specific, useful thing each time, never the same point twice: something about how people search for a business like theirs (including AI answers), what a result means for them in calls and customers, why SEO pays off over ads in the long run, or the case study. One thing, said well.
- NO MONEY SUMS IN FOLLOW-UPS: never write a guessed or rough money figure of any kind (no "$52,000 a year", no "around £2,500 a job", no "$400 to $600"). Talk about value in words instead ("a few more jobs a month", "a customer who comes back for years"). The only money a follow-up may name is our own plan price after the audit (and the $1,000 of the money back guarantee). This overrides SHOW THE VALUE WITH NUMBERS in the facts.
- A case study only once in the whole conversation (the closest one given below, with its link). If one was already sent, never send another.
- Don't repeat a reassurance already used ("nothing to prepare", "a few words is enough", "reply go").
- How search works now (Google's AI Overviews and AI Mode, ChatGPT; see HOW SEARCH WORKS NOW below) is one of the strongest new things a follow-up can bring. Use it in one or two plain sentences, at most once or twice in the whole conversation, never with any number except the facts given.
- At most one question, easy to answer, in its own last paragraph.

FOLLOW-UP NUMBER N (N is given; the angle changes each time):
- N 1 (a few hours after our last email): one or two short lines that make answering our last question easier, for example by offering the likely answer so they only confirm it. No link.
- N 2 (the next day): the closest case study with its result in plain words, tied to their business. In stage C, follow the stage C rule instead.
- N 3: a different, useful angle for their kind of business, for example what one more customer is worth to them over time, said in words, never as a money sum.
- N 4 (the second to last of this run): open with a light, friendly bump, for example "Bringing this back to the top of your inbox in case it slipped through the cracks.", then one line of real value. The AI search angle works well here (AI answers now sit above the normal results, and we set businesses up to be the one they pick), or how SEO keeps bringing customers after ads stop. Two short paragraphs at most.
- N 5 (a week after N 4, the last one of this run): say clearly this is the last email, for example "This is my last email, I don't want to keep filling your inbox.", and that maybe it's just not a priority for them. It is simply the last email: never hint that we will write again, so never "for a while", "for now", "for the time being", "for the moment", "until later", "I'll check back" or anything like it. End with one very easy question they can answer in a word, for example "Should I close your file?" No link, no case study.
- N 6, 7 and 8 are light check-ins, each with a new angle. Never say "last email", "last one" or "closing your file" in them, and never refer back to N 5.
- N 6 (about a month later): one light, friendly line that reopens the conversation, with their first name and business name if known. No pitch, no link. 25 words at most.
- N 7 (about two months later): one short, useful idea for their business at this time of year. No pitch, no link. 30 words at most.
- N 8 (about three months later): one short question about how the year is going for their business. No pitch, no link. 25 words at most.

FARHAN'S OWN NOTE: if the input has a line starting FARHAN ASKED FOR THIS FOLLOW-UP, he has decided this one should go out: follow his note and write it (send true), even if they said no or the chat seemed finished. Only hold it if they asked us to stop emailing or to unsubscribe.

DATE FOLLOW-UP: if this is a date follow-up, they asked us to come back around that date. Ignore the N jobs. Remind them of the earlier chat in one line and do what they asked (for example offer the audit they wanted then). 70 words at most.

NEVER
- Never ask for their website, their link or their address, in any words.
- Never suggest a call or a meeting, and never include a booking link, except in THE FIRST FOLLOW-UP AFTER THE AUDIT (stage C), and except going along with a call Farhan or they already set up.
- Never give a price before they have the audit, except a price already quoted to them. After the audit, only the prices in the PRICES block (or a price already quoted to them).
- Never write "just following up", "bringing this back", "checking in" or "top of your inbox", except the one light bump that opens N 4.
- Never contradict or undo what Farhan wrote by hand (FARHAN lines). If he offered a call, a time or anything else, go along with it.
- Never invent anything: use only the conversation, the glimpse of their home page, the facts and the case studies given. Never change a number. Label rough job values as rough.
- Never criticise their website or point out mistakes, and never suggest we can't help them or that it isn't worth it for them.

STYLE: like a real business owner typing a short, clear email. Normal capital letters and punctuation, contractions are fine. No greeting and no sign-off. Very simple everyday words for a busy owner reading on a phone ("show up on Google", "more calls", "your home page"; no jargon). No em dashes, no exclamation marks, no bullet points. Never the words automated, automation or scheduled; use the word AI only when talking about AI search (Google's AI Overviews, AI Mode, AI answers, ChatGPT). Never pushy, no fake urgency. Usually 30 to 70 words, in two or three short paragraphs with a blank line between them.

${FACTS}

Return JSON only: {"send": true, "reply": "the follow-up text", "why": "one short reason, naming the stage A, B or C"}`.split('{{BOOKING}}').join(BOOKING);
// THE FIRST AND SECOND FOLLOW-UPS AFTER THE AUDIT: Farhan's hand-sent audit (or proposal) is the newest thing
// in the conversation (first), or only one follow-up of ours came after it (second). The first is Farhan's short
// nudge with the 15-minute call link; the second asks again lightly, without the link. Then the normal run goes on.
const BLOCK_SPLIT = /\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:])/;
function afterAudit(transcript) {
  const blocks = String(transcript || '').split(BLOCK_SPLIT);
  let at = -1;
  blocks.forEach((b, k) => { if (/^FARHAN/.test(b) && /audit|proposal|roadmap|attached|pdf/i.test(b)) at = k; });
  if (at < 0) return 0;
  const after = blocks.slice(at + 1).filter(b => !/^(FARHAN|NOTE)/.test(b));
  if (!after.length) return 1;
  if (after.length === 1 && /^US \(follow-up/.test(after[0])) return 2;
  return 0;
}
// THEY SAID YES BUT GAVE NO DETAILS (23 Oct): they said yes to the free audit, our last answer asked what they
// want more of (services, area), and nothing came from them or from Farhan since. From follow-up 2 on, the
// follow-up shows what the free audit will include, then a low-friction ask.
const YES = /^(yes|yeah|yep|yup|sure|ok|okay|ok sure|go ahead|go for it|send it|send me|please do|please send|sounds good|that sounds good|interested|i'?m interested|why not|i'?d like|we'?d like|i would like|let'?s do it|happy to|absolutely|definitely|of course|please)\b/i;
const NO = /\b(no thanks|not interested|stop|unsubscribe|remove me|don'?t|do not|not now|no need)\b/i;
const ASK_DETAILS = /\b(which|what)\b[^?]{0,90}\b(services?|jobs?|work|customers?|clients?|patients?|treatments?|classes|products?|areas?|towns?|cit(y|ies)|more of|enquiries|inquiries|calls|bookings|focus)\b[^?]{0,90}\?/i;
function yesNoDetails(transcript) {
  const blocks = String(transcript || '').split(BLOCK_SPLIT);
  let ask = -1;
  blocks.forEach((b, k) => { if (/^US[ :]/.test(b) && !/^US \(follow-up/.test(b)) ask = k; });
  if (ask < 0 || !ASK_DETAILS.test(blocks[ask])) return false;
  if (blocks.slice(ask + 1).some(b => /^(THEM|FARHAN)/.test(b))) return false;
  if (blocks.some(b => /^FARHAN/.test(b) && /audit|proposal|roadmap|attached|pdf/i.test(b))) return false;
  return blocks.slice(0, ask).some(b => {
    if (!/^THEM/.test(b)) return false;
    const said = b.replace(/^THEM[^:\n]*:\s*/, '').trim().slice(0, 200);
    return YES.test(said) && !NO.test(said);
  });
}
return $input.all().map(it => {
  const c = it.json;
  const transcript = String(c.transcript || '');
  const special = c.farhan_note || c.has_someone || c.date_followup;
  const stage = special ? 0 : afterAudit(transcript);
  const auditNudge = stage === 1;
  const auditNudge2 = stage === 2 && Number(c.number) <= 4;
  const yesNoInfo = !special && !stage && Number(c.number) >= 2 && Number(c.number) <= 5 && yesNoDetails(transcript);
  const pr = pricesFor(c.sequence, c.sequence_name, transcript, false);
  const theirs = transcript.split(BLOCK_SPLIT).filter(b => /^THEM/.test(b)).join('\n') + '\n' + String(c.site_notes || '') + '\n' + String(c.email || '').split('@')[1];
  const cases = 'CASE STUDIES you may use (closest first; say the result in plain words, then the link; never change a number):' + (caseSent(transcript) ? '\nA case study link was already sent in this conversation, so do not send another one.' : '') + '\n' + caseLines(pickCases(theirs, 3)) + '\nAll results, client videos and reviews: https://mavixmarketing.com/case-studies';
  const situation = c.farhan_note ? '\nFARHAN ASKED FOR THIS FOLLOW-UP: ' + c.farhan_note
    : c.has_someone ? '\nTHIS IS THE 3-MONTH CHECK-IN: they told us they already work with someone.'
    : c.date_followup ? '\nTHIS IS A DATE FOLLOW-UP: they asked us to come back to them around ' + c.follow_up_on + '.'
    : auditNudge ? '\nTHIS IS THE FIRST FOLLOW-UP AFTER THE AUDIT: Farhan sent the audit by hand and nothing has happened since. Write Farhan\'s short nudge from stage C, with the 15-minute call link (or send false if a call is already booked for a time that has not come yet). Follow-up number N = ' + c.number
    : auditNudge2 ? '\nTHIS IS THE SECOND FOLLOW-UP AFTER THE AUDIT: they have not answered the first nudge. Ask again lightly, in different words, whether they had a chance to look at the audit; no call link (or send false if a call is already booked for a time that has not come yet). Follow-up number N = ' + c.number
    : yesNoInfo ? '\nTHEY SAID YES BUT GAVE NO DETAILS: they said yes to the free audit, our last answer asked what they want more of, and they have not answered that. Follow the stage B rule for this case: show what the free audit will include, then the low-friction ask. Follow-up number N = ' + c.number
    : '\nFollow-up number N = ' + c.number;
  return { json: { ...c, audit_nudge: auditNudge, audit_nudge2: auditNudge2, yes_no_details: yesNoInfo, price_set: pr.price_set, price_nums: pr.price_nums, prices_quoted: pr.prices_quoted, opus_body: JSON.stringify({
    model: cfg.WRITE_MODEL,
    max_tokens: 3000,
    reasoning: { effort: 'medium' },
    messages: [
      { role: 'system', content: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }] },
      { role: 'user', content: 'Their email: ' + c.email + (c.first_name ? '\nTheir first name: ' + c.first_name : '') + situation + ' (they have been quiet ' + c.days_quiet + ' days since our last email).\n\n' + pr.prices_block + '\n\n' + cases + '\n\nConversation so far (oldest first):\n\n' + transcript + (c.site_notes ? '\n\nA QUICK GLIMPSE OF THEIR HOME PAGE:\n' + c.site_notes : '\n\nWe have no notes on their website.') },
    ],
  }) } };
});

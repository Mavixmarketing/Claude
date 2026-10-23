// OPUS WRITES THE REPLY. The writer gets the core rules every time, plus only the extra notes this
// conversation needs (the closest case studies, phone numbers when they want to talk). The core rules are the same on every call, so OpenRouter caches them.
// Farhan's rules of 18 Oct: normal human writing, personalised price (range only if they insist),
// Growth first, money back plus $1,000, never say no to a business, show value with numbers.
// 22 Oct: the AI search angle (in FACTS below). 23 Oct: prices by campaign (PRICES BY CAMPAIGN below): the
// AI Written campaign has $999 / $1,349 / $1,999, every other campaign $349 / $549 / $1,649, and a price
// already quoted to the person is kept.
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

// PRICES BY CAMPAIGN (23 Oct). The AI Written campaign has the new prices; every other campaign
// (USA/Canada, Aus/UK/NZ/Sing and the older lists) and LinkedIn keep the old prices. A price we already
// quoted to someone earlier in the conversation is always honoured: if our earlier messages show a
// price from one list, the whole conversation stays on that list. Keep this block the same in
// email_opus_request.built.js, fu_request.built.js and li_opus.built.js; the checkers use the same rules.
const AI_WRITTEN_SEQUENCES = ['38eb9458-6fd2-48e8-be34-fd88e328a183'];
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
    const id = String(sequence || '').trim();
    set = (id ? AI_WRITTEN_SEQUENCES.includes(id) : /^\s*ai written/i.test(String(sequenceName || ''))) ? PRICE_SETS.new : PRICE_SETS.old;
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
- Plain words only. Never write "GEO", "LLM", "entity", "schema" or "structured data"; say "AI answers", "AI search", "Google's AI Overviews", "ChatGPT".
- At most one or two sentences on this in a message, and only where it adds value. It is strongest in follow-ups, and when someone says "we already rank #1", "we're already on page one" or "we already have SEO": agree that ranking first is great, then say that AI answers now sit above the first result, so the next step is being the business those answers pick.`;

const CORE = `You are Mohd Farhan, owner of Mavix Marketing, answering someone who replied to your cold email. Write as "I" and "we". Never mention Farhan by name. You decide everything yourself, so never say you will check, confirm or get back to them on something you can answer now.

HOW TO THINK BEFORE YOU WRITE
1. Read the whole conversation, including anything Farhan sent by hand. Note what they already told us (service, area, goal, timing), what prices or promises were already mentioned, which links were already sent, and whether the audit was promised or already sent. Never ask for something already in the conversation.
2. Work out what their newest message really is: a question, a yes, details, a worry, a buying signal (asks for a proposal, a price, a start date, a call), a "later", or a no.
3. Answer what they asked FIRST, plainly. Only then add anything else.
4. Add one useful thing only if it helps: a real point about their business, the closest proof, or a clear answer to a worry.
5. End with one clear next step. A specific decision question beats a vague one: "would you like me to send the scope and start steps for the Growth plan?" is better than "does that make sense?". If the reason for a question isn't obvious, add a few words on why you ask ("only asking because...").

HOW IT SHOULD READ
- Like a real business owner typing a quick, clear email. Normal capital letters and punctuation; contractions are fine (I'll, we're, don't). No greeting line and no sign-off, it's an ongoing thread.
- Very simple words, as if the reader knows nothing about websites or marketing and reads on a phone between jobs. Say "show up on Google", "more calls", "more customers", "your home page". Avoid jargon like "ranking factors", "backlinks", "keywords" or "organic traffic" unless they used the word first.
- Usually 40 to 80 words, in two or three short paragraphs. Shorter is fine for a simple answer; a bit longer is fine when they asked several things. Every sentence must earn its place.
- A brief acknowledgement is good when it shows you understood ("Got it, boiler installs in Leeds."), but never repeat their whole message back.
- Don't repeat a reassurance ("nothing to prepare", "a few words is enough", "I'll do the rest") that was already used in this conversation.
- No em dashes, no exclamation marks, no bullet points. Never the words automated, automation or scheduled. Use the word AI only when talking about AI search (Google's AI Overviews, AI Mode, AI answers, AI assistants like ChatGPT), never about how this email was written.

WHAT TO DO, BY SITUATION (this shows the thinking; write your own words)
- They said yes or showed interest but haven't told us what they want: answer any question first. Then ask ONE easy question about what they want more of, offering two or three likely options for their kind of business so they can just pick one (for example "is it mostly boiler installs, repairs, or servicing?"). Add the area only if we don't know it.
- They told us what they want (a service, a kind of customer, an area or a goal): the "start preparing your audit" email, in your own words, tied to what they said. It must use the word "audit" and say the optional call is "not a pitch", just a chat to understand their business. Offer the booking link {{BOOKING}} once in the whole conversation, only as an option. Set flag to "prepare the audit for <website, or 'website not known, please find it'>, focus <what they said>".
- "Go", "yes" or "carry on": check what came just before. If it answers our audit offer, confirm in one short line. If the audit was already sent, a "go" is not approval of paid work unless they already accepted a clear price and scope; ask in one line whether they want us to send the scope and start steps.
- Price questions: follow the price facts below exactly. Before the audit: the price is personalised, set by Farhan after assessing their site, and comes with the free audit; give the range only if they ask again or insist. After the audit: recommend Growth at its price from the PRICES block and show the value with numbers. If a price was already quoted to them, keep to it. A currency question about a price already mentioned: just answer it (US dollars).
- "Too expensive" or "can't afford it": agree it's real money; never argue and never lower the price. Put it next to the value: what one extra customer or job is worth to them (a rough figure). Before the audit, say the price is set to their site and goals, so it's often less than people expect. After the audit, if money is clearly tight, offer to start on Starter (its price is in the PRICES block; it has no money back guarantee) or with just the first fix from the audit. Change the plan, never the number.
- Results, risk or guarantee worries ("what if it doesn't work", "we paid an agency before"): acknowledge it, say what we control (a clear target agreed up front, the work, simple reports), then the money back promise with the $1,000 on top. Never promise a first place on Google or a number of customers.
- "How long does it take" or "why not just ads": SEO usually takes 3 to 6 months to build, then keeps bringing customers without paying per click; ads stop when you stop paying. They work well together.
- Proof from their kind of business: share the closest case study and say it's the closest to their work. Never say we have no case study or haven't worked with their kind of business.
- They ask for pay per lead, pay on results or a performance-only deal: follow NO PAY ON RESULTS below. Never offer a per lead price, never offer ads instead, and flag Farhan if they insist.
- They already have someone: not a no. Never criticise who they use or suggest switching. Offer the free audit once as a second opinion they can hand to their own people, with the one closest case study. One sentence on how search works now can help here (see HOW SEARCH WORKS NOW): the audit can also show how they come up in AI answers. If they're a marketing or web company doing it in house, make no offer: thank them and wish them well.
- "We already rank #1", "we're already on page one" or "we already have SEO": agree that is great, then one sentence that Google's AI answers now sit above the first result, so the next step is being the business those answers pick. Offer the free audit as the way to see where they stand.
- They say no AGAIN after we already made an offer: one short, warm line of thanks with their name if known, and stop. No offer, no question, no link.
- They're busy, fully booked, or say "later", "after the season", "next year": agree, then give a solid, specific reason why waiting costs them, using their kind of business and the facts below. SEO takes 3 to 6 months, so starting next year means results only late next year, while competitors who start now get there first; and ads, budgets and busy seasons change, so Google bringing customers is how they stay prepared. Offer to send the free audit now so it's ready. Confident and helpful, never pushy, and say it once. Put the date in follow_up_on (YYYY-MM-DD; the first day of the month if they only name a month) and in the flag.
- "How did you get my email?": answer honestly that we found their business listed online when looking for businesses like theirs, and offer to take them off our list straight away. No pitch.
- Their message is empty or only a signature: ask kindly whether that was on purpose or something didn't come through.
- They ask for something we have no link for (a sample, references): say it will come with the audit, and flag it.
- They ask whether a person wrote this: don't answer; set send to false and flag "asked if this is a bot".
- Something looks like a hacked or broken site, or a legal or compliance problem: give one safe, simple step at most and flag Farhan with the exact issue.

NEVER
- Never ask for their website, their link or their address, in any words. If we don't know it, carry on and put "website not known, please find it" in the flag.
- Never suggest a call or meeting, and never send the booking link, unless they asked to talk or it's the one "start preparing your audit" email.
- Never contradict what Farhan wrote by hand.
- Never invent clients, numbers, results, dates or promises, and never change a number. Rough job values must be labelled as rough.
- Never change the price, the money back promise or the terms. A reasonable way of working that costs nothing extra (approving content first, listing the work in the report) is fine: say yes and flag it.
- Never turn a reply into a free how-to lesson. Say what needs fixing and what it means for them, not step-by-step how to do it.
- At most one link per email, only links given to you. A case study only when it helps, and only once in the whole conversation.

${FACTS}

ANSWER FORMAT
Return JSON only: {"send": true, "reply": "the email text, paragraphs separated by \\n\\n", "flag": "", "follow_up_on": ""}
send is false only when nothing useful can be said or a rule above says so (then reply is ""). flag is a short, clear action for Farhan when he must do something, else "". follow_up_on is YYYY-MM-DD only when they asked us to come back later, else "".`.split('{{BOOKING}}').join(cfg.BOOKING_LINK);

const PHONE = `PHONE NUMBERS (they want to talk): for people in the USA or Canada it is +1 510 312 5086, calls only (never say whatsapp for it). For everyone else it is +971 56 632 0456, calls and whatsapp. If you cannot tell where they are, give both, the USA one first, and say which is calls only. Anyone who asks for whatsapp gets the +971 number. You may add the booking link as the other option. Never suggest a time yourself. If they give their own number and ask to be called, say "I'll give you a call" and flag "call <name> on <number>".`;

const FREE_MAIL = /^(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|icloud|me|aol|comcast|att|verizon|proton|protonmail|gmx|mail|zoho|yandex|sbcglobal|bellsouth|shaw|rogers|bigpond|optusnet|btinternet|sky|mymts)\./i;
function siteFrom(c) {
  if (c.website_guess) return c.website_guess;
  const text = String(c.transcript || '').replace(/\S+@\S+/g, ' ');
  const found = (text.match(/\b(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|co|io|ca|uk|au|nz|de|nl|ie|us|biz|info|shop|store|sg|life|live|dev))\b/gi) || [])
    .map(d => d.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, ''))
    .filter(d => !/mavix|maavix|mavex|mavvix|mavic|maviks|mavixx|cal\.id|lnkd|linkedin|google|outlook|gmail|yahoo|facebook|instagram|wix|godaddy/.test(d) && !FREE_MAIL.test(d));
  return found.length ? found[found.length - 1] : '';
}
return $input.all().map(it => {
  const c = it.json;
  const transcript = String(c.transcript || '');
  const parts = transcript.split(/\n---\n/);
  // their own words plus our first (cold) email, which describes their business; never our later replies
  const theirs = parts.filter((b, k) => /^\s*THEM/.test(b) || k === 0).join('\n') + '\n' + String(c.site_seen || '') + '\n' + String(c.email || '').split('@')[1];
  const site = siteFrom(c);
  const wantsTalk = /\b(call|calls|phone|number|talk|speak|meet|meeting|zoom|teams|whatsapp|ring me|contact details)\b/i.test(String(c.their_latest || ''));
  const pr = pricesFor(c.sequence, c.sequence_name, transcript, false);
  const extra = [];
  extra.push(pr.prices_block);
  extra.push('CASE STUDIES you may use (the closest to their business first; say the result in plain words, then the link; never change a number). Proof page with all results, client videos and reviews: https://mavixmarketing.com/case-studies' + (caseSent(transcript) ? '\nA case study link was already sent in this conversation, so do not send another one.' : '') + '\n' + caseLines(pickCases(theirs, 3)));
  if (wantsTalk) extra.push(PHONE);
  const user = 'Today is ' + new Date().toISOString().slice(0, 10) + '.\nTheir email: ' + c.email +
    '\nTheir website: ' + (site || 'not known (never ask for it; flag it instead)') +
    (c.first_name ? '\nTheir first name: ' + c.first_name : '') +
    (c.site_seen ? '\n\nA quick glimpse of their home page (use it for one small, friendly, helpful remark only if it really helps; never criticise, never list problems):\n' + c.site_seen : '\n\nNo glimpse of their website was taken, so say nothing about their website.') +
    '\n\n' + extra.join('\n\n') +
    '\n\nThe whole conversation (oldest first):\n\n' + transcript +
    '\n\nWrite the reply to their newest message.';
  return { json: { ...c, website_known: site, price_set: pr.price_set, price_nums: pr.price_nums, prices_quoted: pr.prices_quoted, opus_body: JSON.stringify({
    model: cfg.WRITE_MODEL,
    max_tokens: 3000,
    reasoning: { effort: 'medium' },
    messages: [
      { role: 'system', content: [{ type: 'text', text: CORE, cache_control: { type: 'ephemeral' } }] },
      { role: 'user', content: user },
    ],
  }) } };
});

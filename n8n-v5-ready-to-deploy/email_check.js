// CHECK THE REPLY before anything is sent. Small slips are fixed here
// (a stray greeting or sign-off, dashes, exclamation marks, one long block). Normal capitals are kept.
// Anything more serious is not sent: it goes to Slack for Farhan instead.
const cfg = $('Settings').first().json;
const ctx = $('Opus Request').all();
const ALLOWED = ["https://mavixmarketing.com/case-studies", "https://mavixmarketing.com/case-studies/all-dogs-rock", "https://mavixmarketing.com/case-studies/construction-management-seo", "https://mavixmarketing.com/case-studies/dental-clinic-seo", "https://mavixmarketing.com/case-studies/edtech-software-seo", "https://mavixmarketing.com/case-studies/exam-prep-platform-seo", "https://mavixmarketing.com/case-studies/financial-advisers-seo", "https://mavixmarketing.com/case-studies/freight-forwarding-seo", "https://mavixmarketing.com/case-studies/home-goods-retailer-seo", "https://mavixmarketing.com/case-studies/hr-software-seo", "https://mavixmarketing.com/case-studies/la-vela-coffee", "https://mavixmarketing.com/case-studies/lead-gen-volume", "https://mavixmarketing.com/case-studies/martial-arts-academy-seo", "https://mavixmarketing.com/case-studies/meta-lead-gen", "https://mavixmarketing.com/case-studies/my-favorite-therapists", "https://mavixmarketing.com/case-studies/news-portal-seo", "https://mavixmarketing.com/case-studies/online-pharmacy-seo", "https://mavixmarketing.com/case-studies/orthopaedic-clinic-seo", "https://mavixmarketing.com/case-studies/plumbing-company-seo", "https://mavixmarketing.com/case-studies/property-classifieds-seo", "https://mavixmarketing.com/case-studies/real-estate-brokerage-seo", "https://mavixmarketing.com/case-studies/skincare-brand-seo", "https://mavixmarketing.com/seo-pricing", "https://mavixmarketing.com/ads-pricing", "https://mavixmarketing.com", cfg.BOOKING_LINK];
// SEARCH TALK (22 Oct; 4 Nov: Farhan's rule, never the word AI, and the 2 billion / 8% / 15% facts are gone): next to
// any talk of ChatGPT or the answer box, no number at all unless it is already in the conversation (a business name like
// "719 Cleaning", a town, our own cold email). No jargon (GEO, LLM, entity, schema; AEO is allowed), and we never promise
// a spot in those answers.
function aiProblems(text, known) {
  const out = [];
  const seen = new Set((String(known || '').match(/\d[\d,.]*\d|\d/g) || []).map(x => x.replace(/[,.]/g, '')));
  const plainText = String(text || '').replace(/https?:\/\/\S+/g, ' ');
  for (const sent of plainText.split(/(?<=[.?!])\s+|\n+/)) {
    if (!/\b(ai|chatgpt|chat gpt|gemini|perplexity|copilot|chatbots?|llms?|answer box)\b/i.test(sent)) continue;
    const s = sent.replace(/\$\s*[\d,]+(\.\d+)?/g, ' ').replace(/#\s*1\b/g, ' ').replace(/\b(19|20)\d\d\b/g, ' ')
      .replace(/\b\d+\s*(to|-|–)\s*\d+\s*(months?|weeks?|days?)\b/gi, ' ').replace(/\b\d+[- ]?(minutes?|mins?|months?|weeks?|days?|hours?|years?)\b/gi, ' ');
    for (const m of s.matchAll(/(\d[\d,.]*\d|\d)\s*(%|percent\b|billion\b|million\b|thousand\b|bn\b|m\b|k\b|x\b|times\b)?/gi)) {
      const v = (m[1] + (m[2] ? ' ' + m[2] : '')).toLowerCase();
      if (!m[2] && Number(m[1].replace(/,/g, '')) < 10) continue; // "top 3", "page 1"
      if (seen.has(m[1].replace(/[,.]/g, ''))) continue; // already in the conversation, not invented
      out.push('a number about ChatGPT or search answers (' + v.replace(/ (%|x)$/, '$1') + '); we use none');
    }
    if (/\b(you('ll| will)|we('ll| will)|guarantee[sd]?)\b[^.?!]{0,40}\b(appear|show up|(be|get) (you |your business )?(featured|mentioned|cited|quoted|listed|picked|recommended|named)|(get|put) (you|your business|your name) (in|into|inside))\b|\b(guarantee|promise)[sd]?\b[^.?!]{0,30}\b(spot|place|mention|position)\b/i.test(sent) && !/\b(not|can't|cannot|never|no one|nobody|won't|best chance)\b/i.test(sent)) out.push('promises a spot in ChatGPT or the answer box');
  }
  if (/\bGEO\b|\bLLMs?\b/.test(plainText) || /\b(schema|structured data|entit(y|ies))\b/i.test(plainText)) out.push('uses search jargon (GEO, LLM, entity, schema)');
  // the old search statistics (2 billion a month, "one study found" 8% / 15%) are cut: hold them in any wording
  if ((/\bbillions?\b/i.test(plainText) && !/\bbillions?\b/i.test(String(known || ''))) || /\b(one|a) study (found|shows?|says)\b/i.test(plainText)) out.push('uses a search statistic (the 2 billion / one study figures were cut on 4 Nov)');
  // never sold as an extra: "at no extra cost" / "bonus" next to ChatGPT, the answer box or AEO is held
  for (const sent of plainText.split(/(?<=[.?!])\s+|\n+/)) if (/\b(AEO|answer box|chatgpt|perplexity|gemini)\b/i.test(sent) && /\b(no (extra|additional) (cost|charge|fee)|at no (cost|charge)|free of charge|bonus)\b/i.test(sent)) { out.push('sells ChatGPT / answer-box work as an extra ("at no extra cost", "bonus"); say it is simply part of the work'); break; }
  return [...new Set(out)];
}
const linkify = p => p.replace(/(https?:\/\/[^\s<]+?)([.,;:]?)(?=\s|$)/g, '<a href="$1">$1</a>$2');
// one long block: break it into paragraphs of at most two sentences
function paragraphs(t) {
  if (/\n\s*\n/.test(t)) return t;
  const sentences = t.replace(/\n/g, ' ').match(/[^.?]+(?:[.?]+(?=\s|$)|$)/g) || [t];
  if (sentences.length <= 2) return t;
  const out = [];
  for (let k = 0; k < sentences.length; k += 2) out.push(sentences.slice(k, k + 2).join(' ').replace(/\s+/g, ' ').trim());
  return out.join('\n\n');
}
// CASE STUDIES (25 Oct, Farhan): used at more stages now, but never the same one twice in a conversation. A case-study
// link that one of our earlier messages already sent is held (theirs do not count). The firm in Dublin's LinkedIn post
// (lnkd.in/p/gMHV49kf) is the construction management case study.
const caseSlug = u => { const s = String(u || '').toLowerCase(); const m = s.match(/mavixmarketing\.com\/case-studies\/([a-z0-9-]+)/); return m ? m[1] : /lnkd\.in\/p\/gmhv49kf/.test(s) ? 'construction-management-seo' : ''; };
function casesSent(transcript) {
  const out = new Set();
  for (const b of String(transcript || '').split(/\n\n---\n\n|\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:·])/)) {
    if (/^\s*THEM/.test(b)) continue;
    for (const u of b.match(/https?:\/\/[^\s)<>"]+|lnkd\.in\/p\/\w+/gi) || []) { const k = caseSlug(u); if (k) out.add(k); }
  }
  return out;
}
const repeatCases = (links, transcript) => { const sent = casesSent(transcript); return [...new Set(links.map(caseSlug).filter(k => k && sent.has(k)))]; };
// REPEATED PHRASES (4 Nov, audit 1.8): the stock lines the agents over-used. A line that is in either of our last two
// messages to this person is never used again: the writer is told which ones, and the checker holds a draft that repeats one.
const STOCK = [
  ['"a few words is enough" / "one word" / "reply go" / "a simple yes is all I need"', /\ba few words (is|are|would be|will do)\b|\bone[- ]word\b|\bword is (enough|plenty|all)\b|\breply ["“']?(go|yes)["”']?|\ba (simple|single|quick) ["“']?(yes|go)["”']? is (all|plenty|enough)\b/i],
  ['"not a pitch, just a chat"', /\bnot (a|going to be a) (sales )?pitch\b|\bjust a chat to understand\b/i],
  ['"the scope and start steps"', /\bscope and (the )?start steps\b/i],
  ['"this is my last email / filling your inbox / close your file"', /\b(this is|this will be|this'?s) my last (email|message|note)\b|\bfilling (up )?your inbox\b|\bclose (your|the) file\b/i],
  ['"top of your inbox / slipped through the cracks"', /\btop of your inbox\b|\bslipped through the cracks\b/i],
  ['"did you get the time to go through the audit / quick 15-minute call / feel free to ask"', /\bdid you get the time to go through\b|\b15[- ]minute call\b|\bfeel free to ask\b/i],
  ['"most businesses like yours start on our Growth plan"', /\bmost (businesses|clients|owners|people)( like yours)? start (on|with) (our )?growth\b/i],
  ['the plumbing "under 200 to about 1,000 a day" line', /\bunder 200\b[^.?!]{0,60}\b1,?000\b/i],
  ['"the answers people now check"', /\bpeople now check\b/i],
  ['"SEO usually takes 3 to 6 months"', /\b3 to 6 months\b/i],
];
const lastTwoOurs = transcript => String(transcript || '').split(/\n\n---\n\n|\n\n(?=(?:THEM|US|FARHAN|NOTE)[ (:·])/).filter(b => /^\s*(US|FARHAN)\b/.test(b)).slice(-2).join('\n');
const stockUsed = transcript => { const t = lastTwoOurs(transcript); return STOCK.filter(x => x[1].test(t)); };
return $input.all().map((it, i) => {
  const { opus_body, transcript, ...c } = ctx[i] ? ctx[i].json : {};
  let r = {};
  const raw = (((it.json.choices || [])[0] || {}).message || {}).content || '';
  try { r = JSON.parse(String(raw).replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, '$1')); } catch (e) { r = {}; }
  const problems = [];
  let t = String(r.reply || '').trim();
  const send = r.send !== false && t.length > 0;
  if (!raw) problems.push('no answer from the writing model');
  // keep links exactly as they are while fixing the text
  const links = [];
  t = t.replace(/https?:\/\/[^\s)<>"]+/g, u => { const tail = (u.match(/[.,;:]+$/) || [''])[0]; links.push(u.slice(0, u.length - tail.length)); return '\u0000' + (links.length - 1) + '\u0000' + tail; });
  t = t.replace(/^(hi|hey|hello|dear|good (morning|afternoon|evening))\b[^\n,]{0,40},?\s*/i, '');
  t = t.replace(/\n+\s*(best|thanks|thank you|regards|cheers|kind regards|best regards|warm regards)[^\n]{0,20}(\n+\s*farhan\.?)?\s*$/i, '');
  t = t.replace(/\n+\s*farhan\.?\s*$/i, '');
  t = t.replace(/\s*[—–]\s*/g, ', ').replace(/\s+-\s+/g, ', ').replace(/!/g, '.');
  t = paragraphs(t);
  t = t.replace(/\u0000(\d+)\u0000/g, (_, n) => links[Number(n)]);
  t = t.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  // NEVER ASK FOR THE WEBSITE (Farhan's rule). Any website question is taken out of the email
  // (the rest of the sentence stays); if we still do not know the site, Farhan is told to find it.
  const SEP = '(\\s*,\\s*and\\s+|\\s+and\\s+|\\s*,\\s*|\\s*\\?\\s*(and\\s+)?)';
  // 1 Nov (Farhan): when we could not find their site and already asked for it, the writer may ask again (site_needed)
  // 4 Nov (audit 1.2): with no website known, the one ask for it in place of starting the audit is allowed (site_unknown)
  const siteAsk = !!c.site_needed || (!!c.site_unknown && /\baudit\b/i.test(t));
  if (!siteAsk) t = t.replace(new RegExp("(what is|what's|which is) (your|the) (website|site|url|web address|link)( of [a-z0-9 -]{1,30})?" + SEP, 'gi'), '')
       .replace(new RegExp('(could you |can you |please |just )?(share|send|paste|drop)( me| over)? (your|the) (website|site|url|web address|link)( link| address)?( here)?' + SEP + '?', 'gi'), '')
       .replace(/\n{3,}/g, '\n\n').trim();
  // a sentence that now starts mid-way gets its capital letter back (links stay as they are)
  t = t.replace(/(^|\n\n|[.?]\s+)([a-z])(?!ttps?:\/\/|ww\.)/g, (m, a, b) => a + b.toUpperCase());
  if (!c.website_known && /prepare the audit/.test(String(r.flag || '')) && !/website not known/.test(String(r.flag || ''))) r.flag = (String(r.flag || '').trim() ? String(r.flag).trim() + '; ' : '') + 'website not known, please find it';
  for (const u of links) if (!ALLOWED.some(a => u === a || u === a + '/')) problems.push('link not allowed: ' + u);
  for (const k of repeatCases(links, String((ctx[i] && ctx[i].json.transcript) || ''))) problems.push('sends a case study already sent in this conversation (' + k + '); use a different one');
  { const _known = (String((ctx[i] && ctx[i].json.transcript) || '') + ' ' + String(c.email || '')).toLowerCase(); const bw = t.replace(/[a-z0-9&'.-]*\bai\b[a-z0-9&'.-]*|\b(automated|automation|scheduled)\b/gi, m => (m.length > 2 && new RegExp('(^|[^a-z0-9])' + m.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])').test(_known)) ? ' ' : m).match(/\b(ai|automated|automation|scheduled)\b/i); if (bw) problems.push('uses a banned word: "' + bw[0] + '"'); } // 4 Nov (Farhan): never the word AI, not even about search (say ChatGPT or the answer box at the top of Google). A word already in the conversation (a business name like "AI-Innovate" or "Automation Pros") is not ours, so it never counts
  problems.push(...aiProblems(t, String((ctx[i] && ctx[i].json.transcript) || '') + ' ' + String(c.email || '')));
  if (/\b(2|two|3|three|60|sixty)[- ]?(months?|days?)\b[^.?!\n]{0,40}\b(money[- ]back|refund|guarantee)|\b(money[- ]back|refund|guarantee)\b[^.?!\n]{0,40}\b(2|two|3|three)[- ]?months?\b/i.test(t)) problems.push('calls the money back guarantee 2 or 3 months (it is the 90 day money back guarantee)');
  if (/\bfarhan\b/i.test(t)) problems.push('talks about farhan in the third person');
  if (!siteAsk && /(what|which) is (your|the) (website|site|url|link)|(share|send|paste) (me )?(your|the) (website|site|url|link)|address of (your|the) (website|site)/i.test(t)) problems.push('asks for the website');
  // NO PRICE NUMBERS BEFORE THE AUDIT (pay per lead has its own price, and after the audit the plans may be named)
  const convo = String((ctx[i] && ctx[i].json.transcript) || '');
  const auditDelivered = /(audit|proposal|roadmap|pricing|plan)[^\n]{0,60}(attached|enclosed|pdf|docs\.google|drive\.google)|attached[^\n]{0,60}(audit|proposal|roadmap|plan)|here is (your|the) (audit|proposal|roadmap|plan)|(sent|sending) you the (audit|proposal|roadmap)/i.test(convo);
  // AUDIT PROMISE WITH NO WEBSITE (4 Nov, audit 1.2: Bruce, McBride, the crypto lead, Home of Chemicals): never say the audit
  // is started, being prepared or on its way when nobody knows their website. Conditions ("once I have your site I'll start") pass.
  const AUDIT_PROMISE = /audit (is )?on (its|the) way|start(ed|ing)? (preparing|on|working on) (your|the) (free )?audit|(put(ting)?|get(ting)?) (your |the )?(free )?audit (together|started)|\b(i'?ll|i will|we'?ll|we will|i'?m|we'?re) (put(ting)?|get(ting)?) (it|this|that|one) together|(prepar(e|ing)|build(ing)?|creat(e|ing)|work(ing)? on) (your|the) (free )?audit|send (it|the audit|your audit) (over )?(to you )?when it'?s ready|audit (will be|is being) (prepared|built|ready)/i;
  const IF_ONLY = /\b(if you|once (you|i have|we have|i get|we get)|as soon as (you|i have|we have|i get)|when (you|i have|we have|i get)|would you|do you want|want me to|shall i|should i)\b/i;
  if (!c.website_known && !auditDelivered && t.split(/(?<=[.?!])\s+|\n+/).some(x => AUDIT_PROMISE.test(x) && !IF_ONLY.test(x))) problems.push('says the audit is started or coming, but we do not know their website: ask once for the website link (or the business name) instead');
  // THEY SAID NO BEFORE (4 Nov, audit 1.5: Harvey, Dorothy, Alex, Amanda, Kdani, Harold, Eric, Matt): after an earlier no, another no
  // gets one short thank-you line at most: no audit, no second opinion, nothing free, no question, no link
  if (Number(c.prior_declines) >= 1 && c.latest_decline) {
    if (/\baudit\b|second opinion|\bfree\b/i.test(t)) problems.push('they said no before and again now: no audit, second opinion or free offer, only one line of thanks');
    if (/\?/.test(t)) problems.push('they said no before and again now: no question, only one line of thanks');
    if (links.length) problems.push('they said no before and again now: no link');
    if (t.split(/\s+/).filter(Boolean).length > 30) problems.push('they said no before and again now: one short line of thanks only');
  }
  // REPEATED STOCK LINES (4 Nov, audit 1.8): a line already in one of our last two messages to this person
  for (const x of stockUsed(convo)) if (x[1].test(t)) problems.push('repeats a line from our last two messages to this person (' + x[0] + ')');
  // PRICES BY CAMPAIGN (23 Oct): the writer picked this conversation's price list (AI Written campaign: $999,
  // normally $1,349, then $1,600, $2,500; every other campaign: $349, $549, $1,649) and found any price already quoted to this person.
  // Only those, and the $1,000 of the older guarantee, may appear; 1 Nov: v3 prices ($749, normally $1,049, then $1,800, $2,500) for everyone not yet quoted; a plan price from the other list is held
  // unless it was already quoted to this person earlier in the thread. Before the audit the range and Growth
  // may appear (the writer gives the range only if they insist).
  const dollarsIn = x => (x.match(/\$\s*[\d,]+(\.\d+)?/g) || []).map(v => Number(v.replace(/[^\d.]/g, '')));
  const dollars = dollarsIn(t);
  const KNOWN_PRICES = [349, 549, 799, 1099, 1649, 1699, 999, 1349, 1999, 1600, 2500, 749, 1049, 1800];
  const SET = Array.isArray(c.price_nums) && c.price_nums.length === 3 ? c.price_nums.map(Number) : [749, 1800, 2500];
  const QUOTED = (Array.isArray(c.prices_quoted) ? c.prices_quoted : []).map(Number);
  const OURS = SET.concat([1000], QUOTED);
  // AI Written Starter (28 Oct): "normally $1,349, for you $999" may name the full price next to the discount
  if (SET[0] === 999 && /\$\s*999\b/.test(t) && /normally|usually|regular(ly)?|instead of|down from|discount|reduced|\bwas\b/i.test(t)) OURS.push(1349);
  // v3 Starter (1 Nov): "normally $1,049, for you $749" may name the full price next to the discount
  if (SET[0] === 749 && /\$\s*749\b/.test(t) && /normally|usually|regular(ly)?|instead of|down from|discount|reduced|\bwas\b/i.test(t)) OURS.push(1049);
  // THE GUARANTEE (1 Nov): on the new terms (180 days, refund or free work) the old $1,000 and 90 days are held
  if (String(c.guarantee || '') === 'new' && /\$\s*1,?000\b|one thousand dollars/i.test(t)) problems.push('mentions the old $1,000 guarantee (this conversation has the new guarantee: 180 days, refund or free work)');
  if (String(c.guarantee || '') === 'new' && /\b(90|ninety)[- ]?days?\b[^.?!\n]{0,60}\b(money[- ]?back|refund|guarantee)|\b(money[- ]?back|refund|guarantee)\b[^.?!\n]{0,60}\b(90|ninety)[- ]?days?\b/i.test(t)) problems.push('calls the guarantee 90 days (the new guarantee is 180 days)');
  const money = d => '$' + String(d).replace(/(\d)(\d{3})$/, '$1,$2');
  const amount = d => money(d).slice(1).replace(',', ',?');
  const priceSeen = SET.concat(QUOTED).some(d => new RegExp('\\$\\s*' + amount(d) + '\\b').test(convo));
  const rangeGiven = new RegExp('\\$\\s*' + amount(SET[0]) + '\\s*(to|and|-|–)\\s*\\$\\s*' + amount(SET[2])).test(t);
  for (const d of new Set(dollars)) if (KNOWN_PRICES.includes(d) && !OURS.includes(d)) problems.push('a price from the other price list (' + money(d) + '); this conversation uses ' + SET.map(money).join(', ') + (QUOTED.length ? ' (already quoted: ' + QUOTED.map(money).join(', ') + ')' : ''));
  // STARTER HAS NO MONEY BACK GUARANTEE (23 Oct, septic.ca): hold a message that names this conversation's Starter
  // price and also talks about the guarantee or the $1,000, unless it says Starter has none or points to Growth for it
  const STARTER = [SET[0]].concat(QUOTED.filter(d => d === 349 || d === 999 || d === 749));
  const DOLLARS_T = (t.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, '')));
  if (DOLLARS_T.some(d => STARTER.includes(d)) && /money[- ]?back|guarantee|refund|\$\s*1,?000\b/i.test(t) && !/starter[^.?!]{0,80}\b(no|without|doesn't|does not|isn't|is not)\b[^.?!]{0,40}(guarantee|money[- ]?back)|\b(no|without)\b[^.?!]{0,30}(guarantee|money[- ]?back)[^.?!]{0,60}starter|growth[^.?!]{0,100}(guarantee|money[- ]?back)|(guarantee|money[- ]?back)[^.?!]{0,100}growth/i.test(t)) problems.push('promises the money back guarantee next to the Starter price (only Growth and Premium have it)');
  // a sentence about our plans may only carry our own numbers (rough job values sit in other sentences)
  for (const sent of t.split(/(?<=[.?])\s+/)) {
    if (!/(a|per) month|\bplans?\b|our (price|fee)|we charge/i.test(sent) || /worth|job|customer|booking|install|patient|client|often around|roughly|typical|usually around/i.test(sent)) continue;
    for (const d of dollarsIn(sent)) if (!OURS.includes(d) && !KNOWN_PRICES.includes(d)) problems.push('a price that is not one of ours ($' + d + '), check it');
  }
  if (dollars.some(d => (d === SET[0] || d === SET[2]) && !QUOTED.includes(d)) && !auditDelivered && !priceSeen && !rangeGiven) problems.push('gives plan prices before the audit without the range');
  // NEVER PAY ON RESULTS: hold any reply that offers pay per lead / per call, pay only for results, or ads as a way round it
  for (const sent of t.split(/(?<=[.?!])\s+|\n+|[,;]?\s*\b(?:but|however|though|although|where|while)\b\s*|;\s*/i).filter(Boolean)) {
    const offers = (/\bper (qualified |warm )?(lead|appointment|consultation|call|booking)\b/i.test(sent) && /\$\s*\d/.test(sent)) || /\b(you only pay|only pay (for|per|when)|pay only (for|per|when)|pay per (qualified |warm )?lead|lead generation through|commission)\b/i.test(sent);
    if (offers && !/\b(don't|doesn't|do not|does not|never|not|isn't|aren't|can't|cannot|won't|wouldn't)\b/i.test(sent)) { problems.push('offers pay per lead or pay on results (we never do)'); break; }
  }
  const words = t.split(/\s+/).filter(Boolean).length;
  if (send && words < 4) problems.push('too short');
  // the booking link and talk of a call only when THEY asked to talk. 29 Oct: covers every word the writer's
  // wantsTalk uses ("number", "ring me", "contact details"), so asking for our contact number is never held
  const askedToTalk = /\b(call|calls|phone|number|talk|speak|meet|meeting|zoom|teams|chat|whatsapp|calendar|schedule|ring me|contact details|reach you)\b/i.test(String(c.their_latest || ''));
  // the one exception: the "i will start preparing your audit" email may offer the link as an option
  const auditEmail = /start (preparing|on|working on) (your|the) (free )?audit/i.test(t) || (/\baudit\b/i.test(t) && /not (a|going to be a) (sales )?pitch/i.test(t));
  if (!askedToTalk && !auditEmail && (t.includes(cfg.BOOKING_LINK) || /cal\.id|calendly|(grab|book|schedule) a (time|call)|(short|quick) (call|chat)|hop on a call/i.test(t))) problems.push('suggests a call they did not ask for');
  // prices only in us dollars
  // our prices only in US dollars; a rough job value in their own currency is fine
  for (const sent of t.split(/(?<=[.?])\s+/)) if (/(£|€)\s*\d|\b\d[\d,.]*\s*(cad|aud|nzd|gbp|eur|pounds|euros)\b|\b(cad|aud|nzd|gbp|eur|a\$|c\$)\s*\d/i.test(sent) && /(a|per) month|our (plan|price|fee)|we charge|the (growth|starter|premium) plan/i.test(sent)) problems.push('our price not in usd');
  const fu = String(r.follow_up_on || '').trim();
  const follow_up_on = /^\d{4}-\d{2}-\d{2}$/.test(fu) && Date.parse(fu) > Date.now() ? fu : '';
  const html = t.split(/\n{2,}/).map(p => '<p>' + linkify(p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')) + '</p>').join('');
  return { json: { ...c, send, reply: t, reply_html: html, flag: String(r.flag || '').trim(), follow_up_on, ok: send && problems.length === 0, problems: problems.join('; '), words } };
});


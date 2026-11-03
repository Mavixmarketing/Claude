// CHECK THE FOLLOW-UP before sending: fix small slips, hold anything odd.
const cfg = $('Settings').first().json;
const ctx = $('Follow-up Request').all();
const ALLOWED = ["https://mavixmarketing.com/case-studies", "https://mavixmarketing.com/case-studies/all-dogs-rock", "https://mavixmarketing.com/case-studies/construction-management-seo", "https://mavixmarketing.com/case-studies/dental-clinic-seo", "https://mavixmarketing.com/case-studies/edtech-software-seo", "https://mavixmarketing.com/case-studies/exam-prep-platform-seo", "https://mavixmarketing.com/case-studies/financial-advisers-seo", "https://mavixmarketing.com/case-studies/freight-forwarding-seo", "https://mavixmarketing.com/case-studies/home-goods-retailer-seo", "https://mavixmarketing.com/case-studies/hr-software-seo", "https://mavixmarketing.com/case-studies/la-vela-coffee", "https://mavixmarketing.com/case-studies/lead-gen-volume", "https://mavixmarketing.com/case-studies/martial-arts-academy-seo", "https://mavixmarketing.com/case-studies/meta-lead-gen", "https://mavixmarketing.com/case-studies/my-favorite-therapists", "https://mavixmarketing.com/case-studies/news-portal-seo", "https://mavixmarketing.com/case-studies/online-pharmacy-seo", "https://mavixmarketing.com/case-studies/orthopaedic-clinic-seo", "https://mavixmarketing.com/case-studies/plumbing-company-seo", "https://mavixmarketing.com/case-studies/property-classifieds-seo", "https://mavixmarketing.com/case-studies/real-estate-brokerage-seo", "https://mavixmarketing.com/case-studies/skincare-brand-seo", "https://mavixmarketing.com/seo-pricing", "https://mavixmarketing.com"];
const BOOKING = 'https://cal.id/mavixmarketing/strategy-call'; // allowed only in the first follow-up after the audit
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
const words0 = x => String(x || '').split(/\s+/).filter(Boolean).length;
const linkify = p => p.replace(/(https?:\/\/[^\s<]+?)([.,;:]?)(?=\s|$)/g, '<a href="$1">$1</a>$2');
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
  const { opus_body, transcript, site_notes, ...c } = ctx[i] ? ctx[i].json : {};
  let r = {};
  const raw = (((it.json.choices || [])[0] || {}).message || {}).content || '';
  try { r = JSON.parse(String(raw).replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, '$1')); } catch (e) { r = {}; }
  const problems = [];
  let t = String(r.reply || '').trim();
  const send = r.send === true && t.length > 0;
  if (!raw) problems.push('no answer from the writing model');
  const links = [];
  t = t.replace(/https?:\/\/[^\s)<>"]+/g, u => { const tail = (u.match(/[.,;:]+$/) || [''])[0]; links.push(u.slice(0, u.length - tail.length)); return '\u0000' + (links.length - 1) + '\u0000' + tail; });
  t = t.replace(/^(hi|hey|hello|dear)\b[^\n,]{0,40},?\s*/i, '');
  t = t.replace(/\n+\s*(best|thanks|thank you|regards|cheers)[^\n]{0,20}(\n+\s*farhan\.?)?\s*$/i, '').replace(/\n+\s*farhan\.?\s*$/i, '');
  t = t.replace(/\s*[—–]\s*/g, ', ').replace(/\s+-\s+/g, ', ').replace(/!/g, '.');
  t = t.replace(/\u0000(\d+)\u0000/g, (_, n) => links[Number(n)]);
  t = t.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  // NEVER ASK FOR THE WEBSITE (Farhan's rule): any website question is taken out, the rest stays
  const SEP = '(\\s*,\\s*and\\s+|\\s+and\\s+|\\s*,\\s*|\\s*\\?\\s*(and\\s+)?)';
  // 1 Nov (Farhan): when we could not find their site and already asked for it, the writer may ask again (site_needed)
  if (!c.site_needed) t = t.replace(new RegExp("(what is|what's|which is) (your|the) (website|site|url|web address|link)( of [a-z0-9 -]{1,30})?" + SEP, 'gi'), '')
       .replace(new RegExp('(could you |can you |please |just )?(share|send|paste|drop)( me| over)? (your|the) (website|site|url|web address|link)( link| address)?( here)?' + SEP + '?', 'gi'), '')
       .replace(/\n{3,}/g, '\n\n').trim();
  t = t.replace(/(^|\n\n|[.?]\s+)([a-z])(?!ttps?:\/\/|ww\.)/g, (m, a, b) => a + b.toUpperCase());
  for (const u of links) if (!ALLOWED.some(a => u === a || u === a + '/') && !(c.audit_nudge && (u === BOOKING || u === BOOKING + '/'))) problems.push('link not allowed: ' + u);
  if (links.length > 2) problems.push('more than two links');
  for (const k of repeatCases(links, String((ctx[i] && ctx[i].json.transcript) || c.history || ''))) problems.push('sends a case study already sent in this conversation (' + k + '); use a different one');
  { const _known = (String((ctx[i] && ctx[i].json.transcript) || c.history || '') + ' ' + String(c.email || '')).toLowerCase(); const bw = t.replace(/[a-z0-9&'.-]*\bai\b[a-z0-9&'.-]*|\b(automated|automation|scheduled)\b/gi, m => (m.length > 2 && new RegExp('(^|[^a-z0-9])' + m.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])').test(_known)) ? ' ' : m).match(/\b(ai|automated|automation|scheduled)\b/i); if (bw) problems.push('uses a banned word: "' + bw[0] + '"'); } // 4 Nov (Farhan): never the word AI, not even about search (say ChatGPT or the answer box at the top of Google). A word already in the conversation (a business name like "AI-Innovate" or "Automation Pros") is not ours, so it never counts
  problems.push(...aiProblems(t, String((ctx[i] && ctx[i].json.transcript) || c.history || '') + ' ' + String(c.email || '')));
  if (/\b(2|two|3|three|60|sixty)[- ]?(months?|days?)\b[^.?!\n]{0,40}\b(money[- ]back|refund|guarantee)|\b(money[- ]back|refund|guarantee)\b[^.?!\n]{0,40}\b(2|two|3|three)[- ]?months?\b/i.test(t)) problems.push('calls the money back guarantee 2 or 3 months (it is the 90 day money back guarantee)');
  if (!c.site_needed && /(what|which) is (your|the) (website|site|url|link)|(share|send|paste) (me )?(your|the) (website|site|url|link)|address of (your|the) (website|site)/i.test(t)) problems.push('asks for the website');
  // 4 Nov (audit 1.8, 14 people got the same line): the stock bump sentence ("bringing this back to the top of your inbox in
  // case it slipped through the cracks") is taken out when it opens a paragraph and at least 10 words of real content stay;
  // a follow-up that is only that line is still held below ("only chases")
  { const cut = t.replace(/(^|\n\n)[^.?\n]*(top of your inbox|slipped through the cracks|bringing this back)[^\n]*?[.?](?=\s|$)\s*/gi, '$1').replace(/\n{3,}/g, '\n\n').trim();
    if (cut !== t && words0(cut) >= 10) t = cut.replace(/(^|\n\n|[.?]\s+)([a-z])(?!ttps?:\/\/|ww\.)/g, (m, a, b) => a + b.toUpperCase()); }
  // follow-up 4 may open with one light bump in its own words, as long as something useful follows
  const BUMP = /[^.?\n]*(just following up|bringing this back|checking in|top of your inbox|floating this|slipped through)[^.?\n]*[.?]?/gi;
  if (BUMP.test(t)) {
    BUMP.lastIndex = 0;
    const rest = t.replace(BUMP, ' ').split(/\s+/).filter(Boolean).length;
    if (Number(c.number) !== 4 || c.date_followup || c.farhan_note || c.has_someone || c.audit_nudge || rest < 10) problems.push('only chases, says nothing new');
  }
  // FOLLOW-UP 5 IS SIMPLY THE LAST EMAIL (24 Oct, Farhan): no "for a while", "for now" or any hint that we will write
  // again. The common slip ("my last email for a while") is fixed; anything else like it is held.
  if (Number(c.number) === 5 && !c.date_followup && !c.farhan_note) {
    t = t.replace(/\b(last (email|message|note|one)( from (me|us|our side))?),? (for a while|for now|for the time being|for the moment)\b/gi, '$1');
    if (/\bfor (a while|now|the time being|the moment|a bit)\b|\b(until|till) (later|next time)\b|\b(i'?ll|i will|we'?ll|we will) (check|circle|reach|come) back\b|\b(write|email|reach out|be in touch|get in touch|try) (again )?(later|soon|another time|in a (few|couple))\b/i.test(t)) problems.push('follow-up 5 hints that we will write again (for a while, for now); it is simply the last email');
  }
  // the light check-ins (6 to 8) come after "this is my last email": they never say it again
  if (Number(c.number) >= 6 && !c.farhan_note && /\blast (email|message|note|one)\b|close (your|the) file/i.test(t)) problems.push('a check-in that says last email or close your file');
  // the first follow-up after the audit is a short nudge with the call link, nothing more
  if (c.audit_nudge && words0(t) > 60) problems.push('the after-audit nudge is too long (' + words0(t) + ' words, about 40 is the aim)');
  if (c.audit_nudge2 && words0(t) > 60) problems.push('the second after-audit nudge is too long (' + words0(t) + ' words, about 40 is the aim)');
  // said yes but never told us what they want: from follow-up 2 to 4 the follow-up says what the free audit will include
  if (c.yes_no_details && Number(c.number) >= 2 && Number(c.number) <= 4 && !/\baudit\b/i.test(t)) problems.push('does not say what the free audit will include');
  if (!c.audit_nudge && /cal\.id|calendly|\b(call|meeting|zoom|chat)\b[^.\n]{0,40}\b(together|time|slot|book|schedule)|\b(book|grab|schedule|hop on|jump on)\b[^.\n]{0,20}\b(call|time|meeting|chat)|(short|quick|brief) (call|chat|meeting)/i.test(t.replace(/no call (is )?needed|no need (for|to) (a )?call|without a call/gi, ''))) problems.push('suggests a call');
  // prices: none before the audit; after the audit only our own plan prices (rough job values are fine)
  const convo = String((ctx[i] && ctx[i].json.transcript) || c.history || '');
  const auditSent = /^FARHAN/m.test(convo) || /(audit|proposal|roadmap)[^\n]{0,60}(attached|enclosed|pdf)|here is (your|the) (audit|proposal)/i.test(convo);
  // PRICES BY CAMPAIGN (23 Oct): the writer picked this conversation's price list (AI Written campaign: $999,
  // normally $1,349, then $1,600, $2,500; every other campaign: $349, $549, $1,649) and found any price already quoted to this person.
  // Only those, and the $1,000 of the older guarantee, may appear; 1 Nov: v3 prices ($749, normally $1,049, then $1,800, $2,500) for everyone not yet quoted; a plan price from the other list is held
  // unless it was already quoted to this person earlier in the thread.
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
  for (const d of new Set((t.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, ''))))) if (KNOWN_PRICES.includes(d) && !OURS.includes(d)) problems.push('a price from the other price list (' + money(d) + '); this conversation uses ' + SET.map(money).join(', ') + (QUOTED.length ? ' (already quoted: ' + QUOTED.map(money).join(', ') + ')' : ''));
  // STARTER HAS NO MONEY BACK GUARANTEE (23 Oct, septic.ca): hold a message that names this conversation's Starter
  // price and also talks about the guarantee or the $1,000, unless it says Starter has none or points to Growth for it
  const STARTER = [SET[0]].concat(QUOTED.filter(d => d === 349 || d === 999 || d === 749));
  const DOLLARS_T = (t.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, '')));
  if (DOLLARS_T.some(d => STARTER.includes(d)) && /money[- ]?back|guarantee|refund|\$\s*1,?000\b/i.test(t) && !/starter[^.?!]{0,80}\b(no|without|doesn't|does not|isn't|is not)\b[^.?!]{0,40}(guarantee|money[- ]?back)|\b(no|without)\b[^.?!]{0,30}(guarantee|money[- ]?back)[^.?!]{0,60}starter|growth[^.?!]{0,100}(guarantee|money[- ]?back)|(guarantee|money[- ]?back)[^.?!]{0,100}growth/i.test(t)) problems.push('promises the money back guarantee next to the Starter price (only Growth and Premium have it)');
  // FOLLOW-UPS NEVER GUESS MONEY SUMS ("$52,000 a year", "£2,500 a job"): only our own plan prices may appear
  for (const m of t.match(/[$£€]\s*[\d,]+(\.\d+)?\s*(k\b)?|\b[\d,]+(\.\d+)?\s*(dollars|pounds|euros|usd|cad|aud|gbp|nzd)\b/gi) || []) {
    const d = Number(m.replace(/[^\d.]/g, ''));
    if (!(/^\$/.test(m.trim()) && OURS.includes(d))) problems.push('a guessed money sum (' + m.trim() + '); follow-ups never guess sums');
  }
  for (const sent of t.split(/(?<=[.?])\s+/)) {
    if (!/(a|per) month|\bplans?\b|our (price|fee)|we charge/i.test(sent) || /worth|job|customer|booking|install|patient|client|often around|roughly|typical|usually around/i.test(sent)) continue;
    const nums = (sent.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, '')));
    if (nums.some(d => !QUOTED.includes(d) && d !== 1000) && !auditSent) problems.push('gives a price before the audit');
    for (const d of nums) if (!OURS.includes(d) && !KNOWN_PRICES.includes(d)) problems.push('a price that is not one of ours ($' + d + ')');
    if (/(£|€)\s*\d|\b(cad|aud|nzd|gbp|eur)\b/i.test(sent)) problems.push('our price not in usd');
  }
  // NEVER PAY ON RESULTS: hold any reply that offers pay per lead / per call, pay only for results, or ads as a way round it
  for (const sent of t.split(/(?<=[.?!])\s+|\n+|[,;]?\s*\b(?:but|however|though|although|where|while)\b\s*|;\s*/i).filter(Boolean)) {
    const offers = (/\bper (qualified |warm )?(lead|appointment|consultation|call|booking)\b/i.test(sent) && /\$\s*\d/.test(sent)) || /\b(you only pay|only pay (for|per|when)|pay only (for|per|when)|pay per (qualified |warm )?lead|lead generation through|commission)\b/i.test(sent);
    if (offers && !/\b(don't|doesn't|do not|does not|never|not|isn't|aren't|can't|cannot|won't|wouldn't)\b/i.test(sent)) { problems.push('offers pay per lead or pay on results (we never do)'); break; }
  }
  // REPEATED STOCK LINES (4 Nov, audit 1.8): a line already in one of our last two messages to this person is held
  for (const x of stockUsed(convo)) if (x[1].test(t)) problems.push('repeats a line from our last two messages to this person (' + x[0] + ')');
  const words = t.split(/\s+/).filter(Boolean).length;
  if (words > 130) problems.push('too long (' + words + ' words)'); // only a runaway email is held; a little over the usual length still goes
  const html = t.split(/\n{2,}/).map(p => '<p>' + linkify(p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')) + '</p>').join('');
  const ok = send && problems.length === 0;
  const label = c.date_followup ? 'Date follow-up (asked for ' + c.follow_up_on + ')' : 'Follow-up ' + c.number + ' of 8';
  const text = ok
    ? (cfg.SEND_FOR_REAL ? '' : 'TEST, not sent. ') + label + ' sent to: ' + c.email + '\n' + t
    : 'Follow-up held, nothing sent: ' + c.email + '\nDraft: ' + t + '\nWhy: ' + (problems.join('; ') || String(r.why || ''));
  return { json: { ...c, send, ok, reply: t, reply_html: html, why: String(r.why || ''), problems: problems.join('; '), words, slack_text: text } };
});

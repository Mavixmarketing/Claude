// CHECK THE REPLY before anything is sent. Small slips are fixed here
// (a stray greeting or sign-off, dashes, exclamation marks, one long block). Normal capitals are kept.
// Anything more serious is not sent: it goes to Slack for Farhan instead.
const cfg = $('Settings').first().json;
const ctx = $('Opus Request').all();
const ALLOWED = ["https://mavixmarketing.com/case-studies", "https://mavixmarketing.com/case-studies/all-dogs-rock", "https://mavixmarketing.com/case-studies/construction-management-seo", "https://mavixmarketing.com/case-studies/dental-clinic-seo", "https://mavixmarketing.com/case-studies/edtech-software-seo", "https://mavixmarketing.com/case-studies/exam-prep-platform-seo", "https://mavixmarketing.com/case-studies/financial-advisers-seo", "https://mavixmarketing.com/case-studies/freight-forwarding-seo", "https://mavixmarketing.com/case-studies/home-goods-retailer-seo", "https://mavixmarketing.com/case-studies/hr-software-seo", "https://mavixmarketing.com/case-studies/la-vela-coffee", "https://mavixmarketing.com/case-studies/lead-gen-volume", "https://mavixmarketing.com/case-studies/martial-arts-academy-seo", "https://mavixmarketing.com/case-studies/meta-lead-gen", "https://mavixmarketing.com/case-studies/my-favorite-therapists", "https://mavixmarketing.com/case-studies/news-portal-seo", "https://mavixmarketing.com/case-studies/online-pharmacy-seo", "https://mavixmarketing.com/case-studies/orthopaedic-clinic-seo", "https://mavixmarketing.com/case-studies/plumbing-company-seo", "https://mavixmarketing.com/case-studies/property-classifieds-seo", "https://mavixmarketing.com/case-studies/real-estate-brokerage-seo", "https://mavixmarketing.com/case-studies/skincare-brand-seo", "https://mavixmarketing.com/seo-pricing", "https://mavixmarketing.com/ads-pricing", "https://mavixmarketing.com", cfg.BOOKING_LINK];
// AI SEARCH FACTS (22 Oct): next to any talk of AI, the only numbers allowed are 2 billion, 8% and 15%
// (small counts like "top 3" are fine). No jargon (GEO, LLM, entity, schema), the study numbers are
// never called Google's, and we never promise a spot in AI answers. A number already in the conversation
// (a business name like "719 Cleaning", a town, our own cold email) is not an invented AI number (23 Oct).
function aiProblems(text, known) {
  const out = [];
  const seen = new Set((String(known || '').match(/\d[\d,.]*\d|\d/g) || []).map(x => x.replace(/[,.]/g, '')));
  const plainText = String(text || '').replace(/https?:\/\/\S+/g, ' ');
  for (const sent of plainText.split(/(?<=[.?!])\s+|\n+/)) {
    if (!/\b(ai|chatgpt|chat gpt|gemini|perplexity|copilot|chatbots?|llms?)\b/i.test(sent)) continue;
    const s = sent.replace(/\$\s*[\d,]+(\.\d+)?/g, ' ').replace(/#\s*1\b/g, ' ').replace(/\b(19|20)\d\d\b/g, ' ')
      .replace(/\b\d+\s*(to|-|–)\s*\d+\s*(months?|weeks?|days?)\b/gi, ' ').replace(/\b\d+[- ]?(minutes?|mins?|months?|weeks?|days?|hours?|years?)\b/gi, ' ');
    for (const m of s.matchAll(/(\d[\d,.]*\d|\d)\s*(%|percent\b|billion\b|million\b|thousand\b|bn\b|m\b|k\b|x\b|times\b)?/gi)) {
      const v = (m[1] + (m[2] ? ' ' + m[2] : '')).toLowerCase();
      if (/^2 billion$/.test(v) || /^(8|15) (%|percent)$/.test(v)) continue;
      if (!m[2] && Number(m[1].replace(/,/g, '')) < 10) continue; // "top 3", "page 1"
      if (seen.has(m[1].replace(/[,.]/g, ''))) continue; // already in the conversation, not invented
      out.push('a number about AI that is not one of our facts (' + v.replace(/ (%|x)$/, '$1') + ')');
    }
    if (/\b(8|15) ?(%|percent)/i.test(sent) && /\bgoogle('s)? (says|said|found|finds|reports?|data|numbers?)\b/i.test(sent) && !/\bstudy\b/i.test(sent)) out.push("gives the study's numbers as Google's");
    if (/\b(you('ll| will)|we('ll| will)|guarantee[sd]?)\b[^.?!]{0,40}\b(appear|show up|be (featured|mentioned|cited|quoted|listed|picked|recommended))\b/i.test(sent) && !/\b(not|can't|cannot|never|no one|nobody|won't|best chance)\b/i.test(sent)) out.push('promises a spot in AI answers');
  }
  if (/\bGEO\b|\bLLMs?\b/.test(plainText) || /\b(schema|structured data|entit(y|ies))\b/i.test(plainText)) out.push('uses AI search jargon (GEO, LLM, entity, schema)');
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
  t = t.replace(new RegExp("(what is|what's|which is) (your|the) (website|site|url|web address|link)( of [a-z0-9 -]{1,30})?" + SEP, 'gi'), '')
       .replace(new RegExp('(could you |can you |please |just )?(share|send|paste|drop)( me| over)? (your|the) (website|site|url|web address|link)( link| address)?( here)?' + SEP + '?', 'gi'), '')
       .replace(/\n{3,}/g, '\n\n').trim();
  // a sentence that now starts mid-way gets its capital letter back (links stay as they are)
  t = t.replace(/(^|\n\n|[.?]\s+)([a-z])(?!ttps?:\/\/|ww\.)/g, (m, a, b) => a + b.toUpperCase());
  if (!c.website_known && /prepare the audit/.test(String(r.flag || '')) && !/website not known/.test(String(r.flag || ''))) r.flag = (String(r.flag || '').trim() ? String(r.flag).trim() + '; ' : '') + 'website not known, please find it';
  for (const u of links) if (!ALLOWED.some(a => u === a || u === a + '/')) problems.push('link not allowed: ' + u);
  if (/\b(ai|automated|automation|scheduled)\b/i.test(t.replace(/\b(google'?s )?ai (search|results?|answers?|overviews?|mode|assistants?|tools?|summar(y|ies)|chat ?bots?)\b/gi, ''))) problems.push('uses a banned word');
  problems.push(...aiProblems(t, String((ctx[i] && ctx[i].json.transcript) || '') + ' ' + String(c.email || '')));
  if (/\b(2|two|3|three|60|sixty)[- ]?(months?|days?)\b[^.?!\n]{0,40}\b(money[- ]back|refund|guarantee)|\b(money[- ]back|refund|guarantee)\b[^.?!\n]{0,40}\b(2|two|3|three)[- ]?months?\b/i.test(t)) problems.push('calls the money back guarantee 2 or 3 months (it is the 90 day money back guarantee)');
  if (/\bfarhan\b/i.test(t)) problems.push('talks about farhan in the third person');
  if (/(what|which) is (your|the) (website|site|url|link)|(share|send|paste) (me )?(your|the) (website|site|url|link)|address of (your|the) (website|site)/i.test(t)) problems.push('asks for the website');
  // NO PRICE NUMBERS BEFORE THE AUDIT (pay per lead has its own price, and after the audit the plans may be named)
  const convo = String((ctx[i] && ctx[i].json.transcript) || '');
  const auditDelivered = /(audit|proposal|roadmap|pricing|plan)[^\n]{0,60}(attached|enclosed|pdf|docs\.google|drive\.google)|attached[^\n]{0,60}(audit|proposal|roadmap|plan)|here is (your|the) (audit|proposal|roadmap|plan)|(sent|sending) you the (audit|proposal|roadmap)/i.test(convo);
  // PRICES BY CAMPAIGN (23 Oct): the writer picked this conversation's price list (AI Written campaign: $999,
  // $1,349, $1,999; every other campaign: $349, $549, $1,649) and found any price already quoted to this person.
  // Only those, and the $1,000 of the money back guarantee, may appear; a plan price from the other list is held
  // unless it was already quoted to this person earlier in the thread. Before the audit the range and Growth
  // may appear (the writer gives the range only if they insist).
  const dollarsIn = x => (x.match(/\$\s*[\d,]+(\.\d+)?/g) || []).map(v => Number(v.replace(/[^\d.]/g, '')));
  const dollars = dollarsIn(t);
  const KNOWN_PRICES = [349, 549, 799, 1099, 1649, 1699, 999, 1349, 1999];
  const SET = Array.isArray(c.price_nums) && c.price_nums.length === 3 ? c.price_nums.map(Number) : [349, 549, 1649];
  const QUOTED = (Array.isArray(c.prices_quoted) ? c.prices_quoted : []).map(Number);
  const OURS = SET.concat([1000], QUOTED);
  const money = d => '$' + String(d).replace(/(\d)(\d{3})$/, '$1,$2');
  const amount = d => money(d).slice(1).replace(',', ',?');
  const priceSeen = SET.concat(QUOTED).some(d => new RegExp('\\$\\s*' + amount(d) + '\\b').test(convo));
  const rangeGiven = new RegExp('\\$\\s*' + amount(SET[0]) + '\\s*(to|and|-|–)\\s*\\$\\s*' + amount(SET[2])).test(t);
  for (const d of new Set(dollars)) if (KNOWN_PRICES.includes(d) && !OURS.includes(d)) problems.push('a price from the other price list (' + money(d) + '); this conversation uses ' + SET.map(money).join(', ') + (QUOTED.length ? ' (already quoted: ' + QUOTED.map(money).join(', ') + ')' : ''));
  // STARTER HAS NO MONEY BACK GUARANTEE (23 Oct, septic.ca): hold a message that names this conversation's Starter
  // price and also talks about the guarantee or the $1,000, unless it says Starter has none or points to Growth for it
  const STARTER = [SET[0]].concat(QUOTED.filter(d => d === 349 || d === 999));
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
  // the booking link and talk of a call only when THEY asked to talk
  const askedToTalk = /\b(call|calls|phone|talk|speak|meet|meeting|zoom|teams|chat|whatsapp|calendar|schedule)\b/i.test(String(c.their_latest || ''));
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


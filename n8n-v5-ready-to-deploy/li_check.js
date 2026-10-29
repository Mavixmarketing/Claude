// CHECK THE REPLY before anything is sent. Small slips are fixed here
// (capitals, a stray greeting, dashes, exclamation marks, one long block).
// Anything more serious is not sent: it goes to Slack for Farhan instead.
const cfg = $('Settings').first().json;
const ctx = $('Opus Request').all();
const ALLOWED = cfg.ALLOWED_LINKS;
// AI SEARCH FACTS (22 Oct): next to any talk of AI, the only numbers allowed are 2 billion, 8% and 15%
// (small counts like "top 3" are fine). No jargon (GEO, LLM, entity, schema; AEO is allowed), the study numbers are
// never called Google's, and we never promise a spot in AI answers.
function aiProblems(text, known) {
  const out = [];
  const plainText = String(text || '').replace(/https?:\/\/\S+/g, ' ');
  for (const sent of plainText.split(/(?<=[.?!])\s+|\n+/)) {
    if (!/\b(ai|chatgpt|chat gpt|gemini|perplexity|copilot|chatbots?|llms?)\b/i.test(sent)) continue;
    const s = sent.replace(/\$\s*[\d,]+(\.\d+)?/g, ' ').replace(/#\s*1\b/g, ' ').replace(/\b(19|20)\d\d\b/g, ' ')
      .replace(/\b\d+\s*(to|-|–)\s*\d+\s*(months?|weeks?|days?)\b/gi, ' ').replace(/\b\d+[- ]?(minutes?|mins?|months?|weeks?|days?|hours?|years?)\b/gi, ' ');
    for (const m of s.matchAll(/(\d[\d,.]*\d|\d)\s*(%|percent\b|billion\b|million\b|thousand\b|bn\b|m\b|k\b|x\b|times\b)?/gi)) {
      const v = (m[1] + (m[2] ? ' ' + m[2] : '')).toLowerCase();
      if (/^2 billion$/.test(v) || /^(8|15) (%|percent)$/.test(v)) continue;
      if (!m[2] && Number(m[1].replace(/,/g, '')) < 10) continue; // "top 3", "page 1"
      out.push('a number about AI that is not one of our facts (' + v.replace(/ (%|x)$/, '$1') + ')');
    }
    if (/\b(8|15) ?(%|percent)/i.test(sent) && /\bgoogle('s)? (says|said|found|finds|reports?|data|numbers?)\b/i.test(sent) && !/\bstudy\b/i.test(sent)) out.push("gives the study's numbers as Google's");
    if (/\b(you('ll| will)|we('ll| will)|guarantee[sd]?)\b[^.?!]{0,40}\b(appear|show up|(be|get) (you |your business )?(featured|mentioned|cited|quoted|listed|picked|recommended|named)|(get|put) (you|your business|your name) (in|into|inside))\b|\b(guarantee|promise)[sd]?\b[^.?!]{0,30}\b(spot|place|mention|position)\b/i.test(sent) && !/\b(not|can't|cannot|never|no one|nobody|won't|best chance)\b/i.test(sent)) out.push('promises a spot in AI answers');
  }
  if (/\bGEO\b|\bLLMs?\b/.test(plainText) || /\b(schema|structured data|entit(y|ies))\b/i.test(plainText)) out.push('uses AI search jargon (GEO, LLM, entity, schema)');
  // AI answers (25 Oct): getting named in AI answers is simply part of the work. Gemini, "AI tools" and "local search" are fine (25 Oct, Farhan's approved wording). "AEO" is allowed (the writer uses it only if
  // they used it first, or when they ask what we do). It is never sold as an extra: "at no extra cost" / "bonus" next to AI answers or AEO is held.
  for (const sent of plainText.split(/(?<=[.?!])\s+|\n+/)) if (/\b(AEO|ai (answers?|overviews?|search|mode|results?|tools?|assistants?|summar(y|ies)|apps?)|google'?s ai|chatgpt|perplexity|gemini)\b/i.test(sent) && /\b(no (extra|additional) (cost|charge|fee)|at no (cost|charge)|free of charge|bonus)\b/i.test(sent)) { out.push('sells AI answers as an extra ("at no extra cost", "bonus"); say it is simply part of the work'); break; }
  return [...new Set(out)];
}
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
return $input.all().map((it, i) => {
  const { opus_body, transcript, ...c } = ctx[i] ? ctx[i].json : {};
  let r = {};
  const raw = (((it.json.choices || [])[0] || {}).message || {}).content || '';
  try { r = JSON.parse(String(raw).replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, '$1')); } catch (e) { r = {}; }
  const problems = c.problems ? [c.problems] : [];
  let t = String(r.reply || '').trim();
  const send = r.send !== false && t.length > 0;
  if (!raw) problems.push('no answer from the writing model');
  // keep links as they are, lowercase the rest
  const links = [];
  t = t.replace(/https?:\/\/[^\s)<>"]+/g, u => { const tail = (u.match(/[.,;:]+$/) || [''])[0]; links.push(u.slice(0, u.length - tail.length)); return '\u0000' + (links.length - 1) + '\u0000' + tail; });
  t = t.replace(/^(hi|hey|hello|dear|good (morning|afternoon|evening))\b[^\n,]{0,40},?\s*/i, '');
  t = t.replace(/\n+\s*(best|thanks|thank you|regards|cheers|kind regards|best regards|warm regards)[^\n]{0,20}(\n+\s*farhan\.?)?\s*$/i, '');
  t = t.replace(/\n+\s*farhan\.?\s*$/i, '');
  t = t.replace(/\s*[—–]\s*/g, ', ').replace(/\s+-\s+/g, ', ').replace(/!/g, '.');
  t = paragraphs(t);
  t = t.replace(/\u0000(\d+)\u0000/g, (_, n) => links[Number(n)]);
  t = t.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  // NEVER ASK FOR THE WEBSITE: any website question is taken out, the rest stays
  const SEP = '(\\s*,\\s*and\\s+|\\s+and\\s+|\\s*,\\s*|\\s*\\?\\s*(and\\s+)?)';
  t = t.replace(new RegExp("(what is|what's|which is) (your|the) (website|site|url|web address|link)( of [a-z0-9 -]{1,30})?" + SEP, 'gi'), '')
       .replace(new RegExp('(could you |can you |please |just )?(share|send|paste|drop)( me| over)? (your|the) (website|site|url|web address|link)( link| address)?( here)?' + SEP + '?', 'gi'), '')
       .replace(new RegExp('which (website|site) should i (look at|check)' + SEP + '?', 'gi'), '')
       .replace(/\n{3,}/g, '\n\n').trim();
  t = t.replace(/(^|\n\n|[.?]\s+)([a-z])(?!ttps?:\/\/|ww\.)/g, (m, a, b) => a + b.toUpperCase());
  if (/(what|which) is (your|the) (website|site|url|link)|(share|send|paste) (me )?(your|the) (website|site|url|link)|which (website|site) should/i.test(t)) problems.push('asks for the website');
  const convo = String((ctx[i] && ctx[i].json.transcript) || '');
  const auditDelivered = /(audit|proposal|check)[^.\n]{0,40}(attached|enclosed)|here is (your|the) (audit|proposal|check)|(sent|sending) you the (audit|proposal)/i.test(convo);
  // PRICES (23 Oct): LinkedIn uses the old price list ($349, $549, $1,649) and the $1,000 of the money back
  // guarantee; a plan price from the other list only if it was already quoted to this person earlier in the chat.
  // Before the audit only the range ($349 to $1,649) or Growth.
  const KNOWN_PRICES = [349, 549, 799, 1099, 1649, 1699, 999, 1349, 1999, 1600, 2500];
  const SET = Array.isArray(c.price_nums) && c.price_nums.length === 3 ? c.price_nums.map(Number) : [349, 549, 1649];
  const QUOTED = (Array.isArray(c.prices_quoted) ? c.prices_quoted : []).map(Number);
  const OURS = SET.concat([1000], QUOTED);
  // AI Written Starter (28 Oct): "normally $1,349, for you $999" may name the full price next to the discount
  if (SET[0] === 999 && /\$\s*999\b/.test(t) && /normally|usually|regular(ly)?|instead of|down from|discount|reduced|\bwas\b/i.test(t)) OURS.push(1349);
  const money = d => '$' + String(d).replace(/(\d)(\d{3})$/, '$1,$2');
  const amount = d => money(d).slice(1).replace(',', ',?');
  const priceSeen = SET.concat(QUOTED).some(d => new RegExp('\\$\\s*' + amount(d) + '\\b').test(convo));
  const rangeRe = new RegExp('\\$\\s*' + amount(SET[0]) + '\\s*(to|and|-|–)\\s*\\$\\s*' + amount(SET[2]));
  for (const d of new Set((t.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, ''))))) if (KNOWN_PRICES.includes(d) && !OURS.includes(d)) problems.push('a price from the other price list (' + money(d) + '); LinkedIn uses ' + SET.map(money).join(', '));
  // STARTER HAS NO MONEY BACK GUARANTEE (23 Oct, septic.ca): hold a message that names this conversation's Starter
  // price and also talks about the guarantee or the $1,000, unless it says Starter has none or points to Growth for it
  const STARTER = [SET[0]].concat(QUOTED.filter(d => d === 349 || d === 999));
  const DOLLARS_T = (t.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, '')));
  if (DOLLARS_T.some(d => STARTER.includes(d)) && /money[- ]?back|guarantee|refund|\$\s*1,?000\b/i.test(t) && !/starter[^.?!]{0,80}\b(no|without|doesn't|does not|isn't|is not)\b[^.?!]{0,40}(guarantee|money[- ]?back)|\b(no|without)\b[^.?!]{0,30}(guarantee|money[- ]?back)[^.?!]{0,60}starter|growth[^.?!]{0,100}(guarantee|money[- ]?back)|(guarantee|money[- ]?back)[^.?!]{0,100}growth/i.test(t)) problems.push('promises the money back guarantee next to the Starter price (only Growth and Premium have it)');
  for (const sent of t.split(/(?<=[.?])\s+/)) {
    if (!/(a|per) month|\bplans?\b|our (price|fee)|we charge/i.test(sent) || /worth|job|customer|booking|install|patient|client|often around|roughly|typical|usually around/i.test(sent)) continue;
    const nums = (sent.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, '')));
    for (const d of nums) if (!OURS.includes(d) && !KNOWN_PRICES.includes(d)) problems.push('a price that is not one of ours ($' + d + ')');
    if (nums.some(d => (d === SET[0] || d === SET[2]) && !QUOTED.includes(d)) && !auditDelivered && !priceSeen && !rangeRe.test(sent)) problems.push('gives plan prices before the audit without the range');
    if (/(£|€)\s*\d|\b(cad|aud|nzd|gbp|eur)\b/i.test(sent)) problems.push('our price not in usd');
  }
  for (const u of links) if (!ALLOWED.some(a => u === a || u === a + '/')) problems.push('link not allowed: ' + u);
  if (new Set(links).size > 1) problems.push('more than one link');
  for (const k of repeatCases(links, String((ctx[i] && ctx[i].json.transcript) || ''))) problems.push('sends a case study already sent in this conversation (' + k + '); use a different one');
  if (/[{}\[\]]/.test(t)) problems.push('has an unfilled blank such as {site}');
  const asked = (t.match(/\?/g) || []).length;
  if (asked > 2) problems.push('asks ' + asked + ' questions');
  { const bw = t.replace(/\bgoogle'?s ai\b|\bgoogle ai\b|\bai (search|results?|answers?|overviews?|mode|assistants?|tools?|summar(y|ies)|chat ?bots?|platforms?|apps?|side|like|such as)\b/gi, '').match(/\b(ai|automated|automation|scheduled)\b/i); if (bw) problems.push('uses a banned word: "' + bw[0] + '"'); } // "AI" only when it is about search (Google's AI, AI answers, AI Overviews...)
  problems.push(...aiProblems(t, convo));
  if (/\b(2|two|3|three|60|sixty)[- ]?(months?|days?)\b[^.?!\n]{0,40}\b(money[- ]back|refund|guarantee)|\b(money[- ]back|refund|guarantee)\b[^.?!\n]{0,40}\b(2|two|3|three)[- ]?months?\b/i.test(t)) problems.push('calls the money back guarantee 2 or 3 months (it is the 90 day money back guarantee)');
  if (/\bfarhan\b/i.test(t)) problems.push('talks about farhan in the third person');
  // NEVER PAY ON RESULTS: hold any reply that offers pay per lead / per call, pay only for results, or ads as a way round it
  for (const sent of t.split(/(?<=[.?!])\s+|\n+|[,;]?\s*\b(?:but|however|though|although|where|while)\b\s*|;\s*/i).filter(Boolean)) {
    const offers = (/\bper (qualified |warm )?(lead|appointment|consultation|call|booking)\b/i.test(sent) && /\$\s*\d/.test(sent)) || /\b(you only pay|only pay (for|per|when)|pay only (for|per|when)|pay per (qualified |warm )?lead|lead generation through|commission)\b/i.test(sent);
    if (offers && !/\b(don't|doesn't|do not|does not|never|not|isn't|aren't|can't|cannot|won't|wouldn't)\b/i.test(sent)) { problems.push('offers pay per lead or pay on results (we never do)'); break; }
  }
  const words = t.split(/\s+/).filter(Boolean).length;
  if (send && words > 80) problems.push('too long (' + words + ' words)');
  if (send && words < 4) problems.push('too short');
  return { json: { ...c, send, reply: t, flag: String(r.flag || '').trim(), ok: send && problems.length === 0, problems: problems.join('; '), words } };
});


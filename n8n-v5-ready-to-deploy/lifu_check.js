// CHECK THE FOLLOW-UP before sending: fix small slips, hold anything odd.
const cfg = $('Settings').first().json;
const ctx = $('Follow-up Request').all();
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
  const problems = [];
  const who = (c.lead_name || 'someone') + ' · ' + c.lead_url;
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
  // NEVER ASK FOR THE WEBSITE: any website question is taken out, the rest stays
  const SEP = '(\\s*,\\s*and\\s+|\\s+and\\s+|\\s*,\\s*|\\s*\\?\\s*(and\\s+)?)';
  t = t.replace(new RegExp("(what is|what's|which is) (your|the) (website|site|url|web address|link)( of [a-z0-9 -]{1,30})?" + SEP, 'gi'), '')
       .replace(new RegExp('(could you |can you |please |just )?(share|send|paste|drop)( me| over)? (your|the) (website|site|url|web address|link)( link| address)?( here)?' + SEP + '?', 'gi'), '')
       .replace(new RegExp('which (website|site) should i (look at|check)' + SEP + '?', 'gi'), '')
       .replace(/\n{3,}/g, '\n\n').trim();
  t = t.replace(/(^|\n\n|[.?]\s+)([a-z])(?!ttps?:\/\/|ww\.)/g, (m, a, b) => a + b.toUpperCase());
  for (const u of links) if (!ALLOWED.some(a => u === a || u === a + '/')) problems.push('link not allowed: ' + u);
  if (new Set(links).size > 1) problems.push('more than one link');
  for (const k of repeatCases(links, String((ctx[i] && ctx[i].json.transcript) || ''))) problems.push('sends a case study already sent in this conversation (' + k + '); use a different one');
  if (/[{}\[\]]/.test(t)) problems.push('has an unfilled blank such as {site}');
  { const _known = (String((ctx[i] && ctx[i].json.transcript) || '') + ' ' + String(c.lead_name || '')).toLowerCase(); const bw = t.replace(/[a-z0-9&'.-]*\bai\b[a-z0-9&'.-]*|\b(automated|automation|scheduled)\b/gi, m => (m.length > 2 && new RegExp('(^|[^a-z0-9])' + m.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])').test(_known)) ? ' ' : m).replace(/\bgoogle'?s ai\b|\bgoogle ai\b|\bai (search|results?|answers?|overviews?|mode|assistants?|tools?|summar(y|ies)|chat ?bots?|platforms?|apps?|side|like|such as)\b/gi, '').match(/\b(ai|automated|automation|scheduled)\b/i); if (bw) problems.push('uses a banned word: "' + bw[0] + '"'); } // "AI" only when it is about search (Google's AI, AI answers, AI Overviews...). 1 Nov: a word already in the conversation (a business name like "AI-Innovate" or "Automation Pros") is not ours, so it never counts
  problems.push(...aiProblems(t, String((ctx[i] && ctx[i].json.transcript) || '')));
  if (/\b(2|two|3|three|60|sixty)[- ]?(months?|days?)\b[^.?!\n]{0,40}\b(money[- ]back|refund|guarantee)|\b(money[- ]back|refund|guarantee)\b[^.?!\n]{0,40}\b(2|two|3|three)[- ]?months?\b/i.test(t)) problems.push('calls the money back guarantee 2 or 3 months (it is the 90 day money back guarantee)');
  if (/(what|which) is (your|the) (website|site|url|link)|(share|send|paste) (me )?(your|the) (website|site|url|link)|which (website|site) should/i.test(t)) problems.push('asks for the website');
  // FOLLOW-UP 5 IS SIMPLY THE LAST EMAIL (24 Oct, Farhan): no "for a while", "for now" or any hint that we will write
  // again. The common slip ("my last email for a while") is fixed; anything else like it is held.
  if (Number(c.number) === 5) {
    t = t.replace(/\b(last (email|message|note|one)( from (me|us|our side))?),? (for a while|for now|for the time being|for the moment)\b/gi, '$1');
    if (/\bfor (a while|now|the time being|the moment|a bit)\b|\b(until|till) (later|next time)\b|\b(i'?ll|i will|we'?ll|we will) (check|circle|reach|come) back\b|\b(write|email|reach out|be in touch|get in touch|try) (again )?(later|soon|another time|in a (few|couple))\b/i.test(t)) problems.push('follow-up 5 hints that we will write again (for a while, for now); it is simply the last message');
  }
  if (/\$\s*\d|refund|money back/i.test(t)) problems.push('gives a price or talks about refunds (follow-ups never do)');
  const words = t.split(/\s+/).filter(Boolean).length;
  if (send && words > 60) problems.push('too long (' + words + ' words)');
  const ok = send && problems.length === 0;
  const text = ok
    ? (cfg.SEND_FOR_REAL ? '' : 'TEST, not sent. ') + 'LinkedIn follow-up ' + c.number + ' sent to: ' + who + '\n' + t
    : 'LinkedIn follow-up held, nothing sent: ' + who + '\nDraft: ' + t + '\nWhy: ' + (problems.join('; ') || String(r.why || ''));
  return { json: { ...c, send, ok, reply: t, why: String(r.why || ''), problems: problems.join('; '), words, slack_text: text } };
});

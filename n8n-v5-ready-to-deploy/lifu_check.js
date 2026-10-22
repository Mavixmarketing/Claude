// CHECK THE FOLLOW-UP before sending: fix small slips, hold anything odd.
const cfg = $('Settings').first().json;
const ctx = $('Follow-up Request').all();
const ALLOWED = cfg.ALLOWED_LINKS;
// AI SEARCH FACTS (22 Oct): next to any talk of AI, the only numbers allowed are 2 billion, 8% and 15%
// (small counts like "top 3" are fine). No jargon (GEO, LLM, entity, schema), the study numbers are
// never called Google's, and we never promise a spot in AI answers.
function aiProblems(text) {
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
    if (/\b(you('ll| will)|we('ll| will)|guarantee[sd]?)\b[^.?!]{0,40}\b(appear|show up|be (featured|mentioned|cited|quoted|listed|picked|recommended))\b/i.test(sent) && !/\b(not|can't|cannot|never|no one|nobody|won't|best chance)\b/i.test(sent)) out.push('promises a spot in AI answers');
  }
  if (/\bGEO\b|\bLLMs?\b/.test(plainText) || /\b(schema|structured data|entit(y|ies))\b/i.test(plainText)) out.push('uses AI search jargon (GEO, LLM, entity, schema)');
  return [...new Set(out)];
}
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
  if (/[{}\[\]]/.test(t)) problems.push('has an unfilled blank such as {site}');
  if (/\b(ai|automated|automation|scheduled)\b/i.test(t.replace(/\b(google'?s )?ai (search|results?|answers?|overviews?|mode|assistants?|tools?|summar(y|ies)|chat ?bots?)\b/gi, ''))) problems.push('uses a banned word');
  problems.push(...aiProblems(t));
  if (/\b(2|two|3|three|60|sixty)[- ]?(months?|days?)\b[^.?!\n]{0,40}\b(money[- ]back|refund|guarantee)|\b(money[- ]back|refund|guarantee)\b[^.?!\n]{0,40}\b(2|two|3|three)[- ]?months?\b/i.test(t)) problems.push('calls the money back guarantee 2 or 3 months (it is the 90 day money back guarantee)');
  if (/(what|which) is (your|the) (website|site|url|link)|(share|send|paste) (me )?(your|the) (website|site|url|link)|which (website|site) should/i.test(t)) problems.push('asks for the website');
  if (/\$\s*\d|refund|money back/i.test(t)) problems.push('gives a price or talks about refunds (follow-ups never do)');
  const words = t.split(/\s+/).filter(Boolean).length;
  if (send && words > 60) problems.push('too long (' + words + ' words)');
  const ok = send && problems.length === 0;
  const text = ok
    ? (cfg.SEND_FOR_REAL ? '' : 'TEST, not sent. ') + 'LinkedIn follow-up ' + c.number + ' sent to: ' + who + '\n' + t
    : 'LinkedIn follow-up held, nothing sent: ' + who + '\nDraft: ' + t + '\nWhy: ' + (problems.join('; ') || String(r.why || ''));
  return { json: { ...c, send, ok, reply: t, why: String(r.why || ''), problems: problems.join('; '), words, slack_text: text } };
});

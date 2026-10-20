// CHECK THE REPLY before anything is sent. Small slips are fixed here
// (capitals, a stray greeting, dashes, exclamation marks, one long block).
// Anything more serious is not sent: it goes to Slack for Farhan instead.
const cfg = $('Settings').first().json;
const ctx = $('Opus Request').all();
const ALLOWED = cfg.ALLOWED_LINKS;
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
  // prices: only our own numbers; before the audit only the range ($349 to $1,699) or Growth at $549
  const OURS = [349, 549, 1699, 1000];
  const priceSeen = /\$\s*(349|549|1,?699)/.test(convo);
  for (const sent of t.split(/(?<=[.?])\s+/)) {
    if (!/(a|per) month|\bplans?\b|our (price|fee)|we charge/i.test(sent) || /worth|job|customer|booking|install|patient|client|often around|roughly|typical|usually around/i.test(sent)) continue;
    const nums = (sent.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, '')));
    for (const d of nums) if (!OURS.includes(d)) problems.push('a price that is not one of ours ($' + d + ')');
    if (nums.some(d => d === 349 || d === 1699) && !auditDelivered && !priceSeen && !/\$\s*349\s*(to|and|-|–)\s*\$\s*1,?699/.test(sent)) problems.push('gives plan prices before the audit without the range');
    if (/(£|€)\s*\d|\b(cad|aud|nzd|gbp|eur)\b/i.test(sent)) problems.push('our price not in usd');
  }
  for (const u of links) if (!ALLOWED.some(a => u === a || u === a + '/')) problems.push('link not allowed: ' + u);
  if (new Set(links).size > 1) problems.push('more than one link');
  if (/[{}\[\]]/.test(t)) problems.push('has an unfilled blank such as {site}');
  const asked = (t.match(/\?/g) || []).length;
  if (asked > 2) problems.push('asks ' + asked + ' questions');
  if (/\b(ai|automated|automation|scheduled)\b/i.test(t.replace(/ai search|ai results/gi, ''))) problems.push('uses a banned word');
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


// CHECK THE FOLLOW-UP before sending: fix small slips, hold anything odd.
const cfg = $('Settings').first().json;
const ctx = $('Follow-up Request').all();
const ALLOWED = cfg.ALLOWED_LINKS;
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
  if (/\b(ai|automated|automation|scheduled)\b/i.test(t.replace(/ai search|ai results/gi, ''))) problems.push('uses a banned word');
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

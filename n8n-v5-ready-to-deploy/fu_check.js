// CHECK THE FOLLOW-UP before sending: fix small slips, hold anything odd.
const cfg = $('Settings').first().json;
const ctx = $('Follow-up Request').all();
const ALLOWED = ["https://mavixmarketing.com/case-studies", "https://mavixmarketing.com/case-studies/all-dogs-rock", "https://mavixmarketing.com/case-studies/construction-management-seo", "https://mavixmarketing.com/case-studies/dental-clinic-seo", "https://mavixmarketing.com/case-studies/edtech-software-seo", "https://mavixmarketing.com/case-studies/exam-prep-platform-seo", "https://mavixmarketing.com/case-studies/financial-advisers-seo", "https://mavixmarketing.com/case-studies/freight-forwarding-seo", "https://mavixmarketing.com/case-studies/home-goods-retailer-seo", "https://mavixmarketing.com/case-studies/hr-software-seo", "https://mavixmarketing.com/case-studies/la-vela-coffee", "https://mavixmarketing.com/case-studies/lead-gen-volume", "https://mavixmarketing.com/case-studies/martial-arts-academy-seo", "https://mavixmarketing.com/case-studies/meta-lead-gen", "https://mavixmarketing.com/case-studies/my-favorite-therapists", "https://mavixmarketing.com/case-studies/news-portal-seo", "https://mavixmarketing.com/case-studies/online-pharmacy-seo", "https://mavixmarketing.com/case-studies/orthopaedic-clinic-seo", "https://mavixmarketing.com/case-studies/plumbing-company-seo", "https://mavixmarketing.com/case-studies/property-classifieds-seo", "https://mavixmarketing.com/case-studies/real-estate-brokerage-seo", "https://mavixmarketing.com/case-studies/skincare-brand-seo", "https://mavixmarketing.com/seo-pricing", "https://mavixmarketing.com"];
const linkify = p => p.replace(/(https?:\/\/[^\s<]+?)([.,;:]?)(?=\s|$)/g, '<a href="$1">$1</a>$2');
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
  t = t.replace(new RegExp("(what is|what's|which is) (your|the) (website|site|url|web address|link)( of [a-z0-9 -]{1,30})?" + SEP, 'gi'), '')
       .replace(new RegExp('(could you |can you |please |just )?(share|send|paste|drop)( me| over)? (your|the) (website|site|url|web address|link)( link| address)?( here)?' + SEP + '?', 'gi'), '')
       .replace(/\n{3,}/g, '\n\n').trim();
  t = t.replace(/(^|\n\n|[.?]\s+)([a-z])(?!ttps?:\/\/|ww\.)/g, (m, a, b) => a + b.toUpperCase());
  for (const u of links) if (!ALLOWED.some(a => u === a || u === a + '/')) problems.push('link not allowed: ' + u);
  if (links.length > 2) problems.push('more than two links');
  if (/\b(ai|automated|automation|scheduled)\b/i.test(t.replace(/(google )?ai (search|results|answers|overviews)|ai search/gi, ''))) problems.push('uses a banned word');
  if (/(what|which) is (your|the) (website|site|url|link)|(share|send|paste) (me )?(your|the) (website|site|url|link)|address of (your|the) (website|site)/i.test(t)) problems.push('asks for the website');
  if (/just following up|bringing this back|checking in|top of your inbox|floating this/i.test(t)) problems.push('only chases, says nothing new');
  if (/cal\.id|calendly|\b(call|meeting|zoom|chat)\b[^.\n]{0,40}\b(together|time|slot|book|schedule)|\b(book|grab|schedule|hop on|jump on)\b[^.\n]{0,20}\b(call|time|meeting|chat)|(short|quick|brief) (call|chat|meeting)/i.test(t.replace(/no call (is )?needed|no need (for|to) (a )?call|without a call/gi, ''))) problems.push('suggests a call');
  // prices: none before the audit; after the audit only our own plan prices (rough job values are fine)
  const convo = String((ctx[i] && ctx[i].json.transcript) || c.history || '');
  const auditSent = /^FARHAN/m.test(convo) || /(audit|proposal|roadmap)[^\n]{0,60}(attached|enclosed|pdf)|here is (your|the) (audit|proposal)/i.test(convo);
  const OURS = [349, 549, 1649, 1000];
  for (const sent of t.split(/(?<=[.?])\s+/)) {
    if (!/(a|per) month|\bplans?\b|our (price|fee)|we charge/i.test(sent) || /worth|job|customer|booking|install|patient|client|often around|roughly|typical|usually around/i.test(sent)) continue;
    const nums = (sent.match(/\$\s*[\d,]+/g) || []).map(v => Number(v.replace(/[^\d]/g, '')));
    if (nums.length && !auditSent) problems.push('gives a price before the audit');
    for (const d of nums) if (!OURS.includes(d)) problems.push('a price that is not one of ours ($' + d + ')');
    if (/(£|€)\s*\d|\b(cad|aud|nzd|gbp|eur)\b/i.test(sent)) problems.push('our price not in usd');
  }
  // NEVER PAY ON RESULTS: hold any reply that offers pay per lead / per call, pay only for results, or ads as a way round it
  for (const sent of t.split(/(?<=[.?!])\s+|\n+|[,;]?\s*\b(?:but|however|though|although|where|while)\b\s*|;\s*/i).filter(Boolean)) {
    const offers = (/\bper (qualified |warm )?(lead|appointment|consultation|call|booking)\b/i.test(sent) && /\$\s*\d/.test(sent)) || /\b(you only pay|only pay (for|per|when)|pay only (for|per|when)|pay per (qualified |warm )?lead|lead generation through|commission)\b/i.test(sent);
    if (offers && !/\b(don't|doesn't|do not|does not|never|not|isn't|aren't|can't|cannot|won't|wouldn't)\b/i.test(sent)) { problems.push('offers pay per lead or pay on results (we never do)'); break; }
  }
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

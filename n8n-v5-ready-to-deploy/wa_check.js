// CHECK THE REPLY before anything is sent. Small slips are fixed here (markdown, dashes, extra exclamation marks,
// emojis other than 🙂, a greeting after the first message, a sign-off, more than 3 lines). Anything risky is NOT
// sent: it goes to Slack as "Held" and the bot goes silent in that chat until Farhan types "#bot".
const s = $('Settings').first().json;
const c = $('Build Conversation').first().json;
const plan = $('Plan The Reply').first().json;
const later = c.in_hours ? 'give me a little time.' : 'he\'s offline now and will reply ' + (c.next_open || 'when he\'s back') + '.';
let send = false, reply = '', flag = '', handover = plan.handover, handover_reason = plan.handover_reason;
const problems = [];
let writer_failed = false;
if (plan.mode === 'fixed') { send = true; reply = plan.fixed_text; }
else if (plan.mode === 'opus') {
  const j = ($input.first() || {}).json || {};
  const raw = (((j.choices || [])[0] || {}).message || {}).content || '';
  let r = {};
  try { r = JSON.parse(String(raw).replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, '$1')); } catch (e) { r = {}; }
  if (!raw || typeof r.reply !== 'string') { writer_failed = true; problems.push('the writer gave no usable answer' + (j.error ? ' (' + String(j.error.message || j.error).slice(0, 120) + ')' : '')); }
  send = r.send !== false;
  reply = String(r.reply || '').trim();
  flag = String(r.flag || '').trim().slice(0, 300);
  if (r.handover === true && c.kind !== 'followup') { handover = true; handover_reason = 'writer unsure'; reply = 'Let me get Farhan to answer this properly, ' + later; send = true; }
  else if (r.handover === true) { send = false; handover = true; handover_reason = 'writer unsure'; }
}
const fromWriter = plan.mode === 'opus' && !handover;

// SMALL SLIPS, FIXED
if (fromWriter && reply) {
  let t = reply.replace(/\r/g, '');
  t = t.replace(/\*\*|__|^#+\s*/gm, '').replace(/^\s*([-•*]|\d+[.)])\s+/gm, '');
  t = t.replace(/\s*[—–]\s*/g, ', ').replace(/\s+-\s+/g, ', ');
  if (c.bot_sent_count > 0) t = t.replace(/^(hi|hey|hello|dear|namaste|good (morning|afternoon|evening))\b[^\n,.!?]{0,30}[,.!]?\s*/i, '');
  t = t.replace(/\n+\s*(regards|warm regards|best|thanks|thank you|cheers|team mavix|mavix( marketing)?( team)?|[-~]\s*mavix)[^\n]{0,30}\s*$/i, '');
  let bang = 0; t = t.replace(/!+/g, () => (++bang === 1 ? '!' : '.'));
  t = t.replace(/(?!\u{1F642})\p{Extended_Pictographic}️?/gu, '');
  t = t.replace(/[{}]/g, '');
  let lines = t.split(/\n+/).map(x => x.replace(/[ \t]+/g, ' ').trim()).filter(Boolean);
  if (lines.length > 3) lines = [lines[0], lines[1], lines.slice(2).join(' ')];
  t = lines.join('\n').replace(/\s+([,.?])/g, '$1').replace(/,\s*,/g, ',').replace(/^[,.\s]+/, '').trim();
  if (t) t = t[0].toUpperCase() + t.slice(1);
  reply = t;
}

// RISKY THINGS, HELD
const theirs = (c.transcript || '').split('\n').filter(l => /^THEM/.test(l)).join('\n') + '\n' + (c.their_latest || '');
const lastTheirs = (c.transcript || '').split('\n').filter(l => /^THEM/.test(l)).slice(-3).join('\n') + '\n' + (c.their_latest || '');
if (send && fromWriter) {
  const t = reply;
  const words = t.split(/\s+/).filter(Boolean).length;
  if (!t) problems.push('empty reply');
  if (words > 70) problems.push('too long for WhatsApp (' + words + ' words)');
  if (t.split('\n').length > 3) problems.push('more than 3 lines');
  if (/[A-Z]{3,}/.test(t) && t.replace(/[^A-Za-z]/g, '').length > 20 && t === t.toUpperCase()) problems.push('all capitals');
  // PRICES never go out from the bot (Farhan, 30 Oct 2026: price on request)
  const priceAsked = plan.category === 'price_question' || /price|pricing|cost|fee|charge|rate|package|plan|kitna|kitne|how much|quote|paisa|rupee|₹|budget|expensive|afford|mehenga|mahanga/i.test(lastTheirs);
  const money = [];
  const PRICE_RES = [
    /(₹|\brs\.?|\binr)\s?(\d[\d,]*(?:\.\d+)?)\s*(k|lakhs?|lacs?|l)?\b/gi,
    /\b(\d[\d,]*(?:\.\d+)?)\s*(lakhs?|lacs?)\b()/gi,
    /\b(\d[\d,]*(?:\.\d+)?)\s*(k)\s*(?=\/\s?month|a month|per month|\/mo|pm\b)/gi,
    /\b(\d{1,3}(?:,\d{2,3})+)()\s*(?=\/-|rupees|per month|a month|\/month|\/mo)/gi,
  ];
  const seenAt = new Set();
  PRICE_RES.forEach((re, n) => {
    for (const mm of t.matchAll(re)) {
      if (seenAt.has(mm.index) || [...seenAt].some(i => Math.abs(i - mm.index) < 3)) continue;
      seenAt.add(mm.index);
      const numTxt = n === 0 ? mm[2] : mm[1];
      const unit = String((n === 0 ? mm[3] : mm[2]) || '').toLowerCase();
      let v = Number(String(numTxt).replace(/,/g, ''));
      if (unit === 'k') v *= 1000; else if (/^(lakhs?|lacs?|l)$/.test(unit)) v *= 100000;
      money.push(v);
    }
  });
  if (money.length) problems.push('gives a price (only Farhan sends prices)');
  for (const mm of t.matchAll(/(\d+(\.\d+)?)\s?(%|percent)/gi)) if (![15, 17, 55, 146].includes(Number(mm[1]))) problems.push('a percentage that is not in our facts (' + mm[1] + '%)');
  if (/discount|special (price|offer|deal|rate)|lower (the )?price|reduce (the )?(price|fee)|cheaper|kam kar|% off/i.test(t) && !/15\s?%[^.?!\n]{0,60}quarter|quarter[^.?!\n]{0,60}15\s?%/i.test(t)) problems.push('talks about a discount beyond 15% for a quarter paid upfront');
  // MONEY QUESTIONS are never asked
  for (const sent of t.split(/(?<=[.?!])\s+|\n/)) if (/\?/.test(sent) && /budget|how much (can|do|would|will) you (spend|invest|afford)|kitna (kharch|budget)|what can you afford/i.test(sent)) problems.push('asks about their budget');
  // PROMISES
  if (/\b(guarantee[sd]?|promise[sd]?|definitely|surely|100\s?%)\b[^.?!\n]{0,50}\b(rank\w*|#\s?1|number one|no\.? ?1|top (spot|position|3|three|10|ten)|first (page|position|place|spot)|page (one|1)|patients|leads|sales|revenue|customers|enquiries|inquiries|calls|cases)\b/i.test(t)) problems.push('promises rankings or results');
  if (/\b(you('ll| will)|we('ll| will)( get you| make you| put you)?)\b[^.?!\n]{0,30}\b(rank (#?\s?1|first|top|number one)|be (#?\s?1|number one|on top|at the top|first on google)|top of google|first page)\b/i.test(t)) problems.push('promises a ranking');
  if (/\b(more|new|extra|get you|bring( you)?|double( your)?)\s+(\w+\s+)?patients\b/i.test(t)) problems.push('promises patients (NMC: no outcome claims for clinics)');
  if (/guarant/i.test(t) && !/target/i.test(t) && !/refund/i.test(t)) problems.push('mentions the guarantee without its terms (targets and refund)');
  // JARGON, unless they used the word first
  for (const mm of t.matchAll(/\b(GEO|AEO|LLMs?|SERPs?|E-?E-?A-?T|CTR|backlinks?|schema|structured data|entit(y|ies)|canonical|crawl\w*|index(ing|ed)|SGE|meta (tags?|descriptions?)|keyword density|domain authority|DA|DR)\b/g)) {
    if (!new RegExp('\\b' + mm[0] + '\\b', 'i').test(theirs)) { problems.push('jargon: ' + mm[0]); break; }
  }
  // LINKS
  const links = (t.match(/https?:\/\/[^\s)<>"]+|\b(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|in|id|io|net|org|co|html|ai)\b(?:\/[^\s)<>"]*)?/gi) || []).map(u => u.replace(/[.,;:!?]+$/, '').replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '').toLowerCase());
  const ALLOWED = [s.BOOKING_LINK, s.GUARANTEE_LINK, s.CASES_LINK, 'https://go.mavixmarketing.com'].map(u => u.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '').toLowerCase());
  if (links.length && !c.links_allowed) problems.push('a link in one of our first two messages');
  if (links.length > 1) problems.push('more than one link');
  for (const u of links) if (!ALLOWED.includes(u)) problems.push('a link that is not ours to share (' + u + ')');
  if (links.some(u => /cal\.id|calendly/.test(u)) && !c.booking_allowed) problems.push('the booking link before they replied twice');
  // PHONE NUMBERS, BOT TALK, MADE-UP NUMBERS
  for (const mm of t.matchAll(/\+?\d[\d\s-]{8,}\d/g)) if (mm[0].replace(/\D/g, '').length >= 10) { problems.push('contains a phone number'); break; }
  if (/\bas an ai\b|language model|i('m| am) (an? )?(ai|bot|chatbot)\b/i.test(t)) problems.push('talks about being an AI');
  const context = (c.transcript || '') + ' ' + (c.audit_due || '') + ' ' + JSON.stringify(c.known || {}) + ' ' + (c.domain || '');
  const plain = t.replace(/https?:\/\/\S+/g, ' ').replace(/\b\d{1,2}(:\d{2})?\s?(am|pm)\b/gi, ' ').replace(/\b\d{1,2}\s?(to|-|–)\s?\d{1,2}\b/g, ' ').replace(/\b(19|20)\d\d\b/g, ' ');
  const OK_NUMS = [10, 12, 13, 14, 15, 16, 17, 19, 20, 24, 28, 30, 45, 50, 55, 100, 146, 150, 470, 25000, 50000, 100000];
  for (const mm of plain.matchAll(/\d[\d,]*(\.\d+)?/g)) {
    const v = Number(mm[0].replace(/,/g, ''));
    if (v < 10 || OK_NUMS.includes(v) || context.includes(mm[0])) continue;
    problems.push('a number that is not in our facts (' + mm[0] + ')'); break;
  }
}
if (send && c.kind === 'followup' && c.unanswered >= s.MAX_UNANSWERED) problems.push('would be more than ' + s.MAX_UNANSWERED + ' unanswered messages');
if (send && !c.chat_id) problems.push('no WhatsApp chat id to send to');

const ok = send && !!reply && problems.length === 0;
const held = plan.mode !== 'silent' && !ok && !(plan.mode === 'opus' && !send && !writer_failed && !handover);
const needs_farhan = handover || held;
const delay_s = s.TEST ? 1 : s.DELAY_MIN_S + Math.floor(Math.random() * (s.DELAY_MAX_S - s.DELAY_MIN_S + 1));

// CRM CHANGES: STOP marks the row unsubscribed; answers to our questions go into city and notes
let crm_update = null;
if (c.lead_found && c.ref_code) {
  const a = plan.answers || {};
  let notes = String(c.lead_notes || '');
  const put = (k, v) => { if (!v) return; const re = new RegExp('(^|;\\s*)' + k + ':[^;]*'); notes = re.test(notes) ? notes.replace(re, '$1' + k + ': ' + v) : (notes ? notes + '; ' : '') + k + ': ' + v; };
  put('wa_competitor', a.competitor); put('found_by', a.found_by);
  if (plan.crm_status === 'unsubscribed') put('wa_stop', new Date().toISOString().slice(0, 10));
  const city = !(c.known || {}).cities && a.cities ? a.cities : '';
  // never blank a value already there: status keeps the one this run set (new -> contacted), city keeps the known one
  if (plan.crm_status || city || notes !== String(c.lead_notes || '')) crm_update = { ref_code: c.ref_code, status: plan.crm_status || (c.crm ? c.crm.status : c.lead_status), city: city || (c.known || {}).cities || '', notes, updated_at: new Date().toISOString() };
}
const ans = plan.answers || {};
const in_note = ['cities', 'competitor', 'found_by'].filter(k => ans[k]).map(k => k + '=' + ans[k]).join('; ');
return [{ json: {
  ok, send, held, reply, problems: problems.join('; '), flag, category: plan.category,
  handover, handover_reason, needs_farhan, delay_s, writer_failed,
  out_message_id: c.kind === 'followup' ? c.message_id : 'out-' + c.message_id,
  in_note: [in_note, plan.sort_reason ? 'why: ' + plan.sort_reason : ''].filter(Boolean).join(' | ').slice(0, 500),
  crm_update,
} }];

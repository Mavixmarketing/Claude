// BUILD THE CONVERSATION: the whole thread, oldest first, in plain text,
// with who wrote each message. Threads where we already answered are logged
// as answered_already. Test replays are cut at the prospect's last message.
// 23 Oct: our replies now go out 3 to 7 minutes after they are written (SalesBlink scheduled_time).
// Our own reply is placed in the conversation at the moment we wrote it (created_on), not at its
// send time. So a reply that is written but not sent yet still counts as our answer to everything
// before it (answered_already, nobody gets two answers), while a message they send during those
// minutes is newer than our reply and gets its own answer. pending_until is the latest send time of
// our replies still waiting to go, so a second reply is never sent before the first.
// The campaign (SalesBlink sequence id, and its name from the reply events) goes on to the writer, which picks
// the price list by it (25 Oct: every campaign with "ai written" in its name has the new prices).
const NL = '\n';
const s = v => (v === null || v === undefined) ? '' : String(v);
function toText(html) {
  let h = s(html).replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(script|style|head)[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  h = h.replace(/<(br|\/p|\/div|\/li|\/tr|\/h[1-6]|\/blockquote)[^>]*>/gi, NL).replace(/<[^>]*>/g, ' ');
  h = h.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;|&rsquo;|&lsquo;/gi, "'").replace(/&ldquo;|&rdquo;/gi, '"').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&#x?[0-9a-f]+;/gi, ' ').replace(/&[a-z]+;/gi, ' ');
  return h.split(NL).map(l => l.replace(/[ \t\r]+/g, ' ').trim()).filter(Boolean).join(NL);
}
// A quote header in any common language: "On ... wrote:", "... schreef op ...:", "Am ... schrieb ...:",
// "El ... escribió:", "Le ... a écrit :" and so on.
const HEAD_WORDS = ['wrote', 'schreef', 'schrieb', 'escribió', 'escribio', 'a écrit', 'a ecrit', 'scrisse', 'escreveu', 'skrev', 'kirjoitti', 'napisał', 'napisal', 'yazdı'];
const isHead = l => l.length < 250 && /:\s*$/.test(l) && HEAD_WORDS.some(w => l.includes(w));
function newPart(text) {
  const keep = [];
  const lines = s(text).split(NL);
  let cut = lines.length;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim().toLowerCase();
    if (l.startsWith('>') || /^-{3,}|^_{5,}/.test(l)) { cut = i; break; }
    if (/^on .{3,160} wrote:?$/.test(l) || isHead(l)) { cut = i; break; }
    if (/^from:/.test(l) && i + 1 < lines.length && /^(sent|to|date|subject):/i.test(lines[i + 1].trim())) { cut = i; break; }
    if ((l.includes('original message') || l.includes('forwarded message')) && l.length < 60) { cut = i; break; }
    keep.push(lines[i]);
  }
  let top = keep.join(NL).trim();
  // A reply written UNDER the quoted email (bottom posting, e.g. "Yes" after the quote):
  // take what comes after the last quoted line.
  if (!top && cut < lines.length) {
    let lastQ = -1;
    for (let i = cut; i < lines.length; i++) if (lines[i].trim().startsWith('>')) lastQ = i;
    if (lastQ >= 0) top = lines.slice(lastQ + 1).join(NL).trim();
  }
  return (top || s(text).trim()).slice(0, 2500);
}
// Ours: our sequence emails, our SalesBlink replies, and anything Farhan wrote
// by hand from his mailbox. SalesBlink stores a hand-written email with the
// prospect's own address in "to"; a prospect's reply is addressed to us.
const isOurs = m => {
  const e = (m.data || {}).email || {};
  const to = s(e.to).toLowerCase();
  const them = s(m.email).toLowerCase();
  return m.self === true || s(m.task_type).toLowerCase() !== 'reply' || (m.log && typeof m.log === 'object') || e.tzMode !== undefined || (them !== '' && to.includes(them));
};
const FREE = /^(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|icloud|me|aol|comcast|att|verizon|proton|protonmail|gmx|mail|zoho|yandex)\./i;
const picked = {};
if ($('Pick Thread').isExecuted) for (const p of $('Pick Thread').all()) picked[p.json.messageId] = p.json;
// campaign names from the reply events: by sequence id, and by email for a thread without one
const seqName = {}, emailSeqName = {};
try {
  if ($('Read Reply Events').isExecuted) for (const i of $('Read Reply Events').all()) {
    const list = Array.isArray(i.json.data) ? i.json.data : (Array.isArray(i.json.result) ? i.json.result : [i.json]);
    for (const e of list) {
      if (!e || !e.sequence_name) continue;
      if (e.sequence && !seqName[e.sequence]) seqName[String(e.sequence)] = String(e.sequence_name);
      const em = s(e.email).toLowerCase();
      if (em && !emailSeqName[em]) emailSeqName[em] = String(e.sequence_name);
    }
  }
} catch (err) { /* no names: the writer still knows every AI Written campaign by its id */ }
const out = [];
for (const it of $input.all()) {
  const raw = Array.isArray(it.json.data) ? it.json.data : [];
  if (!raw.length) continue;
  const messageId = s(raw[0].messageId);
  const p = picked[messageId] || null;
  const email = (p && p.email) || s((raw.find(m => !isOurs(m)) || raw[0]).email).toLowerCase();
  const nowMs = Date.now();
  let pendingUntil = 0;
  let msgs = raw.map(m => {
    const e = (m.data || {}).email || {};
    const sched = Number(m.scheduled_time || 0), made = Number(m.created_on || 0);
    const ours = isOurs(m);
    if (ours && sched > nowMs && m.completed !== true) pendingUntil = Math.max(pendingUntil, sched);
    const when = ours && made && sched && sched - made <= 15 * 60000 ? made : (sched || Number(m.completed_time || 0) || made);
    return { ours, when, subject: s(e.subject), text: newPart(toText(e.body)) };
  }).sort((a, b) => a.when - b.when);
  const sequence = s((raw.find(m => m.sequence) || {}).sequence);
  if (!p) { // test replay: cut after their last message
    let lastTheirs = -1;
    msgs.forEach((m, k) => { if (!m.ours) lastTheirs = k; });
    if (lastTheirs < 0) continue;
    msgs = msgs.slice(0, lastTheirs + 1);
  }
  const last = msgs[msgs.length - 1];
  if (!last) continue;
  if (last.ours) { if (p) out.push({ json: { event_id: p.event_id, email, status: 'answered_already' } }); continue; }
  const domain = email.split('@')[1] || '';
  const transcript = msgs.map(m => (m.ours ? 'US (Farhan, Mavix)' : 'THEM') + ' · ' + new Date(m.when).toISOString().slice(0, 16).replace('T', ' ') + ' UTC' + (m.subject ? ' · subject: ' + m.subject : '') + NL + m.text).join(NL + NL + '---' + NL + NL);
  out.push({ json: {
    event_id: p ? p.event_id : 'test:replay', email, messageId,
    their_latest: last.text,
    website_guess: domain && !FREE.test(domain) ? domain : '',
    replies_from_us: msgs.filter(m => m.ours).length - 1,
    sequence,
    sequence_name: seqName[sequence] || emailSeqName[email] || '',
    pending_until: pendingUntil,
    transcript: transcript.slice(-14000),
  } });
}
return out;

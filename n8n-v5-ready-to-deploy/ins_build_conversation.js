// BUILD THE CONVERSATION (Instantly adapter, 26 Oct). Input: one Instantly thread per item
// (GET /api/v2/emails?search=thread:<thread_id>, response { items: [Email, ...] }), or a test sample shaped the same.
// Output: exactly the fields the SalesBlink "Build Conversation" (ra_build_conversation.js) gives the shared sorter,
// writer, checker and Slack card: event_id, email, messageId (here the Instantly thread id), their_latest,
// website_guess, replies_from_us, sequence (campaign id), sequence_name (campaign NAME, so "ai written" in the name
// picks the new prices), pending_until, transcript. Plus what the Instantly send needs: reply_to_uuid (the newest
// email THEY sent in the thread; the reply goes to its sender), eaccount (our mailbox that received it, which
// sends the answer), reply_subject, and platform "instantly".
// Ours vs theirs: ue_type 2 (received) is theirs unless it came from one of our mailboxes; 1 (campaign), 3 (sent)
// and 4 (scheduled) are ours. Replies written but not sent yet (log rows "scheduled"/"sending" for this thread,
// they go out 3 to 7 minutes later) count as our answer from the moment they were written, exactly like the
// SalesBlink scheduled_time logic: no double answer, a newer message from them still gets its own answer, and
// pending_until keeps a second reply from going before the first.
const NL = '\n';
const s = v => (v === null || v === undefined) ? '' : String(v);
// --- the same text helpers as ra_build_conversation.js ---
function toText(html) {
  let h = s(html).replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(script|style|head)[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  h = h.replace(/<(br|\/p|\/div|\/li|\/tr|\/h[1-6]|\/blockquote)[^>]*>/gi, NL).replace(/<[^>]*>/g, ' ');
  h = h.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;|&rsquo;|&lsquo;/gi, "'").replace(/&ldquo;|&rdquo;/gi, '"').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&#x?[0-9a-f]+;/gi, ' ').replace(/&[a-z]+;/gi, ' ');
  return h.split(NL).map(l => l.replace(/[ \t\r]+/g, ' ').trim()).filter(Boolean).join(NL);
}
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
  if (!top && cut < lines.length) {
    let lastQ = -1;
    for (let i = cut; i < lines.length; i++) if (lines[i].trim().startsWith('>')) lastQ = i;
    if (lastQ >= 0) top = lines.slice(lastQ + 1).join(NL).trim();
  }
  return (top || s(text).trim()).slice(0, 2500);
}
// --- Instantly specifics ---
const bodyText = m => { const b = m.body || {}; const t = s(b.text).trim(); return t ? t.replace(/\r/g, '') : toText(b.html || m.content_preview || ''); };
const boxes = new Set(), boxDomains = new Set();
try { if ($('Read Accounts').isExecuted) for (const it of $('Read Accounts').all()) for (const a of (it.json.items || [])) { const e = s(a && a.email).toLowerCase(); if (e) { boxes.add(e); boxDomains.add(e.split('@')[1]); } } } catch (e) { /* none */ }
const OUR_DOMAIN = /^(mavix|maavix|mavex|mavvix|maviks|mavixx)[a-z0-9-]*\./i;
const ourAddr = a => { a = s(a).toLowerCase(); const d = a.split('@')[1] || ''; return !!a && (boxes.has(a) || boxDomains.has(d) || OUR_DOMAIN.test(d)); };
const isOurs = m => Number(m.ue_type) !== 2 || ourAddr(m.from_address_email);
const when = m => { const t = Date.parse(m.timestamp_email || m.timestamp_created || ''); return isFinite(t) ? t : 0; };
const FREE = /^(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|icloud|me|aol|comcast|att|verizon|proton|protonmail|gmx|mail|zoho|yandex)\./i;
const cfg = $('Settings').first().json;
const picked = {};
try { if ($('Pick Thread').isExecuted) for (const p of $('Pick Thread').all()) if (p.json.messageId) picked[p.json.messageId] = p.json; } catch (e) { /* test run */ }
const campName = {};
try { if ($('Read Campaigns').isExecuted) for (const it of $('Read Campaigns').all()) for (const c of (it.json.items || [])) if (c && c.id) campName[String(c.id)] = s(c.name); } catch (e) { /* no names */ }
// our replies written but not sent yet, from the log (Instantly has no scheduled send, see Due Sends)
const pendingByThread = {};
try {
  if ($('Read Log').isExecuted) for (const r of $('Read Log').all()) {
    const j = r.json || {};
    if (String(j.platform || '') !== 'instantly' || !j.message_id || !['scheduled', 'sending'].includes(String(j.status))) continue;
    if (String(j.event_id || '').startsWith('test:') !== !!cfg.TEST) continue;
    (pendingByThread[String(j.message_id)] = pendingByThread[String(j.message_id)] || []).push(j);
  }
} catch (e) { /* no log */ }
// EARLIER CONVERSATION FROM FARHAN'S OWN MAILBOX (28 Oct, Allen Spindel): when Farhan talked to someone outside
// Instantly (for example he sent the audit by hand from Gmail), a log row with event_id "context:<email>" (status
// "context", platform instantly) holds that conversation in its history (THEM / US / FARHAN blocks). The newest such
// row for the person is put in front of the transcript as its own block, so the writer and checker see it (prices and
// case studies in its US / FARHAN blocks count as already sent). It is never a message to answer: only the Instantly
// thread below decides whether they wrote last.
const contextByEmail = {};
try {
  if ($('Read Log').isExecuted) for (const r of $('Read Log').all()) {
    const j = r.json || {};
    if (!(String(j.event_id || '').startsWith('context:') || String(j.status || '') === 'context')) continue;
    if (String(j.platform || '') !== 'instantly' || !s(j.history).trim()) continue;
    const em = s(j.email).toLowerCase().trim();
    if (em && (!contextByEmail[em] || Number(j.id) > Number(contextByEmail[em].id))) contextByEmail[em] = j;
  }
} catch (e) { /* no log */ }
const contextBlock = em => {
  const j = contextByEmail[s(em).toLowerCase().trim()];
  if (!j) return '';
  return 'NOTE: EARLIER CONVERSATION, SENT FROM FARHAN\'S OWN MAILBOX (not in Instantly). Oldest first. Everything after the next line comes from Instantly and is newer.' + NL + NL + s(j.history).trim().slice(-10000) + NL + NL + '---' + NL + NL;
};
const out = [];
for (const it of $input.all()) {
  const raw = (Array.isArray(it.json.items) ? it.json.items : []).filter(m => m && m.id);
  if (!raw.length) continue;
  const messageId = s((raw.find(m => m.thread_id) || {}).thread_id || it.json.thread_id);
  const p = picked[messageId] || null;
  const theirs = raw.filter(m => !isOurs(m)).sort((a, b) => when(a) - when(b));
  const newestTheirs = theirs[theirs.length - 1] || null;
  const email = s((p && p.email) || (newestTheirs && (newestTheirs.lead || newestTheirs.from_address_email)) || (raw.find(m => m.lead) || {}).lead).toLowerCase();
  const nowMs = Date.now();
  let pendingUntil = 0;
  let msgs = raw.map(m => {
    const ours = isOurs(m);
    let w = when(m);
    if (Number(m.ue_type) === 4) { // scheduled in Instantly (not sent yet): ours from when it was made
      const sendAt = Date.parse(m.timestamp_email || ''); if (isFinite(sendAt) && sendAt > nowMs) pendingUntil = Math.max(pendingUntil, sendAt);
      const made = Date.parse(m.timestamp_created || ''); if (isFinite(made)) w = made;
    }
    return { ours, when: w, subject: s(m.subject), text: newPart(bodyText(m)) };
  });
  const keyOf = t => s(t).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 60);
  const have = new Set(msgs.filter(m => m.ours).map(m => keyOf(m.text)));
  for (const j of (pendingByThread[messageId] || [])) {
    const t = s(j.our_reply).trim();
    if (!t || have.has(keyOf(t))) continue;
    const made = Date.parse(j.handled_at || j.createdAt || '');
    const sendAt = Date.parse(j.send_at || '');
    if (isFinite(sendAt)) pendingUntil = Math.max(pendingUntil, sendAt);
    msgs.push({ ours: true, when: isFinite(made) ? made : nowMs, subject: '', text: t });
  }
  msgs.sort((a, b) => a.when - b.when);
  const sequence = s((raw.find(m => m.campaign_id) || {}).campaign_id);
  const sampleId = s(it.json.sample_event_id);
  if (!p) { // test replay or sample: cut after their last message
    let lastTheirs = -1;
    msgs.forEach((m, k) => { if (!m.ours) lastTheirs = k; });
    if (lastTheirs < 0) continue;
    msgs = msgs.slice(0, lastTheirs + 1);
  }
  const last = msgs[msgs.length - 1];
  if (!last) continue;
  if (last.ours) { if (p) out.push({ json: { event_id: p.event_id, email, status: 'answered_already', platform: 'instantly' } }); continue; }
  if (!newestTheirs) continue;
  const domain = email.split('@')[1] || '';
  const transcript = msgs.map(m => (m.ours ? 'US (Farhan, Mavix)' : 'THEM') + ' · ' + new Date(m.when).toISOString().slice(0, 16).replace('T', ' ') + ' UTC' + (m.subject ? ' · subject: ' + m.subject : '') + NL + m.text).join(NL + NL + '---' + NL + NL);
  const subj = s(newestTheirs.subject).trim();
  const name = campName[sequence] || (p && p.campaign_name) || s(it.json.campaign_name);
  out.push({ json: {
    event_id: p ? p.event_id : (sampleId || 'test:replay'), email, messageId,
    their_latest: last.text,
    website_guess: domain && !FREE.test(domain) ? domain : '',
    replies_from_us: msgs.filter(m => m.ours).length - 1,
    sequence,
    sequence_name: name,
    campaign_name: name,
    pending_until: pendingUntil,
    transcript: contextBlock(email) + transcript.slice(-14000),
    platform: 'instantly',
    reply_to_uuid: s(newestTheirs.id),
    eaccount: s(newestTheirs.eaccount),
    reply_subject: /^re:/i.test(subj) ? subj : 'Re: ' + subj,
  } });
}
return out;

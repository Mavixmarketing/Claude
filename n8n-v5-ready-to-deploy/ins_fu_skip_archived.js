// SKIP ARCHIVED (Instantly adapter, 26 Oct): CHECK THE REAL INSTANTLY THREAD BEFORE A FOLLOW-UP.
// Same rules and same output as the SalesBlink "Skip Archived" (fu_skip_archived.js), so the shared Due List,
// writer, checker, Log Hand-sent and Unseen Reply nodes work unchanged. Input: the Instantly thread of each person
// from "Read Thread" (GET /api/v2/emails?search=thread:<thread id>, { items: [Email] }), in the same order as
// "Who Is Due". Instantly has no archive, so rule 1 (archived in SalesBlink) does not apply.
// 2. They wrote last: never a follow-up (the reply agent answers them), except a date follow-up they asked for.
// 3. A reply from them newer than the newest row we logged for them, hidden behind one of our later emails:
//    no follow-up, and Farhan is told on Slack ("Unseen Reply?"), until the reply is in the log.
// 4. Something Farhan sent by hand from Instantly's Unibox that the log does not know about (newer than our last
//    logged email by 10 minutes and not in the history): added to the conversation and written back to the log
//    ("Log Hand-sent"); the follow-up about it goes on the next day's run. Campaign steps never count as hand-sent.
// 5. Not due yet by the timetable and nothing sent by hand: skipped.
// Every follow-up that goes on gets what the Instantly send needs: reply_to_uuid (their newest email in the thread,
// so Instantly sends to them and keeps the thread), eaccount (our mailbox in that conversation), reply_subject.
// If the thread could not be read, nobody is followed up from it this hour (we would not know where to send).
// Test runs skip these checks and use made-up send details (nothing is sent in a test).
const cfg = $('Settings').first().json;
const due = $('Who Is Due').all();
if (cfg.TEST) return due.filter(d => !d.json.not_due).map(d => ({ json: { ...d.json, reply_to_uuid: 'test-reply-to-uuid', eaccount: 'test-mailbox@example.com', reply_subject: 'Re: test' } }));
const s = v => (v === null || v === undefined) ? '' : String(v);
const norm = x => s(x).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const plain = x => s(x).replace(/<\/(p|div)>|<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\n{3,}/g, '\n\n').trim();
const ownWords = x => plain(x).split(/\n[^\n]{0,200}\bwrote:\s*\n|\n\s*>/)[0].replace(/\s+/g, ' ').trim();
const bodyOf = m => { const b = m.body || {}; return s(b.text).trim() || s(b.html) || s(m.content_preview); };
const OUR_DOMAIN = /^(mavix|maavix|mavex|mavvix|maviks|mavixx)[a-z0-9-]*\./i;
const isOurs = m => Number(m.ue_type) !== 2 || OUR_DOMAIN.test(s(m.from_address_email).toLowerCase().split('@')[1] || '');
const when = m => { const t = Date.parse(m.timestamp_email || m.timestamp_created || ''); return isFinite(t) ? t : 0; };
// 26 Oct, later: a follow-up only goes into a thread that belongs to an Instantly campaign (some email in it carries a
// campaign_id) and never from one of Farhan's own inboxes (IGNORE_MAILBOXES in the Platform node, ins_platform.js).
// Anything else is skipped silently (it is SalesBlink's or Farhan's conversation, not ours).
let IGNORE = ['mavixmarketing@gmail.com', 'hello@mavixmarketing.com', 'team@mavixmarketing.com', 'farhan@mavixmarketing.com'];
try { const l = $('Platform').first().json.IGNORE_MAILBOXES; if (Array.isArray(l)) IGNORE = l.map(x => s(x).toLowerCase().trim()).filter(Boolean); } catch (e) { /* default list */ }
const ignored = new Set(IGNORE);
const camp = {};
try { for (const it of $('Read Campaigns').all()) for (const c of (it.json.items || [])) if (c && c.id) camp[String(c.id)] = s(c.name); } catch (e) { /* no names */ }
const rowCampaign = {};
try { for (const r of $('Read Log').all()) { const j = r.json || {}; if (j.event_id && j.campaign_name) rowCampaign[String(j.event_id)] = String(j.campaign_name); if (j.message_id && j.campaign_name) rowCampaign['thread:' + j.message_id] = String(j.campaign_name); } } catch (e) { /* none */ }
const out = [];
$input.all().forEach((it, i) => {
  const d = due[i] ? { ...due[i].json } : null;
  if (!d) return;
  if (it.json.error || !Array.isArray(it.json.items)) return; // could not read the thread: try again at their next hour
  const thread = it.json.items.filter(m => m && m.id && Number(m.ue_type) !== 4).sort((a, b) => when(a) - when(b));
  const theirs = thread.filter(m => !isOurs(m));
  if (!thread.length || !theirs.length) return; // nothing of theirs to answer to: never send blind
  if (!thread.some(m => s(m.campaign_id))) return; // not an Instantly campaign thread
  const newestTheirs = theirs[theirs.length - 1];
  if (ignored.has(s(newestTheirs.eaccount).toLowerCase().trim())) return; // Farhan's own inbox
  d.reply_to_uuid = s(newestTheirs.id);
  d.eaccount = s(newestTheirs.eaccount);
  const subj = s(newestTheirs.subject).trim();
  d.reply_subject = /^re:/i.test(subj) ? subj : 'Re: ' + subj;
  // the campaign (prices depend on it): the thread knows it best
  const seqMsg = thread.find(x => x.campaign_id);
  if (seqMsg) d.sequence = s(seqMsg.campaign_id);
  const name = camp[s(d.sequence)] || rowCampaign[s(d.row_event_id)] || rowCampaign['thread:' + s(d.messageId)] || s(d.sequence_name);
  if (name) d.sequence_name = name;
  const newest = thread[thread.length - 1];
  if (!isOurs(newest)) { if (d.date_followup) out.push({ json: d }); return; } // they wrote last
  // 3. a reply from them hidden behind one of our later emails
  const loggedAt = Date.parse(d.them_logged_at || '');
  if (isFinite(loggedAt)) {
    const hidden = theirs.map(x => ({ when: when(x), text: ownWords(bodyOf(x)) })).filter(x => x.when > loggedAt + 60000).sort((a, b) => b.when - a.when);
    if (hidden.length) {
      out.push({ json: { ...d, drop: true, unseen_reply: true, slack_text: '(Instantly) Reply not answered, follow-up held: ' + d.email + ' wrote on ' + new Date(hidden[0].when).toISOString().slice(0, 16).replace('T', ' ') + ' UTC, but the reply agent has no row for it (it is behind one of our later emails).\nThey said: ' + hidden[0].text.slice(0, 400) + '\nPlease answer by hand and add a row for it to the log (platform instantly); until then no follow-ups go to them.' } });
      return;
    }
  }
  // 4. something Farhan sent by hand that the log does not know about (never a campaign step)
  const lastOurs = thread.filter(m => isOurs(m) && Number(m.ue_type) !== 1).pop();
  if (lastOurs) {
    const at = when(lastOurs);
    const body = bodyOf(lastOurs);
    const key = norm(ownWords(body)).slice(0, 80);
    const last = Date.parse(d.handled_at || '');
    if (key && at && isFinite(last) && at > last + 10 * 60000 && !norm(d.history).includes(key)) {
      const line = '\n\nFARHAN (sent by hand on ' + new Date(at).toISOString().slice(0, 10) + ', may have had the audit, case studies or a proposal attached): ' + ownWords(body).slice(0, 1500);
      d.transcript = s(d.transcript) + line;
      d.history = s(d.history) + line;
      d.manual = true;
      if (d.row_event_id) { d.log_hand_sent = true; d.hand_sent_at = new Date(at).toISOString(); }
      const since = (Date.now() - at) / 86400000;
      if (since < 0.75 && !d.date_followup) { out.push({ json: { ...d, drop: true } }); return; } // sent today: follow up on the next day's run
      d.days_quiet = Math.max(1, Math.round(since));
      d.not_due = false;
    }
  }
  if (d.not_due) return;
  out.push({ json: d });
});
return out;

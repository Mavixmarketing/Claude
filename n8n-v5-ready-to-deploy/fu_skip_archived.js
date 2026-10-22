// SKIP ARCHIVED, AND CHECK THE REAL CONVERSATION BEFORE A FOLLOW-UP.
// Input: the whole SalesBlink thread for each person (Read Thread); the inbox search for them is
// in "Still In SalesBlink?" and the person in "Who Is Due", all in the same order.
// 1. Archived in SalesBlink (only automated replies and people who said no go there): skipped,
//    except a date follow-up they asked for ("remind me in february"), which still goes out.
// 2. The prospect wrote last: never a follow-up (the reply agent answers them),
//    except a date follow-up they asked for.
// 3. A REPLY HIDDEN BEHIND OUR OWN EMAIL (22 Oct, harvey.vaughn.3): SalesBlink sometimes stores a reply
//    an hour late. If a follow-up went out in that hour, the thread's newest message is ours again, the
//    inbox never lists the reply and the reply agent never sees it. So: any message from them in the
//    thread that is newer than the newest row we logged for them means no follow-up, and Farhan is told
//    on Slack (the "Unseen Reply?" branch). This repeats at their hour until the reply is in the log.
// 4. Farhan sent something by hand (an audit, a proposal, case studies) that our log does not know about:
//    it is added to the conversation and written back to the log straight away ("Log Hand-sent":
//    history plus handled_at = when he sent it), so the follow-ups and the morning report know the audit
//    went. The follow-up about it goes out on the next day's run (not the same day).
// 5. Not due yet by the timetable and nothing sent by hand: skipped.
// Items that are not followed up now still leave this node with drop: true (for the log write-back
// and the Slack alert); "Due List" passes only the others on to the writer.
// If a search failed, due follow-ups go ahead as before. Test runs skip these checks.
const cfg = $('Settings').first().json;
const due = $('Who Is Due').all();
const inbox = $('Still In SalesBlink?').all();
if (cfg.TEST) return due.filter(d => !d.json.not_due).map(d => ({ json: d.json }));
const norm = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const plain = s => String(s || '').replace(/<\/(p|div)>|<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\n{3,}/g, '\n\n').trim();
// their own words only: cut the quoted email under "On ... wrote:"
const ownWords = s => plain(s).split(/\n[^\n]{0,200}\bwrote:\s*\n|\n\s*>/)[0].replace(/\s+/g, ' ').trim();
// a message we sent (sequence step, our reply, or Farhan by hand from his mailbox) vs one from them
const isOurs = (m, them) => {
  const e = (m.data || {}).email || {};
  return m.self === true || m.created_on !== undefined || String(m.task_type || '').toLowerCase() !== 'reply' || (m.log && typeof m.log === 'object') || e.tzMode !== undefined || (them !== '' && String(e.to || '').toLowerCase().includes(them));
};
const out = [];
$input.all().forEach((it, i) => {
  const d = due[i] ? { ...due[i].json } : null;
  if (!d) return;
  const box = inbox[i] ? inbox[i].json : {};
  if (box.error) { if (!d.not_due) out.push({ json: d }); return; }
  const list = ((box.data || {}).result) || [];
  const them = String(d.email || '').toLowerCase();
  const mine = list.filter(m => String(m.email || '').toLowerCase() === them);
  if (!mine.length) { if (d.date_followup) out.push({ json: d }); return; } // archived: only a date follow-up they asked for still goes out
  const m = mine.find(x => x.messageId === d.messageId) || mine[0];
  const ours = !!m.created_on;
  if (!ours) { if (d.date_followup) out.push({ json: d }); return; } // they wrote last
  // 3. a reply from them hidden behind one of our later emails
  const thread = Array.isArray(it.json.data) ? it.json.data : [];
  const loggedAt = Date.parse(d.them_logged_at || '');
  if (thread.length && isFinite(loggedAt)) {
    const hidden = thread.filter(x => !isOurs(x, them)).map(x => ({ when: Number(x.scheduled_time || x.completed_time || 0), text: ownWords((((x.data || {}).email || {}).body) || '') }))
      .filter(x => x.when > loggedAt + 60000).sort((a, b) => b.when - a.when);
    if (hidden.length) {
      out.push({ json: { ...d, drop: true, unseen_reply: true, slack_text: 'Reply not answered, follow-up held: ' + d.email + ' wrote on ' + new Date(hidden[0].when).toISOString().slice(0, 16).replace('T', ' ') + ' UTC, but it reached SalesBlink after one of our emails, so the reply agent cannot see it.\nThey said: ' + hidden[0].text.slice(0, 400) + '\nPlease answer by hand and add a row for it to the log; until then no follow-ups go to them.' } });
      return;
    }
  }
  // 4. something Farhan sent by hand that the log does not know about
  const when = Number(m.completed_time || m.created_on || 0);
  const body = (((m.data || {}).email || {}).body) || '';
  const key = norm(body).slice(0, 80);
  const last = Date.parse(d.handled_at || '');
  if (key && when && isFinite(last) && when > last + 10 * 60000 && !norm(d.history).includes(key)) {
    const line = '\n\nFARHAN (sent by hand on ' + new Date(when).toISOString().slice(0, 10) + ', may have had the audit, case studies or a proposal attached): ' + plain(body).slice(0, 1500);
    d.transcript = String(d.transcript || '') + line;
    d.history = String(d.history || '') + line;
    d.manual = true;
    if (d.row_event_id) { d.log_hand_sent = true; d.hand_sent_at = new Date(when).toISOString(); }
    const since = (Date.now() - when) / 86400000;
    if (since < 0.75 && !d.date_followup) { out.push({ json: { ...d, drop: true } }); return; } // sent today: follow up on the next day's run
    d.days_quiet = Math.max(1, Math.round(since));
    d.not_due = false;
  }
  if (d.not_due) return;
  out.push({ json: d });
});
return out;

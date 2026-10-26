// QUEUE RETRY (Instantly follow-ups, 26 Oct): a follow-up that Instantly did not accept is not lost and not sent
// blind again. It is written into the person's newest log row for that thread as a queued send (status "scheduled",
// send_at about 3 minutes from now, pending_send = the exact request with kind "followup", tries 1 and what the row
// must say once it has gone). The reply agent's every-minute "Due Sends" then retries it with the same safe steps
// as a reply: it reads the Instantly thread first and does not resend if the follow-up is already there, tries up to
// SEND_TRIES times in all (Platform node), and only after the last failure marks the row send_failed and tells
// Farhan on Slack, once. On success the row becomes "followed_up" with the follow-up number and history, exactly as
// "Log Follow-up" would have written it.
// If no row can be found for the thread (should not happen), Farhan is told on Slack right away (can_queue false).
let P = {};
try { P = $('Platform').first().json || {}; } catch (e) { P = {}; }
const GAPS = Array.isArray(P.RETRY_MINUTES) && P.RETRY_MINUTES.length ? P.RETRY_MINUTES.map(Number) : [3, 5];
const s = v => (v === null || v === undefined) ? '' : String(v);
const now = Date.now();
const rows = $('Read Log').all().map(r => r.json || {}).filter(j => String(j.platform || '') === 'instantly' && j.message_id && j.event_id && !String(j.event_id).startsWith('test:'));
const out = [];
$input.all().forEach((it, i) => {
  let f = null;
  try { f = $('Check The Follow-up').itemMatching(i).json; } catch (e) { f = null; }
  const err = it.json && it.json.error ? it.json.error : {};
  const why = 'Instantly did not accept it (' + s(err.message || err.description || (typeof err === 'string' ? err : JSON.stringify(err))).slice(0, 160) + ')';
  if (!f) { out.push({ json: { can_queue: false, slack_text: '(Instantly) A follow-up could not be sent and could not be queued for a retry, please check Instantly: ' + why } }); return; }
  const mine = rows.filter(r => s(r.message_id) === s(f.messageId)).sort((a, b) => Number(b.id) - Number(a.id));
  const target = (f.row_event_id && mine.find(r => s(r.event_id) === s(f.row_event_id))) || mine[0];
  const text = s(f.reply);
  if (!target || ['scheduled', 'sending'].includes(s(target.status))) {
    out.push({ json: { can_queue: false, slack_text: '(Instantly) Follow-up could not be sent, please send it by hand from Instantly: ' + f.email + ' · ' + why + '\n\nFollow-up, not sent: ' + text } });
    return;
  }
  const pending = {
    request: { eaccount: s(f.eaccount), reply_to_uuid: s(f.reply_to_uuid), subject: s(f.reply_subject), body: { html: s(f.reply_html), text } },
    tries: 1, first_try_at: new Date(now - 120000).toISOString(), last_error: why, kind: 'followup', block_after: false,
    on_success: { followups: f.date_followup ? 5 : Number(f.number), history: s(f.history) + '\n\nUS (follow-up ' + f.number + '): ' + text },
  };
  out.push({ json: { can_queue: true, event_id: s(target.event_id), from_status: s(target.status), email: f.email, send_at: new Date(now + (GAPS[0] || 3) * 60000).toISOString(), pending_send: JSON.stringify(pending) } });
});
return out;

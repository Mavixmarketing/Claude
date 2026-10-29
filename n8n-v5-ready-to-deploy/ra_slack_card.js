// THE SLACK CARD: kept short. Who wrote, what they wrote, what we sent. Only two kinds of flag are shown:
// "prepare audit" (with the one green mark) and the important ones (risky business, a call or meeting,
// pay on results, a bot question, a hacked or legal problem, a price or start decision). Site hunting is yours.
const cfg = $('Settings').first().json;
const IMPORTANT = /check this business|risky|call|phone|whatsapp|meeting|pay on results|per lead|bot|hack|legal|lawyer|complain|refund|cancel|contract|invoice|payment|start|scope|proposal|price|cost|budget|discount|competitor|angry|remove|stop/i;
// 23 Oct: a reply goes out 3 to 7 minutes after it is written (a random delay, so it reads like a person
// answering, not an instant bot). send_at is used by "Send Reply" as SalesBlink's scheduled_time. If an
// earlier reply of ours to the same thread is still waiting to go, this one goes at least a minute after it.
const IST = 330 * 60000;
const clean = n => String(n || '').replace(/website not known[^,;.]*(\([^)]*\))?[,;.]?\s*/gi, '').replace(/,?\s*please find it[^,;.]*[,;.]?/gi, '').replace(/^\s*[,;.]\s*/, '').trim();
return $input.all().map(it => {
  const c = it.json;
  const delay = 180000 + Math.floor(Math.random() * 240001);
  const send_at = Math.max(Date.now() + delay, Number(c.pending_until || 0) + 60000 + Math.floor(Math.random() * 60001));
  const goes = new Date(send_at + IST).toISOString().slice(11, 16) + ' IST';
  const said = String(c.their_latest || '').slice(0, 700);
  const audit = /^(prepare|resend) the audit/i.test(String(c.flag || ''));
  const flag = clean(c.flag);
  const important = !audit && flag && IMPORTANT.test(flag);
  let text;
  if (c.ok) text = (cfg.SEND_FOR_REAL ? 'From: ' : 'TEST, not sent. From: ') + c.email + '\n' + said + '\n\nReply (goes out at ' + goes + '): ' + c.reply;
  else text = 'Held, nothing sent. From: ' + c.email + '\n' + said + '\n\nDraft: ' + (c.reply || '(none)') + '\nWhy: ' + (c.problems || 'the writer decided not to reply');
  if (audit) text += '\n\n:large_green_circle: ' + (/^resend/i.test(String(c.flag)) ? 'Resend audit to ' : 'Prepare audit for ') + c.email;
  else if (important) text += '\n\nFlag: ' + flag;
  if (c.follow_up_on) text += '\nWe write again on: ' + c.follow_up_on;
  // a card goes to Slack only when something needs you
  return { json: { ...c, send_at, notify: !c.ok || audit || important, slack_text: text } };
});

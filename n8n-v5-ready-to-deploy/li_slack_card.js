// THE SLACK CARD: what they wrote, what we sent, and a flag when Farhan must act.
const cfg = $('Settings').first().json;
return $input.all().map(it => {
  const c = it.json;
  const who = (c.lead_name || 'someone') + ' · ' + c.lead_url + ' · to ' + String(c.sender || '').replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '');
  const said = String(c.their_latest || '').slice(0, 700);
  let text;
  if (c.ok) {
    text = (cfg.SEND_FOR_REAL ? 'LinkedIn reply sent' : 'LinkedIn reply NOT sent (test)') + ' · ' + who + '\n*They wrote:* ' + said + '\n*We sent:* ' + c.reply;
  } else {
    text = '*Needs you, nothing was sent* · ' + who + '\n*They wrote:* ' + said + '\n*Draft:* ' + (c.reply || '(none)') + '\n*Why held:* ' + (c.problems || 'the writer decided not to reply');
  }
  if (c.flag) text += '\n*Flag for Farhan:* ' + c.flag;
  return { json: { ...c, slack_text: text } };
});

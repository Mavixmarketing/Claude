// REPLY REQUEST (Instantly, 26 Oct): the exact body for POST /api/v2/emails/reply, made right after the shared
// checker and before the shared Slack Card (which then picks send_at, 3 to 7 minutes from now, never before an
// earlier reply still waiting to go). A draft with no mailbox or email to answer is held, never sent.
// The reply goes from the mailbox that received their email (eaccount) as an answer to their newest email in the
// thread (reply_to_uuid; Instantly sends it to that email's sender). Instantly's reply endpoint cannot schedule,
// so live runs store this request in the log row (status "scheduled", send_at, pending_send) and "Due Sends" sends
// it on the first run after send_at. Test runs only show it here.
return $input.all().map(it => {
  const c = it.json;
  const subject = String(c.reply_subject || '').trim() || 'Re: ';
  const instantly_request = { eaccount: String(c.eaccount || ''), reply_to_uuid: String(c.reply_to_uuid || ''), subject, body: { html: String(c.reply_html || ''), text: String(c.reply || '') } };
  const ready = !!(instantly_request.eaccount && instantly_request.reply_to_uuid && instantly_request.body.html);
  return { json: { ...c, instantly_request, ok: !!c.ok && ready, problems: c.ok && !ready ? 'no Instantly mailbox or email to reply to' : c.problems } };
});

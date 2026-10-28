// REPLY REQUEST (Instantly, 26 Oct): the exact body for POST /api/v2/emails/reply, made right after the shared
// checker and before the shared Slack Card (which then picks send_at, 3 to 7 minutes from now, never before an
// earlier reply still waiting to go). A draft with no mailbox or email to answer is held, never sent.
// The reply goes from the mailbox that received their email (eaccount) as an answer to their newest email in the
// thread (reply_to_uuid; Instantly sends it to that email's sender). Instantly's reply endpoint cannot schedule,
// so live runs store this in the log row (status "scheduled", send_at, pending_send = instantly_pending below) and
// "Due Sends" sends it on the first run after send_at, with safe retries. Test runs only show it here.
// 26 Oct, later: a draft is never sent from one of Farhan's own inboxes (IGNORE_MAILBOXES, Platform node).
// BLOCK AFTER THE GOODBYE: when they say no a second time, the writer sends one short, warm goodbye (no question, a
// "take care / all the best" line). If their message is a hard no, block_after is set: the goodbye goes out first,
// and only after Instantly accepted it does "Block After Goodbye" add their full email address (never the domain) to
// Instantly's block list, so no campaign ever emails them again.
// 28 Oct (Farhan's rule): a no is SOFT only when it is about timing ("not right now", "maybe later", "at the moment",
// "for now", "this year", "currently", "not yet", "in the future" and the like) and has no stop / remove / never
// words; a soft no is never blocked. Every other no is HARD (the same rule as "Block This One?" for a plain no).
const SOFT_NO = /\b(at this (time|moment|stage|point)|right now|at the moment|for now|not now|this year|currently|not yet|maybe later|in the future|down the (road|line))\b/i;
const HARD_NO = /\b(stop|remove|unsubscribe|do not (contact|email)|don'?t (contact|email)|never|leave (me|us) alone|spam)\b/i;
// A real refusal (28 Oct, tighter: a bare "pass", "don't" or "no" inside other words no longer counts, so "I'll pass
// this to my partner", "I don't know" or "no worries" are never taken for a no).
const NO_WORDS = /^\s*(no|nope|nah)\b(?!\s+(worries|problem|rush|pressure|need|doubt))|\b(no thanks|no thank you|not interested|not for (us|me)|(we|i)('ll| will) pass\b(?! (it|this|that|your|you|along|on to|it on))|pass on this|please (stop|remove)|stop (emailing|contacting|sending|messaging)|remove (me|us|my|our)|unsubscribe|do not (contact|email)|don'?t (contact|email|need|want)|never (contact|email|again)|leave (me|us) alone|spam|not (looking|needed|necessary|required|something we need)|(we|i)('re| are|'m| am) (good|fine|all set|covered|not looking))\b/im;
const GOODBYE = /(all the best|best of luck|wish(ing)? you|take care|good luck|won'?t (contact|email|bother) you|will not (contact|email))/i;
let IGNORE = ['mavixmarketing@gmail.com', 'hello@mavixmarketing.com', 'team@mavixmarketing.com', 'farhan@mavixmarketing.com'];
try { const l = $('Platform').first().json.IGNORE_MAILBOXES; if (Array.isArray(l)) IGNORE = l.map(x => String(x).toLowerCase().trim()); } catch (e) { /* default list */ }
return $input.all().map(it => {
  const c = it.json;
  const subject = String(c.reply_subject || '').trim() || 'Re: ';
  const instantly_request = { eaccount: String(c.eaccount || ''), reply_to_uuid: String(c.reply_to_uuid || ''), subject, body: { html: String(c.reply_html || ''), text: String(c.reply || '') } };
  const own = IGNORE.includes(instantly_request.eaccount.toLowerCase().trim());
  const ready = !!(instantly_request.eaccount && instantly_request.reply_to_uuid && instantly_request.body.html) && !own;
  const said = String(c.their_latest || '').slice(0, 1500);
  const reply = String(c.reply || '');
  const softNo = SOFT_NO.test(said) && !HARD_NO.test(said);
  const block_after = !!(reply && !/\?/.test(reply) && GOODBYE.test(reply) && NO_WORDS.test(said) && !softNo);
  const instantly_pending = { request: instantly_request, tries: 0, kind: 'reply', block_after };
  return { json: { ...c, instantly_request, instantly_pending, block_after, ok: !!c.ok && ready, problems: c.ok && !ready ? (own ? 'it would go from one of Farhan\'s own inboxes' : 'no Instantly mailbox or email to reply to') : c.problems } };
});

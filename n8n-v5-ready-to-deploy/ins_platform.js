// PLATFORM AND INSTANTLY SETTINGS (26 Oct). This node sits in front of the shared Settings code (ra_settings.js in
// the reply agent, fu_settings.js in the follow-ups) and tells it this is the Instantly workflow, so it only works on
// log rows with platform "instantly". The Instantly-only code (ins_*.js) also reads the settings below from here.
//
// IGNORE_MAILBOXES: mailboxes that are connected to Instantly but are NOT cold-email senders (Farhan's own inboxes).
// Anything received by one of these is ignored completely: no log row, no AI call, never answered, never followed up.
// Lower case. Add or remove addresses here.
//
// Besides this list, only replies to an Instantly campaign are handled: the received email must carry an Instantly
// campaign_id (or be in a thread the log already knows as an Instantly campaign thread). Everything else, for example
// newsletters, receipts, Google mail, or old SalesBlink conversations in mailboxes connected to both tools, is ignored
// silently and stays for SalesBlink (or Farhan) to handle.
//
// SEND_TRIES / RETRY_MINUTES: a reply or follow-up that Instantly does not accept is tried up to SEND_TRIES times in
// all, RETRY_MINUTES apart (after the 1st failure, after the 2nd). Before every try the Instantly thread is read: if
// our text (or a new email from us since the first try) is already there, it is marked done and not sent again.
return [{ json: {
  PLATFORM: 'instantly',
  IGNORE_MAILBOXES: ['mavixmarketing@gmail.com', 'hello@mavixmarketing.com', 'team@mavixmarketing.com', 'farhan@mavixmarketing.com'],
  SEND_TRIES: 3,
  RETRY_MINUTES: [3, 5],
} }];

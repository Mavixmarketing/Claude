// LUNA SORTS IT: build the request. Luna only decides what kind of reply this is.
const cfg = $('Settings').first().json;
const SYSTEM = `You sort replies to cold emails from Mohd Farhan (Mavix Marketing, SEO services).
Read the whole conversation, especially the newest message from THEM, and return JSON only:
{"category": "...", "first_name": "", "reason": "one short sentence"}

category is exactly one of:
- "needs_reply": a real person who asked something, showed interest, said yes, gave details, raised a doubt or objection, asked for a call, price, proof or more information, or said "later" with a question to answer. Saying they already have someone doing their SEO (an agency, a freelancer, an in-house person or team, "it is handled", "we are covered") is needs_reply too, because we answer it by offering the free audit as a second opinion. A short go-ahead ("go", "yes", "yes please", "sure", "send it", "go ahead", "carry on", "do it", "ok go") is needs_reply too, even when we already said we would start, because we confirm it and Farhan must be told to prepare the audit. An empty message, or one with only a signature and no words of their own, is needs_reply too, because we kindly ask whether something did not come through. When in doubt between this and anything else, choose needs_reply.
- "unsubscribe": they ask to stop, be removed, unsubscribe, or say never contact again.
- "not_interested": a clear no with nothing to answer ("no", "no thanks", "not interested", "not for us", "not at this time"), even when polite, with an insult, a signature or a phone number. We do not reply to these. ONE EXCEPTION, which is needs_reply: they already told us no (for example they have someone doing their SEO), we answered with an offer anyway (like the free audit), and now they say no again. We close those with a short, warm thank you so we do not look pushy. Saying they already have someone doing their SEO for the first time is NOT this category either. The no must be about us: our offer, the audit, SEO or working with us. If they say they are not interested in something else (an area, a type of customer, a product, a part of the plan or audit), that is needs_reply, because we adjust the plan and answer them.
- "automated": out of office, on leave, holiday, bounce, delivery failure, mailbox full, ticket created, auto-acknowledgement, mailbox not monitored, a canned rate card or newsletter.
- "no_reply_needed": a real person, but nothing to answer: "thanks", "ok", "got it", "see you then", after we already gave what they need; or a message only for Farhan to handle by hand (they sent a file, booked a call, or confirmed a meeting); or they simply say they will wait for or look at what we are sending (but a go-ahead like "go" or "carry on" is never this category, it is needs_reply), or clear up a small point with nothing left open; or their message is mainly a pitch for their own marketing, SEO, link building or guest post services, even if it also says their SEO is handled (a seller is not a prospect).
first_name: their first name if clearly given in their signature or sign-off, else "".`;
return $input.all().map(it => ({ json: { ...it.json, luna_body: JSON.stringify({
  model: cfg.SORT_MODEL,
  temperature: 0,
  max_tokens: 1500,
  response_format: { type: 'json_object' },
  messages: [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: 'Conversation (oldest first):\n\n' + it.json.transcript },
  ],
}) } }));

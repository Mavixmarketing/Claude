# n8n version 5: ready to deploy

These are the finished code files for version 5 (see `email-outreach-review/2026-10-18-v5-changes.md`).
Deployed and published on 19 Oct at about 1:33am IST, after test runs passed. Kept here as the source and for any re-deploy.

How to deploy (for Claude in a new session with the n8n connector working):
1. For each workflow in `deploy_manifest.json`, update each listed Code node with
   `updateNodeParameters`, `replace: true`, parameters `{ "mode": "runOnceForAllItems", "jsCode": <file contents> }`
   (keep any other parameter keys the node already has). Never use setNodeParameter with `/parameters/jsCode`.
2. Read each node back and check jsCode matches the file and there is no nested `parameters.parameters`.
3. Test: Reply Agent with "Test On Real Threads", the two follow-up workflows and the report with their Test triggers (manual runs send nothing).
4. Publish all 5 workflows.

`templates-backup/` holds the SalesBlink templates as they were before the 18 Oct fine-tune, in case any need to be put back.

## 22 Oct changes
- New prices ($999 / $1,349 / $1,999, 90 day guarantee on Growth and Premium only) and the "how search works now" (AI search) section live in the shared FACTS block of `email_opus_request.built.js`, `fu_request.built.js` and `li_opus.built.js` (keep the three identical; there is no build script). The LinkedIn follow-up writer has its own short version. All four checkers flag old prices, any AI number other than 2 billion / 8% / 15%, AI jargon, and "2 or 3 month" guarantee wording.
- The SEO follow-ups workflow has nodes that are not code files: `Read Thread` (SalesBlink thread for each person, between "Still In SalesBlink?" and "Skip Archived"), `Log Hand-sent` (data table update by event_id: writes Farhan's hand-sent message into the row's history and handled_at), `Due List` (code, `fu_due_list.js`), and `Unseen Reply?` + `Alert Unseen Reply` (Slack, when a reply is hidden behind one of our later emails).

## 23 Oct changes (published 23 Oct 18:44 UTC, 00:14 IST on 24 Oct, after test runs)
- Replies go out 3 to 7 minutes after they are written: `ra_slack_card.js` sets a random `send_at`, and the `Send Reply` node sends it to SalesBlink as `scheduled_time` (`{ content, scheduled_time }`). `ra_build_conversation.js` (Build Conversation, now in the manifest) places our own reply at the time it was written (`created_on`), so a reply still waiting to go counts as answered (no double answer) while a message they send in those minutes still gets its own answer, and a second reply never goes before the first (`pending_until`). Follow-ups and LinkedIn (sent through Prosp) are unchanged.
- Prices by campaign: the AI Written campaign (sequence 38eb9458-6fd2-48e8-be34-fd88e328a183, list `AI_WRITTEN_SEQUENCES`) has $999 / $1,349 / $1,999; every other campaign and LinkedIn have $349 / $549 / $1,649. The `PRICES BY CAMPAIGN` block (same in `email_opus_request.built.js`, `fu_request.built.js`, `li_opus.built.js`) picks the list and passes a PRICES block in the user message. A price already quoted to the person is kept (the whole conversation stays on that list), and the checkers allow it.
- After-audit follow-ups: first one in Farhan's words with the 15-minute call link, second one asks again without the link (`fu_request.built.js`, `fu_check.js`; LinkedIn follow-ups get the same two nudges in their prompt).
- "Said yes but never gave details": from follow-up 2 the follow-up shows what the free audit includes, then a low-friction ask.
- Monthly report: "Mailboxes doing worst (last 30 days)" from `GET /api/public/v1.0.0/analytics/mailbox-stats?from&to&limit` plus `GET /api/public/v1.0.0/senders?filter=has-error` (two HTTP nodes after Read Reply Events, both continue on error).
- Starter has no money back guarantee (fix after the septic.ca sample): the writers say the guarantee comes only with Growth and Premium and never bring it up next to a Starter price unless asked (then: Starter has none, Growth has it). The checkers (`email_check.js`, `fu_check.js`, `li_check.js`) hold a draft that puts the guarantee or the $1,000 next to $349 or $999, unless it says Starter has none or points to Growth.
- A hand-written promise note on a person's newest log row (for example "prepare the audit ...") marks them audit-owed even when later messages follow the promise in the history (`fu_who_is_due.js` `auditOwed`, `report.js` `owed()`): no follow-up and no "reply not answered" alert until Farhan's hand-sent strategy is logged, then the after-audit nudges start.

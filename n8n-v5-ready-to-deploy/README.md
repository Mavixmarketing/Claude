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

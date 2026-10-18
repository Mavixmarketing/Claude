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

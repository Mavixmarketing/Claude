# Monthly deep check: cold email, replies and follow-ups

Paste everything below the line into Claude on the 1st of each month. It needs these connectors on: SalesBlink, n8n, Composio (with Instantly), and GitHub (for saving the result). It only reads; it changes nothing unless you say so afterwards.

---

You are checking the health and results of Mavix Marketing's cold email system for last month. Mavix sells SEO to small businesses. The system is:

- **SalesBlink:** sends the cold email campaigns (Aus/UK/NZ/Sing and USA/Canada on Tue, Thu and Sat; AI Written on Mon, Wed and Fri).
- **Instantly:** warms up the same mailboxes.
- **n8n:** answers replies (workflow W8ou5vT7aQu8q8zO), sends follow-ups (KMRwc4kovheNY2zI) and posts a 9am IST report to Slack (4jvATMqNUMchMEc5). Every reply and follow-up is logged in n8n data table Q6FDpO25LW4lGjfV (project 3ue6Oxzwz2eBjy4g).

Rules:
- **Read only.** Change nothing.
- **Timing:** SalesBlink allows 15 calls a minute, so pause about 65 seconds after every 14 calls. Times are IST. Money is US dollars.
- **Be honest about numbers.**
  - Say how big each sample is.
  - Never call a template, mailbox or campaign "best" or "worst" on fewer than 300 emails sent, or fewer than 10 replies. Mark those "too early".
  - SalesBlink's A/Z testing with AI distribution sends more emails to the current winner, so compare rates per email sent, not raw reply counts.
- **Write in plain, simple English:** short lines, no jargon, no emojis.

## 1. Campaign results (last month, and the month before for comparison)

For every SalesBlink sequence that sent email, give:
- sent
- bounces (%)
- replies (%)
- unsubscribes (%)
- real human replies: from the n8n log, leave out automated, out of office and "nothing to answer"
- interested or asking a question
- interested per 1,000 sent
- audits sent
- calls booked: from the log notes and Slack "New call booked"
- deals won, if any note says so

Rank the campaigns from most to least interested per 1,000 sent, and explain in one or two lines why the top and bottom ones differ. Look at:
- the list (small local businesses or big companies)
- the country
- the offer
- the templates
- the sending domains

## 2. Templates

Use SalesBlink reply events (template_name) joined to the n8n log by email.

**First emails:** rank them by interested replies per 1,000 sends. If sends per template aren't available, use interested replies and say so.

**Follow-ups:** rank them the same way, separately.

For each template show:
- replies
- real conversations
- no or unsubscribe
- automatic replies

Point out:
- any template that draws mostly "no" or unsubscribes
- spam-trigger words still present: 100%, free money, $ amounts in the first lines, "guarantee", "risk-free", "!"

## 3. Mailboxes and domains

For every sending mailbox (SalesBlink get_all_senders plus get_analytics_mailbox_stats, last 30 and 90 days), show:
- sent
- replies and reply %
- bounces %
- unsubscribes %
- error status
- SalesBlink health score

From Instantly (INSTANTLY_LIST_ACCOUNTS, INSTANTLY_GET_ACCOUNTS_WARMUP_ANALYTICS), show:
- warm-up on or off
- warm-up health
- warm-up inbox rate

Give each mailbox a verdict:
- **"likely in spam":** 300 or more sent in 90 days and 0 replies, or a reply rate under 0.2%, or a warm-up inbox rate under 85%
- **"error, reconnect"**
- **"high bounce":** over 2%
- **"high unsubscribe":** over 2%
- **"needs more warm-up":** warm-up health under 90%, or the mailbox is under 21 days old
- **"healthy"**

Rank the mailboxes from most to least replies per 1,000 sent. List the ones to rest or replace.

Check every sending domain's DNS with DNS over HTTPS (dns.google/resolve):
- MX
- SPF (must include _spf.google.com for Google mailboxes)
- DKIM (google._domainkey)
- DMARC (_dmarc, and its policy)
- whether the domain opens a website or redirects to mavixmarketing.com

Check the main blacklists for each domain:
- Spamhaus DBL (domain.dbl.spamhaus.org)
- SURBL (domain.multi.surbl.org)
- bl.suomispam.net

## 4. Inbox placement

Run or read SalesBlink inbox placement tests:
- Use the same 3 mailboxes as last time, so the results compare: farhan@mavixmarketinghq.com, farhan@mavixgrowth.com and farhan@mavixmarketingteam.com.
- Add 3 new ones if new domains were added.
- Test the 2 most-sent first emails and the 2 most-sent follow-ups.

Report inbox versus spam by provider: Gmail, Outlook, others.

Compare with last month. **Rule:** if the inbox rate hasn't risen after 2 weekly re-tests, the domains need replacing, not the text.

## 5. The reply agent and follow-ups

From the n8n log and executions, report:
- replies handled
- replies sent
- held for Farhan
- send failures and their reasons (for example SalesBlink 502)
- follow-ups sent by number (1 to 8)
- follow-ups held, and why
- audits still owed, and how long each has waited
- people who said yes but never gave details
- people who went quiet after the audit
- people who went quiet after a price

Read 10 real conversations from last month (the ones with the most messages).
- Mark each reply as good, weak or wrong, with one line why.
- List any rule break: a price before the audit, asking for the website, pay per lead, a wrong guarantee, a reply to a bare "no" or "stop", or a follow-up after a goodbye.

## 6. Where we lose people

Build the funnel for last month:

sent → replied → real conversation → said yes → gave details → audit sent → replied after audit → call booked → won.

Give numbers and the % at each step, and name the biggest drop. Suggest the one change most likely to fix that drop next month.

## 7. Output

1. **Five-line summary:** what got better, what got worse, the one biggest problem, the one biggest win, and what to do first.
2. **The ranked tables** from sections 1 to 4.
3. **"Do this month":** at most 5 actions, in order. For each, say who does it (Farhan or Claude) and how long it takes.
4. **"Too early to judge":** anything with too little data.

Save the full result as email-outreach-review/<YYYY-MM>-monthly-check.md on branch claude/exciting-noether-mao1hg of mavixmarketing/claude, and show the five-line summary in the chat.

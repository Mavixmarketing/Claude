# Inbox placement test (19 Oct 2026, run about 3:15am to 3:45am IST)

6 one-time tests in SalesBlink. Every test was sent from the same 3 mailboxes, so the only thing that changed was the email text:
- farhan@mavixmarketinghq.com (Aus/UK campaign)
- farhan@mavixgrowth.com (Aus/UK campaign)
- farhan@mavixmarketingteam.com (USA/Canada campaign, one of the "no website" domains)

The tests were: Initial 1 new and old, Initial 2 new, 1st Follow Up (b) new and old, 2nd Follow Up (b) new.

## Results (85 emails landed, 11 still pending when read)

| | Inbox | Spam |
|---|---|---|
| All tests | 30 (35%) | 55 (65%) |
| Gmail seed | 0 | 12 (all spam) |
| Outlook / Hotmail seeds | 12 | 31 |
| Zoho seeds | 18 | 12 |

By mailbox:

| Mailbox | Inbox | Spam |
|---|---|---|
| mavixmarketinghq.com | 6 | 30 (worst) |
| mavixgrowth.com | 17 | 19 |
| mavixmarketingteam.com | 7 | 6 (11 still pending) |

Old text compared with new text:
- Initial 1: new 6 inbox, old 4 inbox.
- 1st Follow Up (b): new 5 inbox, old 5 inbox.

So the wording makes little difference. The mailboxes and domains are the main problem.

## Other findings

- **SpamAssassin** (content score, where 5 or more means spam):
  - Old Initial 1 scored 3.6. Most of that, 2.5 points, came from the "100%" in "100% of your money back".
  - The new text scores 1.1. 1.0 of that came from curly quote marks, so those were swapped for plain quotes on 19 Oct.
- **Blacklist:** mavixgrowth.com is listed on bl.suomispam.net, a small blacklist. The other two domains are clean.

## What to fix (in order)

1. Check that warm-up is really running for these exact mailboxes in Instantly. SalesBlink shows warm-up off for them.
2. Cut cold emails to 10 per mailbox per day for 2 to 3 weeks while reputation recovers.
3. Point every sending domain to mavixmarketing.com (domain forwarding).
4. Rest the worst domains, starting with mavixmarketinghq.com.
5. Ask bl.suomispam.net to delist mavixgrowth.com.
6. Run this same test again every week to see whether the inbox rate goes up.

Limits of this test: there is 1 Gmail seed and 5 other seeds per mailbox, so treat the numbers as a strong warning, not an exact rate.

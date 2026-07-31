# 00 — Executive Summary

## 1. The honest verdict

**Is this a good idea?** Yes, with a specific strategy. No, if you build it the obvious way.

The obvious way — "I'll build an email verifier that's more accurate and cheaper than the others" — fails, because:

- Accuracy is limited by things you don't control (Gmail, Microsoft 365, and catch-all domains simply do not answer the question honestly anymore).
- Cheaper is already taken. MillionVerifier sells at roughly $0.00055/email, DeBounce goes as low as ~$0.00045. You cannot win a price war against companies that own their own verification infrastructure while you're renting theirs.

The strategy that *does* work is narrow and defensible:

> **Sell certainty and honesty in a market that sells inflated accuracy claims — and give away a free deliverability toolkit that earns you traffic no competitor is bothering to earn.**

## 2. Why there's a real gap

Every verifier advertises 97–99% accuracy. An independent benchmark of 15 tools across ~3,000 real business emails found the top scorer reached **70%**, with most tools between 60–68% and the worst at 31%. ([source](https://hunter.io/email-verification-guide/best-email-verifiers), [benchmark writeup](https://www.geekextreme.com/best-email-checker-2025-tools-tested/))

A practitioner running ~100 leads through every major tool got **different results for 40% of them**. Running one address through three tools commonly returns "valid", "catch-all", and "unknown".

This is exactly the problem you personally experienced: *"most of the time the email verification sends invalid emails into the verified share."* You are not an outlier. **You are the market.**

Nobody is selling the honest product. That's the gap.

## 3. The product in one sentence

**A verification service that runs every risky address through multiple independent engines, only calls it "valid" when they agree, tells you exactly why, and refunds you when it's wrong — bundled with free tools that cold emailers use every single day.**

Three pillars:

| Pillar | What it is | Why it matters |
|---|---|---|
| **Consensus verification** | Risky/ambiguous addresses get checked by 2–3 independent providers. Agreement = valid. Disagreement = flagged with a confidence score. | Directly solves the "false valid" problem that made you unhappy with your current tool. No competitor does this, because they all own one engine and are married to it. |
| **Radical transparency** | Every result shows the reason (MX found, SMTP said X, catch-all detected, greylisted, role account, disposable, etc.), a 0–100 confidence score, and never hides unknowns inside "valid". | Turns your biggest weakness (you don't own infrastructure) into your positioning. |
| **Free deliverability toolkit** | Spam/template checker, spam-word database, industry template library, DNS/SPF/DKIM/DMARC checker, tool comparison hub with affiliate links. | This is your marketing engine. It's free to build, ranks in Google, and makes people return weekly instead of quarterly. |

## 4. How you build it (the path that costs almost nothing)

Three phases. Do not skip to phase 3.

**Phase 1 — Aggregator (months 0–4). Cost: ~$50–100/month.**
You don't verify anything yourself. You call other people's verification APIs (bulk credits bought wholesale, or white-label reseller programs from MyEmailVerifier / MillionVerifier), layer your own free checks on top (syntax, MX/DNS lookup, disposable-domain list, role-account list — all free), and build your own UI, dashboard, and API. Your product is the *consensus logic, the interface, and the free tools*.

**Phase 2 — Hybrid (months 4–12). Cost: ~$150–400/month.**
Add one or two of your own SMTP verification nodes on a provider that allows port 25 (Hetzner does; AWS/GCP/Azure/DigitalOcean block or throttle it). Use your own node for the easy 60% of addresses (cheap, instant, free) and only pay third-party APIs for the hard 40%. Your cost per email drops sharply and margins expand.

**Phase 3 — Own infrastructure (year 2+, only if revenue justifies it).**
Multiple IPs, rotation, per-provider heuristics, your own historical database of known-good/known-bad addresses. This is where real accuracy advantages come from, and it takes real money and real engineering.

**Non-negotiable:** you are not technical, so you will be building with AI coding assistance. That works in 2026 for narrow, single-purpose SaaS tools — which is exactly what this is — but expect 5–15 rounds of back-and-forth per feature, and note that **65% of scanned AI-generated apps carry security vulnerabilities, 58% with at least one critical flaw.** Budget time for a paid security review before you touch real customer data. Details in files 04 and 10.

## 5. Pricing, in short

Never charge per seat. Charge for verifications, three ways at once:

| Plan | Price | Purpose |
|---|---|---|
| **Free** | 100 verifications/day, no card, no bulk upload | Lead generation + SEO. Matches MyEmailVerifier's proven free hook. |
| **Credit packs (never expire)** | $9 / 5k · $29 / 25k · $79 / 100k · $299 / 500k · $499 / 1M | Captures the "I clean my list twice a year" buyer. |
| **Daily-cap subscriptions** | $19 / 1k-a-day · $49 / 5k-a-day · $99 / 15k-a-day · $199 / 50k-a-day | Recurring revenue. This is the model your current tool uses and the reason it looks impossibly cheap. |
| **Guarantee add-on** | +40% on any plan | Consensus verification + credit refund on any "valid" that bounces. Your margin product. |

The daily-cap mechanic matters enormously: most subscribers use **10–25% of their cap**, so a $99/month 15k-a-day plan (450k/month capacity) typically costs you only ~$25–60/month in wholesale verification. That's how the cheap tools survive. Full math in file 07.

## 6. How you get customers

Ranked by realistic ROI for a bootstrapped founder:

1. **Free tools + programmatic SEO** — the spam checker, template library, and "is this email valid" single-check page. Highest ROI, slowest to compound (4–8 months).
2. **Comparison & alternatives content** — "MillionVerifier vs ZeroBounce", "NeverBounce alternatives". High buying intent, ranked by small sites all the time, and monetisable with affiliate links even for non-customers.
3. **Community presence** (r/coldemail, r/emailmarketing, Facebook cold-email groups, Slack/Discord communities) — contribute genuinely, publish your own accuracy benchmark as a gift to the community. This is your single best zero-budget launch move.
4. **Agency & reseller partnerships** — one agency = 50 client lists. Give them white-label + margin.
5. **Directory listings & integrations** — Zapier, Make, n8n, Clay, Instantly, Smartlead, HubSpot. Being in an integration marketplace is free distribution.
6. **Paid ads — last.** "Email verification" keywords are expensive and defended by companies with 100× your budget. Do not start here.

Budget-tiered plans (from $0/mo up to $5,000/mo) are in file 08.

## 7. The numbers you need to hit

| Milestone | Target | Timing |
|---|---|---|
| Product live with paying capability | Working MVP | Week 10–14 |
| First paying customer | 1 | Month 3–4 |
| Ramen-profitable (covers all costs) | ~$300 MRR | Month 6–9 |
| Meaningful side income | ~$1,500 MRR | Month 12–18 |
| Full-time viable | ~$6,000 MRR | Month 24–36 |

**Kill criteria** — if by month 9 you have fewer than 20 paying customers and under $300 MRR *despite* shipping the free tools and publishing 30+ SEO articles, the positioning is wrong. Pivot to the deliverability-toolkit angle or stop. Details in file 12.

## 8. The five things that will hurt

1. **Accuracy will still not be perfect**, even with consensus. Microsoft 365 and catch-all domains are structurally unverifiable. You must communicate this instead of hiding it.
2. **Wholesale API dependency** — your suppliers can raise prices, throttle you, or notice you're reselling. Mitigate by using 3+ suppliers from day one and moving to hybrid infrastructure early.
3. **Free-tier abuse** — 10–30% of free signups on developer tools are abusive. You need disposable-email blocking, device fingerprinting, and daily caps from launch, not later.
4. **Spammer customers** — they will burn your supplier accounts and your reputation. You need an acceptable-use policy and the willingness to refund and ban.
5. **Churn** — bulk list cleaning is episodic. Your recurring revenue comes from API users and subscription-plan holders, not one-off uploaders. Design for that from day one.

## 9. What to do this week

1. Read files 02, 03, and 06 in full. They contain the three insights that change how you'd otherwise build this.
2. Sign up for free tiers of MyEmailVerifier, MillionVerifier, Bouncer, and Reoon. Build a test list of 500 addresses where you *know* the truth (your own inboxes, known-dead addresses, catch-all domains, role accounts). Run it through all four.
3. Publish that benchmark. It costs $0 and is simultaneously your product research, your first SEO asset, and your community launch.
4. Register a domain and set up a Paddle / Lemon Squeezy / Polar account (merchant-of-record — you likely cannot use Stripe directly from Pakistan).
5. Only then start building.

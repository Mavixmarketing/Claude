# Email Verification SaaS — Full Business & Build Plan

**Prepared for:** Mavix Marketing
**Date:** 31 July 2026
**Status:** Pre-build research and planning. Nothing has been coded yet — this is the document you read *before* spending money.

---

## How to read this pack

Read them in this order. Files 00–03 decide **whether and how** you build. Files 04–07 decide **what you build and what you charge**. Files 08–12 decide **how you get customers and survive**.

| # | File | What it answers |
|---|------|-----------------|
| 00 | [`00-executive-summary.md`](./00-executive-summary.md) | The whole plan in 5 minutes. The strategy, the honest verdict, the number you need to hit. |
| 01 | [`01-market-analysis.md`](./01-market-analysis.md) | Market size, demand, who buys, why demand is growing, what's changing in 2026. |
| 02 | [`02-competitor-analysis.md`](./02-competitor-analysis.md) | Every major competitor, their pricing, their weaknesses, why people don't switch, where the gap is. |
| 03 | [`03-how-it-works-technical.md`](./03-how-it-works-technical.md) | How email verification *actually* works, why accuracy is bad everywhere, the hard technical walls. |
| 04 | [`04-build-vs-buy-and-stack.md`](./04-build-vs-buy-and-stack.md) | Your three build paths, the recommended stack, what to buy vs build, the zero-cost route. |
| 05 | [`05-product-features-roadmap.md`](./05-product-features-roadmap.md) | Full feature list, MVP scope, V1/V2/V3, the spam checker, templates, affiliate hub — with build difficulty. |
| 06 | [`06-pricing-strategy.md`](./06-pricing-strategy.md) | Exact recommended price points, plan structure, free tier design, why daily caps work. |
| 07 | [`07-unit-economics-and-costs.md`](./07-unit-economics-and-costs.md) | Your real monthly costs at 0 / 50 / 500 / 5,000 users. Margins. Break-even math. |
| 08 | [`08-marketing-plan.md`](./08-marketing-plan.md) | SEO, content, ads, communities, partnerships — with $0, $500, and $5,000/mo budget versions. |
| 09 | [`09-icp-and-customer-selection.md`](./09-icp-and-customer-selection.md) | Who to target, who to actively refuse, best geographies, segment-by-segment economics. |
| 10 | [`10-security-auth-compliance.md`](./10-security-auth-compliance.md) | Auth flow, API key security, abuse prevention, GDPR, the legal documents you need. |
| 11 | [`11-swot-risks-and-failure-modes.md`](./11-swot-risks-and-failure-modes.md) | SWOT, the 15 problems that will actually hit you, and what kills this business. |
| 12 | [`12-execution-timeline.md`](./12-execution-timeline.md) | Week-by-week plan: day 1, month 3, month 12. Milestones and kill criteria. |
| 13 | [`13-sources.md`](./13-sources.md) | Every source used, so you can re-verify the numbers yourself. |

---

## The one-paragraph version

Email verification is a real, growing, ~$0.8–1.3B market with genuinely unhappy customers — independent benchmarking shows the *best* tool on the market hits about **70% real-world accuracy** while everyone advertises 98–99%. That gap is your opening. But you cannot out-engineer ZeroBounce on raw SMTP infrastructure as a non-technical solo founder, and you should not try. Your realistic path is to **aggregate existing verification APIs into a consensus engine**, sell **transparency and a bounce guarantee** instead of fake accuracy claims, wrap it in a **free deliverability toolkit** (spam checker, template library, comparison hub) that wins you SEO traffic for free, and monetise with **credit packs plus daily-cap subscriptions**. Start-up cost can be under **$100** and monthly fixed cost under **$50** until you have paying users.

---

## Critical warnings — read these before anything else

1. **Do not promise 99% accuracy.** Everyone does, nobody delivers, and it's the #1 reason customers churn. Your entire brand should be the opposite of this.
2. **Do not build your own SMTP verification infrastructure in month 1.** It requires IP reputation management, port 25 access, and per-provider heuristics. It is the single biggest reason this project would fail. See file 03.
3. **You will attract spammers.** An email verification tool is spammer infrastructure by default. Without an abuse policy you will get your provider accounts terminated. See files 09 and 10.
4. **This business has a churn problem baked in.** List cleaning is a once-a-quarter job for most buyers. Your survival depends on the *API* and the *free tools*, not the bulk uploader. See file 06.
5. **The tool you currently use (~15k/day for ~$9–14/week) is a daily-cap breakage model.** It looks impossibly cheap because almost nobody uses their full cap. Understand this mechanic before you price — it is explained in file 06 and it is the single most useful pricing insight in this pack.

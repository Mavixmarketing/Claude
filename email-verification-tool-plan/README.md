# Email Verification Tool — My Full Plan

**For:** Mavix Marketing
**Date:** 31 July 2026
**Where I am:** Nothing built yet. This is the research I do *before* spending money.

---

## What is this?

I want to build a tool that checks if email addresses are real or dead.

I already use one (Reoon / "Ninja"). It is cheap, but it keeps telling me bad emails are good. So I looked into whether I could build a better one.

This folder is everything I found out.

---

## Start here

**Read this file first:** [`PLAIN-ENGLISH-SUMMARY.md`](./PLAIN-ENGLISH-SUMMARY.md)

That is the whole plan in simple words, no technical talk. If you only read one file, read that one.

The other files below have the details.

---

## The short version

Every email checking company says they are 98–99% accurate.

Someone tested 15 of them properly with 3,000 real emails. **The best one got 70%.** Most got 60–68%.

So they are all stretching the truth. That is why my emails still bounce even after "verifying" them. It is not just my tool. It is all of them.

**So my idea is:** be the honest one. Check each risky email 2 or 3 times using different companies. Only say "this is good" when they all agree. Show people the reason. Give their money back when I get it wrong.

Nobody does this. And it costs under **$400 to start**.

---

## The files

Read them in this order.

### First — should I even do this?

| File | What it tells me |
|---|---|
| [`PLAIN-ENGLISH-SUMMARY.md`](./PLAIN-ENGLISH-SUMMARY.md) | **Everything, in simple words. Read this first.** |
| [`00-executive-summary.md`](./00-executive-summary.md) | The plan in 5 minutes, with the honest yes-or-no answer |
| [`01-market-analysis.md`](./01-market-analysis.md) | How big is this market, is it growing, who buys this stuff |
| [`02-competitor-analysis.md`](./02-competitor-analysis.md) | Every competitor, their prices, their weak spots. Also: **why people don't switch tools even when a cheaper one exists** |
| [`03-how-it-works-technical.md`](./03-how-it-works-technical.md) | How email checking actually works, and **why it is broken everywhere** |

### Then — what do I build and what do I charge?

| File | What it tells me |
|---|---|
| [`04-build-vs-buy-and-stack.md`](./04-build-vs-buy-and-stack.md) | What I build myself, what I rent, and how to do it cheap. **Answers "do I need to buy an API?"** |
| [`05-product-features-roadmap.md`](./05-product-features-roadmap.md) | Every feature — including the spam checker, the email templates, the comparison page — and when to build each one |
| [`06-pricing-strategy.md`](./06-pricing-strategy.md) | Exact prices to charge. Free plan design. **Also explains why my current tool is so weirdly cheap** |
| [`07-unit-economics-and-costs.md`](./07-unit-economics-and-costs.md) | My real costs each month. **What 10–20 free users actually cost me.** When I break even |

### Then — how do I get customers and not get burned?

| File | What it tells me |
|---|---|
| [`08-marketing-plan.md`](./08-marketing-plan.md) | SEO, ads, Reddit, partnerships. **With a $0 plan, a $500 plan, and a $5,000 plan** |
| [`09-icp-and-customer-selection.md`](./09-icp-and-customer-selection.md) | Who to go after, **who to refuse**, best countries to target |
| [`10-security-auth-compliance.md`](./10-security-auth-compliance.md) | Login flow, keeping API keys safe, stopping cheaters, the legal papers I need |
| [`11-swot-risks-and-failure-modes.md`](./11-swot-risks-and-failure-modes.md) | Strengths, weaknesses, and **the 15 problems that will actually happen** |
| [`12-execution-timeline.md`](./12-execution-timeline.md) | Week by week. Day 1, month 3, month 12. **And when to quit if it isn't working** |
| [`13-sources.md`](./13-sources.md) | Every source I used, so I can check the numbers myself later |

---

## 5 things I must not forget

**1. Never say I am 99% accurate.**
Everybody says it. Nobody does it. It is the number one reason people leave these tools. My whole brand should be the opposite of this.

**2. Do not build my own mail servers at the start.**
This is the mistake that would kill the project. It needs special internet permissions, clean server addresses, and years of know-how. Rent it first, build it later (around month 6–9).

**3. Spammers will find me.**
An email checking tool is exactly what spammers need. If I let them in, my suppliers will shut down my accounts. I need rules and I need to be willing to ban people.

**4. People buy this once and disappear.**
Most people clean their list, then vanish for 3 months. So my real income comes from the **API** (software companies that plug it into their signup page and never leave) and from **monthly plans** — not from one-off uploads.

**5. My current tool is cheap because of a trick.**
15,000 a day for $9–14 a week only works because unused credits vanish at midnight. Most people use maybe 10–25% of what they pay for. I should copy this — but I need a fair-use rule so one heavy user doesn't cost me more than they pay.

---

## What I do this week — no coding

1. **Email 5 email-checking companies.** Ask if they sell wholesale credits and let me resell. **If nobody says yes, stop and rethink.**
2. Make a list of 500 emails where I already know the real answer.
3. Run that list through 8 competitors' free plans.
4. Look at who got it right and who lied.
5. Buy a domain. Sign up with Paddle or Lemon Squeezy for payments (Stripe does not work for Pakistan).
6. Write my one-sentence pitch.
7. Answer 3 questions on Reddit. No links, no selling.

**No code this week.** On purpose. The two things that could kill this project can both be tested first.

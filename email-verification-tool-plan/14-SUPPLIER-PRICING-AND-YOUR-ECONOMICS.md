# 14 — Supplier Pricing & Whether YOUR Prices Actually Work

**Researched 31 July 2026.** You asked me to check every supplier's pricing so you don't end up in a loss. I did. **There is a serious problem with the prices you picked, and there is a clean fix.** Both are below.

---

## PART 1 — Every supplier's real pricing

### Pay-as-you-go (buy credits, use them whenever)

| Supplier | 10,000 | 100,000 | 1,000,000 | Per email at 1M |
|---|---|---|---|---|
| **MillionVerifier** | $37 | $189 | **$359** | **$0.000359** ⭐ cheapest at volume |
| **BulkEmailChecker** | **$9.95** ⭐ | $74.95 | $409.95 | $0.00041 |
| Reoon (lifetime credits) | $12 | — | ~$744 (500k @ $372) | $0.00074 |
| EmailListVerify | $24 | — | — | ~$0.0024 |
| MyEmailVerifier | — | — | — | $0.0025 (API) |
| DeBounce | ~$20 | — | $2,000 | $0.002 |
| Bouncer | $37 | — | — | $0.0037 |
| ZeroBounce | $65–80 | — | — | $0.008 → $0.004 at 250k+ |
| NeverBounce | ~$80 | — | — | $0.008 |
| MailerCheck | — | — | — | up to $0.01 |

**Key finding:** the cheapest option changes with volume.
- **Under 50k/month → BulkEmailChecker** ($9.95 per 10k = $0.000995)
- **Over 500k/month → MillionVerifier** ($359 per 1M = $0.000359)

MillionVerifier is *expensive* at low volume ($37 per 10k = $0.0037) and *cheapest* at high volume. Don't pick a supplier before you know your volume.

### 🔥 Flat-rate unlimited (the important discovery)

These charge a **fixed monthly fee for unlimited verifications**. Your cost per email becomes **zero**.

| Supplier | Price | Model |
|---|---|---|
| **BulkEmailChecker Unlimited** | **$250/month per "thread"** | Unlimited volume. More threads = more speed. 5–8 threads $240 each, 9–10 threads $230 each. Month-to-month, cancel anytime. Claims 99.7% SMTP accuracy. |
| **Truelist** | Flat rate | Unlimited on flat-rate plans, webhooks, real-time + batch |
| **UnlimitedVerifier** | Flat rate | Same idea |

**This is the single most important thing I found.** It is the only pricing model under which your $5 and $9 plans make money. Explained in Part 3.

---

## PART 2 — ⚠️ The problem with your prices

You picked:

| Plan | Price | Per day | **Per month capacity** |
|---|---|---|---|
| Free (logged in) | $0 | 500 | 15,000 |
| Starter | $5 | 5,000 | 150,000 |
| Pro | $9 | 15,000 | 450,000 |

Now let's do the maths at the **best pay-as-you-go rate you can realistically get** ($0.0005/email blended, allowing for some double-checking):

### Your $5 plan (5,000/day)

| If they use | Emails/month | API cost | Payment fee | **You make** |
|---|---|---|---|---|
| 5% of cap | 7,500 | $3.75 | $0.75 | **+$0.50** 😐 |
| 10% | 15,000 | $7.50 | $0.75 | **−$3.25** ❌ |
| 20% | 30,000 | $15.00 | $0.75 | **−$10.75** ❌ |
| 100% | 150,000 | $75.00 | $0.75 | **−$70.75** ❌❌ |

### Your $9 plan (15,000/day)

| If they use | Emails/month | API cost | Payment fee | **You make** |
|---|---|---|---|---|
| 5% of cap | 22,500 | $11.25 | $0.95 | **−$3.20** ❌ |
| 10% | 45,000 | $22.50 | $0.95 | **−$14.45** ❌ |
| 100% | 450,000 | $225.00 | $0.95 | **−$217.45** ❌❌ |

### And your free plan

500/day = 15,000/month per person.

| Free users | At 10% use | Cost you |
|---|---|---|
| 100 | 150,000 | **$54/month** |
| 500 | 750,000 | **$270/month** |
| 1,000 | 1,500,000 | **$540/month** |

### The verdict

**On pay-as-you-go, both your paid plans lose money at anything above about 5% usage.** The $9 plan loses money even at 5%.

One customer on the $9 plan who actually uses their 15,000 a day costs you **$225/month** and pays you **$9**.

You asked me to make sure we don't end up in a loss. **This is the loss.** But it is completely fixable.

---

## PART 3 — ✅ The fix: flat-rate unlimited

Switch the supplier model and your prices become fine.

With **BulkEmailChecker Unlimited at $250/month**, your cost per email is **$0**. It doesn't matter whether a customer verifies 100 emails or 500,000 — your bill is the same.

### The same plans, on flat-rate

| Paying customers | Revenue | Supplier | Payment fees | **You make** |
|---|---|---|---|---|
| 20 × $5 | $100 | $250 | $15 | **−$165** ❌ |
| 50 × $5 | $250 | $250 | $37 | **−$37** ❌ |
| **60 mixed (~$7 avg)** | **$420** | **$250** | **$50** | **+$120** ✅ |
| 100 mixed | $700 | $250 | $85 | **+$365** ✅ |
| 200 mixed | $1,400 | $250 | $170 | **+$980** ✅ |
| 300 mixed | $2,100 | $500 (2 threads) | $255 | **+$1,345** ✅ |
| 500 mixed | $3,500 | $750 (3 threads) | $425 | **+$2,325** ✅ |

**Your break-even is about 55–60 paying customers.**

And notice: **the free plan now costs you nothing extra.** 500 free users, 5,000 free users — same bill. That makes your "no-brainer" free offer genuinely free to run, which is exactly what you wanted.

### The three ways to handle the first 60 customers

| Option | What you do | Cost while you get there | Verdict |
|---|---|---|---|
| **A. Pay the $250 from day one** | Launch with your full aggressive offer immediately | Max loss **$250/month**, capped and predictable | ✅ **Recommended.** It's cheaper than ads and it buys your entire marketing angle. |
| **B. Start on pay-as-you-go, smaller free tier** | 100/day free instead of 500. Switch to flat-rate at ~700k verifications/month | ~$30–80/month | Safer, but it kills the no-brainer offer you want |
| **C. Hybrid** | PAYG for the first 2 months to test demand, then flat-rate | ~$50/month | Slowest, but lowest risk |

**My recommendation: Option A.**

Here's the reasoning. Your whole strategy is a no-brainer offer that gets people in the door. That offer only works if the free tier is genuinely generous and the paid tiers are genuinely cheap. On PAYG you can't afford either. On flat-rate you can afford both immediately.

$250/month is **not a variable risk** — it's a fixed, known number you can cancel any month. Most founders spend more than that on ads and get less. Treat the first 3–4 months of that $250 as your marketing budget.

**Worst case: you spend $250 × 4 months = $1,000 and learn the offer doesn't work.** That's a cheap answer to an expensive question.

---

## PART 4 — ⚠️ Three things to confirm before you pay anyone

These are genuine risks I cannot resolve from public pages. **Ask the suppliers directly, in writing, before you commit.**

### 1. Does the unlimited plan allow RESELLING? 🔴 Critical
You would be buying "unlimited" and reselling it to hundreds of people. That is exactly the use case a supplier might ban, because you're the customer they lose money on.

**Email them:** *"I'm building a verification front-end and will resell verifications to my own customers under my brand. Does your unlimited plan permit this? Please confirm in writing."*

**If the answer is no, the whole flat-rate plan collapses** and you must go back to pay-as-you-go with higher prices. This is the single most important question in this document.

### 2. What does one "thread" actually deliver per day?
They say each thread handles "tens of thousands of emails per day". If that means 50,000/day, then **one thread can serve about three customers who genuinely max out your $9 plan.**

Your daily caps only work because most people don't use them (the breakage effect from the main plan). But you need to know the real ceiling.

**Ask:** *"What is the realistic daily verification volume of a single thread?"*

### 3. Accuracy — test it yourself, don't trust "99.7%"
Independent testing found the best tool on the market hits ~70% real accuracy while everyone advertises 98–99%. BulkEmailChecker's 99.7% claim is marketing until you verify it.

**Run your 500-address known-answer list through them before you pay for a month.** If their accuracy is poor, your entire "we're the honest one" positioning is dead on arrival — you'd be reselling the same problem you're trying to solve.

---

## PART 5 — Recommended supplier setup

**Do not use one supplier.** You need at least two, for two reasons: if one goes down you're dead, and your "check twice" feature literally requires more than one opinion.

| Role | Supplier | Cost | Used for |
|---|---|---|---|
| **Main engine** | BulkEmailChecker Unlimited | $250/mo flat | 90%+ of all checks. Zero marginal cost. |
| **Second opinion** | MillionVerifier PAYG | ~$37 to start | Only for addresses the main engine calls "valid" on paid plans, and for catch-alls. Small volume = small bill. |
| **Backup** | BulkEmailChecker PAYG credits | ~$10 | Emergency failover if the flat plan has an outage |

**Estimated monthly supplier cost at launch: $250–290.**

This gives you: zero marginal cost on the bulk of traffic, a genuine second opinion for your headline feature, and no single point of failure.

---

## PART 6 — Contabo hosting: good for the website, wrong for verification

You mentioned buying a Contabo plan (~$7–9, around 6–12GB RAM, 200GB NVMe).

### ✅ Excellent for hosting your website
The VPS 20 at roughly $7/month gives 6 vCPU, 12GB RAM, 100GB NVMe — a spec that costs $50+ elsewhere. Prices don't jump at renewal. That's genuinely great value for running your app, database, and the free tools.

### ⚠️ But do NOT verify emails from it — at least not yet

Two problems:

**Problem 1 — the rate limit.** Contabo does leave port 25 open by default, which is unusual and good. But the practical limit is around **25 connections per minute**, which is about **36,000 per day**. Your $9 plan promises 15,000/day *per customer*. Three customers would saturate the entire server.

**Problem 2 — abuse clamping.** Sustained heavy port-25 traffic triggers Contabo's abuse team to clamp your account. Verification probes look almost identical to spam behaviour from the outside. Some users also report being placed on recycled, already-blacklisted IPs.

**So the plan is:**
- **Contabo = your web app, database, free tools, SpamAssassin.** ~$7–9/month. Great.
- **Verification = the flat-rate API.** $250/month.
- **Your own verification server = revisit at month 9+**, on a second box with its own IP, and only for the easy checks. Not now.

---

## PART 7 — Your final numbers

### Monthly costs at launch

| Item | Cost |
|---|---|
| Contabo VPS (app hosting) | $7–9 |
| BulkEmailChecker Unlimited (1 thread) | $250 |
| MillionVerifier credits (second opinion) | ~$10–20 |
| Domain | $1 |
| Payment processing | 5% of revenue |
| **Fixed total** | **≈ $270/month** |

### What you need to survive

| Customers | Monthly revenue | Verdict |
|---|---|---|
| 20 | $140 | Losing ~$140/mo |
| 40 | $280 | Losing ~$20/mo |
| **60** | **$420** | **Break even** ✅ |
| 100 | $700 | +$365/mo |
| 300 | $2,100 | +$1,345/mo |
| 500 | $3,500 | +$2,325/mo |

**Your number is 60 paying customers.** Everything in the marketing plan should aim at that one figure.

### Is your pricing competitive? Yes — aggressively so

| Your plan | Per email at full use | Nearest competitor |
|---|---|---|
| $5 / 150k a month | **$0.000033** | MillionVerifier: $0.000359 (**10× more**) |
| $9 / 450k a month | **$0.00002** | MillionVerifier: $0.000359 (**18× more**) |

Even at 10% usage you're at $0.00033 and $0.0002 — still cheaper than almost everyone.

**This is a genuine no-brainer offer.** It only works because of flat-rate supply, and it is only survivable above 60 customers. Both of those facts have to stay true, so watch them monthly.

---

## PART 8 — Protect yourself: the fair-use rule

Even on flat-rate, one abusive customer can saturate your thread and slow everyone else down. Put this in your terms **before launch**:

> **Fair use.** Daily limits are maximums, not guarantees. Accounts that consistently use more than 60% of their daily allowance may be moved to a dedicated queue or asked to upgrade. We will always contact you first. We do not permit reselling, sharing accounts, or verifying purchased or scraped lists.

And build these guards in from day one:
- Hard daily cap enforced on the server (never only in the browser)
- One account per payment method
- Block disposable email domains at signup
- Alert when any account exceeds 50% of its cap for 3 days running
- **Watch the invalid rate.** Normal lists are 5–25% bad. Scraped and purchased lists are 50–80% bad. That one number is your best spam-customer detector, and it costs nothing to compute.

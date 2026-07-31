# 07 — Unit Economics, Costs & Break-Even

*You asked what your expenses look like weekly/monthly/yearly, and what happens when 10–20 people are on the free plan. This file answers that with real numbers.*

> All figures are estimates based on published 2026 pricing (file 13). Treat them as planning numbers, not quotes.

---

## 1. Your cost structure in one picture

| Cost type | What it is | Behaviour |
|---|---|---|
| **Fixed** | Hosting, database, domain, tools | Roughly flat. **$0–60/month early.** |
| **Variable** | Wholesale verification credits | Scales directly with usage. **Your only real cost.** |
| **Transaction** | Payment processing (~5% + $0.50 via merchant of record) | Scales with revenue |
| **One-off** | Domain, security review, legal docs, logo | **$400–1,200 total, once** |
| **Your time** | The largest real cost | Unpaid at the start |

---

## 2. Fixed monthly costs by stage

### Stage 0 — Building (months 0–3), no customers
| Item | Cost |
|---|---|
| Domain (.com, amortised) | $1 |
| Vercel (free tier) | $0 |
| Supabase (free tier) | $0 |
| Cloudflare (free) | $0 |
| Sentry / PostHog (free tiers) | $0 |
| Wholesale test credits | $20 |
| AI coding assistant subscription | $20–100 |
| **Total** | **$40–120/month** |

### Stage 1 — Launched (months 3–9), 0–50 paying customers
| Item | Cost |
|---|---|
| Domain | $1 |
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Background jobs (Trigger.dev/Inngest) | $0–20 |
| Transactional email (Resend) | $0–20 |
| Analytics (Plausible) | $9 |
| Hetzner VPS (SpamAssassin + tools) | $6 |
| AI coding assistant | $20–100 |
| **Fixed total** | **$81–201/month** |
| Wholesale verification credits | see §4 |

### Stage 2 — Growing (months 9–24), 50–300 customers
| Item | Cost |
|---|---|
| All the above | ~$120 |
| Hetzner verification nodes × 2–3 (Path B) | $18 |
| Additional IPs | $10–20 |
| Support tool (Crisp/Plain) | $0–25 |
| SEO tool (Ahrefs/Semrush — optional) | $0–100 |
| Accounting | $20–50 |
| **Fixed total** | **$170–340/month** |

**Key insight: your fixed costs are trivially small.** Under $200/month until you have hundreds of customers. This business does not fail from fixed costs. It fails from variable costs on unprofitable customers, or from never getting customers at all.

---

## 3. One-off startup costs

| Item | Cost | Necessity |
|---|---|---|
| Domain (.com) | $12 | Required |
| Logo / brand (Fiverr or AI) | $0–100 | Nice to have |
| **Freelance security review** | **$300–800** | **Strongly required before first paying customer** |
| Legal docs (ToS, Privacy Policy, DPA, AUP) | $0–500 | Required (templates → $0, lawyer-reviewed → $500) |
| Business registration | $0–350 | Depends on jurisdiction; can defer |
| Initial wholesale credit purchase | $50–200 | Required |
| **Total realistic minimum** | **~$400** | |
| **Total comfortable** | **~$1,200** | |

**You can genuinely start this for under $500.** Your instinct that this is a low-capital business was correct.

---

## 4. The free plan — what it actually costs you

You asked specifically about this. Assume 100 verifications/day free, wholesale cost $0.0005/verification.

**Absolute worst case — every free user maxes out every single day:**

| Free users | Verifications/mo | Cost/mo |
|---|---|---|
| 10 | 30,000 | **$15** |
| 20 | 60,000 | **$30** |
| 50 | 150,000 | **$75** |
| 200 | 600,000 | **$300** |
| 1,000 | 3,000,000 | **$1,500** ⚠️ |

**Realistic case** — actual free-tier utilisation is typically **5–15%**, because most signups try it once and drift:

| Free users | Realistic cost/mo |
|---|---|
| 10 | **$1.50–2** |
| 20 | **$3–5** |
| 50 | **$8–12** |
| 200 | **$30–45** |
| 1,000 | **$150–225** |

**So: 10–20 free users cost you about $2–5/month. Completely affordable — run the free plan without anxiety.**

**But build these guards from day one, before you have 1,000 free users:**
- Hard daily cap enforced server-side (not just in the UI).
- No bulk upload on free.
- Block disposable email domains at signup (you already have the list — you're a verification company).
- Device/IP fingerprinting to catch multi-account abuse. Industry data suggests **10–30% of free signups on developer tools are abusive.**
- Rate limits per IP.
- A monthly total free-tier spend cap with an alert — if free-tier costs exceed ~15% of MRR, tighten the plan.

**When to reduce the free plan:** when free-tier cost exceeds 15% of MRR, or when you see systematic abuse. Reduce to 50/day or 500/month rather than removing it — the free tier is your best acquisition channel and killing it entirely would be a mistake.

---

## 5. Unit economics per plan

Assumptions: wholesale $0.0005/verification blended; consensus applied to ~35% of addresses (so effective blended cost ≈ $0.0007); payment fees 5% + $0.50.

| Plan | Price | Typical usage | Verification cost | Payment fee | **Gross profit** | **Margin** |
|---|---|---|---|---|---|---|
| Lite $19 (1k/day) | $19 | ~5,000/mo | $3.50 | $1.45 | **$14.05** | **74%** |
| Standard $49 (5k/day) | $49 | ~25,000/mo | $17.50 | $2.95 | **$28.55** | **58%** |
| Pro $99 (15k/day) | $99 | ~70,000/mo | $49.00 | $5.45 | **$44.55** | **45%** |
| Agency $199 (50k/day) | $199 | ~200,000/mo | $140.00 | $10.45 | **$48.55** | **24%** ⚠️ |
| Pack $29 / 25k | $29 | 25,000 | $17.50 | $1.95 | **$9.55** | **33%** |
| Pack $79 / 100k | $79 | 100,000 | $70.00 | $4.45 | **$4.55** | **6%** ❌ |

### Three things this table tells you

1. **Small plans are your best plans.** The $19 tier at 74% margin is worth more per dollar than the $199 tier at 24%. Market to the small end.
2. **Your big credit packs are underpriced on Path A.** At $79 for 100k you make almost nothing. Either raise them to $99, or — better — **get to Path B hybrid infrastructure**, which drops blended cost to ~$0.0002 and turns that 6% margin into 70%+.
3. **Path B isn't optional at scale.** It's what makes the volume tiers viable. Plan the move for around month 6–9.

### The same table on Path B (blended cost ~$0.00025)

| Plan | Gross profit | Margin |
|---|---|---|
| Lite $19 | $16.30 | **86%** |
| Standard $49 | $39.80 | **81%** |
| Pro $99 | $76.05 | **77%** |
| Agency $199 | $138.55 | **70%** |
| Pack $79 / 100k | $49.55 | **63%** |

That's a healthy SaaS. **The single highest-value engineering project in year 1 is your own SMTP node.**

---

## 6. Break-even

**Fixed costs at Stage 1: ~$150/month.**

| Customer mix | Customers needed to break even |
|---|---|
| All Lite ($14 profit each) | **11 customers** |
| All Standard ($29 each) | **6 customers** |
| Realistic mix (~$22 avg) | **7 customers** |

**You break even at roughly 7–11 paying customers.** That is a genuinely low bar, and it should shape your psychology: this project doesn't need to be a hit to be worth doing.

---

## 7. Growth projections (conservative)

| Month | Free users | Paying | MRR | Pack revenue | Total rev | Costs | **Net** |
|---|---|---|---|---|---|---|---|
| 3 | 30 | 0 | $0 | $0 | $0 | $120 | **–$120** |
| 6 | 200 | 8 | $180 | $80 | $260 | $180 | **+$80** |
| 9 | 600 | 25 | $600 | $250 | $850 | $280 | **+$570** |
| 12 | 1,500 | 60 | $1,600 | $600 | $2,200 | $600 | **+$1,600** |
| 18 | 4,000 | 150 | $4,500 | $1,400 | $5,900 | $1,500 | **+$4,400** |
| 24 | 8,000 | 300 | $9,500 | $2,500 | $12,000 | $3,000 | **+$9,000** |

**Assumptions:** ~4% free-to-paid conversion, ~6% monthly churn, SEO compounding from month 6, no paid ads, Path B live by month 9.

**These are conservative but not guaranteed.** The single biggest variable is whether your SEO and community strategy works — see file 08. If it doesn't, month 12 looks like month 6.

---

## 8. Cash flow notes

- **Annual plans are your friend.** Two months free in exchange for 12 months of cash upfront materially changes a bootstrapped business.
- **Credit packs are prepaid revenue.** You collect the cash before you incur the verification cost. Good for cash flow, but **do not spend it all** — you owe those verifications. Set aside ~40% of pack revenue as a liability reserve until you're comfortable.
- **Buy wholesale credits in bulk when you can afford to.** Prices drop steeply with commitment. But don't lock a year's spend with one supplier — that's the concentration risk from file 04.
- **Merchant-of-record payouts have a delay** (typically 15–30 days). Plan for it.

---

## 9. Metrics to track from day one

| Metric | Target |
|---|---|
| Blended cost per verification | < $0.0007 (Path A), < $0.0003 (Path B) |
| Gross margin | > 60% |
| Free → paid conversion | 3–5% |
| Monthly churn | < 7% |
| % revenue from subscriptions | > 40% by month 12 |
| Free-tier cost as % of MRR | < 15% |
| Support tickets per customer/month | < 0.5 |
| Consensus disagreement rate | Track it — it's your product quality signal *and* your best content |

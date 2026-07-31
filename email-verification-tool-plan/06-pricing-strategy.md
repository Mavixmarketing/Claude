# 06 — Pricing Strategy

*You asked whether to charge $0 / $5 / $10 / $20, or per verification. The answer is: all of them, deliberately, at the same time. Here's why and how.*

---

## 1. First principle: never charge per seat

Your cost scales with **verifications**, not with users. So must your price. Per-seat pricing punishes agencies (your best customers) and is trivially gamed by password sharing.

**Charge for volume. Always.**

---

## 2. The pricing mechanic you must understand: daily-cap breakage

This is the most useful thing in this entire pack, and it explains the tool you're currently using.

You said you pay roughly **$9–14/week for 15,000 verifications/day**. That's ~$36–56/month for a theoretical **450,000 verifications/month**. That works out to about **$0.0001 per email** — cheaper than any provider's wholesale cost. It looks impossible.

It isn't, because of **breakage**. A daily cap does not reset unused capacity — it *destroys* it. If you don't use your 15,000 today, they're gone forever. So the provider's real cost is not 450k/month; it's whatever you actually consume.

Typical utilisation of a daily-cap plan is **10–25%** of the cap. Most subscribers verify heavily for two or three days a month and nothing the rest of the time.

**Worked example — a $99/month, 15,000/day plan (450k/month theoretical):**

| Customer type | Actual monthly usage | Your wholesale cost @ $0.0005 | Your gross margin |
|---|---|---|---|
| Typical (15% utilisation) | 67,500 | $34 | **66%** |
| Light (5%) | 22,500 | $11 | **89%** |
| Heavy (40%) | 180,000 | $90 | **9%** ⚠️ |
| Maxed out (100%) | 450,000 | $225 | **–127%** ❌ |

**Two conclusions:**
1. Daily caps let you advertise huge, headline-grabbing volumes at low prices — because most people won't use them. This is legitimate and standard.
2. **You will lose money on power users** unless you protect yourself. That protection is a **fair-use clause** plus soft rate limits, and it must be in your terms from day one.

Fair-use wording to adapt:
> "Daily limits are maximums, not guarantees. Sustained usage above 60% of your daily allowance across a billing month may result in throttling or a request to move to a higher plan. We will always contact you before making any change."

---

## 3. Recommended pricing structure

Four instruments, each doing a different job.

### A. Free plan — the acquisition engine
```
FREE — $0
· 100 verifications per day (resets daily, no rollover)
· Single-check tool + API access
· All free deliverability tools (spam checker, DNS tools, templates) — unlimited
· No credit card required
· No bulk CSV upload
· Results not stored beyond 24 hours
```
**Why:** MyEmailVerifier's 100-free-per-day hook is proven in this exact market. Verification has near-zero marginal cost for you, and the free tools cost you literally nothing to serve.
**Cost to you:** ~$0.05/month per active free user at $0.0005 wholesale, if they max it out — and most won't. **1,000 free users ≈ $10–50/month.** Entirely affordable.
**The critical restriction:** no bulk upload on free. Bulk upload is the paid job-to-be-done. The free tier exists to prove the results are good, not to do the work.

### B. Credit packs — for episodic buyers
Non-expiring. This removes the biggest switching barrier your competitors rely on.

| Pack | Price | Per email | Notes |
|---|---|---|---|
| Starter | **$9** | 5,000 | $0.0018 | Impulse price. |
| Growth | **$29** | 25,000 | $0.00116 | |
| Pro | **$79** | 100,000 | $0.00079 | |
| Scale | **$249** | 500,000 | $0.0005 | |
| Bulk | **$449** | 1,000,000 | $0.00045 | Competitive with MillionVerifier at the top end. |

**Duplicates are free. "Unknown" results are free.** Say both loudly on the pricing page — they're differentiators and they cost you little (you don't call a paid API twice for a duplicate anyway).

### C. Subscriptions — for recurring revenue
This is where your business actually lives.

| Plan | Price/mo | Daily cap | Monthly capacity | Includes |
|---|---|---|---|---|
| **Lite** | **$19** | 1,000/day | 30,000 | Bulk upload, API, results history |
| **Standard** | **$49** | 5,000/day | 150,000 | + auto re-verification, webhooks, priority queue |
| **Pro** | **$99** | 15,000/day | 450,000 | + Deep Verify credits (5,000/mo), blacklist monitoring, team seats |
| **Agency** | **$199** | 50,000/day | 1,500,000 | + white-label, sub-accounts, 25,000 Deep Verify, priority support |

Annual: **2 months free** (pay for 10). Improves cash flow and cuts churn substantially.

**Note the $99 tier deliberately mirrors what you currently pay for 15k/day** — matching the volume you like at a price that's sustainable for you, while offering consensus accuracy the cheap tools don't.

### D. Premium add-ons — your margin
| Add-on | Price | Notes |
|---|---|---|
| **Deep Verify** (catch-all resolution) | $0.01–0.02 per address | Slow, expensive, high value. The #1 unmet need in the market. |
| **Bounce Guarantee** | +40% on any plan or pack | Consensus across 3 engines + credit refund on any "valid" that bounces |
| **Deliverability audit** (done by you) | $149 one-off | High margin, teaches you the market |
| **White-label** | $99/mo on top of Agency | For resellers |

---

## 4. Why this structure works

| Buyer | What they take | Why |
|---|---|---|
| Curious visitor | Free tools | Costs you nothing, ranks in Google, builds trust |
| Freelancer / student | Free plan → $9 pack | Low friction, real value |
| Solo founder cleaning a list twice a year | $29–79 pack | Would have churned on a subscription; now they buy |
| Agency running campaigns weekly | $49–199/mo | Recurring, predictable |
| SaaS validating signups via API | $19–49/mo | **Never churns.** Embedded in their product. |
| Quality-obsessed cold emailer | Any plan + Guarantee | Your highest-margin customer |

**Do not force everyone onto a subscription.** Half this market genuinely is episodic. Trying to subscription-ify them just sends them to a competitor selling packs.

---

## 5. The churn problem, and the four fixes

Email verification has a structural retention weakness: **list cleaning is a job people do occasionally**. Someone buys 100k credits, cleans their list, and vanishes for six months.

Four defences, in order of effectiveness:

1. **The API.** Once your endpoint is validating signups inside someone's product, they cannot leave without an engineering task. Ship the API in the MVP, document it beautifully, price the small tiers cheaply enough that developers just start using it.
2. **Recurring, calendar-driven tools.** Blacklist monitoring, DMARC monitoring, and auto re-verification create a *reason to still be subscribed* in a month with no list to clean.
3. **The free toolkit.** Someone who uses your spam checker weekly is in your product weekly. Verification revenue follows attention.
4. **Non-expiring credits + top-up prompts.** Credits that don't expire mean a returning customer comes back to *you*, because their balance is here.

**Target metric:** get **40%+ of revenue from subscriptions** by month 12. Below 25% and you're on a treadmill.

---

## 6. Pricing psychology to apply

- **Anchor high.** Show Agency ($199) first or make Pro the visually highlighted "most popular". A $19 plan looks cheap next to $199 and expensive next to nothing.
- **Price in per-email terms too.** "$0.00079 per email" reads better than "$79".
- **Charge in whole dollars.** $29 and $49, not $29.99. B2B buyers read `.99` as consumer.
- **Show what you don't charge for.** "Duplicates: free. Unknowns: free. Credits: never expire." Three lines that beat a feature list.
- **One clear recommendation.** Mark one plan "Most popular". Choice paralysis kills conversion.
- **Never discount below your cost per verification.** Ever. Cap discounts at 30%.

---

## 7. Launch pricing tactics

**Do these:**
- **Founding member deal:** first 100 customers get 40% off forever. Creates urgency, rewards early risk-takers, and gives you 100 loyal references.
- **Competitor credit matching:** "Show us your unused ZeroBounce/NeverBounce balance, we'll match up to 50,000 credits free." Directly dissolves the #1 lock-in in this market and costs you ~$25 at wholesale per switcher. This is the single best acquisition offer available to you.
- **Free re-verification of one list**, no card, up to 10,000 addresses, so prospects can compare your results against their current tool on their own data. Your consensus engine wins this comparison more often than not — let the product sell itself.

**Be careful with:**
- **Lifetime deals / AppSumo.** They can produce $50k–500k in a month and enormous exposure. They also mean users consuming your server resources and support forever while never paying again — with AppSumo keeping a large share of the revenue (commonly cited around 70%). For a business with **per-unit variable costs like yours, an unlimited lifetime deal is financial suicide.** If you do one: cap it hard (e.g. "lifetime access to 5,000 credits per month, no rollover"), never sell unlimited verification, and treat the cash as a one-time marketing budget, not revenue.

**Never do:**
- Free unlimited bulk uploads.
- Undercutting MillionVerifier on price. You will lose, and it signals you compete on cost rather than quality.

---

## 8. Pricing evolution

| Stage | Move |
|---|---|
| **Launch** | Underprice ~20% vs plan above. Get to 30 customers and real feedback fast. |
| **Month 6** | Move to full pricing for new customers. Grandfather everyone existing — always. |
| **Month 12** | Introduce Guarantee and Deep Verify as premium tiers. Raise entry price if conversion is strong. |
| **Year 2** | Add an enterprise/annual-contract tier once you can support it. |

**Rule: grandfather existing customers forever on every price rise.** It costs little, and "they never raised my price" is the kind of thing people post in the communities you're trying to win.

---

## 9. Reality check on revenue

At the recommended prices, a realistic mix might look like:

| Customers | Mix | MRR |
|---|---|---|
| 20 | mostly $19–29 | ~$400 |
| 100 | 60 × $19, 30 × $49, 10 × $99 | ~$3,600 |
| 300 | 150 × $19, 100 × $49, 40 × $99, 10 × $199 | ~$13,700 |

Plus credit-pack revenue (typically 30–50% on top of MRR early on, declining as subscriptions grow).

**300 customers is the target that changes your life.** In a $1B market, that's invisible. It's achievable. Keep that number on your wall.

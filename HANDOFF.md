# HANDOFF — Email Verification Tool

**Owner:** Mavix Marketing
**Date:** 31 July 2026
**Repo:** `Mavixmarketing/Claude`
**Branch:** `claude/email-verification-business-plan-2d9sb1`
**Status:** Research complete. Code skeleton written but **never compiled or run**.

Read this document if you are picking this project up cold — whether that's you in three weeks, a developer you hire, or a new AI session.

---

# 1. WHAT THIS PROJECT IS

An email verification SaaS. Users paste an email address (or upload a list) and we tell them whether it's real.

**The angle:** every competitor claims 98–99% accuracy. Independent testing of 15 tools on 3,000 real emails found the best got **70%**. We check risky addresses through multiple engines, show the reasoning, and refund credits when we're wrong. Nobody else does any of those three.

**The chosen pricing:**

| Plan | Price | Limit |
|---|---|---|
| Homepage (no login) | Free | 5 checks/day per visitor, one at a time |
| Free account | $0 | 500/day |
| Starter | $5/mo | 5,000/day |
| Pro | $9/mo | 15,000/day |

**Break-even: 60 paying customers.**

---

# 2. EVERY FILE, AND ITS STATUS

## 2a. Planning documents — `email-verification-tool-plan/`

All complete. All research-backed. Sources in file 13.

| File | Contents | Confidence |
|---|---|---|
| `README.md` | Plain-language index | ✅ |
| `PLAIN-ENGLISH-SUMMARY.md` | The whole plan, no jargon | ✅ |
| `EMAIL-VERIFICATION-PLAN-SIMPLE.md` | Same, single file, 16 parts | ✅ |
| `00-executive-summary.md` | Strategy, verdict, targets | ✅ |
| `01-market-analysis.md` | Market size, demand, buyers | ⚠️ Analyst estimates vary 2× — treat as a range |
| `02-competitor-analysis.md` | 12 competitors, prices, weak spots, why people don't switch | ⚠️ Prices are July 2026 snapshots, re-verify |
| `03-how-it-works-technical.md` | How verification works, why accuracy is capped | ✅ Strongest file in the pack |
| `04-build-vs-buy-and-stack.md` | Three build paths, stack, licensing traps | ✅ |
| `05-product-features-roadmap.md` | Every feature scored, MVP→V3 | ✅ |
| `06-pricing-strategy.md` | Original pricing advice | ⚠️ **Superseded by file 14** for your actual prices |
| `07-unit-economics-and-costs.md` | Generic cost model | ⚠️ **Superseded by file 14** |
| `08-marketing-plan.md` | Original marketing plan | ⚠️ **Superseded by file 15** |
| `09-icp-and-customer-selection.md` | Who to target, who to refuse | ✅ |
| `10-security-auth-compliance.md` | Auth, API keys, GDPR, legal docs | ✅ |
| `11-swot-risks-and-failure-modes.md` | SWOT, 15 real problems | ✅ |
| `12-execution-timeline.md` | Week-by-week, kill criteria | ✅ |
| `13-sources.md` | Every source used | ✅ |
| **`14-SUPPLIER-PRICING-AND-YOUR-ECONOMICS.md`** | **All supplier prices + maths on YOUR $5/$9 plans** | ✅ **Most important file** |
| **`15-MARKETING-PLAYBOOK.md`** | Reddit Ads, SEO, LinkedIn, campaigns | ✅ |

**If you read only two: `14` and `03`.**

## 2b. Application code — `email-verifier-app/`

| File | What it does | Status |
|---|---|---|
| **Core engine** | | |
| `lib/verification/types.ts` | The result shape: 4 verdicts + confidence + reasons | ✅ Written |
| `lib/verification/consensus.ts` | ⭐ The "check twice" decision logic | ✅ Written |
| `lib/verification/router.ts` | ⭐ Decides how much to spend per address | ✅ Written |
| `lib/verification/checks/syntax.ts` | Free: format check | ✅ Written |
| `lib/verification/checks/dns.ts` | Free: MX lookup | ✅ Written |
| `lib/verification/checks/disposable.ts` | Free: temp-email list | ⚠️ Hardcoded 12 domains. Needs the real ~100k list. |
| `lib/verification/checks/role.ts` | Free: info@/sales@ detection | ✅ Written |
| `lib/verification/providers/index.ts` | Supplier layer, swappable | ⚠️ Generic adapter only. Needs per-supplier code. |
| **Data** | | |
| `lib/credits/ledger.ts` | Credit balances | ✅ Written |
| `lib/db/client.ts` | Database connections | ✅ Written |
| `lib/db/auth.ts` | API key auth (hashed) | ✅ Written |
| `supabase/migrations/0001_init.sql` | All tables + RLS | ⚠️ **Had 3 bugs — see §4** |
| `supabase/migrations/0002_fix_security_and_functions.sql` | Fixes for those bugs | ✅ Written |
| **Web** | | |
| `app/page.tsx` | Homepage with instant checker | ✅ Written |
| `app/layout.tsx` | Header/footer/SEO | ✅ Written |
| `app/globals.css` | Styling | ✅ Written |
| `app/api/public/verify/route.ts` | Homepage checker endpoint | ⚠️ Rate limiter is a stub that always returns 0 |
| `app/api/v1/verify/route.ts` | Customer API | ⚠️ Doesn't save results yet |
| `app/api/v1/bulk/route.ts` | List upload | ❌ Skeleton only |
| **Config** | | |
| `package.json`, `tsconfig.json` | Project setup | ⚠️ Never installed or compiled |
| `.env.example` | All the keys needed | ✅ |
| `.gitignore` | Protects secrets | ✅ |
| `docs/STRUCTURE.md` | Plain-English code map | ✅ |

---

# 3. ✅ WHAT IS RIGHT (high confidence)

1. **The market research.** Multiple independent sources agree the accuracy gap is real. This is the most solid part of the whole project.
2. **The technical explanation of why verification fails** (`03`). Catch-all domains and Microsoft/Gmail probe behaviour genuinely cap accuracy for everyone. This is not opinion.
3. **The economics in file 14.** The maths is arithmetic — pay-as-you-go loses money at your prices, flat-rate fixes it. I'd stake the project on this.
4. **The consensus logic** (`consensus.ts`). The decision table is sound and the reasoning is honest. Refusing to guess when engines disagree is the correct behaviour and the whole brand.
5. **The cost-control routing** (`router.ts`). Free checks → one engine → multiple engines only when needed. This is what keeps you competitive.
6. **The database design.** Tables, ledger, learning database, 30-day auto-delete — all correct in shape.
7. **Not buying Reddit mentions.** Reddit bans every account and URL tied to a caught domain. Given your buyers live in r/coldemail, this would be fatal.
8. **Contabo for the app, not for verification.** Their ~25 connections/minute port-25 limit means 3 customers would saturate one box.

---

# 4. 🔴 WHAT WAS WRONG (found in review, now fixed)

I audited my own code before writing this. Three real bugs, two of them security holes. **All are fixed in `0002_fix_security_and_functions.sql`.** If you already ran `0001` anywhere, run `0002` immediately.

### Bug 1 — Customers could give themselves unlimited credits 🔴 CRITICAL
`0001` set the accounts policy to `for all`, which allows UPDATE. Any logged-in customer using the public browser key could have set `credit_balance` to a million, upgraded their own plan, or **unblocked themselves after being banned for abuse**.
**Fixed:** read-only for customers. All writes go through the server.

### Bug 2 — Every email address in the system was publicly readable 🔴 CRITICAL
The `known_addresses` table had **no row-level security at all**. It stores email addresses across all customers. Anyone with the anon key — which ships to every visitor's browser — could have read the lot.
**Fixed:** RLS enabled, no customer policy, server-only access.

### Bug 3 — The credit system would have crashed on first use 🟠
`ledger.ts` called `spend_credits()` and `add_credits()`. Neither existed anywhere.
**Fixed:** both written in `0002`, with a row lock (so parallel API calls can't overdraw) and balance+ledger in one transaction.

### Also fixed
- Customers could approve their own bounce refunds (`bounce_claims` was `for all`).
- Customers could edit their own job records and insert arbitrary API key hashes.
- `router.ts` crashed if no supplier keys were configured — now returns an honest "not tested" result.
- Missing signup trigger — new users had no account row. Now auto-created with the 500/day free tier.

---

# 5. ⚠️ WHAT IS STILL WRONG / UNVERIFIED

**Be honest about these. Don't let anyone tell you the project is further along than it is.**

## 5a. The code has never been run

**No `npm install`. No compile. No test. Not once.**

Expect type errors and import problems on first run. The logic is sound; the wiring is unproven. Budget half a day to get it starting.

Specific things likely to break:
- Supabase join typing in `auth.ts` uses a cast (`as unknown as Account`) — fragile.
- `generateApiKey()` uses global `crypto` — needs Node 19+.
- Homepage links to `/signup`, `/login`, `/tools`, `/docs`, `/benchmark`, `/privacy`, `/terms`, `/aup`. **None of these pages exist — they will 404.**

## 5b. Not built at all

| Missing | Impact |
|---|---|
| **Background worker** | 🔴 Bulk upload cannot work without it. Biggest gap. |
| Signup / login pages | 🔴 Nobody can create an account |
| Dashboard | 🔴 Nowhere to see results |
| Payment integration | 🔴 Cannot take money |
| Rate limiter storage | 🟠 Homepage free checks are currently unlimited |
| Real disposable-domain list | 🟠 Only 12 domains hardcoded vs ~100k needed |
| Per-supplier adapters | 🔴 Generic template only — each supplier words answers differently |
| All legal pages | 🟠 Needed before taking money |
| Spam checker, templates, DNS tools | 🟡 V1 features, not blocking |

## 5c. Unverified assumptions — these could break the business

| Assumption | Risk | How to check |
|---|---|---|
| **Suppliers will let you resell** | 🔴 **Highest risk in the project.** If not, the flat-rate model collapses and prices must rise. | Email them. Get it in writing. |
| Flat-rate "unlimited" really is unlimited | 🔴 Thread capacity may be far lower than needed | Ask what one thread does per day |
| BulkEmailChecker's 99.7% accuracy | 🟠 Everyone claims 98–99%; best measured was 70% | Test on your 500-address list |
| Consensus actually beats one engine | 🔴 **If it doesn't, the core idea is wrong** | Test before building anything else |
| 60 customers is reachable | 🟠 Unproven | Marketing plan, file 15 |
| Utilisation stays low (10–25%) | 🟠 If users max their caps, costs jump | Monitor from day one |

## 5d. Known limitations I could not resolve

- **Accuracy has a hard ceiling.** Catch-all domains and Microsoft 365 are structurally unverifiable. No amount of work fixes this. It must be communicated, not hidden.
- **Spam trap detection isn't included.** It needs proprietary data. The code returns `null` for it deliberately — do not fake this.
- **Reddit sentiment in the research is second-hand**, from articles summarising communities rather than reading threads. Spend a week in r/coldemail yourself.
- **Pricing data is a July 2026 snapshot.** This industry changes prices constantly.
- **Two supplier pricing figures conflicted** across sources (MillionVerifier at 1M appeared as both $359 and $549). I used the lower and flagged it. Verify before committing.

---

# 6. 🟡 DECISIONS WAITING ON YOU

| # | Decision | Options | My recommendation |
|---|---|---|---|
| 1 | **Supplier model** | PAYG credits vs flat-rate unlimited | **Flat-rate.** Your prices only work this way. Treat the first ~$250/mo as marketing spend. |
| 2 | Which suppliers | BulkEmailChecker / MillionVerifier / Truelist | Main = BulkEmailChecker Unlimited. Second opinion = MillionVerifier PAYG. **Get at least two.** |
| 3 | Free tier size | 500/day vs 100/day | 500/day **only after** flat-rate is confirmed. On PAYG it's too expensive. |
| 4 | Brand name | — | Not chosen. Placeholder is "MailCheck" in `layout.tsx`. |
| 5 | Payment provider | Lemon Squeezy / Polar / Paddle | Lemon Squeezy for indie SaaS. **Stripe doesn't accept Pakistan.** |
| 6 | Launch aggressively or safely | Full offer now vs small free tier first | Full offer — it's your whole strategy — but only on flat-rate |

---

# 7. WHAT TO DO NEXT, IN ORDER

## Week 1 — Validation. No coding. 🔴 Do not skip.

1. **Email 3 suppliers.** Ask exactly this:
   > "I'm building a verification front-end and will resell verifications to my own customers under my own brand. (1) Does your unlimited/API plan permit this? (2) What realistic daily volume does one thread handle? Please confirm in writing."

   **If nobody allows reselling, stop and re-plan. Everything downstream depends on this answer.**

2. **Build the 500-address ground-truth list.** Addresses where you already know the answer: your own inboxes, known-dead addresses, catch-all domains, role accounts, disposables.

3. **Run it through 8 competitors' free tiers.** Record every result.

4. **Check whether consensus actually helps.** Compare "2 engines agreeing" against each engine alone.
   **If consensus doesn't beat every single engine, the core product idea is wrong** — find that out now, not after building a dashboard around it.

5. Buy the domain. Apply for Lemon Squeezy.

## Week 2–3 — Get it running
6. `npm install`, fix the compile errors, get it starting locally.
7. Run `0001` then `0002` in Supabase. **Test RLS by logging in as two users and trying to read each other's data.**
8. Write the real supplier adapters.
9. Wire the rate limiter to actual storage (Upstash Redis free tier).
10. Load the real disposable-domain list.

## Week 4–6 — Make it usable
11. **The background worker** — the biggest single gap.
12. Signup, login, dashboard.
13. Payments.
14. Legal pages.

## Week 7–8 — Before any customer
15. **Pay a freelancer $300–800 to security-review it.** Non-negotiable — I found two critical holes in my own code in ten minutes, and I wrote it.
16. Publish the benchmark. Launch on Reddit.

---

# 8. RULES THAT MUST NOT BE BROKEN

1. **Big lists run in the background, never inside a web request.** Works on 50 rows, breaks on 100,000.
2. **Secrets stay server-side.** Anything named `NEXT_PUBLIC_` is downloaded by every visitor's browser. Never call a supplier API from the browser.
3. **Test row-level security deliberately.** Two of my three bugs were RLS mistakes. Log in as two users and genuinely try to read each other's data.
4. **Never mark a catch-all as "valid."** That's the dishonesty you're selling against. The moment you do it to make your stats look better, you're just another cheap tool.
5. **Never buy Reddit upvotes or mentions.** Business-ending, especially in your niche.
6. **Watch the invalid rate per account.** Normal lists: 5–25% bad. Scraped/purchased: 50–80%. Best spam-customer detector you have, and it's free.
7. **Don't send anyone — including an AI session — your hosting passwords or server logins.** Deploy yourself using written steps.

---

# 9. THE NUMBERS TO REMEMBER

| | |
|---|---|
| Break-even | **60 paying customers** |
| Monthly fixed cost | ~$270 (Contabo $9 + supplier $250 + extras) |
| Max downside per month | ~$250, cancellable any time |
| Your price at full use | $0.00002/email (Pro) vs MillionVerifier's $0.000359 — **18× cheaper** |
| Real industry accuracy | ~60–70%, not the advertised 98–99% |
| Catch-all share of business domains | 20–40% — structurally unverifiable |
| Realistic month 12 | ~60 customers, ~$500/mo profit |
| Realistic month 24 | ~300 customers, ~$1,300/mo profit |

---

# 10. HONEST ASSESSMENT

**What's genuinely strong:** the market gap is real and well-evidenced. The positioning (honesty + consensus + refunds) is defensible and nobody occupies it. The economics work above 60 customers. Startup cost is low and the downside is capped. You already have the marketing skill, which is the half most technical founders fail at.

**What's genuinely risky:** you're not technical and the code is unproven. The reselling question could kill the model outright. Consensus improving accuracy is assumed, not measured. And "60 customers" is easy to write and hard to get.

**The single biggest risk isn't technical — it's stopping around month 6–9**, when SEO and community work still look like failure but are actually compounding.

**What I'd do first:** the supplier emails and the 500-address test. Both are free, both take a day, and either one can kill the project before you've spent real money. That's the cheapest possible way to find out.

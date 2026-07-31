# 04 — Build vs Buy, and Your Technical Stack

*You asked: "is there a way to make it for free, with just server cost? Do I have to buy an API?" This file answers exactly that.*

---

## 1. The three possible build paths

| | **Path A — Pure Aggregator** | **Path B — Hybrid** ✅ | **Path C — Own Infrastructure** |
|---|---|---|---|
| **What it is** | You call other companies' verification APIs and add your own UI, consensus logic, and free tools | You do the cheap checks yourself + your own SMTP node for easy domains, and buy API calls only for the hard 30–40% | You build everything: IP pools, SMTP probing, heuristics, retry queues |
| **Time to launch** | 6–10 weeks | 4–6 months | 12+ months |
| **Upfront cost** | **~$50–150** | ~$300–600 | $5,000+ |
| **Monthly fixed cost** | **$20–60** | $80–250 | $500–2,000+ |
| **Cost per verification** | $0.0005–0.0025 (whatever you pay wholesale) | ~$0.0002–0.0008 blended | ~$0.00005 at scale |
| **Gross margin at $0.002 selling price** | 30–70% | 70–88% | 95%+ |
| **Accuracy** | As good as your suppliers + consensus gain | Same, cheaper | Potentially best, but only after years of tuning |
| **Technical skill needed** | Low (AI-assisted build is realistic) | Medium | High |
| **Biggest risk** | Supplier dependency — price hikes, throttling, or being cut off for reselling | Managing IP reputation | Running out of money before it works |

### Recommendation: **start on Path A, move to Path B around month 6–9, consider Path C only in year 2+.**

Path A is not a compromise. It is the correct first move, for three reasons:
1. Your differentiator (consensus + transparency + guarantee + free tools) **does not require owning infrastructure**. It requires owning the *logic and the interface*.
2. It lets you validate demand before spending money.
3. Consensus verification is *literally impossible* without multiple engines — so you'd be buying third-party APIs even on Path C.

---

## 2. Answering "do I have to buy an API?"

**Yes for the SMTP step — no for everything else.** Here's the honest breakdown:

| Component | Free? | How |
|---|---|---|
| Syntax validation | ✅ Free forever | Standard libraries |
| MX / DNS lookup | ✅ Free forever | Built into every programming language. No API needed. |
| Disposable domain detection | ✅ Free | Public open-source lists on GitHub, updated by the community. Sync daily. |
| Role account detection | ✅ Free | Your own prefix list. |
| Free-provider detection | ✅ Free | Your own domain list. |
| Blacklist (DNSBL) checking | ✅ Free | Public DNS-based blacklists, free to query at low volume. |
| SPF / DKIM / DMARC checking | ✅ Free | DNS lookups. |
| SpamAssassin scoring | ✅ Free | Open-source, self-host on your VPS. Or Postmark's free JSON API to start. |
| Spam word / structure analysis | ✅ Free | Your own logic. |
| Template library | ✅ Free | You write them (or generate + edit). |
| **SMTP mailbox check** | ❌ **Costs money** | Either buy API credits, or build your own node (needs port-25 VPS + IP reputation work). |

**So: roughly 70% of a complete verification product is free to build.** Only the SMTP step costs money — and that's also the step that costs your competitors money.

### On open-source verification libraries — read this carefully

| Library | Language | Licence | Verdict |
|---|---|---|---|
| **check-if-email-exists / Reacher** | Rust | **AGPL-3.0** | ⚠️ **Do not use as-is in a commercial SaaS.** AGPL's network clause means offering it as a service can require you to open-source your own code. Reacher sells a commercial licence — that's the legal route if you want it. **Get this wrong and it's a real legal problem, not a technicality.** |
| **Truemail** | Ruby | Permissive (MIT) | ✅ Safe to use commercially. Does regex + DNS + SMTP. Good reference implementation. |
| **AfterShip/email-verifier** | Go | Permissive | ✅ Safe. Well maintained. Good choice for a self-hosted node in Path B. |
| **egulias/EmailValidator** | PHP | Permissive | ✅ Safe. Syntax/RFC validation only. |

**Rule: before using any open-source component, check the licence.** Permissive (MIT / Apache-2.0 / BSD) is fine. AGPL is dangerous for SaaS. GPL is a grey area you don't want to be in.

**Important caveat:** even with a permissively licensed library, you still need **port 25 access and clean IPs** for the SMTP step. The library is the easy part; the infrastructure is the hard part. Free code does not mean free verification.

---

## 3. Choosing your API suppliers (Path A)

Pick **three**, not one. Supplier concentration is your biggest Path-A risk, and consensus needs multiple engines anyway.

**Selection criteria:**
1. **Do they permit reselling / white-labelling?** Read the terms. MyEmailVerifier and MillionVerifier both run explicit reseller programmes — start there. Using a normal API in a resale product without permission risks termination.
2. **Wholesale price at your volume.** Negotiate. Nearly all of them will discount for committed prepaid volume — email the founder directly; these are small companies.
3. **Do credits expire?** Prefer non-expiring.
4. **Do you pay for "unknown" results?** Some charge for them, some don't. This materially changes your effective cost.
5. **Is catch-all checking charged extra?** Sometimes yes.
6. **Rate limits and bulk API support.**
7. **Geographic/GDPR posture** — an EU-based supplier helps your EU story.

**Suggested opening trio:**
- One **cheap bulk engine** (MillionVerifier / DeBounce class) — your default for easy addresses.
- One **accuracy-leaning engine** (Bouncer / Clearout class) — your tie-breaker.
- One **reseller-friendly engine with a free tier** (MyEmailVerifier class) — your third vote and your free-tier fulfilment.

**Negotiation script for the founder email:**
> "I'm building a verification front-end and expect to route 200k–1M verifications/month within 6 months. I'd like to discuss committed-volume wholesale pricing and confirm your terms allow white-label resale. Can you share your reseller rate card?"

Do this **before** you build. If nobody will sell to you at a workable rate, the entire Path A plan changes and you need to know that in week 1, not month 4.

---

## 4. Recommended technical stack

Chosen for: cheap, AI-buildable, well-documented (so AI assistants generate good code for it), and easy to hire help for later.

| Layer | Recommendation | Why | Cost |
|---|---|---|---|
| **Frontend + backend** | **Next.js** (React) | Most-documented stack in the world → AI tools write it well. One codebase for site + app + API. | Free |
| **Hosting (app)** | **Vercel** free tier → Pro ($20/mo) when needed | Zero-config deploys, generous free tier | $0 → $20 |
| **Database + Auth + File storage** | **Supabase** free tier → Pro ($25/mo) | Postgres + built-in authentication + storage + row-level security in one. Removes the two hardest things for a non-coder (auth and DB). | $0 → $25 |
| **Background jobs / queues** | **Supabase queues** or **Trigger.dev** / **Inngest** free tiers | Bulk verification must run in the background, not in a web request. **Do not skip this** — it's the #1 architectural mistake beginners make. | $0 → $20 |
| **Payments** | **Paddle** or **Lemon Squeezy** or **Polar** (merchant of record) | **Stripe does not onboard businesses based in Pakistan.** An MoR handles global tax/VAT and pays you out. ~5% + $0.50 per transaction vs Stripe's 2.9% + $0.30 — worth it for the compliance alone. Polar is the cheapest and developer-focused; Lemon Squeezy (Stripe-owned since 2023) is the best fit for indie SaaS; Paddle wins at scale. | ~5% of revenue |
| **Transactional email** (your own signups, receipts) | Resend or Postmark free tier | You must have perfect SPF/DKIM/DMARC yourself — you're a deliverability company | $0 → $20 |
| **SMTP verification node** (Path B) | **Hetzner** CX22 (~€4.50/mo) or CPX11 (~€5.99/mo) | One of the few providers with **port 25 open by default**. Note: needs ~1 month account history before full unblocking, and be careful — accounts opened via VPN or with mismatched billing details get suspended. | ~$6/mo each |
| **SpamAssassin host** | Same Hetzner box, or a second small one | Free open-source software | $0–6 |
| **Analytics** | Plausible ($9) or PostHog free tier | | $0–9 |
| **Error monitoring** | Sentry free tier | You will need this | $0 |
| **Domain** | Namecheap / Cloudflare | Get a `.com`. Do not get a `.io` (expensive) or a spammy TLD. | ~$12/yr |
| **CDN / DNS / bot protection** | Cloudflare free | Also gives you rate limiting and DDoS protection free | $0 |

**Total realistic monthly fixed cost at launch: $0–35.** This genuinely is a "just server cost" business at the start — you were right to suspect that.

---

## 5. Architecture in plain English

```
                          ┌─────────────────────────────┐
   Website & free tools ──▶│  Next.js app (Vercel)       │
   Dashboard              │  - marketing site           │
   API for customers      │  - user dashboard           │
                          │  - public REST API          │
                          └──────────┬──────────────────┘
                                     │
                    ┌────────────────┼─────────────────┐
                    ▼                ▼                 ▼
           ┌────────────────┐ ┌─────────────┐ ┌──────────────────┐
           │ Supabase       │ │ Job queue    │ │ Free checks       │
           │ - users        │ │ (bulk lists) │ │ (syntax, MX,      │
           │ - credits      │ │              │ │  disposable,      │
           │ - results log  │ │              │ │  role) — $0       │
           │ - API keys     │ └──────┬───────┘ └──────────────────┘
           └────────────────┘        │
                                     ▼
                        ┌────────────────────────────┐
                        │  VERIFICATION ROUTER       │  ← your actual IP
                        │  decides, per address:     │
                        │  · resolved for free? stop │
                        │  · easy? → 1 engine        │
                        │  · ambiguous? → 2–3 engines│
                        │  · consensus + confidence  │
                        └──────┬──────┬──────┬───────┘
                               ▼      ▼      ▼
                         Provider A  B   Your own SMTP node
                                              (Path B, Hetzner)
```

**The Verification Router is your company.** Everything else is commodity. Spend your thinking time there.

---

## 6. Building it as a non-technical founder — realistic expectations

AI coding tools genuinely work in 2026 for narrow, single-purpose SaaS — which is precisely this category. But calibrate:

**What's true:**
- The gap from idea to working product has collapsed from months and tens of thousands of dollars to weeks and a few hundred dollars a month.
- There are real examples of non-developers scaling AI-built tools to significant revenue.
- Narrow, single-purpose tools are exactly the category where AI code generation is most reliable.

**What's also true:**
- "Built a production SaaS with one prompt" is fiction. A single feature typically takes **5–15 rounds** of describe → build → test → fix. A full MVP is days-to-weeks of these sessions.
- **65% of scanned AI-generated apps carry security vulnerabilities; 58% contain at least one critical flaw.** You will be storing customer email lists and API keys. This is not a risk you can wave off.

**Your practical approach:**
1. **Tooling:** Lovable or Bolt.new if you want maximum hand-holding; Claude Code or Cursor if you're willing to learn a little more and want a proper codebase you own. **Recommendation: Claude Code**, because you'll need real control over background jobs and API integrations, and because you own the repository outright.
2. **Learn the minimum:** you don't need to write code, but you *do* need to understand what a database table, an API key, an environment variable, a background job, and a deploy are. A weekend of reading. Non-negotiable.
3. **Budget $300–800 (one time) for a freelance developer security review** before you accept your first paying customer. This is the highest-ROI money you will spend. Post on Upwork: "Security review of a Next.js + Supabase SaaS handling customer data — 4–6 hours."
4. **Never store secrets in your frontend code.** The most common AI-generated vulnerability is exactly this. See file 10.
5. **Ship the ugly version.** Your first customers care that the results are right, not that the dashboard is pretty.

---

## 7. What to buy vs build — summary table

| Thing | Decision | Why |
|---|---|---|
| SMTP verification engine | **Buy** (year 1) | Infrastructure + reputation moat you can't replicate cheaply |
| Consensus logic | **Build** | This is your product |
| UI / dashboard | **Build** | Table stakes, and AI-buildable |
| Auth | **Buy** (Supabase) | Never hand-roll auth |
| Payments | **Buy** (MoR) | Tax compliance is a nightmare |
| Disposable/role lists | **Build** from free sources | Free and easy |
| Spam checker | **Build** on SpamAssassin | Free, and your traffic magnet |
| Email templates | **Build** | Free, and your SEO engine |
| Spam trap database | **Buy or skip** | Proprietary data you can't get free. Skip in V1; be honest that you don't detect them yet. |
| Email finder | **Skip in year 1** | Requires expensive data licensing. ZeroBounce/Hunter own it. |
| Inbox placement seed testing | **Defer to V2** | Requires maintaining real seed accounts across providers — ongoing operational cost |
| SOC 2 / ISO 27001 | **Skip until year 3** | $20k+ and only matters for enterprise |

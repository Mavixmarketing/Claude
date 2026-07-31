# 12 — Execution Timeline

*You said you don't know what things look like at the start, midway, or when it's working. This file is that map.*

---

## PHASE 0 — Validate before you build (Weeks 1–2)

**Goal: prove the business model is possible before spending a single week coding.**

| # | Task | Why it's here | Done when |
|---|---|---|---|
| 1 | **Email 5 verification providers asking for reseller/wholesale rates** | ⚠️ **This is a go/no-go gate.** If nobody will sell to you at a workable rate, Path A is dead and you need to know now. | You have 2–3 written rate cards |
| 2 | Sign up for free tiers of 6–8 competitors | Product research | Accounts created |
| 3 | **Build your ground-truth test list** (500–1,000 addresses where you know the real answer) | Your permanent QA asset and your benchmark data | CSV ready |
| 4 | **Run it through every tool. Record everything.** | This is your benchmark, your positioning proof, and your supplier selection | Spreadsheet complete |
| 5 | Post 3 genuinely helpful answers in r/coldemail. No links. | Start building community standing now — it takes weeks | Done |
| 6 | Register domain, set up MoR account (Paddle/Lemon Squeezy/Polar) | Payment setup can take days for approval | Approved |
| 7 | Write the positioning statement (file 02 §7) and pin it above your desk | Everything else follows from it | Written |

**Spend: ~$60.** **Kill criterion: if step 1 fails with all five providers, stop and rethink before building.**

---

## PHASE 1 — MVP (Weeks 3–12)

**Goal: something that works, takes money, and produces results you'd stake your name on.**

### Weeks 3–4 — Foundation
- Next.js + Supabase set up, deployed to Vercel
- Auth working (email + Google), disposable domains blocked at signup
- Database schema: users, credits, jobs, results, api_keys
- **`.env` in `.gitignore` before the first commit**

### Weeks 5–6 — Verification core
- Free checks: syntax, MX/DNS, disposable, role, free-provider
- Integrate supplier #1 and #2
- **The Verification Router** with the consensus decision matrix
- Four-state output + confidence score + reasons
- Test against your ground-truth list. **Iterate until your accuracy beats every individual supplier.** This is the moment you find out if the whole thesis holds.

### Weeks 7–8 — The product around it
- Bulk CSV upload with a **background job queue** (not in a web request)
- Progress tracking, filtered result downloads
- Credits system with atomic deduction (no double-charging on retries)
- Dashboard: usage, history, balance

### Weeks 9–10 — Commerce & API
- MoR checkout: credit packs + subscriptions
- Free tier with server-enforced daily cap
- REST API + hashed, prefixed, revocable API keys
- API documentation (make this genuinely good — it's a sales asset)
- Rate limiting everywhere

### Weeks 11–12 — Launch readiness
- **Freelance security review ($300–800)** ← do not skip
- ToS, Privacy Policy, DPA, AUP, sub-processor page published
- Landing page with the honest positioning
- Auto-deletion of uploaded lists after 30 days, tested
- Uptime monitoring + status page
- **20 beta users from communities.** Free credits in exchange for honest feedback.

**Spend: ~$400–900 total.**

**Milestone: a working product, 20 beta users, and results you trust.**

---

## PHASE 2 — Launch & first customers (Months 4–6)

### Month 4 — Go public
| Week | Action |
|---|---|
| 1 | **Publish the accuracy benchmark.** Full methodology, raw data, including where you lost. Post to r/coldemail, r/emailmarketing, Indie Hackers, LinkedIn — as a resource, not an ad. |
| 2 | **Product Hunt launch.** Line up 20 real users for the day. Ship the free spam checker the same week. |
| 3 | Directory listings: G2, Capterra, AlternativeTo, SaaSHub, Product Hunt. Submit Zapier/Make integrations. |
| 4 | Launch **competitor credit-matching**. DM 50 agencies offering free list cleaning for feedback. |

### Months 5–6 — Build the moat
- Ship remaining free tools (SPF/DKIM/DMARC/blacklist/MX checkers)
- First 30 template library pages
- 2–3 SEO articles per week — comparisons and problem-first content
- Weekly newsletter begins
- Greylist retry queue
- **Ship the bounce guarantee**
- Daily presence in 2–3 communities

**Milestones:** First paying customer by month 4. **8–15 paying customers and roughly break-even by month 6.**

---

## PHASE 3 — Traction (Months 7–12)

### Months 7–9 — Differentiate hard
- **Deep Verify** (catch-all resolution) launches as a paid add-on
- **Begin Path B**: first Hetzner SMTP node (order early — port 25 needs ~1 month of account history)
- Template library to 96 pages
- Webhooks, auto re-verification
- Blacklist monitoring with alerts (your first genuinely subscription-worthy add-on)
- **Publish benchmark v2** — now with a quarter of your own data
- Launch your affiliate programme (25% recurring)

### Months 10–12 — Scale what works
- Path B fully live → blended cost drops to ~$0.00025 → margins jump (file 07 §5)
- White-label reseller portal
- Chrome extension, Google Sheets add-on
- Team accounts
- Native integrations (Instantly, Smartlead, Clay, HubSpot)
- First paid marketing spend (~$500/mo) once conversion is proven

**Milestones:** 25 customers / ~$600 MRR by month 9. **60 customers / ~$1,600 MRR by month 12.**

---

## PHASE 4 — Working business (Year 2)

- 150–300 customers, $4,500–9,500 MRR
- Own infrastructure handles the majority of verification volume
- Consider your first hire: a part-time support person or a content writer (support first — it frees the most of your time)
- Annual industry benchmark report as a flagship asset
- Explore: inbox placement seed testing, spam trap data, enterprise tier
- Decide: stay a profitable solo business, or raise/hire to go bigger

---

## Milestones and kill criteria

| Checkpoint | Green light | Yellow — investigate | 🔴 Red — stop or pivot |
|---|---|---|---|
| **Week 2** | 2+ suppliers with workable rates | 1 supplier | **No supplier will deal → rethink model entirely** |
| **Week 6** | Your consensus beats every single supplier on your ground-truth list | Matches the best | **Consensus adds nothing → the core thesis is wrong, rethink positioning** |
| **Week 12** | MVP live, 20 beta users, security reviewed | MVP live, few users | Still building → **launch anyway, ugly** |
| **Month 4** | First paying customer | Signups but no payments | Zero signups → distribution problem, not product problem |
| **Month 6** | 8+ paying, break-even | 3–7 paying | 0 paying despite launch + benchmark → pricing or positioning is wrong |
| **Month 9** | 25+ paying, $600 MRR | 10–24 paying | **<10 paying and <$300 MRR after shipping free tools and 30+ articles → pivot to the deliverability-toolkit product, or stop** |
| **Month 12** | 60+ paying, $1,600 MRR | 30–59 | <20 paying → the differentiation isn't landing. Be honest with yourself. |

**On the month 9 kill criterion:** be genuinely honest at that checkpoint. If verification isn't selling but your spam checker and free tools have traffic, that's not failure — that's the market telling you which product to build. Pivoting toward a deliverability toolkit with verification as one feature is a legitimate and probably better outcome, not a defeat.

---

## Weekly operating rhythm

| Day | Focus |
|---|---|
| Mon | Build (features) |
| Tue | Build (features) |
| Wed | Content (2 articles or 10 template pages) |
| Thu | Build (fixes, support) |
| Fri | Marketing: communities, outreach, partnerships |
| Sat | Content or rest |
| Sun | **Rest.** Non-negotiable. Burnout is the #1 killer (file 11). |

**Monthly:** review metrics (file 07 §9), re-run your ground-truth benchmark, check supplier pricing, read every support conversation from the month.

---

## Your next 7 days

1. **Day 1** — Email 5 verification providers about reseller rates. *(the go/no-go gate)*
2. **Day 2** — Build the 500-address ground-truth test list.
3. **Day 3** — Sign up for 8 competitors' free tiers; run your list through all of them.
4. **Day 4** — Analyse results. This tells you who your suppliers should be and what your benchmark says.
5. **Day 5** — Register domain; apply for a merchant-of-record account.
6. **Day 6** — Write the positioning statement and sketch the landing page.
7. **Day 7** — Post 3 genuinely helpful answers in r/coldemail. Build zero features this week.

**Notice that nothing in week one involves writing code.** That is deliberate. The two things most likely to kill this project — no supplier access, and consensus not actually improving accuracy — are both testable before you build anything.

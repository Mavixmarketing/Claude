# 05 — Product Features & Roadmap

*Every feature you asked about, plus the ones you didn't, scored by value and difficulty and slotted into a release.*

---

## 1. Scoring key

- **Value** ★☆☆☆☆ – ★★★★★ (to the customer / to the business)
- **Difficulty** 🟢 Easy (days) · 🟡 Medium (1–3 weeks) · 🔴 Hard (1–3 months) · ⚫ Very hard / needs data or money
- **Release** MVP · V1 · V2 · V3 · ❌ Skip

---

## 2. Core verification

| Feature | Value | Difficulty | Release | Notes |
|---|---|---|---|---|
| Single email check (web form) | ★★★☆☆ | 🟢 | **MVP** | Also your best free SEO tool. Make the public one require no signup. |
| Bulk CSV upload + verification | ★★★★★ | 🟡 | **MVP** | Must run as a background job with progress %. Support 100k+ rows. |
| Downloadable results (CSV/XLSX, filtered) | ★★★★★ | 🟢 | **MVP** | Let them download "valid only", "valid + catch-all", "all with reasons" separately. Small thing, hugely appreciated. |
| Four-state result + confidence score 0–100 | ★★★★★ | 🟢 | **MVP** | Your differentiator. Never a binary. |
| Full reason breakdown per address | ★★★★★ | 🟢 | **MVP** | "MX ok · SMTP 250 · not catch-all · not disposable · not role". Nobody else does this. |
| Multi-engine consensus | ★★★★★ | 🟡 | **MVP** | The product. Only on ambiguous addresses to control cost. |
| Catch-all detection | ★★★★★ | 🟢 | **MVP** | Table stakes. |
| Disposable / temp email detection | ★★★★☆ | 🟢 | **MVP** | Free public lists, synced daily. |
| Role account detection | ★★★★☆ | 🟢 | **MVP** | Free. |
| Free-provider (gmail/yahoo) flag | ★★★☆☆ | 🟢 | **MVP** | Free. |
| Duplicate removal + list stats | ★★★★☆ | 🟢 | **MVP** | Charge once for duplicates, not per copy. Say so loudly — it's a trust signal. |
| Real-time REST API | ★★★★★ | 🟡 | **MVP** | **Your retention lifeline.** See file 06 on churn. |
| Smart greylist retry queue | ★★★★☆ | 🟡 | **V1** | Converts "unknown" → real answers. Genuine accuracy edge. |
| **Deep Verify (catch-all resolution)** | ★★★★★ | 🔴 | **V1** | Premium paid add-on. Attacks the #1 market complaint. |
| **Bounce refund guarantee** | ★★★★★ | 🟡 | **V1** | Policy + a claims form + credit auto-refund. Mostly business logic, not code. |
| Auto re-verification (scheduled) | ★★★★☆ | 🟡 | **V2** | "Re-verify my list every 30 days." Converts one-off buyers into subscribers. |
| Spam trap detection | ★★★★☆ | ⚫ | **V2** | Needs proprietary data. Until then, say honestly that you don't do it. |
| Team accounts / sub-users | ★★★☆☆ | 🟡 | **V2** | For agencies. |
| White-label / reseller portal | ★★★★☆ | 🔴 | **V2** | Agencies resell under their own brand. High-leverage revenue. |
| Webhooks on job completion | ★★★☆☆ | 🟢 | **V1** | Easy, and required by anyone automating. |

---

## 3. The Spam / Template Checker (your second product)

*This is the feature you described in most detail, and you're right that it's valuable — but build it around infrastructure, not just spam words. See file 03 §5 for why.*

| Feature | Value | Difficulty | Release | Notes |
|---|---|---|---|---|
| Paste template → get a score | ★★★★★ | 🟡 | **V1** | Free, no login. Your #1 traffic magnet. |
| SpamAssassin score + triggered rules | ★★★★★ | 🟡 | **V1** | Self-host SpamAssassin (free) or start on Postmark's free JSON API. Target score under 3.0. |
| Spam trigger word highlighting | ★★★★☆ | 🟢 | **V1** | Highlight in-place with severity. Be honest that this is a *low-to-medium* weight signal. |
| Structural risk analysis | ★★★★★ | 🟢 | **V1** | Link count, link/text ratio, image/text ratio, ALL CAPS, `!!!`, shortened links, attachments, HTML weight, subject length. These matter more than words. |
| **SPF / DKIM / DMARC checker for their domain** | ★★★★★ | 🟢 | **V1** | Free DNS lookups. **Highest-weight signal there is** and almost no spam checker leads with it. |
| Blacklist check (domain + IP) | ★★★★★ | 🟢 | **V1** | Free DNSBL queries. |
| Inbox-placement probability estimate | ★★★★☆ | 🟡 | **V1** | Combine the above into a single 0–100 "likely to land in inbox" number. Label it clearly as an *estimate*, not a guarantee. |
| Specific rewrite suggestions | ★★★★★ | 🟡 | **V1** | "Replace 'Act now' with…", "Remove 2 of your 4 links". This is what makes it feel valuable rather than diagnostic. |
| Personalisation / readability / length scoring | ★★★☆☆ | 🟢 | **V2** | Reading grade, word count (cold email sweet spot 50–125 words), merge-tag detection. |
| Public spam-word database page | ★★★★★ | 🟢 | **V1** | 400–600 words, categorised, searchable, filterable. **Massive SEO asset** — competitors rank for this with static lists; yours will be interactive. |
| Real seed-list inbox placement testing | ★★★★★ | ⚫ | **V3** | Requires maintaining real Gmail/Outlook/Yahoo seed accounts. Real ongoing cost and operational pain. ZeroBounce charges heavily for this. Defer. |
| Subject line A/B scorer | ★★★☆☆ | 🟢 | **V2** | Cheap to add, good for engagement. |

**Positioning line for this tool:** *"Most spam checkers tell you to delete the word 'free'. We check whether your DMARC record is the actual reason you're in spam."*

---

## 4. The Template Library (your SEO engine)

You described this well: industry-specific cold email templates users can grab. It's a great idea — mostly because of what it does for search traffic.

| Feature | Value | Difficulty | Release | Notes |
|---|---|---|---|---|
| Templates by industry | ★★★★☆ | 🟢 | **V1** | SaaS, home services, real estate, agencies, ecommerce, healthcare, recruiting, finance, local services, manufacturing… |
| Templates by use case | ★★★★☆ | 🟢 | **V1** | Cold outreach, follow-up 1/2/3, break-up email, re-engagement, referral ask, meeting request. |
| Each template pre-scored by your spam checker | ★★★★★ | 🟢 | **V1** | **This is the clever bit.** Every template page shows "Spam score: 1.2 / Inbox probability: 87%" — which advertises your checker on every single page. |
| "Open in checker" button | ★★★★★ | 🟢 | **V1** | One click from template → your tool. Free-to-paid funnel. |
| Copy / personalise with merge tags | ★★★☆☆ | 🟢 | **V1** | |
| User-submitted templates + voting | ★★★☆☆ | 🟡 | **V2** | Community content = free SEO pages. Moderate carefully. |
| AI template generator | ★★★★☆ | 🟡 | **V2** | "Describe your offer + target" → template. Costs per generation; gate behind signup. |
| Template performance benchmarks | ★★★★☆ | ⚫ | **V3** | Needs real reply-rate data you won't have. |

**SEO math:** 12 industries × 8 use cases = **96 template pages**, each targeting a long-tail keyword like *"cold email template for home service businesses"*. This is textbook programmatic SEO, it's genuinely useful (not thin content), and it costs you nothing but writing time. Detail in file 08.

---

## 5. Deliverability toolkit (free tools = your marketing)

Each of these is a standalone free tool with its own landing page and its own keyword. All are cheap to build and all feed your funnel.

| Tool | Value | Difficulty | Release |
|---|---|---|---|
| SPF record checker + generator | ★★★★☆ | 🟢 | **V1** |
| DKIM checker | ★★★★☆ | 🟢 | **V1** |
| DMARC checker + generator | ★★★★★ | 🟢 | **V1** |
| Blacklist / DNSBL checker | ★★★★★ | 🟢 | **V1** |
| MX record lookup | ★★★☆☆ | 🟢 | **V1** |
| Domain age / reputation checker | ★★★☆☆ | 🟢 | **V2** |
| Email header analyser | ★★★★☆ | 🟡 | **V2** |
| Bounce-rate calculator | ★★★☆☆ | 🟢 | **V1** |
| Cold email ROI calculator | ★★★☆☆ | 🟢 | **V1** |
| Blacklist monitoring (recurring alerts) | ★★★★★ | 🟡 | **V2** — first genuinely subscription-worthy add-on |
| DMARC report monitoring | ★★★★☆ | 🔴 | **V3** |
| Email warm-up | ★★★★☆ | ⚫ | ❌ Skip — crowded, operationally heavy, different business |

---

## 6. The comparison / affiliate hub

Your idea to compare cold-email platforms and earn affiliate commission is sound, with caveats.

| Feature | Value | Difficulty | Release | Notes |
|---|---|---|---|---|
| Tool comparison pages | ★★★★☆ | 🟢 | **V1** | "Instantly vs Smartlead", "best cold email software 2026", "X alternatives". High commercial intent. |
| Interactive comparison table | ★★★★☆ | 🟡 | **V2** | Filterable by price/features. Better than a static blog table. |
| Affiliate links | ★★★☆☆ | 🟢 | **V1** | See warnings below. |
| "Which tool should I use?" quiz | ★★★★☆ | 🟡 | **V2** | Converts well and captures emails. |

**Warnings — take these seriously:**
1. **Disclose affiliate relationships.** Legally required in the US (FTC) and UK. A visible disclosure line. Non-negotiable.
2. **Don't compare your own competitors dishonestly.** If you rank email verifiers and put yourself #1, your credibility — the entire asset you're building — evaporates. Either exclude yourself from verifier comparisons, or include yourself with a clear disclosure and let the data speak.
3. **Affiliate revenue is a bonus, not a business.** Recurring commissions (typically 20–30% for cold email tools) on a handful of referrals is $50–500/month at best, for a long time.
4. **The real value is SEO and trust**, not commission. Comparison content ranks, brings in exactly your ICP, and positions you as the neutral expert. Treat commission as a rounding error and optimise for trust.

---

## 7. Other feature ideas worth considering

| Idea | Verdict |
|---|---|
| **Chrome extension** (verify an address on any page/LinkedIn) | ★★★★☆ V2 — great distribution, Chrome Web Store is a discovery channel |
| **Zapier / Make / n8n integrations** | ★★★★★ V1 — free distribution through their directories. **Do this early.** |
| **Native integrations**: HubSpot, Instantly, Smartlead, Clay, Mailchimp, Google Sheets | ★★★★★ V2 — this is how NeverBounce defends premium pricing |
| **Google Sheets add-on** | ★★★★☆ V2 — huge non-technical user base, low competition |
| **Free public accuracy benchmark, updated quarterly** | ★★★★★ **V1 — do this before you launch.** Highest-leverage marketing asset available. |
| **Deliverability audit** (paid one-off service, done by you) | ★★★★☆ V2 — $99–299, high margin, builds relationships, teaches you what customers actually need |
| **Free "email deliverability course"** by email | ★★★★☆ V1 — email capture + nurture, costs only writing time |
| Email finder | ❌ Year 3 — needs expensive data |
| Full cold email sending platform | ❌ Never — different business, brutal competition, huge abuse liability |
| Phone number verification | ❌ Adjacent but unrelated; splits focus |
| Lead database | ❌ Legal minefield, expensive, entirely different company |

---

## 8. Release plan

### MVP (weeks 1–10) — "does it work and will anyone pay"
Signup/login · credits system · single check · bulk CSV upload + background job · four-state results + confidence + reasons · consensus routing across 2 providers · downloadable filtered results · REST API + API keys · payment via MoR · free tier with daily cap · basic dashboard.
**Plus, before launch:** the public accuracy benchmark. It's marketing, but it's also QA for your own engine.

### V1 (months 3–6) — "why you instead of them"
Spam/template checker · spam word database page · SPF/DKIM/DMARC/blacklist/MX free tools · template library (start with 30 pages, grow to 96) · Deep Verify add-on · bounce refund guarantee · greylist retry · webhooks · Zapier/Make/n8n · comparison hub · docs.

### V2 (months 6–12) — "make them stay"
Auto re-verification · blacklist monitoring with alerts · team accounts · white-label reseller portal · Chrome extension · Google Sheets add-on · native integrations · AI template generator · quiz · Path B hybrid infrastructure.

### V3 (year 2+) — "become a platform"
Real seed-list inbox placement · DMARC report monitoring · spam trap data · email finder · own IP infrastructure · enterprise/compliance.

---

## 9. What NOT to build (protect your focus)

1. **A sending platform.** Different business, worse economics, enormous abuse exposure.
2. **A lead database.** Legal risk, capital intensive, unrelated.
3. **A mobile app.** Nobody verifies email lists on a phone.
4. **Anything enterprise-shaped** (SSO, SAML, audit logs, custom contracts) until someone offers you $2,000/month.
5. **A prettier dashboard**, when you could be shipping the spam checker. Your first 100 customers care about correctness and trust, not design.

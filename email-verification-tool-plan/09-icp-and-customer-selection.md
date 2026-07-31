# 09 — Who to Target, and Who to Refuse

*You asked which kinds of people should use it and which you should avoid. In this business, the second question matters more than the first — the wrong customers can end your company.*

---

## 1. Your ideal customer profiles, ranked

### 🥇 ICP #1 — The cold email agency (2–20 people)
| | |
|---|---|
| **Who** | Lead-gen or outbound agencies running campaigns for multiple clients |
| **Volume** | 50k–500k verifications/month, continuous |
| **Pain** | A bad list burns a *client's* domain — reputational catastrophe, not just wasted spend |
| **Why you win** | Consensus accuracy + the bounce guarantee directly de-risk their client relationships. They'll pay a premium for that. |
| **Plan** | Agency $199, later white-label |
| **Where** | r/coldemail, agency Slack/Discord, LinkedIn, Facebook groups |
| **Value** | ★★★★★ — high volume, high retention, refer each other constantly |
| **Watch out** | Price-sensitive negotiators; will churn if a cheaper option proves equally accurate |

### 🥇 ICP #2 — The SaaS product validating signups (API)
| | |
|---|---|
| **Who** | Any SaaS/app with a signup form, blocking disposables and typos at registration |
| **Volume** | 5k–50k/month, steady |
| **Pain** | Fake signups, free-tier abuse, undeliverable transactional email |
| **Why you win** | Clean API, good docs, generous free tier, fair pricing |
| **Plan** | Lite $19 / Standard $49 |
| **Where** | Dev communities, Zapier/integration directories, API docs SEO |
| **Value** | ★★★★★ — **the lowest-churn customer you can get.** Once embedded, they stay for years. |
| **Watch out** | Long evaluation, needs excellent documentation and uptime |

### 🥈 ICP #3 — The solo founder / SDR doing outbound
| | |
|---|---|
| **Volume** | 5k–30k/month, bursty |
| **Pain** | Limited budget, needs the list clean before a launch push |
| **Plan** | Free → $9–29 packs → Lite $19 |
| **Value** | ★★★★☆ — huge in number, low ticket, but vocal and great word-of-mouth |

### 🥈 ICP #4 — The ecommerce / newsletter email marketer
| | |
|---|---|
| **Volume** | 20k–200k, quarterly |
| **Pain** | ESP bills based on list size; deliverability decay; Gmail/Yahoo compliance |
| **Plan** | Credit packs, or Standard with auto re-verification |
| **Value** | ★★★★☆ — low support burden, clean use case, good margins |

### 🥉 ICP #5 — The recruiter / real estate / local services outreacher
| | |
|---|---|
| **Volume** | 2k–20k/month |
| **Value** | ★★★☆☆ — less sophisticated, needs more hand-holding, but loyal once won |

### 🥉 ICP #6 — Other agencies (SEO, marketing, web design) reselling to clients
| | |
|---|---|
| **Value** | ★★★★☆ — white-label revenue with them doing the support. **You're one of these.** You already understand this buyer better than most founders would. |

---

## 2. Who to actively avoid

This is the section that protects your business.

### 🚫 Hard refuse — will damage or destroy you

| Segment | Why refuse |
|---|---|
| **Spammers / purchased-list senders** | They'll hammer your infrastructure, get your supplier API keys flagged, and expose you to abuse complaints and blacklisting. **The single biggest existential risk to this business.** |
| **Scam / phishing operations** | Verification is a core step in phishing prep. Legal liability, payment processor termination, criminal exposure. Refund and ban immediately. |
| **Scraped-database resellers** | Enormous GDPR liability. You'd be processing personal data with no lawful basis anywhere in the chain. |
| **"Unlimited for $10" hunters** | They demand infinite volume at negative margin, then leave a bad review anyway. |
| **Anyone asking you to bypass a competitor's rate limits** | You'd become their abuse infrastructure. |

**How to enforce this practically:**
- A clear **Acceptable Use Policy** stating you prohibit unsolicited bulk email to purchased lists and any illegal use (file 10).
- Volume-spike alerts: a new account uploading 500k addresses in hour one is a red flag.
- Manual review for any first upload above 100,000 addresses.
- Monitor your invalid-rate per account. **A list that's 60%+ invalid is almost always scraped or purchased.** That's your single best abuse signal, and it costs nothing to compute.
- Never be afraid to refund and ban. Losing $199 beats losing your supplier accounts.

### ⚠️ Handle with caution

| Segment | Concern | Mitigation |
|---|---|---|
| **Very high volume, very low price buyers** | Negative margin (see file 07) | Custom quotes only above 500k/mo. Never publish a rate below cost. |
| **Enterprise procurement** | Wants SOC 2, DPAs, SLAs, security questionnaires | Politely decline until year 3. Each one is weeks of unpaid work. |
| **EU/UK data-heavy customers** | GDPR obligations land on you | Have a DPA ready, host in EU, document retention. Then they're fine — and profitable. |
| **Customers demanding 99% guaranteed accuracy** | You'll never satisfy them | Set expectations *before* they pay. Your honesty positioning does this automatically. |
| **Free-tier power abusers** | Multi-accounting to farm free credits | Fingerprinting, disposable blocking, one account per payment method |

---

## 3. Segment economics side by side

| Segment | ARPU/mo | Churn | Support load | Abuse risk | Est. LTV | **Priority** |
|---|---|---|---|---|---|---|
| Cold email agency | $150 | 5% | Medium | Medium | ~$3,000 | **1** |
| SaaS API user | $35 | 2% | Low | Very low | ~$1,750 | **2** |
| Solo founder / SDR | $22 | 9% | Medium | Low | ~$245 | **3** |
| Ecommerce marketer | $45 | 6% | Low | Very low | ~$750 | **4** |
| White-label reseller | $250 | 4% | Low | Medium | ~$6,250 | **5** (small count) |
| Recruiter / local services | $25 | 10% | High | Low | ~$250 | 6 |
| Data reseller | $400 | 15% | High | **Very high** | ~$2,600 | **Avoid** |
| Enterprise | $1,000+ | 2% | Very high | Low | High | Not yet |

**Focus order for year 1: agencies, then SaaS API users, then solo founders.** Everything else is opportunistic.

---

## 4. Geographic targeting

| Market | Priority | Notes |
|---|---|---|
| **US** | ★★★★★ | Highest ARPU. Write all content for this buyer. |
| **UK / Canada / Australia / NZ** | ★★★★☆ | Same behaviour, less SERP competition. |
| **Western Europe** | ★★★☆☆ | Good money, real GDPR obligations. Worth serving properly, not casually. |
| **India / Pakistan / Bangladesh / Philippines** | ★★★★☆ | Massive agency/freelancer population doing outbound *for* Western clients. Price-sensitive but huge volume and extremely reachable. Your natural first community. |
| **SE Asia / LATAM / MENA** | ★★★☆☆ | Growing. Payment friction (your MoR handles most of it). |
| **Russia / sanctioned jurisdictions** | ❌ | Payment and legal complications. Your MoR will block these anyway. |

**Practical approach:** price in USD for the US buyer, but keep a $9 entry point that a freelancer in Lahore or Manila can afford. That segment gives you your first 100 users, your first testimonials, and your first resellers — and they talk to each other far more than US buyers do.

---

## 5. Customer selection principles

1. **Optimise for retention, not revenue.** A $19/mo API user who stays three years beats a $400/mo data reseller who leaves in four months and burns a supplier account on the way out.
2. **The best customer is one whose reputation is on the line.** Agencies and SaaS products care about accuracy because *their* customers see the consequences. They'll pay for the guarantee. Individuals mostly want cheap.
3. **Say no early and clearly.** A polite refusal costs one email. A bad customer costs months.
4. **Your invalid-rate metric is your ethics filter.** Legitimate lists run 5–25% invalid. Scraped/purchased lists run 50–80%. Watch that number per account and act on it.
5. **You are a deliverability company. Act like one.** If you serve spammers, you're helping make email worse for everyone — including for the customers you actually want. This isn't only ethics; it's positioning. "We don't work with spammers" is a *selling point* to agencies whose clients' domains are on the line.

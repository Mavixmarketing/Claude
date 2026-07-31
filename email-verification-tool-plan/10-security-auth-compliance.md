# 10 — Authentication, Security, Abuse & Legal

*You asked about "the perfect flow for authentication and key security". This file covers that, plus the abuse and legal work that will otherwise bite you.*

---

## 1. User authentication flow

**Do not build your own authentication.** Use Supabase Auth (or Clerk / Auth0). Hand-rolled auth is the most common and most damaging beginner mistake.

### Recommended signup flow

```
1. Email + password  OR  "Sign in with Google"
        ↓
2. Block disposable domains at signup       ← you already have the list
   Block role addresses (info@, admin@)     ← reduces fake signups
        ↓
3. Send verification email (must be clicked before any credits are granted)
        ↓
4. Optional: device fingerprint + IP recorded  ← free-tier abuse prevention
        ↓
5. Account created with free-tier daily allowance
        ↓
6. Onboarding: "verify your first 10 emails" (time-to-value under 60 seconds)
```

**Rules:**
- **Verify the email before granting free credits.** Obvious, but it stops the majority of casual abuse.
- **Offer Google OAuth.** It converts better and it's harder to mass-create.
- **Do not require a credit card for the free tier.** Card-gating kills the acquisition advantage the free tier exists for. Use daily caps and abuse detection instead.
- **Add 2FA as an option** (not mandatory) for paid accounts.
- **Rate-limit login attempts** and use a password reset flow with expiring, single-use tokens.
- **Sessions:** short-lived access tokens with refresh tokens. Supabase does this correctly by default — don't override it.

---

## 2. API key security (this is where you'll be attacked)

Your customers get API keys. Get this wrong and someone drains their credits or reads their data.

| Rule | How |
|---|---|
| **Never store keys in plain text** | Store a hash (SHA-256). Show the full key **once** at creation, never again. |
| **Prefix your keys** | `evk_live_xxxx` / `evk_test_xxxx`. Makes them recognisable in leaked-secret scanners — GitHub can then notify you automatically. |
| **Let users create multiple keys** | Per-environment, per-integration, individually revocable. |
| **Instant revocation** | One click, effective immediately. |
| **Show last-used timestamp and IP** | Lets customers spot compromise themselves. |
| **Rate-limit per key**, not just per account | Contains the blast radius of a leak. |
| **Optional IP allowlisting** | Cheap to add, loved by security-conscious customers. |
| **Log every API call** with key ID, timestamp, IP, endpoint | Essential for disputes and abuse investigation. |
| **Never accept the key in a URL query string** | Use the `Authorization` header. URLs end up in logs, referrers, and browser history. |

**The #1 mistake AI-generated code makes:** putting secrets in frontend code or in a public repository. Your supplier API keys, your database service key, and your payment webhook secrets must exist **only** in server-side environment variables. If a key is in anything the browser downloads, it is public.

**Concretely:**
- Never call a third-party verification API directly from the browser. Always route through your own server.
- Add a `.gitignore` for `.env` files **before** your first commit.
- Rotate every key immediately if one is ever committed.

---

## 3. Data security — you're handling customer lead databases

This is the trust-critical part of the business.

| Practice | Detail |
|---|---|
| **Encrypt in transit** | HTTPS everywhere (free via Cloudflare/Vercel). No exceptions. |
| **Encrypt at rest** | Supabase does this by default. Confirm it. |
| **Delete uploaded lists on a schedule** | **Auto-delete after 30 days by default; let users delete instantly.** Publish this prominently — it's a strong trust signal *and* it reduces your breach exposure. |
| **Don't store what you don't need** | You need the address and the result. You don't need names, phone numbers, or the rest of their CRM columns. Strip extra columns on ingest, or return them without storing. |
| **Row-level security** | Supabase RLS so a user can only ever read their own rows. **Test this deliberately** — misconfigured RLS is the most common Supabase breach. |
| **Backups** | Automated daily, tested restore. An untested backup isn't a backup. |
| **Least privilege** | Separate database roles for reading and writing. Never use the service-role key in anything user-facing. |
| **Audit log** | Who accessed what, when. |
| **Have an incident plan** | Write one page now: who you notify, how fast, what you say. GDPR requires notification within 72 hours of becoming aware of a breach. |

**Before your first paying customer: pay a freelance developer $300–800 for a security review.** Given that a majority of AI-generated applications ship with at least one critical vulnerability, this is the highest-ROI money in the entire plan.

---

## 4. Abuse prevention

You are building infrastructure that spammers want. Plan for it.

### Free-tier abuse
| Control | Priority |
|---|---|
| Server-enforced daily cap (never trust the UI) | **Critical** |
| Disposable email blocking at signup | **Critical** |
| Email verification before credits | **Critical** |
| No bulk upload on free | **Critical** |
| Device fingerprinting to detect multi-accounting | High |
| IP-based rate limiting (Cloudflare, free) | High |
| One account per payment method | High |
| Monthly free-tier spend cap with alerting | High |
| CAPTCHA on signup (Cloudflare Turnstile, free) | Medium |

Industry data suggests **10–30% of free signups on developer-tool products involve some form of abuse.** Assume you're in that range.

### Platform abuse (spammer customers)
| Signal | Action |
|---|---|
| Invalid rate above 50% on a list | Flag for manual review — strongest indicator of a purchased/scraped list |
| New account uploading 500k+ addresses in hour one | Hold the job, require verification |
| Repeated uploads of the same list from different accounts | Investigate multi-accounting |
| Payment from a high-risk source / chargeback history | Manual approval |
| Customer explicitly mentions purchased lists in support | Refund and terminate |

**Write and publish an Acceptable Use Policy.** It's what lets you terminate an account cleanly and what protects you if a supplier or payment processor asks questions.

---

## 5. Legal & compliance

### Documents you need before launch
| Document | Effort | Notes |
|---|---|---|
| **Terms of Service** | Template + edit | Include fair-use limits, refund policy, termination rights |
| **Privacy Policy** | Template + edit | Must describe processing of *uploaded third-party data*, not just your users' data |
| **Data Processing Agreement (DPA)** | Template | Required by EU/UK business customers. Have it ready as a PDF — being asked and not having one loses deals. |
| **Acceptable Use Policy** | Write yourself | Your abuse-enforcement tool |
| **Sub-processor list** | Write yourself | Public page listing your verification suppliers, hosting, and payment provider. GDPR requires disclosure; it's also a trust signal. |
| **Cookie notice** | Template | Only if you use non-essential cookies — you can avoid this entirely with privacy-friendly analytics |

Templates from Termly / GetTerms / Iubenda cost $0–200. A lawyer review costs $300–800. **Start with templates; get a review once you're past ~$1,000 MRR.**

### GDPR — what actually applies to you

When a customer uploads a list, **they are the data controller and you are the data processor.** That's a real legal role with concrete obligations:

| Obligation | What you must do |
|---|---|
| **Lawful basis** | Your customer needs one for their list. Your ToS should require them to warrant that they have it — this shifts the primary liability where it belongs. |
| **Data minimisation** | Only process what's needed. Strip unnecessary columns. |
| **Storage limitation** | Auto-delete after 30 days. Document it. |
| **Data subject rights** | Be able to find and delete a specific address on request within 30 days. Build a simple internal admin search for this. |
| **Security (TOMs)** | Technical and organisational measures — everything in §3 above. |
| **Sub-processors** | Disclose them. Notify customers of changes. |
| **Breach notification** | Within 72 hours of awareness. |
| **International transfers** | If EU data goes to US suppliers, you need Standard Contractual Clauses. Offering **EU-region processing** (Hetzner is in Germany/Finland) sidesteps much of this and is a genuine selling point. |

### Other regimes
- **CAN-SPAM (US), CASL (Canada), PECR (UK)** — these bind your *customers'* sending, not your verification. But your ToS should require compliance, and your content should educate on it (good SEO, too).
- **CCPA/CPRA (California)** — similar processor obligations to GDPR.

### Business structure
- You likely cannot use Stripe directly from Pakistan. A **merchant of record** (Paddle / Lemon Squeezy / Polar) solves payments, global VAT/sales tax, and invoicing in one step, at roughly 5% + $0.50 per transaction.
- **You do not need a US LLC to start.** An MoR pays out to methods you can receive. Revisit incorporation only when revenue justifies the cost and complexity — and take local tax advice then.
- Keep clean records from month one: revenue, supplier costs, expenses. Retrofitting bookkeeping is miserable.

---

## 6. Uptime & reliability

You're selling infrastructure. Downtime is a churn event.

| Practice | Notes |
|---|---|
| Uptime monitoring (UptimeRobot, free) | Alerts to your phone |
| Error tracking (Sentry, free tier) | Catch failures before customers report them |
| **Public status page** (Instatus free tier) | Transparency during incidents buys enormous goodwill |
| **Graceful supplier failover** | If provider A is down, route to B automatically. **This is a hidden benefit of the aggregator model** — you're more resilient than single-engine competitors. Say so in your marketing. |
| Queue durability | A bulk job must survive a server restart. Never process large jobs in a web request. |
| Idempotent API | Retries must not double-charge credits |
| Never lose a customer's credits to your own bug | If a job fails on your side, refund automatically and tell them before they notice |

---

## 7. Pre-launch security checklist

- [ ] No secrets in frontend code or in git history
- [ ] `.env` in `.gitignore` from the first commit
- [ ] All third-party API calls server-side only
- [ ] Supabase RLS enabled and deliberately tested
- [ ] API keys hashed, prefixed, revocable
- [ ] Rate limiting on every public endpoint
- [ ] HTTPS enforced; security headers set
- [ ] Password reset tokens expire and are single-use
- [ ] File upload size and type limits enforced
- [ ] SQL injection impossible (parameterised queries / ORM only)
- [ ] Auto-deletion of uploaded lists implemented and verified
- [ ] Backups running and a restore actually tested
- [ ] Freelance security review completed
- [ ] ToS, Privacy Policy, DPA, AUP, sub-processor list published
- [ ] Incident response plan written (one page is enough)

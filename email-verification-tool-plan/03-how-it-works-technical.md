# 03 — How Email Verification Actually Works (and why accuracy is bad everywhere)

*Written for a non-technical reader. You need to understand this section, because it explains why the "obvious" version of your product cannot work, and it tells you exactly which parts of the problem are worth your money.*

---

## 1. The verification pipeline, step by step

Every verifier — yours included — runs an address through the same funnel. Each step is cheaper and more reliable than the next.

### Step 1 — Syntax check (free, instant, 100% reliable)
Is `john@@example` even a legal email address? Pure text-pattern checking against the RFC standard. Costs nothing, catches typos and garbage.
**Catches roughly 2–5% of a dirty list.**

### Step 2 — Domain / DNS check (free, ~50ms, ~99% reliable)
Does `example.com` exist, and does it have **MX records** (the DNS entries that say "here's where mail for this domain goes")? No MX record = the domain cannot receive mail = definitively invalid.
**Catches another 3–8%.** Also identifies parked domains and dead companies.

### Step 3 — List-based checks (free, instant, very reliable)
Compare against public/maintained lists:
- **Disposable domains** (`mailinator.com`, `10minutemail.com`, etc.) — open-source lists exist and are free.
- **Role accounts** (`info@`, `sales@`, `support@`, `admin@`) — a simple prefix list. Not invalid, but high complaint risk for cold email.
- **Free providers** (gmail.com, yahoo.com) — flag for B2B filtering.
- **Known spam traps** — this is the one list you *cannot* get for free; it requires proprietary data.

### Step 4 — SMTP mailbox check (the expensive, unreliable, essential one)
This is where the real work happens, and where everything goes wrong.

The verifier opens a connection to the recipient's mail server and *pretends to be starting to send an email*, then stops before actually sending:

```
→ connect to mx.example.com on port 25
→ EHLO verifier.yourdomain.com        "hello, I'm a mail server"
→ MAIL FROM: <check@yourdomain.com>   "I have mail from this address"
→ RCPT TO: <john@example.com>         "...for this recipient. Do you accept?"
← 250 OK                              server says the mailbox exists  → VALID
← 550 No such user                    server says it doesn't          → INVALID
→ QUIT                                hang up without ever sending
```

The `RCPT TO` response is the whole ball game. `250` = valid, `550` = invalid.

**Nothing is ever sent.** The recipient never sees anything. This is why verification is non-intrusive — but it's also why mail servers have learned to defend against it.

### Step 5 — Catch-all detection
A **catch-all** domain accepts mail to *every* address, existing or not. `RCPT TO` returns `250 OK` for `john@company.com` and equally for `asdkjh8f7q3@company.com`.

Verifiers detect this by sending a **second probe to a deliberately random, obviously-fake address**. If the server accepts that too, the domain is catch-all and the original `250 OK` means nothing.

Catch-all detection is a *workaround invented by verifier companies*. It is not part of the SMTP protocol. And critically — it tells you the answer is unknowable, not what the answer is.

---

## 2. Why accuracy collapses — the four walls

This is the section that should change your plan.

### Wall 1 — Catch-all domains (the biggest one)
Between **20% and 40%** of business domains are catch-all, and the proportion is rising because Microsoft 365 and Google Workspace configurations often behave this way. For every one of those addresses, SMTP verification **physically cannot tell you** whether the mailbox exists.

Every tool then makes a business decision:
- Mark it **"catch-all"/"accept-all"** (honest, but the customer complains you didn't answer),
- Mark it **"valid"** (dishonest, but the accuracy stat looks great — **this is what happened to you**),
- Mark it **"unknown"** (honest, but then exclude it from the accuracy calculation — misleading math).

Your complaint that "invalid emails end up in the verified pile" is almost certainly this. Cheap tools resolve catch-alls as valid because it makes their numbers look better and customers don't find out until they send.

### Wall 2 — The big providers stopped answering honestly
- **Gmail** heavily rate-limits and blocks verification probes, and since November 2025 rejects non-compliant senders at the SMTP level.
- **Microsoft 365 / Outlook** commonly returns "accept" for everything at the RCPT stage, deferring real rejection until later.
- **Yahoo** requires SPF, DKIM, PTR records and TLS from anyone connecting.

Since M365 and Google Workspace host the large majority of B2B email, **the majority of B2B addresses now sit behind servers that won't give a straight answer.** No amount of engineering fixes this. It is a structural limit of the whole industry.

### Wall 3 — Greylisting
Many servers temporarily reject the first connection from an unknown sender with a `450` response, expecting a real mail server to retry later. A verifier that doesn't retry marks the address "unknown" — even though **greylisted addresses are statistically much more likely to be valid** than other unknowns.

Retrying properly costs time and connections. Cheap/fast tools skip it. **Smart retry logic is a genuine, achievable accuracy advantage** and one of the few places where you can beat incumbents with software rather than money.

### Wall 4 — Anti-probe defences and IP reputation
Mail servers recognise the pattern `connect → EHLO → MAIL FROM → RCPT TO → QUIT` as a verification probe and will block your IP, throttle you, or start returning fake `250 OK` for everything.

Which means: **your verification accuracy depends on the reputation of the IP addresses you probe from.** Established verifiers run large rotating pools of warmed, well-reputed IPs with correct rDNS/PTR records. That is their real moat — not their algorithm.

---

## 3. Why you cannot build your own SMTP infrastructure on day one

To run your own verification nodes you need:

| Requirement | Reality |
|---|---|
| **Outbound port 25 access** | AWS, Google Cloud, Azure, DigitalOcean, and Oracle Cloud all block or throttle it by default. Google Cloud blocks it permanently with no exception path. AWS requires a support request. **Hetzner has it open by default** — but requires ~1 month of account history before fully unblocking, and is aggressive about suspending new accounts created from VPNs or with mismatched billing addresses. |
| **Multiple clean IPs with correct rDNS/PTR** | Each needs a proper reverse-DNS record and a warm-up period. IP reputation takes days-to-weeks to build and one incident to destroy. |
| **IP rotation + per-domain throttling** | Required so you're not detected as a prober. Keep 20–30% spare IP capacity. |
| **Connection pooling and parallel probing** | A single SMTP probe takes 200–2000ms. To do 10k addresses in 5–15 minutes you need many parallel connections managed carefully. |
| **Per-provider heuristics** | Gmail behaves differently from M365, which behaves differently from Zoho, cPanel, Proofpoint, Mimecast… Each needs custom handling. This is years of accumulated knowledge. |
| **Retry / greylist queues** | Stateful job infrastructure. |

**Realistic throughput expectations for a mature setup:** 10k addresses in 5–15 minutes; 100k in 1–3 hours; 1M in 8–24 hours.

**Conclusion: do not do this in month 1.** Rent it. Details in file 04.

---

## 4. What you CAN do better than incumbents (your real technical edge)

You can't beat them on IP infrastructure. You can beat them on *logic*, which costs nothing but thought:

### Edge 1 — Multi-engine consensus (your headline feature)
For any address that isn't trivially decidable, query 2–3 independent providers and combine:

| Engine A | Engine B | Engine C | Your verdict | Confidence |
|---|---|---|---|---|
| valid | valid | valid | **Valid** | 95–99 |
| valid | valid | catch-all | **Valid** | 80 |
| valid | catch-all | unknown | **Risky** | 50 |
| invalid | invalid | — | **Invalid** | 98 |
| valid | invalid | valid | **Risky — do not send** | 40 |

Because different tools use different retry logic, IPs, timeouts, and classification rules, **their errors are partly independent** — which is exactly the condition under which combining them beats any single one. This is the same statistical principle behind ensemble models, and it's the reason experienced cold emailers already do this manually with three subscriptions.

**Only run consensus on ambiguous addresses.** Roughly 60–70% of a typical list is decided for free by steps 1–3 or by an unambiguous single SMTP answer. You only pay double/triple on the remaining 30–40%. This keeps your cost per email competitive while your accuracy is meaningfully higher.

### Edge 2 — Honest four-way output plus a confidence score
Never collapse to a binary. Return:
`valid` · `invalid` · `catch-all` · `unknown` — plus a **0–100 confidence score**, the **reason** (`MX found, SMTP 250, non-catch-all, not disposable, not role`), and a **recommended action** (`Safe to send` / `Send with caution` / `Exclude`).

### Edge 3 — Proper greylist retry
Queue `450` responses and retry after 5, 15, and 60 minutes before declaring unknown. Most cheap tools don't. This converts a chunk of "unknown" into confident answers and it is pure software.

### Edge 4 — A learning database
Log every result. When a customer reports a bounce on an address you called valid, record it. Over time you build a proprietary dataset of known-good and known-bad addresses and domains — the only asset in this business that compounds and that competitors cannot copy. **Start logging from day one, even before you have any use for it.**

### Edge 5 — Catch-all resolution as a premium add-on
For catch-all domains, additional signals can shift confidence a long way:
- Does the address pattern match the domain's known format (`first.last@` vs `flast@`)?
- Have you seen this exact address before with a known outcome?
- Does the domain use a mail security gateway (Proofpoint/Mimecast) that behaves predictably?
- Public presence signals for the person.

Sell this as **"Deep Verify"** at a premium per address. It's slow and expensive, so charging separately is correct, and it directly targets the #1 complaint in the market.

---

## 5. Building the spam / template checker (technically the easy win)

Your second product is far simpler than verification and costs essentially nothing to run.

**How it works:**
1. User pastes an email template (subject + body).
2. You run it through **SpamAssassin** — a free, open-source, self-hostable spam filter that most mail providers' rules descend from. It returns a numeric score plus the specific rules triggered. Target: **under 3.0**. There's also a free hosted JSON API from Postmark you can use before self-hosting.
3. You layer your own checks on top: spam-trigger-word matching, link count, image-to-text ratio, HTML/plain ratio, all-caps detection, exclamation marks, attachment presence, subject-line length, personalisation-token detection, reading level.
4. You return a score, a list of problems, and specific rewrites.

**Critical honesty point that will make your tool better than the competition:** spam trigger words matter **far less than most guides claim**. Modern filters are multi-signal systems dominated by sender reputation and authentication. A warmed inbox with good reputation delivers mail containing "free" and "guaranteed" to the primary tab; a cold unwarmed inbox lands in spam with perfect copy.

So your checker must check **infrastructure first, words second**:

| Weight | Check | How |
|---|---|---|
| **Highest** | SPF, DKIM, DMARC records present and aligned | Free DNS lookup |
| **Highest** | Domain/IP on any blacklist | Free DNSBL lookups |
| **High** | Sending domain age, PTR record, TLS support | Free DNS/WHOIS |
| **High** | Link count, link/text ratio, shortened links, image-only emails | Text parsing |
| **Medium** | SpamAssassin score | Self-hosted, free |
| **Medium** | Structural risks: ALL CAPS, `!!!`, 3+ links, image-heavy HTML, first-email attachments | Text parsing |
| **Low–Medium** | Spam trigger words | Word list |

Publishing that weighting *itself* is a content asset — every competitor's spam checker tells you to remove the word "free" and ignores the fact that the user's DMARC record is missing.

---

## 6. Technical glossary (keep this handy)

| Term | Plain-English meaning |
|---|---|
| **MX record** | DNS entry saying which server handles a domain's mail. No MX = can't receive mail. |
| **SMTP** | The protocol mail servers use to talk to each other. Port 25. |
| **RCPT TO** | The SMTP command that asks "do you accept mail for this person?" The core of verification. |
| **Catch-all / accept-all** | A domain that accepts mail to any address. Makes verification impossible. |
| **Greylisting** | Temporary rejection (450) of first contact, expecting a retry. Causes false "unknown". |
| **Spam trap** | An address planted by ISPs to catch spammers. Often a real address abandoned 180+ days. Hitting one badly damages your reputation. |
| **Role account** | `info@`, `sales@`, `admin@`. Real, but high complaint risk. |
| **Disposable email** | Temporary throwaway address. |
| **SPF / DKIM / DMARC** | The three DNS-based authentication standards. Required by Gmail/Yahoo/Microsoft since 2024–2025. |
| **PTR / rDNS** | Reverse DNS — proves an IP legitimately belongs to a hostname. Required by Yahoo. |
| **Bounce (hard/soft)** | Hard = permanently undeliverable. Soft = temporary. |
| **Sender reputation** | The score mail providers assign your domain/IP. The single biggest factor in inbox placement. |
| **Inbox placement** | Whether mail lands in Primary, Promotions, or Spam. Different from "delivered". |
| **Warm-up** | Gradually increasing send volume on a new domain/IP to build reputation. |

# 07 — Automation Roadmap: Build This, Delete That

You're a builder. That's an advantage — but only if you point it at the right things. Right now you're building a factory before you've proven the product sells.

**The governing rule: automate a process only after it works manually.** Automation multiplies. If the process converts at zero, you're multiplying zero — and you'll have spent three weeks doing it.

---

## Honest assessment of what you're currently building

| What you're building | Verdict | Why |
|---|---|---|
| **Google Maps / SERP scraper → site crawl → email extract → verify → send** | ✅ **KEEP — this is the good one** | Correct buyer, observable data, high-quality personalisation, and you own the asset instead of renting a list. It's the best thing on your build list |
| **Instagram lead gen via API** | ❌ **STOP** | Costs real money, lowest-intent B2B channel you have. Revisit at $6k/mo, and only if your niche is visual/consumer-facing |
| **LinkedIn connect → message → follow-up** | 🔧 **RECONFIGURE, don't rebuild** | The tool is fine. The *sequence* is broken. Fix per [`04-channels.md`](04-channels.md#5-linkedin--fix-it-dont-abandon-it) |
| **"Client closing automations"** | ❌ **DELETE THE CONCEPT** | Closing is a human conversation. There is nothing here to automate. What you actually need is the script in [`05-sales-playbook.md`](05-sales-playbook.md) |
| **Auto-reply to email replies** | ❌ **DO NOT BUILD** | See below — this one would actively cost you money |
| **Onboarding automations** | ⏸️ **LATER (month 2)** | Right idea, wrong time. Build it at 6+ clients. Below 6, a checklist works better |

---

## Why auto-replying to email replies is the one to definitely not build

A positive reply is roughly **1 in 100–200 emails sent.** It is the rarest and most valuable thing your entire funnel produces.

Automating your response to it means optimising the exact step where being a real human has the highest marginal value — and where a generic-sounding reply loses a deal you spent a month and real money to generate.

**Automate the sending. Never automate the conversation.**

What you *should* build instead: a **notification** — Slack/Telegram/phone alert the second a positive reply lands, so you can respond by hand within 5 minutes. Speed-to-lead is the single biggest close-rate variable in this industry. That's a 30-minute build and it's worth more than everything on your current roadmap.

---

## The build order

### Phase 1 — Week 1 (build only these three)

**These take under a day combined and each one directly makes you money.**

1. **Positive-reply alert.** Sequencer webhook → Telegram/Slack/SMS. You reply by hand, fast.
2. **Booking link everywhere.** Cal.com (free). Email signature, LinkedIn, proposals, website. Remove every step between "interested" and "booked."
3. **A pipeline sheet.** Google Sheets. Columns: Company, Contact, Source, Status, Last Touch, Next Action, Next Action Date, Value. **Do not build a CRM.** At 2 clients and 30 prospects, a spreadsheet genuinely outperforms software and takes 20 minutes to set up.

**Stop building anything else until you have closed a client with these three.**

### Phase 2 — Week 2–3 (only after Phase 1 produces a client)

4. **Finish the Google Maps pipeline** — with these additions:
   - **Email verification before send** (mandatory — bounces above 2% will destroy the domains you spent 6 weeks warming)
   - Capture the enrichment fields that make emails convert: GBP rating, review count, ranking position, owner name, whether they run ads
   - **Deduplication** across runs — emailing the same prospect twice from two domains is a fast way to generate complaints
   - A suppression list — anyone who replies, unsubscribes, or bounces never gets contacted again
5. **Sequencer integration** — scraper output → verified → straight into your sending tool, one niche per campaign.
6. **Weekly Loom reminder** — a recurring calendar block per client. Not sophisticated. Just unmissable.

### Phase 3 — Month 2 (only above ~$5,000/mo)

7. **Onboarding automation** — signed agreement triggers: welcome email, access request form, kickoff booking link, internal task list, client folder created.
8. **Reporting automation** — Looker Studio dashboards pulling GA4 + Search Console + GBP, auto-refreshed. Saves hours a month once you have 8+ clients. **Note: automate the report, not the report *call*.** The call is the retention mechanism, not the PDF.
9. **Personalisation at scale** — LLM-generated first lines from your scraped enrichment data. Only after your manually-written emails have proven they convert.

### Phase 4 — Month 3+ ($10k/mo and above)

10. Multi-channel orchestration (email + LinkedIn + calls against one prospect list)
11. Lead scoring
12. Churn-risk alerting (client hasn't replied in 21 days → flag)

---

## The n8n note

You have n8n available in this environment, which is a good fit for all of the above — the reply alert, the scraper pipeline, the onboarding trigger sequence, and the reporting refresh are all straightforward n8n workflows.

**But build them in the order above, not all at once.** Phase 1 is genuinely a few hours of work. When you're ready to build any of these, ask me and I can construct the workflows directly.

---

## The time budget that actually matters

Here's the discipline. At $1,000/mo, your week should look like:

| Activity | Hours/week | Why |
|---|---|---|
| **Selling** — outreach, calls, follow-up | **25** | This is the job |
| **Client delivery + communication** | 10 | Protects the revenue you have |
| **Building automation** | **5 max** | Supporting act, not the main one |

If you're building more than 5 hours a week right now, you're not running an agency — you're doing a software project that happens to have clients attached.

**The uncomfortable question, and I'd ask you to actually answer it:** is building automations more comfortable than making sales calls? For most technical founders it is, and the building feels like progress because it produces visible output. But you can't invoice a workflow. You said yourself that the meeting part is what you find difficult — and the roadmap you described happens to avoid it entirely.

Fix the script. Make the calls. Then automate what's proven to work.

---

**Next:** [`08-30-60-90.md`](08-30-60-90.md) — the day-by-day plan.

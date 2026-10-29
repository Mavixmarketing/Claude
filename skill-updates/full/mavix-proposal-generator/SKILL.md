---
name: mavix-proposal-generator
description: "Generate a polished, branded, downloadable strategy proposal, audit, or strategy doc for Mavix Marketing prospects (SEO, Google/Meta Ads, or both). Trigger whenever Farhan provides prospect info (conversation, business details, pain points, goals) and asks to create/write/draft/generate a proposal/strategy/audit, \"make a proposal for this client\", or pastes prospect notes and asks what to send. Auto-detects service(s), builds the branded document with one-page sections, ALWAYS includes 2–3 real case studies from mavixmarketing.com/case-studies in different industries (real ad screenshots for Ads, real GSC screenshots for SEO), uses ads-specific sections + 4-phase ads pricing for ad-only proposals, makes SEO and Both documents a free audit and strategy with NO prices (a seven-area 'what we will work on' page instead), ends every document on a one-page close with a reply-yes option and a 15-minute walkthrough link, and writes all copy with the baked-in humanizer ban-list."
---



# Mavix Marketing — Proposal Generator Skill

Generates a visually rich, branded, persuasive, downloadable strategy proposal for Mavix Marketing.


## Step 0: Load the writing rules, then install dependencies

**Before writing sections 00, 06b, 07, 07b, 07c or 08, read `reference/TRUST_SECTIONS.md`.**
It is the authority on the five trust sections and on the rule that outranks the rest of them:
never write something Mavix cannot do.

**Before writing any copy, apply the humanizing rules in Step 4b — the full ban-list is
baked into this skill and is self-contained.** Apply them while the sentences are being
formed, not as a cleanup pass. If a `text-humanizer` skill is installed, load it too; this
skill no longer depends on it.

```bash
npm list -g docx || npm install -g docx
```


## Step 1: Parse Prospect Input

Extract from whatever the user provides (conversation, notes, or mix). Make smart assumptions — only ask if **name** or **industry** is completely absent.

| Field | Extract or Assume |
|-------|------------------|
| Prospect name / company | Required |
| Industry | Required |
| Country / market | Assume USA if not stated |
| Pain points | Extract or infer from industry |
| Goals (6–12 month) | Extract or infer |
| Current marketing | Assume "early stage / no current digital marketing" if unclear |
| Services needed | **Auto-detect** (see Step 2) |
| Monthly ad budget | Extract or use recommended minimums |
| Competitors | Extract; if none, name 2–3 typical competitors for the industry |


## Step 2: Auto-Detect Services

- **SEO only** → mentions organic rankings, Google visibility, long-term growth, content
- **Ads only** → mentions leads fast, paid campaigns, Google/Meta Ads, immediate ROI
- **Both** → mentions both, or wants full digital presence

If ambiguous → default to **Both SEO + Ads**.


## Step 3: Visual Design System

**All proposals use this design language. No exceptions.** Brand tokens: `--ink` 0A0E27,
`--blue` 005AFF, `--lime` B4FF24, `--blue-strong` 1251CC, `--soft` EEF3FF, `--grey` 5B616C,
`--green-text` 21763C (success), `--red-text` B52524 (before/danger). Hex without `#` in docx-js.

Rules: blue + lime are the only brand colors; green/red are functional only, never decorative
fills. Lime is a highlighter, never a full section. Small text uses `--blue-strong`. Case-study
"before" numbers `--red-text`; "after" numbers `--lime` on `--blue`. Scorecard fill interpolates
blue → teal → lime, never direct blue→lime.

**Components (build all):** Section Banner (blue bar, white title, neon number); Stat Card Row
(4 KPI tiles, soft bg, blue value); Neon Callout (lime bg, green-text bold); 3-Phase Strategy
Table (blue / blue-strong / lime headers); Competitor Table (blue/blue/lime headers, "How We
Win" text green-text); Case Study Before/After (ink/blue split); Pricing Cards (highlight card
blue bg + neon price); Step Boxes (number in blue square); Cover Page (blue bar, agency name,
prepared-for, info table); running header/footer.


## Step 4: Proposal Sections

> **Section 05 (Case Study) is mandatory in every document — SEO or Ads.**

> **Layout discipline (do not break these):** every content section fits **one page** — Situation, Ranking Gap / Opportunity, Problem & Transformation, Competitor/Account Analysis, Who We Are, Testimonials, Scope, Pricing, FAQs. Cap chart images so a section never spills. **Who We Are = one page. Testimonials = 4 clients in a 2x2 grid on one page. Each case study = its own page. Pricing = one page. FAQs = fill the page with 6 industry-specific questions, never generic filler.** On the cover, the "Prepared for" block sits low (title upper, client block + footer at the bottom).

### Section 00 — What We Know About Your Business
- **First content page, before the executive summary.** Eight-row table: Business | Industry | What you
  sell | Who buys it | Where you sell | Your goal | What is in the way | The biggest opening we see.
- Quote the prospect's own words wherever they gave them, especially in the goal row.
- **Then an assumptions box, and it is not optional.** Name every figure that was estimated rather than
  supplied, say what was assumed and why, and invite the correction. Nothing invented may appear
  anywhere else in the document as if the prospect said it.
- Full guidance in `reference/TRUST_SECTIONS.md`.

### Section 01 — The Short Version (The Hook)
- A busy owner reads this on a phone and may read nothing else. One page: four stat cards, the three findings that matter, the plan in three lines, and the 90-day target with the guarantee. End with "Your plan and how to start are on the last page." No Mavix intro yet, no price here.

### No prices in SEO and Both documents (Farhan, October 2026)
- **An SEO or Both document is a free audit and strategy, not a quote.** No pricing or investment page, no price on the close page, no "from" price in the FAQs, no publisher fee range. The only money figure allowed is the guarantee's "plus $1,000". The plan and the personalised price are sent after the prospect replies "yes" or books the 15-minute walkthrough. Prices depend on the campaign the prospect came from (the call kit's `references/facts.md` holds them).
- **Ads-only proposals keep their four-phase fee page** (unchanged in this update). In a Both document, the ads fees also go with the personalised price after the yes, so the document has one rule: no prices.
- FAQs include "What does it cost?": it depends on the plan and the work the site needs; reply "yes" or book the walkthrough for the personalised price; no setup fee.

### Rules learned from the October audits (apply to every section)
- **No placeholders ship.** No "TBC", "to confirm", "client name to confirm" or "[ASK FARHAN]" in the document. Fill it or cut it.
- **Testimonials: confirmed names only, and never an unconfirmed company or role.** If Farhan has not confirmed the company, print "Business owner" (or "Business owner, [city]" if the city is confirmed). Never invent a company or job title for a real person. Mohammed Ahmed is "Mohammed Ahmed, Business owner". Four confirmed cards in a 2x2 grid is fine.
- **No page repeats another.** "Same working day", "your accounts stay yours" and "no long contract" each appear once in the document body plus once in the FAQs at most.
- **Never hand over the fix.** Say what is wrong and what it costs. No paste-ready text, DNS records or "do this yourself in 15 minutes" pages. No "quick wins" page.
- **No ranking promise outside the guarantee.** No "rank by New Year". Say what will be live by when, never where it will rank.
- **Nothing that tells the owner they mislead people** (credentials, health claims). Raise it on a call, gently.
- **Google Partner, stated plainly.** Never "Partner status means Google audits the accounts we run" or similar. Say "Google Partner" and stop.
- **Read the first sentence of every page aloud.** The October audits shipped a broken lead line ("You asked us to tell you if and what").
- **Keep it short.** The October SEO audits ran to 22 and 29 pages with the ask on the last page. No contents page, no separate reporting page, no page that repeats "same working day / your accounts stay yours" a fifth time. A long technical audit (letter grades, H1s, canonical tags, DNS records) becomes one plain-English scorecard page plus the top five problems in money terms.
- **Case study figures:** a total for a period is never called "monthly".

### Section 01b — Found on Google, Maps and AI answers (SEO and Both only)
- Mavix is not a traditional SEO agency: it gets businesses found on Google, Google Maps, Google's AI Overviews and AI Mode, and AI assistants like ChatGPT, Perplexity and Gemini.
- **Only two outside facts, each with its source printed:** Google says AI Overviews reach over 2 billion people a month (Alphabet, July 2025); a Pew Research study (July 2025) found people clicked a normal result on 8% of searches with an AI summary, against 15% without. No other AI numbers.
- **How we help, true work only:** answer-style pages for customer questions, structured data, Google Business Profile and reviews, mentions and links on trusted sites, technical fixes.
- **Never promise the client will appear in an AI answer.** Say nobody can promise it, Google included.
- **Never promise a place in an AI answer or a ranking by a date.**
- Build: lead, two stat cards with the facts, a table of where customers look against **what we found for them on the build date** (only what was actually checked; otherwise "Not checked yet, we check it in week one"), one neon line. The work itself goes on the scope page, not here.

### Section 01c — What We Will Work On (SEO and Both: the scope page)
- Farhan wants every prospect to see all the work. Seven numbered rows, each with what we do and "For you:" (what it means for their business), in plain words and their trade's language:
  1. **Your website:** speed, a clear structure, a page for each service and each area they serve, technical fixes.
  2. **Google rankings and keyword research:** the searches their customers type, how many people make them, which to win first.
  3. **Blogs and helpful content:** articles that answer the questions customers ask before they buy, written by a person, approved by them.
  4. **Links, PR and mentions:** links and mentions on trusted sites, PR placements.
  5. **Google Maps and reviews:** Google Business Profile kept full and active, an easy way to ask for reviews.
  6. **Google's AI Overviews and AI Mode:** answer-style pages and the labels Google reads (structured data), so it can understand and quote them. Nobody can promise a place.
  7. **ChatGPT, Perplexity and Gemini:** the same business details everywhere online, mentions on the sites these assistants read. Nobody can promise a place.
- Then one short note: **not included** (publisher fees paid directly at no markup, with no number; a website rebuild; photography and video; anything else quoted before it starts) and **what we need from you** (access in week one, a quick read of each page). No prices and no tier table on this page.
- The `work_areas` builder in the mavix-seo-proposal skill builds this page; reuse it.

### Section 02 — Revenue Gap & Market Opportunity
- Quantify what they are losing (searches, avg job value, capture rate, monthly gap). Stat Card Row with 4 KPIs. Add a bar chart: competitor vs. prospect estimated monthly traffic.

### Section 03 — Competitor Analysis
- Always include (name 2–3 typical competitors if none given). Competitor Table: name | weakness | how we exploit it.

**Ads proposals use ADS-SPECIFIC sections, never SEO sections copied over.** Ads section set:
00 What We Know About Your Business · 01 Situation · 02 The Opportunity (demand, not organic keywords; carries one honest paragraph on when SEO is the better buy) · 03 Problem & Transformation (no organic-traffic projection chart, use before/after columns + guarantee) · 05 Account & Competitor Analysis (**account health: tracking, structure, creative, retargeting + competitor ad presence — never backlinks or toxic-link content**) · 06 Campaign Roadmap (Warm up → Awareness/Traffic/Engagement → Convert/Sales → Scale) · 06b Scope of Work (retainer deliverables, below) · 07 KPIs · 08 Who We Are · 09 Testimonials · 10 Case Studies · 11 Investment · 12 FAQs · 13 What Usually Goes Wrong With Agencies · 14 How We Work Together · 15 Reporting · 16 Your Plan, Your Price (the close, with the 15-minute walkthrough link). No "AI visibility" section in an ads proposal.

**Ads Scope of Work (retainer) — always include, grouped:** *Account setup & tracking* (create or audit Google & Meta accounts, install Meta Pixel + GTM, connect site & catalogue, conversion tracking + Conversions API, warm up the account); *Creative, campaigns & management* (we produce the creative; build the full structure warmup → awareness/traffic/engagement → sales; launch sales only once the account is warm and has data; keep the other campaigns running underneath; monitor daily, manage bids/budgets, cut waste); *Reporting & control* (weekly report, monthly report + monthly meeting, dedicated human team with no AI-run campaigns, nothing goes live without the client's permission); **and always a *What is not included* list** (ad budget, publisher and placement fees, website rebuild, photography and video production, software the client already pays for, anything outside the groups above, which is quoted before it starts and never after) **plus a short who-does-what block**. See `reference/TRUST_SECTIONS.md`.

### Section 04 — The Growth Strategy
- Lead with a neon callout. Ads: 3-Phase Table (Build/Launch → Optimise → Scale). SEO: 3-Phase Table (Technical → Content/Authority → Rankings/Revenue). Note: 100% human-driven, CRM integration.

### Section 05 — Case Study (MANDATORY — never skip)

**Every proposal, audit, or strategy document includes a case-study section. SEO or Ads,
no exceptions.** It is not optional and not "cut if nothing fits" — proof always ships with the pitch.

**Use 2–3 case studies, each a DIFFERENT industry and scenario — never the same one twice.**
Match on buying behaviour / the objection in the room (see the pairing tables in
`case-studies/INDEX.md`), not on sector.

**Real case studies only — Farhan's directive (replaces the old invented-name rule):** the
case studies are the real ones published at **mavixmarketing.com/case-studies**.
- **Name the client exactly the way the website names it** ("Construction management firm",
  "Online home goods store", "La Vela Coffee", "My Favorite Therapists", "All Dogs Rock").
  Never invent a client name or a city.
- **Use the website's numbers and timeframe exactly** (9.94K clicks in seven months stays that).
- **Put the case study's URL on the page** (meta line) and in the CTA.
- **Never invent** a staff count, product count, baseline number, budget, date or execution
  detail that is not on the website case study or printed on the screenshot. Where a part of
  the page needs detail the website summary does not give, fetch the live case study page at
  build time and use only what it says, or write it in general terms that are true of how
  Mavix works ("we rebuilt the service pages") with no specific numbers.
- Keep **different industries, matched to the objection in the room**, never the prospect's own
  sector where an alternative exists.

The website case studies that have a matching real screenshot:

| Shot | Website name | Website result | URL |
|---|---|---|---|
| `seo3` | Construction management firm | 9.94K clicks from Google in seven months, daily clicks roughly doubled | https://mavixmarketing.com/case-studies/construction-management-seo |
| `seo2` | HR software company | 326K clicks from Google in 16 months | https://mavixmarketing.com/case-studies/hr-software-seo |
| `seo1` | Online home goods store | 470K clicks from Google in 12 months | https://mavixmarketing.com/case-studies/home-goods-retailer-seo |
| Google Ads, 2.41K conversions | Service business on Google Ads | 2.41K enquiries in one month | https://mavixmarketing.com/case-studies/lead-gen-volume |
| Meta, 2,631 leads | Local services business on Meta Ads | 2,631 leads in one campaign | https://mavixmarketing.com/case-studies/meta-lead-gen |

The other ad dashboards (6.74x and 6.45x ROAS, £16.11 cost per conversion at 188K clicks,
526 purchases at £3.84, £1.33 add-to-cart, link clicks at £0.09) have **no matching website case
study yet**. Do not build a case study around them or invent a story for them; ask Farhan to
publish one first. With only two real ads case studies, an ads proposal shows two.

**Each case study is one complete page**, all sections, in this order, at readable size
(body ~10.3pt, title ~17pt — never tiny 8pt card text):

1. **Title** — one clear result sentence, the website's result ("9.94K Clicks from Google in Seven Months").
2. **Client Overview** — the website's name for the client · the case study URL (one meta line). No invented location or business details.
3. **Starting Point (Baseline / before)** — red chips of the before metrics, **only** where the website states a starting point. If it gives none, leave the chips out; never make one up.
4. **The Challenge** — what was wrong before.
5. **Goals** — the measurable objectives agreed at the start.
6. **Strategy** — the high-level approach.
7. **Execution** — 3 numbered steps of what was done.
8. **Timeline** — how long it took.
9. **Obstacles & how we solved them.**
10. **The Results (after)** — the real screenshot, full width, the visual proof.
11. **Key Takeaways** — why it worked.
12. **CTA** — book-a-call / request-an-audit bar (dark → blue gradient, lime headline), carrying the case study URL.

**Layout (proven, fits one page):** header full width → baseline chips (red, 4 across) →
two-column narrative (LEFT: Challenge, Strategy, Execution · RIGHT: Goals, Timeline, Obstacles,
Key takeaways) → full-width Results image → CTA bar.

**Ads case studies** — use the real dashboard screenshots in `case-studies/` (01–09, documented
in `INDEX.md`), embedded exactly as provided. Identify results with the exact figures on the
tiles/axis; do not describe a trend the chart lacks. Only two of them match a website case
study today: the Google Ads screenshot with 2.41K conversions (lead-gen-volume) and the Meta
screenshot with 2,631 leads at £2.68 (meta-lead-gen). The rest (ROAS 6.74x and 6.45x, £16.11
cost per conversion, Meta purchases at £3.84, link clicks at £0.09, add-to-cart at £1.33) stay
unused as case studies until Farhan publishes a matching website case study.

**SEO case studies** — use the REAL Google Search Console screenshots in `seo_assets.json`,
embedded **exactly as provided (no cropping, recolouring, or recreation)**: `seo1` 470K clicks /
21.3M impressions / 2.2&#37; CTR / 8.8 avg position; `seo2` 326K / 9.77M / 3.3&#37; / 19.2;
`seo3` 9.94K / 406K / 2.4&#37; / 14. They already carry the red "traditional SEO" zone and the
green "With Mavix AI Optimize SEO" zone. Baseline chips carry the "before" only where the website
states one; the screenshot is the "after". **Do not use the old matplotlib-recreated dashboards.**

**Reusable builders (in the working folder, persist across sessions):**
- `mavix_ad.ad_case_study(P)` — ads cases; screenshots + manifest in `ad_assets2.json`.
- `mavix_seo.seo_case_study(P)` — SEO cases; real GSC screenshots in `seo_assets.json` (`shot="seo1|seo2|seo3"`), used as-is.
- `mavix_common` / `mavix_css.txt` hold the shared sections, cover, testimonials (4 clients, 2x2), and brand tokens. Sample builders: `sample_seo.py`, `sample_ads.py`.

Keep the Execution / "what we did" lines truthful — charts show outcomes; the actions come from
the live case study page or stay general and true of how Mavix works. If a sector is genuinely far from anything in the set, still include the
section, bridge on the shared problem, and offer a reference call.

### Section 06 — Investment (ads-only proposals; never in SEO or Both documents)
- **SEO and Both documents have no investment page and no prices** (see "No prices in SEO and Both documents" above). Skip this section for them.
- **Ads pricing (4 phases, low-to-high on purpose):** Phase 1 & 2 (Setup + Warm up) **249 USD/mo**, Phase 3 (Convert, when sales start) **349 USD/mo**, Phase 4 (Scale) **449 USD/mo**. Always explain the rationale: ads need spend before sales arrive, so the client is already funding ad budget; the fee starts low so their money goes into ad spend, and rises only once results show. The 249 simply covers our costs. Ad budget is separate and always the client's; 1,000 USD Google ad credit included.
- **SEO pricing: retired from the documents.** No SEO price cards, no SEO prices. What each SEO plan does is still used, without prices, for the close page's "every month" list. Starter: keyword and competitor research, 2 blogs a month, directory and profile listings, social bookmarking and Q&A, monthly report. Growth (usually recommended): everything in Starter + 3-4 blogs a month, 2 guest posts, 1 PR placement, Google Business Profile management, infographics. Premium: everything in Growth + 8+ blogs and guest posts, full on-page audit and fixes, technical SEO, competitor gap analysis, priority calls. **Guarantee (Growth and Premium only, worded the same everywhere):** we agree a 90-day target with the client in writing before they start; if we miss it, they get everything they paid back plus $1,000. Starter has none. **No long contract:** the agreement has no time limit and only ties Mavix, to deliver. No setup fee.
- Ads proposals end this page with the guarantee banner and the Google Partner 1,000 USD ad credit line; **SEO-only proposals do not** (it belongs to a different deal and blurs the offer), and an SEO-only cover never shows a "Google Ads" chip.
- **If the user says "no pricing" on an ads proposal:** omit this section entirely.

### Section 07 — Why Mavix
- **Banned opening, and anything resembling it:** "We are a full service digital marketing agency
  passionate about helping businesses grow." Delete on sight.
- Answer five questions instead, one short paragraph each: who we are (the company story below),
  what we do specifically, who we work with, what we fix, and why Mavix exists. Full wording
  guidance in `reference/TRUST_SECTIONS.md`.
- **The company story (use it, shorten it, never add to it):** Mavix Marketing is based in Dubai,
  with a team of 30+ people across Dubai, Los Angeles and New Delhi, all employed by Mavix, not
  subcontracted. SEO, paid ads and email, since 2019. One named account manager on every account
  for the day to day; the founder, Mohd Farhan, takes the first call and joins every monthly
  review. Reports lead with enquiries, and every number comes from the client's own accounts.
  Never write "small team", "Farhan runs your account himself" or "there is nobody behind him".
- Say once, plainly: Mavix is not a traditional SEO agency; it gets businesses found on Google, Google Maps, Google's AI Overviews and AI Mode, and AI assistants like ChatGPT (SEO and Both proposals).
- Stat Card Row with only defensible figures (30+ people | since 2019 | Google Partner | 1 named account manager). Do not claim client counts or revenue that cannot survive a reference check. Two-column: How We Work | Credentials. Emphasise a dedicated human team and no AI-generated content.

### Section 07b — What Usually Goes Wrong With Agencies
- **Ads proposals only.** In SEO proposals this page is cut (in the October audits it read as filler and repeated the same promises); its rows feed the FAQs instead.
- **Goes after pricing and FAQs, near the back.** Two-column table, ten rows, one or two lines a cell.
  Left: the failure they have lived through or heard about. Right: how this works instead.
- The ten rows are written out in `reference/TRUST_SECTIONS.md`. If the prospect described a bad
  agency experience, move that row to the top and use their words in it.
- Close with one honest line, not a boast.

### Section 07c — How We Work Together
- Three blocks on one page. **Channels:** WhatsApp day to day, Google Meet for calls, a shared Google
  Drive folder, one written report a month plus a call (reporting is a row here, not its own page). Name the person they deal with, not a role.
- **Who owns what:** every account stays in the client's name, Mavix holds access and never ownership,
  and any account created from scratch is created in their name.
- **If you decide to stop:** no long contract and no time limit, no penalty, accounts and data stay theirs,
  access removable at any time, final report and handover. Must match the signed contract exactly.
- Full wording in `reference/TRUST_SECTIONS.md`.

### Section 08 — The close (always the last page)
- **SEO and Both documents: "Your plan, and how to start." No price.** One page, four things only:
  1. **The recommended plan of work for them**: the plan name, one line on what it is for them, three to five "every month" lines of work, and the guarantee in one line. No price.
  2. **The 90-day target we would agree**, the same words used earlier in the document, and how it is checked.
  3. **The first three things we do**, specific to this prospect, one line each.
  4. **Two ways to move forward:** reply "yes" to the email and we send the plan and their personalised price, or book a 15-minute walkthrough at https://cal.id/mavixmarketing/strategy-call. Both are tappable links in the PDF.
- **Ads-only proposals: "Your plan, your price. Reply yes to start."** The recommended phase and its monthly fee, the first-90-days milestones, the first three things we do, and the same two ways to say yes.
- This replaces the old seven-step "after you say yes" page and the old "Let's Begin" block. No new information on this page, no extra plans, no fine print.
- Promise nothing Mavix cannot deliver. No welcome pack, onboarding form or 48-hour timetable unless Farhan confirms it exists.


## Step 4b: Writing Rules — the Humanizer (baked in, self-contained)

Apply to every line of copy in the document AND the chat outreach email, while writing —
not as a cleanup pass. It must read like a sharp human wrote it, not a model.

### Banned words (never use — top AI tells)
leverage, robust, pivotal, transformative, seamless(ly), elevate, unlock, harness, delve,
embark, foster, navigate (figurative), realm, landscape (figurative), tapestry, testament,
beacon, gateway, cornerstone, game-changer, cutting-edge, state-of-the-art, best-in-class,
world-class, top-notch, unparalleled, bespoke, holistic, synergy, streamline, supercharge,
empower, meticulous(ly), bustling, vibrant, dynamic, ever-evolving, fast-paced, myriad,
plethora, treasure trove, deep dive, "in today's digital age/landscape", "at the end of the day".

### Banned phrases / openers / closers
"I hope this email finds you well", "I came across your business", "I am writing to...",
"I am pleased to...", "when it comes to", "it's worth noting that", "it is important to note",
"that being said", "rest assured", "look no further", "in conclusion", "in summary",
"at Mavix, we believe", "we are thrilled/excited to", "please don't hesitate to reach out"
(say "let me know"), and sign-off labels "Best regards"/"Sincerely" (sign off just "Mohd Farhan").

### Banned sentence patterns
- "Not only… but also…"
- "It's not just X, it's Y." / "This isn't about X. It's about Y."
- "From X to Y, we…" openers
- Rule-of-three lists ("faster, smarter, more efficient")
- Every heading in the same two-part "Statement. Punchline." rhythm — vary it
- Participle wind-ups ("Leveraging our expertise, we…")

### Punctuation tells
- **Zero em dashes and en dashes in the chat email** — use full stops, commas, or "to" for ranges. The most reliable AI tell.
- Straight quotes only in the email — no curly/smart quotes.
- No semicolon-stacked clauses; not every paragraph a colon-then-list.

### What good looks like
- **Lead each section with the finding, not the process.** "All six competitors sell on the same two claims" beats "We analysed your competitors."
- **Every number carries a source or is labelled an estimate** — put the source in the chart note.
- **Match the prospect's own words** for their pain points.
- Short, varied sentence lengths. Plain verbs. Say the thing.

### Verify before presenting
Extract the email text and require zero banned words, zero em/en dashes, zero curly quotes.
Read the document by eye for rule-of-three lists, duplicated paragraphs, and process-first openers.


## Step 5: Pricing Reference

**SEO and Both documents: no prices at all.** Name the plan of work and the guarantee, never a fee. The personalised price is sent after the yes, using the campaign prices in the call kit's `references/facts.md` (they depend on the campaign the prospect came from). Publisher fees for PR and backlinks are paid by the client directly at no markup; the usual range goes with the price, not in the document.

**Ads-only proposals (4 phases, unchanged):** Phase 1 & 2 (Setup + Warm up) 249 USD/mo · Phase 3 (Convert) 349 USD/mo · Phase 4 (Scale) 449 USD/mo. Fee starts low so client budget goes to ad spend; rises only once results show. 1,000 USD Google ad credit included. Budget guide: Awareness 10–20 USD/day/platform + Lead Gen 30–50 USD/day/platform.


## Step 6: Build & Verify the Document

Build the branded document (PDF via the Mavix pipeline, or .docx if explicitly requested).
Case studies are assembled with the reusable builders in Section 05. Verify: zero em/en dashes
and curly quotes in prose; every content section on one page; the mandatory case-study section
present; the last page is the close with both links working; **an SEO or Both document has no
price anywhere** (search the PDF text for "$", "USD", "/mo", "/ month", "per month": the only
hit allowed is the guarantee's "$1,000"); the SEO scope page lists all seven work areas; no
"TBC", "to confirm" or DIY-fix text anywhere; testimonials carry only confirmed companies or
roles ("Business owner" otherwise); the AI page (SEO) uses only the two allowed facts and
promises no place in an AI answer; the Who We Are page uses the company story. For an SEO
document built with the mavix-seo-proposal builders, run its `build/check_pdf.py`; read by eye for rule-of-three lists, duplicated
paragraphs, and process-first openers.


## Step 7: Write the Outreach Email

After generating the document, always output a plain cold outreach email **in chat only** —
printed as plain text the user can copy-paste.

⚠️ **The email is NEVER added to the document.** It lives only as plain text in chat after the file.

### Email Rules
- Cold outreach to accompany the proposal; 4–6 short lines of body; friendly, human, professional.
- **Always offer a 15-minute call to walk through the document, once only**, with the link written out: "If it's easier, I can walk you through it in 15 minutes: https://cal.id/mavixmarketing/strategy-call". This is the only link in the email. No price in the email.
- No mention of proposal structure, sections, pricing, or Mavix credentials. Sign off "Mohd Farhan" (no title/company/phone, no link in the sign-off).

### Email Formula
1. Opening line specific to their business/market. 2. One pain point they feel. 3. One outcome line (not a service list). 4. Soft CTA to open the attached strategy. 5. The 15-minute walkthrough offer with the link. 6. Sign-off Mohd Farhan.

### Avoid
Everything in the Step 4b ban-list, plus: no service lists, no "Best regards"/"Sincerely",
no PS line, no links/phone in the sign-off (the walkthrough link sits in the body). Use contractions ("I've", "you're", "it's").

### Output placement
Print the email in chat immediately after presenting the file, labelled:

```
📧 OUTREACH EMAIL — copy and paste this:
Subject: ...

[body]

If it's easier, I can walk you through it in 15 minutes: https://cal.id/mavixmarketing/strategy-call

Mohd Farhan
```


## Step 8: Present the File

Call `present_files` with the output path. One-line summary only, then print the outreach email below it in chat.


## Trigger Phrases (not exhaustive)
- "make a proposal for [name/company/industry]"
- "write up a strategy doc / audit for this prospect"
- "create a proposal" + any prospect details
- Pasting a prospect conversation + "what should I send them"
- "draft a proposal for [industry] client in [country]"
- Prospect notes + "generate a proposal"


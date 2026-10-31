---
name: mavix-client-call-kit
description: Research a Mavix Marketing prospect and build the complete kit for their sales call — the word-for-word call script, the branded A4 review PDF to screen-share, and three matching case studies. Trigger when Farhan gives prospect details (a business name, a website, a city, a DM or email thread, notes from a reply) and asks for a call script, call prep, a sales kit, an SEO review, an ads review, an audit to present, case studies to send, or help getting ready for a booked meeting. Works out which service the prospect needs — SEO or ads — and builds everything for that one service only, never both. Runs the live research first through Bright Data and Apify, so every number in every document is real.
---

# The Mavix client call kit

One prospect in. Five files out — one script, one review, three case studies.

| Deliverable | What it is | Who sees it |
|---|---|---|
| **The call script** | Plain markdown. Research, tabs, findings, then the word-for-word script | Farhan only |
| **The review PDF** | Branded A4, 12-14 pages, a chart or table on every page | Screen-shared to the prospect |
| **Three case studies** | The real ones from mavixmarketing.com/case-studies, matched to their industry, each as a branded A4 built from the live case study page, with its URL (two for an ads kit, see `case-library.md`) | Sent or shown on the call |

---

## Step 1 — Work out the service. Everything hangs off this.

| What Farhan pasted | Service |
|---|---|
| Rankings, traffic, "found on Google", competitors outranking them, nobody finds us | **SEO** |
| Leads now, ad spend, cost per lead, a pixel, wasted budget, we tried ads and it burned | **ADS** |
| Genuinely unclear | Ask one question and nothing else: *"Is this one about rankings, or about ads?"* |

Then follow one track and only one:

| | SEO prospect | Ads prospect |
|---|---|---|
| Research | `references/research.md` | `references/research.md` shared part, then **`references/ads-track.md` section 2** |
| Script | `references/script.md` | `references/script.md` spine + **`references/ads-track.md` section 4** |
| Review PDF | `references/review-pdf.md` | **`references/ads-track.md` section 5** |
| Case studies | SEO half of `references/case-library.md` | **Ads half** of `references/case-library.md` |

**No crossing over. Ever.** An ads kit contains no rankings page, no keyword table, no search case study, not one sentence about blogs or links. An SEO kit contains nothing about ad spend or cost per lead. If they ask about the other one on the call, the line is *"different conversation, different day."*

## Step 2 — Run the live research

Bright Data and Apify are both connected through Composio and both work.

**Never invent a number.** Not a ranking, not a review count, not a search volume, not a competitor's spend. If a tool fails, say so in the script and tell Farhan which tab to open himself. A script built on a guessed ranking dies the moment he shares his screen.

Four things are invisible from outside and must come from the prospect on the call, never from a guess: what they currently spend, what a lead costs them, what a customer is worth, and what happened with the last agency.

## Step 3 — Build the three documents

Both PDFs are built with the toolkit in `assets/` — the design system, the renderer, the fonts, the real client dashboards and two finished worked examples are all in there. Read `references/build.md` before writing any build code. Do not design pages from scratch.

Voice for everything: `references/voice.md`. Facts, pricing and the guarantee: `references/facts.md`.

## Step 4 — Check before delivering

Run `references/checks.md` and show the pass/fail table. Fix failures first.

---

## The rules that do not bend

**Every figure is real or it is not in the document.** Verified by a tool, printed on a dashboard screenshot, given by Farhan, or absent.

**Never promise a ranking position or a lead count.** Google says nobody can guarantee a position — say that on the call, it is a differentiator.

**Mavix is not a traditional SEO agency.** On a search call and in the SEO review, say it gets businesses found on Google, Google Maps, Google's AI Overviews and AI Mode, and AI assistants like ChatGPT. Use only the two AI facts in `facts.md`, with their sources. Never promise a spot in an AI answer.

**One search price list for every new prospect, in US dollars (Farhan, 1 November 2026).** Starter $749 a month (normally $1,049), Growth $1,800 (recommended, where most clients start), Premium $2,500. **If a price was already quoted to the prospect, honour it.** Check the conversation first: anyone already sent an audit and told a price keeps the price, and the guarantee, they were told. Growth and Premium carry our money back guarantee: before we start we agree a clear, measurable target in writing, and if we have not hit it within 180 days the client chooses everything they paid back or we keep working for free until we hit it; Starter has none. Someone already given the old terms (90 days, everything back plus $1,000) keeps them. No long contract: the agreement has no time limit and only ties Mavix, to deliver. `facts.md` is the source; never quote an old price to a new prospect, or a "was" price other than Starter's. (The emailed SEO audit from the proposal skills carries no price; prices are said on the call.)

**Case studies are the real ones from mavixmarketing.com/case-studies.** Name the client exactly the way the website names it, use the website's numbers and timeframe exactly, and put the case study's URL in the document and in the CTA. Never invent a client name, city, staff count, baseline number or execution detail that is not on the website case study; where it is thin, fetch the live page or write in general terms true of how Mavix works. Brother Filtration stays a named reference, cleared for a live screen share of its Search Console and Analytics.

**A case study is never a direct rival.** Not the prospect's own trade in their own town. A case study's location is whatever the website says; never move it. When the library cannot manage that without breaking the service rule, the service rule wins and the bend gets reported — see `case-library.md`.

**Nothing manipulative.** No fake scarcity, no invented deadlines, no pressure closes, no guilt. Everything has to survive the prospect hearing a recording of it six months later.

**Plain English everywhere.** No jargon in any document. If a technical idea is needed, say it the way you would to a friend.

---

## Output

Deliver all five files together with SendUserFile — the script, the review PDF, and the case studies (three for SEO, two for ads while the website has two ads case studies), each with its mavixmarketing.com URL — then a short chat message:

1. Which service this kit is built for, and the signal that decided it
2. The two or three findings that will carry the call
3. Which package to lead with
4. The riskiest moment in the call and how to handle it
5. Anything the research could not reach, and which tab he must open himself
6. Any rule that had to bend, and why

Never bury the deliverables under a long explanation. The documents are the answer.

## Reference files

- `references/research.md` — the shared battery, the SEO battery, and the handoff to ads
- `references/ads-track.md` — the whole ads path: research, script deltas, review pages, objections
- `references/script.md` — the call script spine, section by section
- `references/playbook.md` — the four qualifying questions, twelve objections, the seven things that go wrong, the after-call messages, and how to disqualify warmly
- `references/mechanics.md` — what 39 live calls and 17 sales books taught, and what is banned
- `references/review-pdf.md` — the SEO review PDF, page by page
- `references/case-library.md` — the real website case studies, their URLs and matched dashboards, how to pick three, how to build them
- `references/facts.md` — the company story, pricing, guarantee, terms, intro, floors, capacity
- `references/voice.md` — how everything is written, and the ban-list
- `references/build.md` — how to use the packaged design toolkit
- `references/checks.md` — the pass/fail table to run before delivering

## Assets

`assets/` is self-contained — it carries its own fonts and its own screenshots, so it renders the same in any session.

- `render_lib.py` — palette, A4 page frame, ~20 components
- `render.py` — HTML to PNG to PDF, plus the overflow check
- `dashboards.py` — the real client dashboards (only seo1, seo2, seo3, g2 and m2 match a website case study), with a guard that refuses the wrong service
- `ads_shots_b64.json`, `seo_shots_b64.json` — the screenshots themselves
- `fonts/` — Poppins and Playfair Display
- `build_review_seo.py` + `review_charts.py` — a finished 14-page SEO review
- `build_case_study_seo.py` + `case_content_seo.py` — the SEO case study layout; the example copy is retired invented content, never reuse it
- `build_case_study_ads.py` + `case_content_ads.py` — the ads case study layout, ending on a real dashboard; the example copy is retired invented content, never reuse it

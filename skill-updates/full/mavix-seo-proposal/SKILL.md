---
name: mavix-seo-proposal
description: "Build a branded Mavix Marketing SEO proposal, audit or search strategy document as a print-ready PDF. Trigger when Farhan gives prospect details (a conversation, DM thread, notes, business info, SEO metrics, PageSpeed or backlink data) and asks to create, write, draft or generate an SEO proposal, an SEO audit, a search strategy, an organic growth plan, or asks what to send a prospect who needs rankings, organic traffic or Google visibility. Produces a 19-page document (cover plus 18 one-page sections): a one-page short version up front, a page on being found on Google, Google Maps and AI answers, three real Search Console case studies, confirmed testimonials, premium three-tier SEO pricing, the trust sections that answer a prospect's unspoken questions, and a final 'your plan, your price, reply yes' page with a 15-minute walkthrough link, plus a cold outreach email printed in chat. Use the paid-media skill instead when the prospect wants Google Ads or Meta Ads."
---

# Mavix SEO proposal

Builds a print-ready, branded SEO proposal PDF plus a cold outreach email.

## Step 0: load the rules first

Read **`reference/COPY_RULES.md` before writing a single sentence**,
**`reference/DESIGN_SPEC.md` before writing any build code**, and
**`reference/TRUST_SECTIONS.md` before writing sections 02, 08, 10, 17 or 18.** The copy
rules do not work as a cleanup pass. Then:

```bash
pip install weasyprint pdf2image pymupdf matplotlib --break-system-packages
```

The build expects Poppins in `/usr/share/fonts/truetype/google-fonts/`. If that folder is
missing, install the Poppins TTFs there first (Light, Regular, Medium, Bold), or every page
falls back to a default font.

## Step 1: read the prospect

Pull these out of whatever Farhan pastes. Make reasonable assumptions. Only stop and ask if
the **company name** or the **industry** is genuinely absent.

| Field | If missing |
|---|---|
| Company name | Ask |
| Industry | Ask |
| City and country | Assume USA |
| What they sell and average customer or job value | Estimate and label it as an estimate |
| Who actually buys it | Infer, and be specific rather than demographic |
| Their goal, in their own words | Quote them if they said it. Infer if they did not |
| What is in the way | Their problems, not a list of services they lack |
| Current organic position | Assume early stage |
| Competitors | Name 2 or 3 typical ones for that industry and market |
| Any past agency experience | If they described a bad one, answer it in the FAQs (section 16) and in section 17 |

**Track every assumption as you go.** Section 02 has a box that lists them out loud. A number
that was estimated must never appear anywhere in the document as if the prospect supplied it.

If the prospect actually wants paid ads, stop and use the paid-media skill instead. If they
want both, build this one and note that a paid-media document follows.

## Step 2: the section order

A cover, then **eighteen one-page sections. Nineteen pages.** No contents page: on a phone it
is a wasted swipe before any value. This order is fixed.

The reader is a busy owner on a phone. Page 2 has to give them the whole story, and the last
page has to make saying yes easy. Everything in between is the proof.

| # | Section | What it does |
|---|---|---|
| 01 | The short version | Four stat cards, three findings, three plan lines, the 90-day target and guarantee in one neon box, and "your plan and price are on the last page". No price here |
| 02 | What we know about your business | Table of what they told us, plus the honest assumptions box. See `TRUST_SECTIONS.md` |
| 03 | Where you stand | Their reality: a short table of area, what we found, what it costs them. One pull quote |
| 04 | The search gap | Search volume, capture rate, average value, monthly gap. Competitor traffic bar chart |
| 05 | Google, Maps and AI | The AI search page. Mavix is not a traditional SEO agency. See "AI search positioning" below |
| 06 | Competitor analysis | Competitor table, backlink donut, red alert on the biggest problem |
| 07 | The plan | Neon callout, three-phase Gantt across 90 days, four numbered first-month steps |
| 08 | Exactly what you get | Four scope groups, then **what is not included**, then who does what. See `TRUST_SECTIONS.md` |
| 09 | The targets | The 90-day target the guarantee covers, then six scorecards with month-six goals |
| 10 | Who we are | Five questions answered, AI positioning line, Google Partner block, credential circles, logo wall. See `TRUST_SECTIONS.md` |
| 11 | What clients say | **Confirmed testimonials only**, 2 per row. See Step 5 |
| 12 | Case study 01 | Construction management firm, `seo3` |
| 13 | Case study 02 | HR software company, `seo2` |
| 14 | Case study 03 | Online home goods store, `seo1` |
| 15 | Investment | Premium pricing page: three tiers, Growth recommended, terms strip, guarantee banner |
| 16 | Questions | **Eight numbered FAQs, filling the page.** Always include "Would Google Ads be faster?" and "Will I show up in ChatGPT or Google's AI answers?" |
| 17 | How we work together | Channels and reporting table, who owns what, and what happens if you leave. See `TRUST_SECTIONS.md` |
| 18 | Your plan, your price | The close: recommended plan, its monthly price, the 90-day target, the first three things we do, two ways to say yes. See Step 7b |

Drop section 15 entirely if Farhan says "no pricing". Page count then becomes 18, and the
close page shows the plan and target without a price.

**Cut on purpose, do not bring back:** the contents page, the twelve-month projection page,
a "quick wins" or "fix it yourself" page, the "what usually goes wrong with agencies" page,
a separate reporting page and a separate "after you say yes" page. The useful parts of those
live in sections 01, 16, 17 and 18. They were cut because the October audits ran to 22 and 29
pages and repeated the same promises four or five times.

**Never hand over the fix.** Findings say what is wrong and what it costs them. They do not
include paste-ready text, DNS records, settings paths or "do this yourself in 15 minutes"
instructions. If Farhan wants to give something away, it is one small tip in the email or on
the call, never a page.

**Never write a ranking promise outside the guarantee.** No "rank by New Year", no "be found
before budgets are set". Say what will be live by a date ("the new pages are live before the
January rush"), never where it will rank.

**No placeholders ship.** No "TBC", no "to confirm", no "[ASK FARHAN]" in the PDF. Fill the
gap or cut the line.

Never use the paid-media sections here. No campaign roadmap, no account health table, no
four-phase pricing. No "Google Ads" chip on the cover and no Google ad credit line: they
belong to a different deal. The one honest line about when paid ads would be faster lives in
the FAQs.

## AI search positioning (section 05, and one line in section 10)

Mavix is not a traditional SEO agency. It gets businesses found on Google, Google Maps,
Google's AI Overviews and AI Mode, and AI assistants like ChatGPT. Say that plainly.

**The only two outside facts allowed. No other numbers about AI search, ever:**

- Google says AI Overviews reach over 2 billion people a month (Alphabet, July 2025).
- A Pew Research study (July 2025) found people clicked a normal search result on 8% of
  searches that showed an AI summary, against 15% of searches without one.

Always print the source next to the figure.

**How we help, true work only:** answer-style pages for the questions customers ask,
structured data, Google Business Profile and reviews, mentions and links on trusted sites,
and technical fixes. Do not add anything else (no "llms.txt fixes guarantee citations", no
"AI ranking" products).

**Never promise that the client will appear in an AI answer.** Say that nobody can promise
it, Google included, and that the work makes them the clearest, best-sourced answer.

Build section 05 as: lead paragraph, `stats` with the two facts, a `table` of where customers
look against what we do, and a `neon` with the honest line.

## Step 3: the trust sections

Sections 02, 08, 10, 17 and 18 exist to answer the questions a prospect has in their head
and does not ask. **`reference/TRUST_SECTIONS.md` is the authority on all of them.** Read it
before writing any of those pages.

The rule that outranks everything in that file: **never write something Mavix cannot do.** If
a detail is not true for this client, cut the line rather than softening it.

One SEO specific addition to section 08's "what is not included" list: publisher and placement
fees for PR and guest posts are paid by the client directly, usually 100 to 300 USD a month,
at no markup. Say the range. A client who discovers it later feels sold to.

## Step 4: case studies, which are mandatory

**Three case studies, three different industries, none of them the prospect's own sector.**
Each is one full page with all twelve parts: title, client overview, baseline chips, challenge,
goals, strategy, execution, timeline, obstacles, the real screenshot, why it worked, CTA.

**The case studies are the real ones published at mavixmarketing.com/case-studies.** This
replaces the old invented-name rule, with Farhan's approval.

- **Name the client exactly the way the website names it.** "Construction management firm",
  "HR software company", "Online home goods store", "La Vela Coffee", "My Favorite
  Therapists", "All Dogs Rock". No invented company name, ever.
- **Use the website's numbers and timeframe exactly.** 9.94K clicks in seven months stays
  9.94K clicks in seven months. Never round, restate or stretch a period.
- **Put the case study's URL on the page**, in the meta line, and again in the CTA.
- **Never invent** a client name, city, staff count, product count, baseline number, budget,
  date or execution detail that is not on the website case study or printed on the screenshot.
- Where one of the twelve parts needs detail the website summary does not give, either fetch
  the live case study page at build time and use only what it says, or write that part in
  general terms that are true of how Mavix works ("we rebuilt the service pages", "we tidied
  the site structure so Google could read it") with no specific numbers. If the live page
  cannot be fetched, stay general.
- **Baseline chips carry only real figures**: a starting point the website states, or a figure
  printed on the screenshot. If the website gives no starting point, pass `baseline=[]` and the
  chip row is left out. Never make up a "before" number to fill it.

The three that have a real Search Console screenshot, and the only three this skill uses:

| Key | Website name | Website result | URL |
|---|---|---|---|
| `seo3` | Construction management firm | 9.94K clicks from Google in seven months, daily clicks roughly doubled | https://mavixmarketing.com/case-studies/construction-management-seo |
| `seo2` | HR software company | 326K clicks from Google in 16 months | https://mavixmarketing.com/case-studies/hr-software-seo |
| `seo1` | Online home goods store | 470K clicks from Google in 12 months | https://mavixmarketing.com/case-studies/home-goods-retailer-seo |

**The results block is always the real Search Console screenshot.** Pass `shot="seo1"`,
`"seo2"` or `"seo3"`. Never substitute a chart, never crop or redraw one. If you cannot see a
screenshot in the built PDF, the build is wrong. The panel title carries the website's
timeframe ("Search Console, seven months").

Keep three different industries, matched to the objection in the room, not the sector:

| Objection | Use |
|---|---|
| "We are a small business, this is for big brands" | `seo3` (9.94K clicks in seven months) |
| "Will this actually work at scale?" | `seo2` (326K clicks in 16 months) |
| "We sell online, does SEO work for a store?" | `seo1` (470K clicks in 12 months, position 8.8) |

If the prospect is in one of these three sectors, still use the real case study, say it is a
different business in the same field, and tell Farhan in chat. Never rename it to dodge the
overlap.

## Step 5: testimonials

**Confirmed names only.** Print a testimonial only when Farhan has confirmed the person's name
and company. Never print "client name to confirm", "company to confirm" or anything like it.
Two of the six cards in the October audits said that, which made a careful reader doubt every
other page.

Real photos available: `t1` Jonathan Jones, `t2` Lisa Wrake, `t3` Judy Li, `t4` Mohammed
Ahmed, Managing Director (as printed in the October audits; ask Farhan for his company).
Four confirmed cards make a clean 2 by 2 grid. Use six only when six are confirmed. Write each
quote to that client's real business, then tell Farhan the drafted quotes need sign-off before
sending.

## Step 6: pricing

Three tiers, deliverables as **bullet lists inside the card**, never a paragraph. Prices are
written as `$999`, `$1,349`, `$1,999` with "/ month".

- **Starter $999/mo, no money-back guarantee:** keyword and competitor research, 2 blogs a
  month, directory and profile listings, social bookmarking and Q&A, monthly report and call.
- **Growth $1,349/mo, marked recommended, 90-day money-back guarantee:** everything in
  Starter, 3 to 4 blogs, 2 guest posts, 1 PR placement, Google Business Profile management,
  infographics.
- **Premium $1,999/mo, 90-day money-back guarantee:** everything in Growth, 8 or more blogs
  and guest posts, full on-page audit and fixes, technical SEO, quarterly competitor gap
  analysis, priority calls.

There is no "was" price any more. Never print a crossed-out price or a discount.

**The guarantee, worded the same way everywhere:** on Growth and Premium, we agree a 90-day
target with the client in writing before they start. If we miss it, they get everything they
paid back, plus 1,000 USD. Starter has none. The month-six scorecards are goals, not the
guarantee. The target is a real, checkable number (for example "page one on Google for 2 of 10
searches we agree before you start"), never "TBC".

**No long contract:** the agreement has no time limit and only ties Mavix, to deliver. No
setup fee. Publishers are paid directly by the client for PR and backlinks, usually 100 to 300
USD a month, at no markup.

**The investment page is the premium page.** `pricing_seo` lays it out: the recommended card
is the dark ink-to-blue card with the lime "Recommended for you" badge, a little taller than
the other two, with a white price; Starter and Premium are clean white cards. Each card has a
one-line "fit" under the tier name (who it suits). Under the cards sits a four-item terms
strip (`P["terms"]`), then the guarantee banner. Do not add a paragraph of small print
between them: the page works because it is calm and has room.

Whatever is said about notice and cancellation here must match section 17 and the actual
contract. If the three disagree, the contract wins and the other two change.

## Step 7: build

Copy `sample_seo.py` and replace the content. Do not write CSS or chart code. The trust
sections need no new components: section 02 is `table` plus `alert`, section 17 is `table`
plus `two_col` plus `alert`. Section 15 is `pricing_seo` and section 18 is `close_page`.

```bash
python3 build_proposal.py     # your copy of sample_seo.py
```

## Step 7b: the close page (section 18)

Title: "Your plan, your price. Reply yes to start." Built with `close_page`. It holds:

1. **The recommended plan for them** and its monthly price, in the dark hero panel, with the
   guarantee in one line (Growth or Premium only; if Starter is the recommendation, say it has
   no guarantee).
2. **The 90-day target**, the same words as section 09, and how it is checked.
3. **The first three things we do**, specific to this prospect (from section 07).
4. **Two ways to say yes:** reply "yes" to the email, or book a 15-minute walkthrough at
   https://cal.id/mavixmarketing/strategy-call. Both are tappable links in the PDF.

Nothing else goes on this page. No new information, no extra plans, no fine print.

## Step 8: check before showing anyone

1. **Page count is 19** (cover + 18 sections), or 18 with no pricing. More means a section
   spilled. Cut copy, never type size.
2. Render every page to PNG and look at them. Look hardest at page 2, the pricing page and
   the close page: the recommended card stands out, nothing wraps badly, both links show.
3. Run the verification script in `reference/COPY_RULES.md` on the PDF. Zero dashes, zero
   curly quotes, zero banned words.
4. Every case study shows a real screenshot, names the client the way the website does,
   uses the website's numbers and timeframe, and carries its mavixmarketing.com URL. A total
   for a period is never called "monthly".
5. Testimonials: confirmed names only, no "to confirm" anywhere. Eight numbered FAQs filling
   the page. Bulleted pricing cards.
6. **Section 02 has an assumptions box**, and every estimated figure in the document appears
   in it. Nothing invented is presented as something the prospect said.
7. **Section 10 does not contain the banned agency sentence**, and claims no team size,
   founding year, client count or award that Farhan has not stated.
8. **Section 05 uses only the two allowed AI facts**, each with its source, and promises no
   place in an AI answer.
9. **Section 17, the pricing section and the FAQs agree** on the terms: no long contract, no
   time limit, the agreement only ties Mavix.
10. **Publisher fees appear in section 08** as a cost the client pays directly.
11. **Prices are $999, $1,349 and $1,999.** No "was" price. The guarantee is worded the same in
    sections 01, 09, 15, 16 and 18.
12. **No placeholders, no DIY fixes, no ranking promises** outside the guarantee. Search the
    PDF text for "TBC", "confirm", "do this", "rank by".
13. **The close page** shows the plan, the price, the 90-day target, three first steps, and
    both ways to say yes with working links.

## Step 9: deliver

`SendUserFile` the PDF, then `device_commit_files` it to Farhan's Claude Proposal folder.
One line of summary, then print the outreach email in chat.

Tell Farhan in chat, every time, which lines in the document are commitments he now has to
keep: the response time, the 90-day target, the first three things on the close page, and the
handover. If any of them is not true yet, say so plainly before he sends it.

## Step 10: the outreach email

Plain text in chat only. **Never inside the PDF.** Four to six short lines.

1. An opening line specific to their business or market.
2. One pain point they feel.
3. One outcome, not a service list.
4. A soft ask to open the attached audit.
5. **The 15-minute walkthrough offer, with the link written out in full:** for example
   "If it's easier, I can walk you through it in 15 minutes:
   https://cal.id/mavixmarketing/strategy-call". This is the only link in the email.
6. `Mohd Farhan` on its own. No title, no company, no phone, no link in the sign-off.

Zero dashes, straight quotes only, no "I hope this email finds you well", no "Best regards".
No price in the email. Everything in `reference/COPY_RULES.md` applies.

```
OUTREACH EMAIL, copy and paste this:
Subject: ...

[body]

If it's easier, I can walk you through it in 15 minutes: https://cal.id/mavixmarketing/strategy-call

Mohd Farhan
```

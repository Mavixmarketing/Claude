---
name: mavix-seo-proposal
description: "Build a branded Mavix Marketing SEO proposal, audit or search strategy document as a print-ready PDF. Trigger when Farhan gives prospect details (a conversation, DM thread, notes, business info, SEO metrics, PageSpeed or backlink data) and asks to create, write, draft or generate an SEO proposal, an SEO audit, a search strategy, an organic growth plan, or asks what to send a prospect who needs rankings, organic traffic or Google visibility. Produces the 19-section document with three real Search Console case studies, six testimonials, three-tier SEO pricing, the five trust sections that answer a prospect's unspoken questions, and a cold outreach email printed in chat. Use the paid-media skill instead when the prospect wants Google Ads or Meta Ads."
---

# Mavix SEO proposal

Builds a print-ready, branded SEO proposal PDF plus a cold outreach email.

## Step 0: load the rules first

Read **`reference/COPY_RULES.md` before writing a single sentence**,
**`reference/DESIGN_SPEC.md` before writing any build code**, and
**`reference/TRUST_SECTIONS.md` before writing sections 01, 07, 09, 16, 17 or 19.** The copy
rules do not work as a cleanup pass. Then:

```bash
pip install weasyprint pdf2image pymupdf --break-system-packages
```

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
| Any past agency experience | If they described a bad one, it changes section 16 |

**Track every assumption as you go.** Section 01 has a box that lists them out loud. A number
that was estimated must never appear anywhere in the document as if the prospect supplied it.

If the prospect actually wants paid ads, stop and use the paid-media skill instead. If they
want both, build this one and note that a paid-media document follows.

## Step 2: the section order

Nineteen sections plus a cover and a contents page. **Twenty one pages.** This order is fixed.

| # | Section | What it does |
|---|---|---|
| 01 | What we know about your business | Eight row table of what they told us, plus the honest assumptions box. See `TRUST_SECTIONS.md` |
| 02 | The situation | Their reality in their words. Stat row, bullets, pull quote, neon callout |
| 03 | The revenue gap | Search volume, capture rate, average value, monthly gap. Competitor traffic bar chart |
| 04 | The opportunity | Twelve-month projection chart, milestone stat row. Carries one honest paragraph on when paid ads would be the faster buy |
| 05 | Competitor analysis | Competitor table, backlink donut, red alert on the biggest problem |
| 06 | The strategy | Neon callout, three-phase Gantt, four numbered first-month steps |
| 07 | Exactly what you get | Four scope groups, then **what is not included**, then who does what. See `TRUST_SECTIONS.md` |
| 08 | The fix, measured | Six scorecards, current to month-six target |
| 09 | Who we are | Five questions answered, then Google Partner block, credential circles, client logo wall. See `TRUST_SECTIONS.md` |
| 10 | What clients say | **Six testimonials, 2 by 3 grid** |
| 11 | Case study 01 | Construction management firm, `seo3` |
| 12 | Case study 02 | HR software company, `seo2` |
| 13 | Case study 03 | Online home goods store, `seo1` |
| 14 | Investment | Three tiers with **bulleted** deliverables, guarantee banner |
| 15 | Questions | **Eight numbered FAQs, filling the page** |
| 16 | What usually goes wrong with agencies | Ten row table, problem against how this works instead. See `TRUST_SECTIONS.md` |
| 17 | How we work together | Channels, who owns what, and what happens if you leave. See `TRUST_SECTIONS.md` |
| 18 | Reporting | Weekly and monthly, pull quote, dashboard note. Rankings are context, customers are the headline |
| 19 | What happens after you say yes | Seven numbered steps with timings, then the final CTA block. See `TRUST_SECTIONS.md` |

Drop section 14 entirely, and its contents row, if Farhan says "no pricing". Page count then
becomes 20.

Never use the paid-media sections here. No campaign roadmap, no account health table, no
four-phase pricing. There is no standalone "why invest in SEO" page any more; its one useful
idea, being honest about when paid ads would move faster, lives in section 04 as a single
paragraph.

## Step 3: the five trust sections

Sections 01, 07, 09, 16, 17 and 19 exist to answer the questions a prospect has in their head
and does not ask. **`reference/TRUST_SECTIONS.md` is the authority on all of them.** Read it
before writing any of those pages.

The rule that outranks everything in that file: **never write something Mavix cannot do.** If
a detail is not true for this client, cut the line rather than softening it.

One SEO specific addition to section 07's "what is not included" list: publisher and placement
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

Six cards, **two per row**, three rows. Four real client photos (`t1` Jonathan Jones, `t2` Lisa
Wrake, `t3` Judy Li, `t4` name still to be confirmed by Farhan), two initials avatars. Write each quote to that
client's real business, then tell Farhan the drafted quotes need sign-off before sending.

## Step 6: pricing

Three tiers, deliverables as **bullet lists inside the card**, never a paragraph.

- **Starter 349 USD/mo:** keyword and competitor research, 2 blogs a month, directory and
  profile listings, social bookmarking and Q&A, monthly report and call.
- **Growth 549 USD/mo, marked recommended, was 799:** everything in Starter, 3 to 4 blogs,
  2 guest posts, 1 PR placement, Google Business Profile management, infographics.
- **Premium 1,699 USD/mo:** everything in Growth, 8 or more blogs and guest posts, full
  on-page audit and fixes, technical SEO, quarterly competitor gap analysis, priority calls.

Month to month, 30 days notice, no setup fee. Publishers are paid directly by the client for
PR and backlinks, usually 100 to 300 USD a month, at no markup. Close with the 90-day
money-back guarantee: every fee back plus 1,000 USD if the month-six targets are missed.

Whatever is said about notice and cancellation here must match section 17 and the actual
contract. If the three disagree, the contract wins and the other two change.

## Step 7: build

Copy `sample_seo.py` and replace the content. Do not write CSS or chart code. The trust
sections need no new components: section 01 is `table` plus `alert`, section 16 is `table`
plus `neon`, section 17 is `table` plus `two_col` plus `alert`, section 19 is `steps`.

```bash
python3 build_proposal.py     # your copy of sample_seo.py
```

## Step 8: check before showing anyone

1. **Page count is 21** (19 sections + cover + contents). More means a section spilled. Cut
   copy, never type size.
2. Render every page to PNG and look at them.
3. Run the verification script in `reference/COPY_RULES.md` on the PDF. Zero dashes, zero
   curly quotes, zero banned words.
4. Every case study shows a real screenshot, names the client the way the website does,
   uses the website's numbers and timeframe, and carries its mavixmarketing.com URL.
5. Six testimonials, eight numbered FAQs filling the page, bulleted pricing cards.
6. **Section 01 has an assumptions box**, and every estimated figure in the document appears
   in it. Nothing invented is presented as something the prospect said.
7. **Section 09 does not contain the banned agency sentence**, and claims no team size,
   founding year, client count or award that Farhan has not stated.
8. **Section 16 has ten rows**, each one or two lines. Twelve rows will spill.
9. **Section 17 and the pricing section agree** on notice and cancellation.
10. **Publisher fees appear in section 07** as a cost the client pays directly.
11. **Section 19 promises nothing Mavix cannot deliver**, including the onboarding form and
    the 48 hour welcome pack.

## Step 9: deliver

`SendUserFile` the PDF, then `device_commit_files` it to Farhan's Claude Proposal folder.
One line of summary, then print the outreach email in chat.

Tell Farhan in chat, every time, which lines in the document are commitments he now has to
keep: the response time, the welcome pack contents, the notice period, and the handover. If
any of them is not true yet, say so plainly before he sends it.

## Step 10: the outreach email

Plain text in chat only. **Never inside the PDF.** Three to five lines.

1. An opening line specific to their business or market.
2. One pain point they feel.
3. One outcome, not a service list.
4. A soft ask to open the attached strategy.
5. `Mohd Farhan` on its own. No title, no company, no phone, no link.

Zero dashes, straight quotes only, no "I hope this email finds you well", no "Best regards".
Everything in `reference/COPY_RULES.md` applies.

```
OUTREACH EMAIL, copy and paste this:
Subject: ...

[body]

Mohd Farhan
```

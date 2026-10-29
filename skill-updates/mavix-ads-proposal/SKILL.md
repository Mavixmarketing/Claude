---
name: mavix-ads-proposal
description: "Build a branded Mavix Marketing paid media proposal for Google Ads and Meta Ads as a print-ready PDF. Trigger when Farhan gives prospect details (a conversation, DM thread, notes, business info, ad spend, ROAS, cost per lead, pixel or tracking problems) and asks to create, write, draft or generate an ads proposal, a paid media plan, a PPC proposal, a Google Ads or Facebook Ads strategy, an ad account audit, or asks what to send a prospect who wants leads or sales quickly. Produces the 19-section document with the real Google Ads and Meta case studies from mavixmarketing.com/case-studies, six testimonials, four-phase ads pricing, the five trust sections that answer a prospect's unspoken questions, and a cold outreach email printed in chat. Use the SEO skill instead when the prospect wants organic rankings."
---

# Mavix paid media proposal

Builds a print-ready, branded Google and Meta Ads proposal PDF plus a cold outreach email.

## Step 0: load the rules first

Read **`reference/COPY_RULES.md` before writing a single sentence**,
**`reference/DESIGN_SPEC.md` before writing any build code**, and
**`reference/TRUST_SECTIONS.md` before writing sections 01, 09, 07, 16, 17 or 19.** The copy
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
| What they sell and average order or job value | Estimate and label it as an estimate |
| Who actually buys it | Infer, and be specific. Not "homeowners" but "homeowners with a roof over 15 years old" |
| Their goal, in their own words | Quote them if they said it. Infer if they did not |
| What is in the way | Their problems, not a list of services they lack |
| Current ad spend and platforms | Assume none, or boosted posts only |
| Tracking state | Assume pixel missing or misconfigured. It usually is |
| Competitors running ads | Name 2 or 3 typical ones for that market |
| Any past agency experience | If they described a bad one, it changes section 16 |

**Track every assumption as you go.** Section 01 has a box that lists them out loud. A number
that was estimated must never appear anywhere in the document as if the prospect supplied it.

If the prospect actually wants organic rankings, stop and use the SEO skill instead.

## Step 2: the section order

Nineteen sections plus a cover and a contents page. **Twenty one pages.** This order is fixed
and is **not** the SEO order.

| # | Section | What it does |
|---|---|---|
| 01 | What we know about your business | Eight row table of what they told us, plus the honest assumptions box. See `TRUST_SECTIONS.md` |
| 02 | The situation | Where the money is going now. Stat row, bullets, pull quote, neon callout |
| 03 | The opportunity | Demand that already exists, not organic keywords. Spend against return chart. Carries one honest paragraph on when SEO would be the better buy |
| 04 | Problem and transformation | Today vs month six in two columns, cost-per-order curve, guarantee. **No organic traffic projection** |
| 05 | Account and competitor analysis | **Account health table** (tracking, structure, creative, retargeting, Google presence) then competitor ad presence. **Never backlinks or toxic links** |
| 06 | Campaign roadmap | Neon callout, three-phase Gantt, four phase step boxes |
| 07 | Exactly what you get | Four scope groups, then **what is not included**, then who does what. See `TRUST_SECTIONS.md` |
| 08 | The numbers we own | Six scorecards, current to month-six target |
| 09 | Who we are | Five questions answered, then Google Partner block, credential circles, client logo wall. See `TRUST_SECTIONS.md` |
| 10 | What clients say | **Six testimonials, 2 by 3 grid** |
| 11 | Case study 01 | Service business on Google Ads, `g2` |
| 12 | Case study 02 | Local services business on Meta Ads, `m2` |
| 13 | Case study 03 | Only if the website has a third ads case study with a matching screenshot. Otherwise drop it, see Step 4 |
| 14 | Investment | **Four phase cards with bulleted contents**, guarantee banner |
| 15 | Questions | **Eight numbered FAQs, filling the page** |
| 16 | What usually goes wrong with agencies | Ten row table, problem against how this works instead. See `TRUST_SECTIONS.md` |
| 17 | How we work together | Channels, who owns what, and what happens if you leave. See `TRUST_SECTIONS.md` |
| 18 | Reporting | Weekly and monthly, pull quote, dashboard note. Leads and revenue lead, never impressions |
| 19 | What happens after you say yes | Seven numbered steps with timings, then the final CTA block. See `TRUST_SECTIONS.md` |

Drop section 14 entirely, and its contents row, if Farhan says "no pricing". Page count then
becomes 20.

There is no AI visibility section in an ads proposal. There is no keyword ranking chart and no
backlink donut. There is no standalone "why paid media" page any more; its one useful idea,
being honest about when SEO is the better buy, lives in section 03 as a single paragraph.

## Step 3: the five trust sections

Sections 01, 07, 09, 16, 17 and 19 exist to answer the questions a prospect has in their head
and does not ask. **`reference/TRUST_SECTIONS.md` is the authority on all of them.** Read it
before writing any of those pages.

The rule that outranks everything in that file: **never write something Mavix cannot do.** If
a detail is not true for this client, cut the line rather than softening it.

## Step 4: case studies, which are mandatory

**Three case studies, three different industries and three different business models**, none
of them the prospect's own sector. Each is one full page with all twelve parts: title, client
overview, baseline chips, challenge, goals, strategy, execution, timeline, obstacles, the real
screenshot, why it worked, CTA.

**The case studies are the real ones published at mavixmarketing.com/case-studies.** This
replaces the old invented-name rule, with Farhan's approval.

- **Name the client exactly the way the website names it.** "Service business", "Local
  services business". No invented company name, ever.
- **Use the website's numbers and timeframe exactly.** 2.41K enquiries in one month stays
  2.41K enquiries in one month. Never round, restate or stretch a period.
- **Put the case study's URL on the page**, in the meta line, and again in the CTA.
- **Never invent** a client name, city, staff count, order value, baseline number, budget,
  date or execution detail that is not on the website case study or printed on the screenshot.
- Where one of the twelve parts needs detail the website summary does not give, either fetch
  the live case study page at build time and use only what it says, or write that part in
  general terms that are true of how Mavix works ("we rebuilt the campaign structure", "we set
  up conversion tracking properly") with no specific numbers. If the live page cannot be
  fetched, stay general.
- **Baseline chips carry only real figures**: a starting point the website states, or a figure
  printed on the screenshot. If the website gives no starting point, pass `baseline=[]` and the
  chip row is left out. Never make up a "before" number to fill it.

The ads case studies on the website that have a matching real screenshot:

| Key | Website name | Website result | URL |
|---|---|---|---|
| `g2` | Service business on Google Ads | 2.41K enquiries in one month | https://mavixmarketing.com/case-studies/lead-gen-volume |
| `m2` | Local services business on Meta Ads | 2,631 leads in one campaign | https://mavixmarketing.com/case-studies/meta-lead-gen |

`g1`, `g3`, `g4`, `m1` and `m3` are real screenshots, but no website case study matches their
numbers yet. **Do not use them as case studies** and do not write a story around them. Ask
Farhan to publish the case study first.

**The results block is always the real Google Ads or Meta screenshot.** Pass `shot="g2"` or
`"m2"`. Never substitute a chart, never crop or redraw one. If you cannot see a screenshot in
the built PDF, the build is wrong. The panel title carries the website's timeframe.

**The third case study.** Keep three different industries, matched to the objection in the
room, whenever the website has three ads case studies with a matching screenshot. Check the
live case studies page at build time. If there is still no third, build the two real ones,
drop section 13 and its contents row (page count becomes 20), and tell Farhan in chat. Never
fill the slot with an unmatched screenshot, an invented story or an SEO case study.

Match on the objection in the room, not the sector:

| Objection | Use |
|---|---|
| "Can ads bring us enquiries in volume?" | `g2` (2.41K enquiries in one month) |
| "Our cost per conversion is too high" | `g2` (GBP 19.21 cost per conversion on the screenshot) |
| "We need leads, not e-commerce sales" | `m2` (2,631 leads in one campaign) |
| "Meta has never worked for us" | `m2` (GBP 2.68 cost per lead on the screenshot) |

## Step 5: testimonials

Six cards, **two per row**, three rows. Four real client photos (`t1` Jonathan Jones, `t2` Lisa
Wrake, `t3` Judy Li, `t4` name still to be confirmed by Farhan), two initials avatars. Write each quote to that
client's real business, then tell Farhan the drafted quotes need sign-off before sending.

## Step 6: pricing, four phases, deliberately low to high

Four cards, contents as **bullet lists**, never a paragraph.

- **Phase 1 and 2, setup and warm up, 249 USD/mo:** pixel, Conversions API and GTM, catalogue
  connected, accounts built, first awareness spend. Buying data, not orders.
- **Phase 3, convert, 349 USD/mo:** sales campaigns switch on, dynamic retargeting, Search and
  Shopping. The fee rises only once orders land.
- **Phase 4, scale, 449 USD/mo:** budget up only on what already works, new creative monthly,
  more placements, awareness still running underneath.
- **Always, your ad budget, "Yours":** sits in the client's own account, never passes through
  Mavix, they set it and can change it any day, 1,000 USD Google ad credit included.

**Always state the rationale.** Ads need spend before sales arrive, and that spend is already
the client's money. The fee starts low so their money goes into ad budget, and rises only once
results show. The 249 covers our cost to run the account properly.

Budget guide: awareness 10 to 20 USD a day per platform, then sales 30 to 50 USD a day per
platform. Close with the 90-day money-back guarantee: every management fee back plus 1,000 USD
if the month-six targets are missed, with ad spend separate and untouched.

Whatever is said about notice and cancellation here must match section 17 and the actual
contract. If the three disagree, the contract wins and the other two change.

## Step 7: build

Copy `sample_ads.py` and replace the content. Do not write CSS or chart code. The trust
sections need no new components: section 01 is `table` plus `alert`, section 16 is `table`
plus `neon`, section 17 is `table` plus `two_col` plus `alert`, section 19 is `steps`.

```bash
python3 build_proposal.py     # your copy of sample_ads.py
```

## Step 8: check before showing anyone

1. **Page count is 21** (19 sections + cover + contents), or 20 when there is no third real
   ads case study. More means a section spilled. Cut copy, never type size.
2. Render every page to PNG and look at them.
3. Run the verification script in `reference/COPY_RULES.md` on the PDF. Zero dashes, zero
   curly quotes, zero banned words. "Dynamic retargeting" and "Conversions API" are exempt.
4. Every case study shows a real screenshot, names the client the way the website does,
   uses the website's numbers and timeframe, and carries its mavixmarketing.com URL.
5. Six testimonials, eight numbered FAQs filling the page, bulleted phase cards.
6. No SEO sections leaked in. No backlinks, no keyword rankings, no three-tier SEO pricing.
7. **Section 01 has an assumptions box**, and every estimated figure in the document appears
   in it. Nothing invented is presented as something the prospect said.
8. **Section 09 does not contain the banned agency sentence**, and claims no team size,
   founding year, client count or award that Farhan has not stated.
9. **Section 16 has ten rows**, each one or two lines. Twelve rows will spill.
10. **Section 17 and the pricing section agree** on notice and cancellation.
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
4. A soft ask to open the attached plan.
5. `Mohd Farhan` on its own. No title, no company, no phone, no link.

Zero dashes, straight quotes only, no "I hope this email finds you well", no "Best regards".
Everything in `reference/COPY_RULES.md` applies.

```
OUTREACH EMAIL, copy and paste this:
Subject: ...

[body]

Mohd Farhan
```

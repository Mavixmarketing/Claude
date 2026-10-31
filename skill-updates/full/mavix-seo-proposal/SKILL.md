---
name: mavix-seo-proposal
description: "Build a branded Mavix Marketing SEO proposal, audit or search strategy document as a print-ready PDF. Trigger when Farhan gives prospect details (a conversation, DM thread, notes, business info, SEO metrics, PageSpeed or backlink data) and asks to create, write, draft or generate an SEO proposal, an SEO audit, a search strategy, an organic growth plan, or asks what to send a prospect who needs rankings, organic traffic or Google visibility. Produces an 18-page free audit and strategy (cover plus 17 one-page sections) with no prices anywhere: a one-page short version up front, a page on being found on Google, Google Maps and AI answers, a 'what we will work on' scope page covering the website, rankings, content, links and PR, Google Maps and reviews, AI Overviews and AI Mode, and ChatGPT, Perplexity and Gemini, three real Search Console case studies, confirmed testimonials, the trust sections that answer a prospect's unspoken questions, and a final 'your plan, and how to start' page (reply yes for the plan and personalised price, or book a 15-minute walkthrough), plus a cold outreach email printed in chat. Use the paid-media skill instead when the prospect wants Google Ads or Meta Ads."
---

# Mavix SEO proposal

Builds a print-ready, branded SEO audit and strategy PDF plus a cold outreach email.

**This document is a free audit and strategy, not a quote. It carries no prices at all**
(Farhan, October 2026). The plan and the personalised price go to the prospect after they
reply "yes" or book the 15-minute walkthrough. No money figure is allowed anywhere, not even
in the guarantee (it has no "$1,000" any more). The one exception: a prospect already given the
old guarantee (90 days, everything back plus $1,000) keeps it, and then "plus $1,000" may appear.

## Step 0: load the rules first

Read **`reference/COPY_RULES.md` before writing a single sentence**,
**`reference/DESIGN_SPEC.md` before writing any build code**, and
**`reference/TRUST_SECTIONS.md` before writing sections 02, 08, 10, 16 or 17.** The copy
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
| Any past agency experience | If they described a bad one, answer it in the FAQs (section 15) and in section 16 |

**Track every assumption as you go.** Section 02 has a box that lists them out loud. A number
that was estimated must never appear anywhere in the document as if the prospect supplied it.

If the prospect actually wants paid ads, stop and use the paid-media skill instead. If they
want both, build this one and note that a paid-media document follows.

## Step 2: the section order

A cover, then **seventeen one-page sections. Eighteen pages.** No contents page and no
pricing page. This order is fixed.

The reader is a busy owner on a phone. Page 2 has to give them the whole story, the scope
page has to show everything we would do for them, and the last page has to make the next step
easy. Everything in between is the proof.

| # | Section | What it does |
|---|---|---|
| 01 | The short version | Four stat cards, three findings, three plan lines, the target we agree in writing and the guarantee in one neon box, and "your plan and how to start are on the last page" |
| 02 | What we know about your business | Table of what they told us, plus the honest assumptions box. See `TRUST_SECTIONS.md` |
| 03 | Where you stand | Their reality: a short table of area, what we found, what it costs them. One pull quote |
| 04 | The search gap | Search volume, capture rate, average value, monthly gap. Competitor traffic bar chart |
| 05 | Google, Maps and AI | The AI search page: the two allowed facts, then what each place shows for them today. See "AI search positioning" below |
| 06 | Competitor analysis | Competitor table, backlink donut, red alert on the biggest problem |
| 07 | The plan | Neon callout, three-phase Gantt across 90 days, then "Your first 30 days": four numbered steps, week 1 to week 4, specific to them |
| 08 | What we will work on | The seven work areas, each with what we do and what it means for them, then what is not included and what we need from them. See Step 3b |
| 09 | The targets | The target we agree in writing, which the guarantee covers (180 days), then six scorecards with month-six goals |
| 10 | Who we are | The company story (below), Google Partner block, credential circles, logo wall. See `TRUST_SECTIONS.md` |
| 11 | What clients say | **Confirmed testimonials only**, 2 per row. See Step 5 |
| 12 | Case study 01 | Construction management firm, `seo3` |
| 13 | Case study 02 | HR software company, `seo2` |
| 14 | Case study 03 | Online home goods store, `seo1` |
| 15 | Questions | **Eight numbered FAQs, filling the page.** Always include "Would Google Ads be faster?", "Will I show up in ChatGPT or Google's AI answers?" and "What does it cost?" (answer: it depends on the plan and the site; reply "yes" or book the walkthrough for the personalised price; no setup fee) |
| 16 | How we work together | Channels and reporting table, who owns what, and what happens if you leave. See `TRUST_SECTIONS.md` |
| 17 | Your plan, and how to start | The close: the recommended plan of work (no price), the target we would agree in writing, the first three things we do, two ways to move forward. See Step 7b |

**No prices, anywhere.** No pricing or investment page, no price on the close page, no price
in the FAQs, the scope page, the email or the file name. No "$1,800", no "/ month", no "from".
Publisher fees are named as a cost the client pays directly, without a number ("we tell you the
usual range with your price"). No money figure is allowed at all, unless the prospect was
already given the old guarantee with its "plus $1,000". If Farhan asks for a quote, that is a separate document, sent after the prospect says yes.

**Cut on purpose, do not bring back:** the contents page, the pricing or investment page, the
twelve-month projection page, a "quick wins" or "fix it yourself" page, the "what usually goes
wrong with agencies" page, a separate reporting page and a separate "after you say yes" page.
The useful parts of those live in sections 01, 15, 16 and 17. They were cut because the October
audits ran to 22 and 29 pages and repeated the same promises four or five times.

**No page repeats another.** Section 05 says what each place shows for them today. Section 08
says the work. Section 16 says how we work together. The close page adds nothing new. If a line
already sits on an earlier page, do not print it again.

**Never hand over the fix.** Findings say what is wrong and what it costs them. They do not
include paste-ready text, DNS records, settings paths or "do this yourself in 15 minutes"
instructions. If Farhan wants to give something away, it is one small tip in the email or on
the call, never a page.

**Never write a ranking promise outside the guarantee.** No "rank by New Year", no "be found
before budgets are set", no "you will appear in AI answers". Say what will be live by a date
("the new pages are live before the January rush"), never where it will rank.

**No placeholders ship.** No "TBC", "to confirm", "[ASK FARHAN]" in the PDF. Fill the gap or cut
the line.

Never use the paid-media sections here. No campaign roadmap, no account health table, no
four-phase pricing. No "Google Ads" chip on the cover and no Google ad credit line: they
belong to a different deal. The one honest line about when paid ads would be faster lives in
the FAQs.

## AI search positioning (section 05, and one line in section 10)

Mavix is not a traditional SEO agency. It gets businesses found on Google, Google Maps,
Google's AI Overviews and AI Mode, and AI assistants like ChatGPT, Perplexity and Gemini. Say
that plainly.

**The only two outside facts allowed. No other numbers about AI search, ever:**

- Google says AI Overviews reach over 2 billion people a month (Alphabet, July 2025).
- A Pew Research study (July 2025) found people clicked a normal search result on 8% of
  searches that showed an AI summary, against 15% of searches without one.

Always print the source next to the figure.

**How we help, true work only:** answer-style pages for the questions customers ask,
structured data, Google Business Profile and reviews, mentions and links on trusted sites,
consistent business details across the web, and technical fixes. Do not add anything else (no
"llms.txt fixes guarantee citations", no "AI ranking" products).

**Never promise that the client will appear in an AI answer, or a ranking by a date.** Say that
nobody can promise it, Google included, and that the work makes them the clearest,
best-sourced answer.

Build section 05 as: lead paragraph, `stats` with the two facts, a `table` of **where customers
look against what we found for them on the build date** (Google search, Google Maps, AI
Overviews and AI Mode, ChatGPT, Perplexity and Gemini), and a `neon` with the honest line. Only
print what you actually checked. If you could not check a row, write "Not checked yet. We check
it in week one and show you what it says." The work itself goes on section 08, not here.

## Step 3: the trust sections

Sections 02, 08, 10, 16 and 17 exist to answer the questions a prospect has in their head
and does not ask. **`reference/TRUST_SECTIONS.md` is the authority on all of them.** Read it
before writing any of those pages.

The rule that outranks everything in that file: **never write something Mavix cannot do.** If
a detail is not true for this client, cut the line rather than softening it.

One SEO specific addition to section 08's "what is not included" list: publisher and placement
fees for PR and guest posts are paid by the client directly, at no markup. Say that it exists,
with no number in this document ("we tell you the usual range with your price"). The range goes
in the price Farhan sends after the yes, so nobody discovers it later.

## Step 3b: What we will work on (section 08)

Farhan wants every prospect to see all the work Mavix does, in plain words, and what each
part means for them. Build it with `work_areas`: seven numbered rows, each with what we do (one
line or two) and "For you:" (one line on what changes for their business). Use their trade's
words ("patients", "treatments", "jobs"), not ours.

| # | Area | What it covers |
|---|---|---|
| 1 | Your website | Speed, a clear structure, a page for each service and each area they serve, technical fixes |
| 2 | Google rankings and keyword research | The searches their customers type, how many people make them, which to win first |
| 3 | Blogs and helpful content | Articles that answer the questions customers ask before they buy, written by a person, approved by them |
| 4 | Links, PR and mentions | Links and mentions on trusted sites, PR placements |
| 5 | Google Maps and reviews | Google Business Profile kept full and active, a simple way to ask for reviews |
| 6 | Google's AI Overviews and AI Mode | Answer-style pages and the labels Google reads (structured data), so it can understand and quote them |
| 7 | ChatGPT, Perplexity and Gemini | The same business details everywhere online, mentions on the sites these assistants read |

Rows 6 and 7 always carry the honest line: nobody can promise a place in an AI answer. Under the
rows, one short note: **not included** (publisher fees paid directly at no markup, with no
number; a website rebuild; photography and video; anything else is quoted before it starts) and
**what we need from you** (access in week one, a quick read of each page). How much of each area
happens every month depends on the plan, and that detail goes with the price after the yes.
Never print prices, quantities per price, or tier tables on this page.

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

**Confirmed names only, and only the company or role Farhan has confirmed.** Never print
"client name to confirm", "company to confirm" or anything like it. Two of the six cards in the
October audits said that, which made a careful reader doubt every other page.

**Never print an unconfirmed company or role for a real person.** If the company is not
confirmed, the card says "Business owner" (or "Business owner, [city]" when the city is
confirmed). Never invent a company name or a job title. `testimonials()` refuses any card with a
placeholder or an empty role and stops the build.

Real photos available: `t1` Jonathan Jones, Sales Director, Carpenter and Paterson Asia Ltd;
`t2` Lisa Wrake, Founder, Run Wrake; `t3` Judy Li, Founder and CEO, Brother Filtration
Equipment Co; `t4` **Mohammed Ahmed, Business owner** (no confirmed company or city: print
exactly that until Farhan confirms more). Four confirmed cards make a clean 2 by 2 grid. Use
six only when six are confirmed. Write each quote to that client's real business, then tell
Farhan the drafted quotes need sign-off before sending.

## Step 6: no prices, and the guarantee

**There are no prices in this document.** No pricing page, no price on the close page, no
"from" price in the FAQs. The plan names (Starter, Growth, Premium) may appear, and the close
page lists the work in the recommended plan, but never a fee. Prices are sent after the yes:
one price list for every new prospect (see the call kit's `facts.md` for the current numbers),
or the price already quoted to them if the conversation shows one.

What each plan does, for the close page's "every month" list only (no prices):

- **Starter, no money-back guarantee:** keyword and competitor research, 2 blogs a month,
  directory and profile listings, social bookmarking and Q&A, monthly report and call.
- **Growth, usually the one we recommend, our money back guarantee:** everything in Starter,
  3 to 4 blogs, 2 guest posts, 1 PR placement, Google Business Profile management,
  infographics.
- **Premium, our money back guarantee:** everything in Growth, 8 or more blogs and guest
  posts, full on-page audit and fixes, technical SEO, quarterly competitor gap analysis,
  priority calls.

**Our money back guarantee, worded the same way everywhere (sections 01, 09, 15 and 17):** on
our main plans (Growth and Premium), we agree a clear, measurable target with the client in
writing before they start. If we have not hit it within 180 days, they choose: everything they
paid back, or we keep working for free until we hit it. Starter has none. No "$1,000" and no
"90 days" in the guarantee. **Check the conversation first:** anyone already sent an audit and
told the old terms (90 days, everything back plus $1,000) keeps them, and so does their price.
The plan itself still runs over 90 days (section 07); only the guarantee changed. The
month-six scorecards are goals, not the guarantee. The target is a real, checkable number (for
example "page one on Google for 2 of 10 searches we agree before you start"), never "TBC".

**No long contract:** the agreement has no time limit and only ties Mavix, to deliver. No setup
fee. Whatever is said about notice and cancellation must match section 16 and the actual
contract. If they disagree, the contract wins and the document changes.

## Step 7: build

Copy `sample_seo.py` and replace the content. Do not write CSS or chart code. The trust
sections need no new components: section 02 is `table` plus `alert`, section 08 is
`work_areas` plus a note, section 16 is `table` plus `two_col` plus `alert`, section 17 is
`close_page`. `pricing_seo` is retired: never call it in this document.

```bash
python3 build_proposal.py                                  # your copy of sample_seo.py
python3 build/check_pdf.py out/Client_SEO_Proposal.pdf 18  # must say ALL PASS
```

## Step 7b: the close page (section 17)

Title: "Your plan, and how to start." Built with `close_page`. It holds:

1. **The recommended plan of work for them, with no price**: the plan name, one line on what it
   is for them, three to five "every month" lines of work, and the guarantee in one line (Growth
   or Premium; if Starter is the recommendation, say it has no guarantee).
2. **The target we would agree in writing**, the same words as section 09, and how it is checked.
3. **The first three things we do**, specific to this prospect (from section 07).
4. **Two ways to move forward:** reply "yes" to the email and we send the plan and their
   personalised price, or book a 15-minute walkthrough at
   https://cal.id/mavixmarketing/strategy-call. Both are tappable links in the PDF.

Nothing else goes on this page. No price, no new information, no extra plans, no fine print.
`close_page` refuses a `close_price` key and any price in the plan lines.

## Step 8: check before showing anyone

1. **Run `python3 build/check_pdf.py <pdf> 18`. It must say ALL PASS.** Add `--old-terms` only
   for a prospect already given the old guarantee. It checks the page
   count, dashes, curly quotes, banned words, placeholders, prices, the old guarantee, the old team story, ranking
   promises, DIY fixes, cut pages, old terms, "monthly" used for a total, the cover chips, the
   AI fact sources, the case study URLs, the scope page and both links on the close page.
2. **Page count is 18** (cover + 17 sections). More means a section spilled. Cut copy, never
   type size.
3. Render every page to PNG and look at them. Look hardest at page 2, the scope page (section
   08) and the close page: nothing wraps badly, both links show, no price anywhere.
4. Every case study shows a real screenshot, names the client the way the website does,
   uses the website's numbers and timeframe, and carries its mavixmarketing.com URL. A total
   for a period is never called "monthly".
5. Testimonials: confirmed names only, and only a confirmed company or role. Mohammed Ahmed is
   "Business owner". Eight numbered FAQs filling the page, including "What does it cost?".
6. **Section 02 has an assumptions box**, and every estimated figure in the document appears
   in it. Nothing invented is presented as something the prospect said.
7. **Section 10 uses the company story below**, does not contain the banned agency sentence,
   and claims no client count, award or anything else not in the story.
8. **Section 05 uses only the two allowed AI facts**, each with its source, prints only what was
   actually checked, and promises no place in an AI answer.
9. **Section 08 lists all seven work areas**, each with what it means for them.
10. **Section 16 and the FAQs agree** on the terms: no long contract, no time limit, the
    agreement only ties Mavix.
11. **The guarantee is worded the same** in sections 01, 09, 15 and 17.
12. **The close page** shows the plan of work (no price), the target we would agree, three first steps,
    and both ways to move forward with working links.

## Who we are: the company story (section 10)

Use this, shortened to fit, and nothing beyond it. The facts come from
mavixmarketing.com (about page and home page, read on 23 October 2026), plus Farhan's confirmation of
Dubai and 30+ people. The full text is in the call kit's `references/facts.md`.

> Mavix Marketing is based in Dubai, with a team of 30+ people across Dubai, Los Angeles and
> New Delhi. Everyone who does the work is employed by Mavix, not subcontracted. We do SEO, paid
> ads and email, and have done since 2019. On search we are not a traditional SEO agency: we get
> businesses found on Google, Google Maps, and in AI answers such as Google's AI Overviews and
> ChatGPT. Every account has one named account manager for the day to day. Our founder, Mohd
> Farhan, takes the first call with every new client and joins every monthly review. Reports
> lead with enquiries, and every number comes from the client's own accounts.

Never write "small team", "Farhan runs your account himself" or "there is nobody behind him".
Never add a client count, a founding story, an award or an office the story does not name.

## Step 9: deliver

`SendUserFile` the PDF, then `device_commit_files` it to Farhan's Claude Proposal folder.
One line of summary, then print the outreach email in chat.

Tell Farhan in chat, every time, which lines in the document are commitments he now has to
keep: the response time, the target and the guarantee, the first three things on the close page, the
named account manager, and the handover. If any of them is not true yet, say so plainly before
he sends it. Then tell him which plan and which price (the current list, or the one already quoted) the prospect should get when they
reply "yes".

## Step 10: the outreach email

Plain text in chat only. **Never inside the PDF.** Four to six short lines.

1. An opening line specific to their business or market.
2. One pain point they feel.
3. One outcome, not a service list.
4. A soft ask to open the attached audit.
5. **The 15-minute walkthrough offer, once, with the link written out in full:** for example
   "If it's easier, I can walk you through it in 15 minutes:
   https://cal.id/mavixmarketing/strategy-call". Say it once only, and this is the only link in
   the email.
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

# Design and build specification

This file wins on layout, colour, type, format and build method. SKILL.md wins on what the
document says. There is no other design document, and no other section order.

## Build

**Output is a PDF built from HTML and CSS with WeasyPrint. Never a Word doc, never markdown,
never a bare HTML file.**

```bash
pip install weasyprint pdf2image pymupdf matplotlib --break-system-packages
```

Everything is already written. You do not author CSS or chart code. You write a content file
that imports the builders and calls them, exactly like the worked sample in this package.

```
build/mavix_css.py      the complete CSS as one constant. Do not fork it.
build/mavix_common.py   cover, contents, sections, all components, page builders
build/mavix_charts.py   the matplotlib chart functions
build/mavix_cases.py    the case-study page and the real-screenshot results panel
assets_b64.json         logos, stars, Google Partner, client logos, client photos
shots_b64.json          the real dashboard screenshots plus their exact figures
```

Poppins lives at `/usr/share/fonts/truetype/google-fonts/` and is already wired in.

## Brand

| Token | Hex | Use |
|---|---|---|---|
| `--ink` | `#0A0E27` | Text, dark panels, gradients |
| `--blue` | `#005AFF` | Primary. Headings accent, table headers, chart bars, CTAs |
| `--lime` | `#B4FF24` | Accent. Highlights, recommended badge, guarantee text, buttons |
| `--soft` | `#EEF3FF` | Soft panel backgrounds |
| `--border` | `#E4E8F0` | All hairline borders |
| `--grey` | `#5F6675` | Secondary text and labels |
| `--red` | `#E5484D` | Before / problem numbers only |
| `--redbg` | `#FDECEC` | Problem panel backgrounds |

Blue and lime are the only brand colours. Green and red are functional, never decorative.
Lime is a highlighter, used once or twice a page, never a large fill.

## Type

Body is **10.4pt**. This is deliberate and is not to be reduced. The whole document was
resized upward once because 9.4pt body with 7pt labels was unreadable for clients. **The
floor for any text a client reads is 8.4pt.** If a section will not fit, cut words, never
type size.

**Whitespace is part of the design.** Page margins are 16mm all round. Paragraph spacing,
card padding and list spacing are set generously on purpose. A page that fills to the bottom
edge reads as congested. Leaving the lower third of a page empty is correct and intended.

| Element | Size |
|---|---|
| Cover title | 42pt |
| Section H1 | 22pt |
| Section lead paragraph | 11pt |
| Body | 10.4pt |
| Small print, notes, card body | 8.8 to 9.2pt |
| Labels, kickers, tile captions | 8.0 to 8.4pt |

Chart labels are 9 to 11pt at dpi 200. Never smaller.

## The two signature devices

1. **The kicker row** at the top of every section: blue star, zero-padded number, short rule,
   uppercase label. Always present, always the same shape.
2. **The lime highlight underline** (`.hl`) on one phrase per page, never more than twice.

## Cover

Three zones, and the third is pinned to the bottom of the page, not floated in the middle.

- **Top:** white Mavix logo left, "MAVIX MARKETING" right.
- **Upper, directly under the logo:** lime eyebrow rule, two-tone title (bold plus a `.thin`
  weight-300 span), one-sentence subtitle. This block sits at the TOP of the page, not centred.
- **Bottom, absolutely positioned 18mm from the page edge:** "PREPARED FOR", client name,
  meta line, up to four service chips with the relevant ones marked `.on`, then the footer
  line (prepared by / "Checked on" date). No "valid 14 days": the audit is not a quote.

## Layout discipline

**Every content section is exactly one page.** After every build, render the pages and check
the page count equals the number of blocks (the cover is one block). The SEO audit is 18
pages: cover plus 17 sections. There is no contents page and no pricing page. If a section spills, cut copy. Do not
shrink type, and do not let a component split across a break.

Charts are height-capped. A single-chart page can use `.chart.big`.

## Components

Call these, do not rebuild them.

`kicker` `section` `pull` `neon` `stats` `chart` `table` `bullets` `two_col` `alert` `gantt`
`steps` `scorecards` `work_areas` `faqs` `cover` `who_we_are` `testimonials` `close_page`
`case_study`

Still in the code but not used by the SEO audit any more: `contents`, `benefit_cards`,
`next_steps`, `reporting`, `pricing_ads`, `pricing_seo`, `guarantee`, `scope_groups`.
`pricing_seo` must never be called: the audit carries no prices.

## The scope page (section 08)

`work_areas` builds "What we will work on": seven numbered rows in one bordered block, each
with a bold area name, one or two lines on what we do, and a green "For you:" line on what it
means for them. Under it, one small note: not included, and what we need from them. No prices,
no tier table.

## The close page

`close_page` builds the last page, "Your plan, and how to start", with **no price**: a dark hero
panel (plan name, one line on the plan and the guarantee with a lime shield on the left, an
"Every month" list of the work on the right), then two cards side by side (the 90-day target
we would agree on soft blue, the first three things as numbered rows), then "Two ways to move
forward" as two cards: a lime card with a "Reply yes" button (a mailto link; we send the plan
and the personalised price) and a blue-outlined card with a "Book a 15-minute walkthrough"
button linking to https://cal.id/mavixmarketing/strategy-call, with the short URL printed under
it so it still works on paper. Contact line underneath. `close_page` raises an error if it is
given a price.

Rules that were broken before and must not be broken again:

- **Testimonials are two per row, confirmed names only.** Four confirmed cards (2 by 2), or six
  when six are confirmed. Never three per row. Never a card that says "to confirm", and never a
  company or role that is not confirmed ("Business owner" when the company is unknown).
  `testimonials()` stops the build on a placeholder.
- **No prices anywhere in the SEO audit.**
- **FAQs are numbered and fill the page.** Eight questions, every one specific to this
  prospect's industry and situation. Never generic filler.
- **Icons are inline SVG in Mavix blue.** Emoji render tiny and misaligned in WeasyPrint.
- **The donut legend sits to the right of the chart** with the value and percentage on each
  row. Never a small legend underneath.
- **Pull quotes are centred, italic, unbolded**, with a small star above, one per section.
- **No pricing system at all in the SEO audit.** The price is sent after the yes.

## The results panel: never fabricate proof

The case-study results block is **always the real screenshot** from `shots_b64.json`, embedded
at full width and full height, exactly as provided.

**Never crop it. Never cap its height. Never scale it down to fit. Never recolour it, redraw it
in matplotlib, or replace it with a rendered panel.** A cropped or redrawn dashboard makes the
proof look faked, which is worse than having no case study at all. `.rp-shot img` is
`width:100%; height:auto` and must stay that way.

If a case-study page overflows, **cut the narrative copy**, never the image. Each of the six
narrative fields is one or two short sentences, about 30 words maximum, and each execution step
is a single line.

The four tiles above the screenshot are read from the manifest, which holds the exact figures
printed on that image. Never state a figure the screenshot does not show.

Available keys:

| Key | Platform | What it shows | Website case study |
|---|---|---|---|
| `g1` | Google Ads | 6.74 conv value / cost, 31.4K value, GBP 15.87 cost/conv, GBP 4.66K cost | no matching website case study yet, do not use as a case study |
| `g2` | Google Ads | GBP 0.57 CPC, GBP 19.21 cost/conv, 2.41K conversions, GBP 46.3K cost | Service business on Google Ads, 2.41K enquiries in one month, /case-studies/lead-gen-volume |
| `g3` | Google Ads | GBP 16.11 cost/conv, GBP 59.7K cost, 14.4M impressions, 188K clicks | no matching website case study yet, do not use as a case study |
| `g4` | Google Ads | 6.45 conv value / cost, 787.59 conversions, $4.77 cost/conv, 24.3K value | no matching website case study yet, do not use as a case study |
| `m1` | Meta | 526 website purchases at GBP 3.84, 361K reach | no matching website case study yet, do not use as a case study |
| `m2` | Meta | 2,631 on-Facebook leads at GBP 2.68, best ad set GBP 0.77 | Local services business on Meta Ads, 2,631 leads in one campaign, /case-studies/meta-lead-gen |
| `m3` | Meta | 1,181 add-to-carts at GBP 1.33, down from GBP 25.67 | no matching website case study yet, do not use as a case study |
| `seo1` | Search Console | 470K clicks, 21.3M impressions, 2.2% CTR, 8.8 avg position | Online home goods store, 470K clicks in 12 months, /case-studies/home-goods-retailer-seo |
| `seo2` | Search Console | 326K clicks, 9.77M impressions, 3.3% CTR, 19.2 avg position | HR software company, 326K clicks in 16 months, /case-studies/hr-software-seo |
| `seo3` | Search Console | 9.94K clicks, 406K impressions, 2.4% CTR, 14.0 avg position | Construction management firm, 9.94K clicks in seven months, /case-studies/construction-management-seo |

Search Console shots carry the red "traditional SEO" zone and the green "With Mavix AI
Optimize SEO" zone. Say so in the panel note.

## Honesty guardrails

- **No fabricated track record.** Not "150+ clients", not "$10M generated", not "over a
  decade". Use the company story in SKILL.md (Dubai, 30+ people employed by Mavix, since 2019,
  one named account manager, Farhan on the first call and every monthly review), the real logo
  wall and Google Partner. Never "small team".
- **Case studies are the real ones from mavixmarketing.com/case-studies**, three different
  industries, matched to the objection in the room. The client is named exactly the way the
  website names it, the numbers and timeframe are the website's, and the case study's URL is on
  the page and in the CTA. Never invent a client name, city, staff count, baseline number or
  execution detail. Where the website summary is thin, fetch the live case study page or write
  in general terms true of how Mavix works, with no invented numbers. Baseline chips carry only
  real figures; with none, pass `baseline=[]` and the chip row is left out.
- **Testimonial quotes you draft need the client's sign-off** before the document is sent.
- **Third-party data is labelled as such** until we have account access.

## Build and QA

```python
parts = [cover(P), s01, ..., s17]   # no contents page
HTML(string=build_html(CSS, parts, DOCTITLE)).write_pdf("Client_Type_Proposal.pdf")
```

Then, every time:

1. Run `python3 build/check_pdf.py <pdf> 18`. It must say ALL PASS (page count 18, no prices,
   no placeholders, no dashes or banned words, both close-page links, and the rest).
2. Render to PNG at dpi 85 and **actually look at every page**, hardest at page 2, the scope
   page and the close page.
3. Confirm every case study shows a real screenshot, not a chart.
4. Confirm testimonials are confirmed names and roles only, numbered FAQs fill the page, and
   the close page shows both links and no price.

File name: `[Client]_[Type]_Proposal.pdf`.

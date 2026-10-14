# MAVIX PROPOSAL — PDF DESIGN & BUILD SPECIFICATION
### The complete visual + technical guide for producing a Mavix Marketing proposal as a designed PDF

> **How to use this file.** Paste this document into Claude **alongside your existing Mavix Proposal (content) skill and the frontend-design skill.**
> - Your **content skill** decides *what the proposal says* (the 8-section argument, the client-specific data, the pricing logic).
> - **This spec** decides *how it looks and how it is built* — the PDF, the design system, the charts, the icons, the assets, and the three extra sections your content skill does not cover (Why Invest in SEO, Who We Are, What Our Clients Say).
> - When the two ever disagree on wording, the content skill wins on copy; **this spec always wins on layout, colour, type, format, and build method.**
>
> **Golden rule:** The deliverable is a **PDF built from HTML/CSS with WeasyPrint** — never a Word doc, never a markdown file, never a plain HTML artifact. PDF is the only format that holds this design perfectly on every device.

---

## TABLE OF CONTENTS
1. Output format & environment
2. Brand design system (the tokens)
3. Assets — the folder, and exactly how to handle each file
4. Page structure — the full section order
5. Components — the complete CSS + how to use each
6. Charts — the matplotlib specification + code
7. Icons — always SVG, never emoji
8. The three extra sections (full content + structure)
9. Copy & tone rules
10. Honesty guardrails (non-negotiable)
11. Build workflow + QA checklist
12. Notes, gotchas & the WeasyPrint quirk list

---

## 1. OUTPUT FORMAT & ENVIRONMENT

**Format:** A4/Letter PDF. Use **US Letter (8.5 × 11 in)**.

**Engine:** `WeasyPrint` (HTML + CSS → PDF). This gives full control: gradients, flexbox, custom fonts, background colours, rounded corners, two-column layouts, page numbering.

**Libraries & setup (install if missing):**
```bash
pip install weasyprint --break-system-packages
pip install pdf2image pillow --break-system-packages   # QA previews + asset prep
# matplotlib is used for charts
```

**Fonts:** **Poppins** for everything. It is already installed at
`/usr/share/fonts/truetype/google-fonts/` with weights:
`Poppins-Light.ttf` (300), `Poppins-Regular.ttf` (400), `Poppins-Medium.ttf` (500), `Poppins-Bold.ttf` (700).
Register it in CSS with `@font-face` (see §5) and in matplotlib with `font_manager` (see §6).

**Page rules (put these at the top of the CSS):**
```css
@page { size: Letter; margin: 0; }               /* used by the cover (full-bleed) */
@page content {                                   /* used by all content pages    */
  size: Letter; margin: 20mm 18mm 22mm 18mm;
  @bottom-left   { content:"MAVIX MARKETING"; font-family:'Poppins'; font-size:7pt; font-weight:700; letter-spacing:1.2px; color:#B4C0D4; }
  @bottom-center { content:"[CLIENT NAME]  \00B7  [PROPOSAL TYPE] Proposal"; font-family:'Poppins'; font-size:7pt; color:#B4C0D4; }
  @bottom-right  { content:counter(page); font-family:'Poppins'; font-size:7pt; font-weight:700; color:#005AFF; }
}
```
- The **cover** is a `<div class="cover">` on `page:blank` (an unnamed page = margin 0, no footer).
- **Every content section** is a `<div class="sec">` on `page:content`. Start each new section (except the first) with `class="sec newpage"` to force a page break.

---

## 2. BRAND DESIGN SYSTEM (THE TOKENS)

### Colour palette — use these hex values exactly
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A0E27` | Primary text, dark section backgrounds, dark gradients |
| `--blue` | `#005AFF` | **Mavix primary** — headings accents, table headers, step numbers, CTAs, chart bars |
| `--lime` | `#B4FF24` | **Mavix accent** — highlights, recommended badge, guarantee text, CTA button, star element |
| `--soft` | `#EEF3FF` | Soft-blue panel backgrounds (pull quotes, icon tiles, bonus cards) |
| `--bg` | `#F6F8FB` | Neutral section background if needed |
| `--border` | `#E4E8F0` | All hairline borders / card outlines |
| `--grey` | `#6B7280` | Secondary text, labels, captions |
| `--red` | `#E5484D` | Problem/alert accents, "current/bad" numbers |
| `--redbg` | `#FDECEC` | Problem/alert panel backgrounds |
| body text | `#2C3345` | Paragraph text (slightly softer than pure ink) |
| table text | `#333A4D` | Table cell text |

**Colour discipline:** blue and lime are the only brand colours. Lime is a *highlighter* — used sparingly (one accent per area). Never fill large areas with lime. Deep navy + electric blue carry the weight; lime is the spark.

### Typography scale (all Poppins)
| Element | Size | Weight | Notes |
|---|---|---|---|
| Cover title | 43pt | 700 | letter-spacing −1.4px, line-height 1.04; a `.thin` span uses weight 300 in `#C9D6F5` |
| Section H1 (`h1.sh`) | 22pt | 700 | letter-spacing −0.8px, line-height 1.12; `.accent` span = blue |
| Sub-head (`h2.sub`) | 12.5pt | 700 | letter-spacing −0.3px |
| Mini-head (`h3.mini`) | 9.6pt | 700 | |
| Body | 9.4pt | 400 | line-height 1.62, colour `#2C3345` |
| Kicker label | 7.8pt | 600 | uppercase, letter-spacing 2.5px, grey |
| Stat number (big) | 23pt | 700 | letter-spacing −1px |
| Footer | 7pt | 400/700 | grey; page number blue |

### The two signature devices (this is what makes it "Mavix")
1. **The kicker / eyebrow row** at the top of every section:
   `[small blue star]  02  —short line—  SECTION LABEL`
   It encodes the real running order of the argument. Always present, always the same shape.
2. **The lime highlight underline** (`.hl`) on one key phrase per page — a `linear-gradient(transparent 60%, rgba(180,255,36,0.55) 60%)` behind the words. Use it on the single most important sentence fragment on a page, never more than once or twice.

Plus the **navy→blue gradient cover** with a soft lime glow, and the **Mavix 4-point star** used small as a section marker and above centered pull-quotes.

---

## 3. ASSETS — THE FOLDER, AND HOW TO HANDLE EACH FILE

You will drop an **assets folder** into the working directory. Expect these files (names may vary slightly — match by meaning):

| File | What it is | How it is used |
|---|---|---|
| `white_logo.png` | Mavix "M" logo, white | Top-left of the **cover** (dark background) |
| `Blue_Logo.png` / `Black_Logo.png` / `Green_logo.png` | Mavix "M" logo variants | For light backgrounds if a logo is needed in-body |
| `star_branding_element_blue.png` | Mavix 4-point star, blue | Section kicker marker + above blue pull-quotes |
| `star_branding_element_green.png` | Mavix star, green | Cover eyebrow + above lime pull-quotes |
| `star_branding_element_black.png` | Mavix star, black | Reserve / dark-on-light contexts |
| `Google_Partner_picure.png` | Google Partner graphic | The Google Partner feature block in "Who We Are" |
| `client_logo_1..N.png` | **Real client logos** | The logo wall in "Who We Are" (this is the credibility proof) |
| `client_profile_picture_*.jpeg/png` | **Real client head-shots** | Testimonial avatars in "What Our Clients Say" |

> Client photo files are often **named with the person's real details**, e.g.
> `Jonathan_Jones___Carpenter_and_Paterson_Asia_Ltd_Sales_Director___profile_picture_1.jpeg`.
> **Parse the filename** to get the person's *name, title, and company* and use them verbatim under the testimonial.

### Prep rules (run once, before building)
- **Client logos → uniform white tiles.** Logos arrive at all shapes/backgrounds. Flatten each onto white, trim white margins, and centre it on a square white canvas with ~14% padding. This makes the logo wall look intentional even when source logos are messy.
- **Profile pictures → square, centre-cropped** (CSS then renders them as circles). EXIF-transpose first so phone photos aren't rotated.
- **Google Partner image →** flatten onto white, keep aspect ratio.
- **Logos & stars →** keep transparency (PNG).
- **Embed everything as base64 data-URIs** in the HTML so the PDF is self-contained and never has broken links.

**Prep code (reuse as-is):**
```python
from PIL import Image, ImageOps, ImageChops
import base64, os, json

UP = "PATH/TO/assets_folder"      # where the user's files are
AS = "assets"; os.makedirs(AS, exist_ok=True)

def flatten(im, bg=(255,255,255)):
    im = im.convert("RGBA"); c = Image.new("RGBA", im.size, bg+(255,)); c.alpha_composite(im); return c.convert("RGB")
def trim_white(im, t=245):
    g = im.convert("L"); bg = Image.new("L", g.size, 255)
    d = ImageChops.difference(g, bg); bb = d.point(lambda p: 255 if p>(255-t) else 0).getbbox(); return im.crop(bb) if bb else im
def logo_tile(src, out, pad=0.14, size=520):
    im = flatten(Image.open(src))
    if sum(im.getpixel((0,0)))/3 > 230: im = trim_white(im)
    w,h = im.size; s = (size*(1-2*pad))/max(w,h); nw,nh = int(w*s), int(h*s)
    im = im.resize((nw,nh), Image.LANCZOS); c = Image.new("RGB",(size,size),(255,255,255))
    c.paste(im, ((size-nw)//2,(size-nh)//2)); c.save(out, quality=92)
def circle_avatar(src, out, size=440):
    im = ImageOps.exif_transpose(Image.open(src).convert("RGB")); w,h = im.size; s = min(w,h)
    im.crop(((w-s)//2,(h-s)//2,(w-s)//2+s,(h-s)//2+s)).resize((size,size), Image.LANCZOS).save(out, quality=90)

# ...call logo_tile() for each client logo, circle_avatar() for each profile pic,
#    flatten() for google partner, copy logos/stars as-is, then base64-encode all into img_b64.json
```

**In the HTML**, reference images through a tiny helper: `img("logo_white.png")` returns the base64 string; use it in `src`.

---

## 4. PAGE STRUCTURE — THE FULL SECTION ORDER

Build the PDF in **exactly this order**. Sections 1–8 map to your content skill's 8-section argument; the **★ sections are new** and defined in §8 of this spec. (For an SEO proposal, drop any paid-ads pricing — keep one service's pricing per document; never show two pricing systems in one proposal.)

1. **Cover** (full-bleed gradient)
2. **01 · The Situation** — echo the prospect's pain; stat cards; a pull-quote
3. **02 · The Revenue Gap** — traffic bar chart + keyword ranking chart + lime pull-quote
4. **03 · The Opportunity** — 12-month projection line chart + stat cards
5. **★ Why Invest in SEO** — six benefit cards (see §8)
6. **04 · Competitor Analysis** — two-column Problem/Fix + competitor table + backlink donut + red alert
7. **05 · The Strategy** — Gantt timeline (3 phases) + numbered first-month step boxes
8. **06 · The Fix, Measured** — scorecard grid (current → target)
9. **★ Who We Are** — intro + Google Partner feature + honest credential circles + client logo wall (see §8)
10. **★ What Our Clients Say** — 3 testimonials with real photos/names/titles (see §8)
11. **07 · Your Investment** — pricing tiers (Tier 2 = recommended badge) + guarantee banner
12. **08 · Let's Begin** — confirm-and-start action block (NOT "book a call")

> Section numbering shown to the reader restarts cleanly (01…08) and the ★ sections get their own numbers in sequence — i.e., number every section 01, 02, 03… in the order above. Keep the kicker label descriptive ("WHY INVEST IN SEO", "WHO WE ARE", "WHAT CLIENTS SAY").

---

## 5. COMPONENTS — THE COMPLETE CSS + HOW TO USE EACH

Paste this **entire CSS block** into the `<style>` of the HTML. Every proposal uses it unchanged. Component-usage notes follow the code.

```css
@font-face { font-family:'Poppins'; font-weight:300; src:url('file:///usr/share/fonts/truetype/google-fonts/Poppins-Light.ttf'); }
@font-face { font-family:'Poppins'; font-weight:400; src:url('file:///usr/share/fonts/truetype/google-fonts/Poppins-Regular.ttf'); }
@font-face { font-family:'Poppins'; font-weight:500; src:url('file:///usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf'); }
@font-face { font-family:'Poppins'; font-weight:700; src:url('file:///usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf'); }

:root{ --ink:#0A0E27; --blue:#005AFF; --lime:#B4FF24; --soft:#EEF3FF; --bg:#F6F8FB;
  --border:#E4E8F0; --grey:#6B7280; --red:#E5484D; --redbg:#FDECEC; }

* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Poppins'; color:var(--ink); font-size:9.4pt; line-height:1.62; }
p { margin-bottom:8pt; color:#2C3345; }
strong { font-weight:700; color:var(--ink); }
.hl { background:linear-gradient(transparent 60%, rgba(180,255,36,0.55) 60%); padding:0 1px; font-weight:500; }

/* COVER */
.cover { page:blank; position:relative; width:100%; height:279.4mm;
  background:radial-gradient(120% 90% at 82% -8%, rgba(180,255,36,0.16) 0%, rgba(180,255,36,0) 42%),
    linear-gradient(158deg,#0A0E27 0%,#071A6E 46%,#005AFF 118%); color:white; overflow:hidden; }
.c-pad { position:absolute; inset:0; padding:26mm 22mm; display:flex; flex-direction:column; }
.c-top { display:flex; justify-content:space-between; align-items:center; }
.c-logo-img { height:30pt; }
.c-tag { font-size:7.5pt; font-weight:500; letter-spacing:2px; color:#9FB4E8; text-transform:uppercase; }
.c-mid { margin-top:auto; margin-bottom:auto; }
.c-eyebrow { display:inline-flex; align-items:center; gap:7pt; font-size:8pt; font-weight:600; letter-spacing:3.5px;
  text-transform:uppercase; color:var(--lime); padding:5pt 0; border-top:2px solid var(--lime);
  border-bottom:1px solid rgba(255,255,255,0.18); margin-bottom:18pt; }
.c-eyebrow img { height:11pt; }
.c-title { font-size:43pt; font-weight:700; line-height:1.04; letter-spacing:-1.4px; }
.c-title .thin { font-weight:300; color:#C9D6F5; }
.c-sub { margin-top:16pt; font-size:11pt; font-weight:300; color:#C9D6F5; max-width:132mm; line-height:1.55; }
.c-client { margin-top:30pt; padding-top:16pt; border-top:1px solid rgba(255,255,255,0.15); }
.c-client-lbl { font-size:7.5pt; font-weight:500; letter-spacing:2px; text-transform:uppercase; color:#8FA6DD; }
.c-client-name { font-size:20pt; font-weight:700; margin-top:3pt; letter-spacing:-0.4px; }
.c-client-meta { font-size:9pt; font-weight:300; color:#AFC0EC; margin-top:2pt; }
.c-services { display:flex; gap:8pt; margin-top:20pt; flex-wrap:wrap; }
.c-chip { font-size:8pt; font-weight:500; padding:6pt 13pt; border:1px solid rgba(255,255,255,0.25); border-radius:40px; color:#E5ECFB; }
.c-chip.on { background:var(--lime); color:var(--ink); border-color:var(--lime); font-weight:700; }
.c-foot { display:flex; justify-content:space-between; align-items:flex-end; font-size:8pt; color:#8FA6DD; }
.c-foot b { color:white; font-weight:500; }

/* SECTION SHELL */
.sec { page:content; }
.newpage { page-break-before:always; }
.kicker { display:flex; align-items:center; gap:9pt; margin-bottom:9pt; }
.kstar { height:9pt; }
.knum { font-size:8pt; font-weight:700; color:var(--blue); letter-spacing:1px; }
.kline { height:1px; width:22pt; background:var(--blue); opacity:0.4; }
.klabel { font-size:7.8pt; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:var(--grey); }
h1.sh { font-size:22pt; font-weight:700; letter-spacing:-0.8px; line-height:1.12; margin-bottom:11pt; }
h1.sh .accent { color:var(--blue); }
h2.sub { font-size:12.5pt; font-weight:700; margin:16pt 0 7pt; letter-spacing:-0.3px; }
h3.mini { font-size:9.6pt; font-weight:700; margin:11pt 0 4pt; }

/* PULL QUOTE — centered, italic, no bold (with a small star above) */
.pull { margin:16pt 0; padding:15pt 26pt; background:var(--soft); border-radius:12px; text-align:center; }
.pull .qstar { height:11pt; margin-bottom:7pt; opacity:0.9; }
.pull p { font-size:12pt; font-style:italic; font-weight:400; line-height:1.5; color:var(--ink); margin:0; }
.pull.lime { background:rgba(180,255,36,0.14); }

/* STAT CARDS */
.stats { display:flex; gap:9pt; margin:13pt 0; }
.stat { flex:1; background:white; border:1px solid var(--border); border-radius:12px; padding:13pt 12pt; }
.stat .big { font-size:23pt; font-weight:700; letter-spacing:-1px; line-height:1; color:var(--blue); }
.stat .big.ink{ color:var(--ink);} .stat .big.red{ color:var(--red);}
.stat .lbl { font-size:7.6pt; font-weight:500; color:var(--grey); margin-top:6pt; line-height:1.35; }

/* CIRCLE STATS (badges) */
.cstats { display:flex; gap:8pt; margin:14pt 0; }
.cstat { flex:1; text-align:center; }
.circle { width:56pt; height:56pt; border-radius:50%; margin:0 auto 7pt; display:flex; align-items:center; justify-content:center;
  font-size:13pt; font-weight:700; color:white; }
.circle.blue{ background:linear-gradient(150deg,#005AFF,#0736A8);}
.circle.ink{ background:linear-gradient(150deg,#141A3A,#0A0E27);}
.circle.lime{ background:var(--lime); color:var(--ink);}
.cstat .ct{ font-size:7.8pt; font-weight:500; color:var(--grey); line-height:1.4; }

/* CHART FRAME */
.chart { margin:12pt 0; padding:14pt 14pt 8pt; background:white; border:1px solid var(--border); border-radius:14px; }
.chart img { width:100%; display:block; }
.chart .ctitle { font-size:9.6pt; font-weight:700; margin-bottom:2pt; }
.chart .cnote { font-size:7.8pt; color:var(--grey); margin-bottom:8pt; }

/* TABLE */
table.tb { width:100%; border-collapse:collapse; margin:11pt 0; font-size:8.4pt; }
table.tb th { background:var(--ink); color:white; font-weight:600; text-align:left; padding:8pt 9pt; font-size:7.8pt; }
table.tb th:first-child{ border-radius:8px 0 0 0;} table.tb th:last-child{ border-radius:0 8px 0 0;}
table.tb td { padding:7pt 9pt; border-bottom:1px solid var(--border); color:#333A4D; vertical-align:top; line-height:1.4; }
table.tb tr:nth-child(even) td { background:#FAFBFD; }
.tag { display:inline-block; font-size:6.8pt; font-weight:700; padding:1.5pt 6pt; border-radius:20px; }
.tag.b{ background:var(--soft); color:var(--blue);} .tag.g{ background:rgba(180,255,36,0.25); color:#5A7A08;}

/* TWO-COLUMN PROBLEM / FIX */
.tcol { display:flex; gap:10pt; margin:12pt 0; }
.tcol .col { flex:1; border-radius:12px; padding:13pt 14pt; }
.tcol .prob { background:var(--redbg); border:1px solid #F5C9C9; }
.tcol .fix { background:rgba(180,255,36,0.12); border:1px solid #D9EEB0; }
.tcol h4 { font-size:8pt; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:7pt; }
.tcol .prob h4{ color:var(--red);} .tcol .fix h4{ color:#5A7A08;}
.tcol p { font-size:8.4pt; margin-bottom:5pt; line-height:1.45; }
.tcol p:last-child{ margin-bottom:0; }

/* RED ALERT */
.alert { display:flex; gap:11pt; align-items:flex-start; margin:12pt 0; padding:12pt 15pt; background:var(--redbg); border:1px solid #F3C4C4; border-radius:11px; }
.alert .ai { font-size:15pt; line-height:1; }
.alert .at { font-size:8.8pt; } .alert .at b { color:var(--red); }

/* ICON BULLETS (coloured squares) */
.ibul { list-style:none; margin:9pt 0; }
.ibul li { position:relative; padding-left:19pt; margin-bottom:7pt; font-size:8.8pt; line-height:1.5; color:#2C3345; }
.ibul li:before { content:''; position:absolute; left:0; top:4.5pt; width:8pt; height:8pt; border-radius:2.5px; background:var(--blue); }
.ibul.lime li:before{ background:var(--lime); }

/* GANTT TIMELINE */
.gantt { margin:13pt 0; }
.grow { display:flex; align-items:center; gap:10pt; margin-bottom:8pt; }
.glabel { width:88pt; font-size:8pt; font-weight:600; color:var(--ink); flex-shrink:0; }
.gtrack { flex:1; height:26pt; background:#EFF2F8; border-radius:7px; position:relative; overflow:hidden; }
.gbar { position:absolute; top:0; height:100%; border-radius:7px; display:flex; align-items:center; padding-left:11pt; font-size:7.4pt; font-weight:600; color:white; }
.gbar.p1{ left:0%; width:30%; background:linear-gradient(90deg,#0A0E27,#243056); }
.gbar.p2{ left:26%; width:46%; background:linear-gradient(90deg,#0736A8,#005AFF); }
.gbar.p3{ left:64%; width:36%; background:linear-gradient(90deg,#005AFF,#4D90FF); }
.gscale { display:flex; margin-left:98pt; margin-top:2pt; }
.gscale span { flex:1; font-size:6.8pt; color:var(--grey); text-align:center; }

/* NUMBERED STEP BOXES */
.steps { margin:12pt 0; }
.step { display:flex; gap:12pt; align-items:flex-start; padding:11pt 13pt; margin-bottom:8pt; background:white; border:1px solid var(--border); border-radius:11px; }
.step .sn { width:26pt; height:26pt; border-radius:8px; background:var(--ink); color:white; font-size:11pt; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.step .sc b { font-size:9.2pt; } .step .sc p { font-size:8.2pt; margin:2pt 0 0; color:var(--grey); line-height:1.45; }

/* SCORECARDS (current -> target grid) */
.scards { display:flex; flex-wrap:wrap; gap:8pt; margin:12pt 0; }
.scard { width:calc(33.33% - 5.5pt); background:white; border:1px solid var(--border); border-radius:11px; padding:11pt 12pt; }
.scard .sm { font-size:7.6pt; font-weight:600; color:var(--grey); text-transform:uppercase; letter-spacing:0.5px; }
.scard .srow { display:flex; align-items:baseline; gap:6pt; margin-top:5pt; }
.scard .cur { font-size:15pt; font-weight:700; color:var(--red); }
.scard .arr { font-size:9pt; color:var(--grey); }
.scard .tgt { font-size:15pt; font-weight:700; color:var(--blue); }
.scard .track { height:4pt; background:#EEF1F7; border-radius:3px; margin-top:8pt; overflow:hidden; }
.scard .fill { height:100%; background:linear-gradient(90deg,#005AFF,#B4FF24); border-radius:3px; }

/* BENEFIT CARDS (Why Invest in SEO) — icons are SVG, never emoji */
.bgrid { display:flex; flex-wrap:wrap; gap:9pt; margin:13pt 0; }
.bcard { width:calc(50% - 4.5pt); background:white; border:1px solid var(--border); border-radius:12px; padding:13pt 14pt; }
.bcard .bico { width:28pt; height:28pt; border-radius:9px; background:var(--soft); display:flex; align-items:center; justify-content:center; margin-bottom:9pt; }
.bcard .bico svg { width:15pt; height:15pt; }
.bcard .bstat { font-size:16pt; font-weight:700; color:var(--blue); letter-spacing:-0.5px; }
.bcard .blbl { font-size:7.6pt; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:var(--ink); margin:5pt 0 3pt; }
.bcard .btxt { font-size:8pt; color:var(--grey); line-height:1.45; margin:0; }

/* GOOGLE PARTNER FEATURE */
.gpwrap { display:flex; gap:14pt; align-items:center; margin:13pt 0; background:white; border:1px solid var(--border); border-radius:14px; padding:14pt; }
.gpwrap img { width:40%; border-radius:9px; }
.gpwrap .gpx b { font-size:11pt; }
.gpwrap .gpx p { font-size:8.6pt; color:#333A4D; margin:5pt 0 0; line-height:1.55; }

/* LOGO WALL */
.walltitle { font-size:8pt; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; color:var(--grey); margin:14pt 0 9pt; text-align:center; }
.wall { display:flex; gap:9pt; justify-content:center; }
.ltile { width:19%; aspect-ratio:1/1; background:white; border:1px solid var(--border); border-radius:12px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.ltile img { width:100%; height:100%; object-fit:contain; }

/* TESTIMONIALS */
.testi { display:flex; flex-direction:column; gap:11pt; margin:13pt 0; }
.tcard { background:white; border:1px solid var(--border); border-radius:14px; padding:15pt 16pt; display:flex; gap:14pt; align-items:flex-start; }
.tcard .av { width:52pt; height:52pt; border-radius:50%; object-fit:cover; flex-shrink:0; border:2.5px solid var(--soft); }
.tcard .tq { font-size:8.8pt; line-height:1.55; color:#333A4D; font-style:italic; margin:0 0 7pt; }
.tcard .tn { font-size:9pt; font-weight:700; color:var(--ink); }
.tcard .tr { font-size:7.6pt; color:var(--grey); }
.tstars { color:#F5B301; font-size:9pt; letter-spacing:1px; margin-bottom:5pt; }

/* PRICING */
.price { display:flex; gap:9pt; margin:13pt 0; align-items:stretch; }
.pc { flex:1; background:white; border:1px solid var(--border); border-radius:14px; padding:15pt 14pt; position:relative; }
.pc.reco { border:2px solid var(--blue); box-shadow:0 8px 24px rgba(0,90,255,0.13); }
.pc .badge { position:absolute; top:-9pt; left:50%; transform:translateX(-50%); background:var(--lime); color:var(--ink); font-size:6.8pt; font-weight:700; letter-spacing:1px; padding:3pt 11pt; border-radius:20px; text-transform:uppercase; white-space:nowrap; }
.pc .ptier { font-size:8pt; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--grey); }
.pc .pamt { font-size:24pt; font-weight:700; letter-spacing:-1px; margin-top:4pt; color:var(--ink); }
.pc.reco .pamt { color:var(--blue); }
.pc .pamt small { font-size:8.5pt; font-weight:500; color:var(--grey); }
.pc .pwas { font-size:8pt; color:var(--grey); text-decoration:line-through; margin-top:1pt; }
.pc .pdesc { font-size:7.8pt; color:#333A4D; margin-top:9pt; line-height:1.5; border-top:1px solid var(--border); padding-top:9pt; }

/* GUARANTEE BANNER */
.guar { margin:13pt 0; padding:15pt 18pt; border-radius:14px; background:linear-gradient(135deg,#0A0E27,#0736A8); color:white; display:flex; gap:14pt; align-items:center; }
.guar .gi { font-size:24pt; }
.guar .gt b { font-size:10.5pt; color:var(--lime); }
.guar .gt p { font-size:8.4pt; color:#D2DDF5; margin:3pt 0 0; line-height:1.5; }

/* FINAL ACTION BLOCK */
.cta { margin-top:16pt; padding:22pt; border-radius:16px; text-align:center;
  background:radial-gradient(120% 120% at 50% -20%, rgba(180,255,36,0.18), rgba(180,255,36,0) 55%), linear-gradient(150deg,#0A0E27,#071A6E 70%,#005AFF); color:white; }
.cta .cl { font-size:8pt; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:var(--lime); }
.cta .ch { font-size:18pt; font-weight:700; margin:6pt 0 4pt; letter-spacing:-0.4px; }
.cta .cp { font-size:9pt; color:#D2DDF5; max-width:118mm; margin:6pt auto 0; line-height:1.5; }
.cta .cbtn { display:inline-block; margin-top:13pt; background:var(--lime); color:var(--ink); font-size:10pt; font-weight:700; padding:10pt 30pt; border-radius:40px; }
.cta .cc { font-size:8pt; color:#B9C8EC; margin-top:12pt; }
```

**Component notes:**
- **Cover** — white Mavix logo top-left; green star in the eyebrow; two-tone title (bold + `.thin` weight-300 span); one-sentence subtitle; client block with name, meta line, and up-to-4 service chips (mark the relevant ones `.on` = lime). Footer line: "Prepared by [Name] · Mavix Marketing" left, date + "Valid 14 days" right.
- **Kicker** — start every section with it. Blue star + zero-padded number + line + uppercase label.
- **Pull quote** — centered, italic, **no bold inside it**, small star on top. Use one per section max, on the single sentence you want to land. (Blue star + `.soft` bg, or green star + `.lime` bg.)
- **Stat cards** — a row of 3–4. Numbers coloured blue by default; use `.ink` for neutral, `.red` for a "bad/current" number.
- **Circle stats** — for credential badges; alternate `.ink`, `.blue`, `.lime`.
- **Chart frame** — every matplotlib PNG sits in a `.chart` card with a bold title + grey note line.
- **Two-column Problem/Fix** — red panel (◆ header) on the left, lime panel (✓ header) on the right. Great for "the gap vs what we do."
- **Red alert** — single high-priority warning (e.g. spam backlinks, a broken title tag).
- **Gantt** — 3 phase bars (navy → blue → light-blue) across a month scale.
- **Step boxes** — numbered, for the first-month plan or the next-steps sequence.
- **Scorecards** — 6-up grid, each "current (red) → target (blue)" with a gradient progress bar.
- **Pricing** — 3 tiers side by side; the middle/recommended one gets `.reco` (blue outline + shadow) and a lime `.badge`. **One pricing system per proposal.**
- **Guarantee banner** — dark gradient, lime headline, the refund + $1,000 promise.
- **Final action block** — see §8/§9: confirm-and-start, not a call.

---

## 6. CHARTS — THE MATPLOTLIB SPECIFICATION + CODE

Charts are **real matplotlib PNGs embedded as images** — never fake CSS bars, never screenshots. Generate them first, then base64-embed inside `.chart` frames.

**Shared matplotlib config (always):**
```python
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt, matplotlib.font_manager as fm, numpy as np, os
FD = "/usr/share/fonts/truetype/google-fonts"
for f in ["Poppins-Regular.ttf","Poppins-Medium.ttf","Poppins-Bold.ttf","Poppins-Light.ttf"]:
    fm.fontManager.addfont(os.path.join(FD, f))
plt.rcParams["font.family"] = "Poppins"
BLUE="#005AFF"; LIME="#B4FF24"; NAVY="#0A0E27"; GREY="#C3C9D5"; MID="#8B93A7"; RED="#E5484D"
# save every chart with: transparent=True, bbox_inches="tight", dpi=200
```

**Styling rules that make charts look premium:**
- Hide the top/left/right spines; keep a faint bottom spine `#D6DBE6`.
- `tick_params(length=0)`; horizontal gridlines only, colour `#EDEFF5`.
- The client's own bar/point is **blue**; competitors/baseline are **grey** (`#C3C9D5`). Label the client bar "YOU".
- Value labels in bold navy directly on/above bars.
- Axis labels in mid-grey, small.
- DPI 200, transparent background (so the white `.chart` card shows through), tight bounding box.

**The four chart types (build whichever the data calls for):**
1. **Vertical bar — "you vs competitors"** (organic traffic, review counts). Client bar blue + "YOU", rest grey, value labels above.
2. **Line — "12-month projection"** (traffic Month 1→12). Blue line width ~3.2, rounded caps, light-blue fill under it (`alpha 0.08`), a highlighted end point, "Today" annotation at the start.
3. **Horizontal grouped bar — "keyword rankings"** (current vs target position). Grey = current, blue = target; label bars; x-axis "position (lower is better)"; use "50+" for anything not ranking; legend below.
4. **Donut — "backlink profile"** (quality / neutral / spam). `width=0.42`, white edge; blue = quality, grey = neutral, red = spam; big total number centred in the hole.

*(A scorecard visual is done in HTML — see `.scards` — not matplotlib.)*

**Every chart** gets a `.chart` frame: bold `.ctitle`, grey `.cnote` (source line), then the image.

---

## 7. ICONS — ALWAYS SVG, NEVER EMOJI

**Critical:** emoji (📈 🔍 🎯 …) render **tiny, monochrome, and misaligned** in WeasyPrint. **Never use emoji as UI icons.** Use **inline SVG line-icons** in Mavix blue. They render crisp, sized, and centred every time.

**Icon helper + the set used on the benefit cards:**
```python
def svg(paths):
    return (f'<svg viewBox="0 0 24 24" fill="none" stroke="#005AFF" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round">{paths}</svg>')

ICO = {
 "sales":      svg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>'),
 "traffic":    svg('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'),
 "visibility": svg('<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>'),
 "leads":      svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
 "cost":       svg('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
 "awareness":  svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
}
# render inside .bico: <div class="bico">{ICO['sales']}</div>
```
Sized by `.bcard .bico svg { width:15pt; height:15pt; }`. The tile is a 28pt soft-blue rounded square. Use the Mavix **star** PNG only for the kicker marker and pull-quote accents — everything else is SVG line-icons.

---

## 8. THE THREE EXTRA SECTIONS (full content + structure)

These are **not** in the content skill — define them here. Adapt copy to the client's industry, keep the structure.

### ★ WHY INVEST IN SEO
Purpose: sell the *category* before selling Mavix. Six benefit cards in a 2-column grid, each: SVG icon tile → big stat → uppercase label → one line.

Default six (soften stats to defensible phrasing; adapt to niche):
| Icon | Stat | Label | Line |
|---|---|---|---|
| sales | 96% | Sales | of shoppers say search influences their purchasing decisions. |
| traffic | Majority | Traffic | of all trackable website traffic starts with an organic search. |
| visibility | +70% | Visibility | average lift in brand visibility from consistent content optimisation. |
| leads | 57% | Leads | of B2B marketers say SEO drives more leads than any other channel. |
| cost | Lower | Cost Per Lead | SEO compounds — unlike paid ads, your cost per lead falls over time. |
| awareness | ~50% | Awareness | of searchers who see your brand in results will click through to it. |

Close with a centered italic pull-quote: *"There are thousands of people in [city/market] searching for [what they do] right now. The job is simply to make sure they find you."*

### ★ WHO WE ARE
Purpose: establish credibility **honestly** (see §10). Structure:
1. Kicker "WHO WE ARE" + two-part headline (e.g. *"A specialist team, working **directly with you.**"*).
2. One paragraph: what Mavix is, since **2019**, the industries served (home services, legal, fashion, e-commerce, B2B).
3. **Google Partner feature** (`.gpwrap`): the Google Partner image + a short blurb ("Google's official stamp on our expertise… direct support line to Google on your behalf").
4. One paragraph on the model: **deliberately lean — you work directly with the people doing the work, not junior account managers**; dedicated strategist; weekly plain-English reporting; month-to-month, no lock-in.
5. **Credential circles** (`.cstats`) — honest values only, e.g. `7yrs` (since 2019), `5` core industries, `1:1` direct access, `100%` transparent reporting.
6. **Logo wall** (`.wall`) of the **real client logos** with the caption "— A few of the brands we've partnered with —". *This is the real credibility engine.*

### ★ WHAT OUR CLIENTS SAY
Purpose: social proof. **At least 3 testimonials**, each a `.tcard`: circular avatar + 5 gold stars + italic quote + name (bold) + "Title, Company".
- Pull the **name / title / company from each photo's filename** and use them verbatim.
- Write each quote **tailored to that client's real business** (industrial B2B reads differently from an art shop).
- See §10 for the approval rule on testimonial wording.

---

## 9. COPY & TONE RULES

- **Headlines are two-part with a blue accent:** a plain line, then the punch in `.accent` blue. E.g. *"You have the reviews. **You're just invisible on Google.**"*
- **Lead with the prospect's pain**, in their words, before introducing Mavix.
- **Plain English, no jargon.** Translate technical findings into business consequences (e.g. "9.5s mobile load — most visitors leave before the page appears").
- **Pull quotes:** centered, italic, no bold, one per section, on the most important sentence.
- **One highlight** (`.hl` lime underline) per page, max.
- **The final section is an action, not a meeting.** Title it "Let's Begin"; the CTA is **confirm-and-start**: *"Confirm, and we start today."* with a button like `Reply "Let's go" to begin` and the client's email/phone. **Do not** write "book a call" or paste a Cal.com link in this design (that was the old style — this format replaces it).
- **One pricing system per proposal.** An SEO proposal shows SEO tiers only; never show SEO and Ads pricing together.
- **Numbers with meaning:** every stat should imply money or leads for this specific client.

---

## 10. HONESTY GUARDRAILS (NON-NEGOTIABLE)

These protect the client relationship and Mavix's reputation. Follow them even if asked otherwise; if the user insists, make the change only in an obvious, editable spot and flag it.

- **No fabricated track-record numbers.** Do **not** state "150+ clients", "50+ professionals", "$10M+ generated", or "over a decade" as fact — Mavix is a **lean team founded in 2019**. Use **real proof instead**: the actual client logos, Google Partner status, "7 years / since 2019", and the "you work directly with us" advantage. This is more convincing than inflated figures and can't be exposed by a prospect asking for references.
- **Real logos = real credibility.** The logo wall does the heavy lifting; lean on it.
- **Testimonials must be truthful.** Use the real client's name/title/company from the filename. If you draft the quote wording, treat it as a **draft to be approved by that client** before sending — tell the user to get a quick thumbs-up (or swap in the client's actual words). Never publish a glowing quote under a real person's name without their sign-off.
- **Case studies are the real ones from mavixmarketing.com/case-studies.** Name the client the way the website does, use the website's numbers and timeframe exactly, and put the case study URL on the page and in the CTA. Never invent a client name, city, staff count, baseline number or execution detail; where the website summary is thin, fetch the live page or write in general terms true of how Mavix works.

---

## 11. BUILD WORKFLOW + QA CHECKLIST

**Workflow:**
1. Read the client input + run the content skill to get the argument, data, and pricing.
2. Prep assets (§3) → base64 JSON.
3. Generate charts (§6) → base64.
4. Assemble the HTML (cover + sections in the §4 order) with the full CSS (§5), SVG icons (§7), and the three extra sections (§8).
5. `HTML(string=html).write_pdf("[Client]_[Type]_Proposal.pdf")`.
6. Render pages to PNG (`pdf2image`, dpi ~95) and **actually look at them**.

**QA checklist — verify before delivering:**
- [ ] Cover: white Mavix logo present, gradient clean, chips correct, client name/meta right.
- [ ] Every section has a kicker (star + number + label).
- [ ] Charts render (bars/points visible), sit in `.chart` frames, titles + source notes present.
- [ ] **Benefit-card icons are SVG line-icons in blue** — not tiny/black/missing (the emoji failure mode).
- [ ] Pull quotes are **centered, italic, un-bolded**, one per section, star on top.
- [ ] Logo wall: 5 uniform white tiles, logos contained and centred.
- [ ] Testimonials: 3+ cards, circular avatars, gold stars, real names/titles/companies from filenames.
- [ ] Pricing: 3 tiers, middle one has the lime "Recommended" badge + blue outline; **only one pricing system**.
- [ ] Guarantee banner present (refund + $1,000).
- [ ] Final block = confirm-and-start, **no "book a call"/Cal.com link**.
- [ ] Footer + page numbers on every content page; cover has none.
- [ ] No inflated client/team/revenue numbers (§10).
- [ ] Poppins throughout; colours match the palette exactly.

**Quick programmatic checks (optional but handy):** sample pixels in the benefit-card band for Mavix-blue strokes to confirm SVG icons rendered; scan the testimonials left strip for the avatar photos.

---

## 12. NOTES, GOTCHAS & THE WEASYPRINT QUIRK LIST

- **Emoji don't work** as icons → always SVG (see §7). This is the #1 thing that makes the PDF look broken.
- **Flexbox works** in WeasyPrint 60+; the layouts here rely on it. Grid is patchy — prefer flex + `calc()` widths (as in `.scard`, `.bcard`).
- **`aspect-ratio`** works for the logo tiles; if a build ever ignores it, set an explicit height.
- **Fonts:** if Poppins ever fails to load, the `@font-face` `file:///` paths are wrong — they must point at the installed TTFs.
- **Charts:** save `transparent=True` so they sit on the white `.chart` card; `dpi=200` keeps them crisp; `bbox_inches="tight"` avoids clipped labels.
- **Page breaks:** `class="sec newpage"` on every section after the first. If a section overflows, it flows to a second page — that's fine; keep related blocks together by not splitting a component across a manual break.
- **Self-contained output:** always base64-embed images so the PDF has no external dependencies.
- **File naming:** `"[Client]_[Type]_Proposal.pdf"` (e.g. `MagicMovers_SEO_Proposal.pdf`).

---

*End of specification. Pair this with the Mavix Proposal content skill and the frontend-design skill. Content skill = what it says; this spec = how it looks and how it's built. When in doubt on anything visual, this document is the source of truth.*

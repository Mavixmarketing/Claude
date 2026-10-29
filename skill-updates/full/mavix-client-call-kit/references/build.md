# Building the PDFs

Do not design a page from scratch and do not invent new styles. Everything in `assets/` already renders on brand and has been through the checks. Reuse it.

## What is in assets

| File | What it does |
|---|---|
| `render_lib.py` | The design system. Colours, fonts, the A4 `page()` wrapper, and about twenty ready-made components |
| `render.py` | HTML to PNG to PDF, plus the overflow check |
| `build_review_seo.py` | A finished 14-page SEO review, end to end. **Set `CAMPAIGN` at the top** (`usa_canada`, `aus_uk_nz_sing` or `ai_written`) so the pricing page shows that campaign's prices, and put any price already quoted to the prospect in `QUOTED` |
| `review_charts.py` | The chart builders that review uses |
| `case_content_seo.py` / `build_case_study_seo.py` | The nine SEO page layouts, with example content. **The example copy is retired invented content: reuse the layout, never the words.** Fill it from the live website case study page |
| `case_content_ads.py` / `build_case_study_ads.py` | The nine ads page layouts, with example content. **The example copy is retired invented content: reuse the layout, never the words.** Fill it from the live website case study page |
| `dashboards.py` | The real client dashboards, their exact figures, and the A4 results panel. Only seo1, seo2, seo3, g2 and m2 match a website case study; see `case-library.md` |
| `ads_shots_b64.json` / `seo_shots_b64.json` | The screenshots themselves |

Copy the pair that matches the service into your working folder, swap the content, keep the layout. The module names are importable as they are — do not rename them, the build scripts import each other by name.

**Never use the SEO case study builder for an ads client.** Its page list has a keyword page and a page-anatomy page baked in, and its cover contents list names them. Use `build_case_study_ads.py`.

## The shape of a build script

```python
import os, sys
sys.path.insert(0, "<path to assets>")
from render_lib import *          # palette, page(), components
from render import render, to_pdf, measure

ROOT = "/home/claude/kit-<client-slug>"
HTML, PNG = ROOT + "/html", ROOT + "/png"

PAGES = [("Cover", cover, True), ("Method", p_method, False), ...]

for i, (section, fn, is_cover) in enumerate(PAGES, 1):
    html = page(CLIENT_NAME, section, i, len(PAGES), fn(DATA), cover=is_cover)
    open(f"{HTML}/p{i:02d}.html", "w").write(html)

measure(HTML)                     # must report 0 overflowing
render(HTML, PNG)
to_pdf(PNG, ROOT + "/Mavix-SEO-Review-<Client>.pdf")
```

Each page function returns the inner HTML for one sheet. `page()` adds the frame, the running header, the page number and the footer.

## Components worth knowing

`callout(label, text)` · `cards(items)` · `steps(items)` · `table(cols, rows)` · `checks(items)` · `panels(...)` two columns · `dot(level)` a difficulty meter · `coverage_chart(...)` · `state_bars(rows)` before and after · `hub_map(centre, ring, note)` · `tree(root, groups)` · `page_anatomy(title, parts)` · `strip(title, items)` · `head_block(kicker, title, lede)`.

Read the top of `render_lib.py` for the exact signatures. If a page needs something genuinely new, write it in the same style — same type sizes, same hairline, same spacing rhythm.

## Putting a real dashboard on a page

```python
from dashboards import results_panel, manifest, keys
print(keys("ads"))        # ['g1','g2','g3','g4','m1','m2','m3']
print(manifest("m2"))     # the exact figures printed on that screen
inner = results_panel("m2", title="Meta Ads Manager, top three ad sets",
                      note="Straight from the client's account, untouched.",
                      highlight=2, service="ads")
```

Always pass `service=`. It throws rather than let a search dashboard into an ads kit. Never recreate, crop, recolour or redraw a screenshot, and never write a number that is not printed on it.

## The rules the design system enforces

- Light canvas only. Never a dark page.
- Poppins throughout. One Playfair Display italic accent per page, no more.
- Blue `#005AFF` for structure and emphasis, lime `#B4FF24` as a small accent only, ink `#101010` for headings, grey `#3A3F4A` for body, `#E4E8F0` for hairlines.
- Nothing below 20px. Small print at 17-18px is for labels and footers only.
- Every page needs one thing that carries it visually. A wall of paragraphs is a failed page.

## Before you call it done

1. `measure(HTML)` reports 0 overflowing. If not, cut copy — do not shrink type.
2. Open every rendered PNG and look at it. Clipping, lopsided boxes from short copy, a caption drifting from its chart. Fix and re-render.
3. Run the jargon scan in `checks.md`.
4. Page count matches the spec.

## Fonts

The renderer needs Poppins and Playfair Display available to Chromium. If a rendered page comes out in a fallback face, install them before shipping:

```bash
pip install --break-system-packages img2pdf pillow
apt-get install -y fonts-poppins 2>/dev/null || true
fc-list | grep -i -E "poppins|playfair"
```

If `fc-list` shows nothing, download both families from Google Fonts into `~/.fonts` and run `fc-cache -f`.

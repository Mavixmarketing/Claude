"""Case-study page builder.

Each case study is one full page with all 12 parts:
title, client overview, baseline, challenge, goals, strategy, execution,
timeline, obstacles, results, key takeaways, CTA.

THE RESULTS BLOCK IS ALWAYS THE REAL SCREENSHOT.
`shot` names one of the real dashboards in shots_b64.json:
  Google Ads  g1 g2 g3 g4
  Meta Ads    m1 m2 m3
  Search Console  seo1 seo2 seo3
The tiles above it are read from the manifest, which holds the exact figures
printed on that screenshot. Never recreate, crop, recolour or redraw a
dashboard, and never describe a number the screenshot does not show.
"""

import json, os
from mavix_common import esc, kicker, img

_HERE = os.path.dirname(os.path.abspath(__file__))
_S = json.load(open(os.path.join(os.path.dirname(_HERE), "shots_b64.json")))
SHOTS = _S["shots"]
MANIFEST = _S["manifest"]


def shot_tiles(key, highlight=0):
    """The four figures printed on that screenshot, straight from the manifest."""
    m = MANIFEST[key]
    out = ""
    for i, (v, l) in enumerate(m["tiles"]):
        tone = " lime" if i == highlight else ""
        out += (f'<div class="rp-tile"><div class="rv{tone}">{esc(v)}</div>'
                f'<div class="rl">{esc(l)}</div></div>')
    return out, m["platform"]


def _chips(items):
    # Only real figures go here (a starting point the website states, or a number
    # printed on the screenshot). With none, the chip row is left out entirely.
    if not items:
        return ""
    body = "".join(
        f'<div class="chip"><div class="cv">{esc(v)}</div>'
        f'<div class="cl">{esc(l)}</div></div>' for v, l in items)
    return f'<div class="chips">{body}</div>'


def _results(C):
    key = C["shot"]
    tiles, platform = shot_tiles(key, C.get("highlight", 0))
    return (f'<div class="rp"><div class="rp-top">'
            f'<div class="rpt">{esc(C["shot_title"])}</div>'
            f'<div class="rps">{esc(platform)}</div></div>'
            f'<div class="rp-tiles">{tiles}</div>'
            f'<div class="rp-shot"><img src="{SHOTS[key]}"></div>'
            f'<div class="rp-foot">{esc(C["shot_note"])}</div></div>')


def case_study(num, C):
    """Required keys: label, title, meta, challenge, goals, strategy,
    execution, timeline, obstacles, takeaways, shot, shot_title, shot_note,
    cta_head, cta_text, cta_btn.  Optional: highlight (tile index), baseline
    (real figures only; omit or [] to leave the chip row out).

    The case study is a real one from mavixmarketing.com/case-studies: name the
    client the way the website does, use its numbers and timeframe, and put its
    URL in `meta` and in the CTA."""
    exec_ol = "".join(f"<li>{esc(x)}</li>" for x in C["execution"])
    return f'''<div class="sec newpage">
{kicker(num, C["label"])}
<div class="cs-head">
  <div class="csl">Case study</div>
  <h2>{esc(C["title"])}</h2>
  <div class="csm">{esc(C["meta"])}</div>
</div>
{_chips(C.get("baseline"))}
<div class="cs-cols">
  <div class="cc">
    <h6>The challenge</h6><p>{esc(C["challenge"])}</p>
    <h6 class="later">Strategy</h6><p>{esc(C["strategy"])}</p>
    <h6 class="later">Execution</h6><ol>{exec_ol}</ol>
  </div>
  <div class="cc">
    <h6>Goals agreed at the start</h6><p>{esc(C["goals"])}</p>
    <h6 class="later">Timeline</h6><p>{esc(C["timeline"])}</p>
    <h6 class="later">What got in the way</h6><p>{esc(C["obstacles"])}</p>
    <h6 class="later">Why it worked</h6><p>{esc(C["takeaways"])}</p>
  </div>
</div>
{_results(C)}
<div class="cs-cta">
  <div><b>{esc(C["cta_head"])}</b><p>{esc(C["cta_text"])}</p></div>
  <div class="btn">{esc(C["cta_btn"])}</div>
</div>
</div>'''

# -*- coding: utf-8 -*-
"""The nine A4 pages of a Mavix paid ads case study, and the render pipeline.

Sibling of build_case_study_seo.py. Same shell, same components, same output.
The difference is what goes on the pages: no rankings, no keywords, no search
volume, no blogs, no links, no local pages, no map listings. Ads only.
"""
import os, sys, subprocess, shutil, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render_lib import *
from dashboards import results_panel
from case_content_ads import DOCS, ICON, CONTENTS

ROOT = os.environ.get("MAVIX_OUT") or os.path.join(tempfile.gettempdir(),
                                                   "mavix-ads-case-studies")
HTML = os.path.join(ROOT, "html"); PNG = os.path.join(ROOT, "png")
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
TOTAL = 9

SHAPE = f'''<svg width="300" height="196" viewBox="0 0 300 196" fill="none"
 style="position:absolute;right:-8px;bottom:158px;">
<rect x="10" y="96" width="230" height="34" rx="17" fill="{BLUE}" transform="rotate(-32 10 96)"/>
<rect x="72" y="138" width="230" height="34" rx="17" fill="{BLUE}" opacity=".45" transform="rotate(-32 72 138)"/>
<rect x="134" y="180" width="230" height="34" rx="17" fill="{LIME}" transform="rotate(-32 134 180)"/>
</svg>'''

# state_bars() carries a caption written for a search case study. The bars and
# the design are unchanged; only the sentence under them is put into ads words.
_SEO_NOTE = "The client is under NDA, so no traffic, ranking or revenue numbers are shown."
_ADS_NOTE = "The bars show where each piece of the account stood, not what it earned."


def account_bars(rows):
    return state_bars(rows).replace(_SEO_NOTE, _ADS_NOTE)


def stage_chart(labels, ylabel):
    """coverage_chart, with the same caption said the way the rest of the ads
    document says it. The chart itself is untouched."""
    return coverage_chart(labels, "Direction of travel", ylabel).replace(
        "The client is under NDA, so no figures are shown",
        "The client is under an agreement, so no figures are shown")


def cover(d):
    # Location only when the website case study states one. Never invent it.
    facts = [(k, v) for k, v in (("Client", d["name"]), ("Industry", d["industry"]),
             ("Location", d.get("country")), ("Service", d["service"])) if v]
    rows = "".join(
        f'<div style="display:flex;padding:19px 0;border-bottom:1px solid {HAIR};">'
        f'<div style="flex:0 0 210px;font-size:17px;font-weight:600;letter-spacing:2.4px;'
        f'text-transform:uppercase;color:{LABEL};padding-top:5px">{k}</div>'
        f'<div style="font-size:25px;font-weight:500;color:{INK};line-height:1.4">{v}</div></div>'
        for k, v in facts)
    toc = "".join(
        f'<div style="display:flex;gap:14px;font-size:20px;color:{BODY};align-items:baseline">'
        f'<span style="color:{BLUE};font-weight:700;flex:0 0 26px">{i+2:02d}</span>{t}</div>'
        for i, t in enumerate(CONTENTS))
    return f'''
<div style="display:flex;justify-content:space-between;align-items:baseline;
     padding-bottom:16px;border-bottom:1px solid {HAIR};">
  <div style="font-size:20px;font-weight:700;color:{INK};letter-spacing:3.4px;">MAVIX MARKETING</div>
  <div style="font-size:17px;font-weight:500;color:{LIGHT};letter-spacing:2.6px;">HONEST MARKETING, WITH RECEIPTS</div>
</div>
<div style="height:172px"></div>
<div style="font-size:20px;font-weight:600;color:{BLUE};letter-spacing:3.6px;">PAID ADS CASE STUDY
  <span style="display:block;width:52px;height:3px;background:{LIME};margin-top:14px"></span></div>
<h1 style="font-size:74px;font-weight:700;color:{INK};line-height:1.1;letter-spacing:-2px;
    margin-top:30px;max-width:1000px;">{d["cover_h"]}</h1>
<p style="font-size:26px;line-height:1.55;color:{BODY};margin-top:26px;max-width:880px;">{d["cover_sub"]}</p>
<div style="height:56px"></div>
<div style="max-width:900px;border-top:2px solid {INK};">{rows}</div>
<div style="height:56px"></div>
<div style="font-size:17px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;color:{LABEL};margin-bottom:16px">What is in this document</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:11px 44px;max-width:1010px">{toc}</div>
<div style="position:absolute;left:0;right:0;bottom:0;">
  <div style="border-top:1px solid {HAIR};padding-top:16px;display:flex;justify-content:space-between;">
    <div style="font-size:18px;color:{LABEL};">Prepared by Mavix Marketing</div>
    <div style="font-size:18px;color:{LIGHT};">Full case study: {d.get("url", "mavixmarketing.com/case-studies")}</div>
  </div>
</div>
{SHAPE}'''


def p_business(d):
    cds = [(ICON[i], t, b) for i, t, b in d["biz_cards"]]
    return (head_block(d["biz_kick"], d["biz_h"], d["biz_lede"])
            + f'<p class="body">{d["biz_body"]}</p><div class="gap-l"></div>'
            + cards(cds) + '<div class="gap"></div>'
            + callout(*d["biz_callout"]) + '<div class="gap-l"></div>'
            + strip(d["biz_strip"][0], d["biz_strip"][1], positive=False))


def p_goals(d):
    return (head_block(d["goal_kick"], d["goal_h"], d["goal_lede"])
            + '<div class="gap-l"></div>'
            + panels(d["goal_left"], d["goal_left_items"], d["goal_right"], d["goal_right_items"])
            + '<div class="gap"></div>' + callout(*d["goal_callout"], blue=True)
            + '<div class="gap-l"></div>'
            + strip(d["goal_strip"][0], d["goal_strip"][1]))


def p_money(d):
    return (head_block(d["money_kick"], d["money_h"], d["money_lede"])
            + '<div class="gap"></div>'
            + table(d["money_cols"], d["money_rows"], widths=["33%","17%","50%"])
            + '<div class="gap"></div>' + callout(*d["money_callout"])
            + '<div class="gap-l"></div>'
            + strip(d["money_strip"][0], d["money_strip"][1], positive=False))


def p_plan(d):
    return (head_block(d["plan_kick"], d["plan_h"], d["plan_lede"])
            + '<div class="gap"></div>' + steps(d["plan_steps"])
            + '<div class="gap-l"></div>'
            + stage_chart(d["plan_chart"], d["plan_ylabel"]))


def p_audience(d):
    return (head_block(d["aud_kick"], d["aud_h"], d["aud_lede"])
            + '<div class="gap"></div>'
            + table(d["aud_cols"], d["aud_rows"], widths=["30%","36%","34%"])
            + '<div class="gap"></div>' + callout(*d["aud_callout"], blue=True)
            + '<div class="gap-l"></div>'
            + strip(d["aud_strip"][0], d["aud_strip"][1], positive=False))


def p_landing(d):
    return (head_block(d["land_kick"], d["land_h"], d["land_lede"])
            + '<div class="gap"></div>'
            + f'<h2 class="sub"><span>01</span>{d["land_sub1"]}</h2>'
            + page_anatomy(d["land_anat_title"], d["land_anat"])
            + '<div class="gap"></div>'
            + f'<h2 class="sub"><span>02</span>{d["land_sub"]}</h2>'
            + checks(d["land_checks"]) + '<div class="gap-l"></div>'
            + callout(*d["land_callout"], blue=True))


def p_account(d):
    return (head_block(d["acct_kick"], d["acct_h"], d["acct_lede"])
            + '<div class="gap"></div>' + account_bars(d["acct_bars"])
            + '<div class="gap"></div>'
            + f'<h2 class="sub">{d["acct_sub"]}</h2>'
            + checks(d["acct_checks"]) + '<div class="gap-l"></div>'
            + callout(*d["acct_callout"], blue=True))


def p_results(d):
    return (head_block(d["res_kick"], d["res_h"], d["res_lede"])
            + '<div class="gap"></div>'
            + results_panel(d["res_shot"], d["res_shot_title"], d["res_shot_note"],
                            "ads", highlight=d["res_highlight"])
            + '<div class="gap"></div>' + callout(*d["res_callout"], blue=True)
            + '<div class="gap"></div>' + nextline(d["res_next"]))


PAGES = [
    ("Cover", cover, True),
    ("The client", p_business, False),
    ("Goals and objectives", p_goals, False),
    ("What the money was doing", p_money, False),
    ("What we changed, stage by stage", p_plan, False),
    ("The audiences and the offer", p_audience, False),
    ("Where the click landed", p_landing, False),
    ("The account, before and after", p_account, False),
    ("Results", p_results, False),
]


def build(d):
    slug = d["file"]
    hd = os.path.join(HTML, slug); pd = os.path.join(PNG, slug)
    for p in (hd, pd):
        shutil.rmtree(p, ignore_errors=True); os.makedirs(p)
    for i, (sec, fn, is_cover) in enumerate(PAGES, 1):
        html = page(d["name"], sec, i, TOTAL, fn(d), cover=is_cover)
        open(os.path.join(hd, f"p{i:02d}.html"), "w").write(html)
    return hd, pd


def render(hd, pd):
    files = sorted(f for f in os.listdir(hd) if f.endswith(".html"))
    for f in files:
        out = os.path.join(pd, f.replace(".html", ".png"))
        subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-sandbox",
                        "--hide-scrollbars", "--force-device-scale-factor=2",
                        "--window-size=1240,1754", f"--screenshot={out}",
                        "--default-background-color=FFFFFFFF",
                        "file://" + os.path.join(hd, f)],
                       check=True, capture_output=True)


def to_pdf(pd, slug):
    import img2pdf
    pngs = [os.path.join(pd, f) for f in sorted(os.listdir(pd)) if f.endswith(".png")]
    # A4 at 300dpi
    layout = img2pdf.get_layout_fun((img2pdf.mm_to_pt(210), img2pdf.mm_to_pt(297)))
    out = os.path.join(ROOT, slug + ".pdf")
    with open(out, "wb") as f:
        f.write(img2pdf.convert(pngs, layout_fun=layout))
    return out


if __name__ == "__main__":
    only = sys.argv[1] if len(sys.argv) > 1 else None
    for d in DOCS:
        if only and only not in d["file"]:
            continue
        hd, pd = build(d)
        render(hd, pd)
        p = to_pdf(pd, d["file"])
        print("built", p)

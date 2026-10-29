# -*- coding: utf-8 -*-
import os, sys, subprocess, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render_lib import *
from case_content_seo import DOCS, ICON, CONTENTS

ROOT = os.path.dirname(os.path.abspath(__file__))  # point at your output folder
HTML = os.path.join(ROOT, "html"); PNG = os.path.join(ROOT, "png")
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
TOTAL = 9

SHAPE = f'''<svg width="300" height="196" viewBox="0 0 300 196" fill="none"
 style="position:absolute;right:-8px;bottom:158px;">
<rect x="10" y="96" width="230" height="34" rx="17" fill="{BLUE}" transform="rotate(-32 10 96)"/>
<rect x="72" y="138" width="230" height="34" rx="17" fill="{BLUE}" opacity=".45" transform="rotate(-32 72 138)"/>
<rect x="134" y="180" width="230" height="34" rx="17" fill="{LIME}" transform="rotate(-32 134 180)"/>
</svg>'''


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
<div style="font-size:20px;font-weight:600;color:{BLUE};letter-spacing:3.6px;">SEO CASE STUDY
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
            + strip(d["goal_strip"][0], d["goal_strip"][1], positive=False))


def p_comp(d):
    rows = []
    for r in d["comp_rows"]:
        if r[0] == "__ME__":
            rows.append(["__ME__", r[1]] + [dot(x) for x in r[2:]])
        else:
            rows.append([r[0]] + [dot(x) for x in r[1:]])
    leg = (f'<div class="legend"><span>{dot(3)} Strong</span><span>{dot(2)} Some</span>'
           f'<span>{dot(1)} Little or none</span>'
           f'<span style="color:{LIGHT}">Our own read of the four sites, not a score from a tool.</span></div>')
    return (head_block(d["comp_kick"], d["comp_h"], d["comp_lede"])
            + '<div class="gap"></div>'
            + table(d["comp_cols"], rows, widths=["31%","17%","17%","17%","18%"]) + leg
            + '<div class="gap"></div>' + callout(*d["comp_callout"])
            + '<div class="gap-l"></div>'
            + strip(d["comp_strip"][0], d["comp_strip"][1]))


def p_plan(d):
    return (head_block(d["plan_kick"], d["plan_h"])
            + '<div class="gap"></div>' + steps(d["plan_steps"])
            + '<div class="gap-l"></div>'
            + coverage_chart(d["plan_chart"], "Direction of travel",
                             d["plan_ylabel"]))


def p_keywords(d):
    return (head_block(d["kw_kick"], d["kw_h"], d["kw_lede"])
            + '<div class="gap"></div>'
            + table(d["kw_cols"], d["kw_rows"], widths=["27%","21%","52%"])
            + '<div class="gap-l"></div>'
            + f'<h2 class="sub"><span>02</span>The shape the site was rebuilt into</h2>'
            + tree(d["kw_tree_root"], d["kw_tree"]))


def p_onpage(d):
    return (head_block(d["op_kick"], d["op_h"], d["op_lede"])
            + '<div class="gap"></div>'
            + f'<h2 class="sub"><span>03</span>What went on a page, and why</h2>'
            + page_anatomy(d["op_anat_title"], d["op_anat"])
            + '<div class="gap"></div>'
            + f'<h2 class="sub"><span>04</span>Done on every page that matters</h2>'
            + checks(d["op_checks"]) + '<div class="gap-l"></div>'
            + callout(*d["op_callout"], blue=True))


def p_local(d):
    return (head_block(d["loc_kick"], d["loc_h"], d["loc_lede"])
            + '<div class="gap-s"></div>' + hub_map(d["loc_hub"], d["loc_ring"], d["loc_note"])
            + '<div class="gap"></div>'
            + panels(d["loc_left"], d["loc_left_items"], d["loc_right"], d["loc_right_items"],
                     numbered=False)
            + '<div class="gap-l"></div>'
            + strip(d["loc_links"][0], d["loc_links"][1]))


def p_results(d):
    return (head_block(d["res_kick"], d["res_h"], d["res_lede"])
            + '<div class="gap"></div>' + state_bars(d["res_bars"])
            + '<div class="gap"></div>'
            + f'<h2 class="sub">What that means for the owner</h2>'
            + checks(d["res_mean"]) + '<div class="gap"></div>'
            + callout(*d["res_callout"], blue=True) + '<div class="gap"></div>'
            + nextline(d["res_next"]))


PAGES = [
    ("Cover", cover, True),
    ("The client", p_business, False),
    ("Goals and objectives", p_goals, False),
    ("Main competitors", p_comp, False),
    ("The work, stage by stage", p_plan, False),
    ("Keywords and site structure", p_keywords, False),
    ("On page and service pages", p_onpage, False),
    ("Local pages and map listings", p_local, False),
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

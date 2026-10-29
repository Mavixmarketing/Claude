# -*- coding: utf-8 -*-
"""A4 document components for the Mavix SEO case studies.
Palette and fonts from mavix-visual-design. Layout is document, not slide."""

import os as _os
_FONTS = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fonts")
if not _os.path.isdir(_FONTS):
    _FONTS = _os.path.expanduser("~/.fonts")
_FURL = "file://" + _FONTS

BLUE   = "#005AFF"
LIME   = "#B4FF24"
INK    = "#101010"
BODY   = "#3A3F4A"
LABEL  = "#5F6675"
LIGHT  = "#9AA1AE"
HAIR   = "#E4E8F0"
WASH   = "#F7F9FC"

CSS = """
@font-face{font-family:'Poppins';src:url('__FURL__/Poppins-Light.ttf');font-weight:300;}
@font-face{font-family:'Poppins';src:url('__FURL__/Poppins-Regular.ttf');font-weight:400;}
@font-face{font-family:'Poppins';src:url('__FURL__/Poppins-Medium.ttf');font-weight:500;}
@font-face{font-family:'Poppins';src:url('__FURL__/Poppins-SemiBold.ttf');font-weight:600;}
@font-face{font-family:'Poppins';src:url('__FURL__/Poppins-Bold.ttf');font-weight:700;}
@font-face{font-family:'Poppins';src:url('__FURL__/Poppins-ExtraBold.ttf');font-weight:800;}
@font-face{font-family:'Playfair Display';src:url('__FURL__/PlayfairDisplay-Italic.ttf');font-style:italic;font-weight:500;}

*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:1240px;height:1754px;}
body{font-family:'Poppins',sans-serif;background:#FFFFFF;color:__BODY__;
     -webkit-font-smoothing:antialiased;}
.page{position:relative;width:1240px;height:1754px;overflow:hidden;background:#FFFFFF;}
.inner{position:absolute;left:96px;right:96px;top:78px;bottom:96px;}

/* header */
.phead{display:flex;justify-content:space-between;align-items:baseline;
       padding-bottom:16px;border-bottom:1px solid __HAIR__;}
.phead .l{font-size:19px;font-weight:600;color:__INK__;letter-spacing:.2px;}
.phead .r{font-size:17px;font-weight:500;color:__LIGHT__;letter-spacing:2.4px;text-transform:uppercase;}

/* footer */
.pfoot{position:absolute;left:96px;right:96px;bottom:52px;display:flex;
       justify-content:space-between;align-items:center;
       padding-top:14px;border-top:1px solid __HAIR__;}
.pfoot .l{font-size:17px;color:__LIGHT__;font-weight:400;}
.pfoot .r{font-size:17px;color:__LIGHT__;font-weight:500;}

/* type */
.kick{font-size:19px;font-weight:600;color:__BLUE__;letter-spacing:3.2px;
      text-transform:uppercase;margin-top:52px;}
.kick .rule{display:block;width:46px;height:3px;background:__LIME__;margin-top:12px;}
h1.sec{font-size:52px;font-weight:700;color:__INK__;line-height:1.14;
       letter-spacing:-1.2px;margin-top:22px;max-width:960px;}
h1 em{font-family:'Playfair Display',serif;font-style:italic;font-weight:500;
          color:__BLUE__;letter-spacing:-.5px;}
p.lede{font-size:26px;line-height:1.56;color:__BODY__;margin-top:22px;max-width:940px;font-weight:400;}
p.body{font-size:24px;line-height:1.6;color:__BODY__;margin-top:16px;max-width:940px;}
h2.sub{font-size:26px;font-weight:600;color:__INK__;letter-spacing:-.3px;margin-bottom:18px;}
h2.sub span{color:__BLUE__;font-weight:600;margin-right:10px;}
.gap{height:38px;}
.gap-s{height:24px;}
.gap-l{height:52px;}

/* callout */
.callout{background:__WASH__;border-left:6px solid __LIME__;border-radius:0 12px 12px 0;
         padding:28px 34px;}
.callout .cl{font-size:16px;font-weight:600;letter-spacing:2.6px;text-transform:uppercase;
             color:__LABEL__;margin-bottom:10px;}
.callout .ct{font-size:27px;line-height:1.42;color:__INK__;font-weight:500;letter-spacing:-.3px;}
.callout.blue{border-left-color:__BLUE__;}

/* cards */
.cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.card{border:1px solid __HAIR__;border-radius:14px;padding:26px 28px;background:#fff;}
.card .ct{font-size:23px;font-weight:600;color:__INK__;margin-bottom:8px;letter-spacing:-.2px;}
.card .cb{font-size:21px;line-height:1.5;color:__BODY__;}
.card .ic{width:44px;height:44px;border-radius:11px;background:#EEF3FF;
          display:flex;align-items:center;justify-content:center;margin-bottom:16px;}

/* numbered steps */
.steps{display:grid;grid-template-columns:1fr 1fr;gap:18px 26px;}
.step{display:flex;gap:18px;align-items:flex-start;}
.step .n{flex:0 0 46px;width:46px;height:46px;border-radius:50%;background:__BLUE__;
         color:#fff;font-size:21px;font-weight:700;display:flex;align-items:center;
         justify-content:center;}
.step .n.g{background:#fff;border:2px solid __HAIR__;color:__LABEL__;}
.step .st{font-size:22px;font-weight:600;color:__INK__;line-height:1.3;letter-spacing:-.2px;}
.step .sd{font-size:19px;line-height:1.46;color:__BODY__;margin-top:5px;}

/* tables */
table.t col.w1{width:27%;}table.t col.w2{width:20%;}
table.t{width:100%;border-collapse:collapse;}
table.t th{font-size:16px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;
           color:__LABEL__;text-align:left;padding:0 14px 12px 0;border-bottom:2px solid __INK__;}
table.t td{font-size:22px;color:__BODY__;padding:17px 14px 17px 0;
           border-bottom:1px solid __HAIR__;vertical-align:top;line-height:1.4;}
table.t td.k{color:__INK__;font-weight:500;}
table.t td.b{color:__BLUE__;font-weight:500;}
table.t tr.me td{background:#F4F8FF;}
table.t tr.me td.k{font-weight:700;}
table.t td:first-child,table.t th:first-child{padding-left:14px;}

/* check rows */
.checks{display:grid;grid-template-columns:1fr 1fr;gap:14px 30px;}
.chk{display:flex;gap:14px;align-items:flex-start;font-size:22px;line-height:1.42;color:__BODY__;}
.chk .tick{flex:0 0 26px;margin-top:2px;}

/* two panels */
.panels{display:grid;grid-template-columns:1fr 1fr;gap:26px;}
.panel{border:1px solid __HAIR__;border-radius:14px;overflow:hidden;}
.panel .ph{font-size:17px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;
           padding:16px 24px;color:#fff;background:__INK__;}
.panel.b .ph{background:__BLUE__;}
.panel .pb{padding:20px 24px 24px;}
.panel .row{display:flex;gap:13px;font-size:21px;line-height:1.45;color:__BODY__;
            padding:11px 0;border-bottom:1px solid __HAIR__;}
.panel .row:last-child{border-bottom:none;}
.panel .row b{color:__BLUE__;font-weight:700;flex:0 0 22px;}

/* legend */
.legend{display:flex;gap:34px;margin-top:16px;font-size:18px;color:__LABEL__;align-items:center;}
.legend span{display:flex;gap:9px;align-items:center;}
"""
CSS = (CSS.replace("__FURL__", _FURL).replace("__BLUE__", BLUE).replace("__LIME__", LIME).replace("__INK__", INK)
          .replace("__BODY__", BODY).replace("__LABEL__", LABEL).replace("__LIGHT__", LIGHT)
          .replace("__HAIR__", HAIR).replace("__WASH__", WASH))


# --------------------------------------------------------------------- pieces
def tick(color=BLUE):
    return (f'<svg class="tick" width="26" height="26" viewBox="0 0 26 26" fill="none">'
            f'<circle cx="13" cy="13" r="12" stroke="{color}" stroke-width="2"/>'
            f'<path d="M7.5 13.2l3.6 3.6 7.4-7.6" stroke="{color}" stroke-width="2.4" '
            f'stroke-linecap="round" stroke-linejoin="round"/></svg>')

def cross():
    return ('<svg class="tick" width="26" height="26" viewBox="0 0 26 26" fill="none">'
            f'<circle cx="13" cy="13" r="12" stroke="{LIGHT}" stroke-width="2"/>'
            f'<path d="M9 13h8" stroke="{LIGHT}" stroke-width="2.4" stroke-linecap="round"/></svg>')

def callout(label, text, blue=False):
    cls = "callout blue" if blue else "callout"
    return (f'<div class="{cls}"><div class="cl">{label}</div>'
            f'<div class="ct">{text}</div></div>')

def cards(items):
    out = ['<div class="cards">']
    for ic, t, b in items:
        out.append(f'<div class="card"><div class="ic">{ic}</div>'
                   f'<div class="ct">{t}</div><div class="cb">{b}</div></div>')
    out.append('</div>')
    return "".join(out)

def steps(items, start=1, grey_from=None):
    out = ['<div class="steps">']
    for i, (t, d) in enumerate(items):
        n = start + i
        g = " g" if (grey_from is not None and n >= grey_from) else ""
        out.append(f'<div class="step"><div class="n{g}">{n}</div><div>'
                   f'<div class="st">{t}</div><div class="sd">{d}</div></div></div>')
    out.append('</div>')
    return "".join(out)

def table(cols, rows, cls="", widths=None):
    out = [f'<table class="t {cls}">']
    if widths:
        out.append("<colgroup>" + "".join(f'<col style="width:{w}">' for w in widths) + "</colgroup>")
    out.append('<tr>')
    for c in cols:
        out.append(f'<th>{c}</th>')
    out.append('</tr>')
    for r in rows:
        tr = '<tr class="me">' if r[0] == "__ME__" else '<tr>'
        cells = r[1:] if r[0] == "__ME__" else r
        out.append(tr)
        for j, c in enumerate(cells):
            k = ' class="k"' if j == 0 else ''
            out.append(f'<td{k}>{c}</td>')
        out.append('</tr>')
    out.append('</table>')
    return "".join(out)

def dot(level):
    """level: 3 strong, 2 mixed, 1 weak. Qualitative judgement, no numbers."""
    fill = {3: BLUE, 2: "#9FC2FF", 1: HAIR}[level]
    return (f'<svg width="70" height="16" viewBox="0 0 70 16">'
            + "".join(f'<circle cx="{9+i*22}" cy="8" r="7" fill="'
                      + (fill if i < level else HAIR) + '"/>' for i in range(3))
            + '</svg>')

def checks(items, color=BLUE):
    out = ['<div class="checks">']
    for it in items:
        out.append(f'<div class="chk">{tick(color)}<div>{it}</div></div>')
    out.append('</div>')
    return "".join(out)

def panels(lt, litems, rt, ritems, numbered=True):
    def body(items):
        rs = []
        for i, it in enumerate(items):
            b = f'<b>{i+1}</b>' if numbered else ''
            rs.append(f'<div class="row">{b}<div>{it}</div></div>')
        return "".join(rs)
    return ('<div class="panels">'
            f'<div class="panel"><div class="ph">{lt}</div><div class="pb">{body(litems)}</div></div>'
            f'<div class="panel b"><div class="ph">{rt}</div><div class="pb">{body(ritems)}</div></div>'
            '</div>')


# --------------------------------------------------------------------- charts
def coverage_chart(stage_labels, title, ylabel):
    """Schematic step chart. Direction only, no values, no axis numbers."""
    W, H = 1048, 470
    pl, pr, pt, pb = 28, 12, 24, 98
    iw, ih = W - pl - pr, H - pt - pb
    n = len(stage_labels)
    bw = iw / n
    s = ['<svg width="%d" height="%d" viewBox="0 0 %d %d" fill="none">' % (W, H, W, H)]
    s.append(f'<line x1="{pl}" y1="{pt+ih}" x2="{W-pr}" y2="{pt+ih}" stroke="{INK}" stroke-width="2"/>')
    pts = []
    for i in range(n):
        h = ih * (0.17 + 0.83 * ((i + 1) / n) ** 0.82)
        x = pl + i * bw + bw * 0.18
        w = bw * 0.64
        y = pt + ih - h
        col = BLUE if i == n - 1 else "#CBDCFF"
        s.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="5" fill="{col}"/>')
        pts.append((x + w / 2, y))
    d = " ".join(("M" if i == 0 else "L") + f"{p[0]:.1f} {p[1]:.1f}" for i, p in enumerate(pts))
    s.append(f'<path d="{d}" stroke="{INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    for p in pts:
        s.append(f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="6.5" fill="#fff" stroke="{INK}" stroke-width="3"/>')
    for i, lb in enumerate(stage_labels):
        cx = pl + i * bw + bw / 2
        s.append(f'<circle cx="{cx:.1f}" cy="{pt+ih+22}" r="13" fill="{WASH}"/>')
        s.append(f'<text x="{cx:.1f}" y="{pt+ih+28}" text-anchor="middle" font-family="Poppins" '
                 f'font-size="15" font-weight="700" fill="{BLUE}">{i+1}</text>')
        for j, ln in enumerate(lb.split("|")):
            s.append(f'<text x="{cx:.1f}" y="{pt+ih+56+j*21}" text-anchor="middle" '
                     f'font-family="Poppins" font-size="17" font-weight="500" fill="{LABEL}">{ln}</text>')
    s.append('</svg>')
    return ('<div style="margin-top:2px">'
            f'<div style="font-size:17px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;'
            f'color:{LABEL};margin-bottom:6px">{title}</div>'
            f'<div style="font-size:21px;color:{BODY};margin-bottom:16px">{ylabel}</div>'
            + "".join(s) +
            f'<div style="font-size:17px;color:{LIGHT};margin-top:4px">Direction of travel only. '
            f'The client is under NDA, so no figures are shown and the heights carry no values.</div></div>')


def state_bars(rows):
    """Before / after state comparison. Bars show a state, not a measured value."""
    W = 1048
    rowh = 100
    H = 44 + rowh * len(rows)
    gut = 96                      # BEFORE / AFTER caption gutter
    bx = gut + 14
    bw = W - bx
    s = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none">']
    s.append(f'<text x="{bx}" y="16" font-family="Poppins" font-size="16" font-weight="600" '
             f'letter-spacing="2.2" fill="{LABEL}">NOT IN PLACE</text>')
    s.append(f'<text x="{bx+bw}" y="16" text-anchor="end" font-family="Poppins" font-size="16" '
             f'font-weight="600" letter-spacing="2.2" fill="{LABEL}">FULLY IN PLACE</text>')
    s.append(f'<line x1="{bx}" y1="28" x2="{bx+bw}" y2="28" stroke="{HAIR}" stroke-width="1"/>')
    for i, (label, before, after) in enumerate(rows):
        y = 44 + i * rowh
        s.append(f'<text x="0" y="{y+22}" font-family="Poppins" font-size="21" font-weight="600" '
                 f'fill="{INK}">{label}</text>')
        yb = y + 34
        s.append(f'<text x="{gut}" y="{yb+16}" text-anchor="end" font-family="Poppins" font-size="15" '
                 f'font-weight="600" letter-spacing="1.4" fill="{LIGHT}">BEFORE</text>')
        s.append(f'<rect x="{bx}" y="{yb}" width="{bw}" height="22" rx="11" fill="{HAIR}"/>')
        s.append(f'<rect x="{bx}" y="{yb}" width="{max(bw*before,4):.0f}" height="22" rx="11" fill="{LIGHT}"/>')
        ya = y + 62
        s.append(f'<text x="{gut}" y="{ya+16}" text-anchor="end" font-family="Poppins" font-size="15" '
                 f'font-weight="600" letter-spacing="1.4" fill="{BLUE}">AFTER</text>')
        s.append(f'<rect x="{bx}" y="{ya}" width="{bw}" height="22" rx="11" fill="{HAIR}"/>')
        s.append(f'<rect x="{bx}" y="{ya}" width="{bw*after:.0f}" height="22" rx="11" fill="{BLUE}"/>')
    s.append('</svg>')
    return ("".join(s) +
            f'<div style="font-size:17px;color:{LIGHT};margin-top:6px">State of each item, not a measured '
            f'figure. The client is under NDA, so no traffic, ranking or revenue numbers are shown.</div>')


def hub_map(centre, ring, note):
    """Hub and spoke: one site, many area pages. Diagram, not data."""
    import math
    W, H = 1048, 344
    cx, cy = W/2, H/2 + 4
    s = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none">']
    n = len(ring)
    rx, ry = 392, 116
    for i, lab in enumerate(ring):
        a = -math.pi/2 + i * 2*math.pi/n
        x, y = cx + rx*math.cos(a), cy + ry*math.sin(a)
        s.append(f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" stroke="{HAIR}" stroke-width="2"/>')
    for i, lab in enumerate(ring):
        a = -math.pi/2 + i * 2*math.pi/n
        x, y = cx + rx*math.cos(a), cy + ry*math.sin(a)
        w = max(190, 13*len(lab))
        s.append(f'<rect x="{x-w/2:.1f}" y="{y-27:.1f}" width="{w}" height="54" rx="27" '
                 f'fill="#fff" stroke="{BLUE}" stroke-width="2"/>')
        s.append(f'<text x="{x:.1f}" y="{y+7:.1f}" text-anchor="middle" font-family="Poppins" '
                 f'font-size="19" font-weight="500" fill="{INK}">{lab}</text>')
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="150" ry="52" fill="{INK}"/>')
    s.append(f'<text x="{cx}" y="{cy+8}" text-anchor="middle" font-family="Poppins" font-size="22" '
             f'font-weight="600" fill="#fff">{centre}</text>')
    s.append('</svg>')
    return ("".join(s) +
            f'<div style="font-size:18px;color:{LABEL};margin-top:4px">{note}</div>')


def tree(root, groups):
    """Site structure tree. groups = [(section, [children])]"""
    W = 1048
    colw = W / len(groups)
    H = 108 + 44 * max(len(g[1]) for g in groups) + 78
    s = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none">']
    rw = 260
    s.append(f'<rect x="{W/2-rw/2}" y="0" width="{rw}" height="52" rx="10" fill="{INK}"/>')
    s.append(f'<text x="{W/2}" y="33" text-anchor="middle" font-family="Poppins" font-size="21" '
             f'font-weight="600" fill="#fff">{root}</text>')
    s.append(f'<line x1="{W/2}" y1="52" x2="{W/2}" y2="76" stroke="{HAIR}" stroke-width="2"/>')
    xs = [colw*i + colw/2 for i in range(len(groups))]
    s.append(f'<line x1="{xs[0]}" y1="76" x2="{xs[-1]}" y2="76" stroke="{HAIR}" stroke-width="2"/>')
    for i, (sec, kids) in enumerate(groups):
        x = xs[i]
        bw = colw - 26
        s.append(f'<line x1="{x}" y1="76" x2="{x}" y2="96" stroke="{HAIR}" stroke-width="2"/>')
        s.append(f'<rect x="{x-bw/2:.1f}" y="96" width="{bw:.1f}" height="48" rx="9" fill="{BLUE}"/>')
        s.append(f'<text x="{x:.1f}" y="126" text-anchor="middle" font-family="Poppins" font-size="19" '
                 f'font-weight="600" fill="#fff">{sec}</text>')
        for j, kid in enumerate(kids):
            y = 160 + j*44
            s.append(f'<line x1="{x-bw/2+22:.1f}" y1="{144 if j==0 else y-44+34}" '
                     f'x2="{x-bw/2+22:.1f}" y2="{y+17}" stroke="{HAIR}" stroke-width="2"/>')
            s.append(f'<line x1="{x-bw/2+22:.1f}" y1="{y+17}" x2="{x-bw/2+38:.1f}" y2="{y+17}" '
                     f'stroke="{HAIR}" stroke-width="2"/>')
            s.append(f'<text x="{x-bw/2+48:.1f}" y="{y+24}" font-family="Poppins" font-size="19" '
                     f'fill="{BODY}">{kid}</text>')
    s.append('</svg>')
    return "".join(s)


# --------------------------------------------------------------------- shell
def page(client, section, num, total, inner, cover=False):
    head = "" if cover else (
        f'<div class="phead"><div class="l">{client}</div>'
        f'<div class="r">Mavix Marketing</div></div>')
    foot = "" if cover else (
        f'<div class="pfoot"><div class="l">{section}</div>'
        f'<div class="r">{num} / {total}</div></div>')
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head>'
            f'<body><div class="page"><div class="inner">{head}{inner}</div>{foot}</div></body></html>')


def head_block(kicker, title, lede=None):
    l = f'<p class="lede">{lede}</p>' if lede else ''
    return (f'<div class="kick">{kicker}<span class="rule"></span></div>'
            f'<h1 class="sec">{title}</h1>{l}')


def page_anatomy(title, parts):
    """Diagram of a page and what was added to it. parts = [(band_label, note)]"""
    W, H = 1048, 372
    px = 0
    pw = 452
    s = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none">']
    s.append(f'<rect x="{px}" y="8" width="{pw}" height="{H-16}" rx="12" fill="#fff" '
             f'stroke="{HAIR}" stroke-width="2"/>')
    s.append(f'<rect x="{px}" y="8" width="{pw}" height="34" rx="12" fill="{WASH}"/>')
    s.append(f'<rect x="{px}" y="30" width="{pw}" height="12" fill="{WASH}"/>')
    for i, c in enumerate(["#FF6B6B", "#FFD166", "#8BD17C"]):
        s.append(f'<circle cx="{px+20+i*17}" cy="25" r="5.5" fill="{c}"/>')
    s.append(f'<rect x="{px+70}" y="17" width="{pw-96}" height="16" rx="8" fill="#fff" stroke="{HAIR}"/>')
    s.append(f'<text x="{px+82}" y="29" font-family="Poppins" font-size="13" fill="{LIGHT}">{title}</text>')
    n = len(parts)
    top = 60
    bh = (H - 16 - top - 6 - (n-1)*12) / n
    for i, (lab, note) in enumerate(parts):
        y = top + i*(bh+12)
        s.append(f'<rect x="{px+18}" y="{y:.1f}" width="{pw-36}" height="{bh:.1f}" rx="8" '
                 f'fill="#EEF3FF" stroke="{BLUE}" stroke-width="1.5"/>')
        s.append(f'<text x="{px+34}" y="{y+bh/2+7:.1f}" font-family="Poppins" font-size="18" '
                 f'font-weight="600" fill="{BLUE}">{lab}</text>')
        # connector
        mx = px+pw+2
        ty = y+bh/2
        s.append(f'<line x1="{mx}" y1="{ty:.1f}" x2="{mx+46}" y2="{ty:.1f}" stroke="{HAIR}" stroke-width="2"/>')
        s.append(f'<circle cx="{mx+46}" cy="{ty:.1f}" r="4" fill="{LIME}"/>')
        s.append(f'<text x="{mx+62}" y="{ty+7:.1f}" font-family="Poppins" font-size="19" '
                 f'fill="{BODY}">{note}</text>')
    s.append('</svg>')
    return "".join(s)


def strip(title, items, positive=True):
    ic = tick(BLUE) if positive else cross()
    cells = "".join(
        f'<div style="display:flex;gap:13px;align-items:flex-start">{ic}'
        f'<div style="font-size:20px;line-height:1.42;color:{BODY}">{t}</div></div>' for t in items)
    return (f'<div style="border-top:2px solid {INK};padding-top:20px">'
            f'<div style="font-size:17px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;'
            f'color:{LABEL};margin-bottom:18px">{title}</div>'
            f'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:26px">{cells}</div></div>')


def nextline(text):
    return (f'<div style="border-top:2px solid {INK};padding-top:20px;display:flex;gap:18px;'
            f'align-items:flex-start">'
            f'<div style="font-size:17px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;'
            f'color:{LABEL};flex:0 0 190px;padding-top:5px">The next step</div>'
            f'<div style="font-size:23px;line-height:1.5;color:{INK};font-weight:500">{text}</div></div>')

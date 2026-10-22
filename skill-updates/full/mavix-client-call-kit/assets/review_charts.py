# -*- coding: utf-8 -*-
"""Extra A4 components for the Creative Kitchen Co. opportunity review.
Same palette, fonts and hairline language as the case studies."""
import math
from render_lib import (BLUE, LIME, INK, BODY, LABEL, LIGHT, HAIR, WASH,
                        tick, cross, callout, cards, steps, table, checks,
                        panels, page, head_block, strip, nextline, CSS as BASE_CSS)

EXTRA_CSS = """
/* fact rows on the cover */
.facts{max-width:920px;border-top:2px solid __INK__;}
.facts .fr{display:flex;padding:18px 0;border-bottom:1px solid __HAIR__;}
.facts .fk{flex:0 0 250px;font-size:17px;font-weight:600;letter-spacing:2.4px;
           text-transform:uppercase;color:__LABEL__;padding-top:5px;}
.facts .fv{font-size:25px;font-weight:500;color:__INK__;line-height:1.4;}

/* two column present / missing */
.pm{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
.pm .col{border:1px solid __HAIR__;border-radius:14px;overflow:hidden;}
.pm .ph{font-size:17px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;
        padding:16px 24px;color:#fff;background:__BLUE__;}
.pm .col.g .ph{background:__LABEL__;}
.pm .pb{padding:8px 24px 18px;}
.pm .row{display:flex;gap:14px;align-items:flex-start;padding:14px 0;
         border-bottom:1px solid __HAIR__;font-size:21px;line-height:1.4;color:__BODY__;}
.pm .row:last-child{border-bottom:none;}
.pm .row b{color:__INK__;font-weight:600;}

/* group table */
table.g{width:100%;border-collapse:collapse;}
table.g th{font-size:15px;font-weight:600;letter-spacing:2px;text-transform:uppercase;
           color:__LABEL__;text-align:left;padding:0 12px 11px 0;border-bottom:2px solid __INK__;}
table.g th.n{text-align:right;padding-right:0;}
table.g td{font-size:21px;color:__BODY__;padding:14px 12px;border-bottom:1px solid __HAIR__;
           line-height:1.35;}
table.g td.n{text-align:right;padding-right:0;font-variant-numeric:tabular-nums;}
table.g td.k{color:__INK__;font-weight:500;padding-left:14px;}
table.g tr.grp td{background:#fff;border-bottom:none;padding:24px 0 8px;
                  font-size:16px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;}
table.g tr.win td{background:#F4F8FF;}
table.g tr.win td.k{font-weight:600;}
table.g td.pos{font-weight:700;color:__BLUE__;}
table.g td.miss{color:__LIGHT__;font-weight:500;}
.nd{display:inline-block;width:18px;height:2px;background:#9AA1AE;vertical-align:middle;border-radius:1px;}
.tnote{font-size:17px;color:__LIGHT__;margin-top:14px;line-height:1.45;}

/* pricing */
.tiers{display:grid;grid-template-columns:1fr 1.16fr 1fr;gap:20px;align-items:end;}
.tier{border:1px solid __HAIR__;border-radius:16px;padding:26px 24px 28px;background:#fff;}
.tier.hi{border:2px solid __BLUE__;padding:30px 26px 32px;box-shadow:0 8px 28px rgba(0,90,255,.10);}
.tier .tn{font-size:16px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;color:__LABEL__;}
.tier.hi .tn{color:__BLUE__;}
.tier .tp{font-size:52px;font-weight:700;color:__INK__;letter-spacing:-2px;margin-top:12px;line-height:1;}
.tier.hi .tp{font-size:62px;color:__BLUE__;}
.tier .tm{font-size:19px;color:__LIGHT__;margin-top:6px;}
.tier .tl{font-size:20px;line-height:1.45;color:__BODY__;margin-top:18px;
          padding-top:16px;border-top:1px solid __HAIR__;}
.tier .pill{display:inline-block;background:__LIME__;color:__INK__;font-size:15px;font-weight:700;
            letter-spacing:1.6px;text-transform:uppercase;padding:6px 13px;border-radius:20px;
            margin-bottom:14px;}

/* vs table */
.vs{width:100%;border-collapse:collapse;}
.vs th{font-size:16px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;
       text-align:left;padding:15px 22px;color:#fff;}
.vs th.a{background:__LABEL__;border-radius:10px 0 0 0;}
.vs th.b{background:__BLUE__;border-radius:0 10px 0 0;}
.vs td{font-size:21px;line-height:1.42;color:__BODY__;padding:16px 22px;
       border-bottom:1px solid __HAIR__;vertical-align:top;width:50%;}
.vs td.b{color:__INK__;background:#F7FAFF;}
"""
for k, v in (("__BLUE__", BLUE), ("__LIME__", LIME), ("__INK__", INK), ("__BODY__", BODY),
             ("__LABEL__", LABEL), ("__LIGHT__", LIGHT), ("__HAIR__", HAIR), ("__WASH__", WASH)):
    EXTRA_CSS = EXTRA_CSS.replace(k, v)

CSS = BASE_CSS + EXTRA_CSS

MARK = f'''<svg width="300" height="196" viewBox="0 0 300 196" fill="none"
 style="position:absolute;right:-26px;bottom:68px;">
<rect x="10" y="96" width="230" height="34" rx="17" fill="{BLUE}" transform="rotate(-32 10 96)"/>
<rect x="72" y="138" width="230" height="34" rx="17" fill="{BLUE}" opacity=".45" transform="rotate(-32 72 138)"/>
<rect x="134" y="180" width="230" height="34" rx="17" fill="{LIME}" transform="rotate(-32 134 180)"/>
</svg>'''


def facts(rows):
    return ('<div class="facts">' + "".join(
        f'<div class="fr"><div class="fk">{k}</div><div class="fv">{v}</div></div>'
        for k, v in rows) + '</div>')


def dash():
    return ('<svg width="26" height="26" viewBox="0 0 26 26" fill="none" style="flex:0 0 26px;margin-top:1px">'
            f'<circle cx="13" cy="13" r="12" stroke="{LIGHT}" stroke-width="2"/>'
            f'<path d="M8.6 13h8.8" stroke="{LIGHT}" stroke-width="2.4" stroke-linecap="round"/></svg>')


def pm(left_title, left_items, right_title, right_items):
    def body(items, ic):
        return "".join(f'<div class="row">{ic}<div>{t}</div></div>' for t in items)
    return ('<div class="pm">'
            f'<div class="col"><div class="ph">{left_title}</div>'
            f'<div class="pb">{body(left_items, tick(BLUE))}</div></div>'
            f'<div class="col g"><div class="ph">{right_title}</div>'
            f'<div class="pb">{body(right_items, dash())}</div></div></div>')


# ------------------------------------------------------------------ charts
def review_bars(rows, maxv):
    """rows = [(name, rating, reviews, in_pack, is_me)]"""
    W = 1048
    rowh = 116
    H = 46 + rowh * len(rows)
    lw = 372          # name column
    packw = 176       # right hand map pack column
    bx = lw + 22
    bw = W - bx - packw
    s = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none">']
    s.append(f'<text x="0" y="15" font-family="Poppins" font-size="15" font-weight="600" '
             f'letter-spacing="2.1" fill="{LABEL}">BUSINESS</text>')
    s.append(f'<text x="{bx}" y="15" font-family="Poppins" font-size="15" font-weight="600" '
             f'letter-spacing="2.1" fill="{LABEL}">GOOGLE REVIEWS</text>')
    s.append(f'<text x="{W}" y="15" text-anchor="end" font-family="Poppins" font-size="15" '
             f'font-weight="600" letter-spacing="2.1" fill="{LABEL}">IN THE TOP BOX</text>')
    s.append(f'<line x1="0" y1="28" x2="{W}" y2="28" stroke="{INK}" stroke-width="2"/>')
    for i, (name, rating, reviews, in_pack, is_me) in enumerate(rows):
        y = 46 + i * rowh
        if is_me:
            s.append(f'<rect x="-14" y="{y-14}" width="{W+28}" height="{rowh-10}" rx="10" fill="#F4F8FF"/>')
        col = BLUE if is_me else "#C7D9FF"
        nw = "700" if is_me else "500"
        s.append(f'<text x="0" y="{y+26}" font-family="Poppins" font-size="24" font-weight="{nw}" '
                 f'fill="{INK}">{name}</text>')
        # rating chip
        s.append(f'<rect x="0" y="{y+44}" width="112" height="34" rx="17" fill="#fff" '
                 f'stroke="{HAIR}" stroke-width="1.5"/>')
        s.append(f'<path d="M20 {y+55} l3.2 6.5 7.2 1 -5.2 5.1 1.2 7.2 -6.4-3.4 -6.4 3.4 1.2-7.2 '
                 f'-5.2-5.1 7.2-1 z" fill="{LIME}" stroke="{INK}" stroke-width="1.1" '
                 f'stroke-linejoin="round"/>')
        s.append(f'<text x="44" y="{y+68}" font-family="Poppins" font-size="21" font-weight="600" '
                 f'fill="{INK}">{rating}</text>')
        # bar
        by = y + 32
        s.append(f'<rect x="{bx}" y="{by}" width="{bw}" height="42" rx="8" fill="{WASH}"/>')
        s.append(f'<rect x="{bx}" y="{by}" width="{bw*reviews/maxv:.0f}" height="42" rx="8" fill="{col}"/>')
        tx = bx + bw * reviews / maxv - 16
        s.append(f'<text x="{tx:.0f}" y="{by+29}" text-anchor="end" font-family="Poppins" '
                 f'font-size="26" font-weight="700" fill="#fff">{reviews}</text>')
        # map pack marker
        mx = W - 30
        if in_pack:
            s.append(f'<circle cx="{mx}" cy="{by+21}" r="17" fill="{BLUE}"/>')
            s.append(f'<path d="M{mx-8} {by+21.5} l5.2 5.2 10.4-10.6" stroke="#fff" stroke-width="3" '
                     f'stroke-linecap="round" stroke-linejoin="round"/>')
            s.append(f'<text x="{mx-30}" y="{by+28}" text-anchor="end" font-family="Poppins" '
                     f'font-size="19" font-weight="500" fill="{BODY}">Yes</text>')
        else:
            s.append(f'<circle cx="{mx}" cy="{by+21}" r="17" fill="#fff" stroke="{LIGHT}" stroke-width="2"/>')
            s.append(f'<path d="M{mx-7} {by+21} h14" stroke="{LIGHT}" stroke-width="3" stroke-linecap="round"/>')
            s.append(f'<text x="{mx-30}" y="{by+28}" text-anchor="end" font-family="Poppins" '
                     f'font-size="19" font-weight="700" fill="{INK}">No</text>')
        s.append(f'<line x1="0" y1="{y+rowh-18}" x2="{W}" y2="{y+rowh-18}" stroke="{HAIR}" stroke-width="1"/>')
    s.append('</svg>')
    return "".join(s)


def band_chart(marks):
    """Position 1 to 20 scale. marks = [(position or (a,b), label)]"""
    W = 1048
    lw = 330
    x0, x1 = lw + 26, W - 34
    span = x1 - x0
    lanes = [56, 128, 200]
    H = 316

    def px(p):
        return x0 + span * (p - 1) / 19.0
    z1a, z1b = px(1) - 22, px(10) + 22
    z2a, z2b = px(11) - 20, px(20) + 26
    s = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none">']
    s.append(f'<rect x="{z1a:.0f}" y="14" width="{z1b-z1a:.0f}" height="{H-72:.0f}" rx="12" fill="#EAF1FF"/>')
    s.append(f'<rect x="{z2a:.0f}" y="14" width="{z2b-z2a:.0f}" height="{H-72:.0f}" rx="12" fill="{WASH}"/>')
    for i, (pos, label) in enumerate(marks):
        y = lanes[i]
        lines = label.split("|")
        oy = -8 if len(lines) > 1 else 7
        for j, ln in enumerate(lines):
            s.append(f'<text x="0" y="{y+oy+j*26}" font-family="Poppins" font-size="20" '
                     f'font-weight="{"600" if j == 0 else "400"}" '
                     f'fill="{INK if j == 0 else BODY}">{ln}</text>')
        if isinstance(pos, tuple):
            a2, b2 = px(pos[0]), px(pos[1])
            s.append(f'<rect x="{a2:.0f}" y="{y-11}" width="{b2-a2:.0f}" height="22" rx="11" fill="{LIGHT}"/>')
            s.append(f'<text x="{(a2+b2)/2:.0f}" y="{y+6}" text-anchor="middle" font-family="Poppins" '
                     f'font-size="15" font-weight="700" fill="#fff">{pos[0]} to {pos[1]}</text>')
        else:
            s.append(f'<circle cx="{px(pos):.0f}" cy="{y}" r="13" fill="{LIGHT}"/>')
            s.append(f'<text x="{px(pos):.0f}" y="{y+6}" text-anchor="middle" font-family="Poppins" '
                     f'font-size="15" font-weight="700" fill="#fff">{pos}</text>')
    ay = H - 46
    s.append(f'<text x="0" y="{ay+6}" font-family="Poppins" font-size="16" font-weight="600" '
             f'letter-spacing="2.2" fill="{LABEL}">WHERE YOU SIT ON GOOGLE</text>')
    for p in range(1, 21):
        bold = "700" if p in (1, 10, 11, 20) else "400"
        s.append(f'<text x="{px(p):.0f}" y="{ay+6}" text-anchor="middle" font-family="Poppins" '
                 f'font-size="19" font-weight="{bold}" fill="{INK if p<=10 else LIGHT}">{p}</text>')
    s.append(f'<text x="{(z1a+z1b)/2:.0f}" y="{H-8}" text-anchor="middle" font-family="Poppins" '
             f'font-size="20" font-weight="600" fill="{BLUE}">Page one. People click here.</text>')
    s.append(f'<text x="{(z2a+z2b)/2:.0f}" y="{H-8}" text-anchor="middle" font-family="Poppins" '
             f'font-size="20" font-weight="600" fill="{LIGHT}">Page two. Almost nobody looks.</text>')
    s.append('</svg>')
    return "".join(s)


def difficulty_meter(rows):
    """rows = [(term, volume, difficulty or None, cpc, note)]"""
    W = 1048
    rowh = 104
    H = 40 + rowh * len(rows)
    lw = 400
    bx = lw + 20
    bw = W - bx - 132
    s = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none">']
    s.append(f'<text x="0" y="14" font-family="Poppins" font-size="15" font-weight="600" '
             f'letter-spacing="2.1" fill="{LABEL}">SEARCH TERM</text>')
    s.append(f'<text x="{bx}" y="14" font-family="Poppins" font-size="15" font-weight="600" '
             f'letter-spacing="2.1" fill="{LABEL}">HOW HARD IT IS TO WIN  (0 EASY, 100 HARD)</text>')
    s.append(f'<line x1="0" y1="26" x2="{W}" y2="26" stroke="{INK}" stroke-width="2"/>')
    for i, (term, vol, diff, cpc) in enumerate(rows):
        y = 40 + i * rowh
        s.append(f'<text x="0" y="{y+30}" font-family="Poppins" font-size="23" font-weight="600" '
                 f'fill="{INK}">{term}</text>')
        s.append(f'<text x="0" y="{y+62}" font-family="Poppins" font-size="20" fill="{BODY}">'
                 f'{vol} searches a month  ·  {cpc} a click</text>')
        by = y + 24
        s.append(f'<rect x="{bx}" y="{by}" width="{bw}" height="26" rx="13" fill="{WASH}"/>')
        if diff is None:
            s.append(f'<text x="{bx+16}" y="{by+19}" font-family="Poppins" font-size="19" '
                     f'fill="{LIGHT}">no figure available</text>')
        else:
            wdt = max(bw * diff / 100.0, 12)
            s.append(f'<rect x="{bx}" y="{by}" width="{wdt:.0f}" height="26" rx="13" fill="{BLUE}"/>')
            s.append(f'<text x="{bx+bw+18}" y="{by+21}" font-family="Poppins" font-size="30" '
                     f'font-weight="700" fill="{INK}">{diff}</text>')
            s.append(f'<text x="{bx+bw+18+ (34 if diff<10 else 52)}" y="{by+21}" font-family="Poppins" '
                     f'font-size="19" fill="{LIGHT}">/ 100</text>')
        s.append(f'<line x1="0" y1="{y+rowh-20}" x2="{W}" y2="{y+rowh-20}" stroke="{HAIR}" stroke-width="1"/>')
    s.append('</svg>')
    return "".join(s)


def coverage_map(centre, covered, missing):
    W, H = 1048, 424
    hx, hy = 356, 212
    hrx, hry = 142, 54
    bx0, bx1 = 546, 1044
    by0, by1 = 42, 396
    s = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none">']

    def pill(cx, cy, lab, on):
        w = max(180, 11 * len(lab) + 46)
        if on:
            s.append(f'<rect x="{cx-w/2:.0f}" y="{cy-26:.0f}" width="{w}" height="52" rx="26" fill="{BLUE}"/>')
            s.append(f'<text x="{cx:.0f}" y="{cy+8:.0f}" text-anchor="middle" font-family="Poppins" '
                     f'font-size="20" font-weight="600" fill="#fff">{lab}</text>')
        else:
            s.append(f'<rect x="{cx-w/2:.0f}" y="{cy-24:.0f}" width="{w}" height="48" rx="24" fill="#fff" '
                     f'stroke="{HAIR}" stroke-width="2"/>')
            s.append(f'<text x="{cx:.0f}" y="{cy+7:.0f}" text-anchor="middle" font-family="Poppins" '
                     f'font-size="19" font-weight="500" fill="{LIGHT}">{lab}</text>')

    # grouped box for the areas with nothing
    s.append(f'<rect x="{bx0}" y="{by0}" width="{bx1-bx0}" height="{by1-by0}" rx="18" fill="{WASH}" '
             f'stroke="{HAIR}" stroke-width="2" stroke-dasharray="9 7"/>')
    s.append(f'<rect x="{bx0+26}" y="{by0-15}" width="264" height="30" rx="15" fill="#fff" '
             f'stroke="{HAIR}" stroke-width="1.5"/>')
    s.append(f'<text x="{bx0+158}" y="{by0+6}" text-anchor="middle" font-family="Poppins" font-size="16" '
             f'font-weight="600" letter-spacing="2.2" fill="{LABEL}">NOT SHOWING UP AT ALL</text>')
    s.append(f'<line x1="{hx+hrx}" y1="{hy}" x2="{bx0}" y2="{hy}" stroke="{HAIR}" stroke-width="2.5" '
             f'stroke-dasharray="8 7"/>')
    cols = [bx0 + 128, bx0 + 372]
    rows = [by0 + 58, by0 + 138, by0 + 218, by0 + 298]
    for i, lab in enumerate(missing):
        pill(cols[i % 2], rows[i // 2], lab, False)

    # covered, joined by a bracket
    lys = [hy - 68, hy + 68]
    rail = 206
    s.append(f'<line x1="{hx-hrx}" y1="{hy}" x2="{rail}" y2="{hy}" stroke="{BLUE}" stroke-width="3"/>')
    s.append(f'<line x1="{rail}" y1="{lys[0]}" x2="{rail}" y2="{lys[1]}" stroke="{BLUE}" stroke-width="3"/>')
    for ly in lys:
        s.append(f'<line x1="{rail}" y1="{ly}" x2="{rail-8}" y2="{ly}" stroke="{BLUE}" stroke-width="3"/>')
    s.append(f'<rect x="8" y="{lys[0]-92}" width="228" height="30" rx="15" fill="#fff" '
             f'stroke="{HAIR}" stroke-width="1.5"/>')
    s.append(f'<text x="122" y="{lys[0]-71}" text-anchor="middle" font-family="Poppins" font-size="16" '
             f'font-weight="600" letter-spacing="2.2" fill="{BLUE}">PAGE ONE TODAY</text>')
    for ly, lab in zip(lys, covered):
        w = max(176, 11 * len(lab) + 46)
        cx = rail - 8 - w / 2
        s.append(f'<rect x="{cx-w/2:.0f}" y="{ly-26:.0f}" width="{w}" height="52" rx="26" fill="{BLUE}"/>')
        s.append(f'<text x="{cx:.0f}" y="{ly+8:.0f}" text-anchor="middle" font-family="Poppins" '
                 f'font-size="20" font-weight="600" fill="#fff">{lab}</text>')

    s.append(f'<ellipse cx="{hx}" cy="{hy}" rx="{hrx}" ry="{hry}" fill="{INK}"/>')
    parts = centre.split("|")
    for j, ln in enumerate(parts):
        oy = -6 if len(parts) > 1 else 8
        s.append(f'<text x="{hx}" y="{hy+oy+j*28:.0f}" text-anchor="middle" font-family="Poppins" '
                 f'font-size="21" font-weight="600" fill="#fff">{ln}</text>')
    s.append('</svg>')
    leg = (f'<div style="display:flex;gap:44px;margin-top:12px;font-size:19px;color:{LABEL};align-items:center">'
           f'<span style="display:flex;gap:11px;align-items:center">'
           f'<span style="width:28px;height:13px;border-radius:7px;background:{BLUE};display:inline-block"></span>'
           f'A page that already reaches page one of Google</span>'
           f'<span style="display:flex;gap:11px;align-items:center">'
           f'<span style="width:28px;height:13px;border-radius:7px;border:2px solid {HAIR};display:inline-block"></span>'
           f'No page, and you show up for nothing</span></div>')
    return "".join(s) + leg


def timeline(stages):
    """stages = [(when, title, body)] rendered as a vertical rail."""
    out = ['<div style="position:relative">']
    for i, (when, title, body) in enumerate(stages):
        last = i == len(stages) - 1
        rail = ('' if last else
                f'<div style="position:absolute;left:23px;top:48px;bottom:-30px;width:2px;background:{HAIR};"></div>')
        out.append(
            f'<div style="position:relative;display:flex;gap:26px;padding-bottom:{0 if last else 30}px">'
            f'{rail}'
            f'<div style="flex:0 0 48px;width:48px;height:48px;border-radius:50%;background:{BLUE};'
            f'color:#fff;font-size:20px;font-weight:700;display:flex;align-items:center;'
            f'justify-content:center;z-index:2;position:relative">{i+1}</div>'
            f'<div style="flex:1">'
            f'<div style="display:flex;align-items:baseline;gap:16px">'
            f'<div style="font-size:16px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase;'
            f'color:#fff;background:{INK};padding:7px 14px;border-radius:6px">{when}</div>'
            f'<div style="font-size:24px;font-weight:600;color:{INK};letter-spacing:-.2px">{title}</div></div>'
            f'<div style="font-size:21px;line-height:1.5;color:{BODY};margin-top:9px;max-width:880px">{body}</div>'
            f'</div></div>')
    out.append('</div>')
    return "".join(out)


def vs_table(a_title, b_title, rows):
    body = "".join(f'<tr><td>{a}</td><td class="b">{b}</td></tr>' for a, b in rows)
    return (f'<table class="vs"><tr><th class="a">{a_title}</th><th class="b">{b_title}</th></tr>'
            f'{body}</table>')


def tiers(items):
    out = ['<div class="tiers">']
    for name, price, meta, line, hi, pill in items:
        cls = "tier hi" if hi else "tier"
        p = f'<div class="pill">{pill}</div>' if pill else ''
        m = f'<div class="tm">{meta}</div>' if meta else ''
        out.append(f'<div class="{cls}">{p}<div class="tn">{name}</div>'
                   f'<div class="tp">{price}</div>{m}<div class="tl">{line}</div></div>')
    out.append('</div>')
    return "".join(out)


def big_stat(value, unit, caption):
    return (f'<div style="display:flex;gap:34px;align-items:flex-end">'
            f'<div style="font-size:150px;font-weight:800;color:{BLUE};letter-spacing:-8px;'
            f'line-height:.86">{value}</div>'
            f'<div style="padding-bottom:16px"><div style="font-size:28px;font-weight:600;color:{INK}">{unit}</div>'
            f'<div style="font-size:21px;color:{BODY};margin-top:6px;max-width:620px;line-height:1.45">{caption}</div>'
            f'</div></div>')

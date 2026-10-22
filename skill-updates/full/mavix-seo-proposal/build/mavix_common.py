import json, os, html

_HERE = os.path.dirname(os.path.abspath(__file__))
_A = json.load(open(os.path.join(os.path.dirname(_HERE), "assets_b64.json")))
IMG = _A["img"]
PEOPLE = _A["people"]


def img(key):
    return IMG[key]


def esc(s):
    return html.escape(str(s), quote=False)


# ---------------------------------------------------------------- icons
def svg(paths, stroke="#005AFF", fill="none"):
    return (f'<svg viewBox="0 0 24 24" fill="{fill}" stroke="{stroke}" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round">{paths}</svg>')


ICO = {
 "sales":      svg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>'),
 "traffic":    svg('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'),
 "visibility": svg('<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>'),
 "leads":      svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
 "cost":       svg('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
 "awareness":  svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
 "clock":      svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
 "shield":     svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
 "repeat":     svg('<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'),
 "target":     svg('<circle cx="12" cy="12" r="10"/><path d="m22 2-10 10"/><path d="M16 2h6v6"/>'),
}

WARN_SVG = svg('<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>'
               '<line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
               stroke="#E5484D")

SHIELD_SVG = svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
                 stroke="#B4FF24")

STAR_SVG = ('<svg viewBox="0 0 24 24" fill="#F5B301" stroke="none">'
            '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 '
            '5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>')


def stars(n=5):
    return '<div class="tstars">' + STAR_SVG * n + '</div>'


# ---------------------------------------------------------------- shell
def kicker(num, label):
    return (f'<div class="kicker"><img class="kstar" src="{img("star_blue")}">'
            f'<span class="knum">{num}</span><span class="kline"></span>'
            f'<span class="klabel">{esc(label)}</span></div>')


def section(num, label, title_html, body, first=False):
    cls = "sec" if first else "sec newpage"
    return (f'<div class="{cls}">{kicker(num, label)}'
            f'<h1 class="sh">{title_html}</h1>{body}</div>')


def pull(text, lime=False):
    star = img("star_green") if lime else img("star_blue")
    cls = "pull lime" if lime else "pull"
    return (f'<div class="{cls}"><img class="qstar" src="{star}">'
            f'<p>{esc(text)}</p></div>')


def neon(text_html):
    return f'<div class="neon"><p>{text_html}</p></div>'


def stats(items):
    """items: [(value, label, tone)] tone in '', 'ink', 'red'"""
    cells = "".join(
        f'<div class="stat"><div class="big {t}">{esc(v)}</div>'
        f'<div class="lbl">{esc(l)}</div></div>' for v, l, t in items)
    return f'<div class="stats">{cells}</div>'


def chart(title, note, data_uri, big=False):
    cls = "chart big" if big else "chart"
    return (f'<div class="{cls}"><div class="ctitle">{esc(title)}</div>'
            f'<div class="cnote">{esc(note)}</div><img src="{data_uri}"></div>')


def table(headers, rows, win_col=None):
    th = "".join(f"<th>{esc(h)}</th>" for h in headers)
    tr = ""
    for r in rows:
        tds = ""
        for i, c in enumerate(r):
            cls = ' class="win"' if win_col is not None and i == win_col else ""
            tds += f"<td{cls}>{c}</td>"
        tr += f"<tr>{tds}</tr>"
    return f'<table class="tb"><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table>'


def bullets(items, lime=False, tight=False):
    cls = "ibul" + (" lime" if lime else "") + (" tight" if tight else "")
    li = "".join(f"<li>{i}</li>" for i in items)
    return f'<ul class="{cls}">{li}</ul>'


def two_col(prob_title, prob_items, fix_title, fix_items):
    p = "".join(f"<p>{i}</p>" for i in prob_items)
    f = "".join(f"<p>{i}</p>" for i in fix_items)
    return (f'<div class="tcol"><div class="col prob"><h4>{esc(prob_title)}</h4>{p}</div>'
            f'<div class="col fix"><h4>{esc(fix_title)}</h4>{f}</div></div>')


def alert(text_html):
    return f'<div class="alert"><div class="ai">{WARN_SVG}</div><div class="at">{text_html}</div></div>'


def gantt(rows, scale):
    """rows: [(label, phase_class, bar_text)]"""
    body = "".join(
        f'<div class="grow"><div class="glabel">{esc(l)}</div>'
        f'<div class="gtrack"><div class="gbar {c}">{esc(t)}</div></div></div>'
        for l, c, t in rows)
    sc = "".join(f"<span>{esc(s)}</span>" for s in scale)
    return f'<div class="gantt">{body}<div class="gscale">{sc}</div></div>'


def steps(items):
    body = "".join(
        f'<div class="step"><div class="sn">{i+1}</div><div class="sc">'
        f'<b>{esc(t)}</b><p>{esc(d)}</p></div></div>'
        for i, (t, d) in enumerate(items))
    return f'<div class="steps">{body}</div>'


def scorecards(items):
    """items: [(label, current, target, fill_pct)]"""
    body = "".join(
        f'<div class="scard"><div class="sm">{esc(l)}</div>'
        f'<div class="srow"><span class="cur">{esc(c)}</span>'
        f'<span class="arr">&#8594;</span><span class="tgt">{esc(t)}</span></div>'
        f'<div class="track"><div class="fill" style="width:{p}%"></div></div></div>'
        for l, c, t, p in items)
    return f'<div class="scards">{body}</div>'


def benefit_cards(items):
    """items: [(icon_key, stat, label, text)]"""
    body = "".join(
        f'<div class="bcard"><div class="bico">{ICO[k]}</div>'
        f'<div class="bstat">{esc(s)}</div><div class="blbl">{esc(l)}</div>'
        f'<p class="btxt">{esc(t)}</p></div>' for k, s, l, t in items)
    return f'<div class="bgrid">{body}</div>'


def scope_groups(groups, wide_last=False):
    """groups: [(title, [items])]"""
    out = ""
    for i, (t, items) in enumerate(groups):
        cls = "sgrp wide" if (wide_last and i == len(groups) - 1) else "sgrp"
        li = "".join(f"<li>{x}</li>" for x in items)
        out += f'<div class="{cls}"><h5>{esc(t)}</h5><ul>{li}</ul></div>'
    return f'<div class="scope">{out}</div>'


def faqs(items):
    body = "".join(
        f'<div class="fq"><div class="fn">{i+1}</div><div>'
        f'<b>{esc(q)}</b><p>{a}</p></div></div>'
        for i, (q, a) in enumerate(items))
    return f'<div class="faq">{body}</div>'


def guarantee(title, text):
    return (f'<div class="guar"><div class="gi">{SHIELD_SVG}</div>'
            f'<div class="gt"><b>{esc(title)}</b><p>{esc(text)}</p></div></div>')


# ---------------------------------------------------------------- pages
def cover(P):
    chips = "".join(
        f'<div class="c-chip{" on" if on else ""}">{esc(c)}</div>' for c, on in P["chips"])
    return f'''<div class="cover"><div class="c-pad">
  <div class="c-top"><img class="c-logo-img" src="{img('logo_white')}">
    <div class="c-tag">Mavix Marketing</div></div>
  <div class="c-mid">
    <div class="c-eyebrow"><img src="{img('star_green')}">{esc(P["eyebrow"])}</div>
    <div class="c-title">{P["title_html"]}</div>
    <div class="c-sub">{esc(P["subtitle"])}</div>
  </div>
  <div class="c-bottom">
    <div class="c-client">
      <div class="c-client-lbl">Prepared for</div>
      <div class="c-client-name">{esc(P["client"])}</div>
      <div class="c-client-meta">{esc(P["client_meta"])}</div>
      <div class="c-services">{chips}</div>
    </div>
    <div class="c-foot">
      <div>Prepared by <b>Mohd Farhan</b> &#183; Mavix Marketing</div>
      <div>{esc(P["date"])} &#183; Valid 14 days</div>
    </div>
  </div>
</div></div>'''


def contents(rows, doctitle):
    body = "".join(
        f'<div class="toc-row"><div class="toc-n">{n}</div>'
        f'<div class="toc-t">{esc(t)}</div><div class="toc-d">{esc(d)}</div></div>'
        for n, t, d in rows)
    return (f'<div class="sec newpage"><div class="docmeta">{esc(doctitle)}</div>'
            + kicker("00", "Contents")
            + '<h1 class="sh">What is <span class="accent">in this document.</span></h1>'
            + f'<div class="toc">{body}</div></div>')


def who_we_are(num, P):
    circles = "".join(
        f'<div class="cstat"><div class="circle {c}">{esc(v)}</div>'
        f'<div class="ct">{esc(l)}</div></div>' for v, l, c in P["credentials"])
    wall = "".join(f'<div class="ltile"><img src="{img(f"client_logo_{i}")}"></div>'
                   for i in range(1, 6))
    return section(num, "Who We Are",
        'A small team, <span class="accent">working directly with you.</span>', f'''
  <p class="lead">{esc(P["who_intro"])}</p>
  <div class="gpwrap"><img src="{img('google_partner')}">
    <div class="gpx"><b>Google Partner</b>
      <p>{esc(P["gp_text"])}</p></div></div>
  <p>{esc(P["who_model"])}</p>
  <div class="cstats">{circles}</div>
  <div class="walltitle">A few of the brands we have worked with</div>
  <div class="wall">{wall}</div>''')


def testimonials(num, entries):
    """entries: 6 dicts. Real photo -> {"img": key, "name":, "role":, "quote":}
    Initials avatar -> {"initials": "SM", "name":, "role":, "quote":}"""
    cards = ""
    for i, e in enumerate(entries):
        if e.get("img"):
            av = f'<img class="av" src="{img(e["img"])}">'
        else:
            alt = " alt" if i % 2 else ""
            av = f'<div class="avi{alt}">{esc(e["initials"])}</div>'
        cards += (f'<div class="tsq"><div class="thead">{av}<div>'
                  f'<div class="tn">{esc(e["name"])}</div>'
                  f'<div class="tr">{esc(e["role"])}</div></div></div>'
                  f'{stars()}<p class="tq">&quot;{esc(e["quote"])}&quot;</p></div>')
    return section(num, "What Clients Say",
        'The part you should <span class="accent">check for yourself.</span>', f'''
  <p class="lead">Every name below is a real client. Ask for an introduction to any of them
  before you sign anything.</p>
  <div class="tgrid">{cards}</div>
  <div class="neon"><p>We would rather you call one of them than take our word for it.
  Say the word and we will make the introduction.</p></div>''')


CHECK_SVG = svg('<polyline points="20 6 9 17 4 12"/>', stroke="#4E6A07")

CALL_URL = "https://cal.id/mavixmarketing/strategy-call"
CALL_URL_SHORT = "cal.id/mavixmarketing/strategy-call"


def pricing_seo(num, P):
    """Premium pricing page.
    P["seo_tiers"]: three dicts with name, price (e.g. "$1,349"), fit (one short line on
    who the plan suits), guarantee (bool), points (bullets), reco (True on exactly one).
    P["terms"]: four short terms for the strip under the cards.
    P["guarantee_title"], P["guarantee_text"]: the banner. Optional P["price_lead"].
    There is no "was" price any more. Never print a crossed-out price."""
    tiers = ""
    for t in P["seo_tiers"]:
        reco = " reco" if t.get("reco") else ""
        badge = '<div class="badge">Recommended for you</div>' if t.get("reco") else ""
        g = ('<div class="pg">Money-back guarantee</div>' if t.get("guarantee")
             else '<div class="pg none">No money-back guarantee</div>')
        li = "".join(f"<li>{esc(x)}</li>" for x in t["points"])
        tiers += (f'<div class="pc{reco}">{badge}<div class="ptier">{esc(t["name"])}</div>'
                  f'<div class="pfit">{esc(t.get("fit", ""))}</div>'
                  f'<div class="pamt">{esc(t["price"])}<small>/ month</small></div>{g}'
                  f'<ul>{li}</ul></div>')
    terms = "".join(f'<div class="term">{CHECK_SVG}<span>{esc(x)}</span></div>'
                    for x in P["terms"])
    lead = P.get("price_lead", "One monthly fee. No setup fee and no long contract: the "
                 "agreement has no time limit and the only side it ties is ours, to deliver.")
    body = (f'<p class="lead">{esc(lead)}</p>'
            f'<div class="price">{tiers}</div>'
            f'<div class="terms">{terms}</div>'
            + guarantee(P["guarantee_title"], P["guarantee_text"]))
    return section(num, "Investment",
                   'What it costs, <span class="accent">and what protects you.</span>', body)


def close_page(num, P):
    """The last page: your plan, your price, reply yes to start.
    P keys: client, close_plan ("Growth"), close_price ("$1,349"), close_guarantee (one
    line), close_target (the 90-day target, one sentence, real numbers, never "TBC"),
    close_target_note (how it is measured), close_first (three (title, text) pairs: the
    first three things we do), optional contact_email.
    Two ways to say yes: reply "yes" to the email, or book a 15-minute walkthrough."""
    first = "".join(
        f'<div class="it"><div class="nb">{i+1}</div><div class="tx"><b>{esc(t)}</b>'
        f'<span>{esc(d)}</span></div></div>' for i, (t, d) in enumerate(P["close_first"]))
    mail = P.get("contact_email", "mavixmarketing@gmail.com")
    body = (
        '<div class="cl-hero">'
        f'<div><div class="k">Recommended for {esc(P["client"])}</div>'
        f'<div class="n">{esc(P["close_plan"])} plan</div>'
        f'<div class="g">{esc(P["close_guarantee"])}</div></div>'
        f'<div class="pr"><div class="v">{esc(P["close_price"])}</div>'
        '<div class="u">a month, no setup fee</div></div></div>'
        '<div class="cl-row">'
        '<div class="cl-target"><div class="h">Your 90-day target</div>'
        f'<div class="t">{esc(P["close_target"])}</div>'
        f'<div class="s">{esc(P["close_target_note"])}</div></div>'
        f'<div class="cl-first"><div class="h">The first three things we do</div>{first}</div>'
        '</div>'
        '<div class="cl-yes-h">Two ways to say yes</div>'
        '<div class="cl-yes">'
        '<div class="cl-way a"><div class="w">Ready now</div>'
        '<div class="t">Reply "yes"</div>'
        '<p>Reply "yes" to the email this came with. We send the one-page agreement the '
        'same day and start the work that week.</p>'
        f'<a class="btn" href="mailto:{esc(mail)}?subject=Yes%2C%20let%27s%20start">Reply yes</a></div>'
        '<div class="cl-way b"><div class="w">Want to talk first</div>'
        '<div class="t">Book 15 minutes</div>'
        '<p>We walk you through this audit on a short call and answer your questions. '
        'No slides, no pressure.</p>'
        f'<a class="btn" href="{CALL_URL}">Book a 15-minute walkthrough</a>'
        f'<div class="url">{CALL_URL_SHORT}</div></div>'
        '</div>'
        f'<div class="cl-foot"><b>Mohd Farhan</b> &#183; Mavix Marketing &#183; {esc(mail)}</div>')
    return section(num, "Your Plan",
                   'Your plan, your price. <span class="accent">Reply yes to start.</span>', body)


def pricing_ads(num, P):
    phs = ""
    for i, ph in enumerate(P["ad_phases"]):
        li = "".join(f"<li>{esc(x)}</li>" for x in ph["points"])
        amt = (f'{esc(ph["p"])}<small>/mo</small>' if "USD" in ph["p"] else esc(ph["p"]))
        phs += (f'<div class="ph p{i+1}"><div class="phn">{esc(ph["n"])}</div>'
                f'<div class="pht">{esc(ph["t"])}</div>'
                f'<div class="php">{amt}</div><ul>{li}</ul></div>')
    return section(num, "Investment",
        'The fee starts low <span class="accent">on purpose.</span>', f'''
  <p class="lead">{esc(P["price_rationale"])}</p>
  <div class="phases">{phs}</div>
  {neon('Your ad budget is separate and always stays yours. It never passes through us. As a Google '
        'Partner we can also apply <strong>1,000 USD of Google ad credit</strong> to your account '
        'once you hit the qualifying spend.')}
  <p class="note"><strong>Budget guide.</strong> Awareness runs at 10 to 20 USD a day per platform.
  Once we switch on sales campaigns, 30 to 50 USD a day per platform. We agree the number with you
  before anything goes live.</p>
  {guarantee(P["guarantee_title"], P["guarantee_text"])}''')


def next_steps(P):
    return section(P["ns_num"], "Let's Begin",
        'Confirm, and <span class="accent">we start today.</span>', f'''
  <p class="lead">{esc(P["ns_intro"])}</p>
  {steps(P["ns_steps"])}
  <div class="cta"><div class="cl">Ready when you are</div>
    <div class="ch">{esc(P["cta_head"])}</div>
    <div class="cp">{esc(P["cta_text"])}</div>
    <div class="cbtn">{esc(P["cta_btn"])}</div>
    <div class="cc">Mohd Farhan &#183; Mavix Marketing &#183; mavixmarketing@gmail.com</div>
  </div>''')


def reporting(P):
    return section(P["rep_num"], "Reporting",
        'You will always know <span class="accent">what your money did.</span>', f'''
  <p class="lead">{esc(P["rep_intro"])}</p>
  {scope_groups(P["rep_groups"])}
  {pull(P["rep_quote"])}
  <p class="note">{esc(P["rep_note"])}</p>''')


# ---------------------------------------------------------------- document
def build_html(css, parts, doctitle):
    return ("<!DOCTYPE html><html><head><meta charset='utf-8'>"
            f"<style>{css}</style></head><body>"
            + parts[0]
            + f'<div style="height:0"><span class="docmeta">{esc(doctitle)}</span></div>'
            + "".join(parts[1:]) + "</body></html>")

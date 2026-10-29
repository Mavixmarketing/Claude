# -*- coding: utf-8 -*-
"""The real client dashboards, and the A4 panel that puts one on a page.

These are screenshots taken straight from real client accounts. Only seo1, seo2,
seo3, g2 and m2 match a case study on mavixmarketing.com/case-studies (see
references/case-library.md); the others are not used as case studies. The
screenshots are not touched. Never recreate, crop,
recolour or redraw one, and never write a number the screenshot does not show.

    from dashboards import shots, manifest, results_panel

    print(manifest("g1"))          # the exact figures printed on that screenshot
    html = results_panel("g1",
        title="Google Ads account, 13 weeks",
        note="Taken straight from the client's Google Ads account.")

Keys:
    Google Ads        g1 g2 g3 g4 g5
    Meta Ads Manager  m1 m2 m3 m4 m5
    Search Console    seo1 seo2 seo3
"""
import json, os

_HERE = os.path.dirname(os.path.abspath(__file__))
_SHOTS, _MAN = {}, {}
for _f in ("ads_shots_b64.json", "seo_shots_b64.json"):
    _p = os.path.join(_HERE, _f)
    if os.path.exists(_p):
        _d = json.load(open(_p))
        _SHOTS.update(_d.get("shots", {}))
        _MAN.update(_d.get("manifest", {}))

BLUE, LIME, INK = "#005AFF", "#B4FF24", "#101010"
BODY, LABEL, LIGHT, HAIR, WASH = "#3A3F4A", "#5F6675", "#9AA1AE", "#E4E8F0", "#F7F9FC"

SEO_KEYS = ("seo1", "seo2", "seo3")
GOOGLE_ADS_KEYS = ("g1", "g2", "g3", "g4", "g5")
META_KEYS = ("m1", "m2", "m3", "m4", "m5")
ADS_KEYS = GOOGLE_ADS_KEYS + META_KEYS


SEO_WORDS = ("seo", "search", "organic", "rankings", "ranking")
ADS_WORDS = ("ads", "ad", "paid", "ppc", "google ads", "meta", "facebook", "paid media")


def _service(service):
    """Normalise however the caller spelled it. Refuse anything unrecognised."""
    s = (service or "").strip().lower()
    if s in SEO_WORDS:
        return "seo"
    if s in ADS_WORDS:
        return "ads"
    raise ValueError(
        f"service must be one of {SEO_WORDS + ADS_WORDS}, not {service!r}. "
        "It is never optional — it is the guard that stops a search dashboard "
        "reaching an ads kit.")


def keys(service):
    """The dashboard keys allowed for one service. Service is required."""
    allowed = SEO_KEYS if _service(service) == "seo" else ADS_KEYS
    return [k for k in allowed if k in _SHOTS]


def all_keys():
    """Every key, both services. Only for listing, never for building a page."""
    return sorted(_SHOTS)


def manifest(key):
    """The platform and the exact figures printed on that screenshot."""
    if key not in _MAN:
        raise KeyError(f"no dashboard called {key!r}. Have: {sorted(_SHOTS)}")
    return _MAN[key]


def shot(key):
    """The screenshot as a data URI, ready for an <img src>."""
    if key not in _SHOTS:
        raise KeyError(f"no dashboard called {key!r}. Have: {sorted(_SHOTS)}")
    return _SHOTS[key]


def assert_service(key, service):
    """Stop an ads dashboard reaching an SEO kit, and the other way round."""
    norm = _service(service)
    ok = keys(norm)
    if key not in ok:
        raise ValueError(
            f"{key!r} is not a {norm} dashboard. A {norm} kit may only use {ok}.")


def tiles(key, highlight=0):
    """The four figures from the manifest, as tiles. Never edit these by hand."""
    m = manifest(key)
    out = []
    for i, (value, label) in enumerate(m["tiles"]):
        colour = LIME if i == highlight else BLUE
        out.append(
            f'<div style="flex:1;padding:18px 20px;background:{WASH};border-radius:12px;'
            f'border-top:3px solid {colour}">'
            f'<div style="font-size:32px;font-weight:700;color:{INK};line-height:1.1;'
            f'letter-spacing:-0.5px">{value}</div>'
            f'<div style="font-size:17px;color:{LABEL};margin-top:6px">{label}</div></div>')
    return f'<div style="display:flex;gap:12px;margin:18px 0">{"".join(out)}</div>'


def results_panel(key, title, note, service, highlight=0):
    """A full A4 results block: heading, the real figures, the real screenshot.

    `service` is required and positional. There is no way to skip the guard.
    """
    assert_service(key, service)
    m = manifest(key)
    return f'''
<div style="border:1px solid {HAIR};border-radius:16px;padding:26px 26px 22px;background:#FFFFFF">
  <div style="display:flex;justify-content:space-between;align-items:baseline;
       padding-bottom:14px;border-bottom:1px solid {HAIR}">
    <div style="font-size:25px;font-weight:600;color:{INK}">{title}</div>
    <div style="font-size:17px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;
         color:{LABEL}">{m["platform"]}</div>
  </div>
  {tiles(key, highlight)}
  <div style="border:1px solid {HAIR};border-radius:10px;overflow:hidden;background:{WASH}">
    <img src="{shot(key)}" style="display:block;width:100%;height:auto">
  </div>
  <div style="font-size:18px;color:{LABEL};margin-top:14px;line-height:1.5">{note}</div>
</div>'''


if __name__ == "__main__":
    for k in all_keys():
        m = _MAN[k]
        print(f"{k:5} {m['platform']:22} " + " · ".join(f"{v} {l}" for v, l in m["tiles"]))

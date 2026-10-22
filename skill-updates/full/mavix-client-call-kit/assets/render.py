# -*- coding: utf-8 -*-
"""Turn a folder of A4 HTML pages into a print-quality PDF.

Usage from a build script:

    from render import render, to_pdf, measure
    render("out/html", "out/png")          # HTML -> PNG at 2480x3508
    measure("out/html")                    # warn about any page that overflows
    to_pdf("out/png", "out/My-Document.pdf")

Every page must be one A4 sheet built with render_lib.page().
"""
import os, sys, glob, shutil, subprocess, tempfile

CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
if not os.path.exists(CHROME):
    hits = sorted(glob.glob("/opt/pw-browsers/chromium*/chrome-linux/chrome"))
    if hits:
        CHROME = hits[0]

# A4 at 300dpi is 2480x3508. The pages are authored at 1240x1754 CSS pixels
# and shot at device scale 2, which lands exactly on that.
CSS_W, CSS_H = 1240, 1754


def render(html_dir, png_dir, clean=True):
    """Screenshot every .html in html_dir into png_dir."""
    if clean:
        shutil.rmtree(png_dir, ignore_errors=True)
    os.makedirs(png_dir, exist_ok=True)
    files = sorted(f for f in os.listdir(html_dir) if f.endswith(".html"))
    if not files:
        raise SystemExit("no html pages in " + html_dir)
    for f in files:
        out = os.path.join(png_dir, f.replace(".html", ".png"))
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--no-sandbox",
             "--hide-scrollbars", "--force-device-scale-factor=2",
             f"--window-size={CSS_W},{CSS_H}",
             "--default-background-color=FFFFFFFF",
             f"--screenshot={out}", "file://" + os.path.join(html_dir, f)],
            check=True, capture_output=True)
    return sorted(glob.glob(os.path.join(png_dir, "*.png")))


def to_pdf(png_dir, out_path):
    """Stitch the PNGs into a real A4 PDF."""
    import img2pdf
    pngs = sorted(glob.glob(os.path.join(png_dir, "*.png")))
    if not pngs:
        raise SystemExit("no pngs in " + png_dir)
    layout = img2pdf.get_layout_fun((img2pdf.mm_to_pt(210), img2pdf.mm_to_pt(297)))
    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    with open(out_path, "wb") as f:
        f.write(img2pdf.convert(pngs, layout_fun=layout))
    return out_path


# The content box ends at y=1620 in CSS pixels. Anything painted below that
# is falling off the sheet, so this re-renders each page with the height cap
# removed and reports where the ink actually stops.
OVERRIDE = """<style>
html,body{height:auto!important;}
.page{height:auto!important;overflow:visible!important;min-height:0!important;}
.inner{position:static!important;margin:78px 96px 40px 96px!important;
       left:auto;right:auto;top:auto;bottom:auto;}
.pfoot{display:none!important;}
</style></head>"""
LIMIT = 1620


def measure(html_dir, limit=LIMIT, verbose=True):
    """Return the list of pages whose content overflows the A4 sheet."""
    from PIL import Image, ImageChops
    bad = []
    for f in sorted(glob.glob(os.path.join(html_dir, "*.html"))):
        html = open(f).read().replace("</head>", OVERRIDE)
        t = tempfile.NamedTemporaryFile(suffix=".html", delete=False, mode="w")
        t.write(html); t.close()
        out = t.name + ".png"
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--no-sandbox",
             "--hide-scrollbars", "--force-device-scale-factor=1",
             f"--window-size={CSS_W},4200",
             "--default-background-color=FFFFFFFF",
             f"--screenshot={out}", "file://" + t.name],
            check=True, capture_output=True)
        im = Image.open(out).convert("L")
        box = ImageChops.difference(im, Image.new("L", im.size, 255)).getbbox()
        h = box[3] if box else 0
        over = h > limit
        if over:
            bad.append((os.path.basename(f), h))
        if verbose:
            print(f"{os.path.basename(f)}  bottom {h}{'   <<< OVERFLOW' if over else ''}")
        os.unlink(t.name); os.unlink(out)
    if verbose:
        print("overflowing:", len(bad))
    return bad


if __name__ == "__main__":
    if len(sys.argv) > 1:
        measure(sys.argv[1])

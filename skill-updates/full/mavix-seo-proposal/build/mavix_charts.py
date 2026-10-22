import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np, io, os, base64

FD = "/usr/share/fonts/truetype/google-fonts"
for f in ["Poppins-Regular.ttf", "Poppins-Medium.ttf", "Poppins-Bold.ttf", "Poppins-Light.ttf"]:
    p = os.path.join(FD, f)
    if os.path.exists(p):
        fm.fontManager.addfont(p)
plt.rcParams["font.family"] = "Poppins"

BLUE = "#005AFF"; LIME = "#B4FF24"; NAVY = "#0A0E27"
GREY = "#C3C9D5"; MID = "#8B93A7"; RED = "#E5484D"; GREEN = "#21763C"


def _out(fig):
    b = io.BytesIO()
    fig.savefig(b, format="png", transparent=True, bbox_inches="tight", dpi=200)
    plt.close(fig)
    return "data:image/png;base64," + base64.b64encode(b.getvalue()).decode()


def _clean(ax, ygrid=True):
    for s in ("top", "left", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#D6DBE6")
    ax.tick_params(length=0, labelsize=10, colors=MID)
    if ygrid:
        ax.yaxis.grid(True, color="#EDEFF5", lw=0.9)
        ax.set_axisbelow(True)
    ax.set_yticks([])


def bar_vs(labels, values, you_index, unit="", w=7.2, h=2.7):
    """Vertical bar, client bar blue and labelled YOU, competitors grey."""
    fig, ax = plt.subplots(figsize=(w, h))
    cols = [BLUE if i == you_index else GREY for i in range(len(values))]
    bars = ax.bar(labels, values, color=cols, width=0.6, zorder=3)
    _clean(ax)
    top = max(values)
    for i, b in enumerate(bars):
        ax.text(b.get_x() + b.get_width() / 2, b.get_height() + top * 0.035,
                f"{values[i]:,}{unit}", ha="center", va="bottom",
                fontsize=10.5, fontweight="bold", color=NAVY)
    ax.set_ylim(0, top * 1.22)
    lbls = ax.get_xticklabels()
    for i, t in enumerate(lbls):
        if i == you_index:
            t.set_color(BLUE); t.set_fontweight("bold")
    return _out(fig)


def projection(months, values, note_start="Today", w=7.2, h=2.9):
    """12-month projection line with fill and highlighted end point."""
    fig, ax = plt.subplots(figsize=(w, h))
    x = np.arange(len(months))
    ax.plot(x, values, color=BLUE, lw=3.2, solid_capstyle="round", zorder=3)
    ax.fill_between(x, values, color=BLUE, alpha=0.08, zorder=2)
    ax.scatter([x[-1]], [values[-1]], s=90, color=BLUE, zorder=4,
               edgecolor="white", linewidth=2)
    ax.annotate(f"{values[-1]:,}", (x[-1], values[-1]),
                textcoords="offset points", xytext=(-6, 12),
                fontsize=11.5, fontweight="bold", color=BLUE, ha="right")
    ax.annotate(note_start, (x[0], values[0]),
                textcoords="offset points", xytext=(2, 12),
                fontsize=9.5, color=MID)
    _clean(ax)
    ax.set_xticks(x)
    ax.set_xticklabels(months, fontsize=9)
    ax.set_ylim(0, max(values) * 1.25)
    return _out(fig)


def rank_bars(keywords, current, target, w=7.2, h=3.0):
    """Horizontal grouped bar: current vs target position, lower is better."""
    fig, ax = plt.subplots(figsize=(w, h))
    y = np.arange(len(keywords))
    hgt = 0.36
    ax.barh(y + hgt / 2, current, height=hgt, color=GREY, zorder=3, label="Now")
    ax.barh(y - hgt / 2, target, height=hgt, color=BLUE, zorder=3, label="Target (month 6)")
    for s in ("top", "left", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#D6DBE6")
    ax.tick_params(length=0, labelsize=10, colors=MID)
    ax.set_yticks(y); ax.set_yticklabels(keywords, fontsize=9.6, color=NAVY)
    ax.invert_yaxis()
    ax.xaxis.grid(True, color="#EDEFF5", lw=0.9); ax.set_axisbelow(True)
    mx = max(max(current), max(target))
    for i in range(len(keywords)):
        ax.text(current[i] + mx * 0.015, y[i] + hgt / 2,
                "50+" if current[i] >= 50 else str(current[i]),
                va="center", fontsize=9.2, fontweight="bold", color=MID)
        ax.text(target[i] + mx * 0.015, y[i] - hgt / 2, str(target[i]),
                va="center", fontsize=9.2, fontweight="bold", color=BLUE)
    ax.set_xlabel("Google position (lower is better)", fontsize=9.2, color=MID)
    ax.set_xlim(0, mx * 1.12)
    ax.legend(fontsize=9.4, frameon=False, ncol=2,
              loc="lower right", bbox_to_anchor=(1.0, -0.30))
    return _out(fig)


def donut(parts, labels, total_label, colors=None, w=6.6, h=2.7):
    """Donut with the total in the hole and a readable legend to the RIGHT,
    one row per slice with its value. Never a tiny legend under the chart."""
    colors = colors or [BLUE, GREY, RED]
    total = sum(parts)
    fig, (ax, lax) = plt.subplots(1, 2, figsize=(w, h),
                                  gridspec_kw={"width_ratios": [1, 1.15]})
    ax.pie(parts, colors=colors, startangle=90,
           wedgeprops=dict(width=0.40, edgecolor="white", linewidth=2.2))
    ax.text(0, 0.10, total_label, ha="center", va="center",
            fontsize=21, fontweight="bold", color=NAVY)
    ax.text(0, -0.26, "total", ha="center", va="center", fontsize=10, color=MID)
    lax.axis("off")
    n = len(parts)
    for i, (lab, val, col) in enumerate(zip(labels, parts, colors)):
        y = 0.80 - i * (0.62 / max(1, n - 1)) if n > 1 else 0.5
        lax.add_patch(plt.Rectangle((0.02, y - 0.045), 0.075, 0.09,
                                    facecolor=col, edgecolor="none",
                                    transform=lax.transAxes, clip_on=False))
        lax.text(0.13, y, lab, va="center", fontsize=12.5,
                 color=NAVY, fontweight="medium", transform=lax.transAxes)
        lax.text(0.99, y, f"{val}  ({val*100//total}%)", va="center", ha="right",
                 fontsize=12.5, color=MID, transform=lax.transAxes)
    return _out(fig)


def spend_vs_return(labels, spend, ret, w=7.2, h=2.5):
    """Paired bars: spend (grey) against revenue/value returned (blue)."""
    fig, ax = plt.subplots(figsize=(w, h))
    x = np.arange(len(labels)); wd = 0.36
    ax.bar(x - wd / 2, spend, wd, color=GREY, zorder=3, label="Ad spend")
    ax.bar(x + wd / 2, ret, wd, color=BLUE, zorder=3, label="Revenue returned")
    _clean(ax)
    ax.set_xticks(x); ax.set_xticklabels(labels, fontsize=9.4)
    top = max(max(spend), max(ret))
    for i in range(len(labels)):
        ax.text(x[i] - wd / 2, spend[i] + top * 0.03, f"{spend[i]:,}",
                ha="center", fontsize=9, fontweight="bold", color=MID)
        ax.text(x[i] + wd / 2, ret[i] + top * 0.03, f"{ret[i]:,}",
                ha="center", fontsize=9, fontweight="bold", color=NAVY)
    ax.set_ylim(0, top * 1.2)
    ax.legend(fontsize=9.4, frameon=False, ncol=2, loc="upper left")
    return _out(fig)


def trend_down(months, values, unit="", w=6.4, h=1.9):
    """Cost coming down over time. Red start, blue end."""
    fig, ax = plt.subplots(figsize=(w, h))
    x = np.arange(len(months))
    ax.plot(x, values, color=BLUE, lw=2.8, solid_capstyle="round", zorder=3)
    ax.fill_between(x, values, color=BLUE, alpha=0.07, zorder=2)
    ax.scatter([x[0]], [values[0]], s=60, color=RED, zorder=4,
               edgecolor="white", linewidth=1.6)
    ax.scatter([x[-1]], [values[-1]], s=70, color=BLUE, zorder=4,
               edgecolor="white", linewidth=1.6)
    ax.annotate(f"{unit}{values[0]}", (x[0], values[0]), textcoords="offset points",
                xytext=(0, 9), fontsize=9.6, fontweight="bold", color=RED, ha="left")
    ax.annotate(f"{unit}{values[-1]}", (x[-1], values[-1]), textcoords="offset points",
                xytext=(0, 9), fontsize=9.6, fontweight="bold", color=BLUE, ha="right")
    _clean(ax)
    ax.set_xticks(x); ax.set_xticklabels(months, fontsize=9)
    ax.set_ylim(0, max(values) * 1.3)
    return _out(fig)


def growth_area(months, values, w=6.4, h=1.9):
    """Clicks or conversions growing. Used inside the results panel."""
    fig, ax = plt.subplots(figsize=(w, h))
    x = np.arange(len(months))
    ax.plot(x, values, color=BLUE, lw=2.8, solid_capstyle="round", zorder=3)
    ax.fill_between(x, values, color=BLUE, alpha=0.09, zorder=2)
    ax.scatter([x[-1]], [values[-1]], s=70, color=BLUE, zorder=4,
               edgecolor="white", linewidth=1.6)
    _clean(ax)
    ax.set_xticks(x); ax.set_xticklabels(months, fontsize=9)
    ax.set_ylim(0, max(values) * 1.25)
    return _out(fig)

"""Run on the finished SEO audit PDF before anyone sees it.

    python3 build/check_pdf.py out/Client_SEO_Proposal.pdf [expected_pages] [--old-terms]

Add --old-terms only when the prospect was already given the old guarantee (90 days,
everything back plus $1,000). Then "$1,000" is allowed and the old wording is not flagged.

Every line is a rule from SKILL.md or from the October 2026 audit review. Exit code 1 on
any FAIL. Fix the content file and rebuild; never edit the PDF.
"""
import re, sys
import pymupdf as fitz

BANNED = ["leverage", "robust", "seamless", "elevate", "unlock", "delve", "foster", "tapestry",
 "testament", "cutting-edge", "bespoke", "synergy", "meticulous", "myriad", "plethora",
 "holistic", "empower", "streamline", "pivotal", "game-chang", "state-of-the-art",
 "world-class", "best-in-class", "in today's", "at the end of the day", "when it comes to",
 "that being said", "in conclusion", "rest assured", "look no further", "not only",
 "it is important to note", "needless to say", "furthermore", "moreover", "supercharge",
 "transformative", "revolutionary", "groundbreaking", "drive results", "move the needle",
 "please don't hesitate", "best regards", "comprehensive"]
EXEMPT = ["dynamic retargeting", "dynamic search ads", "dynamic creative", "ai optimize seo",
          "gmb optimisation", "conversions api", "performance max"]

# Audit review findings, as text that must never appear.
NEVER = {
 "placeholder (finding 1, 6)": [r"\bTBC\b", r"\bTBD\b", r"to confirm", r"\[ASK", r"client name"],
 "old or unconfirmed team story (finding 7)": [r"small team", r"nobody behind (him|us)",
     r"runs your account himself", r"one person on your account"],
 "ranking promise with a date (finding 7)": [r"rank by", r"ranking by", r"be found before",
     r"page one by", r"rank before", r"guaranteed? (ranking|position|page one)"],
 "DIY fix handed over (finding 5)": [r"quick wins?", r"do this yourself", r"paste (this|the)",
     r"copy (this|the) text", r"fix it yourself", r"takes? (5|five|10|ten|15|fifteen|20) minutes to fix"],
 "cut page came back (finding 2, 8)": [r"\bcontents\b", r"others vs us", r"after you say yes",
     r"none of this makes us special", r"12-month projection", r"twelve-month projection"],
 "old terms (finding 11)": [r"month to month", r"30 days'? notice", r"thirty days'? notice"],
 "Partner overstated (finding 7)": [r"partner status means", r"google audits"],
 "Google Ads offer in an SEO audit (finding 7)": [r"ad credit"],
 "monthly used for a total (finding 4)": [r"\d[\d.,]*\s?K?\s+monthly clicks",
     r"monthly clicks from google in", r"from [\d,.]+K? to [\d,.]+K? monthly"],
 "crossed-out price (finding 6)": [r"\bwas \$?\d"],
}
# The old guarantee (before 1 November 2026). Only for someone already given it (--old-terms).
OLD_GUARANTEE = [r"plus \$?1,000", r"1,000 (USD|cheque)", r"90[- ]day (money[- ]back|guarantee|target)"]

# No price anywhere (October 2026), and no money figure at all since the guarantee lost its
# $1,000 (1 November 2026). With --old-terms the old guarantee's 1,000 is allowed.
PRICE = re.compile(r"(\$\s?\d[\d,]*|\b\d[\d,.]*\s?(USD|AED|GBP|EUR)\b|/\s?mo(nth)?\b|"
                   r"\bper month\b|\bsetup fee of\b)", re.I)
ALLOWED_MONEY = re.compile(r"(\$\s?1,000|\b1,000\s?USD)\b", re.I)


def main(path, expected=18, old_terms=False):
    d = fitz.open(path)
    pages = [p.get_text() for p in d]
    text = "\n".join(pages)
    low = text.lower()
    for e in EXEMPT:
        low = low.replace(e, "")
    results = []

    def res(name, ok, detail=""):
        results.append((name, ok, detail))

    res(f"page count is {expected}", len(pages) == expected, f"got {len(pages)}")
    hits = {"em dash": text.count("—"), "en dash": text.count("–"),
            "curly quote": sum(text.count(c) for c in "“”‘’")}
    res("no dashes, no curly quotes", not any(hits.values()), str(hits))
    found = [b for b in BANNED if b in low]
    res("no banned words", not found, ", ".join(found))
    for name, pats in NEVER.items():
        bad = [m.group(0) for p in pats for m in re.finditer(p, text, re.I)]
        res(f"no {name}", not bad, ", ".join(sorted(set(bad))))
    money = [m.group(0) for m in PRICE.finditer(ALLOWED_MONEY.sub(" ", text) if old_terms else text)]
    res("no prices or money figures anywhere", not money, ", ".join(sorted(set(money))))
    if not old_terms:
        bad = [m.group(0) for p in OLD_GUARANTEE for m in re.finditer(p, text, re.I)]
        res("no old guarantee (90 days, plus $1,000)", not bad, ", ".join(sorted(set(bad))))
        res("guarantee says 180 days", "180 days" in text)
    res("no 'Google Ads' chip on the cover", "google ads" not in pages[0].lower())
    res("AI facts carry their sources",
        ("2 billion" not in low or "alphabet" in low) and ("8%" not in text or "pew" in low))
    last = pages[-1].lower()
    links = [l.get("uri", "") for l in d[-1].get_links()]
    res("close page: two ways to move forward",
        "reply \"yes\"" in last.replace("“", '"').replace("”", '"') and "15 minutes" in last)
    res("close page: walkthrough link is tappable",
        any("cal.id/mavixmarketing/strategy-call" in u for u in links), str(links))
    res("close page: reply-yes link is tappable", any(u.startswith("mailto:") for u in links))
    res("close page: the target and first three things",
        "target we would agree" in last and "first three things" in last)
    res("every case study carries its URL", low.count("mavixmarketing.com/case-studies/") >= 3)
    res("scope page lists AI assistants",
        all(w in low for w in ("chatgpt", "perplexity", "gemini", "ai overviews", "ai mode")))

    w = max(len(r[0]) for r in results)
    for name, ok, detail in results:
        print(f"{'PASS' if ok else 'FAIL'}  {name.ljust(w)}  {detail if not ok else ''}")
    failed = [r for r in results if not r[1]]
    print("\nALL PASS" if not failed else f"\n{len(failed)} FAIL")
    return 1 if failed else 0


if __name__ == "__main__":
    old = "--old-terms" in sys.argv
    args = [a for a in sys.argv[1:] if a != "--old-terms"]
    sys.exit(main(args[0], int(args[1]) if len(args) > 1 else 18, old))

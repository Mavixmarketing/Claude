# Run before delivering

Show as a pass/fail table. Fix failures, re-run.

| # | Check | How |
|---|---|---|
| 1 | **No invented figures** | Every number traces to a tool, to Farhan, or is a marked blank. State this as an explicit pass |
| 2 | **Jargon** | Scan **all five files** against the ban-list in `voice.md`. Zero hits. Ignore hits inside a URL, inside a tool constant, and inside the four dashboard tile labels, which are Google's and Meta's own words printed on the screenshot |
| 2b | **The right intro closing** | The intro's last paragraph matches the service and the package. No search guarantee anywhere near an ads call. No guarantee promised to a Starter prospect |
| 3 | **Read-aloud** | Every spoken line in the script read as speech. Report anything you rewrote |
| 4 | **Specific to this prospect** | Competitor names, city, their numbers. If it could be pasted into another call it is a template — start again |
| 5 | **One service only** | No ads content in an SEO kit, no SEO content in an ads kit |
| 6 | **Timing** | Script timestamps add up to 30 minutes |
| 7 | **Promises** | No ranking position, no lead count, no specific return. Guarantee stated exactly as in `facts.md` |
| 8 | **Nothing manipulative** | No fake scarcity, no invented deadline, no pressure close. Would he be fine with the prospect hearing a recording in six months? |
| 9 | **Prices match the campaign** | Script and review PDF both use the prospect's campaign prices from `facts.md` ($349 / $549 / $1,649 for USA/Canada and Aus/UK/NZ/Sing, $999 / $1,349 / $1,999 for AI Written), or the price already quoted to them. One set only, never mixed. No "was" price, no "month to month, 30 days' notice" on search. The emailed SEO audit itself carries no price |
| 9b | **AI search** | Only the two allowed facts from `facts.md`, each with its source. No promise of a spot in an AI answer |
| 10 | **Case studies matched** | Real ones from mavixmarketing.com/case-studies, named the way the website names them, website numbers and timeframe exact, URL in every case study document. Right service, right industry, never a direct rival. No retired cover name anywhere. If a rule had to bend, it is named in the chat summary |
| 10b | **Dashboards match their captions** | Open every embedded screenshot. The date range on the picture must agree with the period claimed around it, and a period total must never be called a monthly figure. Any tile figure quoted must be printed on that screen |
| 10c | **No service crossover** | An ads kit has no rankings, keywords, blogs, links or search case study. An SEO kit has no ad spend, cost per lead or ads case study. Search all five documents for both sets of words |
| 11 | **Every PDF page viewed** | All pages opened with Read. Nothing clipped, nothing overflowing, charts aligned |
| 12 | **Wrong-audit fallback** | The script says what to do when a finding turns out to be wrong |
| 13 | **Unreachable data listed** | Everything research could not get is named, with the tab he opens himself |

## The jargon scan

```python
import re, glob
banned = ("optimise visibility presence authority footprint ecosystem engagement conversion funnel "
  "indexed crawl schema canonical on-page off-page CTR ROAS CPA SERP CRO KPI ROI attribution "
  "leverage utilise delve robust seamless streamline elevate unlock supercharge empower foster "
  "cultivate myriad plethora paradigm holistic synergy bespoke meticulous intricate nuanced "
  "multifaceted invaluable transformative embark relentless groundbreaking revolutionary "
  "unparalleled world-class best-in-class top-notch cutting-edge state-of-the-art game-changer "
  "renowned harness illuminate bolster commence furthermore moreover consequently subsequently "
  "thereby unwavering turnkey value-add pivotal beacon cornerstone gateway testament").split()
phrases = ["take your business to the next level","technical seo","domain authority","anchor text",
  "map pack","at the end of the day","circle back","touch base","moving forward","drive results",
  "solutions provider","low-hanging fruit","digital transformation","growth hacking","no-brainer",
  "crushing it","here's the thing","the truth is","that being said","in order to","deep dive",
  "great question","rest assured","data-driven","results-driven","we help businesses grow",
  "do you have any questions"]
# Exempt URLs, tool constants, and anything in backticks — that is where the dashboard tile
# labels live, and those are Google's and Meta's own words printed on the screenshot.
EXEMPT = re.compile(r'https?://\S+|`[^`]*`|\b[\w.-]+\.(com|org|net|dev|php)\S*')
targets = glob.glob("*.md") + glob.glob("*/*.md") + glob.glob("*/html/*.html")
for f in sorted(targets):
    low = EXEMPT.sub(" ", open(f).read().lower())
    hits = sorted({w for w in banned if re.search(r'\b' + re.escape(w.lower()) + r'\b', low)})
    hits += [p for p in phrases if p in low]
    print(("PASS " if not hits else "FAIL "), f, hits or "")
```

Run it from the folder holding the finished kit. Zero hits everywhere.

Also run the humanizer scanner at `/root/.claude/skills/synced/mavix-text-humanizer/`. Zero hard findings.

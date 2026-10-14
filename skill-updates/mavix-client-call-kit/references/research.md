# The live research battery

## Which battery to run

Work out the service first. Everything after that follows from it.

| Step | What happens |
|---|---|
| 1 | Decide the service — rankings or ads. Rules in `SKILL.md` step 1, and the ads signals table in `ads-track.md` section 1. If it is genuinely unclear, ask *"Is this one about rankings or about ads?"* and nothing else |
| 2 | Run **the shared battery** below. Same on every call |
| 3 | Then run **one** of: the SEO battery below, or the ads battery in `ads-track.md` section 2 |

Never both. An SEO kit with a line of ads research in it is a failed kit, and so is the reverse. Check 5 in `checks.md` is this rule.

Roughly $2.50 and five minutes per prospect either way.

---

## The two tools

Both are connected through Composio and both work.

### Bright Data — search results

`BRIGHTDATA_SERP_SEARCH`, zone **`n8n_serp_api`**, engine `google`, format `json`, data_format `markdown`, country the prospect's own country code (`us` unless you know better — set `ae` for Dubai, `gb` for the UK, and so on; the wrong country returns the wrong page one).

Gets you: the box at the top of Google (three businesses with ratings and review counts), paid ads at the top, Local Services Ads, organic page one, People Also Ask, related searches.

**Run five to eight keywords.** Their main service + city, the cheaper variant of it, and three or four things a real customer would type.

**When it fails.**

| Symptom | What it is | Fix |
|---|---|---|
| `client_10030` | The calling IP is not on the zone's allowlist. Composio calls out from a rotating AWS pool, so a new IP appears without warning. The error message names the IP | Add it at `https://brightdata.com/cp/zones/n8n_serp_api/access_params`. Allowed as of the last run: 167.86.94.140, 54.243.138.89, 52.72.72.59 |
| Hangs, then dies at 60 seconds | More than about five calls batched at once | Run them in groups of five or fewer |

There is no Web Unlocker zone on this account, so Bright Data cannot do Google Maps or the Facebook Ad Library. Those go to Apify or to a manual tab.

### Apify — everything else

`APIFY_RUN_ACTOR_SYNC_GET_DATASET_ITEMS`. If an actor ID does not resolve, look it up with `APIFY_STORE_GET` rather than guessing a new one.

| What | Actor | Notes |
|---|---|---|
| Google Business Profile and reviews | `compass/crawler-google-places` (`nwua9Gu5YrADL7ZDj`) | `reviewsSort: newest`, `maxReviews: 10`. **The newest review's date is the most important field on the whole call.** Keep the place count small — a wide search can outlast the sync call |
| Ranked keywords, difficulty, traffic estimate | `santhej/dataforseo-labs-keyword-explorer` | ~$0.003 per keyword row. SEO battery only |
| Search volume and cost per click | `aitorsm/keyword-volume` | ~$0.012 per keyword. SEO battery only |
| Facebook Ad Library | `apify/facebook-ads-scraper` | Ads battery only. **Search by page ID, not keyword.** Full instructions in `ads-track.md` section 2 |

Six actors at once times out. Run async, or in smaller batches.

---

## The shared battery — every call, either service

This is the part that does not care which service they need. Pull all of it before you branch.

| What to pull | How | Why it matters |
|---|---|---|
| **The business** | Their site, read as a buyer | What they actually sell, is there a price anywhere, is there a form, **is the phone number on the service page** |
| **The owner** | Their site's about page, the Google listing, LinkedIn | The name to use, how long they have been going, an odd turn in their background. This is what the first two minutes of the call are built from |
| **The Google listing** | `compass/crawler-google-places` | Rating, review count, photos, whether the description, services, hours and Q&A are filled in |
| **Reviews and their dates** | Same actor, `reviewsSort: newest` | **The date of the newest review.** Plus reviews worth quoting — a named project, a repeated compliment, a recurring criticism |
| **The competitors nearby** | The box at the top of Google for their main search, then the same listing pull on the top two | **The review gap is usually the headline.** Who holds the three slots |
| **Address consistency** | Site against listing | Two different addresses is a small fix and an easy win to hand over |
| **Social and LinkedIn** | Search their name, open what exists | A profile last posted to in 2022 is worth naming gently. LinkedIn also confirms who decides |

---

## The SEO battery

Only for a rankings prospect. Skip the whole section on an ads call.

| What to pull | How | What it tells you |
|---|---|---|
| **Where they rank, and for what** | `santhej/dataforseo-labs-keyword-explorer` on their domain | **Count how many of their top-three rankings are just their own brand name.** That single number tells the whole story — they show up when somebody already knows them, and nowhere else |
| **Volume and cost per click** | `aitorsm/keyword-volume` on the five to eight keywords that matter | "480 people a month type that in" is the sentence. The cost per click is what the same click costs if they buy it instead |
| **Difficulty** | Same keyword explorer run | Which of those are winnable this year and which are not. Sort the plan by it |
| **The box at the top of Google** | `BRIGHTDATA_SERP_SEARCH` on each keyword | Who holds the three slots on each search, and whether they are in any of them |
| **Click estimates** | Traffic estimate column from the keyword explorer, read against volume | Roughly what a first-page spot is worth in clicks a month. **Always say it as an estimate out loud** — never as a promise, and never as a lead count |
| **Reading traffic or buying traffic** | Look at what their ranking keywords actually are | Ranking for "how to unblock a sink" is people reading. Ranking for "emergency plumber [city]" is people buying. Most struggling sites rank for the first kind |
| **The towns they do not cover** | Their site's page list against the towns around them | Every nearby town with no page is a search nobody at that business has ever turned up for |
| **Their best service, invisible in search** | Their site against the keyword data | The thing they are proudest of and get no searches for. This one usually stings the most |
| **Site speed** | Manual tab: `pagespeed.web.dev`, run their home page and one service page, **mobile score, not desktop** | A slow phone page loses people who were ready. Report the score and the load time, nothing deeper. No talk of what to change — that is delivery work, not call work |

---

## If this is an ads prospect

Do not use the SEO battery above. The ads battery is **section 2 of `ads-track.md`** — run it in the order written there.

The Facebook Ad Library is the centrepiece of it. Everything else on an ads call is read against what that tab shows, and Farhan opens it live while the prospect watches.

---

## The manual tabs

Some things beat any API, and Farhan opens them himself. Check each one still loads the morning of the call.

**Shared — open these on either kind of call:**

| What | Where |
|---|---|
| Site speed on a phone | `pagespeed.web.dev` |
| Their site on his actual phone | Does the number dial when tapped? |
| Their listing as a customer sees it | Google Maps, on a phone |

**SEO kits only — never open these on an ads call:**

| What | Where |
|---|---|
| Domain age | `duplichecker.com/domain-age-checker.php` |
| Domain rating, theirs against a competitor's | `ahrefs.com/website-authority-checker/` |
| Traffic estimate | `semrush.com/website/` |
| Broken links | `ahrefs.com/broken-link-checker` |

**Ads kits only:** the tabs in `ads-track.md` section 2 — the Facebook Ad Library first, then Google's ads transparency page.

---

## What research cannot reach

Some things do not come from a tool. They come out of the prospect's mouth, or they stay blank.

**Never guess one.** Not a ranking, not a review count, not a search volume, not a spend figure. A guessed number dies the second Farhan says it out loud and the prospect says "no, it's half that." Everything in the kit is verified by a tool, given by Farhan, or absent.

Cannot be seen from outside on any call:

- What they spend a month on anything, and what it earns them
- What a lead currently costs them, and what a customer is worth
- Their close rate, their capacity, whether they even want more work
- What is happening inside Search Console or Analytics
- Who ran their marketing before, and what went wrong

Plus anything a tool simply failed on that day — a listing that would not pull, a keyword run that timed out.

**The rule.** Every one of these gets named in the script, in the "Check yourself before you dial" header section, with the tab Farhan opens himself and the question he asks in discovery to fill it. Nothing unreachable is quietly left out, and nothing unreachable is quietly filled in. Check 13 in `checks.md` is this rule.

---

## The tab list

Every script gets one numbered list of real clickable URLs in call order. **The middle of the list depends on the service.**

**Shared, both kinds of call:** their site · their main service page · their listing · a competitor's listing · any neglected profile of theirs · the competitor page that does the thing they don't · the shared manual health checks above · the matched case study · the pricing comparison page, last and shut unless they push on price.

**SEO kits add:** each keyword search · the SEO-only manual tabs above · **Brother Filtration's Search Console and Analytics**, which is a live search screen share and must never be opened on an ads call.

**Ads kits add:** the Facebook Ad Library for them and for two named competitors · Google's ads transparency page for the same three · the page their ad lands on, on a phone. Full list in `ads-track.md` section 2. No keyword tabs, no Search Console, no Ahrefs, no Semrush.

Then a short note on how to use them — which pairs go side by side, which one stings, which stays shut unless they push on price.

Mark the ones the research could not reach, so he opens those himself.

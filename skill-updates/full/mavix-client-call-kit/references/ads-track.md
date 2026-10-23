# The ads track

**The hard rule, first.** An ads kit contains no search work. Not a page, not a case study, not a sentence, not a stray line about rankings in the plan. The script is ads, the review is ads, all three case studies are ads. If the prospect asks about rankings mid-call the line is *"different conversation, different day."* Then back to ads.

Everything below is a delta. `script.md`, `review-pdf.md`, `facts.md`, `voice.md` and `case-library.md` still rule. This file only says what changes.

---

## 1. Spotting an ads prospect

| Signal in what Farhan pasted | Read it as |
|---|---|
| "I need leads now", "we need this working by next month" | Ads |
| Mentions a monthly ad spend, a budget, a card, an agency invoice | Ads |
| Mentions a pixel, a tag, Ads Manager, a Business Manager, boosting posts | Ads |
| "We tried ads and it burned money" | Ads, and read section 6 before writing a word |
| Wants rankings, traffic, blogs, "found on Google", competitors above them | Search. Wrong kit. Stop |
| Both, in the same message | Ask. Do not build both |

Two more that decide it quietly. If the Facebook Ad Library shows live ads on their page, they are already an ads buyer and the call is about waste, not about starting. If a competitor has ads running and they have none, the call is about the money walking past the door.

**When it is genuinely unclear, ask one question and nothing else:**

> *"Is this one about rankings or about ads?"*

Do not explain the difference, do not offer both, do not ask a second question. One line, then build for the answer.

---

## 2. The ads research battery

Same budget as the search battery, roughly five minutes and a couple of dollars. The order matters — the Ad Library first, because everything after it is read against what you found there.

### The Facebook Ad Library, the centrepiece

Free, public, live, and the most persuasive tab on an ads call. It shows every ad a page is running right this minute, with the date each one started.

Apify actor `apify/facebook-ads-scraper`. **Search by page ID, never by keyword** — keyword search matches ad text and returns junk from unrelated pages. Get the page ID first: Bright Data SERP on `"business name" facebook`, open the page, the ID sits in the page transparency box.

Pull for the prospect and for the top two or three competitors:

| Field | What it tells you |
|---|---|
| Number of live ads | Fourteen against nothing is the whole call in one number |
| Start date on each | An ad running eight months is an ad that makes money. Nobody pays to run a loser for eight months |
| The words in the ad, and the offer inside it | What the competitor promises — free quote, price from, finance, a discount — and whether it beats what the prospect promises |
| Where the ad points | Copy the link. This becomes the landing page check below |
| Image or video, how many versions | One ad five ways means somebody is testing. One ad one way means nobody is watching |

**When it fails.** It fails on pages with no ads, which is itself a finding, not an error. It fails if the page ID is wrong — check you are on the business page, not a place page or a group. If the actor times out or returns nothing, hand it to Farhan as a manual tab: `facebook.com/ads/library` → All ads → country → the business name. **Open it live on the call either way.** Watching a competitor's fourteen ads load in real time beats any chart of the same fact.

### The rest of the battery

| What to pull | How | What it tells you | When it fails |
|---|---|---|---|
| Who is paying to sit above them on Google | Bright Data `BRIGHTDATA_SERP_SEARCH`, zone `n8n_serp_api`, country `us`, five to eight buying keywords | Which rivals pay for the searches with a card behind them. Their own ad, if any | Error `client_10030` is the allowlist, the message names the IP. Add it at the zone access page. Batch five at a time or it times out at 60 seconds. If it still fails, Farhan opens an incognito tab and searches |
| The Google side of what a rival runs | Manual tab: `adstransparency.google.com` | Google's own library. Ad text, formats, and how long each has run | No tool reaches this. Always a manual tab |
| Where the click lands, and their own site | Open the link from the ad, then their site. Read both as a buyer | Does the page match the ad or is it the homepage. Is there a price. How many form fields. Is there a thank-you page. Does the number dial on a phone | Nothing to fail. Farhan opens it |
| Does tracking look present from the outside | Manual tab: view page source, search for `gtag`, `fbq`, `gtm` | Whether anything is there at all | You can see whether a tag exists. You cannot see whether it fires, whether it fires on the right page, or whether it records anything useful. Say "something is there" or "nothing is there", never more |
| Their Google listing and reviews | `compass/crawler-google-places` | Only for the ice-breaker and for the "people check you after they click" point. **No ranking talk anywhere** | If it fails, skip it. It is not load-bearing on an ads call |

### What cannot be seen from outside. Ever.

These four never come from a tool, never from a guess, never from a "typical for this industry" figure. They come out of the prospect's mouth in discovery, or they stay blank.

**What they spend a month. What a lead currently costs them. What a customer is worth. The account history** — who ran it, for how long, what happened, whether the account still exists.

If a number in the review PDF needs one of these, leave the space blank and fill it live, or leave it out. A guessed spend figure dies the second Farhan says it out loud and the prospect says "no, it's half that."

---

### When the Ad Library comes back empty

This happens often, and it is not a tool failure. A dental practice or a trade business buying Google Ads through a local contractor may run no Meta ads at all, and neither may its competitors.

**Do not force it.** If neither they nor two named competitors have anything live:

- Page 3's hero becomes Google's ads transparency page instead — same idea, same shock, different source. Search the competitor's domain at `adstransparency.google.com`, screenshot the live ad count and the date the first ad started running.
- Page 5's ad examples come from the same place.
- If **both** libraries are empty for everyone, say so in the script as a finding in its own right: nobody in this town is advertising, which is either an opportunity or a warning, and the prospect knows which.
- Never draw a chart of ads you did not see.

### The page ID step needs a human

Getting a Facebook page ID means opening the page, and there is no Web Unlocker zone on this account, so no tool in the kit can do it. **This is a manual tab, not an automated step.** Put it in "Check yourself before you dial" with the search already written out, and let Farhan paste the ID back if a deeper pull is wanted. Do not stall the build waiting on it — the Ad Library's own search box takes a business name.

## 3. The findings that matter on an ads call

Not rankings. Money leaks. Every one of these is money leaving now, and every one ends in a number the prospect said themselves in discovery.

| The finding | Why it stings | The money line, using their own job value |
|---|---|---|
| A competitor is running fourteen ads. They run none | Somebody nearby has decided this works and is paying for it every day | *"Fourteen ads, and the oldest has been running since March. Nobody funds a losing ad for six months. At [job value] a job, how many of those do you reckon were yours?"* |
| Their ad points at the homepage, not at the thing advertised | They paid for the click, then asked the buyer to go and find it | *"They clicked an ad about kitchens and landed on a page about you. Most people leave. That's [ad cost] paid for nothing, every time it happens"* |
| The page does not say the price | The single most common reason a good click dies | *"The first thing anyone wants is a rough number. The page never gives one, so they go back and click the rival that does"* |
| The form has eleven fields | Every field past four loses people who were ready | *"Eleven boxes to ask a question. Name, number, what they want — that's three. The other eight are costing you enquiries you already paid for"* |
| One ad, unchanged for a year | Nobody is watching the account | *"Same ad since last February. That isn't a strategy, that's a direct debit"* |
| No sign of any tracking | They cannot tell which ad made which sale | *"So right now, if I asked which ad produced last month's best job, could you tell me?"* Wait |

**The rule.** Ask before telling, every single time. *"Have a guess how many ads they've got running right now"* lands ten times harder than announcing fourteen. Then show the tab.

**The arithmetic to say out loud, slowly, once.** A job is worth $X. They close Y in ten. So ten enquiries is $Z. Every finding above then gets priced against $Z, and so does the fee later.

**If a finding turns out to be wrong:** *"That's on me. Good — one less thing."* Move on, do not defend it.

---

## 4. Script deltas, section by section

Structure, section order and minute markers stay exactly as `script.md`. Only these change.

### The header

- Ground rules carry the **ads ladder** from `facts.md`, not the three search packages. Floor is **$200**, not the search floor.
- Tabs list is reordered: their site first, then the ad they are running or the one they are not, then **the Ad Library on the competitor** (this is the one that stings), then the competitor's landing page beside their own, then the Google search showing who is paying, then the case study. Ad Library and the two landing pages go side by side.
- "Check yourself before you dial" gains one line: **reload the Ad Library that morning.** Ads go up and come down daily. A count from yesterday can be wrong today.

### The open and the agenda (0-4)

Unchanged. Same warm-up, same researched curiosity, the intro from `facts.md` word for word, then the agenda with the "if I'm not right for you I'll say so" line, and wait for an answer. One delta on the homework tease — do not promise a free fix. Say: *"I spent half an hour in your account's neighbourhood yesterday. There's one tab I want to show you that I don't think you've seen."*

### Discovery (4-13)

Still eight questions, still three seconds of silence after each. These are the ads eight:

1. What you sell, and who buys it.
2. **What is a customer actually worth to you?** First job, and again if they stay.
3. How many of those a month, now.
4. **Are you running ads right now — where, and what are you putting in a month?**
5. **What does a lead cost you at the moment?** Then: *"is that a number you can see, or a feeling?"*
6. **Who ran it before you, and what happened?**
7. **Is anything tracked — can you tell which ad produced which enquiry?**
8. Why you replied to the email.

Questions 2, 4, 5, 6 and 7 are the ones that cannot be researched. They are not optional and they are not paraphrased. If the call runs long, cut something else.

Then one layer deeper, two or three times, as in `script.md`. Then the four qualifying questions. Then the yes/no/maybe ending.

### Play it back, then diagnose (13-16)

Recap, ask *"have I missed anything?"*, take the correction.

The diagnosis is different. It is not "you're not in the room when someone decides to spend." It is: *"Money's going out. You can't see what it bought. That's not a you problem, that's what happens when nobody sets the account up to answer that question."*

Then permission: *"Want me to show you?"*

### Show them the money (16-21)

Two or three findings from section 3. Share the Ad Library live rather than a slide of it. Ask, then show, then price it against their own job value.

If the audit found nothing bad — they run tidy ads, the page is fine — say so plainly and move to what more spend could buy. Do not manufacture a problem.

### What we'd do (21-24)

This section changes most, because ads produce in weeks and the honest answer is not "it starts working tomorrow."

**The timeline table, in weeks:**

| When | What happens |
|---|---|
| Week 1 | Tracking goes in first. Nothing runs until it records something. Accounts built in their name |
| Weeks 2-3 | Campaigns live, small. This is the learning period. The platform is guessing and the early numbers look bad because they are supposed to |
| Weeks 4-6 | Enough recorded enquiries to see a shape. Waste cut weekly — placements, audiences, search terms |
| Weeks 7-12 | Judge it properly. Budget goes up only on what already pays |
| Month 4 onward | Fresh ads before the old ones tire. Same loop, bigger |

**The honest line about when to judge it, said out loud:**

> *"Google's own advice is to wait for about a hundred recorded enquiries or sales before you judge what each one costs you. Meta needs roughly fifty recorded actions in seven days before it settles down. Anyone who tells you they know in week one is guessing."*

Those two figures are in `facts.md`. They are Google's and Meta's own guidance, not a Mavix promise. Say them as such.

Unchanged from `script.md`: **what they get weekly and monthly** (Friday written update, one-page monthly including what did not move, Slack channel, his personal number), **the agency-problems table** (same seven rows), and **the offer as five answers**, in ads words.

Then risk removed: no setup fee, no contract, 30 days' notice, **every account in their name and their name only**, and the $1,000 Google ad credit on qualifying spend.

### Trial close, price, ask (24-26)

Trial close first, as always. Never price into a maybe.

**Say the budget line before the fee, and every time the fee comes up after it:**

> *"Before the number — your ad budget is yours. It sits on your card, in your account, going straight to Google and Meta. It never comes through us and we never touch it. You can turn it up or off any day you like. What I'm quoting is only my fee for running it."*

**The ladder, said slowly, then stop:**

| When | Fee |
|---|---|
| Month 1 | **$249** |
| Month 2 | **$349** |
| Month 3 onward | **$449**, flat |

Then Farhan's own words on why it starts low:

> *"It starts low on purpose. Running ads needs real money in the ad budget, and it takes time for the platform to settle. Keeping my fee low for the first two months means my fee isn't the thing holding you back."*

And, when asked why month one is not free — and it does get asked:

> *"Because it isn't free for me. Month one is setup, tracking, research and building the campaigns, plus the software costs on my end. I'd rather charge a low fee and do the work than call it free and cut corners."*

**Then stop and count to ten.** Whoever speaks first loses.

Then set $449 against one job of theirs, using the number they gave in discovery.

If money is the only blocker, two moves and no others: talk about the ad budget separately from the fee, or walk politely. **The floor is $200.** Never invent a number on a call.

### The close (26-30)

Unchanged. Deposit ask of $50-$100, once. Onboarding link the same day. *"What else do you want me to show you?"* Maybe gets a date booked in cal.com before hanging up. No gets one genuinely useful free tip on the way out — on an ads call that is usually the form fields or the missing price, and it costs nothing to hand over.

---

## 5. The ads review PDF, page by page

A4 portrait, 12-14 pages, same house style, same toolkit in `assets/`, chart or table on every page. Cover, method, what we would do, how we work, pricing and the hiring comparison are shared with the search version and barely change. The middle is entirely different.

| # | Page | What carries it |
|---|---|---|
| 1 | **Cover** | Their name, city, "Paid ads review", date. Fact table, contents. Headline in one line: *the money is already leaving, we can see what it buys* |
| 2 | **What we looked at** | The method, plainly. Names the Ad Library, the search results, their page, their form. Builds trust that this is real work |
| 3 | **The headline finding** | Hero chart: live ad counts, them against two named competitors, with the oldest start date beside each bar. A callout that separates spending from being watched |
| 4 | **Are you running ads, and since when** | A dated line showing what has been live and when it stopped. If nothing is running, the page says so in one sentence and the chart shows the competitors' ads instead |
| 5 | **What your competitors are running right now** | Real ad examples pulled from the Ad Library, shown as cards — the words, the offer, the start date. Two or three of them. Then a table: what each one promises, and what the prospect promises |
| 6 | **Who is paying to sit above you** | The search results snapshot for their main buying searches. Who is there, who is not |
| 7 | **Where the click lands** | Their page beside a competitor's, same scroll. Marked: does it match the ad, is there a price, how many form fields, does the number dial |
| 8 | **Can anything be measured** | A plain checklist table — tag present or absent, price page, thank-you page, phone tracking. Every row says what it means, and the page says clearly that the inside of the account can only be seen with access |
| 9 | **What the money is doing now, and what it could do** | The arithmetic page. Their spend, their job value, their close rate, all as they gave them. Same money, different shape. Every figure labelled as theirs or as worked out from theirs |
| 10 | **What we would do** | Numbered stages. Tracking first, always |
| 11 | **The first ninety days** | Vertical timeline with date chips. The learning period drawn in and named, with the hundred-enquiries and fifty-actions-in-seven-days lines printed as Google's and Meta's own guidance |
| 12 | **How we work** | Weekly, monthly and always cards, then the agency-problems table |
| 13 | **Pricing** | The three-step ladder as steps, not tiers. A fourth panel, **"Your ad budget — yours"**: your card, your account, straight to the platform, never through us, change it any day. Terms strip: no setup fee, month to month, 30 days, accounts in your name, $1,000 Google ad credit on qualifying spend |
| 14 | **Hiring someone, or using us** | Two panels, qualitative, no invented salary figures |

**Trimming to 12.** Drop page 6 if the search snapshot is thin, and page 8 if nothing at all could be seen from outside. Never drop 3, 5, 7, 9 or 13.

**Pages that must never appear:** rankings, keyword tables, search volume, difficulty, click estimates, towns without pages, blog plans, links. If one has crept in, the kit is wrong. **Case studies:** the real ads case studies from mavixmarketing.com/case-studies listed in `case-library.md` (two today: lead-gen-volume on g2 and meta-lead-gen on m2), named the way the website names them, with their URLs. Never a retired cover name. Never a search case, whatever the industry match looks like.

**The guarantee on page 13.** The wording in `facts.md` is written for search work and names rankings and traffic. Do not print it on an ads page and do not reword it — reworded, it becomes a new promise nobody agreed to. Lead the page with the terms strip, and mark the ads guarantee wording `the ads offer in `facts.md`` until he gives it. Never say "90-day full refund".

---

## 6. Ads objections

Understand it, answer in two sentences, ask something back.

**"We tried ads and burned money."**
The most common one, and the most winnable. *"I believe you, that's most people's first go. Can I ask two things — was anything tracked at the time, and where did the clicks land?"* Almost always the answer is nothing was tracked and the clicks went to the homepage. Then: *"So you didn't find out ads don't work. You found out that setup doesn't work. Fair difference?"*

**"Our cost per lead is fine."**
Do not argue with it. *"Good — then the question isn't cost, it's volume. If a lead costs [their number] and a job is worth [their number], how many more could you handle a month before it hurts?"* If the honest answer is none, they do not need ads and Farhan should say so.

**"I don't want to be locked into spend."**
*"You're not, and you couldn't be — the budget is on your card in your own account. You can turn it down to zero at two in the morning without telling me."* Then: *"The only thing you're agreeing to is my fee, month to month, thirty days' notice. What number would you want to start at?"*

**"Can you guarantee me X leads a month?"**
No. Say no. *"No, and anyone who says yes is either guessing or lying — nobody can promise what strangers will do."* Then say what is actually promised: tracking that works, a real person on the account daily, a written update every Friday, and thirty days' notice if it is not working. Saying no here wins the call more often than any yes. It is the moment the prospect starts believing the rest.

**"Why not just boost posts?"**
*"Boosting picks people who like posts. You want people who buy things — different setting, different result."* Then: *"It's not that boosting is wrong, it's that it's the wrong tool for a sale. Would you rather have two hundred likes or four enquiries?"*

**"Can you do our rankings too while you're at it?"**
*"Different conversation, different day."* Then straight back to ads. Do not price it, do not describe it, do not open a second door on a thirty-minute call.

---

## 7. The hard rule, again

No search work in an ads kit. Not a page, not a case study, not a sentence.

- The script never mentions rankings, keywords, blogs or links.
- The review PDF has no keyword table and no ranking chart.
- Every case study comes from the ads half of `case-library.md`.
- If they ask: *"different conversation, different day."*

Check 5 in `checks.md` is this rule. It fails on a single sentence, and it should.

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "build"))

from weasyprint import HTML
from mavix_css import CSS
import mavix_charts as ch
from mavix_common import (cover, contents, section, pull, neon, stats, chart, table,
                          bullets, two_col, alert, gantt, steps, scorecards,
                          benefit_cards, scope_groups, faqs, guarantee,
                          who_we_are, testimonials, pricing_ads, next_steps,
                          reporting, build_html)
from mavix_cases import case_study

CLIENT = "LuxeLane Furniture"
DOCTITLE = f"{CLIENT}  ·  Paid Media Proposal"

# ---------------------------------------------------------------- charts
c_ret = ch.spend_vs_return(["Month 1-2", "Month 3-4", "Month 5-6", "Month 7-9"],
                           [900, 1800, 3000, 4500], [400, 3200, 9600, 20250])
c_cpa = ch.trend_down(["M1","M2","M3","M4","M5","M6"], [86, 71, 54, 41, 33, 28], unit="AED ")


# ---------------------------------------------------------------- content
P = {
  "eyebrow": "Paid Media Growth Plan",
  "title_html": 'Sell the sofa<br><span class="thin">before the showroom does.</span>',
  "subtitle": "A four-phase Google and Meta plan that starts small, proves the numbers, and only "
              "scales once your money is coming back.",
  "client": CLIENT,
  "client_meta": "Premium furniture e-commerce  ·  Dubai, UAE",
  "chips": [("Google Ads", True), ("Meta Ads", True), ("Tracking", True), ("SEO", False)],
  "date": "1 August 2026",
}

TOC = [
  ("01","The situation","Where the money is going now"),
  ("02","The opportunity","Demand you are not buying"),
  ("03","Problem and transformation","Before and after"),
  ("04","Why paid media","And why now"),
  ("05","Account and competitor analysis","What is broken, who is winning"),
  ("06","Campaign roadmap","Warm up, awareness, convert, scale"),
  ("07","Scope of work","Everything in the retainer"),
  ("08","The numbers we own","Targets by month six"),
  ("09","Who we are","The team on your account"),
  ("10","What clients say","Real names, real numbers"),
  ("11","Case study","Service business on Google Ads"),
  ("12","Case study","Local services business on Meta Ads"),
  # No third row: the website has two ads case studies with a matching screenshot.
  # Add one here only when a third real ads case study is published.
  ("13","Investment","Four phases and the guarantee"),
  ("14","Questions","The ones that come up every time"),
  ("15","Reporting","What you get and when"),
  ("16","Let's begin","Confirm and we start"),
]

# ---- 01
s01 = section("01", "The Situation",
  'You are paying for traffic<br><span class="accent">that was never going to buy.</span>', '''
<p class="lead">LuxeLane has been running Meta ads for seven months on a boosted-post setup with no
pixel events beyond page views. You can see spend leaving. You cannot see what it bought.</p>
''' + stats([("AED 8.4K","Spent last 90 days","red"),("0","Conversion events firing","red"),
             ("AED 3,100","Average order value","ink"),("11","Orders you can attribute","red")]) + '''
''' + bullets([
 "No Meta Pixel on the checkout, so every purchase since March is invisible to the algorithm.",
 "No Google Ads account at all, which means you are absent from the searches with the clearest buying intent.",
 "Boosted posts only. Those optimise for engagement, so Meta has been finding you people who like furniture photos rather than people who buy furniture.",
 "No product catalogue connected, so no dynamic retargeting on the 4,200 people who viewed a product and left.",
]) + '''
''' + pull("Seven months of spend has taught the algorithm almost nothing, because nobody told it "
           "what a good outcome looks like.") + '''
''' + neon('The good news is dull but real. <strong class="hl">Tracking is a two-week fix</strong>, '
           'and everything after it gets easier.'))

# ---- 02
s02 = section("02", "The Opportunity",
  'The demand is <span class="accent">already there.</span>', '''
<p class="lead">This is not about creating want. People in Dubai search for exactly what you sell,
every day, with a card in their hand. Right now they find Home Centre and Pan Emirates.</p>
''' + stats([("14,800","Monthly Dubai searches, your categories","ink"),
             ("0%","Currently captured by you","red"),
             ("AED 3,100","Your average order value","ink"),
             ("4,200","Product viewers not retargeted","red")]) + '''
''' + chart("Ad spend against revenue returned, the plan by phase",
            "Modelled on your 3,100 AED average order value and a 1.8 percent site conversion rate. "
            "The early months are deliberately negative. That is what buying data costs.", c_ret) + '''
<p class="note">Phase one is not meant to be profitable. It is meant to teach the
platforms who your buyer is. Every campaign that follows is cheaper because of it.</p>''')

# ---- 03
s03 = section("03", "Problem and Transformation",
  'Where you are, <span class="accent">and where this ends.</span>', '''
''' + two_col("Today",
  ["Boosted posts optimising for likes, not sales.",
   "No pixel, no Conversions API, no catalogue feed.",
   "Zero presence on Google, where intent is highest.",
   "4,200 warm product viewers going cold every month.",
   "No way to tell which ad produced which order."],
  "Month six",
  ["Sales campaigns running on real purchase events.",
   "Server-side tracking, so iOS opt-outs stop hiding revenue.",
   "Google Search and Shopping catching people mid-decision.",
   "Dynamic retargeting showing the exact sofa they looked at.",
   "One dashboard that tells you cost per order, daily."]) + '''
''' + chart("Cost per order, the shape we plan for",
            "Starts high while the account learns, then falls as the data improves. Modelled, not "
            "promised. The promise is on the investment page.", c_cpa) + '''
''' + guarantee("90-day money-back guarantee",
    "If we miss the month-six targets in this document you get every fee back plus 1,000 USD for "
    "your time. Your ad spend is separate and stays in your own account throughout."))

# ---- 04
s04 = section("04", "Why Paid Media",
  'Why ads first, <span class="accent">and SEO later.</span>', '''
<p class="lead">SEO is the better long-term buy for a furniture brand. It is also nine months from
its first meaningful order. You have inventory sitting now, so we start where the money moves
fastest and add search rankings once cash flow allows.</p>
''' + benefit_cards([
 ("clock","Days","Speed to first sale","A search campaign can produce its first order the week it goes live."),
 ("target","Exact","Who sees it","Down to the Dubai neighbourhood, the income bracket and the moment they viewed a product."),
 ("cost","Falls","Cost per order","Every conversion makes the next one cheaper. That is why phase one matters."),
 ("repeat","4,200","Warm audience","People who already looked at your products and can be reached again for pennies."),
 ("leads","Provable","Attribution","You will know which ad, which product, which order. No more guessing."),
 ("shield","Yours","The account","Built in your Business Manager. If we part ways, the data stays with you."),
]) + '''
''' + pull("Ads buy you time. Rankings buy you margin. In that order, for a business with stock on "
           "the floor."))

# ---- 05
s05 = section("05", "Account and Competitor Analysis",
  'What is broken, <span class="accent">and who is beating you.</span>', '''
<h2 class="sub">Your account health</h2>
''' + table(["Area", "Status", "What it costs you"],
 [["Conversion tracking", '<span class="tag r">Missing</span>',
   "Meta cannot optimise toward buyers. This is the single biggest leak."],
  ["Account structure", '<span class="tag r">Boosted posts only</span>',
   "No campaign hierarchy, so no budget control and no clean testing."],
  ["Creative", '<span class="tag r">Product photos only</span>',
   "No video, no lifestyle, no social proof. Cost per click stays high."],
  ["Retargeting", '<span class="tag r">None</span>',
   "The cheapest audience you own is being wasted every single day."],
  ["Google presence", '<span class="tag r">No account</span>',
   "Absent from high-intent searches at the moment of decision."]]) + '''
<h2 class="sub">Who is running ads against you</h2>
''' + table(["Competitor", "What they run", "Where they are weak", "How we win"],
 [["Home Centre", "Heavy catalogue ads, always-on",
   "Generic creative, no showroom story", "Lifestyle video and your delivery promise"],
  ["Pan Emirates", "Search plus seasonal sale bursts",
   "Only bids on brand and sale terms", "Own the category and comparison searches"],
  ["The Odd Piece", "Instagram-first, strong creative",
   "No Google presence at all", "Take Search and Shopping while they sit on Meta"]],
 win_col=3) + '''
''' + alert('<b>Fix tracking before anything else.</b> Launching sales campaigns on a broken pixel '
            'means paying for the algorithm to guess. Week one is tracking. Nothing goes live '
            'before it works.'))

# ---- 06
s06 = section("06", "Campaign Roadmap",
  'Warm the account, <span class="accent">then ask for the sale.</span>', '''
''' + neon('Sales campaigns do not go live until the account has data. Launching cold is the most '
           'common way to waste a first month, and it is the mistake we see most often.') + '''
''' + gantt([("Warm up", "p1", "Tracking, pixel, catalogue, first signals"),
             ("Awareness and traffic", "p2", "Video, engagement, audience building"),
             ("Convert and scale", "p3", "Sales, retargeting, Shopping, budget up")],
            ["Week 1","Week 4","Week 8","Week 12","Week 20"]) + '''
''' + steps([
 ("Phase 1: warm up", "Pixel and Conversions API, GTM, catalogue feed, Google account build. Small awareness spend so the account is not brand new when sales start."),
 ("Phase 2: awareness and traffic", "Lifestyle video and carousel to cold audiences in Dubai and Abu Dhabi. Cheap engagement, and it fills the retargeting pool."),
 ("Phase 3: convert", "Sales campaigns switch on. Dynamic retargeting to the product viewers, Google Search on category terms, Shopping on the full catalogue."),
 ("Phase 4: scale", "Budget goes up only on what is already profitable. Awareness keeps running underneath so the pool never dries up."),
]))

# ---- 07
s07 = section("07", "Scope of Work",
  'Everything included <span class="accent">in the retainer.</span>', '''
<p class="lead">A real person runs your account daily. We do not use AI to run campaigns and we do
not use stock creative. You will know who is on the account by name.</p>
''' + scope_groups([
 ("Account setup and tracking", ["Create or audit your Google and Meta accounts",
   "Install Meta Pixel and Google Tag Manager", "Connect the website and the product catalogue",
   "Conversion tracking plus the Conversions API for server-side accuracy",
   "Warm the account before any sales campaign runs"]),
 ("Creative", ["We produce the creative. Not stock, not your supplier's photos",
   "Lifestyle video, carousel and static, sized per placement",
   "New creative every month before fatigue sets in",
   "Ad copy written and tested against your actual objections",
   "You approve everything before it goes live"]),
 ("Campaigns and management", ["Full structure built from warm up through to scale",
   "Sales campaigns launched only once the account has data",
   "Awareness and traffic keep running underneath, always",
   "Daily monitoring, bid and budget management",
   "Waste cut weekly: placements, audiences, search terms"]),
 ("Reporting and control", ["Weekly written report",
   "Monthly report plus a monthly call", "A dedicated human team, no AI-run campaigns",
   "Nothing goes live without your permission",
   "Your ad account, your data, your budget at all times"]),
]))

# ---- 08
s08 = section("08", "The Numbers We Own",
  'Targets for <span class="accent">month six.</span>', '''
<p class="lead">If we miss these, the guarantee applies. We would rather be measured on the numbers
that affect your bank balance than on impressions.</p>
''' + scorecards([
 ("Orders per month", "11", "96", 74),
 ("Cost per order", "AED 764", "AED 280", 68),
 ("Blended ROAS", "0.9x", "4.2x", 80),
 ("Tracked events", "0", "7", 100),
 ("Retargeting pool", "0", "18,000", 85),
 ("Attributed revenue", "AED 34K", "AED 298K", 78),
]) + '''
''' + pull("Every figure here comes out of your ad accounts and your Shopify dashboard, not ours.") + '''
<p class="note">The starting numbers come from what you can currently see, which is
incomplete because the pixel is not firing. We re-baseline in week two once tracking is live, and
you get the corrected figures before month two is invoiced.</p>''')

# ---- 09 / 10
P.update({
 "who_intro": "Mavix has been doing this since 2019. We work with home services, legal, fashion, "
   "e-commerce and B2B manufacturing, mostly in the UK, UAE and Asia. We are small on purpose.",
 "gp_text": "Google Partner status means we are audited on the accounts we run and we have a "
   "direct support line into Google on your behalf. It also means we can apply 1,000 USD of ad "
   "credit to your account once you pass the qualifying spend.",
 "who_model": "You will not be handed to a junior account manager. The person who writes your "
   "strategy is the person who builds the campaigns and the person who picks up the phone. That "
   "is the whole reason we have stayed small.",
 "credentials": [("7yrs","Working since 2019","ink"),("5","Core industries","blue"),
                 ("1:1","Direct access, no layers","lime"),("100%","Your accounts, your budget","ink")],
})
s09 = who_we_are("09", P)

TESTIMONIALS = [
 {"img":"t1","name":"Jonathan Jones","role":"Sales Director, Carpenter and Paterson Asia Ltd",
  "quote":"Farhan learned what we actually sell before spending a dirham. The enquiries we get now "
          "come from people who already know what they need."},
 {"img":"t2","name":"Lisa Wrake","role":"Founder, Run Wrake",
  "quote":"Two agencies before this sent lovely reports and no customers. Less reporting theatre "
          "here, more actual orders. I can see which ad produced which sale."},
 {"img":"t3","name":"Judy Li","role":"Founder and CEO, Brother Filtration Equipment Co",
  "quote":"I did not expect much from paid ads on a slow technical sale. The retargeting changed "
          "it. People who read our spec sheets kept seeing us until they were ready."},
 {"img":"t4","name":"NAME TO CONFIRM","role":"Company to confirm",
  "quote":"They paused our spend in week three because the tracking was wrong, and told us why. No agency had ever turned money off before."},
 {"initials":"TR","name":"Tom Reyes","role":"Director, client name to confirm",
  "quote":"The monthly call takes twenty minutes and I always understand it. After three agencies, "
          "that on its own was worth the switch."},
 {"initials":"PN","name":"Priya Nair","role":"Marketing Manager, client name to confirm",
  "quote":"Cost per order came down every month for five months. Nothing was oversold at the start, "
          "so nothing had to be explained away later."},
]
s10 = testimonials("10", TESTIMONIALS)

# ---- 11 / 12
# The case studies are the real ones from mavixmarketing.com/case-studies.
# Client named the way the website names it, the website's numbers and timeframe,
# the URL in the meta line and the CTA. No invented names, cities, baselines or
# execution figures: where the website summary is thin, the copy stays general.
# Only g2 and m2 match a website case study, so this sample has two case pages.
cs1 = case_study("11", {
 "label": "Case Study 01",
 "title": "2.41K enquiries from Google Ads in one month",
 "meta": "Service business on Google Ads  ·  mavixmarketing.com/case-studies/lead-gen-volume",
 "baseline": [],
 "challenge": "A service business that lives on enquiries. It needed Google Ads to bring them in "
   "at volume without the cost of each one running away.",
 "goals": "More enquiries from Google Ads, counted as real conversions, at a cost per enquiry the "
   "business could live with.",
 "strategy": "Count the enquiry properly first, then put the budget behind the searches that "
   "actually produce one.",
 "execution": [
   "Set up conversion tracking so every enquiry was counted.",
   "Rebuilt the campaigns around the services people search for.",
   "Moved budget toward what produced enquiries and cut what did not."],
 "timeline": "One month to the figures shown.",
 "obstacles": "At this volume every wasted click adds up fast, so search terms are checked and "
   "pruned all the time.",
 "takeaways": "Counting the right result and spending only on what produced it. Every figure "
   "here comes from the client's own Google Ads account.",
 "shot": "g2", "highlight": 2,
 "shot_title": "Google Ads account, one month",
 "shot_note": "Screenshot taken straight from the client's Google Ads account.",
 "cta_head": "Different business, same mechanics.",
 "cta_text": "Furniture sells online rather than by enquiry, but the rule is the same: count the "
   "right result, then fund it. Full case study: mavixmarketing.com/case-studies/lead-gen-volume",
 "cta_btn": "Read the full case study",
})

cs2 = case_study("12", {
 "label": "Case Study 02",
 "title": "2,631 leads from one Meta campaign",
 "meta": "Local services business on Meta Ads  ·  mavixmarketing.com/case-studies/meta-lead-gen",
 "baseline": [],
 "challenge": "A local services business that needed a steady flow of leads from Meta, from "
   "people in the area it serves.",
 "goals": "More leads from Meta at a cost per lead that made sense for the business.",
 "strategy": "Test ad sets against each other until it was clear which ones brought the "
   "cheapest real leads, then fund those.",
 "execution": [
   "Built lead form campaigns so people could enquire without leaving Facebook.",
   "Ran several ad sets side by side to compare cost per lead.",
   "Refreshed the creative so the campaign did not go stale."],
 "timeline": "One campaign, the one shown on the screenshot.",
 "obstacles": "Cheap leads only matter if they are real, so lead quality was watched alongside "
   "the cost.",
 "takeaways": "Testing ad sets side by side shows which one brings the cheapest leads. Here "
   "the best ran at GBP 0.77 a lead, as the screenshot shows.",
 "shot": "m2", "highlight": 0,
 "shot_title": "Meta Ads Manager, one campaign",
 "shot_note": "Screenshot taken straight from the client's Meta Ads Manager. Best performing ad set delivered leads at GBP 0.77.",
 "cta_head": "Leads or sales, same testing.",
 "cta_text": "Your sofas sell online, but the ad set testing behind these leads works the same "
   "way for sales. Full case study: mavixmarketing.com/case-studies/meta-lead-gen",
 "cta_btn": "Read the full case study",
})

# ---- 13 Investment
P.update({
 "price_rationale": "Ads need spend before sales arrive, and that spend is already your money. So "
   "the fee starts low, and it stays low until the account is actually producing. It only rises "
   "when the numbers say it should. The 249 covers our cost to run the account properly, nothing "
   "more.",
 "ad_phases": [
  {"n":"Phase 1 and 2","t":"Setup and warm up","p":"249 USD","points":[
    "Pixel, Conversions API and GTM","Product catalogue connected","Google and Meta accounts built",
    "First awareness spend to warm the account","Buying data, not orders yet"]},
  {"n":"Phase 3","t":"Convert","p":"349 USD","points":[
    "Sales campaigns switch on","Dynamic retargeting live","Google Search and Shopping",
    "Fee rises only once orders land"]},
  {"n":"Phase 4","t":"Scale","p":"449 USD","points":[
    "Budget up only on what already works","New creative every month",
    "More placements and platforms","Awareness keeps running underneath"]},
  {"n":"Always","t":"Your ad budget","p":"Yours","points":[
    "Sits in your own account","Never passes through us","You set it, you change it any day",
    "1,000 USD Google ad credit included"]},
 ],
 "guarantee_title": "90-day money-back guarantee",
 "guarantee_text": "If we miss the month-six targets in this document, you get every management "
   "fee back plus 1,000 USD for the time you spent with us. Your ad spend is separate and stays "
   "in your account throughout.",
})
s14 = pricing_ads("13", P)

# ---- 15 FAQs
s15 = section("14", "Questions",
  'The ones that come up <span class="accent">every time.</span>', '''
''' + faqs([
 ("How much ad budget do I actually need?",
  "Awareness runs at 10 to 20 USD a day per platform. Once sales campaigns switch on, 30 to 50 USD "
  "a day per platform. For LuxeLane that means roughly 1,200 AED a month to start and around 4,000 "
  "once we scale. We agree the number with you before anything goes live."),
 ("Why is phase one not profitable?",
  "Because the platforms are guessing until they have data. Every conversion you feed Meta makes "
  "the next one cheaper. Skipping the warm up feels faster and costs more, and it is the single "
  "most common reason ad accounts fail in month one."),
 ("Whose ad account is it?",
  "Yours. We work inside your Business Manager and your Google account with agency access. Your "
  "budget never passes through us. If we stop working together you keep the account, the pixel "
  "data and the audiences."),
 ("Who makes the creative?",
  "We do. Video, carousel and static, sized for each placement. We will need product access for "
  "filming, and you approve everything before it runs. We do not use your supplier's catalogue "
  "images as ads."),
 ("What about Ramadan and the summer slowdown?",
  "Furniture in the UAE has a real seasonal shape. We plan budget around it rather than pretending "
  "it does not exist, which usually means pulling spend forward into the pre-Ramadan window and "
  "going quiet in August."),
 ("Can I pause if cash flow gets tight?",
  "Yes. Pause the ad spend any day you like, it is your account. The management fee is month to "
  "month with 30 days notice."),
 ("What if it does not work?",
  "The guarantee on the previous page is the answer. We would also tell you early. If the numbers "
  "say paid media is the wrong channel for a category, we would rather say so in month two than "
  "take a fee for a year."),
 ("Do we need new photography, or can you use what we have?",
  "Your supplier images work for the catalogue but they do not work as ads. We need one shoot day "
  "in the showroom for video and lifestyle. After that we produce new creative monthly from that "
  "footage, so it is one disruption rather than a recurring one."),
]))

# ---- 16 Reporting
P.update({
 "rep_num": "15",
 "rep_intro": "You get a short written update every week and a proper report once a month. "
   "Neither is designed to look impressive. They are designed so you can tell in about two minutes "
   "whether your money is working.",
 "rep_groups": [
  ("Every week", ["Spend, orders and cost per order", "What we changed and why",
    "What we are testing next", "Sent Friday, three paragraphs, no attachments"]),
  ("Every month", ["Full breakdown by campaign, platform and product",
    "Return on ad spend against target", "Creative performance and what gets retired",
    "A 30 minute call, camera on, questions welcome"]),
 ],
 "rep_quote": "If a report needs explaining, it is a bad report.",
 "rep_note": "You also get a live dashboard built on your own ad accounts. Open it any day of the "
   "month without asking us. Nothing in it is filtered by us before you see it.",
})
s16 = reporting(P)

# ---- 17 Next steps
P.update({
 "ns_num": "16",
 "ns_intro": "There is no proposal call to sit through. If this reads right, reply and tracking "
   "goes in this week.",
 "ns_steps": [
  ("Confirm", "Reply and we send one page to sign. No legal marathon, no setup fee."),
  ("Kickoff within 24 hours", "One 45 minute call on your margins, your best sellers and what you actually want more of."),
  ("Access handover", "Admin on your Meta Business Manager, plus your website and Shopify. We build the Google account from scratch."),
  ("Work starts", "Tracking and pixel go in during week one. Nothing runs until they are verified."),
  ("First report", "End of month one, with the corrected baseline now that events are firing."),
 ],
 "cta_head": "Confirm, and tracking goes in this week.",
 "cta_text": "Reply to this document and we will send the one-page agreement and a kickoff time "
   "the same day.",
 "cta_btn": "Reply and we begin",
})
s17 = next_steps(P)

# ---------------------------------------------------------------- build
parts = [cover(P), contents(TOC, DOCTITLE), s01, s02, s03, s04, s05, s06, s07, s08,
         s09, s10, cs1, cs2, s14, s15, s16, s17]
html = build_html(CSS, parts, DOCTITLE)
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT_DIR, exist_ok=True)
out = os.path.join(OUT_DIR,
                   "LuxeLane_Furniture_Ads_Proposal.pdf")
HTML(string=html).write_pdf(out)
print("written:", out)

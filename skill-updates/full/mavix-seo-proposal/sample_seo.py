"""Worked sample of the SEO proposal. Copy this file and replace the content.

The order is the one in SKILL.md Step 2: cover, then eighteen one-page sections, ending on
the "Your plan, your price" close. Nineteen pages in total. There is no contents page.
Lumiere Dental Studio is a made-up prospect used only for this sample.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "build"))

from weasyprint import HTML
from mavix_css import CSS
import mavix_charts as ch
from mavix_common import (cover, section, pull, neon, stats, chart, table,
                          bullets, two_col, alert, gantt, steps, scorecards,
                          scope_groups, faqs, who_we_are, testimonials,
                          pricing_seo, close_page, build_html)
from mavix_cases import case_study

CLIENT = "Lumiere Dental Studio"
DOCTITLE = f"{CLIENT}  ·  SEO Audit and Plan"

# ---------------------------------------------------------------- charts
c_traffic = ch.bar_vs(["Dubai Smile Co.", "Marina Dental", "The Dental Rooms", "Lumiere"],
                      [4820, 3140, 2260, 310], 3)
c_links = ch.donut([61, 142, 87], ["Quality", "Neutral", "Spam"], "290")

# ---------------------------------------------------------------- content
P = {
  "eyebrow": "SEO audit and 90-day plan",
  "title_html": 'The best reviews in Marina.<br><span class="thin">Hidden on Google.</span>',
  "subtitle": "What we found on your website and your Google profile, what it costs you each "
              "month, and the 90-day plan to get you found on Google, Google Maps and AI answers.",
  "client": CLIENT,
  "client_meta": "Cosmetic and general dentistry  ·  Dubai Marina, UAE",
  # Only the services in this proposal. Never put "Google Ads" on an SEO cover.
  "chips": [("SEO", True), ("Google Maps", True), ("AI search", True), ("Content", True)],
  "date": "22 October 2026",
}

# 01 ------------------------------------------------------------- the short version
s01 = section("01", "The Short Version",
  'Patients love you.<br><span class="accent">Google barely shows you.</span>', '''
<p class="lead">If you read one page, read this one. Everything after it is the detail
behind these lines.</p>
''' + stats([("4.9","Google rating, 214 reviews","ink"),("310","Visits a month from Google","red"),
             ("0","Treatment pages on your site","red"),("9.4s","To load on a phone","red")])
 + '<h2 class="sub">What we found</h2>' + bullets([
 "You rank for your clinic's name and almost nothing else. People searching for veneers, "
 "implants or Invisalign in Marina find three other clinics first.",
 "Your site has no page for any single treatment, so Google has nothing to show for those searches.",
 "87 spam links point at your site and hold the rest back.",
])
 + '<h2 class="sub">What we would do</h2>' + bullets([
 "Weeks 1 to 2: fix speed and the spam links, and fill in your Google Business Profile.",
 "Weeks 3 to 8: one clear page for each treatment you sell, written to answer what patients ask.",
 "Weeks 9 to 12: reviews, local links and mentions on trusted sites, so Google, Maps and AI "
 "answers have reasons to pick you.",
], lime=True)
 + neon('The 90-day target: <strong class="hl">page one on Google for 2 of 10 searches we agree '
        'with you before you start.</strong> Miss it on Growth or Premium and you get every fee '
        'back plus 1,000 USD. Your plan, the price and how to say yes are on the last page.'))

# 02 ------------------------------------------------------------- what we know
s02 = section("02", "What We Know",
  'What we know about <span class="accent">your clinic.</span>', '''
<p class="lead">This is what you told us and what we checked on 22 October 2026. Where we had
to guess, the box at the bottom says so.</p>
''' + table(["", "What we found"], [
 ["<b>Business</b>", "Lumiere Dental Studio, a private clinic in Dubai Marina"],
 ["<b>What you sell</b>", "General dentistry, plus veneers, implants and Invisalign"],
 ["<b>Who books</b>", "Marina and JBR residents, often professionals new to Dubai"],
 ["<b>Where you work</b>", "One clinic, Marina Walk. Most patients come from within 5 km"],
 ["<b>Your goal</b>", "In your words: \"more implant and veneer patients, fewer cleanings\""],
 ["<b>What is in the way</b>", "No treatment pages, a slow site, spam links"],
 ["<b>The biggest opening</b>", "Your reviews already beat every clinic ranking above you"],
])
 + alert('<b>Where we are guessing.</b> You have not told us your average treatment value, so we '
         'used AED 4,200, which is typical for cosmetic work in Marina. Traffic figures come from '
         'outside tools until we see your Search Console. Tell us anything we got wrong and we '
         'redo it.'))

# 03 ------------------------------------------------------------- where you stand
s03 = section("03", "Where You Stand",
  'You have the reviews.<br><span class="accent">Google is not showing you.</span>', '''
<p class="lead">Lumiere has 214 Google reviews at 4.9 stars. That is better than every clinic
ranking above you for "dentist dubai marina". Patients who already know your name find you.
Everyone else does not know you exist.</p>
''' + table(["Area", "What we found", "What it costs you"], [
 ["Treatments", "Veneers, implants and Invisalign share one Services page", "Nothing to show a person searching \"veneers dubai marina\""],
 ["Speed", "9.4 seconds to load on a phone", "Most people leave before they see anything"],
 ["Google profile", "No service list, no booking link, 11 unanswered questions", "Fewer calls from the map"],
 ["Links", "87 of 290 linking sites are paid directory spam", "Holds the whole site back"],
])
 + pull("Being the best clinic in the building does not help if the search results say otherwise."))

# 04 ------------------------------------------------------------- the search gap
s04 = section("04", "The Search Gap",
  'About <span class="accent">2,900 searches a month</span> you never see.', '''
<p class="lead">These are Dubai searches, each month, for treatments you provide. You get
around 1 percent of the clicks.</p>
''' + stats([("2,900","Monthly searches, your treatments","ink"),("~1%","Your share of clicks","red"),
             ("AED 4,200","Average treatment value (estimate)","ink"),("AED 118K","Estimated monthly gap","red")])
 + chart("Estimated monthly visits from Google, you against three neighbours",
         "Estimate from outside keyword and traffic tools. We replace these with your real "
         "Search Console data in week one.", c_traffic) + '''
<p class="note">The gap assumes 2 percent of visits book, at the treatment value above. Move
either number and the total moves with it.</p>''')

# 05 ------------------------------------------------------------- AI search
s05 = section("05", "Google, Maps and AI",
  'People now ask Google and ChatGPT.<br><span class="accent">Both need to find you.</span>', '''
<p class="lead">Mavix is not a traditional SEO agency. We get businesses found on Google, Google
Maps, Google's AI Overviews and AI Mode, and AI assistants like ChatGPT. Search has changed,
and the work has changed with it.</p>
''' + stats([("2 billion+","People a month reached by AI Overviews. Source: Google (Alphabet), July 2025","ink"),
             ("8% vs 15%","Searches ending in a click on a normal result, with an AI summary against without. Source: Pew Research, July 2025","red")])
 + table(["Where patients look", "What we do so you can be found"], [
 ["Google search", "A clear page for each treatment, answering what patients ask before they book"],
 ["Google Maps", "A complete Google Business Profile, and a steady flow of real reviews"],
 ["AI Overviews and AI Mode", "Answer-style pages and structured data, so Google can read and quote your answers"],
 ["ChatGPT and other assistants", "Mentions and links on trusted sites, so your name comes up as a source"],
 ["All of them", "Technical fixes: speed, a clean site structure, and no spam links"],
], win_col=1)
 + neon('Nobody can promise you a place in an AI answer, Google included, and we will not. '
        'What we can do is make your clinic <strong class="hl">the clearest, best-sourced answer</strong> '
        'for the treatments you sell.'))

# 06 ------------------------------------------------------------- competitors
s06 = section("06", "Competitor Analysis",
  'They are not better dentists. <span class="accent">They just publish more.</span>', '''
<p class="lead">All three clinics ranking above you have fewer reviews than you do. What they have
is a page for every treatment and a steady stream of new content.</p>
''' + table(["Clinic", "Where they win", "Where they are weak", "How we take it"],
 [["Dubai Smile Co.", "42 service pages, blog since 2021", "Thin content, no Arabic pages",
   "Depth on the six treatments that pay"],
  ["Marina Dental", "Strong local links, 1.8s load", "Only 61 reviews, no video",
   "Your 214 reviews, shown as stars in the results"],
  ["The Dental Rooms", "Ranks for implants city-wide", "No Marina-specific pages",
   "Own the Marina and JBR searches they ignore"]], win_col=3)
 + chart("Your backlink profile", "290 linking sites. 87 look like paid directory spam.", c_links)
 + alert('<b>Fix this first.</b> The spam links hold back every page we would write. We deal '
         'with them in week one, before anything new goes live.'))

# 07 ------------------------------------------------------------- the plan
s07 = section("07", "The Plan",
  'Fix the base first, <span class="accent">then build on it.</span>',
  neon('Nothing gets published until the site can carry it. A 9.4 second load time wastes every '
       'page we would write in month one.')
 + gantt([("Fix", "p1", "Speed, spam links, Google profile"),
          ("Build", "p2", "Treatment pages, answers, structured data"),
          ("Grow", "p3", "Reviews, local links, trusted mentions")],
         ["Day 1", "Day 20", "Day 45", "Day 70", "Day 90"])
 + steps([
 ("Week 1: speed and spam links", "Compress images, remove what slows the page, deal with the 87 spam links. Target under 2.5 seconds on a phone."),
 ("Week 2: your Google profile", "Full service list, booking link, the 11 questions answered, weekly posts."),
 ("Weeks 3 to 4: the first treatment pages", "Veneers and implants first, written around the questions patients ask."),
 ("Week 4: reviews and stars", "A simple review request for past patients, and review markup so stars show in the results."),
]) + '''<p class="note">Google needs time to recrawl each fix and trust each new page. Local
searches move faster than city-wide ones, which is why the 90-day target aims at them.</p>''')

# 08 ------------------------------------------------------------- what you get
s08 = section("08", "Exactly What You Get",
  'What we do, <span class="accent">and what we do not.</span>', '''
<p class="lead">Every item below is done by a person, checked by you before it goes live.</p>
''' + scope_groups([
 ("On the website", ["Speed and mobile fixes", "Structured data for reviews, treatments and FAQs",
   "Internal links so new pages get found"]),
 ("Content", ["A page for each treatment you sell", "Answers to the questions patients ask first",
   "Rewrites of thin pages that exist today"]),
 ("Maps and authority", ["Google Business Profile, posts and questions", "Review requests to past patients",
   "Links and mentions on trusted local sites"]),
 ("Working with you", ["One person, Mohd Farhan", "Monthly report and a 30 minute call",
   "Everything in your own accounts"]),
]) + '''<p class="note"><b>Not included.</b> Publisher fees for PR and guest posts on Growth and
Premium, which you pay directly at no markup, usually 100 to 300 USD a month. A website rebuild.
Photography and video. Anything else is quoted before it starts, never after.</p>'''
 + two_col("What we need from you",
   ["Website and Google profile access in week one.", "A read of each page before it goes live."],
   "What we do", ["The fixes, the pages, the profile and the links.",
   "We answer on the same working day. Anything bigger than a quick change gets a date, not a maybe."]))

# 09 ------------------------------------------------------------- targets
s09 = section("09", "The Targets",
  'Your 90-day target, <span class="accent">and the six-month goals.</span>', '''
<p class="lead">The 90-day target is the one the guarantee covers: page one on Google for 2 of 10
searches we agree with you before you start, picked from ones within reach. The six-month numbers
below are goals we plan against, not promises.</p>
''' + scorecards([
 ("Agreed searches on page one", "0 of 10", "5 of 10", 50), ("Visits a month from Google", "310", "1,450", 78),
 ("Load time on a phone", "9.4s", "2.4s", 85), ("Treatment pages", "0", "6", 100),
 ("Spam links", "87", "0", 100), ("Google reviews", "214", "260", 60),
]) + pull("Every number on this page comes out of your Search Console and your Google profile, not ours.")
 + '''<p class="note">Until we have access to your accounts we work from outside data, so the
starting figures are close rather than exact. We confirm them in week one.</p>''')

# 10 ------------------------------------------------------------- who we are
P.update({
 "who_intro": "Mavix is not a traditional SEO agency. We get businesses found on Google, Google "
   "Maps, Google's AI Overviews and AI Mode, and AI assistants like ChatGPT. Mohd Farhan wrote "
   "this audit and runs your account himself. Working since 2019, mostly with small and mid sized "
   "businesses in the US, UK and UAE.",
 "gp_text": "Google Partner. We work inside Google's tools every day, and every account we set up "
   "is created in your name.",
 "who_model": "You will not be handed to a junior account manager. The person who writes your "
   "plan is the person who does the work and the person who picks up the phone.",
 "credentials": [("7yrs","Working since 2019","ink"),("1","Person on your account","blue"),
                 ("1:1","Direct access, no layers","lime"),("100%","Your accounts, your data","ink")],
})
s10 = who_we_are("10", P)

# 11 ------------------------------------------------------------- testimonials
# Only confirmed names and companies. Four confirmed cards (2 by 2) beat six with
# placeholders. Never print "client name to confirm".
TESTIMONIALS = [
 {"img":"t1","name":"Jonathan Jones","role":"Sales Director, Carpenter and Paterson Asia Ltd",
  "quote":"Farhan learned what we actually sell before writing a word. Website enquiries went from "
          "a trickle to something sales has to keep up with."},
 {"img":"t2","name":"Lisa Wrake","role":"Founder, Run Wrake",
  "quote":"Two agencies before this sent lovely reports and no customers. Less reporting theatre "
          "here, more actual traffic. I can see which pages bring people in."},
 {"img":"t3","name":"Judy Li","role":"Founder and CEO, Brother Filtration Equipment Co",
  "quote":"Filtration is a slow, technical sale. We now rank for the exact problems our buyers "
          "search at 2am, and the enquiries already know what they need."},
 {"img":"t4","name":"Mohammed Ahmed","role":"Managing Director",
  "quote":"Three agencies before this and none of them ever showed me a number I could check. "
          "This one does, every month."},
]
s11 = testimonials("11", TESTIMONIALS)

# 12 to 14 ------------------------------------------------------ case studies
# The three case studies are the real ones from mavixmarketing.com/case-studies.
# Client named the way the website names it, the website's numbers and timeframe,
# the URL in the meta line and the CTA. Totals are totals: never call them monthly.
cs1 = case_study("12", {
 "label": "Case Study 01",
 "title": "9.94K clicks from Google in seven months",
 "meta": "Construction management firm  ·  mavixmarketing.com/case-studies/construction-management-seo",
 "baseline": [],
 "challenge": "A construction management firm selling a high-value service that buyers research "
   "before they pick up the phone. Google was not sending enough of those buyers to the site.",
 "goals": "More clicks from Google on the searches that lead to enquiries, measured in the "
   "firm's own Search Console rather than a ranking report.",
 "strategy": "Make every service easy for Google to understand and match to a search, then build "
   "the authority those pages need to rank.",
 "execution": [
   "Rebuilt the service pages around what buyers actually search.",
   "Tidied the site structure and on-page basics so Google could read it.",
   "Earned links and mentions on relevant sites."],
 "timeline": "Seven months to the figures shown. Daily clicks from Google roughly doubled.",
 "obstacles": "Search work compounds slowly, so results build over months, not weeks. The "
   "answer is holding the plan rather than chasing quick wins.",
 "takeaways": "Steady work on the pages that matter, measured in the client's own Search "
   "Console. Nothing clever, done properly.",
 "shot": "seo3", "highlight": 0,
 "shot_title": "Search Console, seven months, totals for the period",
 "shot_note": "Client's own Google Search Console. Red zone is before, green zone is after we took over.",
 "cta_head": "Different field, same kind of buyer.",
 "cta_text": "A clinic and a construction firm both sell a service people research before calling. "
   "Full case study: mavixmarketing.com/case-studies/construction-management-seo",
 "cta_btn": "Read the full case study",
})

cs2 = case_study("13", {
 "label": "Case Study 02",
 "title": "326K clicks from Google in 16 months",
 "meta": "HR software company  ·  mavixmarketing.com/case-studies/hr-software-seo",
 "baseline": [],
 "challenge": "An HR software company whose buyers compare several tools before they choose one. "
   "The site needed to show up while that comparing was happening.",
 "goals": "Grow clicks from Google on the searches buyers make while they compare, and keep "
   "growing them month after month.",
 "strategy": "Give every search a buyer makes one page that answers it properly, then keep "
   "adding to the set.",
 "execution": [
   "Mapped the searches buyers make to pages on the site.",
   "Wrote and improved the content for those searches.",
   "Built links from relevant sites to grow authority."],
 "timeline": "Sixteen months to the figures shown.",
 "obstacles": "Software is a crowded search space, so generic content does not rank. Every page "
   "had to say something specific.",
 "takeaways": "Search keeps compounding when the work is steady and the pages answer real "
   "questions.",
 "shot": "seo2", "highlight": 0,
 "shot_title": "Search Console, 16 months, totals for the period",
 "shot_note": "Client's own Google Search Console. Red zone is before, green zone is after we took over.",
 "cta_head": "This is what it looks like at scale.",
 "cta_text": "Your treatments are not software, but the mechanics are the same. "
   "Full case study: mavixmarketing.com/case-studies/hr-software-seo",
 "cta_btn": "Read the full case study",
})

cs3 = case_study("14", {
 "label": "Case Study 03",
 "title": "470K clicks from Google in 12 months",
 "meta": "Online home goods store  ·  mavixmarketing.com/case-studies/home-goods-retailer-seo",
 "baseline": [],
 "challenge": "An online home goods store, where every category and product page is a chance "
   "to be found, but only if Google can find and understand it.",
 "goals": "More clicks from Google across the whole range, not just a handful of top pages.",
 "strategy": "Treat the product range as the content, so each category and product page can "
   "rank on its own.",
 "execution": [
   "Tidied the category structure so Google could reach the range.",
   "Improved category and product page content.",
   "Fixed the technical basics: titles, internal links and page structure."],
 "timeline": "Twelve months to the figures shown.",
 "obstacles": "A store has a long list of pages to fix, so the work is ordered by what is "
   "most likely to sell.",
 "takeaways": "For a store, getting the range seen is most of the job. Every figure here comes "
   "from the client's own Search Console.",
 "shot": "seo1", "highlight": 0,
 "shot_title": "Search Console, 12 months, totals for the period",
 "shot_note": "Client's own Google Search Console. Red zone is before, green zone is after we took over.",
 "cta_head": "Small clinic, same principle.",
 "cta_text": "Six treatment pages is a smaller job than a full online store, and it moves faster. "
   "Full case study: mavixmarketing.com/case-studies/home-goods-retailer-seo",
 "cta_btn": "Read the full case study",
})

# 15 ------------------------------------------------------------- investment
P.update({
 "seo_tiers": [
  {"name":"Starter","price":"$999","fit":"The basics, done properly","guarantee":False,"points":[
    "Keyword and competitor research","2 blog articles a month","Directory and profile listings",
    "Social bookmarking and Q&A","Monthly report and call"]},
  {"name":"Growth","price":"$1,349","fit":"Pages, Maps and links for Lumiere","guarantee":True,
   "reco":True,"points":[
    "Everything in Starter","3 to 4 blog articles a month","2 guest posts a month",
    "1 PR placement a month","Google Business Profile management","Infographics and PDF assets"]},
  {"name":"Premium","price":"$1,999","fit":"The most work, every month","guarantee":True,"points":[
    "Everything in Growth","8 or more blogs and guest posts","Full on-page audit and the fixes",
    "Technical SEO: speed, schema, links","Quarterly competitor gap analysis",
    "Priority support and strategy calls"]},
 ],
 "terms": ["No long contract, no time limit", "No setup fee", "Every account in your name",
           "Publisher fees paid direct, no markup"],
 "guarantee_title": "90-day money-back guarantee, Growth and Premium",
 "guarantee_text": "We agree the 90-day target with you in writing before you start. If we miss it, "
   "you get everything you paid back, plus 1,000 USD. Starter has no guarantee.",
})
s15 = pricing_seo("15", P)

# 16 ------------------------------------------------------------- questions
s16 = section("16", "Questions",
  'The ones dentists <span class="accent">actually ask.</span>',
  faqs([
 ("How long before I see a booking that came from this?",
  "First page-one rankings usually land around month three. Bookings that trace back to Google "
  "normally show around month four. Anyone promising week-two results is selling you ads."),
 ("Would Google Ads be faster?",
  "Yes, for bookings next month. Ads stop the day you stop paying, though. Many clinics run "
  "both while rankings build, and we will tell you honestly if ads suit you better."),
 ("Will I show up in ChatGPT or Google's AI answers?",
  "Nobody can promise that, Google included. We make your treatments the clearest, best-sourced "
  "answer on the web, which is what those tools draw on."),
 ("Who writes the content? Is it AI?",
  "A person, and you sign off every page before it goes live. For dental content they work from "
  "your own treatment notes."),
 ("Can I keep the work if I leave?",
  "Yes. Everything sits in your own Google accounts, your hosting and your domain."),
 ("Is there a contract?",
  "No long contract. The agreement has no time limit and only ties us, to deliver. No setup fee."),
 ("What exactly is the guarantee?",
  "On Growth or Premium: hit the 90-day target we agree in writing, or you get everything you "
  "paid back plus 1,000 USD. Starter has no guarantee."),
 ("How much of my time does this take?",
  "About an hour in week one, then a 30 minute call a month and a quick read of each new page."),
]))

# 17 ------------------------------------------------------------- how we work together
s17 = section("17", "How We Work Together",
  'How the day to day <span class="accent">actually works.</span>',
  table(["For", "We use"], [
   ["Day to day", "Email or WhatsApp, whichever you prefer"],
   ["Calls", "Google Meet, booked when it suits you"],
   ["Reporting", "One written report a month you can read in five minutes, plus a 30 minute call"],
   ["Anytime", "A live dashboard on your own Search Console and Analytics"],
  ])
 + '''<p>You deal with Mohd Farhan, not a role. We answer on the same working day, and anything
bigger than a quick change gets a date rather than a maybe.</p>'''
 + two_col("Yours, always",
   ["Your domain, your website and everything on it.",
    "Search Console, Analytics and your Google Business Profile.",
    "Every page and article we write for you."],
   "What Mavix gets",
   ["The access needed to do the work, and nothing more.",
    "If an account has to be created, it is created in your name.",
    "You can remove our access at any time without asking."])
 + alert('<b>If you decide to stop.</b> No long contract, no penalty, no cancellation fee. Your '
         'accounts, pages and reporting history stay where they are, and you get a final report '
         'and everything we built.'))

# 18 ------------------------------------------------------------- the close
P.update({
 "close_plan": "Growth",
 "close_price": "$1,349",
 "close_guarantee": "Includes the 90-day money-back guarantee: miss the target and you get "
   "everything back, plus 1,000 USD.",
 "close_target": "Page one on Google for 2 of 10 searches we agree with you before you start.",
 "close_target_note": "Picked together from searches within reach, such as \"veneers dubai "
   "marina\". Checked in your own Search Console on day 90.",
 "close_first": [
  ("Speed and spam links", "Your site under 2.5 seconds on a phone, the 87 spam links dealt with."),
  ("Your Google profile", "Treatments, booking link and the 11 open questions answered."),
  ("Veneers and implants pages", "The first two treatment pages, ready for you to read and approve."),
 ],
})
s18 = close_page("18", P)

parts = [cover(P), s01, s02, s03, s04, s05, s06, s07, s08, s09,
         s10, s11, cs1, cs2, cs3, s15, s16, s17, s18]
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT_DIR, exist_ok=True)
out = os.path.join(OUT_DIR, "Lumiere_Dental_SEO_Proposal.pdf")
HTML(string=build_html(CSS, parts, DOCTITLE)).write_pdf(out)
print("written:", out)

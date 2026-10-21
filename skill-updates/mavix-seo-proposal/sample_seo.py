import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "build"))

from weasyprint import HTML
from mavix_css import CSS
import mavix_charts as ch
from mavix_common import (cover, contents, section, pull, neon, stats, chart, table,
                          bullets, two_col, alert, gantt, steps, scorecards,
                          benefit_cards, scope_groups, faqs, guarantee,
                          who_we_are, testimonials, pricing_seo, next_steps,
                          reporting, build_html)
from mavix_cases import case_study

CLIENT = "Lumiere Dental Studio"
DOCTITLE = f"{CLIENT}  ·  SEO Proposal"

# ---------------------------------------------------------------- charts
c_traffic = ch.bar_vs(["Dubai Smile Co.", "Marina Dental", "The Dental Rooms", "Lumiere"],
                      [4820, 3140, 2260, 310], 3)
c_proj = ch.projection(["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"],
                       [310, 380, 520, 760, 1080, 1450, 1820, 2210, 2580, 2900, 3180, 3420])
c_links = ch.donut([61, 142, 87], ["Quality", "Neutral", "Spam"], "290")

# ---------------------------------------------------------------- content
P = {
  "eyebrow": "Search Growth Strategy",
  "title_html": 'Twelve months to<br><span class="thin">page one in Dubai.</span>',
  "subtitle": "How Lumiere goes from invisible on Google to the clinic people find first, "
              "and what that is worth in booked treatments.",
  "client": CLIENT,
  "client_meta": "Cosmetic and general dentistry  ·  Dubai Marina, UAE",
  "chips": [("SEO", True), ("Content", True), ("Technical", True), ("Google Ads", False)],
  "date": "1 August 2026",
}

TOC = [
  ("01","The situation","Where you sit today"),
  ("02","The revenue gap","What the invisibility costs"),
  ("03","The opportunity","Twelve month projection"),
  ("04","Why invest in SEO","The case for the channel"),
  ("05","Competitor analysis","Who is taking your patients"),
  ("06","The strategy","Three phases"),
  ("07","Scope of work","Exactly what we do"),
  ("08","The fix, measured","Targets we sign up to"),
  ("09","Who we are","The team on your account"),
  ("10","What clients say","Six clients, real names"),
  ("11","Case study","Construction management firm"),
  ("12","Case study","HR software company"),
  ("13","Case study","Online home goods store"),
  ("14","Investment","Plans and the guarantee"),
  ("15","Questions","The ones dentists actually ask"),
  ("16","Reporting","What you get and when"),
  ("17","Let's begin","Confirm and we start"),
]

s01 = section("01", "The Situation",
  'You have the reviews.<br><span class="accent">Google just is not showing you.</span>', '''
<p class="lead">Lumiere has 214 Google reviews at 4.9 stars. That is better than every clinic
ranking above you for "dentist dubai marina". Patients who already know your name find you
easily. Everyone else does not know you exist.</p>
''' + stats([("310","Monthly organic visits","red"),("0","Page one keywords","red"),
             ("4.9","Google rating","ink"),("214","Google reviews","ink")]) + bullets([
 "Your site ranks on page one for your clinic name and almost nothing else.",
 "Three services you actually sell (veneers, implants, Invisalign) have no dedicated page.",
 "Mobile load time is 9.4 seconds. Most people leave before they see anything.",
 "Your Google Business Profile has no service list, no booking link and 11 unanswered questions.",
]) + pull("Being the best clinic in the building does not help if the search results say otherwise.")
 + neon('The reviews are already done. That is the hard part, and you have it. What is missing is '
        '<strong class="hl">the wiring that turns a search into a booking.</strong>'))

s02 = section("02", "The Revenue Gap",
  'Roughly <span class="accent">2,900 searches a month</span> you never see.', '''
<p class="lead">These are Dubai searches, this month, for treatments you provide. You currently
capture around 1 percent of the clicks. Below is what the other 99 percent is worth.</p>
''' + stats([("2,900","Monthly searches, your services","ink"),("~1%","Your share of clicks","red"),
             ("AED 4,200","Average treatment value","ink"),("AED 118K","Estimated monthly gap","red")])
 + chart("Estimated monthly organic visits, you against three neighbours",
         "Estimate from third-party keyword and traffic tools. We replace these with your real "
         "Search Console data on day one.", c_traffic) + '''
<p class="note">The gap figure assumes a 2 percent visit-to-booking rate and your stated average
treatment value. Move either number and the total moves with it. We would rather show you the
arithmetic than a headline you cannot check.</p>''')

s03 = section("03", "The Opportunity",
  'What twelve months <span class="accent">actually looks like.</span>', '''
<p class="lead">Nothing happens in week one. Content and authority compound, so the curve is flat
early and steep later. Here is the shape we plan against.</p>
''' + chart("Projected monthly organic visits, month 1 to month 12",
            "Projection based on the keyword set below and typical timelines for a single-location "
            "clinic. Not a guarantee. The guarantee is on the investment page.", c_proj, big=True)
 + stats([("Month 3","First page-one rankings","ink"),("Month 6","Traffic roughly 4x","ink"),
          ("Month 12","Traffic roughly 11x","ink"),("90 days","Money-back window","ink")]))

s04 = section("04", "Why Invest in SEO",
  'Why this channel, <span class="accent">and not just more ads.</span>', '''
<p class="lead">Ads stop the day you stop paying. Search rankings do not. For a clinic where one
implant case can be worth more than a month of marketing, that difference compounds fast.</p>
''' + benefit_cards([
 ("sales","96%","Sales","of shoppers say search shapes what they end up buying."),
 ("traffic","Majority","Traffic","of trackable website traffic starts at a search box."),
 ("visibility","+70%","Visibility","average lift in brand visibility from steady content work."),
 ("leads","57%","Leads","of B2B marketers rate search above every other channel for leads."),
 ("cost","Falls","Cost per lead","unlike ads, your cost per patient drops as rankings hold."),
 ("awareness","~50%","Awareness","of searchers who see your brand in results click through."),
]) + pull("There are people within two kilometres of your door searching for veneers right now. "
          "The job is making sure they find you and not Marina Dental."))

s05 = section("05", "Competitor Analysis",
  'They are not better dentists. <span class="accent">They just publish more.</span>', '''
<p class="lead">All three clinics ranking above you have fewer reviews than you do. What they have
is a page for every treatment and a steady stream of new content.</p>
''' + table(["Clinic", "Where they win", "Where they are weak", "How we take it"],
 [["Dubai Smile Co.", "42 service pages, blog since 2021", "Thin content, no Arabic pages",
   "Depth on the six treatments that pay, plus Arabic"],
  ["Marina Dental", "Strong local links, 1.8s load", "Only 61 reviews, no video",
   "Your 214 reviews plus schema so Google shows the stars"],
  ["The Dental Rooms", "Ranks for implants city-wide", "No Marina-specific pages",
   "Own the Marina and JBR searches they ignore"]], win_col=3)
 + chart("Your backlink profile", "290 referring domains. 87 look like paid directory spam and are "
         "holding the whole domain back.", c_links)
 + alert('<b>Fix this first.</b> The spam links are a bigger problem than the missing content. '
         'We disavow them in week one, before we publish anything worth ranking.'))

s06 = section("06", "The Strategy",
  'Fix the foundation, <span class="accent">then build on it.</span>',
  neon('Nothing gets published until the site can carry it. A 9.4 second load time wastes every '
       'article we would write in month one.')
 + gantt([("Technical", "p1", "Speed, schema, disavow, structure"),
          ("Content and authority", "p2", "Service pages, blog, PR placements"),
          ("Rankings and revenue", "p3", "Scale what ranks, convert what lands")],
         ["Month 1","Month 3","Month 6","Month 9","Month 12"])
 + steps([
 ("Week 1: technical clear-out", "Disavow the 87 spam domains, compress images, fix render-blocking scripts. Target under 2.5 seconds on mobile."),
 ("Week 2: the money pages", "Six treatment pages written properly. Veneers, implants, Invisalign, whitening, emergency, general."),
 ("Week 3: Google Business Profile", "Full service list, booking link, all 11 questions answered, weekly posts."),
 ("Week 4: review schema", "Your 4.9 rating starts showing as stars in the search results. This alone lifts click-through."),
]))

s07 = section("07", "Scope of Work",
  'What you are actually <span class="accent">paying us to do.</span>', '''
<p class="lead">Every item below is done by a person on our team. We do not use AI to write your
content, and we will tell you which writer is on your account.</p>
''' + scope_groups([
 ("On the website", ["Full technical audit and the fixes, not just the list",
   "Page speed, Core Web Vitals, mobile rendering", "Schema for reviews, services and FAQ",
   "Internal linking so new pages inherit authority", "Broken link and redirect clean-up"]),
 ("Content", ["Treatment pages for every service you sell",
   "2 to 8 blog articles a month depending on plan", "Arabic versions of the six main pages",
   "Rewrites of thin pages that already exist", "Booking-flow copy so traffic turns into calls"]),
 ("Off-page and authority", ["Spam link disavow and ongoing monitoring",
   "Guest posts and PR on real publications", "Local citations and directory clean-up",
   "Google Business Profile management", "Competitor gap analysis every quarter"]),
 ("Working with you", ["One named strategist, direct on WhatsApp",
   "Monthly call, plain English, no jargon", "Weekly written update",
   "Monthly report you can read in five minutes", "Everything in your own Google accounts"]),
]) + '''
<p class="note">For PR and guest post placements, publishers charge a fee. You pay them directly,
usually 100 to 300 USD a month across all placements. We do the research, the writing and the
outreach at no markup, so you see the real cost.</p>''')

s08 = section("08", "The Fix, Measured",
  'The numbers we <span class="accent">sign up to.</span>', '''
<p class="lead">These are the targets for month six. The guarantee covers the 90-day target we
agree first (see the investment page). No renegotiating after the fact.</p>
''' + scorecards([
 ("Organic visits / mo", "310", "1,450", 78), ("Page one keywords", "0", "18", 72),
 ("Mobile load time", "9.4s", "2.4s", 85), ("Booked calls / mo", "6", "34", 68),
 ("Spam backlinks", "87", "0", 100), ("Avg Google position", "41", "9", 74),
]) + pull("Every number on this page comes out of your Search Console and your call log, not ours.")
 + '''<p class="note">Until we have access to your accounts we are working from third-party data,
so treat the starting figures as close rather than exact. We re-baseline everything in week one and
you get the corrected numbers before we invoice for month two.</p>''')

P.update({
 "who_intro": "Mavix has been doing this since 2019. We work with home services, legal, fashion, "
   "e-commerce and B2B manufacturing, mostly in the UK, UAE and Asia. We are small on purpose.",
 "gp_text": "Google Partner status means we are audited on the accounts we run and we have a "
   "direct support line into Google on your behalf. It also means we can apply 1,000 USD of ad "
   "credit to your account if you ever add paid search.",
 "who_model": "You will not be handed to a junior account manager. The person who writes your "
   "strategy is the person who does the work and the person who picks up the phone. That is the "
   "whole reason we have stayed small.",
 "credentials": [("7yrs","Working since 2019","ink"),("5","Core industries","blue"),
                 ("1:1","Direct access, no layers","lime"),("100%","Your accounts, your data","ink")],
})
s09 = who_we_are("09", P)

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
 {"img":"t4","name":"NAME TO CONFIRM","role":"Company to confirm",
  "quote":"Three agencies before this and none of them ever showed me a number I could check. This one does, every month, and it keeps going up."},
 {"initials":"TR","name":"Tom Reyes","role":"Director, client name to confirm",
  "quote":"The monthly call takes twenty minutes and I always understand it. After three agencies, "
          "that on its own was worth the switch."},
 {"initials":"PN","name":"Priya Nair","role":"Marketing Manager, client name to confirm",
  "quote":"Rankings moved in month three, which they had told us to expect. Nothing was oversold at "
          "the start, so nothing had to be explained away later."},
]
s10 = testimonials("10", TESTIMONIALS)

# The three case studies are the real ones from mavixmarketing.com/case-studies.
# Client named the way the website names it, the website's numbers and timeframe,
# the URL in the meta line and the CTA. No invented names, cities, baselines or
# execution figures: where the website summary is thin, the copy stays general.
cs1 = case_study("11", {
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
 "shot_title": "Search Console, seven months",
 "shot_note": "Client's own Google Search Console. Red zone is before, green zone is after we took over.",
 "cta_head": "Different field, same kind of buyer.",
 "cta_text": "A clinic and a construction firm both sell a service people research before calling. "
   "Full case study: mavixmarketing.com/case-studies/construction-management-seo",
 "cta_btn": "Read the full case study",
})

cs2 = case_study("12", {
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
 "shot_title": "Search Console, 16 months",
 "shot_note": "Client's own Google Search Console. Red zone is before, green zone is after we took over.",
 "cta_head": "This is what it looks like at scale.",
 "cta_text": "Your treatments are not software, but the mechanics are the same. "
   "Full case study: mavixmarketing.com/case-studies/hr-software-seo",
 "cta_btn": "Read the full case study",
})

cs3 = case_study("13", {
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
 "shot_title": "Search Console, 12 months",
 "shot_note": "Client's own Google Search Console. Red zone is before, green zone is after we took over.",
 "cta_head": "Small clinic, same principle.",
 "cta_text": "Six treatment pages is a smaller job than a full online store, and it moves faster. "
   "Full case study: mavixmarketing.com/case-studies/home-goods-retailer-seo",
 "cta_btn": "Read the full case study",
})

P.update({
 "seo_tiers": [
  {"name":"Starter","price":"349 USD","points":[
    "Keyword and competitor research","2 blog articles a month","Directory and profile listings",
    "Social bookmarking and Q&A","Monthly report and call"]},
  {"name":"Growth","price":"549 USD","was":"was 799 USD","reco":True,"points":[
    "Everything in Starter","3 to 4 blog articles a month","2 guest posts a month",
    "1 PR placement a month","Google Business Profile management","Infographics and PDF assets"]},
  {"name":"Premium","price":"1,649 USD","points":[
    "Everything in Growth","8 or more blogs and guest posts","Full on-page audit and the fixes",
    "Technical SEO: speed, schema, links","Quarterly competitor gap analysis",
    "Priority support and strategy calls"]},
 ],
 "guarantee_title": "90-day money-back guarantee",
 "guarantee_text": "On Growth and Premium, if we miss the 90-day target we agree with you, you get every fee "
   "back plus 1,000 USD for the time you spent with us. We have never had to pay it and we would "
   "rather keep it that way.",
})
s14 = pricing_seo("14", P)

s15 = section("15", "Questions",
  'The ones dentists <span class="accent">actually ask.</span>',
  faqs([
 ("How long before I see a booking that came from this?",
  "First page-one rankings usually land around month three. Booked treatments that trace back to "
  "organic search normally show in the call log around month four. Anyone promising week-two "
  "results is selling you ads and calling it SEO."),
 ("Can I keep the work if I leave?",
  "Yes. Everything sits in your own Google accounts, your own hosting and your own domain. If you "
  "leave, the pages and the rankings stay yours."),
 ("Who actually writes the content? Is it AI?",
  "A person, and we will tell you their name. For dental content they work from your protocols and "
  "your consultant's notes, and you sign off every page before it goes live."),
 ("What about the Arabic market?",
  "Roughly a third of the searches for your treatments in Dubai are in Arabic and almost nobody in "
  "Marina has proper Arabic pages. We treat that as a separate keyword set, not a translation."),
 ("Do I need to stop my Google Ads?",
  "No, and we would not advise it. Ads cover you while rankings build. Most clients cut ad spend "
  "around month six because they no longer need it, not because we asked."),
 ("What happens if Google changes its algorithm?",
  "Sites built on real content and clean links tend to gain in core updates. The ones that get hit "
  "are built on the kind of spam links currently pointing at your domain."),
 ("Is there a contract, and can I pause?",
  "No long contract: no time limit, it only ties us to deliver. No setup fee. You can pause for a month if cash flow tightens, "
  "though rankings drift if it runs longer than that. The guarantee is the only fixed term."),
 ("Will you write about treatments we do not offer?",
  "No. We only build pages for what you actually sell, priced the way you actually price it. "
  "Ranking for a treatment you refer out wastes your time and annoys the patient."),
]))

P.update({
 "rep_num": "16",
 "rep_intro": "You get one short written update a week and one proper report a month. Neither is "
   "designed to look impressive. They are designed so you can tell in about two minutes whether "
   "this is working.",
 "rep_groups": [
  ("Every week", ["What we published or fixed", "What moved in the rankings",
    "Anything we need from you", "Sent Friday, three paragraphs, no attachments"]),
  ("Every month", ["Organic visits, calls and bookings against target",
    "Keyword movement on the tracked set", "What we are doing next month and why",
    "A 30 minute call, camera on, questions welcome"]),
 ],
 "rep_quote": "If a report needs explaining, it is a bad report.",
 "rep_note": "You also get direct access to the Looker Studio dashboard, built on your own Search "
   "Console and Analytics. Open it any day of the month without asking us.",
})
s16 = reporting(P)

P.update({
 "ns_num": "17",
 "ns_intro": "There is no proposal call to sit through. If this reads right, reply and we start "
   "the technical work this week.",
 "ns_steps": [
  ("Confirm the plan", "Reply with the plan you want. We send one page to sign, no legal marathon."),
  ("Kickoff within 24 hours", "One 45 minute call on your treatments, your margins and which cases you want more of."),
  ("Access handover", "Read access to Search Console, Analytics and your Google Business Profile."),
  ("Work starts", "Technical fixes and the disavow go in during week one, before anything is published."),
  ("First report", "End of month one, with the corrected baseline figures."),
 ],
 "cta_head": "Confirm, and we start this week.",
 "cta_text": "Reply to this document with the plan you want. We will send the one-page agreement "
   "and the kickoff time the same day.",
 "cta_btn": "Reply and we begin",
})
s17 = next_steps(P)

parts = [cover(P), contents(TOC, DOCTITLE), s01, s02, s03, s04, s05, s06, s07, s08,
         s09, s10, cs1, cs2, cs3, s14, s15, s16, s17]
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT_DIR, exist_ok=True)
out = os.path.join(OUT_DIR,
                   "Lumiere_Dental_SEO_Proposal.pdf")
HTML(string=build_html(CSS, parts, DOCTITLE)).write_pdf(out)
print("written:", out)

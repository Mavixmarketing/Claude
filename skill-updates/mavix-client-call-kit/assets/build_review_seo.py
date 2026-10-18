# -*- coding: utf-8 -*-
import os, sys, subprocess, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render_lib import (BLUE, LIME, INK, BODY, LABEL, LIGHT, HAIR, WASH,
                        tick, callout, cards, steps, checks, panels,
                        head_block, strip, nextline)
import review_charts as comp
from review_charts import (CSS, MARK, facts, pm, review_bars, band_chart, difficulty_meter,
                  coverage_map, timeline, vs_table, tiers, big_stat, dash)

ROOT = os.path.dirname(os.path.abspath(__file__))  # point at your output folder
HTML = os.path.join(ROOT, "html")
PNG = os.path.join(ROOT, "png")
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
CLIENT = "The Creative Kitchen Co."
OUT_PDF = os.path.join(ROOT, "Mavix-SEO-Review.pdf")  # rename per client

IC = {
 "map": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke="#005AFF" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="#005AFF" stroke-width="1.8"/></svg>',
 "search": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#005AFF" stroke-width="1.8"/><path d="M16.2 16.2L21 21" stroke="#005AFF" stroke-width="1.8" stroke-linecap="round"/></svg>',
 "screen": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="13" rx="2" stroke="#005AFF" stroke-width="1.8"/><path d="M8 21h8M12 17v4" stroke="#005AFF" stroke-width="1.8" stroke-linecap="round"/></svg>',
 "compass": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005AFF" stroke-width="1.8"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" stroke="#005AFF" stroke-width="1.8" stroke-linejoin="round"/></svg>',
 "mail": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#005AFF" stroke-width="1.8"/><path d="M3.5 7l8.5 6 8.5-6" stroke="#005AFF" stroke-width="1.8" stroke-linejoin="round"/></svg>',
 "sheet": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6V3z" stroke="#005AFF" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 12h6M9 16h6" stroke="#005AFF" stroke-width="1.8" stroke-linecap="round"/></svg>',
 "chat": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H9l-5 4V5z" stroke="#005AFF" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 10h8" stroke="#005AFF" stroke-width="1.8" stroke-linecap="round"/></svg>',
 "phone": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 3h4l2 5-2.5 1.5a12 12 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" stroke="#005AFF" stroke-width="1.8" stroke-linejoin="round"/></svg>',
}

CONTENTS = [
 "What we checked", "Fewer reviews than the three above you", "Your Google listing",
 "Where you show up today", "Who is visiting your site", "Two easy wins nobody has taken",
 "The towns you are missing", "Your website", "What we would do",
 "The first six months", "How we work", "What it costs, and the guarantee",
 "Hiring someone, or using us",
]


# ---------------------------------------------------------------- shell
def shell(section, num, total, inner, cover=False):
    head = "" if cover else (f'<div class="phead"><div class="l">{CLIENT}</div>'
                             f'<div class="r">Mavix Marketing</div></div>')
    foot = "" if cover else (f'<div class="pfoot"><div class="l">{section}</div>'
                             f'<div class="r">{num} / {total}</div></div>')
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head>'
            f'<body><div class="page"><div class="inner">{head}{inner}</div>{foot}</div></body></html>')


def sub(t, n=None):
    s = f'<span>{n}</span>' if n else ''
    return f'<h2 class="sub">{s}{t}</h2>'


# ---------------------------------------------------------------- pages
def p01_cover():
    rows = [("Prepared for", "The Creative Kitchen Co."),
            ("Owners", "John Hardesty and Jared Mason"),
            ("Where", "Columbus and Hilliard, Ohio"),
            ("Trade", "Kitchen remodels and cabinet refacing"),
            ("Checked", "20 August 2026, live")]
    toc = "".join(
        f'<div style="display:flex;gap:14px;font-size:20px;color:{BODY};align-items:baseline">'
        f'<span style="color:{BLUE};font-weight:700;flex:0 0 26px">{i+2:02d}</span>{t}</div>'
        for i, t in enumerate(CONTENTS))
    return f'''
<div style="display:flex;justify-content:space-between;align-items:baseline;
     padding-bottom:16px;border-bottom:1px solid {HAIR};">
  <div style="font-size:20px;font-weight:700;color:{INK};letter-spacing:3.4px;">MAVIX MARKETING</div>
  <div style="font-size:17px;font-weight:500;color:{LIGHT};letter-spacing:2.6px;">HONEST MARKETING, WITH RECEIPTS</div>
</div>
<div style="height:118px"></div>
<div style="font-size:20px;font-weight:600;color:{BLUE};letter-spacing:3.6px;">YOUR BUSINESS ON GOOGLE
  <span style="display:block;width:52px;height:3px;background:{LIME};margin-top:14px"></span></div>
<h1 style="font-size:74px;font-weight:700;color:{INK};line-height:1.1;letter-spacing:-2px;
    margin-top:30px;max-width:1000px;">Same rating.<br><em style="font-family:'Playfair Display',serif;
    font-style:italic;font-weight:500;color:{BLUE};">Far fewer people see you</em></h1>
<p style="font-size:26px;line-height:1.55;color:{BODY};margin-top:26px;max-width:900px;">
  You have been fitting kitchens for ten years. You have 42 reviews at 4.9 stars. But when someone
  in Columbus searches for a kitchen, Google shows them three other companies first. Here is what
  we found, and what we would do about it.</p>
<div style="height:44px"></div>
{facts(rows)}
<div style="height:38px"></div>
<div style="font-size:17px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;color:{LABEL};margin-bottom:16px">What is in this document</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:11px 44px;max-width:1010px">{toc}</div>
<div style="position:absolute;left:0;right:0;bottom:0;">
  <div style="border-top:1px solid {HAIR};padding-top:16px;display:flex;justify-content:space-between;">
    <div style="font-size:18px;color:{LABEL};">Prepared by Mavix Marketing, Dubai</div>
    <div style="font-size:18px;color:{LIGHT};">We checked every number in here by hand on 20 August 2026.</div>
  </div>
</div>
{MARK}'''


def p02_method():
    cds = [
        (IC["map"], "Your Google listing",
         "Your star rating, how many reviews you have, how new they are, your photos, and the boxes "
         "left empty. Then the same check on the three remodellers above you."),
        (IC["search"], "The words people type",
         "What people near Columbus type into Google when they want a kitchen done, how many type "
         "it each month, and where your site turns up."),
        (IC["screen"], "Your website",
         "We read it the way a homeowner would. What it tells them, what it leaves out, and how "
         "easy you are to phone."),
        (IC["compass"], "The towns around you",
         "Which towns near Columbus your site shows up in, and which ones it does not show up in "
         "at all."),
    ]
    src = ["Where you show up: a live Google search set to Columbus, run through Bright Data.",
           "How many people search, and what a click costs: Google Keyword Planner.",
           "How hard each word is to win: DataForSEO."]
    return (head_block("HOW WE CHECKED", 'What we checked, and <em>where the numbers came from</em>',
                       "Everything in here came off a real Google search or your real listing on "
                       "20 August 2026. You can check any of it yourself in about ten minutes.")
            + '<div class="gap"></div>' + cards(cds)
            + '<div class="gap"></div>'
            + callout("Where the numbers came from",
                      "We used three tools and guessed at nothing. Where a tool had no number for "
                      "us, this document says no figure instead of making one up.")
            + '<div class="gap"></div>' + strip("The three tools", src)
            + '<div class="gap"></div>'
            + nextline("Read this as a list of money left on the table. Your work is already good. "
                       "The only problem is how few people get to see it."))


def p03_headline():
    rows = [("Homecraft Remodeling", "4.9", 117, True, False),
            ("Elite Home Remodeling", "4.9", 104, True, False),
            ("Scott Hall Remodeling", "4.9", 58, True, False),
            ("The Creative Kitchen Co.", "4.9", 42, False, True)]
    return (head_block("THE MAIN THING WE FOUND", 'Same 4.9 stars. <em>Fewer people see you</em>',
                       "Search for a kitchen remodel in Columbus and Google puts a box of three "
                       "companies right at the top. All three are rated 4.9, the same as you. All "
                       "three have more reviews than you. You are not in that box.")
            + '<div class="gap"></div>' + review_bars(rows, 117)
            + '<div class="gap"></div>'
            + callout("This is not about your work",
                      "Not one of your 42 reviews sits at 2 stars or below. SemBro Designs has 153 "
                      "reviews at 4.7, and eleven of theirs are 2 stars or worse. Google is counting "
                      "how many reviews you have, not how good they are.")
            + '<div class="gap"></div>'
            + nextline("Your newest review is dated 22 May 2026. That is three months of finished "
                       "kitchens where nobody asked the customer to leave one."))


def p04_listing():
    have = ["Your opening hours are set",
            "Four job types chosen",
            "115 photos uploaded",
            "42 reviews, all holding a 4.9",
            "Ten years of trading behind you"]
    miss = ["No description of your business",
            "No list of the jobs you do",
            "No questions and answers",
            "No posts, not one",
            "Newest review is 22 May 2026"]
    return (head_block("YOUR GOOGLE LISTING", 'You did the hard part. <em>The easy part is empty</em>',
                       "Google gives every business the same boxes to fill in. You have filled the "
                       "ones that take years to earn. The ones that take an afternoon are blank.")
            + '<div class="gap"></div>' + pm("Filled in", have, "Left empty", miss)
            + '<div class="gap"></div>'
            + callout("The address problem",
                      "Your Google listing says Plain City. Your website says Hilliard. Google reads "
                      "that as two different businesses in two different towns, so it fully trusts "
                      "neither one.", blue=True)
            + '<div class="gap"></div>'
            + nextline("None of this needs a developer. It is some writing, a list of the jobs you "
                       "do, a few answers, and asking for a review every time a kitchen is finished."))


def p05_ranks():
    win = [("kitchen designer columbus", "3", "20", "no figure", "$20.65"),
           ("kitchen remodel hilliard ohio", "5", "no figure", "no figure", "no figure"),
           ("kitchen remodeling dublin ohio", "6", "no figure", "no figure", "no figure")]
    lose = [("kitchen remodeling columbus ohio", "480", "16", "$15.72"),
            ("cabinet painting columbus ohio", "320", "0", "$16.52"),
            ("kitchen cabinets columbus ohio", "210", "2", "$7.26"),
            ("cabinet refacing columbus", "40", "no figure", "$18.50"),
            ("kitchen refacing columbus ohio", "10", "17", "$34.56")]
    r = ['<table class="g"><colgroup><col style="width:41%"><col style="width:15%">'
         '<col style="width:16%"><col style="width:13%"><col style="width:15%"></colgroup>',
         '<tr><th>What people type</th><th class="n">Your spot</th><th class="n">Searches a month</th>'
         '<th class="n">How hard</th><th class="n">Cost per click</th></tr>',
         f'<tr class="grp"><td colspan="5" style="color:{BLUE}">You are on page one for these</td></tr>']
    for t, p, v, d, c in win:
        r.append(f'<tr class="win"><td class="k">{t}</td><td class="n pos">{p}</td>'
                 f'<td class="n">{v}</td><td class="n">{d}</td><td class="n">{c}</td></tr>')
    r.append(f'<tr class="grp"><td colspan="5" style="color:{LABEL}">You are nowhere near the top ten for these</td></tr>')
    for t, v, d, c in lose:
        r.append(f'<tr><td class="k">{t}</td><td class="n miss"><svg width="22" height="22" viewBox="0 0 26 26" fill="none" style="vertical-align:-4px"><circle cx="13" cy="13" r="11" stroke="#9AA1AE" stroke-width="2"/><path d="M8.6 13h8.8" stroke="#9AA1AE" stroke-width="2.4" stroke-linecap="round"/></svg></td>'
                 f'<td class="n">{v}</td><td class="n">{d}</td><td class="n">{c}</td></tr>')
    r.append('</table>')
    note = ('<div class="tnote">We ran these searches live from Columbus on 20 August 2026. Searches '
            'a month and cost per click come from Google Keyword Planner. How hard comes from '
            'DataForSEO, where 0 means nobody has claimed it and 100 means a real fight. No figure '
            'means the tool had nothing for that word.</div>')
    return (head_block("WHERE YOU SHOW UP TODAY", 'You show up for the quiet words, <em>not the busy ones</em>',
                       "Your site is in the top ten for 25 different searches. Only four of those "
                       "reach the top three spots, and all four are people typing your own name.")
            + '<div class="gap-s"></div>' + "".join(r) + note
            + '<div class="gap"></div>'
            + callout("How big the gap is",
                      "Add up the three searches you win and you get 20 people a month. Add up the "
                      "five you miss and you get 1,060."))


def p06_traffic():
    marks = [(17, 'Your best spot on Google|"creative kitchen", 3,600 a month'),
             ((15, 20), "Your countertop pages|79 search terms"),
             ((15, 20), "Your kitchen island pages|41 search terms")]
    return (head_block("WHO IS VISITING YOUR SITE", 'Plenty of visitors. <em>Almost none of them buying</em>',
                       "Your site does bring people in every month. The trouble is what those "
                       "people came looking for.")
            + '<div class="gap-s"></div>'
            + big_stat("746", "people a month, at least",
                       "That is the lowest it can be. Our tool listed 400 search terms and then "
                       "stopped, so the real number is higher.")
            + '<div class="gap"></div>'
            + sub("Where your busiest pages actually show up")
            + band_chart(marks)
            + '<div class="gap-s"></div>'
            + callout("These visitors are not buyers yet",
                      "Someone typing how deep a kitchen island should be is just reading. Someone "
                      "typing kitchen remodeling columbus ohio is ready to hire. Nearly all your "
                      "visits are the first sort.", blue=True))


def p07_gap():
    rows = [("cabinet painting columbus ohio", "320", 0, "$16.52"),
            ("kitchen cabinets columbus ohio", "210", 2, "$7.26"),
            ("kitchen remodeling columbus ohio", "480", 16, "$15.72"),
            ("cabinet refacing columbus", "40", None, "$18.50")]
    return (head_block("THE EASY WINS", 'Two jobs you already do, <em>that nobody has claimed</em>',
                       "The score below runs from 0 to 100. It says how hard it is to get to the "
                       "top of Google for that search. Cabinet painting in Columbus scores 0. In a "
                       "city this size, that almost never happens.")
            + '<div class="gap-s"></div>' + difficulty_meter(rows)
            + '<div class="gap-s"></div>'
            + '<div class="tnote">These scores come from DataForSEO. Today you are outside the top '
              'ten for all four of these.</div>'
            + '<div class="gap"></div>'
            + callout("Refacing is the bigger miss",
                      "Your whole site covers three refacing searches, and the best of them sits at "
                      "number 25. Troyer Transformations sits at number one. Refacing is half of "
                      "what you sell and almost none of what Google shows you for.")
            + '<div class="gap"></div>'
            + nextline("A score of 0 means nobody has bothered to write the page yet. The page still "
                       "takes work. It just means there is nobody in the queue ahead of you."))


def p08_suburbs():
    covered = ["Columbus", "Dublin"]
    missing = ["Powell", "Westerville", "Worthington", "New Albany",
               "Upper Arlington", "Bexley", "Gahanna", "Pickerington"]
    return (head_block("THE TOWNS AROUND YOU", 'Two towns covered. <em>Eight with nothing at all</em>',
                       "Your Columbus page and your Dublin page both reach page one of Google. Both "
                       "are very short pages. In every other town on this list, you show up for "
                       "nothing.")
            + '<div class="gap-s"></div>' + coverage_map("The Creative|Kitchen Co.", covered, missing)
            + '<div class="gap"></div>'
            + callout("What those two pages tell us",
                      "Both are thin, and they still made page one. That tells us the competition "
                      "in these towns is light, and that the same page built properly would do "
                      "better still.", blue=True)
            + '<div class="gap"></div>'
            + nextline("You already show up for Hilliard searches, and you do not even have a "
                       "Hilliard page. That is the quickest gap here to close."))


def p09_website():
    rows = [
     ("No price anywhere on your site.",
      "They show a range: $20,000 to $50,000."),
     ("Nothing about financing.",
      "They offer financing, and say so."),
     ("We could not find a form to fill in.",
      "They ask for a free consultation three times on one page."),
     ("On your kitchen page, your phone number is nowhere at all.",
      "Their phone number sits at the top of every page."),
     ("The only nudge on that page: \"Contact our Columbus remodeling team today!\"",
      "Every section ends with something to click or call."),
    ]
    return (head_block("YOUR WEBSITE", 'The first question they ask, <em>and your site stays quiet</em>',
                       "How much does a kitchen cost. Your site never says, on any page. One of the "
                       "companies you are up against puts the number right there on theirs.")
            + '<div class="gap"></div>'
            + vs_table("Your site today", "SemBro Designs", rows)
            + '<div class="gap"></div>'
            + callout("Why the price matters more than you would think",
                      "A homeowner who cannot find a price clicks the next company. Putting a range "
                      "up also filters out the people who were never going to book you, which saves "
                      "you driving out to quote them.")
            + '<div class="gap"></div>'
            + nextline("Nobody is asking you to drop your prices. A starting figure and one honest "
                       "line about what pushes it up will do the job."))


def p10_plan():
    st = [
     ("Fix your Google listing",
      "Write the description, list the jobs you do, answer the common questions, post every week, "
      "and use one address in one town. Then ask every finished kitchen for a review."),
     ("Build the pages that sell",
      "Kitchen remodeling, cabinet refacing and cabinet painting each get their own proper page, "
      "written so Google can read it and a homeowner wants to."),
     ("Take the easy wins first",
      "Cabinet painting scores 0 for difficulty, and cabinet refacing is close behind. Clicks there "
      "are worth $16.52 and $18.50."),
     ("Answer the price question",
      "Put a range up, mention financing, add a form to every page, and put your phone number where "
      "a thumb can reach it."),
     ("Open up the nearby towns",
      "Hilliard, Powell, Westerville, Worthington, New Albany and Upper Arlington each get a real "
      "page, built the way the Columbus and Dublin pages should have been."),
     ("Lift the pages you already have",
      "79 countertop search terms and 41 island search terms sit at positions 15 to 20. Rewriting "
      "those and linking them up is the cheapest work on this list."),
    ]
    return (head_block("WHAT WE WOULD DO", 'Six jobs, <em>in the order that pays first</em>',
                       "None of this needs a new website. Every job here is work on what you "
                       "already have.")
            + '<div class="gap"></div>' + steps(st)
            + '<div class="gap-l"></div>'
            + callout("Why this order",
                      "Your listing and your price are the two cheapest things to fix, and the two "
                      "a homeowner notices first. The heavy writing comes after those, not before.",
                      blue=True))


def p11_timeline():
    st = [("Week 1", "Your listing, and the address",
           "We write your description, your list of jobs and your answers. Plain City and Hilliard "
           "get sorted out so your listing and your website say the same town. Review requests "
           "start going out after every finished job."),
          ("Weeks 2 to 4", "The three pages that sell",
           "The kitchen remodeling, cabinet refacing and cabinet painting pages get written and go "
           "live. Your price range goes up. Forms and your phone number go on every page."),
          ("Month 2", "The first towns, and your old pages",
           "Hilliard and Powell get their own pages. The countertop and island pages sitting at 15 "
           "to 20 get rewritten and linked to the pages that sell."),
          ("Month 3", "The rest of the towns",
           "Westerville, Worthington, New Albany and Upper Arlington. By now, photos and posts are "
           "going onto your Google listing every week."),
          ("Months 4 to 6", "Follow whatever is working",
           "More pages, in whichever direction the numbers point. Every month we go through where "
           "you sit on Google, the calls and the form fills, and we change the plan if the numbers "
           "say we should.")]
    return (head_block("THE FIRST SIX MONTHS", 'What happens, <em>and when</em>',
                       "Work starts in the first week. There is no two month research phase before "
                       "anything happens.")
            + '<div class="gap"></div>' + timeline(st)
            + '<div class="gap"></div>'
            + '<div class="tnote">Nothing on this timeline promises you a spot on Google or a number '
              'of leads. The only promise in this document is the guarantee on the pricing page.</div>')


def p12_howwework():
    cds = [(IC["mail"], "A written update every Friday",
            "What we did this week, and what is next, in plain words. You get it whether the news "
            "is good or bad."),
           (IC["sheet"], "One page a month",
            "Where you sit on Google, your calls and your form fills, on one page you can read "
            "standing up."),
           (IC["chat"], "A shared Slack channel",
            "You talk to the people doing the work, not to a ticket queue."),
           (IC["phone"], "My phone number",
            "If something is wrong you call me, not a support inbox.")]
    rows = [("You find out what happened when the invoice lands.",
             "A written update every Friday."),
            ("A long report full of charts that nobody opens.",
             "One page a month, in plain English."),
            ("A ticket queue and a three day wait.",
             "A Slack channel with the people doing the work."),
            ("Accounts opened in the agency's name.",
             "Every account stays in your name, forever."),
            ("A twelve month contract you cannot leave.",
             "No contract. 30 days notice, any time."),
            ("A setup fee before anything happens.",
             "No setup fee.")]
    return (head_block("HOW WE WORK", 'You will always know <em>what happened this week</em>')
            + '<div class="gap-s"></div>' + cards(cds)
            + '<div class="gap"></div>'
            + vs_table("What usually goes wrong", "What happens here", rows)
            + '<div class="gap-s"></div>'
            + '<div class="tnote">Mavix is based in Dubai. We are a team of just over thirty. '
              'Search, paid ads and email are the only things we sell.</div>')


def p13_pricing():
    ts = [("Starter", "$349", "a month", "No guarantee on this one.", False, None),
          ("Growth", "$549", "a month, locked for life",
           "Guarantee runs for two months. Normally $799.", True, "What we would pick"),
          ("Premium", "$1,699", "a month", "Guarantee runs for three months.", False, None)]
    terms = ["No setup fee", "No contract", "30 days notice", "Every account in your name"]
    return (head_block("WHAT IT COSTS", 'Three ways to run this, <em>one we would pick</em>',
                       "The only difference between these three is how much work we do each month. "
                       "We work that out on the call, once you tell us where you want to start.")
            + '<div class="gap"></div>' + tiers(ts)
            + '<div class="gap"></div>'
            + callout("The guarantee",
                      "50% more traffic, rankings and visitors, or you get your money back. That "
                      "runs for two months on Growth and three months on Premium. Starter has no "
                      "guarantee. On top of the refund, Farhan writes you a $1,000 cheque out of "
                      "his own pocket.",
                      blue=True)
            + '<div class="gap"></div>' + strip("The terms, in full", terms)
            + '<div class="gap-s"></div>'
            + '<div class="tnote">We are not promising you a spot on Google, and we are not promising '
              'a number of leads. The guarantee above is the only promise in this document.</div>')


def p14_hire():
    left = ["A salary every month, whether the work goes well or not.",
            "Insurance and payroll costs on top of that.",
            "Weeks of advertising and interviewing before anyone starts.",
            "More weeks of training before they are any use.",
            "One person's skills, and one person's opinion.",
            "If they leave, you start the whole thing again from nothing."]
    right = ["A team, not one person. Writers, technical people, someone on your listing.",
             "No insurance, no payroll to run.",
             "No recruiting. Work starts the week you say go.",
             "Nothing to train. We have done this before.",
             "30 days notice ends it, with no argument.",
             "Every account stays in your name, so nothing walks out of the door."]
    return (head_block("THE OTHER OPTION", 'Hire one person, <em>or use a whole team</em>',
                       "The other way to get this done is to hire somebody in house. It is only "
                       "fair to show you what that involves before you decide.")
            + '<div class="gap"></div>'
            + panels("Hiring one person", left, "Working with us", right, numbered=False)
            + '<div class="gap"></div>'
            + callout("The part people forget",
                      "Most people worry about the salary. The bigger cost is the months you "
                      "lose if the person turns out wrong, because the work stops while you find "
                      "someone else.")
            + '<div class="gap"></div>'
            + nextline("The next step is a call, to work out how big the job is and agree where to "
                       "start. Nothing in this document ties you to anything."))


PAGES = [
    ("Cover", p01_cover, True),
    ("What we checked", p02_method, False),
    ("Fewer reviews than the three above you", p03_headline, False),
    ("Your Google listing", p04_listing, False),
    ("Where you show up today", p05_ranks, False),
    ("Who is visiting your site", p06_traffic, False),
    ("Two easy wins nobody has taken", p07_gap, False),
    ("The towns you are missing", p08_suburbs, False),
    ("Your website", p09_website, False),
    ("What we would do", p10_plan, False),
    ("The first six months", p11_timeline, False),
    ("How we work", p12_howwework, False),
    ("What it costs, and the guarantee", p13_pricing, False),
    ("Hiring someone, or using us", p14_hire, False),
]
TOTAL = len(PAGES)


def build():
    shutil.rmtree(HTML, ignore_errors=True)
    shutil.rmtree(PNG, ignore_errors=True)
    os.makedirs(HTML)
    os.makedirs(PNG)
    for i, (sec, fn, is_cover) in enumerate(PAGES, 1):
        open(os.path.join(HTML, f"p{i:02d}.html"), "w").write(
            shell(sec, i, TOTAL, fn(), cover=is_cover))


def render():
    for f in sorted(x for x in os.listdir(HTML) if x.endswith(".html")):
        out = os.path.join(PNG, f.replace(".html", ".png"))
        subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-sandbox",
                        "--hide-scrollbars", "--force-device-scale-factor=2",
                        "--window-size=1240,1754", f"--screenshot={out}",
                        "--default-background-color=FFFFFFFF",
                        "file://" + os.path.join(HTML, f)], check=True, capture_output=True)


def to_pdf():
    import img2pdf
    pngs = [os.path.join(PNG, f) for f in sorted(os.listdir(PNG)) if f.endswith(".png")]
    layout = img2pdf.get_layout_fun((img2pdf.mm_to_pt(210), img2pdf.mm_to_pt(297)))
    with open(OUT_PDF, "wb") as f:
        f.write(img2pdf.convert(pngs, layout_fun=layout))
    return OUT_PDF


if __name__ == "__main__":
    build()
    render()
    print("built", to_pdf())

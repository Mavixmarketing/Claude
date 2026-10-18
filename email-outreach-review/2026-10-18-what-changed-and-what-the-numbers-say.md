# What changed, and what the numbers say (18 Oct 2026)

Written for Farhan, in plain English. Covers your notes file, your answers to my questions, the 22 sales videos, your SalesBlink numbers and every conversation the reply agent has had since 29 Sep.

---

## 1. What I changed (email and LinkedIn)

| Your note | What it does now |
|---|---|
| No follow-ups while we owe the audit | Once we tell someone "i will start preparing your audit", nothing goes out until you send it. The day after you send it, the follow-up about it goes out. |
| Never ask for the website | The agent never asks for it, in any words. If a website question slips into a draft, the checker cuts it out. If we don't know the site, the Slack card says "website not known, please find it". |
| Price questions | No numbers before the audit. The reply says we have 3 plans, that the right one depends on their goal (more calls soon, or showing up higher over 3 to 6 months), and that the free audit shows the exact plan and price. Then it asks one question about their goal. After the audit, it may name the 3 plans: $349, $549, $1,099. |
| Money back | It follows the plan-based promise: Growth has 2 months money back, Premium has 3. It never mentions the "refund plus $1,000". If someone asks about that promise from the cold email, the reply is held and sent to you. |
| "Let's talk next year" | The agent agrees warmly. Then it adds one gentle sentence on why starting a little earlier helps their kind of business (Google takes a few months to trust a site). It offers to send the audit now so it's ready, and books the date. No pushing. |
| Too much information confusing the agent | The email reply instructions are about half as long as before. The agent now sees only the 3 case studies closest to that business, not all 19. It gets the phone numbers only when someone wants to talk, and the pay-per-lead rules only when their cold email offered it. |
| Daily follow-ups looking desperate | Every follow-up has its own job and must bring something new. Repeated lines like "nothing to prepare" and "just reply go" are limited to once each. |
| Follow-up timing | Your timetable: 4 hours, the next day, then 3 days later, 4 days later, a week later, then about 1, 2 and 3 months. Except for the first one, each goes out at the hour that person usually replies, never on their Sunday. LinkedIn follows the same timing, but stops after 5 because the Prosp sequence already sends the 1 and 2 month check-ins. LinkedIn is capped at 20 follow-ups a day to keep the accounts safe. |
| Summaries | Every morning: yesterday only. Mondays: last week as well. The 1st of the month: last month in full. A new daily list, "Audits you still owe", shows who is waiting on you and for how many days. Follow-ups now wait for you, so this list is your reminder. |
| Same on LinkedIn | All of the above is in the LinkedIn reply agent and the LinkedIn follow-ups too. |

All of this went live on 18 Oct at about 8:20am IST, in five automations:
- the email reply agent
- the email follow-ups
- the morning report
- the LinkedIn reply agent
- the LinkedIn follow-ups

The first live follow-up run at 8:30am IST finished with no errors.

I tested in test mode, with nothing sent:
- the email follow-ups and the LinkedIn follow-ups, on sample chats
- the morning report, on your real numbers
- the email reply agent, on 9 real past conversations

The LinkedIn reply agent only runs when a real LinkedIn reply arrives, so it couldn't be tested in advance; its first real reply will show in Slack as usual.

On those 9 conversations, the email reply agent now:
- gives no price before the audit
- never asks for a website
- writes a warm thank-you on a second "no"

The test caught one mistake: it told Tonya "we have not worked with a government contracting consultant yet". That breaks your rule, and I fixed it before going live.

---

## 2. Things you should know before trusting the new setup

1. **The 4-hour follow-up is a risk.** In your notes you said repeated quick emails look desperate. A nudge 4 hours later, then another the next day, is that same pattern. The SalesBlink numbers point the same way: most unsubscribe requests come on the third cold email, which goes out only 2 days after the first. I built it the way you asked, but limited it: only in the person's daytime, and it must make answering easier, not just chase. If unsubscribes or "stop" replies go up, turn it off first. Tell me "remove the 4 hour one" and I will.
2. **Your cold emails promise something the replies no longer say.** 9 of the 10 first emails and 5 follow-ups promise "full refund plus $1,000 if we miss the 90-day target". The replies now follow your plan-based money back. Someone who read the cold email and then asks will get a held reply sent to you, not an answer. The cold email templates need updating to match. I can rewrite them, but it changes live campaigns, so I haven't touched them.
3. **"No numbers before the audit" goes against 4 of the videos.** All four say to give the price straight away, because dodging it looks evasive. I did it your way, but the reply explains how the price is decided and asks a real question, so it doesn't read as a dodge. Watch whether price-askers go quiet. If they do, the fix is to give the range ($349 to $1,099).
4. **About "video"**: by videos I meant the YouTube videos you sent me. You don't need to record anything. Two of those videos suggest sending a short recorded audit; I left that idea out because you said no videos.

---

## 3. Where prospects leave us (49 conversations since 29 Sep)

| Where it stops | How many | What happened |
|---|---|---|
| **After the audit** | 14 of 17 who got an audit | They received the audit, we followed up about 4 times each, and they never replied. Only 3 people (septic.ca, allcarehomes, Anne) wrote back after an audit. |
| **After saying yes, before telling us what they want** | 10 | We asked which services and which area. They never answered. We followed up 3 to 5 times. |
| **After asking the price** | 6 | We gave "$349 a month" or similar and they went quiet. |
| Other (no, later, not a fit, still open) | 19 | Mixed. |

What I read from this:

1. **The audit is where we lose most people.** The audit shows the problem, but it doesn't make the next step small and obvious. Our follow-ups then asked vague things like "which part would you like to start with?", and that takes thinking to answer. Several videos make the same point: close in writing by naming one first step, the price, and how to start. I changed stage C of the follow-ups to do exactly that: name the one first thing we'd fix and say "just reply yes and i'll send the next steps".
   - **My recommendation:** end every audit PDF with one page: the plan we suggest, its price, what happens in month one, and "reply yes to start". That's the "sales doc" from the Sell Your Service and No Calls videos.
2. **Speed matters.** One video says interest drops after 1 to 2 days. Some audits waited 5 to 17 days. The new "audits you still owe" list is there so you can send them within 48 hours.
3. **Two questions after a "yes" is friction.** Ten people stopped right there. Where we already know their website, the audit could simply start, with no questions. That would change the rule you set, so I haven't done it. Tell me if you want it.
4. **The price answer led nowhere.** Six price-askers went quiet. "No numbers before the audit" plus one goal question is your fix, so we'll see if it works.
5. One follow-up contradicted you: you offered Dayne a phone call, and the next automatic email said "no need to find a free slot". I added a rule that follow-ups never contradict what you wrote by hand.

This is a small sample (49 chats over 3 weeks), so treat these as strong signals, not proof. I also can't see who became a paying client: the system doesn't record it. If you tell me who signed, I can show which path they took.

The 15 longest chats are in a separate file (`2026-10-17-15-longest-conversations.md`). It's ready to paste into another AI. Email addresses and phone numbers are removed.

---

## 4. What SalesBlink shows (last 90 days)

**The headline:** 49,778 emails sent, 459 replies (0.92%), 274 bounces (0.55%, healthy) and **512 unsubscribes, more than the number of replies**. That's the biggest warning sign in the data. Published studies put a normal reply rate at roughly 1.4% to 9%, so 0.92% is below the usual range.

### Campaigns

| Campaign | Sent | Replies | Real interest per 1,000 sent | Verdict |
|---|---|---|---|---|
| Scraped Aus/UK/NZ/Sing | 5,999 | 57 | **1.7** (best) | Keep. 1,275 leads still to go. |
| Scraped USA/Canada | 5,867 | 38 | 1.0 | Keep, but check the **45 send errors** in SalesBlink first. |
| AI Written (State/City) | 10,337 | 93 | 0.5 (worst) | Stop reloading. 46% of its replies are auto-replies, and 70% of real replies are "no" or "stop". It's reaching big companies (Austin Energy, law firms, Optum), not local owners. |

### Templates

- **Keep "1st Follow Up (b)"** (35 replies, 9 positive), but cut it in half. At 383 words it's the longest, and it uses "$1,000", "trick" and "catch". It also drew the most "not interested" replies (15).
- **Keep "2nd Follow Up (b)"** (49 replies, 12 positive), but change its opening. "Should I stop emailing you?" led to 14 unsubscribe requests, 29% of its replies.
- **Remove:** "1st Follow Up (c)" (1 reply, heaviest money wording), "2nd Follow Up (a)" (2 replies, "$1,000 of my own money") and "Initial 1" (the only one combining "free", "100%" and "$1,000").
- **Best clean model: "Initial 4" (A or B)**, which has no money talk. Only 4 replies so far, so it isn't proven yet.
- **Follow-ups bring more interest than first emails** (23 positive replies against 15). But they go out only 1 day apart. Move them to 3 to 4 days apart.
- None of the hand-written templates use the person's name, business or city. SalesBlink scores all of them "poor" (35 to 51 out of 100). Add at least the city or business name.

### Delivery to the inbox

- **Warm-up is off on all 130 mailboxes.** Turn it on, and consider 10 to 15 cold emails per mailbox per day instead of 20 while unsubscribes are high.
- **Rest these domains for 2 to 3 weeks** (low replies and/or high unsubscribes or bounces): mavixmarketinglab, mavixmarketingpartners, mavixmarketinghub, mavixmarketingplus, mavixmarketingsolutions, mavixmarketingservices, mavixmarketinggroup.
- **Check these mailboxes now:**
  - mfarhan@mavixmarketting.com: connection error
  - mdfarhan@mavixmarketingco.com: 4% bounces this week
  - farhan@mavixmarketingsolutions.com: 2.3% bounces
  - mfarhan@mavicmarketing.com: 0 replies from 473 emails
- In each live campaign:
  - turn **bounce auto-pause on**
  - turn **risky/catch-all sending off** (or turn on checking emails before sending)
- **No inbox-vs-spam test has ever been run.** Run one on the top 3 templates before sending more. Without it, nobody can honestly say which template lands in spam.
- **Unsubscribe spikes:** 172 on 12 Oct and 68 on 13 Oct. Check in SalesBlink where they came from. If they're one-click unsubscribes in Gmail or Outlook, that hurts your sender reputation.
- Replies per day fell from 19 to 26 (5 to 7 Oct) to 4 to 10 (15 to 17 Oct).

**What I can't tell you:** SalesBlink gives every mailbox a health score of 100, even ones with 4% bounces, so that score is useless here. It also doesn't report spam complaints. "Which template goes to spam" needs the placement test above.

---

## 5. What I took from the 22 videos

**Used** (each now built into the instructions):
- Agree first, never argue (Saad Khaja, Hormozi).
- Be honest when something isn't worth it for them yet (Hormozi, the email agency live call).
- When asking a question, say why ("the reason i ask...", Connor Murray).
- One useful thing per message; short; one easy next step (most of the no-call videos).
- Each nudge brings one new, specific thing, never the same chase twice (the 2-minute video, the 5-minute signing video).
- After the audit, make the next step tiny and obvious (the sales doc and no-calls videos).
- Raise the worry before they do, for example "no long contract" (The Futur).
- Never promise what you can't control, like rankings (Hormozi).
- Answer "how did you get my email" honestly and offer to remove them (Saad Khaja).

**Left out on purpose:** fake scarcity ("only 3 spots left"), pushing people to book a call, pressure closes, pretending to know them, and "should I stop emailing you?" style lines. All of them would look pushy or dishonest coming from a local SEO agency.

---

## 6. What needs you

1. Send the audits you owe (7 right now): Home of Chemicals, Elkan Group, Collado, Sudenifox, Weatherstripping Pros (resend), San Antonio HT Center, Segway Off Road. Several have no website on record. The morning report lists them every day.
2. Decide whether to keep the 4-hour follow-up (point 2.1).
3. Say whether I should rewrite the cold email templates to drop the "$1,000" promise and use the plan-based money back (point 2.2).
4. Confirm the plan prices after the audit are right: $349, $549, $1,099.
5. Sender fixes in SalesBlink (section 4): turn on warm-up, rest 7 domains, fix 4 mailboxes, turn on bounce auto-pause, turn off risky sending, run a placement test, check the 12 Oct unsubscribe spike.
6. If you want, add a one-page "plan, price, how to start" ending to every audit.

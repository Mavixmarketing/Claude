# v5 reply review: 19 Oct to 22 Oct 2026

For Farhan. Read-only check. Nothing was changed in n8n or SalesBlink.

The data covers 19 Oct 1:33am IST (18 Oct 20:03 UTC) to 22 Oct about midnight IST, compared with the 4 days before. Test rows are left out. I also opened a few SalesBlink threads to check when emails actually went out.

## Short answer

**Mostly better in how the replies read, but worse in control.** The tone is far better. v5 never asks for the website, gives personalised pricing, writes clear answers and ends politely. But three things could lose deals or hurt your name:

1. **v5 offered pay per lead.** Arihant (SimplifyFin) was told "yes, we can work that way" and given a made-up price of "$15 per qualified lead, down from our usual $35, with no monthly fee". He then asked for a call about that trial. You need to decide what to tell him before that call.
2. **v5 keeps chasing people who already said no.** Harvey replied a second time: "I am not in need of your services". That reply never reached the table, and 17 minutes later he got follow-up 1. Follow-up 2 went the next day. Alex said "No thanks" and got a follow-up, then said "No thank you" again. Ryan (Men Zone) said he's the wrong person and got 3 emails in 24 hours.
3. **Audits that are owed are still unsent, while follow-ups keep asking questions.** Growth Fairness asked for "a quick review" on 15 Oct and has had 4 messages asking which patients they want, but no review. Appliance Repair Springdale asked twice for the audit on 15 Oct and is still waiting.

## 1. Better or worse than before 19 Oct

**Better:**
- **No more asking for the website.** Before: "to start, send me your website link, which services you want more calls for, and the area you cover." Since v5 that is gone.
- **Pricing is personalised.** Before: "it starts from $349 a month. which services and which area?" Now: "The price depends on your site and goals. I set it after looking at your site, and it comes with the free audit" (Chris).
- **Normal capitals, shorter, more human.** For example, to "What is this, i don't understand?" v5 wrote: "Sorry, that email wasn't very clear. I run Mavix Marketing. We help local businesses show up on Google…" That is clear and friendly.
- **Good exits.** Jace: "Wishing you all the best with it." Miles, after his team said no: "The audit is yours to keep, so feel free to pass it to your SEO company as a second opinion."
- **Good after-audit follow-ups.** Each one names one first fix and asks one question (Segway, Sandline, Maven Peak, San Antonio).
- **Price after the audit is clear.** Miles: "our Growth plan at $549 a month… if we miss it within 90 days you get your money back plus $1,000 on top. No setup fee and no long contract."
- **It spotted a helpdesk loop.** The second BrainVex echo was held, not answered.

**Worse or new problems:**
- **The pay per lead offer** to Arihant, with invented prices.
- **Follow-ups come much faster.** Follow-up 1 now goes about 4 hours after our reply, and follow-up 2 the next day. That is the schedule you chose, but it is also hitting people who said no or are the wrong person, and people who got a full audit only 24 hours earlier.
- **The guarantee is said two ways.** Chris was told "a 2 month money back promise" even though he asked about 90 days. Other emails say "90 day money back guarantee". The v5 instructions themselves say Growth is 2 months and Premium is 3, which goes against your rule of 90 days on both bigger plans.
- **Revenue maths has become a template follow-up.** It appeared about 8 times with guessed numbers: "$52,000 a year", "$1,500 to $2,500 a year", "$4,550 a year", "$400 to $600 CAD". It reads salesy when the audit hasn't been sent yet.

## 2. Problems found

### Rule breaks

| Who | What happened | Rule |
|---|---|---|
| Arihant (SimplifyFin) | "yes, we can work that way… you only pay per qualified lead", then "$15 per qualified lead, down from our usual $35, with no monthly fee… you can set a limit on how many leads" | No pay per lead or pay on results. The price was also invented. |
| Chris William Construction | "Our Growth plan comes with a 2 month money back promise" | Should be 90 days, on both bigger plans |
| Growth Fairness | Review asked for on 15 Oct. Follow-up 3 on 20 Oct asks a 4th time which patients they want, adds a guessed "$1,500 to $2,500 a year", still no review | No follow-ups while an audit is owed |
| Appliance Repair Springdale | Audit asked for twice on 15 Oct. Follow-up 3 on 20 Oct uses a guessed "$52,000 a year" and asks which repairs, still no audit | No follow-ups while an audit is owed |
| Barnabas | We promised "I'll take a proper look". Then 2 follow-ups ask service and town again, and follow-up 2 adds "calls, bookings, or people walking in" | No follow-ups while an audit is owed; asks too much |

### Wrong sorting (replies that needed an answer, or the reverse)

- **Harvey's second reply was never picked up** ("I am not in need of your services", 21 Oct 19:43 UTC). There is no row for it, and 2 follow-ups went out after it. This is the most serious sorting bug, because other replies may be getting missed the same way.
- **Miles, "not interested in ELM CREEK"** was sorted as not interested. He meant that one neighbourhood, not us. You fixed it by hand.
- **Miles, "ELM Creek… is just a piece of SPAM"** was sorted as no reply needed. Your question "are you ready to get this started" was still open. Claude fixed it by hand.
- **Ryan Willoughby, sorry for the missed call** was sorted as no reply needed. It needed a rebook, so a hot lead with an audit already sent waited about 7 hours. Claude fixed it by hand.
- **BrainVex** helpdesk echo, first time: v5 replied to it. It should have been skipped as automated.
- Harvey's first "Thanks, but I already rank #1" was skipped as not interested. That was actually right, and his second reply proves it.
- Everything else checks out: 52 automated, 36 not interested, 8 no reply needed, 17 unsubscribed, all read correctly.

### Pushy, too fast, or to the wrong person

- **Ryan (Men Zone)**: our reply went at 15:19, follow-up 1 at 20:00 the same day, follow-up 2 the next day. The right move was to ask for Hussam's email or an intro. The note even says so.
- **Harvey**: our reply at 18:54, follow-up 1 at 20:00, about an hour later and after his second no.
- **Alex (alemedia)**: "No thanks, we have an active contract" got a pitch and a follow-up, and he then said "No thank you".
- **Eric (Fun and Game Experts)**: happy with Digital Guider, still got a follow-up.
- **Sandline**: the audit went on 21 Oct 14:30, and the next day v5 asked "Have you had a chance to look through the audit". That is too soon for a 24-page PDF.

### Weak but not wrong

- **Weatherstripping (Wayne)** asked "all in what is the cost to fix the site". The follow-up never gave him a number, even though the note says to answer with Growth at $549.
- **The same plumbing case study** went to a barber, a mobile tyre fitter, an appliance repairer, a cleaner and a business we know nothing about. It feels generic.
- **Kitchen Wrap Direct**: we replied to what looks like a canned answer, then sent 2 follow-ups within 24 hours.

### Outside the reply agent, but it stops deals

- **The cold email promises** "If it hasn't grown 50% in 90 days, you get a full refund plus $1,000 from me." That doesn't match the replies (a target we agree, Growth and Premium only). It led to "What is this, i don't understand?" and to Arihant's pay-on-results push.
- **Sending domains look misspelled**: maviksmarketing.com, mavvixmarketing.com, mavixmarkeeting.com, mavexmarketing.com. You already had to explain to one prospect that "the emails from me and mavixmarketing.com are the same business."
- **Hot leads waiting on you, not on the agent:**
  - Bostjan wants a phone call (missed on 20 Oct).
  - Ryan Willoughby needs a rebooked call.
  - Shaun's call is on Mon 26 Oct, and the Via Fidelis audit is due before it.
  - Arihant wants a call about the trial v5 offered him.
  - Bruce was told "the audit is on its way".
  - Barnabas, Growth Fairness and Appliance Repair Springdale are owed audits.
- **The cold list hits big companies** (Tourism Australia, Azerbaijan Airlines, Europcar's data protection inbox, HireVue, Jobber). That adds auto-replies but no deals.
- **One row (kayshalesa) is stuck as "working"**. It does no harm, because she said no in the next row.

## 3. What to change, ranked by impact on closing deals

1. **Never offer pay per lead or an invented price.** If someone insists on paying for results, the answer is the money back guarantee and nothing else. Also decide now what you'll say to Arihant on the call.
2. **Before any follow-up, check the thread for a newer reply from them.** Harvey shows replies can be missed. Stop all follow-ups once someone says no.
3. **After a no, the wrong person or "we have an agency", allow one soft reply at most, then stop.** For the wrong person, ask for the right contact instead of pitching them.
4. **Don't send follow-ups while an audit is owed. Send the audit.** Growth Fairness, Appliance Repair Springdale and Barnabas can be audited from what we already have. If something is missing, make a sensible guess and say so.
5. **Use one guarantee line everywhere: 90 days on Growth and Premium, none on Starter.** Fix the v5 instructions, which still say 2 and 3 months.
6. **Slow down after the audit is sent.** Wait at least 2 to 3 days before asking "have you looked at it". Keep the 4-hour follow-up only for people who said yes and owe us one small answer.
7. **Fix the sorter's three blind spots:**
   - "Not interested in [a place or thing]" is not a no to us.
   - If our last message asked a question that is still open, it needs a reply.
   - "Sorry I missed the call" needs a rebook.
8. **Don't use guessed revenue maths as a whole follow-up,** and never before the audit. Use one line at most, inside a message that does something else.
9. **Pick a case study that fits, or leave it out.** Plumbing for a barber hurts more than it helps.
10. **Ask one question per message, not three.**
11. **Skip helpdesk echoes** (Zendesk signatures, our own text quoted back) instead of answering them.

## 4. Numbers

The windows are 14 Oct 20:03 to 18 Oct 20:03 UTC (before) and 18 Oct 20:03 to 22 Oct about 18:40 UTC (since v5). Test rows are excluded. The 6 bookkeeping rows you or Claude added by hand are excluded too.

| | 4 days before | Since v5 |
|---|---|---|
| Inbound replies handled | 45 | 137 |
| Replies we sent (rows) | 20 (about 15 people, some rows duplicated) | 22 (15 people) |
| Extra replies Claude sent by hand to fix sorter misses | 0 | 3 |
| Held for you | 0 | 1 (BrainVex loop) |
| Skipped: automated | 12 | 52 |
| Skipped: not interested | 5 | 36 |
| Skipped: no reply needed | 1 | 8 |
| Unsubscribed | 5 | 17 |
| Stuck "working" rows | 2 | 1 |
| Send failed / drafted not sent | 0 | 0 |
| Follow-ups sent (estimate) | about 20, to about 19 people | about 44, to 32 people |

Inbound volume tripled because more cold email went out, but the number of people we actually talked with stayed at about 15. Most of the growth is auto-replies, no's and unsubscribes. The follow-up counts are estimates: the table keeps only a running count per thread, so I matched it against SalesBlink send times.

## Every message sent since v5, judged

**Replies (written by v5)**

| Prospect | Verdict | Why |
|---|---|---|
| Ryan Willoughby: talk about wife's business | Good | Warm, gives phone and link, one reason-given question |
| Shaun (Via Fidelis): Monday or Friday | Good | Confirms days, promises audit, one focused question |
| Ryan: what Middleware does | Good | Plays it back well, promises the audit with her price |
| Arihant: pay on results only | Good | Declines per lead, points to the guarantee |
| Arihant: still wants per lead | Wrong | Says "yes, we can work that way", pay per qualified lead |
| Arihant: either is fine, trial | Wrong | Invented $15 / $35 pricing, no monthly fee, lead cap |
| Arihant: what do CPAs want, call? | Weak | Answers well and offers a call, but keeps the per-lead trial alive |
| Alex: active contract | Weak | One soft offer is fine; the follow-up after it was too much |
| Kitchen Wrap: "only match installers" | Good | Clears up the confusion, one question |
| Sandline: "Yes, all possible" | Good | Smart focus question with a reason |
| Jace: second no | Good | Graceful close |
| Chris: guarantee and price range | Wrong | "2 month money back promise", should be 90 days. Price handling was right |
| Chris: lists services | Good | Confirms focus, price comes with the audit, optional call |
| Ryan (Men Zone): wrong person | Weak | Pitches a second opinion instead of asking for Hussam's contact; plumbing case study for a barber |
| Alex: "No thank you" | Good | "I won't email you again" |
| Miles: team vote | Good | Price, guarantee, no contract, offers a summary |
| Miles: staff said no | Good | Graceful, audit stays theirs |
| BrainVex: helpdesk echo | Weak | Should have been skipped as automated |
| Bruce: paying members on two sites | Good | Clear playback, "the audit is on its way" |
| Purple Design: "Message" | Good | Polite check, one easy question |
| "What is this, i don't understand?" | Good | Clearest message of the week |
| Barnabas: "I am interested" | Good | Short, one question with a reason |

**Sent by Claude by hand to fix sorter misses**

| Prospect | Verdict | Why |
|---|---|---|
| Miles: Elm Creek was spam | Good | Back to the plan in one line |
| Harvey: already #1 | Weak | Fine on its own, but it set off 2 follow-ups after his second no |
| Ryan: missed call | Good | Easy rebook, the audit is ready |

**Follow-ups since v5**

| Prospect | Verdict | Why |
|---|---|---|
| Barnabas, 1 | Good | Gives an example answer |
| Barnabas, 2 | Weak | Third ask, adds another question; audit is owed |
| Weatherstripping, 2 | Weak | Good first fix, but his cost question is still unanswered |
| Alex, 1 | Wrong | Chased a no; he said no again |
| Kitchen Wrap, 1 and 2 | Weak | Fine words, but 2 in 24 hours to what was probably a canned reply |
| Sandline, 1 | Weak | Sent 4 hours after our question |
| Sandline, 2 | Weak | Good content, but one day after a 24-page audit |
| Men Zone, 1 and 2 | Wrong | Wrong person, 3 emails in 24 hours, never asks for Hussam |
| Harvey, 1 and 2 | Wrong | Sent after his second no |
| Purple Design, 1 | Good | Easy default offer |
| "What is this", 1 | Weak | Fine words, but sent about 4.5 hours later |
| Miles, 1 | Good | One first fix, one question |
| Eric (happy with agency), 1 | Weak | Chasing someone who is happy with his agency |
| Segway, 1 | Good | Specific first fix |
| Maven Peak, 1 | Good | Specific first fix |
| Maven Peak, 2 | Good | Growth, 90 days, no contract, small next step |
| The Acct Tax Co, 4 | Good | How it runs, simple next step |
| Dracu Herbs, 4 | Good | Growth price, no contract, next step |
| CQB Training, 4 | Good | Honest 3 to 6 months, 90-day guarantee |
| Appliance Repair Springdale, 3 | Wrong | Audit owed for a week; guessed "$52,000 a year" |
| Growth Fairness, 3 | Wrong | Review owed for a week; 4th time asking about patients |
| Saskia Cleaning, 3 | Weak | Guessed "$4,550 a year"; the ask is fine |
| T Clark Tyres, 1 and 2 | Weak | Repeats the area question; plumbing case study again |
| Bostjan, 1 | Good | Offers to call him |
| Older threads (septic, Charese, Acomara, Rijschool, Square Repair, LR Service Tech, Allcare, Precision, Darshnaa, DC Therapy, FHD) | Weak | Same "rough figure" or "last email for a while" template; the breakup emails are good, the guessed maths is samey |

# Cold email review: replies, follow-ups and numbers (14 Oct 2026)

Written from a cloud session with read-only access to SalesBlink. n8n could not be reached
from here, so the n8n reply log, the workflows and their prompts were **not** checked. Anything
that needs n8n is marked **[needs n8n]**.

Sources:
- SalesBlink analytics, sequences, reply events and the 41 open inbox threads (all read in full).
- The last two "N8n" Claude chats (13–14 Oct).

What I could not see:
- About 115 of the 154 replies this campaign got are in **archived** SalesBlink threads. The
  API returns only the fact that they replied, not what they wrote. Checking "replies the filter
  wrongly skipped" therefore needs the n8n log on the Mac **[needs n8n]**.

---

## 1. Urgent before tonight's 7:30pm IST follow-up run

The two follow-ups that failed in the SalesBlink outage (13 Oct) are due again tonight. **Both
are wrong for where those conversations are now:**

| Who | Queued follow-up | Why it's wrong |
|---|---|---|
| allcarehomes@gmail.com (Richard) | "the audit also shows the searches where you are close to the top of google…" | He already got the audit (12 Oct) and replied "go". He's waiting for a real next step from you, not another pitch. |
| jtornese@jftgroup.org (John) | "if talking is easier than email, john, we could go through it together on a short call" | It pushes a call, which you don't want. He also said "Ok thats fine" on 5 Oct and never got an audit. |

**Action:** stop both, then reply to each by hand (see section 6).

---

## 2. Numbers (SalesBlink, last 30 days: 14 Sep – 14 Oct)

| Period | Sent | Replies | Reply rate | Bounces | Unsubscribes | Unsub rate |
|---|---:|---:|---:|---:|---:|---:|
| 14–20 Sep | 5,641 | 43 | 0.76% | 24 | 57 | 1.0% |
| 21–27 Sep | 5,087 | 47 | 0.92% | 16 | 32 | 0.6% |
| 28 Sep – 4 Oct | 2,549 | 17 | 0.67% | 45 | 57 | 2.2% |
| 5–11 Oct | 12,917 | 114 | 0.88% | 44 | 102 | 0.8% |
| 12–14 Oct (3 days) | 4,104 | 40 | 0.97% | 59 | 240 | **5.8%** |
| **30 days** | **30,298** | **261** | **0.86%** | **188 (0.6%)** | **488 (1.6%)** | |

Opens and clicks are not tracked (0 everywhere), so reply rate is the only engagement number.

**Current campaign (3 live sequences, since ~5 Oct):**

| Sequence | Leads | Sent | Replies | Reply rate | Bounced | Send errors |
|---|---:|---:|---:|---:|---:|---:|
| Scraped, USA–Canada (Tue/Thu/Sat) | 2,357 | 4,256 | 27 | 0.63% | 28 | 45 |
| Scraped, Aus–UK–NZ–Sing (Tue/Thu/Sat) | 2,228 | 4,550 | 52 | **1.14%** | 25 | 24 |
| AI-written, USA (Mon/Wed/Fri) | 3,696 | 8,212 | 75 | 0.91% | 49 | 78 |
| **Total** | 8,281 | 17,018 | 154 | 0.90% | 102 | 147 |

**Which email got the replies (my count of all 154 reply events):**

| Step | Replies | Share |
|---|---:|---:|
| AI-written first email | 46 | 30% |
| Scraped first emails (Initial 1–10) | 43 | 28% |
| 1st follow-up (28 of 29 were variant b) | 29 | 19% |
| 2nd follow-up (34 of 36 were variant b, "Should I cross you off my list?") | 36 | 23% |

Half of all replies come from the follow-ups, so the follow-ups are worth keeping. SalesBlink
moves sends towards the variant that is winning, so the (b) variants got most of the traffic.
That means the reply counts **can't** fairly say whether (b) beats (a).

**Quality of replies (my reading of the open threads only, so a minimum):**
- About **14 people said yes** or asked for the audit: weatherstrippingpros, cleaningsaskia,
  allcarehomes, elkangroup98, squarerepairservices (Dayne), dracuherbs, cqb-training,
  bushtroopsafaris, theacctaxco, fellinlovewithslovenia, precisiondrivingschooluk,
  darshnaahomtech, jftgroup (John), acomara (Fernando).
- **3 asked price or proof:** ttonya5, lushdentalstudio, controlaltdeleteonline.
- **2 were not a fit** and were correctly turned down: crypto recovery and a GBL chemicals seller.
- **9 audits were actually delivered**, all hand-made by you: septic.ca, allcarehomes, Dayne,
  dracuherbs, cqb-training, bushtroop, acomara, theacctaxco, fellinlovewithslovenia.
- **1 call was booked** (acomara). He didn't show up.
- The automated / not-interested / unsubscribe split is in the n8n log **[needs n8n]**.

### Warning signs in the numbers
1. **Unsubscribes jumped to 5.8%** on 12–14 Oct (172 on 12 Oct alone), against under 1% the week
   before. Bounces also tripled (1.4% vs 0.34%). I can't see the cause from here. One likely
   contributor is in point 2. If this carries on, it will hurt your sender domains.
2. **The same people are being emailed again by new sequences.** Two examples:
   - jeff@mobileglassllc.com got 3 emails from "AI Written Email USA" in September, then 3 more
     from the new AI sequence in October.
   - camillechapline@gmail.com said "I don't need your help" on 29 Sep and is waiting for a
     February 2027 audit, yet she got a fresh cold email from the USA–Canada sequence on 13 Oct.

   info@rhairandbeauty.com.au, info@designerdeck.com, dates@mightymejdool.com, nova@vefogix.com
   and info@grokglobal.com also appear in both old and new sequences.
3. **147 send errors** across the three live sequences. These are worth opening in SalesBlink to
   see why.

---

## 3. Yesterday's follow-ups (13 Oct, 7:30pm IST run)

- 13 people were due. The checker correctly held 11 (nothing useful to say, or not appropriate).
- The 2 it tried to send (jtornese #4 and allcarehomes #1) **both failed**: SalesBlink returned
  "502 Bad Gateway" and "connection closed" during its outage.
- The fix made on 13 Oct means a failed send is no longer logged as sent, so both are due again
  tonight. That is why section 1 matters.
- Earlier runs (10, 11 and 12 Oct) all show "success" in n8n.

---

## 4. Problems I found, with evidence

### A. The meeting link is pushed without being asked for (fix: remove it)
The reply agent's "yes" answer is almost always:
> "great, i will start on the audit and send it over when it is ready. if you want to go through
> it together, you can grab a time here: https://cal.id/mavixmarketing/strategy-call"

It went to septic.ca (twice, including today when he only asked "is it CAD?"),
weatherstrippingpros (today), collado (who never asked for an audit), homeofchemicals,
charesemb, dracuherbs, cqb-training, acomara, theacctaxco, bushtroop and camillechapline.

Other places that push a call:
- Follow-up #4: "if talking is easier than email… short call".
- The bushtroop chaser: "hop on a quick call to go over the math".
- The AI-written first email itself ends "Would you be open to a short chat?" / "Would a short
  chat make sense?".

**Rule to add:** never include the booking link or suggest a call unless the prospect asks to
talk or asks for a time.

### B. People who say "yes" get questions instead of an audit (biggest money leak)
When someone says yes, the agent asks "which services, which area, what is your website?". It
asks this even when the answer is already in our own cold email or is just their domain. Then
the follow-up system asks them again whether they want the audit ("shall I send it?", "reply
go"), even though they already said yes.

| Who | What they said | What happened |
|---|---|---|
| precisiondrivingschooluk | "Yes, please check and audit our site and send me the report. Your plan and Strategies." (7 Oct) | Asked for their website, then "shall I send it?", then "reply go", then a case study. **No audit, 7 days later.** |
| darshnaahomtech | "yes" (6 Oct) | Asked for website, then "once I have your website", then "no need to send me anything, reply go" (contradicts the line before), then a case study. **No audit.** |
| jtornese | "Ok thats fine" (5 Oct) | Asked which services (accounting/bookkeeping was in our own email), then 3 nudges, then a call push. **No audit.** |
| charesemb (719 Cleaning) | "yes please" + listed services (29 Sep) | "will start on the audit" + call link on 30 Sep. **Nothing since.** |
| dracuherbs | "Yes", then "Send it" | Asked twice, then a follow-up asked "shall I send it?" again before the audit went out. |
| allcarehomes, Dayne | Said yes, and the audit was sent by you | **A follow-up the same day said "I can go ahead and put the audit together, reply go"**, after the audit had already gone. |

**Fixes:**
1. On "yes": thank them in one line, ask **at most one** question and only if the answer can't
   be found on their website, and promise a date. Flag you at once: "AUDIT OWED: <name>, <site>,
   promised by <date>".
2. The follow-up system must know the state of each person: *said yes / audit owed*, *audit
   sent*, *call booked*. In those states it must **never** send the generic "want the audit?
   reply go" emails. It should flag you instead (audit owed) or send one short audit check-in
   (audit sent).

### C. "We already have someone" gets pushed anyway
admin@powerbandelectrical.com.au said "We have already engaged someone to assist us with our
SEO". The agent still offered the free audit, and she had to say no a second time. The same
thing happened with trotsuk00 ("If I will need help in the future I will reach out") and
fhdtactics.

**Rule:** on "we have someone / I'll reach out if needed", send a short polite close with no
pitch, no case study and no "want it?". Then put them on a 90-day "check back" date.

### D. Specific claims that must be true
These went out in the 12 Oct "did you see the audit?" chasers. They look manual, sent with a
Europe/London timezone. Please confirm each is accurate:
- dracuherbs: "a construction management firm **right there in Dublin**".
- cqb-training: "a martial arts academy in Boise… signups **skyrocketed**".
- bushtroop: "lock in that **15 USD** cost per qualified lead".
- septic.ca today: "it is $349 a month in **US dollars, not Canadian**". Make sure this is the
  answer you want Chad to have.

### E. Small things
- franks: the agent said "I will use marketing@franksbasements.com from now on". Nothing makes
  that happen unless someone adds the new address.
- scott@lrservicetechltd.co.uk said "difficult as we are pounds not dollars". The agent replied
  with a joke ("zero dollars is zero pounds"). He may have meant the price in GBP.
- elkangroup98 said "we only deal through Upwork". The agent ignored it. Only you can answer
  whether you work through Upwork.

---

## 5. Archived chats and follow-ups 2 months later [needs n8n to confirm]

What I could confirm:
- SalesBlink's inbox API **does not return archived threads**. I searched for an archived
  replier and got nothing back.
- The follow-up workflow has a step called **"Skip Archived"**. Its name says archived chats are
  deliberately left out of follow-ups.
- Reply *events* (someone writing back) still appear for archived people. So if an archived
  person writes again, the agent should see it. Whether it can then read the old thread is
  unknown.

What I could **not** find: any "follow up on a date" feature. Camille Chapline explicitly asked:
"When you run it in February 2027 please remind me of your prior email communication on Oct 5."
**As far as I can see, nothing in the system will make that happen.**

**Recommendation:** add a `follow_up_on` date column to the n8n log. Any thread with a date
there is followed up on that date, even if archived (look the thread up by message ID, which
still works for archived threads). Then load Camille (1 Feb 2027) and every
"already have someone" contact (+90 days).

---

## 6. People who need you personally (not the bot)

| Priority | Who | Status | Next step |
|---|---|---|---|
| 1 | theacctaxco (Munir, Kitchener bookkeeping) | Asked for proposal, targets and price. You sent audit + proposal 11 Oct. Silent. | Personal 2-line check-in. |
| 1 | bushtroopsafaris (Jacqueline) | "Waiting to hear the way forward and we start working together." Strategy sent 9 Oct. Silent. | Personal check-in. Confirm the $15 CPL figure first. |
| 1 | septic.ca (Chad) | Most engaged lead. Wants map pack for routine pumping, said $349 is reasonable if all-in. Asked CAD vs USD today. | Personal reply from you. |
| 1 | allcarehomes (Richard) | Audit sent, said "go" to starting. | Stop tonight's follow-up. Reply with the actual start steps. |
| 2 | Dayne (Square Repair) | Audit sent 11 Oct, then a contradictory "reply go" email. | Short personal note about the audit. |
| 2 | acomara (Fernando) | Booked a call, didn't show (9 Oct). | One friendly reschedule note. |
| 2 | cqb-training, dracuherbs, fellinlovewithslovenia | Audits sent 9–11 Oct. | One personal check-in each. |
| 2 | **Audits owed:** precisiondrivingschooluk, darshnaahomtech, jtornese, charesemb, weatherstrippingpros | Said yes, never got the audit. | Make and send the audits. |
| 3 | cleaningsaskia | Gave phone number. | Call 860 694 8118 (flagged yesterday). |
| 3 | homeofchemicals | Turned down for GBL, now asks about an e-bike site in Germany. Agent already said yes + $349. | Your decision. |
| 3 | elkangroup98 | Upwork question. | Your decision. |
| 3 | camillechapline | February 2027 reminder. Got a new cold email on 13 Oct. | Remove from the current sequence. Set the Feb date. |
| 3 | franks | New address marketing@franksbasements.com. | Add it if you want to continue. |

---

## 7. What to build next [needs n8n]: specification

### 7.1 Morning report (Slack, every day around 9am IST)
One message with three columns: **yesterday / last 7 days / month to date**.
- Emails sent, bounces, unsubscribes (SalesBlink analytics API).
- Replies received, split into: interested, questions, not interested, automated (out of
  office, delivery delay), unsubscribe requests, errors / held for you (n8n log statuses).
- Agent replies sent, follow-ups sent, sends that failed.
- **Open flags** (see 7.2) and **audits owed** with how many days late.

### 7.2 Audit reminder: once, the next day, inside the morning report
- When the agent sends a reply with a flag that mentions an audit, write `flag_date` to the log.
- The next morning report lists it under "Reminder: audits/flags from yesterday" and sets
  `reminded = yes`, so it never repeats.
- This keeps it to one Slack message a day instead of extra pings.

### 7.3 Reply agent prompt changes
1. Never include the cal.id link or offer a call unless the prospect asks to talk.
2. On "yes": no questions you can answer from their website. One line plus a date. Flag
   "AUDIT OWED".
3. On "we have someone / I'll reach out": polite close, no pitch. Set follow_up_on +90 days.
4. On "remind me in <month>": set follow_up_on to that date and confirm in one line.
5. Never promise an action the system can't do (e.g. "I'll use your new email") without
   flagging you.

### 7.4 Follow-up workflow changes
1. Read the person's state first. If "audit owed", "audit sent" or "call booked", **don't send
   the generic nudges**. Flag you instead, or send one audit check-in.
2. Never suggest a call in any follow-up.
3. Add date-based follow-ups (`follow_up_on`), including for archived threads.

### 7.5 List hygiene (SalesBlink)
1. Before adding leads to a new sequence, remove anyone who has replied, is in a live
   conversation, unsubscribed or said no in any earlier sequence.
2. Look into the 12–14 Oct unsubscribe and bounce spike, and the 147 send errors.

---

## Update, 14 Oct (before the 7:30pm IST run): changes made after Farhan's corrections

All three workflows were tested in test mode (nothing sent) and then published.

**Follow-ups (💬 SEO Follow-ups)**
- Every follow-up from 1 to 5 now has three parts: the case study closest to their kind of business (from mavixmarketing.com/case-studies, nearest one if none matches), one line about more enquiries, calls or bookings for their kind of business, and a low-friction ending (free, nothing to prepare, no call needed, a few words is enough).
- Follow-ups know where the person is: A) not said yes yet, B) said yes but has not answered the two questions (asks them again, simpler, never "reply go"), C) Farhan sent something by hand (asks about it, never offers the audit again).
- When Farhan sends an audit or case studies by hand, the follow-up about it now goes out on the next day's run, even if the normal timetable would wait longer. The hand-sent email is also kept in the log history.
- Never a call or booking link in a follow-up. Up to 60 words, at most 2 links, all links checked against the case study list.

**Reply agent (💬 SEO Reply Agent)**
- A "yes" with no details gets two very simple questions: which services, which area. A few words is enough.
- Once they answer: "great, i will start preparing your audit and send it over when it is ready", then the booking link offered only as an option, with "it is not a pitch. i just want to understand your business, what you need and where you stand, so i can see how we can help." This is the only time the link goes out unasked.
- The full case study list from the website replaces the old three examples.

**Morning report (☀️)**
- "Emails still not answered" now lists each one once, on the morning after it came in.
- On the 1st of each month: last month in full (sent, reply rate, bounce rate, unsubscribe rate, replies by kind) next to published cold email standards: reply rate about 1.4% to 9% (Woodpecker average 3.43%), bounces under 2% (over 3% is a risk), no reliable public standard for unsubscribes.
- September 2026 for reference: 21,655 sent, 1.06% reply rate (below the usual range), 0.64% bounces (healthy), 0.68% unsubscribes.

**People**
- Richard (allcarehomes) and Chad (septic.ca) are back on automatic, with their history showing the audit and roadmap were already sent.
- John (jftgroup) stays on automatic.

**Client count**
- The reply agent says "running since 2019, 500+ clients served". Farhan confirmed 500+ is correct.

---

## Update 2, 14 Oct (afternoon): Farhan's second round of changes

**Follow-ups now go out at each person's own time**
- The follow-up workflow runs every hour instead of once a day at 7:30pm IST.
- Each person gets their follow-up in the hour of the day they usually reply to us. It uses the real reply times from SalesBlink, covering replies back to 29 July.
- If we have no reply time for someone, it uses the busiest reply hour for their list (UK, USA, Canada, Australia).
- People on the mixed "Aus, UK, NZ, Singapore" list count as UK if they reply during the UK working day, and as Australia or NZ if not.
- Nothing goes out on the person's local Sunday.
- Example from 15 Oct: Scott (UK) at 12:30pm IST, Bushtroop (Kenya) at 9:30am IST, Charese (Colorado) at 2:30am IST (her afternoon).

**Writing: what owners care about**
- Replies and follow-ups no longer stop at "show up on google" or clicks. They always say what it means for the owner: more calls, enquiries, appointments, bookings and customers.
- A yes or any interest gets the 2 simple questions, after answering anything they asked.
- The "start preparing your audit" email is now written to fit what they said, not as fixed text. It still offers the meeting link only as an option and says it is not a pitch.

**Audits Farhan already sent**
- These 7 people had been stuck as "waiting on us", so they got no follow-ups: 719 Cleaning (Charese), Bushtroop, Acomara, Dracuherbs, theacctaxco, CQB Training and fellinlovewithslovenia.
- Each is now marked as having received the audit. Their follow-ups ask about it, starting from 15 Oct.

**Proposal skills**
- Farhan agreed to use the real website case studies in proposal PDFs, instead of invented client names.
- The SEO proposal's 3 Search Console screenshots match the website's construction firm (9.94K clicks), HR software (326K) and home goods store (470K) case studies.

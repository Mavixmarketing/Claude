# Email Verification Tool — My Full Plan (Simple Version)

**For:** Mavix Marketing
**Date:** 31 July 2026
**Status:** Nothing built yet. This is the research to do before spending money.

---

# PART 1 — THE IDEA

## What I want to build

A tool that checks if email addresses are real or dead, so people don't waste money sending emails that bounce.

## Why I want to build it

I already pay for one (Reoon / "Ninja"). It is very cheap — 15,000 emails a day for about $9–14 a week. Nobody else is that cheap.

But it keeps telling me bad emails are good. Then I send to them and they bounce.

So I wanted to know: can I build a better one?

## The answer

**Yes — but not the way most people would try.**

**The wrong way:** "I will make a cheaper and more accurate tool than the big companies."
You lose that fight. They are bigger, older, and already cheaper than you can be.

**The right way:** "I will be the **honest** one, and I will give away free tools that bring people to my website."

---

# PART 2 — THE BIG SECRET I FOUND

Every email checking company says they are 98% or 99% accurate.

Someone tested 15 of these companies properly, using 3,000 real emails.

**The best one was only 70% accurate.**
Most were 60–68%.
The worst was 31%.

**They are all stretching the truth.**

So when your "verified" emails still bounce — that is not bad luck. That is every tool on the market.

**Nobody is being honest. That is your opening.**

---

# PART 3 — WHY ARE THEY ALL SO BAD?

This part matters. Read it twice.

## How email checking works

The tool phones up the other company's mail server and asks:

*"Do you have a mailbox for john@company.com?"*

Sometimes the server says yes. Sometimes no. Simple enough.

## Problem 1 — "Catch-all" companies

Many companies set their mail server to say **yes to every single address**, real or fake.

Ask about `john@company.com` → yes.
Ask about `qwerty99xyz@company.com` → also yes.

So the tool learns nothing. It genuinely cannot tell.

**About 20 to 40 out of every 100 business emails are like this.**

Now here is the dirty trick: cheap tools mark these as **"valid"** anyway, because it makes their accuracy numbers look good.

**This is almost certainly what is happening to you right now.**

## Problem 2 — The big companies stopped answering

Gmail and Microsoft host most business email. Both of them now mostly refuse to answer these questions, or just say "yes" to everything.

## What this means

**Nobody can fix this.** Not you, not ZeroBounce, not anybody. It is a wall in the technology itself.

So stop trying to be "the most accurate". Instead, be **the most honest**.

---

# PART 4 — WHAT I ACTUALLY SELL

Three things. All three are things no competitor does.

## Thing 1 — Check each email 2 or 3 times

Different checking companies make different mistakes.

So if you ask two or three of them, and they all say "this email is good", you can be much more sure it really is good.

**Smart people already do this by hand.** They pay for three separate tools and compare the answers themselves. It is slow and it costs three times as much.

**You just do it for them, automatically.** That is your product.

You only do this for the *risky* emails. About 60–70% of any list can be sorted out for free with simple checks. You only pay double or triple on the hard ones. So your costs stay reasonable.

## Thing 2 — Tell people the truth

Instead of one word ("valid"), you show:

- A score out of 100 — how sure you are
- The reason why — what you found and what you couldn't find
- What you recommend — safe to send / be careful / don't send

Every competitor gives a one-word answer and hides the doubt.

## Thing 3 — Give money back when you are wrong

If you say an email is good and it bounces, you refund their credits.

**Zero competitors do this. Not one.**

It costs you very little and it makes people trust you immediately.

---

# PART 5 — HOW TO BUILD IT WHEN YOU ARE NOT A CODER

## The good news

**About 70% of an email checking tool is completely free to build.**

Free stuff (no API needed, no cost ever):
- Checking the spelling is correct
- Checking the company's website exists
- Checking if it's a fake temporary email
- Checking if it's `info@` or `sales@` type address
- Checking if it's Gmail/Yahoo vs a company address
- Removing duplicates
- The spam checker
- The email templates
- All the DNS tools

**Only ONE part costs money:** actually asking the mail server if the mailbox exists.

## The three ways to build it

| | **Way A — Rent it** ✅ | **Way B — Half and half** | **Way C — Build it all** |
|---|---|---|---|
| **What** | You pay other companies per email checked | You do the easy ones yourself, pay for the hard ones | You build your own mail servers |
| **Time to launch** | 6–10 weeks | 4–6 months | 12+ months |
| **Money to start** | **$50–150** | $300–600 | $5,000+ |
| **Monthly cost** | $20–60 | $80–250 | $500–2,000 |
| **Profit margin** | 30–70% | **70–88%** | 95% |
| **Skill needed** | Low | Medium | High |

## The plan

**Start with Way A. Move to Way B around month 6–9. Only think about Way C in year 2.**

**Do NOT start with Way C.** This is the mistake that kills the whole project. It needs:
- Special internet permission called "port 25" (Amazon, Google, Microsoft and DigitalOcean all block it — Hetzner allows it)
- Clean server addresses with good reputation, built up over weeks
- Different tricks for Gmail vs Microsoft vs everyone else
- Years of accumulated know-how

**Way A is not a compromise.** Your special sauce (checking twice, being honest, refunding mistakes) doesn't need your own servers anyway. It needs good thinking, which is free.

## Important warning about free code

Some free open-source email checkers exist. Be careful:

- **Reacher / check-if-email-exists** — uses a licence called AGPL. **Do not use this in a paid product** unless you buy their commercial licence. It can legally force you to give away your own code. This is a real problem, not a technicality.
- **Truemail** (Ruby) and **AfterShip email-verifier** (Go) — these are safe to use commercially.

**Rule: always check the licence before using free code.** MIT and Apache are safe. AGPL is dangerous for a paid service.

---

# PART 6 — WHAT IT COSTS ME

## To start

| Thing | Cost |
|---|---|
| Domain name | $12 |
| Website hosting | $0 (free tier) |
| Database | $0 (free tier) |
| **Pay someone to check my code is safe** | **$300–800 — do not skip** |
| First batch of checking credits | $50–200 |
| Legal documents | $0–500 (templates are free) |
| **Total minimum** | **about $400** |
| **Total comfortable** | **about $1,200** |

## Every month

| Stage | Cost |
|---|---|
| While building (no customers) | **$40–120** |
| Launched, 0–50 customers | **$80–200** |
| Growing, 50–300 customers | **$170–340** |

**Your fixed costs are tiny.** This business does not die from monthly costs. It dies from not getting customers, or from bad-value customers.

## When do I break even?

**7 to 11 paying customers.** That is it.

## What does the free plan cost me?

You were worried about this. Here is the real answer.

If you give 100 free checks per day:

| Free users | Worst case | Realistic |
|---|---|---|
| 10 | $15/mo | **$1.50–2/mo** |
| 20 | $30/mo | **$3–5/mo** |
| 50 | $75/mo | **$8–12/mo** |
| 200 | $300/mo | **$30–45/mo** |

Realistic is much lower because most people sign up, try it once, and never come back.

**10–20 free users cost you $2–5 a month. Do not worry about it. Run the free plan.**

**But put these guards in from day one:**
- Hard daily limit enforced on the server (not just hidden in the screen)
- **No big file uploads on the free plan** — that's the thing people pay for
- Block temporary/fake email addresses at signup (you're a verification company, you already have the list)
- Make people confirm their email before they get any free credits

---

# PART 7 — WHAT TO CHARGE

You asked: $0, $5, $10, $20, or per email?

**Answer: all of them at once.** Different people buy in different ways.

## Never charge per user

Your cost goes up with **emails checked**, not with how many people are logged in. So charge for emails. Charging per user also punishes agencies, who are your best customers.

## The four price types

### 1. Free — brings people in
```
$0
- 100 checks per day
- Single email checker + API
- All the free tools (spam checker, DNS tools, templates)
- No credit card needed
- NO bulk file upload
```

### 2. Credit packs — for people who buy once and disappear

**These must never expire.** This is important — competitors do this and it traps their customers. You must match it.

| Pack | Price | Emails | Per email |
|---|---|---|---|
| Starter | $9 | 5,000 | $0.0018 |
| Growth | $29 | 25,000 | $0.00116 |
| Pro | $79 | 100,000 | $0.00079 |
| Scale | $249 | 500,000 | $0.0005 |
| Bulk | $449 | 1,000,000 | $0.00045 |

Also say loudly: **duplicates are free, and "unknown" results are free.** These cost you almost nothing and they build trust.

### 3. Monthly plans — this is your real income

| Plan | Price | Per day | Per month |
|---|---|---|---|
| Lite | **$19** | 1,000 | 30,000 |
| Standard | **$49** | 5,000 | 150,000 |
| Pro | **$99** | 15,000 | 450,000 |
| Agency | **$199** | 50,000 | 1,500,000 |

Yearly plan: pay for 10 months, get 12. Good for your cash flow, and people stay longer.

Notice the $99 plan matches the volume you use now — but at a price that actually works.

### 4. Add-ons — your best profit

| Add-on | Price |
|---|---|
| **Deep Check** (for catch-all addresses) | $0.01–0.02 each |
| **Guarantee** (checked 3 times + refund if wrong) | +40% on any plan |
| **Deliverability audit** (you do it by hand) | $149 one-off |

---

# PART 8 — WHY YOUR CURRENT TOOL IS SO CHEAP

This is the most useful thing I worked out. It explains everything.

You pay about $9–14 a week for 15,000 emails a day.

That's around $36–56 a month for a possible **450,000 emails a month**.

That works out to about **$0.0001 per email** — which is cheaper than what it costs *them* to buy. It looks impossible.

**Here's the trick: unused credits disappear at midnight.**

If you don't use your 15,000 today, they're gone. You can't save them up.

So most people use their tool hard for 2 or 3 days a month, and nothing the rest of the time. **Typical use is only 10–25% of what you paid for.**

## What this means for a $99 plan (15,000/day)

| Type of customer | What they really use | What it costs you | Your profit |
|---|---|---|---|
| Normal (15%) | 67,500 | $34 | **66%** ✅ |
| Light (5%) | 22,500 | $11 | **89%** ✅ |
| Heavy (40%) | 180,000 | $90 | **9%** ⚠️ |
| Maxed out (100%) | 450,000 | $225 | **You lose $126** ❌ |

**Two lessons:**

1. Daily limits let you advertise big impressive numbers cheaply, because most people won't use them. This is normal and legitimate.
2. **You will lose money on heavy users** unless you protect yourself.

**Put this in your terms from day one:**

> "Daily limits are maximums, not guarantees. If you regularly use more than 60% of your daily allowance across a month, we may slow you down or ask you to move to a bigger plan. We will always contact you first."

---

# PART 9 — THE EXTRA FEATURES YOU WANTED

You mentioned a spam checker, email templates, and comparing other tools. **All good ideas. Build them all.** They're free to build and they bring free traffic from Google.

## The spam / template checker

Person pastes their email → gets a score and advice.

**But one correction to your idea.** You said it should find spam words. It should — but **that is the least important part.**

**What actually decides if email goes to spam:**

| How much it matters | What to check |
|---|---|
| **Most important** | Email settings called SPF, DKIM, DMARC — are they set up correctly? |
| **Most important** | Is their domain on a blacklist? |
| **High** | How many links? Is it mostly images? Any attachments? |
| **Medium** | SpamAssassin score (free software you can install) |
| **Medium** | ALL CAPS, too many !!!, very short or very long |
| **Least important** | Spam words like "free" and "guaranteed" |

The truth is: a warmed-up inbox with good reputation delivers emails full of "spam words" straight to the inbox. A cold new inbox goes to spam even with perfect writing.

**Every other spam checker tells you "delete the word FREE" and ignores the real problem.**

**Yours should say:** *"Your emails go to spam because your DMARC record is missing — not because you wrote 'free'."*

That alone makes your tool better than all of them.

## The template library

Your idea: cold email templates for different industries. **Good idea — mainly because of Google traffic.**

12 industries × 8 types of email = **96 pages**.

Like: *"cold email template for home service businesses"*, *"follow-up email template for SaaS companies"*.

**Clever bit:** show a spam score on every single template page. So every template page advertises your spam checker.

## The comparison / affiliate pages

Comparing cold email tools with your affiliate links. Good, with three warnings:

1. **You must disclose the affiliate links.** Legally required in the US and UK.
2. **Don't rank yourself #1 in your own comparisons.** Your honesty is your whole brand. Don't burn it for a few dollars.
3. **The commission is not the point.** Affiliate money will be $50–500/month for a long time. The real value is Google traffic and looking like the neutral expert.

## Other free tools to build (all easy, all free)

- SPF checker
- DKIM checker
- DMARC checker
- Blacklist checker
- MX lookup
- Spam words database page
- Bounce rate calculator

Each one gets its own page and its own Google keyword.

## Things NOT to build

| Idea | Why not |
|---|---|
| Email finder | Needs expensive data you'd have to buy |
| A full email sending platform | Different business, brutal competition, huge spam risk |
| Lead database | Legal minefield |
| Mobile app | Nobody cleans email lists on a phone |
| Email warm-up | Crowded, lots of daily work |

---

# PART 10 — HOW TO GET CUSTOMERS

## Best thing you can do (and it's nearly free)

**Do your own accuracy test and publish it.**

1. Make a list of 500 emails where **you already know the true answer** (your own inboxes, addresses you know are dead, catch-all domains, etc.)
2. Run it through 8–12 tools, including yours
3. Write down who got it right and who got it wrong
4. Publish everything — including where **your** tool lost
5. Post it on Reddit (r/coldemail) as a free gift, not as an advert

**Why this works so well:**
- It's the exact thing that community argues about constantly
- Being honest about your own losses buys more trust than any claim
- Google loves it — other sites will link to it
- It also tells you which companies to buy your wholesale credits from
- It's also your product testing

**One piece of work. Five benefits.** Hunter did exactly this and got huge authority from it.

## The ranking of channels

| Channel | Cost | How fast | Good for you? |
|---|---|---|---|
| **Free tools on your site** | Time only | Slow (4–8 months) | ★★★★★ Best long term |
| **Reddit / Facebook groups** | Time only | **Fast (days)** | ★★★★★ Best for launch |
| **Your accuracy test** | ~$100 | Fast | ★★★★★ Do this first |
| **Comparison articles** | Time only | Medium | ★★★★★ People are ready to buy |
| **Zapier / Make / n8n listings** | Time only | Medium | ★★★★☆ Free distribution |
| **Agency partnerships** | Time | Medium | ★★★★☆ One agency = many users |
| **Your own affiliate program** | 25% commission | Medium | ★★★★☆ Only pay when it works |
| **Google Ads** | Expensive | Instant | ★★☆☆☆ **Not at the start** |
| **Facebook Ads** | Medium | Instant | ★☆☆☆☆ Wrong audience |

## Why Google Ads is the WORST first choice

- These keywords are expensive — big companies bid them up
- You don't know yet if your website converts, so you'd be buying data at the worst price
- A $19–49/month customer is worth maybe $300–800 total, so you can only afford $60–150 to get them — that's about 20–40 clicks
- People arriving from ads don't trust you yet. People arriving from your free tools already do.

**Come back to ads in year two, after you know your numbers.**

## Your budget plans

### $0 a month (months 0–6) — 15–20 hours a week
1. Publish your accuracy test, post it in 5 communities
2. Build 3–5 free tools with their own pages
3. Write 2–3 articles a week
4. Build 30 template pages, grow towards 96
5. Answer questions daily on Reddit — **no links for the first 3 weeks**
6. List on Product Hunt, G2, Capterra, AlternativeTo, SaaSHub
7. Submit Zapier and Make integrations
8. Message 50 agencies offering free list cleaning for feedback

**Expect: 300–800 free signups, 5–20 paying, by month 6**

### $500 a month (months 6–12)
| Spend on | Amount |
|---|---|
| Writer (4 articles/month) | $200 |
| SEO tool | $100 |
| Design | $50 |
| Small newsletter sponsorships | $100 |
| Affiliate commissions | $50 |

**Expect: 2,000–4,000 free signups, 50–100 paying, by month 12**

### $5,000 a month (year 2+, only after it's proven)
| Spend on | Amount |
|---|---|
| Content team | $1,500 |
| Link building / PR | $1,000 |
| Google Ads (only your brand + competitor names + retargeting) | $1,200 |
| Video | $500 |
| Sponsorships | $500 |
| Affiliates | $300 |

## What to say in your marketing

| ❌ Weak | ✅ Strong |
|---|---|
| "99% accurate email verification" | "Your last verified list still bounced. Here's why." |
| "Fast bulk verification" | "We check twice. If a good email bounces, you get your credits back." |
| "Affordable email verification" | "We publish our real accuracy. Nobody else does." |

**Headline:** *"Every email checker claims 99% accuracy. We tested 12 of them. The best got 70%."*

---

# PART 11 — WHY DON'T PEOPLE SWITCH TOOLS?

You asked a very smart question: *if there are 5 competitors and one is cheaper, why do people use all 5 instead of switching?*

## Answer 1 — They don't switch. They use several at once.

Serious cold emailers deliberately run their list through **two or three tools** and only send to addresses all of them approve. They don't trust any single one.

So the 5 competitors aren't fighting for exclusive customers. Each is getting a slice of the same person's workflow.

**This is why your idea works.** You're turning something people already do by hand — badly, at 3× the cost — into one product.

## Answer 2 — The switching cost is trust, not effort.

Moving is technically easy (upload a CSV). But handing your whole customer database to a company you've never heard of is scary. The risk of a bad tool — burned domain, dead campaign — is much worse than saving $20.

**So spend your effort on trust signals, not ads:** the public accuracy test, clear data deletion policy, the refund guarantee, your real name and face.

## Answer 3 — Prepaid credits trap them.

If someone has 80,000 unused credits sitting at MillionVerifier, they're stuck there until those run out.

**Your counter-move:** *"Show us your unused credits at any competitor, we'll match up to 50,000 free."*

This costs you about $25 per person and it removes the single biggest thing keeping them at a competitor. **Best offer available to you.**

## Answer 4 — Integrations decide it.

If someone's setup is Clay → Instantly → their CRM, they use whichever checker is already a built-in step. That's why NeverBounce can charge premium prices.

**So ship Zapier, Make and n8n early.** It puts you inside people's existing setup.

## Answer 5 — Habit.

Nobody reviews their $20/month tool every quarter. **Laziness is your biggest competitor.**

You don't win by being 10% better. You win by being **clearly different** at the exact moment they're annoyed. That moment is: *"my verified list bounced again."* Aim all your content at that moment.

---

# PART 12 — WHO TO TARGET, WHO TO REFUSE

## Best customers

**1. Cold email agencies (2–20 people)** ★★★★★
They check 50,000–500,000 emails a month, every month. A bad list burns their *client's* domain — that's a disaster for them, not just wasted money. They'll pay extra to avoid it. They also talk to each other constantly.

**2. Software companies checking signups** ★★★★★
They plug your API into their signup form. Small volume, but **they never leave.** Once it's built into their product, switching is an engineering job. Lowest churn customer you can get.

**3. Solo founders doing outreach** ★★★★☆
Small money each, but huge in number, and they spread the word.

**4. Ecommerce / newsletter marketers** ★★★★☆
Clean, simple use case. Low support needed.

## People to refuse — this protects your business

| Refuse | Why |
|---|---|
| **Spammers** | They'll get your supplier accounts shut down. **Biggest danger to your business.** |
| **People with bought or scraped lists** | Legal problems, plus they burn your suppliers |
| **Scam / phishing operations** | Legal liability, payment processor will drop you |
| **"Unlimited for $10" hunters** | They want endless volume at a loss and leave a bad review anyway |

## The easy way to spot bad customers

**Normal lists are 5–25% bad emails. Bought or scraped lists are 50–80% bad.**

Just watch that number for each account. If someone uploads a list that's 60% garbage, look into it. This costs you nothing to check and it's your best warning sign.

**Never be scared to refund and ban.** Losing $199 is much better than losing your supplier accounts.

## Best countries

| Country | Priority | Why |
|---|---|---|
| **USA** | ★★★★★ | Pays the most. Write all your content for them. |
| **UK / Canada / Australia** | ★★★★☆ | Same behaviour, less competition |
| **Western Europe** | ★★★☆☆ | Good money but real GDPR rules |
| **India / Pakistan / Philippines** | ★★★★☆ | Huge number of freelancers doing outreach for Western clients. Cheap but high volume, and **very easy for you to reach.** Your natural first community. |

**Practical:** price in dollars for the American buyer, but keep the $9 entry point so a freelancer in Lahore can afford it. That group gives you your first 100 users and your first testimonials — and they talk to each other far more than Americans do.

---

# PART 13 — LOGIN, SECURITY AND LEGAL

## Signup flow

```
1. Email + password, OR "Sign in with Google"
   ↓
2. Block fake/temporary email addresses
   ↓
3. Send confirmation email — must be clicked before free credits
   ↓
4. Record their device and IP (stops people making many accounts)
   ↓
5. Account created with free daily allowance
   ↓
6. Show them a result within 60 seconds
```

**Do not build your own login system.** Use Supabase (or Clerk). Home-made login is the most common and most damaging beginner mistake.

**Do not require a credit card for the free plan.** It kills the whole point of having one. Use daily limits instead.

## API key safety

Your customers get a secret key. If someone steals it, they drain that customer's credits.

| Rule | Why |
|---|---|
| Never store keys as plain text — store a scrambled version | If your database leaks, the keys are useless |
| Show the full key **once**, never again | Standard practice |
| Start keys with a prefix like `evk_live_` | GitHub can then automatically warn you if one leaks |
| Let people delete and recreate keys instantly | Damage control |
| Show when each key was last used, and from where | They can spot theft themselves |
| Never put a key in a web address | Web addresses end up in logs and browser history |

**The #1 mistake AI-written code makes:** putting secret keys into the part of the website the visitor's browser downloads. **If a key is in anything the browser downloads, it is public.**

So: never call another company's API directly from the browser. Always go through your own server.

## Protecting customer data

You'll be holding people's entire lead databases. This is the trust-critical part.

| Do this | Why |
|---|---|
| **Auto-delete uploaded lists after 30 days** | Less to lose if you're hacked. Also a great trust signal — say it on your homepage. |
| Don't store what you don't need | You need the address and the result. Not their names, phone numbers, or notes. |
| Turn on the "users can only see their own rows" setting — **and test it** | Getting this wrong is the most common way these apps leak data |
| Automatic daily backups, and actually test a restore | An untested backup is not a backup |
| Encrypt everything | Free, automatic with the tools recommended |

**Before your first paying customer: pay a freelancer $300–800 to check your code for security holes.**

This matters because studies show most AI-written apps ship with at least one serious security hole. **This is the highest-value money in the whole plan.** Post on Upwork: *"Security review of a Next.js + Supabase app handling customer data, 4–6 hours."*

## Legal papers you need

| Paper | Cost |
|---|---|
| Terms of Service | Free template |
| Privacy Policy | Free template |
| Data Processing Agreement (DPA) | Free template — European business customers will ask for this. Not having one loses deals. |
| Acceptable Use Policy | Write it yourself — this is what lets you ban spammers cleanly |
| List of your suppliers | Write it yourself — legally required and it builds trust |

Start with free templates. Get a lawyer to review them once you're past $1,000/month.

## Payments

**Stripe does not accept businesses based in Pakistan.**

Use a "merchant of record" instead — they handle payments, tax and invoicing for you:

- **Lemon Squeezy** — best for small SaaS (owned by Stripe now)
- **Polar** — cheapest
- **Paddle** — best once you're bigger

They charge around 5% + $0.50 per sale. More than Stripe, but they handle all the global tax paperwork, which is worth it.

**You do not need a US company to start.**

---

# PART 14 — WHAT WILL GO WRONG

## The 10 problems you will actually hit

| When | Problem | What to do |
|---|---|---|
| **Week 1** | No supplier will sell you wholesale credits | **Test this FIRST, before building anything.** If nobody deals, the whole plan changes. |
| **Week 5** | Big file uploads time out and crash | Must run as a background job, not inside the webpage. Get this right from the start. |
| **Week 9** | Your AI-written code has security holes | Pay for the security review |
| **Month 3** | Nobody signs up | Normal. Google takes 4–8 months. Don't panic and change everything. |
| **Month 4** | Free users don't upgrade | Check how fast they get a useful result. Under 60 seconds or fix it. |
| **Month 4+** | A customer's "good" email bounces and they're angry | Your refund guarantee turns this from losing a customer into gaining a loyal one. This is exactly what it's for. |
| **Month 6** | Free users cheating with multiple accounts | Block temp emails, limit by device |
| **Month 6+** | A spammer signs up and burns your supplier | Watch that bad-email-percentage number. Ban without hesitation. |
| **Month 9** | Google still hasn't sent traffic | 4–8 months is normal. Check your pages are indexed before panicking. |
| **Any time** | **You give up** | **This is the most likely way this fails.** |

## What actually kills this business

**1. You stop around month 6–9.** By far the most likely outcome. It feels like failure right at the point it's actually working.
**Fix:** measure your *activity* (articles published, communities joined) for the first 6 months, not your revenue.

**2. You spend a year building before launching.** Perfectionism pretending to be care.
**Fix:** hard 10-week deadline. Launch ugly.

**3. You try to compete on price and get crushed.** Someone already sells at $0.00045.
**Fix:** never compete on price. Compete on being sure and being honest.

**4. Spammers destroy your supplier relationships.**

**5. You build your own mail servers first** and lose 6 months to problems you can't solve yet.

## The honest pros and cons

**✅ Good:**
- Real problem, growing market
- New Gmail/Yahoo/Microsoft rules make this mandatory now, not optional
- Under $400 to start, break even at 7–11 customers
- 70% of the product is free to build
- Real differences available that big companies can't easily copy
- **Marketing is your existing skill — that's the harder half**
- You only need ~300 customers

**❌ Bad:**
- Crowded — 10+ established competitors
- Prices already racing to the bottom
- Accuracy has a hard ceiling you can't fix
- People buy once and disappear
- You depend on suppliers in year one
- You're not technical
- It attracts bad customers by its nature
- Slow — 9–18 months before real money

---

# PART 15 — THE TIMELINE

## This week — NO CODING

| Day | Do this |
|---|---|
| **1** | **Email 5 email-checking companies.** Ask: "Do you sell wholesale credits? Can I resell under my own brand?" **If nobody says yes, stop and rethink.** |
| **2** | Build your list of 500 emails where you know the true answer |
| **3** | Sign up for 8 competitors' free plans. Run your list through all of them. |
| **4** | Compare results. Now you know who's good and who's lying. |
| **5** | Buy a domain. Apply for Paddle / Lemon Squeezy / Polar. |
| **6** | Write your one-sentence pitch. Sketch your homepage. |
| **7** | Answer 3 questions on Reddit. No links, no selling. |

**No code this week, on purpose.** The two things that could kill this project can both be tested before you build anything.

## Weeks 3–12 — Build the first version

| Weeks | Build |
|---|---|
| 3–4 | Website set up, login working, database ready |
| 5–6 | The free checks + connect 2 suppliers + **the "check twice" logic** — test it against your 500 known emails until it beats every single supplier |
| 7–8 | File upload with background processing, credits system, dashboard |
| 9–10 | Payments, free plan with daily limit, API, documentation |
| 11–12 | **Security review**, legal pages, landing page, **20 test users from Reddit** |

## Months 4–6 — Launch

| Month | Do |
|---|---|
| 4 wk1 | **Publish your accuracy test.** Post on Reddit, LinkedIn, Indie Hackers |
| 4 wk2 | Product Hunt launch. Release the free spam checker the same week. |
| 4 wk3 | List on G2, Capterra, AlternativeTo. Submit Zapier + Make. |
| 4 wk4 | Launch the "match your competitor credits" offer. Message 50 agencies. |
| 5–6 | Ship all the free tools. 30 template pages. 2–3 articles a week. Ship the refund guarantee. |

**Target: first paying customer by month 4. Break even by month 6.**

## Months 7–12 — Grow

- Launch Deep Check for catch-all addresses
- **Order your Hetzner server early** — the port 25 permission needs about a month of account history
- Template library up to 96 pages
- Publish your accuracy test again, now with your own data
- Launch your affiliate program
- Move to "half and half" — your costs drop a lot, profit jumps from 45% to 77%

**Target: 25 customers by month 9. 60 customers / $1,600 a month by month 12.**

## When to quit

| Point | Good | Worrying | **Stop or change** |
|---|---|---|---|
| Week 2 | 2+ suppliers will deal | 1 will | **Nobody will → rethink the whole model** |
| Week 6 | Your "check twice" beats every single supplier | Ties with the best | **Adds nothing → your main idea is wrong** |
| Month 6 | 8+ paying | 3–7 paying | 0 paying after launching → your pricing or message is wrong |
| Month 9 | 25+ paying | 10–24 | **Under 10 paying and under $300/month, after doing all the free tools and 30+ articles → change direction or stop** |

**About that month 9 point — be honest with yourself.** If the email checking isn't selling but your **spam checker and free tools have traffic**, that isn't failure. That's the market telling you which product to build instead. Switching to a deliverability toolkit with checking as one feature would be a good outcome, not a defeat.

## Your weekly routine

| Day | Focus |
|---|---|
| Mon–Tue | Build features |
| Wed | Write content |
| Thu | Fix things, answer support |
| Fri | Marketing — Reddit, outreach, partnerships |
| Sat | Content or rest |
| **Sun** | **Rest. Not optional.** Burning out is the #1 killer. |

---

# PART 16 — THE HONEST FINAL ANSWER

**Can you do this?** Yes.

**Will it make you rich fast?** No.

**Realistic:**

| When | Where you'll be |
|---|---|
| Month 6 | A few customers, breaking even |
| Month 12 | ~60 customers, ~$1,600/month |
| Month 24 | ~300 customers, ~$9,000/month |

**300 customers changes your life.** In a market worth over a billion dollars, 300 customers is invisible. It's a reachable number. Write it on your wall.

**Your unfair advantage:** most people who build these tools can code but can't find customers. **You do marketing already. You have the harder half.**

**Your one sentence:**

> *"Every email checker claims 99% accuracy. We tested them — the best got 70%. We check twice, we show you why, and we give your money back when we get it wrong."*

---

# QUICK REFERENCE

| Question | Answer |
|---|---|
| Money to start? | **~$400** |
| Monthly cost? | **$80–200** |
| Break even at? | **7–11 customers** |
| Cost of 10–20 free users? | **$2–5/month** |
| Do I need to buy an API? | **Yes, for one part only.** 70% is free to build. |
| Build my own mail servers? | **Not for the first 6–9 months.** This mistake kills projects. |
| What do I charge? | Free / $9–449 packs / $19–199 monthly / +40% guarantee |
| Best first marketing move? | **Publish your own accuracy test on Reddit** |
| Should I run Google Ads? | **Not in year one** |
| Payments from Pakistan? | **Lemon Squeezy, Polar or Paddle.** Stripe won't work. |
| Biggest danger? | **Giving up around month 6–9** |
| What do I do first? | **Email 5 suppliers about wholesale rates. No coding.** |

---

*The full detailed research — competitor prices, technical details, sources — is in the other files in this folder. Everything here is drawn from research done on 31 July 2026. Prices in this industry change fast, so check them again before you commit money.*

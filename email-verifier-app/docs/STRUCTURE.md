# The Structure, Explained Simply

You are not a coder, so here is what every folder does in plain words.

Think of the app as a **shop**:

- `app/` — the shop floor. What customers see and touch.
- `lib/` — the back room. Where the actual work happens.
- `supabase/` — the filing cabinet. Where everything is stored.
- `docs/` — the instruction manual.

---

## The folders

```
email-verifier-app/
│
├── app/                      THE SHOP FLOOR (what people see)
│   ├── (marketing)/          Your public website - homepage, pricing, blog
│   ├── dashboard/            The logged-in area - upload lists, see results
│   ├── tools/verify/         The FREE single-email checker (no login)
│   └── api/v1/               The API - what customers plug into their software
│       ├── verify/           Check one email          ✅ built
│       ├── bulk/             Upload a whole list      ✅ built
│       ├── jobs/[id]/        "Is my list done yet?"   ⬜ to build
│       └── keys/             Create/delete API keys   ⬜ to build
│
├── lib/                      THE BACK ROOM (the real work)
│   ├── verification/         ⭐ THIS IS YOUR ACTUAL PRODUCT
│   │   ├── types.ts          What an answer looks like       ✅
│   │   ├── router.ts         ⭐ Decides how much to spend    ✅
│   │   ├── consensus.ts      ⭐ The "check twice" logic      ✅
│   │   ├── checks/           The FREE checks (cost nothing)
│   │   │   ├── syntax.ts     Is it spelled like an email?    ✅
│   │   │   ├── dns.ts        Does the company exist?         ✅
│   │   │   ├── disposable.ts Is it a fake temp address?      ✅
│   │   │   └── role.ts       Is it info@ or sales@?          ✅
│   │   └── providers/        The companies we pay            ✅
│   ├── credits/ledger.ts     Customer balances               ✅
│   └── db/                   Talking to the database         ✅
│
├── supabase/migrations/      THE FILING CABINET
│   └── 0001_init.sql         All the tables                  ✅
│
├── .env.example              Where secret keys go
└── docs/                     These notes
```

---

## The two files that ARE the business

Everything else is normal website stuff that any developer or AI can build. **These two are the product:**

### `lib/verification/router.ts` — decides how much money to spend

For every email address it goes in this order:

1. **Free checks first** — spelling, does the company exist, is it a fake temp address, is it `info@`. **These cost nothing** and they settle a big chunk of any real list before we spend a cent.
2. **One paid engine** — if the answer is obvious, stop here.
3. **Ask 2–3 engines** — only for the tricky ones.

**Why this order matters:** about 60–70% of a real list gets settled in steps 1 and 2. We only pay double or triple on the hard 30–40%. That is what keeps our price competitive while being more accurate.

### `lib/verification/consensus.ts` — the "check twice" logic

Takes several companies' opinions and turns them into one honest answer plus a score out of 100.

The important part is what it does when engines **disagree**:

> One engine says the email is good. Another says it's dead.
>
> **Competitors quietly call this "valid"** because it makes their accuracy numbers look better. This is why your current tool puts bad emails in the good pile.
>
> **We call it "unknown" and tell you not to send.**

That single decision is your whole brand. It's about 15 lines of code.

---

## What's built vs what's left

| Part | Status |
|---|---|
| The core answer format | ✅ Built |
| The consensus / "check twice" logic | ✅ Built |
| All four free checks | ✅ Built |
| The supplier layer (swappable) | ✅ Built |
| Database tables + security rules | ✅ Built |
| Single verify API | ✅ Built (needs supplier details filled in) |
| Bulk upload API | ✅ Skeleton (needs the background worker) |
| Credit system | ✅ Built |
| API key security | ✅ Built |
| **Background worker for big lists** | ⬜ **Next — most important** |
| Dashboard screens | ⬜ Next |
| Payment connection | ⬜ Next |
| Landing page + pricing page | ⬜ Next |
| Free spam checker tool | ⬜ V1 |
| Template library | ⬜ V1 |

Search the code for `TODO(build)` to find every unfinished spot. Each one has a note explaining what goes there and why.

---

## Three things that must not be changed

**1. Big lists run in the background, never inside a web request.**
100,000 addresses takes 1–3 hours. A web request dies after ~30 seconds. This works fine on a 50-row test file and then breaks the first time a real customer uploads a real list. `app/api/v1/bulk/route.ts` is built correctly — keep it that way.

**2. Secret keys stay on the server.**
Anything named `NEXT_PUBLIC_` gets downloaded by the visitor's browser and is public. Everything else stays server-side. **Never call a supplier's API from the browser** — customers would be able to read your keys and spend your credits.

**3. Row Level Security must actually be tested.**
The database rules stop customer A reading customer B's lead lists. Getting this wrong is the most common way apps like this leak data. **Log in as two different test users and genuinely try to read each other's data.** Don't assume it works because it looks right.

---

## How to start it up

```bash
cd email-verifier-app
npm install
cp .env.example .env.local     # then fill in your keys
npm run dev                    # opens at http://localhost:3000
```

For the database: open Supabase → SQL Editor → paste `supabase/migrations/0001_init.sql` → Run.

---

## What to do next, in order

1. **Get supplier keys.** Nothing works without at least two. This is still the go/no-go from the plan — do it before building more.
2. **Fill in the supplier adapters** in `lib/verification/providers/index.ts`. Each company words their answers differently; `normalizeVerdict()` is where you translate them into ours.
3. **Test the consensus engine against your 500 known-answer emails.** If it doesn't beat every single supplier on its own, the core idea needs rethinking before you build anything else. This is the cheapest possible moment to find that out.
4. **Build the background worker.** Then bulk upload actually works.
5. **Then** the dashboard, payments, and landing page.

Steps 1–3 are the ones that decide whether this business works. Steps 4–5 are just normal website building that any developer or AI assistant can do.

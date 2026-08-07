-- =====================================================================
-- EMAIL VERIFIER - DATABASE STRUCTURE
--
-- Plain English: this file creates all the tables the app needs.
-- Run it once in Supabase (SQL Editor -> paste -> Run).
--
-- Two rules baked into this file that matter commercially:
--   1. Uploaded lists auto-delete after 30 days. Less to lose if we're
--      hacked, and it's a genuine trust signal we advertise.
--   2. Every single result is logged. Over time this becomes the one
--      asset competitors cannot copy: our own record of which addresses
--      really bounced. Start logging from day one even before it's useful.
-- =====================================================================


-- ---------------------------------------------------------------------
-- ACCOUNTS
-- Supabase already creates auth.users for login. This holds the
-- business side: what plan they're on and how many credits they have.
-- ---------------------------------------------------------------------
create table public.accounts (
  id                uuid primary key references auth.users(id) on delete cascade,
  email             text not null,
  created_at        timestamptz not null default now(),

  -- 'free' | 'lite' | 'standard' | 'pro' | 'agency'
  plan              text not null default 'free',

  -- Credits that never expire (bought as packs). This is deliberate:
  -- non-expiring credits are what stop customers leaving, and matching
  -- it removes competitors' biggest lock-in.
  credit_balance    integer not null default 0,

  -- Subscription plans work on a DAILY cap that does not roll over.
  -- Unused capacity is destroyed at midnight - that breakage is what
  -- makes cheap-looking plans profitable. See the plan, Part 8.
  daily_limit       integer not null default 100,
  daily_used        integer not null default 0,
  daily_reset_at    date not null default current_date,

  -- Abuse controls
  is_blocked        boolean not null default false,
  block_reason      text,

  -- Our best spam-customer warning sign. Normal lists run 5-25% bad.
  -- Bought or scraped lists run 50-80%. Review anything above 50%.
  lifetime_invalid_rate numeric(5,2) default 0
);


-- ---------------------------------------------------------------------
-- API KEYS
-- Customers plug these into their own software. This is our stickiest
-- revenue - once it's in someone's signup form they don't leave.
--
-- SECURITY: we store a HASH, never the key itself. Show the real key
-- once at creation and never again.
-- ---------------------------------------------------------------------
create table public.api_keys (
  id            uuid primary key default gen_random_uuid(),
  account_id    uuid not null references public.accounts(id) on delete cascade,
  name          text not null,

  key_hash      text not null unique,   -- sha256 of the real key
  key_prefix    text not null,          -- e.g. 'evk_live_a1b2' - safe to display

  created_at    timestamptz not null default now(),
  last_used_at  timestamptz,
  last_used_ip  inet,
  revoked_at    timestamptz
);

create index api_keys_hash_idx on public.api_keys(key_hash) where revoked_at is null;


-- ---------------------------------------------------------------------
-- JOBS - one uploaded list
-- Bulk verification MUST run in the background, never inside a web
-- request. A 100k-row file takes 1-3 hours. This table is how we track it.
-- ---------------------------------------------------------------------
create table public.jobs (
  id              uuid primary key default gen_random_uuid(),
  account_id      uuid not null references public.accounts(id) on delete cascade,

  filename        text,
  status          text not null default 'pending',
                  -- pending | running | paused | complete | failed | cancelled

  total_rows      integer not null default 0,
  processed_rows  integer not null default 0,

  -- Result counts, for the summary screen
  count_valid     integer not null default 0,
  count_invalid   integer not null default 0,
  count_catch_all integer not null default 0,
  count_unknown   integer not null default 0,

  credits_charged integer not null default 0,

  created_at      timestamptz not null default now(),
  completed_at    timestamptz,
  error_message   text,

  -- TRUST + SECURITY: uploaded lists are deleted after 30 days.
  -- A scheduled job removes anything past this date.
  expires_at      timestamptz not null default (now() + interval '30 days')
);

create index jobs_account_idx on public.jobs(account_id, created_at desc);
create index jobs_expiry_idx on public.jobs(expires_at) where status = 'complete';


-- ---------------------------------------------------------------------
-- RESULTS - one verified address
-- ---------------------------------------------------------------------
create table public.results (
  id            bigserial primary key,
  job_id        uuid references public.jobs(id) on delete cascade,
  account_id    uuid not null references public.accounts(id) on delete cascade,

  email         text not null,
  domain        text not null,

  verdict       text not null,          -- valid | invalid | catch_all | unknown
  confidence    smallint not null,      -- 0-100, must be honest
  recommendation text not null,         -- send | send_with_caution | do_not_send

  -- Full transparency: every check and every engine opinion.
  -- This is what we show customers that nobody else does.
  details       jsonb not null default '[]',
  engines       jsonb not null default '[]',

  is_disposable   boolean not null default false,
  is_role         boolean not null default false,
  is_free_provider boolean not null default false,
  is_catch_all    boolean not null default false,

  credits_charged smallint not null default 0,
  created_at      timestamptz not null default now()
);

create index results_job_idx on public.results(job_id);
create index results_account_idx on public.results(account_id, created_at desc);


-- ---------------------------------------------------------------------
-- KNOWN ADDRESSES - our learning database
--
-- THIS IS THE ONLY ASSET THAT COMPOUNDS AND CANNOT BE COPIED.
--
-- Every result goes in here. When a customer reports that an address we
-- called "valid" actually bounced, we record the truth. Over months this
-- becomes real proprietary data. Start filling it on day one.
-- ---------------------------------------------------------------------
create table public.known_addresses (
  email             text primary key,
  domain            text not null,

  last_verdict      text not null,
  last_confidence   smallint not null,
  times_seen        integer not null default 1,
  last_checked_at   timestamptz not null default now(),

  -- Ground truth, when we learn it
  confirmed_bounced boolean,            -- customer told us it bounced
  confirmed_good    boolean,            -- customer told us it worked
  reported_at       timestamptz
);

create index known_addresses_domain_idx on public.known_addresses(domain);


-- ---------------------------------------------------------------------
-- DOMAIN INTELLIGENCE
-- Catch-all status is a property of the DOMAIN, not the address. Cache
-- it and we skip a paid check for every future address at that domain.
-- Direct cost saving, and it makes big lists much faster.
-- ---------------------------------------------------------------------
create table public.domains (
  domain          text primary key,
  is_catch_all    boolean,
  has_mx          boolean,
  mx_provider     text,                 -- 'google' | 'microsoft' | 'other'
  checked_at      timestamptz not null default now(),
  addresses_seen  integer not null default 0
);


-- ---------------------------------------------------------------------
-- DISPOSABLE DOMAINS - refreshed daily from free public lists
-- ---------------------------------------------------------------------
create table public.disposable_domains (
  domain      text primary key,
  source      text,
  added_at    timestamptz not null default now()
);


-- ---------------------------------------------------------------------
-- CREDIT LEDGER
-- Never just add or subtract a number on the account. Write a row for
-- every movement. When a customer disputes their balance - and they
-- will - this is the only thing that settles it.
-- ---------------------------------------------------------------------
create table public.credit_ledger (
  id          bigserial primary key,
  account_id  uuid not null references public.accounts(id) on delete cascade,

  -- positive = added, negative = spent
  amount      integer not null,
  reason      text not null,
              -- purchase | subscription_grant | verification | refund
              -- | bounce_guarantee_refund | promo | competitor_match

  job_id      uuid references public.jobs(id) on delete set null,
  note        text,
  created_at  timestamptz not null default now()
);

create index credit_ledger_account_idx on public.credit_ledger(account_id, created_at desc);


-- ---------------------------------------------------------------------
-- BOUNCE CLAIMS - the refund guarantee
-- No competitor offers this. It costs little and it turns our worst
-- moment (we were wrong) into our best one (we made it right).
-- ---------------------------------------------------------------------
create table public.bounce_claims (
  id            uuid primary key default gen_random_uuid(),
  account_id    uuid not null references public.accounts(id) on delete cascade,
  email         text not null,

  our_verdict   text not null,
  our_confidence smallint not null,

  status        text not null default 'pending',  -- pending | approved | rejected
  credits_refunded integer default 0,

  created_at    timestamptz not null default now(),
  resolved_at   timestamptz
);


-- =====================================================================
-- ROW LEVEL SECURITY
--
-- CRITICAL: this makes it impossible for one customer to read another
-- customer's lead lists. Getting this wrong is the single most common
-- way apps like this leak data.
--
-- TEST IT DELIBERATELY. Log in as two different users and try to read
-- each other's rows. Do not assume it works because it looks right.
-- =====================================================================

alter table public.accounts       enable row level security;
alter table public.api_keys       enable row level security;
alter table public.jobs           enable row level security;
alter table public.results        enable row level security;
alter table public.credit_ledger  enable row level security;
alter table public.bounce_claims  enable row level security;

create policy "own account"  on public.accounts
  for all using (auth.uid() = id);

create policy "own api keys" on public.api_keys
  for all using (auth.uid() = account_id);

create policy "own jobs"     on public.jobs
  for all using (auth.uid() = account_id);

create policy "own results"  on public.results
  for select using (auth.uid() = account_id);

create policy "own ledger"   on public.credit_ledger
  for select using (auth.uid() = account_id);

create policy "own claims"   on public.bounce_claims
  for all using (auth.uid() = account_id);

-- Reference tables are readable by everyone, writable only by the server.
alter table public.domains            enable row level security;
alter table public.disposable_domains enable row level security;

create policy "read domains"    on public.domains            for select using (true);
create policy "read disposable" on public.disposable_domains for select using (true);

-- =====================================================================
-- FIX 0002 - security holes and missing functions found in review
--
-- Three real problems in 0001. Run this straight after 0001.
-- If you already ran 0001 on a live database, run this immediately.
-- =====================================================================


-- ---------------------------------------------------------------------
-- BUG 1 (CRITICAL) - customers could edit their own credit balance
--
-- In 0001 the accounts policy was "for all", which allows UPDATE.
-- A logged-in customer using the public key could have set their own
-- credit_balance to a million, changed their plan to 'agency', or
-- unblocked themselves after being banned for abuse.
--
-- Fix: customers may READ their own row and nothing else. All writes
-- go through the server (service role), which bypasses RLS anyway.
-- ---------------------------------------------------------------------
drop policy if exists "own account" on public.accounts;

create policy "read own account" on public.accounts
  for select using (auth.uid() = id);


-- ---------------------------------------------------------------------
-- BUG 2 (CRITICAL) - known_addresses had no RLS at all
--
-- That table stores email addresses. With RLS off, anyone holding the
-- public anon key (which ships to every browser) could read every
-- address the system has ever seen - across all customers.
--
-- Fix: turn RLS on and add no customer policy at all. Only the server
-- touches this table.
-- ---------------------------------------------------------------------
alter table public.known_addresses enable row level security;
-- deliberately no policy: server-side access only


-- ---------------------------------------------------------------------
-- BUG 3 - customers could approve their own refunds, edit their own jobs
--
-- bounce_claims "for all" let a customer set status = 'approved' and
-- credits_refunded = 999999 on their own claim.
-- jobs "for all" let them rewrite credits_charged and expires_at.
-- api_keys "for all" let them insert arbitrary key hashes.
-- ---------------------------------------------------------------------
drop policy if exists "own claims" on public.bounce_claims;
create policy "read own claims" on public.bounce_claims
  for select using (auth.uid() = account_id);
-- customers submit claims through the server, not directly

drop policy if exists "own jobs" on public.jobs;
create policy "read own jobs" on public.jobs
  for select using (auth.uid() = account_id);

drop policy if exists "own api keys" on public.api_keys;
create policy "read own api keys" on public.api_keys
  for select using (auth.uid() = account_id);
-- creating and revoking keys goes through the server so we control
-- the hashing. Never let the browser write a key_hash directly.


-- ---------------------------------------------------------------------
-- BUG 4 - the code called spend_credits() and add_credits() but nothing
-- ever created them. Every charge would have crashed at runtime.
--
-- These do the balance change AND the ledger row in ONE transaction.
-- That matters: if the app died between the two, a customer would be
-- charged with no record of why, and you could never settle the dispute.
-- ---------------------------------------------------------------------

create or replace function public.spend_credits(
  p_account_id uuid,
  p_amount     integer,
  p_reason     text default 'verification',
  p_job_id     uuid default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_daily_remaining integer;
  v_from_daily      integer;
  v_from_balance    integer;
begin
  if p_amount <= 0 then
    return;
  end if;

  -- Lock the row so two requests can't spend the same credits at once.
  -- Without this, a customer firing parallel API calls could overdraw.
  perform 1 from public.accounts where id = p_account_id for update;

  -- Reset the daily counter if we've rolled into a new day.
  update public.accounts
     set daily_used = 0,
         daily_reset_at = current_date
   where id = p_account_id
     and daily_reset_at < current_date;

  select greatest(daily_limit - daily_used, 0)
    into v_daily_remaining
    from public.accounts
   where id = p_account_id;

  -- Spend the daily allowance FIRST. It expires tonight anyway, so
  -- using the customer's permanent credits while free allowance remains
  -- would be quietly overcharging them.
  v_from_daily   := least(p_amount, v_daily_remaining);
  v_from_balance := p_amount - v_from_daily;

  update public.accounts
     set daily_used     = daily_used + v_from_daily,
         credit_balance = credit_balance - v_from_balance
   where id = p_account_id;

  if (select credit_balance from public.accounts where id = p_account_id) < 0 then
    raise exception 'Insufficient credits';
  end if;

  insert into public.credit_ledger (account_id, amount, reason, job_id)
  values (p_account_id, -p_amount, p_reason, p_job_id);
end;
$$;


create or replace function public.add_credits(
  p_account_id uuid,
  p_amount     integer,
  p_reason     text default 'purchase',
  p_note       text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_amount <= 0 then
    return;
  end if;

  update public.accounts
     set credit_balance = credit_balance + p_amount
   where id = p_account_id;

  insert into public.credit_ledger (account_id, amount, reason, note)
  values (p_account_id, p_amount, p_reason, p_note);
end;
$$;


-- These must only ever be callable by the server, never by a browser.
revoke execute on function public.spend_credits(uuid, integer, text, uuid) from anon, authenticated;
revoke execute on function public.add_credits(uuid, integer, text, text)   from anon, authenticated;


-- ---------------------------------------------------------------------
-- Auto-create an account row when someone signs up, so a new user
-- always has a plan and a daily allowance.
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.accounts (id, email, plan, daily_limit)
  values (new.id, new.email, 'free', 500);   -- 500/day free tier
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

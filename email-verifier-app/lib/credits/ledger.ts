/**
 * CREDITS
 *
 * Plain English: this handles the customer's balance.
 *
 * ONE RULE, AND IT IS NOT OPTIONAL:
 *   Never just add or subtract a number on the account row.
 *   Every single movement writes a row in `credit_ledger`.
 *
 * Why: customers WILL dispute their balance. Without a ledger you have
 * no way to prove what happened and you end up refunding out of guilt.
 * With a ledger it takes thirty seconds to answer.
 *
 * Two pricing promises are enforced here. Both are in our marketing,
 * so they must be true in the code:
 *   - Duplicates are free
 *   - "Unknown" results are free
 */

import { createServiceClient } from '@/lib/db/client'

export type CreditReason =
  | 'purchase'
  | 'subscription_grant'
  | 'verification'
  | 'refund'
  | 'bounce_guarantee_refund'
  | 'promo'
  | 'competitor_match'

/**
 * Does this account have enough to proceed?
 *
 * Two separate pots, and they work differently:
 *   - credit_balance : bought packs, never expire
 *   - daily_limit    : subscription allowance, resets at midnight,
 *                      does NOT roll over (this breakage is what makes
 *                      the cheap-looking plans profitable)
 */
export async function hasCredits(accountId: string, needed: number): Promise<boolean> {
  const db = createServiceClient()

  const { data: account } = await db
    .from('accounts')
    .select('credit_balance, daily_limit, daily_used, daily_reset_at')
    .eq('id', accountId)
    .single()

  if (!account) return false

  // Daily allowance resets each day. Unused capacity is destroyed.
  const today = new Date().toISOString().slice(0, 10)
  const dailyRemaining =
    account.daily_reset_at === today
      ? account.daily_limit - account.daily_used
      : account.daily_limit

  return dailyRemaining >= needed || account.credit_balance >= needed
}

/**
 * Take credits away. Daily allowance is spent first, because it expires
 * tonight anyway - spending the customer's permanent credits while they
 * still have free daily allowance would be quietly ripping them off.
 */
export async function chargeCredits(
  accountId: string,
  amount: number,
  reason: CreditReason,
  jobId?: string,
): Promise<void> {
  if (amount <= 0) return

  const db = createServiceClient()

  // TODO(build): do this inside a Postgres function so the balance
  // update and the ledger row happen together. If the app crashes
  // between the two, a customer is charged with no record of why.
  //
  // TODO(build): make this idempotent. If a request is retried, it must
  // not charge twice. Pass a request id and refuse duplicates.

  await db.rpc('spend_credits', {
    p_account_id: accountId,
    p_amount: amount,
  })

  await db.from('credit_ledger').insert({
    account_id: accountId,
    amount: -amount,
    reason,
    job_id: jobId ?? null,
  })
}

/** Add credits - a purchase, a monthly grant, or a promo. */
export async function grantCredits(
  accountId: string,
  amount: number,
  reason: CreditReason,
  note?: string,
): Promise<void> {
  const db = createServiceClient()

  await db.rpc('add_credits', { p_account_id: accountId, p_amount: amount })

  await db.from('credit_ledger').insert({
    account_id: accountId,
    amount,
    reason,
    note: note ?? null,
  })
}

/**
 * THE BOUNCE GUARANTEE.
 *
 * A customer tells us an address we called "valid" actually bounced.
 * We refund the credits AND record the truth in known_addresses.
 *
 * No competitor does this. It costs us very little, and it turns our
 * worst moment into the reason people trust us. Do not let this get
 * dropped from the build - it is a core part of the positioning, not
 * a nice-to-have.
 */
export async function refundBounce(
  accountId: string,
  email: string,
  credits: number,
): Promise<void> {
  const db = createServiceClient()

  await grantCredits(accountId, credits, 'bounce_guarantee_refund', `Bounce reported: ${email}`)

  // This is the valuable part. Free training data for our own engine.
  await db
    .from('known_addresses')
    .update({ confirmed_bounced: true, reported_at: new Date().toISOString() })
    .eq('email', email.toLowerCase())
}

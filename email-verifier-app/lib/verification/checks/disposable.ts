/**
 * FREE CHECK 3 - Disposable / temporary addresses
 *
 * mailinator.com, 10minutemail.com and thousands like them.
 * The address is technically real but will be dead in an hour.
 *
 * Free: public community-maintained lists on GitHub. Sync daily.
 * See docs/STRUCTURE.md for the sync job.
 */

import type { CheckDetail } from '../types'

/**
 * Starter list. The real list is ~100k domains and lives in the
 * `disposable_domains` table, refreshed daily from public sources.
 * This hardcoded set is only a fallback if the table is empty.
 */
const FALLBACK = new Set([
  'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'tempmail.com',
  'throwawaymail.com', 'yopmail.com', 'trashmail.com', 'sharklasers.com',
  'getnada.com', 'temp-mail.org', 'dispostable.com', 'maildrop.cc',
])

export async function runDisposableCheck(domain: string): Promise<{
  isDisposable: boolean
  detail: CheckDetail
}> {
  // TODO(build): look up the `disposable_domains` table first, fall back
  // to the set above. Kept in-memory with a periodic refresh so this
  // stays a zero-latency check.
  const isDisposable = FALLBACK.has(domain)

  return {
    isDisposable,
    detail: {
      name: 'disposable',
      outcome: isDisposable ? 'fail' : 'pass',
      message: isDisposable
        ? 'Temporary/disposable email provider. This address will expire.'
        : 'Not a disposable email provider.',
    },
  }
}

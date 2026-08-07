/**
 * FREE CHECK 2 - DNS / MX records
 *
 * Does this domain exist, and can it receive mail at all?
 * No MX records = the domain physically cannot accept email = dead.
 *
 * Costs nothing (a DNS lookup), takes ~50ms, ~99% reliable.
 * Catches another 3-8% of a dirty list before we spend any money.
 */

import { promises as dns } from 'node:dns'
import type { CheckDetail } from '../types'

// Domains where SMTP checking is unreliable and the address is
// consumer-grade. Flagged for B2B filtering, not treated as invalid.
const FREE_PROVIDERS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'hotmail.com',
  'outlook.com', 'live.com', 'msn.com', 'aol.com', 'icloud.com', 'me.com',
  'proton.me', 'protonmail.com', 'gmx.com', 'mail.com', 'zoho.com', 'yandex.com',
])

export async function runDnsCheck(domain: string): Promise<{
  ok: boolean
  isFreeProvider: boolean
  detail: CheckDetail
}> {
  const isFreeProvider = FREE_PROVIDERS.has(domain)

  try {
    const records = await dns.resolveMx(domain)

    if (!records || records.length === 0) {
      return {
        ok: false,
        isFreeProvider,
        detail: {
          name: 'mx',
          outcome: 'fail',
          message: 'Domain has no mail servers configured. It cannot receive email.',
        },
      }
    }

    return {
      ok: true,
      isFreeProvider,
      detail: {
        name: 'mx',
        outcome: 'pass',
        message: `Mail servers found (${records.length}). Domain can receive email.`,
      },
    }
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code

    // Domain does not exist at all.
    if (code === 'ENOTFOUND' || code === 'ENODATA') {
      return {
        ok: false,
        isFreeProvider,
        detail: {
          name: 'mx',
          outcome: 'fail',
          message: 'Domain does not exist or has no mail servers.',
        },
      }
    }

    // A DNS timeout is OUR problem, not the customer's. Don't call an
    // address invalid because our lookup was slow. Let it continue to
    // the paid engines instead.
    return {
      ok: true,
      isFreeProvider,
      detail: {
        name: 'mx',
        outcome: 'inconclusive',
        message: 'DNS lookup did not complete. Continuing to mailbox check.',
      },
    }
  }
}

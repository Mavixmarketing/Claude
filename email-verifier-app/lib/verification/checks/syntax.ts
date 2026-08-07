/**
 * FREE CHECK 1 - Syntax
 *
 * Is this even a legally shaped email address?
 * Costs nothing, instant, 100% reliable. Catches 2-5% of a dirty list.
 */

import type { CheckDetail } from '../types'

// Deliberately practical rather than fully RFC-compliant. The full RFC
// grammar allows addresses that no real mail system accepts, and being
// stricter here means we never waste a paid engine call on garbage.
const SHAPE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

export function runSyntaxCheck(email: string): { ok: boolean; detail: CheckDetail } {
  if (!email || email.length > 254) {
    return {
      ok: false,
      detail: {
        name: 'syntax',
        outcome: 'fail',
        message: 'Address is empty or longer than the 254-character limit.',
      },
    }
  }

  if (!SHAPE.test(email)) {
    return {
      ok: false,
      detail: {
        name: 'syntax',
        outcome: 'fail',
        message: 'Not a valid email format (check for typos, spaces, or a missing domain).',
      },
    }
  }

  const [local] = email.split('@')
  if (local.length > 64) {
    return {
      ok: false,
      detail: {
        name: 'syntax',
        outcome: 'fail',
        message: 'The part before the @ is longer than the 64-character limit.',
      },
    }
  }

  return {
    ok: true,
    detail: { name: 'syntax', outcome: 'pass', message: 'Valid email format.' },
  }
}

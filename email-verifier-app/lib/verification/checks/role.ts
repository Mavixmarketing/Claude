/**
 * FREE CHECK 4 - Role accounts
 *
 * info@, sales@, support@, admin@ ...
 *
 * IMPORTANT: these are usually REAL mailboxes. We must not call them
 * invalid. But they go to a shared inbox, they are far more likely to
 * be marked as spam, and for cold email they are a bad idea.
 *
 * So: flag it, warn the customer, let them decide. That is the honest
 * behaviour and it is also what agencies actually want.
 */

import type { CheckDetail } from '../types'

const ROLE_PREFIXES = new Set([
  'info', 'sales', 'support', 'admin', 'contact', 'hello', 'help',
  'billing', 'office', 'team', 'enquiries', 'inquiries', 'marketing',
  'noreply', 'no-reply', 'donotreply', 'postmaster', 'webmaster',
  'abuse', 'careers', 'jobs', 'hr', 'accounts', 'finance', 'legal',
  'privacy', 'security', 'press', 'media', 'partners', 'orders',
])

export function runRoleCheck(email: string): { isRole: boolean; detail: CheckDetail } {
  const local = email.split('@')[0]
  // Handles "sales.team@" and "info-uk@" as well as plain "info@".
  const base = local.split(/[.+_-]/)[0]
  const isRole = ROLE_PREFIXES.has(local) || ROLE_PREFIXES.has(base)

  return {
    isRole,
    detail: {
      name: 'role',
      outcome: isRole ? 'inconclusive' : 'pass',
      message: isRole
        ? 'Shared/role mailbox (like info@ or sales@). Usually real, but higher spam-complaint risk for cold outreach.'
        : 'Personal mailbox, not a shared role address.',
    },
  }
}

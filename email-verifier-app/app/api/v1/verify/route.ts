/**
 * POST /api/v1/verify - check a single email address
 *
 * This is the endpoint customers plug into their own signup forms.
 * It is our stickiest revenue: once it's in someone's product, moving
 * away is an engineering job, so they don't.
 *
 * Because of that, this endpoint deserves better documentation and
 * better uptime than anything else in the app.
 *
 *   curl -X POST https://yourdomain.com/api/v1/verify \
 *     -H "Authorization: Bearer evk_live_..." \
 *     -H "Content-Type: application/json" \
 *     -d '{"email":"john@company.com"}'
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyEmail } from '@/lib/verification/router'
import { authenticateApiKey } from '@/lib/db/auth'
import { chargeCredits, hasCredits } from '@/lib/credits/ledger'

export async function POST(request: NextRequest) {
  // --- 1. Who is asking?
  const auth = await authenticateApiKey(request)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  // --- 2. Blocked accounts stop here (see the abuse rules in the plan)
  if (auth.account.is_blocked) {
    return NextResponse.json(
      { error: 'Account suspended', reason: auth.account.block_reason },
      { status: 403 },
    )
  }

  // --- 3. What did they send?
  let email: string
  try {
    const body = await request.json()
    email = body.email
    if (typeof email !== 'string') throw new Error()
  } catch {
    return NextResponse.json({ error: 'Body must be {"email": "..."}' }, { status: 400 })
  }

  // --- 4. Can they afford it?
  // We check before doing the work, and only charge for answers we
  // actually gave. "unknown" is always free - see router.ts.
  if (!(await hasCredits(auth.account.id, 3))) {
    return NextResponse.json(
      { error: 'Not enough credits', topUpUrl: '/dashboard/billing' },
      { status: 402 },
    )
  }

  // TODO(build): rate limit per API KEY, not just per account. If one
  // key leaks, that contains the damage to that key.

  // --- 5. Do the work
  const result = await verifyEmail(email, {
    userId: auth.account.id,
    mode: 'consensus',
  })

  // --- 6. Charge, and write it to the ledger. Never just decrement a
  // number - every movement gets a row, or balance disputes are unwinnable.
  if (result.creditsCharged > 0) {
    await chargeCredits(auth.account.id, result.creditsCharged, 'verification')
  }

  // TODO(build): write to `results` AND `known_addresses`. The learning
  // database is the only asset competitors can't copy - fill it from day one.

  return NextResponse.json(result)
}

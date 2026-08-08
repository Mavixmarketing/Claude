/**
 * POST /api/public/verify - the homepage checker. No login.
 *
 * This is the front door of the whole business, so it needs to be
 * generous enough to impress and tight enough not to be farmed.
 *
 * THE GUARDS (all deliberate):
 *   1. A handful of checks per IP per day. Enough to prove we work,
 *      not enough to clean a list with.
 *   2. ONE email per request. No arrays, no comma-separated lists.
 *      Otherwise people just loop it and never sign up.
 *   3. Never returns our internal engine names or raw provider data.
 *   4. Uses the cheapest route - free checks first, one engine only.
 *      No consensus here; consensus is a paid feature.
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyEmail } from '@/lib/verification/router'

/** Generous enough to be useful, small enough that bulk users must sign up. */
const FREE_CHECKS_PER_DAY = 5

export async function POST(request: NextRequest) {
  // --- Who is this? Best-effort IP.
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'

  // --- Read the input
  let email: string
  try {
    const body = await request.json()
    email = body.email
    if (typeof email !== 'string') throw new Error()
  } catch {
    return NextResponse.json({ error: 'Please enter an email address.' }, { status: 400 })
  }

  // ONE address only. Block the obvious ways people try to sneak a list in.
  if (email.includes(',') || email.includes(';') || /\s/.test(email.trim())) {
    return NextResponse.json(
      { error: 'One email at a time here. Sign up free to check a whole list.' },
      { status: 400 },
    )
  }

  // --- Rate limit
  // TODO(build): back this with Redis (Upstash free tier) or a Postgres
  // table keyed on (ip, date). In-memory does NOT work once you run more
  // than one server - visitors would get a fresh allowance per instance.
  const used = await getUsageToday(ip)

  if (used >= FREE_CHECKS_PER_DAY) {
    return NextResponse.json(
      {
        error: "That's all the free checks for today.",
        signupUrl: '/signup',
        message: 'Create a free account for 500 checks a day.',
      },
      { status: 429 },
    )
  }

  // TODO(build): add Cloudflare Turnstile (free) once you see scripted
  // abuse. Don't add it before then - it costs you real conversions.

  // --- Do the check.
  // 'single' = free checks + ONE paid engine. Consensus is a paid feature,
  // and on the flat-rate supplier plan this call costs us nothing anyway.
  const result = await verifyEmail(email, { userId: `public:${ip}`, mode: 'single' })

  await recordUsage(ip)

  // --- Return a trimmed, public-safe version.
  // We never expose which suppliers we use or their raw responses.
  return NextResponse.json({
    email: result.email,
    verdict: result.verdict,
    confidence: result.confidence,
    recommendation: result.recommendation,
    reasons: result.details
      .filter((d) => !d.name.startsWith('smtp:')) // hide supplier names
      .map((d) => d.message),
    checksRemaining: Math.max(0, FREE_CHECKS_PER_DAY - used - 1),
  })
}

// --- TODO(build): replace both of these with real storage -------------

async function getUsageToday(_ip: string): Promise<number> {
  return 0
}

async function recordUsage(_ip: string): Promise<void> {
  // no-op until storage is wired up
}

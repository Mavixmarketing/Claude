/**
 * POST /api/v1/bulk - upload a list to verify
 *
 * THE MOST IMPORTANT ARCHITECTURE RULE IN THIS APP:
 *
 *   This endpoint does NOT verify anything. It saves the file, creates
 *   a job row, and returns immediately.
 *
 *   A background worker does the actual work.
 *
 * Why: 100,000 addresses takes 1-3 hours. A web request dies after
 * ~30 seconds. Trying to verify inside the request is the #1 mistake
 * beginners make here, and it looks like it works fine on a 50-row
 * test file right up until a real customer uploads a real list.
 *
 * Flow:
 *   1. POST here          -> get a jobId back straight away
 *   2. Worker processes   -> in the background, survives restarts
 *   3. GET /jobs/{id}     -> poll for progress, or use a webhook
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateApiKey } from '@/lib/db/auth'
import { hasCredits } from '@/lib/credits/ledger'

// Free plan gets NO bulk upload. Bulk is the job people pay for -
// the free tier exists to prove our results are good, not to do the work.
const PLANS_WITHOUT_BULK = new Set(['free'])

export async function POST(request: NextRequest) {
  const auth = await authenticateApiKey(request)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  if (PLANS_WITHOUT_BULK.has(auth.account.plan)) {
    return NextResponse.json(
      { error: 'Bulk upload requires a paid plan', upgradeUrl: '/pricing' },
      { status: 403 },
    )
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Send a CSV file in the "file" field' }, { status: 400 })
  }

  // TODO(build):
  //  1. Enforce a max file size. An unbounded upload is a free way to
  //     fill your disk and your bill.
  //  2. Parse the CSV, find the email column, count rows.
  //  3. REMOVE DUPLICATES HERE and charge only once for each unique
  //     address. Say this loudly on the pricing page - it costs us
  //     nothing and it's a real trust signal.
  //  4. ABUSE CHECK: hold the job for manual review if it's over
  //     100k rows from a young account. A brand new account uploading
  //     500k addresses in hour one is the classic spammer signature.
  //  5. Store the file, create the `jobs` row, queue the worker.

  const estimatedCredits = 0 // TODO: unique row count x engines per row

  if (!(await hasCredits(auth.account.id, estimatedCredits))) {
    return NextResponse.json(
      { error: 'Not enough credits for this list', topUpUrl: '/dashboard/billing' },
      { status: 402 },
    )
  }

  return NextResponse.json({
    jobId: 'TODO',
    status: 'pending',
    message: 'List queued. Poll /api/v1/jobs/{jobId} for progress.',
  })
}

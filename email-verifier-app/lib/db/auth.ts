/**
 * API KEY AUTHENTICATION
 *
 * Checks the key a customer sent with their request.
 *
 * SECURITY RULES BAKED IN HERE:
 *
 *  1. We store a HASH of the key, never the key. If our database leaks,
 *     the keys in it are useless to the attacker.
 *
 *  2. Keys must arrive in the Authorization header, NEVER in the URL.
 *     Web addresses end up in server logs, browser history and referrer
 *     headers - a key in a URL is a key that will eventually leak.
 *
 *  3. Keys are prefixed (evk_live_...). That lets GitHub's secret
 *     scanner recognise ours and warn us automatically if a customer
 *     accidentally commits one.
 */

import { createHash } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { createServiceClient } from './client'

export interface Account {
  id: string
  email: string
  plan: string
  credit_balance: number
  daily_limit: number
  daily_used: number
  is_blocked: boolean
  block_reason: string | null
}

type AuthResult =
  | { ok: true; account: Account }
  | { ok: false; error: string }

export async function authenticateApiKey(request: NextRequest): Promise<AuthResult> {
  const header = request.headers.get('authorization')

  if (!header?.startsWith('Bearer ')) {
    return { ok: false, error: 'Missing API key. Send it as: Authorization: Bearer evk_live_...' }
  }

  const key = header.slice(7).trim()

  if (!key.startsWith('evk_')) {
    return { ok: false, error: 'Malformed API key' }
  }

  const keyHash = createHash('sha256').update(key).digest('hex')

  const db = createServiceClient()

  const { data: apiKey } = await db
    .from('api_keys')
    .select('id, account_id, accounts(*)')
    .eq('key_hash', keyHash)
    .is('revoked_at', null)
    .single()

  if (!apiKey) {
    return { ok: false, error: 'Invalid or revoked API key' }
  }

  // Let the customer spot a stolen key themselves. Cheap to record,
  // and it's the kind of small thing that makes developers trust you.
  await db
    .from('api_keys')
    .update({
      last_used_at: new Date().toISOString(),
      last_used_ip: request.headers.get('x-forwarded-for') ?? null,
    })
    .eq('id', apiKey.id)

  return { ok: true, account: apiKey.accounts as unknown as Account }
}

/**
 * Makes a new key. Returns the real key ONCE - we never store it and
 * can never show it again. If the customer loses it, they make a new one.
 */
export function generateApiKey(live = true): { key: string; hash: string; prefix: string } {
  const random = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
  const key = `evk_${live ? 'live' : 'test'}_${random}`

  return {
    key,
    hash: createHash('sha256').update(key).digest('hex'),
    prefix: key.slice(0, 16), // safe to store and display in the dashboard
  }
}

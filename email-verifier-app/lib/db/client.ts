/**
 * DATABASE CONNECTIONS
 *
 * There are two kinds, and mixing them up is a serious security bug.
 *
 *   createServerClient()  - acts AS THE LOGGED-IN USER.
 *                           Row Level Security applies. They can only
 *                           ever see their own rows.
 *
 *   createServiceClient() - acts as ADMIN. Bypasses all security.
 *                           Only for background workers and webhooks.
 *
 * THE RULE:
 *   The service key must NEVER reach the browser. Not in a component,
 *   not in a prop, not in an API response. If it leaks, anyone can read
 *   every customer's lead lists.
 *
 * Anything named NEXT_PUBLIC_* is downloaded by the visitor's browser
 * and is therefore public. Anything else stays on the server.
 */

import { createClient } from '@supabase/supabase-js'

/** Admin access. Server-side only. Never import this into a component. */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // <- SECRET

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase server credentials')
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}

/** Acts as the signed-in user. Row Level Security is enforced. */
export function createServerClient(accessToken: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // safe to expose

  return createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false },
  })
}

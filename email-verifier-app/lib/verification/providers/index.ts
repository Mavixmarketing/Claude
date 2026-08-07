/**
 * THE PROVIDER LAYER
 *
 * Plain English: these are the outside companies we pay to do the one
 * expensive step (asking the mail server if the mailbox exists).
 *
 * WHY THIS FILE MATTERS COMMERCIALLY:
 *
 *  1. Every provider hides behind the same small interface. Swapping
 *     supplier is a config change, not a rewrite. If one raises prices
 *     or cuts us off, we re-weight and carry on. Supplier lock-in was
 *     listed as a top-5 risk in the plan - this file is the mitigation.
 *
 *  2. It makes consensus possible at all. We can only compare opinions
 *     because every provider returns the same shape.
 *
 *  3. Later (month 6-9) our OWN SMTP node just becomes another entry in
 *     this list. Nothing above it has to change. That is what takes our
 *     margin from ~45% to ~77%.
 *
 * RULE: never call a provider directly from anywhere else in the app.
 * Always go through getProviders(). And NEVER from the browser - these
 * API keys are server-side only.
 */

import type { EngineOpinion, Verdict } from '../types'

export interface VerificationProvider {
  /** short name, shown to the customer - we have nothing to hide */
  name: string
  /** our wholesale cost per check, used for margin reporting */
  costPerCheck: number
  /** lower number = asked first */
  priority: number
  verify(email: string): Promise<EngineOpinion>
}

/**
 * Returns the providers to use, cheapest/fastest first.
 *
 * TODO(build): read the enabled list and priorities from env vars so
 * you can re-weight suppliers without a deploy.
 */
export function getProviders(): VerificationProvider[] {
  return [
    createProvider({
      name: 'engine-a',
      costPerCheck: 0.0005,
      priority: 1,
      apiKeyEnv: 'PROVIDER_A_API_KEY',
      endpoint: process.env.PROVIDER_A_ENDPOINT,
    }),
    createProvider({
      name: 'engine-b',
      costPerCheck: 0.0008,
      priority: 2,
      apiKeyEnv: 'PROVIDER_B_API_KEY',
      endpoint: process.env.PROVIDER_B_ENDPOINT,
    }),
    createProvider({
      name: 'engine-c',
      costPerCheck: 0.0025,
      priority: 3,
      apiKeyEnv: 'PROVIDER_C_API_KEY',
      endpoint: process.env.PROVIDER_C_ENDPOINT,
    }),
  ].filter((p) => p.enabled)
}

// -------------------------------------------------------------------

interface ProviderConfig {
  name: string
  costPerCheck: number
  priority: number
  apiKeyEnv: string
  endpoint?: string
}

function createProvider(config: ProviderConfig): VerificationProvider & { enabled: boolean } {
  const apiKey = process.env[config.apiKeyEnv]

  return {
    name: config.name,
    costPerCheck: config.costPerCheck,
    priority: config.priority,
    enabled: Boolean(apiKey && config.endpoint),

    async verify(email: string): Promise<EngineOpinion> {
      const startedAt = Date.now()

      try {
        // TODO(build): each real provider has its own request shape and
        // its own words for the same answers. Write one adapter per
        // provider and map their vocabulary onto our Verdict type using
        // normalizeVerdict() below. Do NOT let their words leak upward.
        const response = await fetch(config.endpoint!, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ email }),
          // Never let one slow provider hold up the whole batch.
          signal: AbortSignal.timeout(15_000),
        })

        if (!response.ok) {
          throw new Error(`${config.name} returned HTTP ${response.status}`)
        }

        const raw = await response.json()

        return {
          engine: config.name,
          verdict: normalizeVerdict(raw.status ?? raw.result),
          raw,
          durationMs: Date.now() - startedAt,
        }
      } catch (err) {
        // A provider failing is normal and must never break a job.
        // We record it, exclude it from consensus, and don't charge.
        return {
          engine: config.name,
          verdict: 'unknown',
          durationMs: Date.now() - startedAt,
          error: err instanceof Error ? err.message : 'unknown error',
        }
      }
    },
  }
}

/**
 * Every provider uses different words for the same four answers.
 * This is where we translate them into ours.
 *
 * Watch out: several providers report catch-all domains as "valid" or
 * "ok" - that is exactly the dishonesty we are selling against. Map
 * their catch-all signals carefully when you write each adapter, and
 * never let a catch-all reach the consensus engine labelled "valid".
 */
export function normalizeVerdict(input: string): Verdict {
  const value = String(input || '').toLowerCase()

  if (['valid', 'deliverable', 'ok', 'safe', 'exists'].includes(value)) return 'valid'
  if (['invalid', 'undeliverable', 'bad', 'not_found', 'rejected'].includes(value)) return 'invalid'
  if (['catch_all', 'catchall', 'accept_all', 'acceptall', 'risky'].includes(value)) return 'catch_all'

  return 'unknown'
}

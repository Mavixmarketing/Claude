/**
 * THE VERIFICATION ROUTER
 *
 * Plain English: this decides how much effort (and money) to spend on
 * each email address, then puts the final answer together.
 *
 * The order matters, and it is the whole cost model:
 *
 *   1. FREE checks first  - syntax, DNS, disposable, role. Cost: $0.
 *      These settle a big chunk of any real list before we spend a cent.
 *
 *   2. ONE paid engine    - if the answer is obvious, stop here.
 *
 *   3. CONSENSUS          - only for ambiguous addresses. This is where
 *      we spend 2-3x, and it is what makes us more accurate than any
 *      single competitor.
 *
 * Everything above this file is UI. Everything below is commodity.
 * THIS FILE IS THE COMPANY.
 */

import { runSyntaxCheck } from './checks/syntax'
import { runDnsCheck } from './checks/dns'
import { runDisposableCheck } from './checks/disposable'
import { runRoleCheck } from './checks/role'
import { buildConsensus, needsConsensus } from './consensus'
import { getProviders } from './providers'
import type {
  CheckDetail,
  EngineOpinion,
  VerificationResult,
  VerifyOptions,
} from './types'

export async function verifyEmail(
  email: string,
  options: VerifyOptions,
): Promise<VerificationResult> {
  const startedAt = Date.now()
  const normalized = email.trim().toLowerCase()
  const details: CheckDetail[] = []

  // ---------------------------------------------------------------
  // STEP 1 - FREE CHECKS. These cost us nothing. Always run them.
  // ---------------------------------------------------------------

  const syntax = runSyntaxCheck(normalized)
  details.push(syntax.detail)
  if (!syntax.ok) {
    return finish({
      email: normalized,
      verdict: 'invalid',
      confidence: 99,
      recommendation: 'do_not_send',
      reasoning: syntax.detail.message,
      details,
      flags: emptyFlags(),
      engines: [],
      creditsCharged: 0, // free check - never charge for this
      startedAt,
    })
  }

  const domain = normalized.split('@')[1]

  const dns = await runDnsCheck(domain)
  details.push(dns.detail)
  if (!dns.ok) {
    return finish({
      email: normalized,
      verdict: 'invalid',
      confidence: 98,
      recommendation: 'do_not_send',
      reasoning: dns.detail.message,
      details,
      flags: emptyFlags(),
      engines: [],
      creditsCharged: 0, // still free - no paid engine was called
      startedAt,
    })
  }

  const disposable = await runDisposableCheck(domain)
  const role = runRoleCheck(normalized)
  details.push(disposable.detail, role.detail)

  const flags = {
    disposable: disposable.isDisposable,
    roleAccount: role.isRole,
    freeProvider: dns.isFreeProvider,
    catchAllDomain: false, // set by the paid engines below
    spamTrap: null, // we do NOT detect these yet - never fake it
  }

  // A disposable address is real but worthless. Answer for free.
  if (disposable.isDisposable) {
    return finish({
      email: normalized,
      verdict: 'invalid',
      confidence: 95,
      recommendation: 'do_not_send',
      reasoning: 'Temporary/disposable address. It will stop working shortly.',
      details,
      flags,
      engines: [],
      creditsCharged: 0,
      startedAt,
    })
  }

  // Free mode stops here (used by the free public tool).
  if (options.mode === 'free') {
    return finish({
      email: normalized,
      verdict: 'unknown',
      confidence: 30,
      recommendation: 'send_with_caution',
      reasoning: 'Free checks passed. Mailbox existence not tested on this plan.',
      details,
      flags,
      engines: [],
      creditsCharged: 0,
      startedAt,
    })
  }

  // ---------------------------------------------------------------
  // STEP 2 - FIRST PAID ENGINE
  // ---------------------------------------------------------------

  const providers = getProviders()
  const opinions: EngineOpinion[] = []

  // No supplier keys configured yet. Say so honestly rather than
  // crashing, and never charge for it.
  if (providers.length === 0) {
    return finish({
      email: normalized,
      verdict: 'unknown',
      confidence: 30,
      recommendation: 'send_with_caution',
      reasoning:
        'Free checks passed, but no verification engine is configured. ' +
        'Mailbox existence was not tested.',
      details,
      flags,
      engines: [],
      creditsCharged: 0,
      startedAt,
    })
  }

  const first = await providers[0].verify(normalized)
  opinions.push(first)
  details.push({
    name: `smtp:${first.engine}`,
    outcome: first.verdict === 'valid' ? 'pass' : first.verdict === 'invalid' ? 'fail' : 'inconclusive',
    message: `${first.engine} returned "${first.verdict}"`,
  })

  if (first.verdict === 'catch_all') flags.catchAllDomain = true

  // ---------------------------------------------------------------
  // STEP 3 - CONSENSUS, only when it's worth paying for
  // ---------------------------------------------------------------

  const wantsConsensus =
    options.mode === 'consensus' || options.mode === 'deep' || options.mode === undefined

  if (wantsConsensus && needsConsensus(first)) {
    // Ask the remaining engines at the same time, not one after another.
    const rest = await Promise.all(
      providers.slice(1).map((p) => p.verify(normalized)),
    )
    for (const opinion of rest) {
      opinions.push(opinion)
      if (opinion.verdict === 'catch_all') flags.catchAllDomain = true
      details.push({
        name: `smtp:${opinion.engine}`,
        outcome:
          opinion.verdict === 'valid' ? 'pass' : opinion.verdict === 'invalid' ? 'fail' : 'inconclusive',
        message: `${opinion.engine} returned "${opinion.verdict}"`,
      })
    }
  }

  const consensus = buildConsensus(opinions)

  // A role account is real, but risky for cold email. Warn, don't reject.
  let recommendation = consensus.recommendation
  if (flags.roleAccount && recommendation === 'send') {
    recommendation = 'send_with_caution'
  }

  // We never charge for an answer we could not give.
  const creditsCharged = consensus.verdict === 'unknown' ? 0 : opinions.filter((o) => !o.error).length

  return finish({
    email: normalized,
    verdict: consensus.verdict,
    confidence: consensus.confidence,
    recommendation,
    reasoning: consensus.reasoning,
    details,
    flags,
    engines: opinions,
    creditsCharged,
    startedAt,
  })
}

// --- helpers -----------------------------------------------------

function emptyFlags(): VerificationResult['flags'] {
  return {
    disposable: false,
    roleAccount: false,
    freeProvider: false,
    catchAllDomain: false,
    spamTrap: null,
  }
}

function finish(
  input: Omit<VerificationResult, 'durationMs'> & { reasoning: string; startedAt: number },
): VerificationResult {
  const { reasoning, startedAt, ...rest } = input
  // The reasoning is the customer-facing summary. Put it first in details
  // so the UI can show it as the headline explanation.
  return {
    ...rest,
    details: [{ name: 'summary', outcome: 'pass', message: reasoning }, ...rest.details],
    durationMs: Date.now() - startedAt,
  }
}

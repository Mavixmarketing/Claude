/**
 * THE CONSENSUS ENGINE
 *
 * This is the most important file in the whole product.
 *
 * Plain English: several email-checking companies each give us their
 * opinion. This file turns those opinions into ONE honest answer plus
 * a confidence score.
 *
 * Why this is the business: competitors own one engine, so they have to
 * trust it. We own none, so we can ask several and compare. Different
 * engines make DIFFERENT mistakes, so agreement between them is real
 * evidence. This is exactly what experienced users already do by hand
 * with three separate subscriptions.
 *
 * RULE: this file must never be optimistic. If we are not sure, the
 * confidence score must say so. Being wrong costs us a refund AND our
 * entire brand.
 */

import type { EngineOpinion, Recommendation, Verdict } from './types'

export interface ConsensusOutcome {
  verdict: Verdict
  confidence: number
  recommendation: Recommendation
  /** plain-English explanation shown to the customer */
  reasoning: string
}

/**
 * Combine several engine opinions into one answer.
 *
 * The decision table (from the research, file 03):
 *
 *   A         B         C          -> verdict      confidence
 *   valid     valid     valid         valid        95-99
 *   valid     valid     catch_all     valid        80
 *   valid     catch_all unknown       catch_all    50
 *   invalid   invalid   -             invalid      98
 *   valid     invalid   valid         unknown      40   <- engines disagree, do NOT send
 */
export function buildConsensus(opinions: EngineOpinion[]): ConsensusOutcome {
  const usable = opinions.filter((o) => !o.error)

  if (usable.length === 0) {
    return {
      verdict: 'unknown',
      confidence: 0,
      recommendation: 'do_not_send',
      reasoning: 'No verification engine was able to answer. Not charged.',
    }
  }

  const counts = tally(usable)
  const total = usable.length

  // --- Invalid wins early. A confident "no" is the most reliable signal
  // SMTP gives us, and sending to a known-dead address is the one
  // outcome that actually damages the customer.
  if (counts.invalid > 0 && counts.valid === 0) {
    return {
      verdict: 'invalid',
      confidence: counts.invalid >= 2 ? 98 : 90,
      recommendation: 'do_not_send',
      reasoning: `${counts.invalid} of ${total} engines confirmed this mailbox does not exist.`,
    }
  }

  // --- Direct contradiction. One says yes, another says no.
  // This is the case competitors quietly resolve as "valid" to protect
  // their accuracy stats. We refuse to. We say we don't know.
  if (counts.valid > 0 && counts.invalid > 0) {
    return {
      verdict: 'unknown',
      confidence: 40,
      recommendation: 'do_not_send',
      reasoning:
        `Engines disagree (${counts.valid} said valid, ${counts.invalid} said invalid). ` +
        `We will not guess. Excluded from your "safe to send" list.`,
    }
  }

  // --- Unanimous valid.
  if (counts.valid === total && total >= 2) {
    return {
      verdict: 'valid',
      confidence: total >= 3 ? 97 : 93,
      recommendation: 'send',
      reasoning: `All ${total} engines independently confirmed this mailbox exists.`,
    }
  }

  // --- Mostly valid, one abstained (catch_all or unknown).
  if (counts.valid >= 2 && counts.invalid === 0) {
    return {
      verdict: 'valid',
      confidence: 80,
      recommendation: 'send',
      reasoning: `${counts.valid} of ${total} engines confirmed the mailbox. The rest could not determine it.`,
    }
  }

  // --- Only one engine said valid and nothing contradicted it.
  if (counts.valid === 1 && total === 1) {
    return {
      verdict: 'valid',
      confidence: 75,
      recommendation: 'send',
      reasoning: 'One engine confirmed the mailbox. Single-engine result.',
    }
  }

  // --- Catch-all territory. The domain accepts everything, so nobody
  // can know. We say so. Deep Verify is the paid way to push further.
  if (counts.catch_all > 0) {
    return {
      verdict: 'catch_all',
      confidence: 50,
      recommendation: 'send_with_caution',
      reasoning:
        'This domain accepts mail to any address, so no tool can confirm this specific ' +
        'mailbox exists. Deep Verify can improve this estimate.',
    }
  }

  // --- Everything else is genuinely unknown. Say so plainly.
  return {
    verdict: 'unknown',
    confidence: 25,
    recommendation: 'do_not_send',
    reasoning:
      'The mail server did not give a usable answer (blocked, timed out, or greylisted). ' +
      'Unknown results are not charged.',
  }
}

function tally(opinions: EngineOpinion[]): Record<Verdict, number> {
  const counts: Record<Verdict, number> = {
    valid: 0,
    invalid: 0,
    catch_all: 0,
    unknown: 0,
  }
  for (const o of opinions) counts[o.verdict]++
  return counts
}

/**
 * Decides whether an address is "obvious" (one engine is enough) or
 * "ambiguous" (worth paying for a second and third opinion).
 *
 * This is what keeps our costs competitive. Roughly 60-70% of a real
 * list is decided for free or by one clear answer. We only pay double
 * or triple on the hard 30-40%.
 */
export function needsConsensus(firstOpinion: EngineOpinion): boolean {
  // A confident invalid is reliable. Don't spend more money on it.
  if (firstOpinion.verdict === 'invalid') return false

  // Everything else is worth a second opinion - especially "valid",
  // because a false "valid" is the failure that loses us the customer.
  return true
}

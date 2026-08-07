/**
 * THE CORE CONTRACTS
 *
 * Everything in this app agrees on the shapes in this file.
 * If you change something here, you change the whole product.
 *
 * Plain English: this file decides *what an answer looks like*.
 * The big lesson from the research was that competitors give a
 * one-word answer and hide their doubt. We do the opposite.
 */

/**
 * The four possible verdicts. Never collapse this to valid/invalid.
 *
 * valid      - the mailbox exists, we're confident
 * invalid    - the mailbox does not exist, we're confident
 * catch_all  - the domain accepts every address, so nobody can know
 * unknown    - we genuinely could not find out (blocked, timeout, greylist)
 */
export type Verdict = 'valid' | 'invalid' | 'catch_all' | 'unknown'

/** What we tell the customer to actually DO. This is what they care about. */
export type Recommendation = 'send' | 'send_with_caution' | 'do_not_send'

/**
 * Every individual thing we checked, and what it said.
 * We show all of this to the customer. Nobody else does.
 */
export interface CheckDetail {
  /** e.g. "syntax", "mx", "disposable", "role", "smtp" */
  name: string
  /** did this check pass, fail, or was it inconclusive */
  outcome: 'pass' | 'fail' | 'inconclusive'
  /** human-readable, shown directly in the UI: "MX records found (3)" */
  message: string
}

/** The final answer we hand back for one email address. */
export interface VerificationResult {
  email: string

  verdict: Verdict

  /**
   * 0-100. How sure are we?
   * This is the number that makes us different. It must be honest.
   * A catch_all should NEVER score above ~60 without Deep Verify.
   */
  confidence: number

  recommendation: Recommendation

  /** Every check we ran, in the order we ran them. */
  details: CheckDetail[]

  /** Useful flags customers filter on. */
  flags: {
    disposable: boolean
    roleAccount: boolean
    freeProvider: boolean
    catchAllDomain: boolean
    /** we don't detect these yet - be honest, don't fake it */
    spamTrap: null
  }

  /** Which engines we asked, and what each said. Full transparency. */
  engines: EngineOpinion[]

  /** How many credits this cost the customer. Duplicates cost 0. */
  creditsCharged: number

  /** milliseconds */
  durationMs: number
}

/** One provider's opinion. We collect several and compare them. */
export interface EngineOpinion {
  /** which provider - shown to the customer, we have nothing to hide */
  engine: string
  verdict: Verdict
  /** raw response, kept for our own debugging and learning database */
  raw?: unknown
  durationMs: number
  error?: string
}

/**
 * How much effort to spend on one address.
 *
 * free    - only the checks that cost us nothing (syntax, DNS, lists)
 * single  - one paid engine. Used when the answer is obvious.
 * consensus - 2-3 paid engines. Used when the address is ambiguous.
 * deep    - consensus + extra signals. The paid "Deep Verify" add-on.
 */
export type VerificationMode = 'free' | 'single' | 'consensus' | 'deep'

export interface VerifyOptions {
  mode?: VerificationMode
  /** skip the cache and re-check even if we've seen this address */
  force?: boolean
  /** who is asking - for credit charging and rate limits */
  userId: string
}

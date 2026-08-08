/**
 * THE HOMEPAGE - the "no brainer"
 *
 * A visitor lands here and can verify an email IMMEDIATELY.
 * No signup. No credit card. No popup. Type, press check, get an answer.
 *
 * WHY THIS IS THE WHOLE STRATEGY:
 *   Every competitor makes you register before you see anything. So the
 *   visitor never finds out whether the product is any good. We show them
 *   first and ask second. Verification costs us almost nothing, so this
 *   is the cheapest possible way to prove we work.
 *
 * THE LIMITS (deliberate, do not loosen):
 *   - ONE email at a time. No pasting a list in.
 *   - A few checks per visitor per day, tracked by IP.
 *   - Bulk upload requires an account. Bulk is the job people pay for.
 */

'use client'

import { useState } from 'react'

interface PublicResult {
  email: string
  verdict: 'valid' | 'invalid' | 'catch_all' | 'unknown'
  confidence: number
  recommendation: string
  reasons: string[]
  checksRemaining: number
}

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<PublicResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function check(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || loading) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/public/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Try again.')
      } else {
        setResult(data)
      }
    } catch {
      setError('Could not reach the server. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <p className="eyebrow">No signup. No card. Just type an email.</p>

        <h1>
          Is this email real?
          <br />
          <span className="muted">Find out in two seconds.</span>
        </h1>

        <form onSubmit={check} className="checker">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            aria-label="Email address to verify"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" disabled={loading || !email.trim()}>
            {loading ? 'Checking…' : 'Check it'}
          </button>
        </form>

        <p className="hint">One email at a time. Need to check a whole list? It's free to sign up.</p>

        {error && <div className="error">{error}</div>}
        {result && <ResultCard result={result} />}
      </section>

      {/* ---------- THE HONEST PITCH ---------- */}
      <section className="pitch">
        <h2>Every email checker claims 99% accuracy.</h2>
        <p className="big">
          Someone tested 15 of them on 3,000 real business emails.
          <strong> The best one got 70%.</strong>
        </p>
        <p>
          That's why your "verified" list still bounced. It isn't your bad luck — it's the
          whole industry rounding its numbers up.
        </p>

        <div className="three">
          <div>
            <h3>We check twice</h3>
            <p>
              Risky addresses go through more than one independent engine. If they disagree, we
              say so instead of guessing in our own favour.
            </p>
          </div>
          <div>
            <h3>We show our working</h3>
            <p>
              Every result comes with a score out of 100 and the actual reason. Never a bare
              one-word answer with the doubt hidden inside it.
            </p>
          </div>
          <div>
            <h3>We refund our mistakes</h3>
            <p>
              If we call an address good and it bounces, you get your credits back. No other
              verifier does this.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section className="pricing" id="pricing">
        <h2>Pricing</h2>
        <p className="sub">No per-seat fees. No expiring credits. Cancel any time.</p>

        <div className="plans">
          <div className="plan">
            <h3>Free</h3>
            <p className="price">$0</p>
            <p className="cap">500 emails a day</p>
            <ul>
              <li>Bulk list upload</li>
              <li>Full results with reasons</li>
              <li>API access</li>
              <li>No credit card</li>
            </ul>
            <a className="cta ghost" href="/signup">Create free account</a>
          </div>

          <div className="plan featured">
            <span className="badge">Most popular</span>
            <h3>Starter</h3>
            <p className="price">$5<span>/mo</span></p>
            <p className="cap">5,000 emails a day</p>
            <ul>
              <li>Everything in Free</li>
              <li>150,000 a month</li>
              <li>Priority queue</li>
              <li>Bounce refund guarantee</li>
            </ul>
            <a className="cta" href="/signup?plan=starter">Get Starter</a>
          </div>

          <div className="plan">
            <h3>Pro</h3>
            <p className="price">$9<span>/mo</span></p>
            <p className="cap">15,000 emails a day</p>
            <ul>
              <li>Everything in Starter</li>
              <li>450,000 a month</li>
              <li>Catch-all Deep Verify</li>
              <li>Email support</li>
            </ul>
            <a className="cta" href="/signup?plan=pro">Get Pro</a>
          </div>
        </div>

        <p className="compare">
          At full use, Pro works out at <strong>$0.00002 per email</strong>. The cheapest big
          competitor charges <strong>$0.000359</strong>. That's 18 times more.
        </p>
      </section>
    </main>
  )
}

/** The result panel. Honesty lives here - never dress up a bad answer. */
function ResultCard({ result }: { result: PublicResult }) {
  const label = {
    valid: 'Looks good',
    invalid: 'Dead address',
    catch_all: "Can't be confirmed",
    unknown: "We don't know",
  }[result.verdict]

  return (
    <div className={`result ${result.verdict}`} role="status">
      <div className="result-head">
        <strong>{label}</strong>
        <span className="score">{result.confidence}/100 confident</span>
      </div>

      <p className="email">{result.email}</p>

      <ul className="reasons">
        {result.reasons.map((reason, i) => (
          <li key={i}>{reason}</li>
        ))}
      </ul>

      {/* Catch-all is where competitors lie. We explain it instead. */}
      {result.verdict === 'catch_all' && (
        <p className="note">
          This domain accepts mail to <em>any</em> address, so no tool on earth can confirm this
          specific mailbox. Most verifiers mark these "valid" anyway — that's where your bounces
          come from.
        </p>
      )}

      <p className="remaining">
        {result.checksRemaining > 0
          ? `${result.checksRemaining} free checks left today.`
          : 'That was your last free check today. '}
        {result.checksRemaining <= 2 && <a href="/signup">Get 500 a day, free →</a>}
      </p>
    </div>
  )
}

import type { Metadata } from 'next'
import './globals.css'

/**
 * SEO note: the title and description below target the exact phrases
 * people search when they've been burned - "is this email valid",
 * "check if email exists". Don't replace them with brand-only copy.
 */
export const metadata: Metadata = {
  title: 'Check if an email is real — free, no signup',
  description:
    'Verify any email address instantly. No signup, no card. We check twice, show you why, and refund you when we get it wrong.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/" className="logo">
            {/* TODO(build): your brand name goes here */}
            MailCheck
          </a>
          <nav>
            <a href="/#pricing">Pricing</a>
            <a href="/tools">Free tools</a>
            <a href="/docs">API</a>
            <a href="/login" className="nav-cta">Sign in</a>
          </nav>
        </header>

        {children}

        <footer className="site-footer">
          <p>
            We publish our real accuracy. <a href="/benchmark">See the numbers</a>.
          </p>
          <p className="small">
            Uploaded lists are deleted automatically after 30 days.{' '}
            <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/aup">Acceptable use</a>
          </p>
        </footer>
      </body>
    </html>
  )
}

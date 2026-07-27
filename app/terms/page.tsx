import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — GlowQR',
  description: 'Terms of Service for GlowQR.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <LandingNavbar forceScrolled={true} />
      <main className="flex-1 mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8 w-full">
        <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-[var(--text-primary)]">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-[var(--text-primary)]">1. Acceptance of Terms</h2>
          <p>By accessing or using GlowQR ("the Service"), operated by GlowQR, Lucknow, you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

          <h2 className="text-[var(--text-primary)]">2. Description of Service</h2>
          <p>GlowQR provides QR code-based tools that help businesses collect AI-assisted Google reviews from their customers, along with analytics, GMB health scoring, and related dashboard features.</p>

          <h2 className="text-[var(--text-primary)]">3. Account & Subscription</h2>
          <p>Access to GlowQR requires business registration on our platform. Subscription plans (Trial, Basic, Premium) are billed as described on our Pricing page. Trial access is limited to 3 days or 5 AI-generated reviews, whichever comes first.</p>

          <h2 className="text-[var(--text-primary)]">4. Payments</h2>
          <p>Payments are processed via UPI. Manual verification may apply. All fees are non-refundable except where required by law.</p>

          <h2 className="text-[var(--text-primary)]">5. Acceptable Use</h2>
          <p>You agree not to use GlowQR to generate fake, misleading, or fraudulent reviews, or to violate Google's review policies. GlowQR reserves the right to suspend accounts found violating this clause.</p>

          <h2 className="text-[var(--text-primary)]">6. Content Ownership</h2>
          <p>Businesses retain ownership of their menu/service data uploaded to GlowQR. AI-generated review text is provided as a tool to assist customers and is not owned exclusively by either party.</p>

          <h2 className="text-[var(--text-primary)]">7. Limitation of Liability</h2>
          <p>GlowQR is provided "as is." We do not guarantee specific review counts, Google ranking outcomes, or uninterrupted service availability.</p>

          <h2 className="text-[var(--text-primary)]">8. Termination</h2>
          <p>GlowQR may suspend or terminate accounts that violate these terms or engage in abusive/fraudulent activity.</p>

          <h2 className="text-[var(--text-primary)]">9. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance.</p>

          <h2 className="text-[var(--text-primary)]">10. Contact</h2>
          <p>For questions, contact us at hello@glowqr.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

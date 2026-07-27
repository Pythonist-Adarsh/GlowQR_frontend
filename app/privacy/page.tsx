import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — GlowQR',
  description: 'Privacy Policy for GlowQR.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <LandingNavbar forceScrolled={true} />
      <main className="flex-1 mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8 w-full">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-[var(--text-primary)]">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-[var(--text-primary)]">1. Information We Collect</h2>
          <p>We collect business information (name, contact, category), customer scan/review interaction data, and payment verification details (UPI transaction ID) necessary to operate the Service.</p>
          
          <h2 className="text-[var(--text-primary)]">2. How We Use Information</h2>
          <ul>
            <li>To generate AI-assisted reviews</li>
            <li>To provide analytics and GMB health scoring</li>
            <li>To send transactional emails (via Resend)</li>
            <li>To verify payments and manage subscriptions</li>
          </ul>

          <h2 className="text-[var(--text-primary)]">3. Data Sharing</h2>
          <p>We do not sell your data. We may share limited data with third-party service providers (e.g., Groq, DeepInfra for AI processing; Google Places API for scoring) solely to deliver the Service.</p>

          <h2 className="text-[var(--text-primary)]">4. Data Storage</h2>
          <p>Data is stored securely using Supabase (PostgreSQL) and hosted infrastructure on Render and Vercel.</p>

          <h2 className="text-[var(--text-primary)]">5. Cookies & Analytics</h2>
          <p>We use Google Analytics (GA4) to understand site usage. You can disable cookies via your browser settings.</p>

          <h2 className="text-[var(--text-primary)]">6. Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your business data by contacting hello@glowqr.com.</p>

          <h2 className="text-[var(--text-primary)]">7. Data Retention</h2>
          <p>We retain data for as long as your account is active or as needed to provide the Service, unless deletion is requested.</p>

          <h2 className="text-[var(--text-primary)]">8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. Continued use of GlowQR after changes constitutes acceptance.</p>

          <h2 className="text-[var(--text-primary)]">9. Contact</h2>
          <p>For privacy concerns, contact us at hello@glowqr.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

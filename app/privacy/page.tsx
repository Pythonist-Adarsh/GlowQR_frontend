import { PageWrapper } from '@/components/PageWrapper'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — GlowQR',
  description: 'Privacy Policy for GlowQR.',
}

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <LandingNavbar />
      <main className="mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>This is a minimal privacy policy for GlowQR.</p>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, update your profile, or use our services.</p>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services.</p>
          <h2>3. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  )
}

import { PageWrapper } from '@/components/PageWrapper'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — GlowQR',
  description: 'Terms of Service for GlowQR.',
}

export default function TermsPage() {
  return (
    <PageWrapper>
      <LandingNavbar />
      <main className="mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>This is a minimal terms of service for GlowQR.</p>
          <h2>1. Terms</h2>
          <p>By accessing the website at GlowQR, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on GlowQR's website for personal, non-commercial transitory viewing only.</p>
          <h2>3. Disclaimer</h2>
          <p>The materials on GlowQR's website are provided on an 'as is' basis. GlowQR makes no warranties, expressed or implied.</p>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  )
}

'use client'

import { PageWrapper } from '@/components/PageWrapper'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Hero } from '@/components/landing/Hero'
import { FeatureIntro } from '@/components/landing/FeatureIntro'
import { CoreQr } from '@/components/landing/CoreQr'
import { FeaturesGrid } from '@/components/landing/FeaturesGrid'
import { MobilePreview } from '@/components/landing/MobilePreview'
import { UseCases } from '@/components/landing/UseCases'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Pricing } from '@/components/landing/Pricing'
import { DashboardPreview } from '@/components/landing/DashboardPreview'
import { TrustedBy } from '@/components/landing/TrustedBy'
import { Testimonials } from '@/components/landing/Testimonials'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'
export function LandingPage() {
  return (
    <PageWrapper>
      <LandingNavbar />
      <main>
        <Hero />
        <FeatureIntro />
        <CoreQr />
        <FeaturesGrid />
        <MobilePreview />
        <UseCases />
        <HowItWorks />
        <section id="dashboard-preview">
          <DashboardPreview />
        </section>
        <Pricing />
        <TrustedBy />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </PageWrapper>
  )
}

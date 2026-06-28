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
import { Testimonials } from '@/components/landing/Testimonials'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'

export function LandingPage() {
  return (
    <PageWrapper>
      <LandingNavbar />
      <main>
        <Hero />
        <section id="demo" className="py-20 md:py-28 bg-[var(--bg-secondary)] border-b border-[var(--border-default)]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl mb-8">See GlowQR in Action</h2>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-card)]">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="GlowQR Demo Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
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
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </PageWrapper>
  )
}

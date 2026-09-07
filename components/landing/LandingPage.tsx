'use client'

import { useState, useEffect } from 'react'
import { PageWrapper } from '@/components/PageWrapper'
import { X } from 'lucide-react'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'
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
  const [showSticky, setShowSticky] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <section className="py-24 px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Ready to get started?
            </h2>
            <div className="flex justify-center">
              <AnimatedGetStartedButton size="lg">Start Free Trial →</AnimatedGetStartedButton>
            </div>
          </div>
        </section>
        <section id="dashboard-preview">
          <DashboardPreview />
        </section>
        <Pricing />
        <TrustedBy />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      {showSticky && !dismissed && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1A8A3C] p-2 pl-5 rounded-full shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-8">
          <a href="/register" className="text-sm font-bold text-white transition-opacity hover:opacity-80">
            Start Free Trial
          </a>
          <button 
            onClick={() => setDismissed(true)} 
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white/80 transition-colors hover:bg-black/40 hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </PageWrapper>
  )
}

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
import { MessageCircle, Mail } from 'lucide-react'

export function LandingPage() {
  return (
    <PageWrapper>
      <LandingNavbar />
      <main>
        <Hero />
        <section id="demo" className="py-20 md:py-28 bg-[var(--bg-secondary)] border-b border-[var(--border-default)]">
          <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-12 h-12 mx-auto bg-[#1A8A3C]/20 border border-[#1A8A3C]/30 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl mb-4">See GlowQR in Action</h2>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              Request a personalized interactive demo of our platform. We'll send you a private link to explore the full experience.
            </p>
            <div className="space-y-4">
              <a 
                href="https://wa.me/?text=Hi%20GlowQR,%20I'd%20love%20to%20see%20a%20demo%20of%20your%20platform!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div className="text-left">
                  <p className="text-base font-bold text-[var(--text-primary)] mb-1">Request via WhatsApp</p>
                  <p className="text-xs text-[#25D366] uppercase tracking-wider font-semibold">Fastest Response</p>
                </div>
              </a>

              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@glowqr.com&su=Requesting%20GlowQR%20Demo&body=Hi%20GlowQR%20team,%0A%0AI%20would%20love%20to%20see%20a%20personalized%20interactive%20demo%20of%20your%20platform.%0A%0AThanks!" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-base font-bold text-[var(--text-primary)] mb-1">Email hello@glowqr.com</p>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold">We typically reply in 2 hours</p>
                </div>
              </a>
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

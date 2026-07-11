'use client'

import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import { Pricing } from '@/components/landing/Pricing'
import { CheckCircle2 } from 'lucide-react'

export default function PricingPage() {
  const trustStatements = [
    "AI review generation included in every plan — no hidden upgrade, no asterisk",
    "Yearly price locked for 12 months — no surprise renewal hike",
    "Cancel anytime, no long-term contract"
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <LandingNavbar />
      
      <main className="flex-1 pt-24 pb-12">
        <Pricing />
        
        {/* Trust Statements Enhancement */}
        <div className="max-w-4xl mx-auto px-6 pb-20 mt-8">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-3xl p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-8 text-center text-[var(--text-primary)]">No surprises. Just results.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {trustStatements.map((statement, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-3">
                  <div className="shrink-0 bg-green-100 p-3 rounded-full text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed">
                    {statement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

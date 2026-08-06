import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'
import { MeetTheFounder } from '@/components/about/MeetTheFounder'
import { Check, X } from 'lucide-react'

export const metadata = {
  title: "About GlowQR — AI Review Platform for Indian Local Businesses",
  description: "GlowQR was built to help Indian restaurants, salons, cafes and clinics collect more Google reviews automatically using AI and smart QR codes.",
  alternates: {
    canonical: 'https://www.glowqr.com/about',
  }
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Adarsh",
  "jobTitle": "Founder & CEO",
  "worksFor": {
    "@type": "Organization",
    "name": "GlowQR",
    "url": "https://glowqr.com"
  },
  "description": "Founder of GlowQR — an AI-powered QR code platform that helps local businesses collect Google reviews effortlessly.",
  "url": "https://glowqr.com",
  "sameAs": [
    "https://www.instagram.com/solojourney.ai",
    "https://www.linkedin.com/in/adarsh-tiwari-78271a266"
  ],
  "image": "https://www.glowqr.com/adarsh-tiwari-founder-glowqr.png"
}

export default function AboutPage() {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased min-h-screen transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <LandingNavbar forceScrolled={true} />
      
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-20 mt-10">
          <span className="inline-block border border-[var(--border-default)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] rounded-full mb-6">
            OUR STORY
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl mb-4">
            Built for every local business that<br/>
            <span className="text-[var(--brand-primary)]">deserves to be found</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mt-6 leading-relaxed">
            GlowQR is a SaaS platform that turns a customer's genuine experience into a published Google review — in under 60 seconds, without awkward asks.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-6">Mission</h2>
          <div className="bg-[var(--bg-secondary)] p-8 md:p-10 rounded-3xl border border-[var(--border-default)]">
            <p className="text-[var(--text-primary)] text-lg leading-relaxed font-medium mb-6">
              Local businesses in India run on trust and word-of-mouth — but most of that praise <span className="text-[var(--brand-primary)] font-bold">never makes it online</span>. A satisfied customer leaves, life moves on, and the blank-page friction of writing a review wins every time.
            </p>
            <p className="text-[var(--text-primary)] text-lg leading-relaxed font-medium">
              We built GlowQR to close that gap. Our platform gives every restaurant, salon, clinic, and cafe an <span className="text-[var(--brand-primary)] font-bold">AI-powered review assistant</span> that meets customers exactly where they are — right after a great experience, phone in hand — and helps them say what they already felt, in their own words, in seconds.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-6">The Problem We Solve</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-red-500/20 shadow-sm backdrop-blur-sm">
              <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-6">Before GlowQR</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-[var(--text-secondary)]"><X className="w-5 h-5 text-red-500 shrink-0"/> Customers leave happy but never leave a review</li>
                <li className="flex gap-3 text-sm text-[var(--text-secondary)]"><X className="w-5 h-5 text-red-500 shrink-0"/> Blank page friction kills the intent to write</li>
                <li className="flex gap-3 text-sm text-[var(--text-secondary)]"><X className="w-5 h-5 text-red-500 shrink-0"/> 1-3 star rants appear on Google publicly</li>
                <li className="flex gap-3 text-sm text-[var(--text-secondary)]"><X className="w-5 h-5 text-red-500 shrink-0"/> Owner has no idea where returning customers fall</li>
              </ul>
            </div>
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-[var(--brand-primary)]/20 shadow-sm backdrop-blur-sm">
              <h3 className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-widest mb-6">With GlowQR</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-[var(--text-secondary)]"><Check className="w-5 h-5 text-[var(--brand-primary)] shrink-0"/> Customer scans QR, sees AR brand moment</li>
                <li className="flex gap-3 text-sm text-[var(--text-secondary)]"><Check className="w-5 h-5 text-[var(--brand-primary)] shrink-0"/> AI drafts a review based on their exact order</li>
                <li className="flex gap-3 text-sm text-[var(--text-secondary)]"><Check className="w-5 h-5 text-[var(--brand-primary)] shrink-0"/> Negative feedback goes to private inbox, not Google</li>
                <li className="flex gap-3 text-sm text-[var(--text-secondary)]"><Check className="w-5 h-5 text-[var(--brand-primary)] shrink-0"/> Dashboard shows scan timelines and top-performing tables</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-6">Why It Matters for Indian Businesses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-default)] text-center">
              <div className="text-3xl font-black text-[var(--text-primary)] mb-2">1 Billion+</div>
              <div className="text-xs font-bold text-[var(--text-tertiary)] uppercase">Google searches happen every day in India</div>
            </div>
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-default)] text-center">
              <div className="text-3xl font-black text-[var(--text-primary)] mb-2">95%</div>
              <div className="text-xs font-bold text-[var(--text-tertiary)] uppercase">Consumers read reviews before visiting</div>
            </div>
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-default)] text-center">
              <div className="text-3xl font-black text-[var(--text-primary)] mb-2">4.8★</div>
              <div className="text-xs font-bold text-[var(--text-tertiary)] uppercase">Average minimum expected review</div>
            </div>
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-default)] text-center">
              <div className="text-3xl font-black text-[var(--text-primary)] mb-2">30s</div>
              <div className="text-xs font-bold text-[var(--text-tertiary)] uppercase">Time to publish using GlowQR AI</div>
            </div>
          </div>
        </section>

        {/* Meet the Founder Section */}
        <MeetTheFounder />

        <div className="mt-32 text-center bg-[var(--bg-secondary)] p-12 rounded-3xl border border-[var(--border-default)] shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Start your 3-day free trial today</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-8">No credit card. No setup fees. Full premium access for a week.</p>
          <AnimatedGetStartedButton size="lg">Get Started Free</AnimatedGetStartedButton>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

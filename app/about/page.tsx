import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'
import { Check, X } from 'lucide-react'

export const metadata = {
  title: 'About Us | GlowQR',
  description: 'Built for every local business that deserves to be found.',
}

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAFA] text-[#111111] antialiased min-h-screen">
      {/* Light theme override for the navbar */}
      <div className="bg-[#111111]">
         <LandingNavbar />
      </div>
      
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-20 mt-10">
          <span className="inline-block border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 rounded-full mb-6">
            OUR STORY
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            Built for every local business that<br/>
            <span className="text-emerald-600">deserves to be found</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            GlowQR is a Lucknow-born SaaS that turns a customer's genuine experience into a published Google review — in under 60 seconds, without awkward asks.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Mission</h2>
          <div className="bg-[#F3EFE9] p-8 md:p-10 rounded-3xl border border-[#E8E4DE]">
            <p className="text-slate-800 text-lg leading-relaxed font-medium mb-6">
              Local businesses in India run on trust and word-of-mouth — but most of that praise <span className="text-emerald-700 font-bold">never makes it online</span>. A satisfied customer leaves, life moves on, and the blank-page friction of writing a review wins every time.
            </p>
            <p className="text-slate-800 text-lg leading-relaxed font-medium">
              We built GlowQR to close that gap. Our platform gives every restaurant, salon, clinic, and cafe an <span className="text-emerald-700 font-bold">AI-powered review assistant</span> that meets customers exactly where they are — right after a great experience, phone in hand — and helps them say what they already felt, in their own words, in seconds.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">The Problem We Solve</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm">
              <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-6">Before GlowQR</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-slate-600"><X className="w-5 h-5 text-red-400 shrink-0"/> Customers leave happy but never leave a review</li>
                <li className="flex gap-3 text-sm text-slate-600"><X className="w-5 h-5 text-red-400 shrink-0"/> Blank page friction kills the intent to write</li>
                <li className="flex gap-3 text-sm text-slate-600"><X className="w-5 h-5 text-red-400 shrink-0"/> 1-3 star rants appear on Google publicly</li>
                <li className="flex gap-3 text-sm text-slate-600"><X className="w-5 h-5 text-red-400 shrink-0"/> Owner has no idea where returning customers fall</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm">
              <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6">With GlowQR</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-slate-600"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> Customer scans QR, sees AR brand moment</li>
                <li className="flex gap-3 text-sm text-slate-600"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> AI drafts a review based on their exact order</li>
                <li className="flex gap-3 text-sm text-slate-600"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> Negative feedback goes to private inbox, not Google</li>
                <li className="flex gap-3 text-sm text-slate-600"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> Dashboard shows scan timelines and top-performing tables</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Why It Matters for Indian Businesses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#E8E4DE] text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">63M+</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Searches on local maps everyday</div>
            </div>
            <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#E8E4DE] text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">87%</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Consumers read reviews before visiting</div>
            </div>
            <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#E8E4DE] text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">4.4★</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Average minimum expected review</div>
            </div>
            <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#E8E4DE] text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">80s</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Time to publish using GlowQR AI</div>
            </div>
          </div>
        </section>

        <div className="mt-32 text-center bg-[#F3EFE9] p-12 rounded-3xl border border-[#E8E4DE]">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Start your 7-day free trial today</h2>
          <p className="text-sm text-slate-600 mb-8">No credit card. No setup fees. Full premium access for a week.</p>
          <AnimatedGetStartedButton size="lg">Get Started Free</AnimatedGetStartedButton>
        </div>
      </main>
      
      <div className="bg-[#111111]">
        <Footer />
      </div>
    </div>
  )
}

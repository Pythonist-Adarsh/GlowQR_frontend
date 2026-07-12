import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'
import { ContactForm } from '@/components/contact/ContactForm'
import { MessageSquare, Mail, FormInput, MapPin, Clock, CreditCard, Handshake, ChevronDown } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | GlowQR',
  description: 'We reply fast. Usually within a few hours.',
}

export default function ContactPage() {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased min-h-screen transition-colors duration-300">
      <LandingNavbar forceScrolled={true} />
      
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-16 mt-10">
          <span className="inline-block border border-[var(--border-default)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] rounded-full mb-6">
            CONTACT US
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl mb-4">
            We reply fast.<br/>
            <span className="text-[var(--brand-primary)]">Usually within a few hours.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mt-6">
            Whether you have a question, a payment issue, or just want to understand if GlowQR is right for your business — reach out on any channel below.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-6">Choose your channel</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-[var(--brand-primary)]/20 shadow-sm text-center backdrop-blur-sm">
              <MessageSquare className="w-8 h-8 text-[var(--brand-primary)] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">WhatsApp</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">Fastest response. Send us a message and we typically reply within 30 minutes during business hours.</p>
              <button className="px-6 py-2 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)]/20 transition-colors">Chat Now</button>
            </div>
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-[var(--border-default)] shadow-sm text-center backdrop-blur-sm">
              <Mail className="w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Email</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">For detailed queries, billing questions, or feature requests. We reply within 2–4 hours on weekdays.</p>
              <button className="px-6 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--border-default)] hover:bg-[var(--border-default)] transition-colors">hello@glowqr.in</button>
            </div>
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-[var(--border-default)] shadow-sm text-center backdrop-blur-sm">
              <FormInput className="w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Contact Form</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">Prefer a form? Fill it below and we will get back to you by email or WhatsApp, whichever you prefer.</p>
              <button className="px-6 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--border-default)] hover:bg-[var(--border-default)] transition-colors">Fill Form</button>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-6">Our Response Commitment</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-default)] text-center">
              <div className="text-2xl font-black text-[var(--text-primary)] mb-1">~30 min</div>
              <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">WhatsApp reply during business hours</div>
            </div>
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-default)] text-center">
              <div className="text-2xl font-black text-[var(--text-primary)] mb-1">2–4 hrs</div>
              <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Email response on weekdays</div>
            </div>
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-default)] text-center">
              <div className="text-2xl font-black text-[var(--text-primary)] mb-1">2–4 hrs</div>
              <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Plan activation after payment verified</div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-6">Send Us A Message</h2>
          <ContactForm />
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-6">Find Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-[var(--border-default)] shadow-sm backdrop-blur-sm">
              <MapPin className="w-6 h-6 text-[var(--brand-primary)] mb-4" />
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Office location</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Lucknow, Uttar Pradesh, India.<br/>We do in-person demos for Lucknow businesses — book a slot on WhatsApp.</p>
            </div>
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-[var(--border-default)] shadow-sm backdrop-blur-sm">
              <Clock className="w-6 h-6 text-[var(--brand-primary)] mb-4" />
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Support hours</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Monday – Saturday<br/>10:00 AM – 8:00 PM IST<br/><br/>Sunday responses may be delayed.</p>
            </div>
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-[var(--border-default)] shadow-sm backdrop-blur-sm">
              <CreditCard className="w-6 h-6 text-[var(--brand-primary)] mb-4" />
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Payment queries</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Paid via UPI but plan not activated? Send your UTR number to billing@glowqr.in and we activate within 30 minutes.</p>
            </div>
            <div className="bg-[var(--bg-glass)] p-8 rounded-3xl border border-[var(--border-default)] shadow-sm backdrop-blur-sm">
              <Handshake className="w-6 h-6 text-[var(--brand-primary)] mb-4" />
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Partnerships & resellers</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Want to resell GlowQR to local businesses in your city? Email partner@glowqr.in — we have a generous tier program.</p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-6">Quick Answers</h2>
          <div className="bg-[var(--bg-glass)] rounded-3xl border border-[var(--border-default)] shadow-sm overflow-hidden divide-y divide-[var(--border-default)] backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between cursor-pointer group">
                <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">I paid via UPI but my plan is still showing trial. What can I do?</h3>
                <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-4 leading-relaxed">Send your UTR (12-digit transaction reference) to billing@glowqr.in or on WhatsApp. We verify and activate your plan within 30 minutes — usually faster.</p>
            </div>
            {[
              "Can I request a live demo before buying?",
              "How do I cancel my plan?",
              "Something on my dashboard is broken. What should I do?",
              "Can I use GlowQR for multiple branches?"
            ].map((q, i) => (
              <div key={i} className="p-6">
                <div className="flex items-center justify-between cursor-pointer group">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">{q}</h3>
                  <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-32 flex flex-col md:flex-row items-center justify-between bg-[var(--bg-secondary)] p-8 md:p-12 rounded-3xl border border-[var(--border-default)] shadow-sm">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Not sure if GlowQR is right for you?</h2>
            <p className="text-sm text-[var(--text-secondary)]">Start the free 3-day trial — no card, no commitment. See results in 48 hours.</p>
          </div>
          <AnimatedGetStartedButton size="md">Start free trial</AnimatedGetStartedButton>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

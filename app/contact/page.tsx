import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'
import { Mail, MessageSquare, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | GlowQR',
  description: 'Get in touch with the GlowQR team.',
}

export default function ContactPage() {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-[var(--brand-primary)] selection:text-white dark">
      <LandingNavbar />
      
      <main className="mx-auto max-w-4xl px-6 py-32 sm:py-40">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">Get in touch</h1>
          <p className="text-lg text-slate-400">Have questions about GlowQR? We're here to help.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-[#111111] p-8 rounded-2xl border border-white/10 text-center">
            <Mail className="w-8 h-8 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
            <p className="text-sm text-slate-400 mb-4">For general inquiries and support.</p>
            <a href="mailto:hello@glowqr.com" className="font-medium text-white hover:underline">hello@glowqr.com</a>
          </div>
          
          <div className="bg-[#111111] p-8 rounded-2xl border border-white/10 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-bold text-white mb-2">WhatsApp Support</h3>
            <p className="text-sm text-slate-400 mb-4">Fast responses for our premium members.</p>
            <p className="font-medium text-white">Available in Dashboard</p>
          </div>
          
          <div className="bg-[#111111] p-8 rounded-2xl border border-white/10 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-bold text-white mb-2">Office</h3>
            <p className="text-sm text-slate-400">Lucknow, India<br/>Building products for the world.</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to see the difference?</h2>
          <AnimatedGetStartedButton size="lg">Start your 7-day free trial</AnimatedGetStartedButton>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

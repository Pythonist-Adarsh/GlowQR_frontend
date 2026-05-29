import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'
import { MessageSquare, Mail, FormInput, MapPin, Clock, CreditCard, Handshake, ChevronDown } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | GlowQR',
  description: 'We reply fast. Usually within a few hours.',
}

export default function ContactPage() {
  return (
    <div className="bg-[#FAFAFA] text-[#111111] antialiased min-h-screen">
      {/* Light theme override for the navbar */}
      <div className="bg-[#111111]">
         <LandingNavbar />
      </div>
      
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-16 mt-10">
          <span className="inline-block border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 rounded-full mb-6">
            CONTACT US
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            We reply fast.<br/>
            <span className="text-emerald-600">Usually within a few hours.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
            Whether you have a question, a payment issue, or just want to understand if GlowQR is right for your business — reach out on any channel below.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Choose your channel</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-sm text-center">
              <MessageSquare className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">WhatsApp</h3>
              <p className="text-sm text-slate-500 mb-6">Fastest response. Send us a message and we typically reply within 30 minutes during business hours.</p>
              <button className="px-6 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors">Chat Now</button>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
              <Mail className="w-8 h-8 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
              <p className="text-sm text-slate-500 mb-6">For detailed queries, billing questions, or feature requests. We reply within 2–4 hours on weekdays.</p>
              <button className="px-6 py-2 bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">hello@glowqr.in</button>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
              <FormInput className="w-8 h-8 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Contact Form</h3>
              <p className="text-sm text-slate-500 mb-6">Prefer a form? Fill it below and we will get back to you by email or WhatsApp, whichever you prefer.</p>
              <button className="px-6 py-2 bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">Fill Form</button>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Our Response Commitment</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#E8E4DE] text-center">
              <div className="text-2xl font-black text-slate-900 mb-1">~30 min</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">WhatsApp reply during business hours</div>
            </div>
            <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#E8E4DE] text-center">
              <div className="text-2xl font-black text-slate-900 mb-1">2–4 hrs</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email response on weekdays</div>
            </div>
            <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#E8E4DE] text-center">
              <div className="text-2xl font-black text-slate-900 mb-1">2–4 hrs</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan activation after payment verified</div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Send Us A Message</h2>
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">What can we help with?</h3>
            <p className="text-sm text-slate-500 mb-8">Pick a topic below so we route your message to the right person.</p>
            
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Topic</p>
              <div className="flex flex-wrap gap-2">
                {['General query', 'Upgrade / payment', 'Technical issue', 'Demo request', 'Partnership'].map(topic => (
                  <button key={topic} className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${topic === 'General query' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Your Name</label>
                  <input type="text" placeholder="Rahul Sharma" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-400 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Business Name</label>
                  <input type="text" placeholder="The Velvet Lounge" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-400 outline-none transition-all" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Phone / WhatsApp</label>
                  <input type="text" placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-400 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Email</label>
                  <input type="email" placeholder="you@yourbusiness.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-400 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Current Plan</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-400 outline-none transition-all appearance-none">
                  <option>Not a customer yet</option>
                  <option>Free Trial</option>
                  <option>Basic Plan</option>
                  <option>Premium Plan</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Your Message</label>
                <textarea placeholder="Tell us what's going on. The more detail, the faster we can help." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-400 outline-none transition-all h-32"></textarea>
              </div>
              <div className="flex items-center justify-between pt-4">
                <p className="text-[10px] text-slate-400 italic">We never share your data.</p>
                <button type="button" className="px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors shadow-md">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Find Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <MapPin className="w-6 h-6 text-emerald-500 mb-4" />
              <h3 className="text-sm font-bold text-slate-900 mb-2">Office location</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Lucknow, Uttar Pradesh, India.<br/>We do in-person demos for Lucknow businesses — book a slot on WhatsApp.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <Clock className="w-6 h-6 text-emerald-500 mb-4" />
              <h3 className="text-sm font-bold text-slate-900 mb-2">Support hours</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Monday – Saturday<br/>10:00 AM – 8:00 PM IST<br/><br/>Sunday responses may be delayed.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <CreditCard className="w-6 h-6 text-emerald-500 mb-4" />
              <h3 className="text-sm font-bold text-slate-900 mb-2">Payment queries</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Paid via UPI but plan not activated? Send your UTR number to billing@glowqr.in and we activate within 30 minutes.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <Handshake className="w-6 h-6 text-emerald-500 mb-4" />
              <h3 className="text-sm font-bold text-slate-900 mb-2">Partnerships & resellers</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Want to resell GlowQR to local businesses in your city? Email partner@glowqr.in — we have a generous tier program.</p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Quick Answers</h2>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            <div className="p-6">
              <div className="flex items-center justify-between cursor-pointer group">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">I paid via UPI but my plan is still showing trial. What can I do?</h3>
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-600 mt-4 leading-relaxed">Send your UTR (12-digit transaction reference) to billing@glowqr.in or on WhatsApp. We verify and activate your plan within 30 minutes — usually faster.</p>
            </div>
            {[
              "Can I request a live demo before buying?",
              "How do I cancel my plan?",
              "Something on my dashboard is broken. What should I do?",
              "Can I use GlowQR for multiple branches?"
            ].map((q, i) => (
              <div key={i} className="p-6">
                <div className="flex items-center justify-between cursor-pointer group">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{q}</h3>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-32 flex items-center justify-between bg-[#F3EFE9] p-8 md:p-12 rounded-3xl border border-[#E8E4DE]">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Not sure if GlowQR is right for you?</h2>
            <p className="text-sm text-slate-600">Start the free 7-day trial — no card, no commitment. See results in 48 hours.</p>
          </div>
          <AnimatedGetStartedButton size="md">Start free trial</AnimatedGetStartedButton>
        </div>
      </main>
      
      <div className="bg-[#111111]">
        <Footer />
      </div>
    </div>
  )
}

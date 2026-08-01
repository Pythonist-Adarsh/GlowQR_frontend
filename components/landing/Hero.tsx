'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Button } from '@/components/ui/Button'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'
import { MessageCircle, Mail, X } from 'lucide-react'

const logos = ['Google']

export function Hero() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <section className="relative overflow-hidden pt-28 pb-20 md:pb-28 section-dark">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{ backgroundImage: 'var(--noise)' }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-brand-accent"
          >
            AI-powered reviews
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            The AI-Powered QR Review Platform for{' '}
            <span className="gradient-text">Modern Businesses</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-neutral-400 md:text-xl"
          >
            Turn every scan into glowing reviews across Google Reviews —
            with AI-crafted copy your customers can post in seconds.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <AnimatedGetStartedButton size="lg">Start free trial</AnimatedGetStartedButton>
            <button
              type="button"
              className="min-w-[200px] h-14 inline-flex items-center justify-center rounded-2xl font-bold transition-all px-8 text-base border border-white/10 bg-white/5 text-white hover:bg-white/10"
              onClick={() => setShowDemoModal(true)}
            >
              View demo
            </button>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-8 text-sm font-medium text-neutral-500"
          >
            Trusted by restaurants, salons & clinics
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Platforms Section */}
    <section className="py-12 bg-[#0B0C10] border-b border-white/5 relative z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-6 text-center text-xs uppercase tracking-widest text-neutral-500">
            Optimized for Google Reviews — where Indian customers search first.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60 grayscale">
            {logos.map((name) => (
              <span
                key={name}
                className="font-display text-sm font-semibold text-neutral-400 md:text-base"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

      {/* View Demo Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {showDemoModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B0C10]/80 backdrop-blur-sm"
              onClick={() => setShowDemoModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md bg-[#13141A] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowDemoModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                <div className="w-12 h-12 bg-[#1A8A3C]/20 border border-[#1A8A3C]/30 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">See GlowQR in Action</h3>
                <p className="text-sm text-neutral-400 mb-8 leading-relaxed">
                  Request a personalized interactive demo of our platform. We'll send you a private link to explore the full experience.
                </p>

                <div className="space-y-3">
                  <a 
                    href="https://wa.me/?text=Hi%20GlowQR,%20I'd%20love%20to%20see%20a%20demo%20of%20your%20platform!" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white mb-0.5">Request via WhatsApp</p>
                      <p className="text-[11px] text-[#25D366] uppercase tracking-wider font-semibold">Fastest Response</p>
                    </div>
                  </a>

                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@glowqr.com&su=Requesting%20GlowQR%20Demo&body=Hi%20GlowQR%20team,%0A%0AI%20would%20love%20to%20see%20a%20personalized%20interactive%20demo%20of%20your%20platform.%0A%0AThanks!" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white mb-0.5">Email hello@glowqr.com</p>
                      <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">We typically reply in 2 hours</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

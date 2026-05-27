'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Button } from '@/components/ui/Button'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'

const logos = ['Google', 'Yelp', 'Facebook', 'TripAdvisor', 'Trustpilot']

export function Hero() {
  return (
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
            <Button
              variant="secondary"
              size="lg"
              className="min-w-[200px] border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              View demo
            </Button>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-8 text-sm font-medium text-neutral-500"
          >
            Trusted by restaurants, salons & clinics in Lucknow
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-16 md:mt-24"
        >
          <p className="mb-6 text-center text-xs uppercase tracking-widest text-neutral-500">
            Works with platforms you already use
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
  )
}

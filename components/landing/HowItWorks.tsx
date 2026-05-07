'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    step: '01',
    title: 'Generate',
    desc: 'Create your branded QR and AI prompts in minutes.',
    icon: '⚡',
  },
  {
    step: '02',
    title: 'Display',
    desc: 'Place codes on tables, receipts, packaging, or NFC stands.',
    icon: '🖼️',
  },
  {
    step: '03',
    title: 'Analyze',
    desc: 'Watch scans convert into reviews and actionable insights.',
    icon: '📈',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-[var(--border-default)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            How it works for your brand.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] md:text-lg">
            Three straightforward beats — no consultants required.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="relative rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-8 backdrop-blur-md"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-12 translate-x-full -translate-y-1/2 bg-gradient-to-r from-brand-primary/40 to-transparent md:block" />
              )}
              <span className="text-2xl">{s.icon}</span>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-primary">
                Step {s.step}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass-card mx-auto mt-14 max-w-3xl border-[var(--border-card)] bg-[var(--bg-secondary)] p-8 md:p-10"
        >
          <h3 className="font-display text-xl font-bold md:text-2xl">About GlowQR</h3>
          <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
            We built GlowQR because local brands deserve enterprise-grade tooling without enterprise
            bloat. Our mission is simple: help honest businesses capture the praise they already earn,
            amplify it responsibly with AI, and learn from every scan — so teams can iterate on
            hospitality, service, and product with clarity.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

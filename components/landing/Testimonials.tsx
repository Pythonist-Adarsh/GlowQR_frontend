'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

const quotes = [
  {
    name: 'Priya Desai',
    role: 'Owner, Neon Nights Bistro',
    avatar: 'PD',
    quote:
      'We tripled Google reviews in six weeks without hovering over tables. The AI drafts sound exactly like our guests.',
  },
  {
    name: 'Marcus Chen',
    role: 'COO, Harbor Hotels',
    avatar: 'MC',
    quote:
      'Premium QR flows match our brand voice. Ops finally sees scans tied to sentiment — not spreadsheet chaos.',
  },
  {
    name: 'Elena Roth',
    role: 'Marketing Lead, Apex Fitness',
    avatar: 'ER',
    quote:
      'Routing detractors privately saved our reputation twice this quarter. GlowQR pays for itself.',
  },
]

export function Testimonials() {
  return (
    <section className="border-b border-[var(--border-default)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">Still not convinced?</h2>
          <p className="mt-4 text-[var(--text-secondary)] md:text-lg">
            Operators worldwide use GlowQR to stack proof where shoppers actually look.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {quotes.map((q) => (
            <motion.figure
              key={q.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass-card flex flex-col border-[var(--border-card)] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent font-display text-sm font-bold text-white">
                  {q.avatar}
                </div>
                <div>
                  <figcaption className="font-semibold text-[var(--text-primary)]">{q.name}</figcaption>
                  <p className="text-xs text-[var(--text-tertiary)]">{q.role}</p>
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                “{q.quote}”
              </blockquote>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

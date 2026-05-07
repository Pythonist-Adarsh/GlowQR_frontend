'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

const cards = [
  {
    icon: '✨',
    title: 'AI review drafts',
    desc: 'Instant, on-brand suggestions customers can paste in one tap.',
    accent: 'from-orange-400/15 to-amber-900/10',
  },
  {
    icon: '🔗',
    title: 'One smart QR',
    desc: 'Route happy guests to Google, Yelp, Facebook — your rules.',
    accent: 'from-amber-600/15 to-orange-300/10',
  },
  {
    icon: '📊',
    title: 'Proof in analytics',
    desc: 'Scans, conversions, and sentiment trends in a glass dashboard.',
    accent: 'from-red-950/10 to-orange-400/15',
  },
]

const checklist = [
  'White-label flows & themes',
  'Staff alerts on low ratings',
  'Export-ready reporting',
  'GDPR-minded data handling',
]

export function FeatureIntro() {
  return (
    <section id="features" className="border-b border-[var(--border-default)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold tracking-tight md:text-4xl"
          >
            Turn every customer into an online review.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[var(--text-secondary)] md:text-lg">
            GlowQR bridges the gap between a great visit and a published five-star story — without
            awkward asks or blank-page friction.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className={`glass-card bg-gradient-to-br ${c.accent} p-8`}
            >
              <span className="text-3xl">{c.icon}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto mt-14 max-w-xl space-y-3"
        >
          {checklist.map((item) => (
            <motion.li
              key={item}
              variants={fadeUp}
              className="flex items-center gap-3 text-[var(--text-secondary)]"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-xs font-bold text-brand-primary">
                ✓
              </span>
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

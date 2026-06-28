'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Sparkles, QrCode, BarChart3 } from 'lucide-react'

const cards = [
  {
    icon: <Sparkles className="w-8 h-8 text-slate-800" />,
    title: 'AI review drafts',
    desc: 'Instant, on-brand suggestions customers can paste in one tap.',
    accent: 'from-slate-100 to-white',
  },
  {
    icon: <QrCode className="w-8 h-8 text-slate-800" />,
    title: 'One smart QR',
    desc: 'Route every happy guest straight to your Google Reviews page.',
    accent: 'from-slate-100 to-white',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-slate-800" />,
    title: 'Proof in analytics',
    desc: 'Scans, conversions, and sentiment trends in a glass dashboard.',
    accent: 'from-slate-100 to-white',
  },
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
              <div className="text-3xl flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100">{c.icon}</div>
              <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

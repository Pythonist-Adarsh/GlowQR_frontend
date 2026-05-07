'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'

const cases = [
  { icon: '🍽️', label: 'Restaurants' },
  { icon: '🛍️', label: 'Retail' },
  { icon: '🏨', label: 'Hotels' },
  { icon: '☕', label: 'Cafés' },
  { icon: '💇', label: 'Salons' },
  { icon: '🏥', label: 'Clinics' },
  { icon: '💪', label: 'Gyms' },
  { icon: '🚚', label: 'Food trucks' },
  { icon: '🎭', label: 'Experiences' },
  { icon: '🛠️', label: 'Home services' },
  { icon: '🎓', label: 'Studios & schools' },
  { icon: '✦', label: 'Anything local' },
]

export function UseCases() {
  return (
    <section className="border-b border-[var(--border-default)] bg-[var(--bg-secondary)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Built for teams who live on reputation.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            From tasting menus to treadmills — if guests walk through your door, GlowQR fits.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {cases.map((c) => (
            <motion.div
              key={c.label}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -2 }}
              className="glass-card flex cursor-default flex-col items-center gap-2 border-[var(--border-card)] bg-[var(--bg-card)] p-4 text-center"
            >
              <span className="text-xl">{c.icon}</span>
              <span className="text-xs font-semibold text-[var(--text-primary)]">{c.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

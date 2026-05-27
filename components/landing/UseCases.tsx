'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { Utensils, ShoppingBag, Hotel, Coffee, Scissors, Stethoscope, Dumbbell, Truck, Ticket, Wrench, GraduationCap, Sparkles } from 'lucide-react'

const cases = [
  { icon: <Utensils className="w-5 h-5 text-slate-800" />, label: 'Restaurants' },
  { icon: <ShoppingBag className="w-5 h-5 text-slate-800" />, label: 'Retail' },
  { icon: <Hotel className="w-5 h-5 text-slate-800" />, label: 'Hotels' },
  { icon: <Coffee className="w-5 h-5 text-slate-800" />, label: 'Cafés' },
  { icon: <Scissors className="w-5 h-5 text-slate-800" />, label: 'Salons' },
  { icon: <Stethoscope className="w-5 h-5 text-slate-800" />, label: 'Clinics' },
  { icon: <Dumbbell className="w-5 h-5 text-slate-800" />, label: 'Gyms' },
  { icon: <Truck className="w-5 h-5 text-slate-800" />, label: 'Food trucks' },
  { icon: <Ticket className="w-5 h-5 text-slate-800" />, label: 'Experiences' },
  { icon: <Wrench className="w-5 h-5 text-slate-800" />, label: 'Home services' },
  { icon: <GraduationCap className="w-5 h-5 text-slate-800" />, label: 'Studios & schools' },
  { icon: <Sparkles className="w-5 h-5 text-slate-800" />, label: 'Anything local' },
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
              <div className="flex items-center justify-center w-10 h-10 bg-slate-50 rounded-lg border border-slate-100">{c.icon}</div>
              <span className="text-xs font-semibold text-[var(--text-primary)]">{c.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

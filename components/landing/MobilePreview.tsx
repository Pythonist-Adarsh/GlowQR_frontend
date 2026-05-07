'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

function PhoneShell({
  variant,
  children,
}: {
  variant: 'light' | 'dark'
  children: React.ReactNode
}) {
  const isDark = variant === 'dark'
  return (
    <div
      className={`phone-frame mx-auto w-full max-w-[260px] ${isDark ? 'bg-neutral-950' : 'bg-neutral-100'}`}
    >
      <div
        className={`aspect-[9/19] p-4 ${isDark ? 'bg-[#0c0c10]' : 'bg-white'}`}
      >
        <div className="mb-4 flex justify-between text-[10px] text-[var(--text-tertiary)]">
          <span>9:41</span>
          <span className={isDark ? 'text-neutral-500' : ''}>●●●</span>
        </div>
        {children}
      </div>
    </div>
  )
}

export function MobilePreview() {
  return (
    <section className="border-b border-[var(--border-default)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold md:text-4xl">
            The perfect review experience.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[var(--text-secondary)] md:text-lg">
            Customers see a polished, on-brand screen — whether they prefer calm light interfaces or
            immersive dark flows.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8"
        >
          <motion.div variants={fadeUp}>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
              Light mode
            </p>
            <PhoneShell variant="light">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/15 font-display font-bold text-brand-primary">
                  G
                </div>
                <p className="text-center font-display text-sm font-bold text-neutral-900">
                  Riverside Bistro
                </p>
                <p className="mt-1 text-center text-[11px] text-neutral-500">
                  How was your visit today?
                </p>
                <motion.button
                  className="mt-4 w-full rounded-lg bg-brand-primary py-2.5 text-xs font-semibold text-white"
                  whileTap={{ scale: 0.98 }}
                >
                  Share feedback
                </motion.button>
              </div>
            </PhoneShell>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
              Dark mode
            </p>
            <PhoneShell variant="dark">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent font-display font-bold text-white shadow-brand">
                  G
                </div>
                <p className="text-center font-display text-sm font-bold text-white">
                  Riverside Bistro
                </p>
                <p className="mt-1 text-center text-[11px] text-neutral-400">
                  Tap to craft your Google review
                </p>
                <div className="mt-3 space-y-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-[10px] leading-snug text-neutral-300"
                    >
                      “Absolutely loved the tasting menu… ✨”
                    </div>
                  ))}
                </div>
              </div>
            </PhoneShell>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

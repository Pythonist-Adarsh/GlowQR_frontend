'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

const platforms = [
  { label: 'G', color: '#4285F4' },
  { label: 'Y', color: '#FF1A1A' },
  { label: 'f', color: '#1877F2' },
  { label: '★', color: '#FFB347' },
  { label: 'T', color: '#00AF87' },
]

export function CoreQr() {
  const radius = 118

  return (
    <section className="relative overflow-hidden py-20 md:py-28 section-dark">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-80" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            One QR Code, multiple review platforms.
          </h2>
          <p className="mt-4 text-neutral-400 md:text-lg">
            A single branded touchpoint fans out to every channel that matters — tuned for mobile,
            tuned for conversion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto mt-16 flex justify-center"
        >
          <div className="relative h-[min(72vw,400px)] w-[min(72vw,400px)] max-w-[400px] rounded-3xl border border-white/10 bg-black/40 p-6 shadow-brand-lg backdrop-blur-md sm:h-[380px] sm:w-[380px] md:p-8">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-accent/10" />

            <svg
              className="pointer-events-none absolute inset-6 opacity-40 md:inset-8"
              viewBox="0 0 300 300"
            >
              <motion.circle
                cx="150"
                cy="150"
                r="118"
                fill="none"
                stroke="url(#glowqrGrad)"
                strokeWidth="1"
                strokeDasharray="8 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
              <defs>
                <linearGradient id="glowqrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F07C3C" />
                  <stop offset="100%" stopColor="#E8A051" />
                </linearGradient>
              </defs>
            </svg>

            {platforms.map((p, i) => {
              const angle = (i / platforms.length) * 360 - 90
              const rad = (angle * Math.PI) / 180
              const r = radius
              const x = Math.cos(rad) * r
              const y = Math.sin(rad) * r
              return (
                <motion.div
                  key={p.label}
                  className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-sm font-bold text-white shadow-lg backdrop-blur-sm md:h-11 md:w-11"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <span style={{ color: p.color }}>{p.label}</span>
                </motion.div>
              )
            })}

            <div className="relative flex h-full items-center justify-center">
              <motion.div
                className="rounded-2xl bg-white p-4 shadow-2xl sm:p-5"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(240,124,60,0)',
                    '0 0 40px 8px rgba(240,124,60,0.4)',
                    '0 0 0 0 rgba(240,124,60,0)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                  {Array.from({ length: 49 }).map((_, idx) => {
                    const filled =
                      idx % 7 === 0 ||
                      idx % 8 === 0 ||
                      idx % 5 === 2 ||
                      (idx > 20 && idx < 28)
                    return (
                      <div
                        key={idx}
                        className={`h-2.5 w-2.5 rounded-sm sm:h-3 sm:w-3 ${filled ? 'bg-neutral-900' : 'bg-neutral-100'}`}
                      />
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

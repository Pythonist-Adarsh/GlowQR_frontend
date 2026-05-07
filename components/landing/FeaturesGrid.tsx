'use client'

import { motion, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { fadeUp, staggerContainer } from '@/lib/animations'

const features = [
  {
    icon: '🤖',
    title: 'AI review variants',
    desc: 'Multiple polished drafts tailored to rating, dish, and tone.',
  },
  {
    icon: '🎯',
    title: 'Smart routing',
    desc: 'Send promoters to Google and detractors to private feedback.',
  },
  {
    icon: '🎨',
    title: 'Themes & branding',
    desc: 'Classic calm or Premium spectacle — match your venue.',
  },
  {
    icon: '📱',
    title: 'Mobile-first flows',
    desc: 'Frictionless QR journeys optimized for thumb reach.',
  },
  {
    icon: '🔔',
    title: 'Realtime alerts',
    desc: 'Slack or email when sentiment dips or spikes.',
  },
  {
    icon: '🔒',
    title: 'Enterprise-ready',
    desc: 'Roles, audit trails, and dependable uptime.',
  },
]

const stats = [
  { label: 'Businesses', value: 10000, suffix: '+' },
  { label: 'Reviews influenced', value: 5000000, suffix: '+' },
  { label: 'Avg. uplift', value: 34, suffix: '%' },
  { label: 'Countries', value: 42, suffix: '+' },
]

function AnimatedStat({
  value,
  suffix,
}: {
  value: number
  suffix: string
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let controls: ReturnType<typeof animate> | undefined
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting && !played.current) {
          played.current = true
          controls = animate(0, value, {
            duration: 1.5,
            ease: 'easeOut',
            onUpdate: (v) => setDisplay(Math.round(v)),
          })
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      controls?.stop()
    }
  }, [value])

  const formatted =
    display >= 1000 ? display.toLocaleString() : display.toString()

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-bold tabular-nums text-[var(--text-primary)] md:text-4xl">
        <span>{formatted}</span>
        <span className="text-brand-accent">{suffix}</span>
      </div>
    </div>
  )
}

export function FeaturesGrid() {
  return (
    <section className="border-b border-[var(--border-default)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">Full Features.</h2>
          <p className="mt-4 text-[var(--text-secondary)] md:text-lg">
            Everything you need to operationalize reviews — from QR to insights — without hiring an
            agency.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.article
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass-card p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{f.desc}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <AnimatedStat value={s.value} suffix={s.suffix} />
              <p className="mt-2 text-center text-sm font-medium text-[var(--text-tertiary)]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

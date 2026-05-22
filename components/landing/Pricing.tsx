'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Button } from '@/components/ui/Button'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'Up to 7 days with no dashboard access.',
    features: ['7-day free trial', 'Basic QR Code generation', 'No dashboard access'],
    highlighted: false,
  },
  {
    name: 'Basic',
    price: '$299',
    period: '/mo',
    desc: '3 fully SEO based reviews in selected language & basic analytics in dashboard.',
    features: [
      '3 fully SEO based reviews',
      'Selected language support',
      'Basic analytics in dashboard',
    ],
    highlighted: true,
    badge: 'Popular',
  },
  {
    name: 'Premium',
    price: '$699',
    period: '/mo',
    desc: '5 SEO reviews based on user selected criteria, in selected language with advanced analytics.',
    features: [
      '5 SEO reviews based on criteria',
      'Selected language support',
      'Advanced analytics based on user reviews',
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-[var(--border-default)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Choose the plan that&apos;s right for you.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] md:text-lg">
            Transparent tiers — upgrade when results compound.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-14 grid gap-8 lg:grid-cols-3"
        >
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-2xl border p-8 backdrop-blur-md ${
                t.highlighted
                  ? 'border-brand-primary/50 bg-gradient-to-b from-brand-primary/10 to-transparent shadow-brand-lg'
                  : 'border-[var(--border-card)] bg-[var(--bg-card)]'
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-neutral-900 shadow-md">
                  {t.badge}
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{t.name}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                <span className="text-[var(--text-tertiary)]">{t.period}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-[var(--text-secondary)]">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brand-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={t.highlighted ? 'premium' : 'primary'}
                size="lg"
                className="mt-10 w-full"
                onClick={() => window.location.href = '/register'}
              >
                Get started
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Button } from '@/components/ui/Button'

const tiers = [
  {
    name: 'Free Trial',
    price: '₹0',
    period: '',
    desc: '7 days',
    features: [
      '7-day full access (no card needed)',
      'AR branding experience on scan',
      '5 AI review suggestions',
      'Basic scan analytics',
    ],
    highlighted: false,
  },
  {
    name: 'Basic',
    price: '₹299',
    period: '/month',
    desc: 'Essential tools to grow your reviews',
    features: [
      '3 AI-generated review suggestions',
      'Logo embedded in QR code',
      'Glow AR animation on scan',
      'Basic analytics dashboard',
      'Scan count + conversion rate',
      'Top menu items report',
    ],
    highlighted: true,
    badge: 'POPULAR',
  },
  {
    name: 'Premium',
    price: '₹699',
    period: '/month',
    desc: 'Advanced tools and AI insights',
    features: [
      '5 AI-generated review suggestions',
      'Logo embedded in QR code',
      'Full AR experience (particles + float)',
      'AI problem detection dashboard',
      'Scan heatmap (when customers visit)',
      'Negative review intercept',
      'Category ratings (Food/Service/Atmosphere)',
      'Actionable weekly insights',
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-[var(--border-default)] py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl text-gray-900">
            Choose the plan that&apos;s right for you.
          </h2>
          <p className="mt-4 text-gray-600 md:text-lg">
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
                  ? 'border-gray-200 bg-white shadow-lg'
                  : 'border-gray-200 bg-gray-50/50'
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white shadow-md">
                  {t.badge}
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-gray-900">{t.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-gray-900">{t.price}</span>
                <span className="text-gray-500">{t.period}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-gray-600">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[#1D9E75]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className={`mt-10 w-full ${t.highlighted ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'}`}
                onClick={() => window.location.href = '/register'}
              >
                {t.name === 'Free Trial' ? 'Start Free Trial →' : `Get ${t.name} →`}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm font-medium text-gray-500"
        >
          💳 Pay via UPI · Activated within 2-4 hours · Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}

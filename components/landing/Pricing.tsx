'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Button } from '@/components/ui/Button'

const tiers = [
  {
    name: 'Free Trial',
    price: '₹0',
    period: '',
    desc: '3 days',
    features: [
      '3-day full access (no card needed)',
      'AR branding experience on scan',
      '5 AI review suggestions',
      'Basic scan analytics',
    ],
    highlighted: false,
  },
  {
    name: 'Basic',
    price: '₹199',
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
    price: '₹499',
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
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

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

          <div className="mt-10 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(b => b === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-14 grid gap-8 lg:grid-cols-3"
        >
          {tiers.map((t) => {
            const isYearly = billingCycle === 'yearly' && t.name !== 'Free Trial'
            
            let displayPrice = t.price
            let displayPeriod = t.period
            let subtext = ''
            let strikethrough = ''
            
            if (isYearly && t.name === 'Basic') {
              displayPrice = '₹158'
              displayPeriod = '/month'
              subtext = 'billed as ₹1,899/year'
              strikethrough = '₹2,388'
            } else if (isYearly && t.name === 'Premium') {
              displayPrice = '₹400'
              displayPeriod = '/month'
              subtext = 'billed as ₹4,799/year'
              strikethrough = '₹5,988'
            }
            
            const showSaveBadge = isYearly && (t.name === 'Basic' || t.name === 'Premium')

            return (
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
                {t.badge && !showSaveBadge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white shadow-md">
                    {t.badge}
                  </span>
                )}
                {showSaveBadge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-md whitespace-nowrap">
                    Save 20% — Pay Yearly
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-gray-900">{t.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{t.desc}</p>
                <div className="mt-6 flex flex-col">
                  {strikethrough && (
                    <span className="text-sm text-gray-400 line-through decoration-red-500 font-semibold">{strikethrough}</span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-gray-900">{displayPrice}</span>
                    <span className="text-gray-500">{displayPeriod}</span>
                  </div>
                  {subtext && <span className="text-xs text-green-600 font-medium mt-1">{subtext}</span>}
                </div>
                <ul className="mt-8 flex-1 space-y-3 text-sm text-gray-600">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-[#1D9E75]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-10 w-full rounded-xl py-4 font-bold transition-all active:scale-[0.98] ${t.highlighted ? 'bg-slate-900 text-white shadow-xl hover:bg-slate-800' : 'bg-white text-slate-900 border-2 border-slate-200 shadow-sm hover:border-slate-300'}`}
                  onClick={() => {
                    if (t.name === 'Free Trial') {
                      window.location.href = '/register'
                    } else {
                      window.location.href = `/register?plan=${t.name.toLowerCase()}&billing=${billingCycle}`
                    }
                  }}
                >
                  {t.name === 'Free Trial' ? 'Start Free Trial →' : `Get ${t.name} →`}
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm font-medium text-gray-500"
        >
          💳 Pay via UPI · Activated within 2-4 hours
        </motion.p>
      </div>
    </section>
  )
}

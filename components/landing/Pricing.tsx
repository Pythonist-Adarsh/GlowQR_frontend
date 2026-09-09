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
    name: 'Premium',
    price: '₹399',
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
    highlighted: true,
    badge: 'POPULAR',
  },
]

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')

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

          <div className="mt-10 flex items-center justify-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 w-fit mx-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${billingCycle === 'monthly' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${billingCycle === 'quarterly' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${billingCycle === 'yearly' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Yearly
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-14 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto"
        >
          {tiers.map((t) => {
            const isPremium = t.name === 'Premium'
            
            let displayPrice = t.price
            let displayPeriod = t.period
            let subtext = ''
            
            if (isPremium) {
              if (billingCycle === 'quarterly') {
                displayPrice = '₹1,099'
                displayPeriod = '/quarter'
                subtext = '~₹366/month'
              } else if (billingCycle === 'yearly') {
                displayPrice = '₹3,999'
                displayPeriod = '/year'
                subtext = '~₹333/month'
              }
            }

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
                {t.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white shadow-md">
                    {t.badge}
                  </span>
                )}
                
                <h3 className="font-display text-xl font-bold text-gray-900">{t.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{t.desc}</p>
                
                {isPremium && (
                  <div className="mt-6 mb-2 rounded-xl bg-amber-50 border border-amber-200 p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                      ONE-TIME ENTRY OFFER
                    </div>
                    <h4 className="font-bold text-amber-900 mt-2 text-lg">₹999 <span className="text-sm font-normal">— First Month + Standee Included</span></h4>
                    <button 
                      className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
                      onClick={() => window.location.href = `/register?plan=premium&offer=onetime999`}
                    >
                      Claim Offer & Get Standee →
                    </button>
                  </div>
                )}
                
                {isPremium && (
                  <div className="flex items-center gap-4 my-4">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-xs text-gray-400 font-bold uppercase">OR SKIP OFFER</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>
                )}

                <div className="mt-2 flex flex-col">
                  {isPremium && billingCycle === 'yearly' && (
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                      Standee Included FREE
                    </span>
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
                  {t.name === 'Free Trial' ? 'Start Free Trial →' : `Commit to ${t.name} →`}
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
          💳 Secure UPI Payment · We verify and activate manually — usually within 2-4 hours (often faster)
        </motion.p>
      </div>
    </section>
  )
}

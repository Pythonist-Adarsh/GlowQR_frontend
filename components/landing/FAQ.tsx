'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { motion } from 'framer-motion'
import { ChevronDown } from './icons'
import { fadeUp } from '@/lib/animations'

const faqs = [
  {
    q: 'Do customers need an app?',
    a: 'No. GlowQR opens in the mobile browser — fast loads, no installs, no friction.',
  },
  {
    q: 'How does AI drafting stay authentic?',
    a: 'We generate suggestions from your menu, tone presets, and the rating guests choose — they always approve before posting.',
  },
  {
    q: 'Can we route unhappy guests privately?',
    a: 'Yes. Configure thresholds so critical feedback lands in your inbox instead of public listings.',
  },
  {
    q: 'What analytics ship out of the box?',
    a: 'Scan volume, conversion to posted reviews, channel breakdown, and rolling sentiment themes.',
  },
  {
    q: 'Is there an Enterprise SLA?',
    a: 'Enterprise plans include uptime commitments, SSO, and dedicated success engineering.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">FAQs.</h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Straight answers — ping us if you need anything deeper.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-12"
        >
          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map((item, i) => (
              <Accordion.Item
                key={item.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] backdrop-blur-md"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="faq-trigger group">
                    <span>{item.q}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden">
                  <div className="faq-content">{item.a}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  )
}

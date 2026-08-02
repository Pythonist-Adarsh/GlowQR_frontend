'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { motion } from 'framer-motion'
import { ChevronDown } from './icons'
import { fadeUp } from '@/lib/animations'

const faqs = [
  {
    q: 'Do my customers need to download an app?',
    a: 'No. Customers simply scan the QR code with their phone camera — no app, no login, no signup. They land directly on a page that helps them write and post a Google review in under a minute.',
  },
  {
    q: 'How does the AI-written review stay authentic and not sound fake?',
    a: 'The AI drafts a review based on the specific items or services the customer actually used at your business, in their own selected tone. Every review is personalized per customer, never copy-pasted, and customers can edit it before posting — so it always sounds genuine and reads naturally on Google.',
  },
  {
    q: 'What if a customer had a bad experience? Will GlowQR force a fake 5-star review?',
    a: 'No. If a customer indicates a negative experience, GlowQR privately routes their feedback to you instead of pushing them to post publicly — protecting your Google rating while still capturing honest feedback you can act on.',
  },
  {
    q: 'What do I see on my dashboard?',
    a: 'You get a simple dashboard showing total scans, reviews generated, conversion rate, and trends over time — so you know exactly how GlowQR is performing for your business, no technical setup needed.',
  },
  {
    q: 'How long does it take to set up?',
    a: 'Under 10 minutes. Add your business details and menu/services once, we generate your QR code and print-ready card, and you\'re live — no developer or technical help required.',
  },
  {
    q: 'Can I switch or cancel my plan anytime?',
    a: 'Yes. You can upgrade, downgrade, or cancel anytime — no long-term lock-in, no cancellation fees.',
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
            Straight answers — reach out if you need anything deeper.
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

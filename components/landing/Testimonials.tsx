'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

const quotes = [
  {
    name: 'Raj Patel',
    role: 'Small Business Owner',
    avatar: 'RP',
    quote:
      "Since putting up the QR codes, customers actually leave feedback now. It's made a huge difference.",
  },
  {
    name: 'Sarah Jenkins',
    role: 'Salon Manager',
    avatar: 'SJ',
    quote:
      "We used to beg clients for reviews after appointments. Now they just scan while paying. Got more reviews in a week than we did all last month.",
  },
  {
    name: 'Dr. Amit Sharma',
    role: 'Clinic Operator',
    avatar: 'AS',
    quote:
      "Our front desk was spending too much time following up with patients. This automated the whole process. It's subtle, professional, and patients actually engage with it.",
  },
  {
    name: 'Maria Gonzalez',
    role: 'Restaurant Owner',
    avatar: 'MG',
    quote:
      "During rush hours, our staff couldn't ask diners for feedback, so we barely got any online traction. Putting the GlowQR cards on the tables changed everything. The AI drafts make it so easy for people that we've noticed a clear jump in responses. Way less friction.",
  },
  {
    name: 'David Chen',
    role: 'Multi-Location Operator',
    avatar: 'DC',
    quote:
      "Managing reputation across three branches was a headache. Feedback was inconsistent and manual follow-ups just weren't working. Setting this up took minutes, and suddenly more customers started leaving feedback without us even asking. It just runs in the background and does its job.",
  },
]

export function Testimonials() {
  return (
    <section className="border-b border-[var(--border-default)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">Still not convinced?</h2>
          <p className="mt-4 text-[var(--text-secondary)] md:text-lg">
            Operators use GlowQR to stack proof where shoppers actually look.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {quotes.map((q) => (
            <motion.figure
              key={q.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass-card flex flex-col border-[var(--border-card)] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent font-display text-sm font-bold text-white">
                  {q.avatar}
                </div>
                <div>
                  <figcaption className="font-semibold text-[var(--text-primary)]">{q.name}</figcaption>
                  <p className="text-xs text-[var(--text-tertiary)]">{q.role}</p>
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                “{q.quote}”
              </blockquote>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

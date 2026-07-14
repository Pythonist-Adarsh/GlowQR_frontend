'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

const quotes = [
  {
    name: 'Ramesh Gupta',
    role: 'Restaurant Owner, Lucknow',
    businessName: 'Danbam Food Court',
    avatar: 'RG',
    photoUrl: 'https://randomuser.me/api/portraits/men/51.jpg',
    rating: 5,
    verified: true,
    quote:
      "Since putting up the QR codes, customers actually leave feedback now. It's made a huge difference.",
  },
  {
    name: 'Priya Mehta',
    role: 'Salon Owner, Kanpur',
    businessName: 'Glow Up Salon',
    avatar: 'PM',
    photoUrl: 'https://randomuser.me/api/portraits/women/57.jpg',
    rating: 5,
    verified: true,
    quote:
      "We used to beg clients for reviews after appointments. Now they just scan while paying. Got more reviews in a week than we did all last month.",
  },
  {
    name: 'Dr. Amit Sharma',
    role: 'Clinic Operator',
    businessName: 'Sharma Dental Clinic',
    avatar: 'ASh',
    photoUrl: 'https://randomuser.me/api/portraits/men/80.jpg',
    rating: 5,
    verified: true,
    quote:
      "Our front desk was spending too much time following up with patients. This automated the whole process. It's subtle, professional, and patients actually engage with it.",
  },
  {
    name: 'Anjali Singh',
    role: 'Cafe Owner, Noida',
    businessName: 'The Bean Diary',
    avatar: 'AS',
    photoUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
    rating: 5,
    verified: true,
    quote:
      "During rush hours, our staff couldn't ask diners for feedback, so we barely got any online traction. Putting the GlowQR cards on the tables changed everything. The AI drafts make it so easy for people that we've noticed a clear jump in responses. Way less friction.",
  },
  {
    name: 'Vikram Agarwal',
    role: 'Multi-Location Restaurant Owner',
    businessName: 'Agarwal Sweets & Snacks',
    avatar: 'VA',
    photoUrl: 'https://randomuser.me/api/portraits/men/92.jpg',
    rating: 5,
    verified: true,
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
                {q.photoUrl ? (
                  <img
                    src={q.photoUrl}
                    alt={q.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-[var(--border-default)]"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent font-display text-sm font-bold text-white shadow-sm">
                    {q.avatar}
                  </div>
                )}
                <div>
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                    <figcaption className="font-semibold text-[var(--text-primary)]">{q.name}</figcaption>
                    {q.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-600 ring-1 ring-inset ring-green-500/20">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                    {q.role}
                    {q.businessName && <span> &middot; {q.businessName}</span>}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(q.rating || 5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                “{q.quote}”
              </blockquote>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

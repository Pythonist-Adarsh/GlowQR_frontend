'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const scanData = [
  { date: 'Mon', scans: 42 },
  { date: 'Tue', scans: 58 },
  { date: 'Wed', scans: 49 },
  { date: 'Thu', scans: 71 },
  { date: 'Fri', scans: 94 },
  { date: 'Sat', scans: 120 },
  { date: 'Sun', scans: 88 },
]

const reviewMix = [
  { name: 'Google', value: 62 },
  { name: 'Yelp', value: 21 },
  { name: 'FB', value: 17 },
]

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color?: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <motion.div
      className="rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] px-3 py-2 text-xs shadow-md backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <p className="font-semibold text-[var(--text-primary)]">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </motion.div>
  )
}

export function DashboardPreview() {
  const axisStyle = { fontSize: 11, fill: 'var(--text-tertiary)' }

  return (
    <section className="border-b border-[var(--border-default)] bg-[var(--bg-secondary)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Everything you need in one dashboard.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] md:text-lg">
            Glass-morphism analytics, recent feedback, and QR management — tuned for operators, not
            data scientists.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--bg-glass)] shadow-lg backdrop-blur-md"
          style={{ WebkitBackdropFilter: 'blur(8px)' }}
        >
          <div className="flex flex-col lg:flex-row">
            <aside className="flex gap-2 border-b border-[var(--border-default)] p-4 lg:w-52 lg:flex-col lg:border-b-0 lg:border-r">
              {['Overview', 'QR Codes', 'Reviews', 'Team'].map((item, i) => (
                <button
                  key={item}
                  type="button"
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    i === 0
                      ? 'bg-brand-primary/15 text-brand-primary'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input)]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </aside>

            <div className="flex-1 space-y-6 p-4 md:p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Scans (7d)', value: '522', delta: '+18%' },
                  { label: 'Reviews posted', value: '132', delta: '+9%' },
                  { label: 'Avg. rating', value: '4.8', delta: '+0.2' },
                ].map((m) => (
                  <motion.div
                    key={m.label}
                    variants={fadeUp}
                    className="rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4"
                  >
                    <p className="text-xs font-medium text-[var(--text-tertiary)]">{m.label}</p>
                    <p className="mt-2 font-display text-2xl font-bold">{m.value}</p>
                    <p className="mt-1 text-xs font-semibold text-emerald-500">{m.delta}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-5">
                <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4 lg:col-span-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold">Daily scans</h3>
                    <span className="text-xs text-[var(--text-tertiary)]">Last 7 days</span>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scanData}>
                        <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip content={<ChartTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="scans"
                          stroke="#3D261C"
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 5, fill: '#F07C3C', strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4 lg:col-span-2">
                  <h3 className="font-display text-sm font-bold">Channel mix</h3>
                  <div className="mt-3 h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reviewMix}>
                        <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="value" fill="#F07C3C" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4">
                <h3 className="font-display text-sm font-bold">Recent feedback</h3>
                <ul className="mt-3 divide-y divide-[var(--border-default)] text-sm">
                  {[
                    { name: 'Alex M.', text: '“Incredible pairing flight — QR flow was slick.”', stars: 5 },
                    { name: 'Jordan P.', text: '“Draft helped me post in seconds.”', stars: 5 },
                    { name: 'Sam R.', text: '“Wish dessert came faster.”', stars: 4 },
                  ].map((r) => (
                    <li key={r.name} className="flex flex-wrap items-start justify-between gap-2 py-3">
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{r.name}</p>
                        <p className="text-[var(--text-secondary)]">{r.text}</p>
                      </div>
                      <span className="text-brand-gold">{'★'.repeat(r.stars)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

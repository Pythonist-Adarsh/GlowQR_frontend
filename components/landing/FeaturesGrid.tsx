'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Bot, Target, Palette, Smartphone } from 'lucide-react'

const features = [
  {
    icon: <Bot className="w-7 h-7 text-slate-800" />,
    title: 'AI review variants',
    desc: 'Multiple polished drafts tailored to rating, dish, and tone.',
  },
  {
    icon: <Target className="w-7 h-7 text-slate-800" />,
    title: 'Smart routing',
    desc: 'Send promoters to Google and detractors to private feedback.',
  },
  {
    icon: <Palette className="w-7 h-7 text-slate-800" />,
    title: 'Themes & branding',
    desc: 'Classic calm or Premium spectacle — match your venue.',
  },
  {
    icon: <Smartphone className="w-7 h-7 text-slate-800" />,
    title: 'Mobile-first flows',
    desc: 'Frictionless QR journeys optimized for thumb reach.',
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/5">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-8 rounded-[var(--radius-xl)] bg-white border border-slate-100 hover:border-brand-accent/20 transition-all duration-300 group hover:shadow-brand hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 font-display">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-body">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-slate-200/50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
    </section>
  )
}

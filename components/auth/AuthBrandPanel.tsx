'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowLogo } from '@/components/GlowLogo'

type Props = {
  className?: string
}

const QUOTES = [
  { quote: 'We doubled our Google reviews in three weeks. Guests love the menu — owners love the insights.', attribution: 'Camille Roux — Owner, Café Lumière' },
  { quote: 'The AR experience blows our customers away every single time. It completely changes the dynamic of asking for a review.', attribution: 'David Chen — Manager, The Daily Grind' },
  { quote: 'Finally, a platform that captures the happy customers before they leave the restaurant. An absolute game-changer.', attribution: 'Priya Sharma — Founder, Spice Route' }
]

export function AuthBrandPanel({ className = '' }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <aside
      className={`relative flex min-h-[36vh] flex-col overflow-hidden bg-[#111111] px-8 py-10 text-white sm:min-h-[40vh] lg:min-h-screen lg:px-12 lg:py-14 ${className}`}
    >
      <QrBarcodeBackdrop />

      <Link href="/" className="relative z-[1] inline-flex items-center gap-3 transition-opacity hover:opacity-90">
        <GlowLogo size={44} />
        <span className="font-serif text-xl font-semibold tracking-tight text-white">GlowQR</span>
      </Link>

      <div className="relative z-[1] flex flex-1 flex-col justify-center py-12 lg:py-0 min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <blockquote
              className="font-serif text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl lg:max-w-md"
            >
              &ldquo;{QUOTES[index].quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-slate-400">
              {QUOTES[index].attribution}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="relative z-[1] mt-auto text-xs text-slate-500">
        © {new Date().getFullYear()} GlowQR
      </p>
    </aside>
  )
}

function QrBarcodeBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #fff 0px,
            #fff 2px,
            transparent 2px,
            transparent 8px
          )`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent shadow-[0_0_24px_rgba(255,255,255,0.5)]"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </>
  )
}

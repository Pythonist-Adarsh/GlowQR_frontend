'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GlowLogo } from '@/components/GlowLogo'

type Props = {
  quote: string
  attribution: string
  className?: string
}

export function AuthBrandPanel({ quote, attribution, className = '' }: Props) {
  return (
    <aside
      className={`relative flex min-h-[36vh] flex-col overflow-hidden bg-[#2D1B14] px-8 py-10 text-[#FDF8F1] sm:min-h-[40vh] lg:min-h-screen lg:px-12 lg:py-14 ${className}`}
    >
      <QrBarcodeBackdrop />

      <Link href="/" className="relative z-[1] inline-flex items-center gap-3 transition-opacity hover:opacity-90">
        <GlowLogo size={44} />
        <span className="font-serif text-xl font-semibold tracking-tight text-white">GlowQR</span>
      </Link>

      <div className="relative z-[1] flex flex-1 flex-col justify-center py-12 lg:py-0">
        <motion.blockquote
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="font-serif text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl lg:max-w-md"
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-6 text-sm text-[#C4B5A8]"
        >
          {attribution}
        </motion.p>
      </div>

      <p className="relative z-[1] mt-auto text-xs text-[#8A7B70]">
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
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F07C3C]/70 to-transparent shadow-[0_0_24px_rgba(240,124,60,0.5)]"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-[#F07C3C]/10 blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </>
  )
}

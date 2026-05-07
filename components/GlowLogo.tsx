'use client'

import { motion } from 'framer-motion'

export function GlowLogo({ size = 32 }: { size?: number }) {
  const s = Math.round(size * 0.52)
  return (
    <motion.div
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F07C3C] shadow-[0_4px_18px_rgba(240,124,60,0.38)]"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.06 }}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 to-transparent" />
      <svg
        width={s}
        height={s}
        viewBox="0 0 24 24"
        className="relative text-white"
        aria-hidden
      >
        <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
        <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
        <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
        <rect x="13" y="13" width="3" height="3" rx="0.45" fill="currentColor" opacity="0.92" />
        <rect x="17" y="13" width="3" height="3" rx="0.45" fill="currentColor" opacity="0.92" />
        <rect x="13" y="17" width="3" height="3" rx="0.45" fill="currentColor" opacity="0.92" />
        <rect x="18" y="18" width="2.25" height="2.25" rx="0.35" fill="currentColor" opacity="0.85" />
      </svg>
    </motion.div>
  )
}

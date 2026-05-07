'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

type Props = {
  className?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  /** When true, CTA stretches to container width (e.g. mobile nav). */
  fullWidth?: boolean
}

const sizeClass = {
  sm: 'px-4 py-2 text-sm rounded-[var(--radius-md)] min-h-[40px]',
  md: 'px-5 py-2.5 text-sm rounded-[var(--radius-md)] min-h-[44px]',
  lg: 'px-8 py-3.5 text-base rounded-[var(--radius-lg)] min-h-[52px] min-w-[200px]',
}

/**
 * Restaurant / QR themed CTA: finder corners + scan sweep + subtle "steam" wisps.
 */
export function AnimatedGetStartedButton({
  className = '',
  children = 'Get started',
  size = 'lg',
  fullWidth = false,
}: Props) {
  const wrap = fullWidth ? 'block w-full' : 'inline-block'
  return (
    <motion.div className={`${wrap} ${className}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Link
        href="/sign-up"
        className={`get-started-qr-btn group relative flex items-center justify-center gap-2 overflow-hidden font-medium text-white ${sizeClass[size]} ${fullWidth ? 'w-full' : ''}`}
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#3D261C] via-[#5C3D2E] to-[#3D261C] bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[position:100%_0]" />

        {/* Soft warm glow */}
        <motion.span
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(240,124,60,0.35),transparent_55%)]"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Scan line */}
        <motion.span
          className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-transparent via-white/25 to-transparent"
          initial={false}
          animate={{ left: ['-30%', '100%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
        />

        {/* QR finder corners */}
        <span className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 border-l-2 border-t-2 border-[#F07C3C]/90" />
        <span className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 border-b-2 border-l-2 border-[#F07C3C]/90 translate-y-[2px]" />
        <span className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 border-r-2 border-t-2 border-[#F07C3C]/90" />
        <span className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 border-b-2 border-r-2 border-[#F07C3C]/90 translate-y-[2px]" />

        {/* Cafe steam (minimal) */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute bottom-[18%] h-6 w-6 rounded-full bg-white/[0.08] blur-md"
            style={{ left: `calc(42% + ${i * 14 - 14}px)` }}
            animate={{ y: [0, -10, -6], opacity: [0.2, 0.45, 0.15], scale: [1, 1.15, 0.95] }}
            transition={{
              duration: 2.4 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
          />
        ))}

        <MiniQrGlyph className="relative z-[1] opacity-95" />
        <span className="relative z-[1]">{children}</span>
      </Link>
    </motion.div>
  )
}

function MiniQrGlyph({ className }: { className?: string }) {
  return (
    <svg className={`h-[1.1em] w-[1.1em] shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="13" y="13" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.85" />
      <rect x="17" y="13" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.85" />
      <rect x="13" y="17" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.85" />
      <rect x="18" y="18" width="2" height="2" rx="0.35" fill="currentColor" opacity="0.75" />
    </svg>
  )
}

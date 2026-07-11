'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowLogo } from '@/components/GlowLogo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { AnimatedGetStartedButton } from '@/components/marketing/AnimatedGetStartedButton'

import { Search } from 'lucide-react'

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
]

export function LandingNavbar({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const onHero = !scrolled && !forceScrolled

  return (
    <motion.header
      className={`landing-nav ${scrolled || forceScrolled ? 'landing-nav--scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <GlowLogo size={36} />
          <span
            className={`font-display text-lg font-bold tracking-tight transition-colors ${
              onHero ? 'text-white' : 'text-[var(--text-primary)]'
            }`}
          >
            GlowQR
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                onHero
                  ? 'text-white/75 hover:text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--brand-primary)]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          <Link href="/score" className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
            onHero 
              ? 'border-white/20 text-white hover:bg-white/10' 
              : 'border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
          }`}>
            <Search className="w-4 h-4" />
            <span className="text-sm font-semibold">Check Score</span>
          </Link>
          <AnimatedGetStartedButton
            size="sm"
            className={`hidden sm:inline-flex ${onHero ? 'drop-shadow-[0_8px_28px_rgba(240,124,60,0.35)]' : ''}`}
          >
            Get started
          </AnimatedGetStartedButton>
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-lg border md:hidden ${
              onHero
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
            }`}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="text-lg leading-none">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="border-b border-[var(--border-default)] bg-[var(--bg-glass)] px-4 py-4 shadow-sm backdrop-blur-xl md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <AnimatedGetStartedButton size="md" className="mt-2 w-full sm:hidden" fullWidth>
                Get started
              </AnimatedGetStartedButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

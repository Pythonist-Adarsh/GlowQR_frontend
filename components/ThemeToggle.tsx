'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('glowqr-theme') as 'light' | 'dark' | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    const initial = saved ?? preferred
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('glowqr-theme', next)
  }

  if (!mounted) {
    return (
      <span
        className="inline-block h-[34px] w-[88px] rounded-full border border-[var(--border-default)]"
        aria-hidden
      />
    )
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="toggle-track"
        animate={{
          backgroundColor:
            theme === 'dark' ? 'rgba(240,124,60,0.22)' : 'rgba(61,38,28,0.08)',
        }}
      >
        <motion.div
          className="toggle-thumb"
          animate={{ x: theme === 'dark' ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="toggle-icon"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

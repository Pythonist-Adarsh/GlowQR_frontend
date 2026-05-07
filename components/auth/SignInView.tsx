'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { GoogleContinueButton } from '@/components/auth/GoogleContinueButton'

const QUOTE =
  'We doubled our Google reviews in three weeks. Guests love the menu — owners love the insights.'
const ATTR = 'Camille Roux — Owner, Café Lumière'

export function SignInView() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel quote={QUOTE} attribution={ATTR} className="order-2 lg:order-1" />

      <motion.section
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="order-1 flex flex-col justify-center bg-[#FDF8F1] px-6 py-12 sm:px-12 lg:order-2 lg:px-16"
      >
        <Link href="/" className="mb-8 text-sm font-medium text-[#8A735F] hover:text-[#3D261C] lg:hidden">
          ← Back home
        </Link>

        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#3D261C] md:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-[15px] text-[#5C4A3D]">
          Sign in to manage your menus and QR codes.
        </p>

        <div className="mt-10 max-w-md space-y-5">
          <GoogleContinueButton label="Continue with Google" />
          <AuthDivider />

          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              placeholder="you@business.com"
              autoComplete="email"
              className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3 text-[15px] text-[#3D261C] outline-none placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-2 focus:ring-[#F07C3C]/25"
            />
          </label>
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3 text-[15px] text-[#3D261C] outline-none placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-2 focus:ring-[#F07C3C]/25"
            />
          </label>

          <motion.button
            type="button"
            onClick={() => window.location.href = '/onboarding'}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[#3D261C] py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(61,38,28,0.25)]"
          >
            <motion.span
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
            />
            Sign in
          </motion.button>
        </div>

        <p className="mt-10 text-center text-sm text-[#5C4A3D] lg:text-left">
          New to GlowQR?{' '}
          <Link href="/sign-up" className="font-semibold text-[#3D261C] underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </motion.section>
    </div>
  )
}

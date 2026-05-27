'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { GoogleContinueButton } from '@/components/auth/GoogleContinueButton'
import { API_BASE_URL } from '@/lib/api-config'

const QUOTE =
  'We doubled our Google reviews in three weeks. Guests love the menu — owners love the insights.'
const ATTR = 'Camille Roux — Owner, Café Lumière'

export function SignInView() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to sign in');
      }

      const data = await res.json();
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('onboarding_completed', data.onboarding_completed ? 'true' : 'false')
      
      if (data.onboarding_completed) {
        router.push('/dashboard')
      } else {
        router.push('/onboarding')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel quote={QUOTE} attribution={ATTR} className="order-2 lg:order-1" />

      <motion.section
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="order-1 flex flex-col justify-center bg-white px-6 py-12 sm:px-12 lg:order-2 lg:px-16"
      >
        <Link href="/" className="mb-8 text-sm font-medium text-[#666666] hover:text-[#111111] lg:hidden">
          ← Back home
        </Link>

        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-[15px] text-[#444444]">
          Sign in to manage your menus and QR codes.
        </p>

        <div className="mt-10 max-w-md space-y-5">
          <GoogleContinueButton label="Continue with Google" />
          <AuthDivider />

          {error && (
            <p className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@business.com"
              autoComplete="email"
              className="w-full rounded-[var(--radius-md)] border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#111111] outline-none placeholder:text-[#999999] focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/25"
            />
          </label>
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-[var(--radius-md)] border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#111111] outline-none placeholder:text-[#999999] focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/25"
            />
          </label>

          <motion.button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[#111111] py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(17,17,17,0.25)]"
          >
            <motion.span
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
            />
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>
        </div>

        <p className="mt-10 text-center text-sm text-[#444444] lg:text-left">
          New to GlowQR?{' '}
          <Link href="/register" className="font-semibold text-[#111111] underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </motion.section>
    </div>
  )
}

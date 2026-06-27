'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { GoogleContinueButton } from '@/components/auth/GoogleContinueButton'
import { API_BASE_URL } from '@/lib/api-config'

const QUOTE =
  'From opening night to fully booked weekends — our guests finally leave the reviews we used to chase. One QR did the hospitality heavy lifting.'
const ATTR = 'Jordan Ellis — General Manager, Brasserie Meridian'

export function SignUpView() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignUp = async (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.name,
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to register');
      }

      const data = await res.json();
      localStorage.setItem('token', data.access_token)
      localStorage.removeItem('glowqr_business_data')
      localStorage.setItem('onboarding_completed', data.onboarding_completed ? 'true' : 'false')
      
      if (data.onboarding_completed) {
        router.push('/dashboard')
      } else {
        router.push('/onboarding/tutorial')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <motion.section
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="order-1 flex flex-col justify-center bg-white px-6 py-12 sm:px-12 lg:order-1 lg:px-16"
      >
        <Link href="/" className="mb-8 text-sm font-medium text-[#666666] hover:text-[#111111] lg:hidden">
          ← Back home
        </Link>

        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl">
          Create your account
        </h1>
        <p className="mt-2 text-[15px] text-[#444444]">
          Start collecting reviews in under 5 minutes.
        </p>

        <div className="mt-6 mb-2 max-w-md">
          <p className="text-center text-sm font-medium text-emerald-700 bg-emerald-50 py-2 px-4 rounded-md border border-emerald-200">
            ✨ Start free — 3 days full Premium access. No card needed.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="mt-6 max-w-md space-y-5">
          <GoogleContinueButton />
          <AuthDivider chipBgClass="bg-white" />

          {error && (
            <div className="rounded-[var(--radius-md)] bg-red-50 p-3 text-sm text-red-600 border border-red-100">
              {error}
            </div>
          )}

          <label className="block">
            <span className="sr-only">Name</span>
            <input
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-[var(--radius-md)] border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#111111] outline-none placeholder:text-[#999999] focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/25"
            />
          </label>
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              required
              placeholder="you@business.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-[var(--radius-md)] border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#111111] outline-none placeholder:text-[#999999] focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/25"
            />
          </label>
          <div className="block relative">
            <span className="sr-only">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-[var(--radius-md)] border border-[#e5e5e5] bg-white px-4 py-3 pr-12 text-[15px] text-[#111111] outline-none placeholder:text-[#999999] focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/25"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-800 focus:outline-none z-10 flex items-center justify-center"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="space-y-3">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[#111111] py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(17,17,17,0.25)] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {!loading && (
                <motion.span
                  className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ['-80%', '280%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
                />
              )}
              {loading ? 'Creating account...' : 'Create account'}
            </motion.button>
            <p className="text-center text-xs text-[#666666]">
              By signing up, you agree to our Terms. Your 3-day trial starts immediately.
            </p>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-[#444444] lg:text-left">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#111111] underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.section>

      <AuthBrandPanel className="order-2 lg:order-2" />
    </div>
  )
}

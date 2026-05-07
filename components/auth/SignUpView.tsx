'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { GoogleContinueButton } from '@/components/auth/GoogleContinueButton'

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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed')
      }

      // Store token
      localStorage.setItem('token', data.access_token)
      
      // Redirect to onboarding
      router.push('/onboarding')
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
        className="order-1 flex flex-col justify-center bg-[#F9F4ED] px-6 py-12 sm:px-12 lg:order-1 lg:px-16"
      >
        <Link href="/" className="mb-8 text-sm font-medium text-[#8A735F] hover:text-[#3D261C] lg:hidden">
          ← Back home
        </Link>

        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#3D261C] md:text-4xl">
          Create your account
        </h1>
        <p className="mt-2 text-[15px] text-[#5C4A3D]">
          Start collecting reviews in under 5 minutes.
        </p>

        <form onSubmit={handleSignUp} className="mt-10 max-w-md space-y-5">
          <GoogleContinueButton label="Continue with Google" />
          <AuthDivider chipBgClass="bg-[#F9F4ED]" />

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
              className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3 text-[15px] text-[#3D261C] outline-none placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-2 focus:ring-[#F07C3C]/25"
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
              className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3 text-[15px] text-[#3D261C] outline-none placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-2 focus:ring-[#F07C3C]/25"
            />
          </label>
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3 text-[15px] text-[#3D261C] outline-none placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-2 focus:ring-[#F07C3C]/25"
            />
          </label>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[#3D261C] py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(61,38,28,0.25)] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {!loading && (
              <motion.span
                className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-[#F07C3C]/25 to-transparent"
                animate={{ x: ['-80%', '280%'] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
              />
            )}
            {loading ? 'Creating account...' : 'Create account'}
          </motion.button>
        </form>

        <p className="mt-10 text-center text-sm text-[#5C4A3D] lg:text-left">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-semibold text-[#3D261C] underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.section>

      <AuthBrandPanel quote={QUOTE} attribution={ATTR} className="order-2 lg:order-2" />
    </div>
  )
}

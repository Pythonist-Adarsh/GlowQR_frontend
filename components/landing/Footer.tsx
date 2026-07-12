'use client'

import Link from 'next/link'
import { GlowLogo } from '@/components/GlowLogo'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Health Checker', href: '/health-checker' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Dashboard', href: '#dashboard-preview' },
      { label: 'Sign in', href: '/sign-in' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help center', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111111] py-16 text-neutral-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 text-white">
              <GlowLogo size={36} />
              <span className="font-display text-lg font-bold">GlowQR</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Premium QR journeys that convert scans into authentic reviews — powered by thoughtful AI.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="font-display text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} GlowQR. All rights reserved.</p>
          <div className="flex gap-4 text-neutral-500">
            <a href="#" aria-label="Twitter" className="hover:text-white">
              𝕏
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              in
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              ◎
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

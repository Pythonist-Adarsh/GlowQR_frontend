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
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between w-full">
          <div className="lg:w-1/3 xl:w-1/4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <GlowLogo size={36} />
              <span className="font-display text-lg font-bold">GlowQR</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Premium QR journeys that convert scans into authentic reviews — powered by thoughtful AI.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-2 lg:flex lg:flex-1 lg:justify-between lg:pl-12 w-full">
            {cols.map((c) => (
              <div key={c.title} className="lg:px-2 xl:px-4">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
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

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row w-full">
          <p>© {new Date().getFullYear()} GlowQR. All rights reserved.</p>
          <div className="flex gap-4 text-neutral-500">
            <a href="#" aria-label="Twitter" className="hover:text-white text-lg">
              𝕏
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white text-lg">
              in
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white text-lg">
              ◎
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

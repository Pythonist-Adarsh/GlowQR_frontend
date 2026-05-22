import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Set up your Business — GlowQR',
  description: 'Complete your business profile to get started with GlowQR.',
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {children}
    </div>
  )
}

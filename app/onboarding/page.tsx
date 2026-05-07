import type { Metadata } from 'next'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'

export const metadata: Metadata = {
  title: 'Set up your Business — GlowQR',
  description: 'Complete your business profile to get started with GlowQR.',
}

export default function OnboardingPage() {
  return <OnboardingWizard />
}

import type { Metadata } from 'next'
import { SignUpView } from '@/components/auth/SignUpView'

export const metadata: Metadata = {
  title: 'Create account — GlowQR',
  description: 'Start collecting reviews in under 5 minutes.',
}

export default function SignUpPage() {
  return <SignUpView />
}

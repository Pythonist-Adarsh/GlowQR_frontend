import type { Metadata } from 'next'
import { SignUpView } from '@/components/auth/SignUpView'
import { LandingNavbar } from '@/components/landing/LandingNavbar'

export const metadata: Metadata = {
  title: 'Sign up — GlowQR',
  description: 'Create your account to start managing your QR menus.',
}

export default function SignUpPage() {
  return (
    <>
      <LandingNavbar forceScrolled={true} />
      <SignUpView />
    </>
  )
}

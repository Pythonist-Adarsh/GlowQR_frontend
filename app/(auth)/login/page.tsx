import type { Metadata } from 'next'
import { SignInView } from '@/components/auth/SignInView'
import { LandingNavbar } from '@/components/landing/LandingNavbar'

export const metadata: Metadata = {
  title: 'Sign in — GlowQR',
  description: 'Sign in to manage your menus and QR codes.',
}

export default function SignInPage() {
  return (
    <>
      <LandingNavbar forceScrolled={true} />
      <SignInView />
    </>
  )
}

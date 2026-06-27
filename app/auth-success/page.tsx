'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

function AuthSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const onboardingCompletedParam = searchParams.get('onboarding_completed');

    if (token) {
      // Store token in localStorage
      localStorage.setItem('token', token);

      // Prefer the URL parameter (which comes directly from backend authentication)
      let hasCompletedOnboarding = false;
      if (onboardingCompletedParam !== null) {
        hasCompletedOnboarding = onboardingCompletedParam === 'true';
        localStorage.setItem('onboarding_completed', onboardingCompletedParam);
      } else {
        hasCompletedOnboarding = localStorage.getItem('onboarding_completed') === 'true';
      }

      // Route accordingly based strictly on the flag
      if (hasCompletedOnboarding) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding/tutorial');
      }
    } else {
      // No token — something went wrong, go back to sign-in
      router.push('/sign-in?error=oauth_failed');
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-main)]">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Logo */}
          <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20">
            <QrCode className="w-9 h-9 text-[var(--brand-accent)]" />
          </div>

          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-full border-4 border-[var(--brand-accent)]/10 border-t-[var(--brand-accent)]"
          />

          <div>
            <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)] font-display">
              Completing Login...
            </h1>
            <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
              Setting up your GlowQR session
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const FallbackLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[var(--bg-main)]">
    <div className="w-12 h-12 rounded-full border-4 border-[var(--brand-accent)]/10 border-t-[var(--brand-accent)] animate-spin" />
  </div>
);

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <AuthSuccessHandler />
    </Suspense>
  );
}

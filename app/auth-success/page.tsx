'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Redirect to onboarding or dashboard
      router.push('/onboarding');
    } else {
      // If no token, redirect to sign-in
      router.push('/sign-in');
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent mx-auto"></div>
        <h1 className="text-2xl font-bold">Completing Login...</h1>
        <p className="mt-2 text-gray-400">Please wait while we set up your session.</p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent mx-auto"></div>
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    }>
      <AuthSuccessHandler />
    </Suspense>
  );
}

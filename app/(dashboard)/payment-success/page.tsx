'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Optionally we could poll the backend for status here, but for now we just show success and redirect
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Payment Successful!</h1>
          <p className="text-slate-600">Your subscription is being activated.</p>
        </div>
        
        {orderId && (
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Order ID</p>
            <p className="font-mono text-slate-900">{orderId}</p>
          </div>
        )}
        
        <button 
          onClick={() => router.push('/dashboard')}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Go to Dashboard
        </button>
      </motion.div>
    </div>
  );
}

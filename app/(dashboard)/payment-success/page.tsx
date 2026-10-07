'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/lib/api-config';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'failed'>('loading');

  useEffect(() => {
    if (!orderId) {
      setStatus('failed');
      return;
    }

    const checkStatus = async () => {
      try {
        const token = localStorage.getItem('glowqr_token');
        const res = await fetch(`${API_BASE_URL}/api/renewal/order/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'active' || data.status === 'paid' || data.status === 'verified') {
            setStatus('success');
            setTimeout(() => {
              router.push('/dashboard');
            }, 4000);
          } else if (data.status === 'pending') {
            setStatus('pending');
          } else {
            setStatus('failed');
          }
        } else {
          setStatus('failed');
        }
      } catch (err) {
        console.error(err);
        setStatus('failed');
      }
    };

    checkStatus();
  }, [orderId, router]);

  if (status === 'loading') {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Verifying Payment...</h1>
          <p className="text-slate-600">Please wait while we confirm your transaction.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6"
    >
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
        status === 'success' ? 'bg-emerald-100 text-emerald-600' : 
        status === 'pending' ? 'bg-amber-100 text-amber-600' : 
        'bg-red-100 text-red-600'
      }`}>
        {status === 'success' && <CheckCircle2 className="w-10 h-10" />}
        {status === 'pending' && <Clock className="w-10 h-10" />}
        {status === 'failed' && <XCircle className="w-10 h-10" />}
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          {status === 'success' ? 'Payment Successful!' : 
           status === 'pending' ? 'Payment Pending' : 
           'Payment Not Completed'}
        </h1>
        <p className="text-slate-600">
          {status === 'success' ? 'Your subscription is being activated.' : 
           status === 'pending' ? 'We are waiting for payment confirmation from the bank.' : 
           'Your payment was cancelled or failed.'}
        </p>
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
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Suspense fallback={<div className="animate-pulse bg-white p-8 rounded-3xl shadow-xl max-w-md w-full h-64"></div>}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}


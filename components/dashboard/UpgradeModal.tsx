'use client';
import { toast } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-config';
import { load } from '@cashfreepayments/cashfree-js';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: 'premium';
}

export function UpgradeModal({ isOpen, onClose, defaultPlan = 'premium' }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const storedPlan = localStorage.getItem('glowqr_intended_plan');
      const storedBilling = localStorage.getItem('glowqr_intended_billing');
      
      if (storedPlan === 'premium') {
        setSelectedPlan('premium');
      } else {
        setSelectedPlan('premium');
      }
      
      if (storedBilling === 'monthly' || storedBilling === 'quarterly' || storedBilling === 'yearly') {
        setBillingCycle(storedBilling as 'monthly' | 'quarterly' | 'yearly');
      } else {
        setBillingCycle('monthly');
      }
      setLoading(false);
    }
  }, [isOpen]);

  let price = 399;
  if (billingCycle === 'quarterly') price = 999;
  if (billingCycle === 'yearly') price = 3999;

  const handleContinueToPayment = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/renewal/cashfree/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({
          plan: selectedPlan,
          amount_paid: price,
          billing_cycle: billingCycle,
          request_type: 'upgrade'
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to create order');
      }
      
      const data = await res.json();
      
      const cashfree = await load({
        mode: 'production', 
      });
      
      cashfree.checkout({
        paymentSessionId: data.payment_session_id
      });
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative"
          >
            <button 
              onClick={onClose}
              disabled={loading}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Upgrade Plan</h2>
                
                <div className="flex flex-col gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      disabled={loading}
                      className={`py-1 text-sm font-semibold rounded-lg transition-colors ${billingCycle === 'monthly' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('quarterly')}
                      disabled={loading}
                      className={`py-1 text-sm font-semibold rounded-lg transition-colors ${billingCycle === 'quarterly' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Quarterly
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      disabled={loading}
                      className={`py-1 text-sm font-semibold rounded-lg transition-colors ${billingCycle === 'yearly' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  {['premium'].map((plan) => (
                    <div 
                      key={plan}
                      onClick={() => setSelectedPlan(plan as 'premium')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPlan === plan 
                          ? 'border-slate-900 bg-slate-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-bold capitalize text-slate-900 block">{plan} Plan</span>
                          {billingCycle === 'quarterly' && <span className="text-xs text-green-600 font-medium">3 Months • ~₹333/mo</span>}
                          {billingCycle === 'yearly' && <span className="text-xs text-green-600 font-medium">12 Months • ~₹333/mo</span>}
                        </div>
                        <span className="font-bold text-slate-900 flex items-center gap-2">
                          {billingCycle === 'quarterly' && <span className="text-slate-400 line-through text-sm">₹1,099</span>}
                          {billingCycle === 'yearly' ? '₹3,999/yr' : billingCycle === 'quarterly' ? '₹999/qtr' : '₹399/mo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleContinueToPayment}
                  disabled={loading}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : 'Pay Securely →'}
                </button>
                <p className="text-center text-xs text-slate-400 font-medium">Secured by Cashfree Payments</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

'use client';
import { toast } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, QrCode } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-config';
import { QRCodeSVG } from 'qrcode.react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: 'basic' | 'premium';
}

export function UpgradeModal({ isOpen, onClose, defaultPlan = 'basic' }: UpgradeModalProps) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  
  const [orderId, setOrderId] = useState('');
  const [deepLink, setDeepLink] = useState('');
  const [tn, setTn] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const storedPlan = localStorage.getItem('glowqr_intended_plan');
      const storedBilling = localStorage.getItem('glowqr_intended_billing');
      
      if (storedPlan === 'basic' || storedPlan === 'premium') {
        setSelectedPlan(storedPlan);
      } else {
        setSelectedPlan(defaultPlan);
      }
      
      if (storedBilling === 'monthly' || storedBilling === 'yearly') {
        setBillingCycle(storedBilling as 'monthly' | 'yearly');
      } else {
        setBillingCycle('monthly');
      }
    }
  }, [isOpen, defaultPlan]);

  const price = selectedPlan === 'premium' 
    ? (billingCycle === 'yearly' ? 4799 : 499) 
    : (billingCycle === 'yearly' ? 1899 : 199);
  const planName = selectedPlan === 'premium' ? 'Premium Plan' : 'Basic Plan';

  const handleContinueToPayment = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({
          plan_name: `${selectedPlan} ${billingCycle}`,
          amount: price
        })
      });
      if (!res.ok) {
        throw new Error('Failed to create payment order');
      }
      const data = await res.json();
      setOrderId(data.order_id);
      setDeepLink(data.deep_link);
      setTn(data.upi_transaction_note);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 6) {
      toast.error("Please enter a valid UTR number");
      return;
    }
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/payment/submit-utr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({
          order_id: orderId,
          utr_reference: utrNumber
        })
      });
      if (!res.ok) {
        throw new Error('Failed to submit UTR');
      }
      setStep(3);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit UTR. Please try again.");
    } finally {
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
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Upgrade Plan</h2>
                  
                  <div className="flex items-center justify-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                    <button
                      onClick={() => setBillingCycle(b => b === 'monthly' ? 'yearly' : 'monthly')}
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-900 transition-colors"
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className={`text-sm font-semibold ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>Yearly <span className="text-green-600">(Save 20%)</span></span>
                  </div>

                  <div className="space-y-3 mt-4">
                    {['basic', 'premium'].map((plan) => (
                      <div 
                        key={plan}
                        onClick={() => setSelectedPlan(plan as 'basic' | 'premium')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedPlan === plan 
                            ? 'border-slate-900 bg-slate-50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold capitalize text-slate-900">{plan} Plan</span>
                          <span className="font-bold text-slate-900">
                            {plan === 'premium' ? (billingCycle === 'yearly' ? '₹4,799/yr' : '₹499/mo') : (billingCycle === 'yearly' ? '₹1,899/yr' : '₹199/mo')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleContinueToPayment}
                    disabled={loading}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      'Continue to Payment →'
                    )}
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Complete Payment</h2>
                    <p className="text-slate-600 text-sm mt-1">
                      Pay ₹{price} for {planName}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      {deepLink ? (
                        <QRCodeSVG value={deepLink} size={180} />
                      ) : (
                        <div className="w-[180px] h-[180px] bg-slate-100 animate-pulse rounded-lg"></div>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 font-medium text-center">Scan with any UPI App<br/>(GPay, PhonePe, Paytm)</p>
                    
                    <button
                      onClick={() => window.location.href = deepLink}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                    >
                      <QrCode className="w-5 h-5" />
                      Pay via UPI App
                    </button>
                  </div>

                  <form onSubmit={handleSubmitUtr} className="space-y-4 pt-4 border-t border-slate-100">
                    <p className="text-sm font-bold text-slate-900 text-center">Paid? Enter your UPI transaction/UTR number to confirm:</p>
                    
                    <input 
                      required type="text" placeholder="12-digit UTR from UPI app"
                      value={utrNumber} onChange={e => setUtrNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-center"
                    />

                    <button 
                      type="submit" disabled={loading}
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-70"
                    >
                      {loading ? 'Verifying...' : 'Submit UTR →'}
                    </button>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="text-center space-y-6 py-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <Check className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Payment Submitted!</h2>
                  <p className="text-slate-600">We'll verify and activate your plan within a few hours.</p>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2 mt-6">
                    <p className="text-slate-600">Reference: <span className="font-mono text-slate-900 font-bold">{tn}</span></p>
                    <p className="text-slate-600">Questions? WhatsApp: <span className="font-medium text-slate-900">{process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '+91XXXXXXXXXX'}</span></p>
                  </div>

                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors mt-6"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

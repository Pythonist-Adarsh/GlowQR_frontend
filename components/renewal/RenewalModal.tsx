'use client';
import { toast } from 'react-hot-toast';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, X, Eye, EyeOff } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-config';

interface RenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: 'basic' | 'premium' | 'trial' | 'expired' | string;
  upiId?: string;
  upiQrUrl?: string;
}

export function RenewalModal({ isOpen, onClose, currentPlan = 'basic', upiId, upiQrUrl }: RenewalModalProps) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(currentPlan === 'premium' ? 'premium' : 'basic');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showUpi, setShowUpi] = useState(false);
  
  const [formData, setFormData] = useState({
    utrNumber: '',
  });

  const price = selectedPlan === 'premium' 
    ? (billingCycle === 'yearly' ? 4799 : 499) 
    : (billingCycle === 'yearly' ? 1899 : 199);
  const planName = selectedPlan === 'premium' ? 'Premium Plan' : 'Basic Plan';
  
  const displayUpiId = upiId || 'adarshtiwari2412-4@okhdfcbank';

  const handleCopy = () => {
    navigator.clipboard.writeText(displayUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('token');
      // POST /api/renewal/request
      const res = await fetch(`${API_BASE_URL}/api/renewal/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({
          plan: selectedPlan,
          amount_paid: price,
          billing_cycle: billingCycle,
          utr_number: formData.utrNumber,
          payment_method: 'upi'
        })
      });
      if (!res.ok) {
        throw new Error('Failed to submit renewal request');
      }
      setStep(3);
      // We do not close automatically to let user see success screen
      // When closed, they will see pending banner if the parent page refreshes or updates state
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request. Please try again.");
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
                  <h2 className="text-2xl font-bold text-slate-900">Renew Your Plan</h2>
                  
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
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Manual Payment</h2>
                  <p className="text-slate-600 text-sm">
                    Pay ₹{price} via UPI to renew the {planName}.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">UPI ID</p>
                      <p className="font-mono text-slate-900">{showUpi ? displayUpiId : '*****************************'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowUpi(!showUpi)}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        {showUpi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={handleCopy}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {upiQrUrl && (
                    <div className="flex justify-center my-4">
                      <img src={upiQrUrl} alt="UPI QR Code" className="w-48 h-48 object-contain border border-slate-200 rounded-xl" />
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-100">
                    <p className="text-sm font-bold text-slate-900">After paying, fill this:</p>
                    
                    <input 
                      required type="text" placeholder="12-digit UTR from UPI app"
                      value={formData.utrNumber} onChange={e => setFormData({...formData, utrNumber: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />

                    <button 
                      type="submit" disabled={loading}
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-70"
                    >
                      {loading ? 'Submitting...' : 'Submit Renewal Request →'}
                    </button>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="text-center space-y-6 py-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <Check className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Request received!</h2>
                  <p className="text-slate-600">We'll verify and reactivate within a few hours.</p>

                  <button 
                    onClick={() => {
                      onClose();
                      window.location.reload(); // Quick way to refresh dashboard state
                    }}
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

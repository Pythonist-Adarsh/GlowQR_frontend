'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const theme = {
    bgPrimary: '#FAFAF8',
    bgCard: '#FFFFFF',
    textPrimary: '#1F2430',
    textSecondary: '#62687A',
    accent: '#2F5FE0',
    borderDefault: '#E2E4E9',
    successMain: '#0F835A',
  };

  const trustStatements = [
    "AI review generation included in every plan — no hidden upgrade, no asterisk",
    "Yearly price locked for 12 months — no surprise renewal hike",
    "Cancel anytime, no long-term contract"
  ];

  return (
    <div style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary }} className="min-h-screen flex flex-col font-sans">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full flex-1">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p style={{ color: theme.textSecondary }} className="text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Everything you need to capture more reviews, beautifully.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Trust Statements */}
          <div className="lg:col-span-5 flex flex-col space-y-10 order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-2">No surprises. Just results.</h2>
            <div className="space-y-8">
              {trustStatements.map((statement, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 className="w-7 h-7" style={{ color: theme.accent }} />
                  </div>
                  <p className="text-lg leading-relaxed font-semibold">
                    {statement}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="pt-6">
              <Link href="/register">
                <button 
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white text-lg flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20" 
                  style={{ backgroundColor: theme.accent }}
                >
                  Start 3-Day Free Trial <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <p style={{ color: theme.textSecondary }} className="text-sm mt-4 text-center sm:text-left font-medium">
                No credit card required for trial.
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 order-1 lg:order-2">
            
            {/* Basic Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl p-8 shadow-sm flex flex-col transition-colors duration-300"
              style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderDefault}` }}
            >
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="mb-8">
                <span className="text-5xl font-black">₹199</span>
                <span style={{ color: theme.textSecondary }} className="text-lg font-medium">/mo</span>
                <div style={{ color: theme.textSecondary }} className="text-sm font-semibold mt-2">
                  or ₹1899/year
                </div>
              </div>
              
              <div className="flex-1 space-y-5 mb-10">
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> Up to 500 scans/mo
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> Custom QR code
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> Basic Analytics
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> 3 AI Variants
                </div>
              </div>
              <Link href="/register?plan=basic" className="mt-auto">
                <button 
                  className="w-full py-4 rounded-xl font-bold text-lg transition-colors hover:bg-slate-50"
                  style={{ color: theme.textPrimary, border: `2px solid ${theme.borderDefault}` }}
                >
                  Choose Basic
                </button>
              </Link>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl p-8 shadow-2xl flex flex-col relative"
              style={{ backgroundColor: theme.bgCard, border: `2px solid ${theme.accent}` }}
            >
              <div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md"
                style={{ backgroundColor: theme.accent }}
              >
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="mb-8">
                <span className="text-5xl font-black">₹499</span>
                <span style={{ color: theme.textSecondary }} className="text-lg font-medium">/mo</span>
                <div style={{ color: theme.accent }} className="text-sm font-bold mt-2">
                  or ₹4799/year (Save ~20%)
                </div>
              </div>
              
              <div className="flex-1 space-y-5 mb-10">
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> Unlimited scans
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> Instagram Follow Screen
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> Advanced Analytics
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> 5 AI Variants
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.successMain }} /> Negative Review Shield
                </div>
              </div>
              <Link href="/register?plan=premium" className="mt-auto">
                <button 
                  className="w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-opacity hover:opacity-90" 
                  style={{ backgroundColor: theme.accent }}
                >
                  Choose Premium
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

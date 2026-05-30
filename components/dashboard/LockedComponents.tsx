import React from 'react';
import { useRouter } from 'next/navigation';

export const LockedSection = ({ title, description, requiredPlan, price }: { title: string, description: string, requiredPlan: string, price: string }) => {
  const router = useRouter();
  return (
    <div className="relative rounded-xl border border-slate-200 p-6 bg-slate-50 overflow-hidden">
      {/* Blurred fake content behind */}
      <div className="blur-sm opacity-40 pointer-events-none h-32 w-full bg-slate-200 rounded-lg"></div>
      
      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px]">
        <div className="text-3xl mb-2">🔒</div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 text-center mt-1 max-w-xs">{description}</p>
        <span className="mt-3 text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-800 uppercase tracking-widest">
          {requiredPlan} — {price}
        </span>
        <button 
          onClick={() => router.push('/dashboard/subscription')}
          className="mt-4 text-xs font-black text-white bg-slate-900 px-5 py-2.5 rounded-lg hover:bg-slate-800 uppercase tracking-widest transition-colors"
        >
          Upgrade to {requiredPlan}
        </button>
      </div>
    </div>
  );
};

export const ExpiredOverlay = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="relative w-full h-full">
      <div className="opacity-30 pointer-events-none grayscale">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-red-100 text-center max-w-md">
          <div className="text-5xl mb-4">😴</div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Your plan has expired</h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Your QR code is currently inactive. Customers who scan it will see an inactive screen. Reactivate today to start collecting reviews again.
          </p>
          <button 
            onClick={() => router.push('/dashboard/subscription')}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-black uppercase tracking-widest transition-colors"
          >
            Reactivate Now
          </button>
        </div>
      </div>
    </div>
  );
};

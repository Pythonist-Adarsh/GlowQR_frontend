'use client';

import { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';
import { 
  LayoutDashboard, 
  QrCode, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  LogOut, 
  Plus, 
  ExternalLink, 
  Copy, 
  Download,
  Star,
  Users,
  Eye,
  TrendingUp,
  MapPin,
  Globe,
  Palette,
  Sparkles,
  Lock
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [businessData, setBusinessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('glowqr_business_data');
    if (data) {
      setBusinessData(JSON.parse(data));
    } else {
      router.push('/onboarding');
    }
    setLoading(false);
  }, [router]);

  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
  const qrRef = useRef<any>(null);
  const qrCode = useRef<any>(null);

  const b = businessData || {
    name: 'Your Business',
    tagline: 'Premium Experience',
    category: 'Restaurant',
    address: 'Lucknow, India',
    primaryColor: '#1a8a3c',
    logo: null
  };

  const user = { 
    plan: b?.plan || 'basic', 
    trialEndsAt: b?.trialEndsAt || new Date(Date.now() + 7 * 86400000).toISOString() 
  }; 

  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradePlan, setUpgradePlan] = useState<'basic' | 'premium'>('basic');

  const openUpgradeModal = (plan: 'basic' | 'premium') => {
    setUpgradePlan(plan);
    setUpgradeModalOpen(true);
  };

  const reviewUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/r/${(b.name || 'business').toLowerCase().replace(/\s+/g, '-')}`
    : `https://glow-qr-frontend.vercel.app/r/${(b.name || 'business').toLowerCase().replace(/\s+/g, '-')}`;

  useEffect(() => {
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      const qrConfig = {
        width: 160,
        height: 160,
        data: reviewUrl || 'https://glow-qr-frontend.vercel.app',
        image: user.plan === 'expired' ? undefined : (b.logo || undefined),
        dotsOptions: { color: b.primaryColor || '#1D9E75', type: "rounded" as any },
        cornersSquareOptions: { color: b.primaryColor || '#1D9E75', type: "extra-rounded" as any },
        imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.35 },
        backgroundOptions: { color: '#ffffff' }
      };
      if (!qrCode.current) {
        qrCode.current = new QRCodeStyling(qrConfig);
        if (qrRef.current) {
          qrCode.current.append(qrRef.current);
        }
      } else {
        qrCode.current.update(qrConfig);
      }
      setQrCodeLoaded(true);
    });
  }, [reviewUrl, b.logo, b.primaryColor, user.plan]);

  const handleDownloadPng = () => {
    if (qrCode.current) {
      qrCode.current.download({ name: `${(b.name || 'glowqr').toLowerCase().replace(/\s+/g, '-')}-qr`, extension: "png" });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans dashboard-root" suppressHydrationWarning>
      <style>{`
        .dashboard-root, .dashboard-root * {
          font-family: 'Google Sans', 'Plus Jakarta Sans', 'Roboto', sans-serif !important;
        }
        .dashboard-root h1, .dashboard-root h2, .dashboard-root h3, .dashboard-root h4 {
          font-family: 'Google Sans', 'Plus Jakarta Sans', 'Roboto', sans-serif !important;
          letter-spacing: -0.02em;
        }
      `}</style>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
            <QrCode className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">GlowQR</span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { icon: LayoutDashboard, label: 'Overview', active: true },
            { icon: QrCode, label: 'My QR Code' },
            { icon: BarChart3, label: 'Analytics' },
            { icon: MessageSquare, label: 'Reviews' },
            { icon: Palette, label: 'Theme Design' },
            { icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto relative">
        <UpgradeModal isOpen={upgradeModalOpen} onClose={() => setUpgradeModalOpen(false)} defaultPlan={upgradePlan} />
        
        {user.plan === 'expired' && (
          <div className="absolute inset-0 z-40 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center pt-20 pb-20">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-200 max-w-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Your plan has expired</h2>
              <p className="text-slate-600 mb-8">Upgrade to continue accessing your dashboard</p>
              
              <div className="space-y-3 mb-6">
                <button onClick={() => openUpgradeModal('basic')} className="w-full py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-900 hover:border-slate-900 transition-all">
                  Upgrade to Basic ₹299/month
                </button>
                <button onClick={() => openUpgradeModal('premium')} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                  Upgrade to Premium ₹699/month
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium">Your QR code still works for customers (Basic scan)</p>
            </div>
          </div>
        )}

        {user.plan === 'trial' && (() => {
          const daysLeft = Math.ceil((new Date(user.trialEndsAt).getTime() - new Date().getTime()) / 86400000);
          const isUrgent = daysLeft <= 2;
          return (
            <div className={`mb-8 p-4 border rounded-2xl flex items-center justify-between shadow-sm ${isUrgent ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-center gap-3">
                <Star className={`w-5 h-5 ${isUrgent ? 'text-red-500' : 'text-amber-500'}`} />
                <p className={`text-sm font-bold ${isUrgent ? 'text-red-900' : 'text-amber-900'}`}>
                  ⏰ Your free trial ends in {daysLeft} days
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => openUpgradeModal('basic')} className="px-4 py-2 border border-amber-300 text-amber-800 bg-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-100 transition-all">
                  Upgrade to Basic ₹299
                </button>
                <button onClick={() => openUpgradeModal('premium')} className={`px-4 py-2 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isUrgent ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}>
                  Upgrade to Premium ₹699
                </button>
              </div>
            </div>
          );
        })()}

        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Welcome, {b.name}</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">{b.tagline}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => window.open(reviewUrl, '_blank')} className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              View Live Page
            </button>
            <button onClick={handleDownloadPng} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-slate-800 transition-all">
              Download QR
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Scans', value: '1,284', trend: '+12%', icon: Eye, color: 'blue' },
            { label: 'Avg Rating', value: '4.8', trend: '+0.2', icon: Star, color: 'amber' },
            { label: 'New Reviews', value: '86', trend: '+24%', icon: MessageSquare, color: 'emerald' },
            { label: 'Conversion', value: '68%', trend: '+5%', icon: TrendingUp, color: 'purple' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-slate-50 text-slate-600 border border-slate-100">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">{stat.trend}</span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Business Profile Card */}
          <div className="col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8">
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">Active Setup</div>
               </div>
               
               <div className="flex gap-8 items-start">
                  <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                    {b.logo ? (
                      <img src={b.logo} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <Building2 className="w-10 h-10 text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h3 className="text-xl font-black text-slate-900">{b.name}</h3>
                        <p className="text-slate-500 text-sm font-semibold mt-0.5">{b.category} • {b.area || b.city}</p>
                     </div>
                     <div className="flex gap-6">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                           <MapPin className="w-4 h-4 text-slate-400" />
                           {b.city}, {b.address ? 'PIN verified' : 'Incomplete Address'}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                           <Globe className="w-4 h-4 text-slate-400" />
                           {b.website || 'No website linked'}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-10 grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">AI Review Config</p>
                     <p className="text-sm font-bold text-slate-700">3 Variants • English • Classic Theme</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Google Connect</p>
                     <p className="text-sm font-bold text-slate-700 truncate">{b.googleReviewUrl ? 'Linked successfully' : 'Pending'}</p>
                  </div>
               </div>
            </div>

            {/* AI Review Preview Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" /> AI Review Generation
                  </h3>
                  <button className="text-[10px] font-black text-[var(--brand-primary, #1a8a3c)] uppercase tracking-widest hover:underline">Test Simulation</button>
               </div>
               <div className="space-y-4">
                  {[
                    "I had a fantastic dinner at " + b.name + ". The food was outstanding and the service was top-notch!",
                    "Great experience! The atmosphere was perfect and the staff made us feel very welcome."
                  ].map((rev, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#F0F7F0] border border-emerald-100 shadow-sm">
                       <p className="text-sm text-[#085041] leading-relaxed italic font-medium">&quot;{rev}&quot;</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* QR Code & Barcode Card Sidebar column */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group/qr">
               <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl" />
               
               <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-slate-50 p-4 rounded-3xl mb-6 shadow-sm border border-slate-100 transition-transform group-hover/qr:scale-105 relative overflow-hidden">
                     {/* Laser scanning line overlay on QR */}
                     <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10B981] opacity-0 group-hover/qr:opacity-100 transition-opacity z-20 pointer-events-none" style={{
                       animation: 'laserScan 2.5s infinite ease-in-out'
                     }} />
                     
                     <div className="w-[160px] h-[160px] flex items-center justify-center">
                       <div ref={qrRef} />
                     </div>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Your Active QR</h4>
                  <p className="text-slate-500 text-xs mb-8">Ready for scanning</p>
                  
                  <div className="grid grid-cols-2 gap-3 w-full">
                     <button onClick={handleDownloadPng} className="py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all">
                        <Download className="w-4 h-4" /> PNG
                     </button>
                     <button onClick={handleCopyLink} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all">
                        <Copy className="w-4 h-4" /> {linkCopied ? 'Copied!' : 'Link'}
                     </button>
                  </div>
               </div>
            </div>

            {/* Interactive Barcode Widget */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group/barcode cursor-pointer hover:shadow-md transition-all">
              <div className="flex flex-col items-center">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">Retail Scan Visualizer</p>
                
                {/* Barcode Lines with Laser overlay */}
                <div className="relative w-full h-16 bg-slate-50 rounded-2xl flex items-end justify-center px-4 overflow-hidden py-3 border border-slate-100">
                  {/* Glowing green horizontal scanning laser */}
                  <div className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10B981] opacity-0 group-hover/barcode:opacity-100 transition-opacity z-10 pointer-events-none" style={{
                    animation: 'laserScan 2.0s infinite ease-in-out'
                  }} />
                  
                  {/* Pseudo retail Code-128 lines */}
                  <div className="w-full h-full flex justify-between items-stretch">
                    {[
                      2, 4, 1, 3, 1, 2, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 2, 1, 3
                    ].map((width, i) => (
                      <div 
                        key={i} 
                        className="bg-slate-800 transition-all duration-300 origin-bottom rounded-sm"
                        style={{ 
                          width: `${width}px`,
                          opacity: i % 2 === 0 ? 1 : 0, // alternates
                          transform: 'scaleY(1)',
                          animation: i % 3 === 0 ? 'barcodePulse 2.5s infinite ease-in-out' : 'none',
                          animationDelay: `${i * 0.05}s`
                        }} 
                      />
                    ))}
                  </div>
                </div>

                <style>{`
                  @keyframes laserScan {
                    0% { top: 0%; }
                    50% { top: 100%; }
                    100% { top: 0%; }
                  }
                  @keyframes barcodePulse {
                    0% { transform: scaleY(1); opacity: 0.95; }
                    50% { transform: scaleY(0.75); opacity: 0.6; }
                    100% { transform: scaleY(1); opacity: 0.95; }
                  }
                `}</style>
                
                <p className="text-[9px] font-mono text-slate-500 mt-3 font-semibold uppercase tracking-widest">
                  *GLOW-${b.name?.substring(0, 4).toUpperCase().replace(/\s+/g, '') || 'QR'}-2026*
                </p>
              </div>
            </div>

            {/* Growth milestone goal card */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden border border-slate-800">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Growth Goal</p>
                    <p className="text-sm font-bold">100 Reviews</p>
                  </div>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                  <div className="w-3/5 h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               </div>
               <p className="text-[10px] text-white/40 font-medium">You are 40 reviews away from your next milestone!</p>
            </div>
          </div>
        </div>

        {/* Locked Premium Sections */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          {['Heatmap Analytics', 'Conversion Funnel Chart', 'Negative Alerts'].map(title => (
            <div key={title} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden h-48 flex flex-col items-center justify-center group">
              
              {user.plan === 'basic' && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center transition-all group-hover:bg-white/30">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-3">
                    <Lock className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 mb-3">Available in Premium ₹699/month</p>
                  <button onClick={() => openUpgradeModal('premium')} className="text-xs font-black text-white bg-slate-900 uppercase tracking-widest px-4 py-2 rounded-xl shadow-sm hover:bg-slate-800 pointer-events-auto">
                    Upgrade
                  </button>
                </div>
              )}
              
              <div className={`${user.plan === 'basic' ? 'pointer-events-none' : ''} text-center`}>
                <p className="text-sm font-bold text-slate-400 mb-2">{title}</p>
                <div className="w-full h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-slate-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Building2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  )
}

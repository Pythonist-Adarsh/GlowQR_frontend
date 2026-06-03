import React, { useRef } from "react";
import html2canvas from "html2canvas";
import {
  BarChart3,
  ExternalLink,
  Download,
  Star,
  MapPin,
  Globe,
  Sparkles,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  ThumbsDown,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { LockedSection, ExpiredOverlay } from "./LockedComponents";
import { QRCodeCanvas } from "qrcode.react";

export function OverviewTab({
  user,
  b,
  analyticsSummary,
  qrCodes,
  openUpgradeModal,
  setActiveTab,
  reviewUrl,
}: any) {
  const qrCardRef = useRef<HTMLDivElement>(null);
  
  const downloadCard = async () => {
    if (qrCardRef.current) {
      const canvas = await html2canvas(qrCardRef.current, { scale: 3, backgroundColor: '#ffffff' });
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${b.slug || "glowqr"}-printable-card.png`;
      downloadLink.click();
    }
  };

  const plan = user.plan || "trial";
  const now = new Date();
  
  // Calculate expiry days
  let daysLeft = 0;
  if (plan === "trial" && user.trialEndsAt) {
    daysLeft = Math.ceil((new Date(user.trialEndsAt).getTime() - now.getTime()) / 86400000);
  } else if (analyticsSummary?.current_period_end) {
    daysLeft = Math.ceil((new Date(analyticsSummary.current_period_end).getTime() - now.getTime()) / 86400000);
  }

  const renderBanner = () => {
    if (plan === "trial") {
      if (daysLeft <= 1) {
        return (
          <div className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 flex justify-between items-center">
            <div className="font-medium">🔴 Your trial expires tomorrow! Upgrade now to keep your QR active.</div>
            <button onClick={() => openUpgradeModal("basic")} className="px-3 py-1.5 border border-red-300 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
              Upgrade Now →
            </button>
          </div>
        );
      } else {
        return (
          <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 flex justify-between items-center">
            <div className="font-medium">🟡 Your free trial ends in {daysLeft} days — Upgrade to keep your QR active.</div>
            <button onClick={() => openUpgradeModal("basic")} className="px-3 py-1.5 border border-amber-300 rounded-lg text-sm font-bold hover:bg-amber-100 transition-colors">
              Upgrade Now →
            </button>
          </div>
        );
      }
    }
    if ((plan === "basic" || plan === "premium") && daysLeft <= 7) {
      return (
        <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 flex justify-between items-center">
          <div className="font-medium">🟡 Your {plan.charAt(0).toUpperCase() + plan.slice(1)} plan expires in {daysLeft} days — Renew to keep access.</div>
          <button onClick={() => openUpgradeModal(plan)} className="px-3 py-1.5 border border-amber-300 rounded-lg text-sm font-bold hover:bg-amber-100 transition-colors">
            Renew Now →
          </button>
        </div>
      );
    }
    if (plan === "expired") {
      return (
        <div className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 flex justify-between items-center">
          <div className="font-medium">🔴 Your plan has expired. Your QR is inactive. Upgrade to reactivate.</div>
          <button onClick={() => openUpgradeModal("basic")} className="px-3 py-1.5 border border-red-300 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
            Upgrade Now →
          </button>
        </div>
      );
    }
    return null;
  };

  const renderStatCards = () => {
    const isExpired = plan === "expired";
    const totalScans = analyticsSummary?.total_scans || 0;
    const redirects = analyticsSummary?.total_redirects || 0;
    const convRate = analyticsSummary?.conversion_rate || 0;
    const avgRating = analyticsSummary?.google_rating || 0;
    const reviewsThisMonth = analyticsSummary?.reviews_this_month || 0;
    
    const cardClass = `bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col ${isExpired ? 'opacity-50 grayscale' : ''}`;

    const cards = [
      <div key="scans" className={cardClass}>
        <div className="text-slate-400 mb-4"><Eye className="w-5 h-5" /></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Scans</p>
        <p className="text-3xl font-black text-slate-900">{totalScans}</p>
      </div>,
      <div key="redirects" className={cardClass}>
        <div className="text-slate-400 mb-4"><ExternalLink className="w-5 h-5" /></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Google Redirects</p>
        <p className="text-3xl font-black text-slate-900">{redirects}</p>
      </div>,
      <div key="conversion" className={cardClass}>
        <div className="text-slate-400 mb-4"><TrendingUp className="w-5 h-5" /></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Conversion Rate</p>
        <p className="text-3xl font-black text-slate-900">{convRate}%</p>
      </div>
    ];

    if (plan === "trial" || plan === "expired") {
      cards.push(
        <div key="days" className={cardClass}>
          <div className="text-slate-400 mb-4"><BarChart3 className="w-5 h-5" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Days Left</p>
          <p className={`text-3xl font-black ${daysLeft <= 1 ? 'text-red-600' : daysLeft <= 2 ? 'text-amber-500' : 'text-emerald-600'}`}>
            {Math.max(0, daysLeft)} days
          </p>
        </div>
      );
    } else {
      cards.push(
        <div key="rating" className={cardClass}>
          <div className="text-slate-400 mb-4"><Star className="w-5 h-5" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Rating</p>
          <p className="text-3xl font-black text-slate-900">{avgRating > 0 ? Number(avgRating).toFixed(1) : "0.0"}</p>
        </div>,
        <div key="reviews" className={cardClass}>
          <div className="text-slate-400 mb-4"><MessageSquare className="w-5 h-5" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Reviews This Month</p>
          <p className="text-3xl font-black text-slate-900">{reviewsThisMonth}</p>
        </div>,
        <div key="expiry" className={cardClass}>
          <div className="text-slate-400 mb-4"><BarChart3 className="w-5 h-5" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Plan Expires</p>
          <p className={`text-xl font-black ${daysLeft <= 7 ? 'text-red-600' : 'text-slate-900'}`}>
            {analyticsSummary?.current_period_end ? new Date(analyticsSummary.current_period_end).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}
          </p>
        </div>
      );
    }

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cards.length > 4 ? '3' : '4'} gap-6 mb-8`}>
        {cards}
      </div>
    );
  };

  const renderDashboardContent = () => {
    const isBasicOrPremium = plan === "basic" || plan === "premium";
    const isPremium = plan === "premium";
    
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Business Info Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6 relative">
            <div className="absolute top-8 right-8 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
              Active Setup
            </div>
            <div className="h-24 max-w-[16rem] rounded-2xl border-4 border-white shadow-lg overflow-hidden shrink-0 flex items-center justify-center bg-white p-1" style={{ backgroundColor: '#ffffff' }}>
              {(b.logo_url || b.logo) ? (
                <img 
                  src={b.logo_url || b.logo} 
                  alt="Logo" 
                  className="max-h-full max-w-full object-contain" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }} 
                />
              ) : null}
              {!(b.logo_url || b.logo) && (
                <div className="w-24 h-24 flex items-center justify-center text-white font-bold text-xl rounded-full" style={{ backgroundColor: b.primaryColor || "#1a8a3c" }}>
                  {b.name?.charAt(0) || "B"}
                </div>
              )}
              {/* Fallback element for onError */}
              <div style={{display: 'none'}} className="w-24 h-24 items-center justify-center text-white font-bold text-xl rounded-full bg-slate-900">
                  {b.name?.charAt(0) || "B"}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-black text-slate-900">{b.name}</h2>
              <p className="text-slate-500 mb-3">{b.category} • {b.city}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600"><MapPin className="w-4 h-4" /> {b.city}, PIN verified</div>
                {(b.website_url || b.website) && <a href={b.website_url || b.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"><Globe className="w-4 h-4" /> Website</a>}
                {b.google_review_url && <a href={b.google_review_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:underline"><Star className="w-4 h-4" /> Google Review Link</a>}
              </div>
            </div>
          </div>

          {/* Category Ratings */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Star className="w-5 h-5 text-emerald-500" /> Category Ratings</h3>
            <div className="space-y-4">
              {[
                { label: "Food Quality", icon: "🍽️", value: analyticsSummary?.category_ratings?.food || 0 },
                { label: "Service", icon: "👋", value: analyticsSummary?.category_ratings?.service || 0 },
                { label: "Environment", icon: "✨", value: analyticsSummary?.category_ratings?.environment || 0 }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span>{item.icon}</span> {item.label}
                  </div>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
                    <div className="h-full rounded-full transition-all" style={{ width: `${(item.value / 5) * 100}%`, backgroundColor: b.primaryColor || "#1a8a3c" }} />
                  </div>
                  <div className="w-12 text-right font-black text-slate-900 flex items-center justify-end gap-1">
                    {item.value.toFixed(1)}
                    {item.value > 0 && item.value < 3.5 && <AlertCircle className="w-4 h-4 text-amber-500" />}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">Based on customer scan ratings</p>
          </div>

          {/* Scans Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Scans {plan === "trial" ? "(Last 7 Days)" : "(Last 30 Days)"}</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {plan === "trial" ? (
                  <BarChart data={analyticsSummary?.scans_chart?.data || []}>
                    <XAxis dataKey="date" tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="scans" fill={b.primaryColor || "#1a8a3c"} radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={analyticsSummary?.scans_chart?.data || []}>
                    <XAxis dataKey="date" tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip />
                    <Line type="monotone" dataKey="scans" stroke={b.primaryColor || "#1a8a3c"} strokeWidth={3} dot={false} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Basic+ Rating Breakdown & Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2.5rem] shadow-sm flex flex-col h-full">
              {isBasicOrPremium ? (
                <div className="p-8">
                  <h3 className="font-bold text-slate-900 mb-6">Rating Breakdown</h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(star => {
                      const count = analyticsSummary?.ratings_split?.[star] || 0;
                      const total = Object.values(analyticsSummary?.ratings_split || {}).reduce((a: any, b: any) => a + b, 0) as number;
                      const pct = total > 0 ? (count / total) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-700 w-4">{star}</span>
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-slate-500 w-6 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <LockedSection 
                  title="Rating Breakdown" 
                  description="See how customers rate you — 5★ to 1★ distribution" 
                  requiredPlan="Basic" 
                  price="₹199/mo" 
                />
              )}
            </div>
            
            <div className="bg-white rounded-[2.5rem] shadow-sm flex flex-col h-full">
              {isBasicOrPremium ? (
                <div className="p-8">
                  <h3 className="font-bold text-slate-900 mb-6">Top Menu Items</h3>
                  <div className="space-y-4">
                    {analyticsSummary?.top_menu_items?.items?.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{item.count}</span>
                      </div>
                    ))}
                    {(!analyticsSummary?.top_menu_items?.items || analyticsSummary.top_menu_items.items.length === 0) && (
                      <p className="text-sm text-slate-400">No data yet.</p>
                    )}
                  </div>
                </div>
              ) : (
                <LockedSection 
                  title="Top Menu Items" 
                  description="See which dishes your customers love most" 
                  requiredPlan="Basic" 
                  price="₹199/mo" 
                />
              )}
            </div>
          </div>

          {/* Premium AI Insights */}
          <div className="bg-white rounded-[2.5rem] shadow-sm">
            {isPremium ? (
              <div className="p-8">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-500" /> AI Problem Detection</h3>
                {analyticsSummary?.ai_insights?.length > 0 ? (
                   <ul className="space-y-4">
                     {analyticsSummary.ai_insights.map((insight: any, idx: number) => (
                       <li key={idx} className="p-4 bg-purple-50 rounded-xl text-purple-900 text-sm font-medium">{insight}</li>
                     ))}
                   </ul>
                ) : (
                   <p className="text-sm text-slate-500">AI needs more data to generate insights. Check back later.</p>
                )}
                <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest text-right">Generated by AI</p>
              </div>
            ) : (
              <LockedSection 
                title="AI Problem Detection" 
                description="AI analyzes your ratings and tells you exactly what to fix" 
                requiredPlan="Premium" 
                price="₹499/mo" 
              />
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-4 flex flex-col gap-6">
            {/* QR Card */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center">
              
              {/* Printable Card Area */}
              <div ref={qrCardRef} className="w-full max-w-[260px] bg-white pt-8 pb-6 px-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 flex items-center justify-center bg-transparent">
                  {b.logo_url ? (
                    <img src={b.logo_url} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full rounded-full border-2 border-slate-900 border-dashed flex items-center justify-center">
                      <span className="text-[10px] font-black text-slate-900 leading-none text-center">YOUR<br/>LOGO</span>
                    </div>
                  )}
                </div>
                <h4 className="text-[19px] font-black text-slate-900 mb-4 text-center leading-tight tracking-tight px-2">{b.name}</h4>
                
                <div className="bg-white p-1 mb-4 border border-slate-100 rounded-xl shadow-sm">
                  {b.qr_image_url ? (
                    <img src={b.qr_image_url} alt="QR Code" className="w-40 h-40 object-contain" />
                  ) : (
                    <QRCodeCanvas
                      value={reviewUrl}
                      size={160}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                    />
                  )}
                </div>
                
                <p className="text-[12px] text-center font-bold text-slate-800 leading-tight mb-3 px-2">
                  Scan the QR code to<br />leave us a review on<br />
                  <span className="inline-flex mt-2">
                    <span className="text-blue-500 font-black text-xl tracking-tighter">G</span>
                    <span className="text-red-500 font-black text-xl tracking-tighter">o</span>
                    <span className="text-yellow-500 font-black text-xl tracking-tighter">o</span>
                    <span className="text-blue-500 font-black text-xl tracking-tighter">g</span>
                    <span className="text-green-500 font-black text-xl tracking-tighter">l</span>
                    <span className="text-red-500 font-black text-xl tracking-tighter">e</span>
                  </span>
                </p>
                
                <div className="flex gap-1.5 text-yellow-400 mt-1">
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1">Your Printable QR</h3>
              <p className="text-xs text-slate-500 font-medium mb-6">Perfect for tables & counters</p>
              
              <div className="flex w-full gap-3">
                <button
                  onClick={downloadCard}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <Download className="w-4 h-4" /> PNG
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(reviewUrl);
                    alert("Link copied!");
                  }}
                  className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <ExternalLink className="w-4 h-4" /> Link
                </button>
              </div>
              <button
                onClick={() => window.open(reviewUrl, "_blank")}
                className="w-full mt-3 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4" /> Test AR Simulation
              </button>
            </div>

            {/* AI Review Generation preview */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> AI Reviews
                </h3>
                <button
                  onClick={() => window.open(reviewUrl, "_blank")}
                  className="text-[10px] font-black text-[var(--brand-primary, #1a8a3c)] uppercase tracking-widest hover:underline"
                >
                  Test Simulation
                </button>
              </div>
              <div className="space-y-4">
                {analyticsSummary?.recent_reviews?.length > 0 ? (
                  <>
                    {analyticsSummary.recent_reviews.slice(0, 3).map(
                      (rev: any, i: number) => (
                        <div key={i} className="p-4 rounded-2xl bg-[#F0F7F0] border border-emerald-100 shadow-sm flex flex-col gap-2">
                          <div className="flex items-center gap-1 text-emerald-500">
                            {Array.from({ length: rev.overall_rating || 5 }).map((_, j) => (
                              <Star key={j} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-[#085041] leading-relaxed italic font-medium line-clamp-2">
                            &quot;{rev.review_text || `Customer enjoyed their visit and highlighted the ${rev.selected_items?.join(", ") || "service"}!`}&quot;
                          </p>
                        </div>
                      )
                    )}
                    {analyticsSummary.recent_reviews.length > 3 && (
                      <button 
                        onClick={() => setActiveTab('reviews')}
                        className="w-full py-3 mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                      >
                        View All {analyticsSummary.recent_reviews.length} Reviews
                      </button>
                    )}
                  </>
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm text-center">
                    <p className="text-sm text-slate-400 font-medium italic">No AI generated reviews yet. Scan your QR to test it!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Menu Items Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm col-span-1 md:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">🍔</span>
                  Your Menu Items
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {b.menu_items && b.menu_items.length > 0 ? (
                  b.menu_items.map((item: any, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border border-slate-200"
                    >
                      {item.name || item}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 font-medium italic">No menu items added. Add them in the setup tab!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (plan === "expired") {
    return (
      <div className="w-full">
        {renderBanner()}
        {renderStatCards()}
        <ExpiredOverlay>
          {renderDashboardContent()}
        </ExpiredOverlay>
      </div>
    );
  }

  return (
    <div className="w-full">
      {renderBanner()}
      {renderStatCards()}
      {renderDashboardContent()}
    </div>
  );
}

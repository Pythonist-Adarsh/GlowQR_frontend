import React, { useRef } from "react";
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
import QRCardCanvas, { QRCardRef } from '@/components/QRCardCanvas';
import { API_BASE_URL } from "@/lib/api-config";

const CATEGORY_RATING_LABELS: Record<string, { r1: string, r2: string, r3: string }> = {
  "restaurant": { r1: "Food Quality", r2: "Service", r3: "Ambiance" },
  "cafe / coffee shop": { r1: "Brew Quality", r2: "Service", r3: "Ambiance" },
  "fast food / qsr": { r1: "Food Quality", r2: "Speed", r3: "Cleanliness" },
  "bar / lounge": { r1: "Drinks Quality", r2: "Service", r3: "Vibe" },
  "bakery / dessert shop": { r1: "Taste", r2: "Service", r3: "Ambiance" },
  "food court": { r1: "Food Quality", r2: "Service", r3: "Cleanliness" },
  "fine dining": { r1: "Food Quality", r2: "Service", r3: "Fine Dining Experience" },
  "food truck": { r1: "Food Quality", r2: "Speed", r3: "Value for Money" },
  "cloud kitchen": { r1: "Food Quality", r2: "Packaging", r3: "Delivery Speed" },
  "salon": { r1: "Work Quality", r2: "Staff Behaviour", r3: "Cleanliness" },
  "spa": { r1: "Treatment Quality", r2: "Staff Behaviour", r3: "Ambiance" },
  "gym": { r1: "Equipment Quality", r2: "Trainer Support", r3: "Cleanliness" },
  "retail": { r1: "Product Quality", r2: "Staff Helpfulness", r3: "Store Experience" },
  "bridal & festive jewellery": { r1: "Collection Quality", r2: "Staff Helpfulness", r3: "Store Experience" },
  "hotel": { r1: "Room Quality", r2: "Staff Service", r3: "Facilities" },
  "medical": { r1: "Treatment Quality", r2: "Doctor Behaviour", r3: "Cleanliness" },
  "education": { r1: "Teaching Quality", r2: "Faculty Support", r3: "Infrastructure" },
  "tax / ca firm": { r1: "Service Quality", r2: "Staff Professionalism", r3: "Response Time" },
  "real estate": { r1: "Property/Deal Quality", r2: "Agent Professionalism", r3: "Transparency" },
  "real_estate": { r1: "Property/Deal Quality", r2: "Agent Professionalism", r3: "Transparency" },
  "other": { r1: "Quality", r2: "Service", r3: "Experience" },
};

const SECTION_TITLES: Record<string, string> = {
  "tax / ca firm": "Top Services Used",
  "education": "Top Courses / Services",
  "salon": "Top Services",
  "spa": "Top Treatments",
  "gym": "Top Services",
  "retail": "Top Products",
  "bridal & festive jewellery": "Top Collections",
  "medical": "Top Services",
  "hotel": "Top Services",
  "real estate": "Top Properties",
  "real_estate": "Top Properties",
};

export function OverviewTab({
  user,
  b,
  analyticsSummary,
  qrCodes,
  openUpgradeModal,
  setActiveTab,
  reviewUrl,
}: any) {
  const qrCardRef = useRef<QRCardRef>(null);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const plan = user.plan || "trial";
  const now = new Date();
  
  // Calculate expiry days
  let daysLeft = Infinity;
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
    const data = analyticsSummary?.reviews_data;
    
    // If reviews_data isn't loaded yet, return null or skeleton
    if (!data) return null;

    const cardClass = `bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col ${isExpired ? 'opacity-50 grayscale' : ''}`;

    const cards = [
      <div key="scans" className={cardClass}>
        <div className="text-slate-400 mb-4"><Eye className="w-5 h-5" /></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Scans</p>
        <p className="text-3xl font-black text-slate-900">{data.total_scans}</p>
        <p className="text-xs text-slate-400 mt-2 font-medium">Customers who scanned QR</p>
      </div>,
      <div key="opened" className={cardClass}>
        <div className="text-slate-400 mb-4"><ExternalLink className="w-5 h-5" /></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Opened Google Review</p>
        <p className="text-3xl font-black text-slate-900">{data.redirected_to_google}</p>
        <p className="text-xs text-slate-400 mt-2 font-medium">Redirected to Google Maps</p>
      </div>,
      <div key="bounced" className={`${cardClass} border-amber-200 bg-amber-50/30`}>
        <div className="text-amber-400 mb-4"><BarChart3 className="w-5 h-5" /></div>
        <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Only Scanned (Not Opened)</p>
        <p className="text-3xl font-black text-slate-900">{data.only_scanned_not_opened}</p>
        <p className="text-xs text-amber-600 mt-2 font-medium">Left without opening review page</p>
      </div>,
      <div key="new_reviews" className={`${cardClass} border-emerald-200 ${data.reviews_gained > 0 ? 'bg-emerald-50/30' : 'bg-slate-50/50'} shadow-md transition-all duration-500`} id="card-new-reviews">
        <div className={`${data.reviews_gained > 0 ? 'text-emerald-500' : 'text-slate-400'} mb-4`}><MessageSquare className="w-5 h-5" /></div>
        <p className={`text-[10px] font-black ${data.reviews_gained > 0 ? 'text-emerald-700' : 'text-slate-500'} uppercase tracking-widest mb-1`}>New Reviews on Google</p>
        <p className={`text-3xl font-black ${data.reviews_gained > 0 ? 'text-emerald-600' : 'text-slate-500'}`}>{data.reviews_gained ?? "—"}</p>
        <p className={`text-xs ${data.reviews_gained > 0 ? 'text-emerald-600' : 'text-slate-400'} mt-2 font-medium`}>
          Baseline: {data.baseline_review_count ?? 0} → Now: {data.review_count_now ?? 0}
        </p>
      </div>,
      <div key="rating" className={cardClass} id="card-rating">
        <div className="text-slate-400 mb-4"><Star className="w-5 h-5" /></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Google Rating</p>
        <p className="text-3xl font-black text-slate-900">{data.google_rating ? `${data.google_rating}★` : "—"}</p>
      </div>,
      <div key="redirect_rate" className={cardClass}>
        <div className="text-slate-400 mb-4"><TrendingUp className="w-5 h-5" /></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Redirect Rate</p>
        <p className="text-3xl font-black text-slate-900">{data.redirect_rate}%</p>
        <p className="text-xs text-slate-400 mt-2 font-medium">Scan → Google page open</p>
      </div>,
    ];

    // Append Plan Expires / Days Left card if necessary
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
        <div key="expiry" className={cardClass}>
          <div className="text-slate-400 mb-4"><BarChart3 className="w-5 h-5" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Plan Expires</p>
          <p className={`text-xl font-black mt-2 ${daysLeft <= 7 ? 'text-red-600' : 'text-slate-900'}`}>
            {analyticsSummary?.current_period_end ? new Date(analyticsSummary.current_period_end).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards}
      </div>
    );
  };

  const handleSyncNow = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/business/sync-now`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        document.getElementById('card-new-reviews')?.classList.add('bg-emerald-100');
        document.getElementById('card-rating')?.classList.add('bg-emerald-100');
        setTimeout(() => {
          document.getElementById('card-new-reviews')?.classList.remove('bg-emerald-100');
          document.getElementById('card-rating')?.classList.remove('bg-emerald-100');
        }, 1000);
        setTimeout(() => window.location.reload(), 1500); // Reload dashboard
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Sync failed: ${errData.detail || "Server error"}`);
      }
    } catch (e: any) {
      alert(`Sync failed: ${e.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const renderDashboardContent = () => {
    const isBasicOrPremium = plan === "basic" || plan === "premium";
    const isPremium = plan === "premium";
    const data = analyticsSummary?.reviews_data;
    
    const catLower = b.category?.toLowerCase() || "";
    const ratingLabels = CATEGORY_RATING_LABELS[catLower] || CATEGORY_RATING_LABELS["other"];
    const topItemsTitle = SECTION_TITLES[catLower] || "Top Menu Items";
    const yourItemsTitle = SECTION_TITLES[catLower] ? SECTION_TITLES[catLower].replace("Top ", "Your ") : "Your Menu Items";

    const hasUnconfiguredTopItems = analyticsSummary?.top_menu_items?.items?.some((i: any) => i.name?.startsWith('srv_') || i.name?.startsWith('tax_def_'));
    const hasUnconfiguredMenu = b.menu_items?.some((i: any) => {
      const n = i.name || i;
      return typeof n === 'string' && (n.startsWith('srv_') || n.startsWith('tax_def_'));
    });

    return (
      <div className="flex flex-col lg:flex-row gap-6 relative">
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {data && (
            <div className="flex justify-between items-center mb-[-1rem]">
              <div></div>
              <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-blue-500" />
                {data.has_place_id 
                  ? `● LAST SYNCED: ${data.last_synced_at ? new Date(data.last_synced_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'Pending'}` 
                  : <span className="text-amber-600 font-bold">⚠️ Add your Google Place ID in Setup to enable daily sync</span>}
                {data.has_place_id && (
                  <button 
                    onClick={handleSyncNow} 
                    disabled={isSyncing}
                    className="ml-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase transition-colors"
                  >
                    {isSyncing ? "Syncing..." : "Sync Now"}
                  </button>
                )}
              </div>
            </div>
          )}
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
                { label: ratingLabels.r1, icon: "🍽️", value: analyticsSummary?.category_ratings?.food || 0 },
                { label: ratingLabels.r2, icon: "👋", value: analyticsSummary?.category_ratings?.service || 0 },
                { label: ratingLabels.r3, icon: "✨", value: analyticsSummary?.category_ratings?.environment || 0 }
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


          {/* Locked Sections Grid inside Left Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                  <h3 className="font-bold text-slate-900 mb-6">{topItemsTitle}</h3>
                  {hasUnconfiguredTopItems && (
                    <div className="mb-4 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-3 py-2 rounded-lg flex items-center gap-2">
                      ⚠️ Service names not configured — update in Onboarding Setup
                    </div>
                  )}
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

          <div className="mt-6 bg-white rounded-[2.5rem] shadow-sm flex flex-col">
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
              
              <QRCardCanvas
                ref={qrCardRef}
                businessName={b.name}
                logoUrl={b.logo_url}
                scanUrl={reviewUrl}
                slug={b.slug}
              />

              <h3 className="text-lg font-black text-slate-900 mb-1 mt-6">Your Printable QR</h3>
              <p className="text-xs text-slate-500 font-medium mb-6">Perfect for tables & counters</p>
              
              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={() => qrCardRef.current?.download()}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" /> Download Print Card
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(reviewUrl);
                    alert("Link copied!");
                  }}
                  className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <ExternalLink className="w-4 h-4" /> Copy Direct Link
                </button>
                <button
                  onClick={() => window.open(reviewUrl, "_blank")}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" /> Test AR Simulation
                </button>
              </div>
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
                      (rev: any, i: number) => {
                        const isPositive = (rev.overall_rating || 5) >= 3;
                        const bgColor = isPositive ? "bg-[#F0F7F0] border-emerald-100" : "bg-red-50 border-red-100";
                        const textColor = isPositive ? "text-[#085041]" : "text-red-900";
                        const starColor = isPositive ? "text-emerald-500" : "text-red-500";
                        
                        return (
                          <div key={i} className={`p-4 rounded-2xl border shadow-sm flex flex-col gap-2 ${bgColor}`}>
                            <div className={`flex items-center gap-1 ${starColor}`}>
                              {Array.from({ length: rev.overall_rating || 5 }).map((_, j) => (
                                <Star key={j} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <p className={`text-xs leading-relaxed italic font-medium line-clamp-2 ${textColor}`}>
                              &quot;{rev.review_text || `Customer left a rating of ${rev.overall_rating || 5} stars.`}&quot;
                            </p>
                          </div>
                        );
                      }
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
                  {yourItemsTitle}
                </h3>
              </div>
              {hasUnconfiguredMenu && (
                <div className="mb-4 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-3 py-2 rounded-lg flex items-center gap-2">
                  ⚠️ Service names not configured — update in Onboarding Setup
                </div>
              )}
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
                  <p className="text-sm text-slate-400 font-medium italic">No items added. Add them in the setup tab!</p>
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
        {renderStatCards()}
        <ExpiredOverlay>
          {renderDashboardContent()}
        </ExpiredOverlay>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div></div>
        <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Last synced: {new Date().toLocaleDateString()}
        </div>
      </div>
      {renderStatCards()}
      {renderDashboardContent()}
      
      <div className="text-center text-[10px] text-slate-400 mt-12 max-w-2xl mx-auto">
        <p>GlowQR tracks QR scans and Google redirects.</p>
        <p>"New Reviews on Google" is calculated by comparing your baseline review count (entered at onboarding) with your current Google review count, synced daily.</p>
        <p>We cannot confirm which specific scans resulted in a posted review.</p>
      </div>
    </div>
  );
}

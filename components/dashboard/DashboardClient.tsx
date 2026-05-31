"use client";

import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UpgradeModal } from "@/components/dashboard/UpgradeModal";
import { OverviewTab } from "./OverviewTab";
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
  Lock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ThumbsDown,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { API_BASE_URL } from "@/lib/api-config";

export function DashboardClient({
  initialTab = "overview",
}: {
  initialTab?: "overview" | "qr" | "analytics" | "reviews" | "subscription";
}) {
  const router = useRouter();
  const [businessData, setBusinessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [analyticsSummary, setAnalyticsSummary] = useState<any>(null);

  const [qrCodes, setQrCodes] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const res = await fetch(`${API_BASE_URL}/api/onboarding/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch dashboard data");

        const data = await res.json();
        if (data.is_onboarded && data.business) {
          setBusinessData(data.business);
          localStorage.setItem(
            "glowqr_business_data",
            JSON.stringify(data.business),
          );

          // Fetch QR codes
          const qrRes = await fetch(`${API_BASE_URL}/api/business/qr-codes`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (qrRes.ok) {
            const qrData = await qrRes.json();
            setQrCodes(qrData.qr_codes || []);
          }

          const headers = { Authorization: `Bearer ${token}` };
          const [
            analyticsRes,
            catRatingsRes,
            scansChartRes,
            topMenuItemsRes,
            allReviewsRes,
            meRes
          ] = await Promise.all([
            fetch(`${API_BASE_URL}/api/analytics/summary`, { headers }),
            fetch(`${API_BASE_URL}/api/analytics/category-ratings`, { headers }),
            fetch(`${API_BASE_URL}/api/analytics/scans-chart`, { headers }),
            fetch(`${API_BASE_URL}/api/analytics/top-menu-items`, { headers }),
            fetch(`${API_BASE_URL}/api/analytics/all-reviews`, { headers }),
            fetch(`${API_BASE_URL}/api/auth/me`, { headers })
          ]);
          
          if (analyticsRes.ok) {
            const analyticsData = await analyticsRes.json();
            if (catRatingsRes.ok) analyticsData.category_ratings = await catRatingsRes.json();
            if (scansChartRes.ok) analyticsData.scans_chart = await scansChartRes.json();
            if (topMenuItemsRes.ok) analyticsData.top_menu_items = await topMenuItemsRes.json();
            if (allReviewsRes.ok) analyticsData.all_reviews = (await allReviewsRes.json()).reviews;
            if (meRes.ok) {
               const meData = await meRes.json();
               analyticsData.current_period_end = meData.user.current_period_end;
               analyticsData.plan = meData.user.plan;
               // update business plan
               data.business.plan = meData.user.plan;
               setBusinessData({...data.business});
            }
            
            // premium fetches
            if (analyticsData.plan === 'premium') {
              try {
                const [heatmapRes, funnelRes, negAlertsRes, aiInsightsRes] = await Promise.all([
                   fetch(`${API_BASE_URL}/api/analytics/heatmap`, { headers }),
                   fetch(`${API_BASE_URL}/api/analytics/funnel`, { headers }),
                   fetch(`${API_BASE_URL}/api/analytics/negative-alerts`, { headers }),
                   fetch(`${API_BASE_URL}/api/analytics/ai-insights`, { headers })
                ]);
                if (heatmapRes.ok) analyticsData.heatmap = (await heatmapRes.json()).heatmap;
                if (funnelRes.ok) analyticsData.funnel = (await funnelRes.json()).funnel;
                if (negAlertsRes.ok) analyticsData.negative_alerts = (await negAlertsRes.json()).alerts;
                if (aiInsightsRes.ok) analyticsData.ai_insights = (await aiInsightsRes.json()).insights;
              } catch (e) { console.error('Premium fetch error', e); }
            }
            setAnalyticsSummary(analyticsData);
          }
        } else {
          router.push("/onboarding");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [router]);

  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
  const qrRef = useRef<any>(null);
  const qrCode = useRef<any>(null);

  const b = businessData || {
    name: "Your Business",
    tagline: "Premium Experience",
    category: "Restaurant",
    address: "Lucknow, India",
    primaryColor: "#1a8a3c",
    logo: null,
  };

  const user = {
    plan: b?.plan || "basic",
    trialEndsAt:
      b?.trialEndsAt || new Date(Date.now() + 3 * 86400000).toISOString(),
  };

  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradePlan, setUpgradePlan] = useState<"basic" | "premium">("basic");
  const [activeTab, setActiveTab] = useState<
    "overview" | "qr" | "analytics" | "reviews" | "subscription"
  >(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const openUpgradeModal = (plan: "basic" | "premium") => {
    setUpgradePlan(plan);
    setUpgradeModalOpen(true);
  };

  const fallbackSlug = (b.name || "business")
    .toLowerCase()
    .replace(/\s+/g, "-");
  const reviewUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/r/${b.slug || b.qr_slug || fallbackSlug}`
      : `https://glow-qr-frontend.vercel.app/r/${b.slug || b.qr_slug || fallbackSlug}`;

  useEffect(() => {
    // Legacy qr-code-styling removed in favor of qrcode.react
    setQrCodeLoaded(true);
  }, [reviewUrl, b.logo_url, b.primaryColor, user.plan, loading]);

  const handleDownloadPng = () => {
    const canvas = document.getElementById("active-qr-canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(b.name || "glowqr").toLowerCase().replace(/\s+/g, "-")}-qr.png`;
      a.click();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center dashboard-root">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] flex font-sans dashboard-root"
      suppressHydrationWarning
    >
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
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 shadow-sm h-screen overflow-y-auto sticky top-0">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
            <QrCode className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            GlowQR
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            {
              id: "overview",
              icon: LayoutDashboard,
              label: "Overview",
              action: () => router.push("/dashboard"),
            },
            
            {
              id: "onboarding",
              icon: Settings,
              label: "Onboarding Setup",
              action: () => router.push("/onboarding"),
            },
            {
              id: "analytics",
              icon: BarChart3,
              label: "Analytics",
              action: () => router.push("/analytics"),
            },
            {
              id: "reviews",
              icon: MessageSquare,
              label: "Reviews",
              action: () => router.push("/reviews"),
            },
            {
              id: "theme",
              icon: Palette,
              label: "Theme Design",
              action: () => router.push("/onboarding?step=5"),
            },
            {
              id: "subscription",
              icon: Settings,
              label: "Subscription",
              action: () => router.push("/subscription"),
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id || (item.id === "qr" && activeTab === "overview") ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
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
        <UpgradeModal
          isOpen={upgradeModalOpen}
          onClose={() => setUpgradeModalOpen(false)}
          defaultPlan={upgradePlan}
        />

        {user.plan === "expired" && (
          <div className="absolute inset-0 z-40 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center pt-20 pb-20">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-200 max-w-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Your plan has expired
              </h2>
              <p className="text-slate-600 mb-8">
                Upgrade to continue accessing your dashboard
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => openUpgradeModal("basic")}
                  className="w-full py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-900 hover:border-slate-900 transition-all"
                >
                  Upgrade to Basic ₹299/month
                </button>
                <button
                  onClick={() => openUpgradeModal("premium")}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Upgrade to Premium ₹699/month
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Your QR code still works for customers (Basic scan)
              </p>
            </div>
          </div>
        )}

        {activeTab === "subscription" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Subscription Details
            </h1>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Current Plan:{" "}
                    <span className="capitalize text-[#1D9E75]">
                      {user.plan}
                    </span>
                  </h2>
                  {user.plan === "trial" && (
                    <p className="text-slate-500 font-medium text-lg">
                      Trial ends in {analyticsSummary?.trial_days_left || 3}{" "}
                      days
                    </p>
                  )}
                </div>
                {(user.plan === "trial" || user.plan === "basic") && (
                  <button
                    onClick={() => openUpgradeModal("premium")}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Upgrade Plan
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-700 mb-2">
                    Billing Cycle
                  </h3>
                  <p className="text-slate-900 text-xl font-black">Monthly</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-700 mb-2">
                    Next Payment
                  </h3>
                  <p className="text-slate-900 text-xl font-black">
                    {user.plan === "trial"
                      ? "Upgrade required"
                      : "Oct 24, 2026"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-900 mb-6">All Reviews</h2>
            {(!analyticsSummary?.all_reviews || analyticsSummary.all_reviews.length === 0) ? (
              <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No reviews yet</h3>
                <p className="text-slate-500 text-sm">When customers scan your QR code and leave a review, they will appear here.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {analyticsSummary.all_reviews.map((rev: any, i: number) => (
                  <div key={i} className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-1 text-emerald-500">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-4 h-4 ${j < (rev.overall_rating || 5) ? 'fill-current' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-400">
                        {rev.created_at ? new Date(rev.created_at).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    {rev.selected_items && rev.selected_items.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {rev.selected_items.map((item: string, j: number) => (
                          <span key={j} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold tracking-wider uppercase">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-slate-700 leading-relaxed italic">
                      "{rev.review_text || `Customer enjoyed their visit and left a positive rating!`}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(activeTab === "overview" || activeTab === "qr") && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <OverviewTab 
              user={user} 
              b={b} 
              analyticsSummary={analyticsSummary} 
              qrCodes={qrCodes} 
              openUpgradeModal={openUpgradeModal} 
              setActiveTab={setActiveTab} 
              reviewUrl={reviewUrl} 
            />
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Analytics & Insights
              </h1>
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
                price="₹699/mo" 
              />
            )}
          </div>

          {/* Premium Heatmap & Funnel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-[2.5rem] shadow-sm h-full">
               {isPremium ? (
                 <div className="p-8">
                    <h3 className="font-bold text-slate-900 mb-6">Scan Heatmap</h3>
                    <p className="text-sm text-slate-500 mb-4">Activity by hour of day</p>
                    <div className="w-full h-32 flex flex-wrap gap-1">
                      {/* Simple heatmap mock visualization since full grid requires D3 or complex CSS */}
                      {analyticsSummary?.heatmap?.slice(0, 30).map((h: any, i: number) => (
                         <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: `rgba(26, 138, 60, ${Math.min(1, h.count / 10)})` }} title={`${h.day_of_week} ${h.hour_of_day}:00 - ${h.count} scans`} />
                      ))}
                    </div>
                 </div>
               ) : (
                 <LockedSection 
                  title="Scan Heatmap" 
                  description="See exactly which days and hours your QR gets most scans" 
                  requiredPlan="Premium" 
                  price="₹699/mo" 
                />
               )}
             </div>
             
             <div className="bg-white rounded-[2.5rem] shadow-sm h-full">
               {isPremium ? (
                 <div className="p-8">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><ThumbsDown className="w-5 h-5 text-red-500" /> Negative Alerts</h3>
                    <div className="space-y-3">
                      {analyticsSummary?.negative_alerts?.slice(0,3).map((alert: any, i: number) => (
                        <div key={i} className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-900">
                          <div className="flex items-center gap-1 mb-1">
                             <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                             <span className="font-bold">{alert.rating}/5</span>
                          </div>
                          "{alert.feedback_text}"
                        </div>
                      ))}
                      {(!analyticsSummary?.negative_alerts || analyticsSummary.negative_alerts.length === 0) && (
                        <p className="text-sm text-slate-400">No negative alerts. Great job!</p>
                      )}
                    </div>
                 </div>
               ) : (
                 <LockedSection 
                  title="Negative Alerts" 
                  description="Get notified when a customer gives 1-2 stars before it reaches Google" 
                  requiredPlan="Premium" 
                  price="₹699/mo" 
                />
               )}
             </div>
          </div>

          {/* Premium Conversion Funnel */}
          <div className="bg-white rounded-[2.5rem] shadow-sm w-full">
            {isPremium ? (
              <div className="p-8">
                <h3 className="font-bold text-slate-900 mb-6">Conversion Funnel</h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {['scanned', 'opened', 'rated', 'copied', 'posted'].map((stage, i) => {
                     const stageData = analyticsSummary?.funnel?.[stage];
                     return (
                       <div key={stage} className="flex-1 flex flex-col items-center">
                         <div className="w-full text-center py-4 bg-emerald-50 rounded-xl mb-2 border border-emerald-100">
                           <p className="text-lg font-black text-emerald-700">{stageData?.pct || 0}%</p>
                           <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{stage}</p>
                         </div>
                         {i < 4 && <ChevronRight className="w-5 h-5 text-slate-300 hidden md:block" />}
                       </div>
                     );
                  })}
                </div>
              </div>
            ) : (
              <LockedSection 
                title="Conversion Funnel" 
                description="See where customers drop off in the review journey" 
                requiredPlan="Premium" 
                price="₹699/mo" 
              />
            )}
          </div>
          </div>
        )}

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-4 flex flex-col gap-6">
            {/* QR Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-48 h-48 bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-sm mb-6 flex items-center justify-center relative">
                {b.qr_image_url ? (
                  <img src={b.qr_image_url} alt="QR Code" className="w-full h-full object-contain" />
                ) : (
                  <QRCodeCanvas
                    value={reviewUrl}
                    size={160}
                    bgColor="#ffffff"
                    fgColor={b.primaryColor || "#1a8a3c"}
                    level="Q"
                  />
                )}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Your Active QR</h3>
              <p className="text-xs text-slate-500 font-medium mb-6">Ready for scanning</p>
              <div className="flex w-full gap-3">
                <button
                  onClick={() => {
                    const canvas = document.querySelector("canvas");
                    if (canvas) {
                      const pngUrl = canvas
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");
                      const downloadLink = document.createElement("a");
                      downloadLink.href = pngUrl;
                      downloadLink.download = `${b.slug || "glowqr"}-code.png`;
                      document.body.appendChild(downloadLink);
                      downloadLink.click();
                      document.body.removeChild(downloadLink);
                    } else if (b.qr_image_url) {
                      window.open(b.qr_image_url, "_blank");
                    }
                  }}
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
            </div>
          </div>
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
  );
}

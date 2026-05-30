"use client";

import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UpgradeModal } from "@/components/dashboard/UpgradeModal";
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

          // Fetch analytics summary
          const analyticsRes = await fetch(
            `${API_BASE_URL}/api/analytics/summary`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          if (analyticsRes.ok) {
            const analyticsData = await analyticsRes.json();
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
      b?.trialEndsAt || new Date(Date.now() + 7 * 86400000).toISOString(),
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
              id: "qr",
              icon: QrCode,
              label: "My QR Code",
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
                      Trial ends in {analyticsSummary?.trial_days_left || 7}{" "}
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
          <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center justify-center pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center">
              Reviews Portal Coming Soon
            </h1>
            <p className="text-slate-500 text-center max-w-md">
              We're building a dedicated portal where you can respond to
              AI-generated and Google reviews directly from your dashboard.
            </p>
          </div>
        )}

        {(activeTab === "overview" || activeTab === "qr") && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {user.plan === "trial" &&
              (() => {
                const daysLeft = Math.ceil(
                  (new Date(user.trialEndsAt).getTime() -
                    new Date().getTime()) /
                    86400000,
                );
                const isUrgent = daysLeft <= 2;
                return (
                  <div
                    className={`mb-8 p-4 border rounded-2xl flex items-center justify-between shadow-sm ${isUrgent ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isUrgent ? 'bg-red-500' : 'bg-amber-500'} animate-pulse`} />
                      <p
                        className={`text-sm font-bold ${isUrgent ? "text-red-900" : "text-amber-900"}`}
                      >
                        Your free trial ends in {daysLeft} days — Upgrade to keep your QR active
                      </p>
                    </div>
                    <button
                      onClick={() => openUpgradeModal("premium")}
                      className={`px-4 py-2 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isUrgent ? "bg-red-500 hover:bg-red-600" : "bg-amber-500 hover:bg-amber-600"}`}
                    >
                      Upgrade Now →
                    </button>
                  </div>
                );
              })()}

            <header className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-3xl font-black text-slate-900">
                  Welcome, {b.name}
                </h1>
                <p className="text-slate-500 text-sm mt-1 font-medium">
                  {b.tagline}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/onboarding")}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                >
                  Edit Setup
                </button>
                <button
                  onClick={() => window.open(reviewUrl, "_blank")}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                >
                  Test Simulation
                </button>
                <button
                  onClick={handleDownloadPng}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-slate-800 transition-all"
                >
                  Download QR
                </button>
              </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6 mb-10">
              {(() => {
                if (user.plan === "trial") {
                  return [
                    {
                      label: "Total Scans",
                      value: analyticsSummary?.total_scans?.toString() || "0",
                      trend: "",
                      icon: Eye,
                      color: "blue",
                    },
                    {
                      label: "Reviews this week",
                      value:
                        analyticsSummary?.reviews_this_week?.toString() || "0",
                      trend: "",
                      icon: MessageSquare,
                      color: "emerald",
                    },
                    {
                      label: "Avg Rating",
                      value:
                        analyticsSummary?.google_rating?.toString() || "0.0",
                      trend: "",
                      icon: Star,
                      color: "amber",
                    },
                    {
                      label: "Trial days left",
                      value:
                        analyticsSummary?.trial_days_left?.toString() || "0",
                      trend: "",
                      icon: TrendingUp,
                      color: "purple",
                    },
                  ];
                } else if (user.plan === "basic") {
                  return [
                    {
                      label: "Total Scans",
                      value: analyticsSummary?.total_scans?.toString() || "0",
                      trend: "",
                      icon: Eye,
                      color: "blue",
                    },
                    {
                      label: "Google Redirects",
                      value:
                        analyticsSummary?.total_redirects?.toString() || "0",
                      trend: "",
                      icon: ExternalLink,
                      color: "amber",
                    },
                    {
                      label: "Conversion Rate",
                      value: (analyticsSummary?.conversion_rate || 0) + "%",
                      trend: "",
                      icon: TrendingUp,
                      color: "purple",
                    },
                    {
                      label: "Reviews this month",
                      value:
                        analyticsSummary?.reviews_this_month?.toString() || "0",
                      trend: "",
                      icon: MessageSquare,
                      color: "emerald",
                    },
                  ];
                } else {
                  return [
                    {
                      label: "Total Scans",
                      value: analyticsSummary?.total_scans?.toString() || "0",
                      trend: "",
                      icon: Eye,
                      color: "blue",
                    },
                    {
                      label: "Conversion",
                      value: (analyticsSummary?.conversion_rate || 0) + "%",
                      trend: "",
                      icon: TrendingUp,
                      color: "purple",
                    },
                    {
                      label: "Avg Overall",
                      value:
                        analyticsSummary?.google_rating?.toString() || "0.0",
                      trend: "",
                      icon: Star,
                      color: "amber",
                    },
                    {
                      label: "Negative Alerts",
                      value:
                        analyticsSummary?.negative_alerts_count?.toString() ||
                        "0",
                      trend: "",
                      icon: MessageSquare,
                      color: "emerald",
                    },
                  ];
                }
              })().map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-50 text-slate-600 border border-slate-100">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    {stat.trend && (
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-slate-900 mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Business Profile Card */}
              <div className="col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      Active Setup
                    </div>
                  </div>

                  <div className="flex gap-8 items-start">
                    <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                      {b.logo_url ? (
                        <img
                          src={b.logo_url}
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Building2 className="w-10 h-10 text-slate-300" />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-900">
                          {b.name}
                        </h3>
                        <p className="text-slate-500 text-sm font-semibold mt-0.5">
                          {b.category} • {b.area || b.city}
                        </p>
                      </div>
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {b.city},{" "}
                          {b.address ? "PIN verified" : "Incomplete Address"}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <Globe className="w-4 h-4 text-slate-400" />
                          {b.website_url ||
                            b.menu_data?.website ||
                            b.website ||
                            "No website linked"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                        AI Review Config
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        3 Variants • English • Classic Theme
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {user.plan !== "trial" && (
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm col-span-2 mt-8">
                  <h3 className="font-bold text-slate-900 mb-4">
                    Your Menu Items
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {b.menu_items && b.menu_items.length > 0 ? (
                      b.menu_items.map((item: any, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200"
                        >
                          {item.name || item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No menu items added during onboarding.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* AI Review Preview Card */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" /> AI Review
                    Generation
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
                          <div
                            key={i}
                            className="p-5 rounded-2xl bg-[#F0F7F0] border border-emerald-100 shadow-sm flex flex-col gap-2"
                          >
                            <div className="flex items-center gap-1 text-emerald-500">
                              {Array.from({
                                length: rev.overall_rating || 5,
                              }).map((_, j) => (
                                <Star key={j} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <p className="text-sm text-[#085041] leading-relaxed italic font-medium">
                              &quot;
                              {rev.review_text ||
                                `Customer enjoyed their visit and highlighted the ${rev.selected_items?.join(", ") || "service"}!`}
                              &quot;
                            </p>
                          </div>
                        ),
                      )}
                      {analyticsSummary.recent_reviews.length > 3 && (
                        <button 
                          onClick={() => setActiveTab('reviews')}
                          className="w-full py-3 mt-2 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                        >
                          View All {analyticsSummary.recent_reviews.length} Reviews
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm text-center">
                      <p className="text-sm text-slate-400 font-medium italic">
                        No recent AI generated reviews yet. Scan your QR to test
                        it!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {user.plan === "trial" && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-6">Scans (Last 7 Days)</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={[
                        { name: 'Mon', scans: 12 }, { name: 'Tue', scans: 18 },
                        { name: 'Wed', scans: 15 }, { name: 'Thu', scans: 25 },
                        { name: 'Fri', scans: 45 }, { name: 'Sat', scans: 60 },
                        { name: 'Sun', scans: 50 }
                      ]}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="scans" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {(user.plan === "basic" || user.plan === "premium") && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-6">Scans (Last 30 Days)</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={Array.from({length: 30}, (_, i) => ({ day: i+1, scans: Math.floor(Math.random() * 50) + 10 }))}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} minTickGap={20} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <RechartsTooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Line type="monotone" dataKey="scans" stroke="#10B981" strokeWidth={3} dot={false} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Advanced Ratings & Insights for Basic/Premium */}
              {(user.plan === "basic" || user.plan === "premium") && (
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Rating Breakdown</h3>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-700 w-4">{star}</span>
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : 2}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Category Ratings</h3>
                    <div className="space-y-4">
                      {['Food', 'Service', 'Environment'].map(cat => (
                        <div key={cat}>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>{cat}</span>
                            <span>{Math.max(4.2, 5 - Math.random()).toFixed(1)}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${80 + Math.random() * 20}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {user.plan === "basic" && (
                <div className="relative mt-8">
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-[2.5rem] border border-slate-200">
                    <div className="bg-white p-6 rounded-3xl shadow-xl max-w-sm text-center">
                      <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mb-2">Unlock AI Insights</h3>
                      <p className="text-sm text-slate-500 mb-6">Upgrade to Premium to access AI Problem Detection, Scan Heatmaps, and Conversion Funnels.</p>
                      <button onClick={() => openUpgradeModal("premium")} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                        Upgrade to Premium
                      </button>
                    </div>
                  </div>
                  <div className="opacity-40 pointer-events-none filter blur-[4px]">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-64 mb-8">
                      <h3 className="font-bold text-slate-900 mb-4">AI Problem Detection</h3>
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              )}

              {user.plan === "premium" && (
                <>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                      <div className="px-3 py-1 bg-purple-50 text-purple-600 border border-purple-100 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" /> AI Analysis
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-4">AI Problem Detection</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      <span className="font-semibold text-slate-900">Insight:</span> Recent negative alerts suggest a recurring issue with "Slow Service" during weekend peak hours (7 PM - 9 PM). Consider adjusting staff allocation during these times to improve the service rating trend.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-900 mb-4">Scan Heatmap (Last 7 Days)</h3>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({length: 49}).map((_, i) => (
                          <div key={i} className="aspect-square rounded-sm" style={{backgroundColor: `rgba(16, 185, 129, ${Math.random()})`}}></div>
                        ))}
                      </div>
                      <p className="text-center text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Peak: Saturday 8:00 PM</p>
                    </div>

                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-900 mb-4">Conversion Funnel</h3>
                      <div className="space-y-2">
                        {[
                          { step: 'Scanned QR', val: 100, color: 'bg-slate-800' },
                          { step: 'Opened Review', val: 75, color: 'bg-emerald-600' },
                          { step: 'Rated', val: 60, color: 'bg-emerald-500' },
                          { step: 'Copied & Posted', val: 40, color: 'bg-emerald-400' },
                        ].map((f, idx) => (
                          <div key={f.step} className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-600 w-24">{f.step}</span>
                            <div className="flex-1 h-6 bg-slate-50 rounded-md overflow-hidden flex items-center">
                              <div className={`h-full ${f.color} flex items-center px-2`} style={{ width: `${f.val}%` }}>
                                <span className="text-[10px] text-white font-bold">{f.val}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* QR Code & Barcode Card Sidebar column */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group/qr">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-slate-50 p-4 rounded-3xl mb-6 shadow-sm border border-slate-100 transition-transform group-hover/qr:scale-105 relative overflow-hidden">
                    {/* Laser scanning line overlay on QR */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10B981] opacity-0 group-hover/qr:opacity-100 transition-opacity z-20 pointer-events-none"
                      style={{
                        animation: "laserScan 2.5s infinite ease-in-out",
                      }}
                    />

                    <div className="w-[160px] h-[160px] flex items-center justify-center relative bg-white rounded-xl overflow-hidden">
                      <QRCodeCanvas
                        id="active-qr-canvas"
                        value={reviewUrl || "https://glow-qr-frontend.vercel.app"}
                        size={160}
                        fgColor={b.primaryColor || "#1D9E75"}
                        bgColor="#ffffff"
                        level="H"
                        imageSettings={
                          b.logo_url && user.plan !== "expired"
                            ? {
                                src: b.logo_url,
                                height: 40,
                                width: 40,
                                excavate: true,
                                crossOrigin: "anonymous" as const,
                              }
                            : undefined
                        }
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">
                    Your Active QR
                  </h4>
                  <p className="text-slate-500 text-xs mb-8">
                    Ready for scanning
                  </p>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      onClick={handleDownloadPng}
                      className="py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <Download className="w-4 h-4" /> PNG
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <Copy className="w-4 h-4" />{" "}
                      {linkCopied ? "Copied!" : "Link"}
                    </button>
                  </div>
                </div>
              </div>

              {user.plan === "trial" && (
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">Upgrade to Basic/Premium</h3>
                  <p className="text-xs text-slate-500 mb-6">Unlock full analytics, rating breakdowns, and custom AI insights to grow your business.</p>
                  <button onClick={() => openUpgradeModal("basic")} className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                    View Plans
                  </button>
                </div>
              )}

              {/* Growth milestone goal card */}
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden border border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                      Growth Goal
                    </p>
                    <p className="text-sm font-bold">100 Reviews</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                  <div className="w-3/5 h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
                <p className="text-[10px] text-white/40 font-medium">
                  You are 40 reviews away from your next milestone!
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Analytics & Insights
              </h1>
            </div>

            {/* Locked Premium Sections (6 Insight Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
              {[
                { title: "Scan heatmap", lock: ["basic", "trial"] },
                { title: "Conversion funnel", lock: ["basic", "trial"] },
                { title: "Top menu items", lock: ["trial"] },
                { title: "AI problem detection", lock: ["basic", "trial"] },
                { title: "Negative alerts inbox", lock: ["basic", "trial"] },
                { title: "Category ratings", lock: ["basic", "trial"] },
              ].map((insight) => {
                const isLocked = insight.lock.includes(user.plan);
                return (
                  <div
                    key={insight.title}
                    className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden h-48 flex flex-col items-center justify-center group"
                  >
                    {isLocked && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center transition-all">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-3">
                          <Lock className="w-5 h-5 text-slate-400" />
                        </div>
                        <button
                          onClick={() => openUpgradeModal("premium")}
                          className="text-[10px] font-black text-slate-800 bg-amber-100 uppercase tracking-widest px-4 py-2 rounded-lg shadow-sm hover:bg-amber-200 pointer-events-auto transition-all"
                        >
                          {insight.title === "Top menu items"
                            ? "Basic + Premium"
                            : "Premium Only"}
                        </button>
                      </div>
                    )}
                    <div
                      className={`${isLocked ? "pointer-events-none opacity-40" : ""} text-center w-full`}
                    >
                      <p className="text-sm font-bold text-slate-600 mb-2">
                        {insight.title}
                      </p>
                      <div className="w-full h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden p-2 text-xs text-slate-400 font-medium text-center">
                        Live insight data renders here
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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

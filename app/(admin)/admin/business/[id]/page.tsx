'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Star, Clock, MapPin, 
  Store, AlertTriangle, TrendingDown,
  ShieldAlert, Activity, CheckCircle, Copy, ThumbsDown
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

export default function BusinessDetailAdmin({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [placeIdInput, setPlaceIdInput] = useState("");
  const [savingUrl, setSavingUrl] = useState(false);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const res = await fetch(`/api/admin-proxy/business/${id}/detail`);
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        if (res.ok) {
          const json = await res.json();
          setData(json);
          if (json.business_info?.place_id) {
            setPlaceIdInput(json.business_info.place_id);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessDetails();
  }, [id, router]);

  const handleUpdateReviewUrl = async () => {
    if (!placeIdInput.trim()) return;
    setSavingUrl(true);
    try {
      const res = await fetch(`/api/admin-proxy/business/${id}/review-url`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ place_id: placeIdInput.trim() })
      });
      if (res.ok) {
        const result = await res.json();
        // Update local data
        setData((prev: any) => ({
          ...prev,
          business_info: {
            ...prev.business_info,
            place_id: result.google_place_id,
            google_review_url: result.google_review_url
          }
        }));
        alert("Review URL updated!");
      } else {
        alert("Failed to update Review URL");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating Review URL");
    } finally {
      setSavingUrl(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-500 font-medium animate-pulse">Loading Business Dashboard...</div>;
  if (!data) return <div className="p-8 text-red-500 font-medium">Failed to load business data</div>;

  const {
    business_info, scan_stats, rating_distribution,
    peak_hours, peak_days, top_selected_items,
    negative_feedback_summary, recent_negative_feedback,
    google_rating_trend, daily_scans_chart,
    bomb_alerts_summary, session_stats
  } = data;

  // Helpers
  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'premium': return 'bg-purple-100 text-purple-700';
      case 'basic': return 'bg-blue-100 text-blue-700';
      case 'trial': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const ratingData = [
    { name: '5 Star', count: rating_distribution['5_star'], fill: '#10b981' },
    { name: '4 Star', count: rating_distribution['4_star'], fill: '#34d399' },
    { name: '3 Star', count: rating_distribution['3_star'], fill: '#fbbf24' },
    { name: '2 Star', count: rating_distribution['2_star'], fill: '#f87171' },
    { name: '1 Star', count: rating_distribution['1_star'], fill: '#ef4444' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Navigation */}
      <div>
        <Link href="/admin" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Overview
        </Link>
      </div>

      {/* SECTION 1: Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{business_info.name}</h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                  {business_info.category || 'No Category'}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getPlanColor(business_info.plan)}`}>
                  {business_info.plan}
                </span>
                {business_info.is_onboarded ? (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">Onboarded</span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-500">Pending Setup</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="w-4 h-4" />
                {business_info.city || 'Unknown City'} • {business_info.area || 'Unknown Area'}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Created: {business_info.created_at ? format(new Date(business_info.created_at), 'MMM d, yyyy') : '-'}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Google Rating</div>
                <div className="flex items-center gap-1 font-black text-xl text-slate-900">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  {business_info.google_rating?.toFixed(1) || '-'}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reviews</div>
                <div className="font-bold text-xl text-slate-900">{business_info.google_review_count || 0}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Baseline</div>
                <div className="font-bold text-xl text-slate-900">{business_info.baseline_review_count || 0}</div>
              </div>
              {business_info.google_review_url && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Link</div>
                  <a href={business_info.google_review_url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline text-sm flex items-center gap-1">
                    Google Maps <ArrowLeft className="w-3 h-3 rotate-135" style={{ transform: 'rotate(135deg)' }} />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-80 bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Owner Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Name</span> <span className="font-medium text-slate-900">{business_info.owner_name || '-'}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Email</span> <span className="font-medium text-slate-900">{business_info.owner_email || '-'}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Phone</span> <span className="font-medium text-slate-900">{business_info.owner_phone || '-'}</span></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">Settings</h3>
              <div className="flex gap-2 flex-wrap">
                <span className={`px-2 py-1 rounded text-xs font-medium ${business_info.whatsapp_alerts ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                  WA Alerts
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${business_info.negative_filter_enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                  Negative Filter
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Review Setup */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-amber-500" />
              Google Review Setup
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Configure the Place ID so users are properly redirected to the Google Maps review flow after they submit positive feedback.
            </p>
            <a 
              href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
            >
              Find Place ID →
            </a>
          </div>
          <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Google Place ID</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={placeIdInput}
                    onChange={(e) => setPlaceIdInput(e.target.value)}
                    placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4" 
                    className="flex-1 rounded-lg border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button 
                    onClick={handleUpdateReviewUrl}
                    disabled={savingUrl || !placeIdInput.trim() || placeIdInput === business_info.place_id}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {savingUrl ? 'Updating...' : 'Update Review URL'}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Review URL</label>
                {business_info.google_review_url ? (
                  <div className="text-sm text-slate-600 bg-white p-3 rounded border border-slate-200 break-all">
                    {business_info.google_review_url}
                  </div>
                ) : (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded border border-amber-200 font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Not configured yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 6 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl"><Activity className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Scans</p>
              <h3 className="text-2xl font-bold">{scan_stats.total_scans}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Store className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Google Redirects</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold">{scan_stats.total_google_redirects}</h3>
                <span className="text-sm font-medium text-emerald-600 mb-1">({scan_stats.redirect_rate_percent}%)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Copy className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Reviews Generated</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold">{scan_stats.reviews_generated}</h3>
                <span className="text-sm font-medium text-blue-600 mb-1">({scan_stats.reviews_copied_rate}%)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><Star className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Rating Given</p>
              <h3 className="text-2xl font-bold">{scan_stats.avg_overall_rating} ⭐</h3>
            </div>
          </div>
        </div>
        <div className={`p-6 rounded-2xl shadow-sm border ${scan_stats.negative_rate_percent > 20 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${scan_stats.negative_rate_percent > 20 ? 'bg-red-100 text-red-600' : 'bg-red-50 text-red-500'}`}><ThumbsDown className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Negative Rate</p>
              <h3 className={`text-2xl font-bold ${scan_stats.negative_rate_percent > 20 ? 'text-red-700' : ''}`}>
                {scan_stats.negative_rate_percent}%
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-xl"><Clock className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Time Spent</p>
              <h3 className="text-2xl font-bold">{scan_stats.avg_time_spent_seconds}s</h3>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Charts Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Daily Scans (Last 30 Days)</h3>
          <div className="h-72">
            {daily_scans_chart && daily_scans_chart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={daily_scans_chart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" name="Total Scans" dataKey="total_scans" stroke="#6366f1" strokeWidth={3} dot={false} />
                  <Line type="monotone" name="Google Redirects" dataKey="google_redirects" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No chart data available</div>
            )}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Rating Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={ratingData} margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 4: Peak Hours & Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Peak Hours</h3>
          {peak_hours && peak_hours.length > 0 ? (
            <div className="space-y-4">
              {peak_hours.map((ph: any, idx: number) => {
                const maxVal = Math.max(...peak_hours.map((p: any) => p.scan_count));
                const pct = (ph.scan_count / maxVal) * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-medium mb-1">
                      <span className="text-slate-700">{ph.hour}:00</span>
                      <span className="text-slate-900">{ph.scan_count} scans</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-slate-400 py-4">No hour data available</div>
          )}
        </div>

        {/* Top Selected Items */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Selected Items</h3>
          {top_selected_items && top_selected_items.length > 0 ? (
            <div className="space-y-3">
              {top_selected_items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-slate-900">{item.item}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-400 py-4">No items selected yet</div>
          )}
        </div>
      </div>

      {/* SECTION 5: Recent Negative Feedback */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            Recent Negative Feedback
          </h3>
          <span className="text-sm font-medium text-slate-500">{negative_feedback_summary.unresolved} Unresolved</span>
        </div>
        <div className="overflow-x-auto">
          {recent_negative_feedback && recent_negative_feedback.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Feedback Text</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent_negative_feedback.map((fb: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="p-4 text-sm text-slate-600 whitespace-nowrap">
                      {format(new Date(fb.created_at), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="p-4">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < fb.rating ? 'fill-current' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-900 max-w-md truncate" title={fb.feedback_text}>
                      {fb.feedback_text || '-'}
                    </td>
                    <td className="p-4">
                      {fb.is_resolved ? (
                        <span className="px-2 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-700">Resolved</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-bold uppercase bg-red-100 text-red-700">Unresolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 flex flex-col items-center justify-center text-slate-500">
              <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
              <p className="font-medium text-emerald-700">No negative feedback yet!</p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 6: Bottom Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl shadow-sm border ${bomb_alerts_summary.total_alerts > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl ${bomb_alerts_summary.total_alerts > 0 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Bomb Alerts</p>
              <h3 className="text-xl font-bold">{bomb_alerts_summary.total_alerts} Total</h3>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Unresolved:</span>
            <span className="font-bold text-slate-900">{bomb_alerts_summary.unresolved}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-slate-500">Max Risk:</span>
            <span className="font-bold text-slate-900">{bomb_alerts_summary.highest_risk_score}</span>
          </div>
        </div>

        <div className={`p-6 rounded-2xl shadow-sm border ${session_stats.flagged_sessions > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl ${session_stats.flagged_sessions > 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Flagged Sessions</p>
              <h3 className="text-xl font-bold">{session_stats.flagged_sessions} / {session_stats.total_sessions}</h3>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Avg Session Time:</span>
            <span className="font-bold text-slate-900">{session_stats.avg_time_to_rate}s</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Scan Momentum</p>
              <h3 className="text-xl font-bold">Week vs Month</h3>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Last 7 Days:</span>
            <span className="font-bold text-slate-900">{scan_stats.scans_last_7_days}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-slate-500">Last 30 Days:</span>
            <span className="font-bold text-slate-900">{scan_stats.scans_last_30_days}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

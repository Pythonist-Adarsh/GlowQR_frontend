'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { Users, CreditCard, Activity, Clock, LogOut, CheckCircle, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminOverview() {
  const [data, setData] = useState<any>(null);
  const [topBusinesses, setTopBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/admin-proxy/stats`);
        if (res.status === 401) {
            router.push('/admin/login');
            return;
        }
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
        const tbRes = await fetch(`/api/admin-proxy/top-businesses`);
        if (tbRes.ok) {
          const tbJson = await tbRes.json();
          setTopBusinesses(tbJson.top_businesses || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [router]);

  if (loading) return <div className="p-8 text-slate-500 font-medium">Loading Overview...</div>;
  if (!data) return <div className="p-8 text-red-500 font-medium">Failed to load data</div>;

  const stats = data.stats;
  const charts = data.charts;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">High-level metrics and health indicators.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">Total Users</p><h3 className="text-2xl font-bold text-slate-900">{stats.total_users ?? 0}</h3></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">Active Subscriptions</p><h3 className="text-2xl font-bold text-slate-900">{stats.active_subscriptions ?? 0}</h3></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">Trial Users</p><h3 className="text-2xl font-bold text-slate-900">{stats.trial_users ?? 0}</h3></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl"><LogOut className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">Expired Users</p><h3 className="text-2xl font-bold text-slate-900">{stats.expired_users ?? 0}</h3></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><CreditCard className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">Revenue This Month</p><h3 className="text-2xl font-bold text-slate-900">₹{stats.revenue_this_month ?? 0}</h3></div>
          </div>
        </div>
        <div className={`p-6 rounded-2xl shadow-sm border ${stats.pending_requests > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stats.pending_requests > 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}><AlertTriangle className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">Pending Requests</p><h3 className="text-2xl font-bold text-slate-900">{stats.pending_requests ?? 0}</h3></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">User Signups (Last 30 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.signups}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Plan Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={charts.plan_distribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {charts.plan_distribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
                {charts.plan_distribution.map((entry: any, index: number) => (
                    <div key={entry.name} className="flex items-center gap-2 text-sm text-slate-600 font-medium capitalize">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        {entry.name} ({entry.value})
                    </div>
                ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Daily Revenue (Last 30 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.daily_revenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Businesses Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Top 10 Businesses by Scans</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Rank</th>
                <th className="p-4 font-medium">Business</th>
                <th className="p-4 font-medium">Category / City</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Total Scans</th>
                <th className="p-4 font-medium">Google Redirects</th>
                <th className="p-4 font-medium">Redirect Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topBusinesses.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-500 font-bold">#{b.rank}</td>
                  <td className="p-4">
                    <Link href={`/admin/business/${b.id}`} className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                      {b.name}
                    </Link>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-900">{b.category || '-'}</div>
                    <div className="text-xs text-slate-500">{b.city || '-'}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${b.plan === 'premium' ? 'bg-purple-100 text-purple-700' : b.plan === 'basic' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {b.plan}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-900">{b.total_scans}</td>
                  <td className="p-4 text-emerald-600 font-medium">{b.google_redirects}</td>
                  <td className="p-4 text-slate-600">{b.redirect_rate_percent}%</td>
                </tr>
              ))}
              {topBusinesses.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">No scan data available yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { format } from 'date-fns';
import { Download, CreditCard, TrendingUp, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RevenuePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await fetch(`/api/admin-proxy/revenue`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  const handleExport = () => {
    window.open(`/api/admin-proxy/revenue/export`, '_blank');
  };

  if (loading) return <div className="p-8 text-slate-500 font-medium">Loading Revenue Data...</div>;
  if (!data) return <div className="p-8 text-red-500 font-medium">Failed to load data</div>;

  const { summary, transactions } = data;

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Revenue Tracker</h1>
          <p className="text-slate-500 mt-1">Monitor payments and active subscriptions.</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Wallet className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">This Month</p><h3 className="text-2xl font-bold">₹{summary.this_month}</h3></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-xl"><Wallet className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">Last Month</p><h3 className="text-2xl font-bold">₹{summary.last_month}</h3></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><CreditCard className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-slate-500">All Time</p><h3 className="text-2xl font-bold">₹{summary.all_time}</h3></div>
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium text-emerald-700">MRR Estimate</p><h3 className="text-2xl font-black text-emerald-900">₹{summary.mrr}</h3></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Verified Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Business</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">UTR</th>
                <th className="p-4 font-medium">Activated On</th>
                <th className="p-4 font-medium">Expires On</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t: any) => {
                const isExpired = new Date(t.expires_at) < new Date();
                return (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-slate-900">{t.business_name}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${t.plan_requested === 'premium' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {t.plan_requested}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-slate-900">₹{t.amount_paid/100}</td>
                    <td className="p-4 font-mono text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded inline-block mt-2">{t.utr_number}</td>
                    <td className="p-4 text-sm text-slate-600">{t.activated_at ? format(new Date(t.activated_at), 'MMM d, yyyy') : '-'}</td>
                    <td className={`p-4 text-sm font-medium ${isExpired ? 'text-red-500' : 'text-slate-600'}`}>{t.expires_at ? format(new Date(t.expires_at), 'MMM d, yyyy') : '-'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${isExpired ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-700'}`}>
                        {isExpired ? 'Expired' : 'Verified'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {transactions.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-slate-500">No transactions found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

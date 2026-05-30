'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquareWarning, Star, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [businessSearch, setBusinessSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const fetchFeedback = async () => {
    try {
      const res = await fetch(`/api/admin-proxy/feedback?status=${statusFilter}&business=${businessSearch}`);
      if (res.ok) {
        const data = await res.json();
        setFeedbacks(data.feedbacks || []);
        setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(() => {
      fetchFeedback();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [statusFilter, businessSearch]);

  const updateFeedback = async (id: number, action: any) => {
    try {
      const res = await fetch(`/api/admin-proxy/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action)
      });
      if (res.ok) {
        toast.success('Feedback updated');
        fetchFeedback();
      }
    } catch (e) {
      toast.error('Update failed');
    }
  };

  if (loading && !stats) return <div className="p-8 text-slate-500 font-medium">Loading Feedback...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Negative Feedback</h1>
        <p className="text-slate-500 mt-1">Monitor and resolve intercepted low-rating reviews.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Intercepted</p>
            <h3 className="text-2xl font-bold text-slate-900">{stats.total}</h3>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-200 text-center">
            <p className="text-sm font-medium text-red-700 mb-1">Unread</p>
            <h3 className="text-2xl font-bold text-red-900">{stats.unread}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <p className="text-sm font-medium text-slate-500 mb-1">1-Star Ratings</p>
            <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-1">{stats.one_star} <Star className="w-4 h-4 fill-amber-400 text-amber-400"/></h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <p className="text-sm font-medium text-slate-500 mb-1">2-Star Ratings</p>
            <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-1">{stats.two_star} <Star className="w-4 h-4 fill-amber-400 text-amber-400"/></h3>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search business name..." 
            value={businessSearch}
            onChange={(e) => setBusinessSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white min-w-[150px]"
          >
            <option value="all">All Feedback</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium w-[20%]">Business</th>
                <th className="p-4 font-medium w-[10%]">Rating</th>
                <th className="p-4 font-medium w-[40%]">Feedback</th>
                <th className="p-4 font-medium w-[15%]">Status</th>
                <th className="p-4 font-medium w-[15%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feedbacks.map(fb => (
                <tr key={fb.id} className={`hover:bg-slate-50 transition ${!fb.is_read ? 'bg-red-50/30 font-medium' : ''}`}>
                  <td className="p-4 font-medium text-slate-900">{fb.business_name}</td>
                  <td className="p-4">
                    <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                      {fb.rating} <Star className="w-3 h-3 fill-current" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-700 cursor-pointer" onClick={() => setExpandedRow(expandedRow === fb.id ? null : fb.id)}>
                      {expandedRow === fb.id ? fb.feedback_text : (fb.feedback_text.length > 60 ? `${fb.feedback_text.substring(0, 60)}...` : fb.feedback_text)}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{formatDistanceToNow(new Date(fb.created_at), {addSuffix: true})}</div>
                  </td>
                  <td className="p-4">
                    {fb.is_resolved ? (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">RESOLVED</span>
                    ) : !fb.is_read ? (
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-full">UNREAD</span>
                    ) : (
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">READ</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {!fb.is_read && !fb.is_resolved && (
                      <button onClick={() => updateFeedback(fb.id, { mark_read: true })} className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded transition">
                        Mark Read
                      </button>
                    )}
                    {!fb.is_resolved && (
                      <button onClick={() => updateFeedback(fb.id, { mark_resolved: true })} className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded transition">
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {feedbacks.length === 0 && (
                <tr><td colSpan={5} className="p-12 text-center text-slate-500">No feedback found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

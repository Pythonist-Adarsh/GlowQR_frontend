'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { formatDistanceToNow, format } from 'date-fns';
import { CheckCircle, XCircle, Search, Mail, Phone, Copy, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedReq, setSelectedReq] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [modalType, setModalType] = useState<'approve' | 'reject' | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`/api/admin-proxy/requests?status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRequests();
  }, [filter]);

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    const reason = action === 'reject' ? (rejectReason === 'Other' ? customReason : rejectReason) : undefined;
    
    try {
      const res = await fetch(`/api/admin-proxy/upgrade/${id}/${action}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action === 'reject' ? { reason } : {})
      });
      
      if (res.ok) {
        toast.success(`Request ${action === 'approve' ? 'approved' : 'rejected'}`);
        setModalType(null);
        fetchRequests();
      } else {
        toast.error('Failed to process request');
      }
    } catch (err) {
      toast.error('Error processing request');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Upgrade Requests</h1>
        <p className="text-slate-500 mt-1">Manage incoming subscription upgrade requests.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 p-4 flex gap-2 overflow-x-auto">
          {['all', 'pending', 'verified', 'rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition ${filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {f} {f === 'pending' && requests.length > 0 && filter === 'pending' ? `(${requests.length})` : ''}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Info className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No requests found</p>
            <p>There are no {filter !== 'all' ? filter : ''} requests at this time.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">#</th>
                  <th className="p-4 font-medium">Business</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Plan</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">UTR / Method</th>
                  <th className="p-4 font-medium">Submitted</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 text-sm text-slate-500">{req.id}</td>
                    <td className="p-4 font-medium text-slate-900">{req.business_name}</td>
                    <td className="p-4 text-sm text-slate-600">
                      <div>{req.contact_name}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <a href={`tel:${req.phone}`} className="text-emerald-600 hover:underline flex items-center gap-1 text-xs"><Phone className="w-3 h-3"/> {req.phone}</a>
                        <a href={`mailto:${req.email}`} className="text-blue-600 hover:underline flex items-center gap-1 text-xs"><Mail className="w-3 h-3"/> Email</a>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${req.plan_requested === 'premium' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {req.plan_requested}
                        </span>
                        {req.request_type === 'renewal' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                            Renewal
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-900">₹{(req.amount_paid/100).toFixed(2)}</td>
                    <td className="p-4">
                      <div className="font-mono text-sm bg-slate-100 px-2 py-1 rounded inline-flex items-center gap-2 text-slate-700">
                        {req.utr_number}
                        <button onClick={() => copyToClipboard(req.utr_number)} className="hover:text-slate-900"><Copy className="w-3 h-3" /></button>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 uppercase">{req.payment_method}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600" title={format(new Date(req.created_at), 'PPpp')}>
                      {formatDistanceToNow(new Date(req.created_at), { addSuffix: true })}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${req.status === 'pending' ? 'bg-amber-100 text-amber-700' : req.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {req.status === 'pending' && (
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedReq(req); setModalType('approve'); }} className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition" title="Approve">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => { setSelectedReq(req); setModalType('reject'); setRejectReason('UTR not found'); }} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition" title="Reject">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalType === 'approve' && selectedReq && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Approve Request</h2>
            <div className="bg-slate-50 p-4 rounded-xl mb-6 space-y-2 text-sm text-slate-700">
              <div className="flex justify-between"><span>Business:</span> <span className="font-bold">{selectedReq.business_name}</span></div>
              <div className="flex justify-between"><span>Plan:</span> <span className="font-bold capitalize">{selectedReq.plan_requested}</span></div>
              <div className="flex justify-between"><span>Amount:</span> <span className="font-bold">₹{selectedReq.amount_paid/100}</span></div>
              <div className="flex justify-between"><span>UTR:</span> <span className="font-mono bg-slate-200 px-1 rounded">{selectedReq.utr_number}</span></div>
            </div>
            <p className="text-sm text-slate-600 mb-6">This will activate the {selectedReq.plan_requested} plan for 30 days and send an activation email to the user.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModalType(null)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
              <button onClick={() => handleAction(selectedReq.id, 'approve')} className="px-4 py-2 font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition">Confirm Approve</button>
            </div>
          </div>
        </div>
      )}

      {modalType === 'reject' && selectedReq && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Reject Request</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Rejection</label>
              <select value={rejectReason} onChange={e => setRejectReason(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white mb-3">
                <option value="UTR not found">UTR not found</option>
                <option value="Amount mismatch">Amount mismatch</option>
                <option value="Duplicate request">Duplicate request</option>
                <option value="Other">Other (Custom)</option>
              </select>
              {rejectReason === 'Other' && (
                <textarea
                  value={customReason}
                  onChange={e => setCustomReason(e.target.value)}
                  placeholder="Enter custom reason..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                />
              )}
            </div>
            <p className="text-sm text-slate-600 mb-6">The user will receive an email notifying them of this rejection and the reason provided above.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModalType(null)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
              <button onClick={() => handleAction(selectedReq.id, 'reject')} className="px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition">Confirm Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

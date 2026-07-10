'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Search, IndianRupee, CheckCircle, XCircle } from 'lucide-react';

interface PaymentOrder {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  plan_name: string;
  amount: number;
  status: string;
  utr_reference: string;
  created_at: string;
  utr_submitted_at: string;
  rejection_reason?: string;
}

export default function PaymentsPage() {
  const [orders, setOrders] = useState<PaymentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'utr_submitted' | 'all'>('utr_submitted');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin-proxy/payment-orders?status=${statusFilter}`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load payment orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleVerify = async (orderId: string) => {
    if (!confirm('Verify this payment and activate the plan?')) return;
    try {
      const res = await fetch(`/api/admin-proxy/payment-orders/${orderId}/verify`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Verification failed');
      toast.success('Payment verified and plan activated');
      fetchOrders();
    } catch (err) {
      toast.error('Verification failed');
    }
  };

  const handleReject = async (orderId: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    try {
      const res = await fetch(`/api/admin-proxy/payment-orders/${orderId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rejection_reason: reason })
      });
      if (!res.ok) throw new Error('Rejection failed');
      toast.success('Payment rejected');
      fetchOrders();
    } catch (err) {
      toast.error('Rejection failed');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-emerald-600" />
            Payment Orders
          </h1>
          <p className="text-slate-500 mt-1">Verify payments and activate subscriptions</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('utr_submitted')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              statusFilter === 'utr_submitted' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending Verification
          </button>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            All History
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-medium">
              <th className="p-4">Business</th>
              <th className="p-4">Plan & Amount</th>
              <th className="p-4">UTR Reference</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">Loading...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">No payment orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{order.business_name}</p>
                    <p className="text-xs text-slate-500">{order.contact_name} • {order.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold">{order.plan_name}</p>
                    <p className="text-emerald-600 font-medium">₹{order.amount}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-mono bg-slate-100 px-2 py-1 rounded inline-block text-xs border border-slate-200">
                      {order.utr_reference || 'N/A'}
                    </p>
                  </td>
                  <td className="p-4">
                    {order.utr_submitted_at ? format(new Date(order.utr_submitted_at), 'dd MMM, HH:mm') : '-'}
                  </td>
                  <td className="p-4">
                    {order.status === 'utr_submitted' && <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">PENDING VERIFY</span>}
                    {order.status === 'verified' && <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">VERIFIED</span>}
                    {order.status === 'rejected' && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">REJECTED</span>}
                  </td>
                  <td className="p-4">
                    {order.status === 'utr_submitted' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleVerify(order.id)}
                          className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition text-xs font-semibold"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Verify
                        </button>
                        <button 
                          onClick={() => handleReject(order.id)}
                          className="flex items-center gap-1 bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition text-xs font-semibold"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                    {order.status === 'rejected' && order.rejection_reason && (
                      <span className="text-xs text-slate-500 italic">Reason: {order.rejection_reason}</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

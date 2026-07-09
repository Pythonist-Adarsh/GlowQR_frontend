'use client';

import { useEffect, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Search, RefreshCw, Trash2, AlertTriangle, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TrashPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modals
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Hard delete validation
  const [confirmName, setConfirmName] = useState('');
  const [adminPin, setAdminPin] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/admin-proxy/trashed-users?search=${search}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
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
      fetchUsers();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const confirmRestore = async () => {
    if (!selectedUser) return;
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/admin-proxy/user/${selectedUser.id}/restore`, {
        method: 'POST'
      });
      if (res.ok) {
        toast.success('User restored and marked as expired');
        setUsers(users.filter(u => u.id !== selectedUser.id));
        setRestoreModalOpen(false);
      } else {
        toast.error('Failed to restore user.');
      }
    } catch (e) {
      toast.error('Failed to restore user.');
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmHardDelete = async () => {
    if (!selectedUser) return;
    
    // Validate inputs
    const expectedName = selectedUser.full_name || selectedUser.email;
    if (confirmName !== expectedName && confirmName !== selectedUser.email) {
      toast.error('Name does not match');
      return;
    }
    if (!adminPin) {
      toast.error('Admin PIN is required');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch(`/api/admin-proxy/user/${selectedUser.id}/hard`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ admin_pin: adminPin })
      });
      
      if (res.ok) {
        toast.success('User permanently deleted');
        setUsers(users.filter(u => u.id !== selectedUser.id));
        setDeleteModalOpen(false);
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData.detail || 'Failed to delete user.');
      }
    } catch (e) {
      toast.error('Failed to delete user.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Trash</h1>
        <p className="text-slate-500 mt-1">Manage deleted clients. You can restore them or permanently delete them.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search deleted users by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading trash...</div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Trash2 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>Trash is empty</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Business</th>
                  <th className="p-4 font-medium">Deleted Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition opacity-80">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                          {u.full_name ? u.full_name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 line-through">{u.full_name || 'Unknown'}</div>
                          <div className="text-xs text-slate-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{u.business?.name || '-'}</div>
                      <div className="text-xs text-slate-500">{u.business?.city || '-'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-slate-900">
                        {u.deleted_at ? format(new Date(u.deleted_at), 'MMM d, yyyy') : 'Unknown'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {u.deleted_at ? formatDistanceToNow(new Date(u.deleted_at), { addSuffix: true }) : ''}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button 
                          onClick={() => { setSelectedUser(u); setRestoreModalOpen(true); }}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-medium flex items-center gap-1 transition"
                        >
                          <RefreshCw className="w-4 h-4" /> Restore
                        </button>
                        <button 
                          onClick={() => { 
                            setSelectedUser(u); 
                            setConfirmName(''); 
                            setAdminPin(''); 
                            setDeleteModalOpen(true); 
                          }}
                          className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium flex items-center gap-1 transition"
                        >
                          <Trash2 className="w-4 h-4" /> Delete Forever
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {restoreModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Restore Client?</h2>
            <p className="text-slate-500 mb-6 text-sm">
              Restoring <strong className="text-slate-900">{selectedUser.full_name || selectedUser.email}</strong> will move them back to the active users list and mark their plan as <strong>expired</strong>. 
              <br/><br/>
              An alert will be sent routing them through the payment collection flow to reactivate their QR codes.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setRestoreModalOpen(false)} 
                disabled={isProcessing}
                className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRestore} 
                disabled={isProcessing}
                className="px-4 py-2 font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? 'Processing...' : 'Restore Client'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-red-600 mb-2">Delete Forever</h2>
              <p className="text-slate-600 text-sm">
                This action is <strong>irreversible</strong>. It will permanently destroy the business, all QR codes, reviews, and analytics for <strong className="text-slate-900">{selectedUser.full_name || selectedUser.email}</strong>.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Type <span className="text-slate-900 bg-slate-100 px-1 py-0.5 rounded font-mono">{selectedUser.full_name || selectedUser.email}</span> to confirm
                </label>
                <input 
                  type="text" 
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter client name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Key className="w-4 h-4 text-slate-400" /> Admin PIN
                </label>
                <input 
                  type="password" 
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your admin PIN/password"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setDeleteModalOpen(false)} 
                disabled={isProcessing}
                className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmHardDelete} 
                disabled={isProcessing || !confirmName || !adminPin}
                className="px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 flex items-center gap-2 transition"
              >
                {isProcessing ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

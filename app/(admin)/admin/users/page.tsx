'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { format } from 'date-fns';
import { Search, Eye, Edit2, ShieldAlert, ExternalLink, Trash2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [planFilter, setPlanFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  // Modals
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/admin-proxy/users?plan=${planFilter}&search=${search}`);
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
  }, [planFilter, search]);

  const openView = async (u: any) => {
    setSelectedUser(u);
    setViewModalOpen(true);
    // Fetch full details
    try {
      const res = await fetch(`/api/admin-proxy/users/${u.id}`);
      if (res.ok) {
        const full = await res.json();
        setSelectedUser({ ...u, fullDetails: full });
      }
    } catch (e) {}
  };

  const openEdit = (u: any) => {
    setSelectedUser(u);
    setNewPlan(u.plan);
    setNewExpiry(u.trial_ends_at ? new Date(u.trial_ends_at).toISOString().split('T')[0] : '');
    setEditModalOpen(true);
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`/api/admin-proxy/users/${selectedUser.id}/plan`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: newPlan,
          expires_at: newPlan === 'trial' ? new Date(newExpiry).toISOString() : undefined
        })
      });
      if (res.ok) {
        toast.success('User plan updated');
        setEditModalOpen(false);
        fetchUsers();
      }
    } catch (e) {
      toast.error('Failed to update plan');
    }
  };

  const openDelete = (u: any) => {
    setUserToDelete(u);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin-proxy/user/${userToDelete.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success('User deleted successfully');
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setDeleteModalOpen(false);
      } else {
        toast.error('Failed to delete user. Please try again.');
      }
    } catch (e) {
      toast.error('Failed to delete user. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'premium': return 'bg-purple-100 text-purple-700';
      case 'basic': return 'bg-blue-100 text-blue-700';
      case 'trial': return 'bg-amber-100 text-amber-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-500 mt-1">Manage platform users and businesses.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name, email, or business..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900"
            />
          </div>
          <select 
            value={planFilter} 
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white min-w-[150px] text-slate-900"
          >
            <option value="all">All Plans</option>
            <option value="premium">Premium</option>
            <option value="basic">Basic</option>
            <option value="trial">Trial</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Business</th>
                  <th className="p-4 font-medium">Plan</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                          {u.full_name ? u.full_name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{u.full_name || 'Unknown'}</div>
                          <div className="text-xs text-slate-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{u.business?.name || '-'}</div>
                      <div className="text-xs text-slate-500">{u.business?.city || '-'} • {u.business?.category || '-'}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getPlanColor(u.plan)}`}>
                        {u.plan}
                      </span>
                      {u.plan === 'trial' && u.trial_ends_at && (
                        <div className="text-xs mt-1 text-slate-400">Ends: {format(new Date(u.trial_ends_at), 'MMM d, yyyy')}</div>
                      )}
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {format(new Date(u.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => openView(u)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition" title="View details">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button onClick={() => openEdit(u)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit plan">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        {u.business?.id && (
                          <Link href={`/admin/business/${u.business.id}`} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="View Business Dashboard">
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                        )}
                        <button onClick={() => openDelete(u)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete User">
                          <Trash2 className="w-5 h-5" />
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

      {editModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Edit User Plan</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
              <select value={newPlan?.toLowerCase() || ''} onChange={e => setNewPlan(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4 appearance-auto bg-white text-slate-900">
                <option value="trial">Trial</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="expired">Expired</option>
              </select>
              
              {newPlan?.toLowerCase() === 'trial' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Trial Expiry Date</label>
                  <input type="date" value={newExpiry} onChange={e => setNewExpiry(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={saveEdit} className="px-4 py-2 font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {viewModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-end z-50">
          <div className="bg-white h-full w-full max-w-md shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">User Details</h2>
              <button onClick={() => setViewModalOpen(false)} className="text-slate-400 hover:text-slate-900 text-2xl">&times;</button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Account</h3>
                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Name</span> <span className="font-medium text-slate-900">{selectedUser.full_name}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Email</span> <span className="font-medium text-slate-900">{selectedUser.email}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Plan</span> <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getPlanColor(selectedUser.plan)}`}>{selectedUser.plan}</span></div>
                </div>
              </div>

              {selectedUser.fullDetails?.business && (
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Business</h3>
                  <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Name</span> <span className="font-medium text-slate-900">{selectedUser.fullDetails.business.name}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Category</span> <span className="font-medium text-slate-900">{selectedUser.fullDetails.business.category}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">City</span> <span className="font-medium text-slate-900">{selectedUser.fullDetails.business.city}</span></div>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Total Scans</div>
                    <div className="text-2xl font-black text-emerald-900">{selectedUser.fullDetails?.scans_count || 0}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && userToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Delete User?</h2>
            <p className="text-slate-500 mb-6">
              This will move <strong className="text-slate-900">{userToDelete.full_name || userToDelete.email}</strong> to Trash and deactivate their QR. It will NOT be permanently deleted.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setDeleteModalOpen(false)} 
                disabled={isDeleting}
                className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                disabled={isDeleting}
                className="px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Moving to Trash...
                  </>
                ) : (
                  'Move to Trash'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

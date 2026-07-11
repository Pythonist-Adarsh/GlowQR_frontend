'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { Target, Search, Calendar, MapPin, Building, Mail, Phone, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProspectsPage() {
  const [prospects, setProspects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('headline_score');
  const [sortAsc, setSortAsc] = useState(true); // Default worst scores first

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    try {
      // In a real app this uses the admin cookie or token.
      const res = await fetch(`/api/admin-proxy/prospects`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProspects(data);
    } catch (err) {
      console.error(err);
      toast.error('Could not load prospects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this prospect?')) return;
    
    try {
      const res = await fetch(`/api/admin-proxy/prospects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Prospect deleted');
      fetchProspects();
    } catch (err) {
      toast.error('Failed to delete prospect');
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredProspects = prospects.filter(p => 
    p.business_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.city?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.contact_email?.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    
    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-600" />
            Lead Prospects
          </h1>
          <p className="text-slate-500 mt-2">Health checker scans used by potential customers.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name, city, email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            {filteredProspects.length} total scans
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('business_name')}>
                  Business {sortField === 'business_name' && (sortAsc ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                </th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('category')}>
                  Category {sortField === 'category' && (sortAsc ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                </th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('city')}>
                  City {sortField === 'city' && (sortAsc ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                </th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('headline_score')}>
                  Score {sortField === 'headline_score' && (sortAsc ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                </th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('scanned_at')}>
                  Date {sortField === 'scanned_at' && (sortAsc ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                </th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">Loading...</td>
                </tr>
              ) : filteredProspects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">No prospects found.</td>
                </tr>
              ) : (
                filteredProspects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <Building className="w-4 h-4 text-slate-400" />
                        {p.business_name}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{p.category}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400" /> {p.city || 'N/A'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.headline_score >= 80 ? 'bg-green-100 text-green-700' :
                        p.headline_score >= 50 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {p.headline_score}/100
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm">
                        {p.contact_email ? (
                          <span className="flex items-center gap-1 text-blue-600 font-medium">
                            <Mail className="w-3 h-3" /> {p.contact_email}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">No email</span>
                        )}
                        {p.contact_phone && (
                          <span className="flex items-center gap-1 text-slate-600">
                            <Phone className="w-3 h-3" /> {p.contact_phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(p.scanned_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(p.id)} className="text-slate-400 hover:text-red-600 transition-colors" title="Delete Prospect">
                        <Trash2 className="w-4 h-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

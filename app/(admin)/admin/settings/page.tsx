'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { Save, AlertTriangle, Key, Mail, CreditCard, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({
    upi_id: '',
    basic_plan_price: 299,
    premium_plan_price: 699,
    notification_email: '',
    notify_on_upgrade: true,
    notify_on_negative: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChanging, setPasswordChanging] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (err) {
      toast.error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) return;
    
    setPasswordChanging(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/change-password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
      });
      
      if (res.ok) {
        toast.success('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        const data = await res.json();
        toast.error(data.detail || 'Failed to change password');
      }
    } catch (err) {
      toast.error('Error changing password');
    } finally {
      setPasswordChanging(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-500 font-medium">Loading Settings...</div>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-slate-500 mt-1">Configure payments, notifications, and environment variables.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Payment Settings */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">Payment Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">UPI ID (For manual payments)</label>
              <input type="text" name="upi_id" value={settings.upi_id || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900" placeholder="e.g. merchant@upi" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Basic Plan Price (₹)</label>
                <input type="number" name="basic_plan_price" value={settings.basic_plan_price} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Premium Plan Price (₹)</label>
                <input type="number" name="premium_plan_price" value={settings.premium_plan_price} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900" />
              </div>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
            <Mail className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">Notification Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Admin Notification Email</label>
              <input type="email" name="notification_email" value={settings.notification_email || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900" placeholder="admin@glowqr.in" />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" name="notify_on_upgrade" checked={settings.notify_on_upgrade} onChange={handleChange} className="w-5 h-5 rounded text-slate-900 focus:ring-slate-900 border-slate-300" />
                <span className="text-sm font-medium text-slate-700">Send email on new upgrade request</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" name="notify_on_negative" checked={settings.notify_on_negative} onChange={handleChange} className="w-5 h-5 rounded text-slate-900 focus:ring-slate-900 border-slate-300" />
                <span className="text-sm font-medium text-slate-700">Send email on new negative feedback (1-2★)</span>
              </label>
            </div>
          </div>
        </section>

        {/* API Keys */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
            <Key className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">API Configuration</h2>
          </div>
          <div className="p-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 text-amber-800 text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold mb-1">Security Notice</p>
                <p>For security reasons, API keys (GROQ, Resend, Supabase) are strictly managed via the backend environment variables on your hosting provider (Render). They are not exposed or editable here.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Change Admin Password */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
            <Lock className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">Change Admin Password</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900" placeholder="Enter current password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900" placeholder="Enter new password" />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword || passwordChanging}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {passwordChanging ? 'Changing...' : 'Update Password'}
              </button>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed">
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

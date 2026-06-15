"use client";

import { useState, useMemo } from "react";
import { User, Lock, Mail, CheckCircle2, AlertCircle, Loader2, Palette, Sparkles, ArrowRight, Info, Eye, EyeOff } from "lucide-react";
import { getThemeVariables } from "@/components/review/themeUtils";
import { API_BASE_URL } from "@/lib/api-config";

export function SettingsTab({ user, business, onUpdate }: { user: any; business?: any; onUpdate?: () => void }) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || ""
  });

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [showPasswords, setShowPasswords] = useState(false);

  const [previewTheme, setPreviewTheme] = useState(() => 
    business?.animation_style === 'particle_burst' ? 'classic' : business?.animation_style === 'minimal_fade' ? 'premium' : 'free'
  );
  const [previewColor, setPreviewColor] = useState(business?.primary_color || "#6C63FF");

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileSuccess(false);
    setProfileError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const resData = await res.json();
      if (resData.new_token) {
        localStorage.setItem("token", resData.new_token);
      }

      setProfileSuccess(true);
      if (onUpdate) onUpdate();
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err: any) {
      setProfileError(err.message || "Something went wrong");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new_password !== passwords.confirm_password) {
      setPasswordError("New passwords do not match");
      return;
    }

    setPasswordLoading(true);
    setPasswordSuccess(false);
    setPasswordError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/auth/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: passwords.current_password,
          new_password: passwords.new_password
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to update password");
      }

      setPasswordSuccess(true);
      setPasswords({ current_password: "", new_password: "", confirm_password: "" });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(err.message || "Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">Account Settings</h1>
      
      {/* Profile Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Profile Information</h2>
        </div>

        {profileSuccess && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-medium">Profile updated successfully!</p>
          </div>
        )}

        {profileError && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{profileError}</p>
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-lg">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 !text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 !text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={profileLoading}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            {profileLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Branding Section */}
      {business && (() => {
        const userPlan = business.plan || user?.plan || 'basic';
        const isBasic = userPlan === 'basic';
        
        const currentThemeVars = getThemeVariables(previewTheme, previewColor);
        const isDarkText = currentThemeVars['--text-primary'] === '#111111';

        return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
          {isBasic && (
            <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-3xl">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 text-center max-w-sm">
                <Lock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Premium Feature</h3>
                <p className="text-sm text-slate-500 mb-4">Brand customization is locked on the Basic plan. Upgrade to customize your AR experience.</p>
                <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-sm w-full">
                  Upgrade Plan
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                  <Palette className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Brand Customization</h2>
              </div>

              <form onSubmit={async (e) => {
                e.preventDefault();
                if (isBasic) return;
                try {
                  const token = localStorage.getItem('token');
                  const res = await fetch(`${API_BASE_URL}/api/business/profile`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      animation_style: previewTheme === 'classic' ? 'particle_burst' : previewTheme === 'premium' ? 'minimal_fade' : 'none',
                      primary_color: previewColor
                    })
                  });
                  
                  if (res.ok) {
                    alert('Brand updated successfully!');
                    if (onUpdate) onUpdate();
                  }
                } catch (err) {
                  alert('Failed to update branding');
                }
              }} className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Theme Style</label>
                  <select 
                    value={previewTheme}
                    onChange={e => setPreviewTheme(e.target.value)}
                    disabled={isBasic}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 !text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
                  >
                    <option value="free">Free Trial (Default)</option>
                    <option value="classic">Basic (Particle Burst)</option>
                    <option value="premium">Premium (Minimal Fade)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Brand Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={previewColor}
                      onChange={e => setPreviewColor(e.target.value)}
                      disabled={isBasic}
                      className="w-12 h-12 p-0 border-0 rounded cursor-pointer"
                    />
                    <span className="text-sm text-slate-500">Pick your business color</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <Info className="w-4 h-4 text-slate-400 shrink-0" />
                  <p className="text-[10px] text-slate-500 font-medium">Text color automatically adapts to: <strong className="text-slate-900">{isDarkText ? 'Black' : 'White'}</strong> based on your background.</p>
                </div>

                <button
                  type="submit"
                  disabled={isBasic}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  Save Brand Changes
                </button>
              </form>
            </div>

            {/* Live Preview Panel */}
            <div className="w-[260px] shrink-0 flex flex-col">
              <label className="text-sm font-bold text-slate-700 mb-3 text-center">Live Preview</label>
              <div 
                className="w-full border border-slate-200 rounded-[2rem] overflow-hidden relative shadow-lg h-[400px] flex flex-col items-center justify-center transition-colors duration-300" 
                style={{ ...(currentThemeVars as any), backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="relative z-10 w-full flex flex-col items-center p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300" style={{ backgroundColor: 'var(--accent-glow)', color: 'var(--accent)' }}>
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold transition-colors duration-300 mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>{business.name || 'Your Business'}</h3>
                  <p className="text-xs transition-colors duration-300 mb-6 italic font-medium" style={{ color: 'var(--accent)' }}>{business.tagline || 'Scan Experience'}</p>
                  <button className="w-full py-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-colors duration-300" style={{ backgroundColor: 'var(--accent)', color: 'var(--text-primary)', boxShadow: '0 4px 14px var(--accent-glow)' }}>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })()}

      {/* Security Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Security</h2>
        </div>

        {passwordSuccess && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-medium">Password updated successfully!</p>
          </div>
        )}

        {passwordError && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{passwordError}</p>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-lg">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                required
                value={passwords.current_password}
                onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 !text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                required
                minLength={6}
                value={passwords.new_password}
                onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 !text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                required
                minLength={6}
                value={passwords.confirm_password}
                onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 !text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={passwordLoading}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            {passwordLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

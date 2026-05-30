'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  UserCircle, 
  CreditCard, 
  MessageSquareWarning, 
  Settings, 
  LogOut,
  Bell
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { GlowLogo } from '@/components/GlowLogo';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
          headers: { 'x-admin-secret': 'supersecretadmin' } // we will rely on cookie in production, but let's send header if needed or let cookie handle it
        });
        if (res.ok) {
          const data = await res.json();
          setPendingCount(data.stats.pending_requests || 0);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
    
    // Poll every 30s
    const int = setInterval(fetchStats, 30000);
    return () => clearInterval(int);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Requests', href: '/admin/requests', icon: Bell, badge: pendingCount },
    { name: 'Users', href: '/admin/users', icon: UserCircle },
    { name: 'Revenue', href: '/admin/revenue', icon: CreditCard },
    { name: 'Feedback', href: '/admin/feedback', icon: MessageSquareWarning },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <GlowLogo size={28} className="text-emerald-500" />
          GlowQR Admin
        </h1>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition ${
                isActive ? 'bg-emerald-500/10 text-emerald-400 font-medium' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.name}
              </div>
              {item.badge ? (
                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-400"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

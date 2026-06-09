'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert, CheckCircle, FileText, Activity, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminBombAlerts() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAlerts = async () => {
    try {
      const res = await fetch(`/api/admin-proxy/bomb-alerts`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
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

  useEffect(() => {
    fetchAlerts();
  }, [router]);

  const markResolved = async (alertId: string) => {
    try {
      const res = await fetch(`/api/admin-proxy/bomb-alerts/${alertId}/resolve`, {
        method: 'PATCH'
      });
      if (res.ok) {
        fetchAlerts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-slate-500 font-medium">Loading Bomb Alerts...</div>;
  if (!data) return <div className="p-8 text-red-500 font-medium">Failed to load alerts</div>;

  const { stats, alerts } = data;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          Review Bomb Protection
        </h1>
        <p className="text-slate-500 mt-1">Monitor and resolve detected review attacks across all businesses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Attacks This Month</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.total_attacks_this_month}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><Activity className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Businesses Under Attack</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.businesses_under_attack}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-xl"><ShieldAlert className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Flagged Sessions</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.total_flagged_sessions}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Recent Alerts</h2>
        </div>
        
        {alerts.length === 0 ? (
          <div className="p-12 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <p className="text-lg font-bold text-slate-900">All Clear</p>
            <p className="text-slate-500">No review attacks detected recently.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {alerts.map((alert: any) => (
              <div key={alert.id} className={`p-6 transition ${alert.is_resolved ? 'bg-slate-50 opacity-70' : 'bg-white hover:bg-slate-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="pt-1">
                      {alert.alert_level === 'red' ? (
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-900">{alert.business_name}</h3>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded">
                          {alert.plan}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          ID: {alert.business_id}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm mb-3">
                        <span className={`font-bold ${alert.risk_score > 70 ? 'text-red-600' : 'text-amber-600'}`}>
                          Score: {alert.risk_score}/100
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-semibold text-slate-700 capitalize">
                          {alert.verdict.replace('_', ' ')}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500">
                          {new Date(alert.triggered_at).toLocaleString()}
                        </span>
                      </div>
                      
                      {alert.reasons && (
                        <p className="text-sm text-slate-600 mb-4 max-w-2xl">
                          {alert.reasons.join(' • ')}
                        </p>
                      )}
                      
                      <div className="flex gap-3 mt-2">
                        {alert.evidence_report_url && (
                          <a 
                            href={alert.evidence_report_url} 
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-800 transition"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Evidence PDF
                          </a>
                        )}
                        {!alert.is_resolved ? (
                          <button 
                            onClick={() => markResolved(alert.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-50 transition"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Mark Resolved
                          </button>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

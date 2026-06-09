import { useState, useEffect } from 'react'
import { API_BASE_URL } from '@/lib/api-config'
import { AlertTriangle, Download, CheckCircle, Eye, ShieldAlert, FileText, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BombAlertsWidget({ accessToken, businessId }: { accessToken: string, businessId?: number }) {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (businessId) {
      fetchAlerts()
    }
  }, [businessId])

  const fetchAlerts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bomb-alerts/${businessId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      if (res.status === 403) {
        setIsPremium(false)
        setLoading(false)
        return
      }
      const data = await res.json()
      setAlerts(data.alerts || [])
      setIsPremium(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const markResolved = async (alertId: string) => {
    await fetch(`${API_BASE_URL}/api/bomb-alerts/${alertId}/resolve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    fetchAlerts()
  }

  const downloadReport = async (alertId: string, url: string) => {
    if (url) {
      window.open(url, '_blank')
    } else {
      const res = await fetch(`${API_BASE_URL}/api/bomb-alerts/${businessId}/${alertId}/report`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      const data = await res.json()
      if (data.report_url) {
        window.open(data.report_url, '_blank')
      }
    }
  }

  if (loading) return <div className="animate-pulse h-64 bg-slate-50 rounded-xl" />

  if (!isPremium) {
    return (
      <div className="relative p-6 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden group">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3 text-red-600">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Review Bomb Protection Locked</h3>
          <p className="text-sm text-slate-600 mb-4 max-w-sm">
            Upgrade to Premium to automatically detect and intercept coordinated fake review attacks.
          </p>
          <button 
            onClick={() => window.location.href = '/dashboard?tab=subscription'}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors"
          >
            Upgrade to Premium
          </button>
        </div>
        
        {/* Fake blurred content */}
        <div className="opacity-40 select-none filter blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h3 className="font-bold">Review Attack Alerts</h3>
          </div>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl">
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-4 w-16 bg-slate-200 rounded"></div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded mb-2"></div>
                <div className="h-3 w-3/4 bg-slate-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Review Attack Alerts</h3>
            <p className="text-xs text-slate-500">Detected coordinated fake reviews</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
          {alerts.filter(a => !a.is_resolved).length} Active
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <p className="font-bold text-emerald-900">No attacks detected</p>
          <p className="text-xs text-emerald-700 mt-1">Your business is safe</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`p-5 rounded-2xl border transition-all ${
                alert.is_resolved 
                  ? 'bg-slate-50 border-slate-200 opacity-70' 
                  : alert.alert_level === 'red'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${
                    alert.alert_level === 'red' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'
                  }`}>
                    {alert.alert_level}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    Score: <span className={alert.risk_score > 70 ? 'text-red-600' : 'text-amber-600'}>{alert.risk_score}/100</span>
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {new Date(alert.triggered_at).toLocaleDateString()}
                </span>
              </div>
              
              <h4 className="font-bold text-sm text-slate-900 mb-1 capitalize">
                {alert.verdict.replace('_', ' ')}
              </h4>
              
              {alert.reasons && alert.reasons.length > 0 && (
                <ul className="text-xs text-slate-600 mb-4 list-disc pl-4 space-y-1">
                  {alert.reasons.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {alert.evidence_report_url && (
                  <button 
                    onClick={() => downloadReport(alert.id, alert.evidence_report_url)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Evidence Report
                  </button>
                )}
                
                {!alert.is_resolved && (
                  <button 
                    onClick={() => markResolved(alert.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

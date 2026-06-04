import { useState, useEffect } from 'react'
import { API_BASE_URL } from '@/lib/api-config'

export function NegativeAlertsInbox({ accessToken }: { accessToken: string }) {
  const [alerts, setAlerts] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    const res = await fetch(`${API_BASE_URL}/api/analytics/negative-alerts?limit=10`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const data = await res.json()
    setAlerts(data.alerts || [])
    setUnreadCount(data.unread_count || 0)
    setLoading(false)
  }

  const markResolved = async (alertId: number) => {
    await fetch(`${API_BASE_URL}/api/analytics/negative-alerts/${alertId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ is_read: true, is_resolved: true })
    })
    // Refresh list
    fetchAlerts()
  }

  if (loading) return <div className="animate-pulse h-32 bg-slate-50 rounded-xl" />

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900">
            Negative Alerts
          </h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-red-100 text-red-700 
                           text-xs font-bold rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400">
          Email alerts active · WhatsApp in v2.0
        </span>
      </div>

      {/* Alert cards */}
      {alerts.length === 0 ? (
        <div className="p-8 bg-slate-50 rounded-xl text-center">
          <p className="text-sm font-medium text-slate-500">
            No negative alerts yet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            When a customer gives 1–2 stars, it appears here
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all ${
                !alert.is_read
                  ? 'bg-red-50 border-red-200'
                  : alert.is_resolved
                  ? 'bg-slate-50 border-slate-100 opacity-60'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {'★'.repeat(alert.overall_rating || alert.rating)}
                    {'☆'.repeat(5 - (alert.overall_rating || alert.rating))}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {alert.overall_rating || alert.rating} star review
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {new Date(alert.visit_time || alert.created_at)
                        .toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      {alert.meal_type && ` · ${alert.meal_type}`}
                      {alert.email_sent && (
                        <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded-md uppercase tracking-wider">
                          Mailed
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {!alert.is_resolved && (
                  <button
                    onClick={() => markResolved(alert.id)}
                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 
                             text-white rounded-lg hover:bg-emerald-700 
                             transition-colors whitespace-nowrap"
                  >
                    ✓ Fixed
                  </button>
                )}
                {alert.is_resolved && (
                  <span className="px-2 py-1 text-xs font-medium 
                                 bg-slate-100 text-slate-500 rounded-lg">
                    Resolved
                  </span>
                )}
              </div>

              {/* What they ordered */}
              {alert.selected_items?.length > 0 && (
                <p className="text-xs text-slate-500 mb-2">
                  <span className="font-medium text-slate-700">Ordered: </span>
                  {alert.selected_items.join(', ')}
                  {alert.price_range && ` · ${alert.price_range}/head`}
                </p>
              )}

              {/* Review text */}
              {alert.feedback_text && (
                <p className="text-xs text-slate-600 italic bg-slate-50 
                            rounded-lg px-3 py-2 border-l-2 border-slate-300
                            leading-relaxed">
                  "{alert.feedback_text}"
                </p>
              )}

              {/* Sub-ratings if available */}
              {(alert.food_rating || alert.service_rating || alert.atmosphere_rating) && (
                <div className="flex gap-3 mt-2">
                  {alert.food_rating && (
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      alert.food_rating <= 2
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      Food {alert.food_rating}★
                    </span>
                  )}
                  {alert.service_rating && (
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      alert.service_rating <= 2
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      Service {alert.service_rating}★
                    </span>
                  )}
                  {alert.atmosphere_rating && (
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      alert.atmosphere_rating <= 2
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      Atmosphere {alert.atmosphere_rating}★
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

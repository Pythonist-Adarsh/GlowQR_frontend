'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { RefreshCw, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

interface AIHealthData {
  windows: {
    '1h': { total: number; fallbacks: number; successes: number; fallback_rate: number }
    '24h': { total: number; fallbacks: number; successes: number; fallback_rate: number }
    '7d': { total: number; fallbacks: number; successes: number; fallback_rate: number }
  }
  last_success_at: string | null
  recent_fallbacks: {
    id: number
    timestamp: string
    business_name: string
    category: string
    reason: string
  }[]
}

export default function AIHealthDashboard() {
  const [data, setData] = useState<AIHealthData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/ai-health')
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (error) {
      console.error('Failed to fetch AI health data', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getRateColor = (rate: number) => {
    if (rate > 0.05) return 'text-red-500'
    if (rate >= 0.01) return 'text-yellow-500'
    return 'text-green-500'
  }

  const formatRate = (rate: number) => `${(rate * 100).toFixed(1)}%`

  if (!data && loading) {
    return <div className="p-8 flex justify-center"><RefreshCw className="animate-spin text-gray-400" /></div>
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Generation Health</h1>
          <p className="text-muted-foreground">Monitor AI fallback rates and generation errors.</p>
        </div>
        <Button onClick={fetchData} disabled={loading} variant="secondary">
          <RefreshCw className={`w-4 h-4 mr-2 inline-block ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {data && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 bg-slate-800 border-slate-700">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-slate-200">Fallback Rate (24h)</h3>
                <Activity className="h-4 w-4 text-slate-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${getRateColor(data.windows['24h'].fallback_rate)}`}>
                  {formatRate(data.windows['24h'].fallback_rate)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {data.windows['24h'].fallbacks} fallbacks out of {data.windows['24h'].total} requests
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 bg-slate-800 border-slate-700">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-slate-200">Fallback Rate (7d)</h3>
                <AlertTriangle className="h-4 w-4 text-slate-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${getRateColor(data.windows['7d'].fallback_rate)}`}>
                  {formatRate(data.windows['7d'].fallback_rate)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {data.windows['7d'].fallbacks} fallbacks out of {data.windows['7d'].total} requests
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 bg-slate-800 border-slate-700">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-slate-200">Last Successful Generation</h3>
                <CheckCircle className="h-4 w-4 text-slate-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  {data.last_success_at ? formatDistanceToNow(new Date(data.last_success_at), { addSuffix: true }) : 'Never'}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {data.last_success_at ? format(new Date(data.last_success_at), 'PPp') : '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border shadow-sm bg-slate-800 border-slate-700 mt-6">
            <div className="p-6">
              <h3 className="font-semibold text-white">Recent Fallback Events</h3>
            </div>
            <div className="px-6 pb-6">
              {data.recent_fallbacks.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <CheckCircle className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
                  <p>No recent fallbacks to show. The AI is working perfectly!</p>
                </div>
              ) : (
                <div className="rounded-md border border-slate-700 overflow-hidden">
                  <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs uppercase bg-slate-900 text-slate-400 border-b border-slate-700">
                      <tr>
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Business</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {data.recent_fallbacks.map((f, idx) => (
                        <tr key={idx} className="bg-slate-800 hover:bg-slate-700/50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-2 text-slate-400" />
                              {formatDistanceToNow(new Date(f.timestamp), { addSuffix: true })}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-white">
                            {f.business_name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 capitalize">{f.category || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 capitalize">
                              {f.reason?.replace(/_/g, ' ') || 'Unknown Error'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

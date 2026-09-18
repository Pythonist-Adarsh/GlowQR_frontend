'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

  const getRateBg = (rate: number) => {
    if (rate > 0.05) return 'bg-red-100 text-red-800'
    if (rate >= 0.01) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
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
        <Button onClick={fetchData} disabled={loading} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {data && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fallback Rate (24h)</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getRateColor(data.windows['24h'].fallback_rate)}`}>
                  {formatRate(data.windows['24h'].fallback_rate)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.windows['24h'].fallbacks} fallbacks out of {data.windows['24h'].total} requests
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fallback Rate (7d)</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getRateColor(data.windows['7d'].fallback_rate)}`}>
                  {formatRate(data.windows['7d'].fallback_rate)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.windows['7d'].fallbacks} fallbacks out of {data.windows['7d'].total} requests
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Successful Generation</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">
                  {data.last_success_at ? formatDistanceToNow(new Date(data.last_success_at), { addSuffix: true }) : 'Never'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.last_success_at ? format(new Date(data.last_success_at), 'PPp') : '-'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Fallback Events</CardTitle>
            </CardHeader>
            <CardContent>
              {data.recent_fallbacks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-300 mb-3" />
                  <p>No recent fallbacks to show. The AI is working perfectly!</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Business</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recent_fallbacks.map((f, idx) => (
                        <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-gray-400" />
                              {formatDistanceToNow(new Date(f.timestamp), { addSuffix: true })}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {f.business_name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 capitalize">{f.category || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 capitalize">
                              {f.reason?.replace(/_/g, ' ') || 'Unknown Error'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

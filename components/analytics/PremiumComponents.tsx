'use client';

import React from 'react';

export const AIInsightsCard = ({ data, hoursAgo = 1 }: any) => {
  const problems = data?.problems || [];
  const strengths = data?.strengths || [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-slate-900 font-bold text-lg flex items-center gap-2">
          <span>✨</span> AI Problem Detection
        </h3>
        <span className="text-xs text-slate-500">Updated {hoursAgo} hours ago</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Critical Areas</h4>
          {problems.map((p: any, i: number) => (
            <div key={i} className="p-4 rounded-xl border" style={{ background: '#FAEEDA', borderColor: '#EF9F27' }}>
              <div className="font-bold text-amber-900 mb-1 flex items-start gap-2">
                <span>⚠️</span> <span>{p.title}</span>
              </div>
              <p className="text-sm text-amber-800 mb-3 leading-relaxed">{p.description}</p>
              <div className="text-sm font-medium bg-amber-100 p-2 rounded-lg text-amber-900">
                💡 <strong>Action:</strong> {p.action}
              </div>
            </div>
          ))}
          {problems.length === 0 && <div className="text-slate-400 text-sm">No critical problems detected.</div>}
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Key Strengths</h4>
          {strengths.map((s: any, i: number) => (
            <div key={i} className="p-4 rounded-xl border" style={{ background: '#EAF3DE', borderColor: '#97C459' }}>
              <div className="font-bold text-emerald-900 mb-1 flex items-start gap-2">
                <span>✅</span> <span>{s.title}</span>
              </div>
              <p className="text-sm text-emerald-800 mb-3 leading-relaxed">{s.description}</p>
              <div className="text-sm font-medium bg-emerald-100 p-2 rounded-lg text-emerald-900">
                🚀 <strong>Leverage:</strong> {s.action}
              </div>
            </div>
          ))}
          {strengths.length === 0 && <div className="text-slate-400 text-sm">Collect more scans to see strengths.</div>}
        </div>
      </div>
    </div>
  );
};

export const ScanHeatmap = ({ data, primaryColor = '#1a1a1a' }: any) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({length: 24}, (_, i) => i);
  
  const safeData = Array.isArray(data) ? data : [];
  const maxCount = Math.max(1, ...(safeData.map((d: any) => d.count) || [1]));
  
  const getOpacity = (count: number) => {
    if (count === 0) return 0.05;
    return 0.1 + (count / maxCount) * 0.9;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
      <h3 className="text-slate-500 font-medium mb-4">7-Day Scan Heatmap</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'auto repeat(24, 1fr)', gap: 3, minWidth: 600}}>
        {days.map((day, dayIndex) => (
          <React.Fragment key={dayIndex}>
            <span className="text-xs text-slate-400 flex items-center">{day}</span>
            {hours.map(hour => {
              const cell = safeData.find((d: any) => d.day === dayIndex && d.hour === hour);
              const count = cell?.count || 0;
              return (
                <div
                  key={`${dayIndex}-${hour}`}
                  title={`${day} ${hour}:00 — ${count} scans`}
                  style={{
                    height: 18,
                    borderRadius: 3,
                    background: primaryColor,
                    opacity: getOpacity(count)
                  }}
                  className="transition-opacity hover:opacity-100 cursor-help"
                />
              )
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium pl-8" style={{minWidth: 600}}>
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>11 PM</span>
      </div>
    </div>
  );
};

export const ConversionFunnel = ({ data, primaryColor = '#1a1a1a' }: any) => {
  const stages = [
    { label: 'Scanned', key: 'scanned' },
    { label: 'Opened', key: 'enjoy' },
    { label: 'Rated', key: 'rate' },
    { label: 'Copied', key: 'ready' },
    { label: 'Posted', key: 'posted' }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col justify-between">
      <h3 className="text-slate-500 font-medium mb-6">Review Conversion Funnel</h3>
      <div className="flex justify-between items-center mb-6">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.key}>
            <div className="text-center flex-1">
              <div 
                className="h-10 w-full flex items-center justify-center text-white font-bold text-sm rounded-lg shadow-inner mb-2"
                style={{
                  background: primaryColor,
                  opacity: 1 - (i * 0.15)
                }}
              >
                {data?.percentages?.[i] || 0}%
              </div>
              <div className="text-xs text-slate-600 font-medium">{stage.label}</div>
            </div>
            
            {i < stages.length - 1 && (
              <div className="text-red-500 text-[10px] text-center px-1 font-bold whitespace-nowrap">
                →<br/>-{data?.dropOffs?.[i] || 0}%
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {data?.worstDropOff > 0 && (
        <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
          ⚠️ <strong>Biggest leak:</strong> {data.worstStage} ({data.worstDropOff}% drop-off). {data.fixSuggestion}
        </p>
      )}
    </div>
  );
};

export const RevenueImpactCard = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
      <h3 className="text-slate-500 font-medium mb-4">Estimated Business Impact</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">New reviews this month:</span>
          <strong className="text-slate-900">{data?.newReviews || 0}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Avg customer value:</span>
          <strong className="text-slate-900">₹{data?.avgCustomerValue || 450}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Review influence rate:</span>
          <strong className="text-slate-900">68%</strong>
        </div>
        <hr className="border-slate-100 my-2" />
        <div className="flex justify-between items-center">
          <span className="text-slate-700 font-medium">Estimated new customers:</span>
          <strong className="text-slate-900">~{data?.estimatedCustomers || 0}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-700 font-medium">Estimated revenue impact:</span>
          <strong className="text-emerald-600 text-lg">₹{(data?.estimatedRevenue || 0).toLocaleString('en-IN')}</strong>
        </div>
        <hr className="border-slate-100 my-2" />
        <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 font-bold flex justify-between items-center">
          <span>GlowQR ROI</span>
          <div className="text-right">
            <div>{data?.roi || 0}x</div>
            <div className="text-[10px] font-medium opacity-70">₹{data?.planCost} invest → ₹{data?.estimatedRevenue} return</div>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-slate-400 text-center mt-3">
        *Estimated based on industry average data
      </p>
    </div>
  );
};

export const StaffPerformanceCard = ({ data }: any) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return '#22c55e';
    if (rating >= 3.5) return '#EF9F27';
    return '#ef4444';
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-slate-500 font-medium mb-4">Staff Performance by Shift</h3>
      
      <div className="space-y-0 flex-1">
        {data?.windows?.map((window: any, i: number) => (
          <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
            <div>
              <div className="font-bold text-slate-700">{window.label}</div>
              <div className="text-xs text-slate-400">{window.time}</div>
            </div>
            <div 
              className="font-bold flex items-center gap-1"
              style={{color: getRatingColor(window.avgServiceRating)}}
            >
              {window.avgServiceRating.toFixed(1)} <span className="text-xs">★</span>
              {window.avgServiceRating < 3.5 && <span title="Needs Attention">⚠️</span>}
            </div>
          </div>
        ))}
      </div>
      
      {data?.worstWindow && data.worstWindow !== "None" && (
        <p className="text-sm mt-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
          ⚠️ <strong>{data.worstWindow} shift</strong> service is weak — consider extra training or staffing.
        </p>
      )}
    </div>
  );
};

export const NegativeInterceptionCard = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-slate-500 font-medium mb-4 flex items-center gap-2">
        <span className="text-emerald-500">🛡️</span> Negative Review Interception Stats
      </h3>
      
      <div className="bg-[#f8f9fa] border border-slate-200 rounded-xl p-4 text-center mb-6">
        <div className="text-sm font-bold text-slate-700">
          This month intercepted: <span className="font-black text-slate-900 ml-2">{data?.interceptedCount || 0} reviews</span>
        </div>
      </div>
      
      <div className="space-y-4 flex-1">
        <p className="text-sm text-slate-500 font-medium mb-2">If these reached Google:</p>
        <div className="flex justify-between items-center text-sm pl-4 border-l-2 border-slate-200">
          <span className="text-slate-600">Potential rating damage:</span>
          <strong className="text-slate-900 bg-slate-100 px-2 py-1 rounded">
            {data?.currentRating || 0} → {data?.potentialRating || 0} ★
          </strong>
        </div>
        <div className="flex justify-between items-center text-sm pl-4 border-l-2 border-slate-200">
          <span className="text-slate-600">Estimated customer loss:</span>
          <strong className="text-red-600 bg-red-50 px-2 py-1 rounded">~{data?.customerLoss || 0}/month</strong>
        </div>
        <div className="flex justify-between items-center text-sm mt-6 pt-4 border-t border-slate-100">
          <span className="text-slate-900 font-bold">You saved:</span>
          <strong className="text-emerald-600 text-lg">₹{(data?.revenueSaved || 0).toLocaleString('en-IN')} in revenue</strong>
        </div>
      </div>
    </div>
  );
};

export const QRPlacementCard = ({ data }: any) => {
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
        <h3 className="text-slate-500 font-medium mb-4">QR Placement Intelligence</h3>
        <p className="text-sm text-slate-400">Generate multiple QR codes to see placement analytics.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-slate-500 font-medium mb-4">QR Placement Intelligence</h3>
      
      <div className="space-y-0 flex-1">
        {safeData.slice(0, 4).map((qr: any, i: number) => (
          <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
            <div>
              <div className="font-bold text-slate-700">
                {i === 0 && <span className="text-amber-500 mr-1">🏆</span>}
                {qr.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Best time: {qr.best_hour}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900 text-sm">{qr.scan_count} scans</div>
              <div className="text-[11px] text-slate-500 font-medium">{qr.conversion_rate}% conv.</div>
            </div>
          </div>
        ))}
      </div>
      
      {safeData.length > 0 && (
        <p className="text-sm mt-4 text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
          "{safeData[0].label}" is performing best — keep QR codes prominent there!
        </p>
      )}
    </div>
  );
};

export const SentimentAnalysisCard = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-slate-500 font-medium mb-4 flex items-center gap-2">
        Sentiment Word Analysis
      </h3>
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-sm font-bold text-emerald-600 mb-2">Positive Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {(data?.positive || ["friendly", "delicious", "fast", "great service"]).map((word: string, i: number) => (
              <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium border border-emerald-100">
                {word}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-red-600 mb-2">Negative Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {(data?.negative || ["cold", "wait time", "expensive"]).map((word: string, i: number) => (
              <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded-md text-xs font-medium border border-red-100">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompetitorBenchmarkCard = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-slate-500 font-medium mb-4 flex items-center gap-2">
        Competitor Benchmark
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Your Rating</span>
          <span className="text-lg font-black text-slate-900">{data?.yourRating || 4.5}?</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Local Average</span>
          <span className="text-lg font-black text-slate-500">{data?.localAverage || 4.2}?</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${(data?.yourRating || 4.5) / 5 * 100}%` }}></div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1 opacity-50">
          <div className="bg-slate-400 h-2.5 rounded-full" style={{ width: `${(data?.localAverage || 4.2) / 5 * 100}%` }}></div>
        </div>
        <p className="text-sm mt-2 text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-100">
          You are performing <strong>better</strong> than {(data?.percentile || 85)}% of local competitors!
        </p>
      </div>
    </div>
  );
};



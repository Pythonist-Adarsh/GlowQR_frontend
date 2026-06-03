'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export const ReviewVelocityCard = ({ data }: any) => {
  const change = data?.percentage_change || 0;
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-slate-500 font-medium mb-4">Review Velocity</h3>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-3xl font-bold text-slate-900">{data?.this_week_count || 0}</div>
          <div className="text-sm text-slate-500">This week</div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold flex items-center gap-1 ${change > 0 ? 'text-emerald-500' : change < 0 ? 'text-red-500' : 'text-slate-500'}`}>
            {change > 0 ? '↑' : change < 0 ? '↓' : ''} {Math.abs(change)}%
          </div>
          <div className="text-xs text-slate-400">vs last week ({data?.last_week_count || 0})</div>
        </div>
      </div>
    </div>
  );
};

export const BestTimeCard = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col justify-center">
      <div className="flex gap-4">
        <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xl mb-2 block">🏆</span>
          <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider mb-1">Best Day</span>
          <strong className="text-lg text-slate-900 block">{data?.best_day || 'N/A'}</strong>
        </div>
        <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xl mb-2 block">⏰</span>
          <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider mb-1">Best Hour</span>
          <strong className="text-lg text-slate-900 block">{data?.best_hour_label || 'N/A'}</strong>
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-4 bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200">
        💡 <strong>Tip:</strong> Ensure staff is ready and QR codes are prominent during this time!
      </p>
    </div>
  );
};

export const RatingTrendChart = ({ data }: any) => {
  const safeData = Array.isArray(data) ? data : [];
  const isTrendingUp = safeData.length > 1 && safeData[safeData.length - 1].avg_rating >= safeData[0].avg_rating;
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-slate-500 font-medium mb-4">4-Week Rating Trend</h3>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={safeData}>
            <XAxis dataKey="week" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
            <YAxis domain={[1, 5]} tick={{fontSize: 11}} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Line 
              type="monotone" 
              dataKey="avg_rating" 
              stroke={isTrendingUp ? '#22c55e' : '#ef4444'}
              strokeWidth={3}
              dot={{fill: isTrendingUp ? '#22c55e' : '#ef4444', strokeWidth: 2, r: 4}}
              activeDot={{r: 6}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className={`text-sm mt-4 font-medium ${isTrendingUp ? 'text-emerald-600' : 'text-red-600'}`}>
        {isTrendingUp ? '📈 Rating is improving!' : '📉 Rating is declining — check recent reviews.'}
      </p>
    </div>
  );
};

export const MenuPerformanceChart = ({ data }: any) => {
  const getBarColor = (rating: number) => {
    if (rating >= 4) return '#22c55e';
    if (rating >= 3) return '#EF9F27';
    return '#ef4444';
  };

  const safeData = Array.isArray(data) ? data : [];
  const lowRatedDish = safeData.find((d: any) => d.avg_rating < 3.5);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-slate-500 font-medium mb-4">Top Mentioned Items</h3>
      <div className="space-y-4">
        {safeData.length === 0 && <div className="text-slate-400 text-sm py-4">No menu data yet.</div>}
        {safeData.slice(0, 5).map((dish: any, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-1/3 text-sm font-medium text-slate-700 truncate">{dish.dish_name}</div>
            <div className="w-2/3 flex items-center gap-2">
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  style={{
                    width: `${Math.min((dish.mention_count / (data[0]?.mention_count || 1)) * 100, 100)}%`,
                    backgroundColor: getBarColor(dish.avg_rating)
                  }}
                  className="h-full rounded-full"
                />
              </div>
              <div className="text-xs font-bold w-8 text-right">{dish.avg_rating}★</div>
            </div>
          </div>
        ))}
      </div>
      {lowRatedDish && (
        <p className="text-sm mt-5 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
          ⚠️ <strong>{lowRatedDish.dish_name}</strong> has a low rating ({lowRatedDish.avg_rating}/5) — quality check needed.
        </p>
      )}
    </div>
  );
};

export const RepeatVisitorsCard = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center h-full">
      <h3 className="text-slate-500 font-medium mb-4">Customer Loyalty</h3>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="text-2xl font-bold text-slate-900">{data?.unique_visitors || 0}</div>
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">Unique</div>
        </div>
        <div className="w-px bg-slate-200"></div>
        <div className="flex-1">
          <div className="text-2xl font-bold text-slate-900">{data?.repeat_visitors || 0} <span className="text-sm text-slate-400 font-normal">({data?.repeat_percentage || 0}%)</span></div>
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">Repeat</div>
        </div>
      </div>
      {data?.repeat_visitors > 0 && (
        <p className="text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100 mt-4">
          ✨ {data.repeat_visitors} customers scanned multiple times. You're building loyalty!
        </p>
      )}
    </div>
  );
};

export const LanguageSplitCard = ({ data, primaryColor = '#1a1a1a' }: any) => {
  const safeData = Array.isArray(data) ? data : [];
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
      <h3 className="text-slate-500 font-medium mb-4">Review Language</h3>
      <div className="space-y-5">
        {safeData.length === 0 && <div className="text-slate-400 text-sm py-4">No language data yet.</div>}
        {safeData.map((lang: any) => (
          <div key={lang.language}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-slate-700">{lang.language}</span>
              <span className="text-xs font-bold text-slate-500">{lang.percentage}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                style={{ width: `${lang.percentage}%`, backgroundColor: primaryColor }} 
                className="h-full rounded-full transition-all duration-1000"
              />
            </div>
          </div>
        ))}
      </div>
      {safeData.length > 0 && (
        <p className="text-sm mt-5 text-slate-600 italic">
          "{safeData[0].language} is the preferred language for reviews."
        </p>
      )}
    </div>
  );
};

export const GoogleConnectScore = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-slate-500 font-medium mb-4">Google Connect Funnel</h3>
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">Total Scans</span>
            <span className="font-bold">{data?.total_scans || 0}</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-full bg-slate-300 rounded-full" />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-emerald-600">Reached Google</span>
            <span className="font-bold text-emerald-600">{data?.google_redirects || 0}</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              style={{ width: `${100 - (data?.gap_percentage || 0)}%` }}
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
            />
          </div>
        </div>
      </div>
      
      {data?.gap > 0 && (
        <p className="text-sm mt-6 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
          ⚠️ <strong>{data.gap}</strong> customers scanned but didn't make it to Google.
        </p>
      )}
    </div>
  );
};

export const MonthlyReportCard = ({ data, onDownload }: any) => {
  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden h-full flex flex-col">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-white/60 font-medium text-sm uppercase tracking-wider mb-1">Monthly Report</h3>
          <h2 className="text-xl font-bold">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-1 relative z-10">
        <div className="bg-white/10 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
          <div className="text-xs text-white/60 mb-1">Reviews Collected</div>
          <div className="text-xl font-bold flex items-center gap-2">
            {data?.reviews_collected || 0}
            <span className={`text-xs px-2 py-0.5 rounded-full ${data?.vs_last_month_percentage > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
              {data?.vs_last_month_percentage > 0 ? '+' : ''}{data?.vs_last_month_percentage || 0}%
            </span>
          </div>
        </div>
        <div className="bg-white/10 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
          <div className="text-xs text-white/60 mb-1">Avg Rating</div>
          <div className="text-xl font-bold text-amber-400">{data?.avg_rating || 0}★</div>
        </div>
        <div className="bg-white/10 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
          <div className="text-xs text-white/60 mb-1">Conversion</div>
          <div className="text-xl font-bold">{data?.conversion_rate || 0}%</div>
        </div>
        <div className="bg-white/10 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
          <div className="text-xs text-white/60 mb-1">Best Dish</div>
          <div className="text-sm font-bold truncate" title={data?.best_dish || 'N/A'}>{data?.best_dish || 'N/A'}</div>
        </div>
      </div>
      
      <button 
        onClick={onDownload}
        className="w-full mt-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors relative z-10 flex justify-center items-center gap-2"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download PDF Report
      </button>
    </div>
  );
};

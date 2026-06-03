'use client';

import React, { useEffect, useState } from 'react';
import { usePlanGate } from '@/hooks/usePlanGate';
import { LockedSection } from '@/components/analytics/LockedSection';
import { API_BASE_URL } from '@/lib/api-config';

// Basic
import {
  ReviewVelocityCard,
  BestTimeCard,
  RatingTrendChart,
  MenuPerformanceChart,
  RepeatVisitorsCard,
  LanguageSplitCard,
  GoogleConnectScore,
  MonthlyReportCard
} from '@/components/analytics/BasicComponents';

// Premium
import {
  AIInsightsCard,
  ScanHeatmap,
  ConversionFunnel,
  RevenueImpactCard,
  StaffPerformanceCard,
  NegativeInterceptionCard,
  QRPlacementCard,
  SentimentAnalysisCard,
  CompetitorBenchmarkCard
} from '@/components/analytics/PremiumComponents';

export const AnalyticsTab = () => {
  const { hasAccess: hasBasic, loading: basicLoading } = usePlanGate('basic');
  const { hasAccess: hasPremium, loading: premiumLoading } = usePlanGate('premium');
  
  const [basicData, setBasicData] = useState<any>({});
  const [premiumData, setPremiumData] = useState<any>({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setDataLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch Basic Data if accessible
      if (hasBasic) {
        try {
          const endpoints = [
            'review-velocity', 'best-time', 'rating-trend', 'menu-performance',
            'repeat-visitors', 'language-split', 'google-score', 'monthly-report'
          ];
          const responses = await Promise.all(
            endpoints.map(ep => fetch(`${API_BASE_URL}/api/analytics/${ep}`, { headers }).then(res => res.json()))
          );
          
          setBasicData({
            velocity: responses[0],
            bestTime: responses[1],
            trend: responses[2],
            menu: responses[3],
            repeat: responses[4],
            language: responses[5],
            google: responses[6],
            monthly: responses[7]
          });
        } catch (e) {
          console.error("Basic analytics fetch failed", e);
        }
      }

      // Fetch Premium Data if accessible
      if (hasPremium) {
        try {
          const endpoints = [
            'ai-insights', 'heatmap', 'funnel', 'revenue-impact',
            'staff-performance', 'negative-impact', 'qr-performance'
          ];
          const responses = await Promise.all(
            endpoints.map(ep => fetch(`${API_BASE_URL}/api/analytics/${ep}`, { headers }).then(res => res.json()))
          );
          
          setPremiumData({
            ai: responses[0],
            heatmap: responses[1],
            funnel: responses[2],
            revenue: responses[3],
            staff: responses[4],
            negative: responses[5],
            qr: responses[6],
            sentiment: { positive: ["friendly staff", "delicious food", "clean", "quick service", "amazing atmosphere"], negative: ["long wait", "pricey", "cold food", "noisy"] },
            competitor: { yourRating: 4.8, localAverage: 4.2, percentile: 92 }
          });
        } catch (e) {
          console.error("Premium analytics fetch failed", e);
        }
      }
      
      setDataLoading(false);
    };

    if (!basicLoading && !premiumLoading) {
      fetchAnalytics();
    }
  }, [hasBasic, hasPremium, basicLoading, premiumLoading]);

  if (basicLoading || premiumLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pt-24 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
        <p className="text-slate-500 mt-2">Track performance, gather insights, and grow your business.</p>
      </div>

      {/* BASIC ANALYTICS SECTION */}
      <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8 pb-2 border-b border-slate-100">Growth Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {hasBasic ? (
          <>
            <div className="lg:col-span-1"><ReviewVelocityCard data={basicData.velocity} /></div>
            <div className="lg:col-span-2"><BestTimeCard data={basicData.bestTime} /></div>
            <div className="lg:col-span-1"><RepeatVisitorsCard data={basicData.repeat} /></div>
            
            <div className="lg:col-span-2"><RatingTrendChart data={basicData.trend} /></div>
            <div className="lg:col-span-2"><MenuPerformanceChart data={basicData.menu} /></div>
            
            <div className="lg:col-span-1"><LanguageSplitCard data={basicData.language} /></div>
            <div className="lg:col-span-1"><GoogleConnectScore data={basicData.google} /></div>
            <div className="lg:col-span-2"><MonthlyReportCard data={basicData.monthly} onDownload={handleDownloadReport} /></div>
          </>
        ) : (
          <div className="col-span-full">
            <LockedSection 
              title="Basic Analytics Locked" 
              description="Unlock visitor trends, menu performance, and Google connect scores."
              requiredPlan="basic"
              price="₹199"
            />
          </div>
        )}
      </div>

      {/* PREMIUM ANALYTICS SECTION */}
      <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
        <span className="text-amber-500">✨</span> Premium Intelligence
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {hasPremium ? (
          <>
            <AIInsightsCard data={premiumData.ai} hoursAgo={1} />
            
            <div className="lg:col-span-2"><ScanHeatmap data={premiumData.heatmap} /></div>
            <div className="lg:col-span-1"><ConversionFunnel data={premiumData.funnel} /></div>
            
            <div className="lg:col-span-1"><RevenueImpactCard data={premiumData.revenue} /></div>
            <div className="lg:col-span-1"><NegativeInterceptionCard data={premiumData.negative} /></div>
            <div className="lg:col-span-1"><StaffPerformanceCard data={premiumData.staff} /></div>
            
            <div className="lg:col-span-1"><SentimentAnalysisCard data={premiumData.sentiment} /></div>
            <div className="lg:col-span-1"><CompetitorBenchmarkCard data={premiumData.competitor} /></div>
            
            <div className="lg:col-span-1"><QRPlacementCard data={premiumData.qr} /></div>
          </>
        ) : (
          <div className="col-span-full">
            <LockedSection 
              title="Premium Intelligence Locked" 
              description="Unlock AI Problem Detection, Revenue Impact estimators, Heatmaps, and Negative Review Shield analytics."
              requiredPlan="premium"
              price="₹499"
            />
          </div>
        )}
      </div>
      
      {/* Print styles applied globally to hide everything except Monthly Report if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .bg-slate-900.text-white.p-6, .bg-slate-900.text-white.p-6 * {
            visibility: visible;
          }
          .bg-slate-900.text-white.p-6 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}

import React from 'react';

export const ReportDocument = ({ businessData, basicData, premiumData }: any) => {
  const currentMonthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const plan = businessData?.plan || 'basic';
  const isPremium = plan === 'premium';
  
  // Extract data safely
  const monthly = basicData?.monthly || {};
  const trend = Array.isArray(basicData?.trend) ? basicData.trend : [];
  const velocity = basicData?.velocity || {};
  const bestTime = basicData?.bestTime || {};
  const repeat = basicData?.repeat || {};
  const menu = Array.isArray(basicData?.menu) ? basicData.menu : [];
  const language = Array.isArray(basicData?.language) ? basicData.language : [];
  const google = basicData?.google || {};
  
  // Premium data
  const ai = premiumData?.ai || { problems: [], strengths: [] };
  const heatmap = Array.isArray(premiumData?.heatmap) ? premiumData.heatmap : [];
  const funnel = premiumData?.funnel || { percentages: [], dropOffs: [] };
  const revenue = premiumData?.revenue || {};
  const staff = Array.isArray(premiumData?.staff) ? premiumData.staff : [];
  const sentiment = premiumData?.sentiment || { positive: [], negative: [] };
  const competitor = premiumData?.competitor || {};

  // Goal tracker logic
  const goalTarget = isPremium ? 100 : 50;
  const currentReviews = monthly.reviews_collected || 0;
  const reviewsNeeded = Math.max(0, goalTarget - currentReviews);
  const reviewsPerMonth = monthly.reviews_collected || 1; // avoid division by zero
  const monthsToHitGoal = Math.ceil(reviewsNeeded / reviewsPerMonth);

  // Generate action plan dynamically
  const actionPlan = [];
  if (ai.problems && ai.problems.length > 0) {
    actionPlan.push({ urgency: 'URGENT', title: ai.problems[0].title, desc: ai.problems[0].action });
  }
  if (google.gap_percentage && google.gap_percentage > 30) {
    actionPlan.push({ urgency: 'URGENT', title: 'Fix Google Review link', desc: `${google.gap} customers did not reach Google. Verify your review URL in Settings.` });
  }
  if (sentiment.negative && sentiment.negative.length > 0) {
    actionPlan.push({ urgency: 'THIS WEEK', title: `Address '${sentiment.negative[0]}' complaints`, desc: `Keywords like '${sentiment.negative[0]}' are appearing in reviews. Investigate operations this week.` });
  }
  if (language && language.length > 1 && language[1].percentage > 10) {
    actionPlan.push({ urgency: 'THIS WEEK', title: `Enable ${language[1].language} reviews`, desc: `${language[1].percentage}% of your customers prefer ${language[1].language}. Enable it for better conversion.` });
  }
  if (isPremium && competitor.yourRating && competitor.percentile) {
    actionPlan.push({ urgency: 'THIS MONTH', title: `Leverage your ${competitor.yourRating} rating`, desc: `You beat ${competitor.percentile}% of local competitors. Add '${competitor.yourRating} on Google' to your menu and entrance sign.` });
  }
  actionPlan.push({ urgency: 'THIS MONTH', title: `Grow to ${goalTarget} reviews milestone`, desc: `You have ${currentReviews} reviews. At current rate, you hit ${goalTarget} in ${monthsToHitGoal} months. Push QR visibility.` });

  // Heatmap table summary processing
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const heatmapSummary = days.map((d, index) => {
    // Filter heatmap data for this day
    const dayData = heatmap.filter((h: any) => h.day === index);
    if (!dayData.length) return { day: d, morning: 'Low', afternoon: 'Low', evening: 'Low', peak: '—' };
    
    const getLvl = (count: number) => count > 5 ? 'HIGH ■' : count > 2 ? 'Medium' : 'Low';
    
    // Simplistic aggregation for demo purposes based on typical data structure
    // We assume hours 6-12 (Morning), 12-18 (Afternoon), 18-24 (Evening)
    const morningCount = dayData.filter((h: any) => h.hour >= 6 && h.hour < 12).reduce((sum: number, h: any) => sum + h.count, 0);
    const afternoonCount = dayData.filter((h: any) => h.hour >= 12 && h.hour < 18).reduce((sum: number, h: any) => sum + h.count, 0);
    const eveningCount = dayData.filter((h: any) => h.hour >= 18).reduce((sum: number, h: any) => sum + h.count, 0);
    
    let peak = '—';
    if (morningCount > afternoonCount && morningCount > eveningCount && morningCount > 0) peak = 'Morning';
    else if (afternoonCount > eveningCount && afternoonCount > 0) peak = 'Afternoon';
    else if (eveningCount > 0) peak = 'Evening';
    
    return {
      day: d,
      morning: getLvl(morningCount),
      afternoon: getLvl(afternoonCount),
      evening: getLvl(eveningCount),
      peak: peak
    };
  });

  return (
    <div id="print-report" className="hidden font-sans text-slate-900 bg-white print:block w-full">
      
      {/* PAGE 1 */}
      <div className="report-page p-8 max-w-4xl mx-auto" style={{ pageBreakAfter: 'always' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b-4 border-slate-900 pb-6">
          <div className="flex items-center gap-4">
            {businessData?.logo_url ? (
              <img src={businessData.logo_url} alt="Logo" className="w-16 h-16 object-contain" crossOrigin="anonymous" />
            ) : (
              <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center font-bold text-xs">LOGO</div>
            )}
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{businessData?.name || 'Your Business'}</h1>
              <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Monthly Performance Report</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-slate-900">{currentMonthYear}</h2>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Generated by GlowQR</p>
          </div>
        </div>

        <p className="text-slate-600 mb-8 font-medium">
          Here is your complete review performance summary for {currentMonthYear}. Your business is growing on Google — 
          and this report shows you exactly how, where to improve, and what is already working brilliantly.
        </p>

        {/* Top 4 Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
            <div className="w-4 h-4 bg-slate-900 mb-2"></div>
            <div className="text-3xl font-black mb-1">
              {monthly.avg_rating || '0.0'} <span className="text-sm text-emerald-600 font-bold">★</span>
            </div>
            <div className="text-xs text-slate-500">Avg Google Rating</div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <div className="w-4 h-4 bg-slate-900 mb-2"></div>
            <div className="text-3xl font-black mb-1">
              {monthly.reviews_collected || 0} <span className="text-sm text-emerald-600 font-bold">{monthly.vs_last_month_percentage > 0 ? '+' : ''}{monthly.vs_last_month_percentage || 0}%</span>
            </div>
            <div className="text-xs text-slate-500">Reviews Collected</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="w-4 h-4 bg-slate-900 mb-2"></div>
            <div className="text-3xl font-black mb-1">
              {monthly.conversion_rate || 0}%
            </div>
            <div className="text-xs text-slate-500">Conversion Rate</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="w-4 h-4 bg-slate-900 mb-2"></div>
            <div className="text-3xl font-black mb-1 truncate" title={monthly.best_dish || 'N/A'}>
              {monthly.best_dish || 'N/A'}
            </div>
            <div className="text-xs text-slate-500">Best Performing Dish</div>
          </div>
        </div>

        {/* Big Win */}
        {monthly.reviews_collected > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-8">
            <p className="text-emerald-900 font-medium">
              ■ <strong>Big win this month:</strong> You collected {monthly.reviews_collected} new reviews. {businessData?.name || 'Your business'} is now appearing more prominently in local Google searches.
            </p>
          </div>
        )}

        {/* 4-Week Rating Trend */}
        <div className="mb-8">
          <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
            <div className="w-3 h-3 bg-white"></div> 4-Week Rating Trend
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-sm">
                <th className="py-2 px-4 border border-slate-800">Week</th>
                <th className="py-2 px-4 border border-slate-800 text-center">Avg Rating</th>
                <th className="py-2 px-4 border border-slate-800 text-center">Reviews</th>
                <th className="py-2 px-4 border border-slate-800">Trend</th>
              </tr>
            </thead>
            <tbody>
              {trend.length === 0 ? (
                <tr><td colSpan={4} className="py-4 text-center text-slate-500 border border-slate-200">No trend data available</td></tr>
              ) : (
                trend.map((t: any, i: number) => (
                  <tr key={i} className="border-b border-slate-200 text-sm border-l border-r">
                    <td className="py-3 px-4">Week {t.week}</td>
                    <td className="py-3 px-4 text-center">{t.avg_rating} ■</td>
                    <td className="py-3 px-4 text-center">{t.reviews_count}</td>
                    <td className="py-3 px-4 text-slate-600">{i === 0 ? 'Starting baseline' : t.avg_rating >= trend[i-1].avg_rating ? 'Improving momentum ■' : 'Slight dip'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {trend.length > 1 && trend[trend.length-1].avg_rating >= trend[0].avg_rating && (
            <p className="text-emerald-600 font-bold text-sm mt-3">■ Rating is improving! Keep this momentum going.</p>
          )}
        </div>

        {/* Customer Patterns */}
        <div className="mb-8">
          <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
            <div className="w-3 h-3 bg-white"></div> Review Velocity & Customer Patterns
          </div>
          <div className="grid grid-cols-3 border border-slate-200 rounded">
            <div className="p-4 border-r border-slate-200">
              <h4 className="font-bold mb-4">■ Best Day to Collect Reviews</h4>
              <div className="text-3xl font-black mb-2">{bestTime.best_day || 'N/A'}</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {bestTime.best_day}s have your highest scan rate. Make sure your QR is prominent mid-week.
              </p>
            </div>
            <div className="p-4 border-r border-slate-200">
              <h4 className="font-bold mb-4">■ Best Hour Window</h4>
              <div className="text-3xl font-black mb-2">{bestTime.best_hour_label || 'N/A'}</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ensure staff are briefed about QR during this window.
              </p>
            </div>
            <div className="p-4">
              <h4 className="font-bold mb-4">■ Customer Loyalty</h4>
              <p className="text-sm font-bold mb-1">{repeat.unique_visitors || 0} Unique <span className="font-normal text-slate-500">customers scanned</span></p>
              <p className="text-sm font-bold mb-4">{repeat.repeat_visitors || 0} returned <span className="font-normal text-slate-500">for a second visit ■</span></p>
              {repeat.repeat_visitors > 0 && <p className="text-xs text-emerald-600 font-bold">You are building loyalty!</p>}
            </div>
          </div>
        </div>

      </div>

      {/* PAGE 2 */}
      <div className="report-page p-8 max-w-4xl mx-auto" style={{ pageBreakAfter: 'always' }}>
        
        {/* Top Menu Items */}
        <div className="mb-8 mt-4">
          <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
            <div className="flex gap-1"><div className="w-2 h-3 bg-white"></div><div className="w-2 h-3 bg-white"></div></div> Top Mentioned Menu Items
          </div>
          <p className="text-sm text-slate-600 mb-6">These dishes appear most often in customer reviews. Highlight them on your menu and in social media.</p>
          <div className="space-y-6">
            {menu.length === 0 ? (
              <p className="text-slate-500 text-sm">No menu mentions recorded yet.</p>
            ) : (
              menu.map((dish: any, i: number) => {
                const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
                const maxMentions = menu[0].mention_count || 1;
                const width = Math.max(5, (dish.mention_count / maxMentions) * 100);
                return (
                  <div key={i}>
                    <p className="font-bold text-slate-900 mb-1 flex justify-between">
                      <span>■ {dish.dish_name}</span>
                      <span className="text-xs text-slate-500">{dish.avg_rating}★ ({dish.mention_count} mentions)</span>
                    </p>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-1 flex">
                      <div className={`h-full ${colors[i%colors.length]}`} style={{ width: `${width}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-500">■ Customer favorite — {dish.avg_rating >= 4 ? 'highly rated' : 'keep quality consistent'}</p>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Review Language Split */}
        <div className="mb-8">
          <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
            <div className="flex gap-1"><div className="w-3 h-3 bg-white"></div><div className="w-3 h-3 bg-white"></div></div> Review Language Split
          </div>
          <p className="text-sm text-slate-600 mb-4">Understanding how your customers write helps us generate better AI reviews.</p>
          <table className="w-full text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-900 text-white text-sm">
                <th className="py-2 px-4 border border-slate-800">Language</th>
                <th className="py-2 px-4 border border-slate-800 text-center">Share</th>
                <th className="py-2 px-4 border border-slate-800 text-center">Reviews</th>
                <th className="py-2 px-4 border border-slate-800">What This Means</th>
              </tr>
            </thead>
            <tbody>
              {language.length === 0 ? (
                <tr><td colSpan={4} className="py-4 text-center text-slate-500">No language data available</td></tr>
              ) : (
                language.map((l: any, i: number) => (
                  <tr key={i} className="border-b border-slate-200 text-sm">
                    <td className="py-3 px-4 font-bold">■ {l.language}</td>
                    <td className="py-3 px-4 text-center">{l.percentage}%</td>
                    <td className="py-3 px-4 text-center">~{Math.round((l.percentage/100)*monthly.reviews_collected)}</td>
                    <td className="py-3 px-4 text-slate-600">{i===0 ? 'Primary language' : 'Growing fast'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {language.length > 0 && (
            <p className="text-emerald-600 font-bold text-sm mt-3">■ {language[0].language} is preferred. Keep it as the primary option.</p>
          )}
        </div>

        {/* Google Connect Funnel */}
        <div className="mb-8">
          <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
            <div className="w-3 h-3 bg-white"></div> Google Connect Funnel
          </div>
          <p className="text-sm text-slate-600 mb-6">This shows how many customers went all the way from scanning your QR to posting on Google.</p>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <div className="w-48 font-bold">■ Scanned QR</div>
              <div className="flex-1 flex"><div className="h-6 bg-emerald-500 rounded mr-4" style={{ width: '100%' }}></div></div>
              <div className="w-20 font-bold text-right">{google.total_scans || 0} (100%)</div>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-48 font-bold">■ Reached Google</div>
              <div className="flex-1 flex">
                <div className="h-6 bg-emerald-500 rounded mr-4" style={{ width: `${100 - (google.gap_percentage || 0)}%` }}></div>
              </div>
              <div className="w-20 font-bold text-right">{google.google_redirects || 0} ({100 - (google.gap_percentage || 0)}%)</div>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-48 font-bold">■ Did Not Reach</div>
              <div className="flex-1 flex">
                <div className="h-6 bg-red-500 rounded mr-4" style={{ width: `${google.gap_percentage || 0}%` }}></div>
              </div>
              <div className="w-20 font-bold text-right">{google.gap || 0} ({google.gap_percentage || 0}%)</div>
            </div>
          </div>
          
          {google.gap > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-6">
              <p className="text-yellow-800 font-medium text-sm">
                ■■ <strong>Biggest leak: {google.gap} customers scanned but did not reach Google ({google.gap_percentage}% drop-off).</strong><br/>
                This means your review URL may need checking, or the Copy button is not prominent enough.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PAGE 3 */}
      {isPremium && (
        <div className="report-page p-8 max-w-4xl mx-auto" style={{ pageBreakAfter: 'always' }}>
          {/* AI Problem Detection */}
          <div className="mb-8 mt-4">
            <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
              <div className="w-3 h-3 bg-white"></div> AI Problem Detection (Premium Intelligence)
            </div>
            <p className="text-sm text-slate-600 mb-6">Our AI analyzed your recent scan data. Here are the critical areas, with specific actions you can take.</p>
            
            <div className="space-y-4">
              {ai.problems?.map((p: any, i: number) => (
                <div key={i} className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                  <h4 className="font-bold text-yellow-900 mb-1 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span> {p.title}
                  </h4>
                  <p className="text-sm text-yellow-800 mb-2">{p.description}</p>
                  <p className="text-sm text-yellow-900"><strong>Action:</strong> {p.action}</p>
                </div>
              ))}
              {ai.strengths?.map((s: any, i: number) => (
                <div key={i} className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                  <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> {s.title}
                  </h4>
                  <p className="text-sm text-emerald-800 mb-2">{s.description}</p>
                  <p className="text-sm text-emerald-900"><strong>Action:</strong> {s.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Heatmap Summary */}
          <div className="mb-8">
            <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
              <div className="flex gap-1"><div className="w-3 h-3 bg-white"></div><div className="w-3 h-3 bg-white"></div></div> 7-Day Scan Heatmap Summary
            </div>
            <p className="text-sm text-slate-600 mb-4">When are your customers most active? Use this to staff up and ensure QR visibility during peak windows.</p>
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-900 text-white text-xs">
                  <th className="py-2 px-3 border border-slate-800">Day</th>
                  <th className="py-2 px-3 border border-slate-800 text-center">6AM–12PM</th>
                  <th className="py-2 px-3 border border-slate-800 text-center">12PM–6PM</th>
                  <th className="py-2 px-3 border border-slate-800 text-center">6PM–12AM</th>
                  <th className="py-2 px-3 border border-slate-800 text-center">Peak Window</th>
                </tr>
              </thead>
              <tbody>
                {heatmapSummary.map((h, i) => (
                  <tr key={i} className="border-b border-slate-200 text-xs border-l border-r">
                    <td className="py-3 px-3 font-medium">{h.day}</td>
                    <td className={`py-3 px-3 text-center ${h.morning.includes('HIGH') ? 'bg-emerald-50 font-bold text-emerald-800' : 'text-slate-600'}`}>{h.morning}</td>
                    <td className={`py-3 px-3 text-center ${h.afternoon.includes('HIGH') ? 'bg-emerald-50 font-bold text-emerald-800' : 'text-slate-600'}`}>{h.afternoon}</td>
                    <td className={`py-3 px-3 text-center ${h.evening.includes('HIGH') ? 'bg-emerald-50 font-bold text-emerald-800' : 'text-slate-600'}`}>{h.evening}</td>
                    <td className="py-3 px-3 text-center font-bold">{h.peak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Estimated Business Impact */}
          <div className="mb-8">
            <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
              <div className="w-3 h-3 bg-white"></div> Estimated Business Impact
            </div>
            <p className="text-sm text-slate-600 mb-4">This is what GlowQR's review activity means in real business terms for {currentMonthYear}.</p>
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-900 text-white text-sm">
                  <th className="py-2 px-4 border border-slate-800">Metric</th>
                  <th className="py-2 px-4 border border-slate-800 text-center">Value</th>
                  <th className="py-2 px-4 border border-slate-800">What It Means</th>
                </tr>
              </thead>
              <tbody className="text-sm border-l border-r">
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-4">■ New reviews this month</td>
                  <td className="py-3 px-4 text-center font-bold">{revenue.new_reviews || 0}</td>
                  <td className="py-3 px-4 text-slate-600">Fresh trust signals on Google</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-4">■ Avg customer value</td>
                  <td className="py-3 px-4 text-center font-bold">₹{revenue.avg_customer_value || 0}</td>
                  <td className="py-3 px-4 text-slate-600">Per visit estimate</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-4">■ Estimated revenue impact</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-600">₹{revenue.estimated_revenue || 0}</td>
                  <td className="py-3 px-4 text-slate-600">Customers driven by your reviews</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-slate-200">
                  <td className="py-3 px-4 font-bold text-emerald-900">■ GlowQR ROI</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-600">{revenue.roi_multiplier || 0}x</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold">Every ₹1 spent returns ₹{revenue.roi_multiplier || 0} in value</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* PAGE 4 */}
      {isPremium && (
        <div className="report-page p-8 max-w-4xl mx-auto" style={{ pageBreakAfter: 'always' }}>
          
          {/* Competitor Benchmark */}
          <div className="mb-8 mt-4">
            <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
              <div className="w-3 h-3 bg-white"></div> Competitor Benchmark
            </div>
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-900 text-white text-sm">
                  <th className="py-2 px-4 border border-slate-800">Metric</th>
                  <th className="py-2 px-4 border border-slate-800 text-center">You</th>
                  <th className="py-2 px-4 border border-slate-800 text-center">Local Avg</th>
                  <th className="py-2 px-4 border border-slate-800 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm border-l border-r border-b border-slate-200">
                <tr>
                  <td className="py-3 px-4">■ Google Rating</td>
                  <td className="py-3 px-4 text-center font-bold">{competitor.yourRating || '4.0'}</td>
                  <td className="py-3 px-4 text-center">{competitor.localAverage || '4.0'}</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-600 bg-emerald-50">Better than {competitor.percentile || 50}% ■</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Staff Performance */}
          <div className="mb-8">
            <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
              <div className="flex gap-1"><div className="w-3 h-3 bg-white"></div><div className="w-3 h-3 bg-white"></div><div className="w-3 h-3 bg-white"></div></div> Staff Performance by Shift
            </div>
            <p className="text-sm text-slate-600 mb-4">Ratings broken down by time of visit help identify which shift needs attention.</p>
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-900 text-white text-sm">
                  <th className="py-2 px-4 border border-slate-800">Shift</th>
                  <th className="py-2 px-4 border border-slate-800 text-center">Avg Rating</th>
                  <th className="py-2 px-4 border border-slate-800 text-center">Reviews</th>
                  <th className="py-2 px-4 border border-slate-800 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm border-l border-r">
                {staff.map((s: any, i: number) => (
                  <tr key={i} className="border-b border-slate-200">
                    <td className="py-3 px-4">■ {s.shift}</td>
                    <td className="py-3 px-4 text-center font-bold">{s.avg_rating} ■</td>
                    <td className="py-3 px-4 text-center">{s.scans}</td>
                    <td className={`py-3 px-4 text-center font-bold ${s.avg_rating >= 4.5 ? 'bg-emerald-50 text-emerald-600' : 'text-slate-700'}`}>
                      {s.avg_rating >= 4.5 ? 'Excellent ■' : 'Good ■'}
                    </td>
                  </tr>
                ))}
                {staff.length === 0 && <tr><td colSpan={4} className="py-4 text-center text-slate-500 border-b border-slate-200">No shift data</td></tr>}
              </tbody>
            </table>
          </div>

          {/* Sentiment Analysis */}
          <div className="mb-8">
            <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
              <div className="w-3 h-3 bg-white"></div> Sentiment Word Analysis
            </div>
            <p className="text-sm text-slate-600 mb-4">These are the actual words customers used in reviews. Positive words are your brand reputation. Negative words are your to-do list.</p>
            <div className="grid grid-cols-2 border border-slate-200">
              <div className="p-6 border-r border-slate-200 bg-emerald-50/30">
                <h4 className="font-bold text-slate-900 mb-1">■ Positive Keywords</h4>
                <p className="text-sm text-emerald-600 mb-4">What customers love about you</p>
                <div className="flex flex-wrap gap-2">
                  {sentiment.positive?.map((w: string, i: number) => (
                    <span key={i} className="text-sm text-emerald-700 bg-emerald-100 px-2 py-1 rounded">■ {w}</span>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-red-50/30">
                <h4 className="font-bold text-slate-900 mb-1">■■ Negative Keywords</h4>
                <p className="text-sm text-red-600 mb-4">What needs fixing</p>
                <div className="flex flex-wrap gap-2">
                  {sentiment.negative?.map((w: string, i: number) => (
                    <span key={i} className="text-sm text-red-700 bg-red-100 px-2 py-1 rounded">■ {w}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* PAGE 5 */}
      <div className="report-page p-8 max-w-4xl mx-auto">
        
        {/* Action Plan */}
        <div className="mb-8 mt-4">
          <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
            <div className="w-3 h-3 bg-white"></div> Your Personalised Action Plan for Next Month
          </div>
          <p className="text-sm text-slate-600 mb-4">Based on {currentMonthYear} data, here is exactly what {businessData?.name || 'you'} should do:</p>
          
          <div className="space-y-4">
            {actionPlan.map((action, i) => (
              <div key={i} className={`p-4 border rounded flex gap-4 ${action.urgency === 'URGENT' ? 'bg-red-50 border-red-200' : action.urgency === 'THIS WEEK' ? 'bg-yellow-50 border-yellow-200' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className="mt-1">
                  <div className={`w-4 h-4 ${action.urgency === 'URGENT' ? 'bg-red-900' : action.urgency === 'THIS WEEK' ? 'bg-yellow-900' : 'bg-emerald-900'}`}></div>
                </div>
                <div>
                  <h4 className={`font-bold ${action.urgency === 'URGENT' ? 'text-red-900' : action.urgency === 'THIS WEEK' ? 'text-yellow-900' : 'text-emerald-900'}`}>
                    {action.urgency}: {action.title}
                  </h4>
                  <p className="text-sm text-slate-700 mt-1">{action.desc}</p>
                </div>
              </div>
            ))}
            {actionPlan.length === 0 && (
              <div className="p-4 border rounded bg-slate-50 border-slate-200 text-slate-600">
                Keep doing what you're doing! No urgent actions needed.
              </div>
            )}
          </div>
        </div>

        {/* Growth Goal Tracker */}
        <div className="mb-8">
          <div className="bg-slate-900 text-white font-bold py-2 px-4 mb-4 rounded-t flex items-center gap-2">
            <div className="w-3 h-3 bg-white"></div> Growth Goal Tracker
          </div>
          
          <div className="border border-emerald-500 bg-emerald-50 p-6 rounded-lg">
            <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-5 h-5 bg-slate-900"></div> {goalTarget} Reviews Milestone
            </h3>
            <p className="text-slate-800 text-sm font-medium mb-1">
              You have <strong>{currentReviews} reviews</strong>. You need <strong>{reviewsNeeded} more</strong> to reach {goalTarget}.
            </p>
            <p className="text-slate-800 text-sm font-medium mb-6">
              At your current pace of {reviewsPerMonth}/month, you will hit {goalTarget} in <strong>approximately {monthsToHitGoal} months</strong>.
            </p>
            <p className="text-emerald-700 text-sm font-medium mb-6">
              To reach {goalTarget} faster: increase QR scans. Place QR at 3 touchpoints — table, counter, and entry door.
            </p>
            
            <h4 className="font-bold text-slate-900 mb-2">Progress toward {goalTarget} reviews:</h4>
            <div className="w-full bg-emerald-100 h-6 rounded-full overflow-hidden relative flex">
              <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, (currentReviews/goalTarget)*100)}%` }}></div>
              <div className="absolute inset-0 flex items-center px-4 font-bold text-xs" style={{ color: (currentReviews/goalTarget) > 0.5 ? 'white' : 'black' }}>
                {currentReviews} / {goalTarget}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-500">
          <div>
            <strong className="text-emerald-600">{currentReviews} reviews done</strong> &nbsp;&nbsp;&nbsp; {reviewsNeeded} to go
          </div>
          <div className="text-right">
            <strong>GlowQR</strong> — AI-Powered QR Review Platform<br/>
            This report is generated automatically from your GlowQR dashboard data. Generated: {new Date().toLocaleDateString()} • Plan: {plan.charAt(0).toUpperCase() + plan.slice(1)} • Business: {businessData?.name || 'N/A'}
          </div>
        </div>

      </div>

    </div>
  );
};

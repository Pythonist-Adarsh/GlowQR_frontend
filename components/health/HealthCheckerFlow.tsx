'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ArrowRight, ShieldCheck, MapPin, Building, Star, AlertTriangle, TrendingUp, CheckCircle2, ChevronRight, Sparkles, Info, XCircle } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-config';
import Link from 'next/link';

const STEPS = {
  SEARCH: 1,
  LOADING: 2,
  RESULTS: 3
};

export function HealthCheckerFlow() {
  const [step, setStep] = useState(STEPS.SEARCH);
  
  // Search State
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Scan State
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [category, setCategory] = useState('Restaurant'); // Default
  
  // Session State
  const [sessionToken, setSessionToken] = useState<string>('');
  
  // Lead State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);

  // Debounced Search
  useEffect(() => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }
    
    // Initialize session token if it doesn't exist
    let currentToken = sessionToken;
    if (!currentToken) {
      try {
        currentToken = crypto.randomUUID();
      } catch (e) {
        currentToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      setSessionToken(currentToken);
    }
    
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/health-check/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, category, session_token: currentToken })
        });
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.error("Autocomplete fetch error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleManualSearch = async () => {
    // Initialize session token if it doesn't exist
    let currentToken = sessionToken;
    if (!currentToken) {
      try {
        currentToken = crypto.randomUUID();
      } catch (e) {
        currentToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      setSessionToken(currentToken);
    }

    setIsSearching(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/health-check/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, category, session_token: currentToken })
      });
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      }
    } catch (err) {
      console.error("Manual search error:", err);
      alert("Failed to search. Please check console for details.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectBusiness = async (place: any) => {
    setStep(STEPS.LOADING);
    
    // Attempt to extract city from address
    const addressParts = place.address.split(',');
    const city = addressParts.length >= 2 ? addressParts[addressParts.length - 2].trim() : "Local Area";
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/health-check/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          place_id: place.place_id,
          name: place.name,
          address: place.address,
          category: category,
          city: city,
          session_token: sessionToken
        })
      });
      
      // Clear session token so a new one is generated for the next search
      setSessionToken('');
      
      if (res.ok) {
        const data = await res.json();
        setScanResult(data);
        setTimeout(() => {
          setStep(STEPS.RESULTS);
        }, 1500); // Artificial delay to build anticipation
      } else {
        alert("Could not analyze this business right now. Please try again.");
        setStep(STEPS.SEARCH);
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
      setStep(STEPS.SEARCH);
    }
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/health-check/capture-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_id: scanResult.scan_id,
          email,
          phone
        })
      });
      if (res.ok) {
        setLeadCaptured(true);
        alert("Report sent successfully! Check your inbox.");
        setEmail('');
        setPhone('');
      } else {
        alert("Failed to send report. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send report due to a network error.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[var(--bg-card)] rounded-3xl shadow-2xl shadow-blue-900/5 border border-[var(--border-default)] min-h-[600px] flex flex-col relative">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: SEARCH */}
        {step === STEPS.SEARCH && (
          <motion.div 
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 md:p-12 flex-1 flex flex-col"
          >
            <div className="text-center mb-10 mt-8">
              <div className="w-16 h-16 bg-blue-50 text-[var(--accent)] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
                Get Your Free Local SEO Score
              </h1>
              <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
                See exactly how your Google Business Profile compares against your top local competitors in seconds.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto w-full space-y-6 flex-1">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Business Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-[var(--border-default)] bg-[var(--bg-primary)] focus:border-[var(--accent)] outline-none transition-colors font-medium text-[var(--text-primary)]"
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Salon">Salon / Spa</option>
                  <option value="Gym">Gym / Fitness</option>
                  <option value="CA Firm">CA Firm / Accountant</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Jewellery">Jewellery Store</option>
                </select>
              </div>

              <div className="space-y-3 relative z-10">
                <label className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Search Your Business</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                    </div>
                    <input 
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleManualSearch() }}
                      placeholder="Enter business name and city..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[var(--border-default)] bg-[var(--bg-primary)] focus:border-[var(--accent)] outline-none transition-colors text-[var(--text-primary)] font-medium text-lg placeholder:text-slate-400"
                    />
                    {isSearching && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleManualSearch}
                    disabled={isSearching || query.length < 3}
                    className="h-[60px] px-8 rounded-xl text-white font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    Search
                  </button>
                </div>
                
                {/* Autocomplete Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl shadow-2xl max-h-[300px] overflow-y-auto z-50">
                    {searchResults.map((place, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSelectBusiness(place)}
                        className="w-full text-left p-4 hover:bg-[var(--bg-primary)] border-b border-[var(--border-default)] last:border-0 flex items-start gap-4 transition-colors"
                      >
                        <div className="mt-1 flex-shrink-0 bg-slate-100 p-2 rounded-lg">
                          <Building className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text-primary)]">{place.name}</div>
                          <div className="text-sm text-[var(--text-secondary)] flex items-start gap-1 mt-1">
                            <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" /> 
                            <span className="whitespace-normal leading-tight">{place.address}</span>
                          </div>
                          {place.rating > 0 && (
                            <div className="text-sm font-semibold text-amber-500 flex items-center gap-1 mt-1">
                              {place.rating} ★ <span className="text-slate-400 font-normal">({place.reviews} reviews)</span>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
          </motion.div>
        )}

        {/* STEP 2: LOADING */}
        {step === STEPS.LOADING && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-12 flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[var(--accent)] rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-8 h-8 text-[var(--accent)] animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Analyzing Local Landscape...</h2>
            
            <div className="space-y-3 text-left w-full max-w-xs mx-auto">
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Fetching your GMB data
              </div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 text-[var(--text-secondary)]"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Identifying top {category} competitors
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-3 text-[var(--text-secondary)]"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Calculating local visibility score
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: RESULTS */}
        {step === STEPS.RESULTS && scanResult && (
          <motion.div 
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col h-full space-y-8"
          >
            {/* Header Result - Light Theme with Circular Ring */}
            <div className="bg-[var(--bg-card)] p-8 md:px-12 md:py-10 text-center relative overflow-hidden rounded-3xl border border-[var(--border-default)] shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
                <div className="text-left flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-sm font-bold uppercase tracking-wider text-[var(--accent)]">Health Score Result</div>
                    <button 
                      onClick={() => {
                        setScanResult(null);
                        setStep(STEPS.SEARCH);
                        setQuery('');
                        setSearchResults([]);
                      }}
                      className="text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors flex items-center gap-1"
                    >
                      Search again
                    </button>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 text-[var(--text-primary)]">
                    {scanResult.headline_score >= 80 ? 'Excellent visibility! You are dominating local search.' : 
                     scanResult.headline_score >= 50 ? 'Average. You are losing significant traffic to competitors.' : 
                     'Critical alert. You are virtually invisible in local search.'}
                  </h2>
                  <p className="text-[var(--text-secondary)] text-lg">
                    This score combines your Google Maps performance with your AI-Search readiness.
                  </p>
                </div>
                
                {/* Score Ring */}
                <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-default)" strokeWidth="10" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" 
                      stroke={scanResult.headline_score >= 70 ? 'var(--success-main)' : scanResult.headline_score >= 40 ? '#F59E0B' : '#EF4444'} 
                      strokeWidth="10" 
                      strokeDasharray={`${scanResult.headline_score * 2.83} 283`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="text-4xl font-extrabold" style={{ color: scanResult.headline_score >= 70 ? 'var(--success-main)' : scanResult.headline_score >= 40 ? '#F59E0B' : '#EF4444' }}>
                    {scanResult.headline_score}
                  </span>
                </div>
              </div>

              {/* Three Dimension Score Breakdown */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                {/* Local Visibility */}
                <div className="bg-[var(--bg-primary)] p-5 rounded-2xl border border-[var(--border-default)] flex flex-col items-center text-center">
                  <div className="text-[var(--text-primary)] font-bold mb-1">Local Visibility</div>
                  <div className="text-[var(--text-secondary)] text-xs mb-3">Google Maps & Reviews</div>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-default)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="8" strokeDasharray={`${scanResult.gmb_score * 2.51} 251`} strokeLinecap="round" />
                    </svg>
                    <span className="font-bold text-[var(--text-primary)]">{scanResult.gmb_score}</span>
                  </div>
                </div>
                
                {/* Website SEO */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md">COMING SOON</div>
                  <div className="text-slate-400 font-bold mb-1">Website SEO</div>
                  <div className="text-slate-400 text-xs mb-3">On-page markup</div>
                  <div className="relative w-16 h-16 flex items-center justify-center opacity-50 grayscale">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E4E9" strokeWidth="8" />
                    </svg>
                    <span className="font-bold text-slate-400">N/A</span>
                  </div>
                </div>

                {/* AI Search Ready */}
                <div className={`bg-[var(--bg-primary)] p-5 rounded-2xl border border-[var(--border-default)] flex flex-col items-center text-center relative ${!scanResult.has_website ? 'overflow-hidden' : ''}`}>
                  {!scanResult.has_website ? (
                    <div className="absolute top-2 right-2 bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md">NO WEBSITE</div>
                  ) : (
                    <div className="absolute -top-3 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" /> NEW
                    </div>
                  )}
                  <div className={!scanResult.has_website ? "text-slate-400 font-bold mb-1" : "text-[var(--text-primary)] font-bold mb-1"}>AI Search Ready</div>
                  <div className={!scanResult.has_website ? "text-slate-400 text-xs mb-3 px-2" : "text-[var(--text-secondary)] text-[10px] mb-3 leading-tight px-2"}>
                    {!scanResult.has_website ? "No website found — can't be evaluated" : "How discoverable you are to ChatGPT & AI Overviews"}
                  </div>
                  <div className={`relative w-16 h-16 flex items-center justify-center ${!scanResult.has_website ? 'opacity-50 grayscale' : ''}`}>
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke={!scanResult.has_website ? "#E2E4E9" : "var(--border-default)"} strokeWidth="8" />
                      {scanResult.has_website && (
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" strokeWidth="8" strokeDasharray={`${scanResult.geo_aeo_score * 2.51} 251`} strokeLinecap="round" />
                      )}
                    </svg>
                    <span className={`font-bold ${!scanResult.has_website ? 'text-slate-400' : 'text-[var(--text-primary)]'}`}>
                      {!scanResult.has_website ? 'N/A' : scanResult.geo_aeo_score}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-8">
              
              {/* Left Column: Data & Competitors */}
              <div className="space-y-8">
                
                {/* Competitor Leaderboard */}
                <section className="bg-[var(--bg-card)] p-6 md:p-8 rounded-3xl border border-[var(--border-default)] shadow-sm">
                  <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[var(--accent)]" /> 
                    Local Competitor Leaderboard
                  </h3>
                  
                  {(() => {
                    // Combine business with top 5 competitors and sort
                    const allBiz = [
                      { isMe: true, name: "You (Searched Business)", rating: scanResult.business_rating, reviews: scanResult.business_reviews },
                      ...(scanResult.competitors || []).slice(0, 5).map((c: any, i: number) => ({
                        isMe: false, name: c.name || `Competitor ${i+1}`, rating: c.rating, reviews: c.reviews
                      }))
                    ].sort((a, b) => b.reviews - a.reviews);
                    
                    const myRank = allBiz.findIndex(b => b.isMe) + 1;
                    const maxReviews = Math.max(1, ...allBiz.map(b => b.reviews));
                    
                    return (
                      <>
                        <p className="text-[var(--text-secondary)] mb-6 font-medium">
                          You rank <strong className="text-[var(--text-primary)]">#{myRank}</strong> out of {allBiz.length} top businesses in {category} near {scanResult.city || 'you'}.
                        </p>
                        <div className="space-y-5">
                          {allBiz.map((biz, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between mb-1.5 items-end">
                                <span className={`font-semibold text-sm ${biz.isMe ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                                  {idx + 1}. {biz.name}
                                </span>
                                <span className={`font-bold text-sm ${biz.isMe ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                                  {biz.reviews} reviews
                                </span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-3">
                                <div 
                                  className={`h-3 rounded-full ${biz.isMe ? 'bg-[var(--accent)]' : 'bg-slate-300'}`}
                                  style={{ width: `${Math.max(2, (biz.reviews / maxReviews) * 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </section>

                {/* Top Issues List */}
                <section className="bg-[var(--bg-card)] p-6 md:p-8 rounded-3xl border border-[var(--border-default)] shadow-sm">
                  <h3 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--text-primary)]" /> 
                    Top Issues Found
                  </h3>
                  <ul className="space-y-4">
                    {scanResult.issues.map((issue: string, idx: number) => {
                      let severity = 'info';
                      let Icon = Info;
                      let colors = 'bg-blue-50 text-blue-700 border-blue-200';
                      let tagText = 'INFO';
                      
                      const issueLower = issue.toLowerCase();
                      if (issueLower.includes('critical') || issueLower.includes('below the 4.0') || issueLower.includes('virtually invisible')) {
                        severity = 'critical';
                        Icon = XCircle;
                        colors = 'bg-red-50 text-red-700 border-red-200';
                        tagText = 'CRITICAL';
                      } else if (issueLower.includes('losing') || issueLower.includes('missing') || issueLower.includes('lion\'s share')) {
                        severity = 'warning';
                        Icon = AlertTriangle;
                        colors = 'bg-amber-50 text-amber-700 border-amber-200';
                        tagText = 'WARNING';
                      }
                      
                      return (
                        <li key={idx} className="flex flex-col sm:flex-row sm:items-start gap-3 bg-white p-4 rounded-xl border border-[var(--border-default)]">
                          <div className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 w-fit border ${colors}`}>
                            <Icon className="w-3 h-3" /> {tagText}
                          </div>
                          <p className="text-[var(--text-primary)] leading-snug text-sm sm:mt-0.5">{issue}</p>
                        </li>
                      );
                    })}
                    {scanResult.issues.length === 0 && (
                      <li className="text-green-700 font-medium p-4 bg-green-50 rounded-xl border border-green-200 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> No major issues found! Keep growing your reviews.
                      </li>
                    )}
                  </ul>
                </section>
                
              </div>

              {/* Right Column: CTA & Lead Gen */}
              <div className="bg-[var(--bg-card)] p-8 rounded-3xl border-2 border-[var(--border-default)] shadow-xl flex flex-col justify-center h-full">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Fix this with GlowQR</h3>
                  <p className="text-[var(--text-secondary)]">
                    {scanResult.business_reviews < scanResult.competitor_top_reviews 
                      ? `Your top competitor has ${scanResult.competitor_top_reviews - scanResult.business_reviews} more reviews than you. Start automating your 5-star reviews today.` 
                      : `Stay ahead of the competition. Automate your 5-star review collection.`}
                  </p>
                </div>
                
                <Link href="/register">
                  <button className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-xl shadow-blue-500/20 mb-8" style={{ backgroundColor: 'var(--accent)' }}>
                    Start 3-Day Free Trial <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                {!leadCaptured ? (
                  <div className="pt-8 border-t border-[var(--border-default)]">
                    <p className="text-sm font-medium text-center text-[var(--text-primary)] mb-4">Want a PDF copy of this detailed report?</p>
                    <form onSubmit={submitLead} className="flex gap-2">
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] focus:border-[var(--accent)] outline-none text-sm"
                        required
                      />
                      <button type="submit" className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors">
                        Send
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="pt-8 border-t border-[var(--border-default)] text-center">
                    <div className="inline-flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Report Sent!
                    </div>
                  </div>
                )}
                
              </div>
              
            </div>
            
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

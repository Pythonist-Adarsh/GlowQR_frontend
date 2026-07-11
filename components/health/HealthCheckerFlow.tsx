'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ArrowRight, ShieldCheck, MapPin, Building, Star, AlertTriangle, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';
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
    
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/health-check/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleManualSearch = async () => {
    if (!query || query.length < 3) return;
    setIsSearching(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/health-check/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      }
    } catch (err) {
      console.error(err);
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
          city: city
        })
      });
      
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
      await fetch(`${API_BASE_URL}/api/health-check/capture-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_id: scanResult.scan_id,
          email,
          phone
        })
      });
      setLeadCaptured(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[var(--bg-card)] rounded-3xl shadow-2xl shadow-blue-900/5 overflow-hidden border border-[var(--border-default)] min-h-[600px] flex flex-col relative">
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
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto">
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
                          <div className="text-sm text-[var(--text-secondary)] flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {place.address}
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
            className="flex-1 flex flex-col h-full"
          >
            {/* Header Result */}
            <div className="bg-slate-900 text-white p-8 md:px-12 md:py-10 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-3xl mx-auto">
                <div className="text-left flex-1">
                  <div className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Health Score Result</div>
                  <h2 className="text-3xl font-bold mb-2">{scanResult.headline_score}/100</h2>
                  <p className="text-slate-300 text-lg">
                    {scanResult.headline_score >= 80 ? 'Excellent visibility! You are dominating local search.' : 
                     scanResult.headline_score >= 50 ? 'Average. You are losing significant traffic to competitors.' : 
                     'Critical alert. You are virtually invisible in local search.'}
                  </p>
                </div>
                
                {/* Circular Score display could go here, keeping it simple for now */}
              </div>
            </div>

            <div className="p-8 md:p-12 flex-1 grid lg:grid-cols-2 gap-12 bg-[var(--bg-primary)]">
              
              {/* Left Column: Data & Competitors */}
              <div className="space-y-10">
                
                <section>
                  <h3 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[var(--accent)]" /> 
                    Competitor Comparison
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Your Business */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">You ({scanResult.business_rating} ★)</span>
                        <span className="font-bold">{scanResult.business_reviews} reviews</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className="bg-[var(--text-primary)] h-3 rounded-full" 
                          style={{ width: `${Math.min(100, (scanResult.business_reviews / Math.max(scanResult.competitor_top_reviews, scanResult.business_reviews, 1)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Top Competitor */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-[var(--text-secondary)]">Top Competitor</span>
                        <span className="font-bold text-[var(--accent)]">{scanResult.competitor_top_reviews} reviews</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className="bg-[var(--accent)] h-3 rounded-full" 
                          style={{ width: `${Math.min(100, (scanResult.competitor_top_reviews / Math.max(scanResult.competitor_top_reviews, scanResult.business_reviews, 1)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" /> 
                    Top Issues Found
                  </h3>
                  <ul className="space-y-4">
                    {scanResult.issues.map((issue: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-default)]">
                        <div className="mt-0.5 text-amber-500">●</div>
                        <p className="text-[var(--text-primary)] leading-snug">{issue}</p>
                      </li>
                    ))}
                    {scanResult.issues.length === 0 && (
                      <li className="text-green-600 font-medium p-4 bg-green-50 rounded-xl">No major issues found! Keep growing your reviews.</li>
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

'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { Loader2, FlaskConical, CheckCircle2, XCircle, Search, X, ScanFace } from 'lucide-react';
import { ReviewPageOrchestrator } from '@/components/review/ReviewPageOrchestrator';

export default function SimulatorPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch(`/api/admin-proxy/businesses-list`, {
          headers: { 'x-admin-secret': 'supersecretadmin' }
        });
        if (res.ok) {
          const data = await res.json();
          setBusinesses(data.businesses || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingList(false);
      }
    };
    fetchBusinesses();
  }, []);

  const handleSimulate = async (business: any) => {
    setSelectedBusiness(business);
    setResults(null);
    setModalOpen(true);
    setSimulating(true);

    try {
      const payload = {
        business_name: business.name || 'Unknown',
        category: business.category ? business.category.toLowerCase() : 'restaurant',
        city: business.city || '',
        services: '', // No manual input
        overall_rating: 5,
        plan: business.plan || 'trial'
      };

      const res = await fetch(`/api/admin-proxy/simulate-reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'supersecretadmin' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      } else {
        alert("Failed to generate reviews");
      }
    } catch (err) {
      console.error(err);
      alert("Error calling simulator API");
    } finally {
      setSimulating(false);
    }
  };

  const renderHighlightedText = (text: string, avoidWords: string[], placeWord: string, category: string) => {
    let highlightedText = text;
    const allBadWords = [...(avoidWords || [])];
    
    const isRestaurantOrFineDining = category === 'restaurant' || category === 'fine dining';
    
    if (!isRestaurantOrFineDining) {
      allBadWords.push('restaurant');
      allBadWords.push('dinner');
    }
    
    const noFoodPlaces = ['firm', 'salon', 'gym', 'clinic', 'institute', 'store'];
    if (noFoodPlaces.includes(placeWord)) {
      allBadWords.push('food');
    }

    if (allBadWords.length > 0) {
      const pattern = new RegExp(`\\b(${allBadWords.join('|')})\\b`, 'gi');
      highlightedText = highlightedText.replace(pattern, (match) => `<span class="bg-red-500/20 text-red-400 px-1 py-0.5 rounded font-bold">${match}</span>`);
    }

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const validateReview = (text: string, debugInfo: any, category: string) => {
    const textLower = text.toLowerCase();
    const isRestaurantOrFineDining = category === 'restaurant' || category === 'fine dining';
    const noFoodPlaces = ['firm', 'salon', 'gym', 'clinic', 'institute', 'store'];
    
    const failsAvoid = debugInfo.avoid_words?.some((w: string) => new RegExp(`\\b${w.toLowerCase()}\\b`).test(textLower));
    const failsRestaurant = !isRestaurantOrFineDining && /\brestaurant\b/.test(textLower);
    const failsDinner = !isRestaurantOrFineDining && /\bdinner\b/.test(textLower);
    const failsFood = noFoodPlaces.includes(debugInfo.place_word) && /\bfood\b/.test(textLower);

    return {
      failsAvoid,
      failsRestaurant,
      failsDinner,
      failsFood
    };
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 relative">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FlaskConical className="text-emerald-500" /> Review Simulator
        </h1>
        <p className="text-slate-400 mt-1">Test AI review generation for any business — verify category flow is working correctly.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loadingList ? (
          <div className="flex justify-center items-center h-64 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Business Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">City</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {businesses.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{b.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-400 capitalize">{b.category || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{b.city || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        b.plan === 'premium' ? 'bg-amber-500/10 text-amber-500' :
                        b.plan === 'basic' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {b.plan || 'trial'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedBusiness(b);
                            setScannerModalOpen(true);
                          }}
                          className="bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white border border-purple-500/20 transition-all font-bold py-1.5 px-4 rounded-lg text-sm flex items-center gap-2"
                        >
                          <ScanFace className="w-4 h-4" /> Scan Effect
                        </button>
                        <button
                          onClick={() => handleSimulate(b)}
                          className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-slate-900 border border-emerald-500/20 transition-all font-bold py-1.5 px-4 rounded-lg text-sm flex items-center gap-2"
                        >
                          <FlaskConical className="w-4 h-4" /> Simulate Reviews
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {businesses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No businesses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal / Popup for Simulation Results */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-slate-800 animate-in slide-in-from-right">
            
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FlaskConical className="text-emerald-500" /> Simulation Results
                </h2>
                {selectedBusiness && (
                  <div className="mt-1 flex flex-col gap-1">
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                      <span className="text-white font-medium">{selectedBusiness.name}</span>
                      <span className="text-slate-600">•</span>
                      <span className="capitalize">{selectedBusiness.category || 'Uncategorized'}</span>
                    </p>
                    <p className="text-xs text-emerald-400/80 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit">
                      Simulating as category: <span className="font-bold text-emerald-400 capitalize">{selectedBusiness.category ? selectedBusiness.category.toLowerCase() : 'restaurant'}</span>
                    </p>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {simulating ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                  <p className="text-sm animate-pulse">Generating reviews via AI...</p>
                </div>
              ) : results ? (
                <div className="space-y-4">
                  {(results.reviews || []).map((review: string, idx: number) => {
                    const category = selectedBusiness?.category ? selectedBusiness.category.toLowerCase() : 'restaurant';
                    const vals = validateReview(review, results, category);
                    const isRestaurantOrFineDining = category === 'restaurant' || category === 'fine dining';
                    const noFoodPlaces = ['firm', 'salon', 'gym', 'clinic', 'institute', 'store'];
                    
                    const isValid = !vals.failsAvoid && !vals.failsRestaurant && !vals.failsDinner && (!noFoodPlaces.includes(results.place_word) || !vals.failsFood);

                    return (
                      <div key={idx} className={`bg-slate-800/50 border ${isValid ? 'border-emerald-500/30' : 'border-red-500/30'} rounded-2xl p-5`}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded-md">Review {idx + 1}</span>
                            {isValid ? (
                              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-md">
                                <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded-md">
                                <XCircle className="w-3.5 h-3.5" /> FAILED
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-slate-300 text-[15px] leading-relaxed mb-4">
                          "{renderHighlightedText(review, results.avoid_words || [], results.place_word || '', category)}"
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-800/50">
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            {vals.failsAvoid ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            <span className={vals.failsAvoid ? 'text-red-400' : 'text-slate-400'}>Avoid Words</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            {vals.failsRestaurant ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            <span className={vals.failsRestaurant ? 'text-red-400' : 'text-slate-400'}>Restaurant Rule</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            {vals.failsDinner ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            <span className={vals.failsDinner ? 'text-red-400' : 'text-slate-400'}>Dinner Rule</span>
                          </div>
                          {noFoodPlaces.includes(results.place_word) && (
                            <div className="flex items-center gap-1.5 text-xs font-medium">
                              {vals.failsFood ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                              <span className={vals.failsFood ? 'text-red-400' : 'text-slate-400'}>Food Rule</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <Search className="w-12 h-12 mb-4 opacity-50" />
                  <p>Results will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Scanner Effect Modal */}
      {scannerModalOpen && selectedBusiness && (
        <div className="fixed inset-0 z-[100] flex bg-slate-950">
          <div className="flex-1 overflow-hidden relative">
            <ReviewPageOrchestrator 
              initialData={{
                name: selectedBusiness.name,
                category: selectedBusiness.category,
                primaryColor: selectedBusiness.primaryColor,
                welcomeMessage: selectedBusiness.welcomeMessage,
                tagline: selectedBusiness.tagline,
                logoUrl: selectedBusiness.logoUrl,
                website: selectedBusiness.website,
                plan: selectedBusiness.plan || 'trial'
              }}
              isEmbedded={false}
            />
          </div>
          {/* Close Button overlay */}
          <button 
            onClick={() => setScannerModalOpen(false)}
            className="absolute top-6 right-6 z-[110] p-3 text-white/50 hover:text-white hover:bg-white/10 bg-black/20 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

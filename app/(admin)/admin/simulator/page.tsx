'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api-config';
import { Loader2, FlaskConical, CheckCircle2, XCircle, Star, Search, Info } from 'lucide-react';

const CATEGORIES = [
  "restaurant", "cafe / coffee shop", "fast food / qsr", "bar / lounge", 
  "bakery / dessert shop", "food court", "fine dining", "food truck", 
  "cloud kitchen", "salon", "spa", "gym", "retail", 
  "bridal & festive jewellery", "hotel", "medical", "education", 
  "tax / ca firm", "other"
];

export default function SimulatorPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('');
  
  const [form, setForm] = useState({
    business_name: '',
    category: 'restaurant',
    city: 'Lucknow',
    services: 'Signature Dish, Popular Choice',
    overall_rating: 5,
    plan: 'trial'
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/businesses-list`, {
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

  const handleBusinessSelect = (id: string) => {
    setSelectedBusinessId(id);
    if (!id) return;
    
    const bus = businesses.find(b => b.id.toString() === id);
    if (bus) {
      setForm(prev => ({
        ...prev,
        business_name: bus.name || '',
        category: bus.category ? bus.category.toLowerCase() : 'restaurant',
        city: bus.city || '',
        plan: bus.plan || 'trial'
      }));
    }
  };

  const generateReviews = async () => {
    if (!form.business_name || !form.category) return alert("Business Name and Category are required");
    
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/simulate-reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'supersecretadmin' },
        body: JSON.stringify(form)
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
      setLoading(false);
    }
  };

  const renderHighlightedText = (text: string, avoidWords: string[], placeWord: string, category: string) => {
    let highlightedText = text;
    const allBadWords = [...avoidWords];
    
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
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FlaskConical className="text-emerald-500" /> Review Simulator
        </h1>
        <p className="text-slate-400 mt-1">Test AI review generation for any business — verify category flow is working correctly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Select Existing Business</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none disabled:opacity-50"
                  value={selectedBusinessId}
                  onChange={(e) => handleBusinessSelect(e.target.value)}
                  disabled={loadingList}
                >
                  <option value="">-- Custom Input --</option>
                  {businesses.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.category || 'none'})</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Business Name</label>
                <input 
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none"
                  value={form.business_name}
                  onChange={e => setForm({...form, business_name: e.target.value})}
                  placeholder="e.g. Vernika Academy"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Category</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none"
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">City</label>
                <input 
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none"
                  value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Services / Items (comma separated)</label>
                <textarea 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none h-20"
                  value={form.services}
                  onChange={e => setForm({...form, services: e.target.value})}
                  placeholder="e.g. NEET Coaching, Class 10 Board Prep"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Overall Rating</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none"
                    value={form.overall_rating}
                    onChange={e => setForm({...form, overall_rating: parseInt(e.target.value)})}
                  >
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Plan</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none"
                    value={form.plan}
                    onChange={e => setForm({...form, plan: e.target.value})}
                  >
                    <option value="trial">Trial</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={generateReviews}
                disabled={loading}
                className="w-full mt-4 bg-emerald-500 text-slate-900 font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-emerald-400 transition disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FlaskConical className="w-5 h-5" />}
                Generate Test Reviews
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results */}
        <div className="lg:col-span-8 space-y-6">
          {results ? (
            <>
              {results.place_word && (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-6 shadow-lg shadow-black/20">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-500" /> Category Debug Info
                  </h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                      <span className="text-slate-500">Place Word:</span> 
                      <span className="text-white ml-2 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">{results.place_word}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Avoid Words:</span> 
                      <span className="text-white ml-2">{(results.avoid_words || []).join(', ') || 'None'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500">Storyteller Context:</span> 
                      <span className="text-emerald-400 ml-2 italic">{results.storyteller_context || 'N/A'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500">R1 Opener:</span> 
                      <span className="text-white ml-2">{results.r1_opener || 'N/A'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500">R3 Issue:</span> 
                      <span className="text-rose-400 ml-2">{results.r3_issue || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}

              <h2 className="text-lg font-bold text-white mb-4">Generated Reviews</h2>
              <div className="space-y-4">
                {(results.reviews || []).map((review: string, idx: number) => {
                  const vals = validateReview(review, results, form.category);
                  const isRestaurantOrFineDining = form.category === 'restaurant' || form.category === 'fine dining';
                  const noFoodPlaces = ['firm', 'salon', 'gym', 'clinic', 'institute', 'store'];
                  
                  return (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded-md">Variant {idx + 1}</span>
                          <span className="flex text-amber-400"><Star className="w-4 h-4 fill-current" /> {form.overall_rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-[15px] leading-relaxed mb-4">
                        "{renderHighlightedText(review, results.avoid_words || [], results.place_word || '', form.category)}"
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          {vals.failsAvoid ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          <span className={vals.failsAvoid ? 'text-red-400' : 'text-slate-400'}>Avoid Words Rule</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          {vals.failsRestaurant ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          <span className={vals.failsRestaurant ? 'text-red-400' : 'text-slate-400'}>"Restaurant" Rule</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          {vals.failsDinner ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          <span className={vals.failsDinner ? 'text-red-400' : 'text-slate-400'}>"Dinner" Rule</span>
                        </div>
                        {noFoodPlaces.includes(results.place_word) && (
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            {vals.failsFood ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            <span className={vals.failsFood ? 'text-red-400' : 'text-slate-400'}>"Food" Rule</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="bg-slate-900 border border-slate-800 border-dashed rounded-2xl h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500">
              <Search className="w-12 h-12 mb-4 opacity-50" />
              <p>Configure a test and click generate to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

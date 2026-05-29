'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ChevronLeft, Check, MapPin, ExternalLink, ArrowRight,
  RefreshCw, Utensils, X, Loader2, Sparkles, ChevronRight
} from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-config';

const STEPS = {
  WELCOME: 1, // "Share Your Review"
  ENJOY: 2,   // Selections
  RATE: 3,    // Rating
  READY: 4,   // AI Reviews
  COPIED: 5,  // Done
};

function getLightenedBrandColor(hex: string, percent: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  const targetL = Math.min(100, Math.round(l * 100) + percent);
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${targetL}%)`;
}

export default function ReviewFlow({ initialData, isPreview = false }: { initialData?: any, isPreview?: boolean }) {
  const [step, setStep] = useState(STEPS.WELCOME);
  const data = initialData || {};
  
  const areaPart = data.area || data.area_locality || "";
  const cityPart = data.city || "Lucknow";
  const defaultAddress = [areaPart, cityPart].filter(Boolean).join(", ");
  
  const business = {
    name: data.name || data.businessName || "Our Business",
    tagline: data.tagline || "Quality & Excellence",
    logo: data.logoUrl || data.logo || null,
    address: data.address && data.address.length > 5 ? data.address : defaultAddress,
    primaryColor: data.primaryColor || data.brandColor || "#1D9E75",
    googleReviewUrl: data.googleReviewUrl || "#",
    plan: (data.plan === 'free' || data.theme === 'free') ? 'free' : (data.plan === 'basic' || data.theme === 'classic') ? 'basic' : 'premium',
    city: data.city || "Lucknow",
    area: data.area || data.area_locality || "",
    negativeFilterEnabled: data.negativeFilterEnabled ?? true
  };

  const menuItems = useMemo(() => data.menuItems || [
    { id: 1, name: "Signature Pizza" },
    { id: 2, name: "Pasta Carbonara" }
  ], [data.menuItems]);

  const isDark = business.plan === 'basic' || business.plan === 'premium';

  // Screen 2 States
  const [selectedDishes, setSelectedDishes] = useState<(number | string)[]>([]);
  const [mealType, setMealType] = useState("Dinner");
  const [spendRange, setSpendRange] = useState("400-500");
  const [seatingType, setSeatingType] = useState("Indoor");
  const [waitTime, setWaitTime] = useState("No wait");

  // Screen 3 States
  const [ratings, setRatings] = useState({ overall: 0, food: 0, service: 0, atmosphere: 0 });

  // Screen 4 States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReviews, setGeneratedReviews] = useState<string[]>([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.COPIED));
  const prevStep = () => setStep(s => Math.max(s - 1, STEPS.WELCOME));

  const handleGenerateReview = async () => {
    if (ratings.overall === 0) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/scan/generate-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qr_slug: data.qr_slug || window.location.pathname.split('/').pop() || '',
          business_name: business.name,
          category: data.business_category || 'Restaurant',
          tagline: business.tagline,
          overall_rating: ratings.overall,
          food_rating: ratings.food,
          service_rating: ratings.service,
          atmosphere_rating: ratings.atmosphere,
          selected_items: menuItems.filter((m: any) => selectedDishes.includes(m.id)).map((m: any) => m.name),
          meal_type: mealType,
          price_range: spendRange,
          language: data.review_language || 'english',
          variant_count: business.plan === 'free' ? 1 : (business.plan === 'basic' ? 3 : 5),
          plan: business.plan,
          seating_type: seatingType,
          wait_time: waitTime
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.variants && json.variants.length > 0) {
          setGeneratedReviews(json.variants);
        } else {
          setGeneratedReviews([`Absolutely loved visiting ${business.name}! Highly recommend!`]);
        }
      } else {
        setGeneratedReviews([`Absolutely loved visiting ${business.name}! Highly recommend!`]);
      }
    } catch (e) {
      console.error(e);
      setGeneratedReviews([`Absolutely loved visiting ${business.name}! Highly recommend!`]);
    } finally {
      setIsGenerating(false);
      setActiveReviewIndex(0);
      nextStep();
    }
  };

  const handlePostReview = async () => {
    try {
      await navigator.clipboard.writeText(generatedReviews[activeReviewIndex]);
    } catch(e) {}

    if (business.googleReviewUrl && business.googleReviewUrl !== '#') {
      window.open(business.googleReviewUrl, '_blank');
    }

    try {
      await fetch(`${API_BASE_URL}/api/scan/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qr_slug: data.qr_slug || window.location.pathname.split('/').pop() || '',
          stage: 'completed',
          device_type: 'mobile',
          overall_rating: ratings.overall,
          food_rating: ratings.food,
          service_rating: ratings.service,
          atmosphere_rating: ratings.atmosphere,
          selected_items: selectedDishes.map(String),
          meal_type: mealType,
          price_range: spendRange,
          seating_type: seatingType,
          wait_time: waitTime,
          was_negative: ratings.overall <= 3
        })
      });
    } catch (e) {}

    setStep(STEPS.COPIED);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -10 }
  };
  const transition = { duration: 0.25, ease: "easeOut" };

  const bgClass = isDark ? "bg-[#111827] text-white" : "bg-slate-50 text-slate-800";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const cardBg = isDark ? "bg-[#1f2937]" : "bg-white";

  return (
    <div className={`flex-1 flex flex-col h-full w-full relative ${bgClass}`}>
      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: WELCOME (Share Your Review) */}
        {step === STEPS.WELCOME && (
          <motion.div 
            key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className={`flex-1 flex flex-col items-center justify-center p-6 text-center h-full relative ${isDark ? 'bg-slate-900/50' : 'bg-slate-100/50'}`}
          >
            <div className={`w-full max-w-[340px] ${cardBg} p-8 rounded-[2rem] shadow-2xl relative flex flex-col items-center border ${borderClass}`}>
              <button className="absolute top-4 right-4 p-2 rounded-full opacity-50 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${business.primaryColor}15`, color: business.primaryColor }}>
                <Sparkles className="w-6 h-6" />
              </div>

              <h1 className="text-2xl font-bold mb-3 text-center text-balance leading-tight">Share your experience</h1>
              
              <p className={`text-sm font-medium mb-1 ${textMuted}`}>
                Loved your time at {business.name}?
              </p>
              
              <p className="text-sm font-bold italic mb-5" style={{ color: business.primaryColor }}>
                "{business.tagline}"
              </p>

              <p className={`text-xs leading-relaxed mb-8 max-w-[220px] ${textMuted}`}>
                Let's craft a beautiful review together in 2 simple steps.
              </p>

              <button 
                onClick={nextStep}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{ backgroundColor: business.primaryColor }}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: ENJOY */}
        {step === STEPS.ENJOY && (
          <motion.div 
            key="enjoy" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className="flex-1 flex flex-col h-full overflow-hidden relative"
          >
            <div className="p-6 pb-2 shrink-0 bg-inherit z-10">
              <button onClick={prevStep} className="p-2 -ml-2 mb-4"><ChevronLeft className="w-6 h-6" /></button>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full uppercase tracking-wider ${isDark ? 'bg-white/10' : 'bg-slate-200'} ${textMuted}`}>Step 1 of 3</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">What did you enjoy?</h2>
              <div className={`flex items-center gap-1.5 text-[10px] font-medium tracking-wide ${textMuted}`}>
                <MapPin className="w-3 h-3" /> {business.address}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
              <div className="mt-6 mb-8 w-full overflow-hidden">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-3 ${textMuted}`}>Select dishes you tried</p>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar pr-6" style={{ width: 'calc(100% + 1.5rem)' }}>
                  {menuItems.map((item: any) => {
                    const isSelected = selectedDishes.includes(item.id);
                    return (
                      <button 
                        key={item.id}
                        onClick={() => setSelectedDishes(prev => isSelected ? prev.filter(id => id !== item.id) : [...prev, item.id])}
                        className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all`}
                        style={isSelected ? { backgroundColor: getLightenedBrandColor(business.primaryColor, isDark ? -10 : 45), borderColor: business.primaryColor, color: isDark ? '#fff' : business.primaryColor } : { borderColor: isDark ? '#334155' : '#e2e8f0', color: isDark ? '#cbd5e1' : '#64748b' }}
                      >
                        <Utensils className="w-3 h-3 opacity-70" /> {item.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mb-8 w-full overflow-hidden">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-3 ${textMuted}`}>What did you get?</p>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar pr-6" style={{ width: 'calc(100% + 1.5rem)' }}>
                  {["Breakfast", "Brunch", "Lunch", "Dinner"].map(type => (
                    <button 
                      key={type} onClick={() => setMealType(type)}
                      className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all`}
                      style={mealType === type ? { backgroundColor: business.primaryColor, borderColor: business.primaryColor, color: '#fff' } : { borderColor: isDark ? '#334155' : '#e2e8f0', color: isDark ? '#cbd5e1' : '#64748b' }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 w-full overflow-hidden">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-3 ${textMuted}`}>How much per person?</p>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar pr-6" style={{ width: 'calc(100% + 1.5rem)' }}>
                  {["200-400", "400-500", "600-1000", "1000+"].map(type => (
                    <button 
                      key={type} onClick={() => setSpendRange(type)}
                      className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all`}
                      style={spendRange === type ? { backgroundColor: business.primaryColor, borderColor: business.primaryColor, color: '#fff' } : { borderColor: isDark ? '#334155' : '#e2e8f0', color: isDark ? '#cbd5e1' : '#64748b' }}
                    >
                      ₹{type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 w-full overflow-hidden">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-3 ${textMuted}`}>Seating type</p>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar pr-6" style={{ width: 'calc(100% + 1.5rem)' }}>
                  {["Indoor", "Outdoor", "Bar Area", "Booth"].map(type => (
                    <button 
                      key={type} onClick={() => setSeatingType(type)}
                      className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all`}
                      style={seatingType === type ? { backgroundColor: business.primaryColor, borderColor: business.primaryColor, color: '#fff' } : { borderColor: isDark ? '#334155' : '#e2e8f0', color: isDark ? '#cbd5e1' : '#64748b' }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 w-full overflow-hidden">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-3 ${textMuted}`}>Waiting time</p>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar pr-6" style={{ width: 'calc(100% + 1.5rem)' }}>
                  {["No wait", "upto 10 min", "10-30 min", "30-60 min"].map(type => (
                    <button 
                      key={type} onClick={() => setWaitTime(type)}
                      className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all`}
                      style={waitTime === type ? { backgroundColor: business.primaryColor, borderColor: business.primaryColor, color: '#fff' } : { borderColor: isDark ? '#334155' : '#e2e8f0', color: isDark ? '#cbd5e1' : '#64748b' }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-6 pt-4 shrink-0 border-t z-20 ${borderClass} ${isDark ? 'bg-[#111827]' : 'bg-slate-50'}`}>
              <button 
                onClick={nextStep}
                className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{ backgroundColor: business.primaryColor }}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: RATE */}
        {step === STEPS.RATE && (
          <motion.div 
            key="rate" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className="flex-1 flex flex-col p-6 h-full"
          >
            <button onClick={prevStep} className="self-start p-2 -ml-2 mb-4"><ChevronLeft className="w-6 h-6" /></button>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full uppercase tracking-wider ${isDark ? 'bg-white/10' : 'bg-slate-100'} ${textMuted}`}>Step 2 of 3</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">Rate your time</h2>
            <p className={`text-[10px] font-medium tracking-wide mb-8 ${textMuted}`}>How many stars for {business.name}?</p>

            <div className={`w-full ${cardBg} rounded-2xl p-6 flex flex-col items-center justify-center mb-6 border ${borderClass}`}>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star}
                    onClick={() => setRatings(r => ({ ...r, overall: star, food: r.food || star, service: r.service || star, atmosphere: r.atmosphere || star }))}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star className={`w-8 h-8 ${star <= ratings.overall ? 'fill-amber-400 text-amber-400' : isDark ? 'text-slate-600' : 'text-slate-200'}`} />
                  </button>
                ))}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500 h-4">
                {ratings.overall > 0 ? ["Terrible", "Bad", "Okay", "Good", "Excellent!"][ratings.overall - 1] : ""}
              </span>
            </div>

            <div className="space-y-4 mb-auto">
              {[
                { key: 'food', label: 'Food', icon: Utensils },
                { key: 'service', label: 'Service', icon: Sparkles },
                { key: 'atmosphere', label: 'Atmosphere', icon: Check }
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className={`flex items-center justify-between p-4 rounded-xl border ${borderClass} ${cardBg}`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${textMuted}`} />
                    <span className="text-xs font-bold">{label}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star}
                        onClick={() => setRatings(r => ({ ...r, [key]: star }))}
                        className="p-1"
                      >
                        <Star className={`w-4 h-4 ${star <= (ratings as any)[key] ? 'fill-amber-400 text-amber-400' : isDark ? 'text-slate-600' : 'text-slate-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleGenerateReview}
              disabled={ratings.overall === 0 || isGenerating}
              className="w-full py-4 mt-6 rounded-xl font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              style={{ backgroundColor: business.primaryColor }}
            >
              {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating AI Review...</> : <><Sparkles className="w-4 h-4" /> Generate my review</>}
            </button>
          </motion.div>
        )}

        {/* SCREEN 4: READY */}
        {step === STEPS.READY && (
          <motion.div 
            key="ready" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            <div className="p-6 pb-2 shrink-0">
              <button onClick={prevStep} className="p-2 -ml-2 mb-4"><ChevronLeft className="w-6 h-6" /></button>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full uppercase tracking-wider ${isDark ? 'bg-white/10' : 'bg-slate-100'} ${textMuted}`}>Step 3 of 3</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Your review is ready</h2>
              <p className={`text-[10px] font-medium tracking-wide ${textMuted}`}>Pick one, copy it, paste on Google</p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
              <div className={`w-full rounded-2xl p-4 mb-6 border border-emerald-500/30 bg-emerald-500/10`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">!</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Enter these exact ratings on Google</span>
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    { label: 'Overall', val: ratings.overall },
                    { label: 'Food', val: ratings.food },
                    { label: 'Service', val: ratings.service },
                    { label: 'Atmosphere', val: ratings.atmosphere },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between">
                      <span className={`text-[8px] font-bold uppercase ${textMuted}`}>{r.label}</span>
                      <div className="flex gap-[1px]">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`w-2 h-2 ${s <= r.val ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Variants List */}
              <div className="space-y-4 mb-6">
                {generatedReviews.map((review, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`w-full ${cardBg} border ${activeReviewIndex === idx ? 'border-amber-500 shadow-md' : borderClass} rounded-2xl p-5 relative cursor-pointer transition-all`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${activeReviewIndex === idx ? 'text-amber-500' : 'text-slate-400'}`}>Variant {idx + 1}</span>
                      {activeReviewIndex === idx && <Check className="w-3 h-3 text-amber-500" />}
                    </div>
                    <textarea 
                      className={`w-full bg-transparent text-sm leading-relaxed resize-none focus:outline-none ${isDark ? 'text-white' : 'text-slate-800'}`}
                      value={activeReviewIndex === idx ? generatedReviews[activeReviewIndex] : review}
                      onChange={(e) => {
                        const newReviews = [...generatedReviews];
                        newReviews[idx] = e.target.value;
                        setGeneratedReviews(newReviews);
                      }}
                      style={{ height: `${Math.max(4, review.split('\\n').length + 3)}rem` }}
                      onClick={(e) => { if (activeReviewIndex !== idx) { e.preventDefault(); e.stopPropagation(); setActiveReviewIndex(idx); }}}
                    />
                    {activeReviewIndex === idx && (
                      <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                        Editable
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Upgrade Nudges removed from here. They belong on the dashboard outside the simulation. */}
            </div>

            <div className={`p-6 pt-4 shrink-0 border-t ${borderClass} ${isDark ? 'bg-[#111827]' : 'bg-white'}`}>
              <button 
                onClick={handlePostReview}
                className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-3"
                style={{ backgroundColor: business.primaryColor }}
              >
                📋 Copy & Post Review <ExternalLink className="w-4 h-4" />
              </button>
              <p className={`text-[8px] text-center max-w-[280px] mx-auto opacity-60 leading-relaxed ${textMuted}`}>
                GlowQR helps you write your own review. The final text is yours to edit before posting. We never post reviews on your behalf.
              </p>
            </div>
          </motion.div>
        )}

        {/* SCREEN 5: COPIED */}
        {step === STEPS.COPIED && (
          <motion.div 
            key="copied" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20">
              <Check className="w-10 h-10 text-white stroke-[4]" />
            </div>
            <h2 className="text-3xl font-black mb-3">Thank you!</h2>
            <p className={`text-sm leading-relaxed max-w-[250px] mb-12 ${textMuted}`}>
              Thank you for choosing {business.name}. Google Maps should be opening now to paste your review.
            </p>
            
            <button 
              onClick={() => setStep(STEPS.WELCOME)}
              className={`w-full py-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              Done <RefreshCw className="w-4 h-4" />
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ChevronLeft, Check, MapPin, ExternalLink, ArrowRight,
  RefreshCw, Utensils, X, Loader2, Sparkles, ChevronRight, MessageSquare, Briefcase, Shield, GraduationCap
} from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-config';
import { getThemeVariables } from './themeUtils';

const STEPS = {
  WELCOME: 1, // "Share Your Review"
  ENJOY: 2,   // Selections
  RATE: 3,    // Rating
  READY: 4,   // AI Reviews
  COPIED: 5,  // Done
  INSTAGRAM: 6 // Instagram Follow
};



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
    plan: data.plan || (data.theme === 'free' ? 'free' : data.theme === 'classic' ? 'basic' : 'premium'),
    city: data.city || "Lucknow",
    area: data.area || data.area_locality || "",
    instagramUrl: data.instagram_url || data.instagramUrl || "",
    negativeFilterEnabled: data.negativeFilterEnabled ?? true
  };

  const isTaxFirm = data.business_category?.toLowerCase() === 'tax / ca firm' || data.category?.toLowerCase() === 'tax / ca firm';
  const isJewellery = data.business_category?.toLowerCase() === 'jewellery' || data.category?.toLowerCase() === 'jewellery' || data.business_category?.toLowerCase() === 'bridal & festive jewellery' || data.category?.toLowerCase() === 'bridal & festive jewellery';
  const isEducation = data.business_category?.toLowerCase() === 'education' || data.category?.toLowerCase() === 'education';

  const rawCat = ((data.business_category || data.category || "")).toLowerCase().trim();
  const isFoodCategory = rawCat.includes('restaurant') || rawCat.includes('cafe') || 
    rawCat.includes('food') || rawCat.includes('bar') || rawCat.includes('bakery') || 
    rawCat.includes('qsr') || rawCat.includes('lounge');

  const parsedMenuData = useMemo(() => {
    let rawData = data.menu_data || data.menuCategories;
    if (typeof rawData === 'string') {
      try {
        rawData = JSON.parse(rawData);
      } catch (e) {
        console.error("Failed to parse menu_data", e);
      }
    }

    if (!Array.isArray(rawData) || rawData.length === 0) return null;
    
    // Check if it's an array where elements have category and items
    const hasCategories = rawData.some((c: any) => c && typeof c === 'object' && 'category' in c && Array.isArray(c.items));
    if (hasCategories && !isTaxFirm && !isJewellery && !isEducation) {
      const valid = rawData.filter((c: any) => c && c.category && Array.isArray(c.items) && c.items.length > 0);
      return valid.length > 0 ? valid : null;
    }
    return null;
  }, [data.menu_data, data.menuCategories, isTaxFirm, isJewellery, isEducation]);

  const menuItems = useMemo(() => {
    if (parsedMenuData) {
      let idx = 0;
      const flat: any[] = [];
      parsedMenuData.forEach((c: any) => {
        c.items.forEach((item: any) => {
          flat.push({
            id: typeof item === 'object' && item.id ? item.id : `cat_${idx++}`,
            name: typeof item === 'object' ? item.name : item,
            category: c.category
          });
        });
      });
      return flat;
    }

    if (isTaxFirm || isJewellery || isEducation) {
      const servicesStr = data.highlighted_dishes || data.highlightDishes || "";
      if (servicesStr) {
        return servicesStr.split('\n').filter(Boolean).map((name: string, i: number) => ({ id: `srv_${i}`, name: name.trim() }));
      }
      if (isTaxFirm) {
        return [
          { id: "tax_def_1", name: "ITR Filing" },
          { id: "tax_def_2", name: "GST Registration" },
          { id: "tax_def_3", name: "Tax Consultation" }
        ];
      }
      if (isJewellery) {
        return [
          { id: "jewel_def_1", name: "Bridal Set" },
          { id: "jewel_def_2", name: "Necklace Collection" },
          { id: "jewel_def_3", name: "Ring Collection" },
          { id: "jewel_def_4", name: "Earrings" },
          { id: "jewel_def_5", name: "Maang Tikka" },
          { id: "jewel_def_6", name: "Bangles & Kada" },
          { id: "jewel_def_7", name: "Custom Jewellery" },
          { id: "jewel_def_8", name: "Saree & Lehenga" }
        ];
      }
      if (isEducation) {
        return [
          { id: "edu_def_1", name: "JEE Preparation" },
          { id: "edu_def_2", name: "NEET Coaching" },
          { id: "edu_def_3", name: "Class 10 Board Prep" },
          { id: "edu_def_4", name: "Class 12 Board Prep" },
          { id: "edu_def_5", name: "Spoken English" },
          { id: "edu_def_6", name: "Computer Courses" }
        ];
      }
    }
    
    // Fallback: If menu_data is a flat array without category objects
    let rawData = data.menu_data || data.menuCategories;
    if (typeof rawData === 'string') {
      try {
        rawData = JSON.parse(rawData);
      } catch (e) {}
    }
    
    if (rawData && Array.isArray(rawData) && rawData.length > 0 && !rawData[0].items) {
      return rawData.map((item: any, i: number) => ({
        id: typeof item === 'object' && item.id ? item.id : i,
        name: typeof item === 'object' ? item.name : item
      }));
    }
    
    if (data.menuItems && Array.isArray(data.menuItems) && data.menuItems.length > 0 && typeof data.menuItems[0] === 'object') {
      return data.menuItems;
    }
    
    const items = data.menu_items || data.menuItems || [];
    if (items.length > 0) {
      return items.map((name: any, i: number) => ({ id: i, name: typeof name === 'object' ? name.name : name }));
    }

    return [
      { id: 1, name: "Signature Pizza" },
      { id: 2, name: "Pasta Carbonara" }
    ];
  }, [data.menu_data, data.menuCategories, data.menuItems, data.menu_items, data.highlighted_dishes, data.highlightDishes, isTaxFirm, isJewellery, isEducation, parsedMenuData]);

  const isDark = business.plan === 'basic' || business.plan === 'premium';
  const themeVars = useMemo(() => getThemeVariables(business.plan, business.primaryColor), [business.plan, business.primaryColor]);

  // Screen 2 States
  const [selectedDishes, setSelectedDishes] = useState<(number | string)[]>([]);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string | null>(() => {
    return parsedMenuData && parsedMenuData.length > 0 ? parsedMenuData[0].category : null;
  });

  useEffect(() => {
    if (parsedMenuData && parsedMenuData.length > 0 && !selectedCategoryTab) {
      setSelectedCategoryTab(parsedMenuData[0].category);
    }
  }, [parsedMenuData, selectedCategoryTab]);

  const [mealType, setMealType] = useState(data.menuCategories && data.menuCategories.length > 0 ? data.menuCategories[0].category : "Dinner");
  const [spendRange, setSpendRange] = useState(data.spendRange || data.price_range || "₹200–₹500");
  const [seatingType, setSeatingType] = useState("Indoor");
  const [waitTime, setWaitTime] = useState("No wait");

  // Screen 3 States
  const [ratings, setRatings] = useState({ overall: 0, food: 0, service: 0, atmosphere: 0 });

  // Screen 4 States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedReviews, setGeneratedReviews] = useState<string[]>([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [showEmpathy, setShowEmpathy] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.COPIED));
  const prevStep = () => setStep(s => Math.max(s - 1, STEPS.WELCOME));

  const handleGenerateReview = async () => {
    if (ratings.overall === 0) return;

    const isPremium = ['premium', 'trial'].includes(business.plan?.toLowerCase() || '');

    if (ratings.overall <= 2) {
      setShowEmpathy(true);
      setTimeout(() => {
        setShowEmpathy(false);
        generateReviewRequest();
      }, 2200);
    } else {
      generateReviewRequest();
    }
  };

  const generateReviewRequest = async () => {
    setIsGenerating(true);
    
    // Map category ID to human readable string for LLM
    const categoryMap: Record<string, string> = {
      'restaurant': 'Restaurant',
      'cafe': 'Cafe / Coffee Shop',
      'fastfood': 'Fast Food / QSR',
      'bar': 'Bar / Lounge',
      'bakery': 'Bakery / Dessert Shop',
      'foodcourt': 'Food Court',
      'finedining': 'Fine Dining',
      'foodtruck': 'Food Truck',
      'cloudkitchen': 'Cloud Kitchen',
      'jewellery': 'Bridal & Festive Jewellery',
      'hotel': 'Hotel',
      'spa': 'Spa',
      'salon': 'Salon',
      'retail': 'Retail',
      'gym': 'Gym',
      'medical': 'Medical',
      'education': 'Education',
      'other': 'Business'
    };
    
    const rawCategory = data.business_category || '';
    if (!rawCategory) {
      console.error('[CRITICAL] business_category is missing from data — review will use raw category as-is. Check onboarding/API response.');
    }
    const displayCategory = categoryMap[rawCategory.toLowerCase()] || rawCategory;
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/scan/generate-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qr_slug: data.qr_slug || window.location.pathname.split('/').pop() || '',
          business_name: business.name,
          category: displayCategory,
          tagline: business.tagline,
          overall_rating: ratings.overall,
          food_rating: ratings.food,
          service_rating: ratings.service,
          atmosphere_rating: ratings.atmosphere,
          selected_items: menuItems.filter((m: any) => selectedDishes.includes(m.id)).map((m: any) => m.name),
          meal_type: mealType,
          price_range: spendRange,
          language: data.review_language || 'english',
          variant_count: data.ai_variant_count || (business.plan === 'free' ? 1 : (business.plan === 'basic' ? 3 : 5)),
          plan: business.plan,
          seating_type: seatingType,
          wait_time: waitTime,
          city: cityPart
        })
      });

      if (res.ok) {
        const json = await res.json();
        const generated = (json.variants && json.variants.length > 0) 
          ? json.variants 
          : [`Absolutely loved visiting ${business.name}! Highly recommend!`];
        setGeneratedReviews(generated);
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
      
      // Ensure alert is sent even if generation failed
      const isPremium = ['premium', 'trial'].includes(business.plan?.toLowerCase() || '');
      if (ratings.overall <= 2) {
        fetch(`${API_BASE_URL}/api/scan/alert-owner`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            qr_slug: data.qr_slug || window.location.pathname.split('/').pop() || '',
            session_id: sessionStorage.getItem('glowqr_scan_session') || undefined,
            overall_rating: ratings.overall,
            food_rating: ratings.food,
            service_rating: ratings.service,
            atmosphere_rating: ratings.atmosphere,
            selected_items: menuItems.filter((m: any) => selectedDishes.includes(m.id)).map((m: any) => m.name),
            meal_type: mealType,
            price_range: spendRange,
            wait_time: waitTime,
            review_text: generatedReviews.length > 0 ? generatedReviews[0] : `Customer gave a ${ratings.overall}-star rating without an AI review.`,
            action_tip: "Customer rated 1-2 stars. Follow up on this feedback and improve service standards."
          })
        }).catch(() => {});
      }
    }
  };

  const handlePostReview = async () => {
    navigator.clipboard.writeText(generatedReviews[activeReviewIndex]);
    setIsCopied(true);

    setTimeout(() => {
      if (business.googleReviewUrl && business.googleReviewUrl !== '#') {
        window.open(business.googleReviewUrl, '_blank');
      }
      if (['premium', 'trial'].includes(business.plan) && business.instagramUrl) {
        setStep(STEPS.INSTAGRAM);
      } else {
        setStep(STEPS.COPIED);
      }
    }, 2000);

    try {
      await fetch(`${API_BASE_URL}/api/scan/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qr_slug: data.qr_slug || window.location.pathname.split('/').pop() || '',
          session_id: sessionStorage.getItem('glowqr_scan_session') || undefined,
          stage: 'completed',
          redirected_to_google: !!(business.googleReviewUrl && business.googleReviewUrl !== '#'),
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
          review_variant: activeReviewIndex,
          review_text: generatedReviews[activeReviewIndex],
          was_negative: ratings.overall <= 2,
          language: data.review_language || 'english'
        })
      });
    } catch (e) {}
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -10 }
  };
  const transition = { duration: 0.25, ease: "easeOut" };

  const bgClass = "bg-[var(--bg-primary)] text-[var(--text-primary)]";
  const textMuted = "text-[var(--text-secondary)]";
  const borderClass = "border-[rgba(255,255,255,0.10)]";
  const cardBg = "bg-[rgba(255,255,255,0.06)] backdrop-blur-[12px] rounded-2xl";

  return (
    <div className={`flex-1 flex flex-col h-full w-full relative ${bgClass}`} style={themeVars}>
      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: WELCOME (Share Your Review) */}
        {step === STEPS.WELCOME && (
          <motion.div 
            key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className={`flex-1 flex flex-col items-center justify-center p-6 text-center h-full relative`}
          >
            <div className={`w-full max-w-[340px] bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] p-8 rounded-2xl shadow-2xl relative flex flex-col items-center backdrop-blur-[12px]`}>
              <button className="absolute top-4 right-4 p-2 rounded-full opacity-50 hover:opacity-100 text-[#FFFFFF]">
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(var(--accent-rgb),0.30)]" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--accent)' }}>
                <Sparkles className="w-6 h-6" />
              </div>

              <h1 className="text-2xl font-bold mb-3 text-center text-balance leading-tight text-[#FFFFFF]">Share your experience</h1>
              
              <p className={`text-sm font-medium mb-1 text-[rgba(255,255,255,0.60)]`}>
                Loved your time at {business.name}?
              </p>
              
              <p className="text-sm font-semibold italic mb-5" style={{ color: 'var(--accent)' }}>
                "{business.tagline}"
              </p>

              <p className={`text-xs leading-relaxed mb-8 max-w-[220px] text-[rgba(255,255,255,0.50)]`}>
                Let's craft a beautiful review together in 2 simple steps.
              </p>

              <button 
                onClick={nextStep}
                className="w-full py-3.5 rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)', boxShadow: '0 4px 20px rgba(var(--accent-rgb), 0.35)' }}
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
              <button onClick={prevStep} className="p-2 -ml-2 mb-4 text-[#FFFFFF]"><ChevronLeft className="w-6 h-6" /></button>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 text-[9px] font-medium rounded-full uppercase tracking-wider bg-[rgba(255,255,255,0.12)] text-[#FFFFFF] border border-[rgba(255,255,255,0.20)]`}>Step 1 of 3</span>
              </div>
              <h2 className="text-2xl font-bold mb-1 text-[#FFFFFF]">What did you enjoy?</h2>
              <div className={`flex items-center gap-1.5 text-[10px] font-medium tracking-wide ${textMuted}`}>
                <MapPin className="w-3 h-3" /> {business.address}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
              <div className="mt-6 mb-8 w-full overflow-hidden">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-3 ${textMuted}`}>
                  {isTaxFirm ? "Which services did you use?" : isJewellery ? "What did you look at?" : isEducation ? "Which courses did you take?" : "Select dishes you tried"}
                </p>
                {parsedMenuData && parsedMenuData.length > 0 && (
                  <div className="flex overflow-x-auto gap-2 mb-4 custom-scrollbar pr-6" style={{ width: '100%' }}>
                    {parsedMenuData.map((cat: any) => (
                      <button
                        key={cat.category}
                        onClick={() => setSelectedCategoryTab(cat.category)}
                        className={`shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all border`}
                        style={selectedCategoryTab === cat.category 
                          ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--accent-text)' } 
                          : { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 pb-2">
                  {menuItems.filter((item: any) => parsedMenuData && parsedMenuData.length > 0 ? item.category === selectedCategoryTab : true).map((item: any) => {
                    const isSelected = selectedDishes.includes(item.id);
                    return (
                      <button 
                        key={item.id}
                        onClick={() => setSelectedDishes(prev => isSelected ? prev.filter(id => id !== item.id) : [...prev, item.id])}
                        className={`shrink-0 px-3 py-2 rounded-lg text-xs border flex items-center gap-2 transition-all hover:bg-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.30)]`}
                        style={isSelected ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--accent-text)', fontWeight: 600 } : { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
                      >
                        {isTaxFirm ? <Briefcase className="w-3 h-3 opacity-70" /> : isJewellery ? <Sparkles className="w-3 h-3 opacity-70" /> : isEducation ? <GraduationCap className="w-3 h-3 opacity-70" /> : <Utensils className="w-3 h-3 opacity-70" />} {item.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {(!isTaxFirm && !isJewellery && !isEducation) && (
                <>
              <div className="mb-8 w-full overflow-hidden">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-3 ${textMuted}`}>What did you get?</p>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar pr-6" style={{ width: 'calc(100% + 1.5rem)' }}>
                  {(data.menuCategories && data.menuCategories.length > 0 
                    ? data.menuCategories.map((c: any) => c.category) 
                    : ["Breakfast", "Brunch", "Lunch", "Dinner"]).map((type: string) => (
                    <button 
                      key={type} onClick={() => setMealType(type)}
                      className={`shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider border transition-all hover:bg-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.30)]`}
                      style={mealType === type ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--accent-text)', fontWeight: 600 } : { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 w-full overflow-hidden">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-3 ${textMuted}`}>How much per person?</p>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar pr-6" style={{ width: 'calc(100% + 1.5rem)' }}>
                  {["Under ₹200", "₹200–₹500", "₹500–₹1000", "₹1000–₹2000", "Above ₹2000"].map(type => (
                    <button 
                      key={type} onClick={() => setSpendRange(type)}
                      className={`shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider border transition-all hover:bg-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.30)]`}
                      style={spendRange === type ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--accent-text)', fontWeight: 600 } : { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
                    >
                      {type}
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
                      className={`shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider border transition-all hover:bg-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.30)]`}
                      style={seatingType === type ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--accent-text)', fontWeight: 600 } : { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
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
                      className={`shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider border transition-all hover:bg-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.30)]`}
                      style={waitTime === type ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--accent-text)', fontWeight: 600 } : { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
                </>
              )}
            </div>

            <div className={`p-6 pt-4 shrink-0 border-t z-20 ${borderClass} bg-[rgba(255,255,255,0.06)] backdrop-blur-[12px]`}>
              <button 
                onClick={nextStep}
                className="w-full py-4 rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
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
            <button onClick={prevStep} className="self-start p-2 -ml-2 mb-4 text-[#FFFFFF]"><ChevronLeft className="w-6 h-6" /></button>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 text-[9px] font-medium rounded-full uppercase tracking-wider bg-[rgba(255,255,255,0.12)] text-[#FFFFFF] border border-[rgba(255,255,255,0.20)]`}>Step 2 of 3</span>
            </div>
            <h2 className="text-2xl font-bold mb-1 text-[#FFFFFF]">Rate your time</h2>
            <p className={`text-[10px] font-medium tracking-wide mb-8 ${textMuted}`}>How many stars for {business.name}?</p>

            <div className={`w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] backdrop-blur-[12px] rounded-2xl p-6 flex flex-col items-center justify-center mb-6`}>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star}
                    onClick={() => setRatings(r => ({ ...r, overall: star, food: r.food || star, service: r.service || star, atmosphere: r.atmosphere || star }))}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star className={`w-8 h-8 ${star <= ratings.overall ? 'fill-[var(--accent)] text-[var(--accent)] drop-shadow-[0_0_6px_var(--accent)]' : 'text-[rgba(255,255,255,0.30)] stroke-[rgba(255,255,255,0.40)]'}`} />
                  </button>
                ))}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500 h-4">
                {ratings.overall > 0 ? ["Terrible", "Bad", "Okay", "Good", "Excellent!"][ratings.overall - 1] : ""}
              </span>
            </div>

            {showEmpathy ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 mb-12">
                {/* Stars showing their low rating */}
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={`text-4xl ${s <= ratings.overall ? 'text-[var(--accent)] drop-shadow-[0_0_6px_var(--accent)]' : 'text-[rgba(255,255,255,0.30)]'}`}>
                      ★
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-bold mb-2 text-[#FFFFFF]">We hear you.</h2>
                <p className={`text-sm leading-relaxed max-w-[250px] mb-8 ${textMuted}`}>
                  Your honest feedback helps this business improve. 
                  We'll help you share exactly what happened.
                </p>

                {/* Auto-progress bar */}
                <div className="w-full max-w-[200px] h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.2, ease: "linear" }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
                <p className={`text-[10px] uppercase tracking-widest mt-4 ${textMuted} font-bold`}>Taking you to review step...</p>
              </div>
            ) : (
              <div className="space-y-4 mb-auto">
                {[
                  { key: 'food', label: isTaxFirm ? 'Expertise' : isJewellery ? 'Product Quality' : isEducation ? 'Faculty' : 'Food', icon: isTaxFirm ? Briefcase : isJewellery ? Sparkles : isEducation ? GraduationCap : Utensils },
                  { key: 'service', label: isJewellery ? 'Staff Helpfulness' : isEducation ? 'Support & Doubts' : 'Service', icon: Sparkles },
                  { key: 'atmosphere', label: isTaxFirm ? 'Professionalism' : isJewellery ? 'Store Experience' : isEducation ? 'Learning Environment' : 'Atmosphere', icon: isTaxFirm ? Shield : isJewellery ? Check : isEducation ? Check : Check }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className={`flex items-center justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)]`}>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 text-[var(--accent)]`} />
                      <span className="text-xs font-medium text-[#FFFFFF]">{label}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button 
                          key={star}
                          onClick={() => setRatings(r => ({ ...r, [key]: star }))}
                          className="p-1"
                        >
                          <Star className={`w-4 h-4 ${star <= (ratings as any)[key] ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[rgba(255,255,255,0.25)]'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!showEmpathy && (
              <button 
                onClick={handleGenerateReview}
                disabled={ratings.overall === 0 || isGenerating}
                className="w-full py-4 mt-6 rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
              >
                {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating AI Review...</> : <><Sparkles className="w-4 h-4" /> Generate my review</>}
              </button>
            )}
          </motion.div>
        )}



        {/* SCREEN 4: READY */}
        {step === STEPS.READY && (
          <motion.div 
            key="ready" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            <div className="p-6 pb-2 shrink-0">
              <button onClick={prevStep} className="p-2 -ml-2 mb-4 text-[#FFFFFF]"><ChevronLeft className="w-6 h-6" /></button>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 text-[9px] font-medium rounded-full uppercase tracking-wider bg-[rgba(255,255,255,0.12)] text-[#FFFFFF] border border-[rgba(255,255,255,0.20)]`}>Step 3 of 3</span>
              </div>
              <h2 className="text-2xl font-bold mb-1 text-[#FFFFFF]">Your review is ready</h2>
              <p className={`text-[10px] font-medium tracking-wide ${textMuted}`}>Pick one, copy it, paste on Google</p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
              <div className={`w-full rounded-2xl p-4 mb-6 border border-emerald-500/30 bg-emerald-500/10`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">!</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Enter these exact ratings on Google</span>
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
                          <Star key={s} className={`w-2 h-2 ${s <= r.val ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[rgba(255,255,255,0.25)]'}`} />
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
                    className={`w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] backdrop-blur-[12px] rounded-2xl p-5 relative cursor-pointer transition-all ${activeReviewIndex === idx ? 'border-[var(--accent)] shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.1)]' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${activeReviewIndex === idx ? 'text-[var(--accent)]' : 'text-[rgba(255,255,255,0.40)]'}`}>Variant {idx + 1}</span>
                        <div className="flex gap-[2px]">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-2.5 h-2.5 ${s <= ratings.overall ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[rgba(255,255,255,0.25)]'}`} />
                          ))}
                        </div>
                      </div>
                      {activeReviewIndex === idx && <Check className="w-4 h-4 text-[var(--accent)]" />}
                    </div>
                    <textarea 
                      className={`w-full bg-transparent text-sm leading-relaxed resize-none focus:outline-none text-[#FFFFFF]`}
                      value={activeReviewIndex === idx ? generatedReviews[activeReviewIndex] : review}
                      onChange={(e) => {
                        const newReviews = [...generatedReviews];
                        newReviews[idx] = e.target.value;
                        setGeneratedReviews(newReviews);
                      }}
                      style={{ height: `${Math.max(4, review.split('\n').length + 3)}rem` }}
                      onClick={(e) => { if (activeReviewIndex !== idx) { e.preventDefault(); e.stopPropagation(); setActiveReviewIndex(idx); }}}
                    />
                    {activeReviewIndex === idx && (
                      <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[9px] font-bold text-[var(--accent)] uppercase tracking-widest">
                        Editable
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Upgrade Nudges removed from here. They belong on the dashboard outside the simulation. */}
            </div>

            <div className={`p-6 pt-4 shrink-0 border-t ${borderClass} bg-[rgba(255,255,255,0.06)] backdrop-blur-[12px] relative`}>
              {(ratings.overall <= 2) ? (
                <div className="space-y-3">
                  <p className={`text-xs text-center leading-relaxed ${textMuted}`}>
                    Your review helps others make informed decisions 
                    and helps this business improve.
                  </p>
                  <button 
                    onClick={handlePostReview}
                    className="w-full py-4 rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-3"
                    style={isCopied ? { backgroundColor: '#10b981', color: '#fff' } : { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                  >
                    {isCopied ? (
                      <>✓ Copied!</>
                    ) : (
                      <>📋 Copy & Post on Google <ExternalLink className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handlePostReview}
                  className="w-full py-4 rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-3"
                  style={isCopied ? { backgroundColor: '#10b981', color: '#fff' } : { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                >
                  {isCopied ? (
                    <>✓ Copied!</>
                  ) : (
                    <>📋 Copy & Post Review <ExternalLink className="w-4 h-4" /></>
                  )}
                </button>
              )}
              {isCopied && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 z-50 animate-in fade-in zoom-in duration-300 whitespace-nowrap">
                  <Check className="w-3 h-3 text-emerald-400" /> Review copied — now paste on Google Maps
                </div>
              )}
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
              <Check className="w-10 h-10 text-[#FFFFFF] stroke-[4]" />
            </div>
            <h2 className="text-3xl font-black mb-3 text-[#FFFFFF]">Thank you!</h2>
            <p className={`text-sm leading-relaxed max-w-[250px] mb-12 text-[rgba(255,255,255,0.60)]`}>
              Thank you for choosing {business.name}. Google Maps should be opening now to paste your review.
            </p>
            
            <button 
              onClick={() => setStep(STEPS.WELCOME)}
              className={`w-full py-4 rounded-xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] bg-[rgba(255,255,255,0.10)] text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.20)]`}
            >
              Done <RefreshCw className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* SCREEN 6: INSTAGRAM FOLLOW (Premium Only) */}
        {step === STEPS.INSTAGRAM && (
          <motion.div 
            key="instagram" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
              <Sparkles className="w-10 h-10 text-white stroke-[2]" />
            </div>
            
            <h2 className="text-[20px] font-bold mb-3 leading-tight text-[#FFFFFF]">Don't forget to build a relationship with us!</h2>
            
            <p className={`text-sm leading-relaxed max-w-[260px] mb-10 text-[rgba(255,255,255,0.60)]`}>
              Follow us on Instagram for exclusive offers, new arrivals & behind the scenes.
            </p>
            
            <button 
              onClick={() => {
                window.open(business.instagramUrl, '_blank');
                setStep(STEPS.COPIED);
              }}
              className="w-full py-4 rounded-xl font-semibold text-[#FFFFFF] text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90"
            >
              Follow us on Instagram <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => setStep(STEPS.COPIED)}
              className={`text-xs font-semibold underline-offset-4 hover:underline text-[rgba(255,255,255,0.60)]`}
            >
              Maybe later
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

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
  const data = initialData || {};
  
  const isTaxFirm = data.business_category?.toLowerCase() === 'tax / ca firm' || data.category?.toLowerCase() === 'tax / ca firm';
  const isJewellery = data.business_category?.toLowerCase() === 'jewellery' || data.category?.toLowerCase() === 'jewellery' || data.business_category?.toLowerCase() === 'bridal & festive jewellery' || data.category?.toLowerCase() === 'bridal & festive jewellery';
  const isEducation = data.business_category?.toLowerCase() === 'education' || data.category?.toLowerCase() === 'education';
  const isSalon = data.business_category?.toLowerCase() === 'salon' || data.category?.toLowerCase() === 'salon';
  const isGym = data.business_category?.toLowerCase() === 'gym' || data.category?.toLowerCase() === 'gym';
  const isRealEstate = data.business_category?.toLowerCase() === 'real_estate' || data.category?.toLowerCase() === 'real_estate' || data.business_category?.toLowerCase() === 'real estate' || data.category?.toLowerCase() === 'real estate';

  const isSimplifiedFlow = isTaxFirm || isJewellery || isGym || isRealEstate;

  const [step, setStep] = useState(isSimplifiedFlow ? STEPS.ENJOY : STEPS.WELCOME);
  
  const areaPart = data.area || data.area_locality || "";
  const cityPart = data.city || "Lucknow";
  const defaultAddress = [areaPart, cityPart].filter(Boolean).join(", ");
  
  const business = {
    name: data.name || data.businessName || "Our Business",
    tagline: data.tagline || "Quality & Excellence",
    logo: data.logoUrl || data.logo || null,
    address: data.address && data.address.length > 5 ? data.address : defaultAddress,
    primaryColor: data.primaryColor || data.brandColor || "#2F5FE0",
    googleReviewUrl: data.googleReviewUrl || "#",
    plan: data.plan || (data.theme === 'free' ? 'free' : data.theme === 'classic' ? 'basic' : 'premium'),
    city: data.city || "Lucknow",
    area: data.area || data.area_locality || "",
    instagramUrl: data.instagram_url || data.instagramUrl || "",
    negativeFilterEnabled: data.negativeFilterEnabled ?? true
  };

  const rawCat = ((data.business_category || data.category || "")).toLowerCase().trim();
  const isFoodCategory = rawCat.includes('restaurant') || rawCat.includes('cafe') || 
    rawCat.includes('food') || rawCat.includes('bar') || rawCat.includes('bakery') || 
    rawCat.includes('qsr') || rawCat.includes('lounge');

  const parsedMenuData = useMemo(() => {
    let rawData = data.menu_data || data.menuCategories;
    if (typeof rawData === 'string') {
      try {
        rawData = JSON.parse(rawData);
      } catch (e) {}
    }

    if (!Array.isArray(rawData) || rawData.length === 0) return null;
    
    const hasCategories = rawData.some((c: any) => c && typeof c === 'object' && 'category' in c && Array.isArray(c.items));
    if (hasCategories && !isTaxFirm && !isJewellery && !isEducation && !isSalon && !isGym && !isRealEstate) {
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
            id: typeof item === 'object' && item.id ? `cat_${idx++}_${item.id}` : `cat_${idx++}`,
            name: typeof item === 'object' ? item.name : item,
            category: c.category
          });
        });
      });
      return flat;
    }

    if (isTaxFirm || isJewellery || isEducation || isSalon || isGym || isRealEstate) {
      const servicesStr = data.highlighted_dishes || data.highlightDishes || "";
      if (servicesStr) {
        return servicesStr.split('\n').filter(Boolean).map((name: string, i: number) => ({ id: `srv_${i}`, name: name.trim() }));
      }
      if (isTaxFirm) return [{ id: "tax_def_1", name: "ITR Filing" }, { id: "tax_def_2", name: "GST Registration" }, { id: "tax_def_3", name: "Tax Consultation" }];
      if (isJewellery) return [{ id: "jewel_def_1", name: "Bridal Set" }, { id: "jewel_def_2", name: "Necklace Collection" }, { id: "jewel_def_3", name: "Ring Collection" }, { id: "jewel_def_4", name: "Earrings" }, { id: "jewel_def_5", name: "Maang Tikka" }, { id: "jewel_def_6", name: "Bangles & Kada" }, { id: "jewel_def_7", name: "Custom Jewellery" }, { id: "jewel_def_8", name: "Saree & Lehenga" }];
      if (isEducation) return [{ id: "edu_def_1", name: "JEE Preparation" }, { id: "edu_def_2", name: "NEET Coaching" }, { id: "edu_def_3", name: "Class 10 Board Prep" }, { id: "edu_def_4", name: "Class 12 Board Prep" }, { id: "edu_def_5", name: "Spoken English" }, { id: "edu_def_6", name: "Computer Courses" }];
      if (isSalon) return [{ id: "salon_def_1", name: "Haircut & Styling" }, { id: "salon_def_2", name: "Hair Color & Treatment" }, { id: "salon_def_3", name: "Facial & Cleanup" }, { id: "salon_def_4", name: "Waxing & Threading" }, { id: "salon_def_5", name: "Bridal Makeup" }, { id: "salon_def_6", name: "Manicure & Pedicure" }];
      if (isGym) return [{ id: "gym_def_1", name: "Personal Training" }, { id: "gym_def_2", name: "Group Classes (Zumba/Yoga/Aerobics)" }, { id: "gym_def_3", name: "Gym Membership" }, { id: "gym_def_4", name: "Diet & Nutrition Consultation" }, { id: "gym_def_5", name: "CrossFit / Functional Training" }, { id: "gym_def_6", name: "Physiotherapy & Recovery" }];
      if (isRealEstate) return [{ id: "real_def_1", name: "Residential Sales" }, { id: "real_def_2", name: "Commercial Leasing" }, { id: "real_def_3", name: "Property Management" }, { id: "real_def_4", name: "Rental Properties" }, { id: "real_def_5", name: "Plots & Land" }, { id: "real_def_6", name: "Legal & Documentation" }];
    }
    
    let rawData = data.menu_data || data.menuCategories;
    if (typeof rawData === 'string') {
      try { rawData = JSON.parse(rawData); } catch (e) {}
    }
    
    if (rawData && Array.isArray(rawData) && rawData.length > 0 && !rawData[0].items) {
      return rawData.map((item: any, i: number) => ({ id: typeof item === 'object' && item.id ? item.id : i, name: typeof item === 'object' ? item.name : item }));
    }
    
    if (data.menuItems && Array.isArray(data.menuItems) && data.menuItems.length > 0 && typeof data.menuItems[0] === 'object') {
      return data.menuItems;
    }
    
    const items = data.menu_items || data.menuItems || [];
    if (items.length > 0) {
      return items.map((name: any, i: number) => ({ id: i, name: typeof name === 'object' ? name.name : name }));
    }

    return [{ id: 1, name: "Signature Pizza" }, { id: 2, name: "Pasta Carbonara" }];
  }, [data.menu_data, data.menuCategories, data.menuItems, data.menu_items, data.highlighted_dishes, data.highlightDishes, isTaxFirm, isJewellery, isEducation, parsedMenuData]);

  const themeVars = useMemo(() => getThemeVariables(business.plan, business.primaryColor), [business.plan, business.primaryColor]);

  const [selectedDishes, setSelectedDishes] = useState<(number | string)[]>([]);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string | null>(() => {
    return parsedMenuData && parsedMenuData.length > 0 ? parsedMenuData[0].category : null;
  });

  useEffect(() => {
    if (parsedMenuData && parsedMenuData.length > 0 && !selectedCategoryTab) {
      setSelectedCategoryTab(parsedMenuData[0].category);
    }
  }, [parsedMenuData, selectedCategoryTab]);

  useEffect(() => {
    const handleReturn = () => {
      if (sessionStorage.getItem('glowqr_flow_finished') === 'true') {
        sessionStorage.removeItem('glowqr_flow_finished');
        setStep(STEPS.COPIED);
      }
    };
    
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') handleReturn();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pageshow', handleReturn);
    handleReturn(); // check on mount
    
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pageshow', handleReturn);
    };
  }, []);

  const [mealType, setMealType] = useState(data.menuCategories && data.menuCategories.length > 0 ? data.menuCategories[0].category : "Dinner");
  const [spendRange, setSpendRange] = useState(data.spendRange || data.value_perception || "Worth it");
  const [seatingType, setSeatingType] = useState("Indoor");
  const [waitTime, setWaitTime] = useState("No wait");

  const [ratings, setRatings] = useState({ overall: 0, food: 0, service: 0, atmosphere: 0 });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedReviews, setGeneratedReviews] = useState<string[]>([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [showEmpathy, setShowEmpathy] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.COPIED));
  const prevStep = () => setStep(s => Math.max(s - 1, STEPS.WELCOME));

  const handleGenerateReview = async () => {
    if (ratings.overall === 0) return;

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
    
    const categoryMap: Record<string, string> = {
      'restaurant': 'Restaurant', 'cafe': 'Cafe / Coffee Shop', 'fastfood': 'Fast Food / QSR',
      'bar': 'Bar / Lounge', 'bakery': 'Bakery / Dessert Shop', 'foodcourt': 'Food Court',
      'finedining': 'Fine Dining', 'foodtruck': 'Food Truck', 'cloudkitchen': 'Cloud Kitchen',
      'jewellery': 'Bridal & Festive Jewellery', 'hotel': 'Hotel', 'spa': 'Spa', 'salon': 'Salon',
      'retail': 'Retail', 'gym': 'Gym', 'medical': 'Medical', 'education': 'Education', 'other': 'Business'
    };
    
    const rawCategory = data.business_category || '';
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
        setGeneratedReviews((json.variants && json.variants.length > 0) ? json.variants : [`Absolutely loved visiting ${business.name}! Highly recommend!`]);
      } else {
        setGeneratedReviews([`Absolutely loved visiting ${business.name}! Highly recommend!`]);
      }
    } catch (e) {
      setGeneratedReviews([`Absolutely loved visiting ${business.name}! Highly recommend!`]);
    } finally {
      setIsGenerating(false);
      setActiveReviewIndex(0);
      if (isSimplifiedFlow) {
        setStep(STEPS.READY);
      } else {
        nextStep();
      }
      
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

  const handlePostReview = () => {
    const reviewText = generatedReviews[activeReviewIndex] || '';

    try {
      if (reviewText) navigator.clipboard.writeText(reviewText).catch(() => {});
    } catch (e) {}
    
    setIsCopied(true);

    const isPremium = ['premium', 'trial'].includes(business.plan?.toLowerCase() || '');
    const hasInstagram = !!business.instagramUrl;

    sessionStorage.setItem('glowqr_flow_finished', 'true');
    setStep(STEPS.COPIED);

    if (business.googleReviewUrl && business.googleReviewUrl !== '#') {
      window.location.href = business.googleReviewUrl;
    }

    try {
      fetch(`${API_BASE_URL}/api/scan/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
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
          review_text: reviewText,
          was_negative: ratings.overall <= 2,
          language: data.review_language || 'english'
        })
      }).catch(() => {});
    } catch (e) {}
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -10 }
  };
  const transition = { duration: 0.25, ease: "easeOut" };

  return (
    <div className={`flex-1 flex flex-col h-full w-full relative bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans`} style={themeVars}>
      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: WELCOME */}
        {step === STEPS.WELCOME && (
          <motion.div 
            key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className={`flex-1 flex flex-col items-center justify-center p-6 text-center h-full relative`}
          >
            <div className={`w-full max-w-[340px] bg-[var(--bg-card)] border border-[var(--border-default)] p-8 rounded-[20px] flex flex-col items-center`}>
              <button className="absolute top-4 right-4 p-2 rounded-full opacity-50 hover:opacity-100 text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                <Sparkles className="w-6 h-6" />
              </div>

              <h1 className="text-2xl font-[600] mb-3 text-center leading-tight text-[var(--text-primary)]">Share your experience</h1>
              
              <p className={`text-[15px] font-medium mb-1 text-[var(--text-secondary)]`}>
                Loved your time at {business.name}?
              </p>
              
              <p className="text-sm font-[500] italic mb-5" style={{ color: 'var(--accent)' }}>
                "{business.tagline}"
              </p>

              <p className={`text-[13px] leading-relaxed mb-8 max-w-[220px] text-[var(--text-muted)]`}>
                Let's craft a beautiful review together in 2 simple steps.
              </p>

              <button 
                onClick={nextStep}
                className="w-full py-3.5 rounded-full font-[600] text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
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
            <div className="p-6 pb-2 shrink-0 z-10 bg-[var(--bg-primary)]">
              <button onClick={prevStep} className="p-2 -ml-2 mb-4 text-[var(--text-primary)]"><ChevronLeft className="w-6 h-6" /></button>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 text-[11px] font-[500] rounded-full tracking-[0.3px] bg-[#F3F4F7] text-[#62687A]`}>
                  {isSimplifiedFlow ? "Step 1 of 2" : "Step 1 of 3"}
                </span>
              </div>
              <h2 className="text-2xl font-[600] mb-1 text-[var(--text-primary)]">What did you enjoy?</h2>
              <div className={`flex items-center gap-1.5 text-[13px] font-medium tracking-wide text-[var(--text-secondary)]`}>
                <MapPin className="w-3 h-3" /> {business.address}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar bg-[var(--bg-primary)]">
              <div className="mt-6 mb-8 w-full overflow-hidden">
                <p className={`text-[13px] font-[500] tracking-[0.3px] mb-3 text-[var(--text-secondary)]`}>
                  {isTaxFirm ? "Which services did you use?" : isJewellery ? "What did you look at?" : isEducation ? "Which courses did you take?" : (isSalon || isGym || isRealEstate) ? "Which services did you use?" : "Select dishes you tried"} <span className="opacity-70 text-[var(--text-muted)]">(Max 5)</span>
                </p>
                {parsedMenuData && parsedMenuData.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {parsedMenuData.map((cat: any) => (
                      <button
                        key={cat.category}
                        onClick={() => setSelectedCategoryTab(cat.category)}
                        className={`shrink-0 px-4 py-2 rounded-full text-[13px] tracking-[0.3px] font-[500] transition-all`}
                        style={selectedCategoryTab === cat.category 
                          ? { backgroundColor: 'var(--accent)', color: 'white' } 
                          : { backgroundColor: '#F3F4F7', color: '#62687A' }}
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
                        onClick={() => setSelectedDishes(prev => {
                          if (isSelected) return prev.filter(id => id !== item.id);
                          if (prev.length >= 5) return prev;
                          return [...prev, item.id];
                        })}
                        className={`shrink-0 px-3 py-2 rounded-full text-[13px] font-[500] flex items-center gap-2 transition-all`}
                        style={isSelected ? { backgroundColor: 'var(--accent)', color: 'white' } : { backgroundColor: '#F3F4F7', color: '#62687A' }}
                      >
                        {isTaxFirm ? <Briefcase className="w-3 h-3 opacity-70" /> : isJewellery ? <Sparkles className="w-3 h-3 opacity-70" /> : isEducation ? <GraduationCap className="w-3 h-3 opacity-70" /> : isSalon ? <Sparkles className="w-3 h-3 opacity-70" /> : isGym ? <Check className="w-3 h-3 opacity-70" /> : isRealEstate ? <MapPin className="w-3 h-3 opacity-70" /> : <Utensils className="w-3 h-3 opacity-70" />} {item.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {(!isTaxFirm && !isJewellery && !isEducation && !isSalon && !isGym && !isRealEstate) && (
                <>
              <div className="mb-8 w-full overflow-hidden">
                <p className={`text-[13px] font-[500] tracking-[0.3px] mb-3 text-[var(--text-secondary)]`}>How was the value for money?</p>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar pr-6" style={{ width: 'calc(100% + 1.5rem)' }}>
                  {["Great value", "Worth it", "A bit pricey"].map(type => (
                    <button 
                      key={type} onClick={() => setSpendRange(type)}
                      className={`shrink-0 px-4 py-2 rounded-full text-[13px] tracking-[0.3px] transition-all font-[500]`}
                      style={spendRange === type ? { backgroundColor: 'var(--accent)', color: 'white' } : { backgroundColor: '#F3F4F7', color: '#62687A' }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
                </>
              )}

              {isSimplifiedFlow && (
                <div className={`w-full bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[20px] p-6 flex flex-col items-center justify-center mb-6 mt-4`}>
                  <p className={`text-[13px] font-[500] tracking-[0.3px] mb-4 text-[var(--text-secondary)]`}>How was your overall experience?</p>
                  <div className="flex gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star}
                        onClick={() => setRatings(r => ({ ...r, overall: star, food: r.food || star, service: r.service || star, atmosphere: r.atmosphere || star }))}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star className={`w-8 h-8 ${star <= ratings.overall ? 'fill-[var(--star-filled)] text-[var(--star-filled)]' : 'text-[var(--star-empty)] stroke-[var(--border-default)]'}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-[500] tracking-[0.3px] text-[var(--star-filled)] h-4 mt-2">
                    {ratings.overall > 0 ? ["Terrible", "Bad", "Okay", "Good", "Excellent!"][ratings.overall - 1] : ""}
                  </span>
                </div>
              )}
            </div>

            <div className={`p-6 pt-4 shrink-0 border-t border-[var(--border-default)] bg-[var(--bg-primary)] z-20`}>
              {isSimplifiedFlow ? (
                <button 
                  onClick={handleGenerateReview}
                  disabled={ratings.overall === 0 || isGenerating || showEmpathy}
                  className="w-full py-4 rounded-full font-[600] text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                >
                  {isGenerating || showEmpathy ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating Review...</> : <><Sparkles className="w-4 h-4" /> Continue</>}
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  className="w-full py-4 rounded-full font-[600] text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: RATE */}
        {step === STEPS.RATE && (
          <motion.div 
            key="rate" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className="flex-1 flex flex-col p-6 h-full bg-[var(--bg-primary)]"
          >
            <button onClick={prevStep} className="self-start p-2 -ml-2 mb-4 text-[var(--text-primary)]"><ChevronLeft className="w-6 h-6" /></button>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 text-[11px] font-[500] rounded-full tracking-[0.3px] bg-[#F3F4F7] text-[#62687A]`}>Step 2 of 3</span>
            </div>
            <h2 className="text-2xl font-[600] mb-1 text-[var(--text-primary)]">Rate your time</h2>
            <p className={`text-[13px] font-[500] tracking-wide mb-8 text-[var(--text-secondary)]`}>How many stars for {business.name}?</p>

            <div className={`w-full bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[20px] p-6 flex flex-col items-center justify-center mb-6`}>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star}
                    onClick={() => setRatings(r => ({ ...r, overall: star, food: r.food || star, service: r.service || star, atmosphere: r.atmosphere || star }))}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star className={`w-8 h-8 ${star <= ratings.overall ? 'fill-[var(--star-filled)] text-[var(--star-filled)]' : 'text-[var(--star-empty)] stroke-[var(--border-default)]'}`} />
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-[500] tracking-[0.3px] text-[var(--star-filled)] h-4 mt-2">
                {ratings.overall > 0 ? ["Terrible", "Bad", "Okay", "Good", "Excellent!"][ratings.overall - 1] : ""}
              </span>
            </div>

            {showEmpathy ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 mb-12">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={`text-4xl ${s <= ratings.overall ? 'text-[var(--star-filled)]' : 'text-[var(--star-empty)]'}`}>
                      ★
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-[600] mb-2 text-[var(--text-primary)]">We hear you.</h2>
                <p className={`text-[13px] leading-relaxed max-w-[250px] mb-8 text-[var(--text-secondary)]`}>
                  Your honest feedback helps this business improve. 
                  We'll help you share exactly what happened.
                </p>

                <div className="w-full max-w-[200px] h-1.5 bg-[#E2E4E9] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.2, ease: "linear" }}
                    className="h-full bg-[var(--accent)] rounded-full"
                  />
                </div>
                <p className={`text-[11px] tracking-[0.3px] mt-4 text-[var(--text-muted)] font-[500]`}>Taking you to review step...</p>
              </div>
            ) : (
              <div className="space-y-4 mb-auto">
                {[
                  { key: 'food', label: isTaxFirm ? 'Expertise' : isJewellery ? 'Product Quality' : isEducation ? 'Faculty' : isSalon ? 'Service Quality' : isGym ? 'Equipment & Facility' : isRealEstate ? 'Property / Deal Quality' : 'Food', icon: isTaxFirm ? Briefcase : isJewellery ? Sparkles : isEducation ? GraduationCap : isSalon ? Sparkles : isGym ? Check : isRealEstate ? MapPin : Utensils },
                  { key: 'service', label: isJewellery ? 'Staff Helpfulness' : isEducation ? 'Support & Doubts' : isSalon ? 'Staff Behaviour' : isGym ? 'Trainer Support' : isRealEstate ? 'Agent Professionalism' : 'Service', icon: Sparkles },
                  { key: 'atmosphere', label: isTaxFirm ? 'Professionalism' : isJewellery ? 'Store Experience' : isEducation ? 'Learning Environment' : isSalon ? 'Cleanliness' : isGym ? 'Cleanliness' : isRealEstate ? 'Transparency & Process' : 'Atmosphere', icon: isTaxFirm ? Shield : isJewellery ? Check : isEducation ? Check : isSalon ? Check : isGym ? Check : isRealEstate ? Shield : Check }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className={`flex items-center justify-between p-4 rounded-[16px] border border-[var(--border-default)] bg-[var(--bg-card)]`}>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 text-[var(--accent)]`} />
                      <span className="text-[13px] font-[500] text-[var(--text-primary)]">{label}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button 
                          key={star}
                          onClick={() => setRatings(r => ({ ...r, [key]: star }))}
                          className="p-1"
                        >
                          <Star className={`w-4 h-4 ${star <= (ratings as any)[key] ? 'fill-[var(--star-filled)] text-[var(--star-filled)]' : 'text-[var(--star-empty)]'}`} />
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
                className="w-full py-4 mt-6 rounded-full font-[600] text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
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
            className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--bg-primary)]"
          >
            <div className="p-6 pb-2 shrink-0">
              <button onClick={prevStep} className="p-2 -ml-2 mb-4 text-[var(--text-primary)]"><ChevronLeft className="w-6 h-6" /></button>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 text-[11px] font-[500] rounded-full tracking-[0.3px] bg-[#F3F4F7] text-[#62687A]`}>
                  {isSimplifiedFlow ? "Step 2 of 2" : "Step 3 of 3"}
                </span>
              </div>
              <h2 className="text-2xl font-[600] mb-1 text-[var(--text-primary)]">Your review is ready</h2>
              <p className={`text-[13px] font-[500] tracking-wide text-[var(--text-secondary)]`}>Pick one, copy it, paste on Google</p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
              {!isSimplifiedFlow && (
                <div className={`w-full rounded-[16px] p-4 mb-6 border bg-[var(--success-bg)] border-[var(--success-main)]`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 rounded-full bg-[var(--success-main)] flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">!</span>
                    </div>
                    <span className="text-[11px] font-[600] tracking-[0.3px] text-[var(--success-text)]">Enter these exact ratings on Google</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    {[
                      { label: 'Overall', val: ratings.overall },
                      { label: 'Food', val: ratings.food },
                      { label: 'Service', val: ratings.service },
                      { label: 'Atmosphere', val: ratings.atmosphere },
                    ].map(r => (
                      <div key={r.label} className="flex items-center justify-between">
                        <span className={`text-[11px] font-[600] text-[var(--success-text)]`}>{r.label}</span>
                        <div className="flex gap-[1px]">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-2 h-2 ${s <= r.val ? 'fill-[var(--star-filled)] text-[var(--star-filled)]' : 'text-[rgba(0,0,0,0.15)]'}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {generatedReviews.map((review, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`w-full rounded-[20px] p-5 relative cursor-pointer transition-all ${activeReviewIndex === idx ? 'border-2 border-[var(--accent)] bg-[#E8EEFC]' : 'border border-[var(--border-default)] bg-[var(--bg-card)]'}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-[600] tracking-[0.3px] ${activeReviewIndex === idx ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>Variant {idx + 1}</span>
                        <div className="flex gap-[2px]">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-2.5 h-2.5 ${s <= ratings.overall ? 'fill-[var(--star-filled)] text-[var(--star-filled)]' : 'text-[var(--star-empty)]'}`} />
                          ))}
                        </div>
                      </div>
                      {activeReviewIndex === idx && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[var(--accent)] text-white">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <textarea 
                      className={`w-full bg-transparent text-[15px] leading-relaxed resize-none focus:outline-none text-[var(--text-primary)]`}
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
                      <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[11px] font-[600] text-[var(--accent)] tracking-[0.3px]">
                        Editable
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 pt-4 shrink-0 border-t border-[var(--border-default)] bg-[var(--bg-primary)] relative`}>
              {(ratings.overall <= 2) ? (
                <div className="space-y-3">
                  <p className={`text-[13px] text-center leading-relaxed text-[var(--text-secondary)]`}>
                    Your review helps others make informed decisions 
                    and helps this business improve.
                  </p>
                  <button 
                    onClick={handlePostReview}
                    className="w-full py-4 rounded-full font-[600] text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-3"
                    style={isCopied ? { backgroundColor: 'var(--success-main)', color: '#fff' } : { backgroundColor: 'var(--accent)', color: 'white' }}
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
                  className="w-full py-4 rounded-full font-[600] text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-3"
                  style={isCopied ? { backgroundColor: 'var(--success-main)', color: '#fff' } : { backgroundColor: 'var(--accent)', color: 'white' }}
                >
                  {isCopied ? (
                    <>✓ Copied!</>
                  ) : (
                    <>📋 Copy & Post Review <ExternalLink className="w-4 h-4" /></>
                  )}
                </button>
              )}
              {isCopied && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[var(--text-primary)] text-white px-4 py-2 rounded-full text-[13px] font-[500] shadow-md flex items-center gap-2 z-50 animate-in fade-in zoom-in duration-300 whitespace-nowrap">
                  <Check className="w-3 h-3 text-[var(--success-main)]" /> Review copied — now paste on Google Maps
                </div>
              )}
              <p className={`text-[11px] text-center max-w-[280px] mx-auto leading-relaxed text-[var(--text-muted)]`}>
                GlowQR helps you write your own review. The final text is yours to edit before posting. We never post reviews on your behalf.
              </p>
            </div>
          </motion.div>
        )}

        {/* SCREEN 5: COPIED & INSTAGRAM */}
        {step === STEPS.COPIED && (
          <motion.div 
            key="copied" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full bg-[var(--bg-primary)] overflow-y-auto custom-scrollbar"
          >
            <div className="w-20 h-20 rounded-full bg-[var(--success-main)] flex items-center justify-center mb-6 shrink-0 mt-8">
              <Check className="w-10 h-10 text-white stroke-[4]" />
            </div>
            <h2 className="text-3xl font-[600] mb-2 text-[var(--text-primary)]">Thank you!</h2>
            <p className={`text-[15px] leading-relaxed max-w-[280px] mb-8 text-[var(--text-secondary)]`}>
              Thank you for choosing {business.name}. Google Maps should be opening now to paste your review.
            </p>
            
            {['premium', 'trial'].includes(business.plan?.toLowerCase() || '') && !!business.instagramUrl && (
              <div className="w-full max-w-[300px] border-t border-[var(--border-default)] pt-8 mb-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-white stroke-[2]" />
                </div>
                <h2 className="text-[18px] font-[600] mb-2 leading-tight text-[var(--text-primary)]">Stay connected!</h2>
                <p className={`text-[14px] leading-relaxed mb-6 text-[var(--text-secondary)]`}>
                  Follow us on Instagram for exclusive offers, new arrivals & behind the scenes.
                </p>
                <button 
                  onClick={() => window.open(business.instagramUrl, '_blank')}
                  className="w-full py-4 rounded-full font-[600] text-white text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90"
                >
                  Follow on Instagram <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {!isSimplifiedFlow && (
              <button 
                onClick={() => setStep(STEPS.WELCOME)}
                className={`w-full max-w-[300px] py-4 rounded-full font-[600] text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-[var(--border-default)] text-[var(--text-primary)] bg-transparent hover:bg-[#F3F4F7] mb-8`}
              >
                Done <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

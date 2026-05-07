'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ChevronLeft, 
  Check, 
  Edit3, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  ArrowRight
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const STEPS = {
  ENTRY: "entry",
  WELCOME: "welcome",
  MENU: "menu",
  RATING: "rating",
  GENERATING: "generating",
  REVIEWS: "reviews",
  REMINDER: "reminder",
  DONE: "done",
};

type BusinessInfo = {
  name: string;
  tagline?: string;
  logo?: string | null;
  location?: string;
  primaryColor: string;
  googleReviewUrl: string;
};

type MenuItem = {
  id: number | string;
  name: string;
  emoji: string;
  price?: string;
  category?: string;
  subcategory?: string;
};

type ReviewFlowData = Partial<BusinessInfo> & {
  menuItems?: MenuItem[];
};

export default function ReviewFlow({ initialData, simulationData }: { initialData?: ReviewFlowData, simulationData?: ReviewFlowData }) {
  const searchParams = useSearchParams();
  const data = simulationData || initialData;
  const [business, setBusiness] = useState<BusinessInfo>({
    name: "Our Business",
    tagline: "Experience the excellence",
    logo: null,
    location: "Our Location",
    primaryColor: "#F07C3C",
    googleReviewUrl: "#",
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  const [step, setStep] = useState(simulationData ? STEPS.WELCOME : STEPS.ENTRY);
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  
  // New experience fields
  const [mealType, setMealType] = useState("");
  const [spendRange, setSpendRange] = useState("");
  const [waitTime, setWaitTime] = useState("");
  const [seatingType, setSeatingType] = useState("");

  // Detailed ratings
  const [ratings, setRatings] = useState({
    overall: 0,
    food: 0,
    service: 0,
    atmosphere: 0
  });
  const [hoveredStar, setHoveredStar] = useState<{ category: string, value: number } | null>(null);

  const [reviews, setReviews] = useState<string[]>([]);
  const [selectedReview, setSelectedReview] = useState(0);
  const [editedReview, setEditedReview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const c = business.primaryColor;

  // Load data from URL or props
  useEffect(() => {
    if (data) {
      setBusiness({
        name: data.name || "Our Business",
        tagline: data.tagline,
        logo: data.logo,
        location: data.location || "Our Location",
        primaryColor: data.primaryColor || "#F07C3C",
        googleReviewUrl: data.googleReviewUrl || "#",
      });
      if (data.menuItems) {
        setMenuItems(data.menuItems);
      }
      return;
    }

    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(dataParam)));
        setBusiness({
          name: decoded.name || "Our Business",
          tagline: decoded.tagline,
          logo: decoded.logo,
          location: decoded.location || "Our Location",
          primaryColor: decoded.primaryColor || "#F07C3C",
          googleReviewUrl: decoded.googleReviewUrl || "#",
        });
        if (decoded.menuItems) {
          setMenuItems(decoded.menuItems);
        }
      } catch (err) {
        console.error("Failed to parse data", err);
      }
    }
  }, [searchParams, data]);

  // Auto-advance from entry
  useEffect(() => {
    if (step === STEPS.ENTRY) {
      const timer = setTimeout(() => setStep(STEPS.WELCOME), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Generate reviews logic
  useEffect(() => {
    if (step === STEPS.GENERATING && !isGenerating) {
      setIsGenerating(true);
      const generateAIReview = async () => {
        try {
          const selectedNames = selectedItems.map(id => menuItems.find(m => m.id === id)?.name).filter(Boolean);
          
          const response = await fetch('/api/generate-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              overall_rating: ratings.overall,
              food_rating: ratings.food,
              service_rating: ratings.service,
              atmosphere_rating: ratings.atmosphere,
              meal_type: mealType,
              selected_items: selectedNames,
              wait_time: waitTime,
              spend_range: spendRange,
              seating_type: seatingType,
              business_name: business.name,
              location: business.location
            })
          });

          const data = await response.json();
          if (data.reviews) {
            setReviews(data.reviews);
          } else {
            // Fallback
            setReviews([`Great experience at ${business.name}! Loved the ${selectedNames.join(", ")}.`]);
          }
          setStep(STEPS.REVIEWS);
        } catch (err) {
          console.error("Failed to generate review", err);
          setReviews([`Had a wonderful time at ${business.name}. The food and service were excellent!`]);
          setStep(STEPS.REVIEWS);
        } finally {
          setIsGenerating(false);
        }
      };

      generateAIReview();
    }
  }, [step, ratings, selectedItems, business, menuItems, mealType, spendRange, waitTime, seatingType, isGenerating]);

  const toggleItem = (id: string | number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePostReview = async () => {
    const finalText = isEditing ? editedReview : reviews[selectedReview];
    try {
      await navigator.clipboard.writeText(finalText);
      setCopied(true);
      setStep(STEPS.REMINDER);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleFinalRedirect = () => {
    if (business.googleReviewUrl && business.googleReviewUrl !== "#") {
      window.open(business.googleReviewUrl, "_blank");
    }
    setStep(STEPS.DONE);
  };

  return (
    <div className={`relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-[#FAFAF9] ${simulationData ? 'rounded-[2.5rem]' : ''}`}>
      {/* Dynamic Background Animation */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[100vw] h-[100vw] rounded-full blur-[140px] opacity-[0.12]"
          style={{ backgroundColor: c }}
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[100vw] h-[100vw] rounded-full blur-[140px] opacity-[0.10]"
          style={{ backgroundColor: c }}
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <AnimatePresence mode="wait">
        {/* STEP: ENTRY (Simulated Scan Result) */}
        {step === STEPS.ENTRY && (
          <motion.div
            key="entry"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative mb-8"
            >
              {/* Pulsing Scan Ring */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-[-20px] border-2 rounded-[2.5rem] pointer-events-none"
                style={{ borderColor: c }}
              />
              
              <div 
                className="w-28 h-28 rounded-[2rem] flex items-center justify-center shadow-2xl relative overflow-hidden bg-white p-1"
                style={{ border: `4px solid ${c}` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-50 flex items-center justify-center">
                  {business.logo ? (
                    <Image 
                      src={business.logo} 
                      alt="Logo" 
                      width={112} 
                      height={112} 
                      className="w-full h-full object-contain p-2" 
                    />
                  ) : (
                    <span className="text-5xl font-display font-black" style={{ color: c }}>
                      {business.name[0]}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Verified Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg border-4 border-white"
              >
                <Check className="w-5 h-5 stroke-[4]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Scan Successful
              </div>
              <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">
                {business.name}
              </h1>
              {business.tagline && (
                <p className="text-slate-500 italic font-serif text-lg">
                  {business.tagline}
                </p>
              )}
            </motion.div>
            
            <div className="mt-12 flex flex-col items-center gap-3">
              <motion.div 
                className="w-1.5 h-12 rounded-full bg-slate-100 overflow-hidden"
              >
                <motion.div 
                  animate={{ y: [-48, 48] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full"
                  style={{ backgroundColor: c }}
                />
              </motion.div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Identifying Business...
              </span>
            </div>
          </motion.div>
        )}

        {/* STEP: WELCOME */}
        {step === STEPS.WELCOME && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-black/5" style={{ backgroundColor: `${c}10` }}>
              <Sparkles className="w-10 h-10" style={{ color: c }} />
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-display font-bold text-slate-900 mb-4 leading-tight"
            >
              Share your <br />experience
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 mb-10 leading-relaxed text-lg"
            >
              Loved your time at <span className="font-semibold text-slate-900">{business.name}</span>? 
              {business.tagline && (
                <span className="block mt-2 text-sm text-slate-400 italic">
                  &quot;{business.tagline}&quot;
                </span>
              )}
              <br />
              Let&apos;s craft a beautiful review together.
            </motion.p>
            
            <button
              onClick={() => setStep(STEPS.MENU)}
              className="w-full py-5 rounded-2xl text-white font-bold text-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 mb-6 shadow-amber-900/10"
              style={{ backgroundColor: c }}
            >
              Get Started <ArrowRight className="w-6 h-6" />
            </button>
            <button className="text-slate-400 font-medium hover:text-slate-600 transition-colors">
              Maybe later
            </button>
          </motion.div>
        )}

        {/* STEP: MENU SELECTION */}
        {step === STEPS.MENU && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50"
          >
            <button 
              onClick={() => setStep(STEPS.WELCOME)}
              className="absolute left-8 top-10 p-2 rounded-full hover:bg-slate-100 transition-colors z-30"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400" />
            </button>
            <div className="flex items-center gap-2 mb-4 mt-8">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase py-1.5 px-3 rounded-full bg-slate-100 text-slate-500">
                Step 1 of 2
              </span>
            </div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              What did you enjoy?
            </h2>
            <p className="text-slate-500 mb-8 flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4" /> {business.location}
            </p>
            
            {menuItems.length === 0 && (
              <div className="text-center py-10">
                <p className="text-slate-400 italic">No menu items added yet.</p>
                <button onClick={() => setStep(STEPS.RATING)} className="mt-4 text-sm font-bold underline" style={{ color: c }}>Skip to rating</button>
              </div>
            )}

            <div className="space-y-8 mb-10 max-h-[50vh] overflow-y-auto pr-3 custom-scrollbar">
              {Array.from(new Set(menuItems.map(item => item.category || "General"))).map((cat) => (
                <div key={cat} className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">{cat}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {menuItems.filter(item => (item.category || "General") === cat).map((item) => {
                      const isSelected = selectedItems.includes(item.id);
                      return (
                        <motion.button
                          key={item.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleItem(item.id)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                            isSelected 
                              ? 'border-transparent shadow-lg text-white' 
                              : 'border-slate-50 bg-white/50 text-slate-700 hover:border-slate-200 hover:bg-white'
                          }`}
                          style={{ backgroundColor: isSelected ? c : undefined }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{item.emoji || '🍽️'}</span>
                            <div className="text-left">
                              <p className="font-bold text-sm leading-none mb-1">{item.name}</p>
                              {item.subcategory && <p className={`text-[10px] ${isSelected ? 'text-white/60' : 'text-slate-400'}`}>{item.subcategory}</p>}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>{item.price}</span>
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience Details */}
            <div className="space-y-6 mb-10 pt-6 border-t border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Visit Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <select 
                    value={mealType} 
                    onChange={(e) => setMealType(e.target.value)}
                    className="bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-amber-400"
                  >
                    <option value="">Meal Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Brunch">Brunch</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                  <select 
                    value={spendRange} 
                    onChange={(e) => setSpendRange(e.target.value)}
                    className="bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-amber-400"
                  >
                    <option value="">Spend Range</option>
                    <option value="₹0–200">₹0–200</option>
                    <option value="₹200–500">₹200–500</option>
                    <option value="₹500+">₹500+</option>
                  </select>
                  <select 
                    value={waitTime} 
                    onChange={(e) => setWaitTime(e.target.value)}
                    className="bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-amber-400"
                  >
                    <option value="">Wait Time</option>
                    <option value="No wait">No wait</option>
                    <option value="10 min">10 min</option>
                    <option value="20+ min">20+ min</option>
                  </select>
                  <select 
                    value={seatingType} 
                    onChange={(e) => setSeatingType(e.target.value)}
                    className="bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-amber-400"
                  >
                    <option value="">Seating</option>
                    <option value="Dine-in">Dine-in</option>
                    <option value="Takeaway">Takeaway</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(STEPS.RATING)}
              className="w-full py-5 rounded-2xl text-white font-bold text-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-amber-900/10"
              style={{ backgroundColor: c }}
            >
              Continue <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        {/* STEP: RATING */}
        {step === STEPS.RATING && (
          <motion.div
            key="rating"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 text-center"
          >
            <button 
              onClick={() => setStep(STEPS.MENU)}
              className="absolute left-8 top-10 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400" />
            </button>

            <div className="mt-6 flex flex-col items-center">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase py-1.5 px-3 rounded-full bg-slate-100 text-slate-500 mb-6">
                Step 2 of 2
              </span>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-3">Rate your experience</h2>
              <p className="text-slate-500 mb-8 text-lg">
                How would you rate <span className="font-semibold text-slate-700">{business.name}</span>?
              </p>

              <div className="w-full space-y-6 mb-10">
                {[
                  { id: 'overall', label: 'Overall Rating' },
                  { id: 'food', label: 'Food Quality' },
                  { id: 'service', label: 'Service' },
                  { id: 'atmosphere', label: 'Atmosphere' }
                ].map((cat) => (
                  <div key={cat.id} className="flex flex-col items-center gap-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{cat.label}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoveredStar({ category: cat.id, value: star })}
                          onMouseLeave={() => setHoveredStar(null)}
                          onClick={() => setRatings(prev => ({ ...prev, [cat.id]: star }))}
                          className="p-1"
                        >
                          <Star 
                            className={`w-10 h-10 transition-all duration-300 ${
                              star <= (hoveredStar?.category === cat.id ? hoveredStar.value : ratings[cat.id as keyof typeof ratings]) 
                                ? 'fill-amber-400 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' 
                                : 'text-slate-100 fill-slate-50'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                disabled={ratings.overall === 0}
                onClick={() => setStep(STEPS.GENERATING)}
                className="w-full py-5 rounded-2xl text-white font-bold text-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:grayscale disabled:scale-100 shadow-amber-900/10"
                style={{ backgroundColor: c }}
              >
                Create Review <Sparkles className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP: GENERATING */}
        {step === STEPS.GENERATING && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-16 shadow-2xl text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[6px] border-slate-100 border-t-amber-400 rounded-full"
                style={{ borderTopColor: c }}
              />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10" style={{ color: c }} />
              </motion.div>
            </div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Writing your story...</h2>
            <p className="text-slate-500 text-lg leading-relaxed">Our AI is drafting the perfect review for <span className="font-semibold text-slate-800">{business.name}</span></p>
          </motion.div>
        )}

        {/* STEP: REVIEWS */}
        {step === STEPS.REVIEWS && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-2xl"
          >
            <button 
              onClick={() => setStep(STEPS.RATING)}
              className="absolute left-8 top-10 p-2 rounded-full hover:bg-slate-100 transition-colors z-30"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400" />
            </button>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-3 mt-8">Your Drafts</h2>
            <p className="text-slate-500 mb-8 text-base">Select the one that sounds most like you.</p>

            <div className="space-y-4 mb-8">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  onClick={() => {
                    setSelectedReview(i);
                    setIsEditing(false);
                  }}
                  className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    selectedReview === i && !isEditing
                      ? 'border-transparent shadow-xl bg-white scale-[1.02]'
                      : 'border-slate-100 bg-white/40 hover:border-slate-200'
                  }`}
                  style={{ 
                    boxShadow: selectedReview === i && !isEditing ? `0 15px 30px -10px ${c}25` : undefined,
                  }}
                >
                  {selectedReview === i && !isEditing && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5" 
                      style={{ backgroundColor: c }}
                    />
                  )}
                  <p className="text-base text-slate-700 leading-relaxed font-medium">&quot;{review}&quot;</p>
                </motion.div>
              ))}
            </div>

            <div className="mb-8">
              <AnimatePresence>
                {isEditing ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <textarea
                      value={editedReview || reviews[selectedReview]}
                      onChange={(e) => setEditedReview(e.target.value)}
                      className="w-full p-5 rounded-[2rem] bg-white border-2 border-slate-100 focus:border-amber-400 outline-none text-base min-h-[140px] shadow-inner font-medium text-slate-800"
                      style={{ caretColor: c }}
                      autoFocus
                    />
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsEditing(false)}
                      className="absolute bottom-4 right-4 p-2 rounded-full bg-slate-900 text-white shadow-lg"
                    >
                      <Check className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => {
                      setEditedReview(reviews[selectedReview]);
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-2 text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors mx-auto uppercase tracking-widest"
                  >
                    <Edit3 className="w-4 h-4" /> Personalize this
                  </button>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handlePostReview}
              disabled={copied}
              className="w-full py-5 rounded-2xl text-white font-bold text-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-amber-900/10"
              style={{ backgroundColor: c }}
            >
              {copied ? (
                <>Copied to Clipboard! <Check className="w-6 h-6 stroke-[3]" /></>
              ) : (
                <>Copy & Post Review <ExternalLink className="w-6 h-6" /></>
              )}
            </button>
          </motion.div>
        )}

        {/* STEP: REMINDER & INSTRUCTIONS */}
        {step === STEPS.REMINDER && (
          <motion.div
            key="reminder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-2xl"
          >
            <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Review Copied!</h3>
              </div>
              
              <p className="text-emerald-800/70 text-sm mb-4 font-medium">Remember to select these ratings on Google:</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Overall', value: ratings.overall },
                  { label: 'Food', value: ratings.food },
                  { label: 'Service', value: ratings.service },
                  { label: 'Atmosphere', value: ratings.atmosphere },
                ].map((r) => (
                  <div key={r.label} className="bg-white/50 rounded-xl p-3 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest mb-1">{r.label}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3 h-3 ${s <= r.value ? 'fill-emerald-500 text-emerald-500' : 'text-emerald-200'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <h3 className="text-lg font-bold text-slate-800 px-2">Next Steps:</h3>
              <div className="space-y-4">
                {[
                  { step: 1, text: "Wait for Google Maps to open" },
                  { step: 2, text: "Select the same star ratings" },
                  { step: 3, text: "Paste your review & click Post" }
                ].map((s) => (
                  <div key={s.step} className="flex gap-4 items-start px-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400 shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <p className="text-slate-600 font-semibold">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleFinalRedirect}
              className="w-full py-5 rounded-2xl text-white font-bold text-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-emerald-900/10"
              style={{ backgroundColor: "#10b981" }}
            >
              Open Google Maps <ExternalLink className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        {/* STEP: DONE */}
        {step === STEPS.DONE && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-16 shadow-2xl text-center"
          >
            <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
              >
                <Check className="w-14 h-14 text-emerald-500 stroke-[3]" />
              </motion.div>
            </div>
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">You&apos;re a Star!</h2>
            <p className="text-slate-500 mb-12 text-lg leading-relaxed">
              Your feedback is invaluable to <span className="font-semibold text-slate-900">{business.name}</span>. 
              Thank you for helping us grow in <span className="font-semibold text-slate-900">{business.location}</span>!
            </p>
            <div className="pt-10 border-t border-slate-100">
              <motion.p 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xs font-black text-slate-300 uppercase tracking-[0.3em]"
              >
                Powered by GlowQR
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

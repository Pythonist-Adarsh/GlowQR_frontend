'use client'

import { useState, lazy, Suspense, useCallback, memo, useDeferredValue, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { 
  Camera, UploadCloud, ChevronRight, ChevronLeft, Plus, CheckCircle2, 
  Download, ArrowRight, MapPin, Clock, Sparkles, Globe, Phone, Mail, 
  Layers, Star, Info, AlertTriangle, Building2,
  Utensils, Coffee, Croissant, Wine, Pizza, ChefHat, Truck, Package,
  Hotel, Flower2, Scissors, ShoppingBag, Dumbbell, Stethoscope, GraduationCap,
  Sparkle, Smartphone, Zap, Heart
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import { API_BASE_URL } from '@/lib/api-config'

// Lazy load ReviewFlow for simulation to keep initial bundle smaller
const ReviewFlow = lazy(() => import('../review/ReviewFlow'))

// --- Constants & Types ---

const steps = [
  { id: 'business', title: 'Business details', subtitle: 'Core identity shown on your QR page.' },
  { id: 'location', title: 'Location & contact', subtitle: 'Crucial for AI-driven local SEO.' },
  { id: 'category', title: 'Category & style', subtitle: 'AI tunes its voice based on your type.' },
  { id: 'menu', title: 'Menu & highlights', subtitle: 'Showcase your best to every scanner.' },
  { id: 'experience', title: 'UI experience', subtitle: 'Choose how customers see your brand.' },
  { id: 'qr', title: 'Your QR code', subtitle: 'Ready to glow in the wild.' },
]

const categories = [
  { id: 'restaurant', name: 'Restaurant', icon: <Utensils className="w-5 h-5" /> },
  { id: 'cafe', name: 'Café', icon: <Coffee className="w-5 h-5" /> },
  { id: 'bakery', name: 'Bakery', icon: <Croissant className="w-5 h-5" /> },
  { id: 'bar', name: 'Bar', icon: <Wine className="w-5 h-5" /> },
  { id: 'fastfood', name: 'Fast Food', icon: <Pizza className="w-5 h-5" /> },
  { id: 'finedining', name: 'Fine Dining', icon: <ChefHat className="w-5 h-5" /> },
  { id: 'foodtruck', name: 'Food Truck', icon: <Truck className="w-5 h-5" /> },
  { id: 'cloudkitchen', name: 'Cloud Kitchen', icon: <Package className="w-5 h-5" /> },
  { id: 'hotel', name: 'Hotel', icon: <Hotel className="w-5 h-5" /> },
  { id: 'spa', name: 'Spa', icon: <Flower2 className="w-5 h-5" /> },
  { id: 'salon', name: 'Salon', icon: <Scissors className="w-5 h-5" /> },
  { id: 'retail', name: 'Retail', icon: <ShoppingBag className="w-5 h-5" /> },
  { id: 'gym', name: 'Gym', icon: <Dumbbell className="w-5 h-5" /> },
  { id: 'medical', name: 'Medical', icon: <Stethoscope className="w-5 h-5" /> },
  { id: 'education', name: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'other', name: 'Other', icon: <Sparkle className="w-5 h-5" /> },
]

// --- Helper Components (Outside main component to prevent lag) ---

const Badge = memo(({ text, type }: { text: string, type: 'required' | 'optional' | 'production' }) => {
  const styles = {
    required: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    optional: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    production: 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  }
  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${styles[type]}`}
    >
      {text}
    </motion.span>
  )
})

Badge.displayName = 'Badge'

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  production?: boolean;
  className?: string;
}

const InputField = memo(({ id, label, type = 'text', value, onChange, placeholder, hint, required, optional, production, className = '' }: InputFieldProps) => {
  const [localValue, setLocalValue] = useState(value)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Sync local state when external value changes (mount/reset)
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLocalValue(val)
    
    // Debounce the parent update to prevent lag during rapid typing
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      onChange(val)
    }, 150) // Reduced to 150ms for snappier feel while still preventing layout thrashing
  }

  const handleBlur = () => {
    // Ensure parent is in sync when focus is lost
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    onChange(localValue)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer">{label}</label>
        <div className="flex gap-1">
          {required && <Badge text="Required" type="required" />}
          {optional && <Badge text="Optional" type="optional" />}
          {production && <Badge text="Production" type="production" />}
        </div>
      </div>
      <div className="relative group">
        <input
          id={id}
          name={id}
          type={type}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-2xl focus:border-[#6C63FF] focus:ring-4 focus:ring-[#6C63FF]/20 outline-none transition-all placeholder:text-slate-600 text-white group-hover:border-white/20"
        />
        <div className="absolute inset-0 rounded-2xl bg-[#6C63FF]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
        
        {localValue.length > 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500/50" />
          </motion.div>
        )}
      </div>
      {hint && <p className="text-[11px] text-slate-500 leading-relaxed">{hint}</p>}
    </div>
  )
})

InputField.displayName = 'InputField'


const InfoBox = memo(({ icon: Icon, title, description, variant = 'purple' }: { icon: any, title: string, description: string, variant?: 'purple' | 'amber' | 'emerald' }) => {
  const styles = {
    purple: 'bg-violet-500/10 border-violet-500/20 text-violet-200',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
  }
  const iconColors = {
    purple: 'text-violet-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400'
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`p-5 rounded-2xl border ${styles[variant]} flex gap-4 backdrop-blur-md transition-colors`}
    >
      <div className={`w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shrink-0 ${iconColors[variant]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-xs opacity-70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
})

InfoBox.displayName = 'InfoBox'

// --- Step Content Components (Split for Performance) ---

const BusinessStep = memo(({ 
  businessName, setBusinessName, tagline, setTagline, 
  businessWebsite, setBusinessWebsite, googleReviewLink, setGoogleReviewLink,
  placeId, setPlaceId, googleRating, setGoogleRating, reviewCount, setReviewCount 
}: any) => (
  <div className="space-y-10">
    <InfoBox 
      icon={Sparkles} 
      title="AI-Ready Profile" 
      description="This information powers our AI to write contextual, high-ranking reviews. Required fields are marked for base functionality."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InputField id="businessName" label="Business Name" value={businessName} onChange={setBusinessName} placeholder="e.g. Cafe Romeo" required />
      <InputField id="tagline" label="Tagline" value={tagline} onChange={setTagline} placeholder="e.g. Best artisanal coffee" optional />
      <InputField id="website" label="Website" value={businessWebsite} onChange={setBusinessWebsite} placeholder="e.g. https://caferomeo.in" optional />
      <InputField id="reviewLink" label="Google Review Link" value={googleReviewLink} onChange={setGoogleReviewLink} placeholder="Paste Maps link here" required hint="Where customers are sent after copying AI reviews." />
    </div>
    <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
      <InputField id="placeId" label="Place ID" value={placeId} onChange={setPlaceId} placeholder="Optional" production />
      <InputField id="rating" label="Current Rating" value={googleRating} onChange={setGoogleRating} placeholder="4.5" production />
      <InputField id="reviewCount" label="Total Reviews" value={reviewCount} onChange={setReviewCount} placeholder="120" production />
    </div>
  </div>
))
BusinessStep.displayName = 'BusinessStep'

const LocationStep = memo(({
  city, setCity, area, setArea, address, setAddress, state, setState, pincode, setPincode,
  phoneNumber, setPhoneNumber, whatsappNumber, setWhatsappNumber, ownerEmail, setOwnerEmail,
  openingTime, setOpeningTime, closingTime, setClosingTime, daysOpen, setDaysOpen
}: any) => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InputField id="city" label="City" value={city} onChange={setCity} placeholder="e.g. Lucknow" required />
      <InputField id="area" label="Area" value={area} onChange={setArea} placeholder="e.g. Hazratganj" optional />
      <InputField id="address" label="Address" value={address} onChange={setAddress} placeholder="Full address" className="md:col-span-2" optional />
      <InputField id="state" label="State" value={state} onChange={setState} placeholder="Uttar Pradesh" optional />
      <InputField id="pincode" label="PIN" value={pincode} onChange={setPincode} placeholder="226001" optional />
    </div>
    <div className="pt-10 border-t border-white/5 space-y-8">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Operation & Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputField id="phone" label="Phone" value={phoneNumber} onChange={setPhoneNumber} placeholder="+91..." production />
        <InputField id="whatsapp" label="WhatsApp" value={whatsappNumber} onChange={setWhatsappNumber} placeholder="+91..." production />
        <InputField id="email" label="Manager Email" value={ownerEmail} onChange={setOwnerEmail} placeholder="owner@..." required />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-end">
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Opening</span>
          <input type="time" value={openingTime} onChange={e => setOpeningTime(e.target.value)} className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-[#6C63FF] transition-all" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Closing</span>
          <input type="time" value={closingTime} onChange={e => setClosingTime(e.target.value)} className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-[#6C63FF] transition-all" />
        </div>
        <div className="col-span-2 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Days Open</span>
          <div className="flex gap-1.5 flex-wrap">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <button 
                key={day} 
                onClick={() => {
                  const newDays = daysOpen.includes(day) ? daysOpen.filter((d: string) => d !== day) : [...daysOpen, day]
                  setDaysOpen(newDays)
                }} 
                className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all ${daysOpen.includes(day) ? 'bg-[#6C63FF] text-white shadow-[0_0_15px_rgba(108,99,255,0.3)]' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
))
LocationStep.displayName = 'LocationStep'

const CategoryStep = memo(({ businessType, setBusinessType, priceRange, setPriceRange, cuisine, setCuisine }: any) => (
  <div className="space-y-10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setBusinessType(cat.id)}
          className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all duration-500 group ${
            businessType === cat.id 
              ? 'border-[#6C63FF] bg-[#6C63FF]/10 text-white shadow-[0_0_30px_rgba(108,99,255,0.15)]' 
              : 'border-white/5 bg-white/[0.02] hover:border-white/20 text-slate-500 hover:text-slate-300'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110 ${businessType === cat.id ? 'bg-[#6C63FF] text-white' : 'bg-white/5 text-slate-400'}`}>
            {cat.icon}
          </div>
          <span className="text-sm font-bold tracking-tight">{cat.name}</span>
        </motion.button>
      ))}
    </div>
    <div className="pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Price Range</span>
        <div className="flex gap-3">
          {['₹', '₹₹', '₹₹₹', '₹₹₹₹'].map(p => (
            <motion.button 
              key={p} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setPriceRange(p)} 
              className={`flex-1 py-4 rounded-2xl border-2 font-black transition-all ${priceRange === p ? 'border-[#6C63FF] bg-[#6C63FF]/10 text-white shadow-[0_0_20px_rgba(108,99,255,0.2)]' : 'border-white/5 bg-white/[0.02] text-slate-600'}`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </div>
      <InputField id="speciality" label="Speciality" value={cuisine} onChange={setCuisine} placeholder="e.g. Italian, Street Food" optional />
    </div>
  </div>
))
CategoryStep.displayName = 'CategoryStep'

const MenuStep = memo(({ signatureDish, setSignatureDish, highlightedDishes, setHighlightedDishes }: any) => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.label 
        whileHover={{ scale: 1.01 }}
        className="group relative overflow-hidden bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[#6C63FF]/50 hover:bg-[#6C63FF]/5"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <UploadCloud className="w-12 h-12 text-[#6C63FF] mb-4 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-white text-lg">Upload PDF Menu</span>
        <span className="text-xs text-slate-500 mt-2">AI will auto-extract dishes & prices</span>
        <input type="file" className="hidden" accept=".pdf" />
      </motion.label>
      <div className="space-y-6">
        <InputField id="signatureDish" label="Signature Dish" value={signatureDish} onChange={setSignatureDish} placeholder="What are you famous for?" required hint="AI emphasizes this item in reviews." />
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Highlights</span>
          <textarea 
            value={highlightedDishes} 
            onChange={e => setHighlightedDishes(e.target.value)} 
            placeholder="Top 3-5 items..." 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl min-h-[120px] text-white outline-none focus:border-[#6C63FF] transition-all hover:border-white/20 focus:ring-4 focus:ring-[#6C63FF]/10" 
          />
        </div>
      </div>
    </div>
  </div>
))
MenuStep.displayName = 'MenuStep'

const ExperienceStep = memo(({ 
  experienceType, setExperienceType, logoPreview, setLogoPreview, 
  primaryColor, setPrimaryColor 
}: any) => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.button 
        whileHover={{ y: -5 }}
        onClick={() => setExperienceType('classic')}
        className={`p-6 rounded-[2.5rem] border-2 text-left transition-all duration-500 group ${experienceType === 'classic' ? 'border-[#6C63FF] bg-[#6C63FF]/10' : 'border-white/5 bg-white/[0.02]'}`}
      >
        <div className="w-full h-40 bg-black/40 rounded-2xl mb-6 overflow-hidden relative border border-white/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="w-12 h-12 text-slate-700" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#6C63FF] w-1/3" />
          </div>
        </div>
        <h4 className="text-xl font-bold text-white mb-2">Classic Experience</h4>
        <p className="text-sm text-slate-400">Clean, fast, and minimalist review collection.</p>
      </motion.button>
      <motion.button 
        whileHover={{ y: -5 }}
        onClick={() => setExperienceType('premium')}
        className={`p-6 rounded-[2.5rem] border-2 text-left transition-all duration-500 group relative overflow-hidden ${experienceType === 'premium' ? 'border-[#6C63FF] bg-[#6C63FF]/10 shadow-[0_0_50px_rgba(108,99,255,0.2)]' : 'border-white/5 bg-white/[0.02]'}`}
      >
        {experienceType === 'premium' && <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase rounded-full">Recommended</div>}
        <div className="w-full h-40 bg-slate-900 rounded-2xl mb-6 overflow-hidden relative border border-[#6C63FF]/20">
          <div className="absolute inset-0 bg-[#6C63FF]/10 blur-xl animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-[#6C63FF] drop-shadow-[0_0_15px_#6C63FF]" />
          </div>
        </div>
        <h4 className="text-xl font-bold text-white mb-2">Premium Experience</h4>
        <p className="text-sm text-slate-400">3D animations, custom branding, and AI voice tuning.</p>
      </motion.button>
    </div>

    <div className="pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Brand Logo</span>
        <label className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
          <div className="w-16 h-16 bg-black/40 rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
            {logoPreview ? <Image src={logoPreview} alt="Logo" width={64} height={64} className="object-cover" /> : <Building2 className="w-6 h-6 text-slate-600" />}
          </div>
          <div>
            <span className="block font-bold text-sm text-white">Upload Brand Mark</span>
            <span className="block text-[10px] text-slate-500 uppercase mt-1">PNG, SVG preferred</span>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && setLogoPreview(URL.createObjectURL(e.target.files[0]))} />
        </label>
      </div>
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Brand Accent</span>
        <div className="flex gap-3">
          {['#6C63FF', '#00F2FF', '#FF007A', '#FFB800', '#00FF94'].map(c => (
            <motion.button 
              key={c} 
              whileHover={{ scale: 1.2 }}
              onClick={() => setPrimaryColor(c)} 
              className={`w-10 h-10 rounded-full border-2 transition-all ${primaryColor === c ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent'}`} 
              style={{ backgroundColor: c }} 
            />
          ))}
          <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-full bg-transparent border-none p-0 cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
))
ExperienceStep.displayName = 'ExperienceStep'

// --- Live Identity Preview Card ---

const LivePreviewCard = memo(({ businessName, tagline, rating, primaryColor, logo, category }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="hidden xl:flex flex-col w-[340px] sticky top-32 h-fit"
  >
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute -inset-4 rounded-[3rem] blur-2xl opacity-20 transition-all duration-1000 group-hover:opacity-40" style={{ backgroundColor: primaryColor }} />
      
      {/* Card Body */}
      <div className="relative bg-slate-900/80 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
            {logo ? <Image src={logo} alt="L" width={48} height={48} className="object-cover" /> : <Building2 className="w-6 h-6 text-slate-600" />}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 rounded-full border border-white/5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-black text-white">{rating || "4.8"}</span>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
            {businessName || "Your Business"}
          </h3>
          <p className="text-sm text-slate-400 font-medium line-clamp-2">
            {tagline || "Your premium business tagline will appear right here."}
          </p>
        </div>

        <div className="space-y-3">
          <div className="h-12 w-full rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 gap-3">
            <Zap className="w-4 h-4 text-emerald-400" />
            <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-2/3 transition-all duration-1000" style={{ backgroundColor: primaryColor }} />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-500">
              {category || "Retail"}
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg" style={{ backgroundColor: primaryColor }}>
              <Heart className="w-5 h-5 text-white fill-white/20" />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-2">
          <div className="w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl" />
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-3 px-6">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800" />)}
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time Preview</span>
      </div>
    </div>
  </motion.div>
))
LivePreviewCard.displayName = 'LivePreviewCard'

// --- Main Component ---

export function OnboardingWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showQRPopup, setShowQRPopup] = useState(false)
  const [showFinalQR, setShowFinalQR] = useState(false)
  const [isSimulatingScan, setIsSimulatingScan] = useState(false)
  const [isScanningLocal, setIsScanningLocal] = useState(false)

  // --- State Hooks ---
  
  // Step 1: Business info
  const [businessName, setBusinessName] = useState('')
  const [tagline, setTagline] = useState('')
  const [businessWebsite, setBusinessWebsite] = useState('')
  const [googleReviewLink, setGoogleReviewLink] = useState('')
  const [placeId, setPlaceId] = useState('')
  const [googleRating, setGoogleRating] = useState('')
  const [reviewCount, setReviewCount] = useState('')
  
  // Step 2: Location
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [openingTime, setOpeningTime] = useState('09:00')
  const [closingTime, setClosingTime] = useState('22:00')
  const [daysOpen, setDaysOpen] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  
  // Step 3: Category
  const [businessType, setBusinessType] = useState('')
  const [priceRange, setPriceRange] = useState('₹200 – ₹500')
  const [cuisine, setCuisine] = useState('')
  const [dietaryOptions, setDietaryOptions] = useState<string[]>([])
  
  // Step 4: Menu
  const [signatureDish, setSignatureDish] = useState('')
  const [highlightedDishes, setHighlightedDishes] = useState('')
  const [excludedDishes, setExcludedDishes] = useState('')
  const [menuItems] = useState<any[]>([]) // Placeholder for complex menu state

  // Step 5: Experience & Branding
  const [experienceType, setExperienceType] = useState('classic')
  const [primaryColor, setPrimaryColor] = useState('#6C63FF')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [aiVariants, setAiVariants] = useState('3 variants (Premium)')
  const [reviewLanguage, setReviewLanguage] = useState('English')
  
  // --- LocalStorage Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem('onboarding_progress')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.businessName) setBusinessName(data.businessName)
        if (data.tagline) setTagline(data.tagline)
        if (data.businessWebsite) setBusinessWebsite(data.businessWebsite)
        if (data.googleReviewLink) setGoogleReviewLink(data.googleReviewLink)
        if (data.city) setCity(data.city)
        if (data.ownerEmail) setOwnerEmail(data.ownerEmail)
        if (data.currentStep) setCurrentStep(data.currentStep)
      } catch (e) { console.error("Failed to load progress", e) }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = { businessName, tagline, businessWebsite, googleReviewLink, city, ownerEmail, currentStep }
      localStorage.setItem('onboarding_progress', JSON.stringify(data))
    }, 1000)
    return () => clearTimeout(timer)
  }, [businessName, tagline, businessWebsite, googleReviewLink, city, ownerEmail, currentStep])

  // --- Deferred Values for Performance ---
  const deferredName = useDeferredValue(businessName)
  const deferredTagline = useDeferredValue(tagline)
  const deferredColor = useDeferredValue(primaryColor)
  const deferredLogo = useDeferredValue(logoPreview)
  const deferredCategory = useDeferredValue(businessType)
  const deferredRating = useDeferredValue(googleRating)

  // --- Memoized Data for Performance ---
  const memoizedMenuItems = useMemo(() => 
    menuItems.map(m => ({ id: m.id, name: m.name, emoji: m.emoji || "🍽️" })),
    [menuItems]
  )

  const simulationData = useMemo(() => ({
    name: businessName || "Your Business",
    tagline: tagline,
    address: address || "Our Location",
    primaryColor: primaryColor,
    logo: logoPreview,
    googleReviewUrl: googleReviewLink || "#",
    menuItems: memoizedMenuItems
  }), [businessName, tagline, address, primaryColor, logoPreview, googleReviewLink, memoizedMenuItems])

  // --- Handlers ---

  const handleNext = useCallback(async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/sign-in')
          return
        }

        const response = await fetch(`${API_BASE_URL}/businesses/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: businessName,
            tagline: tagline,
            primary_color: primaryColor,
            google_review_url: googleReviewLink,
            phone_number: phoneNumber,
            whatsapp_number: whatsappNumber,
            address: address,
            city: city,
            area_locality: area,
            state: state,
            pincode: pincode,
            owner_email: ownerEmail,
            place_id: placeId,
            google_rating: googleRating,
            review_count: reviewCount,
            category: businessType,
            price_range: priceRange,
            cuisine_speciality: cuisine,
            dietary_options: dietaryOptions,
            signature_dish: signatureDish,
            highlighted_dishes: highlightedDishes,
            excluded_dishes: excludedDishes,
            experience_type: experienceType,
            welcome_message: welcomeMessage,
            ai_variant_count: aiVariants,
            review_language: reviewLanguage,
            business_hours: { opening: openingTime, closing: closingTime, days: daysOpen }
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || 'Failed to save business')
        }

        localStorage.removeItem('onboarding_progress') // Clear on success
        setShowQRPopup(true)
        setTimeout(() => setShowFinalQR(true), 2500)
      } catch (err) {
        console.error('Error saving business:', err)
        alert(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
  }, [currentStep, businessName, tagline, primaryColor, googleReviewLink, phoneNumber, whatsappNumber, address, city, area, state, pincode, ownerEmail, placeId, googleRating, reviewCount, businessType, priceRange, cuisine, dietaryOptions, signatureDish, highlightedDishes, excludedDishes, experienceType, welcomeMessage, aiVariants, reviewLanguage, openingTime, closingTime, daysOpen, loading, router])


  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/')
    }
  }, [currentStep, router])

  const getReviewUrl = useCallback(() => {
    const encoded = btoa(encodeURIComponent(JSON.stringify(simulationData)))
    return `${window.location.origin}/review?data=${encoded}`
  }, [simulationData])


  const downloadQR = (format: 'png' | 'svg') => {
    if (format === 'png') {
      const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement
      if (canvas) {
        const url = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = url
        a.download = `${businessName || 'glowqr'}-code.png`
        a.click()
      }
    } else {
      const svg = document.getElementById('qr-svg')
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg)
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${businessName || 'glowqr'}-code.svg`
        a.click()
      }
    }
  }

  // --- Render ---

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 flex flex-col selection:bg-[#6C63FF]/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6C63FF]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-6 lg:px-16 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 tracking-tighter">
            GlowQR
          </Link>
          <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
          <div className="hidden lg:flex items-center gap-1.5">
            {steps.map((step, i) => (
              <div key={`nav-${step.id}`} className="flex items-center gap-1.5">
                <motion.div 
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === currentStep ? 'bg-[#6C63FF] shadow-[0_0_12px_#6C63FF] w-6' : i < currentStep ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-white/10'
                  }`}
                />
                {i === currentStep && (
                  <motion.span 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-black uppercase tracking-widest text-white mr-2"
                  >
                    {step.title}
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all hover:bg-white/10">
            <Smartphone className="w-4 h-4" /> Exit to Dashboard
          </Link>
          <button onClick={() => router.push('/dashboard')} className="md:hidden text-xs font-bold text-slate-400 hover:text-white">Exit</button>
        </div>
      </nav>

      {/* Interactive Floating Indicators (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/80 border border-white/10 backdrop-blur-xl px-6 py-4 rounded-[2.5rem] flex items-center gap-4 shadow-2xl">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentStep ? 'bg-[#6C63FF] w-4' : i < currentStep ? 'bg-emerald-500' : 'bg-white/20'}`} />
          ))}
        </div>
        <div className="w-[1px] h-4 bg-white/10" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">
          Step {currentStep + 1}
        </span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col xl:flex-row gap-12 p-6 md:p-12 relative items-start">
        <AnimatePresence mode="wait">
          {!showQRPopup ? (
            <motion.div 
              key="wizard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              className="flex-1 w-full max-w-4xl"
            >
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-3">
                  <motion.span 
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1 bg-[#6C63FF]/10 text-[#6C63FF] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#6C63FF]/20"
                  >
                    Step {currentStep + 1} of 6
                  </motion.span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                <motion.h2 
                  key={`title-${currentStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none"
                >
                  {steps[currentStep].title}
                </motion.h2>
                <motion.p 
                  key={`subtitle-${currentStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 text-slate-400 text-lg max-w-2xl leading-relaxed"
                >
                  {steps[currentStep].subtitle}
                </motion.p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden group/container">
                {/* Background Accent for Step */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C63FF]/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                
                <AnimatePresence mode="sync">
                  <motion.div
                    key={`step-container-${currentStep}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {currentStep === 0 && (
                      <BusinessStep 
                        businessName={businessName} setBusinessName={setBusinessName}
                        tagline={tagline} setTagline={setTagline}
                        businessWebsite={businessWebsite} setBusinessWebsite={setBusinessWebsite}
                        googleReviewLink={googleReviewLink} setGoogleReviewLink={setGoogleReviewLink}
                        placeId={placeId} setPlaceId={setPlaceId}
                        googleRating={googleRating} setGoogleRating={setGoogleRating}
                        reviewCount={reviewCount} setReviewCount={setReviewCount}
                      />
                    )}

                    {currentStep === 1 && (
                      <LocationStep 
                        city={city} setCity={setCity}
                        area={area} setArea={setArea}
                        address={address} setAddress={setAddress}
                        state={state} setState={setState}
                        pincode={pincode} setPincode={setPincode}
                        phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                        whatsappNumber={whatsappNumber} setWhatsappNumber={setWhatsappNumber}
                        ownerEmail={ownerEmail} setOwnerEmail={setOwnerEmail}
                        openingTime={openingTime} setOpeningTime={setOpeningTime}
                        closingTime={closingTime} setClosingTime={setClosingTime}
                        daysOpen={daysOpen} setDaysOpen={setDaysOpen}
                      />
                    )}
                    {currentStep === 2 && (
                      <CategoryStep 
                        businessType={businessType} setBusinessType={setBusinessType}
                        priceRange={priceRange} setPriceRange={setPriceRange}
                        cuisine={cuisine} setCuisine={setCuisine}
                      />
                    )}
                    {currentStep === 3 && (
                      <MenuStep 
                        signatureDish={signatureDish} setSignatureDish={setSignatureDish}
                        highlightedDishes={highlightedDishes} setHighlightedDishes={setHighlightedDishes}
                      />
                    )}
                    {currentStep === 4 && (
                      <ExperienceStep 
                        experienceType={experienceType} setExperienceType={setExperienceType}
                        logoPreview={logoPreview} setLogoPreview={setLogoPreview}
                        primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
                      />
                    )}
                    {currentStep === 5 && (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="w-20 h-20 bg-[#6C63FF]/20 rounded-3xl flex items-center justify-center mb-6 border border-[#6C63FF]/30">
                          <CheckCircle2 className="w-10 h-10 text-[#6C63FF]" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Ready to launch?</h3>
                        <p className="text-slate-400 max-w-sm mb-10 leading-relaxed">
                          Your identity is complete. One click to generate your glowing QR code and review dashboard.
                        </p>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-4 w-full max-w-sm">
                          <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center">
                            <Layers className="w-5 h-5 text-slate-400" />
                          </div>
                          <div className="text-left flex-1">
                            <span className="block text-[10px] font-black uppercase text-slate-500 tracking-widest">Selected Tier</span>
                            <span className="block font-bold text-white">{experienceType === 'premium' ? 'Premium (Animated)' : 'Classic (Fast)'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <div className="mt-12 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-slate-400 rounded-2xl font-bold transition-all hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-0 pointer-events-auto"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={loading || (currentStep === 0 && !businessName)}
                  className="group px-10 py-4 bg-[#6C63FF] text-white rounded-2xl font-black text-lg transition-all hover:bg-[#5a52e0] hover:shadow-[0_0_40px_rgba(108,99,255,0.4)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-3 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? 'Generate Identity' : 'Continue'}
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center"
            >
              <AnimatePresence mode="wait">
                {!showFinalQR ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    className="flex flex-col items-center text-center py-20"
                  >
                    <div className="relative w-64 h-64 mb-12">
                      <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-[-10%] right-[-10%] h-1 bg-[#6C63FF] shadow-[0_0_30px_#6C63FF] z-20"
                      />
                      <div className="absolute inset-0 border-2 border-white/10 rounded-[3rem] p-10 flex items-center justify-center overflow-hidden">
                        <QRCodeSVG value="processing..." size={120} className="opacity-10 grayscale invert" />
                      </div>
                    </div>
                    <h2 className="text-4xl font-black text-white mb-4">Generating Your QR</h2>
                    <p className="text-slate-400 text-lg">Baking in your brand DNA and menu items...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full flex flex-col items-center pt-10"
                  >
                    <div className="bg-white/[0.03] border border-white/10 p-12 md:p-16 rounded-[4rem] backdrop-blur-3xl shadow-2xl flex flex-col items-center text-center w-full max-w-3xl">
                      <div className="w-24 h-24 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center mb-10 border border-emerald-500/30">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                      </div>
                      
                      <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Identity Ready</h2>
                      <p className="text-xl text-slate-400 mb-12 max-w-md mx-auto leading-relaxed">
                        Your custom QR for <span className="text-white font-bold">{businessName}</span> is live and ready for production.
                      </p>
                      
                      <div className="relative group mb-12">
                        <div className="absolute -inset-10 bg-[#6C63FF]/20 blur-[100px] rounded-full opacity-50" />
                        <div className="bg-white p-10 rounded-[3.5rem] relative shadow-2xl">
                          <QRCodeSVG id="qr-svg" value={getReviewUrl()} size={280} level="H" includeMargin={false} />
                          <div className="hidden">
                            <QRCodeCanvas id="qr-canvas" value={getReviewUrl()} size={1024} level="H" includeMargin={false} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
                        <button
                          onClick={() => downloadQR('png')}
                          className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-5 rounded-[2rem] font-bold text-lg transition-all"
                        >
                          <Download className="w-6 h-6" /> Get High-Res
                        </button>
                        <button
                          onClick={() => {
                            setIsSimulatingScan(true);
                            setIsScanningLocal(true);
                            setTimeout(() => setIsScanningLocal(false), 2500);
                          }}
                          className="flex items-center justify-center gap-3 bg-[#6C63FF] hover:bg-[#5a52e0] text-white py-5 rounded-[2rem] font-black text-lg shadow-[0_0_40px_rgba(108,99,255,0.4)] transition-all active:scale-95"
                        >
                          <Camera className="w-6 h-6" /> Simulate Scan
                        </button>
                      </div>

                      <button
                        onClick={() => router.push('/dashboard')}
                        className="mt-16 flex items-center gap-3 text-slate-500 hover:text-white font-black uppercase tracking-[0.4em] text-xs transition-colors group"
                      >
                        Enter Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Preview Sidebar - Only visible for wizard steps on desktop */}
        {!showQRPopup && (
          <LivePreviewCard 
            businessName={deferredName}
            tagline={deferredTagline}
            rating={deferredRating}
            primaryColor={deferredColor}
            logo={deferredLogo}
            category={deferredCategory}
          />
        )}

        {/* Scan Simulation Overlay */}
        <AnimatePresence>
          {isSimulatingScan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4"
            >
              <button 
                onClick={() => setIsSimulatingScan(false)}
                className="absolute top-10 right-10 text-white/40 hover:text-white transition-all z-[210] p-4 bg-white/5 rounded-full hover:rotate-90"
              >
                <Plus className="w-8 h-8 rotate-45" />
              </button>

              <motion.div 
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -100, opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-[380px] h-[780px] bg-[#0A0A0A] rounded-[4rem] border-[14px] border-[#1A1A1A] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#1A1A1A] rounded-b-3xl z-50" />

                <div className="flex-1 relative bg-white">
                  <AnimatePresence mode="wait">
                    {isScanningLocal ? (
                      <motion.div 
                        key="viewfinder"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-10 text-center"
                      >
                        <div className="relative w-64 h-64 border-2 border-white/5 rounded-[3.5rem] mb-12 flex items-center justify-center overflow-hidden">
                          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#6C63FF] rounded-tl-[3rem]" />
                          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#6C63FF] rounded-tr-[3rem]" />
                          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#6C63FF] rounded-bl-[3rem]" />
                          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#6C63FF] rounded-br-[3rem]" />
                          <motion.div 
                            animate={{ top: ['5%', '95%', '5%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-0 right-0 h-1 bg-[#6C63FF] shadow-[0_0_30px_#6C63FF] z-10"
                          />
                        </div>
                        <h3 className="text-white text-3xl font-black mb-2">QR Detected</h3>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">Launching Experience</p>
                      </motion.div>
                    ) : (
                      <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto">
                        <Suspense fallback={<div className="h-full flex items-center justify-center text-slate-900 font-bold">Loading Brand...</div>}>
                          <div className="h-full scale-[0.98] origin-top">
                            <ReviewFlow simulationData={simulationData} />
                          </div>
                        </Suspense>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <div className="h-20" />
    </div>
  )
}

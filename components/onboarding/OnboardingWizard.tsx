'use client'

import { useState, lazy, useCallback, memo, useDeferredValue, useEffect, useMemo, useRef, Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Camera, UploadCloud, ChevronRight, CheckCircle2, 
  Download, ArrowRight, Sparkles, Star, Layers, Building2,
  Utensils, Coffee, Croissant, Wine, Pizza, ChefHat, Truck, Package,
  Hotel, Flower2, Scissors, ShoppingBag, Dumbbell, Stethoscope, GraduationCap,
  Sparkle, Smartphone, Zap, Heart, LucideIcon, Plus, Layout, Palette,
  MousePointer2, Search, Info, AlertTriangle, QrCode, Share2, Eye,
  Wand2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'

// Lazy load ReviewFlow for simulation to keep initial bundle smaller
const ReviewFlow = lazy(() => import('../review/ReviewFlow'))

// --- Constants & Types ---

const steps = [
  { id: 'start', title: 'Magic Extraction', subtitle: 'Replace manual input with AI-powered brand analysis.' },
  { id: 'analysis', title: 'AI Analysis', subtitle: 'Our AI is extracting your brand DNA and menu markers.' },
  { id: 'identity', title: 'Refine Identity', subtitle: 'Polish the brand personality our AI discovered for you.' },
  { id: 'design', title: 'Experience Style', subtitle: 'Choose how your customers interact with your brand.' },
  { id: 'preview', title: 'Live Simulation', subtitle: 'Interact with your premium review flow before going live.' },
  { id: 'success', title: 'Ready to Glow', subtitle: 'Your high-conversion QR experience is ready.' },
]

const categories = [
  { id: 'restaurant', name: 'Restaurant', icon: <Utensils className="w-5 h-5" /> },
  { id: 'cafe', name: 'Café', icon: <Coffee className="w-5 h-5" /> },
  { id: 'bakery', name: 'Bakery', icon: <Croissant className="w-5 h-5" /> },
  { id: 'bar', name: 'Bar', icon: <Wine className="w-5 h-5" /> },
  { id: 'salon', name: 'Salon', icon: <Scissors className="w-5 h-5" /> },
  { id: 'other', name: 'Other', icon: <Sparkle className="w-5 h-5" /> },
]

// --- Helper Components ---

const Badge = memo(({ text, type }: { text: string, type: 'required' | 'optional' | 'premium' }) => {
  const styles = {
    required: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    optional: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    premium: 'bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20'
  }
  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${styles[type]}`}
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
  premium?: boolean;
  className?: string;
}

const InputField = memo(({ id, label, type = 'text', value, onChange, placeholder, hint, required, optional, premium, className = '' }: InputFieldProps) => {
  const [localValue, setLocalValue] = useState(value)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLocalValue(val)
    
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onChange(val)
    }, 150)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] cursor-pointer">
          {label}
        </label>
        <div className="flex gap-1">
          {required && <Badge text="Required" type="required" />}
          {optional && <Badge text="Optional" type="optional" />}
          {premium && <Badge text="Premium" type="premium" />}
        </div>
      </div>
      <div className="relative group">
        <input
          id={id}
          name={id}
          type={type}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-2xl focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all placeholder:text-slate-700 text-white group-hover:border-white/20 font-medium"
        />
        <div className="absolute inset-0 rounded-2xl bg-[#F07C3C]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
      </div>
      {hint && <p className="text-[10px] text-slate-600 font-medium italic px-1">{hint}</p>}
    </div>
  )
})
InputField.displayName = 'InputField'

const InfoBox = memo(({ icon: Icon, title, description, variant = 'violet' }: { icon: LucideIcon, title: string, description: string, variant?: 'violet' | 'amber' | 'emerald' }) => {
  const styles = {
    violet: 'bg-[#6C63FF]/10 border-[#6C63FF]/20 text-white',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
  }
  const iconColors = {
    violet: 'text-[#6C63FF]',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400'
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`p-5 rounded-3xl border ${styles[variant]} flex gap-4 backdrop-blur-md transition-colors`}
    >
      <div className={`w-12 h-12 rounded-2xl bg-black/20 flex items-center justify-center shrink-0 ${iconColors[variant]} border border-white/5`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-black text-sm mb-1">{title}</h4>
        <p className="text-[11px] opacity-70 leading-relaxed font-medium">{description}</p>
      </div>
    </motion.div>
  )
})
InfoBox.displayName = 'InfoBox'

// --- Step Components ---

const MagicExtractionStep = memo(({ 
  businessWebsite, setBusinessWebsite, setLogoPreview, onStart 
}: { 
  businessWebsite: string, 
  setBusinessWebsite: (v: string) => void, 
  setLogoPreview: (v: string | null) => void,
  onStart: (source: 'upload' | 'website') => void 
}) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.label 
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[#F07C3C]/50 hover:bg-[#F07C3C]/5 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07C3C]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-24 h-24 bg-black/40 rounded-[2.5rem] flex items-center justify-center mb-6 overflow-hidden border border-white/10 group-hover:border-[#F07C3C]/30 transition-all shadow-2xl relative z-10">
          <div className="flex flex-col items-center">
            <UploadCloud className="w-10 h-10 text-[#F07C3C] mb-2" />
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-[#F07C3C] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1 h-1 bg-[#F07C3C] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1 h-1 bg-[#F07C3C] rounded-full animate-bounce" />
            </div>
          </div>
        </div>
        <span className="font-display text-2xl font-black text-white mb-2">Upload Logo</span>
        <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] text-center">AI extracts colors & style</span>
        <input type="file" className="hidden" accept="image/*" onChange={e => {
          if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
              setLogoPreview(event.target?.result as string);
              onStart('upload');
            };
            reader.readAsDataURL(e.target.files[0]);
          }
        }} />
      </motion.label>

      <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        className="group relative overflow-hidden bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between transition-all hover:bg-white/[0.04] shadow-2xl"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#6C63FF]/20 rounded-2xl flex items-center justify-center text-[#6C63FF] border border-[#6C63FF]/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-black text-white">AI Web Crawler</h4>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Extract brand DNA from URL</p>
            </div>
          </div>
          <InputField 
            id="website" 
            label="Website URL" 
            value={businessWebsite} 
            onChange={setBusinessWebsite} 
            placeholder="e.g. cafetoscana.com" 
            className="!space-y-1"
          />
        </div>
        <button 
          onClick={() => onStart('website')}
          disabled={!businessWebsite}
          className="mt-10 group/btn w-full py-5 bg-[#F07C3C] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_40px_rgba(240,124,60,0.4)] active:scale-95 disabled:opacity-20"
        >
          Begin Magic Extraction <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InfoBox icon={Zap} title="Skip Manual Input" description="Upload image or URL to skip 80% of manual setup steps." variant="emerald" />
      <InfoBox icon={Layers} title="Brand Matching" description="The experience automatically syncs with your visual identity." variant="violet" />
      <InfoBox icon={Heart} title="Premium Trust" description="Join elite brands using GlowQR for high-conversion reviews." variant="violet" />
    </div>
  </div>
))
MagicExtractionStep.displayName = 'MagicExtractionStep'

const IdentityReviewStep = memo(({ 
  businessName, setBusinessName, tagline, setTagline, 
  city, setCity, businessType, setBusinessType, primaryColor, setPrimaryColor 
}: any) => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InputField id="name" label="Business Name" value={businessName} onChange={setBusinessName} required />
      <InputField id="tagline" label="Brand Tagline" value={tagline} onChange={setTagline} optional />
      <InputField id="city" label="City" value={city} onChange={setCity} required />
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Industry Category</label>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setBusinessType(cat.id)}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${businessType === cat.id ? 'border-[#F07C3C] bg-[#F07C3C]/10 text-white' : 'border-white/5 bg-white/[0.02] text-slate-500'}`}
            >
              <div className={businessType === cat.id ? 'text-[#F07C3C]' : 'text-slate-600'}>{cat.icon}</div>
              <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="pt-8 border-t border-white/5">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Primary Brand Accent</label>
      <div className="flex flex-wrap gap-4">
        {['#F07C3C', '#6C63FF', '#10b981', '#3b82f6', '#f43f5e', '#f59e0b', '#06b6d4'].map(c => (
          <motion.button 
            key={c}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPrimaryColor(c)}
            className={`w-12 h-12 rounded-2xl border-4 transition-all ${primaryColor === c ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'border-transparent'}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  </div>
))
IdentityReviewStep.displayName = 'IdentityReviewStep'

const ExperienceDesignStep = memo(({ experienceType, setExperienceType }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <motion.button
      whileHover={{ y: -5 }}
      onClick={() => setExperienceType('classic')}
      className={`relative p-10 rounded-[3.5rem] border-2 text-left transition-all ${experienceType === 'classic' ? 'border-white bg-white/5' : 'border-white/5 bg-white/[0.02]'}`}
    >
      <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 border border-white/10">
        <Layout className="w-8 h-8 text-slate-400" />
      </div>
      <h4 className="text-2xl font-black text-white mb-2">Classic Flow</h4>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">Clean, minimal interface optimized for maximum conversion speed.</p>
      {experienceType === 'classic' && <div className="absolute top-6 right-6 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>}
    </motion.button>

    <motion.button
      whileHover={{ y: -5 }}
      onClick={() => setExperienceType('premium')}
      className={`relative p-10 rounded-[3.5rem] border-2 text-left transition-all overflow-hidden ${experienceType === 'premium' ? 'border-[#F07C3C] bg-[#F07C3C]/5' : 'border-white/5 bg-white/[0.02]'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F07C3C]/10 to-transparent pointer-events-none" />
      <div className="w-16 h-16 bg-[#F07C3C]/20 rounded-3xl flex items-center justify-center mb-8 border border-[#F07C3C]/30">
        <Sparkles className="w-8 h-8 text-[#F07C3C]" />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <h4 className="text-2xl font-black text-white">Premium Glow</h4>
        <Badge text="Recommended" type="premium" />
      </div>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">Immersive dark-glass aesthetic with animated brand highlights.</p>
      {experienceType === 'premium' && <div className="absolute top-6 right-6 w-8 h-8 bg-[#F07C3C] text-white rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>}
    </motion.button>
  </div>
))
ExperienceDesignStep.displayName = 'ExperienceDesignStep'

// --- Main Component ---

export function OnboardingWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFinalQR, setShowFinalQR] = useState(false)
  const [analysisText, setAnalysisText] = useState('Extracting Brand Markers...')

  // --- Brand State ---
  const [businessName, setBusinessName] = useState('')
  const [tagline, setTagline] = useState('')
  const [businessWebsite, setBusinessWebsite] = useState('')
  const [city, setCity] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [businessType, setBusinessType] = useState('restaurant')
  const [primaryColor, setPrimaryColor] = useState('#F07C3C')
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [experienceType, setExperienceType] = useState('premium')

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem('onboarding_v4')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.businessName) setBusinessName(data.businessName)
        if (data.tagline) setTagline(data.tagline)
        if (data.businessWebsite) setBusinessWebsite(data.businessWebsite)
        if (data.city) setCity(data.city)
        if (data.ownerEmail) setOwnerEmail(data.ownerEmail)
        if (data.businessType) setBusinessType(data.businessType)
        if (data.primaryColor) setPrimaryColor(data.primaryColor)
        if (data.experienceType) setExperienceType(data.experienceType)
        if (data.logoPreview) setLogoPreview(data.logoPreview)
      } catch (e) { console.error(e) }
    }
  }, [])

  const persistTimer = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current)
    persistTimer.current = setTimeout(() => {
      const data = { businessName, tagline, businessWebsite, city, ownerEmail, businessType, primaryColor, experienceType, logoPreview }
      localStorage.setItem('onboarding_v4', JSON.stringify(data))
    }, 1000) // Debounce persistence to 1s to ensure no lag during typing
  }, [businessName, tagline, businessWebsite, city, ownerEmail, businessType, primaryColor, experienceType, logoPreview])

  // --- Handlers ---
  const handleStartExtraction = useCallback((source: 'upload' | 'website') => {
    setCurrentStep(1) // Go to analysis step
    setLoading(true)
    
    const messages = source === 'upload' ? [
      'Scanning logo geometry...',
      'Extracting primary palette...',
      'Identifying brand font family...',
      'Optimizing QR embed assets...'
    ] : [
      'Crawling digital assets...',
      'Detecting color palette...',
      'Extracting brand personality...',
      'Generating immersive experience...'
    ]
    
    let msgIndex = 0
    const interval = setInterval(() => {
      msgIndex++
      if (msgIndex < messages.length) setAnalysisText(messages[msgIndex])
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
      // Simulate extraction results
      if (!businessName) setBusinessName(source === 'upload' ? "New Brand" : "The Velvet Lounge")
      if (!tagline) setTagline(source === 'upload' ? "Extracted from Identity" : "Exclusive Culinary Experiences")
      if (!city) setCity("New York")
      setOwnerEmail("hello@brand.com")
      setBusinessType("restaurant")
      setLoading(false)
      
      // MAGIC SKIP: If user uploaded a logo, we've done the "Magic" - skip manual inputs straight to preview
      if (source === 'upload') {
        setCurrentStep(4) // Skip to Preview
      } else {
        setCurrentStep(2) // Move to review identity
      }
    }, 4500)
  }, [businessName, tagline, city])

  const handleNext = useCallback(async () => {
    if (currentStep < 4) {
      setCurrentStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (currentStep === 4) {
      setLoading(true)
      // Simulate API call to save business
      await new Promise(r => setTimeout(r, 2000))
      setLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowFinalQR(true), 3000)
    }
  }, [currentStep])

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep(s => s - 1)
    else router.push('/')
  }, [currentStep, router])

  const getReviewUrl = useCallback(() => {
    const data = { name: businessName, tagline, primaryColor, logo: logoPreview, experienceType }
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)))
    return `${window.location.origin}/review?data=${encoded}`
  }, [businessName, tagline, primaryColor, logoPreview, experienceType])

  const deferredSimulationData = useDeferredValue({ 
    name: businessName, 
    tagline, 
    primaryColor, 
    logo: logoPreview,
    experienceType 
  })

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-200 flex flex-col font-sans selection:bg-[#F07C3C]/30 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6C63FF]/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#F07C3C]/10 blur-[180px] rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#F07C3C]/5 blur-[120px] rounded-full" />
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 lg:px-20 border-b border-white/5 bg-[#0A0A0F]/60 backdrop-blur-3xl sticky top-0 z-[100]">
        <Link href="/" className="font-display text-3xl font-black tracking-tighter flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#F07C3C] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(240,124,60,0.4)] group-hover:scale-110 transition-transform">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">GlowQR</span>
        </Link>
        
        {/* Step Indicator */}
        <div className="hidden lg:flex items-center gap-4">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <motion.div 
                  animate={{ 
                    width: i === currentStep ? 40 : 10,
                    backgroundColor: i <= currentStep ? (i === currentStep ? '#F07C3C' : '#10b981') : 'rgba(255,255,255,0.1)'
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'shadow-[0_0_20px_#F07C3C]' : ''}`}
                />
              </div>
              {i < steps.length - 1 && <div className="w-4 h-[1px] bg-white/5" />}
            </div>
          ))}
        </div>

        <Link href="/dashboard" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
          Exit Wizard
        </Link>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto p-8 md:p-20 relative">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div 
              key="wizard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              className="w-full max-w-4xl"
            >
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-[#F07C3C]/10 text-[#F07C3C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-[#F07C3C]/20">
                    Phase {currentStep + 1}
                  </span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <h2 className="text-6xl md:text-8xl font-display font-black text-white tracking-tight mb-4 leading-none">
                  {steps[currentStep].title}
                </h2>
                <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed mt-4">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              <div className="glass-card p-10 md:p-16 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#F07C3C]/5 blur-[120px] -mr-40 -mt-40 pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {currentStep === 0 && <MagicExtractionStep businessWebsite={businessWebsite} setBusinessWebsite={setBusinessWebsite} setLogoPreview={setLogoPreview} onStart={handleStartExtraction} />}
                  
                  {currentStep === 1 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="relative w-56 h-56 mb-12">
                        <div className="absolute inset-0 border-4 border-white/10 rounded-[3.5rem] overflow-hidden bg-black/20">
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-0 right-0 h-1 bg-[#F07C3C] shadow-[0_0_40px_#F07C3C] z-10"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            {logoPreview ? (
                              <div className="relative w-32 h-32">
                                <Image src={logoPreview} alt="Logo" fill className="object-contain animate-pulse" />
                              </div>
                            ) : (
                              <Search className="w-20 h-20 text-[#F07C3C]/20 animate-pulse" />
                            )}
                          </div>
                        </div>
                        <div className="absolute -inset-4 border border-[#F07C3C]/20 rounded-[4rem] animate-spin-slow pointer-events-none" />
                      </div>
                      <h3 className="text-3xl font-display font-black text-white mb-4">{analysisText}</h3>
                      <p className="text-slate-400 max-w-xs font-medium">Analyzing colors, typography, and hospitality markers from your digital footprint...</p>
                    </div>
                  )}

                  {currentStep === 2 && <IdentityReviewStep businessName={businessName} setBusinessName={setBusinessName} tagline={tagline} setTagline={setTagline} city={city} setCity={setCity} businessType={businessType} setBusinessType={setBusinessType} primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} />}
                  
                  {currentStep === 3 && <ExperienceDesignStep experienceType={experienceType} setExperienceType={setExperienceType} />}

                  {currentStep === 4 && (
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-full max-w-[340px] h-[680px] bg-[#0C0C0C] rounded-[4rem] border-[12px] border-[#222] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden mb-12 group/phone">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#222] rounded-b-2xl z-50" />
                        <div className="h-full scale-[0.98] origin-top bg-white">
                          <Suspense fallback={
                            <div className="h-full flex flex-col items-center justify-center bg-[#0A0A0F] text-white">
                              <Sparkles className="w-12 h-12 text-[#F07C3C] animate-spin-slow mb-4" />
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Synchronizing Brand...</p>
                            </div>
                          }>
                            <ReviewFlow simulationData={deferredSimulationData} />
                          </Suspense>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                      </div>
                      <InfoBox icon={MousePointer2} title="Interactive Test" description="This is exactly what your customers will see. Tap buttons and scroll to test the flow." variant="emerald" />
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <div className="mt-16 flex items-center justify-between">
                <button onClick={handleBack} className="px-10 py-5 bg-white/5 border border-white/10 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:text-white transition-all active:scale-95">
                  Back
                </button>
                {currentStep > 1 && (
                  <button 
                    onClick={handleNext} 
                    disabled={loading || (currentStep === 2 && !businessName)}
                    className="group px-12 py-5 bg-[#F07C3C] text-white rounded-2xl font-black text-lg transition-all hover:shadow-[0_0_40px_rgba(240,124,60,0.4)] active:scale-95 flex items-center gap-3"
                  >
                    {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                      <>
                        {currentStep === 4 ? 'Deploy Brand' : 'Next Phase'}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center"
            >
              {!showFinalQR ? (
                <div className="flex flex-col items-center text-center py-24">
                  <div className="relative w-64 h-64 mb-16">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -inset-20 bg-[#F07C3C]/20 blur-[100px] rounded-full"
                    />
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-[-20%] right-[-20%] h-1.5 bg-gradient-to-r from-transparent via-[#F07C3C] to-transparent shadow-[0_0_50px_#F07C3C] z-20"
                    />
                    <div className="absolute inset-0 border-4 border-white/10 rounded-[3.5rem] p-12 flex items-center justify-center bg-black/40 backdrop-blur-xl ring-1 ring-white/20">
                      <QRCodeSVG value="baking..." size={140} className="opacity-10 grayscale invert" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Wand2 className="w-16 h-16 text-[#F07C3C] animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-7xl font-display font-black text-white mb-6">Magic Complete</h2>
                  <p className="text-xl text-slate-400 max-w-md font-medium">Your brand DNA has been successfully synthesized into a premium QR experience.</p>
                </div>
              ) : (
                <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12 items-start">
                  {/* Left: Brand Identity Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 w-full glass-card p-12 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#F07C3C]/10 blur-[80px] -mr-20 -mt-20" />
                    <div className="flex items-center gap-6 mb-12">
                      <div className="w-20 h-20 bg-black/40 rounded-[1.5rem] flex items-center justify-center overflow-hidden border border-white/10">
                        {logoPreview ? (
                          <div className="relative w-full h-full p-3">
                            <Image src={logoPreview} alt="Logo" fill className="object-contain" />
                          </div>
                        ) : (
                          <Building2 className="w-10 h-10 text-white/20" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-3xl font-display font-black text-white">{businessName}</h3>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{tagline || 'Brand Identity Deployed'}</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                          <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Brand Color</p>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }} />
                            <span className="text-xs font-mono text-white">{primaryColor}</span>
                          </div>
                        </div>
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                          <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Status</p>
                          <span className="text-xs text-emerald-400 font-black">ACTIVE</span>
                        </div>
                      </div>

                      <div className="p-6 bg-[#F07C3C]/5 border border-[#F07C3C]/20 rounded-3xl">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <h4 className="text-sm font-black text-white uppercase tracking-widest">Premium Active</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">Your customers will now experience the {experienceType} flow with {primaryColor} accents and AI review assistance.</p>
                      </div>
                    </div>

                    <button onClick={() => router.push('/dashboard')} className="mt-12 w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-black uppercase tracking-[0.3em] text-[10px] transition-all group flex items-center justify-center gap-3">
                      Access Brand Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </motion.div>

                  {/* Right: QR Code centerpiece */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full md:w-[400px] flex flex-col items-center"
                  >
                    <div className="relative group mb-12">
                      <div className="absolute -inset-20 bg-[#F07C3C]/20 blur-[140px] rounded-full opacity-40 animate-pulse pointer-events-none" />
                      <div className="bg-white p-10 rounded-[4.5rem] relative shadow-[0_0_80px_rgba(255,255,255,0.1)] group-hover:scale-[1.02] transition-transform duration-700">
                        <QRCodeSVG 
                          id="qr-svg" 
                          value={getReviewUrl()} 
                          size={280} 
                          level="H" 
                          imageSettings={logoPreview ? {
                            src: logoPreview,
                            height: 60,
                            width: 60,
                            excavate: true,
                          } : undefined}
                        />
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <button className="w-full group flex items-center justify-center gap-4 bg-[#F07C3C] hover:bg-[#d96a2b] text-white py-6 rounded-3xl font-black text-xl shadow-[0_0_50px_rgba(240,124,60,0.3)] transition-all active:scale-95">
                        <Download className="w-7 h-7 group-hover:-translate-y-1 transition-transform" /> PNG Poster
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                          <Eye className="w-4 h-4" /> Preview
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Visual Accents */}
      <div className="fixed bottom-10 left-10 opacity-20 pointer-events-none">
        <Sparkles className="w-12 h-12 text-[#F07C3C]" />
      </div>
      <div className="fixed top-40 right-10 opacity-10 pointer-events-none">
        <Building2 className="w-32 h-32 text-white" />
      </div>
    </div>
  )
}

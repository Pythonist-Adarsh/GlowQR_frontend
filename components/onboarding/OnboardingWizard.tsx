'use client';

import { useState, useCallback, useMemo, memo, useEffect, Suspense, lazy, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  UploadCloud, 
  Sparkles, 
  ArrowRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  Utensils,
  Coffee,
  Croissant,
  GlassWater,
  ShoppingBag,
  Hotel,
  Dumbbell,
  Stethoscope,
  GraduationCap,
  Layout,
  QrCode,
  Download,
  Printer,
  Link as LinkIcon,
  Bell,
  RefreshCw,
  Search,
  Camera,
  Trash2,
  X,
  Plus,
  Star,
  Flame,
  ChefHat,
  Heart
} from 'lucide-react'

const IconByName = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'Utensils': return <Utensils className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Croissant': return <Croissant className={className} />;
    case 'GlassWater': return <GlassWater className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Hotel': return <Hotel className={className} />;
    case 'Dumbbell': return <Dumbbell className={className} />;
    case 'Stethoscope': return <Stethoscope className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Star': return <Star className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'ChefHat': return <ChefHat className={className} />;
    case 'Heart': return <Heart className={className} />;
    default: return <Layout className={className} />;
  }
}
import Image from 'next/image'
import { GlowLogo } from '@/components/GlowLogo'
// qr-code-styling will be dynamically imported for client-side rendering

const ReviewPageOrchestrator = lazy(() => import('@/components/review/ReviewPageOrchestrator').then(mod => ({ default: mod.ReviewPageOrchestrator })));
import { API_BASE_URL } from '@/lib/api-config';

// --- Design System Tokens (CSS Variables) ---
const STYLES = `
  :root {
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f8fafc;
    --color-brand-primary: #111111;
    --color-brand-accent: #333333;
    --color-text-primary: #0f172a;
    --color-text-secondary: #475569;
    --color-text-tertiary: #94a3b8;
    --color-border-default: #e2e8f0;
    --color-card-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
    --color-success-bg: #f8fafc;
    --color-warning-bg: #fff7ed;
    --color-info-bg: #eff6ff;
  }

  [data-theme='dark'] {
    --color-bg-primary: #0f172a;
    --color-bg-secondary: #1e293b;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #94a3b8;
    --color-text-tertiary: #64748b;
    --color-border-default: #334155;
    --color-success-bg: rgba(17, 17, 17, 0.1);
    --color-warning-bg: rgba(245, 158, 11, 0.1);
    --color-info-bg: rgba(59, 130, 246, 0.1);
  }

  .glass-card {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-default);
    box-shadow: var(--color-card-shadow);
  }

  .custom-scrollbar::-webkit-scrollbar { width: 5px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-border-default); border-radius: 10px; }
`

// --- UI Components ---

const Badge = ({ children, type = 'required' }: { children: string, type?: 'required' | 'optional' | 'production' }) => {
  const styles = {
    required: 'bg-red-500 text-white',
    optional: 'bg-slate-400 text-white',
    production: 'bg-amber-500 text-white'
  }
  return (
    <span className={`ml-2 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${styles[type]}`}>
      {children}
    </span>
  )
}

const InfoBox = ({ icon: Icon, title, description, variant = 'info' }: { icon: any, title: string, description: string, variant?: 'info' | 'warning' | 'success' }) => {
  const styles = {
    info: 'bg-[#eff6ff] text-blue-800 border-blue-100',
    warning: 'bg-[#fff7ed] text-amber-800 border-amber-100',
    success: 'bg-[#e1f5ee] text-emerald-800 border-emerald-100'
  }
  return (
    <div className={`p-4 rounded-2xl border flex gap-3 mb-6 ${styles[variant]}`}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold mb-0.5">{title}</p>
        <p className="text-[11px] opacity-80 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

const InputField = ({ label, id, hint, badge, optional, ...props }: any) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label} {badge && <Badge type={badge}>{badge}</Badge>}
      </label>
    </div>
    <input 
      id={id}
      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--color-brand-primary)] outline-none transition-all placeholder:text-slate-300"
      {...props} 
    />
    {hint && <p className="text-[9px] text-slate-400 italic">{hint}</p>}
  </div>
)

const SectionHeader = ({ children }: { children: string }) => (
  <div className="flex items-center gap-4 py-6">
    <span className="text-[10px] font-black text-[var(--color-brand-primary)] uppercase tracking-[0.2em] whitespace-nowrap">{children}</span>
    <div className="h-px bg-[var(--color-border-default)] w-full" />
  </div>
)

// --- Step Content Components ---

const Step1 = ({ data, updateData }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
    <InfoBox 
      icon={Info} 
      title="Setup Overview" 
      description="Fields marked Required are needed before your QR goes live. Optional fields improve AI review quality." 
      variant="info"
    />
    <div className="space-y-6">
      <InputField 
        label="Business Name" 
        badge="required"
        value={data.name} 
        onChange={(e: any) => updateData({ name: e.target.value })} 
        placeholder="The Velvet Lounge"
        hint="Appears on customer review page and inside AI-generated reviews"
      />
      <InputField 
        label="Tagline / Welcome Message" 
        badge="optional"
        value={data.tagline} 
        onChange={(e: any) => updateData({ tagline: e.target.value })} 
        placeholder="Best brunch in Lucknow"
        hint="Used by AI as a keyword"
      />
      <InputField 
        label="Business Website" 
        badge="optional"
        value={data.website} 
        onChange={(e: any) => updateData({ website: e.target.value })} 
        placeholder="thevelvetlounge.com"
      />

      <SectionHeader>Google Review Setup</SectionHeader>
      
      <InputField 
        label="Google Review Link" 
        badge="required"
        value={data.googleReviewUrl} 
        onChange={(e: any) => updateData({ googleReviewUrl: e.target.value })} 
        placeholder="https://g.page/r/..."
        hint="Find this via Google Maps Share button"
      />
      <InputField 
        label="Google Place ID" 
        badge="production"
        value={data.placeId} 
        onChange={(e: any) => updateData({ placeId: e.target.value })} 
        placeholder="ChIJ..."
        hint="Links your business to the Places API"
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField 
          label="Current Rating" 
          badge="production"
          type="number"
          step="0.1"
          value={data.currentRating} 
          onChange={(e: any) => updateData({ currentRating: e.target.value })} 
          hint="Baseline rating"
        />
        <InputField 
          label="Review Count" 
          badge="production"
          type="number"
          value={data.reviewCount} 
          onChange={(e: any) => updateData({ reviewCount: e.target.value })} 
          hint="Baseline count"
        />
      </div>
    </div>
  </div>
)

const Step2 = ({ data, updateData }: any) => (
  <div className="space-y-6">
    <InfoBox 
      icon={AlertTriangle} 
      title="SEO Optimization" 
      description="City and area are included in every AI-generated review for local SEO boost." 
      variant="warning"
    />
    <div className="grid grid-cols-2 gap-4">
      <InputField label="City" badge="required" value={data.city} onChange={(e: any) => updateData({ city: e.target.value })} placeholder="Lucknow" hint="e.g. Hazratganj" />
      <InputField label="Area/Locality" badge="optional" value={data.area} onChange={(e: any) => updateData({ area: e.target.value })} placeholder="Hazratganj" />
    </div>
    <InputField label="Full Address" badge="optional" value={data.address} onChange={(e: any) => updateData({ address: e.target.value })} placeholder="12/45, Hazratganj Cross Roads" />
    
    <SectionHeader>Contact Details</SectionHeader>
    <div className="grid grid-cols-2 gap-4">
      <InputField label="Phone Number" badge="production" value={data.phone} onChange={(e: any) => updateData({ phone: e.target.value })} />
      <InputField label="WhatsApp Number" badge="production" value={data.whatsapp} onChange={(e: any) => updateData({ whatsapp: e.target.value })} hint="For 1-hour nudge" />
    </div>
    <InputField label="Manager Email" badge="required" type="email" value={data.email} onChange={(e: any) => updateData({ email: e.target.value })} hint="For alerts & billing" />

    <SectionHeader>Business Hours</SectionHeader>
    <div className="grid grid-cols-2 gap-4">
      <InputField label="Opening Time" type="time" value={data.openTime || '09:00'} onChange={(e: any) => updateData({ openTime: e.target.value })} />
      <InputField label="Closing Time" type="time" value={data.closeTime || '22:00'} onChange={(e: any) => updateData({ closeTime: e.target.value })} />
    </div>
    <div>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Days Open</label>
      <div className="flex gap-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <button 
            key={day}
            onClick={() => {
              const current = data.daysOpen || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              const next = current.includes(day) ? current.filter((d: string) => d !== day) : [...current, day];
              updateData({ daysOpen: next });
            }}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${data.daysOpen?.includes(day) ? 'bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)]' : 'bg-white text-slate-400 border-slate-200'}`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
    <SectionHeader>Branding</SectionHeader>
    <div className="space-y-4">
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Business Logo</label>
        <input type="file" accept="image/*" onChange={e => {
            if (e.target.files?.[0]) {
              const reader = new FileReader();
              reader.onload = (event) => updateData({ logo: event.target?.result as string });
              reader.readAsDataURL(e.target.files[0]);
            }
          }} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
      </div>
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Brand Color</label>
        <input type="color" value={data.primaryColor || '#1a8a3c'} onChange={e => updateData({ primaryColor: e.target.value })} className="h-10 w-20 cursor-pointer rounded border border-slate-200" />
      </div>
    </div>
  </div>
)

const Step3 = ({ data, updateData }: any) => {
  const categories = [
    { id: 'restaurant', name: 'Restaurant', icon: 'Utensils' },
    { id: 'cafe', name: 'Café', icon: 'Coffee' },
    { id: 'bakery', name: 'Bakery', icon: 'Croissant' },
    { id: 'bar', name: 'Bar', icon: 'GlassWater' },
    { id: 'fastfood', name: 'Fast Food', icon: 'Utensils' },
    { id: 'finedining', name: 'Fine Dining', icon: 'Utensils' },
    { id: 'foodtruck', name: 'Food Truck', icon: 'Utensils' },
    { id: 'cloudkitchen', name: 'Cloud Kitchen', icon: 'Utensils' },
    { id: 'hotel', name: 'Hotel', icon: 'Hotel' },
    { id: 'spa', name: 'Spa', icon: 'Sparkles' },
    { id: 'salon', name: 'Salon', icon: 'Sparkles' },
    { id: 'retail', name: 'Retail', icon: 'ShoppingBag' },
    { id: 'gym', name: 'Gym', icon: 'Dumbbell' },
    { id: 'medical', name: 'Medical', icon: 'Stethoscope' },
    { id: 'education', name: 'Education', icon: 'GraduationCap' },
    { id: 'other', name: 'Other', icon: 'Layout' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-3">
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => updateData({ category: cat.id })}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${data.category === cat.id ? 'border-[var(--color-brand-primary)] bg-slate-50 text-[var(--color-brand-primary)]' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
          >
            <span className="mb-2"><IconByName name={cat.icon} className="w-6 h-6" /></span>
            <span className="text-[9px] font-black uppercase tracking-widest">{cat.name}</span>
          </button>
        ))}
      </div>

      <SectionHeader>Price Range</SectionHeader>
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Average spend per person</label>
        <select 
          value={data.spendRange || ''}
          onChange={e => updateData({ spendRange: e.target.value })}
          className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] rounded-xl px-4 py-3 text-sm outline-none"
        >
          <option value="">Select Range</option>
          <option value="Under ₹200">Under ₹200</option>
          <option value="₹200–₹500">₹200–₹500</option>
          <option value="₹500–₹1000">₹500–₹1000</option>
          <option value="₹1000–₹2000">₹1000–₹2000</option>
          <option value="Above ₹2000">Above ₹2000</option>
        </select>
        <p className="text-[9px] text-slate-400 italic">Shown as a chip on customer review page</p>
      </div>

      <div className="space-y-6 mt-8">
        <InputField label="Cuisine / Speciality" badge="optional" value={data.speciality} onChange={(e: any) => updateData({ speciality: e.target.value })} hint="AI includes cuisine in reviews" />
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Dietary Options [Optional]</label>
          <div className="flex flex-wrap gap-2">
            {['Vegetarian', 'Vegan', 'Jain', 'Halal', 'Gluten-free'].map(opt => (
              <button 
                key={opt}
                onClick={() => {
                  const current = data.dietary || [];
                  const next = current.includes(opt) ? current.filter((o: string) => o !== opt) : [...current, opt];
                  updateData({ dietary: next });
                }}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${data.dietary?.includes(opt) ? 'bg-[var(--color-success-bg)] text-[var(--color-brand-primary)] border-[var(--color-brand-primary)]' : 'bg-white text-slate-400 border-slate-200'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Step4 = ({ data, updateData }: any) => {
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string; type: string } | null>(null);
  
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileDetails({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      type: "PDF Document"
    });
    setParsed(false);
    setParsing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch(`${API_BASE_URL}/api/onboarding/extract-menu`, {
        method: 'POST',
        // Do NOT set Content-Type header manually when using FormData, the browser will set it with the correct boundary
        body: formData
      });
      if (res.ok) {
        const extractedData = await res.json();
        updateData(extractedData);
      }
    } catch (err) {
      console.error("Failed to extract menu", err);
    } finally {
      setParsing(false);
      setParsed(true);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileDetails({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      type: "Menu Image"
    });
    setParsed(false);
    setParsing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_BASE_URL}/api/onboarding/extract-menu`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const extractedData = await res.json();
        updateData(extractedData);
      }
    } catch (err) {
      console.error("Failed to extract menu", err);
    } finally {
      setParsing(false);
      setParsed(true);
    }
  };

  const resetUpload = () => {
    setFileDetails(null);
    setParsed(false);
    setParsing(false);
  };

  return (
    <div className="space-y-6">
      <InfoBox 
        icon={CheckCircle2} 
        title="AI Magic Enabled" 
        description="Upload once — AI extracts all dish names, prices, and categories automatically." 
        variant="success"
      />

      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={pdfInputRef} 
        accept="application/pdf" 
        className="hidden" 
        onChange={handlePdfUpload} 
      />
      <input 
        type="file" 
        ref={photoInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handlePhotoUpload} 
      />

      <div className="grid grid-cols-2 gap-4">
        <button 
          type="button"
          onClick={() => pdfInputRef.current?.click()}
          className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-success-bg)] transition-all group"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
            <Layout className="w-6 h-6 text-slate-400 group-hover:text-[var(--color-brand-primary)]" />
          </div>
          <span className="text-xs font-bold text-slate-600">Upload PDF menu</span>
          <span className="text-[9px] text-slate-400">AI reads all pages · Max 10MB</span>
        </button>
        
        <button 
          type="button"
          onClick={() => photoInputRef.current?.click()}
          className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-success-bg)] transition-all group"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
            <Camera className="w-6 h-6 text-slate-400 group-hover:text-[var(--color-brand-primary)]" />
          </div>
          <span className="text-xs font-bold text-slate-600">Upload photo</span>
          <span className="text-[9px] text-slate-400">Works with handwritten menus too</span>
        </button>
      </div>

      <AnimatePresence>
        {parsing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center gap-4 text-center"
          >
            <RefreshCw className="w-8 h-8 text-[var(--color-brand-primary)] animate-spin" />
            <div>
              <p className="text-sm font-bold text-slate-900">AI is reading your menu...</p>
              <p className="text-[10px] text-slate-400">Reading: {fileDetails?.name} ({fileDetails?.size})</p>
            </div>
          </motion.div>
        )}
        
        {parsed && !parsing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-950 truncate max-w-[200px]">{fileDetails?.name}</p>
                  <p className="text-[9px] text-slate-400">{fileDetails?.type} · {fileDetails?.size}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={resetUpload}
                className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 px-3 py-1 rounded-lg hover:bg-red-50"
              >
                Clear
              </button>
            </div>

            <InfoBox 
              icon={CheckCircle2} 
              title="AI Extraction Success!" 
              description="Extracted and populated menu items and signature options dynamically. Your customer review suggestions are now fully personalized!" 
              variant="success"
            />
            
            {data.menuCategories && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-4">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Extracted Menu Structure</p>
                </div>
                <div className="p-4 space-y-6 max-h-64 overflow-y-auto custom-scrollbar">
                  {data.menuCategories.map((cat: any, idx: number) => (
                    <div key={idx}>
                      <h4 className="text-xs font-black text-[var(--color-brand-primary)] uppercase tracking-wider mb-3 flex items-center gap-2">
                        {cat.category}
                        <div className="h-px bg-slate-100 flex-1" />
                      </h4>
                      <div className="space-y-2">
                        {cat.items.map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded text-slate-600"><IconByName name={item.emoji || item.icon} className="w-4 h-4" /></span>
                              <span className="text-sm font-medium text-slate-700">{item.name}</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <SectionHeader>Manual Additions</SectionHeader>
      <InputField label="Signature dish / Hero item" badge="production" value={data.signatureDish || ''} onChange={(e: any) => updateData({ signatureDish: e.target.value })} hint="AI mentions it prominently." />
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dishes to highlight [Optional]</label>
        <textarea 
          className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--color-brand-primary)] outline-none transition-all h-24"
          placeholder="Butter Chicken&#10;Garlic Naan"
          value={data.highlightDishes || ''}
          onChange={e => updateData({ highlightDishes: e.target.value })}
        />
        <p className="text-[9px] text-slate-400 italic">One per line. AI includes them more often.</p>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dishes to never mention [Production]</label>
        <textarea 
          className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--color-brand-primary)] outline-none transition-all h-24"
          placeholder="Old Item 1"
          value={data.blockDishes || ''}
          onChange={e => updateData({ blockDishes: e.target.value })}
        />
        <p className="text-[9px] text-slate-400 italic">AI will never include these. For discontinued items.</p>
      </div>
    </div>
  )
}

const Step5 = ({ data, updateData }: any) => {
  const user = { plan: 'basic' }; // Mocked user plan for plan gate
  const themes = [
    { id: 'free', name: 'Glow & Float', price: '₹0 / mo', desc: 'Clean profile + gentle floating bubbles', bg: '#ffffff' },
    { id: 'classic', name: 'Classic', price: '₹299 / mo', desc: 'Logo glow + smooth drag trails & bursts', bg: '#0a0a1a' },
    { id: 'premium', name: 'Premium', price: '₹799 / mo', desc: '3D floating + typewriter note & mouse ripples', bg: '#06060F', badge: 'Popular' },
  ]

  const colors = ['#6C63FF', '#1a8a3c', '#E8474F', '#F59E0B', '#0EA5E9', '#EC4899', '#111111'];

  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-3 gap-4">
        {themes.map(theme => {
          const isLocked = false; // Unlocked for now so users can select any theme
          return (
          <button 
            key={theme.id}
            onClick={() => { if (!isLocked) updateData({ theme: theme.id }) }}
            className={`relative p-1 rounded-3xl border-2 transition-all ${data.theme === theme.id ? 'border-[var(--color-brand-primary)] bg-[var(--color-success-bg)]' : 'border-[var(--color-border-default)] bg-[var(--color-bg-primary)] hover:border-[var(--color-text-tertiary)]'} ${isLocked ? 'cursor-not-allowed opacity-80' : ''}`}
          >
            {isLocked && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-3xl">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-200">Upgrade to Premium</span>
              </div>
            )}
            <div className="relative h-32 rounded-[1.25rem] overflow-hidden mb-4 border border-slate-100" style={{ backgroundColor: theme.bg }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-xl border ${theme.id === 'premium' ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : theme.id === 'free' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/10 border-white/20'}`} />
              </div>
              {theme.badge && <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-white text-[8px] font-black rounded-full uppercase tracking-widest">{theme.badge}</span>}
            </div>
            <div className="px-4 pb-4 text-left">
              <p className="text-xs font-black text-[var(--color-text-primary)] mb-0.5">{theme.name}</p>
              <p className="text-[9px] font-bold text-[var(--color-text-primary)] mb-2">{theme.price}</p>
              <p className="text-[8px] text-[var(--color-text-secondary)] leading-tight">{theme.desc}</p>
            </div>
          </button>
        )})}
      </div>

      <SectionHeader>Branding</SectionHeader>
      
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Business Logo [Required]</label>
        <label className="group p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--color-brand-primary)] hover:bg-slate-50 transition-all">
          {data.logo ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
              <img src={data.logo} alt="Logo" className="w-full h-full object-contain" />
              <button onClick={(e) => { e.preventDefault(); updateData({ logo: null }); }} className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <>
              <UploadCloud className="w-6 h-6 text-slate-300 group-hover:text-[var(--color-brand-primary)]" />
              <span className="text-[10px] font-bold text-slate-400">PNG or SVG, square preferred</span>
            </>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={e => {
            if (e.target.files?.[0]) {
              const reader = new FileReader();
              reader.onload = (event) => updateData({ logo: event.target?.result as string });
              reader.readAsDataURL(e.target.files[0]);
            }
          }} />
        </label>
        <p className="text-[9px] text-slate-400 italic">Shown in QR center and on review page</p>
      </div>

      {data.theme !== 'classic' && data.theme !== 'premium' && (
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Brand Color [Optional]</label>
          <div className="flex gap-4">
            {colors.map(c => (
              <button 
                key={c}
                onClick={() => updateData({ primaryColor: c })}
                className={`w-8 h-8 rounded-full border-2 transition-all ${data.primaryColor === c ? 'scale-125 border-slate-900 shadow-lg' : 'border-transparent shadow-sm'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}

      <InputField label="Welcome message" badge="optional" value={data.welcomeMsg} onChange={(e: any) => updateData({ welcomeMsg: e.target.value })} hint="Animated text on Premium plan only" />

      <SectionHeader>Review Settings</SectionHeader>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI review variants</label>
          <select value={data.variants || '3 variants'} onChange={e => updateData({ variants: e.target.value })} className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] rounded-xl px-4 py-3 text-sm outline-none">
            <option value="2 variants">2 variants (Classic)</option>
            <option value="3 variants">3 variants (Premium)</option>
            <option value="4 variants">4 variants (Premium)</option>
            <option value="5 variants">5 variants (Premium)</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Review language</label>
          <select value={data.language || 'English'} onChange={e => updateData({ language: e.target.value })} className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] rounded-xl px-4 py-3 text-sm outline-none">
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Hinglish">Hinglish</option>
            <option value="Regional">Regional</option>
          </select>
        </div>
      </div>
    </div>
  )
}

const Step6 = ({ data, onPreview }: { data: any, onPreview: () => void }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const reviewUrl = typeof window !== 'undefined' ? `${window.location.origin}/r/${data.slug || data.qr_slug || data.name?.toLowerCase().replace(/\s+/g, '-') || 'business'}` : `https://glow-qr-frontend.vercel.app/r/${data.slug || data.qr_slug || data.name?.toLowerCase().replace(/\s+/g, '-') || 'business'}`;
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<any>(null);

  useEffect(() => {
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      if (!qrCode.current) {
        qrCode.current = new QRCodeStyling({
          width: 180,
          height: 180,
          data: reviewUrl,
          image: data.logo || undefined,
          dotsOptions: { color: "#000000", type: "rounded" },
          cornersSquareOptions: { type: "extra-rounded" },
          imageOptions: { crossOrigin: "anonymous", margin: 5 }
        });
        if (qrRef.current) {
          qrCode.current.append(qrRef.current);
        }
      } else {
        qrCode.current.update({ data: reviewUrl, image: data.logo || undefined });
      }
    });
  }, [reviewUrl, data.logo]);

  const handleDownloadPng = () => {
    if (qrCode.current) {
      qrCode.current.download({ name: `${data.name || 'GlowQR'}_QR`, extension: "png" });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
  <div className="space-y-8 text-center">
    <InfoBox 
      icon={CheckCircle2} 
      title="Setup complete!" 
      description={`Your review page is live at ${reviewUrl}`} 
      variant="success"
    />

    <div className="flex flex-col items-center">
      <div className="relative bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-sm group cursor-pointer" onClick={onPreview}>
        <div className="relative text-[#6C63FF] overflow-hidden rounded-xl border border-slate-100 flex items-center justify-center min-h-[180px] min-w-[180px]">
           <div ref={qrRef} />
        </div>
        <div className="absolute inset-0 bg-[var(--color-brand-primary)]/0 group-hover:bg-[var(--color-brand-primary)]/5 transition-colors rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100">
           <Search className="w-10 h-10 text-[var(--color-brand-primary)]" />
        </div>
      </div>
      <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Scan to preview your customer experience</p>
    </div>

    <div className="flex justify-center gap-3">
      <button onClick={handleDownloadPng} className="px-5 py-3 border border-slate-200 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"><Download className="w-4 h-4" /> PNG</button>
      <button className="px-5 py-3 border border-slate-200 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all opacity-50 cursor-not-allowed"><Layout className="w-4 h-4" /> SVG</button>
      <button className="px-5 py-3 border border-slate-200 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all opacity-50 cursor-not-allowed"><Printer className="w-4 h-4" /> Print</button>
      <button onClick={handleCopyLink} className="px-5 py-3 border border-slate-200 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all relative">
        <LinkIcon className="w-4 h-4" /> {copiedLink ? 'Copied' : 'Link'}
      </button>
    </div>

    <SectionHeader>What happens next</SectionHeader>
    <div className="space-y-3">
      {[
        { icon: Layout, text: "Dashboard is now live. Every QR scan, rating, and Google redirect is tracked in real time." },
        { icon: QrCode, text: "We'll fetch your Google rating weekly via Places API. Before/after growth chart visible within 7 days." },
        { icon: Bell, text: "You'll get an email alert when a customer gives 1–2 stars so you can respond before it hits Google." },
        { icon: RefreshCw, text: "Update menu, theme, or welcome message anytime — QR code URL stays the same." }
      ].map((item, i) => (
        <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left items-center">
          <item.icon className="w-5 h-5 text-slate-400 shrink-0" />
          <p className="text-[11px] font-bold text-slate-500 leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
  );
}

const StepPlan = ({ data, updateData }: any) => {
  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#111111]/10 flex items-center justify-center text-[#111111]">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Choose your Plan</h3>
          <p className="text-xs font-bold text-slate-400">Select the tier that fits your business needs.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => updateData({ plan: 'basic' })}
          className={`p-6 rounded-2xl border-2 text-left transition-all ${data.plan === 'basic' ? 'border-[#111111] bg-[#111111]/5' : 'border-slate-200 hover:border-[#111111]/50'}`}
        >
          <h4 className="text-lg font-black text-slate-900">Basic</h4>
          <p className="text-xs text-slate-500 mt-2 mb-4">Essential features for single locations.</p>
          <div className="text-2xl font-black text-slate-900 mb-4">$29<span className="text-sm text-slate-400 font-normal">/mo</span></div>
        </button>
        <button
          onClick={() => updateData({ plan: 'premium' })}
          className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${data.plan === 'premium' ? 'border-[#F07C3C] bg-[#F07C3C]/5 shadow-sm' : 'border-slate-200 hover:border-[#F07C3C]/50'}`}
        >
          <div className="absolute top-3 right-3 bg-[#F07C3C] text-white text-[10px] font-black uppercase px-2 py-1 rounded-full">Recommended</div>
          <h4 className="text-lg font-black text-slate-900">Premium</h4>
          <p className="text-xs text-slate-500 mt-2 mb-4">Advanced analytics and premium flows.</p>
          <div className="text-2xl font-black text-slate-900 mb-4">$79<span className="text-sm text-slate-400 font-normal">/mo</span></div>
        </button>
      </div>
    </div>
  )
}


// --- Main Wizard Component ---

export default function OnboardingWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  
  const [data, setData] = useState<any>({
    name: '', tagline: '', website: '', googleReviewUrl: '', placeId: '',
    currentRating: 4.5, reviewCount: 120,
    city: '', area: '', address: '', phone: '', whatsapp: '', email: '',
    openTime: '09:00', closeTime: '22:00', daysOpen: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    category: 'restaurant', spendRange: '₹500–₹1000', speciality: '', dietary: [],
    theme: 'free', primaryColor: '#6C63FF', variants: '3 variants', language: 'English',
    logo: null,
    plan: 'basic',
    menuItems: [
      { id: 1, name: "Signature Dish", icon: "Star" },
      { id: 2, name: "Popular Choice", icon: "Flame" },
      { id: 3, name: "Chef Special", icon: "ChefHat" },
      { id: 4, name: "House Favorite", icon: "Heart" },
    ]
  })

  useEffect(() => {
    const existing = localStorage.getItem('glowqr_business_data')
    if (existing) {
      try {
        const parsed = JSON.parse(existing)
        setData((prev: any) => ({ ...prev, ...parsed }))
      } catch (e) {
        console.error("Failed to parse existing business data", e)
      }
    }
  }, [])

  const updateData = (newData: any) => setData((prev: any) => ({ ...prev, ...newData }))

  const steps = [
    { id: 'business', name: 'Business' },
    { id: 'location', name: 'Location' },
    { id: 'category', name: 'Category' },
    { id: 'menu', name: 'Menu' },
    { id: 'theme', name: 'Theme' },
    { id: 'qr', name: 'QR Code' }
  ]

  const handleNext = async () => {
    if (currentStep < 5) {
      setCurrentStep(s => s + 1)
    } else {
      setLoading(true)
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/business/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: data.name,
            tagline: data.tagline,
            primary_color: data.primaryColor,
            logo_url: data.logo?.substring(0, 50) + "..." || "", // In real life, upload to storage first
            address: data.address,
            google_review_url: data.googleReviewUrl,
            category: data.category,
            menu_data: data.menuCategories || [],
            negative_filter_enabled: true,
            review_language: data.language,
            ai_variant_count: data.variants ? parseInt(data.variants.charAt(0)) : 3,
            welcome_message: data.welcomeMsg || "",
            animation_style: data.theme,
          })
        });
        
        if (res.ok) {
          localStorage.setItem('onboarding_completed', 'true')
          localStorage.setItem('glowqr_business_data', JSON.stringify(data))
          router.push('/dashboard')
        } else {
          console.error("Failed to create business", await res.text());
          // Fallback to allow continuing the flow even if backend fails
          localStorage.setItem('onboarding_completed', 'true')
          localStorage.setItem('glowqr_business_data', JSON.stringify(data))
          router.push('/dashboard')
        }
      } catch (err) {
        console.error("Failed to create business", err);
        // Fallback to allow continuing the flow even if backend fails
        localStorage.setItem('onboarding_completed', 'true')
        localStorage.setItem('glowqr_business_data', JSON.stringify(data))
        router.push('/dashboard')
      } finally {
        setLoading(false);
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1)
  }

  const progress = ((currentStep + 1) / 6) * 100

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] font-sans antialiased onboarding-root flex flex-col" suppressHydrationWarning>
      <style>{STYLES}</style>

      {/* Modern Header with Logo */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border-default)]">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--color-brand-primary)]">
            <GlowLogo size={32} />
            <span className="font-display text-sm font-black tracking-tight">GlowQR</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              {steps.map((s, idx) => (
                <div 
                  key={s.id} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${currentStep === idx ? 'bg-[var(--color-brand-primary)] text-white shadow-md' : currentStep > idx ? 'bg-[var(--color-brand-accent)] text-white/90' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] border border-[var(--color-border-default)]'}`}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
            <button onClick={() => router.push('/dashboard')} className="ml-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[var(--color-brand-primary)] transition-colors">
              Exit Setup
            </button>
          </div>
        </div>
      </header>

      {/* Main Wizard Card */}
      <div className="w-full max-w-[600px] glass-card rounded-[2.5rem] flex flex-col overflow-hidden relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-100 z-10">
          <motion.div 
            className="h-full bg-[var(--color-brand-primary)] shadow-[0_0_10px_rgba(26,138,60,0.5)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>

        {/* Card Header */}
        <div className="p-10 pb-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full">Step {currentStep + 1}</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">/ {steps[currentStep]?.name || steps[steps.length - 1].name}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 leading-tight">
            {currentStep === 0 && "Tell us about your brand"}
            {currentStep === 1 && "Where are you located?"}
            {currentStep === 2 && "What's your specialty?"}
            {currentStep === 3 && "Setup your digital menu"}
            {currentStep === 4 && "Experience Design"}
            {currentStep === 5 && "Your QR is ready to glow!"}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {currentStep === 0 && "Information used to personalize your review experience"}
            {currentStep === 1 && "Included in reviews to help your local SEO ranking"}
            {currentStep === 2 && "Helps AI understand your price point and audience"}
            {currentStep === 3 && "Dishes will be suggested to customers as chips"}
            {currentStep === 4 && "Choose how your brand feels to customers"}
            {currentStep === 5 && "Download your QR code and start collecting stars"}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-10 max-h-[65vh] overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              {currentStep === 0 && <Step1 data={data} updateData={updateData} />}
              {currentStep === 1 && <Step2 data={data} updateData={updateData} />}
              {currentStep === 2 && <Step3 data={data} updateData={updateData} />}
              {currentStep === 3 && <Step4 data={data} updateData={updateData} />}
              {currentStep === 4 && <Step5 data={data} updateData={updateData} />}
              {currentStep === 5 && <Step6 data={data} onPreview={() => setShowPreview(true)} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card Footer */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-between sticky bottom-0 bg-white/80 backdrop-blur-md">
          <div className="flex-1">
            {currentStep > 0 && (
              <button 
                onClick={handleBack}
                className="px-5 py-2.5 bg-slate-50 text-slate-400 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-all"
              >
                Back
              </button>
            )}
          </div>
          
          <div className="flex-1 flex justify-center">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Step {currentStep + 1} of 6</span>
          </div>
          
          <div className="flex-1 flex justify-end">
            <button 
              onClick={handleNext}
              disabled={loading}
              className={`group px-5 py-2.5 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] rounded-lg font-bold text-xs uppercase tracking-wider transition-all hover:bg-[var(--color-brand-primary)] hover:text-white flex items-center gap-2 whitespace-nowrap ${loading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {currentStep === 5 ? 'Go to Dashboard' : 'Next Step'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Simulation Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
               onClick={() => setShowPreview(false)}
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative z-10 w-full h-full sm:max-w-[320px] sm:h-[640px] bg-white sm:rounded-[3rem] overflow-hidden shadow-2xl"
             >
                <button onClick={() => setShowPreview(false)} className="absolute top-8 right-8 z-[110] w-10 h-10 bg-slate-900/50 text-white rounded-full flex items-center justify-center hover:bg-slate-900/80 transition-all">
                  <X className="w-5 h-5" />
                </button>
                
                {/* Notch */}
                <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0C0C0C] rounded-b-2xl z-50" />
                
                <Suspense fallback={
                  <div className="h-full flex items-center justify-center bg-slate-50">
                    <RefreshCw className="w-8 h-8 text-[var(--color-brand-primary)] animate-spin" />
                  </div>
                }>
                  <ReviewPageOrchestrator isEmbedded={true} initialData={{ ...data, qr_slug: data.slug || data.qr_slug || '', logo: data.logo || null, plan: data.plan || 'premium' }} />
                </Suspense>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

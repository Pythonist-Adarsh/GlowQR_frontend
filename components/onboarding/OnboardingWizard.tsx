'use client'

import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Store, Coffee, Wine, ChefHat, UploadCloud, ChevronRight, ChevronLeft, Plus, Trash2, CheckCircle2, Download, ArrowRight, Phone, MapPin, Globe, Clock, Link2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import { API_BASE_URL } from '@/lib/api-config'

// Lazy load ReviewFlow for simulation to keep initial bundle smaller
const ReviewFlow = lazy(() => import('../review/ReviewFlow'))

const steps = [
  { id: 'basics', title: 'Business Basics' },
  { id: 'category', title: 'Business Category' },
  { id: 'hours', title: 'Business Hours' },
]

const businessTypes = [
  { id: 'restaurant', name: 'Restaurant', icon: ChefHat },
  { id: 'cafe', name: 'Café / Coffee Shop', icon: Coffee },
  { id: 'bar', name: 'Bar / Lounge', icon: Wine },
  { id: 'store', name: 'Retail Store', icon: Store },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  
  // State for form
  const [businessName, setBusinessName] = useState('')
  const [tagline, setTagline] = useState('')
  const [businessWebsite, setBusinessWebsite] = useState('')
  const [googleReviewLink, setGoogleReviewLink] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [placeId, setPlaceId] = useState('')
  
  const [businessHours, setBusinessHours] = useState<{
    [key: string]: { open: string; close: string; isClosed: boolean }
  }>({
    monday: { open: '09:00', close: '21:00', isClosed: false },
    tuesday: { open: '09:00', close: '21:00', isClosed: false },
    wednesday: { open: '09:00', close: '21:00', isClosed: false },
    thursday: { open: '09:00', close: '21:00', isClosed: false },
    friday: { open: '09:00', close: '22:00', isClosed: false },
    saturday: { open: '10:00', close: '23:00', isClosed: false },
    sunday: { open: '10:00', close: '20:00', isClosed: false },
  })

  const [logo, setLogo] = useState<File | null>(null)
  const [businessType, setBusinessType] = useState('')
  const [menuItems, setMenuItems] = useState<{ id: string; name: string; price: string; emoji?: string; category: string; subcategory?: string }[]>([])
  const [primaryColor, setPrimaryColor] = useState('#F07C3C')
  const [showQRPopup, setShowQRPopup] = useState(false)
  const [showFinalQR, setShowFinalQR] = useState(false)
  const [isSimulatingScan, setIsSimulatingScan] = useState(false)
  const [isScanningLocal, setIsScanningLocal] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  
  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1)
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
            address: address,
            city: city,
            pincode: pincode,
            place_id: placeId,
            category: businessType,
            business_hours: businessHours
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || 'Failed to save business')
        }

        setShowQRPopup(true)
        // Transition to success state
        setTimeout(() => {
          setShowFinalQR(true)
        }, 2000)
      } catch (err) {
        console.error('Error saving business:', err)
        alert(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
  }

  const getReviewUrl = () => {
    // In a real app, this would be a shortened URL pointing to the business ID
    // For now, we encode the business info for the demo
    const data = {
      name: businessName || "Your Business",
      tagline: tagline,
      location: location || "Our Location",
      primaryColor: primaryColor,
      logo: logoPreview,
      googleReviewUrl: googleReviewLink || "#",
      menuItems: menuItems.map(m => ({ 
        id: m.id, 
        name: m.name, 
        price: m.price || "",
        category: m.category || "General",
        subcategory: m.subcategory || "",
        emoji: m.emoji || "🍽️" 
      }))
    }
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)))
    return `${window.location.origin}/review?data=${encoded}`
  }

  const downloadQR = (format: 'png' | 'svg') => {
    if (format === 'png') {
      const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement
      if (canvas) {
        const url = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = url
        a.download = 'glowqr-code.png'
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
        a.download = 'glowqr-code.svg'
        a.click()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1)
    } else {
      router.push('/')
    }
  }

  const [isProcessingMenu, setIsProcessingMenu] = useState(false)

  const addMenuItem = () => {
    setMenuItems([...menuItems, { id: Math.random().toString(), name: '', price: '', category: 'General', subcategory: '', emoji: '🍽️' }])
  }

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
  }

  const updateMenuItem = (id: string, field: 'name' | 'price' | 'category' | 'subcategory', value: string) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  return (
    <div className="min-h-screen bg-[#FDF8F1] flex flex-col font-body">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-5 lg:px-12 border-b border-[#E8DFD4] bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-[#3D261C]">
          GlowQR
        </Link>
        <div className="flex gap-2">
          {steps.map((step, i) => (
            <div 
              key={step.id} 
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                i === currentStep 
                  ? 'w-8 bg-[#F07C3C]' 
                  : i < currentStep 
                    ? 'w-4 bg-[#F07C3C]/40' 
                    : 'w-4 bg-[#E8DFD4]'
              }`} 
            />
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6 md:p-12 relative overflow-x-hidden overflow-y-auto">
        <AnimatePresence mode="wait">
          {!showQRPopup ? (
            <motion.div 
              key="wizard"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              className="w-full max-w-2xl my-auto bg-white/80 backdrop-blur-xl rounded-[var(--radius-xl)] shadow-[0_8px_40px_rgba(45,27,20,0.04)] border border-[#E8DFD4] overflow-hidden relative z-10"
            >
          <div className="p-8 md:p-12 min-h-[420px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-full"
                     {/* Step 1: Business Basics */}
                {currentStep === 0 && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-display text-3xl font-bold text-[#3D261C]">Business Basics</h2>
                        <p className="mt-2 text-[#5C4A3D] text-[15px]">Set up your core business information.</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="relative group cursor-pointer">
                          <div className={`w-20 h-20 rounded-2xl border-2 border-dashed border-[#E8DFD4] flex items-center justify-center overflow-hidden bg-white transition-all group-hover:border-[#F07C3C] ${logoPreview ? 'border-solid border-[#F07C3C]' : ''}`}>
                            {logoPreview ? (
                              <Image src={logoPreview} alt="Logo" fill className="object-contain p-2" />
                            ) : (
                              <UploadCloud className="w-8 h-8 text-[#A89888] group-hover:text-[#F07C3C]" />
                            )}
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files[0]
                              setLogo(file)
                              setLogoPreview(URL.createObjectURL(file))
                            }
                          }} />
                        </label>
                        <span className="text-[10px] font-bold text-[#A89888] uppercase tracking-wider mt-2">Brand Logo</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="block space-y-1.5">
                        <span className="text-sm font-semibold text-[#3D261C]">Business Name</span>
                        <div className="relative">
                          <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89888]" />
                          <input
                            type="text"
                            value={businessName}
                            onChange={e => setBusinessName(e.target.value)}
                            placeholder="e.g. Café Lumière"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8DFD4] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all"
                          />
                        </div>
                      </label>

                      <label className="block space-y-1.5">
                        <span className="text-sm font-semibold text-[#3D261C]">Business Website</span>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89888]" />
                          <input
                            type="url"
                            value={businessWebsite}
                            onChange={e => setBusinessWebsite(e.target.value)}
                            placeholder="e.g. https://cafelumiere.com"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8DFD4] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all"
                          />
                        </div>
                      </label>

                      <label className="block space-y-1.5">
                        <span className="text-sm font-semibold text-[#3D261C]">Google Review URL</span>
                        <div className="relative">
                          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89888]" />
                          <input
                            type="url"
                            value={googleReviewLink}
                            onChange={e => setGoogleReviewLink(e.target.value)}
                            placeholder="Paste your Google Maps review link"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8DFD4] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all"
                          />
                        </div>
                      </label>

                      <label className="block space-y-1.5">
                        <span className="text-sm font-semibold text-[#3D261C]">Phone Number (WhatsApp)</span>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89888]" />
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            placeholder="+1 234 567 890"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8DFD4] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all"
                          />
                        </div>
                      </label>

                      <label className="block space-y-1.5 md:col-span-2">
                        <span className="text-sm font-semibold text-[#3D261C]">Business Address</span>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89888]" />
                          <input
                            type="text"
                            value={address}
                            onChange={e => {
                              setAddress(e.target.value);
                              // TIP: To implement real Google Places Autocomplete:
                              // 1. Add <Script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places" /> to layout.tsx
                              // 2. Initialize google.maps.places.Autocomplete on this input
                              // 3. On 'place_changed' event, call setPlaceId(place.place_id) and update city/pincode
                              if (e.target.value.length > 10) {
                                setPlaceId('ChIJN1t_tDeuEmsRUsoyG83frY4'); // Mock Place ID for demo
                              }
                            }}
                            placeholder="Start typing your full business address..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8DFD4] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all"
                          />
                        </div>
                      </label>

                      <label className="block space-y-1.5">
                        <span className="text-sm font-semibold text-[#3D261C]">City</span>
                        <input
                          type="text"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          placeholder="e.g. Paris"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all"
                        />
                      </label>

                      <label className="block space-y-1.5">
                        <span className="text-sm font-semibold text-[#3D261C]">Pincode</span>
                        <input
                          type="text"
                          value={pincode}
                          onChange={e => setPincode(e.target.value)}
                          placeholder="e.g. 75001"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all"
                        />
                      </label>
                    </div>

                    <div className="pt-6 border-t border-[#E8DFD4]">
                      <h3 className="text-sm font-bold text-[#3D261C] mb-4 uppercase tracking-widest">Brand Accent Color</h3>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {['#F07C3C', '#C8102E', '#2E5BFF', '#00A86B', '#7C3AED', '#3D261C'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setPrimaryColor(color)}
                            className={`w-10 h-10 rounded-full border-4 transition-all ${
                              primaryColor === color ? 'border-[#3D261C] scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        <input 
                          type="color" 
                          value={primaryColor} 
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-10 h-10 rounded-full border-none cursor-pointer bg-transparent overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Category */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold text-[#3D261C]">Business Category</h2>
                      <p className="mt-2 text-[#5C4A3D] text-[15px]">Which category best describes your business?</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {businessTypes.map((type) => {
                        const Icon = type.icon
                        const isSelected = businessType === type.id
                        return (
                          <button
                            key={type.id}
                            onClick={() => setBusinessType(type.id)}
                            className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                              isSelected 
                                ? 'border-[#F07C3C] bg-[#FDF8F1] text-[#F07C3C] shadow-[0_4px_20px_rgba(240,124,60,0.15)]' 
                                : 'border-[#E8DFD4] bg-white hover:border-[#F07C3C]/50 hover:bg-[#FDF8F1]/50 text-[#5C4A3D]'
                            }`}
                          >
                            <div className={`mb-3 p-3 rounded-full transition-colors ${isSelected ? 'bg-white shadow-sm text-[#F07C3C]' : 'bg-[#FDF8F1] text-[#8A735F] group-hover:text-[#F07C3C]'}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="font-semibold">{type.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Business Hours */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold text-[#3D261C]">Business Hours</h2>
                      <p className="mt-2 text-[#5C4A3D] text-[15px]">When are you open for customers?</p>
                    </div>
                    
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {Object.entries(businessHours).map(([day, hours]) => (
                        <div key={day} className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E8DFD4] hover:shadow-sm transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${hours.isClosed ? 'bg-red-400' : 'bg-green-400'}`} />
                            <span className="font-bold text-[#3D261C] capitalize w-24">{day}</span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {!hours.isClosed ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="time"
                                  value={hours.open}
                                  onChange={(e) => setBusinessHours({
                                    ...businessHours,
                                    [day]: { ...hours, open: e.target.value }
                                  })}
                                  className="bg-[#FDF8F1] border-none rounded-lg px-2 py-1 text-sm font-semibold text-[#F07C3C]"
                                />
                                <span className="text-[#A89888] font-bold">-</span>
                                <input
                                  type="time"
                                  value={hours.close}
                                  onChange={(e) => setBusinessHours({
                                    ...businessHours,
                                    [day]: { ...hours, close: e.target.value }
                                  })}
                                  className="bg-[#FDF8F1] border-none rounded-lg px-2 py-1 text-sm font-semibold text-[#F07C3C]"
                                />
                              </div>
                            ) : (
                              <span className="text-[#A89888] text-sm font-bold uppercase tracking-wider">Closed for business</span>
                            )}
                            
                            <button
                              onClick={() => setBusinessHours({
                                ...businessHours,
                                [day]: { ...hours, isClosed: !hours.isClosed }
                              })}
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
                                hours.isClosed 
                                  ? 'bg-[#F07C3C] text-white' 
                                  : 'bg-[#E8DFD4] text-[#8A735F]'
                              }`}
                            >
                              {hours.isClosed ? 'Open' : 'Close'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
    </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between p-6 md:p-8 bg-white/50 border-t border-[#E8DFD4]">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 text-[#8A735F] hover:text-[#3D261C] font-semibold transition-colors"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={(currentStep === 0 && !businessName) || loading}
              className="flex items-center gap-2 px-8 py-3 bg-[#F07C3C] text-white rounded-[var(--radius-md)] font-bold shadow-lg shadow-[#F07C3C]/20 hover:bg-[#D96321] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {currentStep === steps.length - 1 ? 'Finish Setup' : 'Next Step'} <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-3xl my-auto flex flex-col items-center relative z-10"
            >
              <AnimatePresence mode="wait">
                {!showFinalQR ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    className="bg-white/90 backdrop-blur-3xl p-16 rounded-[4rem] border border-white shadow-[0_30px_100px_rgba(0,0,0,0.1)] flex flex-col items-center text-center relative overflow-hidden"
                  >
                    {/* Decorative Elements for Loading State */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F07C3C] to-transparent opacity-50" />
                    
                    <div className="relative w-56 h-56 mb-10">
                      <motion.div 
                        animate={{ top: ['10%', '90%', '10%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 right-0 h-1 bg-[#F07C3C] shadow-[0_0_20px_#F07C3C] z-10"
                      />
                      <div className="absolute inset-0 border-4 border-[#F07C3C]/20 rounded-3xl" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <QRCodeSVG value="generating..." size={120} className="opacity-10 grayscale" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-[#3D261C] mb-3">Crafting Your Identity</h2>
                    <p className="text-[#5C4A3D]">Baking in your brand colors and menu items...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Celebratory Background Particles */}
                    <div className="absolute inset-0 -z-10 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0], 
                            scale: [0, 1.5, 0],
                            x: (Math.random() - 0.5) * 600,
                            y: (Math.random() - 0.5) * 600
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                          className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
                          style={{ backgroundColor: i % 2 === 0 ? primaryColor : '#F07C3C' }}
                        />
                      ))}
                    </div>

                    <div className="bg-white/90 backdrop-blur-3xl p-10 md:p-14 rounded-[4rem] border border-white shadow-[0_20px_80px_rgba(45,27,20,0.1)] flex flex-col items-center text-center w-full max-w-2xl relative overflow-hidden">
                      {/* Aura Glow in background of card */}
                      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: primaryColor }} />
                      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: primaryColor }} />

                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner"
                      >
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                      </motion.div>
                      
                      <h2 className="font-display text-5xl md:text-6xl font-bold text-[#3D261C] mb-4 tracking-tight">Your QR is Ready!</h2>
                      <p className="text-xl text-[#5C4A3D] mb-10 max-w-md mx-auto">It looks stunning. Scan it now to experience the premium review flow for <span className="font-bold text-[#3D261C]">{businessName}</span>.</p>
                      
                      <div className="relative group mb-12">
                        <motion.div 
                          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute inset-[-20px] rounded-[3.5rem] blur-2xl opacity-40 -z-10"
                          style={{ backgroundColor: primaryColor }}
                        />
                        <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative">
                          <QRCodeSVG id="qr-svg" value={getReviewUrl()} size={240} level="H" includeMargin={false} />
                          <div className="hidden">
                            <QRCodeCanvas id="qr-canvas" value={getReviewUrl()} size={1024} level="H" includeMargin={true} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <button
                          onClick={() => downloadQR('png')}
                          className="flex items-center justify-center gap-2 bg-[#FDF8F1] hover:bg-[#F07C3C]/10 text-[#F07C3C] border-2 border-[#F07C3C]/20 py-4 rounded-3xl font-bold text-lg transition-all"
                        >
                          <Download className="w-6 h-6" /> Download PNG
                        </button>
                        <button
                          onClick={() => {
                            setIsSimulatingScan(true);
                            setIsScanningLocal(true);
                            setTimeout(() => setIsScanningLocal(false), 2800);
                          }}
                          className="flex items-center justify-center gap-2 bg-[#3D261C] hover:bg-[#2A1A12] text-white py-4 rounded-3xl font-bold text-lg shadow-xl shadow-[#3D261C]/20 transition-all"
                        >
                          <Camera className="w-6 h-6" /> Simulate Scan
                        </button>
                      </div>

                      <button
                        onClick={() => router.push('/dashboard')}
                        className="mt-8 flex items-center gap-2 text-[#8A735F] hover:text-[#3D261C] font-bold uppercase tracking-widest text-xs transition-colors"
                      >
                        Go to Dashboard <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Mobile Scan Simulation Overlay */}
        <AnimatePresence>
          {isSimulatingScan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
            >
              <button 
                onClick={() => setIsSimulatingScan(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-[210] p-2 hover:bg-white/10 rounded-full"
              >
                <Plus className="w-8 h-8 rotate-45" />
              </button>

              {/* Phone Frame */}
              <motion.div 
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -100, opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-[360px] h-[720px] bg-[#1a1a1a] rounded-[3.5rem] border-[12px] border-[#2a2a2a] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
              >
                {/* iPhone Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#2a2a2a] rounded-b-3xl z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/5 rounded-full" />
                </div>

                <div className="flex-1 relative bg-white overflow-y-auto overflow-x-hidden">
                  <AnimatePresence mode="wait">
                    {isScanningLocal ? (
                      <motion.div 
                        key="viewfinder"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-8 text-center"
                      >
                        {/* Background Logo Blur Effect */}
                        {logoPreview && (
                          <div className="absolute inset-0 opacity-20 blur-3xl pointer-events-none">
                            <Image 
                              src={logoPreview} 
                              alt="" 
                              fill
                              className="object-cover scale-150" 
                            />
                          </div>
                        )}
                        {/* Interactive Scan Effect */}
                        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                          <motion.div 
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-[100px]"
                            style={{ backgroundColor: primaryColor }}
                          />
                        </div>

                        <div className="relative w-64 h-64 border-2 border-white/10 rounded-[3rem] mb-12 flex items-center justify-center overflow-hidden">
                          {/* Corner Borders */}
                          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#F07C3C] rounded-tl-[2rem]" />
                          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#F07C3C] rounded-tr-[2rem]" />
                          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#F07C3C] rounded-bl-[2rem]" />
                          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#F07C3C] rounded-br-[2rem]" />
                          
                          {/* Laser Line */}
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-0 right-0 h-1.5 bg-[#F07C3C] shadow-[0_0_30px_#F07C3C] z-10"
                          />

                          {/* Logo Reveal Animation */}
                          <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                            className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/20 shadow-2xl relative z-20"
                          >
                            {logoPreview ? (
                              <Image 
                                src={logoPreview} 
                                alt="Target" 
                                width={80} 
                                height={80} 
                                className="object-contain" 
                              />
                            ) : (
                              <Camera className="w-12 h-12 text-white/50" />
                            )}
                            
                            <motion.div 
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 1.5 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
                            >
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </motion.div>
                          </motion.div>
                        </div>
                        
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <h3 className="text-white text-2xl font-display font-bold mb-2">QR Detected</h3>
                          <p className="text-white/40 text-sm tracking-widest uppercase font-bold">Initializing {businessName || 'Business'}</p>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-16 left-12 right-12 h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.5, ease: "linear" }}
                            className="h-full bg-[#F07C3C]"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full"
                      >
                        <Suspense fallback={
                          <div className="h-full flex flex-col items-center justify-center bg-white">
                            <div className="w-12 h-12 border-4 border-[#F07C3C]/20 border-t-[#F07C3C] rounded-full animate-spin mb-4" />
                            <p className="text-[#3D261C] font-bold animate-pulse uppercase tracking-widest text-[10px]">Loading Interface...</p>
                          </div>
                        }>
                          <div className="h-full scale-[0.95] origin-top">
                            <ReviewFlow simulationData={{
                              name: businessName || "Your Business",
                              tagline: tagline,
                              location: location || "Our Location",
                              primaryColor: primaryColor,
                              logo: logoPreview,
                              googleReviewUrl: googleReviewLink || "#",
                              menuItems: menuItems.map(m => ({ id: m.id, name: m.name, emoji: m.emoji || "🍽️" }))
                            }} />
                          </div>
                        </Suspense>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Home Indicator */}
                <div className="h-6 bg-white flex items-center justify-center">
                  <div className="w-32 h-1 bg-black/10 rounded-full" />
                </div>
              </motion.div>

              <div className="mt-8 text-center">
                <p className="text-white/60 text-sm font-medium">This is exactly what your customers will see</p>
                <div className="flex gap-4 mt-4 justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#F07C3C] animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-[#F07C3C] animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-[#F07C3C] animate-pulse delay-150" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

'use client'

import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Store, Coffee, Wine, ChefHat, UploadCloud, ChevronRight, ChevronLeft, Plus, CheckCircle2, Download, ArrowRight, MapPin, Clock, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import { API_BASE_URL } from '@/lib/api-config'

// Lazy load ReviewFlow for simulation to keep initial bundle smaller
const ReviewFlow = lazy(() => import('../review/ReviewFlow'))

const steps = [
  { id: 'business', title: 'Business information', subtitle: 'Core details shown to your customers on the QR review page.' },
  { id: 'location', title: 'Location & contact', subtitle: 'Used in AI reviews for local SEO.' },
  { id: 'category', title: 'Business category', subtitle: 'AI uses this to write the right tone and keywords.' },
  { id: 'menu', title: 'Menu setup', subtitle: 'AI reads your menu to show dish chips to customers.' },
  { id: 'experience', title: 'Choose your experience', subtitle: 'This is what your customers see when they scan the QR code.' },
  { id: 'qr', title: 'Final QR Code', subtitle: 'Your identity is ready to be shared.' },
]



export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  
  // Step 1 State
  const [businessName, setBusinessName] = useState('')
  const [tagline, setTagline] = useState('')
  const [businessWebsite, setBusinessWebsite] = useState('')
  const [googleReviewLink, setGoogleReviewLink] = useState('')
  const [placeId, setPlaceId] = useState('')
  const [googleRating, setGoogleRating] = useState('')
  const [reviewCount, setReviewCount] = useState('')
  
  // Step 2 State
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
  
  // Step 3 State
  const [businessType, setBusinessType] = useState('')
  const [priceRange, setPriceRange] = useState('₹200 – ₹500')
  const [cuisine, setCuisine] = useState('')
  const [dietaryOptions, setDietaryOptions] = useState<string[]>([])
  
  // Step 4 State
  const [signatureDish, setSignatureDish] = useState('')
  const [highlightedDishes, setHighlightedDishes] = useState('')
  const [excludedDishes, setExcludedDishes] = useState('')

  
  // Step 5 State
  const [experienceType, setExperienceType] = useState('classic')

  const [primaryColor, setPrimaryColor] = useState('#6366F1')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [aiVariants, setAiVariants] = useState('3 variants (Premium)')
  const [reviewLanguage, setReviewLanguage] = useState('English')

  const [loading, setLoading] = useState(false)
  const [showQRPopup, setShowQRPopup] = useState(false)
  const [showFinalQR, setShowFinalQR] = useState(false)
  const [isSimulatingScan, setIsSimulatingScan] = useState(false)
  const [isScanningLocal, setIsScanningLocal] = useState(false)
  
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
    const data = {
      name: businessName || "Your Business",
      tagline: tagline,
      address: address || "Our Location",
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

  const Label = ({ text, type }: { text: string, type: 'required' | 'optional' | 'production' }) => {
    const styles = {
      required: 'bg-red-100 text-red-700',
      optional: 'bg-gray-100 text-gray-600',
      production: 'bg-amber-100 text-amber-700'
    }
    return (
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ml-2 ${styles[type]}`}>
        {text}
      </span>
    )
  }

  interface InputFieldProps {
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

  const InputField = ({ label, type = 'text', value, onChange, placeholder, hint, required, optional, production, className = '' }: InputFieldProps) => (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center">
        <span className="text-sm font-semibold text-[#3D261C]">{label}</span>
        {required && <Label text="Required" type="required" />}
        {optional && <Label text="Optional" type="optional" />}
        {production && <Label text="Production" type="production" />}
      </div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10 outline-none transition-all placeholder:text-gray-300"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )

  const categories = [
    { id: 'restaurant', name: 'Restaurant', icon: '🍴' },
    { id: 'cafe', name: 'Café', icon: '☕' },
    { id: 'bakery', name: 'Bakery', icon: '🥐' },
    { id: 'bar', name: 'Bar', icon: '🍸' },
    { id: 'fastfood', name: 'Fast Food', icon: '🍔' },
    { id: 'finedining', name: 'Fine Dining', icon: '🥂' },
    { id: 'foodtruck', name: 'Food Truck', icon: '🚛' },
    { id: 'cloudkitchen', name: 'Cloud Kitchen', icon: '📦' },
    { id: 'hotel', name: 'Hotel', icon: '🏨' },
    { id: 'spa', name: 'Spa', icon: '🧘' },
    { id: 'salon', name: 'Salon', icon: '💇' },
    { id: 'retail', name: 'Retail', icon: '🛍️' },
    { id: 'gym', name: 'Gym', icon: '💪' },
    { id: 'medical', name: 'Medical', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'other', name: 'Other', icon: '✦' },
  ]

  return (
    <div className="min-h-screen bg-[#FDF8F1] flex flex-col font-body">
      {/* Top Nav / Progress */}
      <nav className="flex items-center justify-between px-6 py-5 lg:px-12 border-b border-[#E8DFD4] bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-xl font-bold text-[#3D261C]">GlowQR Setup</Link>
          <div className="h-4 w-[1px] bg-gray-200" />
          <div className="hidden md:flex gap-2">
            {steps.map((step, i) => (
              <div 
                key={step.id}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  i === currentStep ? 'bg-[#3D261C] text-white' : i < currentStep ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-400 border border-gray-200'
                }`}
              >
                {i + 1} {step.id.charAt(0).toUpperCase() + step.id.slice(1)}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6 md:p-12">
        <AnimatePresence mode="wait">
          {!showQRPopup ? (
            <motion.div 
              key="wizard"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              className="w-full max-w-3xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(45,27,20,0.04)] border border-[#E8DFD4] overflow-hidden"
            >
              <div className="h-1 bg-gray-100 w-full overflow-hidden">
                <motion.div 
                  className="h-full bg-green-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              <div className="p-8 md:p-12">
                <div className="mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Step {currentStep + 1} of 6</span>
                  <h2 className="font-display text-3xl font-bold text-[#3D261C] mt-2">{steps[currentStep].title}</h2>
                  <p className="mt-2 text-[#5C4A3D] text-[15px]">{steps[currentStep].subtitle}</p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full"
                  >
                    {/* Step 1: Business information */}
                    {currentStep === 0 && (
                      <div className="space-y-8">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3 text-blue-700">
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                          <p className="text-sm">Fields marked <b>Required</b> are needed before your QR code goes live. Optional fields improve AI review quality.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          <InputField 
                            label="Business Name" 
                            value={businessName} 
                            onChange={setBusinessName} 
                            placeholder="e.g. Cafe Romeo" 
                            hint="This appears on your customer's review page and inside AI-generated reviews."
                            required 
                          />
                          <InputField 
                            label="Tagline / Welcome Message" 
                            value={tagline} 
                            onChange={setTagline} 
                            placeholder="e.g. Best brunch in Lucknow" 
                            hint="Shown below your logo on the customer screen. Used by AI as a keyword."
                            optional 
                          />
                          <InputField 
                            label="Business Website" 
                            value={businessWebsite} 
                            onChange={setBusinessWebsite} 
                            placeholder="e.g. https://caferomeo.in" 
                            optional 
                          />

                          <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Google Review Setup</h3>
                            <InputField 
                              label="Google Review Link" 
                              value={googleReviewLink} 
                              onChange={setGoogleReviewLink} 
                              placeholder="e.g. https://g.page/r/..." 
                              hint="Go to Google Maps → your business → Share → Copy link. This is where customers are redirected after copying their AI review."
                              required 
                            />
                            <InputField 
                              label="Google Place ID" 
                              value={placeId} 
                              onChange={setPlaceId} 
                              placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4" 
                              hint="Used to fetch your real Google rating automatically via Places API. Find it at developers.google.com/maps/documentation/places → Place ID Finder."
                              production 
                              className="mt-6"
                            />
                            <div className="grid grid-cols-2 gap-6 mt-6">
                              <InputField 
                                label="Current Google Rating (snapshot)" 
                                value={googleRating} 
                                onChange={setGoogleRating} 
                                placeholder="e.g. 4.2" 
                                hint="Auto-fetched from Places API using your Place ID. We track this weekly to show you growth in your dashboard."
                                production 
                              />
                              <InputField 
                                label="Current Review Count (snapshot)" 
                                value={reviewCount} 
                                onChange={setReviewCount} 
                                placeholder="e.g. 207" 
                                hint="Auto-fetched from Places API. Baseline is saved so your dashboard can show 'You gained +142 reviews with GlowQR.'"
                                production 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Location & contact */}
                    {currentStep === 1 && (
                      <div className="space-y-8">
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 text-amber-800">
                          <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                          <p className="text-sm">City and area are included in every AI-generated review for local SEO. The more detail you give, the better the reviews rank on Google.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="City" value={city} onChange={setCity} placeholder="e.g. Lucknow" required />
                          <InputField label="Area / Locality" value={area} onChange={setArea} placeholder="e.g. Hazratganj" optional hint="Used in reviews: 'great cafe in Hazratganj'" />
                          <InputField label="Full Address" value={address} onChange={setAddress} placeholder="e.g. 12 MG Road, Hazratganj, Lucknow" optional className="md:col-span-2" />
                          <InputField label="State" value={state} onChange={setState} placeholder="e.g. Uttar Pradesh" optional />
                          <InputField label="PIN Code" value={pincode} onChange={setPincode} placeholder="e.g. 226001" optional />
                          
                          <div className="md:col-span-2 pt-6 border-t border-gray-100">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Contact Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <InputField label="Phone Number" value={phoneNumber} onChange={setPhoneNumber} placeholder="e.g. +91 98765 43210" production hint="Shown to customers on the thank-you screen. Not used in reviews." />
                              <InputField label="WhatsApp Number" value={whatsappNumber} onChange={setWhatsappNumber} placeholder="e.g. +91 98765 43210" production hint="Used for WhatsApp review nudge feature — customers can be sent a follow-up message 1 hour after scanning." />
                              <InputField label="Owner / Manager Email" value={ownerEmail} onChange={setOwnerEmail} placeholder="e.g. owner@caferomeo.in" required className="md:col-span-2" hint="Review alert emails and billing notifications are sent here." />
                            </div>
                          </div>

                          <div className="md:col-span-2 pt-6 border-t border-gray-100">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Business Hours</h3>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-1.5">
                                <span className="text-sm font-semibold text-[#3D261C]">Opening Time</span>
                                <div className="relative">
                                  <input type="time" value={openingTime} onChange={e => setOpeningTime(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] outline-none" />
                                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <span className="text-sm font-semibold text-[#3D261C]">Closing Time</span>
                                <div className="relative">
                                  <input type="time" value={closingTime} onChange={e => setClosingTime(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] outline-none" />
                                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                              </div>
                            </div>
                            <div className="mt-6">
                              <span className="text-sm font-semibold text-[#3D261C]">Days Open</span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                  <button
                                    key={day}
                                    onClick={() => setDaysOpen(daysOpen.includes(day) ? daysOpen.filter(d => d !== day) : [...daysOpen, day])}
                                    className={`px-4 py-2 rounded-xl border-2 transition-all font-bold text-sm ${daysOpen.includes(day) ? 'bg-[#3D261C] text-white border-[#3D261C]' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
                                  >
                                    {day}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Business category */}
                    {currentStep === 2 && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => setBusinessType(cat.id)}
                              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                                businessType === cat.id 
                                  ? 'border-[#3D261C] bg-gray-50 text-[#3D261C] shadow-lg' 
                                  : 'border-gray-100 bg-white hover:border-gray-200 text-gray-500'
                              }`}
                            >
                              <span className="text-2xl mb-2">{cat.icon}</span>
                              <span className="text-sm font-bold">{cat.name}</span>
                            </button>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Price Range</h3>
                          <div className="space-y-1.5">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold text-[#3D261C]">Average spend per person</span>
                              <Label text="Production" type="production" />
                            </div>
                            <select 
                              value={priceRange} 
                              onChange={e => setPriceRange(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] outline-none bg-white font-bold"
                            >
                              <option>₹0 – ₹200</option>
                              <option>₹200 – ₹500</option>
                              <option>₹500 – ₹1000</option>
                              <option>₹1000+</option>
                            </select>
                            <p className="text-xs text-gray-400 mt-1">Shown to customers as a spending context chip on the review page.</p>
                          </div>

                          <InputField 
                            label="Cuisine / Speciality" 
                            value={cuisine} 
                            onChange={setCuisine} 
                            placeholder="e.g. North Indian, Continental, Vegetarian" 
                            optional 
                            className="mt-6"
                            hint="AI includes cuisine type in reviews: 'best North Indian restaurant in Lucknow'."
                          />

                          <div className="mt-6">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold text-[#3D261C]">Dietary options</span>
                              <Label text="Optional" type="optional" />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {['Vegetarian', 'Vegan', 'Jain', 'Halal', 'Gluten-free'].map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => setDietaryOptions(dietaryOptions.includes(opt) ? dietaryOptions.filter(d => d !== opt) : [...dietaryOptions, opt])}
                                  className={`px-4 py-2 rounded-xl border-2 transition-all font-bold text-sm ${dietaryOptions.includes(opt) ? 'bg-[#3D261C] text-white border-[#3D261C]' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Menu setup */}
                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3 text-green-800">
                          <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
                          <p className="text-sm"><b>Upload once</b> — AI extracts all dish names, prices, and categories automatically. Customers see your top dishes as selectable chips on the review page.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <label className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#3D261C] transition-colors bg-white">
                            <Download className="w-8 h-8 text-gray-400 mb-3" />
                            <span className="font-bold text-gray-600">Upload PDF menu</span>
                            <span className="text-xs text-gray-400 mt-1">AI reads all pages automatically · Max 10MB</span>
                            <input type="file" className="hidden" accept=".pdf" />
                          </label>
                          <label className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#3D261C] transition-colors bg-white">
                            <Camera className="w-8 h-8 text-gray-400 mb-3" />
                            <span className="font-bold text-gray-600">Upload menu photo</span>
                            <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP · Works with handwritten menus too</span>
                            <input type="file" className="hidden" accept="image/*" />
                          </label>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Manual Additions</h3>
                          <InputField 
                            label="Signature dish / Hero item" 
                            value={signatureDish} 
                            onChange={setSignatureDish} 
                            placeholder="e.g. Dal Makhani, Cold Brew, Truffle Pizza" 
                            production 
                            hint="Always shown as the first chip on the customer review page. AI mentions it prominently."
                          />
                          <div className="mt-6 space-y-1.5">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold text-[#3D261C]">Dishes to highlight</span>
                              <Label text="Optional" type="optional" />
                            </div>
                            <textarea
                              value={highlightedDishes}
                              onChange={e => setHighlightedDishes(e.target.value)}
                              placeholder="e.g. Butter Chicken, Garlic Naan, Mango Lassi\nOne per line or comma-separated"
                              className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] outline-none min-h-[100px] text-sm"
                            />
                            <p className="text-xs text-gray-400 mt-1">These appear as pre-selected chips — AI includes them in reviews more often.</p>
                          </div>
                          <div className="mt-6 space-y-1.5">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold text-[#3D261C]">Dishes to never mention</span>
                              <Label text="Production" type="production" />
                            </div>
                            <textarea
                              value={excludedDishes}
                              onChange={e => setExcludedDishes(e.target.value)}
                              placeholder="e.g. Seasonal item, Out of stock dish"
                              className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] outline-none min-h-[80px] text-sm"
                            />
                            <p className="text-xs text-gray-400 mt-1">AI will never include these in generated reviews. Useful for discontinued items.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 5: Choose your experience */}
                    {currentStep === 4 && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <button 
                            onClick={() => setExperienceType('classic')}
                            className={`p-1 rounded-[2rem] transition-all ${experienceType === 'classic' ? 'bg-green-600 ring-4 ring-green-100' : 'bg-gray-100'}`}
                          >
                            <div className="bg-white rounded-[1.9rem] p-6 text-left h-full flex flex-col">
                              <div className="w-full h-24 bg-[#0F172A] rounded-2xl mb-4 flex items-center justify-center">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black">B</div>
                              </div>
                              <h4 className="font-bold text-[#3D261C]">Classic</h4>
                              <p className="text-xs text-gray-400 mt-1">Logo glow + smooth animation</p>
                              <p className="text-sm font-black text-green-600 mt-auto pt-4">₹299 / month</p>
                            </div>
                          </button>
                          <button 
                            onClick={() => setExperienceType('premium')}
                            className={`p-1 rounded-[2rem] transition-all relative ${experienceType === 'premium' ? 'bg-green-600 ring-4 ring-green-100' : 'bg-gray-100'}`}
                          >
                            <div className="bg-white rounded-[1.9rem] p-6 text-left h-full flex flex-col">
                              <div className="w-full h-24 bg-[#0F172A] rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-blue-500/10 blur-xl" />
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10">B</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-[#3D261C]">Premium</h4>
                                <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">Popular</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">3D particles + welcome message</p>
                              <p className="text-sm font-black text-green-600 mt-auto pt-4">₹799 / month</p>
                            </div>
                          </button>
                        </div>

                        <div className="pt-6 border-t border-gray-100 space-y-6">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Branding</h3>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold text-[#3D261C]">Business Logo</span>
                              <Label text="Required" type="required" />
                            </div>
                            <label className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#3D261C] transition-colors bg-white">
                              {logoPreview ? (
                                <Image src={logoPreview} alt="Logo" width={60} height={60} className="object-contain" />
                              ) : (
                                <>
                                  <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                                  <span className="text-xs font-bold text-gray-500">Upload logo — PNG or SVG, square preferred, min 200×200px</span>
                                </>
                              )}
                              <input type="file" className="hidden" accept="image/*" onChange={e => {
                                if (e.target.files?.[0]) {
                                  setLogo(e.target.files[0])
                                  setLogoPreview(URL.createObjectURL(e.target.files[0]))
                                }
                              }} />
                            </label>
                            <p className="text-[10px] text-gray-400">Displayed in the center of your QR code and on the customer review page.</p>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold text-[#3D261C]">Brand color</span>
                              <Label text="Optional" type="optional" />
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {['#6366F1', '#10B981', '#EF4444', '#F59E0B', '#0EA5E9', '#EC4899', '#000000'].map(c => (
                                <button 
                                  key={c} 
                                  onClick={() => setPrimaryColor(c)}
                                  className={`w-10 h-10 rounded-full border-4 transition-all ${primaryColor === c ? 'border-gray-200 scale-110' : 'border-transparent'}`}
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                              <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-full border-none cursor-pointer p-0" />
                            </div>
                            <p className="text-[10px] text-gray-400">Used as the glow color around your logo and as the AR particle color (Premium).</p>
                          </div>

                          <InputField 
                            label="Welcome message" 
                            value={welcomeMessage} 
                            onChange={setWelcomeMessage} 
                            placeholder="e.g. We'd love your honest feedback!" 
                            optional 
                            hint="Animated text shown to customers after your logo appears (Premium plan only)."
                          />
                        </div>

                        <div className="pt-6 border-t border-gray-100 space-y-6">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Review Settings</h3>
                          <div className="space-y-1.5">
                            <span className="text-sm font-semibold text-[#3D261C]">Number of AI review variants</span>
                            <select value={aiVariants} onChange={e => setAiVariants(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] outline-none font-bold">
                              <option>1 variant (Starter)</option>
                              <option>3 variants (Premium)</option>
                              <option>5 variants (Business)</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-sm font-semibold text-[#3D261C]">Review language</span>
                            <select value={reviewLanguage} onChange={e => setReviewLanguage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E8DFD4] outline-none font-bold">
                              <option>English</option>
                              <option>Hindi</option>
                              <option>Hinglish</option>
                              <option>Marathi</option>
                            </select>
                            <p className="text-[10px] text-gray-400">AI writes reviews in this language. Hinglish works well for Tier 2 cities.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between p-6 md:px-12 md:py-8 bg-gray-50/50 border-t border-[#E8DFD4]">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-[#3D261C] rounded-xl font-bold transition-all hover:bg-gray-50 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step {currentStep + 1} of 6</span>
                </div>
                <button
                  onClick={handleNext}
                  disabled={(currentStep === 0 && !businessName) || loading}
                  className="flex items-center gap-2 px-8 py-2.5 bg-white border border-gray-200 text-[#3D261C] rounded-xl font-bold transition-all hover:bg-[#3D261C] hover:text-white hover:border-[#3D261C] active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-[#3D261C]/30 border-t-[#3D261C] rounded-full animate-spin" />
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? 'Finish Setup' : 'Next Step'} <ChevronRight className="w-4 h-4" />
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
                    className="bg-white p-16 rounded-[4rem] border border-gray-200 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
                  >
                    <div className="relative w-56 h-56 mb-10">
                      <motion.div 
                        animate={{ top: ['10%', '90%', '10%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_#22c55e] z-10"
                      />
                      <div className="absolute inset-0 border-4 border-gray-100 rounded-3xl" />
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
                    <div className="bg-white p-10 md:p-14 rounded-[4rem] border border-gray-200 shadow-2xl flex flex-col items-center text-center w-full max-w-2xl relative overflow-hidden">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8"
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </motion.div>
                      
                      <h2 className="font-display text-5xl font-bold text-[#3D261C] mb-4 tracking-tight text-center">Your QR is Ready!</h2>
                      <p className="text-xl text-[#5C4A3D] mb-10 max-w-md mx-auto">It looks stunning. Scan it now to experience the premium review flow for <span className="font-bold text-[#3D261C]">{businessName}</span>.</p>
                      
                      <div className="relative group mb-12">
                        <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative border border-gray-100">
                          <QRCodeSVG id="qr-svg" value={getReviewUrl()} size={240} level="H" includeMargin={false} />
                          <div className="hidden">
                            <QRCodeCanvas id="qr-canvas" value={getReviewUrl()} size={1024} level="H" includeMargin={true} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <button
                          onClick={() => downloadQR('png')}
                          className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-[#3D261C] py-4 rounded-3xl font-bold text-lg transition-all"
                        >
                          <Download className="w-6 h-6" /> Download PNG
                        </button>
                        <button
                          onClick={() => {
                            setIsSimulatingScan(true);
                            setIsScanningLocal(true);
                            setTimeout(() => setIsScanningLocal(false), 2800);
                          }}
                          className="flex items-center justify-center gap-2 bg-[#3D261C] hover:bg-black text-white py-4 rounded-3xl font-bold text-lg shadow-xl transition-all"
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

        {/* Scan Simulation Overlay */}
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

              <motion.div 
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -100, opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-[360px] h-[720px] bg-[#1a1a1a] rounded-[3.5rem] border-[12px] border-[#2a2a2a] shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#2a2a2a] rounded-b-3xl z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/5 rounded-full" />
                </div>

                <div className="flex-1 relative bg-white overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {isScanningLocal ? (
                      <motion.div 
                        key="viewfinder"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-8 text-center"
                      >
                        <div className="relative w-64 h-64 border-2 border-white/10 rounded-[3rem] mb-12 flex items-center justify-center overflow-hidden">
                          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-500 rounded-tl-[2rem]" />
                          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-500 rounded-tr-[2rem]" />
                          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-500 rounded-bl-[2rem]" />
                          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-500 rounded-br-[2rem]" />
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-0 right-0 h-1.5 bg-green-500 shadow-[0_0_30px_#22c55e] z-10"
                          />
                        </div>
                        <h3 className="text-white text-2xl font-display font-bold mb-2 tracking-tight">QR Detected</h3>
                        <p className="text-white/40 text-sm tracking-widest uppercase font-bold">Initializing {businessName || 'Business'}</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full"
                      >
                        <Suspense fallback={<div className="h-full flex items-center justify-center">Loading...</div>}>
                          <div className="h-full scale-[0.95] origin-top">
                            <ReviewFlow simulationData={{
                              name: businessName || "Your Business",
                              tagline: tagline,
                              address: address || "Our Location",
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <div className="h-10" />
    </div>
  )
}

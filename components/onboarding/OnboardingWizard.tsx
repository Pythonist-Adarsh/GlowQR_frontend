'use client'

import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Store, Coffee, Wine, ChefHat, UploadCloud, ChevronRight, ChevronLeft, Plus, Trash2, CheckCircle2, Download, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'

// Lazy load ReviewFlow for simulation to keep initial bundle smaller
const ReviewFlow = lazy(() => import('../review/ReviewFlow'))

const steps = [
  { id: 'basics', title: 'Basic Info' },
  { id: 'logo', title: 'Logo Setup' },
  { id: 'type', title: 'Business Type' },
  { id: 'menu', title: 'Menu Items' },
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
  const [location, setLocation] = useState('')
  const [googleReviewLink, setGoogleReviewLink] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [businessType, setBusinessType] = useState('')
  const [menuItems, setMenuItems] = useState<{ id: string; name: string; price: string; emoji?: string; category: string; subcategory?: string }[]>([])
  const [primaryColor, setPrimaryColor] = useState('#F07C3C')
  const [showQRPopup, setShowQRPopup] = useState(false)
  const [showFinalQR, setShowFinalQR] = useState(false)
  const [isSimulatingScan, setIsSimulatingScan] = useState(false)
  const [isScanningLocal, setIsScanningLocal] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  
  const router = useRouter()
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1)
    } else {
      setShowQRPopup(true)
      // Transition to success state
      setTimeout(() => {
        setShowFinalQR(true)
      }, 2000)
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
              >
                {/* Step 1: Basics */}
                {currentStep === 0 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold text-[#3D261C]">Welcome! Let&apos;s get started</h2>
                      <p className="mt-2 text-[#5C4A3D] text-[15px]">Tell us the name of your business and an optional tagline.</p>
                    </div>
                    
                    <div className="space-y-5">
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#3D261C] mb-1.5">Business Name</span>
                        <input
                          type="text"
                          value={businessName}
                          onChange={e => setBusinessName(e.target.value)}
                          placeholder="e.g. Café Lumière"
                          className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3.5 text-[15px] text-[#3D261C] outline-none transition-all placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10"
                        />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#3D261C] mb-1.5">Tagline <span className="text-[#A89888] font-normal">(Optional)</span></span>
                        <input
                          type="text"
                          value={tagline}
                          onChange={e => setTagline(e.target.value)}
                          placeholder="e.g. The best coffee in Paris"
                          className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3.5 text-[15px] text-[#3D261C] outline-none transition-all placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10"
                        />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#3D261C] mb-1.5">Location <span className="text-[#A89888] font-normal">(Optional)</span></span>
                        <input
                          type="text"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                          placeholder="e.g. 123 Paris St, France"
                          className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3.5 text-[15px] text-[#3D261C] outline-none transition-all placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10"
                        />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#3D261C] mb-1.5">Google Review Link <span className="text-[#A89888] font-normal">(Optional)</span></span>
                        <input
                          type="url"
                          value={googleReviewLink}
                          onChange={e => setGoogleReviewLink(e.target.value)}
                          placeholder="e.g. https://g.page/r/..."
                          className="w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3.5 text-[15px] text-[#3D261C] outline-none transition-all placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 2: Logo */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold text-[#3D261C]">Add your logo</h2>
                      <p className="mt-2 text-[#5C4A3D] text-[15px]">This will be displayed prominently on your QR scan page.</p>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-full max-w-sm">
                        <label className="group flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-[#E8DFD4] rounded-[var(--radius-lg)] cursor-pointer bg-[#FDF8F1]/50 hover:bg-[#FDF8F1] hover:border-[#F07C3C] transition-all duration-300">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <motion.div 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:shadow-md transition-shadow text-[#A89888] group-hover:text-[#F07C3C]"
                            >
                              {logo ? <CheckCircle2 className="w-7 h-7 text-green-500" /> : <UploadCloud className="w-7 h-7" />}
                            </motion.div>
                            <p className="mb-2 text-[15px] text-[#5C4A3D]">
                              <span className="font-semibold text-[#F07C3C]">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-[#A89888] font-medium tracking-wide">SVG, PNG, JPG (MAX. 800x400px)</p>
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files[0]
                              setLogo(file)
                              setLogoPreview(URL.createObjectURL(file))
                            }
                          }} />
                        </label>
                      </div>
                    </div>
                    {logo && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                        className="text-center text-sm font-semibold text-[#3D261C]"
                      >
                        Selected: {logo.name}
                      </motion.p>
                    )}

                    <div className="mt-10 pt-8 border-t border-[#E8DFD4]">
                      <h3 className="text-sm font-bold text-[#3D261C] mb-4 uppercase tracking-widest">Brand Color</h3>
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
                      <p className="text-center text-xs text-[#A89888] mt-3 font-medium">Select your primary brand color for the review page.</p>
                    </div>
                  </div>
                )}

                {/* Step 3: Type */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold text-[#3D261C]">What&apos;s your business type?</h2>
                      <p className="mt-2 text-[#5C4A3D] text-[15px]">This helps us tailor your experience and menu setup.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {businessTypes.map((type) => {
                        const Icon = type.icon
                        const isSelected = businessType === type.id
                        return (
                          <button
                            key={type.id}
                            onClick={() => setBusinessType(type.id)}
                            className={`group relative flex flex-col items-center justify-center p-6 rounded-[var(--radius-lg)] border-2 transition-all duration-300 ${
                              isSelected 
                                ? 'border-[#F07C3C] bg-[#FDF8F1] text-[#F07C3C] shadow-[0_4px_20px_rgba(240,124,60,0.15)]' 
                                : 'border-[#E8DFD4] bg-white hover:border-[#F07C3C]/50 hover:bg-[#FDF8F1]/50 text-[#5C4A3D]'
                            }`}
                          >
                            <div className={`mb-3 p-3 rounded-full transition-colors ${isSelected ? 'bg-white shadow-sm text-[#F07C3C]' : 'bg-[#FDF8F1] text-[#8A735F] group-hover:text-[#F07C3C]'}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="font-semibold">{type.name}</span>
                            {isSelected && (
                              <motion.div 
                                layoutId="activeType"
                                className="absolute inset-0 border-2 border-[#F07C3C] rounded-[var(--radius-lg)]" 
                                style={{ zIndex: -1 }} 
                              />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 4: Menu Items */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold text-[#3D261C]">Add your menu items</h2>
                      <p className="mt-2 text-[#5C4A3D] text-[15px]">Upload an image of your menu to extract items automatically, or add them manually.</p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="group flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E8DFD4] bg-[#FDF8F1]/30 rounded-[var(--radius-lg)] cursor-pointer hover:bg-[#FDF8F1] hover:border-[#F07C3C] transition-all duration-300">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:shadow-md transition-shadow text-[#8A735F] group-hover:text-[#F07C3C]">
                          <Camera className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-[#3D261C]">
                          {isProcessingMenu ? 'Extracting...' : 'Upload Menu Image'}
                        </span>
                        <span className="text-[13px] text-[#A89888] text-center mt-1 leading-relaxed">
                          {isProcessingMenu ? 'Please wait while we read your menu...' : 'We&apos;ll use AI to extract your items automatically'}
                        </span>
                        <input 
                          type="file" 
                          accept="image/*,.csv,.pdf" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setIsProcessingMenu(true);
                              // Mock AI extraction delay
                              setTimeout(() => {
                                setMenuItems(prev => [
                                  ...prev,
                                  { id: Math.random().toString(), name: 'Signature Coffee', price: '$4.50', category: 'Beverages', subcategory: 'Coffee', emoji: '☕' },
                                  { id: Math.random().toString(), name: 'Avocado Toast', price: '$12.00', category: 'Main Course', subcategory: 'Breakfast', emoji: '🥑' },
                                  { id: Math.random().toString(), name: 'Fresh Croissant', price: '$3.50', category: 'Bakery', subcategory: 'Pastries', emoji: '🥐' },
                                  { id: Math.random().toString(), name: 'Iced Latte', price: '$5.00', category: 'Beverages', subcategory: 'Coffee', emoji: '🥤' },
                                  { id: Math.random().toString(), name: 'Classic Burger', price: '$15.00', category: 'Main Course', subcategory: 'Lunch', emoji: '🍔' },
                                  { id: Math.random().toString(), name: 'Caesar Salad', price: '$10.00', category: 'Main Course', subcategory: 'Salads', emoji: '🥗' }
                                ]);
                                setIsProcessingMenu(false);
                                e.target.value = ''; // clear input
                              }, 1500);
                            }
                          }}
                        />
                      </label>

                      <button 
                        type="button"
                        onClick={addMenuItem}
                        disabled={isProcessingMenu}
                        className="group flex flex-col items-center justify-center p-6 border-2 border-[#E8DFD4] bg-white rounded-[var(--radius-lg)] cursor-pointer hover:border-[#F07C3C]/50 hover:bg-[#FDF8F1] transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-[#FDF8F1] rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors text-[#8A735F] group-hover:text-[#F07C3C]">
                          <Plus className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-[#3D261C]">Add Manually</span>
                        <span className="text-[13px] text-[#A89888] text-center mt-1 leading-relaxed">Type in your menu items one by one</span>
                      </button>
                    </div>

                    {menuItems.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3 mt-6 pt-6 border-t border-[#E8DFD4]"
                      >
                        <h3 className="font-semibold text-[#3D261C] mb-4">Your Items</h3>
                        <AnimatePresence>
                          {menuItems.map((item) => (
                            <motion.div 
                              key={item.id} 
                              layout
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="flex items-center gap-3 bg-[#FDF8F1] p-2 pr-4 rounded-[var(--radius-md)] border border-[#E8DFD4]/50"
                            >
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Item name"
                                    value={item.name}
                                    onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                                    className="flex-1 bg-white rounded-[var(--radius-sm)] border border-[#E8DFD4] px-4 py-2.5 text-[15px] outline-none focus:border-[#F07C3C] transition-all font-medium text-[#3D261C]"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                                    className="w-24 bg-white rounded-[var(--radius-sm)] border border-[#E8DFD4] px-4 py-2.5 text-[15px] outline-none focus:border-[#F07C3C] transition-all font-medium text-[#3D261C]"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Category"
                                    value={item.category}
                                    onChange={(e) => updateMenuItem(item.id, 'category', e.target.value)}
                                    className="flex-1 bg-white rounded-[var(--radius-sm)] border border-[#E8DFD4] px-4 py-2.5 text-[15px] outline-none focus:border-[#F07C3C] transition-all font-medium text-[#3D261C]"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Sub-cat"
                                    value={item.subcategory || ''}
                                    onChange={(e) => updateMenuItem(item.id, 'subcategory', e.target.value)}
                                    className="flex-1 bg-white rounded-[var(--radius-sm)] border border-[#E8DFD4] px-4 py-2.5 text-[15px] outline-none focus:border-[#F07C3C] transition-all font-medium text-[#3D261C]"
                                  />
                                </div>
                              </div>
                              <button 
                                type="button"
                                onClick={() => removeMenuItem(item.id)}
                                className="p-2 text-[#A89888] hover:text-[#D94848] hover:bg-white rounded-md transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
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
              disabled={currentStep === 0 && !businessName}
              className="flex items-center gap-2 px-8 py-3 bg-[#F07C3C] text-white rounded-[var(--radius-md)] font-bold shadow-lg shadow-[#F07C3C]/20 hover:bg-[#D96321] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === steps.length - 1 ? 'Finish Setup' : 'Next Step'} <ChevronRight className="w-5 h-5" />
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
                            <img src={logoPreview} alt="" className="w-full h-full object-cover scale-150" />
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
                              <img src={logoPreview} alt="Target" className="w-20 h-20 object-contain" />
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

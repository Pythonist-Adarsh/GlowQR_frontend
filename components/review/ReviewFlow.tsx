'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ChevronLeft, 
  Check, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  ArrowRight,
  RefreshCw,
  Utensils,
  UserCheck,
  Building,
  Edit3,
  Coffee,
  Croissant,
  GlassWater,
  ShoppingBag,
  Hotel,
  Dumbbell,
  Stethoscope,
  GraduationCap,
  Flame,
  ChefHat,
  Heart,
  Layout
} from 'lucide-react';

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
    default: return <Utensils className={className} />;
  }
}

const STEPS = {
  INTRO: 0,
  WELCOME: 1,
  ENJOY: 2,
  RATE: 3,
  READY: 4,
  COPIED: 5,
};

type MenuItem = {
  id: number | string;
  name: string;
  emoji?: string;
  icon?: string;
};

type ReviewFlowData = {
  name: string;
  tagline?: string;
  logo?: string | null;
  address?: string;
  primaryColor: string;
  googleReviewUrl: string;
  menuItems?: MenuItem[];
  plan?: 'free' | 'basic' | 'premium';
  businessName?: string;
  brandColor?: string;
  logoUrl?: string | null;
  theme?: string;
  city?: string;
  area?: string;
  area_locality?: string;
  website?: string;
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
  shape: 'circle' | 'square';
  gravity: number;
}

// Helper to darken brand color to 8% lightness for Basic/Premium dark mode bg
function getDarkenedBrandColor(hex: string, lightness: number = 8): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

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
  
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${lightness}%)`;
}

// Helper to lighten brand color by a percent
function getLightenedBrandColor(hex: string, percent: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

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

export default function ReviewFlow({ 
  simulationData, 
  initialData, 
  onStepChange 
}: { 
  simulationData?: Partial<ReviewFlowData>, 
  initialData?: Partial<ReviewFlowData>, 
  onStepChange?: (step: number) => void 
}) {
  const [step, setStep] = useState(STEPS.INTRO);
  const data = simulationData || initialData || {};
  
  const business = {
    name: data.name || data.businessName || "Our Business",
    tagline: data.tagline || "Quality & Excellence",
    logo: data.logo || data.logoUrl || null,
    address: data.address || "123 Main St, Your City",
    primaryColor: data.primaryColor || data.brandColor || "#1D9E75",
    googleReviewUrl: data.googleReviewUrl || "#",
    plan: (data.plan === 'free' || data.theme === 'free') ? 'free' : (data.plan === 'basic' || data.theme === 'classic') ? 'basic' : 'premium',
    city: data.city || "Lucknow",
    area: data.area || data.area_locality || "",
    website: data.website || "",
  };

  const menuItems = useMemo(() => data.menuItems || [
    { id: 1, name: "Signature Pizza", icon: "Utensils" },
    { id: 2, name: "Pasta Carbonara", icon: "Utensils" },
    { id: 3, name: "Fresh Salad", icon: "Utensils" },
    { id: 4, name: "Iced Tea", icon: "GlassWater" },
  ], [data.menuItems]);

  // Canvas and DOM Refs for high-performance direct animations (avoid state lags)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const brandingRef = useRef<HTMLDivElement | null>(null);
  const welcomeRef = useRef<HTMLParagraphElement | null>(null);

  // State for Screen 2
  const [selectedDishes, setSelectedDishes] = useState<(number | string)[]>([]);
  const [mealType, setMealType] = useState("Dinner");
  const [spendRange, setSpendRange] = useState("₹400-600");
  const [waitTime, setWaitTime] = useState("No wait");
  const [seatingType, setSeatingType] = useState("Indoor");

  // State for Screen 3
  const [ratings, setRatings] = useState({
    overall: 0,
    food: 0,
    service: 0,
    atmosphere: 0
  });

  const getSentiment = (rating: number) => {
    if (rating === 5) return "Amazing!";
    if (rating === 4) return "Great experience!";
    if (rating === 3) return "Good";
    if (rating === 2) return "Not great";
    if (rating === 1) return "Awful";
    return "";
  };

  // State for Screen 4
  const [selectedReviewIdx, setSelectedReviewIdx] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const generatedReviews = useMemo(() => {
    const cityStr = business.city || "Lucknow";
    const areaStr = business.area ? `${business.area}` : "";
    const locationStr = areaStr ? `${areaStr}, ${cityStr}` : cityStr;
    const dishNames = selectedDishes.length > 0 
      ? menuItems.filter(m => selectedDishes.includes(m.id)).map(m => m.name).join(" and ") 
      : 'signature menu offerings';

    const foodVibe = ratings.food >= 4 ? "exceptionally delicious and fresh" : "good";
    const serviceVibe = ratings.service >= 4 ? "warm, attentive, and extremely professional" : "helpful";
    const atmosphereVibe = ratings.atmosphere >= 4 ? "stunning, cozy, and beautifully designed" : "nice";

    const allOptions = [
      {
        id: 0,
        text: `Absolutely loved visiting ${business.name} in ${locationStr}! The ${mealType.toLowerCase()} experience was incredible. The hospitality was ${serviceVibe}, and the atmosphere was ${atmosphereVibe}. It is easily one of the best spots in ${cityStr} for a great time!`,
        isSEO: true
      },
      {
        id: 1,
        text: `If you're looking for the finest food in ${cityStr}, ${business.name} at ${areaStr || cityStr} is the place to go! The ${dishNames} we had for ${mealType.toLowerCase()} were ${foodVibe}. Every bite was bursting with flavor. Highly recommend their menu!`,
        isSEO: true
      },
      {
        id: 2,
        text: `The team at ${business.name} in ${locationStr} deserves a solid five stars! The staff is ${serviceVibe}, and they ensured we had ${waitTime.toLowerCase()} for our orders. Truly a top-tier customer experience in the ${areaStr || cityStr} area!`,
        isSEO: true
      },
      {
        id: 3,
        text: `Such a beautiful, ${atmosphereVibe} space! ${business.name} in ${locationStr} is the perfect location for a relaxing ${mealType.toLowerCase()} with family or friends. We sat in the ${seatingType.toLowerCase()} area and loved the styling and positive vibes. A gorgeous spot!`,
        isSEO: true
      },
      {
        id: 4,
        text: `Highly recommend ${business.name} in ${locationStr} for anyone seeking premium quality! The spend of around ${spendRange} per person is completely worth it for the ${foodVibe} food and wonderful service. I will definitely be returning soon!`,
        isSEO: true
      }
    ];

    if (business.plan === 'premium') {
      return allOptions.slice(0, 5);
    } else if (business.plan === 'basic') {
      return allOptions.slice(0, 3);
    } else {
      return allOptions.slice(0, 1);
    }
  }, [mealType, business.name, business.city, business.area, business.plan, selectedDishes, menuItems, ratings, waitTime, seatingType, spendRange]);

  useEffect(() => {
    if (!isEditing) {
      setEditedText(generatedReviews[Math.min(selectedReviewIdx, generatedReviews.length - 1)]?.text || "");
    }
  }, [selectedReviewIdx, generatedReviews, isEditing]);

  // Sync with parent dots
  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const handleAdvance = () => {
    setStep(STEPS.WELCOME);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.COPIED));
  const prevStep = () => setStep(s => Math.max(s - 1, STEPS.WELCOME));

  // Canvas resizing setup
  useEffect(() => {
    if (step !== STEPS.INTRO) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const handleResize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [step]);

  // Main Canvas animation and logic loop
  useEffect(() => {
    if (step !== STEPS.INTRO) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;
    let particles: Particle[] = [];

    // Helper to spawn tap burst particles
    const spawnTapParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (business.plan === 'premium' ? 5.5 : 4) + 1.5;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const radius = Math.random() * 4 + 3;

        let color = business.primaryColor;
        if (business.plan === 'premium') {
          const variants = [
            business.primaryColor,
            '#FFFFFF',
            getLightenedBrandColor(business.primaryColor, 40),
            getLightenedBrandColor(business.primaryColor, 70)
          ];
          color = variants[Math.floor(Math.random() * variants.length)];
        } else {
          const variants = [
            business.primaryColor,
            getLightenedBrandColor(business.primaryColor, 20)
          ];
          color = variants[Math.floor(Math.random() * variants.length)];
        }

        particles.push({
          x,
          y,
          vx,
          vy,
          radius,
          alpha: 1.0,
          decay: Math.random() * 0.015 + 0.008,
          color,
          shape: business.plan === 'premium' && Math.random() > 0.5 ? 'square' : 'circle',
          gravity: 0.05
        });
      }
    };

    // Helper to spawn drag trail particles
    const spawnDragParticles = (x: number, y: number) => {
      if (business.plan === 'free') return; // no drag trails on free
      
      const count = business.plan === 'premium' ? 3 : 1;
      
      for (let i = 0; i < count; i++) {
        const radius = business.plan === 'premium' ? (Math.random() * 4 + 1.5) : (Math.random() * 2 + 1.5);
        const vx = (Math.random() - 0.5) * (business.plan === 'premium' ? 2.5 : 1.2);
        const vy = (Math.random() - 0.5) * (business.plan === 'premium' ? 2.5 : 1.2) - 0.5; // slight upward drift

        let color = business.primaryColor;
        if (business.plan === 'premium') {
            const variants = [business.primaryColor, '#FFFFFF', getLightenedBrandColor(business.primaryColor, 50)];
            color = variants[Math.floor(Math.random() * variants.length)];
        }

        particles.push({
          x,
          y,
          vx,
          vy,
          radius,
          alpha: business.plan === 'premium' ? 1.0 : 0.8,
          decay: Math.random() * 0.03 + 0.02,
          color,
          shape: business.plan === 'premium' && Math.random() > 0.7 ? 'square' : 'circle',
          gravity: business.plan === 'premium' ? 0.02 : 0.01
        });
      }
    };

    // Helper to spawn gentle rising bubbles (Free Plan simple AR effect)
    const spawnFreeBubbles = () => {
      if (business.plan !== 'free') return;
      if (Math.random() > 0.35) return; // throttle bubble creation
      const x = Math.random() * canvas.width;
      const y = canvas.height + 10;
      const radius = Math.random() * 6 + 3;
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = -(Math.random() * 1.0 + 0.5); // upward speed

      particles.push({
        x,
        y,
        vx,
        vy,
        radius,
        alpha: 0.6,
        decay: Math.random() * 0.0015 + 0.0008,
        color: getLightenedBrandColor(business.primaryColor, 35),
        shape: 'circle',
        gravity: 0
      });
    };

    // Helper to create glowing CSS ripple rings for premium taps
    const createCSSRipple = (clientX: number, clientY: number, delayMs: number = 0) => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      setTimeout(() => {
        const ripple = document.createElement('div');
        ripple.className = 'glow-ripple';
        ripple.style.left = `${relativeX}px`;
        ripple.style.top = `${relativeY}px`;
        ripple.style.borderColor = business.primaryColor;
        
        container.appendChild(ripple);
        setTimeout(() => {
          ripple.remove();
        }, 1200);
      }, delayMs);
    };

    // Interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnDragParticles(x, y);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      spawnDragParticles(x, y);
    };

    const handleContainerClick = (e: MouseEvent) => {
      // Avoid triggering when user clicks on a button
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
        return;
      }
      handleTap(e.clientX, e.clientY);
    };

    const handleContainerTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      // Avoid triggering when user touches a button
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
        return;
      }
      handleTap(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTap = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const burstCount = business.plan === 'premium' ? 32 : (business.plan === 'basic' ? 12 : 8);
      spawnTapParticles(x, y, burstCount);

      if (business.plan === 'premium') {
        createCSSRipple(clientX, clientY);
        createCSSRipple(clientX, clientY, 200); // double ripple for premium
      } else if (business.plan === 'basic') {
        createCSSRipple(clientX, clientY); // add ripple to basic as well
      }
    };

    // Attach interaction events
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('touchmove', handleTouchMove);
      parent.addEventListener('click', handleContainerClick);
      parent.addEventListener('touchstart', handleContainerTouchStart);
    }

    // Initial Burst for Paid Plans
    if (business.plan !== 'free') {
      spawnTapParticles(canvas.width / 2, canvas.height / 2, business.plan === 'premium' ? 50 : 22);
    }

    const loop = () => {
      t++;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Handle gentle bubbles spawn for Free
      if (business.plan === 'free') {
        spawnFreeBubbles();
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0, p.alpha - p.decay);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.shape === 'square') {
          ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      particles = particles.filter(p => p.alpha > 0);

      // Ambient respawning for Paid Plans
      if (business.plan !== 'free') {
        const respawnInterval = business.plan === 'premium' ? 80 : 120;
        const respawnCount = business.plan === 'premium' ? 12 : 6;
        if (t % respawnInterval === 0) {
          spawnTapParticles(canvas.width / 2, canvas.height / 2, respawnCount);
        }
      }

      // t = 0 to 120 (0s to 2s): Logo Entrance Bounce and Floating Settle
      if (logoRef.current) {
        if (t < 20) {
          logoRef.current.style.opacity = '0';
          logoRef.current.style.transform = 'scale(0.3)';
        } else if (t >= 20 && t < 50) {
          const progress = (t - 20) / 30;
          const x = progress - 1;
          const cubicEase = 1 + 2.70158 * Math.pow(x, 3) + 1.70158 * Math.pow(x, 2);
          const scaleVal = 0.3 + cubicEase * 0.7;
          logoRef.current.style.opacity = `${progress}`;
          logoRef.current.style.transform = `scale(${scaleVal})`;
        } else {
          logoRef.current.style.opacity = '1';
          if (business.plan === 'premium') {
            const floatY = Math.sin(t * 0.04) * 6;
            logoRef.current.style.transform = `scale(1) translateY(${floatY}px)`;
          } else {
            logoRef.current.style.transform = 'scale(1)';
          }
        }
      }

      // t = 120 to 210 (2s to 3.5s): Business Name + Tagline slide/fade in
      if (brandingRef.current) {
        if (t < 120) {
          brandingRef.current.style.opacity = '0';
          brandingRef.current.style.transform = 'translateY(15px)';
        } else if (t >= 120 && t < 170) {
          const progress = Math.min(1, (t - 120) / 35);
          brandingRef.current.style.opacity = `${progress}`;
          brandingRef.current.style.transform = `translateY(${(1 - progress) * 15}px)`;
        } else {
          brandingRef.current.style.opacity = '1';
          brandingRef.current.style.transform = 'translateY(0px)';
        }
      }

      // t = 210 to Max: Warm personal typewriter relationship text reveal
      if (welcomeRef.current) {
        const welcomeText = business.plan === 'premium'
          ? `A warm welcome from the owner of ${business.name}: "We are so grateful for your visit today! Every dish we prepare and every service we offer is done with care. Your support keeps our dream alive. If you enjoyed your time, sharing a review directly helps our team grow. Thank you for being a part of our family!"`
          : business.plan === 'basic'
            ? `A welcome note from the owner: "Thank you so much for choosing us! We pour our hearts into everything we do, and we’d love to know about your experience. Your feedback helps us serve you even better!"`
            : `Thank you for visiting ${business.name}! We appreciate your presence and support today. We hope to welcome you back very soon.`;

        if (t < 210) {
          welcomeRef.current.style.opacity = '0';
          welcomeRef.current.innerText = '';
        } else {
          welcomeRef.current.style.opacity = '1';
          if (business.plan !== 'free') {
            const totalFramesForTyping = business.plan === 'premium' ? (900 - 210 - 60) : (600 - 210 - 40);
            const charsPerFrame = welcomeText.length / totalFramesForTyping;
            const charsCount = Math.min(welcomeText.length, Math.floor((t - 210) * charsPerFrame));
            welcomeRef.current.innerText = welcomeText.substring(0, charsCount);
          } else {
            // direct fade-in for free
            const progress = Math.min(1, (t - 210) / 30);
            welcomeRef.current.style.opacity = `${progress}`;
            welcomeRef.current.innerText = welcomeText;
          }
        }
      }

      // Auto-advance thresholds based on plan
      const maxT = business.plan === 'premium' ? 900 : business.plan === 'basic' ? 600 : 300;
      if (t >= maxT) {
        handleAdvance();
      } else {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('touchmove', handleTouchMove);
        parent.removeEventListener('click', handleContainerClick);
        parent.removeEventListener('touchstart', handleContainerTouchStart);
      }
    };
  }, [step, business.plan, business.primaryColor, business.name]);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const transition = { duration: 0.25, ease: "easeOut" };

  return (
    <div className="relative h-full w-full bg-[#f0f7f0] font-sans overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        
        {/* SCREEN 0: INTRO - ALL PLANS (Dynamic Canvas AR Sequence Screen) */}
        {step === STEPS.INTRO && (
          <motion.div 
            key="ar-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 overflow-hidden select-none"
            style={{ 
              backgroundColor: business.plan === 'free' 
                ? '#FFFFFF'
                : getDarkenedBrandColor(business.primaryColor, 8) 
            }}
          >
            {/* CSS Ripple & Custom Animations styling inside the component scope */}
            <style>{`
              .glow-ripple {
                position: absolute;
                border: 2px solid ${business.primaryColor};
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                pointer-events: none;
                animation: glowRippleAnim 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
                box-shadow: 0 0 15px ${business.primaryColor}80;
                z-index: 5;
              }
              @keyframes glowRippleAnim {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
              }
              @keyframes shineSwipe {
                0% { left: -150%; }
                50% { left: 150%; }
                100% { left: 150%; }
              }
              @keyframes premiumTextShine {
                0% { background-position: 0% center; }
                50% { background-position: 100% center; }
                100% { background-position: 0% center; }
              }
              @keyframes premiumBadgePulse {
                0%, 100% {
                  transform: scale(1);
                  border-color: rgba(255, 255, 255, 0.2);
                  box-shadow: 0 0 20px ${business.primaryColor}30, inset 0 0 15px rgba(255, 255, 255, 0.05);
                }
                50% {
                  transform: scale(1.04);
                  border-color: ${business.primaryColor}80;
                  box-shadow: 0 0 35px ${business.primaryColor}60, inset 0 0 20px ${business.primaryColor}20;
                }
              }
              @keyframes basicNameGlow {
                0% { transform: scale(1); text-shadow: 0 0 8px ${business.primaryColor}80; }
                100% { transform: scale(1.03); text-shadow: 0 0 18px ${business.primaryColor}, 0 0 8px ${business.primaryColor}; }
              }
              @keyframes pulseRing1 {
                0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
                50% { transform: scale(1.12) rotate(180deg); opacity: 0.3; }
                100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
              }
              @keyframes pulseRing2 {
                0% { transform: scale(1) rotate(0deg); opacity: 0.6; }
                50% { transform: scale(1.18) rotate(-180deg); opacity: 0.15; }
                100% { transform: scale(1) rotate(-360deg); opacity: 0.6; }
              }
              @keyframes scanLine {
                0% { top: 0%; }
                50% { top: 100%; }
                100% { top: 0%; }
              }
            `}</style>

            {/* Canvas for particles and bubbles */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
            
            {/* Tech viewport grid overlay (Premium only) */}
            {business.plan === 'premium' && (
              <div className="absolute inset-0 pointer-events-none opacity-[0.09] z-0 animate-pulse" style={{
                backgroundImage: `radial-gradient(circle, ${business.primaryColor} 0.8px, transparent 0.8px), linear-gradient(to right, rgba(255,255,255,0.15) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(255,255,255,0.15) 0.5px, transparent 0.5px)`,
                backgroundSize: '80px 80px, 40px 40px, 40px 40px'
              }} />
            )}

            {/* Plan badges */}
            {business.plan === 'premium' && (
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black tracking-widest border pointer-events-none z-20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" style={{
                color: business.primaryColor,
                borderColor: `${business.primaryColor}50`,
                backgroundColor: `${business.primaryColor}15`
              }}>
                PREMIUM
              </div>
            )}
            {business.plan === 'basic' && (
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black tracking-widest border pointer-events-none z-20" style={{
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}>
                BASIC
              </div>
            )}

            {/* Camera scanning line visualizer (Paid Plans only) */}
            {business.plan !== 'free' && (
              <>
                <div className="absolute left-0 right-0 h-[3px] pointer-events-none z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{
                  background: `linear-gradient(to right, transparent, ${business.primaryColor}, transparent)`,
                  opacity: business.plan === 'premium' ? 0.6 : 0.35,
                  animation: 'scanLine 3.8s infinite ease-in-out'
                }} />
              </>
            )}
            
            {/* Logo elements wrapper */}
            <div className="relative w-28 h-28 flex items-center justify-center mb-8 pointer-events-none z-10">
              {/* Concentric rings pulsing (Paid Plans) */}
              {business.plan !== 'free' && (
                <>
                  <div className="absolute -inset-2 rounded-full border-2 border-dashed" style={{
                    borderColor: `${business.primaryColor}90`,
                    animation: 'pulseRing1 3.5s infinite linear'
                  }} />
                  {business.plan === 'premium' && (
                    <div className="absolute -inset-4 rounded-full border border-dotted" style={{
                      borderColor: `${business.primaryColor}60`,
                      animation: 'pulseRing2 4.5s infinite linear reverse'
                    }} />
                  )}
                </>
              )}
              
              {/* Logo circle */}
              <div 
                ref={logoRef}
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl text-3xl font-black uppercase transition-all duration-300 z-10"
                style={{ 
                  backgroundColor: business.plan === 'premium' ? '#FFFFFF' : business.primaryColor,
                  color: business.plan === 'premium' ? business.primaryColor : '#FFFFFF'
                }}
              >
                {business.logo ? (
                  <img src={business.logo} alt={business.name} className="w-full h-full object-contain rounded-full" />
                ) : (
                  <span style={{ color: business.plan === 'premium' ? business.primaryColor : '#FFFFFF' }}>{business.name[0]}</span>
                )}
              </div>
            </div>
            
            {/* Brand and relationship typewriter greetings */}
            <div ref={brandingRef} className="text-center pointer-events-none z-10 transition-all duration-300 max-w-sm flex flex-col items-center">
              
              {/* HIGHLIGHTED BRAND NAME FOR PROMOTION (Interactive for each case) */}
              {business.plan === 'premium' ? (
                <div className="relative inline-block px-6 py-2.5 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-md shadow-2xl mb-3 overflow-hidden" style={{
                  boxShadow: `0 0 25px ${business.primaryColor}30, inset 0 0 15px rgba(255,255,255,0.05)`,
                  animation: 'premiumBadgePulse 3.5s infinite ease-in-out'
                }}>
                  {/* Glowing shine swipe element */}
                  <div className="absolute top-0 -left-[150%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" style={{
                    animation: 'shineSwipe 3.5s infinite ease-in-out'
                  }} />
                  
                  <h3 className="text-2xl font-black text-transparent bg-clip-text tracking-widest uppercase font-display" style={{
                    backgroundImage: `linear-gradient(135deg, #FFFFFF 0%, ${getLightenedBrandColor(business.primaryColor, 40)} 50%, #FFFFFF 100%)`,
                    backgroundSize: '200% auto',
                    animation: 'premiumTextShine 3s linear infinite',
                    textShadow: `0 0 10px ${business.primaryColor}50`
                  }}>
                    {business.name}
                  </h3>
                </div>
              ) : business.plan === 'basic' ? (
                <h3 className="text-2xl font-black mb-2 text-white tracking-wide uppercase" style={{
                  animation: 'basicNameGlow 2.5s infinite alternate'
                }}>
                  {business.name}
                </h3>
              ) : (
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm text-sm font-black text-slate-800 tracking-wide mb-3 uppercase">
                  {business.name}
                </div>
              )}

              <p className={`text-xs tracking-wider mb-6 italic ${business.plan === 'free' ? 'text-slate-400' : 'text-white/60'}`}>{business.tagline}</p>
              
              {business.website && (
                <div className="mb-6 pointer-events-auto">
                  <a href={business.website.startsWith('http') ? business.website : `https://${business.website}`} target="_blank" rel="noopener noreferrer" className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all ${business.plan === 'premium' ? 'bg-white/5 border-white/20 text-white hover:bg-white/10' : business.plan === 'basic' ? 'bg-white/10 border-white/30 text-white hover:bg-white/20' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'}`}>
                    Visit Website <ExternalLink className="w-3 h-3 inline-block ml-1 -mt-0.5" />
                  </a>
                </div>
              )}
              
              <p 
                ref={welcomeRef} 
                className="text-xs font-medium tracking-wide leading-relaxed transition-all duration-300 min-h-[3rem] px-4"
                style={{ color: business.plan === 'free' ? '#475569' : getLightenedBrandColor(business.primaryColor, 25) }}
              />
            </div>

            {/* Custom UI Actions depending on tier */}
            {business.plan === 'free' ? (
              <button 
                onClick={handleAdvance}
                className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 mt-auto z-30 transition-all hover:brightness-105 active:scale-[0.98]"
                style={{ backgroundColor: business.primaryColor }}
              >
                Share your experience <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleAdvance}
                className="absolute top-8 right-6 z-30 px-4 py-2 border rounded-full text-[10px] font-black uppercase tracking-wider text-white/50 border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:text-white"
              >
                Skip Intro ➔
              </button>
            )}

            {business.plan !== 'free' && (
              <div className="absolute bottom-10 text-[8px] text-white/20 uppercase tracking-[0.25em] font-bold pointer-events-none">
                Interactive Viewport · Drag & Tap Screen
              </div>
            )}
          </motion.div>
        )}

        {/* SCREEN 1: WELCOME (Original first screen, now Screen 1) */}
        {step === STEPS.WELCOME && (
          <motion.div 
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#e1f5ee] flex items-center justify-center mb-6 shadow-sm">
              <Sparkles className="w-8 h-8 text-[#1D9E75]" />
            </div>
            <h2 className="text-2xl font-bold text-[#085041] mb-2">Share your experience</h2>
            <p className="text-[#085041] opacity-80 mb-1">Loved your time at {business.name}?</p>
            <p className="text-[#1D9E75] italic font-medium mb-4 text-sm">&quot;{business.tagline}&quot;</p>
            <p className="text-[#085041] opacity-70 text-sm mb-12">Let&apos;s craft a beautiful review together in 2 simple steps.</p>
            
            <button 
              onClick={nextStep}
              className="w-full py-4 bg-[#1a8a3c] text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-auto"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* SCREEN 2: ENJOY */}
        {step === STEPS.ENJOY && (
          <motion.div 
            key="enjoy"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar"
          >
            <button onClick={prevStep} className="self-start p-2 -ml-2 mb-2 text-[#085041]"><ChevronLeft /></button>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#e8e8f0] text-[#534AB7] text-[10px] font-bold rounded-full uppercase">Step 1 of 3</span>
            </div>
            <h2 className="text-2xl font-bold text-[#085041] mb-2">What did you enjoy?</h2>
            <div className="flex items-center gap-1.5 text-[#085041] opacity-60 text-xs mb-6">
              <MapPin className="w-3.5 h-3.5" /> {business.address}
            </div>

            <div className="space-y-6 pb-20">
              {/* Dishes */}
              <div>
                <p className="text-[10px] font-bold text-[#085041]/40 uppercase tracking-widest mb-3">Select dishes you tried</p>
                <div className="flex flex-wrap gap-2">
                  {menuItems.map(item => {
                    const isSelected = selectedDishes.includes(item.id);
                    return (
                      <button 
                        key={item.id}
                        onClick={() => setSelectedDishes(prev => isSelected ? prev.filter(id => id !== item.id) : [...prev, item.id])}
                        className={`px-4 py-2 rounded-full border text-xs font-medium transition-all flex items-center gap-1.5 ${isSelected ? 'border-[#1D9E75] bg-[#e1f5ee] text-[#085041]' : 'border-slate-200 bg-white text-slate-600'}`}
                      >
                        <IconByName name={item.icon || 'Utensils'} className="w-3.5 h-3.5 text-current opacity-70" /> {item.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Meal Type */}
              <div>
                <p className="text-[10px] font-bold text-[#085041]/40 uppercase tracking-widest mb-3">What did you get?</p>
                <div className="flex flex-wrap gap-2">
                  {["Breakfast", "Brunch", "Lunch", "Dinner"].map(type => (
                    <button 
                      key={type}
                      onClick={() => setMealType(type)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${mealType === type ? 'border-[#1D9E75] bg-[#e1f5ee] text-[#085041]' : 'border-slate-200 bg-white text-slate-600'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spend */}
              <div>
                <p className="text-[10px] font-bold text-[#085041]/40 uppercase tracking-widest mb-3">How much per person?</p>
                <div className="flex flex-wrap gap-2">
                  {["₹200-400", "₹400-600", "₹600-1000", "₹1000+"].map(range => (
                    <button 
                      key={range}
                      onClick={() => setSpendRange(range)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${spendRange === range ? 'border-[#1D9E75] bg-[#e1f5ee] text-[#085041]' : 'border-slate-200 bg-white text-slate-600'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wait Time */}
              <div>
                <p className="text-[10px] font-bold text-[#085041]/40 uppercase tracking-widest mb-3">Wait time?</p>
                <div className="flex flex-wrap gap-2">
                  {["No wait", "Up to 10 min", "10-30 min", "30-60 min"].map(time => (
                    <button 
                      key={time}
                      onClick={() => setWaitTime(time)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${waitTime === time ? 'border-[#1D9E75] bg-[#e1f5ee] text-[#085041]' : 'border-slate-200 bg-white text-slate-600'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating */}
              <div>
                <p className="text-[10px] font-bold text-[#085041]/40 uppercase tracking-widest mb-3">Seating type?</p>
                <div className="flex flex-wrap gap-2">
                  {["Indoor", "Outdoor patio", "Bar area", "Booth"].map(s => (
                    <button 
                      key={s}
                      onClick={() => setSeatingType(s)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${seatingType === s ? 'border-[#1D9E75] bg-[#e1f5ee] text-[#085041]' : 'border-slate-200 bg-white text-slate-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 left-0 right-0 px-6 pt-4 bg-gradient-to-t from-[#f0f7f0] via-[#f0f7f0] to-transparent">
              <button 
                onClick={nextStep}
                className="w-full py-4 bg-[#1a8a3c] text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: RATE */}
        {step === STEPS.RATE && (
          <motion.div 
            key="rate"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="flex-1 flex flex-col p-6 overflow-y-auto"
          >
            <button onClick={prevStep} className="self-start p-2 -ml-2 mb-2 text-[#085041]"><ChevronLeft /></button>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#e8e8f0] text-[#534AB7] text-[10px] font-bold rounded-full uppercase">Step 2 of 3</span>
            </div>
            <h2 className="text-2xl font-bold text-[#085041] mb-1">Rate your time</h2>
            <p className="text-[#085041] opacity-60 text-sm mb-2">How many stars for {business.name}?</p>
            <p className="text-[#1D9E75] italic text-[11px] mb-8 font-medium">These match exactly what Google will ask you</p>

            <div className="space-y-8 flex-1">
              {/* Overall Rating */}
              <div className="flex flex-col items-center">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setRatings(r => ({ ...r, overall: star }))}>
                      <Star className={`w-9 h-9 ${star <= ratings.overall ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-50'}`} />
                    </button>
                  ))}
                </div>
                <p className="text-xs font-bold text-[#1D9E75] min-h-[1rem] uppercase tracking-wider">{getSentiment(ratings.overall)}</p>
              </div>

              <div className="h-px bg-[#085041]/10 w-full" />

              {/* Smaller Ratings */}
              <div className="space-y-6">
                {([
                  { id: 'food', label: 'Food', icon: <Utensils className="w-4 h-4" /> },
                  { id: 'service', label: 'Service', icon: <UserCheck className="w-4 h-4" /> },
                  { id: 'atmosphere', label: 'Atmosphere', icon: <Building className="w-4 h-4" /> }
                ] as const).map(cat => (
                  <div key={cat.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#085041]">
                      {cat.icon}
                      <span className="text-sm font-bold">{cat.label}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} onClick={() => setRatings(r => ({ ...r, [cat.id]: star }))}>
                            <Star className={`w-6 h-6 ${star <= ratings[cat.id] ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-50'}`} />
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] font-bold text-[#1D9E75] uppercase">{getSentiment(ratings[cat.id])}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={nextStep}
              disabled={ratings.overall === 0}
              className="w-full py-4 bg-[#1a8a3c] text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-8 disabled:opacity-40"
            >
              Generate my review <Sparkles className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* SCREEN 4: READY */}
        {step === STEPS.READY && (
          <motion.div 
            key="ready"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="flex-1 flex flex-col p-6 overflow-y-auto"
          >
            <button onClick={prevStep} className="self-start p-2 -ml-2 mb-2 text-[#085041]"><ChevronLeft /></button>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#e8e8f0] text-[#534AB7] text-[10px] font-bold rounded-full uppercase">Step 3 of 3</span>
            </div>
            <h2 className="text-xl font-bold text-[#085041] mb-1">Your review is ready</h2>
            <p className="text-[#085041] opacity-60 text-sm mb-6">Pick one, copy it, paste on Google</p>

            {/* Rating Reminder */}
            <div className="bg-[#e1f5ee] rounded-xl p-4 mb-6">
              <p className="text-[10px] font-bold text-[#085041] mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-4 h-4 bg-[#1D9E75] text-white rounded-full flex items-center justify-center text-[8px]">i</span>
                Enter these same ratings on Google
              </p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {[
                  { label: 'Overall', val: ratings.overall },
                  { label: 'Food', val: ratings.food },
                  { label: 'Service', val: ratings.service },
                  { label: 'Atmosphere', val: ratings.atmosphere },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#085041]/60">{r.label}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className={`text-[10px] ${s <= r.val ? 'text-amber-500' : 'text-slate-200'}`}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Options */}
            <div className="space-y-4 mb-8">
              {generatedReviews.map((rev, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setSelectedReviewIdx(i);
                      setIsEditing(false);
                    }}
                    className={`w-full p-4 rounded-xl border-[1.5px] text-left transition-all relative ${selectedReviewIdx === i ? 'border-[#1D9E75] bg-[#f0faf4]' : 'border-slate-200 bg-white'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Option {i + 1}</span>
                      <span className="px-2 py-0.5 bg-[#e1f5ee] text-[#1D9E75] text-[8px] font-bold rounded-full uppercase">SEO optimized</span>
                    </div>
                    {isEditing && selectedReviewIdx === i ? (
                      <textarea
                        autoFocus
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full bg-white border border-[#1D9E75] rounded-lg p-3 text-xs text-[#085041] outline-none h-24 resize-none"
                      />
                    ) : (
                      <p className="text-xs text-[#085041] leading-relaxed mb-3 line-clamp-3">
                        &quot;{selectedReviewIdx === i ? editedText : rev.text}&quot;
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedReviewIdx !== i) setSelectedReviewIdx(i);
                          setIsEditing(!isEditing);
                        }}
                        className="flex items-center gap-1 text-[10px] font-bold text-[#1D9E75] uppercase tracking-wide cursor-pointer hover:opacity-80"
                      >
                        <Edit3 className="w-3 h-3" /> {isEditing && selectedReviewIdx === i ? "Save Changes" : "Personalize this"}
                      </div>
                      {selectedReviewIdx === i && <Check className="w-4 h-4 text-[#1D9E75]" />}
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={nextStep}
              className="w-full py-4 bg-[#1a8a3c] text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-auto"
            >
              📋 Copy & Post Review <ExternalLink className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* SCREEN 5: COPIED */}
        {step === STEPS.COPIED && (
          <motion.div 
            key="copied"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="flex-1 flex flex-col items-center p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#1D9E75] flex items-center justify-center mb-6 shadow-lg">
              <Check className="w-10 h-10 text-white stroke-[4]" />
            </div>
            <h2 className="text-2xl font-bold text-[#085041] mb-2">Review copied!</h2>
            <p className="text-[#085041] opacity-60 text-sm mb-8">Google Maps is opening. Here&apos;s what to do:</p>

            <div className="w-full bg-white rounded-2xl p-6 mb-8 text-left space-y-4 shadow-sm border border-slate-100">
              {[
                { n: 1, t: "Select your star ratings", st: "use the same stars shown above" },
                { n: 2, t: "Tap the text box and paste your review", st: "" },
                { n: 3, t: "Hit Post — done in 30 seconds!", st: "" }
              ].map(s => (
                <div key={s.n} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#1D9E75] text-white flex items-center justify-center text-xs font-black shrink-0">{s.n}</div>
                  <div>
                    <p className="text-sm font-bold text-[#085041] leading-tight">{s.t}</p>
                    {s.st && <p className="text-[10px] text-slate-400">{s.st}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Rating Reminder again */}
            <div className="w-full bg-[#e1f5ee] rounded-xl p-4 mb-10 text-left">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {[
                  { label: 'Overall', val: ratings.overall },
                  { label: 'Food', val: ratings.food },
                  { label: 'Service', val: ratings.service },
                  { label: 'Atmosphere', val: ratings.atmosphere },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#085041]/60">{r.label}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className={`text-[10px] ${s <= r.val ? 'text-amber-500' : 'text-slate-200'}`}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(STEPS.WELCOME)}
              className="w-full py-4 bg-[#333] text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-auto"
            >
              Done — back to start <RefreshCw className="w-5 h-5" />
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

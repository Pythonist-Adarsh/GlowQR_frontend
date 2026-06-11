'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ARExperienceProps {
  businessData: any;
  plan: string;
  onComplete: () => void;
}

export function ARExperience({ businessData, plan, onComplete }: ARExperienceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [showContent, setShowContent] = useState(false);

  // Expired plan
  if (plan === 'expired') {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-slate-900 text-white p-6 text-center`}>
        <div>
          <h1 className="text-2xl font-bold mb-2">Scanner Inactive</h1>
          <p className="text-slate-400">This QR code is no longer active.</p>
        </div>
      </div>
    );
  }

  const isPremium = plan === 'premium' || plan === 'trial';
  const animStyle = businessData?.animation_style || 'glow_float';
  const isLight = animStyle === 'free' || animStyle === 'glow_float';
  const textColor = isLight ? 'text-slate-800' : 'text-white';
  const textColorMuted = isLight ? 'text-slate-500' : 'text-white/60';
  const bgColor = isLight ? 'bg-slate-50' : (animStyle === 'premium' ? 'bg-[#06060F]' : 'bg-slate-900');
  const brandColor = businessData?.primaryColor || '#1D9E75';

  useEffect(() => {
    // Welcome message fade-in / typewriter
    const welcomeText = businessData?.welcomeMessage || 'Welcome to ' + businessData.name;
    let timer: NodeJS.Timeout;

    if (isPremium) {
      let i = 0;
      timer = setInterval(() => {
        setTypedMessage(welcomeText.slice(0, i + 1));
        i++;
        if (i >= welcomeText.length) {
          clearInterval(timer);
          setShowContent(true);
        }
      }, 35);
    } else {
      setTimeout(() => {
        setShowContent(true);
      }, 1500);
    }

    // Auto-advance after 15s
    const advanceTimer = setTimeout(() => {
      onComplete();
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(advanceTimer);
    };
  }, [businessData.name, businessData.welcomeMessage, isPremium, onComplete]);

  // Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const particles: any[] = [];
    const numParticles = isPremium ? 65 : 20;

    const createParticle = (x: number, y: number) => {
      const isSquare = isPremium && Math.random() > 0.5;
      const baseColors = [brandColor, '#ffffff', '#e2e8f0', brandColor, brandColor];
      const color = isPremium ? baseColors[Math.floor(Math.random() * baseColors.length)] : brandColor;
      
      return {
        x, y,
        vx: (Math.random() - 0.5) * (isPremium ? 15 : 10),
        vy: (Math.random() - 0.5) * (isPremium ? 15 : 10),
        size: Math.random() * (isPremium ? 6 : 4) + 2,
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        isSquare,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        color
      };
    };

    // Initial burst
    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle(width / 2, height / 2));
    }

    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Continuous respawn for premium
      if (isPremium && frameCount % 70 === 0) {
        for (let i = 0; i < 15; i++) {
          particles.push(createParticle(width / 2, height / 2));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;

        if (p.isSquare) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      frameCount++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [brandColor, isPremium]);

  return (
    <div 
      className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: `${brandColor}15` }}
    >
      {!isLight && <div className="absolute inset-0 bg-slate-900/95 mix-blend-multiply" />}
      {isLight && <div className="absolute inset-0 bg-white/90 mix-blend-screen" />}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Camera Grid Overlay (Premium) */}
      {isPremium && (
        <svg className="absolute inset-0 z-20 pointer-events-none opacity-[0.05]" width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )}

      {/* HUD Brackets (Premium) */}
      {isPremium && (
        <div className="absolute inset-6 z-20 pointer-events-none opacity-40">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
        </div>
      )}

      {/* Scan Line Animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 z-30 opacity-40 shadow-[0_0_15px_currentColor]"
        style={{ color: brandColor, backgroundColor: brandColor }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Central Content */}
      <div className="relative z-40 flex flex-col items-center max-w-[320px] w-full text-center p-6">
        <div className="relative mb-6">
          {/* Pulsing rings */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-current opacity-50"
            style={{ color: brandColor }}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {isPremium && (
            <>
              <motion.div 
                className="absolute inset-0 rounded-full border border-current opacity-50"
                style={{ color: brandColor }}
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full border border-current opacity-50"
                style={{ color: brandColor }}
                animate={{ scale: [1, 3], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
            </>
          )}

          <motion.div
            className="h-auto w-auto max-h-48 max-w-[18rem] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-2 shadow-[0_0_30px_rgba(0,0,0,0.3)] inline-flex items-center justify-center relative z-10 overflow-hidden"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {businessData.logo || businessData.logoUrl ? (
              <img src={businessData.logo || businessData.logoUrl} alt="Logo" className="max-h-[8rem] max-w-full object-contain drop-shadow-md rounded-2xl" />
            ) : (
              <div className="h-24 w-24 flex items-center justify-center">
                <span className={`text-4xl font-black ${textColor} text-center uppercase tracking-tighter leading-none`} style={{ color: brandColor }}>
                  {businessData.name?.substring(0, 2)}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full flex flex-col items-center"
        >
          <h2 className="text-2xl font-black mb-2 leading-tight uppercase tracking-wide" style={{ color: brandColor }}>{businessData.name}</h2>
          <p className={`${textColorMuted} font-medium tracking-wide text-sm mb-6 italic`}>{businessData.tagline}</p>
          
          {businessData.website && (
            <a 
              href={businessData.website.startsWith('http') ? businessData.website : `https://${businessData.website}`}
              target="_blank" rel="noopener noreferrer"
              className={`text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 ${textColor} flex items-center gap-2 transition-all mb-8`}
            >
              VISIT WEBSITE <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </motion.div>

        <div className="min-h-[4rem] h-auto flex items-center justify-center mb-6">
          {isPremium ? (
            <p className="text-emerald-400 font-bold tracking-widest uppercase text-xs leading-relaxed" style={{ color: getLightenedBrandColor(brandColor, 30) }}>
              {typedMessage}
            </p>
          ) : (
            showContent && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className={`${textColor} font-bold tracking-widest uppercase text-xs leading-relaxed`}
              >
                {businessData.welcomeMessage || `Welcome to ${businessData.name}`}
              </motion.p>
            )
          )}
        </div>

        <AnimatePresence>
          {showContent && (
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={onComplete}
              className={`w-full py-4 mt-4 rounded-xl font-bold text-sm ${textColor} shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]`}
              style={{ backgroundColor: brandColor }}
            >
              Share your experience <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper
function getLightenedBrandColor(hex: string, percent: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
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

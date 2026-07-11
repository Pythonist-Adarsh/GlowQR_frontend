'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { getThemeVariables } from './themeUtils';

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
      <div className={`min-h-screen flex items-center justify-center bg-[#FAFAF8] text-[#1F2430] p-6 text-center`}>
        <div>
          <h1 className="text-2xl font-bold mb-2">Scanner Inactive</h1>
          <p className="text-[#62687A]">This QR code is no longer active.</p>
        </div>
      </div>
    );
  }

  const isPremium = plan === 'premium' || plan === 'trial';
  
  // Get computed hex colors for Canvas APIs and React inline styles
  const themeVars = getThemeVariables(plan, businessData?.primaryColor || businessData?.brandColor);
  const brandColor = themeVars['--accent'] as string;

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

  // Canvas Logic for Particles
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
    const numParticles = isPremium ? 40 : 15;

    const createParticle = (x: number, y: number) => {
      const isSquare = isPremium && Math.random() > 0.5;
      const baseColors = [brandColor, '#E2E4E9', brandColor];
      const color = isPremium ? baseColors[Math.floor(Math.random() * baseColors.length)] : brandColor;
      
      return {
        x, y,
        vx: (Math.random() - 0.5) * (isPremium ? 10 : 6),
        vy: (Math.random() - 0.5) * (isPremium ? 10 : 6),
        size: Math.random() * (isPremium ? 5 : 3) + 2,
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
      if (isPremium && frameCount % 80 === 0) {
        for (let i = 0; i < 10; i++) {
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
        ctx.globalAlpha = p.life * 0.6; // Slightly softer particles for light mode
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
      className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] font-sans"
      style={themeVars as any}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-40 flex flex-col items-center max-w-[320px] w-full text-center p-6">
        <div className="relative mb-8 mt-4">
          <motion.div
            className="h-auto w-auto max-h-48 max-w-[18rem] bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[20px] p-2 inline-flex items-center justify-center relative z-10 overflow-hidden shadow-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {businessData.logo || businessData.logoUrl ? (
              <img src={businessData.logo || businessData.logoUrl} alt="Logo" className="max-h-[8rem] max-w-full object-contain rounded-2xl" />
            ) : (
              <div className="h-24 w-24 flex items-center justify-center">
                <span className={`text-4xl font-black text-center uppercase tracking-tighter leading-none text-[var(--text-primary)]`}>
                  {businessData.name?.substring(0, 2)}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full flex flex-col items-center"
        >
          <h2 className="text-2xl font-[600] mb-2 leading-tight text-[var(--text-primary)]">{businessData.name}</h2>
          <p className={`text-[var(--text-secondary)] font-medium text-[15px] mb-8 italic`}>{businessData.tagline}</p>
          
          {businessData.website && (
            <a 
              href={businessData.website.startsWith('http') ? businessData.website : `https://${businessData.website}`}
              target="_blank" rel="noopener noreferrer"
              className={`text-[11px] font-[600] uppercase tracking-widest px-5 py-2.5 rounded-full border border-[var(--border-default)] hover:bg-[#F3F4F7] text-[var(--text-primary)] flex items-center gap-2 transition-all mb-8`}
            >
              VISIT WEBSITE <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </motion.div>

        <div className="min-h-[3rem] h-auto flex items-center justify-center mb-4">
          {isPremium ? (
            <p className="text-[var(--text-secondary)] font-[600] tracking-widest uppercase text-xs leading-relaxed">
              {typedMessage}
            </p>
          ) : (
            showContent && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className={`text-[var(--text-secondary)] font-[600] tracking-widest uppercase text-xs leading-relaxed`}
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
              className={`w-full py-4 mt-2 rounded-full font-[600] text-[15px] text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]`}
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Share your experience <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

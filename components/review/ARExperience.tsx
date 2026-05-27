'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ARExperienceProps {
  businessData: any;
  plan: string;
  onComplete: () => void;
}

export function ARExperience({ businessData, plan, onComplete }: ARExperienceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  // Expired plan
  if (plan === 'expired') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Scanner Inactive</h1>
          <p className="text-slate-400">This QR code is no longer active.</p>
        </div>
      </div>
    );
  }

  // Fallback for no AR
  if (plan === 'free_basic') {
    useEffect(() => {
      onComplete(); // Skip immediately
    }, [onComplete]);
    return null;
  }

  const isPremium = plan === 'premium' || plan === 'trial';
  const brandColor = businessData?.primaryColor || '#1D9E75';

  useEffect(() => {
    // Welcome message fade-in / typewriter
    const welcomeText = 'Welcome to ' + businessData.name;
    let timer: NodeJS.Timeout;

    if (isPremium) {
      let i = 0;
      timer = setInterval(() => {
        setTypedMessage(welcomeText.slice(0, i + 1));
        i++;
        if (i >= welcomeText.length) clearInterval(timer);
      }, 45);
    } else {
      setTimeout(() => {
        setShowWelcome(true);
      }, 1500);
    }

    // Auto-advance after 5s
    const advanceTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(advanceTimer);
    };
  }, [businessData.name, isPremium, onComplete]);

  // Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
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
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer overflow-hidden"
      style={{ backgroundColor: `${brandColor}15` }} // Darkened brand color background approximation
      onClick={onComplete}
    >
      <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply" />
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      {/* Camera Grid Overlay (Premium) */}
      {isPremium && (
        <svg className="absolute inset-0 z-20 pointer-events-none opacity-[0.07]" width="100%" height="100%">
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
        className="absolute top-0 left-0 right-0 h-1 z-30 opacity-60 shadow-[0_0_15px_currentColor]"
        style={{ color: brandColor, backgroundColor: brandColor }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Central Content */}
      <div className="relative z-40 flex flex-col items-center">
        <div className="relative">
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
            className="w-24 h-24 bg-white rounded-3xl p-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center relative z-10 overflow-hidden"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {isPremium ? (
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center"
              >
                {businessData.logo ? (
                  <img src={businessData.logo} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-3xl font-black text-slate-800 text-center uppercase tracking-tighter leading-none" style={{ color: brandColor }}>
                    {businessData.name?.substring(0, 2)}
                  </span>
                )}
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {businessData.logo ? (
                  <img src={businessData.logo} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-3xl font-black text-slate-800 text-center uppercase tracking-tighter leading-none" style={{ color: brandColor }}>
                    {businessData.name?.substring(0, 2)}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-black text-white mb-2">{businessData.name}</h2>
          <p className="text-white/60 font-medium tracking-wide">{businessData.tagline}</p>
        </motion.div>

        <div className="mt-12 h-8 flex items-center justify-center">
          {isPremium ? (
            <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">
              {typedMessage}
            </p>
          ) : (
            showWelcome && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="text-white font-bold tracking-widest uppercase text-sm"
              >
                Welcome to {businessData.name}
              </motion.p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

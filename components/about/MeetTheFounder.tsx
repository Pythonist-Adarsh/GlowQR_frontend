'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin, Instagram, Twitter, Quote } from 'lucide-react'

// Simple count up component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, inView]);

  return <span ref={ref}>{count}{suffix}</span>
}

export function MeetTheFounder() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section className="mb-20">
      <div className="group relative bg-[var(--bg-secondary)] p-8 md:p-12 rounded-3xl border border-[var(--border-default)] overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:border-[#7C3AED]/50 hover:shadow-xl hover:shadow-[#7C3AED]/5">
        
        {/* Subtle radial gradient glow behind photo */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7C3AED]/15 via-transparent to-transparent -translate-x-1/4 -translate-y-1/4 pointer-events-none rounded-full" />

        {/* Large decorative quote mark */}
        <Quote className="absolute right-8 top-8 w-32 h-32 text-[var(--border-default)] opacity-20 pointer-events-none rotate-12" />

        <div className="relative flex flex-col md:flex-row gap-12 md:gap-16">
          
          {/* Left Column: Photo + Stats + Socials */}
          <div className="flex flex-col items-center shrink-0 w-full md:w-auto">
            <div className="mb-8">
              <img 
                src="/founder.png" 
                alt="Adarsh, Founder of GlowQR" 
                className="w-[140px] h-[140px] rounded-full object-cover object-[center_20%] shadow-lg border-4 border-[var(--brand-primary)]/20 relative z-10"
              />
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-8 text-center justify-center">
              <div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">
                  <AnimatedCounter end={50} suffix="+" duration={1500} />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold mt-1">Businesses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">
                  <AnimatedCounter end={1000} suffix="+" duration={2000} />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold mt-1">Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">
                  <AnimatedCounter end={100} suffix="%" duration={1000} />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold mt-1">Support</div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#7C3AED] hover:border-[#7C3AED] hover:scale-110 transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#7C3AED] hover:border-[#7C3AED] hover:scale-110 transition-all duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#7C3AED] hover:border-[#7C3AED] hover:scale-110 transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left relative z-10">
            <div className="mb-8 flex flex-col items-center md:items-start">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
                Meet the Founder
              </h2>
              <div className="w-16 h-1 bg-[#7C3AED] rounded-full"></div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              <motion.p variants={itemVariants} className="text-[var(--text-primary)] text-lg leading-relaxed font-medium">
                "I'm Adarsh, the founder of GlowQR. While working closely with local businesses in Lucknow, I noticed a common problem — most had happy customers and strong Google ratings potential, but no simple way to convert that satisfaction into actual reviews. Asking customers felt awkward, and follow-ups rarely worked.
              </motion.p>
              <motion.p variants={itemVariants} className="text-[var(--text-primary)] text-lg leading-relaxed font-medium">
                GlowQR was built to solve exactly that: a QR code that turns a satisfied customer into a written Google review in under a minute, powered by AI.
              </motion.p>
              <motion.p variants={itemVariants} className="text-[var(--text-primary)] text-lg leading-relaxed font-medium">
                Today, restaurants, salons, CA firms, and retail businesses across Lucknow use GlowQR to grow their online reputation — and I work directly with every client to make sure it delivers real results."
              </motion.p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

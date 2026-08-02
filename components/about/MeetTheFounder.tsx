'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const TwitterIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
)



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

        <div className="relative flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          
          {/* Left Column: Photo + Stats + Socials */}
          <div className="flex flex-col items-center shrink-0 w-full md:w-auto">
            <div className="mb-4">
              <img 
                src="/founder.png" 
                alt="Adarsh, Founder of GlowQR" 
                className="w-[140px] h-[140px] rounded-full object-cover object-[center_20%] shadow-lg border-4 border-[var(--brand-primary)]/20 relative z-10"
              />
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/adarsh-tiwari-78271a266/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#7C3AED] hover:border-[#7C3AED] hover:scale-110 transition-all duration-200">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/solojourney.ai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#7C3AED] hover:border-[#7C3AED] hover:scale-110 transition-all duration-200">
                <InstagramIcon className="w-4 h-4" />
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
                "I'm Adarsh, the founder of GlowQR. While working closely with local businesses, I noticed a common problem — most had happy customers and strong Google ratings potential, but no simple way to convert that satisfaction into actual reviews. Asking customers felt awkward, and follow-ups rarely worked.
              </motion.p>
              <motion.p variants={itemVariants} className="text-[var(--text-primary)] text-lg leading-relaxed font-medium">
                GlowQR was built to solve exactly that: a QR code that turns a satisfied customer into a written Google review in under a minute, powered by AI.
              </motion.p>
              <motion.p variants={itemVariants} className="text-[var(--text-primary)] text-lg leading-relaxed font-medium">
                Today, restaurants, salons, CA firms, and retail businesses use GlowQR to grow their online reputation — and I work directly with every client to make sure it delivers real results."
              </motion.p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

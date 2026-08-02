'use client'

import React, { useState } from 'react'

const businesses = [
  { name: 'DANBAM', logo: 'https://res.cloudinary.com/dblijhoto/image/upload/v1785419234/glowqr/logos/28/q1bgqc11g0pc6glarqly.jpg', initials: 'DB' },
  { name: 'House of Adayein', logo: 'https://res.cloudinary.com/dblijhoto/image/upload/v1783425870/glowqr/logos/39/ofm2pxg9hpw92eyq837b.png', initials: 'HA' },
  { name: 'Taxcare', logo: 'https://res.cloudinary.com/dblijhoto/image/upload/v1785065034/glowqr/logos/59/wlhm8wq6mmdxe1sepvli.jpg', initials: 'TC' },
  { name: 'Vernika Academy', logo: 'https://res.cloudinary.com/dblijhoto/image/upload/v1785069169/glowqr/logos/60/hnem4ee5delew1pdcosq.jpg', initials: 'VA' },
]

// Create enough items to fill the screen, then duplicate exactly for seamless looping
const halfItems = Array(5).fill(businesses).flat()
const allItems = [...halfItems, ...halfItems]

function LogoItem({ item }: { item: typeof businesses[0] }) {
  const [error, setError] = useState(false)

  return (
    <div className="flex items-center shrink-0 group/logo">
      <div className="flex items-center gap-3 transition-transform duration-300 group-hover/logo:scale-105 pr-6 cursor-pointer">
        <div className="relative flex items-center justify-center h-10 opacity-[0.85] grayscale transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0">
          {!error ? (
            <img 
              src={item.logo} 
              alt={item.name} 
              className="h-full w-auto object-contain"
              onError={() => setError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-10 px-3 bg-gray-100 text-gray-500 rounded font-bold text-sm tracking-widest border border-gray-200">
              {item.initials}
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-[var(--text-secondary)] tracking-wide group-hover/logo:text-[var(--text-primary)] transition-colors duration-300">{item.name}</span>
      </div>
      <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 opacity-50"></div>
    </div>
  )
}

export function TrustedBy() {
  return (
    <section className="py-16 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
        }
        .marquee-container:hover .animate-marquee-scroll {
          animation-play-state: paused;
        }
        
        /* Ensure the mask uses rgba for better cross-browser fade support */
        .marquee-mask {
          mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%);
          -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%);
        }
      `}} />
      <div className="max-w-7xl mx-auto px-6 text-center mb-10 relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
          Trusted by growing businesses
        </h2>
      </div>

      <div className="relative flex overflow-hidden marquee-container w-full marquee-mask">
        <div className="animate-marquee-scroll gap-6 px-3">
          {allItems.map((item, idx) => (
            <LogoItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import React from 'react'

const businesses = [
  { name: 'DANBAM', icon: '🍽️' },
  { name: 'House of Adayein', icon: '💍' },
  { name: 'Taxcare', icon: '📊' },
]

// Create enough items to fill the screen, then duplicate exactly for seamless looping
const halfItems = Array(6).fill(businesses).flat()
const allItems = [...halfItems, ...halfItems]

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
          animation: marquee 45s linear infinite;
        }
        .marquee-container:hover .animate-marquee-scroll {
          animation-play-state: paused;
        }
        
        /* Optional: Add gradient masks to the edges for a fade effect */
        .marquee-mask {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
      <div className="max-w-7xl mx-auto px-6 text-center mb-8 relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
          Trusted by growing businesses
        </h2>
      </div>

      <div className="relative flex overflow-hidden marquee-container w-full marquee-mask">
        <div className="animate-marquee-scroll gap-6 px-3">
          {allItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#111111] border border-[#333333] shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-semibold text-[#f4f4f5] tracking-wide">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

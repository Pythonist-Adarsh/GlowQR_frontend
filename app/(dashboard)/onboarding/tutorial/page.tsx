'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlowLogo } from '@/components/GlowLogo';
import { Check, Play, Sparkles } from 'lucide-react';

const CHAPTERS = [
  { id: 1, name: 'Business Info', desc: "Adding your business name, tagline, and Google review link." },
  { id: 2, name: 'Location Details', desc: "Setting your city, address, phone number, and hours." },
  { id: 3, name: 'Category & Speciality', desc: "Choosing your industry, price range, and dietary options." },
  { id: 4, name: 'Menu & Services', desc: "Uploading your menu or manually adding signature items." },
  { id: 5, name: 'Theme Design', desc: "Selecting animation styles, colors, and the welcome message." },
  { id: 6, name: 'QR Code Generation', desc: "Downloading your final personalized QR code." },
];

export default function TutorialPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Navbar */}
      <header className="border-b border-slate-800/60 bg-[#0B0C10]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
              <GlowLogo size={32} />
              <span className="font-display text-lg font-black tracking-tight">GlowQR</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-300">Setup Tutorial Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="/onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-full text-sm hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Start Real Setup
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        
        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest text-xs uppercase mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Quick Start Guide</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
            Master your business setup in <span className="relative inline-block text-white after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-emerald-500/50">4 minutes.</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Watch the walkthrough below to see how to properly configure your QR Review platform and start collecting 5-star Google reviews today.
          </p>
        </div>

        {/* Video & Chapters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Video Player */}
          <div className="lg:col-span-2 relative group rounded-[2rem] overflow-hidden bg-black shadow-2xl border border-slate-800/50 aspect-video flex items-center justify-center">
             <video 
               className="w-full h-full object-contain"
               controls 
               preload="metadata"
               poster="/images/tutorial-poster.jpg"
             >
               <source src="https://res.cloudinary.com/dblijhoto/video/upload/v1782575123/GloQR_Review_System_Setup_Guide_1_qnsnfs.mp4" type="video/mp4" />
               Your browser does not support the video tag.
             </video>
          </div>

          {/* Tutorial Chapters */}
          <div className="bg-[#13141A] rounded-[2rem] border border-slate-800/60 p-8 flex flex-col shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white mb-2">Tutorial Chapters</h2>
              <p className="text-sm text-slate-400">Follow along with the video steps</p>
            </div>

            <div className="relative flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">
              {/* Vertical line connecting steps */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-800" />
              
              {CHAPTERS.map((chapter, index) => (
                <div key={chapter.id} className="relative z-10 flex gap-6 group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-[#0B0C10] border-2 border-slate-700 flex items-center justify-center text-slate-400 font-bold text-sm shadow-xl group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
                      {chapter.id < 2 ? <Check className="w-5 h-5" /> : `0${chapter.id}`}
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-base font-bold text-slate-200 group-hover:text-white transition-colors">{chapter.id}. {chapter.name}</h3>
                      {chapter.id === 2 && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                          Watching
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {chapter.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800">
               <div className="bg-slate-800/30 rounded-xl p-4 flex gap-3 items-start border border-slate-700/50">
                 <div className="w-5 h-5 rounded-full border border-slate-500 flex items-center justify-center text-[10px] font-bold text-slate-400 flex-shrink-0 mt-0.5">i</div>
                 <p className="text-xs text-slate-400 leading-relaxed">
                   <strong className="text-slate-300">Tip:</strong> Use the exact business name found on your Google Maps listing to ensure the AI matches correctly.
                 </p>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

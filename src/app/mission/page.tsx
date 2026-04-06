"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MissionPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out w-full min-h-[85vh] relative">

      {/* Return Button */}
      <Link href="/" className="absolute top-4 left-4 lg:left-0 z-50">
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl glass hover:border-neon-g/50 transition-all group"
        >
          <span className="text-neon-g group-hover:translate-x-[-2px] transition-transform">←</span>
          <span>Return Dashboard</span>
        </motion.button>
      </Link>
      <div className="max-w-5xl text-center space-y-12 px-6">
        
        {/* Cinematic Header */}
        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-white/70 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] leading-tight">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-tr from-neon-o to-[#ff9d3d] drop-shadow-[0_0_15px_rgba(255,106,61,0.5)]">Mission</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-black max-w-2xl mx-auto drop-shadow-md">
          Supply chain rehabilitation begins with the 1% of educated consumer power.
        </p>

        {/* Global Impact Plate (Glassmorphic) */}
        <div className="w-full mt-12 p-12 lg:p-16 rounded-[64px] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_100px_rgba(0,0,0,0.6)] relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-neon-o/5 to-transparent pointer-events-none" />
           
           <div className="grid grid-cols-1 md:grid-cols-3 justify-around items-center gap-12 relative z-10">
              <div className="text-center group-hover:scale-110 transition-transform duration-700">
                 <h4 className="text-5xl sm:text-6xl font-black text-neon-o mb-3 drop-shadow-[0_0_20px_#ff6a3d]">642,810</h4>
                 <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">kg Plastic Diverted</p>
              </div>
              <div className="text-center group-hover:scale-110 transition-transform duration-700 delay-75">
                <h4 className="text-5xl sm:text-6xl font-black text-neon-g mb-3 drop-shadow-[0_0_20px_#3fff2d]">1,429.5</h4>
                 <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">MT CO2e Reduced</p>
              </div>
              <div className="text-center group-hover:scale-110 transition-transform duration-700 delay-150">
                 <h4 className="text-5xl sm:text-6xl font-black text-white mb-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">925.2M</h4>
                 <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">Liters Water Conserved</p>
              </div>
           </div>
           
           <div className="mt-16 pt-8 border-t border-white/5 relative z-10">
             <p className="text-zinc-400 text-lg sm:text-xl max-w-3xl mx-auto italic font-medium leading-relaxed">
               "By 2030, our goal is to assist millions in automatically routing purchasing power into ecological alternatives through zero-friction checkouts."
             </p>
           </div>
        </div>

        {/* Call to Action Accent */}
        <div className="pt-8">
           <div className="inline-block px-10 py-5 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 text-white font-black text-sm uppercase tracking-[0.3em] glass neon-glow-white">
             Forging a Greener Future 🌍
           </div>
        </div>

      </div>
    </div>
  );
}

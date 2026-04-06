"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out w-full min-h-[80vh] relative">
      
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
      <div className="max-w-4xl text-center space-y-12 px-4">
        
        {/* Cinematic Header */}
        <h1 className="text-6xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-white/70 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-tr from-neon-g to-[#3fff2d] drop-shadow-[0_0_15px_rgba(63,255,45,0.4)]">Eco Cart</span>
        </h1>

        <div className="space-y-6 text-center">
          <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-bold max-w-3xl mx-auto drop-shadow-sm">
            Consumer transparency is the final frontier of sustainability. 
          </p>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Eco Cart was founded on a simple principle: you cannot optimize what you cannot see. We explicitly expose the "check-out" cost of carbon, plastic, and water hidden behind industry marketing.
          </p>
        </div>

        {/* Glassmorphic Foundation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
           <div className="p-10 rounded-[40px] bg-black/40 backdrop-blur-3xl border border-white/10 text-left shadow-2xl glass hover:border-white/20 transition-all duration-500">
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Core Foundation</h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Built by a collective of engineers tired of "green-washing", we developed a real-time data visualizer strictly mapping conventional commodities against their optimized, highly-sustainable marketplace equivalents.
              </p>
           </div>
           <div className="p-10 rounded-[40px] bg-black/40 backdrop-blur-3xl border border-white/10 text-left shadow-2xl glass hover:border-neon-g/30 transition-all duration-500">
              <h3 className="text-2xl font-black text-neon-g mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(63,255,45,0.2)]">Impact Engine</h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Leveraging React-driven real-time states, Eco Cart dynamically graphs exactly what you would save the planet by choosing an alternative checkout. Data-driven choices for a better future.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}

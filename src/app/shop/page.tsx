"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const [filter, setFilter] = useState<"all" | "eco" | "traditional">("all");

  const displayedProducts = products.filter((p) => {
    if (filter === "eco") return p.isEco;
    if (filter === "traditional") return !p.isEco;
    return true;
  });

  const formatValue = (val: number, unit: string) => {
    if (val < 1 && val > 0) return `${val.toFixed(2)}${unit}`;
    if (val < 10) return `${val.toFixed(1)}${unit}`;
    return `${Math.round(val)}${unit}`;
  };

  return (
    <div className="flex flex-col py-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out w-full max-w-7xl mx-auto px-6 relative">
      
      {/* Return Button */}
      <Link href="/" className="absolute top-4 left-4 lg:left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl glass hover:border-neon-g/50 transition-all group"
        >
          <span className="text-neon-g group-hover:translate-x-[-2px] transition-transform">←</span>
          <span>Return Dashboard</span>
        </motion.button>
      </Link>
      
      {/* Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 gap-10">
         <div className="text-center lg:text-left space-y-4">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-white/70 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-tight">
               Green <span className="text-transparent bg-clip-text bg-gradient-to-tr from-neon-g to-[#3fff2d] drop-shadow-[0_0_15px_rgba(63,255,45,0.5)]">Catalog.</span>
            </h1>
            <p className="text-zinc-400 max-w-xl font-bold italic text-lg lg:text-xl drop-shadow-sm">
               The definitive database of sustainable swaps and conventional counterparts.
            </p>
         </div>

         {/* Cinematic Filter Bar */}
         <div className="flex bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full p-2 shadow-2xl glass overflow-hidden">
            <button 
               onClick={() => setFilter("all")} 
               className={`px-8 py-3 font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${filter === "all" ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "text-white/40 hover:text-white"}`}
            >
               All
            </button>
            <button 
               onClick={() => setFilter("traditional")} 
               className={`px-8 py-3 font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${filter === "traditional" ? "bg-neon-o/20 text-neon-o border border-neon-o/40" : "text-white/40 hover:text-neon-o"}`}
            >
               Conventional
            </button>
            <button 
               onClick={() => setFilter("eco")} 
               className={`px-8 py-3 font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${filter === "eco" ? "bg-neon-g/20 text-neon-g border border-neon-g/40" : "text-white/40 hover:text-neon-g"}`}
            >
               Sustainable
            </button>
         </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProducts.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={product.id} 
              className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden hover:shadow-2xl hover:border-white/20 transition-all duration-500 group flex flex-col glass relative"
            >
              <div className="w-full aspect-square bg-black/50 border-b border-white/5 relative flex items-center justify-center p-8 transition-colors group-hover:bg-black/60">
                 {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                 ) : (
                    <div className="text-4xl">🌱</div>
                 )}
                 {product.isEco && (
                    <div className="absolute top-4 right-4 bg-neon-g/20 text-neon-g border border-neon-g/40 text-[10px] font-black px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(63,255,45,0.3)] tracking-widest uppercase">
                       ECO-Evolution
                    </div>
                 )}
              </div>
              
              <div className="p-8 flex-col flex flex-1 space-y-4">
                 <div>
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-1">{product.category} • {product.brand}</p>
                    <h3 className="font-bold text-xl text-white leading-tight drop-shadow-md line-clamp-2">{product.name}</h3>
                 </div>
                 
                 <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                    <div className="flex flex-col">
                       <span className="text-[9px] text-white/20 font-black uppercase mb-1">Plastic Payload</span>
                       <span className={`text-lg font-black transition-colors ${product.isEco ? "text-neon-g drop-shadow-[0_0_8px_#3fff2d]" : "text-white"}`}>
                          {formatValue(product.impact.plastic, "g")}
                       </span>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-[9px] text-white/20 font-black uppercase mb-1">Carbon (kg)</span>
                       <span className={`text-lg font-black transition-colors ${product.isEco ? "text-neon-g/80" : "text-white/60 text-sm"}`}>
                          {product.impact.carbon}
                       </span>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

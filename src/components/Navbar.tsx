"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function Navbar() {
  const { cartItems } = useCart();

  // Compute actual carbon saved
  const impactCount = useMemo(() => {
    let savedCarbon = 0;
    cartItems.forEach((item) => {
      if (item.isEco) {
        const trad = products.find((p) => p.alternativeId === item.id);
        if (trad) {
          savedCarbon += (trad.impact.carbon - item.impact.carbon);
        }
      }
    });
    return savedCarbon.toFixed(1);
  }, [cartItems]);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-3xl bg-black/40 border-b border-white/5 shadow-2xl transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-neon-g text-ink flex items-center justify-center font-black text-xl shadow-[0_0_20px_#3fff2d] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              E
            </div>
            <span className="font-black text-2xl text-white tracking-tighter hidden sm:block drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              EcoCart
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-12">
            <Link href="/shop" className="text-zinc-100 hover:text-neon-g transition-all font-black uppercase tracking-[0.25em] text-[11px] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Shop</Link>
            <Link href="/about" className="text-zinc-100 hover:text-neon-g transition-all font-black uppercase tracking-[0.25em] text-[11px] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">About</Link>
            <Link href="/mission" className="text-zinc-100 hover:text-neon-g transition-all font-black uppercase tracking-[0.25em] text-[11px] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Mission</Link>
          </div>

          {/* Cart metrics */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl px-6 py-2.5 rounded-3xl border border-white/10 shadow-lg hover:border-neon-g/30 transition-all cursor-default group">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] group-hover:text-neon-g/50 transition-colors">Carbon Saved</span>
              <span className="text-sm font-black text-neon-g drop-shadow-[0_0_8px_#3fff2d]">{impactCount} kg CO₂</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-xl shadow-inner border border-white/5 group-hover:bg-neon-g/10 transition-all">
              🌱
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

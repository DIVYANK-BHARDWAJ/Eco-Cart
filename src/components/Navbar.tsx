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
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-ricepaper/80 border-b border-sage/30 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-forest text-ricepaper flex items-center justify-center font-bold text-lg group-hover:bg-sage transition-colors duration-300">
              E
            </div>
            <span className="font-bold text-xl text-forest tracking-tight hidden sm:block">
              EcoCart
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/shop" className="text-forest hover:text-clay transition-colors font-medium">Shop</Link>
            <Link href="/about" className="text-forest hover:text-clay transition-colors font-medium">About</Link>
            <Link href="/mission" className="text-forest hover:text-clay transition-colors font-medium">Mission</Link>
          </div>

          {/* Cart metrics */}
          <div className="flex items-center gap-3 bg-white/50 px-4 py-2 rounded-full border border-sage/50 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-sage uppercase tracking-wider">Carbon Saved</span>
              <span className="text-sm font-bold text-clay">{impactCount} kg CO₂</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-clay/10 flex items-center justify-center text-clay">
              🌱
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

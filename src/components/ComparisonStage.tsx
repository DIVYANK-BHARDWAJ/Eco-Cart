"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ComparisonStageProps {
  traditional: Product;
  sustainable: Product;
  onReset?: () => void;
}

export default function ComparisonStage({
  traditional,
  sustainable,
  onReset,
}: ComparisonStageProps) {
  const { replaceInCart, addToCart, cartItems } = useCart();
  const [swapped, setSwapped] = useState(false);

  const handleSwap = () => {
    // Play user-provided physical MP3 asset
    try {
      const audio = new Audio('/sounds/sparkle.mp3');
      audio.play();
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }

    // Trigger confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#1E392A", "#A8BBA1", "#D97757", "#F9F7F2"],
    });

    // Replace in cart if traditional already exists in state, otherwise just add sustainable
    const inCart = cartItems.find((item) => item.id === traditional.id);
    if (inCart) {
      replaceInCart(traditional.id, sustainable);
    } else {
      addToCart(sustainable);
    }

    setSwapped(true);

    // Open Amazon directly after a short delay so the confetti can be enjoyed
    setTimeout(() => {
      const query = encodeURIComponent(`${sustainable.brand} ${sustainable.name}`);
      window.open(`https://www.amazon.com/s?k=${query}`, "_blank", "noopener,noreferrer");
    }, 1500);
  };

  const plasticSaved = (traditional.impact.plastic - sustainable.impact.plastic).toFixed(0);
  const carbonSaved = (traditional.impact.carbon - sustainable.impact.carbon).toFixed(2);
  const waterSaved = (traditional.impact.water - sustainable.impact.water).toFixed(1);

  return (
    <div className="relative flex flex-col md:flex-row items-center gap-6 justify-center w-full max-w-5xl mx-auto py-10">
      
      {/* Traditional Item Card */}
      <div 
        className={`flex-1 w-full p-6 rounded-2xl border-2 transition-all duration-500 backdrop-blur-md bg-white/70 ${
          swapped ? "opacity-50 grayscale border-gray-200" : "border-clay shadow-lg"
        }`}
      >
        <h3 className="text-xl font-bold text-ink mb-1">{traditional.name}</h3>
        <p className="text-ink/60 text-sm mb-4">{traditional.brand}</p>
        
        {traditional.imageUrl && (
          <div className="w-full aspect-video md:aspect-square mb-6 rounded-xl overflow-hidden bg-white mt-2 border border-clay/10 relative shadow-inner flex items-center justify-center p-6">
             <img src={traditional.imageUrl} alt={traditional.name} className="object-contain w-full h-full filter drop-shadow-sm transition-transform duration-300 hover:scale-105" />
          </div>
        )}

        <div className="bg-clay/10 p-4 rounded-xl border border-clay/20">
          <h4 className="text-sm font-semibold text-clay uppercase tracking-wide mb-3">Environmental Cost</h4>
          <ul className="space-y-2 text-sm text-ink/80">
            <li className="flex justify-between">
              <span>Single-use Plastic:</span>
              <span className="font-medium">{traditional.impact.plastic}g</span>
            </li>
            <li className="flex justify-between">
              <span>Carbon Emissions:</span>
              <span className="font-medium">{traditional.impact.carbon}kg</span>
            </li>
            <li className="flex justify-between">
              <span>Water Usage:</span>
              <span className="font-medium">{traditional.impact.water} gal</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Center Swap Button */}
      <div className="z-10 -my-4 md:-mx-4 md:my-0 flex-shrink-0">
        <motion.button
          whileTap={!swapped ? { scale: 0.95 } : undefined}
          onClick={handleSwap}
          disabled={swapped}
          className={`flex items-center justify-center w-36 h-14 md:w-40 md:h-16 rounded-full font-bold text-ricepaper text-lg shadow-xl outline-none transition-all duration-300 ${
            swapped 
              ? "bg-sage cursor-default shadow-sm text-forest" 
              : "bg-forest hover:scale-[1.02] hover:shadow-2xl hover:bg-forest/90 cursor-pointer"
          }`}
        >
          {swapped ? "Swapped! 🌱" : "Swap & Save"}
        </motion.button>
      </div>

      {/* Sustainable Item Card */}
      <div 
        className={`flex-1 w-full p-6 rounded-2xl border-2 transition-all duration-500 backdrop-blur-md bg-white/70 flex flex-col justify-between ${
          swapped ? "border-sage shadow-2xl scale-[1.02]" : "border-sage/50 opacity-90 shadow-md"
        }`}
      >
        <div>
          <h3 className="text-xl font-bold text-ink mb-1">{sustainable.name}</h3>
          <p className="text-ink/60 text-sm mb-4">{sustainable.brand}</p>
          
          {sustainable.imageUrl && (
            <div className="w-full aspect-video md:aspect-square mb-6 rounded-xl overflow-hidden bg-white mt-2 border border-sage/10 relative shadow-inner flex items-center justify-center p-6">
              <img src={sustainable.imageUrl} alt={sustainable.name} className="object-contain w-full h-full filter drop-shadow-sm transition-transform duration-300 hover:scale-105" />
            </div>
          )}

          <div className="bg-sage/10 p-4 rounded-xl border border-sage/30 mb-6">
            <h4 className="text-sm font-semibold text-forest uppercase tracking-wide mb-3">Sustainability Gains</h4>
            <ul className="space-y-2 text-sm text-forest/90">
              <li className="flex justify-between">
                <span>Plastic Saved:</span>
                <span className="font-bold text-sage-dark">↓ {plasticSaved}g</span>
              </li>
              <li className="flex justify-between">
                <span>Carbon Reduced:</span>
                <span className="font-bold text-sage-dark">↓ {carbonSaved}kg</span>
              </li>
              <li className="flex justify-between">
                <span>Water Conserved:</span>
                <span className="font-bold text-sage-dark">↓ {waterSaved} gal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dynamic Reset Action Route */}
        <div className={`mt-auto transition-opacity duration-500 ${swapped && onReset ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
           <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="w-full py-3 bg-forest text-ricepaper font-medium rounded-xl shadow-sm hover:bg-forest/90 transition-colors"
           >
              Compare Another Item +
           </motion.button>
        </div>
      </div>

    </div>
  );
}

"use client";

import React, { useState } from "react";
import { products } from "@/data/products";

export default function ShopPage() {
  const [filter, setFilter] = useState<"all" | "eco" | "traditional">("all");

  const displayedProducts = products.filter((p) => {
    if (filter === "eco") return p.isEco;
    if (filter === "traditional") return !p.isEco;
    return true;
  });

  return (
    <div className="flex flex-col py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
         <div>
            <h1 className="text-4xl font-bold tracking-tight text-forest mb-2">
               The Green Catalog
            </h1>
            <p className="text-ink/70 max-w-xl">
               Browse our entire database of supported sustainable swaps and their conventional counterparts.
            </p>
         </div>

         <div className="flex bg-white/50 backdrop-blur-md border border-sage/30 rounded-xl p-1 shadow-sm">
            <button 
               onClick={() => setFilter("all")} 
               className={`px-4 py-2 font-medium rounded-lg transition-colors ${filter === "all" ? "bg-forest w-full text-ricepaper shadow-sm" : "text-ink hover:bg-sage/20"}`}
            >
               All
            </button>
            <button 
               onClick={() => setFilter("traditional")} 
               className={`px-4 py-2 font-medium rounded-lg transition-colors ${filter === "traditional" ? "bg-clay text-ricepaper shadow-sm" : "text-ink hover:bg-sage/20"}`}
            >
               Conventional
            </button>
            <button 
               onClick={() => setFilter("eco")} 
               className={`px-4 py-2 font-medium rounded-lg transition-colors ${filter === "eco" ? "bg-sage text-forest shadow-sm" : "text-ink hover:bg-sage/20"}`}
            >
               Sustainable
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bg-white/70 backdrop-blur-md border border-sage/40 rounded-2xl overflow-hidden hover:shadow-xl hover:border-forest/50 transition-all duration-300 group flex flex-col">
            <div className="w-full aspect-square bg-white border-b border-sage/10 relative flex items-center justify-center p-4">
               {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
               ) : (
                  <div className="text-4xl">🌱</div>
               )}
               {product.isEco && (
                  <div className="absolute top-3 right-3 bg-sage text-forest text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                     ECO Choice
                  </div>
               )}
            </div>
            <div className="p-5 flex-col flex flex-1">
               <p className="text-sm text-ink/50 font-semibold mb-1 uppercase tracking-wide">{product.category}</p>
               <h3 className="font-bold text-lg text-ink leading-tight mb-4">{product.name}</h3>
               <div className="mt-auto flex justify-between items-center text-sm">
                  <span className="text-ink/70 font-medium">{product.brand}</span>
                  <span className={`font-bold ${product.isEco ? "text-forest" : "text-clay"}`}>
                     {product.isEco ? `↓${product.impact.plastic}g Plastic` : `${product.impact.plastic}g Plastic`}
                  </span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComparisonStage from "@/components/ComparisonStage";
import ImpactDashboard from "@/components/ImpactDashboard";
import AuditOverlay from "@/components/AuditOverlay";
import { products, Product } from "@/data/products";

export default function Home() {
  const [isOverlayActive, setIsOverlayActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeComparison, setActiveComparison] = useState<{traditional: Product, sustainable: Product} | null>(null);

  // Filter only traditional items for the search logic
  const traditionalProducts = products.filter((p) => !p.isEco);

  const suggestions = searchQuery.trim() === "" 
    ? [] 
    : traditionalProducts.filter((p) => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSelectSuggestion = (product: Product) => {
    const alternative = products.find((p) => p.id === product.alternativeId);
    if (alternative) {
      setActiveComparison({ traditional: product, sustainable: alternative });
      setSearchQuery("");
    }
  };

  return (
    <div className="flex flex-col items-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out space-y-16 w-full relative min-h-screen bg-gradient-to-br from-ricepaper via-sage/10 to-white overflow-hidden">
      
      {/* Ambient background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sage/20 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-clay/10 blur-[100px] pointer-events-none -z-10" />

      {/* High-Impact Overlay */}
      <AuditOverlay 
        isActive={isOverlayActive} 
        onEnded={() => setIsOverlayActive(false)} 
      />

      {/* Hero Section */}
      <div className="max-w-4xl text-center space-y-8 z-10 px-4">
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-forest to-sage-dark pb-2 drop-shadow-sm">
          Organic. Sustainable. <span className="text-transparent bg-clip-text bg-gradient-to-tr from-clay to-[#e86a43]">Yours.</span>
        </h1>
        <p className="text-lg sm:text-xl text-ink/70 max-w-2xl mx-auto leading-relaxed font-medium">
          Welcome to Eco Cart. Search for everyday items below to instantly uncover their environmental cost and discover optimized shopping choices.
        </p>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto pt-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6 text-sage group-focus-within:text-forest transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              className="w-full pl-16 pr-6 py-5 rounded-full border-2 border-sage/30 text-ink bg-white/80 backdrop-blur-xl focus:outline-none focus:border-forest/80 shadow-[0_8px_30px_rgb(168,187,161,0.2)] focus:shadow-[0_12px_40px_rgb(30,57,42,0.15)] transition-all duration-300 text-lg font-medium placeholder:text-ink/40"
              placeholder="🔍 Search for 'Shampoo', 'Plastic', 'Coffee'..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute w-full mt-2 bg-white/90 backdrop-blur-xl border border-sage/30 rounded-2xl shadow-xl overflow-hidden z-50 text-left"
              >
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-forest hover:text-ricepaper transition-colors group border-b border-sage/10 last:border-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg text-ink group-hover:text-ricepaper transition-colors">{item.name}</span>
                      <span className="text-sm text-ink/60 group-hover:text-ricepaper/80 transition-colors">{item.category} • {item.brand}</span>
                    </div>
                    <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">→</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOverlayActive(true)}
            className="px-6 py-2 bg-transparent text-sage border-b-2 border-sage/30 font-medium hover:text-forest hover:border-forest transition-all duration-300 focus:outline-none"
          >
            Replay Intro Video
          </motion.button>
        </div>
      </div>

      {/* Dynamic Comparison Dashboard Section */}
      <div className="w-full flex-col flex items-center space-y-12">
        
        {activeComparison ? (
          <div className="w-full flex-col flex items-center animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-forest mb-2">The Swap</h2>
              <p className="text-ink/70">Here is the optimized choice for your search.</p>
            </div>
            
            <ComparisonStage 
              // React key forces Unmount & Remount animations when active Comparison changes
              key={activeComparison.traditional.id}
              traditional={activeComparison.traditional} 
              sustainable={activeComparison.sustainable} 
              onReset={() => setActiveComparison(null)}
            />
          </div>
        ) : (
          <div className="w-full max-w-5xl mx-auto h-[400px] flex flex-col items-center justify-center border border-sage/20 rounded-[40px] bg-white/40 backdrop-blur-md shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-clay/5 opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl mb-6 opacity-80"
              >
                🌍
              </motion.div>
              <p className="text-forest text-2xl font-bold tracking-tight mb-2">Awaiting your Search</p>
              <p className="text-ink/60 font-medium max-w-md text-center">
                 Type a common everyday household item into the search bar above to instantly map its environmental alternatives.
              </p>
          </div>
        )}
        
        <div className="w-full pt-10">
          <ImpactDashboard />
        </div>
      </div>

    </div>
  );
}

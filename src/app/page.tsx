"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComparisonStage from "@/components/ComparisonStage";
import ImpactDashboard from "@/components/ImpactDashboard";
import AuditOverlay from "@/components/AuditOverlay";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { cartItems, addToCart, removeFromCart, isCartSwapped, clearCart } = useCart();
  const [isOverlayActive, setIsOverlayActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"searching" | "comparing">("searching");

  // Filter only traditional items for the search logic
  const traditionalProducts = products.filter((p) => !p.isEco);

  const suggestions = searchQuery.trim() === "" 
    ? [] 
    : traditionalProducts.filter((p) => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleAddToCart = (product: Product) => {
    // Check if already in cart
    if (!cartItems.find(item => item.id === product.id || item.alternativeId === product.id)) {
      addToCart(product);
    }
    setSearchQuery("");
  };

  const resetAll = () => {
    clearCart();
    setView("searching");
  };

  // Handle custom events for navigation and reset from child components
  useEffect(() => {
    const handleNavigate = (e: any) => setView(e.detail);
    const handleReset = () => resetAll();
    
    window.addEventListener('eco-cart-navigate', handleNavigate as EventListener);
    window.addEventListener('eco-cart-reset', handleReset);
    
    return () => {
      window.removeEventListener('eco-cart-navigate', handleNavigate as EventListener);
      window.removeEventListener('eco-cart-reset', handleReset);
    };
  }, []);

  return (
    <div className="flex flex-col items-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out space-y-16 w-full relative min-h-screen font-sans">
      
      {/* High-Impact Overlay */}
      <AuditOverlay 
        isActive={isOverlayActive} 
        onEnded={() => setIsOverlayActive(false)} 
      />

      {/* Hero Section */}
      <div className="max-w-4xl text-center space-y-8 z-10 px-4">
        <h1 className="text-6xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-ricepaper to-white/70 pb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-tight">
          Your Organic <span className="text-transparent bg-clip-text bg-gradient-to-tr from-neon-o to-[#ff9d3d] drop-shadow-[0_0_15px_rgba(255,106,61,0.5)]">Eco Cart.</span>
        </h1>
        <p className="text-lg sm:text-xl text-ricepaper/80 max-w-2xl mx-auto leading-relaxed font-semibold">
          Build your sustainable shopping list on a dynamic, analysis-driven platform. Transform your choices into planet-positive actions.
        </p>

        {view === "searching" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-2xl mx-auto pt-6"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-neon-g group-focus-within:drop-shadow-[0_0_10px_#3fff2d] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
                type="text" 
                className="w-full pl-16 pr-6 py-5 rounded-full border-2 border-white/10 text-ricepaper bg-black/40 backdrop-blur-2xl focus:outline-none focus:border-neon-g/50 shadow-[0_0_30px_rgba(63,255,45,0.1)] focus:shadow-[0_0_40px_rgba(63,255,45,0.2)] transition-all duration-300 text-lg font-medium placeholder:text-white/20"
                placeholder="🔍 Search for traditional products..." 
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
                  className="absolute w-full mt-4 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden z-50 text-left p-2"
                >
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddToCart(item)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/10 transition-all group rounded-2xl mb-1 last:mb-0"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-ricepaper transition-colors">{item.name}</span>
                        <span className="text-sm text-white/50 transition-colors">{item.category} • {item.brand}</span>
                      </div>
                      <motion.span 
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="bg-neon-g/10 text-neon-g text-xs font-black px-4 py-2 rounded-full border border-neon-g/40 glass neon-glow-green"
                      >
                        + Add to Cart
                      </motion.span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <motion.button 
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            onClick={() => setIsOverlayActive(true)}
            className="px-8 py-3 bg-white/5 backdrop-blur-2xl text-white border border-white/20 rounded-full font-black transition-all duration-300 flex items-center gap-2 glass neon-glow-white"
          >
            <span className="text-xl">🎬</span>
            <span className="tracking-tight">Replay Intro Video</span>
          </motion.button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 space-y-12 pb-20">
        
        {view === "searching" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Cart Preview */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-8 rounded-[48px] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)] h-fit relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-g/5 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">Your Cart</h3>
                  <span className="bg-neon-g text-ink px-4 py-1.5 rounded-full text-xs font-black shadow-[0_0_15px_#3fff2d]">{cartItems.length}</span>
                </div>
                
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                  {cartItems.length === 0 ? (
                    <p className="text-white/20 italic text-center py-12 font-medium">Your cart is empty.</p>
                  ) : (
                    cartItems.map(item => (
                      <motion.div 
                        layout 
                        key={item.id} 
                        whileHover={{ x: 5, scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                        className="flex items-center justify-between p-4 rounded-[24px] bg-white/5 border border-white/5 group shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">📦</span>
                          <div>
                             <p className="font-black text-sm text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">{item.name}</p>
                             <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{item.category}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-clay hover:bg-clay/10 rounded-full transition-all"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {cartItems.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -8, boxShadow: "0 0 40px rgba(63, 255, 45, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    onClick={() => setView("comparing")}
                    className="w-full mt-10 py-5 bg-neon-g text-ink font-black text-xl rounded-[32px] shadow-[0_0_20px_#3fff2d] transition-all flex items-center justify-center gap-4 relative z-10"
                  >
                    <span className="drop-shadow-[0_0_2px_rgba(0,0,0,0.2)]">Check Out & Save</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                  </motion.button>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
               <div className="bg-black/30 backdrop-blur-2xl rounded-[48px] border border-white/10 p-2 shadow-2xl">
                  <ImpactDashboard />
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="text-center space-y-2">
                <h2 className="text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Review & Swap</h2>
                <p className="text-white/60 font-semibold text-lg italic">Finalize your sustainable transition for a better planet.</p>
             </div>

             <ComparisonStage onReset={resetAll} />
             
             {/* Dynamic Layout Spacer & Visual Divider */}
             <div className="py-20 relative flex items-center justify-center">
                <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute px-6 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                   End of Results
                </div>
             </div>
             
             <div className="pb-32">
                <div className="bg-black/30 backdrop-blur-2xl rounded-[48px] border border-white/10 p-2 shadow-2xl relative z-10">
                   <ImpactDashboard />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

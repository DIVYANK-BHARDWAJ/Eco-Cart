import React from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Product, products } from "@/data/products";
import { useCart } from "@/context/CartContext";

// Sub-component for individual product pair comparison
const ComparisonCard = ({ 
  item, 
  isSwapped, 
  handleGoToAmazon 
}: { 
  item: Product; 
  isSwapped: boolean;
  handleGoToAmazon: (p: Product) => void;
}) => {
  // If item is eco, find the traditional product that points to it. Otherwise, find the eco alternative.
  const alternative = item.isEco 
    ? products.find((p) => p.alternativeId === item.id) 
    : products.find((p) => p.id === item.alternativeId);
  
  // High-Precision Core Logic: Ensure Trad is always Trad and Eco is always Eco
  const tradProduct = item.isEco ? alternative : item;
  const ecoProduct = item.isEco ? item : alternative;

  if (!tradProduct || !ecoProduct) return null; // Defensive safety

  const formatValue = (val: number, unit: string) => {
    if (val < 1 && val > 0) return `${val.toFixed(2)}${unit}`;
    if (val < 10) return `${val.toFixed(1)}${unit}`;
    return `${Math.round(val)}${unit}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[48px] overflow-hidden"
    >
      <div className="bg-black/40 backdrop-blur-3xl rounded-[46px] p-8 md:p-10 flex flex-col gap-8">
        
        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-10">
          
          {/* Traditional Product */}
          <div className={`p-6 rounded-[32px] border transition-all duration-500 relative group ${!isSwapped ? 'bg-white/5 border-white/20 opacity-100 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'bg-white/2 border-white/5 opacity-70'}`}>
            <div className="flex flex-col items-center gap-6">
              <div className="w-36 h-36 bg-black/40 rounded-2xl p-4 flex items-center justify-center relative">
                <img src={tradProduct.imageUrl} alt={tradProduct.name} className="w-full h-full object-contain" />
              </div>
              <div className="text-center w-full">
                <span className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-1">Traditional Choice</span>
                <h4 className="text-lg font-bold text-white/80 line-clamp-1">{tradProduct.name}</h4>
                <div className="mt-3 mb-6 flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-[9px] text-white/20 uppercase font-bold">Plastic</p>
                    <p className="text-sm font-black text-white/60">{formatValue(tradProduct.impact.plastic, "g")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-white/20 uppercase font-bold">CO₂</p>
                    <p className="text-sm font-black text-white/60">{tradProduct.impact.carbon}kg</p>
                  </div>
                </div>
                
                {/* Buy Button inside Traditional Column */}
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGoToAmazon(tradProduct)}
                  className="w-full py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-wider hover:bg-white/10 transition-all glass neon-glow-white"
                >
                  Buy Traditional ↗
                </motion.button>
              </div>
            </div>
          </div>

          {/* Swap Indicator */}
          <div className="flex flex-col items-center justify-center gap-2">
            <motion.div 
              animate={isSwapped ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
              className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${isSwapped ? 'bg-neon-g/20 border-neon-g text-neon-g shadow-[0_0_30px_#3fff2d]' : 'bg-white/5 border-white/10 text-white/20'}`}
            >
              <span className="text-3xl font-bold">→</span>
            </motion.div>
          </div>

          {/* Eco Product */}
          {ecoProduct && (
            <div className={`p-6 rounded-[32px] border transition-all duration-700 relative group overflow-hidden ${isSwapped ? 'bg-neon-g/10 border-neon-g/40 shadow-[0_0_50px_rgba(63,255,45,0.2)] opacity-100' : 'bg-white/5 border-white/5 opacity-70'}`}>
               <div className={`absolute inset-0 bg-neon-g/5 transition-opacity duration-700 ${isSwapped ? 'opacity-100' : 'opacity-0'}`} />
              <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="w-36 h-36 bg-black/40 rounded-2xl p-4 flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-neon-g/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={ecoProduct.imageUrl} alt={ecoProduct.name} className="w-full h-full object-contain relative z-10" />
                </div>
                <div className="text-center w-full">
                  <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${isSwapped ? 'text-neon-g' : 'text-white/30'}`}>Eco Evolution</span>
                  <h4 className={`text-lg font-bold line-clamp-1 ${isSwapped ? 'text-white' : 'text-white/60'}`}>{ecoProduct.name}</h4>
                  <div className="mt-3 mb-6 flex justify-center gap-4">
                    <div className="text-center">
                      <p className="text-[9px] text-white/20 uppercase font-bold">Plastic</p>
                      <p className={`text-sm font-black ${isSwapped ? 'text-neon-g' : 'text-white/40'}`}>{formatValue(ecoProduct.impact.plastic, "g")}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-white/20 uppercase font-bold">CO₂</p>
                      <p className={`text-sm font-black ${isSwapped ? 'text-neon-g' : 'text-white/40'}`}>{ecoProduct.impact.carbon}kg</p>
                    </div>
                  </div>

                  {/* Buy Button inside Eco Column */}
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(63,255,45,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGoToAmazon(ecoProduct)}
                    className={`w-full py-3 backdrop-blur-xl rounded-2xl border font-black text-[10px] uppercase tracking-wider transition-all glass ${
                      isSwapped 
                        ? 'bg-neon-g/20 border-neon-g text-white neon-glow-green' 
                        : 'bg-white/5 border-white/10 text-white/40'
                    }`}
                  >
                    Buy Sustainable ↗
                  </motion.button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
};

export default function ComparisonStage({
  onReset,
}: {
  onReset?: () => void;
}) {
  const { cartItems, isCartSwapped, bulkSwap } = useCart();

  const handleBulkSwap = () => {
    try {
      const audio = new Audio('/sounds/sparkle.mp3');
      audio.play();
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#3fff2d", "#ff6a3d", "#F9F7F2", "#1E392A"],
    });

    bulkSwap();
  };

  const handleGoToAmazon = (product: Product) => {
    const query = encodeURIComponent(`${product.brand} ${product.name}`);
    window.open(`https://www.google.com/search?q=${query}`, "_blank", "noopener,noreferrer");
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 py-8 px-4 relative">
      
      {/* Header Sticky Action Area */}
      <div className="sticky top-20 z-40 flex items-center justify-center gap-6 pb-12 pt-2 pointer-events-none">
         
         {/* Left Side Action: Add More */}
         {!isCartSwapped && (
           <motion.button
             whileHover={{ scale: 1.1, y: -8 }}
             whileTap={{ scale: 0.9 }}
             transition={{ type: "spring", stiffness: 400, damping: 12 }}
             onClick={() => window.dispatchEvent(new CustomEvent('eco-cart-navigate', { detail: 'searching' }))}
             className="px-8 py-4 rounded-3xl font-black bg-white/5 backdrop-blur-2xl text-white border border-white/10 shadow-xl pointer-events-auto flex items-center gap-3 transition-all glass neon-glow-white"
           >
             <span className="text-xl">➕</span>
             <span className="tracking-tight">Add Items</span>
           </motion.button>
         )}

         {/* Middle: Swap Button */}
         <motion.button
            whileHover={!isCartSwapped ? { scale: 1.1, y: -10 } : {}}
            whileTap={!isCartSwapped ? { scale: 0.95 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            onClick={handleBulkSwap}
            disabled={isCartSwapped}
            className={`px-14 py-7 rounded-full font-black text-2xl pointer-events-auto transition-all duration-500 flex items-center gap-5 border-2 glass ${
              isCartSwapped 
                ? "bg-white/5 text-white/30 border-white/5 cursor-default grayscale" 
                : "bg-neon-g/20 text-white border-neon-g cursor-pointer neon-glow-green"
            }`}
          >
            {isCartSwapped ? (
              <span className="flex items-center gap-4">
                <span className="text-4xl">🌍</span>
                ECO-SWAP COMPLETE
              </span>
            ) : (
              <span className="flex items-center gap-4">
                <span className="text-4xl animate-pulse">✨</span>
                REPLACE WITH ECO
              </span>
            )}
          </motion.button>

          {/* Right Side Action: Clear/Reset */}
          <motion.button
             whileHover={{ scale: 1.1, y: -8 }}
             whileTap={{ scale: 0.9 }}
             transition={{ type: "spring", stiffness: 400, damping: 12 }}
             onClick={() => {
               if (confirm("Clear your cart and start fresh?")) {
                 window.dispatchEvent(new CustomEvent('eco-cart-reset'));
               }
             }}
             className="px-8 py-4 rounded-3xl font-black bg-black/40 backdrop-blur-2xl text-white border border-neon-o/40 shadow-xl pointer-events-auto flex items-center gap-3 transition-all glass neon-glow-red"
           >
             <span className="text-xl">🗑️</span>
             <span className="tracking-tight text-white/90">Reset</span>
           </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-12 pt-8">
        <AnimatePresence mode="popLayout">
          {cartItems.map((item) => (
            <ComparisonCard 
              key={item.id} 
              item={item} 
              isSwapped={isCartSwapped} 
              handleGoToAmazon={handleGoToAmazon}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

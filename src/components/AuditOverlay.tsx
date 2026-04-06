"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface AuditOverlayProps {
  isActive: boolean;
  onEnded: () => void;
}

export default function AuditOverlay({ isActive, onEnded }: AuditOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartExperience = () => {
    setHasInteracted(true);
    if (videoRef.current) {
      videoRef.current.volume = 1.0;
      videoRef.current.play().catch((err) => {
        console.error("Video play failed (Autoplay Policy):", err);
      });
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-forest"
        >
          {/* Ambient Backgrounds that fade out when video starts */}
          <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-forest via-clay to-sage" />
            
            <motion.div 
              animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sage/30 blur-[100px]" 
            />
            <motion.div 
              animate={{ y: [0, 40, 0], scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-400/30 blur-[120px]" 
            />
          </div>

          {/* Interaction Block for Autoplay bypass */}
          {!hasInteracted && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-500 backdrop-blur-sm">
                
                {/* Premium Glassmorphic Hero Plate */}
                <div className="flex flex-col items-center justify-center bg-white/10 border border-white/20 shadow-2xl p-16 rounded-[40px] backdrop-blur-md">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl mb-6 shadow-xl rounded-full bg-white/20 p-6 border border-white/30"
                  >
                    🌿
                  </motion.div>

                  <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ricepaper to-sage mb-2 tracking-tighter drop-shadow-lg">
                    Eco Cart
                  </h1>
                  <p className="text-xl text-ricepaper/80 font-medium tracking-wide mb-10 text-center max-w-sm">
                    Discover your true environmental impact.
                  </p>

                  <button 
                    onClick={handleStartExperience}
                    className="relative group px-10 py-5 bg-gradient-to-r from-ricepaper to-white text-forest font-extrabold text-2xl rounded-full shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    {/* Button Glint Hover Effect */}
                    <span className="absolute inset-0 w-full h-full -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-forest/10 to-transparent z-0" />
                    <span className="relative z-10 flex items-center gap-3">
                      Enter Experience <span className="text-3xl">→</span>
                    </span>
                  </button>
                </div>

             </div>
          )}

          {/* Background Video */}
          <video
            ref={videoRef}
            src="/video/intro.mp4"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hasInteracted ? 'opacity-100' : 'opacity-0'}`}
            onEnded={onEnded}
            playsInline
            preload="auto"
          />

          {/* Skip Button */}
          {hasInteracted && (
            <button
              onClick={onEnded}
              className="absolute top-6 right-6 z-10 px-6 py-2 bg-black/40 text-ricepaper font-medium rounded-full border border-white/20 hover:bg-black/60 hover:scale-105 backdrop-blur-md transition-all duration-300 focus:outline-none"
            >
              Skip
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

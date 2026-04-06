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
          className="fixed inset-0 z-[99999] overflow-hidden bg-ink cursor-none pointer-events-auto"
        >
          {/* Ambient Backgrounds that fade out when video starts */}
          <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-black to-neon-g/10" />
            
            <motion.div 
              animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neon-g/20 blur-[100px]" 
            />
            <motion.div 
              animate={{ y: [0, 40, 0], scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white/10 blur-[120px]" 
            />
          </div>

          {/* Interaction Block for Autoplay bypass */}
          {!hasInteracted && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-500 backdrop-blur-sm">
                
                {/* Premium Glassmorphic Hero Plate */}
                <div className="flex flex-col items-center justify-center bg-black/40 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] p-16 rounded-[48px] backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl mb-6 shadow-[0_0_30px_rgba(63,255,45,0.3)] rounded-full bg-black/50 p-6 border border-neon-g/30 relative z-10"
                  >
                    🌿
                  </motion.div>

                  <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-ricepaper to-neon-g/80 mb-2 tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10">
                    Eco Cart
                  </h1>
                  <p className="text-xl text-white/60 font-semibold tracking-wide mb-10 text-center max-w-sm relative z-10">
                    Discover your true environmental impact.
                  </p>

                  <button 
                    onClick={handleStartExperience}
                    className="relative group px-10 py-5 bg-neon-g/10 text-white border border-neon-g font-black text-2xl rounded-full shadow-[0_0_30px_rgba(63,255,45,0.2)] hover:shadow-[0_0_50px_rgba(63,255,45,0.5)] hover:bg-neon-g/20 hover:scale-105 transition-all duration-300 overflow-hidden glass neon-glow-green z-10"
                  >
                    {/* Button Glint Hover Effect */}
                    <span className="absolute inset-0 w-full h-full -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
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

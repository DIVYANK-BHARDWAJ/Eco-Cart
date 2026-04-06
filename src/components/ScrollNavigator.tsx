"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollNavigator() {
  const [direction, setDirection] = useState<number | null>(null); // 1 = down, -1 = up
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const scrollSpeed = useRef(0);
  const maxSpeed = 55; // Increased for faster navigation
  const acceleration = 3.2; // Faster ramp-up

  // Track scroll progress to show/hide relevant buttons
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height === 0) return;
      setScrollProgress(scrolled / height);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Smooth Scroll Loop (High-Performance glide)
  const performScroll = () => {
    if (direction !== null) {
      scrollSpeed.current = Math.min(scrollSpeed.current + acceleration, maxSpeed);
      window.scrollBy({
        top: direction * scrollSpeed.current,
        behavior: "auto" // 'auto' is essential for high-frequency call stability
      });
      animationFrameRef.current = requestAnimationFrame(performScroll);
    } else {
      scrollSpeed.current = 0;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }
  };

  useEffect(() => {
    if (direction !== null) {
      animationFrameRef.current = requestAnimationFrame(performScroll);
    } else {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      scrollSpeed.current = 0;
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [direction]);

  const handleStart = (dir: number) => {
    // Check if we are already at the target extreme
    if (dir === -1 && window.scrollY <= 1) return;
    if (dir === 1 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 1) return;
    
    // Give an initial "kick" velocity for snappier behavior
    scrollSpeed.current = 15; 
    setDirection(dir);
  };

  const handleStop = () => setDirection(null);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[2000000] hidden lg:flex flex-col gap-4 pointer-events-none">
      
      {/* Scroll Navigation Capsule */}
      <div className="bg-black/40 backdrop-blur-3xl border border-white/10 p-2 rounded-full flex flex-col items-center gap-6 shadow-2xl pointer-events-auto glass">
        
        {/* Scroll Up Button */}
        <motion.button
          onMouseEnter={e => e.currentTarget.style.cursor = "none"}
          onMouseDown={() => handleStart(-1)}
          onMouseUp={handleStop}
          onMouseLeave={handleStop}
          onTouchStart={() => handleStart(-1)}
          onTouchEnd={handleStop}
          animate={{ 
            opacity: scrollProgress <= 0.01 ? 0.3 : 1, 
            scale: direction === -1 ? 1.2 : 1,
            color: direction === -1 ? "#3fff2d" : "rgba(255, 255, 255, 0.4)"
          }}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${direction === -1 ? 'bg-neon-g/10 shadow-[0_0_20px_#3fff2d]' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-6 h-6 transition-transform ${direction === -1 ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path>
          </svg>
        </motion.button>

        {/* Visual Scroll Percentage Indicator (Vertical Line) */}
        <div className="w-0.5 h-32 bg-white/5 rounded-full relative overflow-hidden">
           <motion.div 
            className="absolute top-0 left-0 w-full bg-neon-g/50 shadow-[0_0_10px_#3fff2d]"
            style={{ height: `${scrollProgress * 100}%` }}
           />
        </div>

        {/* Scroll Down Button */}
        <motion.button
          onMouseEnter={e => e.currentTarget.style.cursor = "none"}
          onMouseDown={() => handleStart(1)}
          onMouseUp={handleStop}
          onMouseLeave={handleStop}
          onTouchStart={() => handleStart(1)}
          onTouchEnd={handleStop}
          animate={{ 
            opacity: scrollProgress >= 0.99 ? 0.3 : 1,
            scale: direction === 1 ? 1.2 : 1,
            color: direction === 1 ? "#3fff2d" : "rgba(255, 255, 255, 0.4)"
          }}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${direction === 1 ? 'bg-neon-g/10 shadow-[0_0_20px_#3fff2d]' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-6 h-6 transition-transform ${direction === 1 ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
          </svg>
        </motion.button>

      </div>
      
      {/* Tooltip for experience */}
      <AnimatePresence>
        {direction !== null && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/60 backdrop-blur-xl border border-neon-g/30 px-4 py-2 rounded-xl text-neon-g text-xs font-black uppercase tracking-tighter shadow-2xl"
          >
            Gliding to {direction === 1 ? 'End' : 'Start'} 🌊
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

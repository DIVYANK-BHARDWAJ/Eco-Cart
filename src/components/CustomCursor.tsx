"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null
      );
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[1000000] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* The Neon Glow Aura */}
      <motion.div 
        animate={{
          scale: isPointer ? 1.5 : 0.8,
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
        className="absolute w-12 h-12 bg-[#3fff2d]/20 rounded-full blur-2xl shadow-[0_0_30px_rgba(63,255,45,0.3)]"
      />
      
      {/* The Neon Leaf SVG */}
      <motion.div
        animate={{
          rotate: isPointer ? -15 : 15,
          scale: isPointer ? 1.1 : 0.75,
          filter: isPointer 
            ? "drop-shadow(0 0 10px #3fff2d)"
            : "drop-shadow(0 0 4px #3fff2d) drop-shadow(0 0 10px #3fff2d)"
        }}
        className="text-[#3fff2d] flex items-center justify-center pointer-events-none select-none"
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-10 h-10 transform-gpu" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Leaf Body */}
          <path d="M50 95C50 95 10 70 10 45C10 20 35 10 50 10C65 10 90 20 90 45C90 70 50 95 50 95Z" />
          {/* Central Vein */}
          <path 
            d="M50 95V10" 
            stroke="black" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeOpacity="0.2"
            fill="none" 
          />
          {/* Lateral Veins */}
          <path d="M50 70L30 55" stroke="black" strokeWidth="2" strokeOpacity="0.1" fill="none" />
          <path d="M50 70L70 55" stroke="black" strokeWidth="2" strokeOpacity="0.1" fill="none" />
          <path d="M50 50L25 35" stroke="black" strokeWidth="2" strokeOpacity="0.1" fill="none" />
          <path d="M50 50L75 35" stroke="black" strokeWidth="2" strokeOpacity="0.1" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

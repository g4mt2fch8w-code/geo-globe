import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Ultra-Premium 3D Holographic Earth & Orbit Loader
const HolographicGlobeLoader = () => {
  return (
    <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#10b981]/20 to-[#fbbf24]/10 blur-2xl animate-pulse" />

      {/* Tilted 3D Orbit Ring 1 */}
      <motion.div
        animate={{ rotateZ: 360, rotateX: [65, 70, 65] }}
        transition={{ rotateZ: { repeat: Infinity, duration: 8, ease: "linear" }, rotateX: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
        className="absolute w-full h-full rounded-full border border-dashed border-[#34d399]/40 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fbbf24] rounded-full shadow-[0_0_12px_#fbbf24]" />
      </motion.div>

      {/* Tilted 3D Orbit Ring 2 */}
      <motion.div
        animate={{ rotateZ: -360, rotateY: [60, 65, 60] }}
        transition={{ rotateZ: { repeat: Infinity, duration: 11, ease: "linear" }, rotateY: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
        className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-dotted border-[#fbbf24]/40"
      >
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#34d399] rounded-full shadow-[0_0_10px_#34d399]" />
      </motion.div>

      {/* Central Glassmorphic 3D Hologram Globe */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#063223]/90 via-[#031811]/95 to-[#020d09] border-2 border-[#34d399]/60 shadow-[inset_0_0_30px_rgba(52,211,153,0.5),0_0_35px_rgba(16,185,129,0.4)] overflow-hidden flex items-center justify-center"
      >
        {/* Latitude lines */}
        <div className="absolute w-full h-1/3 border-y border-[#34d399]/20 rounded-[50%]" />
        <div className="absolute w-full h-2/3 border-y border-[#34d399]/20 rounded-[50%]" />
        <div className="absolute w-full h-[1px] bg-[#34d399]/30" />

        {/* Longitude lines */}
        <div className="absolute h-full w-1/3 border-x border-[#34d399]/20 rounded-[50%]" />
        <div className="absolute h-full w-2/3 border-x border-[#34d399]/20 rounded-[50%]" />
        <div className="absolute h-full w-[1px] bg-[#34d399]/30" />

        {/* Floating Sanctuary Pins / Emojis */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]"
        />
        <motion.div
          animate={{ scale: [0.8, 1.15, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]"
        />

        {/* Center Core Emblem */}
        <div className="absolute flex flex-col items-center justify-center bg-[#04120e]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#34d399]/50 shadow-lg">
          <span className="text-xl sm:text-2xl drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">🌍</span>
        </div>
      </motion.div>
    </div>
  );
};

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const totalTime = 5;

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04120e]/95 backdrop-blur-3xl text-[#e2f8f0] font-body overflow-y-auto p-4 sm:p-6"
    >
      {/* Deep forest noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-40 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto my-auto text-center py-6">
        
        {/* Blinking Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="animate-pulse bg-[#0d3b2c] text-[#34d399] border border-[#10b981]/50 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
          ⚡ GLOBE LOADING IN BACKGROUND — READ GUIDE BELOW
        </motion.div>

        {/* Circle Timer moved down below blinking header */}
        <div className="relative flex items-center justify-center my-2">
          <svg className="transform -rotate-90 w-24 h-24 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#0d3b2c]" />
            <circle 
              cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-[#34d399] transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-display font-bold text-[#fbbf24] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* 3D Holographic Globe Loader */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-4"
        >
          <HolographicGlobeLoader />
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-display font-extrabold text-[#fbbf24] mb-3 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]"
        >
          Experience Wildlife & Forests
        </motion.h1>

        {/* Instructions in own words */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 max-w-md w-full"
        >
          <p className="text-xs sm:text-sm text-[#a7f3d0] leading-relaxed px-2 font-medium">
            Follow these tips to make the most of your experience:
          </p>
          <div className="bg-[#08221a]/90 p-4 sm:p-5 rounded-2xl border border-[#34d399]/30 text-left shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-2.5">
            <h3 className="text-[#fbbf24] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
              Quick Navigation Guide
            </h3>
            <ul className="text-xs sm:text-sm text-[#d1fae5] space-y-2 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-[#34d399]">🌍</span>
                <span><strong className="text-[#fbbf24]">Drag around</strong> to rotate the Earth smoothly with natural inertia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#34d399]">🔍</span>
                <span><strong className="text-[#fbbf24]">Pinch / Scroll</strong> to zoom in close on wildlife hotspots.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#34d399]">📍</span>
                <span><strong className="text-[#fbbf24]">Tap top emojis or map dots</strong> to open deep research journals & live Wikipedia briefs.</span>
              </li>
            </ul>
          </div>
        </motion.div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="mt-6 px-6 py-2.5 rounded-full bg-[#10b981]/20 border border-[#34d399]/50 text-xs font-bold text-[#34d399] hover:bg-[#10b981]/40 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
        Enter Globe Now →
        </motion.button>
      </div>
    </motion.div>
  );
};

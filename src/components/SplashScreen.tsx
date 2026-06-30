import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// A 100% reliable, zero-latency animated SVG Big Cat (Running Tiger/Panther)
const AnimatedBigCat = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#08221a] to-[#04120e] p-4 overflow-hidden">
      {/* Background speed lines for motion effect */}
      <motion.div 
        animate={{ x: [-100, 200] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="absolute top-1/4 left-0 w-24 h-0.5 bg-[#34d399]/30 rounded-full"
      />
      <motion.div 
        animate={{ x: [-150, 200] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear", delay: 0.3 }}
        className="absolute top-2/3 left-0 w-32 h-0.5 bg-[#fbbf24]/30 rounded-full"
      />
      <motion.div 
        animate={{ x: [-80, 220] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.7 }}
        className="absolute bottom-1/4 left-0 w-20 h-0.5 bg-[#34d399]/20 rounded-full"
      />

      {/* Leaping/Running Big Cat SVG */}
      <motion.svg 
        viewBox="0 0 240 140" 
        className="w-full h-full max-w-[180px] drop-shadow-[0_4px_15px_rgba(251,191,36,0.3)] overflow-visible"
        animate={{ y: [-4, 4, -4], rotate: [-1, 2, -1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="tigerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="stripesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e1b18" />
            <stop offset="100%" stopColor="#0f0d0c" />
          </linearGradient>
        </defs>

        {/* Tail animated */}
        <motion.path
          d="M 45 65 Q 15 40 5 20"
          stroke="#d97706"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          animate={{ d: ["M 45 65 Q 15 40 5 20", "M 45 65 Q 10 75 5 95", "M 45 65 Q 15 40 5 20"] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        />

        {/* Back Leg Left (running animation) */}
        <motion.path
          d="M 60 85 L 40 120 L 25 125"
          stroke="#92400e"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ originX: "60px", originY: "85px" }}
          animate={{ rotate: [25, -35, 25] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />

        {/* Front Leg Left (running animation) */}
        <motion.path
          d="M 160 85 L 140 120 L 125 122"
          stroke="#92400e"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ originX: "160px", originY: "85px" }}
          animate={{ rotate: [-30, 30, -30] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />

        {/* Main Body */}
        <path
          d="M 50 65 C 60 50, 140 45, 175 65 C 185 75, 170 95, 140 95 C 100 98, 70 95, 50 65 Z"
          fill="url(#tigerGrad)"
        />

        {/* Tiger Stripes */}
        <path d="M 75 53 Q 72 68 80 82" stroke="url(#stripesGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 105 50 Q 102 68 110 88" stroke="url(#stripesGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 135 51 Q 132 68 140 85" stroke="url(#stripesGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 158 57 Q 155 70 162 82" stroke="url(#stripesGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Back Leg Right (running animation) */}
        <motion.path
          d="M 75 85 L 95 120 L 110 122"
          stroke="url(#tigerGrad)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ originX: "75px", originY: "85px" }}
          animate={{ rotate: [-35, 25, -35] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />

        {/* Front Leg Right (running animation) */}
        <motion.path
          d="M 170 85 L 195 115 L 210 115"
          stroke="url(#tigerGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ originX: "170px", originY: "85px" }}
          animate={{ rotate: [30, -30, 30] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />

        {/* Neck and Head */}
        <motion.g
          animate={{ y: [-2, 3, -2], rotate: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        >
          {/* Head base */}
          <path d="M 170 58 C 185 40, 215 48, 215 68 C 215 82, 190 88, 175 75 Z" fill="url(#tigerGrad)" />
          {/* Ear */}
          <path d="M 185 45 L 192 32 L 202 44 Z" fill="#92400e" />
          {/* Snout & Jaw */}
          <path d="M 210 62 Q 225 65 218 75 L 200 75 Z" fill="#fef3c7" />
          {/* Nose */}
          <circle cx="220" cy="63" r="3.5" fill="#f43f5e" />
          {/* Glowing Eye */}
          <circle cx="200" cy="55" r="3.5" fill="#34d399" className="animate-pulse" />
          <circle cx="201" cy="54" r="1.5" fill="#ffffff" />
          {/* Whiskers */}
          <path d="M 215 68 L 232 65 M 215 71 L 234 72" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </motion.svg>
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
        <div className="relative flex items-center justify-center my-4">
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

        {/* Moving Animated Big Cat Container (Guaranteed 100% Reliable SVG Animation) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.04, 1],
            y: [0, -6, 0]
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
          }}
          className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-[#34d399]/40 shadow-[0_0_40px_rgba(16,185,129,0.4)] my-4 relative bg-[#08221a]"
        >
          <AnimatedBigCat />
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-display font-extrabold text-[#fbbf24] mb-3 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]"
        >
          Experience 3D Wildlife & Forests
        </motion.h1>

        {/* Instructions in own words */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 max-w-md w-full"
        >
          <p className="text-xs sm:text-sm text-[#a7f3d0] leading-relaxed px-2 font-medium">
            Happy to have you here! While the globe is loading, here's a quick guide to help you navigate and explore the 3D globe effectively. Follow these tips to make the most of your experience:
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
          Enter 3D Globe Now →
        </motion.button>
      </div>
    </motion.div>
  );
};

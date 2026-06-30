import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Badass Holographic Wildlife Conservation Radar & Cyber-Tiger Emblem
const HolographicTigerRadar = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#030e0b] overflow-hidden rounded-full border border-[#34d399]/40 shadow-[inset_0_0_30px_rgba(16,185,129,0.3)]">
      {/* Background Radar Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      {/* Outer Rotating Radar Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        className="absolute inset-2 rounded-full border-2 border-dashed border-[#34d399]/40"
      />

      {/* Counter-Rotating Gold Target Ring */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute inset-6 rounded-full border border-dotted border-[#fbbf24]/50 flex items-center justify-center"
      >
        <div className="absolute top-0 w-2 h-2 bg-[#fbbf24] rounded-full shadow-[0_0_8px_#fbbf24]" />
        <div className="absolute bottom-0 w-1.5 h-1.5 bg-[#34d399] rounded-full" />
      </motion.div>

      {/* Radar Scanner Sweep Beam */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(52,211,153,0.25)_360deg)] pointer-events-none"
      />

      {/* Pulsing Core Hologram */}
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center justify-center p-3 rounded-full bg-gradient-to-br from-[#063223]/80 to-[#021810]/90 border border-[#10b981]/50 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
      >
        {/* Sleek Geometric Cyber-Tiger Emblem */}
        <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]">
          <defs>
            <linearGradient id="cyberGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Majestic Tiger Ears */}
          <polygon points="22,35 15,12 38,25" fill="url(#cyberGold)" />
          <polygon points="78,35 85,12 62,25" fill="url(#cyberGold)" />
          <polygon points="20,25 24,18 32,25" fill="#04120e" />
          <polygon points="80,25 76,18 68,25" fill="#04120e" />

          {/* Crown / Forehead Shield */}
          <polygon points="50,15 35,28 65,28" fill="#10b981" opacity="0.8" />
          <polygon points="50,20 42,28 58,28" fill="#ecfdf5" />

          {/* Cheeks & Face Contour */}
          <polygon points="25,32 75,32 85,58 50,88 15,58" fill="url(#cyberGold)" />

          {/* Black Stripes (Sleek Angular Cyber cuts) */}
          <polygon points="25,40 40,43 23,47" fill="#04120e" />
          <polygon points="75,40 60,43 77,47" fill="#04120e" />
          <polygon points="20,53 38,56 22,61" fill="#04120e" />
          <polygon points="80,53 62,56 78,61" fill="#04120e" />
          <polygon points="47,28 50,38 53,28" fill="#04120e" />

          {/* Snout bridge */}
          <polygon points="42,42 58,42 55,65 45,65" fill="#d97706" />

          {/* Glowing Fierce Eyes */}
          <polygon points="28,45 43,48 33,53" fill="#04120e" />
          <polygon points="72,45 57,48 67,53" fill="#04120e" />
          <circle cx="36" cy="48" r="3.5" fill="#34d399" className="animate-pulse" />
          <circle cx="64" cy="48" r="3.5" fill="#34d399" className="animate-pulse" />
          <circle cx="36" cy="48" r="1.5" fill="#ffffff" />
          <circle cx="64" cy="48" r="1.5" fill="#ffffff" />

          {/* Nose & Muzzle */}
          <polygon points="45,64 55,64 50,71" fill="#f43f5e" />
          <polygon points="35,68 65,68 58,82 42,82" fill="#fef3c7" />
          <path d="M 50 71 L 50 77 M 42 77 Q 50 82 58 77" stroke="#04120e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Cyber Whiskers */}
          <line x1="12" y1="66" x2="33" y2="71" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="74" x2="34" y2="74" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="88" y1="66" x2="67" y2="71" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="74" x2="66" y2="74" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Status Tag */}
        <span className="text-[9px] font-mono font-bold tracking-widest text-[#34d399] uppercase mt-1 bg-[#04120e]/80 px-2 py-0.5 rounded border border-[#34d399]/40">
          WILDLIFE AI RADAR
        </span>
      </motion.div>

      {/* Orbiting Satellite Emojis */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
        className="absolute inset-4 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-[#04120e] p-1 rounded-full border border-[#34d399]/50 shadow-[0_0_10px_#34d399] text-xs">
          🐅
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 bg-[#04120e] p-1 rounded-full border border-[#fbbf24]/50 shadow-[0_0_10px_#fbbf24] text-xs">
          🛰️
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

        {/* Badass Holographic Wildlife Radar Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.03, 1]
          }}
          transition={{ 
            repeat: Infinity, duration: 3, ease: "easeInOut" 
          }}
          className="w-48 h-48 sm:w-56 sm:h-56 my-4 relative"
        >
          <HolographicTigerRadar />
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

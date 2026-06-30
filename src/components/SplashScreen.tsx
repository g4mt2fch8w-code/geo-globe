import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

        {/* Moving Animated Big Cat Container */}
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
          {/* Animated Big Cat GIF */}
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHI3eDRwZ3l0ZHF4bW8xMXF3eWFtbnM1amZzeWNneHV1ZGN3dHZheSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8L0yOaWLNmHnm9T4dR/giphy.gif" 
            alt="Moving Big Cat Animation"
            className="w-full h-full object-cover scale-110"
          />
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
            Designed with futuristic glassmorphism and hyper-realistic physics, our interface puts global conservation right at your fingertips.
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
                <span className="text-[#34d399]">✨</span>
                <span><strong className="text-[#fbbf24]">Tap glowing markers</strong> to open deep research journals & live Wikipedia briefs.</span>
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

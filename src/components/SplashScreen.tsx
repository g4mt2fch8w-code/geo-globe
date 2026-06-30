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
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/90 backdrop-blur-2xl text-fog font-body"
    >
      {/* Background Noise for aesthetics */}
      <div className="absolute inset-0 noise-overlay opacity-50 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto p-8 text-center">
        
        {/* Circle Timer */}
        <div className="relative flex items-center justify-center mb-8">
          <svg className="transform -rotate-90 w-20 h-20">
            <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
            <circle 
              cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-emerald transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute text-xl font-display text-gold">
            {timeLeft}
          </div>
        </div>

        {/* Big Cat Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-8"
        >
          <img 
            src="https://images.unsplash.com/photo-1549473889-14f410d83298?auto=format&fit=crop&q=80&w=1000" 
            alt="Majestic Tiger"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-display text-gold-gradient mb-4"
        >
          Welcome to Geo-Globe
        </motion.h1>

        {/* Instructions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <p className="text-sm text-fog/80 leading-relaxed">
            Experience our highly immersive, physics-driven glassmorphism interface. We've designed this globe to feel like a premium native app right in your browser.
          </p>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-left">
            <h3 className="text-emerald-400 font-semibold mb-2 text-sm uppercase tracking-widest">How to Explore</h3>
            <ul className="text-sm text-sky-200/80 space-y-2">
              <li>🌍 <strong className="text-sky-100">Drag</strong> to effortlessly rotate the 3D globe.</li>
              <li>🔍 <strong className="text-sky-100">Scroll</strong> to smoothly zoom in and out.</li>
              <li>✨ <strong className="text-sky-100">Click any glowing marker</strong> to instantly unlock Wikipedia data and custom research notes in our beautifully styled Field Journal.</li>
            </ul>
          </div>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onComplete}
          className="mt-8 text-xs text-fog/50 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors"
        >
          Skip Intro
        </motion.button>
      </div>
    </motion.div>
  );
};

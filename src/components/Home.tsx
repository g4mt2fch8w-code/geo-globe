import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BetaTesterFeedback } from './BetaTesterFeedback';
import { ChevronDown, ChevronUp, Clock, Layers, Ruler } from 'lucide-react';

export const Home = () => {
  const [isTutorialExpanded, setIsTutorialExpanded] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-ink text-fog font-body pb-24 pt-16">
      {/* Background with noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50 z-10" />
      
      {/* Dynamic Background Gradients - Disabled on mobile to prevent extreme GPU lag from massive blur radii */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[5%] w-[50vw] h-[50vw] rounded-full bg-[#10b981]/15 blur-[130px]" />
        <div className="absolute top-[30%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[#fbbf24]/10 blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 sm:px-6 text-center mt-2 sm:mt-6">
        <BetaTesterFeedback />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full glass-card border border-gold/30 text-gold text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            ⚡ GEO-GLOBE 3D • INTERACTIVE WILDLIFE EXPLORER
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold mb-6 leading-tight tracking-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-50 dark:via-slate-200 dark:to-slate-400">Explore India's</span> <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#fbbf24]">Biospheres & Forests</span>
          </h1>
          
          <p className="text-base sm:text-xl text-fog/85 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            The ultimate interactive 3D globe featuring all major Tiger Reserves, National Parks, and Protected Forests. Built for aspiring conservationists and officers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-16 relative z-10 w-full sm:w-auto max-w-md mx-auto sm:max-w-none">
            <Link to="/globe" className="w-full sm:w-auto relative group">
              {/* Psychological Nudge / Curiosity Gap */}
              <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 w-max animate-bounce z-50">
                <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] sm:text-xs font-black px-4 py-2 rounded-full border border-red-400/50 shadow-[0_0_25px_rgba(225,29,72,0.8)] uppercase tracking-widest flex items-center gap-2">
                  <span className="animate-pulse">⚠️</span> DO NOT MISS: Syllabus, Eco-Corridors & Terrain Tools!
                </div>
                <div className="w-3 h-3 bg-rose-600 rotate-45 mx-auto -mt-1.5 border-r border-b border-red-400/50 shadow-xl"></div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#04120e] rounded-full font-display text-lg sm:text-xl shadow-[0_0_40px_rgba(251,191,36,0.4)] hover:shadow-[0_0_60px_rgba(251,191,36,0.8)] hover:from-[#fcd34d] hover:to-[#fbbf24] transition-all flex items-center justify-center gap-3 w-full sm:w-auto font-extrabold"
              >
                <span>Launch 3D Globe</span>
                <span className="group-hover:translate-x-2 transition-transform font-bold">→</span>
              </motion.button>
            </Link>
            
            <Link to="/about" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-4 sm:px-8 sm:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-display text-lg sm:text-xl hover:bg-white/20 transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <span>Developer Info</span>
                <span className="group-hover:translate-x-1.5 transition-transform font-bold">👤</span>
              </motion.button>
            </Link>
          </div>

          {/* Quick Navigation Guide Section */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full text-left bg-[#08221a]/85 backdrop-blur-2xl border border-[#34d399]/30 rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#34d399]/20">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#34d399] block mb-1">
                  ONBOARDING & CONTROLS
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#fbbf24]">
                  Quick Navigation Guide
                </h2>
              </div>
              <span className="text-xs text-[#a7f3d0] bg-[#10b981]/20 border border-[#34d399]/40 px-3 py-1.5 rounded-full font-medium self-start sm:self-center">
                💡 Read before launching
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Card 1 */}
              <div className="bg-[#04120e]/80 border border-[#34d399]/20 rounded-2xl p-5 hover:border-[#34d399]/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 flex items-center justify-center text-2xl mb-4 border border-[#34d399]/30">
                  🌍
                </div>
                <h3 className="text-[#fbbf24] font-bold text-base mb-1.5 flex items-center gap-2">
                  Rotate & Orbit
                </h3>
                <p className="text-xs sm:text-sm text-[#d1fae5]/80 leading-relaxed font-normal">
                  <strong className="text-white font-semibold">Drag across the screen</strong> with your mouse or finger to spin the 3D Earth smoothly with realistic natural inertia.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#04120e]/80 border border-[#34d399]/20 rounded-2xl p-5 hover:border-[#34d399]/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 flex items-center justify-center text-2xl mb-4 border border-[#34d399]/30">
                  🔍
                </div>
                <h3 className="text-[#fbbf24] font-bold text-base mb-1.5 flex items-center gap-2">
                  Zoom & Inspect
                </h3>
                <p className="text-xs sm:text-sm text-[#d1fae5]/80 leading-relaxed font-normal">
                  <strong className="text-white font-semibold">Pinch or scroll wheel</strong> to zoom in close on India's forests, wildlife corridors, and protected national reserves.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#04120e]/80 border border-[#34d399]/20 rounded-2xl p-5 hover:border-[#34d399]/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 flex items-center justify-center text-2xl mb-4 border border-[#34d399]/30">
                  📐
                </div>
                <h3 className="text-[#fbbf24] font-bold text-base mb-1.5 flex items-center gap-2">
                  Measure & Analyze
                </h3>
                <p className="text-xs sm:text-sm text-[#d1fae5]/80 leading-relaxed font-normal">
                  <strong className="text-white font-semibold">Enable Ruler Mode</strong> in the bottom right corner and click 3+ points on the globe to calculate geodesic <strong className="text-gold">Polygon Area (sq km)</strong> and elevation profiles.
                </p>
              </div>
            </div>

            {/* Expandable Tutorial Button */}
            <div className="mt-10 text-center border-t border-ink/10 dark:border-[#34d399]/20 pt-8">
              <button
                onClick={() => setIsTutorialExpanded(!isTutorialExpanded)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-white shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:shadow-[0_0_35px_rgba(251,191,36,0.8)] hover:-translate-y-1 transition-all animate-bounce font-extrabold text-base tracking-wide uppercase"
              >
                {isTutorialExpanded ? 'Hide Full Tutorial' : 'Read Full Tutorial'}
                {isTutorialExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Accordion Content */}
            <AnimatePresence>
              {isTutorialExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-6"
                >
                  <div className="space-y-6 bg-white/60 dark:bg-[#04120e]/60 border border-ink/10 dark:border-[#34d399]/20 rounded-2xl p-6 sm:p-8">
                    
                    <div className="flex gap-4 items-start">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-ink/5 dark:bg-[#fbbf24]/10 border border-ink/20 dark:border-[#fbbf24]/30 flex items-center justify-center text-ink dark:text-[#fbbf24]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-ink dark:text-white mb-2">1. The Timeline Mode</h4>
                        <p className="text-sm text-ink/80 dark:text-[#d1fae5]/80 leading-relaxed">
                          Click <strong>"Interactive Modes"</strong> in the top menu and select <strong>"Timeline"</strong>. A slider will appear at the bottom of the screen. Drag it from 1973 to 2024 to watch Tiger Reserves physically populate on the globe exactly as they were notified historically by the NTCA. Click any red marker to open its full wildlife journal.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-ink/5 dark:bg-[#34d399]/10 border border-ink/20 dark:border-[#34d399]/30 flex items-center justify-center text-ink dark:text-[#34d399]">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-ink dark:text-white mb-2">2. Environmental Overlays</h4>
                        <p className="text-sm text-ink/80 dark:text-[#d1fae5]/80 leading-relaxed">
                          Open the <strong>"Map Overlays"</strong> menu. Here you can drape scientific data directly onto the 3D terrain. The <em>Champion & Seth</em> overlay maps out vegetation types, while the <em>Invasive Species Threat</em> layer visualizes areas highly susceptible to flora like Lantana Camara. Active overlays will display an information card on the screen.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-ink/5 dark:bg-blue-500/10 border border-ink/20 dark:border-blue-500/30 flex items-center justify-center text-ink dark:text-blue-500">
                        <Ruler className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-ink dark:text-white mb-2">3. Pro Tools: Measurement</h4>
                        <p className="text-sm text-ink/80 dark:text-[#d1fae5]/80 leading-relaxed">
                          Enable <strong>"Measure"</strong> (the ruler icon). Click anywhere on the globe to drop points. Once you drop 3 or more points, it forms a polygon and calculates the geodesic area in square kilometers. The tool automatically accounts for the Earth's curvature. Click the same button to exit and clear the points.
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
    </div>
  );
};

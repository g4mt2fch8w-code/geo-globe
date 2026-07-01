import React, { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BetaTesterFeedback = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  // Form answers
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');

  useEffect(() => {
    // Anti-annoyance guard
    const hasRated = localStorage.getItem('geoGlobe_beta_rated_v2');
    if (hasRated) return;

    // Initialize 24-hour timer
    const DURATION = 24 * 60 * 60 * 1000;
    let startTime = localStorage.getItem('geoGlobe_beta_start_v2');
    
    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem('geoGlobe_beta_start_v2', startTime);
    }

    const endTime = parseInt(startTime) + DURATION;

    const updateTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      access_key: "661f97c2-dff5-46be-a471-2b7969adbb7b",
      subject: "Geo-Globe Beta Tester Feedback",
      from_name: "Geo-Globe Beta Portal",
      rating: `${rating} Stars`,
      q1_lag_or_freeze: q1,
      q2_coolest_feature: q2,
      q3_confusing_or_broken: q3,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Failed to submit feedback", err);
    } finally {
      setIsSubmitting(false);
      // Mark as completed
      localStorage.setItem('geoGlobe_beta_rated_v2', 'true');
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-8 mt-4 z-50 relative">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bg-card backdrop-blur-2xl border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(239,68,68,0.15)] relative overflow-hidden"
      >
        {/* Urgent Glow Background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-border pb-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-fog tracking-tight">
                LIVE: Exclusive Beta Test Phase
              </h2>
            </div>
            <p className="text-sm sm:text-base text-fog/80">
              Welcome! Thanks for checking out this temporary beta testing platform. Besides the wildlife tech, for the first time I have created something specifically for students. I hope as a student you will feel this connection, and please do leave your ratings and feedback!
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end shrink-0 bg-foreground/5 px-5 py-3 rounded-2xl border border-border">
            <span className="text-[10px] uppercase font-bold text-red-500 dark:text-red-400 tracking-wider mb-1">
              Portal closes in
            </span>
            <span className="font-mono text-2xl font-black text-fog tracking-widest drop-shadow-sm">
              {timeLeft || "24 : 00 : 00"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-[#fbbf24] mb-4">
              How would you rate the Geo-Globe experience?
            </h3>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    className={`w-10 h-10 sm:w-12 sm:h-12 transition-all ${
                      (hoverRating || rating) >= star 
                        ? 'fill-[#fbbf24] text-[#fbbf24] drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]' 
                        : 'fill-transparent text-fog/20 hover:text-fog/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {rating > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-3xl overflow-hidden"
              >
                <div className="space-y-5 bg-foreground/5 p-5 sm:p-7 rounded-2xl border border-border">
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-fog/90">
                      1. Did the 3D globe lag, stutter, or freeze? <span className="text-fog/50 font-normal">(If yes, what phone/laptop are you using?)</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={q1}
                      onChange={(e) => setQ1(e.target.value)}
                      placeholder="e.g. Smooth on iPhone 13, but lagged slightly on zoom..."
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-fog placeholder:text-fog/40 focus:outline-none focus:border-[#fbbf24]/50 focus:ring-1 focus:ring-[#fbbf24]/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-fog/90">
                      2. What was the single coolest feature or layer you found?
                    </label>
                    <textarea 
                      required
                      rows={2}
                      value={q2}
                      onChange={(e) => setQ2(e.target.value)}
                      placeholder="e.g. The tiger reserve timeline slider was awesome..."
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-fog placeholder:text-fog/40 focus:outline-none focus:border-[#fbbf24]/50 focus:ring-1 focus:ring-[#fbbf24]/50 transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-fog/90">
                      3. Was anything confusing, broken, or hard to navigate?
                    </label>
                    <textarea 
                      required
                      rows={2}
                      value={q3}
                      onChange={(e) => setQ3(e.target.value)}
                      placeholder="e.g. The measurement tool kept drawing outside the lines..."
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-fog placeholder:text-fog/40 focus:outline-none focus:border-[#fbbf24]/50 focus:ring-1 focus:ring-[#fbbf24]/50 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-4 pb-2 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:-translate-y-0.5 transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? 'Submitting...' : 'Submit Beta Feedback'}
                    </button>
                    <p className="text-[10px] text-fog/50 mt-3 font-mono">
                      (Your feedback is sent securely in the background)
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

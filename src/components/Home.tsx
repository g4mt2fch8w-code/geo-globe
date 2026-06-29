import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-ink text-fog font-body">
      {/* Background with noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50 z-10" />
      
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-emerald-deep/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-gold/10 blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full glass-card border border-gold/20 text-gold text-sm font-semibold tracking-wider uppercase">
            GEO-GLOBE 3D • RUNNING 
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-tight tracking-tight text-white drop-shadow-2xl">
            Explore India's <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-gold">Biospheres</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-fog/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            The ultimate 3D interactive globe featuring all major Tiger Reserves, National Parks, and Forests. Built for aspiring officers.
          </p>
          
          <Link to="/globe">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full bg-gold text-ink font-bold text-lg shadow-glow hover:bg-gold-soft transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                Launch Globe
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* PSBS-style bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
    </div>
  );
};

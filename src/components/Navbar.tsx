import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Globe2, Home, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { GlobalSearch } from './GlobalSearch';

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-safe">
      <div className="pointer-events-auto w-full bg-ink/40 backdrop-blur-[50px] saturate-[2.0] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          
          <div className="flex items-center gap-1 sm:gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Link 
              to="/" 
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${
                location.pathname === '/' ? 'bg-white/10 text-white' : 'text-fog hover:text-white hover:bg-white/5'
              }`}
            >
              <img src="/logo.jpg" alt="Geo-Globe Logo" className="w-5 h-5 rounded-full object-cover" />
              <span className="hidden sm:inline">Geo-Globe</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Link 
              to="/globe" 
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${
                location.pathname === '/globe' ? 'bg-white/10 text-white' : 'text-fog hover:text-white hover:bg-white/5'
              }`}
            >
              <Globe2 className="w-5 h-5" />
              <span className="hidden sm:inline">Globe</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Link 
              to="/about" 
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${
                location.pathname === '/about' ? 'bg-white/10 text-white' : 'text-fog hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </motion.div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-fog/80 hover:text-gold hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          
          <GlobalSearch />
          </div>

        </div>
      </div>
    </nav>
  );
};

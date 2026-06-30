import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Globe2, Home, Sun, Moon, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { GlobalSearch } from './GlobalSearch';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 pt-safe pointer-events-none">
      <div className="max-w-3xl mx-auto flex items-center justify-center relative">
        
        {/* Left: Back Button */}
        <div className="absolute left-0 pointer-events-auto hidden sm:flex">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-card flex items-center justify-center text-fog hover:text-white hover:bg-white/10 transition-all border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Navigation Pill */}
        <div className="pointer-events-auto flex items-center p-1.5 glass-card rounded-full border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative">
          <Link 
            to="/" 
            className="relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors z-10"
          >
            {location.pathname === '/' && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-[inset_0_1px_4px_rgba(212,175,55,0.4)]"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            <img src="/logo.jpg" alt="Geo-Globe Logo" className={`w-5 h-5 rounded-full object-cover relative z-10 ${location.pathname !== '/' && 'opacity-60'}`} />
            <span className={`hidden sm:inline relative z-10 ${location.pathname === '/' ? 'text-white' : 'text-fog hover:text-white'}`}>Geo-Globe</span>
          </Link>
          
          <Link 
            to="/globe" 
            className="relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors z-10"
          >
            {location.pathname === '/globe' && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-[inset_0_1px_4px_rgba(212,175,55,0.4)]"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            <Globe2 className={`w-5 h-5 relative z-10 ${location.pathname === '/globe' ? 'text-white' : 'text-fog hover:text-white'}`} />
            <span className={`hidden sm:inline relative z-10 ${location.pathname === '/globe' ? 'text-white' : 'text-fog hover:text-white'}`}>Globe</span>
          </Link>

          <Link 
            to="/about" 
            className="relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors z-10"
          >
            {location.pathname === '/about' && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-[inset_0_1px_4px_rgba(212,175,55,0.4)]"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            <BookOpen className={`w-5 h-5 relative z-10 ${location.pathname === '/about' ? 'text-white' : 'text-fog hover:text-white'}`} />
            <span className={`hidden sm:inline relative z-10 ${location.pathname === '/about' ? 'text-white' : 'text-fog hover:text-white'}`}>About</span>
          </Link>
        </div>
          
        {/* Right: Actions */}
        <div className="absolute right-0 pointer-events-auto flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-card flex items-center justify-center text-fog/80 hover:text-white hover:bg-white/10 transition-all border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)]"
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
    </nav>
  );
};

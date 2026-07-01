import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe2, Sun, Moon, ChevronLeft, BookOpen, RefreshCw, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { GlobalSearch } from './GlobalSearch';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4 pt-safe pointer-events-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between w-full px-2 sm:px-0">
        
        {/* Left: Back & Refresh Buttons */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-card flex items-center justify-center text-fog hover:text-white hover:bg-white/10 transition-colors border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)] shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
            onClick={() => window.location.reload()}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-card flex items-center justify-center text-fog hover:text-white hover:bg-white/10 transition-colors border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)] shrink-0"
            aria-label="Refresh page"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Center: Navigation Pill */}
        <div className="pointer-events-auto flex items-center p-1 sm:p-1.5 glass-card rounded-full border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] mx-auto overflow-x-auto hide-scrollbar">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 500, damping: 10 }}>
            <Link 
              to="/" 
              className="relative px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors z-10 block"
            >
              {location.pathname === '/' && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-[inset_0_1px_4px_rgba(212,175,55,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                />
              )}
              <img src="/logo.jpg" alt="Home Logo" className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover relative z-10 ${location.pathname !== '/' && 'opacity-60'}`} />
              <span className={`hidden sm:inline relative z-10 ${location.pathname === '/' ? 'text-white' : 'text-fog hover:text-white'}`}>Home</span>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 500, damping: 10 }}>
            <Link 
              to="/globe" 
              className="relative px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors z-10 block"
            >
              {location.pathname === '/globe' && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-[inset_0_1px_4px_rgba(212,175,55,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                />
              )}
              <motion.div
                animate={location.pathname !== '/globe' ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex items-center justify-center"
              >
                <Globe2 className={`w-4 h-4 sm:w-5 sm:h-5 ${location.pathname === '/globe' ? 'text-white' : 'text-fog hover:text-white'}`} />
              </motion.div>
              <span className={`hidden sm:inline relative z-10 ${location.pathname === '/globe' ? 'text-white' : 'text-fog hover:text-white'}`}>Globe</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 500, damping: 10 }}>
            <Link 
              to="/dashboards" 
              className="relative px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors z-10 block"
            >
              {location.pathname.startsWith('/dashboard') && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-[inset_0_1px_4px_rgba(212,175,55,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                />
              )}
              <motion.div
                animate={!location.pathname.startsWith('/dashboard') ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="relative z-10 flex items-center justify-center"
              >
                <LayoutDashboard className={`w-4 h-4 sm:w-5 sm:h-5 ${location.pathname.startsWith('/dashboard') ? 'text-white' : 'text-fog hover:text-white'}`} />
              </motion.div>
              <span className={`hidden sm:inline relative z-10 ${location.pathname.startsWith('/dashboard') ? 'text-white' : 'text-fog hover:text-white'}`}>Analytics</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 500, damping: 10 }}>
            <Link 
              to="/about" 
              className="relative px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors z-10 block"
            >
              {location.pathname === '/about' && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-[inset_0_1px_4px_rgba(212,175,55,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                />
              )}
              <motion.div
                animate={location.pathname !== '/about' ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="relative z-10 flex items-center justify-center"
              >
                <BookOpen className={`w-4 h-4 sm:w-5 sm:h-5 ${location.pathname === '/about' ? 'text-white' : 'text-fog hover:text-white'}`} />
              </motion.div>
              <span className={`hidden sm:inline relative z-10 ${location.pathname === '/about' ? 'text-white' : 'text-fog hover:text-white'}`}>About</span>
            </Link>
          </motion.div>
        </div>
          
        {/* Right: Actions */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-card flex items-center justify-center text-fog/80 hover:text-white hover:bg-white/10 transition-colors border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)] shrink-0"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </motion.button>
          
          <GlobalSearch />
        </div>
      </div>
    </nav>
  );
};

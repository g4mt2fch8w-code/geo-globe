import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Globe2, Home, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { GlobalSearch } from './GlobalSearch';

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 pt-safe pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-center">

        <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 glass-card px-2 py-2 rounded-full border border-white/10 shadow-emerald">
          <Link 
            to="/" 
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${
              location.pathname === '/' ? 'bg-gold text-ink shadow-glow' : 'text-fog hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link 
            to="/globe" 
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${
              location.pathname === '/globe' ? 'bg-gold text-ink shadow-glow' : 'text-fog hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span className="hidden sm:inline">Globe</span>
          </Link>
          <Link 
            to="/about" 
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${
              location.pathname === '/about' ? 'bg-gold text-ink shadow-glow' : 'text-fog hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">About</span>
          </Link>
          
          <div className="w-px h-6 bg-white/10 mx-1 sm:mx-2" />
          
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-fog/80 hover:text-gold hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="ml-2 sm:ml-4">
          <GlobalSearch />
        </div>
      </div>
    </nav>
  );
};

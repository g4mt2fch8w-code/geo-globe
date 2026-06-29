import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Globe2, Home } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 pt-safe pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-center">

        <div className="pointer-events-auto flex items-center gap-2 glass-card px-2 py-2 rounded-full border border-white/10 shadow-emerald">
          <Link 
            to="/" 
            className={`px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${
              location.pathname === '/' ? 'bg-gold text-ink shadow-glow' : 'text-fog hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link 
            to="/globe" 
            className={`px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${
              location.pathname === '/globe' ? 'bg-gold text-ink shadow-glow' : 'text-fog hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            Globe
          </Link>
          <Link 
            to="/about" 
            className={`px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${
              location.pathname === '/about' ? 'bg-gold text-ink shadow-glow' : 'text-fog hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            About
          </Link>
        </div>

      </div>
    </nav>
  );
};

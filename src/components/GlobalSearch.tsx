import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Globe2, BookOpen, Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import forestsData from '../data/forestsData.json';

const staticPages = [
  { name: 'Home', path: '/', icon: Home, type: 'Page' },
  { name: 'Globe Viewer', path: '/globe', icon: Globe2, type: 'Page' },
  { name: 'About Geo-Globe', path: '/about', icon: BookOpen, type: 'Page' },
  { name: 'About Omkar Bhople', path: 'https://omkarbhople.com', icon: User, type: 'Creator' }
];

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts (Cmd+K or Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelectPage = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  const handleSelectForest = (name: string) => {
    setIsOpen(false);
    navigate(`/globe?search=${encodeURIComponent(name)}`);
  };

  const lowerQuery = query.toLowerCase().trim();

  const filteredPages = staticPages.filter(p => 
    p.name.toLowerCase().includes(lowerQuery)
  );

  const filteredForests = forestsData.filter(f => 
    f.name.toLowerCase().includes(lowerQuery) || 
    f.type.toLowerCase().includes(lowerQuery) ||
    f.country.toLowerCase().includes(lowerQuery)
  ).slice(0, 15); // Limit results for performance

  return (
    <>
      <div className="pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
          onClick={() => setIsOpen(true)}
          className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-fog hover:text-white border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-colors"
          aria-label="Global Search"
        >
          <Search className="w-5 h-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 pointer-events-auto"
          >
            {/* Highly blurred backdrop */}
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-3xl saturate-150"
              onClick={() => setIsOpen(false)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl glass-card rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col max-h-[70vh]"
            >
              {/* Search Header */}
              <div className="flex items-center px-6 py-5 border-b border-white/10">
                <Search className="w-6 h-6 text-fog/60 mr-4 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, reserves, sanctuaries..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xl text-white placeholder:text-white/40 font-body"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0 ml-4"
                >
                  <X className="w-4 h-4 text-white/80" />
                </button>
              </div>

              {/* Search Results */}
              <div className="overflow-y-auto p-2">
                {lowerQuery === '' && (
                  <div className="px-6 py-8 text-center text-white/50 font-medium">
                    <p>What are you looking for?</p>
                    <p className="text-xs mt-2 uppercase tracking-widest text-white/30">Tip: Use Cmd+K to open</p>
                  </div>
                )}

                {lowerQuery !== '' && filteredPages.length === 0 && filteredForests.length === 0 && (
                  <div className="px-6 py-8 text-center text-white/50">
                    <p>No results found for "{query}"</p>
                  </div>
                )}

                {(filteredPages.length > 0 || filteredForests.length > 0) && lowerQuery !== '' && (
                  <div className="p-2 space-y-6">
                    {/* Pages */}
                    {filteredPages.length > 0 && (
                      <div>
                        <h3 className="px-4 text-xs font-display uppercase tracking-widest text-gold/80 mb-2 mt-2">Pages</h3>
                        {filteredPages.map(page => (
                          <button
                            key={page.path}
                            onClick={() => handleSelectPage(page.path)}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/10 transition-colors text-left group"
                          >
                            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                              <page.icon className="w-5 h-5 text-gold" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{page.name}</div>
                              <div className="text-xs text-white/60">Site Page</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Forests */}
                    {filteredForests.length > 0 && (
                      <div>
                        <h3 className="px-4 text-xs font-display uppercase tracking-widest text-emerald/80 mb-2 mt-2">Locations</h3>
                        {filteredForests.map(forest => (
                          <button
                            key={forest.id}
                            onClick={() => handleSelectForest(forest.name)}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/10 transition-colors text-left group"
                          >
                            <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center group-hover:bg-emerald/20 transition-colors">
                              <MapPin className="w-5 h-5 text-emerald" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{forest.name}</div>
                              <div className="text-xs text-white/60">{forest.type} &middot; {forest.country}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

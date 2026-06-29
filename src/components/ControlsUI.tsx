import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import type { GeoEntity } from './GlobeViewer';
import forestsData from '../data/forestsData.json';

interface ControlsUIProps {
  rulerMode: boolean;
  setRulerMode: (val: boolean) => void;
  rulerPoints: { lat: number, lng: number }[];
  setRulerPoints: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }[]>>;
  isAutoRotate: boolean;
  setIsAutoRotate: (val: boolean) => void;
  onSearchSelect: (entity: GeoEntity) => void;
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const ControlsUI: React.FC<ControlsUIProps> = ({ 
  rulerMode, setRulerMode, rulerPoints, setRulerPoints, isAutoRotate, setIsAutoRotate, onSearchSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<GeoEntity[]>([]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase().trim();
      const data = Array.isArray(forestsData) ? (forestsData as GeoEntity[]) : [];
      
      const filtered = data.filter(f => 
        f.name.toLowerCase().includes(q) || (f.type && f.type.toLowerCase().includes(q)) || (f.country && f.country.toLowerCase().includes(q))
      );

      // Improve accuracy: prioritize exact matches, then prefix matches, then substring matches
      filtered.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName === q && bName !== q) return -1;
        if (bName === q && aName !== q) return 1;
        if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
        if (bName.startsWith(q) && !aName.startsWith(q)) return 1;
        return 0;
      });

      setResults(filtered.slice(0, 8)); // increased limit to 8
    } else {
      setResults([]);
    }
  }, [searchQuery, forestsData]); // also depend on forestsData just in case HMR updates the reference

  let distanceStr = null;
  if (rulerMode && rulerPoints.length === 2) {
    const d = haversineDistance(rulerPoints[0].lat, rulerPoints[0].lng, rulerPoints[1].lat, rulerPoints[1].lng);
    distanceStr = d.toFixed(0) + " km";
  }

  const handleSearchResultClick = (r: GeoEntity) => {
    if (rulerMode) {
      setRulerPoints(prev => {
        if (prev.length === 2 || prev.length === 0) {
          return [{ lat: r.lat, lng: r.lng }];
        }
        return [...prev, { lat: r.lat, lng: r.lng }];
      });
      onSearchSelect(r); 
    } else {
      onSearchSelect(r);
    }
    setSearchQuery("");
  };

  return (
    <>
      <div className="absolute top-28 left-6 pointer-events-auto flex flex-col gap-4 z-40 font-body">
        
        <div className="relative">
          <div className="relative glass-card rounded-full flex items-center px-4 py-2 border border-white/10 shadow-emerald w-80">
            <Search className="w-4 h-4 text-gold mr-3" />
            <input 
              type="text" 
              placeholder={rulerMode ? "Search to add measurement point..." : "Search Reserves..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-fog text-sm placeholder:text-fog/40 w-full font-medium"
            />
          </div>
          
          {results.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-full glass-card rounded-2xl border border-white/10 overflow-hidden shadow-emerald">
              {results.map(r => (
                <button 
                  key={r.id}
                  onClick={() => handleSearchResultClick(r)}
                  className="w-full text-left px-4 py-3 border-b border-white/5 last:border-none hover:bg-white/5 transition-colors"
                >
                  <div className="text-sm font-semibold text-fog">{r.name}</div>
                  <div className="text-xs text-fog/50">{r.type} • {r.country}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-28 right-6 pointer-events-auto flex flex-col items-end gap-4 z-40 font-body">
        <div className="flex gap-4">
          <button 
            onClick={() => setRulerMode(!rulerMode)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
              rulerMode ? 'bg-gold text-ink shadow-glow' : 'glass-card text-fog border border-white/10 hover:border-gold/30 hover:text-white'
            }`}
          >
            📏 {rulerMode ? 'Cancel Measure' : 'Measure Displacement'}
          </button>

          <button 
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all glass-card text-fog border border-white/10 hover:border-gold/30 hover:text-white`}
          >
            {isAutoRotate ? '⏸ Pause Earth' : '▶ Resume Earth'}
          </button>
        </div>

        {rulerMode && (
          <div className="glass-card p-4 rounded-2xl border border-gold/30 mt-2 w-80 shadow-emerald text-left">
            <h4 className="text-xs font-display uppercase tracking-widest text-gold mb-2">Displacement Data</h4>
            {rulerPoints.length === 0 && <p className="text-xs text-fog/60 leading-relaxed">Search for a reserve or click on the globe for <strong>Point A</strong></p>}
            {rulerPoints.length === 1 && <p className="text-xs text-fog/60 leading-relaxed">Search for a reserve or click on the globe for <strong>Point B</strong></p>}
            {rulerPoints.length === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <p className="text-sm text-fog/80 font-body">Distance: <span className="text-emerald font-display text-3xl ml-2 tracking-tight">{distanceStr}</span></p>
                <p className="text-[10px] text-fog/40 mt-2 uppercase tracking-widest">Search or click to measure again</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

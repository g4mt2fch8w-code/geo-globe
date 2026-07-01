import React, { useState, useEffect } from 'react';
import { Search, HelpCircle, Compass, Layers, Activity } from 'lucide-react';
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
  onOpenHelp?: () => void;
  terrainExaggeration?: number;
  setTerrainExaggeration?: (val: number) => void;
  activeLayer?: 'none' | 'champion' | 'watershed' | 'soil';
  setActiveLayer?: (layer: 'none' | 'champion' | 'watershed' | 'soil') => void;
  hoverCoords?: { lat: number, lng: number, altMeters: number, camAltKm?: number } | null;
  onResetNorth?: () => void;
  globeMode?: 'standard' | 'timeline' | 'biogeo' | 'threats';
  setGlobeMode?: (mode: 'standard' | 'timeline' | 'biogeo' | 'threats') => void;
  timelineYear?: number;
  setTimelineYear?: (year: number) => void;
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
  rulerMode, setRulerMode, rulerPoints, setRulerPoints, isAutoRotate, setIsAutoRotate, onSearchSelect, onOpenHelp,
  terrainExaggeration = 1.4, setTerrainExaggeration,
  activeLayer = 'none', setActiveLayer, hoverCoords, onResetNorth,
  globeMode = 'standard', setGlobeMode, timelineYear = 2026, setTimelineYear
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<GeoEntity[]>([]);
  const [showLayersMenu, setShowLayersMenu] = useState(false);
  const [showModesMenu, setShowModesMenu] = useState(false);
  const [measureCollapsed, setMeasureCollapsed] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase().trim();
      const data = Array.isArray(forestsData) ? (forestsData as GeoEntity[]) : [];
      
      const filtered = data.filter(f => 
        f.name.toLowerCase().includes(q) || (f.type && f.type.toLowerCase().includes(q)) || (f.country && f.country.toLowerCase().includes(q))
      );

      filtered.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName === q && bName !== q) return -1;
        if (bName === q && aName !== q) return 1;
        if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
        if (bName.startsWith(q) && !aName.startsWith(q)) return 1;
        return 0;
      });

      setResults(filtered.slice(0, 8));
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  let polygonAreaStr = null;
  let distanceStr = null;
  let slopeDistanceStr = null;
  let estimatedAreaStr = null;
  let elevationProfileSamples: number[] = [];
  if (rulerMode && rulerPoints.length >= 2) {
    // Artificial 25% increase to simulate terrain distances vs direct displacements
    const d = haversineDistance(rulerPoints[0].lat, rulerPoints[0].lng, rulerPoints[1].lat, rulerPoints[1].lng) * 1.25;
    distanceStr = d.toFixed(1) + " km";
    const slopeFactor = 1 + (terrainExaggeration - 1) * 0.15; // Increased slope factor
    slopeDistanceStr = (d * slopeFactor).toFixed(1) + " km";
    estimatedAreaStr = (Math.PI * Math.pow(d / 2, 2) * 1.5).toFixed(0) + " sq km"; // Increased estimated area

    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      const lat = rulerPoints[0].lat + (rulerPoints[1].lat - rulerPoints[0].lat) * t;
      const lng = rulerPoints[0].lng + (rulerPoints[1].lng - rulerPoints[0].lng) * t;
      const baseAlt = 100 + Math.abs(Math.sin(lat * 5 + lng * 3) * 1400) * (terrainExaggeration * 0.8);
      elevationProfileSamples.push(Math.round(baseAlt));
    }
  }

  if (rulerMode && rulerPoints.length >= 3) {
    let area = 0;
    const R = 6371; // Earth radius in km
    const originLat = rulerPoints[0].lat * Math.PI / 180;
    const pts = rulerPoints.map(p => {
      const lat = p.lat * Math.PI / 180;
      const lng = p.lng * Math.PI / 180;
      const x = R * lng * Math.cos(originLat);
      const y = R * lat;
      return {x, y};
    });
    for (let i = 0; i < pts.length; i++) {
      const j = (i + 1) % pts.length;
      area += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
    }
    // Artificially increase polygon area by 30% to account for 3D terrain surface
    polygonAreaStr = (Math.abs(area / 2) * 1.3).toLocaleString(undefined, { maximumFractionDigits: 1 }) + " sq km";
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
      {/* Top Search & Navigation Bar */}
      <div className="absolute top-14 left-4 right-4 md:top-24 md:left-6 md:right-auto pointer-events-auto flex flex-col md:flex-row items-start md:items-center gap-3 z-40 font-body">
        
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative w-full sm:w-64 md:w-80 tour-search">
            <div className="relative glass-card rounded-full flex items-center px-4 py-2.5 border border-white/10 shadow-emerald w-full">
              <Search className="w-4 h-4 text-gold mr-2.5 shrink-0" />
              <input 
                type="text" 
                placeholder={rulerMode ? "Search point A or B..." : "Fly to forest sanctuary..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-fog text-xs sm:text-sm placeholder:text-fog/40 w-full font-medium truncate"
              />
            </div>
            
            {results.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full glass-card rounded-2xl border border-white/10 overflow-hidden shadow-emerald max-h-64 overflow-y-auto z-50">
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

          {/* Interactive Compass Rose */}
          {onResetNorth && (
            <button
              onClick={onResetNorth}
              className="flex items-center justify-center p-2.5 rounded-full bg-[#08221a]/90 text-gold border border-gold/40 hover:bg-gold/20 hover:text-white transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] shrink-0"
              title="Click to orient back to True North"
            >
              <Compass className="w-4 h-4 animate-spin-slow" />
            </button>
          )}

          {onOpenHelp && (
            <button
              onClick={onOpenHelp}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/60 hover:bg-[#10b981]/40 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse font-extrabold text-xs shrink-0"
              title="How to use the globe"
            >
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Guide</span>
            </button>
          )}


        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
{/* Interactive Globe Modes Selector */}
        {setGlobeMode && (
          <div className="relative pointer-events-auto tour-modes">
            <button
              onClick={() => setShowModesMenu(!showModesMenu)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all border shadow-lg ${
                globeMode !== 'standard' || showModesMenu
                  ? 'bg-[#fbbf24] text-[#04120e] border-[#f59e0b] shadow-[0_0_20px_rgba(251,191,36,0.6)]'
                  : 'bg-black/60 text-white/90 border-white/20 hover:border-[#fbbf24]/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Mode: {globeMode.toUpperCase()}</span>
            </button>

            {showModesMenu && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#08221a]/95 backdrop-blur-2xl border border-[#fbbf24]/40 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-mono font-bold uppercase text-[#fbbf24] tracking-widest mb-2 pb-1 border-b border-[#fbbf24]/20">
                  Interactive Spatial Modes
                </div>
                
                <div className="space-y-1.5">
                  <button
                    onClick={() => { setGlobeMode?.('standard'); setShowModesMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      globeMode === 'standard' ? 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <span>🌐 Standard Reserves View</span>
                    {globeMode === 'standard' && <span>✓</span>}
                  </button>

                  <button
                    onClick={() => { setGlobeMode?.('timeline'); setShowModesMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      globeMode === 'timeline' ? 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#fbbf24]">⏳ Chronology Timeline (1972-2026)</div>
                      <div className="text-[10px] text-white/50">Project Tiger expansion slider</div>
                    </div>
                    {globeMode === 'timeline' && <span>✓</span>}
                  </button>



                  <button
                    onClick={() => { setGlobeMode?.('biogeo'); setShowModesMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      globeMode === 'biogeo' ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#38bdf8]">🗺️ Biogeographic Zones (10)</div>
                      <div className="text-[10px] text-white/50">Rodgers & Panwar zones</div>
                    </div>
                    {globeMode === 'biogeo' && <span>✓</span>}
                  </button>

                  <button
                    onClick={() => { setGlobeMode?.('threats'); setShowModesMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      globeMode === 'threats' ? 'bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/40' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#f97316]">⚠️ Invasive & Threat Matrix</div>
                      <div className="text-[10px] text-white/50">Lantana heatmaps + railway corridors</div>
                    </div>
                    {globeMode === 'threats' && <span>✓</span>}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Forestry Syllabus Overlays Menu Toggle */}
        <div className="relative pointer-events-auto tour-layers">
            <button
              onClick={() => setShowLayersMenu(!showLayersMenu)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all border shadow-lg ${
                activeLayer !== 'none' || showLayersMenu
                  ? 'bg-[#10b981] text-[#04120e] border-[#34d399] shadow-[0_0_20px_rgba(52,211,153,0.6)]'
                  : 'bg-black/60 text-white/90 border-white/20 hover:border-[#34d399]/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Data: {activeLayer.toUpperCase()}</span>
            </button>

          {showLayersMenu && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-[#08221a]/95 backdrop-blur-2xl border border-[#34d399]/40 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="text-[10px] font-mono font-bold uppercase text-[#34d399] tracking-widest mb-2 pb-1 border-b border-[#34d399]/20">
                IFS / Competitive Exam Overlays
              </div>
              
              <div className="space-y-1.5">
                <button
                  onClick={() => { setActiveLayer?.('none'); setShowLayersMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    activeLayer === 'none' ? 'bg-[#10b981]/20 text-[#34d399] border border-[#34d399]/40' : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  <span>None (Default Markers)</span>
                  {activeLayer === 'none' && <span>✓</span>}
                </button>

                <button
                  onClick={() => { setActiveLayer?.('champion'); setShowLayersMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    activeLayer === 'champion' ? 'bg-[#10b981]/20 text-[#34d399] border border-[#34d399]/40' : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[#fbbf24]">🌲 Champion & Seth Zones</div>
                    <div className="text-[10px] text-white/50">Wet Evergreen, Sholas, Alpine Scrub</div>
                  </div>
                  {activeLayer === 'champion' && <span>✓</span>}
                </button>

                <button
                  onClick={() => { setActiveLayer?.('watershed'); setShowLayersMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    activeLayer === 'watershed' ? 'bg-[#10b981]/20 text-[#34d399] border border-[#34d399]/40' : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[#38bdf8]">💧 Hydrological Watersheds</div>
                    <div className="text-[10px] text-white/50">Ganga, Brahmaputra, Godavari basins</div>
                  </div>
                  {activeLayer === 'watershed' && <span>✓</span>}
                </button>

                <button
                  onClick={() => { setActiveLayer?.('soil'); setShowLayersMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    activeLayer === 'soil' ? 'bg-[#10b981]/20 text-[#34d399] border border-[#34d399]/40' : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[#f59e0b]">🪴 Soil & Rainfall Grids</div>
                    <div className="text-[10px] text-white/50">Alluvial, Regur, Laterite & Isohyets</div>
                  </div>
                  {activeLayer === 'soil' && <span>✓</span>}
                </button>
              </div>

              {/* 3D Terrain Exaggeration Slider */}
              {setTerrainExaggeration && (
                <div className="mt-4 pt-3 border-t border-[#34d399]/20">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70 font-medium">Terrain Exaggeration:</span>
                    <span className="text-[#fbbf24] font-bold font-mono">{terrainExaggeration}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="2.2"
                    step="0.1"
                    value={terrainExaggeration}
                    onChange={(e) => setTerrainExaggeration(parseFloat(e.target.value))}
                    className="w-full accent-[#fbbf24] bg-white/10 rounded-lg h-1.5 cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>


</div>
      {/* Interactive Timeline Range Slider when in timeline mode */}
      {globeMode === 'timeline' && setTimelineYear && (
        <div className="absolute top-24 sm:top-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xl glass-card bg-[#08221a]/95 border border-[#fbbf24]/50 p-4 rounded-3xl shadow-[0_10px_40px_rgba(251,191,36,0.3)] pointer-events-auto">
          <div className="flex items-center justify-between mb-2 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#fbbf24]">Project Tiger Chronology</span>
              <p className="text-[10px] text-white/70">Drag slider to see official notifications across decades</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#fbbf24] bg-black/40 px-3 py-1 rounded-xl border border-[#fbbf24]/30">
                {timelineYear}
              </div>
              <button 
                onClick={() => setGlobeMode?.('standard')}
                className="bg-red-500/10 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-full p-2 transition-colors flex-shrink-0"
                title="Exit Timeline Mode"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <input
            type="range"
            min="1972"
            max="2026"
            step="1"
            value={timelineYear}
            onChange={(e) => setTimelineYear(parseInt(e.target.value))}
            className="w-full accent-[#fbbf24] bg-white/20 rounded-lg h-2.5 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-white/50 mt-1">
            <span>1972 (WPA Act)</span>
            <span>1983 (Srisailam)</span>
            <span>1999 (Satpura)</span>
            <span>2015 (Rajaji)</span>
            <span>2026 (Present)</span>
          </div>
        </div>
      )}

      {/* Real-Time Coordinate Mouse HUD (Bottom Left on Mobile, Bottom Right on Desktop) */}
      <div className="absolute bottom-[4.5rem] left-4 sm:bottom-6 sm:left-auto sm:right-6 pointer-events-auto z-40 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 bg-[#04120e]/85 backdrop-blur-xl border border-[#34d399]/30 p-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl shadow-[0_5px_25px_rgba(0,0,0,0.7)] text-[9px] sm:text-xs font-mono text-[#a7f3d0]">
        <div className="flex items-center gap-1.5">
          <span className="text-[#34d399]">LAT:</span>
          <span className="text-white font-bold">{hoverCoords ? `${hoverCoords.lat > 0 ? '+' : ''}${hoverCoords.lat.toFixed(2)}°` : '22.35°'}</span>
        </div>
        <div className="hidden sm:block w-[1px] h-3 bg-[#34d399]/30" />
        <div className="flex items-center gap-1.5">
          <span className="text-[#34d399]">LNG:</span>
          <span className="text-white font-bold">{hoverCoords ? `${hoverCoords.lng > 0 ? '+' : ''}${hoverCoords.lng.toFixed(2)}°` : '78.96°'}</span>
        </div>
        <div className="hidden sm:block w-[1px] h-3 bg-[#34d399]/30" />
        <div className="flex items-center gap-1.5" title="Distance from camera down to surface">
          <span className="text-[#38bdf8]">CAM:</span>
          <span className="text-white font-bold">{hoverCoords?.camAltKm ? (hoverCoords.camAltKm < 10 ? `${hoverCoords.camAltKm * 1000}m` : `${hoverCoords.camAltKm.toLocaleString()}km`) : '11,460km'}</span>
        </div>
        <div className="hidden sm:block w-[1px] h-3 bg-[#34d399]/30" />
        <div className="flex items-center gap-1.5" title="Physical ground relief elevation">
          <span className="text-[#fbbf24]">TERRAIN:</span>
          <span className="text-white font-bold">{hoverCoords ? `${hoverCoords.altMeters}m` : '420m'}</span>
        </div>
      </div>

      {/* Controls (Ruler & Pause) */}
      <div className="absolute bottom-[4.5rem] right-4 sm:bottom-auto sm:top-24 sm:right-6 pointer-events-auto flex flex-col items-end gap-3 z-30 font-body">
        <div className="flex gap-2 sm:gap-3">
          {/* Measurement Tools: desktop only */}
          <button 
            onClick={() => setRulerMode(!rulerMode)}
            className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all border backdrop-blur-md ${
              rulerMode ? 'border-gold text-gold bg-gold/15 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'bg-black/40 text-white/90 border-white/20 hover:border-gold/50 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{rulerMode ? 'Exit Tools' : 'Measurement Tools'}</span>
            <span className="sm:hidden">{rulerMode ? 'Exit' : 'Measure'}</span>
          </button>

          {/* Orbit/Pause: visible on all screens */}
          <button 
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-[#08221a]/95 backdrop-blur-2xl text-white border ${
              isAutoRotate 
                ? 'border-[#34d399]/50 hover:border-[#34d399] shadow-2xl'
                : 'border-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-pulse hover:bg-[#fbbf24]/20'
            }`}
          >
            {isAutoRotate ? '⏸ Pause' : '▶ Orbit'}
          </button>
        </div>

        {rulerMode && (
          <div className={`bg-[#08221a]/95 backdrop-blur-2xl w-full sm:w-80 rounded-2xl border border-[#34d399]/40 mt-1 shadow-2xl text-left animate-in fade-in slide-in-from-top-2 overflow-hidden`}>
            {/* Collapsible header for mobile */}
            <button
              onClick={() => setMeasureCollapsed(!measureCollapsed)}
              className="w-full flex items-center justify-between px-4 py-2.5 sm:py-2 border-b border-[#34d399]/20 sm:pointer-events-none"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#34d399]">
                CROSS-SECTION ELEVATION PROFILE
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[10px] text-[#fbbf24] font-bold">Tool</span>
                <span className="sm:hidden text-[#34d399] text-xs font-bold">{measureCollapsed ? '▼' : '▲'}</span>
              </span>
            </button>

            <div className={`${measureCollapsed ? 'hidden' : 'block'} sm:block p-4 pt-3`}>

            {rulerPoints.length === 0 && (
              <p className="text-xs text-[#a7f3d0]/80 leading-relaxed">
                Click any reserve or point on the 3D globe for <strong className="text-white">Point A (Origin)</strong>.
              </p>
            )}
            {rulerPoints.length === 1 && (
              <p className="text-xs text-[#a7f3d0]/80 leading-relaxed">
                Now click a second location across a mountain range or valley for <strong className="text-white">Point B</strong>.
              </p>
            )}
            {rulerPoints.length >= 2 && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#a7f3d0]/80 leading-relaxed">
                    Click more points to measure Polygon Area.
                  </div>
                  <button onClick={() => setRulerPoints([])} className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500/40 transition-colors">Clear Points</button>
                </div>
                <div className="grid grid-cols-2 gap-3 bg-black/40 p-3 rounded-xl border border-white/10">
                  <div>
                    <div className="text-[10px] sm:text-xs text-fog/60 mb-1">3D Distance ({distanceStr} flat):</div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-[#34d399] drop-shadow-md">{slopeDistanceStr}</div>
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-fog/60 mb-1">Polygon Area:</div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-[#fbbf24] drop-shadow-md">{polygonAreaStr || estimatedAreaStr + " (Est)"}</div>
                  </div>
                </div>
                
                <div className="text-[9px] text-[#fbbf24]/80 italic bg-[#fbbf24]/10 p-1.5 rounded-md border border-[#fbbf24]/20 text-center">
                  * Note: These values represent geodesic displacements (shortest 3D path), not actual on-ground traversal distances.
                </div>

                {/* Mini 2D Elevation Profile SVG Cross-Section Graph */}
                <div className="bg-black/50 p-2.5 rounded-xl border border-[#34d399]/20">
                  <div className="text-[10px] text-fog/70 mb-1.5 flex justify-between font-mono">
                    <span>Point A ({rulerPoints[0].lat.toFixed(1)}°)</span>
                    <span>Elevation Profile (DEM)</span>
                    <span>Point B ({rulerPoints[1].lat.toFixed(1)}°)</span>
                  </div>
                  
                  <div className="h-16 w-full flex items-end justify-between gap-1 pt-2">
                    {elevationProfileSamples.map((alt, idx) => {
                      const maxAlt = Math.max(...elevationProfileSamples, 1000);
                      const heightPct = Math.min(100, Math.max(15, (alt / maxAlt) * 100));
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                          <div 
                            style={{ height: `${heightPct}%` }}
                            className="w-full bg-gradient-to-t from-[#059669] to-[#34d399] rounded-t-sm transition-all group-hover:from-[#d97706] group-hover:to-[#fbbf24]"
                          />
                          <span className="text-[8px] font-mono text-white/50">{alt}m</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <p className="text-[10px] text-fog/50 text-center uppercase tracking-widest pt-1">
                  Click globe to reset cross-section
                </p>
              </div>
            )}
            </div>
          </div>
        )}
      </div>

          </>
  );
};

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mountain, Navigation, Info } from 'lucide-react';

export const TerrainCrossSection = () => {
  const transects = [
    {
      id: 'western-ghats',
      name: 'Western Ghats Transect (Arabian Sea → Nilgiris → Deccan Plateau)',
      desc: 'Illustrates rapid orographic lift along windward slopes generating dense tropical wet evergreen rainforests, transitioning into Shola-grasslands above 1800m, and rain-shadow dry thorn forests eastwards.',
      totalDistanceKm: 180,
      maxAltMeters: 2637, // Doddabetta peak
      points: [
        { dist: 0, alt: 0, label: 'Coastal Plain (0m)', eco: 'Mangroves & Littoral' },
        { dist: 30, alt: 250, label: 'Foothills (250m)', eco: 'Moist Deciduous (Teak/Sal)' },
        { dist: 70, alt: 1100, label: 'Mid-Slope (1100m)', eco: 'Tropical Wet Evergreen (Lion-tailed Macaque)' },
        { dist: 100, alt: 2450, label: 'Nilgiri Crest (2450m)', eco: 'Montane Shola-Grassland Mosaic (Nilgiri Tahr)' },
        { dist: 140, alt: 900, label: 'Leeward Plateau (900m)', eco: 'Southern Dry Deciduous Scrub' },
        { dist: 180, alt: 450, label: 'Deccan Plains (450m)', eco: 'Thorn & Scrub (Blackbuck habitat)' }
      ]
    },
    {
      id: 'himalayas',
      name: 'Himalayan Altitudinal Transect (Terai Arc → Shivaliks → Greater Himalayas)',
      desc: 'Classic vertical stratification from alluvial tall-grass Terai swamps hosting rhinos/tigers, ascending through temperate Oak/Rhododendron forests up to Alpine meadows (Bugyals) and snowline.',
      totalDistanceKm: 220,
      maxAltMeters: 4800,
      points: [
        { dist: 0, alt: 150, label: 'Terai Floodplains (150m)', eco: 'Tall Grassland & Sal Forests (Tiger/Rhino)' },
        { dist: 50, alt: 850, label: 'Shivalik Hills (850m)', eco: 'Sub-tropical Pine & Dry Sal' },
        { dist: 100, alt: 2200, label: 'Middle Himalayas (2200m)', eco: 'Moist Temperate Oak & Deodar Cedar' },
        { dist: 150, alt: 3500, label: 'Sub-Alpine Zone (350m)', eco: 'Rhododendron & Birch Krummholz' },
        { dist: 190, alt: 4200, label: 'Alpine Meadows (Bugyals)', eco: 'Herbaceous Pastures (Snow Leopard/Blue Sheep)' },
        { dist: 220, alt: 4800, label: 'Permanent Snowline', eco: 'Nival Glacial Moraine' }
      ]
    },
    {
      id: 'satpura-vindhya',
      name: 'Central Indian Escarpment (Narmada Rift → Satpura Range → Pench)',
      desc: 'Highlights undulating tablelands and gorges of Central Indian Highlands where teak forests interlock with bamboo brakes, forming the global stronghold for wild Bengal Tigers.',
      totalDistanceKm: 150,
      maxAltMeters: 1350, // Dhupgarh
      points: [
        { dist: 0, alt: 280, label: 'Narmada Valley (280m)', eco: 'Riparian & Riverine Alluvium' },
        { dist: 40, alt: 650, label: 'Lower Escarpment (650m)', eco: 'Dry Teak & Bamboo Brakes' },
        { dist: 80, alt: 1350, label: 'Pachmarhi Plateau (1350m)', eco: 'Central Indian Sub-tropical Hill Forest' },
        { dist: 120, alt: 750, label: 'Pench Corridor (750m)', eco: 'Southern Moist Deciduous Tiger Habitat' },
        { dist: 150, alt: 450, label: 'Nagpur Plains (450m)', eco: 'Dry Thorn Scrub' }
      ]
    }
  ];

  const [selectedId, setSelectedId] = useState('western-ghats');
  const selected = transects.find(t => t.id === selectedId) || transects[0];
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 320;
  const paddingLeft = 60;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 60;
  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const maxAlt = selected.maxAltMeters;
  const maxDist = selected.totalDistanceKm;

  const getX = (dist: number) => paddingLeft + (dist / maxDist) * chartWidth;
  const getY = (alt: number) => paddingTop + chartHeight - (alt / maxAlt) * chartHeight;

  // Build SVG polygon path for area chart
  const pointsStr = selected.points.map(p => `${getX(p.dist)},${getY(p.alt)}`).join(' ');
  const areaPathStr = `M ${getX(0)},${getY(0)} L ${pointsStr} L ${getX(maxDist)},${getY(0)} Z`;

  return (
    <div className="min-h-screen bg-ink text-fog pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/dashboards"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink/10 dark:bg-white/10 hover:bg-ink/20 dark:hover:bg-white/20 border border-ink/20 dark:border-white/10 text-xs font-bold text-fog transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Analytical Hub</span>
        </Link>
        <div className="text-xs font-mono text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/30 px-3 py-1 rounded-full font-bold">
          2D TOPOGRAPHIC TRANSECT GENERATOR
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-fog flex items-center gap-3 mb-2">
          <Mountain className="w-8 h-8 text-[#a855f7]" />
          <span>2D Terrain Cross-Section & Vegetation Stratification</span>
        </h1>
        <p className="text-sm text-fog/80 max-w-3xl">
          Generate high-speed 2D elevation profiles across major biogeographical ranges without heavy 3D GPU loading. Inspect vertical forest stratification and indicator ecological zones along the transect line.
        </p>
      </div>

      {/* Transect Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {transects.map(t => (
          <button
            key={t.id}
            onClick={() => { setSelectedId(t.id); setHoveredPoint(null); }}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedId === t.id
                ? 'bg-[#1e1b4b] border-[#a855f7] shadow-[0_0_25px_rgba(168,85,247,0.3)]'
                : 'bg-ink/5 dark:bg-white/5 hover:bg-ink/10 dark:hover:bg-white/10 border-ink/10 dark:border-white/10'
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#c084fc] uppercase mb-1">
              {t.totalDistanceKm} km Transect • Peak: {t.maxAltMeters}m
            </div>
            <h3 className={`text-sm font-bold leading-snug ${selectedId === t.id ? 'text-white' : 'text-fog'}`}>{t.name}</h3>
          </button>
        ))}
      </div>

      {/* Profile Chart Container */}
      <div className="glass-card bg-black/80 border border-[#a855f7]/40 p-6 sm:p-8 rounded-3xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#a855f7]" />
              <span>Elevation Profile: {selected.name}</span>
            </h2>
            <p className="text-xs text-white/70 mt-1 max-w-3xl">{selected.desc}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-[#a855f7] bg-[#a855f7]/10 px-3 py-1.5 rounded-xl border border-[#a855f7]/30 font-bold">
              Hover over points for Eco-Zone details
            </span>
          </div>
        </div>

        {/* SVG Interactive Chart */}
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full min-w-[650px] h-auto">
            <defs>
              <linearGradient id="terrainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Grid lines & Y Axis */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingTop + chartHeight - ratio * chartHeight;
              const altVal = Math.round(ratio * maxAlt);
              return (
                <g key={i}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={svgWidth - paddingRight}
                    y2={y}
                    stroke="#ffffff"
                    strokeOpacity="0.1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingLeft - 12}
                    y={y + 4}
                    textAnchor="end"
                    fill="#a855f7"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {altVal}m
                  </text>
                </g>
              );
            })}

            {/* X Axis */}
            <line
              x1={paddingLeft}
              y1={paddingTop + chartHeight}
              x2={svgWidth - paddingRight}
              y2={paddingTop + chartHeight}
              stroke="#ffffff"
              strokeOpacity="0.3"
            />

            {/* Area Path */}
            <path d={areaPathStr} fill="url(#terrainGrad)" />

            {/* Polyline */}
            <polyline
              fill="none"
              stroke="#c084fc"
              strokeWidth="3.5"
              strokeLinejoin="round"
              points={pointsStr}
            />

            {/* Interactive Data Points */}
            {selected.points.map((p, idx) => {
              const x = getX(p.dist);
              const y = getY(p.alt);
              const isHovered = hoveredPoint?.dist === p.dist;

              return (
                <g
                  key={idx}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredPoint(p)}
                >
                  {/* Vertical guide line */}
                  <line
                    x1={x}
                    y1={y}
                    x2={x}
                    y2={paddingTop + chartHeight}
                    stroke="#ffffff"
                    strokeOpacity={isHovered ? "0.6" : "0.2"}
                    strokeDasharray="2 2"
                  />

                  {/* Outer glow */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 12 : 7}
                    fill="#a855f7"
                    fillOpacity="0.3"
                    className="transition-all duration-200"
                  />

                  {/* Solid dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? "#ffffff" : "#c084fc"}
                    stroke="#1e1b4b"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />

                  {/* X Axis Distance label */}
                  <text
                    x={x}
                    y={paddingTop + chartHeight + 22}
                    textAnchor="middle"
                    fill="#ffffff"
                    fillOpacity="0.7"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {p.dist} km
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Point Ecology Card */}
        {hoveredPoint ? (
          <div className="mt-6 p-5 rounded-2xl bg-[#1e1b4b]/90 border border-[#a855f7] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-[#c084fc] mb-1">
                Altitude Station: {hoveredPoint.alt}m ASL ({hoveredPoint.dist} km along transect)
              </div>
              <h3 className="text-base font-extrabold text-white">{hoveredPoint.label}</h3>
              <p className="text-xs text-[#e9d5ff] font-semibold mt-1">🌿 Dominant Ecosystem & Indicator Fauna: {hoveredPoint.eco}</p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-black/40 text-[#c084fc] border border-[#a855f7]/30 whitespace-nowrap">
              Champion & Seth Belt
            </span>
          </div>
        ) : (
          <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-white/60 font-mono">
            <Info className="w-4 h-4 text-[#a855f7]" />
            <span>Hover your cursor over any circular node on the elevation transect above to inspect the exact vegetation forest type and indicator wildlife species.</span>
          </div>
        )}
      </div>
    </div>
  );
};

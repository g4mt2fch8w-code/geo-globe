import React, { useEffect, useRef, useState } from 'react';
import forestsData from '../data/forestsData.json';

const Globe = React.lazy(() => import('react-globe.gl'));

const generateLatLine = (lat: number, points = 64) => {
  const line = [];
  for (let i = 0; i <= points; i++) {
    const lng = -180 + (i * 360) / points;
    line.push([lat, lng]);
  }
  return line;
};

const generateLngLine = (lng: number, points = 64) => {
  const line = [];
  for (let i = 0; i <= points; i++) {
    // We go from -90 to 90 and back to -90 on the other side to complete a full 360 loop
    // But react-globe.gl paths are just lines. A full meridian loop goes down one side, up the other.
    const lat = 90 - (i * 360) / points; 
    const currentLng = lat < -90 || lat > 90 ? lng + 180 : lng;
    
    let normalizedLat = lat;
    if (lat > 90) normalizedLat = 180 - lat;
    if (lat < -90) normalizedLat = -180 - lat;
    
    line.push([normalizedLat, currentLng > 180 ? currentLng - 360 : currentLng]);
  }
  return line;
};

const pathsData = [
  { name: 'Equator', coords: generateLatLine(0), color: 'rgba(255, 255, 255, 0.4)' },
  { name: 'Tropic of Cancer', coords: generateLatLine(23.5), color: 'rgba(255, 215, 0, 0.4)' },
  { name: 'Tropic of Capricorn', coords: generateLatLine(-23.5), color: 'rgba(255, 215, 0, 0.4)' },
  { name: 'Prime Meridian', coords: generateLngLine(0), color: 'rgba(200, 200, 255, 0.4)' },
];

export interface GeoEntity {
  id: string;
  name: string;
  subtitle?: string;
  lat: number;
  lng: number;
  color?: string;
  type?: string;
  size?: number;
  alt?: number;
  areaOrElevation?: string;
  facts?: string[];
  country?: string;
}

interface GlobeViewerProps {
  onEntityClick: (entity: GeoEntity) => void;
  onGlobeClick: (lat: number, lng: number) => void;
  rulerPoints: { lat: number, lng: number }[];
  isAutoRotate: boolean;
  flyTo?: {lat: number, lng: number} | null;
}

const getEntityEmoji = (type?: string) => {
  if (!type) return '📍';
  const t = type.toLowerCase();
  if (t.includes('tiger')) return '🐅';
  if (t.includes('biosphere')) return '🌿';
  if (t.includes('national park')) return '🌲';
  if (t.includes('elephant')) return '🐘';
  if (t.includes('ramsar')) return '💧';
  if (t.includes('global')) return '🌎';
  return '📍';
};

const getEntityColor = (type?: string) => {
  if (!type) return '#FF9500';
  const t = type.toLowerCase();
  if (t.includes('tiger')) return '#F97316'; // orange-500
  if (t.includes('biosphere')) return '#84CC16'; // lime-500
  if (t.includes('national park')) return '#22C55E'; // green-500
  if (t.includes('elephant')) return '#A3A3A3'; // neutral-400
  if (t.includes('ramsar')) return '#3B82F6'; // blue-500
  if (t.includes('global')) return '#EAB308'; // yellow-500
  return '#FF9500';
};

export const GlobeViewer: React.FC<GlobeViewerProps> = ({ 
  onEntityClick, onGlobeClick, rulerPoints, isAutoRotate, flyTo
}) => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (flyTo && globeRef.current) {
      globeRef.current.pointOfView({ lat: flyTo.lat, lng: flyTo.lng, altitude: 1.5 }, 1200);
    }
  }, [flyTo]);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (globeRef.current) {
        const scene = globeRef.current.scene();
        if (scene && scene.rotation.z === 0) {
          scene.rotation.z = (23.5 * Math.PI) / 180;
        }
        
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = isAutoRotate;
          controls.autoRotateSpeed = 0.5;
        }
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    
    return () => cancelAnimationFrame(frameId);
  }, [isAutoRotate]);

  const handleEntityClick = (entity: GeoEntity) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: entity.lat, lng: entity.lng, altitude: 1.5 }, 1200);
    }
    onEntityClick(entity);
  };

  const rulerHtmlData = rulerPoints.map((pt, i) => ({
    lat: pt.lat,
    lng: pt.lng,
    label: i === 0 ? 'A' : 'B'
  }));

  const arcs = rulerPoints.length === 2 ? [{
    startLat: rulerPoints[0].lat,
    startLng: rulerPoints[0].lng,
    endLat: rulerPoints[1].lat,
    endLng: rulerPoints[1].lng,
    color: '#FF9500'
  }] : [];

  return (
    <div className="w-full h-full flex flex-col relative bg-black">
      <div ref={containerRef} className="w-full h-full relative" style={{ touchAction: 'none' }}>
        <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/50">Loading Globe...</div>}>
          <Globe
            ref={globeRef}
            
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl={isMobile ? undefined : "//unpkg.com/three-globe/example/img/earth-topology.png"}
            backgroundImageUrl={isMobile ? undefined : "//unpkg.com/three-globe/example/img/night-sky.png"}
            
            onGlobeReady={() => {
              if (globeRef.current) {
                // Auto zoom out initially so users can see the stars and universe
                globeRef.current.pointOfView({ altitude: 3.5 }, 2000);
                
                // Optimize Renderer for Mobile (limit Pixel Ratio)
                const renderer = globeRef.current.renderer();
                if (renderer) {
                  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                }

                // Apple Maps style buttery smooth controls
                const controls = globeRef.current.controls();
                if (controls) {
                  controls.enableDamping = true;
                  controls.dampingFactor = 0.05;
                  controls.zoomSpeed = 0.6;
                  controls.rotateSpeed = 0.5;
                  controls.panSpeed = 0.5;
                }
              }
            }}
            
            onGlobeClick={({ lat, lng }) => onGlobeClick(lat, lng)}
            
            pathsData={pathsData}
            pathPoints="coords"
            pathPointLat={(p: any) => p[0]}
            pathPointLng={(p: any) => p[1]}
            pathColor="color"
            pathDashAnimateTime={10000}
            pathStroke={2}
            
            // On mobile, use highly optimized raw WebGL points instead of text/labels. 
            // Rendering 200+ emojis to canvas textures completely blocks mobile CPUs.
            pointsData={isMobile ? forestsData : []}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: any) => getEntityColor(d.type) + 'E6'} // 90% opacity for better blending
            pointAltitude={(d: any) => 0.01 + (Math.abs(d.lat * d.lng) % 0.015)} // Offset altitude to kill Z-fighting (blinking)
            pointRadius={0.15} // Make them much smaller to prevent crowding when zoomed out
            pointResolution={16}
            onPointClick={(d: any) => handleEntityClick(d)}
            
            // On mobile, only render ruler HTML elements. On desktop, render forests and rulers as HTML.
            htmlElementsData={isMobile ? rulerHtmlData : [...forestsData, ...rulerHtmlData]}
            htmlLat="lat"
            htmlLng="lng"
            htmlElement={(d: any) => {
              const el = document.createElement('div');
              // Ensure wrapper can receive pointer events
              el.className = "group pointer-events-auto cursor-pointer";
              
              if (d.label) {
                // Ruler Marker
                const filter = isMobile ? '' : 'filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));';
                el.innerHTML = `
                  <div style="width: 14px; height: 14px; background-color: #FF9500; border: 2px solid white; border-radius: 50%; ${filter}; position: relative;">
                    <div style="position: absolute; top: -24px; left: 50%; transform: translateX(-50%); color: #FF9500; font-weight: bold; font-size: 12px; font-family: sans-serif; text-shadow: 0 2px 4px rgba(0,0,0,0.8); white-space: nowrap;">${d.label}</div>
                  </div>
                `;
              } else {
                // Forest Marker
                const emoji = getEntityEmoji(d.type);
                const textShadow = isMobile ? '' : 'text-shadow: 0 0 10px rgba(255,255,255,0.5);';
                const backdrop = isMobile ? '' : 'backdrop-filter: blur(4px);';
                const bg = isMobile ? 'rgba(10, 26, 16, 1)' : 'rgba(10, 26, 16, 0.9)'; // Solid bg on mobile
                
                // Use Tailwind group-hover for pure CSS hover
                el.innerHTML = `
                  <div class="flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-125 relative">
                    <div style="font-size: 20px; ${textShadow}">${emoji}</div>
                    <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-[25px] pointer-events-none whitespace-nowrap z-50">
                      <div style="background: ${bg}; border: 1px solid rgba(201, 161, 59, 0.4); padding: 4px 8px; border-radius: 6px; color: #F0D87A; font-family: sans-serif; font-size: 10px; ${backdrop}">
                        ${d.name}
                      </div>
                    </div>
                  </div>
                `;
                el.onclick = () => handleEntityClick(d as GeoEntity);
              }
              return el;
            }}

            arcsData={arcs}
            arcColor="color"
            arcDashLength={1}
            arcDashGap={0}
            arcDashAnimateTime={0}
            arcAltitudeAutoScale={0.2}
            
            atmosphereColor="#3b82f6"
            atmosphereAltitude={0.25}
          />
        </React.Suspense>
      </div>

      <div className="absolute bottom-8 left-8 p-6 glass-card rounded-2xl pointer-events-none z-10 hidden md:block">
        <h3 className="text-sm font-display uppercase tracking-widest text-gold mb-4">Legend</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-fog/80"><span>🐅</span> Tiger Reserves</li>
          <li className="flex items-center gap-3 text-sm text-fog/80"><span>🌲</span> National Parks</li>
          <li className="flex items-center gap-3 text-sm text-fog/80"><span>🐘</span> Elephant Reserves</li>
          <li className="flex items-center gap-3 text-sm text-fog/80"><span>🌿</span> Biosphere Reserves</li>
          <li className="flex items-center gap-3 text-sm text-fog/80"><span>💧</span> Ramsar Sites</li>
          <li className="flex items-center gap-3 text-sm text-fog/80"><span>🌎</span> Global Main Reserves</li>
        </ul>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-fog/50 pointer-events-auto">
          <p>Tilted at 23.5° (Earth's natural axis).</p>
        </div>
      </div>

      {/* Mobile Compact Horizontal Legend */}
      <div 
        className="absolute bottom-24 w-full px-4 z-10 md:hidden pointer-events-auto flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-2 min-w-max">
          <div className="flex items-center gap-1.5 bg-ink/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-emerald">
            <span className="text-sm">🐅</span><span className="text-[10px] font-bold text-fog/90 uppercase tracking-wide">Tiger</span>
          </div>
          <div className="flex items-center gap-1.5 bg-ink/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-emerald">
            <span className="text-sm">🌲</span><span className="text-[10px] font-bold text-fog/90 uppercase tracking-wide">Nat. Park</span>
          </div>
          <div className="flex items-center gap-1.5 bg-ink/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-emerald">
            <span className="text-sm">🐘</span><span className="text-[10px] font-bold text-fog/90 uppercase tracking-wide">Elephant</span>
          </div>
          <div className="flex items-center gap-1.5 bg-ink/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-emerald">
            <span className="text-sm">🌿</span><span className="text-[10px] font-bold text-fog/90 uppercase tracking-wide">Biosphere</span>
          </div>
          <div className="flex items-center gap-1.5 bg-ink/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-emerald">
            <span className="text-sm">💧</span><span className="text-[10px] font-bold text-fog/90 uppercase tracking-wide">Ramsar</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 w-full text-center text-[10px] text-fog/40 pointer-events-none z-10">
        Note: Some forests may not be fully available as this is an early stage of the new Geo-Globe project.
      </div>
    </div>
  );
};

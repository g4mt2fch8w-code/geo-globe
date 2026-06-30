import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import forestsData from '../data/forestsData.json';
import { championForestTypes, hydrologicalWatersheds, soilClimateGrids } from '../data/forestryLayersData';
import { 
  biogeographicZones,
  threatMatrixData,
  timelineReserves
} from '../data/globeModesData';

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
    const lat = 90 - (i * 360) / points; 
    const currentLng = lat < -90 || lat > 90 ? lng + 180 : lng;
    
    let normalizedLat = lat;
    if (lat > 90) normalizedLat = 180 - lat;
    if (lat < -90) normalizedLat = -180 - lat;
    
    line.push([normalizedLat, currentLng > 180 ? currentLng - 360 : currentLng]);
  }
  return line;
};

const basePathsData = [
  { name: 'Equator', coords: generateLatLine(0), color: 'rgba(255, 255, 255, 0.3)', width: 1 },
  { name: 'Tropic of Cancer', coords: generateLatLine(23.5), color: 'rgba(251, 191, 36, 0.4)', width: 1.5 },
  { name: 'Tropic of Capricorn', coords: generateLatLine(-23.5), color: 'rgba(251, 191, 36, 0.4)', width: 1 },
  { name: 'Prime Meridian', coords: generateLngLine(0), color: 'rgba(200, 200, 255, 0.3)', width: 1 },
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
  customSummary?: string;
  customUrl?: string;
}

interface GlobeViewerProps {
  onEntityClick: (entity: GeoEntity) => void;
  onGlobeClick: (lat: number, lng: number) => void;
  rulerPoints: { lat: number, lng: number }[];
  isAutoRotate: boolean;
  flyTo?: {lat: number, lng: number} | null;
  terrainExaggeration?: number;
  activeLayer?: 'none' | 'champion' | 'watershed' | 'soil';
  onHoverCoordsChange?: (coords: { lat: number, lng: number, altMeters: number, camAltKm?: number } | null) => void;
  resetNorthTrigger?: number;
  selectedEntity?: GeoEntity | null;
  showCarvedOutline?: boolean;
  globeMode?: 'standard' | 'timeline' | 'biogeo' | 'threats';
  timelineYear?: number;
}

const getEntityEmoji = (type?: string) => {
  if (!type) return '📍';
  const t = type.toLowerCase();
  if (t.includes('tiger')) return '🐅';
  if (t.includes('biosphere')) return '🌿';
  if (t.includes('national park')) return '🌲';
  if (t.includes('sanctuary')) return '🦌';
  if (t.includes('elephant')) return '🐘';
  if (t.includes('forest reserve')) return '🌳';
  if (t.includes('ramsar')) return '💧';
  if (t.includes('global')) return '🌎';
  return '📍';
};

const getEntityColor = (type?: string) => {
  if (!type) return '#FF9500';
  const t = type.toLowerCase();
  if (t.includes('tiger')) return '#F97316';
  if (t.includes('biosphere')) return '#10B981';
  if (t.includes('national park')) return '#3B82F6';
  if (t.includes('sanctuary')) return '#A855F7';
  return '#FF9500';
};

const estimateElevation = (lat: number, lng: number, exaggeration = 1.0): number => {
  if (lat >= 27 && lat <= 36 && lng >= 73 && lng <= 96) {
    return Math.round((2800 + Math.abs(Math.sin(lat * 3) * 3500)) * exaggeration);
  }
  if (lat >= 8 && lat <= 20 && lng >= 73 && lng <= 77) {
    return Math.round((950 + Math.abs(Math.cos(lat * 5) * 1400)) * exaggeration);
  }
  if (lat >= 21 && lat <= 25 && lng >= 76 && lng <= 84) {
    return Math.round((500 + Math.abs(Math.sin(lng * 4) * 750)) * exaggeration);
  }
  if (lat >= 12 && lat <= 21 && lng >= 76 && lng <= 80) {
    return Math.round((380 + Math.abs(Math.cos(lng * 2) * 450)) * exaggeration);
  }
  if (lat >= 24 && lat <= 28 && lng >= 78 && lng <= 88) {
    return Math.round((90 + Math.abs(Math.sin(lat * 8) * 140)) * exaggeration);
  }
  return Math.round((45 + Math.abs(Math.sin(lat + lng) * 280)) * exaggeration);
};

export const GlobeViewer: React.FC<GlobeViewerProps> = ({ 
  onEntityClick, onGlobeClick, rulerPoints, isAutoRotate, flyTo, selectedEntity,
  terrainExaggeration = 1.4, activeLayer = 'none',
  onHoverCoordsChange, resetNorthTrigger = 0,
  globeMode = 'standard', timelineYear = 2026
}) => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ x: number, y: number } | null>(null);
  const lastRaycastTimeRef = useRef<number>(0);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to safely update material bump scale
  const updateGlobeMaterialBump = (exag: number) => {
    if (!globeRef.current) return;
    try {
      if (typeof globeRef.current.globeMaterial === 'function') {
        const material = globeRef.current.globeMaterial();
        if (material) {
          material.bumpScale = 12 * exag;
          material.shininess = 3;
          material.needsUpdate = true;
        }
      } else if (globeRef.current.globeMaterial) {
        globeRef.current.globeMaterial.bumpScale = 12 * exag;
        globeRef.current.globeMaterial.shininess = 3;
        globeRef.current.globeMaterial.needsUpdate = true;
      }
    } catch (e) {
      // ignore
    }
  };

  // Handle smooth auto-rotation
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (globeRef.current && typeof globeRef.current.controls === 'function') {
        try {
          const controls = globeRef.current.controls();
          if (controls) {
            controls.autoRotate = isAutoRotate;
            controls.autoRotateSpeed = 0.35;
          }
        } catch (e) {
          // ignore
        }
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [isAutoRotate]);

  // Update topology bump relief dynamically when terrainExaggeration changes
  useEffect(() => {
    updateGlobeMaterialBump(terrainExaggeration || 1.4);
  }, [terrainExaggeration]);

  // Smooth fly-to navigation keeping North headed upward all the time
  useEffect(() => {
    if (flyTo && globeRef.current && typeof globeRef.current.pointOfView === 'function') {
      try {
        globeRef.current.pointOfView({ lat: flyTo.lat, lng: flyTo.lng, altitude: 2.2 }, 2000);
        setTimeout(() => {
          if (globeRef.current && typeof globeRef.current.camera === 'function') {
            const camera = globeRef.current.camera();
            if (camera && camera.up) camera.up.set(0, 1, 0);
          }
        }, 50);
      } catch (e) {
        // ignore
      }
    }
  }, [flyTo]);

  // Reset orientation back to True North
  useEffect(() => {
    if (resetNorthTrigger > 0 && globeRef.current && typeof globeRef.current.pointOfView === 'function') {
      try {
        const pov = globeRef.current.pointOfView();
        globeRef.current.pointOfView({ lat: pov?.lat || 22.0, lng: pov?.lng || 78.96, altitude: pov?.altitude || 2.4 }, 1000);
        
        setTimeout(() => {
          if (globeRef.current) {
            const camera = typeof globeRef.current.camera === 'function' ? globeRef.current.camera() : null;
            const controls = typeof globeRef.current.controls === 'function' ? globeRef.current.controls() : null;
            if (camera && camera.up) camera.up.set(0, 1, 0);
            if (controls && controls.update) controls.update();
          }
        }, 50);
      } catch (e) {
        // ignore
      }
    }
  }, [resetNorthTrigger]);

  const handleEntityClick = (entity: GeoEntity) => {
    if (!entity) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    if (globeRef.current && typeof globeRef.current.pointOfView === 'function') {
      try {
        globeRef.current.pointOfView({ lat: entity.lat || 0, lng: entity.lng || 0, altitude: 1.5 }, 2000);
        setTimeout(() => {
          if (globeRef.current && typeof globeRef.current.camera === 'function') {
            const camera = globeRef.current.camera();
            if (camera && camera.up) camera.up.set(0, 1, 0);
          }
        }, 50);
      } catch (e) {
        // ignore
      }
    }
    onEntityClick(entity);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mousePosRef.current = { x, y };

    const now = performance.now();
    if (now - lastRaycastTimeRef.current > 50 && onHoverCoordsChange && globeRef.current) {
      lastRaycastTimeRef.current = now;
      try {
        const scene = typeof globeRef.current.scene === 'function' ? globeRef.current.scene() : null;
        const camera = typeof globeRef.current.camera === 'function' ? globeRef.current.camera() : null;
        if (scene && camera) {
          raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), camera);
          const intersects = raycasterRef.current.intersectObjects(scene.children, true);
          const camPos = camera.position;
          const camDist = camPos ? camPos.length() : 180;
          const altRatio = Math.max(0.005, (camDist - 100) / 100);
          const camAltKm = Math.round(altRatio * 6371);

          let found = false;
          for (let i = 0; i < intersects.length; i++) {
            const point = intersects[i].point;
            const r = point.length();
            if (r > 90 && r < 120) {
              let lat = 0;
              let lng = 0;
              if (typeof globeRef.current.toGeoCoords === 'function') {
                const geo = globeRef.current.toGeoCoords(point);
                lat = Number(geo.lat.toFixed(4));
                lng = Number(geo.lng.toFixed(4));
              } else {
                const phi = Math.acos(point.y / r);
                const theta = Math.atan2(point.z, point.x);
                lat = Number((90 - (phi * 180) / Math.PI).toFixed(4));
                lng = Number((90 - (theta * 180) / Math.PI - (theta < -Math.PI / 2 ? 360 : 0)).toFixed(4));
              }
              const alt = estimateElevation(lat, lng, terrainExaggeration);
              onHoverCoordsChange({ lat, lng, altMeters: alt, camAltKm });
              found = true;
              break;
            }
          }
          if (!found) {
            const currentPov = typeof globeRef.current.pointOfView === 'function' ? globeRef.current.pointOfView() : null;
            if (currentPov && typeof currentPov.lat === 'number' && typeof currentPov.lng === 'number') {
              const alt = estimateElevation(currentPov.lat, currentPov.lng, terrainExaggeration);
              onHoverCoordsChange({ lat: Number(currentPov.lat.toFixed(4)), lng: Number(currentPov.lng.toFixed(4)), altMeters: alt, camAltKm });
            }
          }
        }
      } catch (err) {
        // ignore
      }
    }
  };

  const handleMouseLeave = () => {
    mousePosRef.current = null;
  };

  const rulerHtmlData = rulerPoints.map((pt, i) => ({
    lat: pt.lat,
    lng: pt.lng,
    label: String.fromCharCode(65 + i)
  }));

  const arcs: any[] = []; // Replaced by pathsData for polygons

  let combinedPaths: any[] = [...basePathsData];
  
  if (rulerPoints.length >= 2) {
    const coords = rulerPoints.map(p => [p.lat, p.lng]);
    if (rulerPoints.length > 2) {
      coords.push([rulerPoints[0].lat, rulerPoints[0].lng]); // Close the polygon
    }
    combinedPaths.push({
      name: "Polygon Area Tool",
      coords,
      color: '#f59e0b',
      width: 2.5
    });
  }
  if (activeLayer === 'watershed') {
    const riverPaths = hydrologicalWatersheds.map((w: any) => ({
      name: w.name,
      coords: w.coords,
      color: w.color,
      width: 3.5
    }));
    combinedPaths = [...combinedPaths, ...riverPaths];
  }

  let dynamicRings: any[] = [];
  if (activeLayer === 'champion') {
    dynamicRings = championForestTypes.map((c: any) => ({
      lat: c.lat,
      lng: c.lng,
      maxR: c.radiusKm / 50,
      propagationSpeed: 1.5,
      repeatPeriod: 1200,
      color: c.color
    }));
  } else if (activeLayer === 'soil') {
    dynamicRings = soilClimateGrids.map((s: any) => ({
      lat: s.lat,
      lng: s.lng,
      maxR: 4,
      propagationSpeed: 1,
      repeatPeriod: 1500,
      color: s.color
    }));
  }

  let layerHtmlElements: any[] = [];
  if (globeMode === 'timeline') {
    layerHtmlElements = timelineReserves
      .filter(r => r.year <= (timelineYear || 2026))
      .map(r => ({
        lat: r.lat,
        lng: r.lng,
        isOverlay: true,
        emoji: '🌲',
        name: r.name,
        badge: `Est. ${r.year} (${r.state})`,
        color: '#F59E0B',
        desc: `${r.type} • Area: ${r.areaSqKm} sq km`
      }));
  } else if (globeMode === 'biogeo') {
    layerHtmlElements = biogeographicZones.map(b => ({
      lat: b.lat,
      lng: b.lng,
      isOverlay: true,
      name: b.name,
      badge: `Zone ${b.zoneCode} (${b.percentArea}% area)`,
      color: b.color,
      desc: `Forest: ${b.primaryForestType} | Flagship: ${b.flagshipFauna}`
    }));
  } else if (globeMode === 'threats') {
    layerHtmlElements = threatMatrixData.map(t => ({
      lat: t.lat,
      lng: t.lng,
      isOverlay: true,
      name: t.name,
      badge: `⚠️ ${t.threatType} [${t.impactLevel}]`,
      color: t.impactLevel === 'Critical' ? '#EF4444' : '#F97316',
      desc: t.summary
    }));
  } else if (activeLayer === 'champion' && !isMobile) {
    layerHtmlElements = championForestTypes.map((c: any) => ({
      lat: c.lat,
      lng: c.lng,
      isOverlay: true,
      name: c.name,
      badge: c.category,
      color: c.color,
      desc: c.description
    }));
  } else if (activeLayer === 'watershed' && !isMobile) {
    layerHtmlElements = hydrologicalWatersheds.map((w: any) => ({
      lat: w.coords[0][0],
      lng: w.coords[0][1],
      isOverlay: true,
      name: w.name,
      badge: `Basin: ${w.basinAreaSqKm.toLocaleString()} sq km`,
      color: w.color,
      desc: `Origin: ${w.origin}`
    }));
  } else if (activeLayer === 'soil' && !isMobile) {
    layerHtmlElements = soilClimateGrids.map((s: any) => ({
      lat: s.lat,
      lng: s.lng,
      isOverlay: true,
      name: s.soilType,
      badge: s.rainfallIsohyet,
      color: s.color,
      desc: s.characteristics
    }));
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex flex-col relative bg-black"
    >
      <div ref={containerRef} className="w-full h-full relative" style={{ touchAction: 'none' }}>
        <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/50">Loading Globe...</div>}>
          <Globe
            ref={globeRef}
            
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl={isMobile ? undefined : "//unpkg.com/three-globe/example/img/earth-topology.png"}
            backgroundImageUrl={isMobile ? undefined : "//unpkg.com/three-globe/example/img/night-sky.png"}
            
            onGlobeReady={() => {
              if (globeRef.current) {
                try {
                  if (typeof globeRef.current.pointOfView === 'function') {
                    globeRef.current.pointOfView({ lat: 22.0, lng: 78.96, altitude: 2.4 }, 2000);
                  }
                  
                  if (typeof globeRef.current.renderer === 'function') {
                    const renderer = globeRef.current.renderer();
                    if (renderer) {
                      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                    }
                  }

                  if (typeof globeRef.current.scene === 'function') {
                    const scene = globeRef.current.scene();
                    if (scene) {
                      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
                      const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
                      dirLight1.position.set(200, 300, 400);
                      const dirLight2 = new THREE.DirectionalLight(0xa7f3d0, 0.6);
                      dirLight2.position.set(-200, -100, -200);
                      scene.add(ambientLight);
                      scene.add(dirLight1);
                      scene.add(dirLight2);
                    }
                  }

                  updateGlobeMaterialBump(terrainExaggeration || 1.4);

                  // Apple Maps / Google Earth full tilt freedom
                  if (typeof globeRef.current.controls === 'function') {
                    const controls = globeRef.current.controls();
                    if (controls) {
                      controls.enableDamping = true;
                      controls.dampingFactor = 0.05;
                      controls.zoomSpeed = 0.8;
                      controls.rotateSpeed = 0.5;
                      controls.panSpeed = 0.6;
                      controls.maxPolarAngle = Math.PI - 0.05;
                      controls.minPolarAngle = 0.05;
                    }
                  }
                } catch (err) {
                  // ignore
                }
              }
            }}
            
            onGlobeClick={({ lat, lng }) => onGlobeClick(lat, lng)}
            
            pathsData={combinedPaths}
            pathPoints="coords"
            pathPointLat={(p: any) => p[0]}
            pathPointLng={(p: any) => p[1]}
            pathColor="color"
            pathStroke={(p: any) => p.width || 2}
            pathDashAnimateTime={(p: any) => (p.width > 2 ? 3000 : 10000)}
            
            ringsData={dynamicRings}
            ringLat="lat"
            ringLng="lng"
            ringMaxRadius="maxR"
            ringPropagationSpeed="propagationSpeed"
            ringRepeatPeriod="repeatPeriod"
            ringColor="color"

            pointsData={isMobile ? forestsData : []}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: any) => getEntityColor(d?.type) + 'E6'}
            pointAltitude={(d: any) => (0.01 + (Math.abs((d?.lat || 0) * (d?.lng || 0)) % 0.015)) * ((terrainExaggeration || 1.4) * 0.7)}
            pointRadius={0.15}
            pointResolution={16}
            onPointClick={(d: any) => handleEntityClick(d)}
            
            htmlElementsData={isMobile ? rulerHtmlData : (globeMode && globeMode !== 'standard' ? [...rulerHtmlData, ...layerHtmlElements] : [...forestsData, ...rulerHtmlData, ...layerHtmlElements])}
            htmlLat="lat"
            htmlLng="lng"
            htmlElement={(d: any) => {
              const el = document.createElement('div');
              if (!d) return el;
              el.className = "group pointer-events-auto cursor-pointer";
              
              if (d.isOverlay) {
                el.innerHTML = `
                  <div class="flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 relative">
                    <div style="background-color: ${d.color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px ${d.color};"></div>
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-[#08221a]/95 backdrop-blur-md border border-[#34d399]/40 p-3 rounded-xl shadow-2xl text-left pointer-events-none z-50">
                      <div style="color: ${d.color}; font-size: 10px; font-weight: bold; text-transform: uppercase;">${d.badge}</div>
                      <div class="text-white text-xs font-bold my-1">${d.name}</div>
                      <div class="text-[#a7f3d0]/80 text-[10px] leading-tight">${d.desc}</div>
                    </div>
                  </div>
                `;
              } else if (d.label) {
                const filter = isMobile ? '' : 'filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));';
                el.innerHTML = `
                  <div style="width: 14px; height: 14px; background-color: #FF9500; border: 2px solid white; border-radius: 50%; ${filter}; position: relative;">
                    <div style="position: absolute; top: -24px; left: 50%; transform: translateX(-50%); color: #FF9500; font-weight: bold; font-size: 12px; font-family: sans-serif; text-shadow: 0 2px 4px rgba(0,0,0,0.8); white-space: nowrap;">${d.label}</div>
                  </div>
                `;
              } else {
                const emoji = getEntityEmoji(d?.type);
                const textShadow = isMobile ? '' : 'text-shadow: 0 0 10px rgba(255,255,255,0.5);';
                const backdrop = isMobile ? '' : 'backdrop-filter: blur(4px);';
                const bg = isMobile ? 'rgba(10, 26, 16, 1)' : 'rgba(10, 26, 16, 0.9)';
                
                const isSelected = Boolean(selectedEntity && d?.name && d.name === selectedEntity.name);
                
                el.innerHTML = `
                  <div class="flex flex-col items-center justify-center transition-all duration-300 relative pointer-events-auto cursor-pointer group">
                    ${isSelected ? `
                      <div style="position: absolute; top: -38px; left: 50%; transform: translateX(-50%); z-index: 100; animation: bounce 1s infinite;" class="flex flex-col items-center">
                        <div style="background: linear-gradient(135deg, #F59E0B, #D97706); color: #000; font-weight: 900; font-size: 11px; padding: 2px 8px; border-radius: 12px; border: 2px solid #FFF; box-shadow: 0 0 15px rgba(245,158,11,0.9); white-space: nowrap; display: flex; align-items: center; gap: 4px;">
                          <span>📍</span> TARGET PIN
                        </div>
                        <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #F59E0B;"></div>
                      </div>
                    ` : ''}
                    <div style="font-size: ${isSelected ? '28px' : '22px'}; ${textShadow} transition: transform 0.2s;" class="${isSelected ? 'scale-125' : 'group-hover:scale-125'}">${emoji}</div>
                    <div class="${isSelected ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-100'} transition-all duration-200 absolute top-[28px] pointer-events-none whitespace-nowrap z-50">
                      <div style="background: ${bg}; border: 1px solid ${isSelected ? 'rgba(251, 191, 36, 0.9)' : 'rgba(201, 161, 59, 0.4)'}; padding: ${isSelected ? '4px 8px' : '3px 7px'}; border-radius: 6px; color: #F0D87A; font-family: sans-serif; font-size: ${isSelected ? '11px' : '10px'}; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.8); ${backdrop}">
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
            arcAltitudeAutoScale={0.2 * terrainExaggeration}
            
            atmosphereColor="#10b981"
            atmosphereAltitude={0.22}
          />
        </React.Suspense>
      </div>

      {/* Restored Clean Legends - Desktop */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/40 backdrop-blur-[30px] rounded-[2rem] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] pointer-events-auto z-10 hidden lg:flex flex-col items-center min-w-max">
        <div className="flex gap-6 mb-2">
          <div className="flex items-center gap-2 text-sm text-white/90"><span>🐅</span> Tiger Reserves</div>
          <div className="flex items-center gap-2 text-sm text-white/90"><span>🌲</span> National Parks</div>
          <div className="flex items-center gap-2 text-sm text-white/90"><span>🦌</span> Sanctuaries</div>
          <div className="flex items-center gap-2 text-sm text-white/90"><span>🌿</span> Biosphere</div>
          <div className="flex items-center gap-2 text-sm text-white/90"><span>🐘</span> Elephant Reserves</div>
          <div className="flex items-center gap-2 text-sm text-white/90"><span>🌳</span> Forest Reserves</div>
          <div className="flex items-center gap-2 text-sm text-white/90"><span>💧</span> Ramsar Sites</div>
          <div className="flex items-center gap-2 text-sm text-white/90"><span>🔵</span> Tiger Corridors</div>
        </div>
        <div className="text-[11px] text-white/60 text-center">
          <span className="text-gold font-semibold">💡 Controls:</span> Click any reserve icon to open journal. Drag to rotate globe.
        </div>
      </div>

      {/* Mobile & Tablet Compact Horizontal Legend */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] p-3 bg-black/60 backdrop-blur-[20px] rounded-2xl border border-white/10 lg:hidden z-10 flex flex-col pointer-events-auto shadow-2xl">
        <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-2 mb-1 border-b border-white/10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/90"><span>🐅</span> Tiger Reserves</div>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/90"><span>🌲</span> National Parks</div>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/90"><span>🦌</span> Sanctuaries</div>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/90"><span>🌿</span> Biospheres</div>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/90"><span>🐘</span> Elephants</div>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/90"><span>🌳</span> Forests</div>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/90"><span>💧</span> Ramsar Sites</div>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/90"><span>🔵</span> Corridors</div>
        </div>
        <div className="text-[9px] text-white/50 text-center">
          Drag to rotate • Click pin for details
        </div>
      </div>
    </div>
  );
};

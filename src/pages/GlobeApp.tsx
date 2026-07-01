import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GlobeViewer } from '../components/GlobeViewer';
import type { GeoEntity } from '../components/GlobeViewer';
import { ControlsUI } from '../components/ControlsUI';
import { JournalUI } from '../components/JournalUI';
import { ErrorBoundary } from '../components/ErrorBoundary';
import forestsData from '../data/forestsData.json';
import { SplashScreen } from '../components/SplashScreen';
import { AnimatePresence } from 'framer-motion';
import { AmbientAudio } from '../components/AmbientAudio';
import { JoyTour } from '../components/JoyTour';

export default function GlobeApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<GeoEntity | null>(null);
  const [searchParams] = useSearchParams();
  
  // Ruler State
  const [rulerMode, setRulerMode] = useState(false);
  const [rulerPoints, setRulerPoints] = useState<{ lat: number, lng: number }[]>([]);

  // Globe & Camera State
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [flyTo, setFlyTo] = useState<{lat: number, lng: number} | null>(null);
  const [terrainExaggeration, setTerrainExaggeration] = useState<number>(1.4);
  const [resetNorthTrigger, setResetNorthTrigger] = useState<number>(0);

  // Forestry Data Layer Overlays
  const [activeLayer, setActiveLayer] = useState<'none' | 'champion' | 'watershed' | 'soil'>('none');
  const [hoverCoords, setHoverCoords] = useState<{ lat: number, lng: number, altMeters: number } | null>(null);
  const [globeMode, setGlobeMode] = useState<'standard' | 'timeline' | 'biogeo' | 'threats'>('standard');
  const [timelineYear, setTimelineYear] = useState<number>(2026);

  const [runTour, setRunTour] = useState(false);

  // Check for search query in URL on mount
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      const decodedSearch = decodeURIComponent(search).toLowerCase().trim();
      const match = forestsData.find(f => f.name.toLowerCase().includes(decodedSearch));
      if (match) {
        // Delay slightly to ensure Globe component is mounted before flying
        setTimeout(() => {
          handleSearchSelect(match as GeoEntity);
        }, 500);
      }
    }
  }, [searchParams]);

  const handleGlobeClick = (lat: number, lng: number) => {
    if (rulerMode) {
      setRulerPoints(prev => [...prev, { lat, lng }]);
    }
  };

  const handleEntityClick = (entity: GeoEntity) => {
    setSelectedEntity(entity);
    setFlyTo({ lat: entity.lat, lng: entity.lng });
  };

  const handleSearchSelect = (entity: GeoEntity) => {
    setFlyTo({ lat: entity.lat, lng: entity.lng });
    // Open the journal instantly upon searching
    setSelectedEntity(entity);
  };

  return (
    <>
      <JoyTour run={runTour} onFinish={() => setRunTour(false)} />
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <div className="relative w-full h-[100vh] bg-black overflow-hidden font-body">
      <div className="absolute inset-0 z-0">
        <ErrorBoundary>
          <GlobeViewer 
            onEntityClick={handleEntityClick} 
            onGlobeClick={handleGlobeClick}
            rulerPoints={rulerPoints}
            isAutoRotate={isAutoRotate}
            setIsAutoRotate={setIsAutoRotate}
            flyTo={flyTo}
            selectedEntity={selectedEntity}
            terrainExaggeration={terrainExaggeration}
            activeLayer={activeLayer}
            onHoverCoordsChange={setHoverCoords}
            resetNorthTrigger={resetNorthTrigger}
            globeMode={globeMode}
            timelineYear={timelineYear}
          />
        </ErrorBoundary>
      </div>
      
      <div className="absolute inset-0 pointer-events-none z-10">
        <ControlsUI 
          rulerMode={rulerMode}
          setRulerMode={(val) => {
            setRulerMode(val);
            if (!val) setRulerPoints([]); 
          }}
          rulerPoints={rulerPoints}
          setRulerPoints={setRulerPoints}
          isAutoRotate={isAutoRotate}
          setIsAutoRotate={setIsAutoRotate}
          onSearchSelect={handleSearchSelect}
          onOpenHelp={() => setRunTour(true)}
          terrainExaggeration={terrainExaggeration}
          setTerrainExaggeration={setTerrainExaggeration}
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
          hoverCoords={hoverCoords}
          onResetNorth={() => setResetNorthTrigger(n => n + 1)}
          globeMode={globeMode}
          setGlobeMode={setGlobeMode}
          timelineYear={timelineYear}
          setTimelineYear={setTimelineYear}
        />
      </div>

      <JournalUI 
        entity={selectedEntity} 
        onClose={() => setSelectedEntity(null)} 
      />
      
      <AmbientAudio />
      </div>
    </>
  );
}

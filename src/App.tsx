import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import { GlobeViewer } from './components/GlobeViewer';
import type { GeoEntity } from './components/GlobeViewer';
import { ControlsUI } from './components/ControlsUI';
import { JournalUI } from './components/JournalUI';
import { Footer } from './components/Footer';

const GlobeApp = () => {
  const [selectedEntity, setSelectedEntity] = useState<GeoEntity | null>(null);
  
  // Ruler State
  const [rulerMode, setRulerMode] = useState(false);
  const [rulerPoints, setRulerPoints] = useState<{ lat: number, lng: number }[]>([]);

  // Globe State
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [flyTo, setFlyTo] = useState<{lat: number, lng: number} | null>(null);

  const handleGlobeClick = (lat: number, lng: number) => {
    if (rulerMode) {
      setRulerPoints(prev => {
        if (prev.length === 2 || prev.length === 0) {
          return [{ lat, lng }];
        }
        return [...prev, { lat, lng }];
      });
    }
  };

  const handleEntityClick = (entity: GeoEntity) => {
    setSelectedEntity(entity);
  };

  const handleSearchSelect = (entity: GeoEntity) => {
    setFlyTo({ lat: entity.lat, lng: entity.lng });
    // Open the journal instantly upon searching
    setSelectedEntity(entity);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-ink">
      <GlobeViewer 
        onEntityClick={handleEntityClick} 
        onGlobeClick={handleGlobeClick}
        rulerPoints={rulerPoints}
        isAutoRotate={isAutoRotate}
        flyTo={flyTo}
      />
      
      <div className="pt-24 pointer-events-none">
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
        />
      </div>

      <JournalUI 
        entity={selectedEntity} 
        onClose={() => setSelectedEntity(null)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-ink font-body text-fog">
      <Navbar />
      <div className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/globe" element={<GlobeApp />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

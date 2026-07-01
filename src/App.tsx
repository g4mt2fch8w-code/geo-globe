import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import { Terms } from './components/Terms';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';

// Lazy loaded modules to ensure the homepage opens instantly
const GlobeApp = React.lazy(() => import('./pages/GlobeApp'));
const AnalyticalHub = React.lazy(() => import('./pages/dashboards/AnalyticalHub').then(m => ({ default: m.AnalyticalHub })));
const SyllabusCompare = React.lazy(() => import('./pages/dashboards/SyllabusCompare').then(m => ({ default: m.SyllabusCompare })));
const EcoCorridorsWorkspace = React.lazy(() => import('./pages/dashboards/EcoCorridorsWorkspace').then(m => ({ default: m.EcoCorridorsWorkspace })));
const TerrainCrossSection = React.lazy(() => import('./pages/dashboards/TerrainCrossSection').then(m => ({ default: m.TerrainCrossSection })));

const LoadingScreen = () => (
  <div className="h-screen w-full bg-ink flex flex-col items-center justify-center text-[#34d399] gap-4">
    <div className="w-10 h-10 border-4 border-[#34d399]/20 border-t-[#34d399] rounded-full animate-spin"></div>
    <div className="text-sm font-mono tracking-widest uppercase animate-pulse">Initializing Module...</div>
  </div>
);

export default function App() {
  const location = useLocation();
  const isGlobePage = location.pathname === '/globe';

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-ink text-fog overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/globe" element={<GlobeApp />} />
              <Route path="/dashboards" element={<AnalyticalHub />} />
              <Route path="/dashboard/syllabus-compare" element={<SyllabusCompare />} />
              <Route path="/dashboard/eco-corridors" element={<EcoCorridorsWorkspace />} />
              <Route path="/dashboard/elevation-profile" element={<TerrainCrossSection />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </Suspense>
        </main>
        {!isGlobePage && <Footer />}
      </div>
    </ThemeProvider>
  );
}

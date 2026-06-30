import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, MapPin, AlertTriangle, Route } from 'lucide-react';

export const EcoCorridorsWorkspace = () => {
  const [showCorridors, setShowCorridors] = useState(true);
  const [showBorders, setShowBorders] = useState(false);
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>('kanha-pench');

  const corridors = [
    {
      id: 'kanha-pench',
      name: '1. Kanha - Pench Vital Tiger Corridor',
      states: 'Madhya Pradesh & Maharashtra',
      lengthKm: 160,
      areaSqKm: 2450,
      status: 'High Priority (NTCA Tier 1)',
      bottlenecks: 'National Highway 44 widening & railway fragmentation near Kurai pass.',
      eszRadiusKm: '10 km statutory buffer around core tiger habitats notified by MoEFCC.',
      hwcIncidents: 'High livestock depredation reported in 34 fringe villages along corridor edge.',
      managementAction: 'Construction of 14 dedicated underpasses and acoustic barriers completed with NHAI.',
      color: '#10b981',
      coords: '22.10°N, 80.12°E → 21.65°N, 79.35°E'
    },
    {
      id: 'kaziranga-karbi',
      name: '2. Kaziranga - Karbi Anglong Elephant & Rhino Corridor',
      states: 'Assam',
      lengthKm: 45,
      areaSqKm: 820,
      status: 'Critical Flood Refuge (NTCA / Project Elephant)',
      bottlenecks: 'National Highway 37 bisects monsoon migration paths to Karbi hills.',
      eszRadiusKm: 'Eco-Sensitive Zone strictly notified around 4 designated animal corridors.',
      hwcIncidents: 'Speeding vehicles causing rhino/elephant mortality during annual Brahmaputra floods.',
      managementAction: 'Enforcement of automated radar speed traps (max 40 km/h) and elevated flyovers sanctioned.',
      color: '#38bdf8',
      coords: '26.58°N, 93.15°E → 26.35°N, 93.45°E'
    },
    {
      id: 'nilgiri-silent',
      name: '3. Nilgiri - Silent Valley - Wayanad Mega Corridor',
      states: 'Tamil Nadu, Kerala & Karnataka (Tri-Junction)',
      lengthKm: 120,
      areaSqKm: 3100,
      status: 'Global Biodiversity Hotspot Core',
      bottlenecks: 'Commercial tea/coffee plantations and interstate border fencing.',
      eszRadiusKm: 'Varies from 2.5 km to 10 km under Western Ghats Ecology Expert Panel guidelines.',
      hwcIncidents: 'Elephant herd incursions into human settlements in Gudalur and Sultan Bathery.',
      managementAction: 'Voluntary relocation of private estates and deployment of AI early-warning acoustic sensors.',
      color: '#f97316',
      coords: '11.50°N, 76.50°E → 11.10°N, 76.42°E'
    },
    {
      id: 'rajaji-corbett',
      name: '4. Rajaji - Jim Corbett Terai Arc Corridor',
      states: 'Uttarakhand',
      lengthKm: 85,
      areaSqKm: 1420,
      status: 'Terai Arc Priority (NTCA)',
      bottlenecks: 'Gola River boulder mining corridors and Rishikesh-Haridwar urban sprawl.',
      eszRadiusKm: '5 km buffer notified around Shivalik elephant reserve boundaries.',
      hwcIncidents: 'Human fatalities during sugar-cane harvesting season due to ambush concealment.',
      managementAction: 'Anti-poaching drone patrols and seasonal restriction on sand mining permits.',
      color: '#a855f7',
      coords: '30.05°N, 78.18°E → 29.53°N, 78.77°E'
    },
    {
      id: 'kanha-achanakmar',
      name: '5. Kanha - Achanakmar Landscape Link',
      states: 'Madhya Pradesh & Chhattisgarh',
      lengthKm: 140,
      areaSqKm: 1850,
      status: 'Maikal Range Connectivity (NTCA Tier 1)',
      bottlenecks: 'Mining leases and state highway traffic through Chilpi valley.',
      eszRadiusKm: '10 km statutory buffer covering Maikal hill crest forests.',
      hwcIncidents: 'Seasonal tiger dispersal incidents in agrarian revenue villages.',
      managementAction: 'Joint interstate e-patrolling teams and habitat enrichment waterholes.',
      color: '#10b981',
      coords: '22.33°N, 80.61°E → 22.54°N, 81.76°E'
    },
    {
      id: 'pench-satpura',
      name: '6. Pench - Satpura Forest Corridor',
      states: 'Madhya Pradesh & Maharashtra',
      lengthKm: 130,
      areaSqKm: 1980,
      status: 'Satpura-Maikal Landscape Priority',
      bottlenecks: 'Chhindwara-Betul highway corridors and coal mining encroachments.',
      eszRadiusKm: '10 km ESZ covering Satpura Tiger Reserve corridor buffer.',
      hwcIncidents: 'Leopard and bear encounters along forest village edges.',
      managementAction: 'Solar fencing subsidies and e-surveillance towers deployed.',
      color: '#10b981',
      coords: '21.67°N, 79.31°E → 22.46°N, 78.43°E'
    },
    {
      id: 'bandhavgarh-sanjay',
      name: '7. Bandhavgarh - Sanjay Dubri Corridor',
      states: 'Madhya Pradesh & Chhattisgarh',
      lengthKm: 95,
      areaSqKm: 1320,
      status: 'Central Indian Recovery Corridor',
      bottlenecks: 'Railway siding expansion and illegal teak felling.',
      eszRadiusKm: '5 km statutory buffer around Sanjay Dubri Tiger Reserve.',
      hwcIncidents: 'High crop raiding by elephant herds dispersing from Chhattisgarh.',
      managementAction: 'Elephant response units (ERU) and compensation settlement within 48 hours.',
      color: '#34d399',
      coords: '23.72°N, 81.02°E → 24.06°N, 81.88°E'
    },
    {
      id: 'tadoba-pench',
      name: '8. Tadoba - Pench Southern Landscape Corridor',
      states: 'Maharashtra & Madhya Pradesh',
      lengthKm: 145,
      areaSqKm: 2100,
      status: 'Vidarbha Tiger Dispersal Highway',
      bottlenecks: 'Chandrapur industrial coalbelt and canal crossings.',
      eszRadiusKm: '10 km statutory buffer notified by MoEFCC.',
      hwcIncidents: 'Frequent tiger transit sightings near coal mine buffers.',
      managementAction: 'Installation of chain-link barriers and wildlife transit ramps along irrigation canals.',
      color: '#f59e0b',
      coords: '20.21°N, 79.39°E → 21.67°N, 79.31°E'
    },
    {
      id: 'tadoba-nagzira',
      name: '9. Tadoba - Navegaon Nagzira Corridor',
      states: 'Maharashtra (Eastern Vidarbha)',
      lengthKm: 90,
      areaSqKm: 1150,
      status: 'High Density Dispersal Zone',
      bottlenecks: 'Gondia-Balaghat railway line and state highway traffic.',
      eszRadiusKm: '8 km statutory buffer connecting forest patches.',
      hwcIncidents: 'Cattle kills in Bramhapuri forest division.',
      managementAction: 'Primary community conservation reserves notified under WPA 1972.',
      color: '#f59e0b',
      coords: '20.21°N, 79.39°E → 21.25°N, 80.03°E'
    },
    {
      id: 'similipal-satkosia',
      name: '10. Similipal - Satkosia Mahanadi Corridor',
      states: 'Odisha',
      lengthKm: 175,
      areaSqKm: 2600,
      status: 'Eastern Ghats Keystone Link',
      bottlenecks: 'Mahanadi river gorge settlements and timber smuggling routes.',
      eszRadiusKm: '10 km buffer across Chhotanagpur-Eastern Ghats link.',
      hwcIncidents: 'Elephant herd fragmentation causing crop damage.',
      managementAction: 'Community eco-development committees (EDC) empowered for anti-poaching.',
      color: '#06b6d4',
      coords: '21.93°N, 86.33°E → 20.58°N, 84.83°E'
    },
    {
      id: 'ranthambore-kuno',
      name: '11. Ranthambore - Kuno - Madhav Complex',
      states: 'Rajasthan & Madhya Pradesh',
      lengthKm: 110,
      areaSqKm: 1650,
      status: 'Tiger & Cheetah Landscape Link',
      bottlenecks: 'Chambal river ravines and un-gated rural roads.',
      eszRadiusKm: '10 km buffer connecting Kuno National Park.',
      hwcIncidents: 'Predator straying into goat/sheep grazing lands.',
      managementAction: 'Corridor monitoring with GPS radio-collars and village pasture enrichment.',
      color: '#ec4899',
      coords: '26.01°N, 76.50°E → 25.50°N, 77.26°E'
    },
    {
      id: 'dudhwa-pilibhit',
      name: '12. Dudhwa - Pilibhit - Kishanpur Terai Link',
      states: 'Uttar Pradesh (Indo-Nepal Border)',
      lengthKm: 65,
      areaSqKm: 980,
      status: 'Terai Arc Priority Link',
      bottlenecks: 'Sharda river barrage and intensive sugarcane farming.',
      eszRadiusKm: '5 km buffer along Pilibhit Tiger Reserve boundary.',
      hwcIncidents: 'Tigers resting in tall cane fields mistaken by farmers.',
      managementAction: 'Bagh Mitra community response teams and thermal drone scanning before harvest.',
      color: '#8b5cf6',
      coords: '28.49°N, 80.65°E → 28.64°N, 79.95°E'
    },
    {
      id: 'valmiki-chitwan',
      name: '13. Valmiki - Chitwan Transboundary Corridor',
      states: 'Bihar (India) & Nepal',
      lengthKm: 40,
      areaSqKm: 750,
      status: 'International Transboundary Link (NTCA)',
      bottlenecks: 'Gandak river flooding and cross-border poaching threats.',
      eszRadiusKm: '10 km international boundary buffer.',
      hwcIncidents: 'Rhino and rhino calf stranding during monsoons.',
      managementAction: 'Joint annual transboundary coordination meetings between MoEFCC and Nepal.',
      color: '#8b5cf6',
      coords: '27.31°N, 84.14°E → 27.53°N, 84.45°E'
    },
    {
      id: 'parambikulam-anamalai',
      name: '14. Parambikulam - Anamalai - Eravikulam Link',
      states: 'Kerala & Tamil Nadu',
      lengthKm: 75,
      areaSqKm: 1450,
      status: 'Southern Western Ghats Shola Link',
      bottlenecks: 'High altitude hill roads and cardamom estates.',
      eszRadiusKm: '10 km ESZ around Anamalai Tiger Reserve.',
      hwcIncidents: 'Nilgiri Tahr and elephant roadkill warnings.',
      managementAction: 'Strict night traffic bans (9 PM to 6 AM) on forest checkposts.',
      color: '#f97316',
      coords: '10.43°N, 77.01°E → 10.20°N, 77.06°E'
    },
    {
      id: 'sahyadri-radhanagari',
      name: '15. Sahyadri - Radhanagari Crest Corridor',
      states: 'Maharashtra & Goa',
      lengthKm: 85,
      areaSqKm: 1100,
      status: 'Northern Western Ghats Crest Link',
      bottlenecks: 'Windmill farms and bauxite mining leases on plateau tops.',
      eszRadiusKm: '5 km statutory buffer around Koyna and Chandoli.',
      hwcIncidents: 'Bison (Gaur) crop depredation in foothills.',
      managementAction: 'Mining lease cancellations and restoration of native semi-evergreen canopy.',
      color: '#f97316',
      coords: '17.38°N, 73.74°E → 16.42°N, 73.98°E'
    },
    {
      id: 'manas-buxa',
      name: '16. Manas - Buxa - Jaldapara Terai Duars Link',
      states: 'Assam & West Bengal',
      lengthKm: 135,
      areaSqKm: 1900,
      status: 'Eastern Duars Elephant Corridor',
      bottlenecks: 'Alipurduar railway tracks causing frequent elephant accidents.',
      eszRadiusKm: '8 km buffer connecting Buxa Tiger Reserve.',
      hwcIncidents: 'Elephant mortality due to train collisions.',
      managementAction: 'Honey-bee sound repellents at rail crossings and train speed governors.',
      color: '#38bdf8',
      coords: '26.71°N, 90.93°E → 26.60°N, 89.58°E'
    },
    {
      id: 'pakke-nameri',
      name: '17. Pakke - Nameri - Sonai Rupai Foothill Link',
      states: 'Arunachal Pradesh & Assam',
      lengthKm: 60,
      areaSqKm: 890,
      status: 'Eastern Himalaya Biodiversity Link',
      bottlenecks: 'Kameng river bank erosion and border village expansion.',
      eszRadiusKm: '10 km statutory buffer covering hornbill nesting forests.',
      hwcIncidents: 'Elephant herd transit conflict in Sonitpur district.',
      managementAction: 'Community Hornbill Nest Adoption Program and solar street lighting.',
      color: '#38bdf8',
      coords: '27.03°N, 92.86°E → 26.93°N, 92.78°E'
    },
    {
      id: 'nagarjunasagar-amrabad',
      name: '18. Nagarjunasagar - Amrabad - Sri Venkateswara Link',
      states: 'Andhra Pradesh & Telangana',
      lengthKm: 190,
      areaSqKm: 3400,
      status: 'Eastern Ghats Nallamala Mega Corridor',
      bottlenecks: 'Srisailam highway ghat section speeding.',
      eszRadiusKm: '10 km ESZ around Amrabad Tiger Reserve.',
      hwcIncidents: 'Sloth bear and tiger transit encounters near religious pilgrimage routes.',
      managementAction: 'Plastic-free eco-checkposts and speed breakers across Nallamala forests.',
      color: '#06b6d4',
      coords: '16.33°N, 78.86°E → 13.68°N, 79.35°E'
    },
    {
      id: 'umred-tadoba',
      name: '19. Umred Karhandla - Tadoba Link',
      states: 'Maharashtra',
      lengthKm: 65,
      areaSqKm: 1400,
      status: 'Central Indian Landscape Mega Corridor',
      bottlenecks: 'Chandrapur highway and coal mining expansion blocks.',
      eszRadiusKm: '10 km ESZ around Umred Karhandla.',
      hwcIncidents: 'Tiger transit encounters in Bramhapuri division.',
      managementAction: 'Underpasses and eco-bridges on highways and restricted mining allocations.',
      color: '#38bdf8',
      coords: '20.82°N, 79.31°E → 20.21°N, 79.39°E'
    },
    {
      id: 'gadchiroli-indravati',
      name: '20. Brahmapuri - Gadchiroli - Indravati Connective Tract',
      states: 'Maharashtra & Chhattisgarh',
      lengthKm: 150,
      areaSqKm: 4200,
      status: 'High Density Tiger Sink',
      bottlenecks: 'Pranahita river fragmentation and state highway 9.',
      eszRadiusKm: 'Varies around Chaprala and Pranahita WLS.',
      hwcIncidents: 'Frequent tiger-cattle conflicts in human-dominated landscapes.',
      managementAction: 'Community-led conservation and rapid response teams for conflict mitigation.',
      color: '#f97316',
      coords: '19.50°N, 80.00°E → 18.95°N, 80.35°E'
    }
  ];

  const selected = corridors.find(c => c.id === selectedCorridorId) || corridors[0];

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
        <div className="text-xs font-mono text-[#059669] dark:text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/30 px-3 py-1 rounded-full font-bold">
          2D VECTOR WORKSPACE • 20 OFFICIAL NTCA CORRIDORS
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-fog flex items-center gap-3 mb-2">
          <Route className="w-8 h-8 text-[#059669] dark:text-[#34d399]" />
          <span>Forestry Administration & Eco-Corridor Workspace</span>
        </h1>
        <p className="text-sm text-fog/80 max-w-3xl font-medium">
          Examine all 20 official NTCA wildlife dispersal corridors connecting protected area sources across India, human-wildlife conflict zones, linear infrastructure bottlenecks, and administrative interstate boundaries.
        </p>
      </div>

      {/* Interactive Layer Toggles */}
      <div className="glass-card bg-[#08221a]/80 dark:bg-[#08221a]/90 border border-[#34d399]/40 p-5 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#34d399]">
          <Layers className="w-4 h-4" />
          <span>Vector Overlays Controls:</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowCorridors(!showCorridors)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              showCorridors ? 'bg-[#38bdf8] text-[#04120e] border-[#7dd3fc]' : 'bg-ink/10 dark:bg-black/50 text-fog/70 border-ink/10 dark:border-white/10'
            }`}
          >
            <span>🔵 All 20 NTCA Tiger Corridors</span>
            {showCorridors && <span>✓</span>}
          </button>

          <button
            onClick={() => setShowBorders(!showBorders)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              showBorders ? 'bg-[#f97316] text-[#04120e] border-[#fdba74]' : 'bg-ink/10 dark:bg-black/50 text-fog/70 border-ink/10 dark:border-white/10'
            }`}
          >
            <span>🟠 Interstate Border Overlaps</span>
            {showBorders && <span>✓</span>}
          </button>
        </div>
      </div>

      {/* Main Grid: Selector List vs Detailed Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left List */}
        <div className="space-y-3 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-fog/80 dark:text-white/80 px-1 sticky top-0 bg-ink py-2 z-10">
            Select Vital Corridor Transect ({corridors.length} Total)
          </div>
          {corridors.map(c => (
            <div
              key={c.id}
              onClick={() => setSelectedCorridorId(c.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedCorridorId === c.id
                  ? 'bg-[#08221a] text-white border-[#34d399] shadow-[0_0_20px_rgba(52,211,153,0.25)]'
                  : 'glass-card hover:bg-ink/10 dark:hover:bg-white/10 border-ink/10 dark:border-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-ink/10 dark:bg-black/40 text-fog dark:text-white/80 border border-ink/10 dark:border-white/10">
                  {c.lengthKm} km • {c.areaSqKm} sq km
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded text-[#059669] dark:text-[#34d399] bg-[#34d399]/15">
                  NTCA Tier
                </span>
              </div>
              <h3 className={`text-sm font-bold mb-1 ${selectedCorridorId === c.id ? 'text-white' : 'text-fog'}`}>{c.name}</h3>
              <p className={`text-[11px] font-mono ${selectedCorridorId === c.id ? 'text-[#34d399]' : 'text-fog/70'}`}>{c.states}</p>
            </div>
          ))}
        </div>

        {/* Right Inspection Workspace */}
        <div className="lg:col-span-2 glass-card bg-ink/5 dark:bg-black/60 border border-ink/20 dark:border-[#34d399]/30 p-8 rounded-3xl space-y-6">
          <div className="border-b border-ink/10 dark:border-white/10 pb-5">
            <div className="text-xs font-mono text-[#059669] dark:text-[#34d399] uppercase font-bold mb-1">
              Transect Vector Coordinates: {selected.coords} • Source: Official NTCA Report
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-fog">{selected.name}</h2>
            <p className="text-sm text-fog/80 mt-1 font-medium">Jurisdiction: {selected.states}</p>
          </div>

          {/* Status Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {showCorridors && (
              <div className="bg-[#0284c7]/15 dark:bg-[#38bdf8]/10 border border-[#0284c7]/40 dark:border-[#38bdf8]/30 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0284c7] dark:text-[#38bdf8] uppercase font-mono mb-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Linear Infrastructure Bottlenecks</span>
                </div>
                <p className="text-xs text-fog dark:text-white/90 leading-relaxed font-medium">{selected.bottlenecks}</p>
              </div>
            )}
          </div>

          {/* Conflict & Management */}
          <div className="space-y-4">
            <div className="bg-[#ef4444]/15 dark:bg-[#ef4444]/10 border border-[#ef4444]/40 p-5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#dc2626] dark:text-[#ef4444] uppercase font-mono mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Human-Wildlife Conflict (HWC) Incidents</span>
              </div>
              <p className="text-xs text-fog dark:text-white/90 leading-relaxed font-medium">{selected.hwcIncidents}</p>
            </div>

            <div className="bg-ink/5 dark:bg-white/5 border border-ink/10 dark:border-white/10 p-5 rounded-2xl">
              <div className="text-xs font-bold text-[#d97706] dark:text-[#fbbf24] uppercase font-mono mb-2">
                🏛️ Forest Department Management Action Plan
              </div>
              <p className="text-xs text-fog/90 dark:text-white/80 leading-relaxed font-medium">{selected.managementAction}</p>
            </div>
          </div>

          {showBorders && (
            <div className="p-4 rounded-xl bg-[#f97316]/15 dark:bg-[#f97316]/10 border border-[#f97316]/40 text-xs text-[#c2410c] dark:text-[#fdba74] font-medium">
              <strong>Interstate Border Governance Notice:</strong> This corridor intersects multiple state forest divisions requiring synchronized joint patrol protocols under NTCA guidelines.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

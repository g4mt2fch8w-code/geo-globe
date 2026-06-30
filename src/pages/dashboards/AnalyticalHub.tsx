import { Link } from 'react-router-dom';
import { BarChart3, ShieldAlert, Activity, Globe2, MapPin, Sparkles } from 'lucide-react';

export const AnalyticalHub = () => {
  const tools = [
    {
      id: 'syllabus-compare',
      title: '1. Cross-Reference Syllabus Dashboard',
      category: 'Standalone Analytics Page',
      desc: 'Side-by-side comparison matrix of two reserves analyzing Champion & Seth forest types, indicator species, altitude brackets, and rainfall charts.',
      path: '/dashboard/syllabus-compare',
      icon: <BarChart3 className="w-6 h-6 text-[#fbbf24]" />,
      badge: 'Core Syllabus',
      isStandalone: true,
      accent: 'from-[#fbbf24]/20 to-[#d97706]/10 border-[#fbbf24]/40 text-[#fbbf24]'
    },
    {
      id: 'eco-corridors',
      title: '2. Forestry Management & Eco-Corridors',
      category: 'Standalone 2D Workspace',
      desc: 'Vector administrative workspace mapping all 18 official NTCA vital corridors, linear infrastructure bottlenecks, human-wildlife conflict zones, and state border overlaps.',
      path: '/dashboard/eco-corridors',
      icon: <MapPin className="w-6 h-6 text-[#34d399]" />,
      badge: 'Management & HWC',
      isStandalone: true,
      accent: 'from-[#10b981]/20 to-[#059669]/10 border-[#34d399]/40 text-[#34d399]'
    },
    {
      id: 'timeline',
      title: '3. Conservation Chronology Timeline (1972-2026)',
      category: 'Interactive Globe Mode',
      desc: 'Track the 50-year geographical expansion of Project Tiger and protected area notifications dynamically over our North-headed interactive globe.',
      path: '/globe',
      icon: <Activity className="w-6 h-6 text-[#38bdf8]" />,
      badge: 'Historical Chronology',
      isStandalone: false,
      accent: 'from-[#38bdf8]/20 to-[#0284c7]/10 border-[#38bdf8]/40 text-[#38bdf8]'
    },

    {
      id: 'terrain-profile',
      title: '4. 2D Terrain Cross-Section Generator',
      category: 'Standalone Analytics Page',
      desc: 'Interactive polyline transect tool across Western Ghats, Vindhyas, and Himalayas generating elevation profile area charts with distance/altitude tooltips.',
      path: '/dashboard/elevation-profile',
      icon: <Sparkles className="w-6 h-6 text-[#a855f7]" />,
      badge: 'Topographic Transect',
      isStandalone: true,
      accent: 'from-[#a855f7]/20 to-[#7e22ce]/10 border-[#a855f7]/40 text-[#c084fc]'
    },
    {
      id: 'biogeo-zones',
      title: '5. Biogeographic Zones of India (10 Zones)',
      category: 'Interactive Globe Mode',
      desc: 'Explore Rodgers & Panwar’s 10 biogeographical realms with interactive color-coded rings, % area breakdown, and flagship endemic fauna cards.',
      path: '/globe',
      icon: <Globe2 className="w-6 h-6 text-[#06b6d4]" />,
      badge: 'Rodgers & Panwar',
      isStandalone: false,
      accent: 'from-[#06b6d4]/20 to-[#0e7490]/10 border-[#06b6d4]/40 text-[#22d3ee]'
    },
    {
      id: 'threat-matrix',
      title: '6. Invasive Species & Threat Matrix',
      category: 'Interactive Globe Mode',
      desc: 'Habitat degradation heatmaps (Lantana camara, Prosopis juliflora) combined with linear railway/highway infrastructure fragmenting elephant corridors.',
      path: '/globe',
      icon: <ShieldAlert className="w-6 h-6 text-[#f97316]" />,
      badge: 'Habitat Degradation',
      isStandalone: false,
      accent: 'from-[#f97316]/20 to-[#c2410c]/10 border-[#f97316]/40 text-[#fb923c]'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-ink text-slate-900 dark:text-fog pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-[#10b981]/10 border border-emerald-300 dark:border-[#34d399]/30 text-emerald-700 dark:text-[#34d399] text-xs font-mono font-bold tracking-wider mb-4">
          <Sparkles className="w-4 h-4" />
          <span>RESEARCHER ANALYTICAL SUITE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-fog tracking-tight mb-4">
          Forest Services Analytical Hub
        </h1>
        <p className="text-slate-600 dark:text-fog/80 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Explore all 6 advanced forest management, pedagogical syllabus tools, and interactive spatial overlays. Standalone tools operate at lightning speed devoid of heavy 3D rendering, while spatial modes integrate seamlessly into our North-headed globe.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`flex flex-col justify-between glass-card bg-gradient-to-br ${tool.accent} border p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-ink/5 dark:bg-black/40 border border-ink/10 dark:border-white/10">
                  {tool.icon}
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-fog uppercase tracking-wider">
                  {tool.badge}
                </span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1 text-slate-700 dark:text-fog">
                {tool.category}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-fog leading-snug mb-2">
                {tool.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-fog/80 leading-relaxed mb-6 font-medium">
                {tool.desc}
              </p>
            </div>

            <Link
              to={tool.path}
              className="w-full py-3 px-4 rounded-xl bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-fog text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{tool.isStandalone ? 'Launch Standalone Tool' : 'Open in Globe Mode'}</span>
              <span>→</span>
            </Link>
          </div>
        ))}
      </div>

      {/* NTCA Authentic Data Analytics Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-[#fbbf24]" />
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-fog">NTCA Status of Tigers 2022 Data</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tiger Population by State */}
          <div className="glass-card bg-white/80 dark:bg-[#08221a]/80 border border-emerald-300 dark:border-[#34d399]/40 p-6 rounded-3xl shadow-xl">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-wider font-mono">Top Tiger States (2022 Census)</h3>
            <div className="space-y-4">
              {[
                { state: "Madhya Pradesh", pop: 785, percent: 100 },
                { state: "Karnataka", pop: 563, percent: 71.7 },
                { state: "Uttarakhand", pop: 560, percent: 71.3 },
                { state: "Maharashtra", pop: 444, percent: 56.5 },
                { state: "Tamil Nadu", pop: 306, percent: 38.9 }
              ].map((item) => (
                <div key={item.state} className="relative">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-[#a7f3d0] mb-1">
                    <span>{item.state}</span>
                    <span>{item.pop}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full" 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-white/50 mt-4 text-right">Source: NTCA 2022 Tiger Census Report</div>
          </div>


        </div>
      </div>

      {/* Official Credits Footer Banner */}
      <div className="glass-card bg-slate-800 dark:bg-[#08221a]/90 border border-slate-700 dark:border-[#34d399]/30 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🏛️ Official Data & Research Citations</span>
          </h4>
          <p className="text-xs text-white/80 mt-1">
            Forest Survey of India (FSI) Van Agni Alert System (Removed) • Champion & Seth (1968) Forest Typology • Rodgers & Panwar (1988) Biogeographic Classification • Wildlife (Protection) Act, 1972 & NTCA Protocols.
          </p>
        </div>
        <div className="text-[11px] font-mono text-[#34d399] bg-black/40 px-4 py-2 rounded-xl border border-[#34d399]/30 whitespace-nowrap">
          MoEFCC Compliant Analytics
        </div>
      </div>
    </div>
  );
};

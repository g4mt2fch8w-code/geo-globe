import { useState } from 'react';
import { Link } from 'react-router-dom';
import { syllabusReserves } from '../../data/syllabusReservesData';
import { ArrowLeft, GitCompare, Droplets, Trees, Mountain, ShieldCheck } from 'lucide-react';

export const SyllabusCompare = () => {
  const reserves = syllabusReserves;
  const [resAId, setResAId] = useState<string>(reserves[0]?.id || 'corbett');
  const [resBId, setResBId] = useState<string>(reserves[1]?.id || 'bandipur');

  const resA = reserves.find(r => r.id === resAId) || reserves[0];
  const resB = reserves.find(r => r.id === resBId) || reserves[1];

  const rainA = typeof resA.rainfall === 'number' ? resA.rainfall : 1500;
  const rainB = typeof resB.rainfall === 'number' ? resB.rainfall : 1200;
  const maxRain = Math.max(rainA, rainB, 3500);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-ink text-slate-900 dark:text-fog pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/dashboards"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-ink/10 hover:bg-slate-300 dark:hover:bg-ink/20 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-fog transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Analytical Hub</span>
        </Link>
        <div className="text-xs font-mono text-[#fbbf24] bg-[#fbbf24]/10 border border-[#fbbf24]/30 px-3 py-1 rounded-full font-bold">
          STANDALONE MODULE • FAST 2D MATRIX
        </div>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-fog flex items-center gap-3 mb-2">
          <GitCompare className="w-8 h-8 text-[#fbbf24]" />
          <span>Cross-Reference Analytical Matrix</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-fog/80 max-w-2xl font-medium">
          Compare two protected areas side-by-side across Champion & Seth forest classifications, official NTCA/MoEFCC notification year, indicator floral/faunal species, altitude brackets, and annual precipitation levels.
        </p>
      </div>

      {/* Dropdown Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="glass-card bg-white/80 dark:bg-[#08221a]/80 border border-[#34d399]/40 p-5 rounded-2xl shadow-xl">
          <label className="block text-xs font-mono font-bold uppercase text-[#059669] dark:text-[#34d399] tracking-wider mb-2">
            Select Reserve A (Primary)
          </label>
          <select
            value={resAId}
            onChange={(e) => setResAId(e.target.value)}
            className="w-full bg-slate-50 dark:bg-black/60 border border-[#34d399]/40 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#34d399]"
          >
            {reserves.map(r => (
              <option key={r.id} value={r.id} className="bg-white dark:bg-[#08221a] text-slate-900 dark:text-white">
                {r.name} ({r.state}) - {r.type}
              </option>
            ))}
          </select>
        </div>

        <div className="glass-card bg-white/80 dark:bg-[#1e1b4b]/80 border border-[#818cf8]/40 p-5 rounded-2xl shadow-xl">
          <label className="block text-xs font-mono font-bold uppercase text-[#4f46e5] dark:text-[#818cf8] tracking-wider mb-2">
            Select Reserve B (Comparison)
          </label>
          <select
            value={resBId}
            onChange={(e) => setResBId(e.target.value)}
            className="w-full bg-slate-50 dark:bg-black/60 border border-[#818cf8]/40 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#818cf8]"
          >
            {reserves.map(r => (
              <option key={r.id} value={r.id} className="bg-white dark:bg-[#1e1b4b] text-slate-900 dark:text-white">
                {r.name} ({r.state}) - {r.type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Card A */}
        <div className="glass-card bg-[#08221a]/90 dark:bg-[#08221a]/60 border border-[#34d399]/40 p-6 rounded-3xl space-y-6 text-slate-900 dark:text-white">
          <div className="border-b border-[#34d399]/20 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/30">
                {resA.type || 'Tiger Reserve'}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#34d399] bg-black/5 dark:bg-black/40 px-2.5 py-1 rounded-md border border-[#34d399]/30">
                Official NTCA Year: {resA.established}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{resA.name}</h2>
            <p className="text-xs text-[#059669] dark:text-[#34d399] font-mono mt-0.5">State: {resA.state} • Source: NTCA / MoEFCC Official Gazette</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-black/5 dark:bg-black/40 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
              <div className="text-slate-600 dark:text-white/80 font-mono uppercase mb-1 flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-[#34d399]" />
                <span>Champion & Seth Forest Type</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{resA.forestType}</div>
            </div>

            <div className="bg-black/5 dark:bg-black/40 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
              <div className="text-slate-600 dark:text-white/80 font-mono uppercase mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#34d399]" />
                <span>Indicator Floral & Faunal Species</span>
              </div>
              <div className="text-sm font-semibold text-[#059669] dark:text-[#a7f3d0]">
                {resA.keySpecies.join(', ')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/5 dark:bg-black/40 p-3 rounded-2xl border border-slate-200 dark:border-white/10">
                <div className="text-slate-600 dark:text-white/80 font-mono uppercase mb-1 flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5 text-[#34d399]" />
                  <span>Altitude Bracket</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{resA.altitude}</div>
              </div>

              <div className="bg-black/5 dark:bg-black/40 p-3 rounded-2xl border border-slate-200 dark:border-white/10">
                <div className="text-slate-600 dark:text-white/80 font-mono uppercase mb-1 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#34d399]" />
                  <span>Rainfall (Annual)</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{resA.rainfall} mm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card B */}
        <div className="glass-card bg-[#1e1b4b]/90 dark:bg-[#1e1b4b]/60 border border-[#818cf8]/40 p-6 rounded-3xl space-y-6 text-slate-900 dark:text-white">
          <div className="border-b border-[#818cf8]/20 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#818cf8]/20 text-[#818cf8] border border-[#818cf8]/30">
                {resB.type || 'Tiger Reserve'}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#818cf8] bg-black/5 dark:bg-black/40 px-2.5 py-1 rounded-md border border-[#818cf8]/30">
                Official NTCA Year: {resB.established}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{resB.name}</h2>
            <p className="text-xs text-[#4f46e5] dark:text-[#818cf8] font-mono mt-0.5">State: {resB.state} • Source: NTCA / MoEFCC Official Gazette</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-black/5 dark:bg-black/40 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
              <div className="text-slate-600 dark:text-white/80 font-mono uppercase mb-1 flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-[#818cf8]" />
                <span>Champion & Seth Forest Type</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{resB.forestType}</div>
            </div>

            <div className="bg-black/5 dark:bg-black/40 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
              <div className="text-slate-600 dark:text-white/80 font-mono uppercase mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#818cf8]" />
                <span>Indicator Floral & Faunal Species</span>
              </div>
              <div className="text-sm font-semibold text-[#4f46e5] dark:text-[#c7d2fe]">
                {resB.keySpecies.join(', ')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/5 dark:bg-black/40 p-3 rounded-2xl border border-slate-200 dark:border-white/10">
                <div className="text-slate-600 dark:text-white/80 font-mono uppercase mb-1 flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5 text-[#818cf8]" />
                  <span>Altitude Bracket</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{resB.altitude}</div>
              </div>

              <div className="bg-black/5 dark:bg-black/40 p-3 rounded-2xl border border-slate-200 dark:border-white/10">
                <div className="text-slate-600 dark:text-white/80 font-mono uppercase mb-1 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#818cf8]" />
                  <span>Rainfall (Annual)</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{resB.rainfall} mm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Bar Chart Comparison */}
      <div className="glass-card bg-ink/10 dark:bg-black/60 border border-ink/20 dark:border-white/10 p-6 rounded-3xl">
        <h3 className="text-sm font-mono font-bold uppercase text-[#d97706] dark:text-[#fbbf24] mb-6 flex items-center gap-2">
          <span>📊 Quantitative Precipitation Analysis (mm/year)</span>
        </h3>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-bold text-fog dark:text-white mb-1.5">
              <span>{resA.name} ({rainA} mm)</span>
              <span className="text-[#059669] dark:text-[#34d399] font-mono">{Math.round((rainA / maxRain) * 100)}% relative to chart scale</span>
            </div>
            <div className="w-full h-5 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (rainA / maxRain) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-fog dark:text-white mb-1.5">
              <span>{resB.name} ({rainB} mm)</span>
              <span className="text-[#4f46e5] dark:text-[#818cf8] font-mono">{Math.round((rainB / maxRain) * 100)}% relative to chart scale</span>
            </div>
            <div className="w-full h-5 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#6366f1] to-[#818cf8] rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (rainB / maxRain) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

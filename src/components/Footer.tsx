import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-canopy/40 py-16 mt-auto">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-emerald/30 bg-canopy/60 overflow-hidden">
              <img src="/logo.jpg" alt="Geo-Globe Logo" className="w-full h-full object-cover" />
            </span>
            <div>
              <div className="font-display text-xl text-fog">Geo-Globe</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground text-fog/60">
                FOREST EXAMS Preparation
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-fog/55">
            A standalone interactive tool designed to help you visualize India's most critical Forests, Reserves, and National Parks in full 3D. Note: Some data points may be unavailable as the live database expands.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1500px] flex-col items-center justify-between gap-4 border-t border-white/[0.06] px-6 pt-6 text-xs text-fog/40 md:flex-row md:px-12">
        <div>
          © {new Date().getFullYear()} Geo-Globe | Made by <a href="https://omkarbhople.com" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">Omkar Bhople</a>
          <span className="mx-2">&middot;</span>
          <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-px w-4 bg-gold/30" />
          <span className="tracking-[0.2em]">
            A GIFT TO ASPIRANTS
          </span>
        </div>
      </div>
    </footer>
  );
}

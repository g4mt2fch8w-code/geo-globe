import React, { useState, useEffect } from 'react';
import type { GeoEntity } from './GlobeViewer';
import * as jspdfModule from 'jspdf';
import { Download, X } from 'lucide-react';

interface JournalUIProps {
  entity: GeoEntity | null;
  onClose: () => void;
}

export const JournalUI: React.FC<JournalUIProps> = ({ entity, onClose }) => {
  const [wikiData, setWikiData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchWiki = async () => {
      if (!entity) return;
      setLoading(true);
      setWikiData(null);

      const countryStr = entity.country && !entity.country.includes('India') ? entity.country : 'India';
      const queriesToTry = [
        `${entity.name} ${countryStr}`, // Try with country first
        entity.name // Fallback to just name
      ];

      try {
        let extract: string | null = null;
        for (const query of queriesToTry) {
          const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`);
          const searchData = await searchRes.json();
          
          if (searchData.query?.search?.length > 0) {
            const pageId = searchData.query.search[0].pageid;
            const extractRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&pageids=${pageId}&format=json&origin=*`);
            const extractData = await extractRes.json();
            
            const pages = extractData.query?.pages;
            if (pages) {
              extract = Object.values(pages)[0]?.extract || null;
              if (extract) break; // Found a good extract, stop trying fallback queries
            }
          }
        }
        
        if (isMounted) {
          setWikiData(extract || "No detailed information found.");
        }
      } catch (err) {
        if (isMounted) {
          setWikiData("Research data is currently unavailable for this reserve. Our field researchers are gathering more information.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWiki();
    return () => { isMounted = false; };
  }, [entity]);

  if (!entity) return null;

  const downloadPDF = () => {
    setIsGeneratingPDF(true);
    try {
      // Find the correct jsPDF constructor from the module object
      const JSPDFClass = (jspdfModule as any).jsPDF 
        ? (jspdfModule as any).jsPDF 
        : typeof jspdfModule === 'function' ? jspdfModule : (jspdfModule as any).default;
        
      if (!JSPDFClass) throw new Error("Could not load jsPDF library");

      const pdf = new JSPDFClass('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Background
      pdf.setFillColor(10, 26, 16); // #0a1a10 (ink)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Header
      pdf.setTextColor(212, 175, 55); // Gold
      pdf.setFontSize(24);
      pdf.text("Field Journal: Lab Report", 20, 30);
      
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(0.5);
      pdf.line(20, 35, pageWidth - 20, 35);
      
      // Title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.text(entity.name, 20, 50);
      
      // Metadata
      pdf.setTextColor(16, 185, 129); // Emerald
      pdf.setFontSize(12);
      pdf.text(`${entity.type.toUpperCase()} • ${entity.country.toUpperCase()}`, 20, 60);
      
      pdf.setTextColor(200, 200, 200);
      pdf.setFontSize(10);
      pdf.text(`Coordinates: ${entity.lat.toFixed(4)}°, ${entity.lng.toFixed(4)}°`, 20, 70);
      pdf.text(`Priority Level: High (UPSC IFoS)`, 20, 76);
      
      // Notes Header
      pdf.setTextColor(212, 175, 55);
      pdf.setFontSize(16);
      pdf.text("Research Notes", 20, 95);
      pdf.line(20, 100, pageWidth - 20, 100);
      
      // Content
      pdf.setTextColor(220, 220, 220);
      pdf.setFontSize(11);
      
      const content = wikiData || "No data available.";
      const splitText = pdf.splitTextToSize(content, pageWidth - 40);
      
      // Handle page breaks
      let y = 110;
      for (let i = 0; i < splitText.length; i++) {
        if (y > pageHeight - 20) {
          pdf.addPage();
          pdf.setFillColor(10, 26, 16);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          y = 20;
          pdf.setTextColor(220, 220, 220);
        }
        pdf.text(splitText[i], 20, y);
        y += 6;
      }
      
      // Footer
      pdf.setTextColor(16, 185, 129);
      pdf.setFontSize(8);
      pdf.text("Official Geo-Globe Database", pageWidth / 2, pageHeight - 10, { align: 'center' });
      
      pdf.save(`${entity.name.replace(/\s+/g, '_')}_Lab_Report.pdf`);
    } catch (e: any) {
      console.error(e);
      alert(`PDF Error: ${e.message || String(e)}`);
    }
    setIsGeneratingPDF(false);
  };

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-[480px] z-50 animate-in slide-in-from-right-8 fade-in font-body">
      <div className="h-full w-full glass-card border-l border-white/10 shadow-emerald flex flex-col noise">
        <div className="absolute inset-0 noise-overlay"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-xl font-display text-gold tracking-wide">Field Journal</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-fog">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div id="journal-content" className="flex-1 overflow-y-auto p-8 text-fog">
            <div className="mb-8 pb-8 border-b border-white/10">
              <h1 className="text-4xl font-display text-gold-gradient mb-2">{entity.name}</h1>
              <p className="text-sm font-semibold tracking-widest uppercase text-emerald mb-4">
                {entity.type} • {entity.country}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] uppercase tracking-widest text-fog/50 mb-1">Coordinates</div>
                  <div className="font-mono text-sm text-gold-soft">{entity.lat.toFixed(4)}°, {entity.lng.toFixed(4)}°</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] uppercase tracking-widest text-fog/50 mb-1">Priority Level</div>
                  <div className="text-sm font-bold text-emerald">High (UPSC IFoS)</div>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-lg font-display text-gold mb-4 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-gold/30"></span> Research Notes
              </h3>
              
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-fog/80 whitespace-pre-wrap">
                  {wikiData}
                </p>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 text-center flex flex-col items-center gap-2">
              <div className="inline-block px-4 py-1 rounded-full border border-emerald/30 bg-emerald/10 text-emerald text-[10px] tracking-widest uppercase">
                Official Geo-Globe Database
              </div>
              <div className="text-[10px] text-fog/40 uppercase tracking-widest mt-2">
                Research Data Provided by Wikipedia API
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-white/10 bg-ink/50 backdrop-blur-xl">
            <button 
              onClick={downloadPDF}
              disabled={isGeneratingPDF || loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-deep text-ink font-bold py-4 rounded-xl transition-all shadow-glow disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              {isGeneratingPDF ? 'Compiling Report...' : 'Download Lab Report (PDF)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

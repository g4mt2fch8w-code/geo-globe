import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { GeoEntity } from './GlobeViewer';
import * as jspdfModule from 'jspdf';
import { X, ExternalLink, Download, BookOpen } from 'lucide-react';
import { logoBase64 } from '../assets/logoBase64';

interface JournalUIProps {
  entity: GeoEntity | null;
  onClose: () => void;
}

export const JournalUI: React.FC<JournalUIProps> = ({ entity, onClose }) => {
  const [wikiData, setWikiData] = useState<string | null>(null);
  const [wikiUrl, setWikiUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchWiki = async () => {
      if (!entity) return;
      setLoading(true);
      setWikiData(null);
      setWikiUrl(null);

      if (entity.customSummary) {
        setWikiData(entity.customSummary);
        setLoading(false);
        return;
      }

      const typeStr = entity.type && !entity.name.includes(entity.type) && !entity.type.includes('Global') ? entity.type : '';
      
      // Priority order: exact type name, generic type, then just the name.
      const queriesToTry = [
        `${entity.name} ${typeStr}`.trim(),
        `${entity.name} Wildlife Sanctuary`.trim(),
        `${entity.name} National Park`.trim(),
        entity.name
      ];

      try {
        let extract: string | null = null;
        let url: string | null = null;
        for (const query of queriesToTry) {
          const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`);
          const searchData = await searchRes.json();
          
          if (searchData.query?.search?.length > 0) {
            // Find a valid specific article, rejecting generic list/index pages
            const validMatch = searchData.query.search.find((res: any) => {
              const lowerTitle = res.title.toLowerCase();
              if (lowerTitle.startsWith('list of') || 
                  lowerTitle.startsWith('index of') ||
                  lowerTitle.includes('protected areas')) return false;
                  
              // For safety, the result's title or snippet must contain the first major word of the entity name
              const nameParts = entity.name.split(' ').filter(p => p.length > 2);
              const firstWord = nameParts.length > 0 ? nameParts[0].toLowerCase() : entity.name.toLowerCase();
              
              if (!lowerTitle.includes(firstWord) && !res.snippet.toLowerCase().includes(firstWord)) return false;
              
              return true;
            });

            if (!validMatch) continue; // Try the next search query fallback

            const pageId = validMatch.pageid;
            const pageTitle = validMatch.title;
            const extractRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&pageids=${pageId}&format=json&origin=*`);
            const extractData = await extractRes.json();
            
            const pages = extractData.query?.pages;
            if (pages) {
              const firstPage = Object.values(pages)[0] as any;
              extract = firstPage?.extract || null;
              if (extract) {
                url = `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`;
                break; // Found a good extract, stop trying fallback queries
              }
            }
          }
        }
        
        if (isMounted) {
          setWikiData(extract || null);
          setWikiUrl(url);
        }
      } catch (err) {
        if (isMounted) {
          setWikiData(null);
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
      
      // Background (White for printing)
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Emerald Left Accent Border
      pdf.setFillColor(16, 185, 129);
      pdf.rect(0, 0, 8, pageHeight, 'F');
      
      // Logo Header
      try {
        pdf.addImage(logoBase64, 'JPEG', 18, 15, 20, 20);
      } catch (e) {
        console.warn("Could not add logo to PDF:", e);
      }
      
      // Header Text
      pdf.setTextColor(50, 50, 50);
      pdf.setFontSize(28);
      pdf.text("Lab Report", 45, 28);
      
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.5);
      pdf.line(18, 40, pageWidth - 18, 40);
      
      // Title
      pdf.setTextColor(30, 41, 59); // Slate-800
      pdf.setFontSize(24);
      pdf.text(entity.name, 18, 55);
      
      // Metadata
      pdf.setTextColor(16, 185, 129); // Emerald
      pdf.setFontSize(12);
      pdf.text(`${entity.type?.toUpperCase() || 'UNKNOWN TYPE'} • ${entity.country?.toUpperCase() || 'UNKNOWN COUNTRY'}`, 18, 65);
      
      pdf.setTextColor(100, 116, 139); // Slate-500
      pdf.setFontSize(10);
      pdf.text(`Coordinates: ${entity.lat.toFixed(4)}°, ${entity.lng.toFixed(4)}°`, 18, 73);
      
      // Notes Header Area (Light Emerald Fill)
      pdf.setFillColor(240, 253, 244); // green-50
      pdf.rect(18, 85, pageWidth - 36, 12, 'F');
      pdf.setTextColor(6, 78, 59); // green-900
      pdf.setFontSize(14);
      pdf.text("Research Notes", 22, 93);
      
      // Content
      pdf.setTextColor(51, 65, 85); // Slate-700
      pdf.setFontSize(11);
      
      const content = wikiData || "No data available.";
      const splitText = pdf.splitTextToSize(content, pageWidth - 36);
      
      // Handle page breaks
      let y = 105;
      for (let i = 0; i < splitText.length; i++) {
        if (y > pageHeight - 20) {
          pdf.addPage();
          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          pdf.setFillColor(16, 185, 129); // Accent border on new pages too
          pdf.rect(0, 0, 8, pageHeight, 'F');
          y = 20;
          pdf.setTextColor(51, 65, 85);
        }
        pdf.text(splitText[i], 18, y);
        y += 6;
      }
      
      // Footer
      pdf.setTextColor(148, 163, 184); // Slate-400
      pdf.setFontSize(8);
      pdf.text(`Generated by Geo-Globe • ${new Date().toLocaleDateString()}`, 18, pageHeight - 10);
      
      pdf.save(`${entity.name.replace(/\s+/g, '_')}_Lab_Report.pdf`);
    } catch (e: any) {
      console.error(e);
      alert(`PDF Error: ${e.message || String(e)}`);
    }
    setIsGeneratingPDF(false);
  };

  return createPortal(
    <div className="fixed top-0 right-0 h-full w-full md:w-[480px] z-[100] animate-in slide-in-from-right-8 fade-in font-body">
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
              <p className="text-sm font-semibold tracking-widest uppercase text-sky-300 mb-4">
                {entity.type} • {entity.country}
              </p>
              
              <div className="mt-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 inline-block w-full">
                  <div className="text-[10px] uppercase tracking-widest text-fog/50 mb-1">Coordinates</div>
                  <div className="font-mono text-sm text-sky-300">{entity.lat.toFixed(4)}°, {entity.lng.toFixed(4)}°</div>
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
                <>
                  {wikiData ? (
                    <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-[inset_0_2px_20px_rgba(255,255,255,0.05)]">
                      <p className="text-sm leading-relaxed text-fog/90 whitespace-pre-wrap">
                        {wikiData}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-500/20 mt-4">
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-emerald-100 font-medium mb-1">Research Notes</h4>
                          <p className="text-sm text-emerald-100/70 leading-relaxed mb-4">
                            Detailed research notes for this location are currently unavailable from our primary database.
                          </p>
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(`${entity.name} ${entity.type || ''}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/50 px-3 py-1.5 rounded-full transition-colors border border-emerald-500/30"
                          >
                            Search Web for Research Data <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  {wikiUrl && (
                    <a 
                      href={wikiUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-xs font-semibold uppercase tracking-widest text-emerald hover:text-gold transition-colors border border-emerald/30 hover:border-gold/50 px-4 py-2 rounded-full"
                    >
                      Read Full Article ↗
                    </a>
                  )}
                </>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 text-center flex flex-col items-center gap-2">
              <div className="text-[10px] text-sky-300/80 uppercase tracking-widest mt-2">
                {entity.customSummary ? "Custom Research Data Provided by Pantherine Neophyte" : "Research Data Provided by Wikipedia API"}
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
    </div>,
    document.body
  );
};

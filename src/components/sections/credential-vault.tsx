'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { CERTS, CredentialItem } from '@/lib/constants';
import { ShieldCheck, ChevronLeft, ChevronRight, ZoomIn, CheckCircle2 } from 'lucide-react';
import SectionReveal from '../section-reveal';

export default function CredentialVault() {
  const [activeCert, setActiveCert] = useState<CredentialItem | null>(null);

  const handlePrevCert = () => {
    if (!activeCert) return;
    const currentIndex = CERTS.findIndex((c) => c.id === activeCert.id);
    const prevIndex = (currentIndex - 1 + CERTS.length) % CERTS.length;
    setActiveCert(CERTS[prevIndex]);
  };

  const handleNextCert = () => {
    if (!activeCert) return;
    const currentIndex = CERTS.findIndex((c) => c.id === activeCert.id);
    const nextIndex = (currentIndex + 1) % CERTS.length;
    setActiveCert(CERTS[nextIndex]);
  };

  return (
    <section id="vault" className="py-24 md:py-32 bg-background relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-accent/5 border border-accent/10 text-xs font-bold text-accent uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Institutional Qualifications</span>
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mt-4 leading-tight">
              The Credential Vault
            </h2>
            <p className="text-muted text-base md:text-lg mt-3">
              Official accreditations verifying professional qualification as an Independent Test Prep Provider and Cambridge-certified educator.
            </p>
          </div>
          
          <div className="text-xs text-muted font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <ZoomIn className="w-4 h-4 text-accent" />
            <span>Click any credential to inspect verification</span>
          </div>
        </div>

        {/* Grid Container - The Verified Credentials */}
        <SectionReveal direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {CERTS.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setActiveCert(cert)}
                className="cursor-zoom-in transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group"
              >
                <Card className="h-full border border-border bg-card-bg shadow-card hover:shadow-card-hover rounded-2xl overflow-hidden flex flex-col justify-between">
                  <CardContent className="p-6 sm:p-7 flex flex-col gap-6 h-full justify-between">
                    
                    {/* Official Logo Image Container */}
                    <div className="relative aspect-[16/10] rounded-xl bg-white border border-border flex items-center justify-center p-3 sm:p-4 text-center overflow-hidden shadow-sm group-hover:border-accent/40 transition-colors">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="max-h-[88%] max-w-[92%] object-contain scale-105 transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Zoom Indicator Pill */}
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg bg-neutral-900/80 text-white text-[10px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="h-3 w-3" />
                        <span>Inspect</span>
                      </div>
                    </div>

                    {/* Metadata & Information */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted">
                          {cert.code}
                        </span>
                        
                        {cert.verified && (
                          <Badge variant="success" className="gap-1 px-2.5 py-0.5 text-[10px] font-bold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Verified</span>
                          </Badge>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-display font-extrabold text-base sm:text-lg text-foreground leading-snug">
                          {cert.title}
                        </h4>
                        <p className="text-xs font-semibold text-accent mt-0.5">{cert.subtitle}</p>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{cert.issuer}</p>
                      </div>

                      <div className="pt-3 border-t border-border/50 text-xs text-muted/90 leading-relaxed">
                        {cert.description}
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Lightbox / Inspection Modal */}
        <Dialog open={activeCert !== null} onOpenChange={(open) => { if (!open) setActiveCert(null); }}>
          {activeCert && (
            <DialogContent className="max-w-xl p-5 sm:p-8 rounded-2xl border border-border bg-card-bg shadow-card-hover text-center select-none">
              <DialogHeader className="items-center pb-4 border-b border-border">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800/40 mb-3">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Verified Educational Credential</span>
                </div>
                <DialogTitle className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-foreground text-center">
                  {activeCert.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted mt-1 text-center">
                  {activeCert.subtitle} · Issued by {activeCert.issuer}
                </DialogDescription>
              </DialogHeader>

              {/* Verified Image Display */}
              <div className="my-6 p-4 sm:p-6 rounded-2xl bg-white border border-border flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="max-h-72 sm:max-h-[26rem] max-w-full object-contain"
                />

                {/* Navigation arrows inside lightbox */}
                <button
                  onClick={handlePrevCert}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  aria-label="Previous credential"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNextCert}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  aria-label="Next credential"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Awarded Info & Verification Pipeline */}
              <div className="space-y-2 text-center pb-2">
                <p className="text-sm font-bold text-foreground">
                  Awarded to Shradha Nirmale
                </p>
                <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                  {activeCert.description}
                </p>
                <p className="text-[10px] text-muted font-mono uppercase tracking-widest pt-2">
                  STATUS: VERIFIED INDEPENDENT TEST PREP PROVIDER
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => setActiveCert(null)}
                  className="px-5 py-2 sm:px-6 sm:py-2 rounded-xl border border-border text-xs sm:text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Close Vault
                </button>
              </div>
            </DialogContent>
          )}
        </Dialog>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { CERTS } from '@/lib/constants';
import { ShieldCheck, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import SectionReveal from '../section-reveal';

export default function CredentialVault() {
  const [activeCert, setActiveCert] = useState<typeof CERTS[0] | null>(null);

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
    <section id="vault" className="py-24 md:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 text-xs font-bold text-accent uppercase tracking-wider">
              Verification & Trust
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mt-4 leading-tight">
              The Credential Vault
            </h2>
            <p className="text-muted text-base md:text-lg mt-3">
              Certified English education is built on rigorous verification. Browse verified certificates in pedagogy, learning design, and specific testing programs.
            </p>
          </div>
          
          {/* Scroll instruction for mobile */}
          <div className="text-xs text-muted font-semibold uppercase tracking-wider flex items-center gap-2 md:block hidden">
            <span>Click any credential to inspect verification</span>
          </div>
        </div>

        {/* Carousel Container */}
        <SectionReveal direction="up">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {CERTS.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setActiveCert(cert)}
                className="min-w-[280px] sm:min-w-[320px] max-w-[360px] snap-start shrink-0 cursor-zoom-in transition-all duration-300 hover:scale-[1.03] group"
              >
                <Card className="h-full border border-border bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-card-bg shadow-card hover:shadow-card-hover rounded-3xl overflow-hidden flex flex-col justify-between">
                  <CardContent className="p-6 sm:p-8 flex flex-col gap-6 h-full justify-between">
                    
                    {/* Visual Certificate Placeholder */}
                    <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-tr from-accent/10 to-accent/5 border border-accent/10 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                      {/* Grid background layer in placeholder */}
                      <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none" />
                      
                      <div className="w-12 h-12 rounded-full bg-card-bg flex items-center justify-center text-accent shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                      <p className="font-display font-extrabold text-sm text-foreground leading-snug">
                        {cert.title}
                      </p>
                      <p className="text-[10px] text-muted font-semibold mt-1">
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                          Credential ID {1000 + cert.id}
                        </span>
                        
                        {cert.verified && (
                          <Badge variant="success" className="gap-1 px-2.5 py-0.5 text-[10px] font-bold">
                            <ShieldCheck className="h-3 w-3 text-green-600" />
                            <span>Verified</span>
                          </Badge>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-display font-bold text-base text-foreground leading-tight">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-muted mt-0.5">{cert.issuer}</p>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Lightbox / Modal */}
        <Dialog open={activeCert !== null} onOpenChange={(open) => { if (!open) setActiveCert(null); }}>
          {activeCert && (
            <DialogContent className="max-w-xl p-8 rounded-3xl border border-border bg-card-bg shadow-card-hover text-center select-none">
              <DialogHeader className="items-center pb-4 border-b border-border">
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/25 px-3 py-1 rounded-full border border-green-200/50 dark:border-green-800/40 mb-3">
                  <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Verified Educational Credential</span>
                </div>
                <DialogTitle className="font-display font-extrabold text-2xl tracking-tight text-foreground text-center">
                  {activeCert.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted mt-1 text-center">
                  Issued by {activeCert.issuer} · Credentials audit log intact
                </DialogDescription>
              </DialogHeader>

              {/* Certificate mock view in lightbox */}
              <div className="my-8 aspect-[4/3] rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 border border-border flex flex-col items-center justify-center p-8 relative">
                <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-card-bg flex items-center justify-center shadow-sm mb-4">
                  🏅
                </div>
                <h3 className="font-display font-extrabold text-lg text-foreground tracking-tight">
                  {activeCert.title}
                </h3>
                <p className="text-xs text-muted font-medium mt-1">
                  Awarded to Shradha Nirmale
                </p>
                <div className="w-24 h-px bg-border my-4" />
                <p className="text-[10px] text-muted uppercase tracking-widest font-mono">
                  VERIFIED BY PREPLY & PARAGON AUDIT PIPELINE
                </p>
                
                {/* Navigation arrows inside layout */}
                <button
                  onClick={handlePrevCert}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card-bg border border-border flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors shadow-sm cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={handleNextCert}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card-bg border border-border flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors shadow-sm cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setActiveCert(null)}
                  className="px-6 py-2.5 rounded-full border border-border text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
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

'use client';

import React from 'react';
import { TRACKS } from '@/lib/constants';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { GraduationCap, Laptop, Briefcase, Check, ArrowRight } from 'lucide-react';
import SectionReveal from '../section-reveal';
import { Track } from '@/lib/form-schema';

type SolutionTracksProps = {
  onSelectTrack: (trackId: Track) => void;
};

export default function SolutionTracks({ onSelectTrack }: SolutionTracksProps) {
  
  // Icon selector based on track id
  const getIcon = (id: string) => {
    switch (id) {
      case 'celpip':
        return <GraduationCap className="h-6 w-6 text-accent" />;
      case 'det':
        return <Laptop className="h-6 w-6 text-accent" />;
      case 'corporate':
        return <Briefcase className="h-6 w-6 text-accent" />;
      default:
        return <GraduationCap className="h-6 w-6 text-accent" />;
    }
  };

  return (
    <section id="tracks" className="py-24 md:py-32 bg-neutral-50/50 dark:bg-neutral-950/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 text-xs font-bold text-accent uppercase tracking-wider">
            Programs & Tracks
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mt-4 leading-tight">
            Tailored Tracks for High Performers
          </h2>
          <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
            Choose the track that fits your current goals. Each track starts with a complete diagnostic bottleneck audit.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TRACKS.map((track, idx) => (
            <SectionReveal key={track.id} direction="up" delay={idx * 0.1}>
              <div className="h-full transition-transform duration-300 hover:scale-[1.02]">
                <Card className="h-full border border-border bg-card-bg shadow-card rounded-3xl overflow-hidden flex flex-col justify-between">
                  
                  {/* Top: Header Info */}
                  <CardContent className="p-8 md:p-10 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center">
                        {getIcon(track.id)}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-muted">
                        {track.id === 'corporate' ? 'Professional' : 'Exam Prep'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-2xl text-foreground">
                        {track.title}
                      </h3>
                      <p className="text-sm font-semibold text-accent">
                        {track.subtitle}
                      </p>
                    </div>

                    <p className="text-xs font-bold text-muted uppercase tracking-wider border-b border-border pb-3">
                      {track.audience}
                    </p>

                    {/* Benefits Checklist */}
                    <ul className="space-y-3.5 pt-2">
                      {track.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base text-foreground font-medium">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                  </CardContent>

                  {/* Bottom: Action CTA */}
                  <div className="p-8 md:p-10 pt-0 md:pt-0">
                    <Button
                      onClick={() => onSelectTrack(track.id as Track)}
                      className="w-full font-display font-semibold inline-flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>{track.cta}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>

                </Card>
              </div>
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

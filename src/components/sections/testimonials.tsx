'use client';

import React from 'react';
import { TESTIMONIALS } from '@/lib/constants';
import { Card, CardContent } from '../ui/card';
import SectionReveal from '../section-reveal';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-neutral-50/30 dark:bg-neutral-950/10 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-accent/5 border border-accent/10 text-xs font-bold text-accent uppercase tracking-wider">
            Proven Results
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mt-4 leading-tight">
            Endorsed by Global Professionals
          </h2>
          <p className="text-muted text-base md:text-lg mt-3 max-w-xl mx-auto">
            Read how international professionals isolated their English bottlenecks and unlocked career and exam advancement.
          </p>
        </div>

        {/* Testimonials Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item, idx) => (
            <SectionReveal key={idx} direction="up" delay={idx * 0.1}>
              <Card className="h-full border border-border bg-card-bg shadow-card hover:shadow-card-hover transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between">
                <CardContent className="p-8 md:p-10 flex flex-col justify-between h-full gap-6">
                  
                  {/* Quote block */}
                  <div className="space-y-4">
                    <span className="text-4xl font-serif text-accent/25 block leading-none select-none">“</span>
                    <p className="font-display font-medium text-base sm:text-lg text-foreground italic leading-relaxed pl-2 -mt-4">
                      {item.text}
                    </p>
                  </div>

                  {/* Client details */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40 pl-2">
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-foreground">
                        {item.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-muted font-semibold uppercase tracking-wider mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

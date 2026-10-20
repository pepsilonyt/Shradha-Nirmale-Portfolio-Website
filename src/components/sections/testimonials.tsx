'use client';

import React, { useState } from 'react';
import { TESTIMONIALS, PreplyReview, NAV } from '@/lib/constants';
import { Card, CardContent } from '../ui/card';
import SectionReveal from '../section-reveal';
import { ShieldCheck, Star, ExternalLink, MessageSquareQuote } from 'lucide-react';

type FilterCategory = 'All' | 'CELPIP' | 'Duolingo DET' | 'Business English' | 'General';

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const filteredReviews = activeFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((review) => review.category === activeFilter);

  const categories: { label: string; value: FilterCategory; count: number }[] = [
    { label: 'All Reviews', value: 'All', count: TESTIMONIALS.length },
    { label: 'CELPIP Prep', value: 'CELPIP', count: TESTIMONIALS.filter((r) => r.category === 'CELPIP').length },
    { label: 'Duolingo DET', value: 'Duolingo DET', count: TESTIMONIALS.filter((r) => r.category === 'Duolingo DET').length },
    { label: 'Business English', value: 'Business English', count: TESTIMONIALS.filter((r) => r.category === 'Business English').length },
    { label: 'Strategy & Fluency', value: 'General', count: TESTIMONIALS.filter((r) => r.category === 'General').length },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-neutral-50/40 dark:bg-neutral-950/20 border-t border-border relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/5 border border-accent/15 text-xs font-bold text-accent uppercase tracking-wider mb-4">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span>Verified Preply Student Reviews</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-tight">
            Real Reviews from Real Test-Takers
          </h2>
          <p className="text-muted text-base md:text-lg mt-3.5 max-w-2xl mx-auto leading-relaxed">
            Unedited student feedback from professionals and test-takers preparing for CELPIP, the Duolingo English Test (DET), and high-stakes corporate communication.
          </p>

          {/* Aggregate Rating Banner */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl bg-card-bg border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl text-foreground">5.0</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="h-5 w-px bg-border hidden sm:block" />
            <div className="text-xs sm:text-sm font-semibold text-foreground">
              100% 5-Star Rating
            </div>
            <div className="h-5 w-px bg-border hidden sm:block" />
            <a
              href={NAV.preply}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:underline group"
            >
              <span>Verify on Preply</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === cat.value
                  ? 'bg-foreground text-background shadow-sm'
                  : 'bg-card-bg text-muted hover:text-foreground border border-border hover:border-accent/40'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {filteredReviews.map((review, idx) => (
            <SectionReveal key={review.id} direction="up" delay={(idx % 4) * 0.1}>
              <Card className="h-full border border-border bg-card-bg shadow-card hover:shadow-card-hover transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between group">
                <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full gap-5">
                  
                  {/* Top Row: Stars, Verified Badge & Date */}
                  <div className="flex items-start justify-between gap-4 border-b border-border/50 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-amber-500">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-foreground">5.0</span>
                      </div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent/10 text-accent">
                        {review.category}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Preply Verified</span>
                      </div>
                      <p className="text-[11px] text-muted font-medium mt-0.5">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  {/* Highlight & Full Review Text */}
                  <div className="space-y-3 flex-1">
                    <h4 className="font-display font-bold text-base sm:text-lg text-foreground leading-snug">
                      "{review.highlight}"
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-muted/95 leading-relaxed">
                      {review.text}
                    </p>
                  </div>

                  {/* Student Signature */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent/10 text-accent font-display font-extrabold flex items-center justify-center text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-display font-bold text-sm text-foreground">
                          {review.name}
                        </h5>
                        <p className="text-[11px] text-muted">
                          Verified Student on Preply
                        </p>
                      </div>
                    </div>
                    <MessageSquareQuote className="w-5 h-5 text-accent/30 group-hover:text-accent/60 transition-colors" />
                  </div>

                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>

        {/* Bottom Direct Preply Profile Verification */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 sm:p-5 rounded-2xl bg-card-bg border border-border shadow-sm max-w-xl mx-auto">
            <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 text-neutral-900 dark:text-[#00E5BE] font-black text-lg flex items-center justify-center shrink-0">
              P
            </div>
            <div className="text-center sm:text-left text-xs sm:text-sm">
              <span className="font-bold text-foreground block">
                All 8 reviews verified directly from Preply platform
              </span>
              <span className="text-muted">
                Inspect full lesson records, verified credentials, and book trial lessons directly.
              </span>
            </div>
            <a
              href={NAV.preply}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-0 sm:ml-auto px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>View Preply Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

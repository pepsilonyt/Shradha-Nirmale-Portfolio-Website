'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database } from 'lucide-react';
import SectionReveal from '../section-reveal';
import AnimatedCounter from '../animated-counter';
import { STATS } from '@/lib/constants';

export default function InterdisciplinaryEdge() {
  return (
    <section id="edge" className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      {/* Decorative background blur circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-accent/5 border border-accent/10 text-xs font-bold text-accent uppercase tracking-wider">
                The Analytical Edge
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-tight">
                Where cognitive psychology meets data diagnostics
              </h2>
            </div>

            <p className="text-muted text-lg leading-relaxed">
              {"I don't just teach English; I optimize your brain's processing pipeline. By blending language training with cognitive learning design and precise error metrics, I build systems that unlock immediate, repeatable score improvements."}
            </p>

            <div className="space-y-4 border-l-2 border-accent pl-6 py-2">
              <p className="text-foreground font-display font-semibold text-lg italic leading-relaxed">
                {`"We don't study more rules. We isolate the single rule-breaking habit, restructure how your brain schedules thoughts under test pressure, and automate it."`}
              </p>
            </div>

            {/* Microstats block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border text-center sm:text-left">
              {STATS.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-display font-extrabold text-2xl md:text-3xl text-foreground">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.value % 1 === 0 ? 0 : 1} />
                  </p>
                  <p className="text-xs text-muted font-medium uppercase tracking-wider leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Executive Memorandum Card */}
          <div className="lg:col-span-6">
            <SectionReveal direction="left" delay={0.2}>
              <div className="rounded-2xl border border-border bg-card-bg/60 p-8 md:p-10 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden">
                {/* Official watermarked-style background text or border line */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full flex items-center justify-center font-mono text-xs font-bold text-accent/20">
                  OFFICIAL
                </div>

                <div className="space-y-6">
                  {/* Memo Header */}
                  <div className="border-b-2 border-border pb-6 space-y-4 font-mono text-xs text-muted">
                    <div className="text-center font-display font-bold text-sm tracking-widest text-foreground uppercase border-b border-border/40 pb-2">
                      MEMORANDUM
                    </div>
                    <div className="grid grid-cols-4 gap-y-1.5">
                      <span className="font-bold text-foreground">TO:</span>
                      <span className="col-span-3">Executive Candidates & High-Scoring Aspirants</span>
                      <span className="font-bold text-foreground">FROM:</span>
                      <span className="col-span-3">Shradha Nirmale, Senior Learning Strategist</span>
                      <span className="font-bold text-foreground">SUBJECT:</span>
                      <span className="col-span-3">The Cognitive Optimization Paradigm</span>
                    </div>
                  </div>

                  {/* Memo Content */}
                  <div className="space-y-6 text-sm text-foreground/90 leading-relaxed font-sans">
                    <p>
                      Traditional preparation models rely heavily on brute-force repetition. This memo outlines the structural methodology utilized in our programs to bypass plateaus.
                    </p>
                    <div className="space-y-4 pl-4 border-l border-accent/35">
                      <div>
                        <p className="font-bold text-foreground font-display text-sm tracking-wide">01 / BOTTLENECK ISOLATION</p>
                        <p className="text-muted text-xs mt-1">
                          Instead of broad curriculum drills, we diagnose and isolate the specific speech coordination latency or reading pacing issues halting score improvements.
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-foreground font-display text-sm tracking-wide">02 / COGNITIVE DECONGESTION</p>
                        <p className="text-muted text-xs mt-1">
                          Under strict testing conditions, working memory is the ultimate constraint. We model structured retrieval pathways to free up mental resources for complex lexical selection.
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-foreground font-display text-sm tracking-wide">03 / EMPIRICAL FEEDBACK</p>
                        <p className="text-muted text-xs mt-1">
                          Performance is mapped through rigorous error frequencies, tracking exactly which speech and syntactic templates fail under time pressure.
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted italic font-mono pt-2">
                      Authentication Protocol Status: Active
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

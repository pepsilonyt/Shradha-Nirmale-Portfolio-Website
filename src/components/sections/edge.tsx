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
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 text-xs font-bold text-accent uppercase tracking-wider">
                The Analytical Edge
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-tight">
                Where cognitive psychology meets data diagnostics
              </h2>
            </div>

            <p className="text-muted text-lg leading-relaxed">
              {"Shradha N. doesn't just teach English; she optimizes your brain's processing pipeline. By blending language training with cognitive learning design and precise error metrics, she builds systems that unlock immediate, repeatable score improvements."}
            </p>

            <div className="space-y-4 border-l-2 border-accent pl-6 py-2">
              <p className="text-foreground font-display font-semibold text-lg italic leading-relaxed">
                {`"We don't study more rules. We isolate the single rule-breaking habit, restructure how your brain schedules thoughts under test pressure, and automate it."`}
              </p>
            </div>

            {/* Microstats block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border">
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

          {/* Right: Scientific Framework Diagrams Mockup */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Card 1: Processing Timeline */}
            <SectionReveal direction="left" delay={0.1}>
              <div className="rounded-3xl border border-border bg-card-bg p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground">
                      Cognitive Optimization Pathway
                    </h3>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Learning Architecture</p>
                  </div>
                </div>

                {/* SVG Animated Timeline */}
                <div className="relative pt-2">
                  <svg className="w-full h-10" fill="none" viewBox="0 0 400 40">
                    {/* Background line */}
                    <line x1="20" y1="20" x2="380" y2="20" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
                    {/* Active pathway line */}
                    <motion.line
                      x1="20"
                      y1="20"
                      x2="380"
                      y2="20"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeDasharray="360"
                      initial={{ strokeDashoffset: 360 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                    {/* Steps / nodes */}
                    {[20, 110, 200, 290, 380].map((cx, i) => (
                      <motion.circle
                        key={i}
                        cx={cx}
                        cy="20"
                        r="6"
                        fill={i < 4 ? '#2563EB' : 'var(--card-bg)'}
                        stroke="#2563EB"
                        strokeWidth="3"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.2 }}
                      />
                    ))}
                  </svg>
                  <div className="grid grid-cols-5 text-center text-[10px] font-bold text-muted mt-1 uppercase tracking-wider">
                    <span>Audit</span>
                    <span>Isolate</span>
                    <span>Model</span>
                    <span>Drill</span>
                    <span>Unlock</span>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Card 2: Error Diagnosis Grid */}
            <SectionReveal direction="left" delay={0.2}>
              <div className="rounded-3xl border border-border bg-card-bg p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground">
                      Diagnostic Error Matrix
                    </h3>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Real-time pattern isolation</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Grid visualization */}
                  <div className="grid grid-cols-6 gap-2 w-32 shrink-0">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const isActive = [3, 8, 14, 19, 20].includes(i);
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.1, scale: 0.8 }}
                          whileInView={{ opacity: isActive ? 1 : 0.1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + (i % 6) * 0.05 }}
                          className={`h-3 w-3 rounded-full ${isActive ? 'bg-accent shadow-glow' : 'bg-neutral-200 dark:bg-neutral-800'}`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Copy */}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground">
                      Precision Diagnosis vs Intuition
                    </p>
                    <p className="text-xs text-muted leading-relaxed">
                      We track error frequencies across reading timing, speech hesitancy metrics, and sentence coordination templates, targeting your highest-leverage areas.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Card 3: Cognitive Load Distribution */}
            <SectionReveal direction="left" delay={0.3}>
              <div className="rounded-3xl border border-border bg-card-bg p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground">
                      Cognitive Load Control
                    </h3>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Decreasing processing bottlenecks</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* Concentric rings */}
                  <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full border border-border flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center" />
                      </div>
                    </div>
                    {/* Animated active indicators */}
                    <motion.div
                      className="absolute inset-2 rounded-full border border-dashed border-accent/20"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute inset-6 rounded-full border border-dashed border-accent"
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    />
                    <span className="text-[10px] font-bold text-accent">Load</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground">
                      Reducing Working Memory Strain
                    </p>
                    <p className="text-xs text-muted leading-relaxed">
                      Exam templates are structured to offload simple sentence scheduling, leaving your brain completely free to focus on advanced argumentation and vocabulary.
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

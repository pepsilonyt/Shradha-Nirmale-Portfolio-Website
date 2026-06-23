'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, TrendingUp, CheckCircle, Award } from 'lucide-react';
import MagneticButton from '../magnetic-button';
import { HERO } from '@/lib/constants';
import { useAnalytics } from '@/hooks/use-analytics';

type HeroProps = {
  onCTAClick: () => void;
};

export default function Hero({ onCTAClick }: HeroProps) {
  const { trackEvent } = useAnalytics();

  const handleHeroCTA = () => {
    trackEvent({
      category: 'Hero',
      action: 'click_hero_cta',
    });
    onCTAClick();
  };

  // Mock icons dictionary
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="h-6 w-6 text-accent" />;
      case 'TrendingUp':
        return <TrendingUp className="h-6 w-6 text-accent" />;
      case 'ShieldCheck':
        return <CheckCircle className="h-6 w-6 text-accent" />;
      default:
        return <Target className="h-6 w-6 text-accent" />;
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 md:py-40 bg-white overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Social Proof Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-50 border border-border text-xs md:text-sm font-semibold text-foreground"
            >
              <span className="text-amber-500">★★★★★</span>
              <span>{HERO.socialProof}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.08]"
            >
              {HERO.h1}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl"
            >
              {HERO.sub}
            </motion.p>

            {/* Benefit Bullets */}
            <div className="space-y-4 pt-2">
              {HERO.bullets.map((bullet, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center">
                    {getIcon(bullet.icon)}
                  </div>
                  <span className="font-sans font-medium text-foreground md:text-base text-sm">
                    {bullet.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA & Trust copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4 pt-4"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <MagneticButton onClick={handleHeroCTA} className="text-center font-display font-semibold">
                  {HERO.cta}
                </MagneticButton>
              </div>

              {/* Trust microcopy */}
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted">
                <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{HERO.trust}</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Diagnostic Dashboard Mockup */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-6 shadow-card max-w-lg mx-auto"
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">
                    English Diagnostics Dashboard
                  </h3>
                  <p className="text-xs text-muted">A.I. & Cognitive Skill Map</p>
                </div>
                <div className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                
                {/* Error Analysis Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-foreground">Error Analysis Sheet</span>
                    <span className="text-emerald-500 font-semibold">Ready</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '62%' }}
                        transition={{ duration: 1.2, delay: 0.9 }}
                        className="h-full bg-accent/60 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Score Improvement Chart Mockup */}
                <div className="p-4 rounded-2xl bg-neutral-50/50 border border-border/60">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-muted">Weekly Score Acceleration</span>
                    <span className="text-xs font-bold text-accent">+24%</span>
                  </div>
                  <div className="h-24 flex items-end gap-2.5 pt-2">
                    {[35, 50, 45, 70, 60, 95].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            i === 5 ? 'bg-accent shadow-md' : 'bg-accent/20'
                          }`}
                        />
                        <span className="text-[9px] text-muted font-mono">W{i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Wheel and Bottleneck Identifier */}
                <div className="flex items-center gap-4 p-3 rounded-2xl border border-border bg-white">
                  <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="#F5F5F5"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="#2563EB"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 26}
                        initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - 0.78) }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-foreground">78%</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Identified Bottleneck:</h4>
                    <p className="text-xs text-muted leading-tight mt-0.5">
                      Coherence under time pressure. Remedial timeline active.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Floating Certification Badges (Visual Credibility) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 md:right-4 bg-white border border-border shadow-card p-3 rounded-2xl flex items-center gap-2.5 z-10"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Certified</p>
                <p className="text-xs font-bold text-foreground">CELPIP Educator</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-8 -left-6 md:left-4 bg-white border border-border shadow-card p-3 rounded-2xl flex items-center gap-2.5 z-10"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/5 text-accent flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Cambridge</p>
                <p className="text-xs font-bold text-foreground">CELTA Teacher</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

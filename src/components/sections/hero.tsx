'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, TrendingUp, CheckCircle, Award } from 'lucide-react';
import MagneticButton from '../magnetic-button';
import { HERO } from '@/lib/constants';
import { useAnalytics } from '@/hooks/use-analytics';
import { CambridgeCeltaLogo, DuolingoPartnerLogo, IHBudapestLogo, CXLOptimizerLogo } from '@/components/partner-logos';

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

  const handleSecondaryCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent({
      category: 'Hero',
      action: 'click_view_success_stories_cta',
    });
    const el = document.getElementById('vault');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
    <section className="relative min-h-screen pt-28 sm:pt-32 pb-16 md:pb-24 bg-background overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Social Proof Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-border text-xs md:text-sm font-semibold text-foreground"
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
                <button
                  onClick={handleSecondaryCTA}
                  className="font-display font-semibold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors shadow-sm cursor-pointer"
                >
                  <span>View Success Stories</span>
                </button>
              </div>

              {/* Trust microcopy */}
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted">
                <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{HERO.trust}</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Premium Portrait Frame */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-3.5 bg-card-bg border border-border rounded-2xl shadow-card max-w-sm mx-auto"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-muted/10">
                <img
                  src="/portrait.png"
                  alt="Shradha Nirmale - English Educator"
                  className="object-cover w-full h-full filter contrast-[1.02]"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-display font-bold text-base text-foreground">Shradha Nirmale</p>
                <p className="text-xs text-muted font-medium mt-0.5">Professional Independent Test Prep Provider</p>
                <p className="text-[11px] text-accent font-semibold mt-0.5">Cambridge CELTA · IH Budapest Certified</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-accent/5 border border-accent/15 text-[11px] font-semibold text-foreground">
                  <span className="text-amber-500">★★★★★</span>
                  <span>100% 5.0★ on Preply</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Top Fold Credential Logos: Duolingo Partner Network, Cambridge CELTA, IH Budapest & Preply */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 md:mt-20 pt-8 border-t border-border"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted">
              Official Institutional Credentials & Global Partner Network
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 max-w-6xl mx-auto items-stretch">
            <CambridgeCeltaLogo className="w-full h-28 sm:h-32 md:h-36" />
            <DuolingoPartnerLogo className="w-full h-28 sm:h-32 md:h-36" />
            <IHBudapestLogo className="w-full h-28 sm:h-32 md:h-36" />
            <CXLOptimizerLogo className="w-full h-28 sm:h-32 md:h-36" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

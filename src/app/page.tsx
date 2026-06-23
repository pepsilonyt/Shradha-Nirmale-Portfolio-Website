'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Hero from '@/components/sections/hero';
import Empathy from '@/components/sections/empathy';
import SolutionTracks from '@/components/sections/solution-tracks';
import InterdisciplinaryEdge from '@/components/sections/edge';
import CredentialVault from '@/components/sections/credential-vault';
import SmartForm from '@/components/sections/smart-form';
import SuccessState from '@/components/sections/success-state';
import FAQ from '@/components/sections/faq';
import StickyCTA from '@/components/sticky-cta';
import ExitIntentPopup from '@/components/exit-intent-popup';
import { Track } from '@/lib/form-schema';
import SectionReveal from '@/components/section-reveal';

export default function Home() {
  const [preselectedTrack, setPreselectedTrack] = useState<Track | null>(null);
  const [formCompleted, setFormCompleted] = useState(false);

  const scrollToForm = () => {
    const element = document.getElementById('form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTrack = (trackId: Track) => {
    setPreselectedTrack(trackId);
    scrollToForm();
  };

  return (
    <>
      {/* Structural layout navbar */}
      <Navbar />

      <main className="flex-1 w-full overflow-hidden">
        
        {/* Section 1: Hero */}
        <Hero onCTAClick={scrollToForm} />

        {/* Section 2: Empathy / Problem */}
        <SectionReveal direction="up" delay={0.1}>
          <Empathy />
        </SectionReveal>

        {/* Section 3: Solution Tracks */}
        <SectionReveal direction="up" delay={0.1}>
          <SolutionTracks onSelectTrack={handleSelectTrack} />
        </SectionReveal>

        {/* Section 4: Interdisciplinary Edge */}
        <SectionReveal direction="up" delay={0.1}>
          <InterdisciplinaryEdge />
        </SectionReveal>

        {/* Section 5: Credential Vault */}
        <SectionReveal direction="up" delay={0.1}>
          <CredentialVault />
        </SectionReveal>

        {/* Section 6 & 7: Multi-Step Smart Form / Success State */}
        <div id="form">
          <AnimatePresence mode="wait">
            {!formCompleted ? (
              <SmartForm
                key="smart-form"
                preselectedTrack={preselectedTrack}
                onSuccess={() => setFormCompleted(true)}
              />
            ) : (
              <SuccessState key="success-state" />
            )}
          </AnimatePresence>
        </div>

        {/* Section 8: FAQ */}
        <SectionReveal direction="up" delay={0.1}>
          <FAQ />
        </SectionReveal>

      </main>

      {/* Structural layout footer */}
      <Footer />

      {/* CRO Conversion Utilities */}
      <StickyCTA onClick={scrollToForm} />
      <ExitIntentPopup onCTA={scrollToForm} />
    </>
  );
}

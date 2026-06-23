'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/button';
import { useAnalytics } from '@/hooks/use-analytics';

type StickyCTAProps = {
  onClick: () => void;
};

export default function StickyCTA({ onClick }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA when scrolled past 600px
      setIsVisible(window.scrollY > 650);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    trackEvent({
      category: 'Sticky CTA',
      action: 'click_sticky_cta',
    });
    onClick();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/80 backdrop-blur-md border-t border-border flex items-center justify-center shadow-lg"
        >
          <div className="max-w-7xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-12">
            <p className="hidden md:block font-display font-medium text-foreground text-sm">
              Ready to find your English bottleneck? Get your custom strategy roadmap.
            </p>
            <Button
              onClick={handleCTAClick}
              className="w-full sm:w-auto font-display font-semibold bg-accent hover:bg-accent-hover text-white shadow-cta hover:shadow-cta-hover transition-all py-3 px-8 rounded-full text-center"
            >
              Find My English Bottleneck (Free) →
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

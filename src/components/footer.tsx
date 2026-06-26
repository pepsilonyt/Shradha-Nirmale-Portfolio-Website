'use client';

import React from 'react';
import { NAV } from '@/lib/constants';
import { useAnalytics } from '@/hooks/use-analytics';

export default function Footer() {
  const { trackEvent } = useAnalytics();
  const currentYear = new Date().getFullYear();

  const handleExternalClick = (platform: string) => {
    trackEvent({
      category: 'Footer',
      action: 'click_social_link',
      label: platform,
    });
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent({
      category: 'Footer',
      action: 'click_back_to_top',
    });
  };

  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Footer CTA block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-border">
          <div className="text-center md:text-left space-y-1.5">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground">
              Ready to improve your English?
            </h3>
            <p className="text-sm text-muted">
              Get a verified diagnostics report and custom learning strategy.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('form');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl shadow-cta hover:shadow-cta-hover transition-all cursor-pointer"
          >
            Book a Free Strategy Session
          </button>
        </div>

        {/* Bottom row: Branding, Copyright, Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding */}
          <div className="text-center md:text-left">
            <a
              href="#"
              onClick={handleScrollToTop}
              className="font-display font-bold text-base tracking-tight text-foreground hover:text-accent transition-colors"
            >
              Shradha N.
            </a>
            <p className="text-xs text-muted mt-0.5">
              Learning Strategist & English Educator
            </p>
          </div>

          {/* Center: Copyright */}
          <div className="text-center text-xs text-muted md:order-none order-last space-y-1">
            <p>&copy; {currentYear} Shradha N. All rights reserved. Registered English Educator.</p>
            <p className="text-[10px] text-muted/70">
              Designed by{' '}
              <a
                href="https://www.linkedin.com/in/siddharth-nirmale-a60718354/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors font-medium"
              >
                pepsy
              </a>
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-6">
            <a
              href={NAV.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalClick('LinkedIn')}
              className="text-xs font-semibold text-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={NAV.preply}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalClick('Preply')}
              className="text-xs font-semibold text-muted hover:text-accent transition-colors"
            >
              Preply Profile
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

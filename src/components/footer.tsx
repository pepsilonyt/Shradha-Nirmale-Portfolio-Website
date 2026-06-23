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
    <footer className="border-t border-border bg-background py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding */}
        <div className="text-center md:text-left">
          <a
            href="#"
            onClick={handleScrollToTop}
            className="font-display font-bold text-base tracking-tight text-foreground hover:text-accent transition-colors"
          >
            Shradha N.
          </a>
          <p className="text-sm text-muted mt-1">
            Learning Strategist & English Educator
          </p>
        </div>

        {/* Center: Copyright */}
        <div className="text-center text-sm text-muted md:order-none order-last">
          &copy; {currentYear} Shradha N. All rights reserved. Registered English Educator.
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-6">
          <a
            href={NAV.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleExternalClick('LinkedIn')}
            className="text-sm font-semibold text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={NAV.preply}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleExternalClick('Preply')}
            className="text-sm font-semibold text-muted hover:text-accent transition-colors"
          >
            Preply Profile
          </a>
        </div>
      </div>
    </footer>
  );
}

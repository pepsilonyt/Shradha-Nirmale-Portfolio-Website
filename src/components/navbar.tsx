'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { NAV } from '@/lib/constants';
import { useAnalytics } from '@/hooks/use-analytics';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, buttonLabel: string) => {
    trackEvent({
      category: 'Navigation',
      action: 'click_nav_link',
      label: buttonLabel,
    });
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExternalClick = (platform: string) => {
    trackEvent({
      category: 'Navigation',
      action: 'click_external_profile',
      label: platform,
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Side: Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-bold text-lg md:text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Shradha N. <span className="text-accent font-normal">|</span> <span className="text-muted font-normal text-sm md:text-base">Learning Strategist</span>
        </a>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'problem', label: 'Challenges' },
            { id: 'tracks', label: 'Programs' },
            { id: 'edge', label: 'Methodology' },
            { id: 'vault', label: 'Credentials' },
            { id: 'faq', label: 'FAQ' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id, link.label)}
              className="text-sm font-semibold text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side: Navigation Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExternalClick('LinkedIn')}
            asChild
            className="hidden sm:inline-flex"
          >
            <a href={NAV.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => handleExternalClick('Preply')}
            asChild
          >
            <a href={NAV.preply} target="_blank" rel="noopener noreferrer">
              Book on Preply
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}

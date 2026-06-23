'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { NAV } from '@/lib/constants';
import { useAnalytics } from '@/hooks/use-analytics';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize theme state from DOM class asynchronously to avoid synchronous effect state updates
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    trackEvent({
      category: 'Theme',
      action: 'toggle_theme',
      label: nextTheme,
    });
  };

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
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer flex items-center justify-center w-9 h-9 overflow-hidden text-foreground bg-transparent"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mounted && (
                <motion.div
                  key={theme}
                  initial={{ y: theme === 'light' ? 12 : -12, opacity: 0, rotate: theme === 'light' ? 45 : -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: theme === 'light' ? -12 : 12, opacity: 0, rotate: theme === 'light' ? -45 : 45 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {theme === 'light' ? (
                    <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
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

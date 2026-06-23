'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { NAV } from '@/lib/constants';
import { useAnalytics } from '@/hooks/use-analytics';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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

  const handleMobileNavClick = (sectionId: string, buttonLabel: string) => {
    setIsMenuOpen(false);
    // Defer scrolling to allow the menu drop-down height transitions to close completely
    setTimeout(() => {
      handleNavClick(sectionId, buttonLabel);
    }, 300);
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
        isScrolled || isMenuOpen ? 'glass-nav py-4 shadow-sm' : 'bg-transparent py-6'
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

        {/* Right Side: Navigation Buttons & Hamburger */}
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
            className="hidden sm:inline-flex"
          >
            <a href={NAV.preply} target="_blank" rel="noopener noreferrer">
              Book on Preply
            </a>
          </Button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer flex items-center justify-center w-9 h-9 md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden glass-nav border-t border-border overflow-hidden absolute top-full left-0 right-0 z-40 shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-4 bg-background/95 backdrop-blur-md">
              {[
                { id: 'problem', label: 'Challenges' },
                { id: 'tracks', label: 'Programs' },
                { id: 'edge', label: 'Methodology' },
                { id: 'vault', label: 'Credentials' },
                { id: 'faq', label: 'FAQ' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleMobileNavClick(link.id, link.label)}
                  className="text-left py-2.5 text-base font-semibold text-muted hover:text-foreground border-b border-border/30 last:border-b-0 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/40">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleExternalClick('LinkedIn');
                  }}
                  asChild
                  className="w-full justify-center"
                >
                  <a href={NAV.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleExternalClick('Preply');
                  }}
                  asChild
                  className="w-full justify-center"
                >
                  <a href={NAV.preply} target="_blank" rel="noopener noreferrer">
                    Book on Preply
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SelectOption = {
  value: string;
  label: string;
};

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
  className?: string;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  id,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)} id={id}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full items-center justify-between rounded-2xl border border-border bg-card-bg px-4 text-sm text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-800"
      >
        <span className={cn('block truncate', !selectedOption && 'text-muted/70')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180 text-accent'
          )}
        />
      </button>

      {/* Options Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-border bg-card-bg/95 backdrop-blur-xl p-1.5 shadow-lg shadow-black/5 dark:shadow-black/30 no-scrollbar focus:outline-none"
          >
            {/* Reset / Placeholder option if needed */}
            {placeholder && (
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors',
                  !value ? 'text-accent font-semibold bg-accent/5 dark:bg-accent/10' : 'text-muted'
                )}
              >
                <span>{placeholder}</span>
                {!value && <Check className="h-4 w-4" />}
              </button>
            )}

            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors',
                    isSelected
                      ? 'bg-accent/5 dark:bg-accent/10 text-accent font-semibold'
                      : 'text-foreground'
                  )}
                >
                  <span className="block truncate">{option.label}</span>
                  {isSelected && <Check className="h-4 w-4 text-accent" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
};

export default function MagneticButton({
  children,
  className = '',
  onClick,
  id,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || isReduced) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Max displacement of 12px
    const maxDisplacement = 12;
    const pullX = (clientX - centerX) / (width / 2);
    const pullY = (clientY - centerY) / (height / 2);

    x.set(pullX * maxDisplacement);
    y.set(pullY * maxDisplacement);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    // hover tracking
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: dx,
        y: dy,
      }}
      whileHover={{ scale: isReduced ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-white bg-accent hover:bg-accent-hover rounded-full transition-colors shadow-cta hover:shadow-cta-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

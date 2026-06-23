'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type RevealProps = {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
};

export default function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  
  // Triggers once when 15% of the element is visible
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  if (isReduced || direction === 'none') {
    return <div className={className}>{children}</div>;
  }

  const getDirectionOffsets = () => {
    switch (direction) {
      case 'up':
        return { x: 0, y: 30 };
      case 'down':
        return { x: 0, y: -30 };
      case 'left':
        return { x: 30, y: 0 };
      case 'right':
        return { x: -30, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getDirectionOffsets();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, ...offset }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo equivalent
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

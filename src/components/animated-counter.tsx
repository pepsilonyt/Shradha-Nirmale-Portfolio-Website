'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

type CounterProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  const motionValue = useMotionValue(0);
  // Setting up spring with lower stiffness and higher damping for smooth counting
  const springValue = useSpring(motionValue, {
    stiffness: 40,
    damping: 15,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });
  }, [springValue]);

  // Format value with correct decimal places
  const formattedValue = displayValue.toFixed(decimals);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

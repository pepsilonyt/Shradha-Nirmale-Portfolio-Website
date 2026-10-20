import React from 'react';

/**
 * Official Institutional Partner & Certification Badges
 * Enhanced zoom and scaling to ensure prominent, high-visibility branding.
 */

export function DuolingoPartnerLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:border-[#58CC02]/60 transition-all duration-300 group overflow-hidden ${className}`}
    >
      <img
        src="/logos/duolingo-partner-network.png"
        alt="Duolingo English Test - Global Partner Network"
        className="max-h-[85%] max-w-[92%] w-auto object-contain transition-transform duration-300 group-hover:scale-108"
      />
    </div>
  );
}

export function CambridgeCeltaLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:border-[#A31F34]/60 transition-all duration-300 group overflow-hidden ${className}`}
    >
      <img
        src="/logos/cambridge-english.png"
        alt="Cambridge English Language Assessment"
        className="max-h-[85%] max-w-[95%] w-auto object-contain transition-transform duration-300 group-hover:scale-108"
      />
    </div>
  );
}

export function IHBudapestLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:border-[#1E3A8A]/60 transition-all duration-300 group overflow-hidden ${className}`}
    >
      <img
        src="/logos/ih-budapest.png"
        alt="CELTA at International House Budapest"
        className="max-h-[90%] max-w-[95%] w-auto object-contain transition-transform duration-300 group-hover:scale-108"
      />
    </div>
  );
}

export function CXLOptimizerLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:border-neutral-800 transition-all duration-300 group overflow-hidden ${className}`}
    >
      <img
        src="/logos/cxl-certified-optimizer.png"
        alt="CXL Certified Optimizer"
        className="max-h-[90%] max-w-[90%] w-auto object-contain transition-transform duration-300 group-hover:scale-108"
      />
    </div>
  );
}

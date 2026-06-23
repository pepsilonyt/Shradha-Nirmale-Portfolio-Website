'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronRight, Mail, Video, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SuccessState() {
  
  useEffect(() => {
    // Fire confetti once on mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-border bg-card-bg shadow-card-hover p-5 sm:p-8 md:p-12 text-center space-y-8 relative overflow-hidden"
        >
          {/* Grid background visual */}
          <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none" />

          {/* Success Checkmark Circle */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/25 text-emerald-500 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
          </div>

          {/* Titles */}
          <div className="space-y-3">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight leading-tight">
              English Performance Profile Compiled
            </h2>
            <p className="text-muted text-base max-w-xl mx-auto leading-relaxed">
              Your diagnostic profile is processed. Secure your free strategy session below to map your blueprint in real time.
            </p>
          </div>

          {/* Scheduling Calendar Component Mockup */}
          <div className="p-6 md:p-8 rounded-2xl border border-border bg-neutral-50/50 dark:bg-neutral-900/30 text-left space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-accent" />
                <h3 className="font-display font-bold text-base text-foreground">
                  Select Strategy Call Date
                </h3>
              </div>
              <span className="text-xs font-semibold text-accent bg-accent/5 px-2.5 py-1 rounded-full border border-accent/10">
                IST / EST Configured
              </span>
            </div>

            {/* Calendar Embed Mockup */}
            <div className="bg-card-bg dark:bg-neutral-900/40 border border-border rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-neutral-50/20 dark:bg-neutral-950/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-2">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display font-bold text-lg text-foreground">
                  Book Strategy Audit & Blueprint Setup
                </p>
                <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
                  A calendar slot will open on Preply platform or via Google Meet. Secure your time.
                </p>
              </div>

              {/* Fake calendar grid just to show premium UI structure */}
              <div className="grid grid-cols-7 gap-2 max-w-xs w-full pt-4">
                {Array.from({ length: 14 }).map((_, i) => {
                  const day = i + 10;
                  const isAvailable = [11, 13, 14, 17, 18, 20].includes(day);
                  return (
                    <div
                      key={i}
                      className={`p-2 text-xs font-semibold rounded-lg text-center cursor-pointer transition-all ${
                        isAvailable
                          ? 'bg-accent/5 text-accent border border-accent/20 hover:bg-accent hover:text-white'
                          : 'text-neutral-300 dark:text-neutral-700 pointer-events-none'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 w-full">
                <a
                  href="https://preply.com/en/tutor/7009237"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center w-full px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <span>Go to Booking Calendar on Preply</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Next Steps / Risk Reversals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left border-t border-border">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground">1. Email Sent</h4>
                <p className="text-[11px] text-muted leading-relaxed mt-0.5">
                  Check your inbox for a summary copy of your diagnostics.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Video className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground">2. 1-on-1 Strategy</h4>
                <p className="text-[11px] text-muted leading-relaxed mt-0.5">
                  A private diagnostic call to isolate specific error structures.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground">3. Guarantee</h4>
                <p className="text-[11px] text-muted leading-relaxed mt-0.5">
                  100% free audit. No obligation to purchase packages.
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

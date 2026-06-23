'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { PAIN_CARDS } from '@/lib/constants';
import { GraduationCap, Laptop, Briefcase, HelpCircle, ArrowRight } from 'lucide-react';
import SectionReveal from '../section-reveal';

export default function Empathy() {
  
  // Icon selector based on config id
  const getIcon = (id: string) => {
    switch (id) {
      case 'celpip':
        return <GraduationCap className="h-8 w-8 text-accent" />;
      case 'det':
        return <Laptop className="h-8 w-8 text-accent" />;
      case 'career':
        return <Briefcase className="h-8 w-8 text-accent" />;
      default:
        return <HelpCircle className="h-8 w-8 text-accent" />;
    }
  };

  return (
    <section id="problem" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <Badge text="The Real Challenge" />
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mt-4 leading-tight">
            Where is your English getting stuck?
          </h2>
          <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
            Traditional coaching forces you to memorize rules. But real progress requires identifying the exact cognitive bottleneck blocking you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAIN_CARDS.map((card, idx) => (
            <SectionReveal key={card.id} direction="up" delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className="h-full border border-border bg-white shadow-card hover:shadow-card-hover transition-all duration-300 rounded-3xl overflow-hidden flex flex-col justify-between">
                  <CardContent className="p-8 md:p-10 flex flex-col h-full justify-between">
                    
                    {/* Top part: Pain Point */}
                    <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center flex-shrink-0">
                        {getIcon(card.id)}
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                          {card.title}
                        </h3>
                        <p className="text-muted text-sm md:text-base leading-relaxed">
                          {card.pain}
                        </p>
                      </div>
                    </div>

                    {/* Divider line */}
                    <div className="w-full h-px bg-border my-6" />

                    {/* Bottom part: Shradha's Solution */}
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider">
                        <span>The Strategy</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
                        {card.solution}
                      </p>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

// Simple internal Badge component
function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 text-xs font-bold text-accent uppercase tracking-wider">
      {text}
    </span>
  );
}

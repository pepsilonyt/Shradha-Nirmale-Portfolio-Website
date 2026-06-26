'use client';

import React, { useState } from 'react';
import { FAQS } from '@/lib/constants';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import SectionReveal from '../section-reveal';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Get all unique categories (+ 'All')
  const categories = ['All', ...Array.from(new Set(FAQS.map((faq) => faq.category)))];

  // Filter FAQs based on active category
  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faq" className="py-24 md:py-32 bg-background relative border-t border-border">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-accent/5 border border-accent/10 text-xs font-bold text-accent uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mt-4 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted text-base md:text-lg mt-3">
            Everything you need to know about the diagnostic audits, lesson structure, scheduling, and payment methods.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-accent border-accent text-white shadow-sm'
                  : 'bg-card-bg border-border text-muted hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <SectionReveal direction="up">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border border-border rounded-2xl px-6 bg-neutral-50/20 dark:bg-neutral-900/10 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors duration-200">
                <AccordionTrigger className="font-display font-semibold text-base py-5 text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base leading-relaxed text-muted pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>

        {/* Still have questions CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-border bg-neutral-50/50 dark:bg-neutral-900/20 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-lg md:text-xl text-foreground">
            Still have questions?
          </h3>
          <p className="text-muted text-sm max-w-md mx-auto">
            Book a complimentary strategy call. I will walk you through your diagnostics live and configure your custom roadmap.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Get Free Diagnostic Audit</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

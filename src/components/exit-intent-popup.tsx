'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useExitIntent } from '@/hooks/use-exit-intent';
import { useAnalytics } from '@/hooks/use-analytics';

type ExitIntentPopupProps = {
  onCTA: () => void;
};

export default function ExitIntentPopup({ onCTA }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  useExitIntent(() => {
    setIsOpen(true);
    trackEvent({
      category: 'Exit Intent',
      action: 'trigger_exit_intent',
    });
  });

  const handleCTAClick = () => {
    setIsOpen(false);
    sessionStorage.setItem('exitShown', 'true');
    trackEvent({
      category: 'Exit Intent',
      action: 'click_exit_cta',
    });
    onCTA();
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('exitShown', 'true');
    trackEvent({
      category: 'Exit Intent',
      action: 'close_exit_popup',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-md p-8 rounded-3xl border border-border bg-white shadow-card-hover text-center">
        <DialogHeader className="items-center">
          <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl mb-4">
            💡
          </div>
          <DialogTitle className="font-display font-bold text-2xl tracking-tight text-foreground text-center">
            {"Wait! Don't leave empty-handed"}
          </DialogTitle>
          <DialogDescription className="text-muted text-base mt-2 text-center">
            Find the exact gap stopping you from getting a higher CELPIP/DET score or moving forward in your career. Get a 100% free diagnostics blueprint.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={handleCTAClick}
            className="w-full font-display font-semibold py-3 bg-accent hover:bg-accent-hover text-white rounded-full shadow-cta hover:shadow-cta-hover transition-all"
          >
            Find My English Bottleneck Now →
          </Button>
          <button
            onClick={handleClose}
            className="text-sm font-medium text-muted hover:text-foreground transition-colors py-2 cursor-pointer"
          >
            {"No thanks, I'll keep guessing"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

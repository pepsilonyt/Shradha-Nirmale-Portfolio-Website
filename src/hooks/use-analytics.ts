import { useEffect } from 'react';

type EventParams = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

export function useAnalytics() {
  const trackEvent = ({ category, action, label, value }: EventParams) => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as {
        gtag?: (
          event: string,
          action: string,
          params: { event_category: string; event_label?: string; value?: number }
        ) => void;
      };
      if (win.gtag) {
        win.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
        return;
      }
    }
    console.log('[Analytics Event]', { category, action, label, value });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const depths = [25, 50, 75, 100];
    const firedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const pct = Math.round((window.scrollY / scrollHeight) * 100);

      depths.forEach((depth) => {
        if (pct >= depth && !firedDepths.has(depth)) {
          firedDepths.add(depth);
          trackEvent({
            category: 'Engagement',
            action: 'scroll_depth',
            label: `${depth}%`,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { trackEvent };
}

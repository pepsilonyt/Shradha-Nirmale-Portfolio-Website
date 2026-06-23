import { useEffect } from 'react';

export function useExitIntent(callback: () => void) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('exitShown')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // clientY < 5 usually detects the mouse moving out of the top of the browser viewport
      if (e.clientY < 5) {
        callback();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [callback]);
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileStickyCTAProps {
  phoneNumber?: string;
  label?: string;
}

export const MobileStickyCTA = ({
  phoneNumber = '+918012345678',
  label = 'Call Us Now'
}: MobileStickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    // Skip if dismissed or already have a pending rAF
    if (isDismissed) return;

    // Throttle via requestAnimationFrame — fires at most once per frame
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      // Only update state if the visibility threshold actually changed
      const shouldShow = scrollY > 300;
      const wasShowing = lastScrollY.current > 300;

      if (shouldShow !== wasShowing) {
        setIsVisible(shouldShow);
      }
      lastScrollY.current = scrollY;
      rafRef.current = 0;
    });
  }, [isDismissed]);

  useEffect(() => {
    // Only attach scroll listener on mobile viewports
    const mql = window.matchMedia('(max-width: 767px)');
    if (!mql.matches) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  if (isDismissed) return null;

  return (
    <div
      className={cn(
        'md:hidden fixed bottom-4 left-4 right-4 z-50 transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      )}
    >
      <div className="bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-between p-3 pr-4">
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-3 flex-1"
          aria-label={label}
        >
          <div className="bg-primary-foreground/20 p-3 rounded-full">
            <Phone className="w-5 h-5" />
          </div>
          <span className="font-medium">{label}</span>
        </a>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
          aria-label="Dismiss call button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

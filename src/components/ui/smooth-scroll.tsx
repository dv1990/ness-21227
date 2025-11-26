import { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
  speed?: number;
  enabled?: boolean;
}

export const SmoothScroll = ({ children, speed = 0.1, enabled = true }: SmoothScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef(false);
  const targetScrollTop = useRef(0);
  const currentScrollTop = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const smoothScroll = () => {
      currentScrollTop.current = lerp(
        currentScrollTop.current,
        targetScrollTop.current,
        speed
      );

      if (Math.abs(targetScrollTop.current - currentScrollTop.current) > 0.5) {
        window.scrollTo(0, currentScrollTop.current);
        rafId.current = requestAnimationFrame(smoothScroll);
      } else {
        scrollingRef.current = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollTop.current = Math.max(
        0,
        Math.min(
          targetScrollTop.current + e.deltaY,
          document.documentElement.scrollHeight - window.innerHeight
        )
      );

      if (!scrollingRef.current) {
        scrollingRef.current = true;
        rafId.current = requestAnimationFrame(smoothScroll);
      }
    };

    const handleScroll = () => {
      if (!scrollingRef.current) {
        currentScrollTop.current = window.scrollY;
        targetScrollTop.current = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed, enabled]);

  return <div ref={containerRef}>{children}</div>;
};

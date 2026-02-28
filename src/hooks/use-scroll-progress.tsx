/**
 * useScrollProgress — container-relative scroll progress (0 → 1)
 *
 * Returns a value from 0 to 1 representing how far the user has scrolled
 * through a container. Designed for scroll-linked animations (sticky heroes,
 * parallax sections, reveal sequences).
 *
 * For a 200vh container with 100vh of sticky content:
 *   scrollable distance = 200vh - 100vh = 100vh
 *   progress = scrolled / scrollable (clamped 0-1)
 *
 * Uses RAF throttling for 60fps performance. Respects prefers-reduced-motion.
 */

import { useEffect, useState, RefObject, useCallback } from "react";

export const useScrollProgress = (
  containerRef: RefObject<HTMLElement>,
  options: { disabled?: boolean } = {},
) => {
  const { disabled = false } = options;
  const [progress, setProgress] = useState(0);

  const calculate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollDistance = rect.height - viewportHeight;

    if (scrollDistance <= 0) {
      setProgress(0);
      return;
    }

    // How far we've scrolled past the container's top edge
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(scrolled / scrollDistance, 1));
    setProgress(p);
  }, [containerRef]);

  useEffect(() => {
    if (disabled) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(0);
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculate();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    calculate();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calculate, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calculate);
    };
  }, [calculate, disabled]);

  return progress;
};

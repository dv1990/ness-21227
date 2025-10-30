import React, { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { threshold: 0.3, once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(value * easeOutQuart);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          // Final update to ensure exact value
          setCount(value);
        }
      };

      // Delay animation start slightly to prevent all counters animating at once
      const delayTimer = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
      }, Math.random() * 100);

      return () => {
        clearTimeout(delayTimer);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [isInView, value, duration]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

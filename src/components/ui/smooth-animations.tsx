/**
 * Apple-Level Smooth Animations - 120fps Performance
 * Micro-interactions with perfect timing and easing
 */

import React, { useRef, useEffect } from 'react';
import { useInView } from '@/hooks/use-in-view';

interface SmoothFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

// Ultra-smooth fade in animation
export const SmoothFade: React.FC<SmoothFadeProps> = ({
  children,
  delay = 0,
  duration = 800,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1, once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      const element = ref.current;
      element.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      element.style.transitionDelay = `${delay}ms`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0px) scale(1)';
    }
  }, [isInView, delay, duration]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(20px) scale(0.95)',
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

// Magnetic button effect
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 50;
      
      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = (x / distance) * strength * 8;
        const moveY = (y / distance) * strength * 8;
        
        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onClick={onClick}
      style={{ willChange: 'transform' }}
    >
      {children}
    </button>
  );
};

// Parallax container for smooth scrolling effects
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = scrolled * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    // Throttled scroll handler for 120fps
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

// Smooth reveal on scroll with stagger
interface StaggerRevealProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  stagger = 100,
  className = ''
}) => {
  const items = React.Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, childIndex) => (
        <SmoothFade
          key={`smooth-fade-${childIndex}`}
          delay={childIndex * stagger}
          duration={600}
        >
          {child}
        </SmoothFade>
      ))}
    </div>
  );
};
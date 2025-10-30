import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
  hover?: 'lift' | 'glow' | 'scale' | 'none';
  onClick?: () => void;
}

export const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0, 
  animation = 'fade-up',
  hover = 'lift',
  onClick,
  ...props 
}: AnimatedCardProps) => {
  const { elementRef, isVisible } = useScrollAnimation();

  const animationClasses = {
    'fade-up': isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-8',
    'fade-in': isVisible 
      ? 'opacity-100' 
      : 'opacity-0',
    'scale-in': isVisible 
      ? 'opacity-100 scale-100' 
      : 'opacity-0 scale-95',
    'slide-left': isVisible 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 translate-x-8',
    'slide-right': isVisible 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 -translate-x-8'
  };

  const hoverClasses = {
    'lift': 'hover:scale-105 hover:shadow-elegant hover:-translate-y-2',
    'glow': 'hover:shadow-glow hover:ring-2 hover:ring-primary/20',
    'scale': 'hover:scale-[1.02]',
    'none': ''
  };

  return (
    <Card
      ref={elementRef as any}
      className={cn(
        'glass-card transition-all duration-700 ease-out',
        animationClasses[animation],
        hoverClasses[hover],
        className
      )}
      onClick={onClick}
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity'
      }}
      {...props}
    >
      {children}
    </Card>
  );
};
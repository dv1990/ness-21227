import { ReactNode, Children, cloneElement, ReactElement } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-in';
}

export const StaggerContainer = ({ 
  children, 
  staggerDelay = 100,
  className,
  animation = 'fade-up'
}: StaggerContainerProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationClasses = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-in': 'opacity-0',
    'scale-in': 'opacity-0 scale-95'
  };

  const activeAnimationClasses = {
    'fade-up': 'opacity-100 translate-y-0',
    'fade-in': 'opacity-100',
    'scale-in': 'opacity-100 scale-100'
  };

  const childArray = Children.toArray(children);

  return (
    <div ref={ref as any} className={className}>
      {childArray.map((child, index) => {
        if (!child || typeof child !== 'object') {
          return child;
        }

        return cloneElement(child as ReactElement, {
          ...((child as ReactElement).props || {}),
          className: cn(
            (child as ReactElement).props?.className,
            'transition-all duration-700 ease-out',
            isIntersecting 
              ? activeAnimationClasses[animation]
              : animationClasses[animation]
          ),
          style: {
            ...((child as ReactElement).props?.style || {}),
            transitionDelay: `${index * staggerDelay}ms`,
            willChange: 'transform, opacity'
          },
          key: index
        });
      })}
    </div>
  );
};

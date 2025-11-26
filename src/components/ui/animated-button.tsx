import { useState, MouseEvent } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  animation?: 'scale' | 'glow' | 'slide' | 'none';
  ripple?: boolean;
}

export const AnimatedButton = ({ 
  children, 
  className, 
  animation = 'scale',
  ripple = true,
  onClick,
  ...props 
}: AnimatedButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const animationClasses = {
    'scale': 'hover:scale-105 active:scale-95',
    'glow': 'hover:shadow-glow hover:ring-2 hover:ring-primary/20',
    'slide': 'hover:translate-x-1',
    'none': ''
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }

    onClick?.(e);
  };

  return (
    <Button
      className={cn(
        'relative overflow-hidden transition-all duration-300 ease-out interactive',
        animationClasses[animation],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      
      {ripple && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '600ms'
          }}
        />
      ))}
    </Button>
  );
};
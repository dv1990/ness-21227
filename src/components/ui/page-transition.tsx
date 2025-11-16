import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from './loading-spinner';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={cn('relative', className)}>
      {/* Loading overlay */}
      <div 
        className={cn(
          'fixed inset-0 bg-background z-50 transition-opacity duration-300',
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" label="Loading page..." />
        </div>
      </div>

      {/* Page content */}
      <div 
        className={cn(
          'transition-all duration-500 ease-out',
          isLoading 
            ? 'opacity-0 translate-y-4' 
            : 'opacity-100 translate-y-0'
        )}
      >
        {children}
      </div>
    </div>
  );
};
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3'
};

/**
 * Accessible loading spinner component
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  label = 'Loading...'
}) => {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <div
        className={cn(
          "border-primary border-t-transparent rounded-full animate-spin",
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  label?: string;
  children: React.ReactNode;
}

/**
 * Loading overlay component that displays a spinner over content
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  label = 'Loading...',
  children
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg"
          aria-busy="true"
        >
          <LoadingSpinner size="lg" label={label} />
        </div>
      )}
    </div>
  );
};

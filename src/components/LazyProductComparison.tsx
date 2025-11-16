import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const LazyProductComparisonComponent = lazy(() => 
  import('./ProductComparison').then(module => ({ default: module.ProductComparison }))
);

interface LazyProductComparisonProps {
  [key: string]: unknown;
}

export const LazyProductComparison = (props: LazyProductComparisonProps) => {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading product comparison..." />
      </div>
    }>
      <LazyProductComparisonComponent {...props} />
    </Suspense>
  );
};

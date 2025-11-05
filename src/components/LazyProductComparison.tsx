import { lazy, Suspense } from 'react';

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
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LazyProductComparisonComponent {...props} />
    </Suspense>
  );
};

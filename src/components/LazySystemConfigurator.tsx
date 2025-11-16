import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const SystemConfigurator = lazy(() => import('./SystemConfigurator'));

interface LazySystemConfiguratorProps {
  [key: string]: unknown;
}

export const LazySystemConfigurator = (props: LazySystemConfiguratorProps) => {
  return (
    <Suspense fallback={
      <div className="min-h-[500px] flex items-center justify-center bg-muted/5 rounded-lg">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" label="Loading configurator..." />
          <p className="text-sm text-muted-foreground">Setting up your system designer...</p>
        </div>
      </div>
    }>
      <SystemConfigurator {...props} />
    </Suspense>
  );
};

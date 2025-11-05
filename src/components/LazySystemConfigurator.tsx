import { lazy, Suspense } from 'react';

const SystemConfigurator = lazy(() => import('./SystemConfigurator'));

interface LazySystemConfiguratorProps {
  [key: string]: unknown;
}

export const LazySystemConfigurator = (props: LazySystemConfiguratorProps) => {
  return (
    <Suspense fallback={
      <div className="min-h-[500px] flex items-center justify-center bg-muted/5 rounded-lg">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading configurator...</p>
        </div>
      </div>
    }>
      <SystemConfigurator {...props} />
    </Suspense>
  );
};

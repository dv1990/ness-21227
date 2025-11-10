import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function ServiceWorkerPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    if (offlineReady || needRefresh) {
      setShowPrompt(true);
    }
  }, [offlineReady, needRefresh]);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] max-w-md">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">
            {offlineReady ? 'App ready to work offline' : 'New content available'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {offlineReady
              ? 'The app is now cached and ready to use offline.'
              : 'A new version is available. Refresh to update.'}
          </p>
        </div>
        
        <div className="flex gap-2">
          {needRefresh && (
            <Button
              size="sm"
              onClick={() => updateServiceWorker(true)}
              className="flex-1"
            >
              Reload
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={close}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

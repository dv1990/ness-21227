import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 5 seconds of page load
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installed');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Installation error:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // iOS install instructions
  if (isIOS && showPrompt) {
    return (
      <Card className={cn(
        'fixed bottom-4 left-4 right-4 z-50 shadow-xl md:max-w-md md:left-auto md:right-4',
        'animate-in slide-in-from-bottom-5 duration-300'
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" aria-hidden="true" />
                Install NESS App
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Install this app for a better experience. Tap the Share button 
                <span className="inline-block mx-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="inline">
                    <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z"/>
                  </svg>
                </span>
                then "Add to Home Screen".
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-muted rounded transition-colors"
              aria-label="Dismiss install prompt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Android/Desktop install prompt
  if (deferredPrompt && showPrompt) {
    return (
      <Card className={cn(
        'fixed bottom-4 left-4 right-4 z-50 shadow-xl md:max-w-md md:left-auto md:right-4',
        'animate-in slide-in-from-bottom-5 duration-300'
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" aria-hidden="true" />
                Install NESS App
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get quick access and a native app experience. Works offline!
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={handleInstall}
                  size="sm"
                  className="flex-1"
                >
                  Install
                </Button>
                <Button 
                  onClick={handleDismiss}
                  variant="outline"
                  size="sm"
                >
                  Later
                </Button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-muted rounded transition-colors"
              aria-label="Dismiss install prompt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Check, Smartphone, Zap, Wifi, HardDrive } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
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
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Installation error:', error);
    }
  };

  return (
    <Layout>
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light text-foreground mb-6">
              Install NESS App
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the full NESS experience with our Progressive Web App. 
              Fast, reliable, and works offline.
            </p>
          </div>

          {isInstalled ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Already Installed!</h2>
                <p className="text-muted-foreground">
                  You're using the NESS app. Enjoy the full experience!
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="max-w-md mx-auto mb-12">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Download className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">
                      {isIOS ? 'Add to Home Screen' : 'Install Now'}
                    </h2>
                    <p className="text-muted-foreground">
                      {isIOS 
                        ? 'Follow the steps below to install the NESS app on your device'
                        : 'Click the button below to install the NESS app'
                      }
                    </p>
                  </div>

                  {isIOS ? (
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">1</span>
                        </div>
                        <p>
                          Tap the <strong>Share button</strong> 
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="inline mx-1">
                            <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z"/>
                          </svg>
                          in your browser toolbar
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">2</span>
                        </div>
                        <p>Scroll down and tap <strong>"Add to Home Screen"</strong></p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">3</span>
                        </div>
                        <p>Tap <strong>"Add"</strong> in the top right corner</p>
                      </div>
                    </div>
                  ) : deferredPrompt ? (
                    <Button 
                      onClick={handleInstall}
                      size="lg"
                      className="w-full"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Install NESS App
                    </Button>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground">
                      <p>
                        Installation is available in supported browsers like Chrome, Edge, or Samsung Internet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Benefits */}
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Native App Feel</h3>
                        <p className="text-sm text-muted-foreground">
                          Full-screen experience without browser UI
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Lightning Fast</h3>
                        <p className="text-sm text-muted-foreground">
                          Instant loading with optimized caching
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Wifi className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Works Offline</h3>
                        <p className="text-sm text-muted-foreground">
                          Access content even without internet
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <HardDrive className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Minimal Storage</h3>
                        <p className="text-sm text-muted-foreground">
                          Uses less space than native apps
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PWAInstall;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { safeLocalStorage } from "@/lib/safe-storage";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = safeLocalStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    safeLocalStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    safeLocalStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-foreground text-background border-t border-border/10 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Cookie className="w-6 h-6 flex-shrink-0 mt-1 text-primary" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
              <p className="text-sm text-background/80 leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and provide 
                personalized content. By clicking "Accept All", you consent to our use of cookies. 
                You can manage your preferences or learn more in our{" "}
                <Link 
                  to="/cookie-policy" 
                  className="underline hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="bg-transparent border-background/20 text-background hover:bg-background/10 hover:text-background"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Accept All
            </Button>
          </div>

          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 p-2 hover:bg-background/10 rounded-full transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

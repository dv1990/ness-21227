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
      // Delay banner by 5 seconds for less intrusive experience
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 5000);
      return () => clearTimeout(timer);
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
    <div className="fixed bottom-4 left-4 z-50 max-w-sm p-4 bg-white/95 backdrop-blur-sm text-graphite rounded-xl border border-border/20 shadow-lg animate-slide-up">
      <div className="flex items-start gap-3">
        <Cookie className="w-5 h-5 flex-shrink-0 mt-0.5 text-energy" aria-hidden="true" />
        <div className="flex-1 space-y-3">
          <p className="text-sm text-graphite/80 leading-relaxed">
            We use cookies to improve your experience.{" "}
            <Link 
              to="/cookie-policy" 
              className="underline hover:text-energy transition-colors"
            >
              Learn more
            </Link>
          </p>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleAccept}
              size="sm"
              className="bg-graphite hover:bg-graphite/90 text-white text-xs px-3 h-8"
            >
              Accept
            </Button>
            <Button
              onClick={handleDecline}
              variant="ghost"
              size="sm"
              className="text-graphite/60 hover:text-graphite text-xs px-3 h-8"
            >
              Decline
            </Button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="p-1 hover:bg-graphite/5 rounded-full transition-colors"
          aria-label="Close cookie banner"
        >
          <X className="w-4 h-4 text-graphite/40" />
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;

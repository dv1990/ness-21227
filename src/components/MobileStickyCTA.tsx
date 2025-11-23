import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileStickyCTAProps {
  phoneNumber?: string;
  label?: string;
}

export const MobileStickyCTA = ({ 
  phoneNumber = '+918012345678',
  label = 'Call Us Now'
}: MobileStickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show CTA after scrolling 300px
    const handleScroll = () => {
      if (!isDismissed && window.scrollY > 300) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={cn(
        'md:hidden fixed bottom-4 left-4 right-4 z-50 transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      )}
    >
      <div className="bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-between p-3 pr-4">
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-3 flex-1"
          aria-label={label}
        >
          <div className="bg-primary-foreground/20 p-3 rounded-full">
            <Phone className="w-5 h-5" />
          </div>
          <span className="font-medium">{label}</span>
        </a>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
          aria-label="Dismiss call button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NucuSectionProps {
  nucuPcb: string;
}

const NucuSection = ({ nucuPcb }: NucuSectionProps) => {
  return (
    <section 
      className="relative py-32 lg:py-40 bg-charcoal overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - NUCU PCB with animations */}
          <div 
            className="relative group cursor-default order-1 mt-12 lg:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <img 
              src={nucuPcb} 
              alt="NUCU Control Board - Premium AI-powered energy management" 
              className="w-full h-auto object-contain lg:group-hover:scale-[1.02] transition-transform duration-500 ease-out" 
              loading="lazy"
            />
          </div>

          {/* Right Column - Typography */}
          <div className="space-y-7 lg:space-y-8 order-2 text-center lg:text-left">
            <div className="space-y-7 lg:space-y-8">
              <h1 
                className="text-[40px] leading-[1.1] lg:text-[clamp(56px,5vw,64px)] font-bold text-primary-foreground tracking-[-0.5px] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
                style={{ fontFamily: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Meet NUCU
              </h1>
              
              <div 
                className="space-y-5 text-[18px] lg:text-[clamp(20px,1.5vw,22px)] text-primary-foreground/80 leading-[1.6] max-w-[560px] mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
                style={{ fontFamily: "'SF Pro Text', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <p>The family doctor for your home's energy.</p>
                <p>Quietly observing, always protecting.</p>
                <p>Keeping power clean, green, and deeply safe.</p>
                <p>So your home feels alive — confident, cared for, and calm.</p>
              </div>
            </div>

            <div className="pt-4 lg:pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <Button 
                size="lg" 
                variant="hero"
                className="h-[44px] lg:h-[48px] px-8 lg:px-10 text-base lg:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal w-full lg:w-auto group"
                style={{ fontFamily: "'SF Pro Text', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                See How NUCU Works
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NucuSection;

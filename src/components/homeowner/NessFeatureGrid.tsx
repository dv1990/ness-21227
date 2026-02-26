import { memo, useState } from 'react';
import { Battery, Zap, Shield, Sun, Gauge, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStaggeredIntersection } from '@/hooks/use-intersection-observer';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-home-solar.webp';

const NessFeatureGrid = () => {
  const { ref, isItemVisible } = useStaggeredIntersection(11, 80);

  return (
    <section className="py-32 bg-gradient-to-b from-background via-energy-light/30 to-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-foreground">
            Built for <span className="text-energy-bright font-semibold">Performance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every detail engineered for reliability, efficiency, and peace of mind
          </p>
        </div>

        {/* Uniform Aligned Grid */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          
          {/* Hero Tile - Spans 2 cols + 2 rows on lg */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <HeroTile isVisible={isItemVisible(0)} />
          </div>
              
          <div>
            <FeatureTile icon={<Zap className="w-8 h-8" />} title="Max. 10 kW AC Output" subtitle="Hybrid" description="Seamless power delivery" isVisible={isItemVisible(1)} iconColor="text-energy-bright" />
          </div>

          <div>
            <FeatureTile icon={<Gauge className="w-8 h-8" />} title="Cut Bills by 40%" subtitle="Smart Solar Usage" description="Lower monthly costs" isVisible={isItemVisible(2)} iconColor="text-energy" />
          </div>

          <div>
            <FeatureTile icon={<Zap className="w-8 h-8" />} title="Plug-and-Play" subtitle="Installation" description="Ready in hours, not days" isVisible={isItemVisible(3)} iconColor="text-energy-bright" />
          </div>

          <div>
            <FeatureTile icon={<Battery className="w-8 h-8" />} title="All-in-One Design" subtitle="Integrated System" description="BMS, modules, electronics" isVisible={isItemVisible(4)} iconColor="text-energy" />
          </div>

          <div>
            <FeatureTile icon={<Shield className="w-8 h-8" />} title="IEC 62619 Certified" subtitle="Global Standards" description="Premium certification" isVisible={isItemVisible(5)} iconColor="text-energy-bright" featured />
          </div>

          <div>
            <FeatureTile icon={<Award className="w-8 h-8" />} title="10-Year Warranty" subtitle="Peace of Mind" description="Complete protection" isVisible={isItemVisible(6)} iconColor="text-energy" featured />
          </div>

          <div>
            <FeatureTile icon={<Shield className="w-8 h-8" />} title="IP55" subtitle="Weather Resistant" description="Built for outdoors" highlight="Protected" isVisible={isItemVisible(7)} iconColor="text-energy-bright" />
          </div>

          <div>
            <FeatureTile icon={<Gauge className="w-8 h-8" />} title="Smart Meter" subtitle="Compatible" description="Real-time monitoring" isVisible={isItemVisible(8)} iconColor="text-energy" />
          </div>

          <div>
            <FeatureTile icon={<Battery className="w-8 h-8" />} title="6000-cycle LFP" subtitle="Battery Life" description="Long-lasting power" highlight="Premium" isVisible={isItemVisible(9)} iconColor="text-energy-bright" />
          </div>

          <div>
            <FeatureTile icon={<Sun className="w-8 h-8" />} title="15 kWp Solar Input" subtitle="3 MPPT" description="Maximum efficiency" isVisible={isItemVisible(10)} iconColor="text-energy" />
          </div>

        </div>
      </div>
    </section>
  );
};

// Hero Tile Component
const HeroTile = memo(({ isVisible }: { isVisible: boolean }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "rounded-3xl overflow-hidden border border-energy/20 relative group hover:border-energy/40 transition-all duration-700 h-full",
        "hover:shadow-2xl hover:shadow-energy/20 hover:scale-[1.02]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: '0ms' }}
    >
      <div className="aspect-square md:aspect-auto md:h-full relative min-h-[400px]">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted/20 animate-pulse" />
        )}
        
        <img 
          src={heroImage} 
          alt="Modern home with solar panels and NESS battery system" 
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          fetchPriority="high"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-energy/30 rounded-full border border-energy/50 shadow-xl shadow-energy/30 backdrop-blur-sm">
              <span className="text-sm font-semibold text-pearl">NESS Hybrid System</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-light tracking-tight text-pearl leading-tight" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
              Your home.<br/>
              <span className="text-energy-bright font-semibold">Powered differently.</span>
            </h3>
            <p className="text-lg text-pearl font-light max-w-md" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.5)' }}>
              Premium solar battery system designed for modern architectural homes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroTile.displayName = 'HeroTile';

interface FeatureTileProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  highlight?: string;
  isVisible: boolean;
  iconColor?: string;
  featured?: boolean;
}

const FeatureTile = memo(({ 
  icon, title, subtitle, description, highlight, isVisible, 
  iconColor = "text-energy", featured = false 
}: FeatureTileProps) => {
  return (
    <div 
      className={cn(
        "rounded-2xl bg-gradient-to-br from-card via-card to-energy-light/5 border overflow-hidden interactive h-full",
        "hover:shadow-xl hover:shadow-energy/20 transition-all duration-700",
        "hover:scale-105 hover:-translate-y-2 group cursor-default",
        "backdrop-blur-sm relative",
        featured 
          ? "border-energy/40 ring-2 ring-energy/20" 
          : "border-border/50 hover:border-energy/30",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
    >
      <div className="relative p-6 lg:p-8">
        <div className="space-y-5">
          <div className={cn(
            "relative inline-block transition-all duration-500",
            iconColor,
            "group-hover:scale-125 group-hover:rotate-6",
            featured && "drop-shadow-[0_0_8px_hsl(var(--energy))]"
          )}>
            {icon}
            <div className={cn(
              "absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500",
              iconColor
            )}>
              {icon}
            </div>
          </div>
          
          <div className="space-y-3">
            {highlight && (
              <Badge variant="default" className="bg-energy/20 text-energy-bright border-energy/40 hover:bg-energy/30">
                {highlight}
              </Badge>
            )}
            <h4 className={cn(
              "text-2xl lg:text-3xl font-light text-foreground leading-tight transition-colors duration-300",
              "group-hover:text-energy-bright"
            )}>
              {title}
            </h4>
            <p className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {subtitle}
            </p>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-energy/10 via-transparent to-energy-bright/10 rounded-2xl" />
      </div>
    </div>
  );
});

FeatureTile.displayName = 'FeatureTile';

export default memo(NessFeatureGrid);

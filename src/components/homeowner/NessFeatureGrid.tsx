import { memo, useState } from 'react';
import { Battery, Zap, Shield, Sun, Gauge, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-home-solar.webp';

const NessFeatureGrid = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-energy-light/30 to-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
          
          {/* Hero Tile - Spans 2x2 on larger screens */}
          <HeroTile />
              

          {/* Tile 1 - Max Output */}
          <FeatureTile
            icon={<Zap className="w-8 h-8" />}
            title="Max. 10 kW AC Output"
            subtitle="Hybrid"
            description="Seamless power delivery"
          />

          {/* Tile 2 - Savings */}
          <FeatureTile
            icon={<Gauge className="w-8 h-8" />}
            title="Cut Bills by 40%"
            subtitle="Smart Solar Usage"
            description="Lower monthly costs"
          />

          {/* Tile 3 - Plug-and-Play */}
          <FeatureTile
            icon={<Zap className="w-8 h-8" />}
            title="Plug-and-Play"
            subtitle="Installation"
            description="Ready in hours, not days"
          />

          {/* Tile 4 - All-in-One */}
          <FeatureTile
            icon={<Battery className="w-8 h-8" />}
            title="All-in-One Design"
            subtitle="Integrated System"
            description="BMS, modules, electronics"
          />

          {/* Tile 5 - Certification */}
          <FeatureTile
            icon={<Shield className="w-8 h-8" />}
            title="IEC 62619 Certified"
            subtitle="Global Standards"
            description="Premium certification"
          />

          {/* Tile 6 - Warranty */}
          <FeatureTile
            icon={<Award className="w-8 h-8" />}
            title="10-Year Warranty"
            subtitle="Peace of Mind"
            description="Complete protection"
          />

          {/* Tile 7 - Outdoor Protection */}
          <FeatureTile
            icon={<Shield className="w-8 h-8" />}
            title="IP55"
            subtitle="Weather Resistant"
            description="Built for outdoors"
            highlight="Protected"
          />

          {/* Tile 8 - Smart Meter */}
          <FeatureTile
            icon={<Gauge className="w-8 h-8" />}
            title="Smart Meter"
            subtitle="Compatible"
            description="Real-time monitoring"
          />

          {/* Tile 9 - Battery Life */}
          <FeatureTile
            icon={<Battery className="w-8 h-8" />}
            title="6000-cycle LFP"
            subtitle="Battery Life"
            description="Long-lasting power"
            highlight="Premium"
          />

          {/* Tile 10 - Solar Input */}
          <FeatureTile
            icon={<Sun className="w-8 h-8" />}
            title="15 kWp Solar Input"
            subtitle="3 MPPT"
            description="Maximum efficiency"
          />

        </div>
      </div>
    </section>
  );
};

// Hero Tile Component - loads immediately for optimal LCP
const HeroTile = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden border border-energy/20 relative group hover:border-energy/40 transition-all duration-500"
    >
      <div className="aspect-square md:aspect-auto md:h-full relative">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted/20 animate-pulse" />
        )}
        
        {/* Hero image - loads immediately */}
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
        
        {/* Text overlay with subtle gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/20 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-energy/20 rounded-full border border-energy/40 shadow-lg shadow-energy/20">
              <span className="text-sm font-semibold text-energy-bright">NESS Hybrid System</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight drop-shadow-lg">
              Your home.<br/>
              <span className="text-energy-bright font-semibold">Powered differently.</span>
            </h3>
            <p className="text-lg text-white/90 font-light max-w-md drop-shadow-md">
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
}

const FeatureTile = memo(({ icon, title, subtitle, description, highlight }: FeatureTileProps) => {
  return (
    <div className={cn(
      "rounded-2xl bg-gradient-to-br from-card via-card to-energy-light/5 border border-border/50 overflow-hidden",
      "hover:shadow-lg hover:shadow-energy/10 hover:border-energy/30 transition-all duration-500",
      "hover:scale-[1.02] group cursor-default",
      "backdrop-blur-sm relative"
    )}>
      <div className="relative p-6 lg:p-8">
        <div className="space-y-4">
          {/* Icon */}
          <div className="text-energy group-hover:text-energy-bright group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            {highlight && (
              <span className="text-xs font-semibold text-energy uppercase tracking-wider bg-energy-light/50 px-2 py-1 rounded-md">
                {highlight}
              </span>
            )}
            <h4 className="text-xl lg:text-2xl font-light text-foreground leading-tight group-hover:text-energy-bright transition-colors duration-300">
              {title}
            </h4>
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {subtitle}
            </p>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

FeatureTile.displayName = 'FeatureTile';

export default memo(NessFeatureGrid);

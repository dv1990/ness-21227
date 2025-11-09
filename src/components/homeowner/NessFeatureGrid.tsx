import { memo } from 'react';
import { Battery, Zap, Shield, Sun, Gauge, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const NessFeatureGrid = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
          
          {/* Hero Tile - Spans 2x2 on larger screens */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-muted/30 to-muted/10 border border-border/50 relative group">
            <div className="aspect-square md:aspect-auto md:h-full relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-primary/5" />
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20">
                    <span className="text-sm font-medium text-primary">NESS Hybrid System</span>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-light tracking-tight text-foreground leading-tight">
                    Your home.<br/>
                    <span className="text-primary font-normal">Powered differently.</span>
                  </h3>
                  <p className="text-lg text-muted-foreground font-light max-w-md">
                    Premium solar battery system designed for modern architectural homes
                  </p>
                </div>
              </div>
            </div>
          </div>

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

interface FeatureTileProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  highlight?: string;
  image?: string;
}

const FeatureTile = memo(({ icon, title, subtitle, description, highlight, image }: FeatureTileProps) => {
  return (
    <div className={cn(
      "rounded-2xl bg-card border border-border/50 overflow-hidden",
      "hover:shadow-elegant hover:border-primary/20 transition-all duration-300",
      "group cursor-default",
      "backdrop-blur-sm relative"
    )}>
      {/* Background Image if provided */}
      {image && (
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="relative p-6 lg:p-8">
        <div className="space-y-4">
          {/* Icon */}
          <div className="text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            {highlight && (
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                {highlight}
              </span>
            )}
            <h4 className="text-xl lg:text-2xl font-light text-foreground leading-tight">
              {title}
            </h4>
            <p className="text-sm font-medium text-muted-foreground">
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

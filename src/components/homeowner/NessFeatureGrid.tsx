import { memo, useState } from 'react';
import { Battery, Zap, Shield, Sun, Gauge, Award, Cpu, TrendingUp, Plug } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStaggeredIntersection } from '@/hooks/use-intersection-observer';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-home-solar.webp';
import nessProProduct from '@/assets-webp/ness-pro-product.webp';

const NessFeatureGrid = () => {
  // Zone A (AIO): 1 hero + 5 tiles = 6
  // Zone B (Standalone): 1 hero + 4 tiles = 5
  // Zone C (Shared): 3 tiles
  // Total: 14
  const { ref, isItemVisible } = useStaggeredIntersection(14, 80);

  return (
    <section className="py-32 bg-gradient-to-b from-background to-background">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="container mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-foreground">
            Engineered for <span className="text-energy-bright font-semibold">Independence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two systems. Each designed to make energy invisible.
          </p>
        </div>

        {/* ─── ZONE A: AIO Series — warm amber tones ─── */}
        <div className="rounded-[2rem] bg-gradient-to-b from-amber-50/30 via-amber-50/10 to-transparent dark:from-amber-950/20 dark:via-amber-950/5 dark:to-transparent p-6 lg:p-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
            {/* AIO Hero Tile */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
              <HeroTile
                isVisible={isItemVisible(0)}
                image={heroImage}
                badge="NESS AIO Series"
                headline="All-in-one."
                headlineAccent="Zero compromise."
                subtext="Solar inverter, battery, and intelligence — in one elegant unit that learns your rhythm"
                accentColor="amber"
              />
            </div>

            <div>
              <FeatureTile icon={<Zap className="w-8 h-8" />} title="10 kW AC Output" subtitle="Whole-Home Power" description="Run everything — AC, fridge, entertainment — simultaneously" isVisible={isItemVisible(1)} iconColor="text-amber-500" />
            </div>
            <div>
              <FeatureTile icon={<Sun className="w-8 h-8" />} title="Built-in Solar Inverter" subtitle="15 kWp · 3 MPPT" description="Maximum harvest. No extra boxes." isVisible={isItemVisible(2)} iconColor="text-amber-500" />
            </div>
            <div>
              <FeatureTile icon={<Cpu className="w-8 h-8" />} title="Intelligent Energy Manager" subtitle="Learns Your Rhythm" description="Optimizes storage, usage, and export — automatically" isVisible={isItemVisible(3)} iconColor="text-amber-500" />
            </div>
            <div>
              <FeatureTile icon={<TrendingUp className="w-8 h-8" />} title="Expandable to 20 kWh" subtitle="Future-Ready" description="Start with what you need. Grow when your family does." isVisible={isItemVisible(4)} iconColor="text-amber-500" />
            </div>
            <div>
              <FeatureTile icon={<Zap className="w-8 h-8" />} title="Same-Day Installation" subtitle="Plug-and-Play" description="Not days. Not weeks. Hours." isVisible={isItemVisible(5)} iconColor="text-amber-500" />
            </div>
          </div>
        </div>

        {/* ─── Transition line ─── */}
        <div className="text-center py-12 lg:py-16">
          <p className="text-xl md:text-2xl text-muted-foreground/60 font-light italic">
            Already have an inverter? There's a NESS for that too.
          </p>
        </div>

        {/* ─── ZONE B: Standalone Battery — cool blue tones ─── */}
        <div className="rounded-[2rem] bg-gradient-to-b from-blue-50/30 via-blue-50/10 to-transparent dark:from-blue-950/20 dark:via-blue-950/5 dark:to-transparent p-6 lg:p-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
            {/* Standalone Hero Tile */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
              <HeroTile
                isVisible={isItemVisible(6)}
                image={nessProProduct}
                badge="NESS Standalone Battery"
                headline="Your inverter's"
                headlineAccent="missing piece."
                subtext="Pure LFP modules that pair with any inverter. Stack one. Stack twenty."
                accentColor="blue"
              />
            </div>

            <div>
              <FeatureTile icon={<Battery className="w-8 h-8" />} title="5 to 80 kWh" subtitle="Scale Without Limits" description="One module or twenty — your call" isVisible={isItemVisible(7)} iconColor="text-blue-500" />
            </div>
            <div>
              <FeatureTile icon={<Plug className="w-8 h-8" />} title="Universal Compatibility" subtitle="Victron · Solis · Studer · Deye" description="Pairs with every major inverter ecosystem" isVisible={isItemVisible(8)} iconColor="text-blue-500" />
            </div>
            <div>
              <FeatureTile icon={<Battery className="w-8 h-8" />} title="6000-Cycle LFP" subtitle="15+ Year Lifespan" description="Premium chemistry. Premium longevity." highlight="Premium" isVisible={isItemVisible(9)} iconColor="text-blue-500" />
            </div>
            <div>
              <FeatureTile icon={<Shield className="w-8 h-8" />} title="AC-Coupled Retrofit" subtitle="No Rewiring Required" description="Add to your existing system in under 3 hours" isVisible={isItemVisible(10)} iconColor="text-blue-500" />
            </div>
          </div>
        </div>

        {/* ─── ZONE C: Shared Confidence ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto mt-12">
          <div>
            <FeatureTile icon={<Shield className="w-8 h-8" />} title="IP55 Weather Resistant" subtitle="Built for Indian Conditions" description="Engineered to perform outdoors, year-round" highlight="Protected" isVisible={isItemVisible(11)} iconColor="text-energy-bright" featured />
          </div>
          <div>
            <FeatureTile icon={<Award className="w-8 h-8" />} title="IEC 62619 + BIS Certified" subtitle="Global Safety, Local Approval" description="Premium international certification" isVisible={isItemVisible(12)} iconColor="text-energy" featured />
          </div>
          <div>
            <FeatureTile icon={<Shield className="w-8 h-8" />} title="10-Year Warranty" subtitle="Complete Peace of Mind" description="Protection that lasts as long as your system" isVisible={isItemVisible(13)} iconColor="text-energy-bright" featured />
          </div>
        </div>

      </div>
    </section>
  );
};

// Hero Tile Component — supports warm/cool accent variants
interface HeroTileProps {
  isVisible: boolean;
  image: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  subtext: string;
  accentColor?: 'amber' | 'blue' | 'energy';
}

const HeroTile = memo(({ isVisible, image, badge, headline, headlineAccent, subtext, accentColor = 'energy' }: HeroTileProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const accentClasses = {
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      shadow: 'hover:shadow-amber-500/20',
      badgeBg: 'bg-amber-500/30 border-amber-500/50 shadow-amber-500/30',
      accentText: 'text-amber-400 font-semibold',
    },
    blue: {
      border: 'border-blue-500/20 hover:border-blue-500/40',
      shadow: 'hover:shadow-blue-500/20',
      badgeBg: 'bg-blue-500/30 border-blue-500/50 shadow-blue-500/30',
      accentText: 'text-blue-400 font-semibold',
    },
    energy: {
      border: 'border-energy/20 hover:border-energy/40',
      shadow: 'hover:shadow-energy/20',
      badgeBg: 'bg-energy/30 border-energy/50 shadow-energy/30',
      accentText: 'text-energy-bright font-semibold',
    },
  };

  const accent = accentClasses[accentColor];

  return (
    <div
      className={cn(
        "rounded-3xl overflow-hidden border relative group transition-all duration-700 h-full",
        accent.border,
        `hover:shadow-2xl ${accent.shadow} hover:scale-[1.02]`,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: '0ms' }}
    >
      <div className="aspect-square md:aspect-auto md:h-full relative min-h-[400px]">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted/20 animate-pulse" />
        )}

        <img
          src={image}
          alt={badge}
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
            <div className={cn("inline-block px-4 py-2 rounded-full border shadow-xl backdrop-blur-sm", accent.badgeBg)}>
              <span className="text-sm font-semibold text-pearl">{badge}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-pearl leading-tight" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
              {headline}<br/>
              <span className={accent.accentText}>{headlineAccent}</span>
            </h3>
            <p className="text-lg text-pearl font-light max-w-md" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.5)' }}>
              {subtext}
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

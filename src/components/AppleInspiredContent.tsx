import { ReactNode } from "react";

// Apple-inspired content structure components
export const EmotionalHero = ({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <section className={`min-h-screen flex items-center justify-center ${className}`}>
    <div className="max-w-5xl mx-auto px-8 text-center space-y-12">
      {children}
    </div>
  </section>
);

export const AppleHeadline = ({ 
  primary, 
  secondary, 
  accent 
}: { 
  primary: string; 
  secondary?: string; 
  accent?: string; 
}) => (
  <div className="space-y-2">
    <h1 className="font-display text-6xl md:text-8xl font-thin text-foreground leading-[0.9] tracking-tight">
      {primary}
      {secondary && (
        <>
          <br />
          <span className="font-light text-muted-foreground/70">{secondary}</span>
        </>
      )}
    </h1>
    {accent && (
      <p className="text-2xl md:text-3xl font-light text-muted-foreground mt-8 max-w-4xl mx-auto leading-relaxed">
        {accent}
      </p>
    )}
  </div>
);

export const HumanBenefit = ({ 
  icon, 
  benefit, 
  proof, 
  detail 
}: { 
  icon: ReactNode; 
  benefit: string; 
  proof: string; 
  detail: string; 
}) => (
  <div className="text-center space-y-6 p-8 rounded-2xl hover:bg-muted/10 transition-all duration-300 group cursor-pointer">
    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform">
      {icon}
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-light text-foreground">{benefit}</h3>
      <div className="text-4xl font-extralight text-primary">{proof}</div>
      <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xs mx-auto">
        {detail}
      </p>
    </div>
  </div>
);

// Apple-style storytelling components
export const StorySection = ({ 
  children, 
  background = "bg-background" 
}: { 
  children: ReactNode; 
  background?: string; 
}) => (
  <section className={`py-32 ${background}`}>
    <div className="max-w-6xl mx-auto px-8">
      {children}
    </div>
  </section>
);

export const StoryChapter = ({ 
  kicker, 
  headline, 
  narrative, 
  visual 
}: { 
  kicker: string; 
  headline: string; 
  narrative: string; 
  visual?: ReactNode; 
}) => (
  <div className="grid lg:grid-cols-2 gap-20 items-center">
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2">
          <div className="w-1 h-1 rounded-full bg-primary"></div>
          <span className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em]">
            {kicker}
          </span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-extralight text-foreground leading-[0.9] tracking-tight">
          {headline}
        </h2>
      </div>
      
      <p className="text-xl font-light text-muted-foreground leading-relaxed">
        {narrative}
      </p>
    </div>
    
    {visual && (
      <div className="relative">
        {visual}
      </div>
    )}
  </div>
);

// Apple-style product showcase
export const ProductShowcase = ({ 
  products 
}: { 
  products: Array<{
    name: string;
    tagline: string;
    humanBenefit: string;
    image: string;
    capacity: string;
  }>;
}) => (
  <div className="grid lg:grid-cols-3 gap-12">
    {products.map((product) => (
      <div key={product.name} className="group">
        <div className="bg-card/30 rounded-3xl p-12 hover:bg-card/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
          <div className="aspect-square mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-muted/10 to-background">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-light text-foreground mb-2">{product.name}</h3>
              <p className="text-muted-foreground font-light">{product.tagline}</p>
            </div>
            
            <p className="text-lg font-light text-foreground/80 leading-relaxed">
              {product.humanBenefit}
            </p>
            
            <div className="pt-4 border-t border-border/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Capacity
              </div>
              <div className="text-xl font-light text-foreground">
                {product.capacity}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default {
  EmotionalHero,
  AppleHeadline,
  HumanBenefit,
  StorySection,
  StoryChapter,
  ProductShowcase
};
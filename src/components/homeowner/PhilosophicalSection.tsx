import { memo } from 'react';

export const PhilosophicalSection = memo(() => {
  return (
    <section className="py-32 md:py-48 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extralight mb-8 leading-tight tracking-tight">
          Your child's exam. Your work deadline.<br />
          <span className="text-muted-foreground">None of it stops.</span>
        </h2>
        
        <p className="text-xl text-muted-foreground/80 font-light leading-relaxed max-w-2xl mx-auto mb-16">
          Life's most important moments happen at home. Your energy system should be invisible, reliable, and effortlessly elegant.
        </p>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="space-y-2">
            <div className="text-4xl font-extralight text-primary">99.97%</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-extralight text-primary">10ms</div>
            <div className="text-sm text-muted-foreground">Switch Response</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-extralight text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Homes Protected</div>
            <div className="text-xs text-muted-foreground/60">Across India since 2020</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-extralight text-primary">15yr</div>
            <div className="text-sm text-muted-foreground">Warranty Period</div>
          </div>
        </div>
      </div>
    </section>
  );
});

PhilosophicalSection.displayName = 'PhilosophicalSection';

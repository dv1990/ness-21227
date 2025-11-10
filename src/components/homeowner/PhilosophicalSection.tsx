import { memo } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { AmbientParticles } from '@/components/ui/ambient-particles';

export const PhilosophicalSection = memo(() => {
  const { ref: headingRef, isIntersecting: headingVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { ref: textRef, isIntersecting: textVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-muted/10 to-background overflow-hidden">
      {/* Ambient particle effect */}
      <AmbientParticles />
      
      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        
        {/* Emotional Opening */}
        <div className="text-center mb-20 space-y-10">
          <h2 
            ref={headingRef as any}
            className={cn(
              "text-3xl md:text-5xl lg:text-6xl font-extralight leading-[1.2] tracking-tight transition-all duration-1000",
              headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Your child's exam. Your work deadline.
            <br />
            <span className="text-muted-foreground/70">None of it stops.</span>
          </h2>
          
          <p 
            ref={textRef as any}
            className={cn(
              "text-lg md:text-2xl text-foreground/60 font-light leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-200",
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Life's most important moments happen at home.
            <br />
            <span className="text-foreground/90">Your energy system should be invisible, reliable, and effortlessly elegant.</span>
          </p>
        </div>

        {/* Stats - Clean, Spacious, Elegant */}
        <div 
          ref={statsRef as any}
          className={cn(
            "grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 transition-all duration-1000 delay-400",
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <StatItem 
            value="99%" 
            label="System Uptime"
            delay={0}
            visible={statsVisible}
          />
          <StatItem 
            value="10ms" 
            label="Switch Response"
            delay={100}
            visible={statsVisible}
          />
          <StatItem 
            value="500+" 
            label="Homes Protected"
            delay={200}
            visible={statsVisible}
          />
          <StatItem 
            value="15 years" 
            label="Warranty"
            delay={300}
            visible={statsVisible}
          />
        </div>
      </div>
    </section>
  );
});

PhilosophicalSection.displayName = 'PhilosophicalSection';

// Individual stat component with refined typography
const StatItem = memo(({ value, label, delay, visible }: { value: string; label: string; delay: number; visible: boolean }) => {
  return (
    <div 
      className={cn(
        "text-center space-y-4 transition-all duration-700",
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-5xl md:text-6xl font-extralight text-energy tracking-tight">
        {value}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-light tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
});

StatItem.displayName = 'StatItem';

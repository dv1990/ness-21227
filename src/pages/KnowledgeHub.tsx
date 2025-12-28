import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Battery, HelpCircle, Calculator, Package, Workflow, CheckCircle, XCircle } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const KnowledgeHub = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const homeUserCards = [
    {
      id: 'why-solar',
      title: 'Why adopt solar + battery now?',
      hook: 'Rising tariffs. Unreliable grid. One solution.',
      cta: 'Discover the shift',
      link: '/knowledge/why-solar-battery',
      icon: Sun,
      secondaryIcon: Battery,
      featured: true,
    },
    {
      id: 'choose-product',
      title: 'How to choose the right product?',
      hook: 'Find your perfect match based on your needs.',
      cta: 'Explore options',
      link: '/knowledge/product-guide',
      icon: HelpCircle,
      featured: false,
    },
    {
      id: 'calculator',
      title: 'Savings Calculator',
      hook: 'See ₹2.4L+ in potential savings.',
      cta: 'Calculate now',
      link: '/knowledge/calculator',
      icon: Calculator,
      featured: false,
      accent: true,
    },
  ];

  const installerCards = [
    {
      id: 'all-in-one',
      title: 'Why all-in-one?',
      hook: 'One unit. One install. Zero callbacks.',
      cta: 'See the advantage',
      link: '/knowledge/all-in-one',
      icon: Package,
      featured: true,
    },
    {
      id: 'hybrid-install',
      title: 'Hybrid installation simplified',
      hook: 'Step-by-step. No guesswork.',
      cta: 'View guide',
      link: '/knowledge/hybrid-installation',
      icon: Workflow,
      featured: false,
    },
    {
      id: 'dos-donts',
      title: "Do's and Don'ts",
      hook: 'Master the essentials for every install.',
      cta: 'Learn best practices',
      link: '/knowledge/best-practices',
      icon: CheckCircle,
      secondaryIcon: XCircle,
      featured: false,
      split: true,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-24 bg-background overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/50 via-whisper to-background pointer-events-none" />
        
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-energy/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-caption uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground mb-4 sm:mb-6">
              Resources
            </p>
            <h1 className="text-3xl sm:text-display-medium md:text-display-large font-medium text-foreground mb-6 sm:mb-8 tracking-tight">
              Knowledge Hub
            </h1>
            <p className="text-body-large text-muted-foreground/80 max-w-xl mx-auto leading-relaxed">
              The answers you need. The confidence you deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Home Users Section */}
      <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 bg-pearl/30 relative overflow-hidden">
        {/* Dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div 
            className={`mb-10 sm:mb-16 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-caption uppercase tracking-[0.2em] sm:tracking-[0.25em] text-energy font-medium mb-2 sm:mb-3">
              For Homeowners
            </p>
            <h2 className="text-2xl sm:text-title-large md:text-display-small font-medium text-foreground tracking-tight">
              Your energy journey starts here
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {homeUserCards.map((card, index) => (
              <Link
                key={card.id}
                to={card.link}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${card.featured ? 'md:col-span-1 md:row-span-2' : ''}
                  ${card.accent 
                    ? 'glass-card-accent' 
                    : 'glass-card-light'}
                  hover:-translate-y-2 hover:shadow-glass-hover active:scale-[0.98]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                {/* Specular highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                
                {/* Content */}
                <div className={`relative z-10 p-6 sm:p-8 md:p-14 h-full flex flex-col ${card.featured ? 'min-h-[280px] sm:min-h-[320px] md:min-h-[420px]' : 'min-h-[200px] sm:min-h-[220px]'}`}>
                  {/* Icons */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                      card.accent 
                        ? 'bg-energy/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]' 
                        : 'bg-muted/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]'
                    }`}>
                      <card.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${card.accent ? 'text-energy' : 'text-foreground'}`} />
                    </div>
                    {card.secondaryIcon && (
                      <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                        card.accent 
                          ? 'bg-energy/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]' 
                          : 'bg-muted/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]'
                      }`}>
                        <card.secondaryIcon className={`w-5 h-5 sm:w-7 sm:h-7 ${card.accent ? 'text-energy' : 'text-foreground'}`} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-medium text-foreground mb-3 sm:mb-4 tracking-tight ${card.featured ? 'text-xl sm:text-2xl md:text-display-medium' : 'text-lg sm:text-xl md:text-title-large'}`}>
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-body-large text-muted-foreground/80 leading-relaxed">
                      {card.hook}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 min-h-[48px]">
                    <span className={`font-semibold ${card.accent ? 'text-energy' : 'text-foreground'}`}>
                      {card.cta}
                    </span>
                    <ArrowRight className={`w-5 h-5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2 ${
                      card.accent ? 'text-energy' : 'text-foreground'
                    }`} />
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-energy/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Installers Section - Dark Theme */}
      <section className="py-16 sm:py-24 md:py-32 bg-charcoal relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--pearl)) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-graphite/50 via-charcoal to-charcoal pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div 
            className={`mb-10 sm:mb-16 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-caption uppercase tracking-[0.2em] sm:tracking-[0.25em] text-energy font-medium mb-2 sm:mb-3">
              For Professionals
            </p>
            <h2 className="text-2xl sm:text-title-large md:text-display-small font-medium text-pearl tracking-tight">
              Install with confidence
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {installerCards.map((card, index) => (
              <Link
                key={card.id}
                to={card.link}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${card.featured ? 'md:col-span-1 md:row-span-2' : ''}
                  ${card.split ? 'glass-card-split' : 'glass-card-dark'}
                  hover:-translate-y-2 hover:shadow-glass-dark-hover hover:border-energy/40 active:scale-[0.98]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                {/* Specular highlight for dark cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-pearl/8 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Split accent for Do's/Don'ts card */}
                {card.split && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-energy/10 to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-red-500/10 to-transparent" />
                  </div>
                )}
                
                {/* Content */}
                <div className={`relative z-10 p-6 sm:p-8 md:p-14 h-full flex flex-col ${card.featured ? 'min-h-[280px] sm:min-h-[320px] md:min-h-[420px]' : 'min-h-[200px] sm:min-h-[220px]'}`}>
                  {/* Icons */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-pearl/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-pearl/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <card.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${card.split ? 'text-energy' : 'text-pearl'}`} />
                    </div>
                    {card.secondaryIcon && (
                      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-pearl/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-pearl/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <card.secondaryIcon className="w-5 h-5 sm:w-7 sm:h-7 text-red-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-medium text-pearl mb-3 sm:mb-4 tracking-tight ${card.featured ? 'text-xl sm:text-2xl md:text-display-medium' : 'text-lg sm:text-xl md:text-title-large'}`}>
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-body-large text-pearl/60 leading-relaxed">
                      {card.hook}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 min-h-[48px]">
                    <span className="font-semibold text-pearl group-hover:text-energy transition-colors duration-500">
                      {card.cta}
                    </span>
                    <ArrowRight className="w-5 h-5 text-pearl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2 group-hover:text-energy" />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-energy/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[150px] sm:h-[300px] bg-energy/3 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div 
            className={`text-center transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-sm sm:text-body-large text-muted-foreground/80 mb-6 sm:mb-8">
              Can't find what you're looking for?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-foreground text-background rounded-full font-semibold min-h-[48px]
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                hover:bg-foreground/90 hover:scale-105 hover:shadow-glass-hover active:scale-95"
            >
              Contact Support
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KnowledgeHub;

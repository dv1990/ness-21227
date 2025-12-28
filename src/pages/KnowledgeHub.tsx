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
      hook: 'See your savings in 60 seconds.',
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
      <section className="relative pt-32 pb-20 bg-background overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/50 to-background pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-caption uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Resources
            </p>
            <h1 className="text-display-medium md:text-display-large font-light text-foreground mb-6 tracking-tight">
              Knowledge Hub
            </h1>
            <p className="text-body-large text-muted-foreground max-w-xl mx-auto">
              The answers you need. The confidence you deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Home Users Section */}
      <section ref={sectionRef} className="py-24 bg-pearl/30 relative overflow-hidden">
        {/* Dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div 
            className={`mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-caption uppercase tracking-[0.2em] text-energy font-medium mb-2">
              For Homeowners
            </p>
            <h2 className="text-title-large md:text-display-small font-light text-foreground">
              Your energy journey starts here
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homeUserCards.map((card, index) => (
              <Link
                key={card.id}
                to={card.link}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ease-out
                  ${card.featured ? 'md:col-span-1 md:row-span-2' : ''}
                  ${card.accent ? 'bg-gradient-to-br from-energy/10 via-energy/5 to-transparent' : 'bg-background/80'}
                  backdrop-blur-xl border border-border/50
                  hover:scale-[1.02] hover:shadow-premium active:scale-[0.98]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className={`p-8 md:p-10 h-full flex flex-col ${card.featured ? 'min-h-[400px]' : 'min-h-[200px]'}`}>
                  {/* Icons */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-2xl ${card.accent ? 'bg-energy/20' : 'bg-muted/50'}`}>
                      <card.icon className={`w-6 h-6 ${card.accent ? 'text-energy' : 'text-foreground'}`} />
                    </div>
                    {card.secondaryIcon && (
                      <div className={`p-3 rounded-2xl ${card.accent ? 'bg-energy/20' : 'bg-muted/50'}`}>
                        <card.secondaryIcon className={`w-6 h-6 ${card.accent ? 'text-energy' : 'text-foreground'}`} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-medium text-foreground mb-3 ${card.featured ? 'text-title-large' : 'text-title'}`}>
                      {card.title}
                    </h3>
                    <p className="text-body text-muted-foreground">
                      {card.hook}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-2 text-foreground font-medium">
                    <span className={card.accent ? 'text-energy' : ''}>{card.cta}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${card.accent ? 'text-energy' : ''}`} />
                  </div>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-energy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Installers Section - Dark Theme */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--pearl)) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div 
            className={`mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-caption uppercase tracking-[0.2em] text-energy font-medium mb-2">
              For Professionals
            </p>
            <h2 className="text-title-large md:text-display-small font-light text-pearl">
              Install with confidence
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {installerCards.map((card, index) => (
              <Link
                key={card.id}
                to={card.link}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ease-out
                  ${card.featured ? 'md:col-span-1 md:row-span-2' : ''}
                  bg-graphite/50 backdrop-blur-xl border border-pearl/10
                  hover:scale-[1.02] hover:shadow-premium hover:border-energy/30 active:scale-[0.98]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className={`p-8 md:p-10 h-full flex flex-col ${card.featured ? 'min-h-[400px]' : 'min-h-[200px]'}`}>
                  {/* Icons */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-pearl/10">
                      <card.icon className={`w-6 h-6 ${card.split ? 'text-energy' : 'text-pearl'}`} />
                    </div>
                    {card.secondaryIcon && (
                      <div className="p-3 rounded-2xl bg-pearl/10">
                        <card.secondaryIcon className="w-6 h-6 text-red-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-medium text-pearl mb-3 ${card.featured ? 'text-title-large' : 'text-title'}`}>
                      {card.title}
                    </h3>
                    <p className="text-body text-pearl/60">
                      {card.hook}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-2 text-pearl font-medium">
                    <span className="group-hover:text-energy transition-colors duration-300">{card.cta}</span>
                    <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-energy" />
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-energy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div 
            className={`text-center transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-body-large text-muted-foreground mb-6">
              Can't find what you're looking for?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium
                hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KnowledgeHub;

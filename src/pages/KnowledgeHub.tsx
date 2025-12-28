import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const KnowledgeHub = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const homeUserResources = [
    {
      title: "System Basics",
      description: "How your NESS system works",
      link: "/knowledge/ness-basics",
    },
    {
      title: "Energy Optimization",
      description: "Maximize your solar + storage",
      link: "/knowledge/optimization",
    },
    {
      title: "Savings Calculator",
      description: "Estimate your potential savings",
      link: "/knowledge/calculator",
    },
    {
      title: "Troubleshooting",
      description: "Quick fixes for common issues",
      link: "/troubleshooting",
    }
  ];

  const installerResources = [
    {
      title: "Technical Docs",
      description: "Installation manuals & specs",
      link: "/downloads",
    },
    {
      title: "Configuration",
      description: "Commissioning procedures",
      link: "/knowledge/configuration",
    },
    {
      title: "Training",
      description: "Professional video tutorials",
      link: "/knowledge/training",
    },
    {
      title: "Certification",
      description: "Warranty & certification info",
      link: "/warranty",
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        
        {/* Hero - Apple-style minimal */}
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div 
            ref={heroRef}
            className={`container mx-auto max-w-6xl px-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center">
              <h1 className="text-display-large md:text-display-xl font-display text-foreground mb-6">
                Knowledge
              </h1>
              <p className="text-body-large text-muted-foreground max-w-xl mx-auto">
                Everything you need to master your energy independence.
              </p>
            </div>
          </div>
        </section>

        {/* Two Audience Sections - Side by side on desktop */}
        <section className="pb-32">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden shadow-lifted">
              
              {/* Home Users */}
              <div className="bg-background p-12 lg:p-16 group">
                <div className="mb-12">
                  <span className="text-caption uppercase tracking-widest text-muted-foreground mb-4 block">
                    For Homeowners
                  </span>
                  <h2 className="text-display-medium font-display text-foreground">
                    Home
                  </h2>
                </div>

                <div className="space-y-1">
                  {homeUserResources.map((resource, index) => (
                    <Link
                      key={index}
                      to={resource.link}
                      className="group/item flex items-center justify-between py-5 border-b border-border last:border-0 transition-all duration-300 hover:pl-2"
                    >
                      <div>
                        <h3 className="text-title-large text-foreground group-hover/item:text-accent transition-colors duration-300">
                          {resource.title}
                        </h3>
                        <p className="text-body-small text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover/item:text-accent group-hover/item:translate-x-1 transition-all duration-300 flex-shrink-0 ml-4" />
                    </Link>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <Link 
                    to="/homeowners"
                    className="inline-flex items-center gap-3 text-body text-foreground hover:text-accent transition-colors duration-300 group/cta"
                  >
                    <span>Explore home solutions</span>
                    <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Installers */}
              <div className="bg-foreground p-12 lg:p-16 group">
                <div className="mb-12">
                  <span className="text-caption uppercase tracking-widest text-pearl/50 mb-4 block">
                    For Professionals
                  </span>
                  <h2 className="text-display-medium font-display text-pearl">
                    Installer
                  </h2>
                </div>

                <div className="space-y-1">
                  {installerResources.map((resource, index) => (
                    <Link
                      key={index}
                      to={resource.link}
                      className="group/item flex items-center justify-between py-5 border-b border-pearl/10 last:border-0 transition-all duration-300 hover:pl-2"
                    >
                      <div>
                        <h3 className="text-title-large text-pearl group-hover/item:text-energy transition-colors duration-300">
                          {resource.title}
                        </h3>
                        <p className="text-body-small text-pearl/60 mt-1">
                          {resource.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-pearl/20 group-hover/item:text-energy group-hover/item:translate-x-1 transition-all duration-300 flex-shrink-0 ml-4" />
                    </Link>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-pearl/10">
                  <Link 
                    to="/installers"
                    className="inline-flex items-center gap-3 text-body text-pearl hover:text-energy transition-colors duration-300 group/cta"
                  >
                    <span>Join installer network</span>
                    <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Minimal CTA */}
        <section className="pb-40">
          <div className="container mx-auto max-w-6xl px-6 text-center">
            <p className="text-body-large text-muted-foreground mb-8">
              Need help finding something?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full text-body font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Contact Support
            </Link>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default KnowledgeHub;

import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { 
  Home, 
  Wrench, 
  Battery, 
  Zap, 
  Sun, 
  BookOpen, 
  FileText, 
  Video, 
  HelpCircle,
  ChevronRight,
  Lightbulb,
  Settings,
  Shield,
  TrendingUp
} from "lucide-react";

const KnowledgeHub = () => {
  const homeUserResources = [
    {
      icon: Battery,
      title: "Understanding Your NESS System",
      description: "Learn how your energy storage system works and maximizes savings",
      link: "/knowledge/ness-basics",
      tag: "Getting Started"
    },
    {
      icon: Sun,
      title: "Solar + Storage Optimization",
      description: "Tips to maximize your solar generation and battery usage",
      link: "/knowledge/optimization",
      tag: "Best Practices"
    },
    {
      icon: Zap,
      title: "Energy Savings Calculator",
      description: "Estimate your potential savings with our interactive tool",
      link: "/knowledge/calculator",
      tag: "Interactive"
    },
    {
      icon: HelpCircle,
      title: "FAQs & Troubleshooting",
      description: "Quick answers to common questions and simple fixes",
      link: "/troubleshooting",
      tag: "Support"
    }
  ];

  const installerResources = [
    {
      icon: FileText,
      title: "Technical Documentation",
      description: "Complete installation manuals, wiring diagrams, and specs",
      link: "/downloads",
      tag: "Documentation"
    },
    {
      icon: Settings,
      title: "System Configuration Guides",
      description: "Step-by-step commissioning and configuration procedures",
      link: "/knowledge/configuration",
      tag: "Technical"
    },
    {
      icon: Video,
      title: "Training Videos",
      description: "Professional installation tutorials and best practices",
      link: "/knowledge/training",
      tag: "Video"
    },
    {
      icon: Shield,
      title: "Warranty & Certification",
      description: "Warranty registration, claims process, and certification info",
      link: "/warranty",
      tag: "Certification"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Knowledge Hub
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
                Learn. Optimize. Succeed.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Expert resources tailored to your needs—whether you're powering your home or building your installation business.
              </p>
            </div>
          </div>
        </section>

        {/* Two Sections Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Home Users Section */}
              <div className="group">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 md:p-10 border border-emerald-100 dark:border-emerald-900/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
                  {/* Section Header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Home className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        For Home Users
                      </h2>
                      <p className="text-muted-foreground">
                        Maximize your energy independence
                      </p>
                    </div>
                  </div>

                  {/* Resource Cards */}
                  <div className="space-y-4">
                    {homeUserResources.map((resource, index) => (
                      <Link
                        key={index}
                        to={resource.link}
                        className="block p-5 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-emerald-100/50 dark:border-emerald-800/30 transition-all duration-300 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg hover:scale-[1.02] group/card"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center transition-colors group-hover/card:bg-emerald-500">
                            <resource.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-colors group-hover/card:text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                                {resource.tag}
                              </span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-1 group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover/card:text-emerald-500 group-hover/card:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-8 pt-6 border-t border-emerald-200/50 dark:border-emerald-800/30">
                    <Link 
                      to="/homeowners"
                      className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:gap-3 transition-all"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Explore solutions for your home
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Installers Section */}
              <div className="group">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 md:p-10 border border-blue-100 dark:border-blue-900/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                  {/* Section Header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Wrench className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        For Installers
                      </h2>
                      <p className="text-muted-foreground">
                        Professional resources & training
                      </p>
                    </div>
                  </div>

                  {/* Resource Cards */}
                  <div className="space-y-4">
                    {installerResources.map((resource, index) => (
                      <Link
                        key={index}
                        to={resource.link}
                        className="block p-5 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-blue-100/50 dark:border-blue-800/30 transition-all duration-300 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg hover:scale-[1.02] group/card"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center transition-colors group-hover/card:bg-blue-500">
                            <resource.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors group-hover/card:text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">
                                {resource.tag}
                              </span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-1 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover/card:text-blue-500 group-hover/card:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-8 pt-6 border-t border-blue-200/50 dark:border-blue-800/30">
                    <Link 
                      to="/installers"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Join our installer network
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our support team is here to help you with any questions.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Support
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default KnowledgeHub;

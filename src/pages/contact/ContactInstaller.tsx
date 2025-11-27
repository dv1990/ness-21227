import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SystemConfigurator from "@/components/SystemConfigurator";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import nessPodInstall from "@/assets/ness-pod-installation-hero.webp";
import configuratorTool from "@/assets-webp/configurator-tool.webp";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().trim().min(2, "Company name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type FormData = z.infer<typeof formSchema>;

const ContactInstaller = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Scroll reveal hooks for sections
  const empathy = useScrollReveal({ threshold: 0.2 });
  const solution = useScrollReveal({ threshold: 0.2 });

  // Parallax effect for hero
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
    },
  });

  const consent = watch("consent");

  const onSubmit = async (data: FormData) => {
    try {
      const { sendEmail } = await import('@/lib/email-service');
      
      await sendEmail({
        from_name: data.fullName || '',
        from_email: data.email || '',
        from_phone: data.phone || '',
        company: data.company || '',
        message: `Project Type: ${data.projectType}\n\n${data.message}`,
        form_type: 'Installer Contact',
        project_type: data.projectType,
      });
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setIsSubmitted(true);
      scrollToTop();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout className="-mt-16">
      <div className="bg-background">
        {/* Hero Section - Full bleed with image and parallax */}
        <section 
          ref={heroRef}
          className="relative min-h-[85vh] flex items-center overflow-hidden"
        >
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform'
            }}
          >
            <img 
              src={nessPodInstall}
              alt="Professional battery installation"
              className="w-full h-[120%] object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/40" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 mx-auto max-w-screen-xl px-6 py-20">
            <div className="max-w-3xl space-y-8">
              <p 
                className="text-sm font-semibold tracking-[0.2em] uppercase text-energy-bright opacity-0 animate-fade-in-up"
                style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
              >
                For EPC Installers
              </p>
              <h1 
                className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-pearl leading-[0.95] opacity-0 animate-fade-in-up"
                style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
              >
                The easiest
                <br />
                battery you'll
                <br />
                ever install.
              </h1>
              <p 
                className="text-xl md:text-2xl text-pearl/80 font-light max-w-2xl leading-relaxed opacity-0 animate-fade-in-up"
                style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
              >
                Powered by digital intelligence. Built for reliability—without the headaches.
              </p>
              <div 
                className="flex items-center gap-3 text-pearl/60 text-sm opacity-0 animate-fade-in-up"
                style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-px bg-energy" />
                <span>Fix it. Forget it. Powered by Digital Trust.</span>
              </div>
              <div 
                className="pt-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
              >
                <Button
                  onClick={scrollToContact}
                  id="cta-become-partner"
                  data-cta="become-partner"
                  size="lg"
                  className="bg-energy hover:brightness-110 text-pearl rounded-xl px-8 py-7 text-lg font-semibold focus-visible:ring-4 focus-visible:ring-energy/40 transition-all duration-300 hover:scale-105 hover:shadow-energy active:scale-100 min-h-[56px]"
                  aria-label="Become a NESS Partner - Scroll to contact form"
                >
                  Become a NESS Partner
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pearl/40 opacity-0 animate-fade-in"
            style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
            aria-hidden="true"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="motion-safe:animate-bounce">
              <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="2"/>
              <circle cx="10" cy="10" r="2" fill="currentColor"/>
            </svg>
          </div>
        </section>

        {/* The Reality - Empathy Block with Scroll Reveal */}
        <section 
          ref={empathy.ref as React.RefObject<HTMLElement>}
          className={`py-32 md:py-40 px-6 transition-all duration-1000 ${
            empathy.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="mx-auto max-w-screen-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <div className="max-w-xl space-y-10">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight">
                    Every installer
                    <br />
                    knows this moment.
                  </h2>
                  <div className="text-lg md:text-xl text-muted-foreground space-y-4 font-light leading-relaxed">
                    <p className="transition-opacity duration-700 delay-100">The panels go up smooth.</p>
                    <p className="transition-opacity duration-700 delay-200">The inverter syncs perfectly.</p>
                    <p className="text-foreground/90 transition-opacity duration-700 delay-300">Then comes the battery — and the pause.</p>
                  </div>
                  <p className="text-2xl md:text-3xl font-medium text-foreground pt-4 leading-snug transition-opacity duration-700 delay-400">
                    One wrong configuration, and the customer calls never stop.
                  </p>
                </div>
              </div>
              
              {/* Visual Stats Cards */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-card to-muted/20 rounded-3xl p-8 border border-border/50 hover:shadow-lifted transition-all duration-300 hover:-translate-y-1">
                  <div className="text-5xl font-light text-energy mb-3">3 hours</div>
                  <div className="text-sm text-muted-foreground">Average troubleshooting time per install</div>
                </div>
                <div className="bg-gradient-to-br from-card to-muted/20 rounded-3xl p-8 border border-border/50 hover:shadow-lifted transition-all duration-300 hover:-translate-y-1 mt-8">
                  <div className="text-5xl font-light text-energy mb-3">47%</div>
                  <div className="text-sm text-muted-foreground">Of callbacks are config-related</div>
                </div>
                <div className="bg-gradient-to-br from-card to-muted/20 rounded-3xl p-8 border border-border/50 hover:shadow-lifted transition-all duration-300 hover:-translate-y-1">
                  <div className="text-5xl font-light text-energy mb-3">₹45k</div>
                  <div className="text-sm text-muted-foreground">Lost per botched commissioning</div>
                </div>
                <div className="bg-gradient-to-br from-card to-muted/20 rounded-3xl p-8 border border-border/50 hover:shadow-lifted transition-all duration-300 hover:-translate-y-1 mt-8">
                  <div className="text-5xl font-light text-energy mb-3">3 hours</div>
                  <div className="text-sm text-muted-foreground">Setup time with NESS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Shift - Solution Block Simplified */}
        <section 
          ref={solution.ref as React.RefObject<HTMLElement>}
          className={`relative py-32 md:py-40 overflow-hidden transition-all duration-1000 ${
            solution.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Subtle background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-whisper via-background to-whisper" />
          
          <div className="relative z-10 mx-auto max-w-screen-xl px-6">
            <div className="max-w-5xl mx-auto">
              {/* Main Message */}
              <div className="text-center space-y-12 mb-20">
                <h2 className="text-5xl md:text-7xl font-light text-foreground leading-tight">
                  NESS ends
                  <br />
                  that story.
                </h2>
                <p className="text-2xl md:text-3xl text-foreground font-light leading-relaxed max-w-3xl mx-auto">
                  You plug it in, and it just works.
                </p>
              </div>

              {/* Three Core Benefits in Grid */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="text-center space-y-4 group">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-energy/10 flex items-center justify-center group-hover:bg-energy/20 transition-colors duration-300">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <path d="M16 6V16L22 22" stroke="hsl(var(--energy-core))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="16" cy="16" r="12" stroke="hsl(var(--energy-core))" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Auto-configured</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No menus. No calibration. The battery sets itself up in 3 hours.
                  </p>
                </div>

                <div className="text-center space-y-4 group">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-energy/10 flex items-center justify-center group-hover:bg-energy/20 transition-colors duration-300">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <path d="M16 4C16 4 8 8 8 14V20C8 24 12 28 16 28C20 28 24 24 24 20V14C24 8 16 4 16 4Z" stroke="hsl(var(--energy-core))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16L15 19L20 13" stroke="hsl(var(--energy-core))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Cloud-verified</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every unit is monitored and validated in real-time from our cloud.
                  </p>
                </div>

                <div className="text-center space-y-4 group">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-energy/10 flex items-center justify-center group-hover:bg-energy/20 transition-colors duration-300">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <circle cx="16" cy="10" r="3" stroke="hsl(var(--energy-core))" strokeWidth="2"/>
                      <path d="M10 24C10 20.686 12.686 18 16 18C19.314 18 22 20.686 22 24" stroke="hsl(var(--energy-core))" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M24 12L28 16M28 16L24 20M28 16H20" stroke="hsl(var(--energy-core))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Smart support</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Predictive alerts catch issues before your customer even notices.
                  </p>
                </div>
              </div>

              {/* Simple CTA */}
              <div className="text-center mt-16">
                <p className="text-lg text-muted-foreground mb-6">
                  Commission faster. Sleep better. Protect your margins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid - Visual Cards with Icons */}
        <section className="py-32 md:py-40 px-6 bg-whisper">
          <div className="mx-auto max-w-screen-xl">
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-5xl md:text-6xl font-light text-foreground leading-tight">
                Why EPCs
                <br />
                choose NESS.
              </h2>
              <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                More than a battery. A partnership that protects your reputation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <circle cx="24" cy="24" r="20" stroke="hsl(var(--energy-core))" strokeWidth="2"/>
                      <path d="M16 24L22 30L32 18" stroke="hsl(var(--energy-core))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Plug & play setup",
                  description: "No hidden menus. No messy calibration.",
                  stat: "15 min",
                  statLabel: "avg install"
                },
                {
                  icon: (
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <path d="M24 8V24L32 32" stroke="hsl(var(--energy-core))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="24" cy="24" r="18" stroke="hsl(var(--energy-core))" strokeWidth="2"/>
                    </svg>
                  ),
                  title: "Fewer customer calls",
                  description: "Predictable systems, happier clients.",
                  stat: "94%",
                  statLabel: "satisfaction"
                },
                {
                  icon: (
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <path d="M12 24L24 36L36 12" stroke="hsl(var(--energy-core))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Faster handovers",
                  description: "Commission, sign off, move on.",
                  stat: "3x",
                  statLabel: "faster"
                },
                {
                  icon: (
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <path d="M34 20V14H28M34 14L24 24L18 18L8 28" stroke="hsl(var(--energy-core))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Higher margins",
                  description: "Time saved is margin protected.",
                  stat: "23%",
                  statLabel: "margin boost"
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 transition-all duration-500 hover:shadow-lifted hover:border-energy/30 hover:-translate-y-2 hover:bg-card"
                  style={{
                    animation: `fade-in-up 700ms ease-out forwards`,
                    animationDelay: `${index * 150}ms`,
                    opacity: 0,
                  }}
                >
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="text-energy group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-light text-energy">{benefit.stat}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{benefit.statLabel}</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-medium text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof Strip - Enhanced */}
        <section className="py-20 px-6 bg-gradient-to-r from-energy/5 via-energy/10 to-energy/5">
          <div className="mx-auto max-w-screen-xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-4">
                <span className="inline-block bg-energy text-pearl rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] font-bold shadow-energy">
                  Field-proven
                </span>
              </div>
              <div className="h-12 w-px bg-border hidden md:block" />
              <p className="text-lg md:text-xl text-foreground font-light text-center md:text-left max-w-2xl leading-relaxed">
                Powering <span className="font-semibold text-energy">1000+ homes</span> across India
                <br className="hidden md:block" />
                <span className="text-muted-foreground"> — zero diesel, zero downtime.</span>
              </p>
            </div>
          </div>
        </section>

        {/* System Configurator Section - Enhanced */}
        <section className="py-32 md:py-40 px-6">
          <div className="mx-auto max-w-screen-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                  <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-energy">
                    Smart Tools
                  </span>
                  
                  <h2 className="text-5xl md:text-6xl font-light text-foreground leading-tight">
                    System
                    <br />
                    configurator
                  </h2>

                  <p className="text-xl text-muted-foreground font-light leading-relaxed">
                    Generate accurate system specifications and professional proposals 
                    in minutes with our advanced configuration tool.
                  </p>
                </div>

                <div className="space-y-5">
                  {[
                    { text: "Load pattern analysis", delay: 0 },
                    { text: "Optimal component sizing", delay: 100 },
                    { text: "Environmental impact reports", delay: 200 },
                    { text: "Professional documentation", delay: 300 },
                  ].map((feature) => (
                    <div 
                      key={feature.text} 
                      className="flex items-center gap-4 group"
                      style={{
                        animation: `fade-in-up 600ms ease-out forwards`,
                        animationDelay: `${feature.delay}ms`,
                        opacity: 0
                      }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-energy/10 flex items-center justify-center group-hover:bg-energy/20 transition-colors duration-300">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 8L7 11L12 5"
                            stroke="hsl(var(--energy-core))"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-lg text-foreground group-hover:text-energy transition-colors duration-300">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="bg-energy hover:brightness-110 text-pearl rounded-xl px-8 py-7 text-lg font-semibold focus-visible:ring-2 focus-visible:ring-energy/40 transition-all duration-300 hover:scale-105 hover:shadow-energy group"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="mr-3 group-hover:rotate-90 transition-transform duration-500"
                          aria-hidden="true"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="8"
                            height="8"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <rect
                            x="13"
                            y="3"
                            width="8"
                            height="8"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <rect
                            x="3"
                            y="13"
                            width="8"
                            height="8"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <rect
                            x="13"
                            y="13"
                            width="8"
                            height="8"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        Launch Configurator
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                      <SystemConfigurator />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-premium border border-border/50 group">
                  <img 
                    src={configuratorTool}
                    alt="System configurator interface"
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-premium border border-border/50 backdrop-blur-sm">
                  <div className="text-4xl font-light text-energy mb-2">2.3min</div>
                  <div className="text-sm text-muted-foreground">Average config time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Belief / Purpose Block - Full bleed */}
        <section className="relative py-40 md:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-graphite to-foreground" />
          
          <div className="relative z-10 mx-auto max-w-screen-xl px-6">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-pearl leading-[0.95]">
                India doesn't just
                <br />
                need more solar —
                <br />
                <span className="text-pearl/60">it needs power that</span>
                <br />
                stays trusted.
              </h2>
              <p className="text-2xl md:text-3xl text-pearl/80 font-light leading-relaxed max-w-3xl mx-auto">
                You build the future. We keep it running — quietly, continuously,
                confidently.
              </p>
              <div className="pt-8">
                <Button
                  onClick={scrollToContact}
                  data-cta="become-partner-2"
                  size="lg"
                  className="bg-energy hover:brightness-110 text-pearl rounded-xl px-10 py-8 text-xl font-semibold focus-visible:ring-2 focus-visible:ring-energy/40 transition-all duration-300 hover:scale-105 hover:shadow-energy"
                >
                  Become a NESS Partner
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-energy/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-energy/5 rounded-full blur-2xl" />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-24 px-6 bg-muted/30">
          <div className="mx-auto max-w-screen-xl">
            <div className="max-w-2xl mx-auto">
              {!isSubmitted ? (
                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                      Talk to the NESS team.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Tell us about your project. We'll simplify the storage —
                      and protect your margins.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-card rounded-2xl p-8 shadow-soft border border-border/20"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        {...register("fullName")}
                        className="h-12"
                        aria-invalid={errors.fullName ? "true" : "false"}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="text-sm text-destructive" role="alert">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium">
                        Company *
                      </Label>
                      <Input
                        id="company"
                        {...register("company")}
                        className="h-12"
                        aria-invalid={errors.company ? "true" : "false"}
                        aria-describedby={errors.company ? "company-error" : undefined}
                      />
                      {errors.company && (
                        <p id="company-error" className="text-sm text-destructive" role="alert">
                          {errors.company.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Work Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="h-12"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone (optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-sm font-medium">
                        Project Type *
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("projectType", value)}
                      >
                        <SelectTrigger
                          id="projectType"
                          className="h-12"
                          aria-invalid={errors.projectType ? "true" : "false"}
                          aria-describedby={errors.projectType ? "projectType-error" : undefined}
                        >
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ci-rooftop">C&I rooftop</SelectItem>
                          <SelectItem value="utility-microgrid">
                            Utility / Microgrid
                          </SelectItem>
                          <SelectItem value="ev-charging">
                            EV charging hub
                          </SelectItem>
                          <SelectItem value="resort-hospitality">
                            Resort / Hospitality
                          </SelectItem>
                          <SelectItem value="industrial-backup">
                            Industrial backup
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.projectType && (
                        <p id="projectType-error" className="text-sm text-destructive" role="alert">
                          {errors.projectType.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message / Requirements *
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        rows={5}
                        className="resize-none"
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-sm text-destructive" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={consent}
                          onCheckedChange={(checked) =>
                            setValue("consent", checked as boolean)
                          }
                          aria-invalid={errors.consent ? "true" : "false"}
                          aria-describedby={errors.consent ? "consent-error" : undefined}
                        />
                        <Label
                          htmlFor="consent"
                          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                        >
                          I agree to be contacted about NESS solutions and
                          understand the privacy policy. *
                        </Label>
                      </div>
                      {errors.consent && (
                        <p id="consent-error" className="text-sm text-destructive" role="alert">
                          {errors.consent.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      id="cta-submit-contact"
                      data-cta="submit-contact"
                      className="w-full bg-energy hover:brightness-95 text-pearl rounded-xl px-6 py-6 text-base font-semibold focus-visible:ring-2 focus-visible:ring-energy/40 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Request a Callback"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      No spam. Your details are safe with us.
                    </p>
                  </form>
                </div>
              ) : (
                <div
                  className="bg-card rounded-2xl p-12 border border-border text-center space-y-6"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-energy/10 flex items-center justify-center">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M26.6667 8L12 22.6667L5.33337 16"
                          stroke="hsl(var(--energy-core))"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Thanks. We'll take it from here.
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                    We'll reach out within one business day. Meanwhile, check your
                    inbox for a quick commissioning checklist.
                  </p>
                  <Button
                    onClick={scrollToTop}
                    variant="outline"
                    className="rounded-xl px-6 py-3"
                  >
                    Back to Top
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactInstaller;
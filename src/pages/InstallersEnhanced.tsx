import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, Calculator, Award, Users, Wrench, BookOpen, Download, 
  Sparkles, CheckCircle, Target, Clock, Play, Star, Quote, MapPin,
  TrendingUp, Building2, Phone, Mail, Calendar, FileText, Zap,
  ChevronRight, Upload, User, Shield, Trophy, Briefcase, Send
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MagneticButton, PlayButton, FloatingCard, ProgressiveDisclosure, ParallaxContainer } from "@/components/EnhancedInteractions";
import SystemConfigurator from "@/components/SystemConfigurator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import heroIndustrialInstallation from "@/assets/hero-industrial-installation.jpg";
import heroResidentialInstallation from "@/assets/hero-residential-installation.jpg";
import trainingWorkshop from "@/assets/training-workshop.jpg";
import configuratorTool from "@/assets/configurator-tool.jpg";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const InstallersEnhanced = () => {
  const { toast } = useToast();

  const handleJoinMovement = () => {
    toast({
      title: "Welcome to the movement!",
      description: "We'll contact you within 24 hours to welcome you to the family."
    });
  };

  return (
    <Layout>
      {/* Hero - Business First */}
      <section className="relative min-h-[60vh] flex items-center bg-background">
        <div className="max-w-6xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-7xl md:text-8xl font-light text-foreground leading-tight mb-8 tracking-tight">
              Certified
              <br />
              <span className="text-primary">Installer Program</span>
            </h1>
            
            <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
              Premium margins. Technical support. Certification training. 
              Build a profitable clean energy business.
            </p>

            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-full"
              onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Program Details
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section id="program" className="py-32 bg-muted/10">
        <div className="max-w-6xl mx-auto px-8">
          
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
              Program Structure
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Certification */}
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-4">Certification</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>3-day technical training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Hands-on installation practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>System design & commissioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Safety & troubleshooting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-4">Support</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Dedicated technical hotline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Remote diagnostics access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Marketing collateral library</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Lead generation assistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Economics */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-4">Economics</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>25-30% gross margins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Territory exclusivity options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>30-day payment terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Volume-based incentives</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-8">
          <Card className="border-border">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                
                <div className="space-y-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-xl text-foreground leading-relaxed">
                    "Margins are solid. Support picks up in 2 rings. No callbacks on 200+ installations. 
                    That's all I need."
                  </p>
                  
                  <div className="space-y-1">
                    <div className="text-lg font-medium text-foreground">Rajesh Singh</div>
                    <div className="text-sm text-muted-foreground">Solar Solutions Mumbai</div>
                    <div className="text-sm text-muted-foreground">Mumbai, Maharashtra</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <div className="text-4xl font-light text-primary mb-2">₹2.4Cr</div>
                    <div className="text-sm text-muted-foreground">Annual revenue</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <div className="text-2xl font-light text-foreground">450+</div>
                      <div className="text-xs text-muted-foreground">Installations</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <div className="text-2xl font-light text-foreground">3.5yr</div>
                      <div className="text-xs text-muted-foreground">Partner since</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-32 bg-muted/10">
        <div className="max-w-2xl mx-auto px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-5xl font-light text-foreground mb-4">
              Apply Now
            </h2>
            <p className="text-xl text-muted-foreground">
              Review within 48 hours
            </p>
          </div>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Your name" />
                  <Input placeholder="Company name" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input type="email" placeholder="Email" />
                  <Input placeholder="Phone" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="City, State" />
                  <Input type="number" placeholder="Years experience" />
                </div>
                <Textarea placeholder="Why do you want to become a certified installer?" rows={3} />

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                  onClick={handleJoinMovement}
                >
                  Submit Application
                  <Send className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Review within 48 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Vision - Visual Story */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={trainingWorkshop}
            alt="NESS partners building the future"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <div className="text-5xl md:text-7xl font-thin text-white mb-8 leading-[0.85] tracking-tight">
                This is how
                <br />
                <span className="text-white/60">legends are built</span>
              </div>
              <div className="text-xl text-white/80 font-light leading-relaxed">
                Not just installing systems. Creating sanctuaries. Building legacies.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Tools Showcase */}
      <section className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-12">
              <div className="space-y-8">
                <Badge variant="outline" className="px-4 py-2">
                  <Calculator className="w-4 h-4 mr-2" />
                  Smart Tools
                </Badge>

                <h2 className="text-6xl font-extralight text-foreground leading-[0.85] tracking-tight">
                  System
                  <br />
                  configurator
                </h2>

                <p className="text-lg font-light text-muted-foreground leading-relaxed">
                  Generate accurate system specifications and professional proposals in minutes with our advanced AI-powered configuration tool.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  "Load pattern analysis",
                  "Optimal component sizing", 
                  "Environmental impact reports",
                  "Professional documentation"
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MagneticButton variant="primary" size="lg">
                    <Calculator className="mr-2 w-5 h-5" />
                    Launch configurator
                  </MagneticButton>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                  <SystemConfigurator />
                </DialogContent>
              </Dialog>
            </div>

            <FloatingCard className="overflow-hidden" delay={0.3}>
              <img 
                src={configuratorTool}
                alt="System configurator tool"
                className="w-full h-full object-cover"
              />
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Final Call to Action - Steve Jobs Style */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-glow/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
          <div className="space-y-12">
            <h2 className="font-display text-5xl md:text-7xl font-thin text-background leading-[0.85] tracking-tight">
              The future
              <br />
              <span className="text-background/60">starts now</span>
            </h2>
            
            <p className="text-xl font-light text-background/80 leading-relaxed max-w-2xl mx-auto">
              Join the movement that's transforming how families feel about energy. 
              Your business. Your purpose. Your children's legacy.
            </p>
            
            <MagneticButton variant="secondary" size="lg">
              <Link to="#join" className="flex items-center">
                Join the Movement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </MagneticButton>
            
            <div className="text-sm text-background/50 mt-8">
              The revolution needs you. Are you ready?
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InstallersEnhanced;

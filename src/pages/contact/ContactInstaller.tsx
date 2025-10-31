import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form data:", data);
      setIsSubmitted(true);
      toast({
        title: "Request received",
        description: "We'll reach out within one business day.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
    <Layout>
      <div className="bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-24 px-6">
          <div className="mx-auto max-w-screen-xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <p className="text-sm font-semibold tracking-wider uppercase text-energy">
                  For EPC Installers
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  The easiest battery you'll ever install.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Powered by digital intelligence. Built for reliability—without the headaches.
                </p>
                <p className="text-xs text-muted-foreground">
                  Fix it. Forget it. Powered by Digital Trust.
                </p>
                <Button
                  onClick={scrollToContact}
                  id="cta-become-partner"
                  data-cta="become-partner"
                  className="bg-energy hover:brightness-95 text-white rounded-xl px-6 py-6 text-base font-semibold focus-visible:ring-2 focus-visible:ring-energy/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Become a Nunam Partner
                </Button>
              </div>
              
              <div className="relative animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/20">
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-auto"
                    aria-hidden="true"
                  >
                    {/* Installer figure */}
                    <circle cx="200" cy="80" r="25" fill="hsl(var(--graphite))" />
                    <rect x="180" y="110" width="40" height="60" rx="5" fill="hsl(var(--graphite))" />
                    <rect x="165" y="125" width="70" height="8" rx="4" fill="hsl(var(--energy-core))" />
                    
                    {/* Battery unit */}
                    <rect x="100" y="180" width="80" height="100" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
                    <rect x="110" y="200" width="60" height="40" rx="4" fill="hsl(var(--energy-core))" opacity="0.2" />
                    
                    {/* Dashboard with green checkmark */}
                    <rect x="220" y="180" width="100" height="80" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
                    <circle cx="270" cy="220" r="20" fill="hsl(var(--energy-core))" opacity="0.2" />
                    <path d="M 260 220 L 267 227 L 280 210" stroke="hsl(var(--energy-core))" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="235" y="253" fontSize="10" fill="hsl(var(--energy-core))" fontWeight="600">Verified</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Reality - Empathy Block */}
        <section className="py-20 md:py-24 px-6 border-t border-border">
          <div className="mx-auto max-w-screen-xl">
            <div className="max-w-[48ch] mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                Every installer knows this moment.
              </h2>
              <div className="text-lg md:text-xl text-muted-foreground space-y-4">
                <p>The panels go up smooth.</p>
                <p>The inverter syncs perfectly.</p>
                <p>Then comes the battery — and the pause.</p>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-foreground">
                One wrong configuration, and the customer calls never stop.
              </p>
            </div>
          </div>
        </section>

        {/* The Shift - Solution Block */}
        <section className="py-20 md:py-24 px-6 bg-muted/30">
          <div className="mx-auto max-w-screen-xl">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-medium text-foreground text-center">
                Nunam ends that story.
              </h2>
              <div className="text-lg md:text-xl text-muted-foreground space-y-4 text-center">
                <p>
                  Our batteries run on a digital backbone — auto-configured,
                  cloud-verified, and always monitored.
                </p>
                <p>You plug it in, and it just works.</p>
                <p>
                  Health reports, live data, and smart alerts are built in — no
                  guesswork.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border text-sm text-muted-foreground">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="hsl(var(--energy-core))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Auto-configured
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border text-sm text-muted-foreground">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="hsl(var(--energy-core))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Cloud-verified
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border text-sm text-muted-foreground">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="hsl(var(--energy-core))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Smart alerts
                </span>
              </div>

              <div className="pt-8 flex justify-center">
                <div className="relative w-full max-w-md h-32 overflow-hidden">
                  <svg
                    viewBox="0 0 400 100"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    <rect
                      x="50"
                      y="40"
                      width="300"
                      height="20"
                      rx="10"
                      fill="hsl(var(--border))"
                    />
                    <rect
                      x="50"
                      y="40"
                      width="0"
                      height="20"
                      rx="10"
                      fill="hsl(var(--energy-core))"
                      className="animate-[grow_800ms_ease-out_forwards]"
                    >
                      <animate
                        attributeName="width"
                        from="0"
                        to="300"
                        dur="800ms"
                        fill="freeze"
                      />
                    </rect>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 md:py-24 px-6">
          <div className="mx-auto max-w-screen-xl">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground text-center mb-12">
              Why EPCs choose Nunam.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Plug & play setup",
                  description: "No hidden menus. No messy calibration.",
                },
                {
                  title: "Fewer customer calls",
                  description: "Predictable systems, happier clients.",
                },
                {
                  title: "Faster handovers",
                  description: "Commission, sign off, move on.",
                },
                {
                  title: "Higher margins",
                  description: "Time saved is margin protected.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border/20 transition-all duration-200 hover:shadow-lifted hover:border-border/40"
                  style={{
                    animation: `fade-in-up 600ms ease-out forwards`,
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                  }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof Strip */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="mx-auto max-w-screen-xl">
            <div className="text-center space-y-4">
              <span className="inline-block bg-energy text-white rounded-full px-3 py-1 text-xs uppercase tracking-wide font-semibold">
                Field-proven
              </span>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Already running at airports and bus depots across India — zero
                diesel, zero downtime.
              </p>
            </div>
          </div>
        </section>

        {/* Belief / Purpose Block */}
        <section className="py-20 md:py-24 px-6">
          <div className="mx-auto max-w-screen-xl">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                India doesn't just need more solar — it needs power that stays
                trusted.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                You build the future. We keep it running — quietly, continuously,
                confidently.
              </p>
              <Button
                onClick={scrollToContact}
                data-cta="become-partner-2"
                className="bg-energy hover:brightness-95 text-white rounded-xl px-6 py-6 text-base font-semibold focus-visible:ring-2 focus-visible:ring-energy/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                Become a Nunam Partner
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-24 px-6 bg-muted/30">
          <div className="mx-auto max-w-screen-xl">
            <div className="max-w-2xl mx-auto">
              {!isSubmitted ? (
                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                      Talk to the Nunam team.
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
                          I agree to be contacted about Nunam solutions and
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
                      className="w-full bg-energy hover:brightness-95 text-white rounded-xl px-6 py-6 text-base font-semibold focus-visible:ring-2 focus-visible:ring-energy/40 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
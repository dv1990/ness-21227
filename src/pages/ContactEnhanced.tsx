import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientOrbField } from "@/components/ui/gradient-orb";
import { SmoothFade } from "@/components/ui/smooth-animations";

const ContactEnhanced = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { sendEmail } = await import('@/lib/email-service');

      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || '',
        message: `Location: ${formData.location}\nProperty Type: ${formData.propertyType}\n\n${formData.message}`,
        form_type: 'General Contact',
        location: formData.location,
        property_type: formData.propertyType,
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        propertyType: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout className="-mt-16">
      {/* Hero */}
      <section className="relative pt-24 pb-8 sm:py-32 bg-charcoal">
        <GradientOrbField />
        <SmoothFade>
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center relative z-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-pearl leading-tight mb-4 sm:mb-8">
              Get in touch
            </h1>

            <p className="text-lg sm:text-xl text-pearl/60 mb-6 sm:mb-12">
              Request specifications, schedule site visit, or ask technical questions.
            </p>
          </div>
        </SmoothFade>
      </section>

      {/* Contact Form */}
      <section className="py-8 sm:py-16 bg-graphite">
        <SmoothFade>
          <div className="max-w-2xl mx-auto px-4 sm:px-8">
            <Card className="border-pearl/10 bg-pearl/[0.03]">
              <CardContent className="p-6 sm:p-12">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-pearl/80">Name</Label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/40 focus:border-energy/50 focus:ring-energy/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-pearl/80">Email</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/40 focus:border-energy/50 focus:ring-energy/20"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-pearl/80">Phone</Label>
                      <Input
                        type="tel"
                        inputMode="tel"
                        placeholder="+91"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/40 focus:border-energy/50 focus:ring-energy/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-pearl/80">Location</Label>
                      <Input
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/40 focus:border-energy/50 focus:ring-energy/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-pearl/80">Property type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: "apartment", label: "Apartment" },
                        { id: "villa", label: "Villa" },
                        { id: "office", label: "Office" },
                        { id: "factory", label: "Factory" }
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() => handleInputChange('propertyType', option.id)}
                          className={cn(
                            "p-3 rounded-xl border text-sm transition-all",
                            formData.propertyType === option.id
                              ? "border-energy bg-energy/10 text-energy"
                              : "border-pearl/10 hover:border-energy/50 text-pearl/60"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-pearl/80">Message</Label>
                    <Textarea
                      placeholder="What can we help you with?"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/40 focus:border-energy/50 focus:ring-energy/20"
                    />
                  </div>

                  <Button
                    className="w-full bg-energy hover:bg-energy-bright text-charcoal font-semibold rounded-full py-6 text-lg"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>

                  <p className="text-sm text-center text-pearl/40">
                    Response within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SmoothFade>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-charcoal">
        <SmoothFade>
          <div className="max-w-4xl mx-auto px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-energy/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6 text-energy" />
                </div>
                <h3 className="font-medium text-pearl">Phone</h3>
                <p className="text-sm text-pearl/60">+91 80 1234 5678</p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-energy/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6 text-energy" />
                </div>
                <h3 className="font-medium text-pearl">Email</h3>
                <p className="text-sm text-pearl/60">hello@ness.energy</p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-energy/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-energy" />
                </div>
                <h3 className="font-medium text-pearl">Response time</h3>
                <p className="text-sm text-pearl/60">Within 24 hours</p>
              </div>
            </div>
          </div>
        </SmoothFade>
      </section>

      {/* Office Location */}
      <section className="py-16 bg-graphite">
        <SmoothFade>
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="w-16 h-16 bg-energy/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-energy" />
            </div>
            <h2 className="text-3xl font-light text-pearl mb-4">Visit us</h2>
            <p className="text-pearl/60 mb-2">
              123 Tech Park, Whitefield
            </p>
            <p className="text-pearl/60">
              Bangalore, Karnataka 560066
            </p>
          </div>
        </SmoothFade>
      </section>
    </Layout>
  );
};

export default ContactEnhanced;

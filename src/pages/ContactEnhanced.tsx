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
    <Layout>
      {/* Hero */}
      <section className="relative py-32 bg-background">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-light text-foreground leading-tight mb-8">
            Get in touch
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12">
            Request specifications, schedule site visit, or ask technical questions.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-8">
          <Card className="border-border">
            <CardContent className="p-12">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      placeholder="+91"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Property type</Label>
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
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea 
                    placeholder="What can we help you with?"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                  onClick={(e) => handleSubmit(e)}
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Response within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Phone</h3>
              <p className="text-sm text-muted-foreground">+91 80 1234 5678</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Email</h3>
              <p className="text-sm text-muted-foreground">hello@ness.energy</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Response time</h3>
              <p className="text-sm text-muted-foreground">Within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-light text-foreground mb-4">Visit us</h2>
          <p className="text-muted-foreground mb-2">
            123 Tech Park, Whitefield
          </p>
          <p className="text-muted-foreground">
            Bangalore, Karnataka 560066
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ContactEnhanced;

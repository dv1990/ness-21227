import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ContactFormProps {
  type: "homeowner" | "distributor" | "installer";
}

const ContactForm = ({ type }: ContactFormProps) => {
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    // TODO: Implement actual form submission logic
  };

  const renderHomeownerFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name <span className="text-destructive" aria-label="required">*</span></Label>
          <Input 
            id="name" 
            name="name"
            placeholder="Your name" 
            required 
            aria-required="true"
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number <span className="text-destructive" aria-label="required">*</span></Label>
          <Input 
            id="phone" 
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="+91 98765 43210" 
            required 
            aria-required="true"
            autoComplete="tel"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email <span className="text-destructive" aria-label="required">*</span></Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          placeholder="your@email.com" 
          required 
          aria-required="true"
          autoComplete="email"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City <span className="text-destructive" aria-label="required">*</span></Label>
          <Input 
            id="city" 
            name="city"
            placeholder="Your city" 
            required 
            aria-required="true"
            autoComplete="address-level2"
          />
        </div>
        <div>
          <Label htmlFor="pin">PIN Code <span className="text-destructive" aria-label="required">*</span></Label>
          <Input 
            id="pin" 
            name="pin"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="400001" 
            required 
            aria-required="true"
            autoComplete="postal-code"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="solar-status">Current Solar/Inverter Setup</Label>
        <Select name="solar-status">
          <SelectTrigger id="solar-status" aria-label="Current Solar/Inverter Setup">
            <SelectValue placeholder="Select your current setup" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No solar system</SelectItem>
            <SelectItem value="solar-only">Solar panels only</SelectItem>
            <SelectItem value="inverter-only">Inverter only</SelectItem>
            <SelectItem value="complete">Complete solar + inverter</SelectItem>
            <SelectItem value="unknown">Not sure</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="contact-pref">Preferred Contact Method</Label>
        <Select name="contact-pref">
          <SelectTrigger id="contact-pref" aria-label="Preferred Contact Method">
            <SelectValue placeholder="How should we reach you?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="call">Phone call</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderDistributorFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" placeholder="Your company" required />
        </div>
        <div>
          <Label htmlFor="gstin">GSTIN (Optional)</Label>
          <Input id="gstin" placeholder="22AAAAA0000A1Z5" />
        </div>
      </div>
      <div>
        <Label htmlFor="regions">Operating Regions</Label>
        <Input id="regions" placeholder="States/regions you operate in" />
      </div>
      <div>
        <Label htmlFor="volume">Monthly Volume</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Typical monthly sales volume" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-10">0-10 systems</SelectItem>
            <SelectItem value="10-50">10-50 systems</SelectItem>
            <SelectItem value="50-100">50-100 systems</SelectItem>
            <SelectItem value="100+">100+ systems</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderInstallerFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" placeholder="Your installation company" required />
        </div>
        <div>
          <Label htmlFor="license">License Number (Optional)</Label>
          <Input id="license" placeholder="Installation license" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="years">Years in Business</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="system-size">Typical System Size</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Most common installations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3kw">1-3 kW (Residential)</SelectItem>
              <SelectItem value="3-10kw">3-10 kW (Large Residential)</SelectItem>
              <SelectItem value="10-100kw">10-100 kW (Commercial)</SelectItem>
              <SelectItem value="100kw+">100 kW+ (Industrial)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="training">Training Interest</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Training preferences" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online training</SelectItem>
            <SelectItem value="onsite">On-site training</SelectItem>
            <SelectItem value="both">Both online and on-site</SelectItem>
            <SelectItem value="certified">Certification programs</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const getFields = () => {
    switch (type) {
      case "homeowner":
        return renderHomeownerFields();
      case "distributor":
        return renderDistributorFields();
      case "installer":
        return renderInstallerFields();
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {getFields()}
      
      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea 
          id="message" 
          name="message"
          placeholder="Tell us more about your requirements..." 
          rows={4}
          aria-label="Additional message or requirements"
        />
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked as boolean)}
          required
          aria-required="true"
          aria-describedby="consent-description"
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed">
          <span id="consent-description">
            I consent to NESS Energy contacting me about their products and services. 
            I understand my data will be processed according to their{" "}
            <a 
              href="/privacy" 
              className="text-primary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              privacy policy
            </a>.
          </span>
        </Label>
      </div>

      <Button 
        type="submit" 
        className="btn-primary btn-large w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2" 
        disabled={!consent || isSubmitting}
        aria-label="Submit contact form"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="sm" label="Submitting..." />
            Submitting...
          </span>
        ) : (
          'Send Message'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Protected by hCaptcha. By submitting, you agree to our terms of service.
      </p>
    </form>
  );
};

export default ContactForm;
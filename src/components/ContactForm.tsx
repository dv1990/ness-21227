import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactFormProps {
  type: "homeowner" | "distributor" | "installer";
}

const ContactForm = ({ type }: ContactFormProps) => {
  const [formData, setFormData] = useState({});
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    // Form submission will be handled by the backend integration
  };

  const renderHomeownerFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Your name" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="your@email.com" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="Your city" required />
        </div>
        <div>
          <Label htmlFor="pin">PIN Code</Label>
          <Input id="pin" placeholder="400001" required />
        </div>
      </div>
      <div>
        <Label htmlFor="solar-status">Current Solar/Inverter Setup</Label>
        <Select>
          <SelectTrigger>
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
        <Select>
          <SelectTrigger>
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
        <Textarea id="message" placeholder="Tell us more about your requirements..." rows={4} />
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked as boolean)}
          required
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed">
          I consent to NESS Energy contacting me about their products and services. 
          I understand my data will be processed according to their{" "}
          <a href="/privacy" className="text-primary underline">privacy policy</a>.
        </Label>
      </div>

      <Button type="submit" className="btn-primary btn-large w-full" disabled={!consent}>
        Send Message
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Protected by hCaptcha. By submitting, you agree to our terms of service.
      </p>
    </form>
  );
};

export default ContactForm;
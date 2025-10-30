import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface QuoteContactFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    city: string;
    pincode: string;
    message: string;
  };
  consent: boolean;
  isSubmitting: boolean;
  errors?: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onConsentChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const QuoteContactForm: React.FC<QuoteContactFormProps> = ({
  formData,
  consent,
  isSubmitting,
  errors = {},
  onChange,
  onConsentChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
          Contact Information
        </h3>

        {/* Name and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quote-name">
              Full Name <span className="text-destructive" aria-label="required">*</span>
            </Label>
            <Input
              id="quote-name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-phone">
              Phone Number <span className="text-destructive" aria-label="required">*</span>
            </Label>
            <Input
              id="quote-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs text-destructive" role="alert">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="quote-email">
            Email Address <span className="text-destructive" aria-label="required">*</span>
          </Label>
          <Input
            id="quote-email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* City and Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quote-city">City</Label>
            <Input
              id="quote-city"
              type="text"
              placeholder="Your city"
              value={formData.city}
              onChange={(e) => onChange('city', e.target.value)}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? 'city-error' : undefined}
              className={errors.city ? 'border-destructive' : ''}
            />
            {errors.city && (
              <p id="city-error" className="text-xs text-destructive" role="alert">
                {errors.city}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-pincode">PIN Code</Label>
            <Input
              id="quote-pincode"
              type="text"
              placeholder="400001"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => onChange('pincode', e.target.value)}
              aria-invalid={!!errors.pincode}
              aria-describedby={errors.pincode ? 'pincode-error' : undefined}
              className={errors.pincode ? 'border-destructive' : ''}
            />
            {errors.pincode && (
              <p id="pincode-error" className="text-xs text-destructive" role="alert">
                {errors.pincode}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="quote-message">Additional Requirements (Optional)</Label>
          <Textarea
            id="quote-message"
            placeholder="Any specific requirements or questions?"
            rows={4}
            value={formData.message}
            onChange={(e) => onChange('message', e.target.value)}
            maxLength={1000}
            aria-describedby="message-count"
          />
          <p id="message-count" className="text-xs text-muted-foreground text-right">
            {formData.message.length}/1000
          </p>
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="quote-consent"
            checked={consent}
            onCheckedChange={onConsentChange}
            required
            aria-required="true"
          />
          <Label 
            htmlFor="quote-consent" 
            className="text-sm leading-relaxed cursor-pointer"
          >
            I consent to NESS Energy contacting me about their products and services.
            <span className="text-destructive" aria-label="required"> *</span>
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!consent || isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="mr-2">Sending...</span>
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          </>
        ) : (
          'Get My Custom Quote'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to receive communications from NESS Energy.
        We typically respond within 24 hours.
      </p>
    </form>
  );
};

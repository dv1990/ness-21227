import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Check, Home, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


// Import types and config
import type { Product } from '@/types/product';
import { PRODUCTS, COMMON_APPLIANCES, HOME_SIZES, SOLAR_STATUS } from '@/config/products';
import { quoteRequestSchema } from '@/lib/validation';

// Import new components
import { WizardProgress } from './forms/WizardProgress';
import { ProductCard } from './forms/ProductCard';
import { ApplianceSelector } from './forms/ApplianceSelector';
import { ConfigurationSummary } from './forms/ConfigurationSummary';
import { QuoteContactForm } from './forms/QuoteContactForm';

const STEP_LABELS = ['Choose Product', 'Size Your Home', 'Contact Details'];

export const ProductSelectorWizard: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [homeSize, setHomeSize] = useState('');
  const [hasSolar, setHasSolar] = useState<string>('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    pincode: '',
    message: ''
  });

  // Calculate recommended product based on appliances
  const calculateRecommendation = (): Product => {
    const totalWattHours = selectedAppliances.reduce((sum, appId) => {
      const appliance = COMMON_APPLIANCES.find(a => a.id === appId);
      return sum + ((appliance?.watts || 0) * (appliance?.hours || 0));
    }, 0);

    const kWhNeeded = totalWattHours / 1000;

    if (kWhNeeded < 6) return PRODUCTS[0];
    if (kWhNeeded < 12) return PRODUCTS[1];
    return PRODUCTS[2];
  };

  const toggleAppliance = (appId: string) => {
    setSelectedAppliances(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setStep(2);
  };

  const handleNext = () => {
    if (step === 2) {
      // Auto-recommend based on selections
      const recommended = calculateRecommendation();
      setSelectedProduct(recommended);
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
    setValidationErrors({});
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data using Zod
    const validation = quoteRequestSchema.safeParse(formData);
    
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach(err => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setValidationErrors(errors);
      
      toast({
        title: "Validation Error",
        description: "Please check all required fields and try again.",
        variant: "destructive"
      });
      return;
    }

    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive information from NESS Energy.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({});

    try {
      const totalWatts = selectedAppliances.reduce((sum, appId) => {
        const appliance = COMMON_APPLIANCES.find(a => a.id === appId);
        return sum + (appliance?.watts || 0);
      }, 0);

      const appliancesList = selectedAppliances.map(appId => {
        const appliance = COMMON_APPLIANCES.find(a => a.id === appId);
        return appliance ? `- ${appliance.name}: ${appliance.watts}W (${appliance.hours}h daily)` : '';
      }).filter(Boolean).join('\n');

      const emailContent = `
New Custom Quote Request

CUSTOMER DETAILS:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
City: ${formData.city || 'Not provided'}
Pincode: ${formData.pincode || 'Not provided'}

CONFIGURATION:
Selected Product: ${selectedProduct?.name} (${selectedProduct?.tier})
Home Size: ${homeSize}
Solar Panels: ${hasSolar}
Total Power Requirement: ${totalWatts}W

SELECTED APPLIANCES:
${appliancesList}

CUSTOMER MESSAGE:
${formData.message || 'No additional message'}
      `.trim();

      // EmailJS disabled until configured - see EMAILJS_SETUP.md
      if (import.meta.env.DEV) {
        console.info('Quote request details:', emailContent);
      }

      toast({
        title: "Configuration Saved!",
        description: "Please email your quote request to contact@nunam.com. We'll respond within 24 hours.",
      });

      // Reset form after successful submission
      setTimeout(() => {
        setStep(1);
        setSelectedProduct(null);
        setSelectedAppliances([]);
        setHomeSize('');
        setHasSolar('');
        setFormData({ name: '', phone: '', email: '', city: '', pincode: '', message: '' });
        setConsent(false);
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us at contact@nunam.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <WizardProgress 
        currentStep={step} 
        totalSteps={3} 
        stepLabels={STEP_LABELS}
      />

      {/* Step 1: Product Selection */}
      {step === 1 && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-light">Choose your power level</h2>
            <p className="text-lg text-muted-foreground">Pick the solution that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProduct?.id === product.id}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Home Sizing */}
      {step === 2 && (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-light">Size it for your home</h2>
            <p className="text-lg text-muted-foreground">Help us recommend the perfect capacity</p>
          </div>

          <Card className="p-8 space-y-8">
            {/* Home Size */}
            <div className="space-y-4">
              <Label className="text-lg flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" aria-hidden="true" />
                What's your home size?
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {HOME_SIZES.map((size) => (
                  <Button
                    key={size}
                    variant={homeSize === size ? 'default' : 'outline'}
                    onClick={() => setHomeSize(size)}
                    className="h-auto py-4"
                    aria-pressed={homeSize === size}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Solar Status */}
            <div className="space-y-4">
              <Label className="text-lg flex items-center gap-2">
                <Sun className="w-5 h-5 text-primary" aria-hidden="true" />
                Do you have solar panels?
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {SOLAR_STATUS.map((status) => (
                  <Button
                    key={status}
                    variant={hasSolar === status ? 'default' : 'outline'}
                    onClick={() => setHasSolar(status)}
                    aria-pressed={hasSolar === status}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            {/* Appliance Selector */}
            <ApplianceSelector
              appliances={COMMON_APPLIANCES}
              selectedAppliances={selectedAppliances}
              onToggle={toggleAppliance}
            />

            {/* Recommendation Preview */}
            {selectedAppliances.length > 0 && (
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" aria-hidden="true" />
                  Based on your selections
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We recommend: <span className="text-foreground font-medium">{calculateRecommendation().name}</span>
                </p>
                <div className="text-sm text-muted-foreground">
                  Total estimated load: {selectedAppliances.reduce((sum, appId) => {
                    const appliance = COMMON_APPLIANCES.find(a => a.id === appId);
                    return sum + (appliance?.watts || 0);
                  }, 0)}W
                </div>
              </div>
            )}
          </Card>

          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={handleBack} size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              size="lg"
              disabled={!homeSize || !hasSolar || selectedAppliances.length === 0}
            >
              Continue to Contact
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Form */}
      {step === 3 && selectedProduct && (
        <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-light">Review & Submit</h2>
            <p className="text-lg text-muted-foreground">Confirm your details to get a custom quote</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ConfigurationSummary
              selectedProduct={selectedProduct}
              homeSize={homeSize}
              hasSolar={hasSolar}
              selectedAppliances={selectedAppliances}
              appliances={COMMON_APPLIANCES}
            />

            <Card className="p-6">
              <QuoteContactForm
                formData={formData}
                consent={consent}
                isSubmitting={isSubmitting}
                errors={validationErrors}
                onChange={handleFormChange}
                onConsentChange={setConsent}
                onSubmit={handleSubmit}
              />
            </Card>
          </div>

          <div className="flex justify-start">
            <Button variant="outline" onClick={handleBack} size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Configuration
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

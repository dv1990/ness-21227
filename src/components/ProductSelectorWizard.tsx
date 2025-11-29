import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Check, Home, Sun, Edit, Zap, Battery, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { safeLocalStorage } from '@/lib/safe-storage';


// Import types and config
import type { Product, Appliance } from '@/types/product';
import { PRODUCTS, COMMON_APPLIANCES, HOME_SIZES, SOLAR_STATUS } from '@/config/products';
import { quoteRequestSchema } from '@/lib/validation';

// Import new components
import { WizardProgress } from './forms/WizardProgress';
import { ProductCard } from './forms/ProductCard';
import { ApplianceSelector } from './forms/ApplianceSelector';
import { ConfigurationSummary } from './forms/ConfigurationSummary';
import { QuoteContactForm } from './forms/QuoteContactForm';

const STEP_LABELS = ['Choose Product', 'Size Your Battery', 'Contact Details'];
const STORAGE_KEY = 'ness-wizard-progress';

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
  const [customAppliances, setCustomAppliances] = useState<Appliance[]>([]);
  const [backupDuration, setBackupDuration] = useState<number>(8);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    pincode: '',
    message: ''
  });

  // Load saved progress on mount with validation
  useEffect(() => {
    const parsed = safeLocalStorage.getJSON<{
      step?: number;
      selectedProduct?: Product | null;
      selectedAppliances?: string[];
      homeSize?: string;
      hasSolar?: string;
      backupDuration?: number;
      customAppliances?: Appliance[];
      timestamp?: number;
    }>(STORAGE_KEY);

    if (parsed && parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
      setStep(parsed.step || 1);
      setSelectedProduct(parsed.selectedProduct || null);
      setSelectedAppliances(parsed.selectedAppliances || []);
      setHomeSize(parsed.homeSize || '');
      setHasSolar(parsed.hasSolar || '');
      setBackupDuration(parsed.backupDuration || 8);
      setCustomAppliances(parsed.customAppliances || []);
    }
  }, []);

  // Save progress whenever state changes
  useEffect(() => {
    const saveData = {
      step,
      selectedProduct,
      selectedAppliances,
      homeSize,
      hasSolar,
      backupDuration,
      customAppliances,
      timestamp: Date.now()
    };
    safeLocalStorage.setJSON(STORAGE_KEY, saveData);
  }, [step, selectedProduct, selectedAppliances, homeSize, hasSolar, backupDuration, customAppliances]);

  // Smart defaults based on home size
  useEffect(() => {
    if (homeSize && selectedAppliances.length === 0) {
      const defaults: Record<string, string[]> = {
        '1-2 BHK': ['fridge', 'wifi', 'fan', 'lights'],
        '2-3 BHK': ['fridge', 'wifi', 'fan', 'lights', 'tv'],
        '3-4 BHK': ['ac', 'fridge', 'wifi', 'fan', 'lights', 'tv'],
        '4+ BHK / Villa': ['ac', 'fridge', 'wifi', 'fan', 'lights', 'tv']
      };
      const suggested = defaults[homeSize] || [];
      setSelectedAppliances(suggested);
    }
  }, [homeSize]);

  // Memoize all appliances array to prevent recreation on every render
  const allAppliances = useMemo(() => [...COMMON_APPLIANCES, ...customAppliances], [customAppliances]);

  // Enhanced calculation with peak load and backup duration - Memoized with useCallback
  const calculateRecommendation = useCallback((): { product: Product; peakLoad: number; dailyEnergy: number; alternatives?: Product[] } => {
    // Calculate peak load (simultaneous usage)
    const peakLoad = selectedAppliances.reduce((sum, appId) => {
      const appliance = allAppliances.find(a => a.id === appId);
      return sum + (appliance?.watts || 0);
    }, 0);

    // Calculate daily energy need
    const totalWattHours = selectedAppliances.reduce((sum, appId) => {
      const appliance = allAppliances.find(a => a.id === appId);
      return sum + ((appliance?.watts || 0) * (appliance?.hours || 0));
    }, 0);

    const dailyEnergy = totalWattHours / 1000; // kWh
    const backupEnergy = (peakLoad * backupDuration) / 1000; // kWh needed for desired backup

    // Consider both daily energy and backup duration
    const requiredCapacity = Math.max(dailyEnergy, backupEnergy);

    let primaryProduct: Product;
    let alternatives: Product[] = [];

    if (requiredCapacity < 6) {
      primaryProduct = PRODUCTS[0];
      alternatives = [PRODUCTS[1]];
    } else if (requiredCapacity < 12) {
      primaryProduct = PRODUCTS[1];
      alternatives = [PRODUCTS[0], PRODUCTS[2]];
    } else {
      primaryProduct = PRODUCTS[2];
      alternatives = [PRODUCTS[1]];
    }

    return { product: primaryProduct, peakLoad, dailyEnergy, alternatives };
  }, [selectedAppliances, allAppliances, backupDuration]);

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
      const recommendation = calculateRecommendation();
      setSelectedProduct(recommendation.product);
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handleEditStep = (targetStep: number) => {
    setStep(targetStep);
    setValidationErrors({});
  };

  const addCustomAppliance = (name: string, watts: number, hours: number) => {
    const newAppliance: Appliance = {
      id: `custom-${Date.now()}`,
      name,
      watts,
      hours,
      icon: Zap
    };
    setCustomAppliances(prev => [...prev, newAppliance]);
    setSelectedAppliances(prev => [...prev, newAppliance.id]);
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

  // Inline validation on blur
  const handleFieldBlur = (field: string, value: string) => {
    const fieldSchema = quoteRequestSchema.shape[field as keyof typeof quoteRequestSchema.shape];
    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);
      if (!result.success) {
        setValidationErrors(prev => ({
          ...prev,
          [field]: result.error.errors[0].message
        }));
      }
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
      // Use memoized totalWatts instead of recalculating
      const formTotalWatts = totalWatts;

      // Use memoized allAppliances instead of recreating
      const appliancesList = selectedAppliances.map(appId => {
        const appliance = allAppliances.find(a => a.id === appId);
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
Total Power Requirement: ${formTotalWatts}W

SELECTED APPLIANCES:
${appliancesList}

CUSTOMER MESSAGE:
${formData.message || 'No additional message'}
      `.trim();

      const { sendEmail } = await import('@/lib/email-service');
      
      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: emailContent,
        form_type: 'Product Selector Quote',
        selected_product: selectedProduct?.name || '',
        appliances: selectedAppliances.join(', '),
      });

      toast({
        title: "Quote Request Sent!",
        description: "We'll contact you within 24 hours with your personalized quote.",
      });

      // Clear saved progress and reset form
      safeLocalStorage.removeItem(STORAGE_KEY);
      setTimeout(() => {
        setStep(1);
        setSelectedProduct(null);
        setSelectedAppliances([]);
        setHomeSize('');
        setHasSolar('');
        setBackupDuration(8);
        setCustomAppliances([]);
        setFormData({ name: '', phone: '', email: '', city: '', pincode: '', message: '' });
        setConsent(false);
      }, 2000);

    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting form:', error);
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "Submission Failed",
        description: `${errorMessage}. Your progress is saved. Please try again or contact us at contact@nunam.com`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize expensive calculations to prevent recalculation on every render
  const totalWatts = useMemo(() => {
    return selectedAppliances.reduce((sum, appId) => {
      const appliance = allAppliances.find(a => a.id === appId);
      return sum + (appliance?.watts || 0);
    }, 0);
  }, [selectedAppliances, allAppliances]);

  const totalDailyEnergy = useMemo(() => {
    return selectedAppliances.reduce((sum, appId) => {
      const appliance = allAppliances.find(a => a.id === appId);
      return sum + ((appliance?.watts || 0) * (appliance?.hours || 0));
    }, 0) / 1000;
  }, [selectedAppliances, allAppliances]);

  // Memoize recommendation to prevent recalculation on every render
  const recommendation = useMemo(() => {
    if (selectedAppliances.length === 0) return null;
    return calculateRecommendation();
  }, [selectedAppliances.length, calculateRecommendation]);

  // Wrapper functions for backwards compatibility
  const getTotalWatts = useCallback(() => totalWatts, [totalWatts]);
  const getTotalDailyEnergy = useCallback(() => totalDailyEnergy, [totalDailyEnergy]);

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

      {/* Step 2: Battery Sizing */}
      {step === 2 && (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-light">Let's size your battery correctly</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell me which appliances you'd like to run during power cuts. I'll calculate the right battery capacity for you.
            </p>
          </div>

          {/* Real-time Stats Bar */}
          {selectedAppliances.length > 0 && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-medium">Peak Load</span>
                </div>
                <p className="text-xl font-bold">{getTotalWatts()}W</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <Battery className="w-4 h-4" />
                  <span className="text-xs font-medium">Daily Energy</span>
                </div>
                <p className="text-xl font-bold">{getTotalDailyEnergy().toFixed(1)} kWh</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">CO₂ Saved/Year</span>
                </div>
                <p className="text-xl font-bold">{(getTotalDailyEnergy() * 365 * 0.82).toFixed(1)} kg</p>
              </div>
            </div>
          )}

          <Card className="p-6 md:p-8 space-y-8">
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
                    className="h-auto py-3 md:py-4 text-sm md:text-base"
                    aria-pressed={hasSolar === status}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            {/* Backup Duration Preference */}
            <div className="space-y-4">
              <Label className="text-lg flex items-center gap-2">
                <Battery className="w-5 h-5 text-primary" aria-hidden="true" />
                How long should your backup last?
              </Label>
              <div className="grid grid-cols-4 gap-3">
                {[4, 8, 12, 24].map((hours) => (
                  <Button
                    key={hours}
                    variant={backupDuration === hours ? 'default' : 'outline'}
                    onClick={() => setBackupDuration(hours)}
                    className="h-auto py-3 md:py-4"
                    aria-pressed={backupDuration === hours}
                  >
                    {hours}h
                  </Button>
                ))}
              </div>
            </div>

            {/* Appliance Selector */}
            <ApplianceSelector
              appliances={[...COMMON_APPLIANCES, ...customAppliances]}
              selectedAppliances={selectedAppliances}
              onToggle={toggleAppliance}
              onAddCustom={addCustomAppliance}
            />

            {/* Enhanced Recommendation with Alternatives */}
            {recommendation && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl p-6 md:p-8 border border-primary/20 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-medium text-foreground">
                          Perfect! Here's your customized solution
                        </h3>
                        <p className="text-base text-muted-foreground">
                          Based on your power needs and {backupDuration}h backup requirement, we recommend: <span className="text-foreground font-semibold">{recommendation.product.name}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-background/50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <h4 className="font-medium text-foreground">Become a Sustainability Champion</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        By choosing solar + storage, you're joining the elite group of forward-thinking homeowners who are reducing carbon emissions and leading India's clean energy revolution. Your system will offset approximately <strong className="text-foreground">{(getTotalDailyEnergy() * 365 * 0.82 / 1000).toFixed(1)} tons of CO₂</strong> annually—equivalent to planting {Math.round(getTotalDailyEnergy() * 365 * 0.82 / 1000 * 45)} trees every year.
                      </p>
                    </div>
                  </div>

                  {/* Alternative Products */}
                  {recommendation.alternatives && recommendation.alternatives.length > 0 && (
                    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Also consider:</h4>
                      <div className="grid gap-3">
                        {recommendation.alternatives.map(alt => (
                          <div key={alt.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{alt.name}</p>
                              <p className="text-xs text-muted-foreground">{alt.idealFor}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedProduct(alt)}
                              className="text-primary hover:text-primary"
                            >
                              Select
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

          {/* Editable Summary Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">Product</h3>
                <Button variant="ghost" size="sm" onClick={() => handleEditStep(1)}>
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{selectedProduct.name}</p>
            </Card>
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">Configuration</h3>
                <Button variant="ghost" size="sm" onClick={() => handleEditStep(2)}>
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{homeSize} • {selectedAppliances.length} appliances • {backupDuration}h backup</p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ConfigurationSummary
              selectedProduct={selectedProduct}
              homeSize={homeSize}
              hasSolar={hasSolar}
              selectedAppliances={selectedAppliances}
              appliances={[...COMMON_APPLIANCES, ...customAppliances]}
              backupDuration={backupDuration}
            />

            <Card className="p-6">
              <QuoteContactForm
                formData={formData}
                consent={consent}
                isSubmitting={isSubmitting}
                errors={validationErrors}
                onChange={handleFormChange}
                onBlur={handleFieldBlur}
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

export default memo(ProductSelectorWizard);

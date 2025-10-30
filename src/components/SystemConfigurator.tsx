import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Battery, Home, Zap, Sun, IndianRupee, 
  Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SystemConfiguration {
  dailyLoad: number;
  peakLoad: number;
  backupHours: number;
  solarCapacity: number;
  batteryCapacity: number;
  inverterCapacity: number;
  systemType: 'hybrid' | 'off-grid' | 'grid-tie';
  location: string;
  roofArea: number;
}

interface SystemRecommendation {
  batteryUnits: number;
  solarPanels: number;
  inverterSize: number;
  totalCost: number;
  monthlySavings: number;
  paybackPeriod: number;
  co2Reduction: number;
  systemEfficiency: number;
}

const SystemConfigurator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("requirements");
  const [config, setConfig] = useState<SystemConfiguration>({
    dailyLoad: 0,
    peakLoad: 0,
    backupHours: 8,
    solarCapacity: 0,
    batteryCapacity: 0,
    inverterCapacity: 0,
    systemType: 'hybrid',
    location: '',
    roofArea: 0
  });
  
  const [recommendation, setRecommendation] = useState<SystemRecommendation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Appliance presets for quick load calculation
  const appliances = [
    { name: "LED Lights (10W)", power: 10, hours: 8 },
    { name: "Ceiling Fan (70W)", power: 70, hours: 12 },
    { name: "Refrigerator (150W)", power: 150, hours: 24 },
    { name: "TV (100W)", power: 100, hours: 6 },
    { name: "Laptop (65W)", power: 65, hours: 8 },
    { name: "Washing Machine (500W)", power: 500, hours: 1 },
    { name: "Air Conditioner (1500W)", power: 1500, hours: 8 },
    { name: "Water Heater (2000W)", power: 2000, hours: 2 }
  ];

  const [selectedAppliances, setSelectedAppliances] = useState<{[key: string]: number}>({});

  // Calculate system requirements
  const calculateSystem = () => {
    // Validate inputs
    if (config.dailyLoad === 0 || config.peakLoad === 0 || config.roofArea === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before calculating.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const { dailyLoad, peakLoad, backupHours, solarCapacity, roofArea } = config;
      
      // Battery sizing (kWh needed for backup)
      const requiredBatteryCapacity = (dailyLoad * backupHours) / 24;
      const recommendedBatteryUnits = Math.ceil(requiredBatteryCapacity / 5.1); // Assuming 5.1kWh per unit
      
      // Solar sizing based on daily load and location factor
      const locationFactor = 4.5; // Average sun hours in India
      const requiredSolarCapacity = dailyLoad / locationFactor;
      const maxRoofSolar = roofArea * 0.15; // 150W per sq ft
      const recommendedSolarPanels = Math.ceil(Math.min(requiredSolarCapacity, maxRoofSolar) / 0.54); // 540W panels
      
      // Inverter sizing (125% of peak load)
      const recommendedInverterSize = Math.ceil(peakLoad * 1.25);
      
      // Cost calculations (approximate)
      const batteryCost = recommendedBatteryUnits * 120000; // ₹1.2L per unit
      const solarCost = recommendedSolarPanels * 25000; // ₹25k per panel
      const inverterCost = recommendedInverterSize * 50; // ₹50 per W
      const installationCost = (batteryCost + solarCost + inverterCost) * 0.15;
      const totalCost = batteryCost + solarCost + inverterCost + installationCost;
      
      // Savings calculation
      const electricityRate = 8; // ₹8 per kWh
      const monthlySavings = (dailyLoad * 30 * electricityRate * 0.8); // 80% solar offset
      const paybackPeriod = monthlySavings > 0 ? totalCost / (monthlySavings * 12) : 0;
      
      // Environmental impact
      const co2Factor = 0.82; // kg CO2 per kWh in India
      const annualCo2Reduction = dailyLoad * 365 * co2Factor * 0.8;
      
      // System efficiency
      const systemEfficiency = Math.min(95, (recommendedSolarPanels * 0.54 / requiredSolarCapacity) * 100);
      
      setRecommendation({
        batteryUnits: recommendedBatteryUnits,
        solarPanels: recommendedSolarPanels,
        inverterSize: recommendedInverterSize,
        totalCost: Math.round(totalCost),
        monthlySavings: Math.round(monthlySavings),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        co2Reduction: Math.round(annualCo2Reduction),
        systemEfficiency: Math.round(systemEfficiency)
      });
      
      setIsCalculating(false);
      setActiveTab("results");
    }, 2000);
  };

  // Update daily load based on selected appliances
  useEffect(() => {
    const totalLoad = Object.entries(selectedAppliances).reduce((total, [applianceName, quantity]) => {
      const appliance = appliances.find(a => a.name === applianceName);
      if (appliance) {
        return total + (appliance.power * appliance.hours * quantity) / 1000; // Convert to kWh
      }
      return total;
    }, 0);
    
    const peakLoad = Object.entries(selectedAppliances).reduce((peak, [applianceName, quantity]) => {
      const appliance = appliances.find(a => a.name === applianceName);
      if (appliance) {
        return Math.max(peak, appliance.power * quantity / 1000); // Convert to kW
      }
      return peak;
    }, 0);
    
    setConfig(prev => ({ ...prev, dailyLoad: totalLoad, peakLoad: peakLoad }));
  }, [selectedAppliances]);

  const handleApplianceChange = (applianceName: string, quantity: number) => {
    setSelectedAppliances(prev => ({
      ...prev,
      [applianceName]: quantity
    }));
  };

  const generateProposal = () => {
    toast({
      title: "Proposal Generated",
      description: "Professional system proposal has been generated and is ready for download."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Emotional Header */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-extralight tracking-tight text-foreground leading-none">
              Your Energy
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Independence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              A personal energy system designed around how you actually live
            </p>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-3 mt-12">
            {['Tell us', 'We design', 'You decide'].map((step) => {
              const stepIndex = ['Tell us', 'We design', 'You decide'].indexOf(step);
              return (
              <div key={step} className="flex items-center">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  stepIndex <= (activeTab === 'requirements' ? 0 : activeTab === 'appliances' || activeTab === 'system' ? 1 : 2)
                    ? 'bg-primary scale-100'
                    : 'bg-muted scale-75'
                }`} />
                <span className="ml-2 text-sm text-muted-foreground font-medium">{step}</span>
                {stepIndex < 2 && <div className="w-8 h-px bg-muted mx-4" />}
              </div>
            );
            })}
          </div>
        </div>

        {/* Simplified Configuration Flow */}
        <div className="space-y-16">
          {activeTab === 'requirements' && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-foreground mb-4">Tell us about your space</h2>
                <p className="text-muted-foreground font-light">We'll design the perfect system for your needs</p>
              </div>
              
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 space-y-8">
                  <div className="grid gap-8">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Where is your home?</Label>
                      <Select value={config.location} onValueChange={(value) => setConfig(prev => ({...prev, location: value}))}>
                        <SelectTrigger className="h-14 rounded-2xl border-border/50 bg-transparent">
                          <SelectValue placeholder="Choose your city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai, Maharashtra</SelectItem>
                          <SelectItem value="delhi">Delhi, NCR</SelectItem>
                          <SelectItem value="bangalore">Bangalore, Karnataka</SelectItem>
                          <SelectItem value="chennai">Chennai, Tamil Nadu</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad, Telangana</SelectItem>
                          <SelectItem value="pune">Pune, Maharashtra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-base font-medium">What type of system do you need?</Label>
                      <div className="grid gap-3">
                        {[
                          { value: 'hybrid', label: 'Complete Independence', desc: 'Grid + Solar + Battery' },
                          { value: 'off-grid', label: 'Full Independence', desc: 'Solar + Battery Only' },
                          { value: 'grid-tie', label: 'Solar Savings', desc: 'Solar + Grid' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setConfig(prev => ({...prev, systemType: option.value as any}))}
                            className={`p-4 rounded-2xl border-2 transition-all text-left ${
                              config.systemType === option.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border/30 hover:border-border/60'
                            }`}
                          >
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Roof space available</Label>
                        <Input 
                          type="number" 
                          placeholder="Square feet"
                          className="h-14 rounded-2xl border-border/50 bg-transparent text-base"
                          value={config.roofArea || ''} 
                          onChange={(e) => setConfig(prev => ({...prev, roofArea: parseInt(e.target.value) || 0}))}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Backup needed</Label>
                        <Select value={config.backupHours.toString()} onValueChange={(value) => setConfig(prev => ({...prev, backupHours: parseInt(value)}))}>
                          <SelectTrigger className="h-14 rounded-2xl border-border/50 bg-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4">4 Hours</SelectItem>
                            <SelectItem value="8">8 Hours</SelectItem>
                            <SelectItem value="12">12 Hours</SelectItem>
                            <SelectItem value="24">24 Hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setActiveTab("appliances")} 
                    size="lg"
                    className="w-full h-14 rounded-2xl text-base font-medium"
                    disabled={!config.location}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appliances' && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-foreground mb-4">What powers your day?</h2>
                <p className="text-muted-foreground font-light">Select the appliances you use regularly</p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {appliances.map((appliance) => (
                    <div key={appliance.name} className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-6 transition-all hover:bg-card/50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-base">{appliance.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {appliance.power}W × {appliance.hours}h daily
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground">Quantity</div>
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            className="w-20 h-10 rounded-xl text-center border-border/50"
                            value={selectedAppliances[appliance.name] || 0}
                            onChange={(e) => handleApplianceChange(appliance.name, parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-6">
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 sticky top-6">
                    <h3 className="text-lg font-medium mb-6">Your Energy Profile</h3>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="text-2xl font-light text-foreground">{config.dailyLoad.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">kWh daily</div>
                      </div>
                      <div className="text-center p-4 bg-card/30 rounded-2xl">
                        <div className="text-xl font-light text-foreground">{config.peakLoad.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">kW peak</div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setActiveTab("system")} 
                      size="lg"
                      className="w-full mt-6 h-12 rounded-2xl font-medium"
                      disabled={config.dailyLoad === 0}
                    >
                      Design My System
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-foreground mb-4">Creating your energy system</h2>
                <p className="text-muted-foreground font-light">Analyzing your needs and optimizing the perfect solution</p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
                  <div className="grid gap-6 mb-8">
                    <div className="flex justify-between items-center p-4 bg-muted/10 rounded-2xl">
                      <span className="font-medium">Daily energy need</span>
                      <span className="text-lg font-light">{config.dailyLoad.toFixed(1)} kWh</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/10 rounded-2xl">
                      <span className="font-medium">Peak power need</span>
                      <span className="text-lg font-light">{config.peakLoad.toFixed(1)} kW</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/10 rounded-2xl">
                      <span className="font-medium">Backup duration</span>
                      <span className="text-lg font-light">{config.backupHours} hours</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/10 rounded-2xl">
                      <span className="font-medium">Location</span>
                      <span className="text-lg font-light capitalize">{config.location}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={calculateSystem} 
                    size="lg"
                    disabled={!config.location || config.dailyLoad === 0 || isCalculating}
                    className="w-full h-14 rounded-2xl text-base font-medium"
                  >
                    {isCalculating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
                        Designing your system...
                      </div>
                    ) : (
                      'Generate My System Design'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && recommendation && (
            <div className="animate-fade-in space-y-16">
              <div className="text-center">
                <h2 className="text-4xl font-extralight text-foreground mb-4">Your Perfect System</h2>
                <p className="text-xl text-muted-foreground font-light">Designed specifically for your energy independence</p>
              </div>
              
              {/* Hero System Visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-3xl"></div>
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-12">
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4">
                      <Battery className="w-16 h-16 text-primary mx-auto" />
                      <div className="text-4xl font-extralight text-foreground">{recommendation.batteryUnits}</div>
                      <div className="text-muted-foreground font-medium">NESS Units</div>
                      <div className="text-sm text-muted-foreground">{recommendation.batteryUnits * 5.1}kWh storage</div>
                    </div>
                    
                    <div className="space-y-4">
                      <Sun className="w-16 h-16 text-primary mx-auto" />
                      <div className="text-4xl font-extralight text-foreground">{recommendation.solarPanels}</div>
                      <div className="text-muted-foreground font-medium">Solar Panels</div>
                      <div className="text-sm text-muted-foreground">{(recommendation.solarPanels * 0.54).toFixed(1)}kW capacity</div>
                    </div>
                    
                    <div className="space-y-4">
                      <Zap className="w-16 h-16 text-primary mx-auto" />
                      <div className="text-4xl font-extralight text-foreground">{recommendation.inverterSize}</div>
                      <div className="text-muted-foreground font-medium">kW Inverter</div>
                      <div className="text-sm text-muted-foreground">Hybrid power</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="text-center bg-gradient-to-r from-green-500/5 via-primary/5 to-green-500/5 backdrop-blur-sm border border-green-500/10 rounded-3xl p-8">
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-light text-foreground mb-2">
                  {Math.round(recommendation.co2Reduction / 1000)} tons CO₂
                </div>
                <div className="text-muted-foreground mb-4">prevented annually</div>
                <div className="text-sm text-muted-foreground">
                  Equivalent to planting {Math.round(recommendation.co2Reduction / 21)} trees every year
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button onClick={generateProposal} size="lg" className="h-14 rounded-2xl font-medium flex-1">
                  Get Detailed Proposal
                </Button>
                <Button variant="outline" size="lg" className="h-14 rounded-2xl font-medium" onClick={() => {
                  setRecommendation(null);
                  setActiveTab("requirements");
                }}>
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemConfigurator;
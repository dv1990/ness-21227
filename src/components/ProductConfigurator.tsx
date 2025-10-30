import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Zap, 
  Battery, 
  Smartphone, 
  Car,
  Calculator,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Clock,
  Building2,
  ArrowRight,
  Snowflake
} from "lucide-react";

interface ConfiguratorState {
  homeSize: number;
  essentialLoad: number;
  acLoad: number;
  evCharging: boolean;
  solarIntegration: boolean;
  backupDuration: number;
  prioritizeRuntime: boolean;
}

interface SystemRecommendation {
  product: string;
  capacity: string;
  price: number;
  confidence: number;
  savings: number;
  paybackPeriod: string;
  features: string[];
  warnings: string[];
}

const appliances = [
  { name: "Lights & Fans", power: 500, essential: true },
  { name: "WiFi Router", power: 20, essential: true },
  { name: "Refrigerator", power: 150, essential: true },
  { name: "TV & Entertainment", power: 200, essential: false },
  { name: "Water Heater", power: 2000, essential: false },
  { name: "Air Conditioning", power: 1500, essential: false },
  { name: "Washing Machine", power: 500, essential: false },
  { name: "Microwave", power: 1000, essential: false },
];

export const ProductConfigurator = () => {
  const [config, setConfig] = useState<ConfiguratorState>({
    homeSize: 1200,
    essentialLoad: 1000,
    acLoad: 3000,
    evCharging: false,
    solarIntegration: false,
    backupDuration: 8,
    prioritizeRuntime: true
  });

  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([
    "Lights & Fans", "WiFi Router", "Refrigerator"
  ]);

  const [recommendation, setRecommendation] = useState<SystemRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate recommendation based on configuration
  useEffect(() => {
    const calculateRecommendation = () => {
      setLoading(true);
      
      // Simulate calculation delay for real-time feel
      setTimeout(() => {
        const totalLoad = selectedAppliances.reduce((sum, name) => {
          const appliance = appliances.find(a => a.name === name);
          return sum + (appliance?.power || 0);
        }, 0);

        const requiredCapacity = (totalLoad * config.backupDuration) / 1000; // kWh
        const requiredPower = totalLoad + (config.evCharging ? 3500 : 0); // W

        let product = "NESS POD";
        let capacity = "3.5 kWh";
        let price = 89999;
        let confidence = 85;

        if (requiredCapacity > 3.5 || requiredPower > 2000) {
          if (requiredCapacity > 7.2 || requiredPower > 3500 || config.evCharging) {
            product = "NESS BRICK";
            capacity = "10.24 kWh";
            price = 189999;
            confidence = 95;
          } else {
            product = "NESS CUBE";
            capacity = "7.2 kWh";
            price = 139999;
            confidence = 90;
          }
        }

        const features = [];
        const warnings = [];

        if (config.solarIntegration) {
          features.push("Solar integration included");
          confidence += 5;
        }

        if (config.evCharging && product !== "NESS BRICK") {
          warnings.push("EV charging requires NESS BRICK for optimal performance");
          confidence -= 10;
        }

        if (totalLoad > 4000 && product === "NESS POD") {
          warnings.push("High power demand may require system upgrade");
          confidence -= 15;
        }

        const savings = Math.round((totalLoad * 0.008 * 365 * 10) + (config.solarIntegration ? 50000 : 0));

        setRecommendation({
          product,
          capacity,
          price,
          confidence: Math.max(60, Math.min(100, confidence)),
          savings,
          paybackPeriod: `${Math.round(price / (savings / 10))}-${Math.round(price / (savings / 10)) + 2} years`,
          features,
          warnings
        });
        
        setLoading(false);
      }, 800);
    };

    calculateRecommendation();
  }, [config, selectedAppliances]);

  const toggleAppliance = (applianceName: string) => {
    setSelectedAppliances(prev => 
      prev.includes(applianceName) 
        ? prev.filter(name => name !== applianceName)
        : [...prev, applianceName]
    );
  };

  const totalPower = selectedAppliances.reduce((sum, name) => {
    const appliance = appliances.find(a => a.name === name);
    return sum + (appliance?.power || 0);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-display-small font-light text-foreground">
          Configure Your Perfect System
        </h2>
        <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
          Tell us about your home and energy needs, and we'll recommend the ideal NESS system for you
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-primary" />
                <span>Home Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Home Size: {config.homeSize} sq ft
                </label>
                <Slider
                  value={[config.homeSize]}
                  onValueChange={([value]) => setConfig(prev => ({ ...prev, homeSize: value }))}
                  max={5000}
                  min={500}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>500 sq ft</span>
                  <span>5000 sq ft</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Backup Duration: {config.backupDuration} hours
                </label>
                <Slider
                  value={[config.backupDuration]}
                  onValueChange={([value]) => setConfig(prev => ({ ...prev, backupDuration: value }))}
                  max={24}
                  min={2}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>2 hours</span>
                  <span>24 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Appliances</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appliances.map((appliance) => (
                <div 
                  key={appliance.name}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    selectedAppliances.includes(appliance.name)
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-muted/20 hover:bg-muted/30'
                  }`}
                  onClick={() => toggleAppliance(appliance.name)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAppliances.includes(appliance.name)
                        ? 'bg-primary border-primary'
                        : 'border-muted-foreground/30'
                    }`}>
                      {selectedAppliances.includes(appliance.name) && (
                        <CheckCircle className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="font-medium text-foreground">{appliance.name}</span>
                    {appliance.essential && (
                      <Badge variant="secondary" className="text-xs">Essential</Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{appliance.power}W</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between items-center font-semibold">
                <span>Total Power Load:</span>
                <span className="text-primary">{totalPower}W</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Car className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">EV Charging</div>
                    <div className="text-sm text-muted-foreground">Charge your electric vehicle</div>
                  </div>
                </div>
                <Switch
                  checked={config.evCharging}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, evCharging: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Solar Integration</div>
                    <div className="text-sm text-muted-foreground">Connect with solar panels</div>
                  </div>
                </div>
                <Switch
                  checked={config.solarIntegration}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, solarIntegration: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendation Panel */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-primary" />
                <span>Your Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : recommendation ? (
                <div className="space-y-6">
                  {/* Confidence Score */}
                  <div className="text-center">
                    <div className="text-4xl font-light text-foreground mb-2">
                      {recommendation.confidence}%
                    </div>
                    <div className="text-sm text-muted-foreground">Match Confidence</div>
                    <div className="w-full bg-muted/20 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${recommendation.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  <Separator />

                  {/* Product Recommendation */}
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold text-foreground">{recommendation.product}</h3>
                    <p className="text-muted-foreground">{recommendation.capacity} System</p>
                    <div className="text-3xl font-light text-primary">
                      ₹{recommendation.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <div className="text-lg font-semibold">₹{recommendation.savings.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">10-year savings</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-xl">
                      <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-lg font-semibold">{recommendation.paybackPeriod}</div>
                      <div className="text-sm text-muted-foreground">Payback period</div>
                    </div>
                  </div>

                  {/* Features */}
                  {recommendation.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Included Features:</h4>
                      {recommendation.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Warnings */}
                  {recommendation.warnings.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Consider:</h4>
                      {recommendation.warnings.map((warning) => (
                        <div key={warning} className="flex items-start space-x-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  {/* CTA */}
                  <div className="space-y-3">
                    <Button className="btn-premium w-full py-3">
                      Get Detailed Quote
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Live System Simulation */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Battery className="w-5 h-5 text-primary" />
                <span>System Simulation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Battery Level</span>
                  <span className="text-sm font-medium">100%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-primary h-3 rounded-full animate-pulse"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Runtime Remaining</div>
                    <div className="font-semibold">{config.backupDuration}h 00m</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Current Load</div>
                    <div className="font-semibold">{totalPower}W</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span>System running optimally</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
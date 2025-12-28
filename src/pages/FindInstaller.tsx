import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Star, 
  ExternalLink, 
  Award, 
  Phone, 
  Mail, 
  Clock,
  Users,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  pincode: string;
}

interface Installer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  googleReviewsUrl: string;
  partnershipLevel: "Authorized" | "Premium" | "Elite";
  yearsOfExperience: number;
  projectsCompleted: number;
  certifications: string[];
  specialties: string[];
  distance: string;
}

// Mock installer data based on pincode
const mockInstallers: Record<string, Installer[]> = {
  "110001": [
    {
      id: "1",
      name: "SolarTech Solutions Delhi",
      address: "A-42, Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      phone: "+91-9876543210",
      email: "info@solartech-delhi.com",
      rating: 4.8,
      reviewCount: 127,
      googleReviewsUrl: "https://google.com/reviews/solartech-solutions",
      partnershipLevel: "Elite",
      yearsOfExperience: 8,
      projectsCompleted: 350,
      certifications: ["BIS Certified", "MNRE Approved", "ISO 9001"],
      specialties: ["Residential Solar", "Battery Backup", "Grid-Tie Systems"],
      distance: "2.3 km"
    },
    {
      id: "2",
      name: "Power Plus Energy",
      address: "Plot 15, Sector 18, Rohini",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110085",
      phone: "+91-9123456789",
      email: "contact@powerplus.in",
      rating: 4.6,
      reviewCount: 89,
      googleReviewsUrl: "https://google.com/reviews/power-plus-energy",
      partnershipLevel: "Premium",
      yearsOfExperience: 6,
      projectsCompleted: 220,
      certifications: ["BIS Certified", "MNRE Approved"],
      specialties: ["Commercial Solar", "Maintenance", "System Design"],
      distance: "8.7 km"
    }
  ],
  "400001": [
    {
      id: "3",
      name: "Mumbai Solar Experts",
      address: "Office 301, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400021",
      phone: "+91-8765432109",
      email: "hello@mumbaisolar.com",
      rating: 4.9,
      reviewCount: 203,
      googleReviewsUrl: "https://google.com/reviews/mumbai-solar-experts",
      partnershipLevel: "Elite",
      yearsOfExperience: 12,
      projectsCompleted: 480,
      certifications: ["BIS Certified", "MNRE Approved", "ISO 9001", "IEC 61215"],
      specialties: ["High-rise Installation", "Marine Environment", "Premium Systems"],
      distance: "1.8 km"
    }
  ],
  "560001": [
    {
      id: "4",
      name: "Bangalore Energy Solutions",
      address: "12th Main, Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91-7654321098",
      email: "info@bangaloreEnergy.com",
      rating: 4.7,
      reviewCount: 156,
      googleReviewsUrl: "https://google.com/reviews/bangalore-energy",
      partnershipLevel: "Premium",
      yearsOfExperience: 10,
      projectsCompleted: 320,
      certifications: ["BIS Certified", "MNRE Approved", "KEDA Certified"],
      specialties: ["Tech Parks", "Villa Complexes", "Battery Integration"],
      distance: "4.2 km"
    }
  ]
};

const partnershipColors = {
  "Authorized": "bg-muted text-muted-foreground",
  "Premium": "bg-primary/10 text-primary",
  "Elite": "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-400"
};

const FindInstaller = () => {
  const [step, setStep] = useState<"form" | "results">("form");
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    pincode: ""
  });
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const foundInstallers = mockInstallers[customerData.pincode] || [];
    setInstallers(foundInstallers);
    setStep("results");
    setIsLoading(false);
  };

  const handleBackToForm = () => {
    setStep("form");
    setInstallers([]);
  };

  if (step === "form") {
    return (
      <Layout className="-mt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-primary/5"></div>
          
          {/* Content */}
            <div className="container mx-auto max-w-2xl px-4 sm:px-8 py-20 sm:py-32 relative z-10">
            <div className="space-y-10 sm:space-y-16">
              {/* Header */}
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <Link 
                    to="/homeowners" 
                    className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Homeowners
                  </Link>
                </div>
                
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-[-0.02em]">
                  Find your
                  <br />
                  <span className="font-medium">perfect installer</span>
                </h1>
                
                 <p className="text-xl font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
                   Certified NESS partners in your area.
                 </p>
              </div>

              {/* Form Card */}
              <Card className="bg-card/60 backdrop-blur-sm border border-border/30 shadow-xl">
                 <CardHeader className="text-center pb-8">
                   <CardTitle className="text-2xl font-light">Your details</CardTitle>
                 </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={customerData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="h-12 rounded-xl border-border/30 focus:border-primary"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={customerData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="h-12 rounded-xl border-border/30 focus:border-primary"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={customerData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="h-12 rounded-xl border-border/30 focus:border-primary"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="pincode" className="text-sm font-medium">PIN Code</Label>
                      <Input
                        id="pincode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        value={customerData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className="h-12 rounded-xl border-border/30 focus:border-primary"
                        placeholder="110001"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll find certified installers in your area
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-xl text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-150"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                          <span>Finding Installers...</span>
                        </div>
                      ) : (
                        "Find Installers"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 opacity-60">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">BIS Certified Partners</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">500+ Projects</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Results Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8 sm:space-y-12">
            {/* Header */}
            <div className="text-center space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <Button 
                  variant="ghost" 
                  onClick={handleBackToForm}
                  className="text-muted-foreground hover:text-foreground group min-h-[48px]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Search
                </Button>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight tracking-[-0.02em]">
                Installers near {customerData.pincode}
              </h1>
              
              <p className="text-lg font-light text-muted-foreground">
                {installers.length} certified NESS partners found in your area
              </p>
            </div>

            {/* Results */}
            {installers.length === 0 ? (
              <Card className="p-16 text-center bg-muted/20">
                <div className="space-y-6">
                  <MapPin className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
                  <div className="space-y-3">
                    <h3 className="text-2xl font-light text-foreground">No installers found</h3>
                    <p className="text-muted-foreground">
                      We don't have certified partners in {customerData.pincode} yet. 
                      <br />
                      Try a nearby PIN code or contact us directly.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link to="/contact/homeowner">
                      <Button className="bg-primary hover:bg-primary/90">Contact Us Directly</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid gap-8">
                {installers.map((installer) => (
                  <Card key={installer.id} className="overflow-hidden bg-card/60 backdrop-blur-sm border border-border/30 hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <h3 className="text-2xl font-medium text-foreground">{installer.name}</h3>
                                <Badge className={`${partnershipColors[installer.partnershipLevel]} font-medium`}>
                                  <Award className="w-3 h-3 mr-1" />
                                  {installer.partnershipLevel} Partner
                                </Badge>
                              </div>
                              
                              <div className="text-right space-y-1">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{installer.rating}</span>
                                  <span className="text-muted-foreground">({installer.reviewCount})</span>
                                </div>
                                <a 
                                  href={installer.googleReviewsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline flex items-center"
                                >
                                  View Reviews <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </div>
                            </div>

                          <div className="flex flex-wrap items-center text-muted-foreground gap-3 sm:gap-4">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{installer.distance} away</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{installer.yearsOfExperience} yrs exp</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{installer.projectsCompleted} projects</span>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Address</h4>
                              <p className="text-muted-foreground">
                                {installer.address}, {installer.city}, {installer.state} - {installer.pincode}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-foreground mb-2">Specialties</h4>
                              <div className="flex flex-wrap gap-2">
                                {installer.specialties.map((specialty) => (
                                  <Badge key={specialty} variant="secondary" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-foreground mb-2">Certifications</h4>
                              <div className="flex flex-wrap gap-2">
                                {installer.certifications.map((cert) => (
                                  <Badge key={cert} variant="outline" className="text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact Actions */}
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Button className="w-full bg-primary hover:bg-primary/90 h-12">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Now
                            </Button>
                            
                            <Button variant="outline" className="w-full h-12">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Message
                            </Button>
                          </div>

                          <Separator />

                          <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Phone className="w-4 h-4" />
                              <span>{installer.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Mail className="w-4 h-4" />
                              <span className="break-all">{installer.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FindInstaller;
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { GradientOrbField } from "@/components/ui/gradient-orb";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // 404 tracking removed - handle via analytics if needed
  }, [location.pathname]);

  return (
    <Layout>
      <div className="relative min-h-screen bg-charcoal">
        <GradientOrbField />
        <div className="relative z-10 container mx-auto max-w-7xl px-6 py-32 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-display text-pearl mb-8">404</h1>
            <p className="text-subtitle text-pearl/60 mb-12">Oops! This page doesn't exist</p>
            <Button className="bg-energy hover:bg-energy-bright text-charcoal font-semibold rounded-full px-8 py-3">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

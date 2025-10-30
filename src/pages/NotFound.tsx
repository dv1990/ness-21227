import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Track 404 for development debugging only
    if (import.meta.env.DEV) {
      console.error("404 Error:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-6 py-32 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-display mb-8">404</h1>
          <p className="text-subtitle mb-12">Oops! This page doesn't exist</p>
          <Button className="btn-energy-primary">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

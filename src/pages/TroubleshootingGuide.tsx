import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";

const TroubleshootingGuide = () => {
  const { product, issue } = useParams<{ product: string; issue: string }>();
  
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-6 py-32">
        <div className="animate-fade-in-up">
          <h1 className="text-display mb-8">Troubleshooting: {product}</h1>
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-title mb-6">Issue: {issue}</h2>
            <p className="text-body text-muted-foreground mb-6">
              Step-by-step troubleshooting guide for {product} - {issue}
            </p>
            <p className="text-body text-muted-foreground">
              Diagnostic flow with symptom identification, cause analysis, fix checklist, and escalation options.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TroubleshootingGuide;
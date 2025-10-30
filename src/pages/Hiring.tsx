import Layout from "@/components/Layout";

const Hiring = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-6 py-32">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-display mb-8">Join Our Team</h1>
          <p className="text-subtitle max-w-3xl mx-auto mb-16">
            Build the future of energy with us. Ready for your content.
          </p>
          
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-title mb-6">Content Area</h2>
            <p className="text-lg text-muted-foreground">
              This page is ready for job listings, company culture, benefits, and career opportunities.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hiring;
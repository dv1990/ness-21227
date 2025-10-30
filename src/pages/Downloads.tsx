import Layout from "@/components/Layout";

const Downloads = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-6 py-32">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-display mb-8">Downloads & Resources</h1>
          <p className="text-body-large max-w-3xl mx-auto mb-16 text-muted-foreground">
            Access technical documentation, firmware updates, and system resources.
          </p>
          
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-title mb-6">Resource Center</h2>
            <p className="text-body text-muted-foreground">
              Versioned manuals, firmware downloads, SLD templates, installation guides, and change logs.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Downloads;
import Layout from "@/components/Layout";

const Downloads = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-display mb-6 sm:mb-8">Downloads & Resources</h1>
          <p className="text-base sm:text-body-large max-w-3xl mx-auto mb-12 sm:mb-16 text-muted-foreground">
            Access technical documentation, firmware updates, and system resources.
          </p>
          
          <div className="glass-card p-8 sm:p-12 rounded-2xl">
            <h2 className="text-xl sm:text-title mb-4 sm:mb-6">Resource Center</h2>
            <p className="text-sm sm:text-body text-muted-foreground">
              Versioned manuals, firmware downloads, SLD templates, installation guides, and change logs.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Downloads;

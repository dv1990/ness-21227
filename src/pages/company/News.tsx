import Layout from "@/components/Layout";

const News = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-display mb-6 sm:mb-8">Latest News</h1>
          <p className="text-base sm:text-subtitle max-w-3xl mx-auto mb-12 sm:mb-16">
            Stay updated with our latest innovations and announcements. Ready for your content.
          </p>
          
          <div className="glass-card p-8 sm:p-12 rounded-2xl">
            <h2 className="text-xl sm:text-title mb-4 sm:mb-6">Content Area</h2>
            <p className="text-sm sm:text-lg text-muted-foreground">
              This page is ready for press releases, company updates, industry news, and announcements.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;

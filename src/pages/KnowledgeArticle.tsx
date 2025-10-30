import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";

const KnowledgeArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-6 py-32">
        <div className="animate-fade-in-up">
          <h1 className="text-display mb-8">Knowledge Article: {slug}</h1>
          <div className="glass-card p-12 rounded-2xl">
            <p className="text-body text-muted-foreground mb-6">
              Knowledge base article for slug: {slug}
            </p>
            <p className="text-body text-muted-foreground">
              Detailed guide with search functionality, filters, last updated timestamp, and read time estimation.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgeArticle;
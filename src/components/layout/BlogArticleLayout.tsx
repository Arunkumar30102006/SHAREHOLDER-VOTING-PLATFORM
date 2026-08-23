import { SEO } from "@/components/layout/SEO";
import { createArticleSchema, createBreadcrumbSchema } from "@/components/layout/StructuredData";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogArticleLayoutProps {
  title: string;
  description: string;
  canonical: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  children: React.ReactNode;
}

const BlogArticleLayout = ({
  title,
  description,
  canonical,
  author,
  date,
  readTime,
  category,
  children,
}: BlogArticleLayoutProps) => {
  const articleSchema = createArticleSchema({
    title,
    description,
    url: canonical,
    datePublished: date,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: title, url: canonical }
  ]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020817] text-white">
      <SEO
        title={`${title} | Vote India Secure`}
        description={description}
        canonical={canonical}
        type="article"
        schemas={[articleSchema, breadcrumbSchema]}
      />

      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back to blog */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#1e3a8a] hover:underline mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <span className="text-[#1e3a8a] uppercase tracking-wider text-xs font-semibold">
            {category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-6 text-foreground leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {readTime}
            </span>
          </div>
        </header>

        {/* Article content */}
        <div className="prose prose-invert prose-lg max-w-none mb-16">
          {children}
        </div>

        {/* CTA */}
        <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/20 p-8 md:p-10 rounded-3xl text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Modernize Your Shareholder Voting?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Experience India's most trusted SEBI-compliant e-voting platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/features">
              <Button variant="outline" className="border-[#1e3a8a]/30 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">
                Explore Features
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogArticleLayout;

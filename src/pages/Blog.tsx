import { SEO } from "@/components/layout/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, BookOpen, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const articles = [
  {
    id: 1,
    slug: "/blog/sebi-compliant-evoting-guide",
    title: "What is SEBI-Compliant E-Voting? A Guide for Indian Companies",
    excerpt: "Navigate the complex landscape of SEBI regulations and Companies Act 2013 Section 108. Learn what mandatory compliance looks like for listed entities in India and how to prepare for upcoming AGMs.",
    date: "Aug 15, 2026",
    author: "Corporate Compliance Desk",
    category: "Regulatory Compliance",
    readTime: "6 min read",
  },
  {
    id: 2,
    slug: "/blog/how-online-shareholder-voting-works",
    title: "How Online Shareholder Voting Works: Step-by-Step",
    excerpt: "A comprehensive guide breaking down how online shareholder voting software operates from member register ingestion and OTP authentication to live ballot tabulation and scrutinizer reports.",
    date: "Aug 18, 2026",
    author: "Product Strategy Team",
    category: "How-To Guide",
    readTime: "5 min read",
  },
  {
    id: 3,
    slug: "/blog/agm-evoting-vs-physical-meeting",
    title: "AGM E-Voting vs Physical Meeting: Pros and Cons for Indian Companies",
    excerpt: "Compare virtual e-voting vs traditional in-person general meetings. Discover how Indian enterprises achieve up to 80% cost savings and dramatically higher retail investor participation.",
    date: "Aug 20, 2026",
    author: "Governance Research Desk",
    category: "Strategic Insights",
    readTime: "7 min read",
  },
  {
    id: 4,
    slug: "/blog/benefits-electronic-voting-shareholders",
    title: "Top 5 Benefits of Electronic Voting for Shareholder Meetings",
    excerpt: "Explore the strategic advantages of implementing an enterprise voting platform for AGMs, EGMs, and postal ballots — from cryptographic security to real-time quorum tracking.",
    date: "Aug 20, 2026",
    author: "Executive Governance Editor",
    category: "Corporate Leadership",
    readTime: "5 min read",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <SEO
        title="Blog & Insights | Corporate Governance & E-Voting News"
        description="Stay informed with the latest updates on SEBI regulations, online shareholder voting technology, and corporate governance strategies for Indian companies."
        canonical="/blog"
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a8a]/10 border border-[#1e3a8a]/20 text-[#1e3a8a] text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Insights & Industry Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Corporate Governance <span className="text-[#1e3a8a]">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert analysis on SEBI e-voting regulations, AGM best practices, shareholder engagement technology, and corporate law in India.
          </p>
        </div>

        <div className="space-y-8">
          {articles.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card/40 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-4 hover:border-[#1e3a8a]/40 hover:bg-card/60 transition-all group"
            >
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="text-[#1e3a8a] font-semibold uppercase tracking-wider">{article.category}</span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {article.date}
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" /> {article.author}
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  • {article.readTime}
                </span>
              </div>
              
              <Link to={article.slug}>
                <h2 className="text-2xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h2>
              </Link>
              
              <p className="text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="pt-2">
                <Link to={article.slug}>
                  <Button variant="outline" className="group/btn border-[#1e3a8a]/30 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">
                    Read Full Guide
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/20 p-10 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Regulatory Updates</h3>
            <p className="text-muted-foreground mb-6">Get the latest SEBI circulars and compliance guides delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Work email address" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">Subscribe</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Blog;

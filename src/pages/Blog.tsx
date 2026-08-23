import { SEO } from "@/components/layout/SEO";
import { createBreadcrumbSchema } from "@/components/layout/StructuredData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, BookOpen, Sparkles, Globe, Shield, Layers } from "lucide-react";
import { motion } from "motion/react";

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" }
]);

const articles = [
  {
    id: 1,
    slug: "/blog/sebi-compliant-evoting-guide",
    title: "Global Enterprise E-Voting Standards: Navigating Statutory Compliance & SEC/ISO Frameworks",
    excerpt: "Discover how modern multinational corporations meet international securities mandates, maintain immutable audit trails, and prepare for upcoming annual general meetings.",
    date: "Aug 20, 2026",
    author: "Global Governance Desk",
    category: "Regulatory Compliance",
    readTime: "6 min read",
  },
  {
    id: 2,
    slug: "/blog/how-online-shareholder-voting-works",
    title: "How Cryptographic Shareholder Voting Works: Step-by-Step Architecture",
    excerpt: "A comprehensive technical breakdown of how enterprise e-voting software operates: from cap table roster ingestion and secure credential dispatch to live ballot tabulation and scrutinizer verification.",
    date: "Aug 18, 2026",
    author: "Systems Architecture Team",
    category: "Technical Guide",
    readTime: "5 min read",
  },
  {
    id: 3,
    slug: "/blog/agm-evoting-vs-physical-meeting",
    title: "Virtual AGMs vs Traditional In-Person General Meetings: Global Boardroom Trends",
    excerpt: "Compare virtual e-voting vs traditional in-person shareholder assemblies. Discover how global enterprises achieve significant cost reduction and dramatically higher retail investor participation.",
    date: "Aug 16, 2026",
    author: "Governance Research Group",
    category: "Strategic Insights",
    readTime: "7 min read",
  },
  {
    id: 4,
    slug: "/blog/benefits-electronic-voting-shareholders",
    title: "Top 5 Governance Strategies to Maximize Institutional & Retail Turnout",
    excerpt: "Explore the strategic advantages of implementing an enterprise voting platform for AGMs, EGMs, and proxy ballots — from cryptographic security to real-time statutory quorum tracking.",
    date: "Aug 14, 2026",
    author: "Executive Editorial Board",
    category: "Corporate Leadership",
    readTime: "5 min read",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020817] text-white">
      <SEO
        title="Blog & Insights | Corporate Governance & E-Voting Intelligence"
        description="Expert analysis on Indian corporate governance, SEBI LODR e-voting rules, AGM best practices, and cryptographic shareholder voting technology."
        canonical="/blog"
        schemas={[breadcrumbSchema]}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Governance Intelligence & Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Corporate Governance <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Intelligence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Expert analysis on international corporate governance, proxy voting technology, general meeting best practices, and securities law.
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <div 
              key={article.id}
              className="bg-[#0d1b2a]/90 border border-white/15 rounded-3xl p-6 md:p-8 flex flex-col gap-4 hover:border-cyan-400/40 backdrop-blur-xl shadow-xl transition-all group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 font-bold border border-blue-400/30 uppercase tracking-wider text-[11px]">
                  {article.category}
                </span>
                <span className="text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {article.date}
                </span>
                <span className="text-slate-300 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" /> {article.author}
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  • {article.readTime}
                </span>
              </div>
              
              <Link to={article.slug}>
                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {article.title}
                </h2>
              </Link>

              <p className="text-slate-200 text-sm md:text-base font-normal leading-relaxed">
                {article.excerpt}
              </p>

              <div className="pt-2">
                <Link to={article.slug}>
                  <Button variant="ghost" className="p-0 text-cyan-300 hover:text-white hover:bg-transparent font-bold flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter / Advisory Subscription */}
        <div className="mt-16 bg-gradient-to-r from-blue-950/80 via-[#0d1b2a] to-cyan-950/80 border border-blue-400/30 rounded-3xl p-8 md:p-10 text-center shadow-2xl">
          <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <h3 className="text-2xl font-black text-white mb-2">Subscribe to Governance Briefings</h3>
          <p className="text-slate-200 text-xs md:text-sm max-w-xl mx-auto mb-6 font-normal">
            Receive monthly executive briefings on statutory compliance updates, proxy advisory recommendations, and corporate e-voting trends.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="corporate.secretary@enterprise.com" 
              className="w-full bg-black/60 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs px-6 shrink-0 shadow-md">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

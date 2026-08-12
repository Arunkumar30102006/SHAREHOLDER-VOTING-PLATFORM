import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, BookOpen } from "lucide-react";
import { motion } from "motion/react";

const articles = [
  {
    id: 1,
    title: "Understanding SEBI E-Voting Requirements for Listed Companies",
    excerpt: "Navigate the complex landscape of SEBI regulations surrounding electronic voting. Learn what mandatory compliance looks like for top 1000 listed entities in India and how to prepare for upcoming AGMs.",
    date: "Aug 10, 2026",
    author: "Compliance Team",
    category: "Regulatory",
  },
  {
    id: 2,
    title: "How to Increase Retail Investor Participation in AGMs",
    excerpt: "Despite regulatory pushes, retail investor participation remains low. Discover actionable strategies and technological solutions to engage retail shareholders and make remote voting accessible and intuitive.",
    date: "Aug 02, 2026",
    author: "Product Strategy",
    category: "Engagement",
  },
  {
    id: 3,
    title: "SEBI's 2025 Updates: Proxy Advisory in the Investor App",
    excerpt: "An in-depth look at SEBI's mandate for unified Investor Applications. Understand how proxy advisory integration will change the way institutional and retail investors cast their votes moving forward.",
    date: "Jul 25, 2026",
    author: "Research Desk",
    category: "Industry News",
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <Helmet>
        <title>Blog & Insights | Vote India Secure</title>
        <meta name="description" content="Insights on corporate governance, SEBI e-voting regulations, and shareholder engagement in India." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a8a]/10 border border-[#1e3a8a]/20 text-[#1e3a8a] text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Insights & Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Corporate Governance <span className="text-[#1e3a8a]">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest updates on SEBI regulations, e-voting technology, and shareholder engagement strategies.
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
              className="bg-card/40 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:bg-card/60 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 text-xs font-medium mb-4">
                  <span className="text-[#1e3a8a] uppercase tracking-wider">{article.category}</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.date}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <User className="w-3 h-3" /> {article.author}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                <Button variant="outline" className="group border-[#1e3a8a]/30 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
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

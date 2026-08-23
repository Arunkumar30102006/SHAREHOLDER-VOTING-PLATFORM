import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Building, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Users, 
  Scale, 
  Award,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/SEO";
import { createBreadcrumbSchema } from "@/components/layout/StructuredData";

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Corporate Voting", url: "/corporate-voting" }
]);

export const CorporateVoting = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="Corporate Voting Platform | Enterprise Governance & Board Balloting"
        description="Comprehensive corporate voting solutions for enterprises, private companies, and RTAs. Secure board resolutions, committee elections, and member ballots."
        canonical="/corporate-voting"
        schemas={[breadcrumbSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-purple-600/20 via-blue-500/15 to-transparent rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Building className="w-4 h-4 text-purple-400" />
              <span>Enterprise Governance Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Enterprise{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Corporate Voting
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Unify all corporate balloting requirements — from board resolutions and committee elections to postal ballots and shareholder meetings — in a single, cryptographically verifiable platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company-register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  Register Your Organization
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold gap-2 px-8 py-6 rounded-xl">
                  View Enterprise Pricing
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-[#0d1b2a]/50 border-y border-white/10 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Built for All Corporate Governance Use Cases
            </h2>
            <p className="text-slate-300 text-base md:text-lg">
              Scalable governance infrastructure tailored for modern compliance requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Listed Companies (BSE / NSE)",
                desc: "Statutory remote e-voting and venue polling with automated Form MGT-13 reports satisfying SEBI LODR Regulation 44.",
                badge: "SEBI Mandate"
              },
              {
                title: "Private Limited & Unlisted Entities",
                desc: "Cost-effective digital balloting for unlisted public companies with 1,000+ members, startups, and investor syndicates.",
                badge: "High Growth"
              },
              {
                title: "Registrars & Transfer Agents (RTAs)",
                desc: "Multi-tenant company hub to manage hundreds of client general meetings, depository benpos uploads, and scrutinizer workflows.",
                badge: "Multi-Company Hub"
              }
            ].map((sol, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 backdrop-blur-xl shadow-lg hover:border-purple-400/40 transition-all flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30 mb-4">
                    {sol.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{sol.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Navigation */}
      <section className="py-16 bg-[#020817]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Related Voting Modules</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link to="/shareholder-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Shareholder Voting →
            </Link>
            <Link to="/online-e-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Online E-Voting →
            </Link>
            <Link to="/agm-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              AGM E-Voting →
            </Link>
            <Link to="/security" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Security Standards →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporateVoting;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Zap, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Users, 
  Scale, 
  Clock,
  FileCheck2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/SEO";
import { createBreadcrumbSchema } from "@/components/layout/StructuredData";

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "EGM E-Voting", url: "/egm-voting" }
]);

export const EgmVoting = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="EGM E-Voting Platform | Extraordinary General Meeting Balloting"
        description="Conduct urgent, legally compliant EGM e-voting for listed and unlisted companies. Rapid setup for special resolutions, M&A approvals, and capital restructuring."
        canonical="/egm-voting"
        schemas={[breadcrumbSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-amber-600/20 via-orange-500/15 to-transparent rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Special Business & EGM Governance</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Rapid, Compliant{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
                EGM E-Voting
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Convene Extraordinary General Meetings on short notice with seamless special resolution workflows, depository benpos synchronization, and instant scrutinizer audit filings.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company-register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  Configure Your EGM
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold gap-2 px-8 py-6 rounded-xl">
                  See How It Works
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* When are EGMs Convened? */}
      <section className="py-20 bg-[#0d1b2a]/50 border-y border-white/10 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Key Special Resolutions Handled via EGM
            </h2>
            <p className="text-slate-300 text-base">
              Vote India Secure simplifies urgent corporate democracy for statutory corporate milestones.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Mergers & Acquisitions (M&A)",
                desc: "Passing statutory scheme of arrangements, corporate amalgamations, or demergers under NCLT supervision.",
                statute: "Companies Act Sec 230-232"
              },
              {
                title: "Capital Restructuring & Rights Issues",
                desc: "Approving preferential allotments, rights issues, ESOP schemes, or alterations in authorized share capital.",
                statute: "Companies Act Sec 62 & 66"
              },
              {
                title: "Articles / MOA Amendments",
                desc: "Passing special resolutions to alter object clauses, registered office shifts, or corporate name changes.",
                statute: "Companies Act Sec 13 & 14"
              },
              {
                title: "Related Party Transactions",
                desc: "Approval of material related party transactions exceeding statutory materiality thresholds under LODR 23.",
                statute: "SEBI LODR Reg 23"
              },
              {
                title: "Urgent Board Reconstitution",
                desc: "Appointment, regularisation, or removal of key directors and Independent Directors requiring shareholder consent.",
                statute: "Companies Act Sec 149 & 169"
              },
              {
                title: "Requisitioned Meetings",
                desc: "Conveying general meetings called by members holding ≥ 10% paid-up share capital under Section 100.",
                statute: "Companies Act Sec 100"
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 backdrop-blur-xl shadow-lg hover:border-amber-400/40 transition-all">
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-amber-300">
                  {item.statute}
                </span>
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
            <Link to="/agm-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              AGM E-Voting →
            </Link>
            <Link to="/corporate-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Corporate Voting →
            </Link>
            <Link to="/compliance" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              SEBI Compliance →
            </Link>
            <Link to="/how-it-works" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              How It Works →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EgmVoting;

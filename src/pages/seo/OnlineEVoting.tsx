import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Laptop, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  ChevronRight, 
  Zap,
  Globe2,
  FileSpreadsheet,
  Activity,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/SEO";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.shareholdervoting.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Online E-Voting",
      "item": "https://www.shareholdervoting.in/online-e-voting"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is online e-voting for listed corporations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Online e-voting is an electronic balloting mechanism mandated under Section 108 of the Companies Act 2013 and SEBI LODR Regulation 44, enabling shareholders to vote remotely on general meeting resolutions via secure web platforms."
      }
    },
    {
      "@type": "Question",
      "name": "How does remote e-voting differ from venue voting (InstaPoll)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote e-voting opens 3 days prior to the meeting and closes at 5:00 PM on the preceding day. Venue e-voting (InstaPoll) allows attending members who did not cast remote ballots to vote live during the virtual AGM."
      }
    }
  ]
};

export const OnlineEVoting = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="Online E-Voting Platform for Companies | Remote Electronic Ballots"
        description="Conduct secure remote online e-voting for listed companies, AGMs, and board resolutions. Zero infrastructure overhead with real-time quorum analytics."
        canonical="/online-e-voting"
        schemas={[breadcrumbSchema, faqSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-blue-500/15 to-transparent rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>Cloud E-Voting Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Enterprise Online{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                E-Voting Platform
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Deliver friction-free, legally compliant remote electronic voting for your shareholders. Seamless depository synchronization, instant voter authentication, and automated audit reporting.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company-register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/features" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold gap-2 px-8 py-6 rounded-xl">
                  Explore Capabilities
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 bg-[#0d1b2a]/50 border-y border-white/10 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Why Listed Entities Choose Online E-Voting
            </h2>
            <p className="text-slate-300 text-base md:text-lg">
              Move beyond manual paper ballots and complex on-premise installations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Rapid Deployment in <5 Mins",
                desc: "Upload your NSDL/CDSL Benpos CSV, define meeting resolutions with text and attachments, and schedule automated voting windows instantly.",
                color: "text-amber-400"
              },
              {
                icon: ShieldCheck,
                title: "Cryptographic Vote Sealing",
                desc: "Ballots are sealed with SHA-256 hashes and encrypted via AES-256. Database admins cannot view unblinded ballots prior to Scrutinizer unblocking.",
                color: "text-cyan-400"
              },
              {
                icon: FileSpreadsheet,
                title: "Instant Form MGT-13 Scrutinizer Reports",
                desc: "Automated calculation of weighted totals (For, Against, Invalid) with 1-click export formatted for regulatory stock exchange filings.",
                color: "text-emerald-400"
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 backdrop-blur-xl shadow-lg hover:border-cyan-400/40 transition-all">
                <f.icon className={`w-8 h-8 ${f.color} mb-4`} />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Cross Links */}
      <section className="py-16 bg-[#020817]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Explore Dedicated Governance Modules</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link to="/shareholder-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Shareholder Voting →
            </Link>
            <Link to="/agm-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              AGM E-Voting →
            </Link>
            <Link to="/security" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Security Architecture →
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

export default OnlineEVoting;

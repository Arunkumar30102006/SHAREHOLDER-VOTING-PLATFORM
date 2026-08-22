import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Building2, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Users, 
  Scale, 
  Clock,
  FileCheck2,
  Lock,
  Sparkles
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
      "name": "AGM E-Voting",
      "item": "https://www.shareholdervoting.in/agm-voting"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AGM E-Voting in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AGM E-Voting is the statutory electronic voting facility provided to all shareholders of a company during its Annual General Meeting under Section 108 of the Companies Act 2013."
      }
    },
    {
      "@type": "Question",
      "name": "How long must the remote AGM e-voting window remain open?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under Rule 20(4)(vi) of the Companies Rules 2014, the remote e-voting window must remain open for not less than 3 days and close at 5:00 PM on the day immediately preceding the date of the AGM."
      }
    }
  ]
};

export const AgmVoting = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="AGM E-Voting Platform | Virtual & Hybrid Annual General Meetings"
        description="Conduct seamless, SEBI-compliant AGM e-voting for Indian listed companies. Remote pre-voting, live meeting InstaPolls, and automated Form MGT-13 scrutinizer reports."
        canonical="/agm-voting"
        schemas={[breadcrumbSchema, faqSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-transparent rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Annual General Meeting Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              SEBI-Compliant{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                AGM E-Voting
              </span> Platform
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Execute flawless Annual General Meetings with unified remote e-voting, virtual livestream integration, and real-time live venue voting (InstaPoll) for equity shareholders.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company-register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  Host Your AGM
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/compliance" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold gap-2 px-8 py-6 rounded-xl">
                  Check AGM Compliance Rules
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AGM Workflow */}
      <section className="py-20 bg-[#0d1b2a]/50 border-y border-white/10 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Comprehensive AGM E-Voting Architecture
            </h2>
            <p className="text-slate-300 text-base">
              Everything corporate secretarial teams require for statutory AGM compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-cyan-400" />
                1. Remote Pre-AGM E-Voting
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Opens at 9:00 AM at least 3 days before the AGM and closes at 5:00 PM on the preceding day. Shareholders cast weighted ballots on ordinary business (audited accounts, dividends, director retirements) and special resolutions.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Users className="w-5 h-5 text-emerald-400" />
                2. Live Venue InstaPoll During Virtual Meeting
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                During the live AGM broadcast, attending shareholders who did not vote during remote e-voting can cast their ballots live on screen with immediate quorum telemetry and anti-duplicate guards.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-purple-400" />
                3. Scrutinizer Vault Unblocking
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Post-meeting, the appointed independent Scrutinizer unlocks the encrypted digital ballots in the presence of 2 independent witnesses, ensuring full legal compliance with Rule 20(4)(xii).
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <FileCheck2 className="w-5 h-5 text-blue-400" />
                4. Exchange-Ready Disclosures
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Instant generation of Form MGT-13 reports and BSE/NSE XML files ready for stock exchange submission within the mandatory 48-hour statutory window under Regulation 44(3).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation */}
      <section className="py-16 bg-[#020817]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Related Governance Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link to="/egm-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              EGM Voting →
            </Link>
            <Link to="/corporate-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Corporate Voting →
            </Link>
            <Link to="/compliance" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              SEBI Compliance →
            </Link>
            <Link to="/pricing" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Meeting Pricing →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgmVoting;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Workflow, 
  ShieldCheck, 
  UploadCloud, 
  Users, 
  Vote, 
  FileCheck2, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  Lock,
  Building2
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
      "name": "How It Works",
      "item": "https://www.shareholdervoting.in/how-it-works"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does a company set up a shareholder meeting on Vote India Secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The company registers, uploads the NSDL/CDSL Benpos shareholder register, enters the ordinary and special resolutions, and configures the start and end times for the voting window."
      }
    },
    {
      "@type": "Question",
      "name": "How do shareholders receive login credentials?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shareholders receive secure links and 2FA OTPs directly to their registered email address and mobile number as recorded on the depository register."
      }
    }
  ]
};

export const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="How It Works | E-Voting Setup, Shareholder Ballots & Scrutiny"
        description="Step-by-step guide to conducting shareholder e-voting: from depository benpos upload to live quorum tracking and statutory Form MGT-13 scrutinizer reports."
        canonical="/how-it-works"
        schemas={[breadcrumbSchema, faqSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Workflow className="w-4 h-4 text-cyan-400" />
              <span>End-to-End Governance Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              How Online Shareholder{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Voting Works
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              A transparent, step-by-step walkthrough of the entire electronic voting lifecycle for Company Secretarial teams, Shareholders, and Independent Scrutinizers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company-register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  Register Your Organization
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/live-demo" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold gap-2 px-8 py-6 rounded-xl">
                  Try Interactive Demo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 Personas Walkthrough */}
      <section className="py-20 bg-[#0d1b2a]/50 border-y border-white/10 relative">
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          
          {/* Persona 1: For Companies */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300">
                <Building2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-cyan-300 tracking-wider">Step 1 — Company Setup</span>
                <h2 className="text-2xl font-bold text-white">For Companies & Secretarial Teams</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">1. Upload Benpos CSV</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Import shareholder records from CDSL or NSDL with folio numbers and shareholdings.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">2. Add Resolutions</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Create ordinary and special agenda resolutions with attachments and explanatory statements.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">3. Schedule Voting Window</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Set automated timer windows with statutory notices delivered via email and SMS.</p>
              </div>
            </div>
          </div>

          {/* Persona 2: For Shareholders */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-emerald-300 tracking-wider">Step 2 — Voter Participation</span>
                <h2 className="text-2xl font-bold text-white">For Shareholders & Investors</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">1. 2FA Authentication</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Log in instantly with registered email/phone OTP and PAN/DP ID matching depository records.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">2. Cast Weighted Ballots</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Vote For, Against, or Abstain. Votes automatically apply full shareholding weight.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">3. Cryptographic Receipt</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Get a SHA-256 sealed digital confirmation and printable PDF receipt instantly.</p>
              </div>
            </div>
          </div>

          {/* Persona 3: For Scrutinizers */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <FileCheck2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-purple-300 tracking-wider">Step 3 — Independent Audit</span>
                <h2 className="text-2xl font-bold text-white">For Independent Scrutinizers</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">1. Multi-Witness Unblocking</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Unlock the encrypted vote register post-meeting in the presence of 2 independent witnesses.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">2. Tally Verification</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Inspect automated vote tallies with zero calculation discrepancies or manual spreadsheet errors.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">3. Form MGT-13 Export</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Auto-generate statutory Scrutinizer's Report ready for BSE/NSE disclosure in 1-click.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Internal Navigation */}
      <section className="py-16 bg-[#020817]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Related Governance Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link to="/shareholder-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Shareholder Portal →
            </Link>
            <Link to="/agm-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              AGM E-Voting →
            </Link>
            <Link to="/security" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Security Architecture →
            </Link>
            <Link to="/compliance" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              SEBI Compliance →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

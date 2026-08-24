import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Workflow,
  ShieldCheck,
  UploadCloud,
  Users,
  Vote,
  FileCheck2,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Clock,
  Lock,
  Building2,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/SEO";
import { createBreadcrumbSchema, createFaqSchema } from "@/components/layout/StructuredData";

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "How It Works", url: "/how-it-works" }
]);

const hiwFaqs = [
  {
    q: "How does the entire electronic voting process unfold from start to finish?",
    a: "The lifecycle involves four key stages: (1) Corporate Issuer setup with depository Benpos roster upload and resolution notices, (2) Shareholder 2FA authentication and ballot casting during the remote e-voting window, (3) Independent Scrutinizer unblocking with two witnesses post-meeting, and (4) Automated vote consolidation and Form MGT-13 draft reporting."
  },
  {
    q: "How are depository Benpos rosters ingested into the system?",
    a: "Corporate administrators upload standardized Benpos CSV files received from depositories (CDSL/NSDL) as of the cut-off date. The system automatically computes equity share counts and assigns voting weights."
  },
  {
    q: "When can the independent Scrutinizer view the voting results?",
    a: "In accordance with Rule 20(4)(xii), the voting tallies remain cryptographically locked until the conclusion of the general meeting. The Scrutinizer then unblocks the portal in the presence of at least two independent witnesses."
  },
  {
    q: "What documentation does the shareholder receive upon voting?",
    a: "Each shareholder receives an immediate digital confirmation containing a unique SHA-256 transaction hash, resolution details, and timestamp, with the option to download an official PDF certificate."
  }
];

const hiwFaqSchema = createFaqSchema(
  hiwFaqs.map((f) => ({ question: f.q, answer: f.a }))
);

export const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="How Corporate E-Voting Works | Company, Shareholder & Scrutinizer Guide"
        description="Step-by-step electronic voting lifecycle: Benpos roster ingestion, 2FA voter ballots, two-witness scrutinizer unblocking, and Form MGT-13 reports."
        canonical="/how-it-works"
        schemas={[breadcrumbSchema, hiwFaqSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Workflow className="w-4 h-4 text-cyan-400" />
              <span>End-to-End Governance Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              How Corporate{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                E-Voting Works
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              A transparent, step-by-step walkthrough of the entire corporate electronic voting lifecycle for Company Secretarial teams, Shareholders, and Independent Scrutinizers.
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
          </div>
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
                <h2 className="text-2xl font-bold text-white">For Companies &amp; Secretarial Teams</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">1. Ingest Benpos Roster</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Import shareholder records from CDSL or NSDL with folio numbers, DP ID/Client IDs, and equity shareholdings.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">2. Add Resolution Drafts</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Configure Ordinary and Special agenda items with statutory explanatory statements under Section 102.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">3. Schedule Voting Window</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Configure pre-AGM remote voting timers and dispatch statutory notices to registered shareholder contacts.
                </p>
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
                <h2 className="text-2xl font-bold text-white">For Shareholders &amp; Investors</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">1. 2FA Authentication</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Log in securely with registered User ID/Folio and 6-digit OTP delivered via email/SMS.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">2. Cast Weighted Ballots</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Select FOR, AGAINST, or ABSTAIN. Voting weight reflects exact shareholding as of the cut-off date.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">3. Cryptographic Receipt</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Receive a SHA-256 sealed digital confirmation and download an official printable PDF receipt.
                </p>
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
                <span className="text-xs font-bold uppercase text-purple-300 tracking-wider">Step 3 — Independent Scrutiny</span>
                <h2 className="text-2xl font-bold text-white">For Independent Scrutinizers</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">1. Two-Witness Unblocking</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Unblock the encrypted vote register post-meeting in the presence of at least 2 independent witnesses under Rule 20(4)(xii).
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">2. Mathematical Verification</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Review consolidated remote and in-meeting vote tallies with SHA-256 Merkle root verification.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d1b2a]/80 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-sm">3. Form MGT-13 Report Export</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Export consolidated Form MGT-13 draft reports to assist with official Chairman disclosures and stock exchange reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visible FAQ Section */}
      <section className="py-20 bg-[#020817]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Answers regarding setup timelines, voter authentication, and report exports.
            </p>
          </div>

          <div className="space-y-4">
            {hiwFaqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/15 bg-[#0d1b2a]/90 overflow-hidden backdrop-blur-xl transition-all shadow-lg"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm md:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 ml-4 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-200 leading-relaxed border-t border-white/10 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Navigation */}
      <section className="py-16 bg-[#0d1b2a]/50 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Related Governance Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link to="/shareholder-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Shareholder Portal →
            </Link>
            <Link to="/remote-e-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Remote E-Voting →
            </Link>
            <Link to="/security" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Security Architecture →
            </Link>
            <Link to="/faqs" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              E-Voting FAQs →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

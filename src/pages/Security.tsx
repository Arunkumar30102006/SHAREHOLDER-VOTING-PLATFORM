import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  FileCheck2, 
  Shield, 
  Server, 
  Fingerprint, 
  Database,
  FileCode2
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
      "name": "Security Architecture",
      "item": "https://www.shareholdervoting.in/security"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Vote India Secure protect voter confidentiality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Votes are encrypted using AES-256 bit encryption and anchored to a cryptographic SHA-256 Merkle tree. Ballots remain sealed until the designated independent Scrutinizer unlocks them with authorized digital signatures."
      }
    },
    {
      "@type": "Question",
      "name": "Where is company and shareholder data hosted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Data is hosted in secure, enterprise-grade cloud databases with strict Row-Level Security (RLS), continuous automated backups, and encryption both in transit (TLS 1.3) and at rest (AES-256)."
      }
    }
  ]
};

export const Security = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="Security Architecture & Cryptographic Integrity | Vote India Secure"
        description="Learn about our AES-256 ballot encryption, SHA-256 Merkle audit proof ledger, 2FA authentication, and zero-trust corporate governance architecture."
        canonical="/security"
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
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Institutional Grade Security</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Enterprise Security &{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Cryptographic Integrity
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Vote India Secure implements zero-trust architecture, military-grade ballot encryption, and mathematical Merkle proofs to ensure complete ballot secrecy and tamper-evident audit trails.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company-register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  Register Your Organization
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/compliance" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold gap-2 px-8 py-6 rounded-xl">
                  View Legal Compliance
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Architecture Grid */}
      <section className="py-20 bg-[#0d1b2a]/50 border-y border-white/10 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Technical Security Specifications
            </h2>
            <p className="text-slate-300 text-base">
              A transparent breakdown of the actual security protocols protecting every ballot.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Ballot Secrecy & Encryption</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                All individual voting choices are encrypted with AES-256 bit algorithms prior to database insertion. The system separates voter identity from vote choices using blinded cryptographic tokens.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <FileCode2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">SHA-256 Merkle Audit Proof</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every transaction creates a SHA-256 hash linked mathematically to prior ballots. If any record is modified, the entire cryptographic tree invalidates immediately, guaranteeing 100% tamper detection.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Fingerprint className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">2FA OTP Identity Verification</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Time-limited one-time passwords (OTP) sent directly to registered email and mobile numbers prevent unauthorized ballot casting and account takeovers.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Database className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">PostgreSQL Row-Level Security</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Database access is locked behind granular Row-Level Security (RLS) policies. Companies can only access their own meetings, and voters can only access resolutions tied to their verified folio records.
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
            <Link to="/secure-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Secure Voting Engine →
            </Link>
            <Link to="/compliance" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              SEBI Compliance →
            </Link>
            <Link to="/how-it-works" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              How It Works →
            </Link>
            <Link to="/shareholder-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Shareholder Portal →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;

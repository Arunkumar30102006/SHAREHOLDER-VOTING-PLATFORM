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
  Fingerprint,
  FileCode2,
  Database
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
      "name": "Secure Voting",
      "item": "https://www.shareholdervoting.in/secure-voting"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How are electronic votes secured on Vote India Secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every cast ballot is encrypted with AES-256 military-grade encryption and hashed with SHA-256. Hashes are anchored to a cryptographic Merkle audit ledger that renders the data tamper-evident."
      }
    },
    {
      "@type": "Question",
      "name": "Can system administrators see how a shareholder voted before meeting conclusion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The system employs cryptographic vote blinding and key separation. Only the designated independent Scrutinizer can unblock the encrypted ballot registry after the voting window closes."
      }
    }
  ]
};

export const SecureVoting = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="Secure Voting Platform | AES-256 & SHA-256 Cryptographic Integrity"
        description="Explore how Vote India Secure guarantees ballot secrecy, tamper-proof audit trails, and 2FA authentication for enterprise shareholder meetings."
        canonical="/secure-voting"
        schemas={[breadcrumbSchema, faqSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-emerald-600/20 via-blue-500/15 to-transparent rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-Trust Cryptographic Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Cryptographically{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Secure Voting
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Discover the engineering behind tamper-evident corporate balloting. AES-256 ballot sealing, SHA-256 Merkle audit chains, and multi-witness scrutinizer unblocking protocols.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company-register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  Protect Your Meeting
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/security" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold gap-2 px-8 py-6 rounded-xl">
                  Full Security Specs
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Pillars of Security */}
      <section className="py-20 bg-[#0d1b2a]/50 border-y border-white/10 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              The 4 Pillars of Vote Sealing & Integrity
            </h2>
            <p className="text-slate-300 text-base">
              Engineered with zero trust principles so no single party can alter voting outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300 mb-2">
                <Lock className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white">1. AES-256 Ballot Encryption</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ballots are encrypted with AES-256 at rest and in transit via TLS 1.3. Each vote payload is stored in an encrypted vault inaccessible to application administrators.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-2">
                <FileCode2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">2. SHA-256 Merkle Proof Audit Ledger</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every cast vote produces a unique cryptographic hash linked to the previous vote block, creating an immutable mathematical proof that verifies no votes were inserted, deleted, or altered.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-2">
                <Fingerprint className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">3. Multi-Factor Voter Authentication</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                2FA OTP delivery combined with PAN, DP ID, and Client ID verification ensures only verified equity owners matching the official record date depository benpos can cast ballots.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-2">
                <KeyRound className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">4. Scrutinizer Multi-Witness Unblocking</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Only the designated independent Scrutinizer can decrypt the vote tallies post-meeting in the presence of 2 independent witnesses, ensuring full legal compliance with Rule 20(4)(xii).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation */}
      <section className="py-16 bg-[#020817]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Explore Related Security Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link to="/security" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Security Overview →
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

export default SecureVoting;

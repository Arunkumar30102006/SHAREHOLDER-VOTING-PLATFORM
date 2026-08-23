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
import { createBreadcrumbSchema } from "@/components/layout/StructuredData";

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Security Architecture", url: "/security" }
]);

export const Security = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="Security Architecture | Cryptographic Ballot Sealing & Audit Trails"
        description="Explore Vote India Secure's security architecture: AES-256 ballot encryption, SHA-256 Merkle audit trails, 2FA OTP verification, and independent scrutinizer access."
        canonical="/security"
        schemas={[breadcrumbSchema]}
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
              <span>Technical Security Specification</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Enterprise Security &{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Cryptographic Integrity
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Vote India Secure implements zero-trust architecture, AES-256 ballot encryption, and mathematical SHA-256 hash chaining to ensure ballot secrecy and verifiable, tamper-evident audit trails.
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
                  View Statutory Compliance Guide
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
              A transparent breakdown of the cryptographic protocols protecting every cast ballot.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Ballot Secrecy & Encryption</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                All individual voting choices are encrypted with standard AES-256 bit algorithms prior to database insertion. The platform separates voter identity tokens from ballot choices to ensure anonymity.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <FileCode2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">SHA-256 Merkle Audit Proof</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Every cast ballot generates a SHA-256 hash mathematically linked to prior ballots in the session, providing tamper-evident audit trails that invalidate if any prior record is altered.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Fingerprint className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">2FA OTP Identity Verification</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Time-limited one-time passwords (OTP) sent directly to registered email and mobile numbers prevent unauthorized ballot casting and account takeovers.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Database className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">PostgreSQL Row-Level Security</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Database access is guarded by granular Row-Level Security (RLS) policies. Companies can only access their own meeting records, and voters can only access resolutions tied to their verified folio records.
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
              SEBI & MCA Compliance →
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

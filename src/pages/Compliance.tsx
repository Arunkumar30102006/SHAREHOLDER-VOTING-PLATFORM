import { SEO } from "@/components/layout/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileCheck, Lock, Server, CheckCircle2, Globe, Shield, Award, Scale, Check } from "lucide-react";

const Compliance = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020817] text-white">
      <SEO
        title="Compliance & Security | Global Enterprise E-Voting Standards"
        description="Vote Secure is an enterprise electronic voting platform with AES-256 encryption, immutable audit trails, ISO 27001 controls, and SOC 2 Type II compliance."
        canonical="/compliance"
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-Grade Institutional Security</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Uncompromising <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Compliance & Security</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed">
            Built from the ground up to satisfy the rigorous statutory requirements of global capital markets, securities regulators, and independent scrutinizers.
          </p>
        </div>

        {/* Global Regulatory Standards Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
            <FileCheck className="text-cyan-400 w-7 h-7" />
            International Regulatory Standards
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0d1b2a]/90 border border-white/15 p-8 rounded-3xl backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-4 text-cyan-300">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Statutory Corporate Governance</h3>
              <p className="text-slate-200 text-sm font-normal leading-relaxed mb-4">
                Fully compliant with international corporate governance acts (including Delaware General Corporation Law, UK Companies Act, and OECD principles) governing electronic balloting and remote participation.
              </p>
              <ul className="space-y-2.5 text-xs md:text-sm text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Statutory quorum tracking & weighted calculation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Independent Scrutinizer Portal & certified sign-off</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict single-vote restrictions for Director elections</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0d1b2a]/90 border border-white/15 p-8 rounded-3xl backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-4 text-cyan-300">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Securities & Exchange Standards</h3>
              <p className="text-slate-200 text-sm font-normal leading-relaxed mb-4">
                Engineered to satisfy listing rules and proxy disclosure mandates across major international stock exchanges including NYSE, NASDAQ, LSE, and global capital markets.
              </p>
              <ul className="space-y-2.5 text-xs md:text-sm text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pre-meeting notice and explanatory dispatch tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official Scrutinizer Audit PDF report generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time exchange filing compliance export</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cryptographic Security Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
            <Lock className="text-cyan-400 w-7 h-7" />
            Enterprise Data Security & Encryption
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0d1b2a]/90 border border-white/15 p-6 rounded-3xl shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-4 text-cyan-300">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">AES-256-GCM Encryption</h3>
              <p className="text-xs md:text-sm text-slate-200 font-normal leading-relaxed">
                All shareholder rosters, cast ballots, and personally identifiable information (PII) are encrypted at rest and in transit using military-grade AES-256 encryption.
              </p>
            </div>

            <div className="bg-[#0d1b2a]/90 border border-white/15 p-6 rounded-3xl shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-4 text-cyan-300">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Global Sovereign Hosting</h3>
              <p className="text-xs md:text-sm text-slate-200 font-normal leading-relaxed">
                High-availability cloud infrastructure distributed across secure Tier-4 data centers with automated multi-region failover and 99.99% uptime guarantees.
              </p>
            </div>

            <div className="bg-[#0d1b2a]/90 border border-white/15 p-6 rounded-3xl shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mb-4 text-indigo-300">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Immutable Audit Trails</h3>
              <p className="text-xs md:text-sm text-slate-200 font-normal leading-relaxed">
                Every cast ballot is sealed with a unique SHA-256 hash, generating an immutable, tamper-proof record verifiable by independent scrutinizers.
              </p>
            </div>
          </div>
        </div>

        {/* Global Security Certifications */}
        <div className="bg-gradient-to-r from-blue-950/80 via-[#0d1b2a] to-cyan-950/80 border border-blue-400/30 p-10 md:p-12 rounded-3xl text-center shadow-2xl">
          <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Enterprise Governance Certifications</h2>
          <p className="text-slate-200 text-sm max-w-2xl mx-auto mb-8 font-normal">
            Our systems undergo continuous third-party vulnerability assessments, penetration testing, and annual statutory compliance audits.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="px-6 py-3 rounded-2xl bg-black/60 border border-white/20 text-white font-bold text-sm">
              ISO / IEC 27001
            </div>
            <div className="px-6 py-3 rounded-2xl bg-black/60 border border-white/20 text-white font-bold text-sm">
              SOC 2 Type II Ready
            </div>
            <div className="px-6 py-3 rounded-2xl bg-black/60 border border-white/20 text-white font-bold text-sm">
              GDPR & CCPA Compliant
            </div>
            <div className="px-6 py-3 rounded-2xl bg-black/60 border border-white/20 text-white font-bold text-sm">
              OWASP Top 10 Hardened
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;

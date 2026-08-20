import { SEO } from "@/components/layout/SEO";
import { 
  Target, Eye, MapPin, 
  ShieldCheck, Lightbulb, Scale, Lock, Globe, Award, Sparkles, Building2, CheckCircle2
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020817] text-white">
      <SEO
        title="About Us | Trusted Global E-Voting Platform"
        description="Learn about Vote Secure's mission, vision, and enterprise architecture powering compliant electronic voting for global corporations."
        canonical="/about"
      />

      {/* Header */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Globe className="w-3.5 h-3.5" />
            Global Enterprise Governance
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Pioneering the Next Era of <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Corporate Democracy</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed">
            Vote Secure is engineered with a singular mission: to provide listed corporations, global transfer agents, and institutional investors with an immutable, cryptographically verifiable electronic voting infrastructure.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#0d1b2a]/90 border border-white/15 p-10 rounded-3xl backdrop-blur-xl shadow-2xl hover:border-cyan-500/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-6 text-cyan-300">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4">Our Global Mission</h2>
            <p className="text-slate-200 leading-relaxed text-sm md:text-base font-normal">
              To empower corporate boards, corporate secretaries, and transfer agents worldwide with a fault-tolerant, tamper-proof voting engine that eliminates friction, maximizes shareholder turnout, and enforces strict statutory compliance.
            </p>
          </div>

          <div className="bg-[#0d1b2a]/90 border border-white/15 p-10 rounded-3xl backdrop-blur-xl shadow-2xl hover:border-cyan-500/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-6 text-cyan-300">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4">Our Global Vision</h2>
            <p className="text-slate-200 leading-relaxed text-sm md:text-base font-normal">
              To establish the international standard for institutional e-voting, where every cast ballot is protected by 256-bit cryptography, instantly tallied, and anchored in an immutable public audit ledger.
            </p>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="bg-[#0d1b2a]/90 border border-white/15 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h2 className="text-3xl font-black text-white">The Engineering Behind Vote Secure</h2>
          </div>
          <div className="space-y-4 text-slate-200 text-base md:text-lg font-normal leading-relaxed">
            <p>
              Traditional proxy voting and general meeting portals have historically suffered from fragmented user experiences, manual spreadsheet reconciliation, and lack of real-time independent auditability.
            </p>
            <p>
              We architected Vote Secure from the ground up to solve these structural challenges. By combining high-throughput database synchronization with SHA-256 cryptographic hashing and automated scrutinizer verification, our platform delivers an uncompromising standard of security and transparency for world-class enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white">Our Pillars of Excellence</h2>
          <p className="text-slate-200 text-sm mt-2">Built on unyielding principles of corporate trust and cryptographic accuracy.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Scale, title: "Statutory Integrity", desc: "Verifiable, auditable balloting that guarantees complete legal compliance." },
            { icon: Lock, title: "Cryptographic Security", desc: "Military-grade 256-bit encryption and immutable transaction logs." },
            { icon: ShieldCheck, title: "Global Compliance", desc: "Engineered for international corporate governance and ISO 27001 readiness." },
            { icon: Lightbulb, title: "Zero-Latency UI", desc: "Modern, responsive interface providing seamless voting for all stakeholders." }
          ].map((value, i) => (
            <div key={i} className="text-center p-6 bg-[#0d1b2a]/90 rounded-3xl border border-white/15 shadow-xl hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-2xl border border-blue-400/30 flex items-center justify-center mb-4 text-cyan-300">
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{value.title}</h3>
              <p className="text-xs md:text-sm text-slate-200 font-normal leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Governance Advisory */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white">Enterprise Governance Architecture</h2>
          <p className="text-slate-200 text-sm mt-2">Designed by veterans in financial systems, cybersecurity, and securities law.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { role: "Executive Governance & Securities", specialty: "Global Capital Markets & Regulatory Compliance", icon: Building2 },
            { role: "Cryptographic Systems & Architecture", specialty: "Distributed Ledgers & Zero-Knowledge Verification", icon: Lock },
            { role: "Statutory Scrutinizer Operations", specialty: "Independent Audit, Quorum & Proxy Advisory Standards", icon: Award }
          ].map((member, i) => (
            <div key={i} className="p-8 bg-[#0d1b2a]/90 rounded-3xl border border-white/15 text-center shadow-xl">
              <div className="w-16 h-16 mx-auto bg-cyan-500/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center mb-5 text-cyan-300">
                <member.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{member.role}</h3>
              <p className="text-xs text-slate-200 font-normal leading-relaxed">{member.specialty}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 max-w-5xl text-center">
        <div className="bg-gradient-to-r from-blue-950/80 via-[#0d1b2a] to-cyan-950/80 border border-blue-400/30 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-black text-white mb-4">Empower Your Next General Meeting</h2>
          <p className="text-slate-200 max-w-2xl mx-auto mb-8 text-sm md:text-base font-normal">
            Join forward-thinking enterprise corporations utilizing Vote Secure for compliant, instantaneous, and tamper-proof shareholder democracy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/company-register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 shadow-lg shadow-blue-500/20">
                Register Company
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white font-bold rounded-xl px-8">
                Speak With Corporate Concierge
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

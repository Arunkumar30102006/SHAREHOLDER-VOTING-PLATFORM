import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Vote, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Users, 
  ChevronRight, 
  FileText, 
  Smartphone, 
  Scale, 
  Sparkles,
  BarChart3,
  Clock,
  HelpCircle
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
      "name": "Shareholder Voting",
      "item": "https://www.shareholdervoting.in/shareholder-voting"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is digital shareholder voting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Digital shareholder voting allows equity holders and institutional investors to cast legally binding, weighted votes on company resolutions electronically via web or mobile without attending physical meetings in person."
      }
    },
    {
      "@type": "Question",
      "name": "How are shareholder votes weighted in an online meeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Votes are calculated based on the official register of members (Benpos) on the cutoff date. Each shareholder's vote weight automatically corresponds to the exact number of equity shares held."
      }
    },
    {
      "@type": "Question",
      "name": "How does Vote India Secure maintain voter confidentiality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ballots are encrypted with AES-256 and sealed with SHA-256 cryptographic hashes. Cast votes remain unalterable and confidential until the official Scrutinizer unlocks the digital audit vault."
      }
    }
  ]
};

export const ShareholderVoting = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="Shareholder Voting Platform | Online Shareholder E-Voting System"
        description="Empower your shareholders with secure, online digital voting for AGMs, EGMs, and postal ballots. Easy 2FA authentication, weighted ballots, and instant tallying."
        canonical="/shareholder-voting"
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
              <Vote className="w-4 h-4 text-cyan-400" />
              <span>Digital Corporate Democracy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Modern Online{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Shareholder Voting
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Transform your shareholder meeting experience with an accessible, high-turnout electronic voting system designed for Indian listed enterprises, unlisted corporations, and registrar agencies.
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

      {/* What is Shareholder Voting? */}
      <section className="py-20 bg-[#0d1b2a]/50 border-y border-white/10 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Corporate Governance
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                What is Online Shareholder Voting?
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                Shareholder voting is the fundamental statutory process through which equity investors exercise their voting rights on key corporate decisions — including director appointments, dividend distributions, auditor elections, and statutory mergers.
              </p>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Traditional paper ballots and physical attendance create logistical friction, high printing costs, and low retail turnout. <strong>Vote India Secure</strong> replaces manual workflows with a secure, cloud-based platform where shareholders cast verified ballots in seconds from any smartphone or computer.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-semibold text-cyan-300">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30">✓ Section 108 Compliant</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30">✓ Weighted Voting Power</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30">✓ Zero Paperwork</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#0d1b2a]/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Scale className="w-5 h-5 text-cyan-400" />
                Core Platform Advantages
              </h3>
              <div className="space-y-4 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Higher Shareholder Participation:</strong>
                    Enables retail and overseas NRI investors to vote effortlessly without travel.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Automated Share Weighting:</strong>
                    Integrates with depository records (CDSL/NSDL) to prevent over-voting or double voting.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Tamper-Proof Audit Trail:</strong>
                    Cryptographic hash seals protect ballot integrity for independent Scrutinizer verification.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Shareholder Voting Works: 6 Steps */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Streamlined Flow
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              How the Shareholder Voting Process Works
            </h2>
            <p className="text-slate-300 text-base md:text-lg">
              A 6-step intuitive workflow ensuring maximum security and seamless voter execution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Voter Authentication",
                desc: "Shareholder logs in securely via 2FA OTP sent to their registered mobile or email matching company benpos records.",
                icon: Lock,
              },
              {
                step: "02",
                title: "Meeting Overview",
                desc: "Access the active general meeting agenda, virtual broadcast links, annual report summaries, and statutory notices.",
                icon: Building2,
              },
              {
                step: "03",
                title: "Resolution Review",
                desc: "Read ordinary and special resolution draft texts, explanatory statements, and director candidate bios.",
                icon: FileText,
              },
              {
                step: "04",
                title: "Ballot Casting",
                desc: "Cast your vote (For, Against, or Abstain). Share count is automatically applied to weighted voting calculations.",
                icon: Vote,
              },
              {
                step: "05",
                title: "Pre-Submission Review",
                desc: "Review your selected choices across all resolutions before finalizing the cryptographic ballot submission.",
                icon: ShieldCheck,
              },
              {
                step: "06",
                title: "Instant Confirmation",
                desc: "Receive a cryptographic voting receipt with SHA-256 transaction hash and download an official PDF confirmation.",
                icon: CheckCircle2,
              },
            ].map((s) => (
              <div key={s.step} className="p-7 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 backdrop-blur-xl shadow-lg relative group hover:border-blue-500/40 transition-all">
                <div className="text-3xl font-black text-blue-400/40 font-mono mb-4">{s.step}</div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300 mb-4">
                  <s.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Navigation Links */}
      <section className="py-16 bg-[#0d1b2a]/40 border-y border-white/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Related Shareholder Governance Solutions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link to="/agm-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              AGM E-Voting →
            </Link>
            <Link to="/egm-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              EGM E-Voting →
            </Link>
            <Link to="/corporate-voting" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              Corporate Voting →
            </Link>
            <Link to="/compliance" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-semibold text-slate-200 hover:text-cyan-300">
              SEBI Compliance →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-blue-900/60 via-[#0d1b2a] to-indigo-950/60 border border-blue-500/30 backdrop-blur-2xl shadow-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to Upgrade Your Shareholder Voting?
            </h2>
            <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Host your next corporate meeting with 100% digital voting, real-time quorum reporting, and immutable audit logs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company-register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  Register Your Organization
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold gap-2 px-8 py-6 rounded-xl">
                  Contact Our Governance Team
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShareholderVoting;

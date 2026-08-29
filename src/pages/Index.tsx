import { useState, useEffect, lazy, Suspense } from "react";
import { SEO } from "@/components/layout/SEO";
import { 
  organizationSchema, 
  webSiteSchema, 
  homepageSoftwareOrgGraphSchema, 
  createFaqSchema 
} from "@/components/layout/StructuredData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, Lock, Building2, FileCheck2,
  UploadCloud, Smartphone, HelpCircle, ChevronDown, 
  Sparkles, ArrowRight, Play, Check, Shield,
  Users, BarChart3, Globe, Award, CheckCircle2,
  Zap, FileText, ArrowUpRight
} from "lucide-react";

import StatsSection from "@/components/home/StatsSection";
import TrustBadgesRow from "@/components/home/TrustBadgesRow";
import SecurityComplianceSection from "@/components/home/SecurityComplianceSection";

// Lazy-load 3D WebGL Globe post-LCP so it doesn't block critical mobile paint
const HeroGlobe3D = lazy(() => import("@/components/3d/HeroGlobe3D"));

const faqItems = [
  {
    question: "Is Vote India Secure compliant with corporate governance and statutory e-voting requirements?",
    answer: "Yes. The platform is designed in alignment with Section 108 of the Companies Act 2013, Rule 20 of the Companies (Management and Administration) Rules 2014, and SEBI LODR Regulation 44, featuring weighted voting calculations, cryptographic ballot integrity, and independent scrutinizer access."
  },
  {
    question: "How does online shareholder voting work during an AGM or EGM?",
    answer: "Companies configure their general meeting resolutions and upload shareholder roster records. Shareholders receive secure access credentials via email or SMS, authenticate via 2-Factor OTP verification, and cast weighted ballots corresponding to their shareholding. Results and cryptographic receipts are generated in real-time."
  },
  {
    question: "What types of organizations can use this platform?",
    answer: "Any publicly listed corporation, unlisted enterprise, cooperative, investment fund, or Registrar and Transfer Agent (RTA) conducting shareholder ballots, proxy votes, or board elections can use the platform."
  },
  {
    question: "How does Vote India Secure guarantee ballot security and secrecy?",
    answer: "Vote India Secure enforces AES-256 encryption at rest and TLS 1.3 in transit. Every vote is cryptographically sealed with SHA-256 hashing and recorded to a verifiable Merkle audit ledger, ensuring individual voter selections remain decoupled and cannot be modified prior to official Scrutinizer unblocking."
  },
  {
    question: "Can shareholders vote from their mobile devices?",
    answer: "Yes. Vote India Secure is a responsive Progressive Web App (PWA) that functions smoothly on smartphones, tablets, and desktop browsers without requiring third-party plugins or certificate installations."
  }
];

const audienceCards = [
  {
    title: "For Shareholders",
    subtitle: "Accessible Worldwide",
    icon: Users,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/40",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    link: "/shareholder-login",
    linkText: "Shareholder Portal",
    points: [
      "Instant 2-Factor OTP & biometric authentication",
      "Vote from any smartphone, tablet, or desktop browser worldwide",
      "Cryptographic vote confirmation receipt with verifiable QR",
      "AI-powered resolution summaries and annual report briefings"
    ]
  },
  {
    title: "For Enterprises & RTAs",
    subtitle: "Global Governance Hub",
    icon: Building2,
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/40",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    link: "/company-register",
    linkText: "Register Organization",
    points: [
      "Import global shareholder registries and depository records",
      "Configure ordinary, special, and multi-class share resolutions",
      "Live real-time quorum progression and investor analytics",
      "Full compliance with international corporate governance laws"
    ]
  },
  {
    title: "For Scrutinizers & Auditors",
    subtitle: "Independent Verification",
    icon: ShieldCheck,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/40",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    link: "/live-demo",
    linkText: "View Auditor Demo",
    points: [
      "Digital key unblocking with multi-witness authentication",
      "Automated official scrutinizer audit reports in 1-click",
      "Instant data export for stock exchange and regulatory filings",
      "Immutable Merkle tree audit trail verification"
    ]
  }
];

const comparisonPoints = [
  { 
    feature: "Universal Mobile UX", 
    category: "User Experience", 
    us: "Seamless PWA on any smartphone with 2-tap biometric voting", 
    them: "Outdated legacy web portals designed decades ago" 
  },
  { 
    feature: "Authentication Speed", 
    category: "Security & Access", 
    us: "Instant multi-channel OTP verification (<10s)", 
    them: "Slow postal mail or complex hardware tokens" 
  },
  { 
    feature: "Live Quorum & Analytics", 
    category: "Boardroom Intelligence", 
    us: "Real-time visual charts & global participation metrics", 
    them: "Static spreadsheets compiled hours after meetings" 
  },
  { 
    feature: "Audit Report Generation", 
    category: "Compliance & Legal", 
    us: "1-Click automated statutory scrutinizer reports", 
    them: "Manual calculation prone to tabulation errors" 
  },
  { 
    feature: "AI Document Summarizer", 
    category: "AI Governance", 
    us: "Instant bullet-point executive summaries & resolution analysis", 
    them: "Not available (hundreds of dense PDF pages)" 
  },
];

const Index = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [show3DGlobe, setShow3DGlobe] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Skip 3D globe on low-end devices (≤2 CPU cores) to avoid TBT spikes
      const cores = navigator.hardwareConcurrency || 2;
      if (cores <= 2) return;

      if ("requestIdleCallback" in window) {
        const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          () => setShow3DGlobe(true),
          { timeout: 3000 }
        );
        return () => {
          if ("cancelIdleCallback" in window) {
            (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
          }
        };
      } else {
        const timer = setTimeout(() => setShow3DGlobe(true), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500/30">
      <SEO
        title="Vote India Secure | Secure Shareholder E-Voting Platform"
        description="Secure online shareholder voting platform for AGMs, EGMs and corporate resolutions with audit trails, real-time results and enterprise-grade security."
        canonical="/"
        keywords="shareholder e-voting platform India, online AGM voting software, SEBI LODR e-voting, Companies Act Section 108 voting, electronic voting platform India, remote e-voting solution, AGM EGM voting software"
        schemas={[organizationSchema, webSiteSchema, homepageSoftwareOrgGraphSchema, createFaqSchema(faqItems)]}
      />

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden" aria-label="Hero section">
        {/* Dynamic Glowing Lighting */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-600/25 via-cyan-500/20 to-transparent rounded-full blur-[140px]" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-700/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 -right-32 w-80 h-80 bg-teal-600/15 rounded-full blur-[100px]" />
        </div>

        {/* 3D WebGL Globe Background (Deferred) */}
        {show3DGlobe && (
          <Suspense fallback={null}>
            <HeroGlobe3D />
          </Suspense>
        )}

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Top Regulatory Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs md:text-sm font-semibold mb-8 shadow-md backdrop-blur-md">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-100">Enterprise Governance Standards · AES-256 Bit Encryption</span>
            </div>

            {/* Main Headline (LCP Candidate - Instant Rendering) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Online Shareholder <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
                Voting Platform for AGMs &amp; EGMs
              </span>
            </h1>

            {/* Concise Subtitle with High Contrast */}
            <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Purpose-built electronic voting software for global public corporations, private enterprises, and transfer agents. Conduct secure AGMs, EGMs, and proxy ballots with real-time auditability.
            </p>

            {/* Quick Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-2xl mx-auto">
              {[
                "🔒 AES-256 Bit Encryption",
                "⚡ Instant Quorum Tallying",
                "📜 Automated Audit Reports",
                "📱 Universal Mobile PWA"
              ].map((feat, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-slate-100 shadow-sm">
                  {feat}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/live-demo">
                <Button size="xl" className="w-full sm:w-auto bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 text-base px-8 py-6 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30">
                  <Play className="w-4 h-4 fill-white" />
                  Explore Live Interactive Demo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/company-register">
                <Button variant="outline" size="xl" className="w-full sm:w-auto text-base px-8 py-6 rounded-xl border-white/25 hover:bg-white/10 text-white font-semibold gap-2 shadow-sm">
                  Register Your Organization
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. TRUST PILLS & METRICS ─── */}
      <TrustBadgesRow />
      <StatsSection />

      {/* ─── 3. AUDIENCE PERSONAS (Shareholders, Enterprises, Scrutinizers) ─── */}
      <section className="py-20 relative overflow-hidden" aria-label="Platform users">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Tailored For Global Stakeholders
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              A Unified Portal for <span className="text-blue-400">All Participants</span>
            </h2>
            <p className="text-slate-200 text-base md:text-lg font-normal">
              Engineered to meet the international legal, analytical, and operational requirements of corporate voting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {audienceCards.map((card, index) => (
              <div
                key={card.title}
                className={`p-7 rounded-3xl bg-[#0d1b2a]/80 border ${card.border} backdrop-blur-xl flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300 shadow-xl group animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} border border-white/20 flex items-center justify-center shadow-sm`}>
                      <card.icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>

                  <ul className="space-y-3 mb-8">
                    {card.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={card.link}>
                  <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white font-semibold justify-between group-hover:border-white/40">
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. BENTO GRID FEATURES ─── */}
      <section className="py-20 relative overflow-hidden bg-white/[0.02] border-y border-white/10" aria-label="Enterprise features">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Enterprise Governance <span className="text-blue-400">Capabilities</span>
            </h2>
            <p className="text-slate-200 text-base md:text-lg font-normal">
              Everything corporate governance and legal teams need to conduct transparent, tamper-evident electronic voting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Bento 1: Cryptographic Integrity */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 backdrop-blur-xl relative group hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Cryptographic SHA-256 Ballot Sealing</h3>
              <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-6 font-normal">
                Every cast ballot produces a SHA-256 cryptographic hash chained into a verifiable Merkle Tree. Under Rule 20(4)(xii), individual voter choices remain decoupled and sealed until official unblocking by the Scrutinizer.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-100 font-semibold">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" /> SHA-256 Hashing
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" /> Granular RLS Access
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" /> Merkle Audit Proof
                </div>
              </div>
            </div>

            {/* Bento 2: Scrutinizer Hub */}
            <div className="p-8 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 backdrop-blur-xl group hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-6">
                  <FileCheck2 className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Scrutinizer Audit Portal</h3>
                <p className="text-slate-200 text-sm leading-relaxed mb-4 font-normal">
                  Automated vote consolidation and Form MGT-13 style report generation to assist the Scrutinizer and Company Secretary with statutory filings.
                </p>
              </div>
              <Link to="/compliance" className="text-xs font-bold text-cyan-300 flex items-center gap-1 hover:underline">
                View Statutory Standards <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bento 3: Mobile Accessibility */}
            <div className="p-8 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 backdrop-blur-xl group hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Universal Mobile Voting</h3>
                <p className="text-slate-200 text-sm leading-relaxed mb-4 font-normal">
                  Shareholders vote from any phone or browser via 2-factor verification without installing third-party certificates or bulky applications.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                Designed for High Shareholder Turnout
              </span>
            </div>

            {/* Bento 4: AI Governance Suite */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 backdrop-blur-xl relative group hover:border-purple-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Document & Investor Sentiment Suite</h3>
              <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-6 font-normal">
                Empower your shareholders with instant AI executive summaries of lengthy annual reports, proxy notices, and resolution agendas. Monitor live sentiment during meeting Q&A sessions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold border border-purple-400/30">Meeting Notice Summaries</span>
                <span className="px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold border border-purple-400/30">Live Sentiment Monitor</span>
                <span className="px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold border border-purple-400/30">Multi-Language Ready</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 5. STREAMLINED 3-STEP PROCESS ─── */}
      <section className="py-20" aria-label="How it works">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              How It <span className="text-blue-400">Works</span>
            </h2>
            <p className="text-slate-200 text-base font-normal">From organization setup to consolidated Scrutinizer reporting in three steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              {
                step: "01",
                title: "Upload & Schedule",
                desc: "Import master shareholder register and configure ordinary or special resolutions with automated voting timers.",
                icon: UploadCloud,
              },
              {
                step: "02",
                title: "Secure Voting",
                desc: "Shareholders receive secure links, authenticate via 2-Factor verification, and cast weighted ballots on any device in under 30 seconds.",
                icon: Smartphone,
              },
              {
                step: "03",
                title: "Scrutinizer Export",
                desc: "Scrutinizers unblock digital vault with two witnesses and export consolidated Form MGT-13 reports for Chairman submission.",
                icon: FileCheck2,
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#0d1b2a]/80 border border-white/15 relative group hover:border-blue-500/40 transition-all shadow-lg">
                <div className="text-4xl font-black text-blue-400/70 mb-4 font-mono">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. SECURITY, COMPLIANCE & BENCHMARK MATRIX ─── */}
      <SecurityComplianceSection />

      {/* ─── 7. ACCORDION FAQ ─── */}
      <section className="py-20" aria-label="Frequently asked questions" id="faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Frequently Asked <span className="text-blue-400">Questions</span>
            </h2>
            <p className="text-slate-200 text-sm md:text-base font-normal">Regulatory and operational answers for corporate boards and governance teams.</p>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((faq, index) => (
              <div 
                key={index}
                className="rounded-2xl border border-white/15 bg-[#0d1b2a]/80 overflow-hidden transition-colors shadow-md"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm md:text-base hover:text-blue-400 transition-colors"
                  aria-expanded={activeFaq === index}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${activeFaq === index ? "rotate-180 text-blue-400" : ""}`} />
                </button>
                <div
                  className={`px-5 pb-5 text-sm text-slate-100 leading-relaxed border-t border-white/10 pt-3.5 font-normal ${
                    activeFaq === index ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. FINAL CONVERSION BANNER ─── */}
      <section className="py-24 relative overflow-hidden" aria-label="Call to action">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-[#1e3a8a]/90 via-blue-900/80 to-indigo-950/90 border border-blue-400/40 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Modernize Your Corporate Governance Today
            </h2>
            <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto mb-8 font-normal">
              Join leading global enterprises upgrading their shareholder voting infrastructure with Vote Secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="xl" className="bg-white text-[#1e3a8a] hover:bg-slate-100 font-bold px-8 py-6 rounded-xl shadow-xl border border-white">
                  Schedule Platform Walkthrough
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="xl" className="border-white/40 text-white font-semibold hover:bg-white/15 px-8 py-6 rounded-xl">
                  View Transparent Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;

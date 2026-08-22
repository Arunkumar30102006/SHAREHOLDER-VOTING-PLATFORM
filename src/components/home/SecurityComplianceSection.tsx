import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck2, 
  BarChart3, 
  Check, 
  X, 
  RefreshCw, 
  Info,
  Sparkles
} from 'lucide-react';

interface TrustBadge {
  icon: React.ElementType;
  title: string;
  description: string;
  badge: string;
  accent: string;
  iconBg: string;
}

interface ComparisonRow {
  feature: string;
  category: string;
  voteIndiaSecure: {
    status: 'yes' | 'no' | 'partial';
    text: string;
  };
  cdsl: {
    status: 'yes' | 'no' | 'partial';
    text: string;
  };
  nsdl: {
    status: 'yes' | 'no' | 'partial';
    text: string;
  };
  right2Vote: {
    status: 'yes' | 'no' | 'partial';
    text: string;
  };
}

const trustBadges: TrustBadge[] = [
  {
    icon: ShieldCheck,
    title: 'SEBI-Compliant Architecture',
    description: 'Engineered in strict adherence to SEBI LODR Regulation 44 and Companies Act 2013 Section 108.',
    badge: 'Statutory Standard',
    accent: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    iconBg: 'bg-blue-500/20 text-blue-400 border-blue-400/30',
  },
  {
    icon: Lock,
    title: 'AES-256 Encryption',
    description: 'Military-grade end-to-end cryptographic vote sealing with SHA-256 ballot hashing at rest and in transit.',
    badge: 'Zero Tampering',
    accent: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30',
  },
  {
    icon: FileCheck2,
    title: 'DPDP Act 2023 Ready',
    description: "Fully aligned with India's Digital Personal Data Protection Act with encrypted storage & zero data sharing.",
    badge: 'Privacy by Design',
    accent: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    iconBg: 'bg-amber-500/20 text-amber-400 border-amber-400/30',
  },
  {
    icon: BarChart3,
    title: 'End-to-End Audit Trail',
    description: 'Immutable Merkle-tree cryptographic logs with 1-click statutory scrutinizer and auditor reporting.',
    badge: 'Auditor Verified',
    accent: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
    iconBg: 'bg-purple-500/20 text-purple-400 border-purple-400/30',
  },
];

const comparisonData: ComparisonRow[] = [
  {
    feature: 'Pricing Transparency',
    category: 'Commercials',
    voteIndiaSecure: {
      status: 'yes',
      text: 'Upfront flat pricing (₹15k – ₹45k), zero hidden setup fees',
    },
    cdsl: {
      status: 'no',
      text: 'Opaque quotation, high slab-based charges per shareholder',
    },
    nsdl: {
      status: 'no',
      text: 'Complex multi-tier depository tariffs and annual commitments',
    },
    right2Vote: {
      status: 'partial',
      text: 'Variable per-vote charging model with add-on feature costs',
    },
  },
  {
    feature: 'Company Registration Flow',
    category: 'Onboarding',
    voteIndiaSecure: {
      status: 'yes',
      text: '100% digital self-serve registration in < 5 minutes',
    },
    cdsl: {
      status: 'no',
      text: 'Lengthy offline physical forms and multi-week courier delays',
    },
    nsdl: {
      status: 'no',
      text: 'Manual verification workflows taking 10–14 business days',
    },
    right2Vote: {
      status: 'partial',
      text: 'Semi-automated onboarding requiring manual sales approval',
    },
  },
  {
    feature: 'Real-Time Results & Analytics',
    category: 'Intelligence',
    voteIndiaSecure: {
      status: 'yes',
      text: 'Live quorum telemetry, voter turnout charts & instant tally',
    },
    cdsl: {
      status: 'no',
      text: 'Batch processing with delayed end-of-window raw data',
    },
    nsdl: {
      status: 'no',
      text: 'Static CSV exports delivered post-meeting only',
    },
    right2Vote: {
      status: 'partial',
      text: 'Basic numerical counter without visual boardroom analytics',
    },
  },
  {
    feature: 'API Access & Automation',
    category: 'Integrations',
    voteIndiaSecure: {
      status: 'yes',
      text: 'Modern RESTful APIs & automated depository benpos sync',
    },
    cdsl: {
      status: 'no',
      text: 'Closed proprietary system with no developer API access',
    },
    nsdl: {
      status: 'no',
      text: 'Legacy batch file uploads with zero real-time webhooks',
    },
    right2Vote: {
      status: 'partial',
      text: 'Limited webhook integration available on custom enterprise plan',
    },
  },
  {
    feature: 'Modern Responsive UI / PWA',
    category: 'User Experience',
    voteIndiaSecure: {
      status: 'yes',
      text: '2-tap biometric smartphone PWA voting, zero installation',
    },
    cdsl: {
      status: 'no',
      text: 'Dated legacy desktop portal built on older web standards',
    },
    nsdl: {
      status: 'no',
      text: 'Complex legacy interface with frequent browser incompatibilities',
    },
    right2Vote: {
      status: 'partial',
      text: 'Standard web forms with basic responsive layout',
    },
  },
];

const StatusIndicator = ({ status, label }: { status: 'yes' | 'no' | 'partial'; label: string }) => {
  if (status === 'yes') {
    return (
      <div className="flex items-start gap-2">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/40">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
        <span className="text-xs md:text-sm text-slate-100 font-medium leading-snug">{label}</span>
      </div>
    );
  }

  if (status === 'no') {
    return (
      <div className="flex items-start gap-2">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 shrink-0 mt-0.5 border border-rose-500/40">
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
        <span className="text-xs md:text-sm text-slate-400 leading-snug">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 border border-amber-500/40">
        <RefreshCw className="w-3 h-3 stroke-[2.5]" />
      </span>
      <span className="text-xs md:text-sm text-slate-300 leading-snug">{label}</span>
    </div>
  );
};

export const SecurityComplianceSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0d1b2a] text-white overflow-hidden border-t border-b border-white/10">
      {/* Background Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs md:text-sm font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Institutional Governance & Trust
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
            Security, Compliance &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Platform Benchmarks
            </span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Built from the ground up for Indian corporate governance standards, statutory audits, and seamless shareholder participation.
          </p>
        </div>

        {/* 4 Trust Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="relative p-6 md:p-7 rounded-3xl bg-[#132338]/80 border border-white/10 backdrop-blur-xl hover:border-white/25 transition-all duration-300 hover:-translate-y-1 shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner ${badge.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 uppercase tracking-wider">
                      {badge.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {badge.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Enforced by Architecture</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Comparison Section */}
        <div className="bg-[#132338]/90 border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl mb-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
              Competitive Matrix
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              How Vote India Secure Compares
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-normal">
              A modern alternative to legacy depository portals and outdated voting software.
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/15">
                    <th scope="col" className="py-4 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/4">
                      Feature & Parameter
                    </th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-cyan-300 bg-blue-500/10 border-x border-blue-500/30 rounded-t-2xl w-1/4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Vote India Secure
                      </div>
                    </th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/6">
                      CDSL E-Voting
                    </th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/6">
                      NSDL E-Voting
                    </th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/6">
                      Right2Vote
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 sm:py-5 px-4 sm:px-6 text-sm font-semibold text-white">
                        <div>{row.feature}</div>
                        <span className="text-[11px] font-normal text-slate-400 uppercase tracking-wide">
                          {row.category}
                        </span>
                      </td>

                      {/* Vote India Secure Column (Highlighted) */}
                      <td className="py-4 sm:py-5 px-4 sm:px-6 bg-blue-500/10 border-x border-blue-500/30">
                        <StatusIndicator status={row.voteIndiaSecure.status} label={row.voteIndiaSecure.text} />
                      </td>

                      {/* CDSL Column */}
                      <td className="py-4 sm:py-5 px-4 sm:px-6">
                        <StatusIndicator status={row.cdsl.status} label={row.cdsl.text} />
                      </td>

                      {/* NSDL Column */}
                      <td className="py-4 sm:py-5 px-4 sm:px-6">
                        <StatusIndicator status={row.nsdl.status} label={row.nsdl.text} />
                      </td>

                      {/* Right2Vote Column */}
                      <td className="py-4 sm:py-5 px-4 sm:px-6">
                        <StatusIndicator status={row.right2Vote.status} label={row.right2Vote.text} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> Full Native Support
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <RefreshCw className="w-3 h-3" /> Partial / Variable
              </span>
              <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                <X className="w-3.5 h-3.5" /> Not Supported / Legacy
              </span>
            </div>
            <span className="text-slate-400">Comparison benchmark as of Q3 2026</span>
          </div>
        </div>

        {/* Regulatory Disclaimer Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5 text-xs sm:text-sm text-slate-300 backdrop-blur-md">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-normal">
            <strong className="text-white font-semibold">Regulatory Disclosure: </strong>
            SEBI certification in progress. Platform architecture is compliant with Companies Act 2013, SEBI circular on e-voting, and MCA mandate. All trademark names (CDSL, NSDL, Right2Vote) belong to their respective holders and are used solely for comparative descriptive purposes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecurityComplianceSection;

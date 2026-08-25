import { ShieldCheck, Lock, Building2, Award, Globe } from "lucide-react";

const badges = [
  { label: "Corporate Governance Standards", icon: Globe, color: "text-blue-400" },
  { label: "Enterprise Security Aligned", icon: Building2, color: "text-cyan-400" },
  { label: "AES-256 Bit Encryption", icon: Lock, color: "text-emerald-400" },
  { label: "SOC 2 Aligned Architecture", icon: ShieldCheck, color: "text-amber-400" },
  { label: "ISO 27001 Aligned Architecture", icon: Award, color: "text-purple-400" },
];

const TrustBadgesRow = () => {
  return (
    <section className="py-8 md:py-12 relative overflow-hidden" aria-label="Trust and compliance indicators">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300 group"
            >
              <badge.icon className={`w-4 h-4 ${badge.color} group-hover:scale-110 transition-transform`} aria-hidden="true" />
              <span className="text-xs md:text-sm font-semibold text-white tracking-wide whitespace-nowrap">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesRow;

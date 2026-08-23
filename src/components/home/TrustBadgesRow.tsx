import { Shield, ShieldCheck, Lock, Building2, Award, Globe } from "lucide-react";
import { motion } from "motion/react";

const badges = [
  { label: "Global Governance Compliant", icon: Globe, color: "text-blue-400" },
  { label: "Enterprise Security Aligned", icon: Building2, color: "text-cyan-400" },
  { label: "AES-256 Bit Encryption", icon: Lock, color: "text-emerald-400" },
  { label: "SOC 2 Type II Ready", icon: ShieldCheck, color: "text-amber-400" },
  { label: "ISO 27001 Ready", icon: Award, color: "text-purple-400" },
];

const TrustBadgesRow = () => {
  return (
    <section className="py-8 md:py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300 group"
            >
              <badge.icon className={`w-4 h-4 ${badge.color} group-hover:scale-110 transition-transform`} />
              <span className="text-xs md:text-sm font-semibold text-white tracking-wide whitespace-nowrap">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadgesRow;

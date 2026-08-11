import { Vote, Building2, Activity, Shield } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "10M+", label: "Votes Processed", icon: Vote, color: "text-blue-400" },
  { value: "500+", label: "Companies Served", icon: Building2, color: "text-amber-400" },
  { value: "99.99%", label: "Uptime", icon: Activity, color: "text-emerald-400" },
  { value: "2023", label: "SEBI Compliant Since", icon: Shield, color: "text-purple-400" },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/3 to-primary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0d1b2a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{stat.value}</p>
                <p className="text-xs md:text-sm text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

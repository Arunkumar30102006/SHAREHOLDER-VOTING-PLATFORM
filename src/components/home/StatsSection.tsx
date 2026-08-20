import { Vote, Building2, Activity, ShieldCheck } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  icon: typeof Vote;
  color: string;
}

const stats: StatItem[] = [
  { value: "10M+", numericValue: 10, suffix: "M+", label: "Votes Processed", icon: Vote, color: "text-blue-400" },
  { value: "500+", numericValue: 500, suffix: "+", label: "Enterprises Worldwide", icon: Building2, color: "text-amber-400" },
  { value: "99.99%", numericValue: 99.99, suffix: "%", label: "Cloud Uptime SLA", icon: Activity, color: "text-emerald-400" },
  { value: "100%", numericValue: 100, suffix: "%", label: "Audit Verifiable", icon: ShieldCheck, color: "text-purple-400" },
];

const useCountUp = (end: number, duration: number, shouldStart: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const startValue = 0;
    const range = end - startValue;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + range * eased;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
};

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const isDecimal = stat.suffix === "%" && stat.numericValue !== 100;
  const count = useCountUp(stat.numericValue, 2000, isInView);

  const displayValue = isDecimal
    ? count.toFixed(2)
    : Math.round(count).toString();

  return (
    <motion.div
      ref={ref}
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
      <p className="text-3xl md:text-4xl font-extrabold text-white mb-1.5 tracking-tight tabular-nums">
        {displayValue}{stat.suffix}
      </p>
      <p className="text-xs md:text-sm text-slate-200 font-semibold tracking-wide">{stat.label}</p>
    </motion.div>
  );
};

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
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

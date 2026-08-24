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
  { value: "<10s", numericValue: 10, suffix: "s", label: "OTP Delivery & Auth Target", icon: Vote, color: "text-blue-400" },
  { value: "256-Bit", numericValue: 256, suffix: "-Bit", label: "AES-256 Encryption Standard", icon: Building2, color: "text-amber-400" },
  { value: "99.99%", numericValue: 99.99, suffix: "%", label: "Cloud Architecture Uptime Target", icon: Activity, color: "text-emerald-400" },
  { value: "100%", numericValue: 100, suffix: "%", label: "SHA-256 Hash Verification", icon: ShieldCheck, color: "text-purple-400" },
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

const StatCard = ({ stat }: { stat: StatItem; index: number }) => {
  return (
    <div className="text-center group">
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <stat.icon className={`w-5 h-5 ${stat.color}`} />
        </div>
      </div>
      <p className="text-3xl md:text-4xl font-extrabold text-white mb-1.5 tracking-tight tabular-nums">
        {stat.value}
      </p>
      <p className="text-xs md:text-sm text-slate-200 font-semibold tracking-wide">{stat.label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/3 to-primary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-[#0d1b2a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlurText from "@/components/ui/BlurText";
import { ArrowRight, Building2, CheckCircle2, ShieldCheck, Users, Play, Shield, Vote, Zap } from "lucide-react";
import { motion } from "motion/react";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const features = [
    "End-to-End Encryption",
    "SEBI Compliant",
    "Tamper-Proof Audit Trails",
    "Two-Factor Authentication",
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Solid Background - Uses Global Theme */}
      <div className="absolute inset-0 -z-10 bg-transparent" />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-block animate-fade-in bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6 shadow-sm">
              <span className="text-white font-semibold text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                Secure. Compliant. Transparent.
              </span>
            </div>

            <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight flex flex-col items-center gap-2">
              <BlurText
                text={t("hero_title_1")}
                className="text-foreground text-center"
                delay={200}
                animateBy="words"
                direction="top"
              />
              <motion.span
                initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 animate-gradient text-center inline-block"
              >
                {t("hero_title_2")}
              </motion.span>
            </div>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              {t("hero_subtitle")}
            </p>


            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up delay-300">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/90 shadow-sm transition-all hover:bg-white/10"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons — 3 buttons: Live Demo (primary), Register, Shareholder Login */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
              <Link to="/demo">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2 shadow-lg shadow-emerald-500/20">
                  <Play className="w-5 h-5" />
                  Try Live Demo
                </Button>
              </Link>
              <Link to="/contact" onClick={() => trackEvent(AnalyticsEvents.REGISTER_CLICK, { location: 'hero' })}>
                <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2 border-white/20 hover:bg-white/5 bg-primary/10 text-white">
                  Request Demo
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/company-register" onClick={() => trackEvent(AnalyticsEvents.REGISTER_CLICK, { location: 'hero' })}>
                <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2 border-white/20 hover:bg-white/5">
                  <Building2 className="w-5 h-5" />
                  {t("register_company")}
                </Button>
              </Link>
              <Link to="/shareholder-login" onClick={() => trackEvent(AnalyticsEvents.LOGIN_CLICK, { type: 'shareholder', location: 'hero' })}>
                <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2 border-white/20 hover:bg-white/5">
                  <Users className="w-5 h-5" />
                  {t("shareholder_login")}
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fade-in-up delay-500">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">SEBI</p>
                  <p className="text-[10px] text-slate-500">LODR Regulation 44</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">MCA</p>
                  <p className="text-[10px] text-slate-500">Ministry of Corporate Affairs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Vote className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Companies Act 2013</p>
                  <p className="text-[10px] text-slate-500">Section 108 Compliant</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">AES-256</p>
                  <p className="text-[10px] text-slate-500">End-to-End Encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

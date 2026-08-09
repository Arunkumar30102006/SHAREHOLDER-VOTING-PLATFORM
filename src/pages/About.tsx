import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Users, Target, Award, Code2, Rocket, GraduationCap, CheckCircle2, ArrowRight, Github, Linkedin, Globe } from "lucide-react";
import { SEO } from "@/components/layout/SEO";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const techStack = [
    { name: "React 18", desc: "Component-based UI" },
    { name: "TypeScript", desc: "Type-safe codebase" },
    { name: "Supabase", desc: "Auth, DB & Edge Functions" },
    { name: "PostgreSQL", desc: "Row Level Security" },
    { name: "Vite", desc: "Lightning-fast builds" },
    { name: "TailwindCSS", desc: "Utility-first styling" },
    { name: "Framer Motion", desc: "Smooth animations" },
    { name: "Zod", desc: "Schema validation" },
    { name: "i18next", desc: "Multi-language" },
    { name: "Recharts", desc: "Data visualization" },
];

const milestones = [
    { label: "Project Started", detail: "Architecture & design phase" },
    { label: "Core Platform Built", detail: "Auth, voting, dashboards" },
    { label: "SEBI Compliance Layer", detail: "Regulation 44 adherence" },
    { label: "AI Features Added", detail: "Document summarizer & sentiment" },
    { label: "Ongoing", detail: "Continuous improvements & feedback" },
];

const About = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen relative">
            <SEO
                title="About Us — Our Story, Team & Technology"
                description="Learn about the team, technology, and mission behind ShareholderVoting.in — a modern e-voting platform for Indian corporate governance."
                canonical="/about"
            />
            <Navbar />
            <main className="container mx-auto px-4 pt-28 pb-12 md:py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="max-w-5xl mx-auto space-y-16">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 md:space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium shadow-sm">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span>About Us</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                            {t("about_title")} <span className="text-primary italic">ShareholderVoting.in</span>
                        </h1>
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            {t("about_subtitle")}
                        </p>
                    </motion.div>

                    {/* Why We Built This — Origin Story */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#020817]/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 relative group overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                    <Rocket className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Why We Built This</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <p className="text-slate-400 leading-relaxed">
                                        India's corporate governance ecosystem has been evolving rapidly, but the tools available for
                                        electronic shareholder voting often feel outdated, fragmented, and disconnected from modern
                                        web standards.
                                    </p>
                                    <p className="text-slate-400 leading-relaxed">
                                        We asked: <em className="text-white/80">What if SEBI-compliant e-voting could be as intuitive
                                        as using a modern web app?</em> That question led to ShareholderVoting.in — a platform built from
                                        scratch to prove that security, compliance, and great user experience can coexist.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-slate-400 leading-relaxed">
                                        This is an independently developed prototype exploring the intersection of financial technology,
                                        Indian corporate law compliance (SEBI LODR, Companies Act 2013), and modern web architecture.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-amber-400 font-medium bg-amber-500/5 border border-amber-500/20 rounded-lg px-4 py-2.5">
                                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                        <span>Prototype · Actively Developed · Open for Collaboration</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mission & Vision Grid */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-6 md:p-8 rounded-2xl bg-[#0d1b2a]/40 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-primary/30 transition-all group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 relative z-10">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white relative z-10">{t("about_mission_title")}</h2>
                            <p className="text-slate-400 leading-relaxed text-sm md:text-base relative z-10">
                                {t("about_mission_desc")}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-6 md:p-8 rounded-2xl bg-[#0d1b2a]/40 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-secondary/30 transition-all group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 relative z-10">
                                <GraduationCap className="w-6 h-6 text-secondary" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white relative z-10">Who Built This</h2>
                            <p className="text-slate-400 leading-relaxed text-sm md:text-base relative z-10">
                                This platform is built by an independent developer passionate about financial technology, corporate governance,
                                and building production-grade web applications. The project demonstrates deep expertise in full-stack development,
                                security architecture, and Indian regulatory compliance.
                            </p>
                            <div className="flex gap-3 mt-5 relative z-10">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className="gap-2 text-xs border-white/10 hover:bg-white/5">
                                        <Github className="w-3 h-3" /> GitHub
                                    </Button>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className="gap-2 text-xs border-white/10 hover:bg-white/5">
                                        <Linkedin className="w-3 h-3" /> LinkedIn
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tech Stack Used */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium shadow-sm">
                                <Code2 className="w-4 h-4 text-emerald-400" />
                                <span>Technology</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white">Tech Stack</h2>
                            <p className="text-sm text-slate-400 max-w-lg mx-auto">
                                Built with modern, battle-tested technologies for reliability and performance.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.04 }}
                                    className="text-center p-4 bg-[#0d1b2a]/30 backdrop-blur-lg border border-white/5 rounded-2xl hover:bg-[#0d1b2a]/50 hover:border-white/15 transition-all group"
                                >
                                    <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{tech.name}</p>
                                    <p className="text-[10px] text-slate-500 mt-1">{tech.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Project Milestones */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-white">Project Timeline</h2>
                            <div className="w-10 h-1 bg-primary mx-auto rounded-full" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="flex-1 relative"
                                >
                                    <div className="p-4 bg-[#0d1b2a]/30 backdrop-blur-lg border border-white/5 rounded-xl text-center hover:border-primary/20 transition-all">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-white">{milestone.label}</p>
                                        <p className="text-[11px] text-slate-500 mt-1">{milestone.detail}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Core Values */}
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-white">{t("about_values_title")}</h2>
                            <div className="w-10 h-1 bg-primary mx-auto rounded-full" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-[#0d1b2a]/30 backdrop-blur-lg border border-white/5 rounded-2xl hover:bg-[#0d1b2a]/50 transition-colors group">
                                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Shield className="w-7 h-7 text-accent" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-white">{t("about_values_security_title")}</h3>
                                <p className="text-xs md:text-sm text-slate-400">
                                    {t("about_values_security_desc")}
                                </p>
                            </div>
                            <div className="text-center p-6 bg-[#0d1b2a]/30 backdrop-blur-lg border border-white/5 rounded-2xl hover:bg-[#0d1b2a]/50 transition-colors group">
                                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Target className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-white">{t("about_values_transparency_title")}</h3>
                                <p className="text-xs md:text-sm text-slate-400">
                                    {t("about_values_transparency_desc")}
                                </p>
                            </div>
                            <div className="text-center p-6 bg-[#0d1b2a]/30 backdrop-blur-lg border border-white/5 rounded-2xl hover:bg-[#0d1b2a]/50 transition-colors group">
                                <div className="mx-auto w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Award className="w-7 h-7 text-secondary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-white">{t("about_values_compliance_title")}</h3>
                                <p className="text-xs md:text-sm text-slate-400">
                                    {t("about_values_compliance_desc")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center pt-8 border-t border-white/5"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Want to Learn More?</h2>
                        <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
                            Explore our features, check our security architecture, or get in touch with us.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link to="/features">
                                <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                                    <Globe className="w-4 h-4" /> Features
                                </Button>
                            </Link>
                            <Link to="/security">
                                <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                                    <Shield className="w-4 h-4" /> Security
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="hero" className="gap-2">
                                    Contact Us <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;

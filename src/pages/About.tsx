import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Users, Target, Award } from "lucide-react";
import { SEO } from "@/components/layout/SEO";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen relative">
            <SEO
                title="About Us"
                description="Learn about our mission to modernize corporate governance in India with secure digital voting."
                canonical="/about"
            />
            <Navbar />
            <main className="container mx-auto px-4 pt-28 pb-12 md:py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Hero Section */}
                    <div className="text-center space-y-4 md:space-y-6">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                            {t("about_title")} <span className="text-primary italic">ShareholderVoting.in</span>
                        </h1>
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            {t("about_subtitle")}
                        </p>
                    </div>

                    {/* Mission & Vision Grid */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
                        <div className="p-6 md:p-8 rounded-2xl bg-[#0d1b2a]/40 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-primary/30 transition-all group overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 relative z-10">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white relative z-10">{t("about_mission_title")}</h2>
                            <p className="text-slate-400 leading-relaxed text-sm md:text-base relative z-10">
                                {t("about_mission_desc")}
                            </p>
                        </div>

                        <div className="p-6 md:p-8 rounded-2xl bg-[#0d1b2a]/40 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-secondary/30 transition-all group overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 relative z-10">
                                <Users className="w-6 h-6 text-secondary" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white relative z-10">{t("about_who_title")}</h2>
                            <p className="text-slate-400 leading-relaxed text-sm md:text-base relative z-10">
                                {t("about_who_desc")}
                            </p>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div className="space-y-8 mt-16 md:mt-24">
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
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;

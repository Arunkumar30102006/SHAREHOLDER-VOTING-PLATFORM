import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, CheckCircle, Scale, FileText, BookOpen, AlertTriangle, ArrowRight } from "lucide-react";
import { SEO } from "@/components/layout/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const regulations = [
    {
        title: "SEBI (LODR) Regulation 44 — E-Voting",
        description: "Mandates that every listed entity shall provide e-voting facility to its shareholders on all resolutions proposed at general meetings. Our platform enables companies to fulfill this obligation seamlessly.",
        details: [
            "E-voting facility must be provided for all resolutions at general meetings",
            "Voting period must begin at least 3 days before the meeting and end on the day of the meeting",
            "Listed entities must engage a SEBI-registered agency for providing e-voting facility",
            "Results must be declared within 2 working days of the conclusion of the meeting"
        ],
        icon: Scale,
        color: "text-blue-400",
    },
    {
        title: "Regulation 44(4) — Cut-off Date",
        description: "Specifies that the company must fix a cut-off date for determining voting rights of shareholders. Only shareholders as on the cut-off date are eligible to vote.",
        details: [
            "Cut-off date for determining voting rights must be fixed",
            "Only members holding shares on the cut-off date have voting rights",
            "Remote e-voting period must end on the day before the general meeting",
            "Shares held in demat form — DPID/Client ID based verification"
        ],
        icon: FileText,
        color: "text-cyan-400",
    },
    {
        title: "Companies Act 2013 — Section 108",
        description: "Empowers the Central Government to prescribe rules for voting by electronic means. This section is the foundational legal basis for all e-voting in India.",
        details: [
            "Every listed company shall provide facility for voting by electronic means",
            "Central Government may prescribe the class of companies and manner of e-voting",
            "Applies to general meetings and postal ballot resolutions",
            "Requires appointment of scrutinizer for the e-voting process"
        ],
        icon: BookOpen,
        color: "text-emerald-400",
    },
    {
        title: "Rule 20 — Companies (Management & Administration) Rules, 2014",
        description: "Prescribes the detailed procedure for conducting e-voting, including requirements for the e-voting system, notice, cut-off date, and scrutinizer appointment.",
        details: [
            "E-voting system must have an audit trail with date and time of each activity",
            "System must prevent double voting and ensure one vote per member per resolution",
            "Notice of at least 21 days must be given with login credentials for e-voting",
            "Scrutinizer must submit a report within 3 days of conclusion of voting"
        ],
        icon: FileText,
        color: "text-purple-400",
    },
];

const complianceFeatures = [
    {
        title: "STQC Certification",
        description: "Our platform architecture is designed to meet the standards set by the Standardization Testing and Quality Certification (STQC) Directorate, ensuring systems meet the highest standards of quality, reliability, and security as mandated by the Government of India.",
    },
    {
        title: "Audit Trail & Transparency",
        description: "We maintain immutable audit logs of all system activities, including voting timestamps, IP addresses (for security), and modification attempts. These logs are tamper-proof and available for scrutinizer review.",
    },
    {
        title: "Vote Secrecy",
        description: "In accordance with regulations, our system ensures that the identity of the voter is disassociated from the vote cast in the final report, preserving 'Secret Ballot' principles while verifying voter eligibility.",
    },
    {
        title: "Scrutinizer Access",
        description: "Dedicated, secure portals are provided for appointed Scrutinizers to independently monitor the voting process, unblock votes, and generate final reports without platform interference.",
    },
    {
        title: "Data Sovereignty",
        description: "All data is stored within Indian borders in compliance with the Digital Personal Data Protection Act, 2023. We employ AES-256 encryption at rest and TLS 1.3 in transit.",
    },
    {
        title: "Weighted Vote Calculation",
        description: "Votes are automatically weighted based on shareholding as per the record date. Our calculation engine follows the exact formula prescribed under SEBI regulations for determining poll results.",
    },
];

const SebiCompliance = () => {
    return (
        <div className="min-h-screen relative">
            <SEO
                title="SEBI & MCA Compliance — Regulatory Framework"
                description="Vote India Secure ensures full compliance with SEBI LODR Regulation 44, Companies Act 2013 Section 108, and MCA Rules for electronic voting processes."
                canonical="/sebi-compliance"
            />
            <Navbar />
            <main className="container mx-auto px-4 pt-28 pb-12 md:py-20 max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4 mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium shadow-sm">
                        <Shield className="w-4 h-4 text-amber-400" />
                        <span>Regulatory Compliance</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                        SEBI & MCA{" "}
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                            Compliance
                        </span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        ShareholderVoting.in is architected to facilitate electronic voting in strict adherence to{" "}
                        <span className="text-primary font-semibold">SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015</span> and the{" "}
                        <span className="text-primary font-semibold">Companies Act, 2013</span>.
                    </p>
                </motion.div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-start gap-3 px-5 py-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-400/90 text-xs mb-12"
                >
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                        <strong>Disclaimer:</strong> This is a prototype/demo platform. The compliance features described below represent
                        the design intent and architecture of the platform. Actual SEBI registration and STQC certification are in progress.
                        This platform is not currently affiliated with or endorsed by NSDL, CDSL, or SEBI.
                    </p>
                </motion.div>

                {/* Regulations Referenced */}
                <div className="space-y-6 mb-16">
                    <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
                        Regulations We Adhere To
                    </h2>
                    {regulations.map((reg, index) => (
                        <motion.div
                            key={reg.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="bg-[#0d1b2a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-xl shrink-0">
                                    <reg.icon className={`w-6 h-6 ${reg.color}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-2">{reg.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{reg.description}</p>
                                    <ul className="grid sm:grid-cols-2 gap-2">
                                        {reg.details.map((detail) => (
                                            <li key={detail} className="flex items-start gap-2 text-xs text-slate-500">
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Compliance Features */}
                <div className="mb-16">
                    <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
                        Platform Compliance Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {complianceFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="bg-card/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-primary/20 transition-all"
                            >
                                <h3 className="text-base font-bold mb-2 flex items-center gap-2 text-white">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
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
                    <h2 className="text-xl font-bold text-white mb-3">Questions About Compliance?</h2>
                    <p className="text-sm text-slate-400 mb-6">
                        Our team is available to discuss how our platform meets your regulatory requirements.
                    </p>
                    <Link to="/contact">
                        <Button variant="hero" className="gap-2">
                            Contact Our Team <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default SebiCompliance;

import { SEO } from "@/components/layout/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Vote, FileText, Users, ShieldCheck, Link2, Smartphone, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Vote,
    title: "E-Voting for AGMs / EGMs / Postal Ballots",
    description: "Secure, real-time electronic voting infrastructure designed specifically for global corporate assemblies. Ensure seamless remote participation with instant tallying.",
  },
  {
    icon: FileText,
    title: "Notice & Circular Distribution",
    description: "Automated distribution of AGM/EGM notices, annual reports, and regulatory circulars to shareholders via email and SMS with delivery tracking.",
  },
  {
    icon: Users,
    title: "Shareholder Engagement Tools",
    description: "Interactive Q&A modules, speaker registration, and live broadcasting capabilities to foster transparent communication between management and investors.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Audit Reporting",
    description: "Generate comprehensive, audit-ready reports instantly. Maintain cryptographic tamper-proof trails that satisfy SEBI and MCA requirements.",
  },
  {
    icon: Link2,
    title: "RTA Integration",
    description: "Seamless API integrations with leading Global Registrar and Transfer Agents (RTAs) for real-time shareholder data synchronization.",
  },
  {
    icon: Smartphone,
    title: "Investor App Connectivity",
    description: "Fully prepared for SEBI's 2025 mandates. Direct connectivity with modern proxy advisory systems and unified Investor Applications.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <SEO
        title="Services | Global Enterprise Shareholder Voting Solutions"
        description="Comprehensive e-voting services for organizations worldwide: AGM/EGM voting, statutory audit reporting, investor engagement tools, and registrar integration."
        canonical="/services"
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Enterprise Solutions for <span className="text-[#1e3a8a]">Corporate Governance</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive electronic voting and shareholder management services tailored for global regulatory landscapes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card/30 backdrop-blur-sm border border-white/5 p-8 rounded-2xl flex flex-col h-full hover:bg-card/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#1e3a8a]/20 flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-8 flex-grow">
                {service.description}
              </p>
              <Link to="/contact">
                <Button variant="ghost" className="group text-[#1e3a8a] hover:text-[#1e3a8a]/80 hover:bg-[#1e3a8a]/10 w-full justify-between">
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-[#1e3a8a]/5 border border-[#1e3a8a]/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our platform can be white-labeled and tailored to your specific organizational structure or RTA requirements.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8">
              Contact Sales Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;

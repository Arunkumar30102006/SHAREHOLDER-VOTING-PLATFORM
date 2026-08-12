import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, Lock, Award, Building2, 
  Vote, BarChart3, Globe2, FileCheck2,
  UserPlus, UploadCloud, Smartphone, CheckCircle2
} from "lucide-react";
import { motion } from "motion/react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Vote India Secure | Enterprise E-Voting Platform</title>
        <meta name="description" content="Secure, SEBI-Compliant Electronic Voting for Indian Corporates. End-to-end encrypted platform for AGMs, EGMs, and Postal Ballots." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1e3a8a]/20 via-background to-background" />
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a8a]/10 border border-[#1e3a8a]/20 text-[#1e3a8a] text-sm font-medium mb-8">
              <ShieldCheck className="w-4 h-4" />
              <span>India's Most Trusted E-Voting Solution</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight">
              Secure, SEBI-Compliant <br />
              <span className="text-[#1e3a8a]">Electronic Voting</span> for Indian Corporates
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              End-to-end encrypted e-voting platform engineered specifically for India's regulatory framework. Ensure transparency, maximize participation, and guarantee compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="xl" className="w-full sm:w-auto bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-lg px-8 py-6 rounded-xl">
                  Request a Demo
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="xl" className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl border-[#1e3a8a]/20 hover:bg-[#1e3a8a]/5">
                  Explore Features
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-12 border-y border-white/5 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, text: "SEBI Compliant Platform" },
              { icon: Lock, text: "End-to-End Encrypted" },
              { icon: Award, text: "ISO 27001 Ready" },
              { icon: Building2, text: "Trusted by Emerging Listed Companies" }
            ].map((badge, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <badge.icon className="w-8 h-8 text-[#1e3a8a]" />
                <span className="text-sm md:text-base font-medium text-muted-foreground">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Enterprise-Grade <span className="text-[#1e3a8a]">Features</span></h2>
            <p className="text-xl text-muted-foreground">Everything you need to conduct flawless shareholder meetings.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Vote, title: "Electronic Voting for AGMs/EGMs", desc: "Seamless remote e-voting and postal ballots with instant tabulation." },
              { icon: BarChart3, title: "Real-Time Results Dashboard", desc: "Monitor quorum and voting trends live as they happen during the meeting." },
              { icon: Globe2, title: "Multi-Channel Access", desc: "Web, mobile, and seamless API integrations with leading RTAs." },
              { icon: FileCheck2, title: "Audit-Ready Compliance", desc: "Cryptographic, tamper-proof audit trails for scrutinizers and regulators." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-card border border-white/5 hover:border-[#1e3a8a]/30 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-[#1e3a8a] mb-6" />
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#1e3a8a]/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It <span className="text-[#1e3a8a]">Works</span></h2>
            <p className="text-xl text-muted-foreground">A streamlined process from setup to final regulatory reporting.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: UserPlus, step: "Step 1", title: "Company Onboarding & KYC", desc: "Rapid verification and secure platform setup." },
              { icon: UploadCloud, step: "Step 2", title: "Upload Resolutions & Data", desc: "Securely import shareholder data and meeting agendas." },
              { icon: Smartphone, step: "Step 3", title: "Shareholders Vote Securely", desc: "Investors vote via intuitive web or mobile interfaces." },
              { icon: FileCheck2, step: "Step 4", title: "Real-Time Results", desc: "Generate instant, compliant reports for exchanges." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-background border border-white/10 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-[#1e3a8a]" />
                </div>
                <span className="text-[#1e3a8a] font-bold text-sm mb-2">{step.step}</span>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#1e3a8a]/20" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US (Vs Free Alternatives) */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12 border border-[#1e3a8a]/20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Beyond Basic Compliance. <br/><span className="text-[#1e3a8a]">Why Choose Vote India Secure?</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              While depositories like NSDL and CDSL offer baseline e-voting, forward-thinking enterprises choose us for premium experience and dedicated support.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Superior UX for higher retail shareholder participation",
                "White-label solutions branded for your company or RTA",
                "Dedicated Account Managers (no automated helpdesks)",
                "Advanced analytics and real-time quorum tracking",
                "Faster resolution processing and report generation",
                "Custom API integrations with your existing systems"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#1e3a8a] shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#1e3a8a]/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by <span className="text-[#1e3a8a]">Industry Leaders</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Vote India Secure transformed our AGM process. The real-time dashboard allowed us to track quorum instantly, and their dedicated support team was phenomenal.",
                name: "Rajesh Kumar",
                role: "Company Secretary",
                company: "TechNexus India Ltd."
              },
              {
                quote: "Unlike the standard depository portals, the interface is incredibly intuitive. We saw a 40% increase in retail shareholder participation this year.",
                name: "Anjali Desai",
                role: "Chief Financial Officer",
                company: "GreenEnergy Solutions"
              },
              {
                quote: "As an RTA, integrating with their API was seamless. It saves our team hundreds of hours during peak proxy season while ensuring 100% SEBI compliance.",
                name: "Vikram Mehta",
                role: "VP Operations",
                company: "Apex Registrars"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl border border-white/5 shadow-sm relative">
                <span className="absolute top-6 left-6 text-6xl text-[#1e3a8a]/20 font-serif">"</span>
                <p className="text-muted-foreground mb-8 relative z-10 pt-6">
                  {testimonial.quote}
                </p>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-[#1e3a8a]">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1e3a8a]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to modernize your shareholder meetings?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join the growing number of Indian listed companies upgrading their corporate governance infrastructure.
          </p>
          <Link to="/contact">
            <Button size="xl" className="bg-white text-[#1e3a8a] hover:bg-gray-100 text-lg px-10 py-7 rounded-xl shadow-2xl">
              Schedule a Free Demo
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Index;

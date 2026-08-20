import { SEO } from "@/components/layout/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, Lock, Award, Building2, 
  Vote, BarChart3, Globe2, FileCheck2,
  UserPlus, UploadCloud, Smartphone, CheckCircle2,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";

// JSON-LD Schemas for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vote India Secure",
  "url": "https://www.shareholdervoting.in",
  "logo": "https://www.shareholdervoting.in/logo.png",
  "description": "SEBI-compliant e-voting platform for Indian companies",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contact@shareholdervoting.in"
  },
  "sameAs": []
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vote India Secure",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Secure, transparent, and SEBI-compliant e-voting platform for Indian companies with blockchain-backed integrity.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "Contact for pricing"
  },
  "url": "https://www.shareholdervoting.in"
};

const faqItems = [
  {
    question: "Is Vote India Secure SEBI compliant?",
    answer: "Yes, Vote India Secure is fully SEBI-compliant and meets all regulatory requirements for electronic shareholder voting in India. Our platform adheres to SEBI (LODR) Regulations 2015, Companies Act 2013 (Section 108), and Rule 20 of the Companies (Management and Administration) Rules, 2014. We maintain complete audit trails and support independent scrutinizer access as required by law."
  },
  {
    question: "How does online shareholder voting work?",
    answer: "Companies register on our platform, upload their shareholder data, and schedule a voting event (AGM, EGM, or Postal Ballot). Shareholders receive secure, unique login credentials via email. They can then log in to the platform from any device — desktop, tablet, or mobile — to review resolutions and cast their votes electronically. All votes are encrypted end-to-end and recorded with tamper-proof audit trails. Results are generated instantly after the voting window closes."
  },
  {
    question: "What types of companies can use this platform?",
    answer: "Any SEBI-registered Indian company that needs to conduct shareholder voting, AGMs, EGMs, or board resolutions can use Vote India Secure. Our platform serves listed companies of all sizes, from emerging businesses to large-cap corporations, as well as Registrar and Transfer Agents (RTAs) managing multiple company portfolios."
  },
  {
    question: "How secure is the e-voting process?",
    answer: "Vote India Secure uses military-grade AES-256 encryption for all data at rest and in transit. Every vote is cryptographically hashed using SHA-256 and recorded with an immutable audit trail. We employ two-factor authentication (credentials + OTP) for all shareholders, and our infrastructure is hosted entirely within India to comply with data residency regulations. The platform is ISO 27001 framework-ready and CERT-In auditor verified."
  },
  {
    question: "Can shareholders vote from their mobile phones?",
    answer: "Absolutely. Vote India Secure is a fully responsive web application that works seamlessly on smartphones, tablets, and desktops. The platform is Progressive Web App (PWA) enabled, optimized for low-bandwidth connections, and works on all modern browsers — ensuring that every shareholder can participate regardless of their device or internet speed."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Vote India Secure | SEBI-Compliant Shareholder E-Voting Platform"
        description="India's most trusted SEBI-compliant e-voting platform for companies. Conduct shareholder voting, AGMs, and board resolutions securely online with blockchain-backed integrity."
        canonical="/"
        schemas={[organizationSchema, softwareAppSchema, faqSchema]}
      />

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
              <span>SEBI-Compliant E-Voting for Indian Companies</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight">
              India's Most Trusted{" "}
              <span className="text-[#1e3a8a]">SEBI-Compliant E-Voting</span> Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              End-to-end encrypted shareholder voting software engineered for Indian regulatory frameworks. Ensure transparency, maximize participation, and guarantee compliance.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Vote India Secure is a next-generation electronic voting platform purpose-built for Indian listed companies, registrars, and transfer agents. 
              Our platform enables companies to conduct Annual General Meetings (AGMs), Extraordinary General Meetings (EGMs), and Postal Ballot voting 
              entirely online — with full adherence to SEBI (LODR) Regulations 2015 and the Companies Act, 2013. From secure shareholder authentication 
              using two-factor OTP verification to real-time result tabulation with cryptographic audit trails, every aspect of the voting process is 
              designed for maximum transparency, security, and accessibility. Whether you're a mid-cap company conducting your first digital AGM or a 
              large-cap corporation managing complex multi-resolution proxy seasons, Vote India Secure provides the enterprise-grade infrastructure 
              you need to modernize your corporate governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="xl" className="w-full sm:w-auto bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-lg px-8 py-6 rounded-xl">
                  Contact Us
                </Button>
              </Link>
              <Link to="/features">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Enterprise-Grade <span className="text-[#1e3a8a]">Shareholder Voting Software</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Everything you need to conduct flawless shareholder meetings — from secure authentication to automated compliance reporting.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Vote, title: "Electronic Voting for AGMs/EGMs", desc: "Seamless remote e-voting and postal ballots with instant tabulation. Our shareholder voting software supports all resolution types required by Indian corporate law, including ordinary resolutions, special resolutions, and related-party transaction approvals — with weighted vote calculations based on shareholding as of the record date." },
              { icon: BarChart3, title: "Real-Time Results Dashboard", desc: "Monitor quorum and voting trends live as they happen during the meeting. Track participation rates across shareholder categories — promoters, institutional investors, and public shareholders — with interactive charts and instant compliance threshold alerts." },
              { icon: Globe2, title: "Multi-Channel Access", desc: "Web, mobile, and seamless API integrations with leading RTAs. Our online shareholder voting interface is optimized for every device and connection speed, ensuring that retail investors across India can participate comfortably in their preferred language." },
              { icon: FileCheck2, title: "Audit-Ready Compliance", desc: "Cryptographic, tamper-proof audit trails for scrutinizers and regulators. Generate SEBI-compliant scrutinizer reports in PDF format with a single click, including resolution-wise vote breakdowns, weighted vote tallies, and complete compliance attestations." }
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How Online <span className="text-[#1e3a8a]">Shareholder Voting</span> Works</h2>
            <p className="text-xl text-muted-foreground">A streamlined, four-step process from company onboarding to final regulatory reporting — designed for maximum efficiency and compliance.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: UserPlus, step: "Step 1", title: "Company Onboarding & KYC", desc: "Getting started is simple. Register your company on Vote India Secure by providing your CIN, SEBI registration details, and authorized signatory information. Our team verifies your credentials against MCA records and activates your account within 24 hours. The onboarding process includes uploading your company's articles of association and board resolution authorizing e-voting." },
              { icon: UploadCloud, step: "Step 2", title: "Upload Resolutions & Shareholder Data", desc: "Securely import your shareholder register and meeting agenda. Upload your record-date shareholder list in CSV or Excel format, including folio numbers, PAN details, shareholding quantities, and email addresses. Configure your resolutions — ordinary, special, or related-party — and set custom voting windows with automatic start and end times." },
              { icon: Smartphone, step: "Step 3", title: "Shareholders Vote Securely", desc: "Investors cast their votes via intuitive web or mobile interfaces. Each shareholder receives unique, encrypted login credentials via email. After two-factor OTP authentication, they review resolution documents, cast weighted votes, and receive a cryptographic vote receipt with a unique QR code that can be verified against the immutable audit ledger." },
              { icon: FileCheck2, step: "Step 4", title: "Instant Results & Compliance Reports", desc: "Generate instant, SEBI-compliant scrutinizer reports at the click of a button. Results are calculated automatically using our weighted vote calculation engine, with resolution-wise breakdowns, category-wise participation summaries, and complete audit trails. Reports are generated in the format prescribed under the Companies Act, 2013 and SEBI LODR Regulations." }
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
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
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
              While depositories like NSDL and CDSL offer baseline e-voting, forward-thinking enterprises choose our shareholder voting software for its premium experience, dedicated support, and advanced analytics capabilities.
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
                name: "Vikram S.",
                role: "Company Secretary",
                company: "TechNexus Global Ltd."
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

      {/* FAQ SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked <span className="text-[#1e3a8a]">Questions</span></h2>
            <p className="text-xl text-muted-foreground">Common questions about our SEBI-compliant e-voting platform for Indian companies.</p>
          </div>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-card/40 border border-white/10 hover:border-white/20 transition-all"
              >
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
                  <HelpCircle className="w-5 h-5 text-[#1e3a8a] shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </motion.div>
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
            Join the growing number of Indian enterprises upgrading their corporate governance infrastructure with our SEBI-compliant e-voting platform.
          </p>
          <Link to="/contact">
            <Button size="xl" className="bg-white text-[#1e3a8a] hover:bg-gray-100 text-lg px-10 py-7 rounded-xl shadow-2xl">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Index;

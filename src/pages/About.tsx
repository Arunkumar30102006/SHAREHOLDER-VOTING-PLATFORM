import { SEO } from "@/components/layout/SEO";
import { 
  Target, Eye, MapPin, 
  ShieldCheck, Lightbulb, Scale, Lock
} from "lucide-react";
import { motion } from "motion/react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <SEO
        title="About Us | India's Trusted E-Voting Company"
        description="Learn about Vote India Secure's mission, vision, and the team building India's most secure SEBI-compliant corporate e-voting platform for shareholder meetings."
        canonical="/about"
      />

      {/* Header */}
      <section className="container mx-auto px-4 max-w-5xl mb-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Building the Future of <span className="text-[#1e3a8a]">Corporate Governance</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vote India Secure was founded with a singular purpose: to modernize and secure the way Indian enterprises conduct shareholder meetings and proxy voting.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 max-w-5xl mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/20 p-10 rounded-3xl">
            <Target className="w-10 h-10 text-[#1e3a8a] mb-6" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower Indian listed companies and RTAs with a highly secure, intuitive, and fully SEBI-compliant electronic voting infrastructure that maximizes shareholder participation and ensures absolute integrity in corporate decision-making.
            </p>
          </div>
          <div className="bg-card/40 border border-white/10 p-10 rounded-3xl shadow-sm">
            <Eye className="w-10 h-10 text-[#1e3a8a] mb-6" />
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become the standard for digital corporate governance in India, where every shareholder vote is cryptographically secure, instantly verifiable, and universally accessible, driving greater transparency in the capital markets.
            </p>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="container mx-auto px-4 max-w-5xl mb-24">
        <div className="bg-card/30 border border-white/5 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className="mb-4 text-lg">
              The idea for Vote India Secure was born out of frustration with the status quo. For years, Indian corporations relied on outdated, clunky legacy systems provided by standard depositories. These systems were often difficult for retail investors to navigate, leading to poor AGM participation and frustrating proxy seasons for Company Secretaries.
            </p>
            <p className="text-lg">
              Recognizing the gap between regulatory requirements and modern technological capabilities, our founders set out to build a platform that doesn't just "tick the compliance box," but actually delivers an enterprise-grade software experience. Today, we bridge the gap between strict SEBI regulations and modern, user-centric design.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Scale, title: "Transparency", desc: "Open, verifiable processes that build trust among all stakeholders." },
            { icon: Lock, title: "Security", desc: "Uncompromising data protection and cryptographic integrity." },
            { icon: ShieldCheck, title: "Compliance", desc: "Strict, unwavering adherence to SEBI and MCA regulations." },
            { icon: Lightbulb, title: "Innovation", desc: "Continuously pushing the boundaries of governance technology." }
          ].map((value, i) => (
            <div key={i} className="text-center p-6 bg-card/20 rounded-2xl border border-white/5">
              <div className="w-12 h-12 mx-auto bg-[#1e3a8a]/10 rounded-full flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <h3 className="font-bold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="container mx-auto px-4 max-w-5xl mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Leadership Team</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Rahul Sharma", role: "Chief Executive Officer", bg: "bg-slate-700" },
            { name: "Priya Desai", role: "Chief Technology Officer", bg: "bg-slate-600" },
            { name: "Vikram Singh", role: "Head of Compliance", bg: "bg-slate-800" }
          ].map((member, i) => (
            <div key={i} className="text-center">
              <div className={`w-40 h-40 mx-auto ${member.bg} rounded-full mb-6 border-4 border-background shadow-lg overflow-hidden flex items-center justify-center`}>
                <span className="text-4xl text-white/20">Photo</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-[#1e3a8a] font-medium mb-3">{member.role}</p>
              <a href="#" className="text-sm text-muted-foreground hover:text-[#1e3a8a] transition-colors">
                Connect on LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Office Location */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="bg-card/40 border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-[#1e3a8a]/10 rounded-full flex items-center justify-center shrink-0">
            <MapPin className="w-8 h-8 text-[#1e3a8a]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Our Headquarters</h2>
            <p className="text-muted-foreground">
              Vote India Secure Technologies Pvt. Ltd.<br />
              Level 7, Trade Centre, Bandra Kurla Complex (BKC)<br />
              Bandra (East), Mumbai, Maharashtra 400051<br />
              India
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

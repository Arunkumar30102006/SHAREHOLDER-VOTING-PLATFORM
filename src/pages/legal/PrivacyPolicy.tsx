import { useState, useEffect } from "react";
import { SEO } from "@/components/layout/SEO";
import { Shield, ChevronRight } from "lucide-react";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "data-collected", title: "2. Data We Collect" },
  { id: "how-we-use", title: "3. How We Use Your Data" },
  { id: "dpid-pan", title: "4. DPID & PAN Data Handling" },
  { id: "data-residency", title: "5. Data Residency" },
  { id: "your-rights", title: "6. Your Rights" },
  { id: "contact-dpo", title: "7. Contact DPO" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative pt-28 pb-20">
      <SEO
        title="Privacy Policy | Vote India Secure"
        description="Privacy policy and data handling practices for Vote India Secure."
        canonical="/privacy-policy"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" /> Legal & Privacy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: January 2026</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 relative">
          {/* Sticky Sidebar */}
          <aside className="md:w-1/4 hidden md:block">
            <div className="sticky top-28 bg-[#020817]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Table of Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      activeSection === section.id
                        ? "bg-blue-500/20 text-blue-400 font-medium"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {section.title}
                    {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:w-3/4 max-w-3xl prose prose-invert prose-blue">
            <section id="introduction" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Vote India Secure ("we", "our", or "us") is committed to protecting your privacy and ensuring the security of your personal and financial information. This Privacy Policy outlines how we collect, use, and protect your data when you use our electronic voting platform designed for Indian corporate governance.
              </p>
              <p className="text-slate-300 leading-relaxed">
                This policy is drafted in compliance with the Information Technology Act, 2000 (IT Act), the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDP Act).
              </p>
            </section>

            <section id="data-collected" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
              <p className="text-slate-300 leading-relaxed mb-4">We collect the minimum amount of data necessary to authenticate shareholders and securely record their votes. The data we collect includes:</p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2 mb-4">
                <li><strong>Identity Information:</strong> Permanent Account Number (PAN), Depository Participant ID (DPID), Client ID, and Folio Numbers.</li>
                <li><strong>Contact Information:</strong> Registered email addresses and mobile numbers (as provided by the company's RTA).</li>
                <li><strong>Voting Data:</strong> Cryptographically hashed records of your voting choices.</li>
                <li><strong>Technical Data:</strong> IP addresses, browser types, and timestamp logs for audit trail purposes.</li>
              </ul>
            </section>

            <section id="how-we-use" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
              <p className="text-slate-300 leading-relaxed mb-4">Your data is strictly used for the following purposes:</p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Authenticating your identity against depository (NSDL/CDSL) and RTA records to ensure you are a legitimate shareholder.</li>
                <li>Facilitating the casting, recording, and counting of electronic votes during AGMs, EGMs, and postal ballots.</li>
                <li>Generating statutory scrutinizer reports required under the Companies Act 2013.</li>
                <li>Maintaining immutable audit trails to prevent fraud and prove voting integrity.</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4 font-medium">We do not sell, rent, or use your personal data for marketing purposes under any circumstances.</p>
            </section>

            <section id="dpid-pan" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">4. DPID & PAN Data Handling</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Handling sensitive financial identifiers like PAN and DPID requires the highest level of security. 
              </p>
              <p className="text-slate-300 leading-relaxed">
                When you enter your PAN and DPID, the data is immediately encrypted in your browser using TLS 1.3 before transmission. It is verified directly against the Registrar and Transfer Agent (RTA) database via secure API endpoints. We do not store your plain-text PAN or DPID on our servers post-authentication; they are one-way hashed or tokenized solely for audit linkages.
              </p>
            </section>

            <section id="data-residency" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Residency (India)</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                In strict compliance with Indian data sovereignty regulations, <strong>100% of our servers and databases are physically located within the Republic of India</strong>. We utilize Tier-4 data centers situated in Mumbai and Bengaluru. Your sensitive personal data never crosses international borders.
              </p>
            </section>

            <section id="your-rights" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="text-slate-300 leading-relaxed mb-4">Under the DPDP Act 2023, you have the right to:</p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Access the summary of personal data we process about you.</li>
                <li>Request correction of inaccurate personal data (though changes to official shareholder records must be routed through your Depository Participant or RTA).</li>
                <li>Nominate an individual to exercise your rights in the event of your death or incapacity.</li>
                <li>Lodge a grievance with our Data Protection Officer.</li>
              </ul>
            </section>

            <section id="contact-dpo" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact Data Protection Officer (DPO)</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                If you have any questions, grievances, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection Officer:
              </p>
              <div className="bg-[#020817] border border-white/10 p-6 rounded-xl">
                <p className="text-white font-bold mb-1">Mr. Vikram Rao</p>
                <p className="text-slate-400 text-sm mb-3">Data Protection Officer</p>
                <p className="text-slate-300 mb-1">Email: <a href="mailto:dpo@shareholdervoting.in" className="text-blue-400 hover:underline">dpo@shareholdervoting.in</a></p>
                <p className="text-slate-300 mb-1">Phone: +91 22 4567 8900</p>
                <p className="text-slate-300 text-sm mt-3">Address: Vote India Secure, Cyber City, BKC, Mumbai, Maharashtra 400051, India.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

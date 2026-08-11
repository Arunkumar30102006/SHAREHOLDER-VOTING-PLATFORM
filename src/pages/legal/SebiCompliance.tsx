import { useState, useEffect } from "react";
import { SEO } from "@/components/layout/SEO";
import { Scale, ChevronRight, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "regulatory-framework", title: "1. Regulatory Framework" },
  { id: "companies-act", title: "2. Companies Act 2013" },
  { id: "mca-circulars", title: "3. MCA Circulars on E-Voting" },
  { id: "platform-compliance", title: "4. How We Comply" },
  { id: "scrutinizer-process", title: "5. Scrutinizer Process" },
];

export default function SebiCompliance() {
  const [activeSection, setActiveSection] = useState("regulatory-framework");

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
        title="SEBI Compliance | Vote India Secure"
        description="Detailed breakdown of how Vote India Secure complies with SEBI LODR Regulation 44 and Companies Act 2013."
        canonical="/sebi-compliance"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            <Scale className="w-4 h-4" /> Legal & Regulatory
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SEBI & Statutory Compliance</h1>
          <p className="text-slate-400">Our commitment to India's corporate governance framework.</p>
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
            <section id="regulatory-framework" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">1. Regulatory Framework (SEBI LODR Reg 44)</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                The Securities and Exchange Board of India (SEBI) mandates the provision of an e-voting facility by top listed entities. Under <strong>Regulation 44 of the SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015</strong>, listed entities must provide remote e-voting facilities to its shareholders for all shareholder resolutions.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Vote India Secure's platform is designed to fulfill the technical and procedural requirements of Regulation 44, ensuring that listed entities can seamlessly offer remote e-voting and e-voting during the AGM/EGM.
              </p>
            </section>

            <section id="companies-act" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">2. Companies Act 2013 (Section 108)</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Section 108 of the Companies Act, 2013, read with Rule 20 of the Companies (Management and Administration) Rules, 2014, mandates that companies with 1,000 or more shareholders must provide members with the facility to exercise their right to vote by electronic means.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Our platform strictly adheres to the prescribed timelines:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Remote e-voting window remaining open for a minimum of 3 days.</li>
                <li>Closure of the voting window precisely at 5:00 PM on the day preceding the general meeting.</li>
                <li>System-enforced lock blocking any further remote voting once the deadline passes.</li>
              </ul>
            </section>

            <section id="mca-circulars" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">3. MCA Circulars on E-Voting</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                The Ministry of Corporate Affairs (MCA) periodically issues circulars regarding the conduct of general meetings through Video Conferencing (VC) or Other Audio Visual Means (OAVM).
              </p>
              <p className="text-slate-300 leading-relaxed">
                We continuously monitor and integrate requirements from the latest MCA circulars, ensuring that two-way teleconferencing links, speaker registration, and integrated e-voting during the VC (e-AGM) are fully supported and logged for compliance.
              </p>
            </section>

            <section id="platform-compliance" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">4. How Our Platform Complies Point-by-Point</h2>
              <div className="space-y-4 mt-6">
                {[
                  { title: "Authentication", desc: "Multi-factor authentication using PAN and DPID as mandated by SEBI's circular on e-voting via Depository portals." },
                  { title: "Vote Anonymity & Security", desc: "Zero-knowledge architecture ensures that the way a shareholder voted is encrypted and cannot be deciphered before the scrutinizer unblocks the votes." },
                  { title: "No Modification", desc: "System architecture strictly prevents any modification of a vote once it has been cast, complying with Rule 20(4)(viii)." },
                  { title: "Cut-off Date Integration", desc: "Voting rights are automatically calculated in exact proportion to the shareholding as of the specified cut-off (record) date." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-[#020817] p-4 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-1">{item.title}</strong>
                      <span className="text-slate-300 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="scrutinizer-process" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">5. Scrutinizer Process</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Rule 20 mandates the appointment of an independent Scrutinizer to unblock the votes and generate a consolidated report.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Vote India Secure provides a dedicated Scrutinizer Portal. The scrutinizer can:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Log in using specific secure credentials (often requiring hardware tokens or 2FA).</li>
                <li>"Unblock" the votes only after the conclusion of the meeting, in the presence of at least two witnesses not in the employment of the company.</li>
                <li>Automatically generate the Form MGT-13 equivalent consolidated report containing total votes cast in favour, against, and invalid votes.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

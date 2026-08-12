import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileCheck, Lock, Server, CheckCircle2 } from "lucide-react";

const Compliance = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <Helmet>
        <title>Compliance & Security | Vote India Secure</title>
        <meta name="description" content="SEBI compliant electronic voting platform with enterprise-grade security and ISO 27001 readiness." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a8a]/10 border border-[#1e3a8a]/20 text-[#1e3a8a] text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-Grade Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Uncompromising <span className="text-[#1e3a8a]">Compliance & Security</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built from the ground up to meet the stringent requirements of the Ministry of Corporate Affairs (MCA) and the Securities and Exchange Board of India (SEBI).
          </p>
        </div>

        {/* Regulatory Compliance Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <FileCheck className="text-[#1e3a8a] w-8 h-8" />
            Regulatory Compliance
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card/40 border border-white/10 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">SEBI Registration</h3>
              <p className="text-muted-foreground mb-4">
                Vote India Secure operates under strict adherence to SEBI guidelines for electronic voting service providers.
              </p>
              <div className="bg-black/20 p-4 rounded-lg font-mono text-sm border border-white/5">
                SEBI Registration No. IN-EVS-0000X
                <span className="block text-xs text-muted-foreground mt-2 italic">(Verification link coming soon)</span>
              </div>
            </div>
            <div className="bg-card/40 border border-white/10 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Companies Act, 2013</h3>
              <p className="text-muted-foreground mb-4">
                Fully compliant with <strong>Section 108</strong> of the Companies Act, 2013, and Rule 20 of the Companies (Management and Administration) Rules, 2014.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Secure electronic voting systems</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Independent scrutinizer access</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Audit trail retention</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-card/40 border border-white/10 p-8 rounded-2xl shadow-sm">
             <h3 className="text-xl font-bold mb-4">SEBI Circular Compliance</h3>
              <p className="text-muted-foreground">
                Our infrastructure fully supports the mandates outlined in SEBI Circular <strong>CIR/CFD/POLICYCELL/11/2015</strong>, ensuring that shareholder authentication, vote recording, and result generation meet all statutory requirements for listed entities.
              </p>
          </div>
        </div>

        {/* Data Security Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Lock className="text-[#1e3a8a] w-8 h-8" />
            Data Security & Privacy
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card/40 border border-white/10 p-6 rounded-2xl">
              <Lock className="w-8 h-8 text-[#1e3a8a] mb-4" />
              <h3 className="font-bold mb-2">AES-256 Encryption</h3>
              <p className="text-sm text-muted-foreground">
                All voting data and personally identifiable information (PII) is encrypted at rest and in transit using military-grade AES-256 protocols.
              </p>
            </div>
            <div className="bg-card/40 border border-white/10 p-6 rounded-2xl">
              <Server className="w-8 h-8 text-[#1e3a8a] mb-4" />
              <h3 className="font-bold mb-2">Data Localization</h3>
              <p className="text-sm text-muted-foreground">
                100% of our infrastructure is hosted on secure servers located physically within India, complying strictly with data residency regulations.
              </p>
            </div>
            <div className="bg-card/40 border border-white/10 p-6 rounded-2xl">
              <FileCheck className="w-8 h-8 text-[#1e3a8a] mb-4" />
              <h3 className="font-bold mb-2">Immutable Audit Trails</h3>
              <p className="text-sm text-muted-foreground">
                Every action on the platform generates a cryptographic hash, creating a permanent, tamper-proof record for scrutinizers and regulators.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/20 p-10 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-8">Security Certifications & Audits</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <span className="font-bold text-[#1e3a8a] text-xl">ISO</span>
              </div>
              <p className="font-medium">ISO 27001:2022<br/><span className="text-xs text-muted-foreground">(Framework Ready)</span></p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <span className="font-bold text-[#1e3a8a] text-xl">SOC 2</span>
              </div>
              <p className="font-medium">SOC 2 Type II<br/><span className="text-xs text-muted-foreground">(Audit Pending)</span></p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <span className="font-bold text-[#1e3a8a] text-xl">CERT</span>
              </div>
              <p className="font-medium">CERT-In Empaneled<br/><span className="text-xs text-muted-foreground">(Auditor verified)</span></p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">Need our detailed security whitepaper or compliance matrix?</p>
            <Link to="/contact">
                <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">Contact Compliance Team</Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Compliance;

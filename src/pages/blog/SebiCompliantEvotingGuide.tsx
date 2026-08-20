import BlogArticleLayout from "@/components/layout/BlogArticleLayout";
import { Link } from "react-router-dom";
import { ShieldCheck, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SebiCompliantEvotingGuide = () => {
  return (
    <BlogArticleLayout
      title="What is SEBI-Compliant E-Voting? A Comprehensive Guide for Indian Companies"
      description="Understand SEBI e-voting regulations, Companies Act 2013 Section 108 mandates, and best practices for conducting seamless remote shareholder voting in India."
      canonical="/blog/sebi-compliant-evoting-guide"
      author="Corporate Compliance Desk"
      date="2026-08-15"
      readTime="6 min read"
      category="Regulatory Compliance"
    >
      <div className="space-y-6 text-slate-200 leading-relaxed">
        <p className="text-lg text-slate-300 font-medium leading-relaxed">
          In India's rapidly evolving capital markets, corporate governance standards have reached unprecedented heights. 
          For listed entities and large unlisted public corporations, electronic voting (e-voting) is no longer just a digital convenience — it is a statutory mandate governed by the Securities and Exchange Board of India (SEBI) and the Ministry of Corporate Affairs (MCA).
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">
          Understanding the Regulatory Framework for SEBI Compliant E-Voting
        </h2>
        <p>
          The regulatory foundation of <strong>SEBI compliant evoting</strong> rests primarily upon three pillars:
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Section 108 of the Companies Act, 2013:</strong> Mandates that every listed company and companies having not less than one thousand shareholders must provide their members with a facility to exercise their right to vote at general meetings by electronic means.
          </li>
          <li>
            <strong>Rule 20 of the Companies (Management and Administration) Rules, 2014:</strong> Lays down the operational mechanism, timeline of notices, cutoff date determination, appointment of independent scrutinizers, and secure electronic registries.
          </li>
          <li>
            <strong>Regulation 44 of SEBI (LODR) Regulations, 2015:</strong> Obligates listed entities to provide remote e-voting facility to its shareholders in respect of all shareholders' resolutions and submit voting results to the stock exchanges within two working days of conclusion of the meeting.
          </li>
        </ul>

        <div className="my-8 p-6 rounded-2xl bg-blue-950/40 border border-blue-500/20">
          <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5" /> Key SEBI Mandate Highlight
          </h3>
          <p className="text-sm text-slate-300">
            SEBI circulars stipulate that the e-voting system must ensure shareholder verification through multi-factor authentication (MFA), maintain cryptographic tamper-proof audit trails, and ensure that votes once cast cannot be modified or revealed prior to the official scrutinizer tally.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">
          Essential Components of a SEBI-Compliant E-Voting Platform
        </h2>
        <p>
          When selecting an <Link to="/features" className="text-blue-400 hover:underline font-semibold">e-voting platform in India</Link>, corporate secretarial teams and boards of directors must verify several mission-critical features:
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-xl bg-card/60 border border-white/10">
            <h4 className="font-bold text-white text-base mb-2">1. End-to-End Cryptographic Security</h4>
            <p className="text-sm text-slate-400">
              Votes must be encrypted using high-grade standards (AES-256) at rest and in transit, ensuring that no intermediary or internal administrator can manipulate tallies.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-card/60 border border-white/10">
            <h4 className="font-bold text-white text-base mb-2">2. Independent Scrutinizer Access</h4>
            <p className="text-sm text-slate-400">
              The platform must offer a dedicated portal for company secretaries and independent scrutinizers to unblock votes after the voting window closes and generate Form MGT-13 automatically.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-card/60 border border-white/10">
            <h4 className="font-bold text-white text-base mb-2">3. Weighted Vote Calculation</h4>
            <p className="text-sm text-slate-400">
              Every shareholder's vote weight must dynamically match their exact shareholding on the designated cutoff date, accounting for depository and physical share balances.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-card/60 border border-white/10">
            <h4 className="font-bold text-white text-base mb-2">4. Indian Data Localization</h4>
            <p className="text-sm text-slate-400">
              In full compliance with Indian cybersecurity directives, all shareholder PII and voting logs must reside on tier-4 cloud servers located physically within India.
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">
          Step-by-Step Compliance Checklist for Company Secretaries
        </h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Fix the Cutoff Date:</strong> Determine the cutoff date not earlier than 7 days before the general meeting date to establish voting eligibility.
          </li>
          <li>
            <strong>Publish Public Notice:</strong> Issue advertisements in at least one vernacular newspaper and one English newspaper having wide circulation.
          </li>
          <li>
            <strong>Configure Voting Window:</strong> Keep remote e-voting open for at least 3 consecutive days, concluding at 5:00 PM on the day preceding the general meeting date.
          </li>
          <li>
            <strong>Scrutinizer Verification:</strong> The scrutinizer unlocks the electronic vault in the presence of at least two independent witnesses and prepares the compliance report.
          </li>
          <li>
            <strong>Exchange Disclosures:</strong> Upload results in XBRL and PDF format to BSE and NSE within 48 hours.
          </li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">
          Conclusion: Elevating Corporate Governance with Vote India Secure
        </h2>
        <p>
          Achieving seamless compliance doesn't mean sacrificing user experience. Modern platforms like <Link to="/" className="text-blue-400 hover:underline">Vote India Secure</Link> empower enterprises with a state-of-the-art interface, enterprise security, and automated report generation that saves hundreds of hours for compliance teams.
        </p>

        <div className="pt-6">
          <p className="text-sm text-slate-400 mb-4">
            Learn more about our flexible pricing tiers or request a personalized walkthrough for your board:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/pricing">
              <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
                Explore Pricing Plans <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/compliance">
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                View Full Compliance Matrix
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </BlogArticleLayout>
  );
};

export default SebiCompliantEvotingGuide;

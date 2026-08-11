import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustBadgesRow from "@/components/home/TrustBadgesRow";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BuiltBySection from "@/components/home/BuiltBySection";
import CTASection from "@/components/home/CTASection";
import { SEO } from "@/components/layout/SEO";

const Index = () => {
  return (
    <div className="min-h-screen relative selection:bg-primary/20">
      <SEO
        title="Vote India Secure - Enterprise E-Voting Platform"
        description="Secure, transparent, and compliant e-voting platform for Indian companies. Blockchain-backed integrity with end-to-end encryption."
        canonical="/"
      />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <TrustBadgesRow />
          <FeaturesSection />
          <HowItWorksSection />
          <StatsSection />
          <TestimonialsSection />
          <BuiltBySection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;

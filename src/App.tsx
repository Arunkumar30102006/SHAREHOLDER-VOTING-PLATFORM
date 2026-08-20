import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lazy-load floating widgets (not needed for first paint)
const WebsiteFeedback = lazy(() => import("./components/feedback/WebsiteFeedback"));
const VoteAssistant = lazy(() => import("./components/ai/VoteAssistant").then(m => ({ default: m.VoteAssistant })));

import GlobalErrorBoundary from "./components/layout/GlobalErrorBoundary";
import "./i18n/config"; // Initialize i18n

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const CompanyRegister = lazy(() => import("./pages/CompanyRegister"));
const CompanyLogin = lazy(() => import("./pages/CompanyLogin"));
const CompanyDashboard = lazy(() => import("./pages/CompanyDashboard"));
const ShareholderLogin = lazy(() => import("./pages/ShareholderLogin"));
const VotingDashboard = lazy(() => import("./pages/VotingDashboard"));
const ShareholderAnalysis = lazy(() => import("./pages/ShareholderAnalysis"));
const VotingManagement = lazy(() => import("./pages/VotingManagement"));
const AIPowerSuite = lazy(() => import("./pages/AIPowerSuite"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LiveDemo = lazy(() => import("./pages/LiveDemo"));

// Lazy Load Public/Legal Pages
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Demo = lazy(() => import("./pages/Demo"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const Compliance = lazy(() => import("./pages/Compliance"));
const Blog = lazy(() => import("./pages/Blog"));
const SebiCompliantEvotingGuide = lazy(() => import("./pages/blog/SebiCompliantEvotingGuide"));
const HowOnlineShareholderVotingWorks = lazy(() => import("./pages/blog/HowOnlineShareholderVotingWorks"));
const AgmEvotingVsPhysicalMeeting = lazy(() => import("./pages/blog/AgmEvotingVsPhysicalMeeting"));
const BenefitsElectronicVotingShareholders = lazy(() => import("./pages/blog/BenefitsElectronicVotingShareholders"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const SebiCompliance = lazy(() => import("./pages/legal/SebiCompliance"));
const DataProtection = lazy(() => import("./pages/legal/DataProtection"));

// Configure Global Query Client with aggressive caching (User Requested)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30,   // 30 minutes
      refetchOnWindowFocus: false,
    },
  },
});

import { HelmetProvider } from 'react-helmet-async';
import ProtectedAdminRoute from "@/components/auth/ProtectedAdminRoute";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <GlobalErrorBoundary>
          <HelmetProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <ScrollToTop />
                
                <Suspense fallback={null}>
                  <WebsiteFeedback />
                  <VoteAssistant />
                  <ScrollToTopButton />
                </Suspense>

                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  
                  <main className="flex-grow">
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/company-register" element={<CompanyRegister />} />
                        <Route path="/company-login" element={<CompanyLogin />} />
                        <Route path="/shareholder-login" element={<ShareholderLogin />} />
                        <Route path="/voting-dashboard" element={<VotingDashboard />} />
                        <Route path="/shareholder-analysis" element={<ShareholderAnalysis />} />

                        {/* Protected Admin Routes */}
                        <Route element={<ProtectedAdminRoute />}>
                          <Route path="/company-dashboard" element={<CompanyDashboard />} />
                          <Route path="/voting-management" element={<VotingManagement />} />
                          <Route path="/ai-power-suite" element={<AIPowerSuite />} />
                        </Route>

                        {/* Public Pages */}
                        <Route path="/about" element={<About />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/live-demo" element={<LiveDemo />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/compliance" element={<Compliance />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/sebi-compliant-evoting-guide" element={<SebiCompliantEvotingGuide />} />
                        <Route path="/blog/how-online-shareholder-voting-works" element={<HowOnlineShareholderVotingWorks />} />
                        <Route path="/blog/agm-evoting-vs-physical-meeting" element={<AgmEvotingVsPhysicalMeeting />} />
                        <Route path="/blog/benefits-electronic-voting-shareholders" element={<BenefitsElectronicVotingShareholders />} />
                        <Route path="/contact" element={<Contact />} />

                        {/* Legal Routes */}
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/sebi-compliance" element={<SebiCompliance />} />
                        <Route path="/data-protection" element={<DataProtection />} />

                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>

                  <Footer />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </HelmetProvider>
        </GlobalErrorBoundary>
      </ThemeProvider >
    </QueryClientProvider >
  );
};

export default App;

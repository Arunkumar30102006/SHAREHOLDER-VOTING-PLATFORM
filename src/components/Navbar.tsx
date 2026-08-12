import { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Shield, Users, Building2, LogOut, ShieldCheck, Home, Menu, X, BookOpen, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Navbar = () => {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current page is a protected portal
  const isPortalPage = location.pathname.includes("/company-dashboard") ||
    location.pathname.includes("/voting-management") ||
    location.pathname.includes("/voting-dashboard") ||
    location.pathname.includes("/ai-power-suite");

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Scroll listener for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
  };

  const handleNavigation = useCallback((e: React.MouseEvent, path: string) => {
    if (isPortalPage && isLoggedIn && (
      path === "/" ||
      path === "/company-register" ||
      path === "/shareholder-login" ||
      path === "/company-login"
    )) {
      e.preventDefault();
      setPendingPath(path);
      setShowLogoutAlert(true);
    } else {
      setIsMobileMenuOpen(false); // Close mobile menu on navigation
    }
  }, [isPortalPage, isLoggedIn]);

  const confirmNavigation = async () => {
    if (pendingPath) {
      if (isLoggedIn) {
        await supabase.auth.signOut();
      }
      navigate(pendingPath);
      setPendingPath(null);
      setShowLogoutAlert(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: Users },
    { label: "Services", href: "/services", icon: Layers },
    { label: "Compliance", href: "/compliance", icon: ShieldCheck },
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "Contact", href: "/contact", icon: Shield },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[64px] border-b transition-all duration-500 ${
        isScrolled
          ? "bg-[#060D1A]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
          : "bg-[#060D1A] border-white/5 shadow-md"
      }`}>
        <div className="w-full h-full px-4 md:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex items-center z-20 xl:w-64 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-bold text-white tracking-tight hidden sm:block">Vote India Secure</span>
            </Link>
          </div>

          {/* Center: Links (Desktop) */}
          <div className="hidden xl:flex flex-1 items-center justify-center gap-4 lg:gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 text-base font-medium whitespace-nowrap px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/10 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon className="w-4 h-4" strokeWidth={2} />
                    {link.label}
                    {/* Animated active underline */}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-primary via-amber-400 to-primary rounded-full"
                        style={{
                          animation: "navUnderlineIn 0.3s ease-out forwards",
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right: CTA & Mobile Menu Trigger */}
          <div className="flex items-center justify-end z-20 xl:w-64 gap-4">
            <Link to="/contact" className="hidden xl:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Request Demo
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden text-slate-300 hover:text-white p-2 rounded-md hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-[64px] left-0 w-full bg-[#060D1A]/95 backdrop-blur-xl border-b border-white/5 shadow-xl px-4 py-4 flex flex-col gap-2 z-40 max-h-[calc(100vh-64px)] overflow-y-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-base font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/10 border-l-2 border-primary"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <link.icon className="w-5 h-5" strokeWidth={2} />
                {link.label}
              </NavLink>
            ))}
            <div className="px-4 py-2 mt-2 border-t border-white/5">
              <Link to="/contact" className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2">
                Request Demo
              </Link>
            </div>
          </div>
        )}
      </nav>

      <AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
        <AlertDialogContent className="bg-[#0f172a] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Leave Company Portal?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              You are currently logged in. Navigating away will log you out of your current session.
              Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingPath(null)} className="bg-transparent border-white/10 hover:bg-white/5 text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmNavigation} className="bg-red-600 hover:bg-red-700 text-white border-0">
              <LogOut className="w-4 h-4 mr-2" />
              Logout & Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Keyframe for active underline animation */}
      <style>{`
        @keyframes navUnderlineIn {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Navbar;

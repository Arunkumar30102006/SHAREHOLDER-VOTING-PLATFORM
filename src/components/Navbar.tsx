import { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Shield, Users, Building2, LogOut, ShieldCheck, Home, Menu, X, BookOpen, Layers, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      <header className={`fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-6 pointer-events-none transition-transform duration-700 ${
        isScrolled ? "translate-y-4" : "translate-y-6"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Logo Island */}
          <div className="pointer-events-auto flex items-center h-[56px] px-5 rounded-full bg-[#020817]/70 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 hover:border-white/20 transition-all flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="text-2xl">🛡️</span>
              <span className="text-lg font-bold text-white tracking-tight hidden sm:block">Vote Secure</span>
            </Link>
          </div>

          {/* Center: Links Island */}
          <div className="pointer-events-auto hidden xl:flex items-center justify-center gap-1 h-[56px] px-2 rounded-full bg-[#020817]/70 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 text-sm font-semibold whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`w-4 h-4 ${isActive ? "text-orange-400" : ""}`} strokeWidth={2.5} />
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right: Login Island & Mobile Menu Trigger */}
          <div className="pointer-events-auto flex items-center h-[56px] px-2 rounded-full bg-[#020817]/70 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 flex-shrink-0">
            <div className="hidden xl:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-all outline-none px-4 py-2 rounded-full hover:bg-white/5 data-[state=open]:bg-white/10 border border-transparent data-[state=open]:border-white/10">
                  Login / Register <ChevronDown className="w-4 h-4 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#020817]/95 backdrop-blur-2xl border-white/10 text-white mt-4 rounded-2xl p-2 shadow-2xl" align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/shareholder-login" onClick={(e) => handleNavigation(e, '/shareholder-login')} className="hover:bg-white/10 focus:bg-white/10 cursor-pointer py-2.5 w-full flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-400" />
                      Shareholder Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/company-login" onClick={(e) => handleNavigation(e, '/company-login')} className="hover:bg-white/10 focus:bg-white/10 cursor-pointer py-2.5 w-full flex items-center mt-1">
                      <Building2 className="w-4 h-4 mr-2 text-amber-400" />
                      Company Portal
                    </Link>
                  </DropdownMenuItem>
                  <div className="h-px bg-white/10 my-1 mx-2" />
                  <DropdownMenuItem asChild>
                    <Link to="/company-register" onClick={(e) => handleNavigation(e, '/company-register')} className="hover:bg-white/10 focus:bg-white/10 cursor-pointer py-2.5 w-full flex items-center text-emerald-400 focus:text-emerald-300">
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Register Company
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden text-slate-300 hover:text-white p-2 mx-1 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Fixed to viewport) */}
        {isMobileMenuOpen && (
          <div className="xl:hidden pointer-events-auto fixed top-[90px] left-4 right-4 bg-[#020817]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl p-4 flex flex-col gap-2 z-40 max-h-[calc(100vh-120px)] overflow-y-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
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
            <div className="px-4 py-4 mt-2 border-t border-white/5 flex flex-col gap-2">
              <Link to="/shareholder-login" onClick={(e) => handleNavigation(e, '/shareholder-login')} className="flex items-center gap-3 text-base font-medium text-slate-300 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5">
                <Users className="w-5 h-5 text-blue-400" /> Shareholder Login
              </Link>
              <Link to="/company-login" onClick={(e) => handleNavigation(e, '/company-login')} className="flex items-center gap-3 text-base font-medium text-slate-300 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5">
                <Building2 className="w-5 h-5 text-amber-400" /> Company Portal
              </Link>
              <Link to="/company-register" onClick={(e) => handleNavigation(e, '/company-register')} className="flex items-center gap-3 text-base font-medium text-emerald-400 hover:text-emerald-300 transition-colors p-3 rounded-xl hover:bg-white/5">
                <ShieldCheck className="w-5 h-5" /> Register Company
              </Link>
            </div>
          </div>
        )}
      </header>

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
    </>
  );
};

export default Navbar;

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
  { path: "/demo", label: "Try Demo →", isGold: true },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020817]/80 backdrop-blur-xl border-b border-white/10 h-20 transition-all">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="text-2xl">🛡️</span>
          <span className="text-xl font-bold text-white tracking-tight">Vote India Secure</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => {
                const baseClass = "text-sm transition-colors ";
                const colorClass = link.isGold 
                  ? "text-amber-400 hover:text-amber-300" 
                  : "text-slate-300 hover:text-white";
                
                const activeClass = isActive && !link.isGold
                  ? "font-bold text-[#3b82f6] border-b-2 border-[#3b82f6] pb-1"
                  : isActive && link.isGold
                  ? "font-bold border-b-2 border-amber-400 pb-1"
                  : "";

                return `${baseClass} ${colorClass} ${activeClass}`;
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link to="/demo">
            <Button size="sm" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-medium">
              Request Demo
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className="md:hidden text-white p-2" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#020817] border-b border-white/10 shadow-2xl py-4 flex flex-col px-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) => {
                const baseClass = "text-base py-2 transition-colors block w-full";
                const colorClass = link.isGold ? "text-amber-400" : "text-slate-300";
                const activeClass = isActive && !link.isGold
                  ? "font-bold text-[#3b82f6]"
                  : isActive && link.isGold
                  ? "font-bold"
                  : "";
                return `${baseClass} ${colorClass} ${activeClass}`;
              }}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-white/10">
            <Link to="/demo" onClick={closeMenu} className="w-full">
              <Button className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

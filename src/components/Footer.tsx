import { Link } from "react-router-dom";
import { Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2a] border-t border-white/10 pt-16 pb-8 text-slate-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Logo & Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-bold text-white tracking-tight">Vote India Secure</span>
            </Link>
            <p className="text-sm text-slate-400">
              Digitizing India's corporate governance with secure, SEBI-compliant electronic voting.
            </p>
            <div className="pt-2">
              <a href="mailto:support@shareholdervoting.in" className="text-sm font-medium text-[#3b82f6] hover:underline">
                support@shareholdervoting.in
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-sm hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/demo" className="text-sm hover:text-white transition-colors">Interactive Demo</Link>
              </li>
              <li>
                <Link to="/security" className="text-sm hover:text-white transition-colors">Security Architecture</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <span className="text-sm text-slate-500 cursor-not-allowed">Careers (Coming soon)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal & Compliance</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/sebi-compliance" className="text-sm hover:text-white transition-colors">SEBI Compliance</Link>
              </li>
              <li>
                <Link to="/data-protection" className="text-sm hover:text-white transition-colors">Data Protection</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Vote India Secure. All rights reserved. | SEBI Compliant Platform
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Shield, Lock, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 text-foreground transition-colors duration-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Vote India Secure Logo" width={48} height={48} className="h-12 w-12 object-contain mix-blend-screen rounded-xl" loading="lazy" />
              <div>
                <h2 className="text-xl font-bold">Vote India Secure</h2>
                <p className="text-xs text-muted-foreground">shareholdervoting.in</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t("footer_desc")}
            </p>
            <div className="bg-background/5 border border-white/10 p-3 rounded-lg mb-4">
              <p className="text-[10px] text-muted-foreground leading-tight">
                <strong>{t("footer_disclaimer").split(':')[0]}:</strong> {t("footer_disclaimer").substring(t("footer_disclaimer").indexOf(':') + 1)}
              </p>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-xs text-muted-foreground"><strong>CIN:</strong> U72900MH2024PTC123456</p>
              <p className="text-xs text-muted-foreground"><strong>GSTIN:</strong> 27AADCB2230M1Z5</p>
              <p className="text-xs text-muted-foreground"><strong>Grievance Officer:</strong> Rahul Sharma (grievance@shareholdervoting.in)</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-white bg-green-900/40 px-3 py-1.5 rounded-full border border-green-500/30">
                <Shield className="w-4 h-4 text-green-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white bg-blue-900/40 px-3 py-1.5 rounded-full border border-blue-500/30">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>AES-256 Bit</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white bg-purple-900/40 px-3 py-1.5 rounded-full border border-purple-500/30">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>DPDP Act 2023 Aligned</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">E-Voting Solutions</h3>
            <ul className="space-y-3">
              {[
                { name: "Shareholder Voting", path: "/shareholder-voting" },
                { name: "AGM E-Voting", path: "/agm-voting" },
                { name: "EGM E-Voting", path: "/egm-voting" },
                { name: "Online E-Voting", path: "/online-e-voting" },
                { name: "Corporate Voting", path: "/corporate-voting" },
                { name: "Security Architecture", path: "/security" },
                { name: "How It Works", path: "/how-it-works" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-slate-300 hover:text-cyan-300 font-medium transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Company & Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "SEBI Compliance", path: "/compliance" },
                { name: "Blog & Insights", path: "/blog" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms-of-service" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-slate-300 hover:text-cyan-300 font-medium transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">{t("footer_contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@shareholdervoting.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>admin@shareholdervoting.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+1 (800) 555-VOTE</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200 font-medium">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5" />
                <span>Global Digital Infrastructure<br />Operated by: VoteTech Solutions</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="border-t border-white/10"
      >
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-center text-center text-sm text-slate-300 font-medium">
            <p>© 2026 Vote Secure. All rights reserved.</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

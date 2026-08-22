import { SEO } from "@/components/layout/SEO";
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, Shield, Sparkles, Building2, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { env } from "@/config/env";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        firstname: formData.name.split(' ')[0] || formData.name,
        lastname: formData.company,
        email: formData.email,
        subject: `Corporate Inquiry: ${formData.company || formData.name}`,
        message: formData.message,
        name: formData.name,
        company: formData.company,
        phone: formData.phone
      };

      const { data, error } = await supabase.functions.invoke('send-contact-message', {
        body: payload,
        headers: {
          "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
          "apikey": env.SUPABASE_ANON_KEY
        }
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed to send message");

      toast.success("Inquiry received! Our Corporate Concierge team will contact you promptly.");
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to send message. Please email support directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020817] text-white">
      <SEO
        title="Contact Us | Global Enterprise E-Voting Support & Sales"
        description="Get in touch with Vote Secure for global corporate e-voting deployments, pricing, and dedicated 24/7 general meeting support."
        canonical="/contact"
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Globe className="w-3.5 h-3.5" />
            24/7 Global Corporate Concierge
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Connect With Our <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Governance Team</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Ready to deploy seamless, cryptographically secure voting for your upcoming AGM or special meeting? Reach out for tailored assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          
          {/* Contact Information Cards */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0d1b2a]/90 border border-white/15 rounded-3xl p-8 backdrop-blur-xl shadow-xl space-y-6">
              <h2 className="text-2xl font-black text-white">Operations Center</h2>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-cyan-300">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Enterprise Governance Center</h3>
                  <p className="text-slate-200 text-xs mt-1 leading-relaxed font-normal">
                    Vote India Secure Platform<br/>
                    Bandra Kurla Complex (BKC)<br/>
                    Mumbai, Maharashtra 400051, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Contact Us</h3>
                  <div className="space-y-2 mt-2">
                    <p className="flex items-center gap-2 text-slate-200 text-sm font-medium">
                      <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                      <a href="mailto:support@shareholdervoting.in" className="text-cyan-300 font-bold hover:underline">
                        support@shareholdervoting.in
                      </a>
                    </p>
                    <p className="flex items-center gap-2 text-slate-200 text-sm font-medium">
                      <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                      <a href="mailto:admin@shareholdervoting.in" className="text-cyan-300 font-bold hover:underline">
                        admin@shareholdervoting.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Meeting Support Window</h3>
                  <p className="text-slate-200 text-xs mt-1 font-normal">
                    24/7 Active Live General Meeting Monitoring & Dedicated Scrutinizer Hotlines.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-blue-400/30 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-cyan-300 font-bold text-sm mb-1">
                <Shield className="w-4 h-4" />
                <span>Enterprise SLA Guarantee</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                All corporate inquiries receive a response from a dedicated corporate secretary or technical solution architect within 2 business hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-[#0d1b2a]/90 border border-white/15 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-black text-white mb-2">Request Corporate Consultation</h2>
              <p className="text-xs text-slate-200 mb-8 font-normal">
                Fill in your company details to receive a customized deployment proposal and security compliance documentation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold text-slate-100">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-xs font-bold text-slate-100">Organization / Listed Entity *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Apex Global Holdings Inc."
                      className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-slate-100">Corporate Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="j.doe@enterprise.com"
                      className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold text-slate-100">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-bold text-slate-100">Meeting Details & Estimated Shareholders *</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your upcoming AGM/EGM dates, estimated member count, and specific transfer agent integration needs..."
                    className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm gap-2 shadow-lg shadow-blue-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Transmitting Inquiry...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Corporate Inquiry
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

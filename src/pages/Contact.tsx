import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      // Map to old fields to avoid breaking the backend edge function if it expects them
      const payload = {
        firstname: formData.name.split(' ')[0] || formData.name,
        lastname: formData.company,
        email: formData.email,
        subject: `Phone: ${formData.phone}`,
        message: formData.message,
        // Also send new raw fields in case the backend is updated
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

      toast.success("Message sent successfully! Our team will contact you shortly.");
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to send message. Please email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <Helmet>
        <title>Contact Us | Vote India Secure</title>
        <meta name="description" content="Get in touch with Vote India Secure for e-voting solutions, pricing, and support." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get in <span className="text-[#1e3a8a]">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to secure your next AGM? Contact our sales and support team for personalized assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Registered Office</h3>
                <p className="text-muted-foreground">
                  Vote India Secure Technologies Pvt. Ltd.<br/>
                  Level 7, Trade Centre, BKC<br/>
                  Bandra (East), Mumbai 400051
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email Us</h3>
                <a href="mailto:contact@shareholdervoting.in" className="text-muted-foreground hover:text-[#1e3a8a] transition-colors">
                  contact@shareholdervoting.in
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Call Us</h3>
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-[#1e3a8a] transition-colors">
                  +91-9876543210
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Business Hours</h3>
                <p className="text-muted-foreground">
                  Mon-Fri, 9:30 AM - 6:30 PM IST
                </p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10">
                <a href="#" className="inline-flex items-center gap-2 text-[#1e3a8a] hover:underline font-medium">
                    Follow us on LinkedIn
                </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3 bg-card/40 border border-white/10 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-[#1e3a8a]" />
              <h2 className="text-2xl font-bold">Send a Message</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <input
                    type="text" id="name" required
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-background focus:ring-2 focus:ring-[#1e3a8a]"
                    placeholder="Jane Doe"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company Name</label>
                  <input
                    type="text" id="company" required
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-background focus:ring-2 focus:ring-[#1e3a8a]"
                    placeholder="Acme Corp Ltd."
                    value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Work Email</label>
                  <input
                    type="email" id="email" required
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-background focus:ring-2 focus:ring-[#1e3a8a]"
                    placeholder="jane@example.com"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel" id="phone" required
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-background focus:ring-2 focus:ring-[#1e3a8a]"
                    placeholder="+91 98765 43210"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message" rows={4} required
                  className="w-full p-4 rounded-xl border border-white/10 bg-background focus:ring-2 focus:ring-[#1e3a8a] resize-none"
                  placeholder="How can we help your organization?"
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white text-lg rounded-xl">
                {isSubmitting ? "Sending..." : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>

        {/* Google Maps Placeholder */}
        <div className="mt-20 rounded-3xl overflow-hidden h-[400px] border border-white/10 bg-card/20 relative flex items-center justify-center">
            <div className="text-center">
                <MapPin className="w-12 h-12 text-[#1e3a8a] mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground font-medium">Interactive Google Map Embed</p>
                <p className="text-sm text-muted-foreground/70">Mumbai Headquarters</p>
            </div>
            {/* Actual iframe would go here */}
        </div>

      </div>
    </div>
  );
};

export default Contact;

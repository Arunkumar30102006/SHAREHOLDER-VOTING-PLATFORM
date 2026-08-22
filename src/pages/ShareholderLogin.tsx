import { Head as Helmet } from "vite-react-ssg";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Shield,
  Lock,
  Vote,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  KeyRound
} from "lucide-react";
import { toast } from "sonner";
import { env } from "@/config/env";
import { useTranslation } from "react-i18next";

const ShareholderLogin = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [loginStep, setLoginStep] = useState<"CREDENTIALS" | "OTP">("CREDENTIALS");
  const [otp, setOtp] = useState("");
  const [maskedPhone, setMaskedPhone] = useState("");
  const [shareholderId, setShareholderId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const warmEdgeFunction = async () => {
    try {
      // Trigger a preflight request to wake up the edge function (mitigate cold starts)
      await fetch(`${env.SUPABASE_URL}/functions/v1/send-shareholder-otp-email`, {
        method: "OPTIONS",
        headers: {
          "Content-Type": "application/json",
          "apikey": env.SUPABASE_ANON_KEY
        }
      });
      console.log("OTP function warmed up");
    } catch (err) {
      // Silently fail as this is just an optimization
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (loginStep === "CREDENTIALS") {
        await handleCredentialsSubmit();
      } else {
        await handleOtpSubmit();
      }
    } catch (err) {
      console.error("Login exception:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSubmit = async () => {
    const passwordHash = await hashPassword(formData.password);

    const { data, error } = await supabase
      .from("shareholders")
      .select("*")
      .eq("login_id", formData.userId)
      .eq("password_hash", passwordHash)
      .maybeSingle();

    if (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
      return;
    }

    if (data) {
      if (data.is_credential_used) {
        toast.error("This credential has already been used.", {
          description: "If you believe this is an error, please contact support."
        });
        return;
      }

      const email = data.email;
      const name = data.shareholder_name;

      if (!email) {
        toast.error("No email registered for this shareholder.", {
          description: "Please contact support to update your contact details."
        });
        return;
      }

      // Store ID for next step
      setShareholderId(data.id);

      // Mask Email
      const [localPart, domain] = email.split("@");
      const maskedLocal = localPart.length > 3
        ? `${localPart.slice(0, 3)}...`
        : localPart;
      setMaskedPhone(`${maskedLocal}@${domain}`); // Reusing maskedPhone state variable for simplicity

      // Trigger OTP
      try {
        const { error: fnError } = await supabase.functions.invoke("send-shareholder-otp-email", {
          body: {
            shareholder_id: data.id,
            email: email,
            name: name
          },
          headers: {
            "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
          }
        });

        if (fnError) {
          throw fnError;
        }

        toast.success("Credentials Verified", {
          description: `OTP sent to register email ${maskedLocal}@${domain}`,
        });
        setLoginStep("OTP");
      } catch (err: unknown) {
        console.error("Failed to send OTP:", err);
        toast.error("Failed to send OTP", {
          description: (err as Error).message || "Please check your internet connection or try again later.",
        });
      }
    } else {
      toast.error("Invalid User ID or Password");
    }
  };

  const handleOtpSubmit = async () => {
    // Verify OTP
    // 1. Fetch user to get current OTP hash and expiry
    const { data, error } = await supabase
      .from("shareholders")
      .select("otp_code, otp_expiry, id")
      .eq("id", shareholderId)
      .single();

    if (error || !data) {
      toast.error("Verification failed. Please try logging in again.");
      setLoginStep("CREDENTIALS");
      return;
    }

    // 2. Check Expiry
    if (!data.otp_expiry || new Date(data.otp_expiry) < new Date()) {
      toast.error("OTP has expired.", {
        description: "Please go back and login again to receive a new OTP."
      });
      return;
    }

    // 3. Hash input OTP and compare
    const inputHash = await hashPassword(otp); // Using same hashing function (SHA-256)

    if (inputHash === data.otp_code) {
      // Success!
      // Mark credential as used AND clear OTP
      await supabase
        .from("shareholders")
        .update({
          is_credential_used: true,
          otp_code: null,
          otp_expiry: null
        })
        .eq("id", shareholderId);

      localStorage.setItem("shareholderId", shareholderId);

      toast.success("Login successful!", {
        description: "Redirecting to voting dashboard...",
      });

      setTimeout(() => {
        navigate("/voting-dashboard");
      }, 1000);
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Info */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-sm">
                <Vote className="w-4 h-4 text-blue-400" />
                <span>{t("login_portal_badge")}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t("login_title_1")}{" "}
                <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {t("login_title_2")}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                {t("login_description")}
              </p>

              {/* Security Features */}
              <div className="space-y-4">
                {[
                  { icon: Lock, title: t("login_feat1_title"), desc: t("login_feat1_desc") },
                  { icon: Shield, title: t("login_feat2_title"), desc: t("login_feat2_desc") },
                  { icon: Eye, title: t("login_feat3_title"), desc: t("login_feat3_desc") },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4 p-4 rounded-xl bg-card/10 backdrop-blur-md border border-white/10 shadow-soft">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Login Form with Glowing Animated Border */}
            <div className="order-1 lg:order-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-slow" />
              
              <Card className="relative shadow-2xl border-white/10 bg-[#020817]/90 backdrop-blur-xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full" />

                <CardHeader className="text-center relative z-10 pb-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25 animate-pulse-glow">
                    <Vote className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{t("login_card_title")}</CardTitle>
                  <CardDescription>
                    {t("login_card_desc")}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {loginStep === "CREDENTIALS" && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="userId">{t("login_user_id")}</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-cyan-400 transition-colors" />
                            <Input
                              id="userId"
                              name="userId"
                              value={formData.userId}
                              onChange={handleInputChange}
                              onFocus={warmEdgeFunction}
                              placeholder={t("login_user_id_placeholder")}
                              className="pl-11 bg-black/40 border-white/10 focus:border-cyan-500/50 transition-all"
                              required
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {t("login_user_id_hint")}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">{t("login_password")}</Label>
                          <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-cyan-400 transition-colors" />
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={handleInputChange}
                              onFocus={warmEdgeFunction}
                              placeholder={t("login_password_placeholder")}
                              className="pl-11 pr-11 bg-black/40 border-white/10 focus:border-cyan-500/50 transition-all"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-cyan-400 transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Security Notice */}
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                          <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          <p className="text-xs text-cyan-200/80">
                            {t("login_encrypted_notice")}
                          </p>
                        </div>
                      </div>
                    )}

                    {loginStep === "CREDENTIALS" ? (
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-none shadow-lg shadow-blue-500/25 mt-4"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {t("login_verifying")}
                          </>
                        ) : (
                          <>
                            {t("login_proceed")}
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="space-y-4 animate-fade-in-up">
                        <div className="space-y-2">
                          <Label htmlFor="otp">{t("login_otp_label")}</Label>
                          <Input
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder={t("login_otp_placeholder")}
                            className="text-center text-2xl tracking-widest bg-black/40 border-white/10 focus:border-cyan-500/50 transition-all py-6"
                            maxLength={6}
                            autoFocus
                            required
                          />
                          <p className="text-xs text-center text-muted-foreground mt-2">
                            {t("login_otp_sent")} <span className="font-semibold text-cyan-400">{maskedPhone}</span>
                          </p>
                        </div>

                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="w-full gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 border-none shadow-lg shadow-teal-500/25"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              {t("login_verifying_otp")}
                            </>
                          ) : (
                            <>
                              {t("login_secure_btn")}
                              <Lock className="w-5 h-5" />
                            </>
                          )}
                        </Button>

                        <button
                          type="button"
                          onClick={() => {
                            setLoginStep("CREDENTIALS");
                            setOtp("");
                          }}
                          className="w-full text-sm text-muted-foreground hover:text-white transition-colors py-2"
                        >
                          {t("login_back_btn")}
                        </button>
                      </div>
                    )}
                  </form>

                  {/* Help Link */}
                  <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t("login_no_creds")}{" "}
                      <Link to="/contact" className="text-cyan-400 font-medium hover:text-cyan-300 hover:underline transition-colors">
                        {t("login_contact")}
                      </Link>
                    </p>
                  </div>

                  {/* Company Login Link */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t("login_admin_prompt")}{" "}
                      <Link to="/company-register" className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors">
                        {t("login_register_company")}
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShareholderLogin;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SEO } from "@/components/layout/SEO";
import { env } from "@/config/env";
import {
  Building2,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Users,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useTranslation } from "react-i18next";

import {
  countries,
  indianStates,
  districtsMap,
} from "@/lib/locationData";

const step1Schema = z.object({
  companyName: z.string().min(2, "Company name is required").max(200),
  cin: z.string().min(10, "Valid CIN is required").max(25),
  registeredAddress: z.string().min(5, "Building/Street is required").max(500),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"), // Replaces City for validation
  area: z.string().min(2, "Area is required"),
  pincode: z.string().regex(/^\d{6}$/, "Valid 6-digit PIN code required"),
});

const step2Schema = z.object({
  contactName: z.string().min(2, "Name is required").max(100),
  contactEmail: z.string().email("Valid email required").max(255),
  contactPhone: z.string().min(10, "Valid phone number required").max(15),
  designation: z.string().min(2, "Designation is required").max(100),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type Step = 1 | 2 | 3;

const CompanyRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Ensure clean state on mount without triggering error toasts
  useEffect(() => {
    const clearSession = async () => {
      try {
        // Only clear if a likely stale/invalid session exists to avoid unnecessary calls
        const sessionToken = localStorage.getItem("supabase.auth.token");
        if (sessionToken && (sessionToken.includes('"expires_at":') || sessionToken.includes('access_token'))) {
          // Use local scope to avoid server call that might 401
          await supabase.auth.signOut({ scope: 'local' });
          localStorage.removeItem("supabase.auth.token");
        }
      } catch (e) {
        // Silently ignore all errors during cleanup
      }
    };
    clearSession();
  }, []);

  const [formData, setFormData] = useState({
    companyName: "",
    cin: "",
    registeredAddress: "",
    country: "India",
    state: "",
    district: "",
    area: "",
    pincode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    designation: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const fetchPincodeData = async (pincode: string) => {
    if (pincode.length !== 6) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          state: postOffice.State,
          district: postOffice.District,
          // Area could be multiple, we'll suggest the first one or let them keep typing
          area: prev.area || postOffice.Name
        }));
        setErrors(prev => ({ ...prev, pincode: "" }));
        toast.success("Address auto-filled from PIN code");
      } else {
        setErrors(prev => ({ ...prev, pincode: "Invalid PIN code for India" }));
      }
    } catch (error) {
      console.error("PIN Lookup Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Auto-fetch address when 6 digits entered for pincode
    if (name === "pincode" && value.length === 6 && /^\d+$/.test(value) && formData.country === "India") {
      fetchPincodeData(value);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const warmEdgeFunction = async () => {
    try {
      // Trigger a preflight request to wake up the edge function (mitigate cold starts)
      await fetch(`${env.SUPABASE_URL}/functions/v1/send-email-otp`, {
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

  const validateStep1 = () => {
    try {
      step1Schema.parse({
        companyName: formData.companyName.trim(),
        cin: formData.cin.trim(),
        registeredAddress: formData.registeredAddress.trim(),
        country: formData.country.trim(),
        state: formData.state.trim(),
        district: formData.district.trim(),
        area: formData.area.trim(),
        pincode: formData.pincode.trim(),
      });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const nextStep = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      // Validate step 2 before sending OTP
      try {
        step2Schema.parse({
          contactName: formData.contactName.trim(),
          contactEmail: formData.contactEmail.trim().toLowerCase(),
          contactPhone: formData.contactPhone.trim(),
          designation: formData.designation.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        // Send OTP
        setIsLoading(true);
        const { data, error: functionError } = await supabase.functions.invoke("send-email-otp", {
          body: {
            email: formData.contactEmail,
            name: formData.contactName
          },
          headers: {
            "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
          }
        });

        if (functionError || !data?.success) {
          toast.error(data?.message || functionError?.message || "Failed to send verification code.");
          setIsLoading(false);
          return;
        }

        toast.success("Verification code sent to your email.");
        setStep(3);
      } catch (err) {
        if (err instanceof z.ZodError) {
          const fieldErrors: Record<string, string> = {};
          err.errors.forEach((error) => {
            if (error.path[0]) {
              fieldErrors[error.path[0] as string] = error.message;
            }
          });
          setErrors(fieldErrors);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Step 3 already implies previous validation, but let's verify OTP
      if (step === 3) {
        const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-email-otp", {
          body: {
            email: formData.contactEmail,
            code: formData.otp
          },
          headers: {
            "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
          }
        });

        if (verifyError || !verifyData?.success) {
          toast.error(verifyData?.message || verifyError?.message || "Invalid Verification Code");
          setIsLoading(false);
          return;
        }
      }

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.contactEmail.trim().toLowerCase(),
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/company-dashboard`,
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          toast.error("This email is already registered. Please login instead.");
        } else {
          toast.error(authError.message);
        }
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        toast.error("Failed to create account");
        setIsLoading(false);
        return;
      }

      // 2. Create company record
      const companyId = crypto.randomUUID();

      const { error: companyError } = await supabase
        .from("companies")
        .insert({
          id: companyId,
          company_name: formData.companyName.trim(),
          cin_number: formData.cin.trim().toUpperCase(),
          registered_address: `${formData.registeredAddress.trim()}, ${formData.area.trim()}, ${formData.district.trim()}, ${formData.state.trim()}, ${formData.country.trim()} - ${formData.pincode.trim()}`,
          contact_email: formData.contactEmail.trim().toLowerCase(),
          contact_phone: formData.contactPhone.trim(),
        });

      if (companyError) {
        console.error("Company creation error:", companyError);
        if (companyError.code === "23505") {
          toast.error("A company with this CIN is already registered");
        } else {
          toast.error("Failed to register company. Please try again.");
        }
        // Sign out the user since registration failed
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      // 3. Create company_admin record
      const { error: adminError } = await supabase
        .from("company_admins")
        .insert({
          user_id: authData.user.id,
          company_id: companyId,
          full_name: formData.contactName.trim(),
        });

      if (adminError) {
        console.error("Admin record creation error:", adminError);
        toast.error("Failed to set up admin access");
        setIsLoading(false);
        return;
      }

      // 4. Create user role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: authData.user.id,
          role: "company_admin",
        });

      if (roleError) {
        console.error("Role creation error:", roleError);
      }

      // 5. Send Welcome Email
      // Note: We don't block navigation on this, just log if it fails
      supabase.functions.invoke("send-welcome-email", {
        body: {
          email: formData.contactEmail,
          companyName: formData.companyName,
          cin: formData.cin,
          adminName: formData.contactName,
          address: `${formData.registeredAddress}, ${formData.area}, ${formData.district}, ${formData.state}, ${formData.country} - ${formData.pincode}`,
          phone: formData.contactPhone
        },
        headers: {
          "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
        }
      }).then(({ error }) => {
        if (error) console.error("Failed to send welcome email:", error);
      });

      toast.success("Company registered successfully!");
      navigate("/company-dashboard");

    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stepInfo = [
    { number: 1, title: t("company_reg_step1_title"), icon: Building2 },
    { number: 2, title: t("company_reg_step2_title"), icon: Users },
    { number: 3, title: t("company_reg_step3_title"), icon: Shield },
  ];

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Register Your Company"
        description="Join India's most secure e-voting platform. Register your company today for transparent and compliant shareholder voting."
        canonical="/company-register"
      />
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-sm">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span>{t("company_reg_badge")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("company_reg_title_1")}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("company_reg_title_2")}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("company_reg_subtitle")}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex items-center justify-between">
              {stepInfo.map((info, index) => (
                <div key={info.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= info.number
                        ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-medium"
                        : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {step > info.number ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <info.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-sm mt-2 font-medium ${step >= info.number ? "text-foreground" : "text-muted-foreground"
                      }`}>
                      {info.title}
                    </span>
                  </div>
                  {index < stepInfo.length - 1 && (
                    <div className={`hidden sm:block w-24 lg:w-32 h-1 mx-4 rounded-full transition-all duration-300 ${step > info.number ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-2xl mx-auto shadow-large border-white/10 bg-card/10 backdrop-blur-md">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">
                {step === 1 && t("company_reg_step1_title")}
                {step === 2 && t("company_reg_step2_title")}
                {step === 3 && t("company_reg_step3_title")}
              </CardTitle>
              <CardDescription>
                {step === 1 && t("company_reg_step1_desc")}
                {step === 2 && t("company_reg_step2_desc")}
                {step === 3 && t("company_reg_step3_desc")}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} autoComplete="off">
                {/* Step 1: Company Details */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in-up">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">{t("company_reg_name_label")}</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g., Tata Consultancy Services Ltd."
                        className={errors.companyName ? "border-destructive" : ""}
                        required
                      />
                      {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cin">{t("company_reg_cin_label")}</Label>
                      <Input
                        id="cin"
                        name="cin"
                        value={formData.cin}
                        onChange={handleInputChange}
                        placeholder="e.g., L22210TN1995PLC028771"
                        className={errors.cin ? "border-destructive" : ""}
                        required
                      />
                      {errors.cin && <p className="text-sm text-destructive">{errors.cin}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registeredAddress">{t("company_reg_address_label")}</Label>
                      <Input
                        id="registeredAddress"
                        name="registeredAddress"
                        value={formData.registeredAddress}
                        onChange={handleInputChange}
                        placeholder="Building, Street, Area"
                        className={errors.registeredAddress ? "border-destructive" : ""}
                        required
                      />
                      {errors.registeredAddress && <p className="text-sm text-destructive">{errors.registeredAddress}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">{t("company_reg_country_label")}</Label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, country: e.target.value, state: "", district: "" }));
                        }}
                        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.country ? "border-destructive" : ""}`}
                      >
                        <option value="" disabled>{t("company_reg_country_ph")}</option>
                        {countries.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                      {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* PIN Code - Moved up for better flow */}
                      <div className="space-y-2">
                        <Label htmlFor="pincode">{t("company_reg_pincode_label")}</Label>
                        <div className="relative">
                          <Input
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="400001"
                            maxLength={6}
                            className={`tracking-widest font-mono ${errors.pincode ? "border-destructive lg:ring-destructive" : ""}`}
                            required
                          />
                          {isLoading && formData.pincode.length === 6 && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                          )}
                        </div>
                        {errors.pincode && <p className="text-sm text-destructive">{errors.pincode}</p>}
                      </div>

                      {/* Area */}
                      <div className="space-y-2">
                        <Label htmlFor="area">{t("company_reg_area_label")}</Label>
                        <Input
                          id="area"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          placeholder="e.g., Andheri West"
                          className={errors.area ? "border-destructive" : ""}
                          required
                        />
                        {errors.area && <p className="text-sm text-destructive">{errors.area}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* State Selection */}
                      <div className="space-y-2">
                        <Label htmlFor="state">{t("company_reg_state_label")}</Label>
                        {formData.country === "India" ? (
                          <>
                            <select
                              id="state"
                              name="state"
                              value={indianStates.includes(formData.state) ? formData.state : (formData.state ? "Other" : "")}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === "Other") {
                                  setFormData(prev => ({ ...prev, state: "Other", district: "" }));
                                } else {
                                  setFormData(prev => ({ ...prev, state: val, district: "" }));
                                }
                              }}
                              className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.state ? "border-destructive" : ""}`}
                            >
                              <option value="" disabled>{t("company_reg_state_ph")}</option>
                              {indianStates.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                              <option value="Other">{t("company_reg_other")}</option>
                            </select>

                            {(!indianStates.includes(formData.state) && formData.state !== "" && formData.state !== "Other") || formData.state === "Other" ? (
                              <Input
                                name="state"
                                value={formData.state === "Other" ? "" : formData.state}
                                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                                placeholder={t("company_reg_type_state")}
                                className="mt-2"
                                autoFocus
                              />
                            ) : null}
                          </>
                        ) : (
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter State"
                            className={errors.state ? "border-destructive" : ""}
                          />
                        )}
                        {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
                      </div>

                      {/* District Selection */}
                      <div className="space-y-2">
                        <Label htmlFor="district">{t("company_reg_district_label")}</Label>
                        {formData.country === "India" && (indianStates.includes(formData.state) || formData.state === "Other" || formData.state === "") ? (
                          <>
                            {districtsMap[formData.state] ? (
                              <select
                                id="district"
                                name="district"
                                value={districtsMap[formData.state]?.includes(formData.district) ? formData.district : (formData.district ? "Other" : "")}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === "Other") {
                                    setFormData(prev => ({ ...prev, district: "Other" }));
                                  } else {
                                    setFormData(prev => ({ ...prev, district: val }));
                                  }
                                }}
                                className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.district ? "border-destructive" : ""}`}
                              >
                                <option value="" disabled>{t("company_reg_district_ph")}</option>
                                {districtsMap[formData.state].map(d => (
                                  <option key={d} value={d}>{d}</option>
                                ))}
                                <option value="Other">{t("company_reg_other")}</option>
                              </select>
                            ) : (
                              <Input
                                id="district"
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                placeholder={t("company_reg_enter_district")}
                                className={errors.district ? "border-destructive" : ""}
                              />
                            )}

                            {formData.district === "Other" && (
                              <Input
                                name="district"
                                value={formData.district === "Other" ? "" : formData.district}
                                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                                placeholder={t("company_reg_type_district")}
                                className="mt-2"
                                autoFocus
                              />
                            )}
                          </>
                        ) : (
                          <Input
                            id="district"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            placeholder={t("company_reg_enter_district")}
                            className={errors.district ? "border-destructive" : ""}
                          />
                        )}
                        {errors.district && <p className="text-sm text-destructive">{errors.district}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Admin Account */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in-up">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">{t("company_reg_contact_name_label")}</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="contactName"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                          className={`pl-11 ${errors.contactName ? "border-destructive" : ""}`}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      {errors.contactName && <p className="text-sm text-destructive">{errors.contactName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="designation">{t("company_reg_designation_label")}</Label>
                      <Input
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="e.g., Company Secretary"
                        className={errors.designation ? "border-destructive" : ""}
                        required
                        disabled={isLoading}
                      />
                      {errors.designation && <p className="text-sm text-destructive">{errors.designation}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">{t("company_reg_email_label")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                          onFocus={warmEdgeFunction}
                          placeholder="admin@company.com"
                          className={`pl-11 ${errors.contactEmail ? "border-destructive" : ""}`}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      {errors.contactEmail && <p className="text-sm text-destructive">{errors.contactEmail}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">{t("company_reg_phone_label")}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="contactPhone"
                          name="contactPhone"
                          type="tel"
                          value={formData.contactPhone}
                          onChange={handleInputChange}
                          placeholder="+91 9876543210"
                          className={`pl-11 ${errors.contactPhone ? "border-destructive" : ""}`}
                          required
                          disabled={isLoading}
                          autoComplete="off"
                        />
                      </div>
                      {errors.contactPhone && <p className="text-sm text-destructive">{errors.contactPhone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">{t("company_reg_pass_label")}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder={t("company_reg_pass_ph")}
                          className={`pl-11 pr-11 ${errors.password ? "border-destructive" : ""}`}
                          required
                          disabled={isLoading}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{t("company_reg_confirm_pass_label")}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder={t("company_reg_confirm_pass_ph")}
                          className={`pl-11 ${errors.confirmPassword ? "border-destructive" : ""}`}
                          required
                          disabled={isLoading}
                          autoComplete="new-password"
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <Shield className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{t("company_reg_secure_title")}</p>
                        <p className="text-xs text-muted-foreground">
                          {t("company_reg_secure_desc")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Verification */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{t("company_reg_check_email_title")}</h3>
                        <p className="text-muted-foreground mt-1">
                          {t("company_reg_check_email_desc")}
                          <br />
                          <span className="font-medium text-foreground">{formData.contactEmail}</span>
                        </p>
                      </div>

                      <div className="max-w-xs mx-auto space-y-2 text-left">
                        <Label htmlFor="otp" className="text-center block">{t("company_reg_otp_label")}</Label>
                        <Input
                          id="otp"
                          name="otp"
                          type="text"
                          maxLength={6}
                          value={formData.otp}
                          onChange={handleInputChange}
                          placeholder="000000"
                          className="text-center text-2xl tracking-[0.5em] font-mono h-14"
                          autoComplete="one-time-code"
                          required
                        />
                        <p className="text-xs text-muted-foreground text-center">
                          {t("company_reg_otp_expires_desc")}
                        </p>
                      </div>
                    </div>

                    {/* Security Badge - Requested by User */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
                        <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{t("company_reg_bank_sec_title")}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("company_reg_bank_sec_desc")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-saffron/10 border border-saffron/20">
                        <Lock className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{t("company_reg_verified_title")}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("company_reg_verified_desc")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  {step > 1 ? (
                    <Button type="button" variant="ghost" onClick={prevStep} className="gap-2" disabled={isLoading}>
                      <ArrowLeft className="w-4 h-4" />
                      {t("company_reg_btn_prev")}
                    </Button>
                  ) : (
                    <Link to="/">
                      <Button type="button" variant="ghost" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        {t("company_reg_btn_back")}
                      </Button>
                    </Link>
                  )}

                  {step < 3 ? (
                    <Button type="button" variant="saffron" onClick={nextStep} className="gap-2" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {step === 2 ? t("company_reg_btn_sending_otp") : t("company_reg_btn_verifying")}
                        </>
                      ) : (
                        <>
                          {step === 2 ? t("company_reg_btn_verify_email") : t("company_reg_btn_next")}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button type="submit" variant="hero" className="gap-2" disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      {t("company_reg_btn_complete")}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>


          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              {t("company_reg_already")}{" "}
              <Link to="/company-login" className="text-primary hover:underline font-medium">
                {t("company_reg_login_link")}
              </Link>
            </p>
          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
};

export default CompanyRegister;
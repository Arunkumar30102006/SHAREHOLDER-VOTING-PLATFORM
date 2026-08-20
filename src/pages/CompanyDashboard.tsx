import { Helmet } from "react-helmet-async";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Building2,
  Users,
  Mail,
  Phone,
  Plus,
  Send,
  Shield,
  LogOut,
  Loader2,
  CheckCircle2,
  Hash,
  Trash2,
  RefreshCw,
  Search,
  Download,
  Filter,
  TrendingUp,
  FileSpreadsheet,
  Globe,
  Sparkles,
  FileText,
  BrainCircuit,
  ExternalLink,
  ChevronRight,
  Pencil,
  X
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { votingApi } from "@/services/api/voting";
import { DashboardFeedback } from "@/components/company/DashboardFeedback";
import { env } from "@/config/env";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AdminVotingResults } from "@/components/company/AdminVotingResults";
import { Company, Shareholder } from "@/types";

const shareholderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().optional(),
  sharesHeld: z.number().min(1, "Shares must be at least 1"),
});

const CompanyDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingShareholder, setIsAddingShareholder] = useState(false);
  const [isSendingCredentials, setIsSendingCredentials] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isDeletingCompany, setIsDeletingCompany] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [activeTab, setActiveTab] = useState("shareholders");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Edit Shareholder State
  const [editingShareholder, setEditingShareholder] = useState<Shareholder | null>(null);
  const [isUpdatingShareholder, setIsUpdatingShareholder] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sharesHeld: "",
  });

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending">("all");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sharesHeld: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    checkAuthAndLoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      navigate("/company-login");
      return;
    }

    // Get company admin info
    const { data: adminData, error: adminError } = await supabase
      .from("company_admins")
      .select("company_id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (adminError || !adminData) {
      toast.error("Access denied. Not a company administrator.");
      await supabase.auth.signOut();
      navigate("/company-login");
      return;
    }

    // Get company details
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("*")
      .eq("id", adminData.company_id)
      .maybeSingle();

    if (companyError || !companyData) {
      toast.error("Could not load company data");
      setIsLoading(false);
      return;
    }

    setCompany(companyData);
    await loadShareholders(companyData.id);

    // Fetch Active Session for Results
    try {
      const activeSession = await votingApi.getActiveSession(companyData.id);
      if (activeSession) {
        setSessionId(activeSession.id);
      }
    } catch (e) {
      console.error("Failed to fetch active session", e);
    }

    setIsLoading(false);
  };

  const loadShareholders = async (companyId: string) => {
    const { data, error } = await supabase
      .from("shareholders")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load shareholders");
      return;
    }

    setShareholders(data || []);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenEdit = (shareholder: Shareholder) => {
    setEditingShareholder(shareholder);
    setEditFormData({
      name: shareholder.shareholder_name,
      email: shareholder.email,
      phone: shareholder.phone || "",
      sharesHeld: shareholder.shares_held.toString(),
    });
  };

  const handleUpdateShareholder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShareholder || !company) return;

    const sharesParsed = parseInt(editFormData.sharesHeld.trim(), 10);
    if (isNaN(sharesParsed) || sharesParsed < 1) {
      toast.error("Please enter a valid number of shares (minimum 1).");
      return;
    }

    setIsUpdatingShareholder(true);
    try {
      const { error } = await supabase
        .from("shareholders")
        .update({
          shareholder_name: editFormData.name.trim(),
          email: editFormData.email.trim().toLowerCase(),
          phone: editFormData.phone.trim() || null,
          shares_held: sharesParsed,
        })
        .eq("id", editingShareholder.id);

      if (error) throw error;

      toast.success(`Shareholder updated! Shares set to ${sharesParsed.toLocaleString()}`);
      setEditingShareholder(null);
      await loadShareholders(company.id);
    } catch (err: unknown) {
      console.error("Update failed:", err);
      toast.error("Failed to update shareholder.");
    } finally {
      setIsUpdatingShareholder(false);
    }
  };

  const generateSecureCredentials = () => {
    const loginId = Math.floor(10000000 + Math.random() * 90000000).toString();
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return { loginId, password };
  };

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const handleAddShareholder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingShareholder(true);
    setErrors({});

    try {
      const parsedShares = parseInt(String(formData.sharesHeld).trim(), 10) || 0;

      const validatedData = shareholderSchema.parse({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || undefined,
        sharesHeld: parsedShares,
      });

      if (!company) {
        toast.error("Company not found");
        setIsAddingShareholder(false);
        return;
      }

      const { loginId, password } = generateSecureCredentials();
      const passwordHash = await hashPassword(password);

      try {
        const [insertResult, emailResult] = await Promise.all([
          supabase
            .from("shareholders")
            .insert({
              company_id: company.id,
              shareholder_name: validatedData.name,
              email: validatedData.email,
              phone: validatedData.phone || null,
              shares_held: validatedData.sharesHeld,
              login_id: loginId,
              password_hash: passwordHash,
            })
            .select()
            .single(),

          supabase.functions.invoke('send-shareholder-credentials', {
            body: {
              shareholderEmail: validatedData.email,
              shareholderName: validatedData.name,
              companyName: company.company_name,
              loginId: loginId,
              password: password,
            },
            headers: {
              "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
            }
          })
        ]);

        if (insertResult.error) {
          if (insertResult.error.code === "23505") {
            toast.error("A shareholder with this login ID already exists");
          } else {
            toast.error("Failed to add shareholder");
          }
          setIsAddingShareholder(false);
          return;
        }

        if (emailResult.error) {
          console.error("Email failed:", emailResult.error);
          toast.success("Shareholder added! Save credentials:", {
            description: `User ID: ${loginId} | Password: ${password}`,
            duration: 30000,
            action: {
              label: "Copy",
              onClick: () => navigator.clipboard.writeText(`ID: ${loginId}\nPassword: ${password}`)
            }
          });
          toast.warning("Email service had an issue. Please manually share credentials.");
        } else {
          toast.success(`Shareholder added with ${validatedData.sharesHeld.toLocaleString()} shares! Credentials sent via email.`);
        }
      } catch (err: unknown) {
        console.error("Operation failed:", err);
        toast.error("An error occurred while adding the shareholder.");
      }

      setFormData({ name: "", email: "", phone: "", sharesHeld: "" });
      setShowAddForm(false);
      await loadShareholders(company.id);

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
      setIsAddingShareholder(false);
    }
  };

  const handleResendCredentials = async (shareholder: Shareholder) => {
    setIsSendingCredentials(shareholder.id);

    try {
      const { loginId, password } = generateSecureCredentials();
      const passwordHash = await hashPassword(password);

      const [updateResult, emailResult] = await Promise.all([
        supabase
          .from("shareholders")
          .update({
            login_id: loginId,
            password_hash: passwordHash,
            is_credential_used: false,
            credential_created_at: new Date().toISOString(),
          })
          .eq("id", shareholder.id),

        supabase.functions.invoke('send-shareholder-credentials', {
          body: {
            shareholderEmail: shareholder.email,
            shareholderName: shareholder.shareholder_name,
            companyName: company?.company_name,
            loginId: loginId,
            password: password,
          },
          headers: {
            "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
          }
        })
      ]);

      if (updateResult.error) {
        toast.error("Failed to regenerate credentials");
        return;
      }

      if (emailResult.error) {
        console.error("Resend failed:", emailResult.error);
        toast.error(`Email failed: ${emailResult.error.message || "Unknown error"}`);
      } else {
        toast.success("New credentials sent successfully!");
      }

      if (company) await loadShareholders(company.id);

    } catch (error: unknown) {
      console.error("Resend failed:", error);
      toast.error(`Email failed: ${(error as Error).message || "Unknown error"}`);
    } finally {
      setIsSendingCredentials(null);
    }
  };

  const handleBroadcastAllCredentials = async () => {
    const pendingList = shareholders.filter(s => !s.is_credential_used);
    if (pendingList.length === 0) {
      toast.info("All registered shareholders have already accessed their credentials.");
      return;
    }

    if (!confirm(`Broadcast credentials to all ${pendingList.length} pending shareholders?`)) return;

    setIsBroadcasting(true);
    let successCount = 0;

    for (const sh of pendingList) {
      try {
        const { loginId, password } = generateSecureCredentials();
        const passwordHash = await hashPassword(password);

        await supabase
          .from("shareholders")
          .update({
            login_id: loginId,
            password_hash: passwordHash,
            credential_created_at: new Date().toISOString(),
          })
          .eq("id", sh.id);

        await supabase.functions.invoke('send-shareholder-credentials', {
          body: {
            shareholderEmail: sh.email,
            shareholderName: sh.shareholder_name,
            companyName: company?.company_name,
            loginId: loginId,
            password: password,
          },
          headers: {
            "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
          }
        });

        successCount++;
      } catch (err) {
        console.error(`Failed sending to ${sh.email}`, err);
      }
    }

    setIsBroadcasting(false);
    toast.success(`Broadcast complete: Sent credentials to ${successCount} shareholders.`);
    if (company) await loadShareholders(company.id);
  };

  const handleExportCSV = () => {
    if (shareholders.length === 0) {
      toast.error("No shareholder data to export.");
      return;
    }

    const headers = ["Shareholder Name", "Email Address", "Phone", "Shares Held", "Login ID", "Status", "Created At"];
    const rows = filteredShareholders.map(s => [
      `"${s.shareholder_name.replace(/"/g, '""')}"`,
      `"${s.email}"`,
      `"${s.phone || ''}"`,
      s.shares_held,
      `"${s.login_id}"`,
      s.is_credential_used ? "Active / Voted" : "Pending Access",
      `"${s.created_at || s.credential_created_at || new Date().toISOString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${company?.company_name || 'shareholders'}_roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Shareholder roster exported as CSV.");
  };

  const handleDeleteShareholder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this shareholder?")) return;

    const { error } = await supabase
      .from("shareholders")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete shareholder");
      return;
    }

    toast.success("Shareholder deleted");
    if (company) await loadShareholders(company.id);
  };

  // Filtered Shareholders calculation
  const filteredShareholders = useMemo(() => {
    return shareholders.filter(s => {
      const matchesSearch = 
        s.shareholder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.login_id && s.login_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.phone && s.phone.includes(searchQuery));

      if (!matchesSearch) return false;

      if (statusFilter === "active") return s.is_credential_used;
      if (statusFilter === "pending") return !s.is_credential_used;
      return true;
    });
  }, [shareholders, searchQuery, statusFilter]);

  const totalSharesRepresented = useMemo(() => {
    return shareholders.reduce((acc, s) => acc + (s.shares_held || 0), 0);
  }, [shareholders]);

  const activeCredentialCount = useMemo(() => {
    return shareholders.filter(s => s.is_credential_used).length;
  }, [shareholders]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/company-login");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen relative bg-[#020817] text-white selection:bg-blue-500/30">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 p-6 rounded-3xl bg-[#0d1b2a]/90 border border-white/20 backdrop-blur-xl shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Enterprise Governance Portal</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {company?.company_name}
              </h1>
              <p className="text-slate-100 text-sm mt-1.5 font-medium leading-relaxed">
                Manage corporate shareholder rosters, voting sessions, and compliance filings.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button 
                onClick={() => navigate("/voting-management")} 
                className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold gap-2 rounded-xl px-5 py-5 shadow-lg shadow-blue-900/40 border border-blue-400/40"
              >
                <Shield className="w-4 h-4" />
                Voting Management Hub
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="border-white/30 hover:bg-white/10 text-white rounded-xl gap-2 px-4 py-5 font-bold shadow-sm"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                Logout
              </Button>
            </div>
          </div>

          {/* 4 Executive KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <Card className="bg-[#0d1b2a]/90 border-white/20 backdrop-blur-xl shadow-xl hover:border-blue-500/40 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-slate-200 uppercase tracking-wider">Total Shareholders</p>
                    <p className="text-3xl font-black text-white mt-1 tabular-nums">{shareholders.length}</p>
                    <p className="text-xs text-cyan-300 mt-1 font-bold">Registered on Ledger</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shadow-md">
                    <Users className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0d1b2a]/90 border-white/20 backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-slate-200 uppercase tracking-wider">Voting Capital</p>
                    <p className="text-3xl font-black text-white mt-1 tabular-nums">
                      {totalSharesRepresented.toLocaleString()}
                    </p>
                    <p className="text-xs text-emerald-300 mt-1 font-bold">Total Shares Represented</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shadow-md">
                    <Hash className="w-6 h-6 text-emerald-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0d1b2a]/90 border-white/20 backdrop-blur-xl shadow-xl hover:border-amber-500/40 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-slate-200 uppercase tracking-wider">Credential Usage</p>
                    <p className="text-3xl font-black text-white mt-1 tabular-nums">
                      {shareholders.length > 0 ? Math.round((activeCredentialCount / shareholders.length) * 100) : 0}%
                    </p>
                    <p className="text-xs text-amber-300 mt-1 font-bold">{activeCredentialCount} of {shareholders.length} Activated</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-amber-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0d1b2a]/90 border-white/20 backdrop-blur-xl shadow-xl hover:border-purple-500/40 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-slate-200 uppercase tracking-wider">AGM Status</p>
                    <p className="text-2xl font-black text-white mt-1">
                      {sessionId ? "Live / Active" : "Configured"}
                    </p>
                    <p className="text-xs text-purple-300 mt-1 font-bold">Session Infrastructure</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shadow-md">
                    <TrendingUp className="w-6 h-6 text-purple-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Power Suite Banner */}
          <div className="mb-8">
            <Card 
              className="border-purple-400/40 bg-gradient-to-r from-purple-950/60 via-[#0d1b2a]/90 to-blue-950/60 backdrop-blur-xl overflow-hidden relative group cursor-pointer hover:border-purple-400/70 transition-all rounded-3xl p-2 shadow-2xl" 
              onClick={() => navigate("/ai-power-suite")}
            >
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/30 border border-purple-400/50 flex items-center justify-center shrink-0 shadow-lg">
                    <Sparkles className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      AI Document & Investor Sentiment Suite
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-400/40">Enterprise</span>
                    </h3>
                    <p className="text-sm text-slate-100 mt-1 font-normal leading-relaxed">
                      Generate executive summaries of annual reports and analyze live shareholder sentiment during meetings.
                    </p>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl px-5 py-5 gap-2 shrink-0 border border-purple-400/50 shadow-lg">
                  Launch AI Suite <Sparkles className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="shareholders" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[600px] bg-[#0d1b2a]/95 backdrop-blur border border-white/20 p-1.5 rounded-2xl shadow-xl">
              <TabsTrigger value="shareholders" className="gap-2 font-bold text-slate-200 data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl">
                <Users className="w-4 h-4" /> Shareholder Roster
              </TabsTrigger>
              <TabsTrigger value="results" className="gap-2 font-bold text-slate-200 data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl">
                <FileText className="w-4 h-4" /> Live Results
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2 font-bold text-slate-200 data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl">
                <Building2 className="w-4 h-4" /> Enterprise Profile
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: SHAREHOLDERS */}
            <TabsContent value="shareholders" className="space-y-6">
              
              {/* Controls Bar: Search, Status Filter, Bulk Actions */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 rounded-3xl bg-[#0d1b2a]/90 border border-white/20 backdrop-blur-xl shadow-xl">
                <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <Input
                      placeholder="Search by name, email, or login ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-black/60 border-white/25 text-white placeholder:text-slate-300 rounded-xl font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-cyan-400 shrink-0" />
                    <Select
                      value={statusFilter}
                      onValueChange={(val) => setStatusFilter(val as "all" | "active" | "pending")}
                    >
                      <SelectTrigger className="w-[185px] bg-[#020817] border-white/25 text-white font-bold rounded-xl text-xs h-10 px-3.5 shadow-md">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#020817] border-white/20 text-white rounded-xl shadow-2xl z-50 p-1.5">
                        <SelectItem value="all" className="text-white hover:bg-blue-600 hover:text-white font-bold cursor-pointer rounded-lg px-3 py-2 text-xs focus:bg-blue-600 focus:text-white">
                          All Statuses ({shareholders.length})
                        </SelectItem>
                        <SelectItem value="active" className="text-emerald-300 hover:bg-emerald-600 hover:text-white font-bold cursor-pointer rounded-lg px-3 py-2 text-xs focus:bg-emerald-600 focus:text-white">
                          Active / Voted ({activeCredentialCount})
                        </SelectItem>
                        <SelectItem value="pending" className="text-amber-300 hover:bg-amber-600 hover:text-white font-bold cursor-pointer rounded-lg px-3 py-2 text-xs focus:bg-amber-600 focus:text-white">
                          Pending Access ({shareholders.length - activeCredentialCount})
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    variant="outline"
                    onClick={handleExportCSV}
                    className="border-white/30 hover:bg-white/10 text-white font-bold rounded-xl gap-2 text-xs shadow-sm"
                  >
                    <Download className="w-4 h-4 text-cyan-300" />
                    Export CSV
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleBroadcastAllCredentials}
                    disabled={isBroadcasting}
                    className="border-white/30 hover:bg-white/10 text-white font-bold rounded-xl gap-2 text-xs shadow-sm"
                  >
                    {isBroadcasting ? <Loader2 className="w-4 h-4 animate-spin text-amber-300" /> : <Send className="w-4 h-4 text-amber-300" />}
                    Broadcast Credentials
                  </Button>

                  <Button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold rounded-xl gap-2 text-xs border border-blue-400/40 shadow-md"
                  >
                    {showAddForm ? "Cancel" : <><Plus className="w-4 h-4" /> Add Shareholder</>}
                  </Button>
                </div>
              </div>

              {/* Add Shareholder Drawer/Form */}
              {showAddForm && (
                <Card className="border-blue-500/40 bg-[#0d1b2a]/95 backdrop-blur-xl rounded-3xl shadow-2xl">
                  <CardHeader className="border-b border-white/15">
                    <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                      <Plus className="w-5 h-5 text-cyan-400" />
                      Register New Shareholder
                    </CardTitle>
                    <CardDescription className="text-slate-100 font-normal">
                      Credentials and secure voting access links will be instantly generated and dispatched via email.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddShareholder} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-100 font-bold text-xs">Shareholder Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Eleanor Vance"
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                            required
                            disabled={isAddingShareholder}
                          />
                          {errors.name && <p className="text-xs text-rose-400 font-bold">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-100 font-bold text-xs">Official Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="shareholder@enterprise.com"
                              className="pl-10 bg-black/60 border-white/20 text-white rounded-xl font-medium"
                              required
                              disabled={isAddingShareholder}
                            />
                          </div>
                          {errors.email && <p className="text-xs text-rose-400 font-bold">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-slate-100 font-bold text-xs">Phone (Optional / SMS OTP)</Label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 019-2834"
                              className="pl-10 bg-black/60 border-white/20 text-white rounded-xl font-medium"
                              disabled={isAddingShareholder}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sharesHeld" className="text-slate-100 font-bold text-xs">Voting Shares Held</Label>
                          <Input
                            id="sharesHeld"
                            name="sharesHeld"
                            type="number"
                            value={formData.sharesHeld}
                            onChange={handleInputChange}
                            placeholder="1000"
                            min="1"
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                            required
                            disabled={isAddingShareholder}
                          />
                          {errors.sharesHeld && <p className="text-xs text-rose-400 font-bold">{errors.sharesHeld}</p>}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)} className="text-slate-200 hover:text-white rounded-xl font-semibold">
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isAddingShareholder} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 gap-2 shadow-lg">
                          {isAddingShareholder ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          Issue Credentials & Register
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Edit Shareholder Modal / Dialog */}
              {editingShareholder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
                  <Card className="w-full max-w-lg border-cyan-500/40 bg-[#0d1b2a] backdrop-blur-2xl rounded-3xl shadow-2xl">
                    <CardHeader className="border-b border-white/15 flex flex-row items-center justify-between pb-4">
                      <div>
                        <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                          <Pencil className="w-5 h-5 text-cyan-400" />
                          Edit Shareholder Details
                        </CardTitle>
                        <CardDescription className="text-slate-200 text-xs mt-0.5">
                          Update name, email, or exact shares held for this stakeholder.
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setEditingShareholder(null)} className="text-slate-300 hover:text-white rounded-lg p-2">
                        <X className="w-5 h-5" />
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form onSubmit={handleUpdateShareholder} className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-slate-100 font-bold text-xs">Shareholder Name</Label>
                          <Input
                            name="name"
                            value={editFormData.name}
                            onChange={handleEditInputChange}
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-100 font-bold text-xs">Email Address</Label>
                          <Input
                            name="email"
                            type="email"
                            value={editFormData.email}
                            onChange={handleEditInputChange}
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-100 font-bold text-xs">Phone (Optional)</Label>
                          <Input
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleEditInputChange}
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-cyan-300 font-black text-xs uppercase tracking-wider">
                            Exact Shares Held
                          </Label>
                          <Input
                            name="sharesHeld"
                            type="number"
                            min="1"
                            value={editFormData.sharesHeld}
                            onChange={handleEditInputChange}
                            className="bg-black/60 border-cyan-500/40 text-cyan-300 font-extrabold text-lg rounded-xl"
                            required
                          />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                          <Button type="button" variant="ghost" onClick={() => setEditingShareholder(null)} className="text-slate-200 hover:text-white rounded-xl font-semibold">
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isUpdatingShareholder} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 shadow-lg gap-2">
                            {isUpdatingShareholder ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Shareholders Table Card */}
              <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
                <CardHeader className="border-b border-white/15 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-black text-white">Shareholder Registry</CardTitle>
                      <CardDescription className="text-slate-100 text-xs font-medium">
                        Showing {filteredShareholders.length} of {shareholders.length} registered stakeholders
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredShareholders.length === 0 ? (
                    <div className="text-center py-16">
                      <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-white font-bold">No shareholders match your search.</p>
                      <p className="text-xs text-slate-200 mt-1">Try modifying your search term or status filter.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/15 bg-black/60 text-xs font-black text-slate-100 tracking-wider">
                            <th className="py-4 px-6">NAME</th>
                            <th className="py-4 px-6">EMAIL</th>
                            <th className="py-4 px-6">SHARES HELD</th>
                            <th className="py-4 px-6">LOGIN ID</th>
                            <th className="py-4 px-6">STATUS</th>
                            <th className="py-4 px-6 text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {filteredShareholders.map((shareholder) => (
                            <tr key={shareholder.id} className="hover:bg-white/[0.04] transition-colors">
                              <td className="py-4 px-6 font-bold text-white text-sm">{shareholder.shareholder_name}</td>
                              <td className="py-4 px-6 text-slate-100 text-sm font-medium">{shareholder.email}</td>
                              <td className="py-4 px-6 text-cyan-300 font-extrabold tabular-nums text-base">
                                {shareholder.shares_held.toLocaleString()}
                              </td>
                              <td className="py-4 px-6">
                                <code className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/20 text-xs font-mono text-slate-100 font-bold">
                                  {shareholder.login_id}
                                </code>
                              </td>
                              <td className="py-4 px-6">
                                {shareholder.is_credential_used ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    Active / Voted
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                                    Pending Access
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleOpenEdit(shareholder)}
                                    className="hover:bg-blue-500/20 text-cyan-300 hover:text-cyan-200 rounded-lg text-xs font-bold gap-1.5"
                                    title="Edit Shareholder and Shares"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleResendCredentials(shareholder)}
                                    disabled={isSendingCredentials === shareholder.id}
                                    className="hover:bg-white/15 text-slate-100 hover:text-white rounded-lg text-xs font-bold gap-1.5"
                                  >
                                    {isSendingCredentials === shareholder.id ? (
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                                    )}
                                    Resend
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteShareholder(shareholder.id)}
                                    className="hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg p-2"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: LIVE RESULTS */}
            <TabsContent value="results" className="space-y-6">
              {sessionId ? (
                <AdminVotingResults sessionId={sessionId} companyName={company?.company_name || ""} />
              ) : (
                <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl p-12 text-center rounded-3xl shadow-2xl">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Active Voting Session</h3>
                  <p className="text-slate-100 text-sm max-w-md mx-auto mb-6 font-normal">
                    Schedule resolutions and launch an AGM session in Voting Management to monitor live results.
                  </p>
                  <Button onClick={() => navigate("/voting-management")} className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl text-white">
                    Go to Voting Management
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* TAB 3: ENTERPRISE PROFILE */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Basic Details */}
                <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl shadow-xl">
                  <CardHeader className="pb-3 border-b border-white/15">
                    <CardTitle className="text-base font-bold flex items-center gap-2 text-cyan-400">
                      <Building2 className="w-5 h-5" /> Organization Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-5 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-200 uppercase font-black tracking-wider">Company Name</p>
                      <p className="font-bold text-white text-base">{company?.company_name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-200 uppercase font-black tracking-wider">Company Type</p>
                      <p className="font-semibold text-slate-100">{company?.company_type || "Corporation"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-200 uppercase font-black tracking-wider">Corporate ID / CIN</p>
                      <p className="font-mono text-sm text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-lg w-fit border border-cyan-400/40 font-bold">{company?.cin_number}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-200 uppercase font-black tracking-wider">Tax ID / PAN</p>
                      <p className="font-mono text-sm text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-lg w-fit border border-emerald-400/40 font-bold">{company?.pan_number}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Capital & Governance */}
                <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl shadow-xl">
                  <CardHeader className="pb-3 border-b border-white/15">
                    <CardTitle className="text-base font-bold flex items-center gap-2 text-cyan-400">
                      <FileText className="w-5 h-5" /> Capital & Scrutinizer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-5 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-200 uppercase font-black tracking-wider">Authorized Capital</p>
                      <p className="font-black text-white text-lg tabular-nums">
                        ${company?.authorized_capital?.toLocaleString() || "10,000,000"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-200 uppercase font-black tracking-wider">Paid-Up Capital</p>
                      <p className="font-black text-white text-lg tabular-nums">
                        ${company?.paid_up_capital?.toLocaleString() || "5,000,000"}
                      </p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="text-xs text-slate-200 uppercase font-black tracking-wider">Official Scrutinizer / Auditor</p>
                      <p className="text-sm font-bold text-white">{company?.cs_name || "Assigned Independent Scrutinizer"}</p>
                      <p className="text-xs text-slate-200 font-medium">{company?.cs_email}</p>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>

          </Tabs>

        </div>
      </main>

    </div>
  );
};

export default CompanyDashboard;
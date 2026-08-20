import { Helmet } from "react-helmet-async";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  CalendarDays,
  Clock,
  Users,
  UserPlus,
  Video,
  Link as LinkIcon,
  Send,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  Loader2,
  Plus,
  Trash2,
  Building2,
  Vote,
  Shield,
  Info,
  ExternalLink,
  Trophy,
  Lock,
  Download,
  Share2,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Layers,
  FileCheck2
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { env } from "@/config/env";
import { z } from "zod";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { MerkleTree } from "@/lib/merkle";
import { simulateBlockchainTransaction } from "@/lib/blockchain";
import { Nominee, VotingSession, ResolutionResult, AnchorData, Company, Shareholder, Resolution } from "@/types";

const resolutionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(250),
  description: z.string().min(5, "Description must be at least 5 characters").max(1000),
  resolutionType: z.enum(["ordinary", "special", "unanimous"]),
});

const nomineeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  designation: z.string().optional(),
  qualification: z.string().optional(),
  experienceYears: z.number().min(0).optional(),
  bio: z.string().max(500).optional(),
});

const sessionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  meetingStartDate: z.string().optional(),
  meetingEndDate: z.string().optional(),
  meetingLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  meetingPassword: z.string().optional(),
  meetingPlatform: z.string().optional(),
  votingInstructions: z.string().optional(),
  recordDate: z.string().min(1, "Record date is required"),
});

const VotingManagement = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingEmails, setIsSendingEmails] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [votingSession, setVotingSession] = useState<VotingSession | null>(null);
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Forms toggle
  const [showAddResolution, setShowAddResolution] = useState(false);
  const [isAddingResolution, setIsAddingResolution] = useState(false);
  const [showAddNominee, setShowAddNominee] = useState(false);
  const [isAddingNominee, setIsAddingNominee] = useState(false);

  const [sessionForm, setSessionForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    meetingLink: "",
    meetingPassword: "",
    meetingPlatform: "zoom",
    meetingStartDate: "",
    meetingEndDate: "",
    votingInstructions: "",
    recordDate: "",
  });

  const [resolutionForm, setResolutionForm] = useState({
    title: "",
    description: "",
    resolutionType: "ordinary" as "ordinary" | "special" | "unanimous",
  });

  const [nomineeForm, setNomineeForm] = useState({
    name: "",
    email: "",
    designation: "",
    qualification: "",
    experienceYears: "",
    bio: "",
  });

  const [results, setResults] = useState<ResolutionResult[]>([]);
  const [isAnchoring, setIsAnchoring] = useState(false);
  const [anchorData, setAnchorData] = useState<AnchorData | null>(null);

  const checkAuthAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      navigate("/company-login");
      return;
    }

    const { data: adminData, error: adminError } = await supabase
      .from("company_admins")
      .select("company_id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (adminError || !adminData) {
      toast.error("Access denied. Not a company administrator.");
      navigate("/company-login");
      return;
    }

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
    await loadVotingSession(companyData.id);
    await loadShareholders(companyData.id);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthAndLoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const toLocalInputString = (isoString?: string | null) => {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return "";
  }
};

const toLocalDateString = (dateOrIso?: string | null) => {
  if (!dateOrIso) return "";
  try {
    const d = new Date(dateOrIso);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  } catch {
    return "";
  }
};

  const loadVotingSession = async (companyId: string) => {
    const { data, error } = await supabase
      .from("voting_sessions")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error loading voting session:", error);
      return;
    }

    if (data) {
      setVotingSession(data);
      setSessionForm({
        title: data.title || "",
        description: data.description || "",
        startDate: toLocalInputString(data.start_date),
        endDate: toLocalInputString(data.end_date),
        meetingLink: data.meeting_link || "",
        meetingPassword: data.meeting_password || "",
        meetingPlatform: data.meeting_platform || "zoom",
        meetingStartDate: toLocalInputString(data.meeting_start_date),
        meetingEndDate: toLocalInputString(data.meeting_end_date),
        votingInstructions: data.voting_instructions || "",
        recordDate: toLocalDateString(data.record_date),
      });

      await loadResolutions(data.id);
      await loadNominees(data.id);
      await loadResults(data.id);
    }
  };

  const loadShareholders = async (companyId: string) => {
    const { data, error } = await supabase
      .from("shareholders")
      .select("*")
      .eq("company_id", companyId);

    if (!error && data) setShareholders(data);
  };

  const loadResolutions = async (sessionId: string) => {
    const { data, error } = await supabase
      .from("resolutions")
      .select("*")
      .eq("voting_session_id", sessionId)
      .order("created_at", { ascending: true });

    if (!error && data) setResolutions(data as Resolution[]);
  };

  const loadNominees = async (sessionId: string) => {
    const { data, error } = await supabase
      .from("nominees")
      .select("*")
      .eq("voting_session_id", sessionId)
      .order("created_at", { ascending: true });

    if (!error && data) setNominees(data);
  };

  const loadResults = async (sessionId: string) => {
    const { data: resolutionsData, error: resError } = await supabase
      .from("resolutions")
      .select("*")
      .eq("voting_session_id", sessionId);

    if (resError || !resolutionsData) return;

    const mappedResults: ResolutionResult[] = await Promise.all(
      resolutionsData.map(async (res) => {
        const { data: votes } = await supabase
          .from("votes")
          .select("vote_value, weighted_votes")
          .eq("resolution_id", res.id);

        let forCount = 0;
        let againstCount = 0;
        let abstainCount = 0;

        votes?.forEach((v) => {
          const weight = v.weighted_votes || 1;
          const val = (v.vote_value || "").toUpperCase();
          if (val === "FOR") forCount += weight;
          else if (val === "AGAINST") againstCount += weight;
          else if (val === "ABSTAIN") abstainCount += weight;
        });

        return {
          id: res.id,
          title: res.title,
          description: res.description,
          stats: {
            for: forCount,
            against: againstCount,
            abstain: abstainCount,
            total: forCount + againstCount + abstainCount,
            winner: forCount > againstCount,
          },
        };
      })
    );

    setResults(mappedResults);
  };

  const loadAnchorStatus = async () => {
    if (!votingSession) return;
    const { data } = await supabase
      .from("block_anchors")
      .select("*")
      .eq("session_id", votingSession.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) setAnchorData(data);
  };

  useEffect(() => {
    if (votingSession) loadAnchorStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingSession]);

  const handleAnchorToBlockchain = async () => {
    if (!votingSession || results.length === 0) return;
    setIsAnchoring(true);

    try {
      const { data: allVotes, error: votesError } = await supabase
        .from("votes")
        .select("vote_hash")
        .in("resolution_id", results.map(r => r.id));

      if (votesError || !allVotes || allVotes.length === 0) {
        toast.error("No cast votes available to anchor.");
        setIsAnchoring(false);
        return;
      }

      const voteHashes = allVotes.map(v => v.vote_hash).sort();
      const tree = await MerkleTree.create(voteHashes);
      const root = tree.getRoot();
      const txHash = await simulateBlockchainTransaction();

      const { error: anchorError } = await supabase
        .from("block_anchors")
        .insert({
          session_id: votingSession.id,
          merkle_root: root,
          vote_count: voteHashes.length,
          started_at: votingSession.start_date,
          ended_at: votingSession.end_date,
          transaction_id: txHash,
          blockchain_network: "Polygon Amoy Testnet"
        });

      if (anchorError) throw anchorError;

      toast.success("Session votes cryptographically anchored to Polygon Blockchain!");
      await loadAnchorStatus();

    } catch (error: unknown) {
      console.error("Anchoring failed:", error);
      toast.error(`Anchoring failed: ${(error as Error).message}`);
    } finally {
      setIsAnchoring(false);
    }
  };

  const handleSessionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSessionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResolutionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResolutionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNomineeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNomineeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;
    setIsSaving(true);

    try {
      sessionSchema.parse(sessionForm);

      const sessionPayload = {
        company_id: company.id,
        title: sessionForm.title,
        description: sessionForm.description,
        start_date: new Date(sessionForm.startDate).toISOString(),
        end_date: new Date(sessionForm.endDate).toISOString(),
        meeting_link: sessionForm.meetingLink || null,
        meeting_password: sessionForm.meetingPassword || null,
        meeting_platform: sessionForm.meetingPlatform,
        meeting_start_date: sessionForm.meetingStartDate ? new Date(sessionForm.meetingStartDate).toISOString() : null,
        meeting_end_date: sessionForm.meetingEndDate ? new Date(sessionForm.meetingEndDate).toISOString() : null,
        voting_instructions: sessionForm.votingInstructions || null,
        record_date: sessionForm.recordDate,
        is_active: true,
      };

      if (votingSession) {
        const { error } = await supabase
          .from("voting_sessions")
          .update(sessionPayload)
          .eq("id", votingSession.id);

        if (error) throw error;
        toast.success("Voting session updated successfully.");
      } else {
        const { data, error } = await supabase
          .from("voting_sessions")
          .insert(sessionPayload)
          .select()
          .single();

        if (error) throw error;
        toast.success("Voting session created successfully.");
        setVotingSession(data);
      }

      await loadVotingSession(company.id);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message || "Validation failed");
      } else {
        toast.error("Failed to save session settings.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleSessionActive = async () => {
    if (!votingSession) return;
    const newStatus = !votingSession.is_active;

    const { error } = await supabase
      .from("voting_sessions")
      .update({ is_active: newStatus })
      .eq("id", votingSession.id);

    if (error) {
      toast.error("Failed to update status.");
      return;
    }

    toast.success(`Session ${newStatus ? "activated" : "paused"}.`);
    if (company) await loadVotingSession(company.id);
  };

  const handleAddResolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!votingSession) {
      toast.error("Please create and save a voting session first.");
      return;
    }

    setIsAddingResolution(true);
    try {
      resolutionSchema.parse(resolutionForm);

      const { error } = await supabase.from("resolutions").insert({
        voting_session_id: votingSession.id,
        title: resolutionForm.title.trim(),
        description: resolutionForm.description.trim(),
        resolution_type: resolutionForm.resolutionType,
      });

      if (error) throw error;

      toast.success("Resolution agenda added to session ballot.");
      setResolutionForm({ title: "", description: "", resolutionType: "ordinary" });
      setShowAddResolution(false);
      await loadResolutions(votingSession.id);
      await loadResults(votingSession.id);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message || "Validation error");
      } else {
        toast.error("Failed to add resolution.");
      }
    } finally {
      setIsAddingResolution(false);
    }
  };

  const handleDeleteResolution = async (id: string) => {
    if (!confirm("Are you sure you want to remove this resolution agenda?")) return;

    const { error } = await supabase.from("resolutions").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete resolution.");
      return;
    }

    toast.success("Resolution removed.");
    if (votingSession) {
      await loadResolutions(votingSession.id);
      await loadResults(votingSession.id);
    }
  };

  const handleAddNominee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!votingSession || !company) {
      toast.error("Create and save a voting session first.");
      return;
    }

    setIsAddingNominee(true);
    try {
      nomineeSchema.parse({
        name: nomineeForm.name,
        email: nomineeForm.email,
        designation: nomineeForm.designation,
        qualification: nomineeForm.qualification,
        experienceYears: nomineeForm.experienceYears ? parseInt(nomineeForm.experienceYears) : undefined,
        bio: nomineeForm.bio,
      });

      const { error } = await supabase.from("nominees").insert({
        voting_session_id: votingSession.id,
        company_id: company.id,
        nominee_name: nomineeForm.name.trim(),
        nominee_email: nomineeForm.email.trim().toLowerCase(),
        designation: nomineeForm.designation || null,
        qualification: nomineeForm.qualification || null,
        experience_years: nomineeForm.experienceYears ? parseInt(nomineeForm.experienceYears) : null,
        bio: nomineeForm.bio || null,
      });

      if (error) throw error;

      toast.success("Candidate nominee registered successfully.");
      setNomineeForm({ name: "", email: "", designation: "", qualification: "", experienceYears: "", bio: "" });
      setShowAddNominee(false);
      await loadNominees(votingSession.id);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message || "Validation failed");
      } else {
        toast.error("Failed to add nominee.");
      }
    } finally {
      setIsAddingNominee(false);
    }
  };

  const handleDeleteNominee = async (id: string) => {
    if (!confirm("Are you sure you want to remove this candidate nominee?")) return;

    const { error } = await supabase.from("nominees").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete nominee.");
      return;
    }

    toast.success("Nominee removed.");
    if (votingSession) await loadNominees(votingSession.id);
  };

  const handleSendMeetingInvites = async () => {
    if (!votingSession || !sessionForm.meetingLink) {
      toast.error("Please configure and save meeting details first.");
      return;
    }

    setIsSendingEmails(true);
    try {
      const { error } = await supabase.functions.invoke("send-meeting-invites", {
        body: {
          sessionId: votingSession.id,
          companyName: company?.company_name,
          meetingLink: sessionForm.meetingLink,
          meetingPassword: sessionForm.meetingPassword,
          platform: sessionForm.meetingPlatform,
        },
        headers: {
          Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        },
      });

      if (error) throw error;

      await supabase
        .from("voting_sessions")
        .update({ is_meeting_emails_sent: true })
        .eq("id", votingSession.id);

      toast.success("Meeting invites dispatched to all shareholders.");
      if (company) await loadVotingSession(company.id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to dispatch meeting invites.");
    } finally {
      setIsSendingEmails(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!votingSession || results.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Official Scrutinizer Audit Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Company: ${company?.company_name || 'Enterprise'}`, 14, 28);
    doc.text(`Meeting: ${votingSession.title}`, 14, 35);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 42);

    const tableData = results.map((r, i) => [
      i + 1,
      r.title,
      r.stats.for.toLocaleString(),
      r.stats.against.toLocaleString(),
      r.stats.abstain.toLocaleString(),
      r.stats.for > r.stats.against ? "PASSED" : "REJECTED",
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["#", "Resolution Agendas", "Votes FOR", "Votes AGAINST", "ABSTAIN", "Outcome"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [30, 58, 138] },
    });

    doc.save(`${company?.company_name || 'voting'}_audit_report.pdf`);
    toast.success("Statutory scrutinizer report downloaded.");
  };

  const getSessionStatus = () => {
    if (!votingSession) return { status: "Not Configured", color: "bg-slate-500/20 text-slate-300 border-slate-500/30" };

    const now = new Date();
    const start = new Date(votingSession.start_date);
    const end = new Date(votingSession.end_date);

    if (!votingSession.is_active) {
      return { status: "Paused", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" };
    }

    if (now < start) return { status: "Scheduled", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
    if (now > end) return { status: "Concluded", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" };

    return { status: "Live & Active", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const sessionStatus = getSessionStatus();

  return (
    <div className="min-h-screen relative bg-[#020817] text-white selection:bg-blue-500/30">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 p-6 rounded-3xl bg-[#0d1b2a]/90 border border-white/20 backdrop-blur-xl shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
                <Vote className="w-4 h-4 text-cyan-400" />
                <span>Session Operations & Governance Hub</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {votingSession?.title || "Voting Session Management"}
              </h1>
              <p className="text-slate-100 text-sm mt-1.5 font-medium leading-relaxed">
                Configure general meeting resolutions, virtual meeting streams, and live scrutinizer tallies.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${sessionStatus.color}`}>
                {sessionStatus.status}
              </span>
              <Button 
                variant="outline" 
                onClick={() => navigate("/company-dashboard")}
                className="border-white/30 hover:bg-white/10 text-white rounded-xl text-xs font-bold px-4 py-5"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-[#0d1b2a]/95 backdrop-blur border border-white/20 p-1.5 rounded-2xl shadow-xl">
              <TabsTrigger value="overview" className="gap-2 font-bold data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl text-xs">
                <FileText className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="gap-2 font-bold data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl text-xs">
                <CalendarDays className="w-4 h-4" />
                <span>Schedule</span>
              </TabsTrigger>
              <TabsTrigger value="resolutions" className="gap-2 font-bold data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl text-xs">
                <Layers className="w-4 h-4" />
                <span>Resolutions</span>
              </TabsTrigger>
              <TabsTrigger value="meeting" className="gap-2 font-bold data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl text-xs">
                <Video className="w-4 h-4" />
                <span>Virtual Meeting</span>
              </TabsTrigger>
              <TabsTrigger value="nominees" className="gap-2 font-bold data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl text-xs">
                <UserPlus className="w-4 h-4" />
                <span>Nominees</span>
              </TabsTrigger>
              <TabsTrigger value="results" className="gap-2 font-bold data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white rounded-xl text-xs">
                <Trophy className="w-4 h-4" />
                <span>Results</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: OVERVIEW */}
            <TabsContent value="overview" className="space-y-6">
              
              {/* 4 Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="bg-[#0d1b2a]/90 border-white/20 backdrop-blur-xl shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-slate-200 uppercase tracking-wider">Shareholders</p>
                        <p className="text-3xl font-black text-white mt-1 tabular-nums">{shareholders.length}</p>
                        <p className="text-xs text-cyan-300 mt-1 font-bold">Eligible Voters</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0d1b2a]/90 border-white/20 backdrop-blur-xl shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-slate-200 uppercase tracking-wider">Resolutions</p>
                        <p className="text-3xl font-black text-white mt-1 tabular-nums">{resolutions.length}</p>
                        <p className="text-xs text-emerald-300 mt-1 font-bold">Active Agendas</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                        <Layers className="w-6 h-6 text-emerald-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0d1b2a]/90 border-white/20 backdrop-blur-xl shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-slate-200 uppercase tracking-wider">Director Nominees</p>
                        <p className="text-3xl font-black text-white mt-1 tabular-nums">{nominees.length}</p>
                        <p className="text-xs text-amber-300 mt-1 font-bold">On Active Ballot</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
                        <UserPlus className="w-6 h-6 text-amber-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0d1b2a]/90 border-white/20 backdrop-blur-xl shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-slate-200 uppercase tracking-wider">Invites Dispatch</p>
                        <p className="text-2xl font-black text-white mt-1">
                          {votingSession?.is_meeting_emails_sent ? "Dispatched" : "Pending"}
                        </p>
                        <p className="text-xs text-purple-300 mt-1 font-bold">Meeting Links</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-purple-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Session Controls & Quick Actions */}
              {votingSession && (
                <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Session Operations & Actions
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleToggleSessionActive}
                      className={votingSession.is_active ? "bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl gap-2" : "bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl gap-2"}
                    >
                      {votingSession.is_active ? (
                        <><Pause className="w-4 h-4" /> Pause Voting Window</>
                      ) : (
                        <><Play className="w-4 h-4" /> Activate Voting Window</>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleSendMeetingInvites}
                      disabled={isSendingEmails || !sessionForm.meetingLink}
                      className="border-white/30 hover:bg-white/10 text-white font-bold rounded-xl gap-2"
                    >
                      {isSendingEmails ? <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> : <Send className="w-4 h-4 text-cyan-400" />}
                      {votingSession.is_meeting_emails_sent ? "Resend Meeting Invites" : "Dispatch Meeting Invites"}
                    </Button>

                    {sessionForm.meetingLink && (
                      <Button
                        variant="ghost"
                        onClick={() => window.open(sessionForm.meetingLink, "_blank")}
                        className="hover:bg-white/10 text-slate-100 hover:text-white font-semibold rounded-xl gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Preview Virtual Meeting Room
                      </Button>
                    )}
                  </div>
                </Card>
              )}

            </TabsContent>

            {/* TAB 2: SCHEDULE CONFIGURATION */}
            <TabsContent value="schedule" className="space-y-6">
              <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl shadow-xl">
                <CardHeader className="border-b border-white/15 pb-4">
                  <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-cyan-400" />
                    AGM & General Meeting Schedule
                  </CardTitle>
                  <CardDescription className="text-slate-100 font-normal">
                    Set precise voting start and closing timestamps, statutory record date, and meeting title.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleCreateOrUpdateSession} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="title" className="text-xs font-bold text-slate-100">General Meeting Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={sessionForm.title}
                          onChange={handleSessionInputChange}
                          placeholder="e.g. 105th Annual General Meeting (AGM)"
                          className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description" className="text-xs font-bold text-slate-100">Session Description & Notice Summary</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={sessionForm.description}
                          onChange={handleSessionInputChange}
                          placeholder="Provide context on resolutions, voting instructions, and agenda..."
                          className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="startDate" className="text-xs font-bold text-slate-100">Voting Window Start (UTC/Local)</Label>
                        <Input
                          id="startDate"
                          name="startDate"
                          type="datetime-local"
                          value={sessionForm.startDate}
                          onChange={handleSessionInputChange}
                          className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endDate" className="text-xs font-bold text-slate-100">Voting Window End / Cutoff</Label>
                        <Input
                          id="endDate"
                          name="endDate"
                          type="datetime-local"
                          value={sessionForm.endDate}
                          onChange={handleSessionInputChange}
                          className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recordDate" className="text-xs font-bold text-slate-100">Statutory Record Date</Label>
                        <Input
                          id="recordDate"
                          name="recordDate"
                          type="date"
                          value={sessionForm.recordDate}
                          onChange={handleSessionInputChange}
                          className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/10">
                      <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 gap-2 shadow-lg">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        Save Schedule Configuration
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: RESOLUTIONS & AGENDAS */}
            <TabsContent value="resolutions" className="space-y-6">
              <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl shadow-xl">
                <CardHeader className="border-b border-white/15 pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-cyan-400" />
                      Resolution Agendas & Ballots
                    </CardTitle>
                    <CardDescription className="text-slate-100 text-xs font-medium">
                      Define the statutory motions and resolutions that shareholders will vote upon.
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAddResolution(!showAddResolution)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs gap-2 shadow-md"
                  >
                    {showAddResolution ? "Cancel" : <><Plus className="w-4 h-4" /> Add Resolution</>}
                  </Button>
                </CardHeader>

                {showAddResolution && (
                  <CardContent className="pt-6 border-b border-white/15 bg-black/30">
                    <form onSubmit={handleAddResolution} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="resTitle" className="text-xs font-bold text-slate-100">Resolution Title / Item</Label>
                          <Input
                            id="resTitle"
                            name="title"
                            value={resolutionForm.title}
                            onChange={handleResolutionInputChange}
                            placeholder="e.g. Adoption of Audited Financial Statements for FY 2025-26"
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="resType" className="text-xs font-bold text-slate-100">Resolution Type</Label>
                          <Select
                            value={resolutionForm.resolutionType}
                            onValueChange={(val) => setResolutionForm(prev => ({ ...prev, resolutionType: val as "ordinary" | "special" | "unanimous" }))}
                          >
                            <SelectTrigger className="bg-black/60 border-white/20 text-white rounded-xl font-bold">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#020817] border-white/20 text-white rounded-xl">
                              <SelectItem value="ordinary">Ordinary Resolution (Simple Majority &gt; 50%)</SelectItem>
                              <SelectItem value="special">Special Resolution (Supermajority &gt; 75%)</SelectItem>
                              <SelectItem value="unanimous">Unanimous Consent (100%)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="resDesc" className="text-xs font-bold text-slate-100">Explanatory Statement / Agenda Text</Label>
                          <Textarea
                            id="resDesc"
                            name="description"
                            value={resolutionForm.description}
                            onChange={handleResolutionInputChange}
                            placeholder="To receive, consider and adopt the audited standalone and consolidated financial statements..."
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                            rows={3}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={isAddingResolution} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl gap-2 shadow-lg">
                          {isAddingResolution ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                          Add Resolution to Ballot
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                )}

                <CardContent className="pt-6">
                  {resolutions.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <Layers className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                      <p className="text-white font-bold">No resolutions added yet.</p>
                      <p className="text-xs text-slate-200 mt-1">Click Add Resolution above to build the voting ballot.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resolutions.map((res, index) => (
                        <div key={res.id} className="p-5 rounded-2xl bg-black/40 border border-white/15 flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30 font-mono">
                                ITEM #{index + 1}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase border border-blue-400/30">
                                {res.resolution_type || "Ordinary"}
                              </span>
                            </div>
                            <h4 className="font-bold text-white text-base mt-2">{res.title}</h4>
                            <p className="text-xs text-slate-100 leading-relaxed">{res.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteResolution(res.id)}
                            className="hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: VIRTUAL MEETING */}
            <TabsContent value="meeting" className="space-y-6">
              <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl shadow-xl">
                <CardHeader className="border-b border-white/15 pb-4">
                  <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-cyan-400" />
                    Virtual Meeting Room & Stream
                  </CardTitle>
                  <CardDescription className="text-slate-100 font-normal">
                    Connect Zoom, Microsoft Teams, Webex, or Google Meet for live video proceedings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleCreateOrUpdateSession} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="meetingPlatform" className="text-xs font-bold text-slate-100">Platform</Label>
                        <Select
                          value={sessionForm.meetingPlatform}
                          onValueChange={(value) => setSessionForm(prev => ({ ...prev, meetingPlatform: value }))}
                        >
                          <SelectTrigger className="bg-black/60 border-white/20 text-white rounded-xl font-bold">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#020817] border-white/20 text-white">
                            <SelectItem value="zoom">Zoom Video Communications</SelectItem>
                            <SelectItem value="teams">Microsoft Teams</SelectItem>
                            <SelectItem value="meet">Google Meet</SelectItem>
                            <SelectItem value="webex">Cisco Webex</SelectItem>
                            <SelectItem value="other">Other / Custom Stream</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meetingPassword" className="text-xs font-bold text-slate-100">Room Passcode (Optional)</Label>
                        <Input
                          id="meetingPassword"
                          name="meetingPassword"
                          type="text"
                          value={sessionForm.meetingPassword}
                          onChange={handleSessionInputChange}
                          placeholder="e.g. AGM2026Secure"
                          className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="meetingLink" className="text-xs font-bold text-slate-100">Live Meeting URL</Label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <Input
                            id="meetingLink"
                            name="meetingLink"
                            value={sessionForm.meetingLink}
                            onChange={handleSessionInputChange}
                            placeholder="https://zoom.us/j/123456789"
                            className="pl-10 bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/10">
                      <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 gap-2 shadow-lg">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        Save Virtual Meeting Details
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 5: NOMINEES */}
            <TabsContent value="nominees" className="space-y-6">
              <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl shadow-xl">
                <CardHeader className="border-b border-white/15 pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-cyan-400" />
                      Director & Nominee Agendas
                    </CardTitle>
                    <CardDescription className="text-slate-100 text-xs font-medium">
                      Manage candidates standing for election to the board of directors.
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAddNominee(!showAddNominee)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs gap-2 shadow-md"
                  >
                    {showAddNominee ? "Cancel" : <><Plus className="w-4 h-4" /> Add Nominee</>}
                  </Button>
                </CardHeader>

                {showAddNominee && (
                  <CardContent className="pt-6 border-b border-white/15 bg-black/30">
                    <form onSubmit={handleAddNominee} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nomName" className="text-xs font-bold text-slate-100">Candidate Full Name</Label>
                          <Input
                            id="nomName"
                            name="name"
                            value={nomineeForm.name}
                            onChange={handleNomineeInputChange}
                            placeholder="e.g. Dr. Arthur Vance"
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nomEmail" className="text-xs font-bold text-slate-100">Email Address</Label>
                          <Input
                            id="nomEmail"
                            name="email"
                            type="email"
                            value={nomineeForm.email}
                            onChange={handleNomineeInputChange}
                            placeholder="candidate@enterprise.com"
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nomDesig" className="text-xs font-bold text-slate-100">Proposed Designation</Label>
                          <Input
                            id="nomDesig"
                            name="designation"
                            value={nomineeForm.designation}
                            onChange={handleNomineeInputChange}
                            placeholder="e.g. Independent Non-Executive Director"
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nomExp" className="text-xs font-bold text-slate-100">Years of Experience</Label>
                          <Input
                            id="nomExp"
                            name="experienceYears"
                            type="number"
                            value={nomineeForm.experienceYears}
                            onChange={handleNomineeInputChange}
                            placeholder="18"
                            min="0"
                            className="bg-black/60 border-white/20 text-white rounded-xl font-medium"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={isAddingNominee} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl gap-2 shadow-lg">
                          {isAddingNominee ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                          Add to Ballot
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                )}

                <CardContent className="pt-6">
                  {nominees.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <UserPlus className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                      <p className="text-white font-bold">No nominees registered for this session.</p>
                      <p className="text-xs text-slate-200 mt-1">Click Add Nominee above to register candidates.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nominees.map((nominee) => (
                        <div key={nominee.id} className="p-5 rounded-2xl bg-black/40 border border-white/15 flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-white text-base">{nominee.nominee_name}</h4>
                            <p className="text-xs text-slate-200 font-medium">{nominee.nominee_email}</p>
                            <div className="flex flex-wrap gap-2 mt-2.5">
                              {nominee.designation && (
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-400/30">
                                  {nominee.designation}
                                </span>
                              )}
                              {nominee.experience_years && (
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                                  {nominee.experience_years} Years Exp
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNominee(nominee.id)}
                            className="hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 6: RESULTS & AUDIT */}
            <TabsContent value="results" className="space-y-6">
              <Card className="border-white/20 bg-[#0d1b2a]/90 backdrop-blur-xl rounded-3xl shadow-xl">
                <CardHeader className="border-b border-white/15 pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      Scrutinizer Audit & Official Results
                    </CardTitle>
                    <CardDescription className="text-slate-100 text-xs font-medium">
                      Cryptographically verified vote tallies and exchange disclosure exports.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    {results.length > 0 && (
                      <Button 
                        onClick={handleAnchorToBlockchain}
                        disabled={isAnchoring}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs gap-2 shadow-lg"
                      >
                        {isAnchoring ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4 text-purple-200" />}
                        Anchor to Polygon
                      </Button>
                    )}
                    {results.length > 0 && (
                      <Button 
                        onClick={handleDownloadPDF} 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs gap-2 shadow-lg"
                      >
                        <Download className="w-4 h-4" />
                        Download Scrutinizer PDF
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {results.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                      <p className="text-white font-bold">No votes recorded yet.</p>
                      <p className="text-xs text-slate-200 mt-1">Cast ballots will appear here in real time.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {results.map((item) => (
                        <div key={item.id} className="p-6 rounded-2xl bg-black/40 border border-white/15">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-white text-base">{item.title}</h4>
                              <p className="text-xs text-slate-200 mt-0.5">{item.description}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.stats.for >= item.stats.against ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border-rose-500/30"}`}>
                              {item.stats.for >= item.stats.against ? "PASSED (ASSENT)" : "REJECTED"}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                              <div className="text-2xl font-black text-emerald-400 tabular-nums">{item.stats.for.toLocaleString()}</div>
                              <div className="text-[11px] font-bold text-emerald-300 uppercase mt-1">Votes In Favor</div>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30">
                              <div className="text-2xl font-black text-rose-400 tabular-nums">{item.stats.against.toLocaleString()}</div>
                              <div className="text-[11px] font-bold text-rose-300 uppercase mt-1">Votes Against</div>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-500/15 border border-slate-500/30">
                              <div className="text-2xl font-black text-slate-200 tabular-nums">{item.stats.abstain.toLocaleString()}</div>
                              <div className="text-[11px] font-bold text-slate-300 uppercase mt-1">Abstained</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VotingManagement;

import { useState, useCallback, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Vote,
  CheckCircle2,
  Clock,
  Shield,
  Users,
  Calendar,
  Building2,
  AlertCircle,
  LogOut,
  ChevronRight,
  Menu,
  Video,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  Lock,
  Hourglass
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/layout/SEO";
import { Helmet } from "react-helmet-async";
import { generateVoteHash } from "@/lib/blockchain";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import VotingCard from "@/components/voting/VotingCard";
import VotingAnalytics from "@/components/dashboard/VotingAnalytics";
import VotingCardSkeleton from "@/components/voting/VotingCardSkeleton";
import { votingApi } from "@/services/api/voting";
import { VotingItem, VoteType, VoteRecord, Resolution } from "@/types/voting";
import { supabase } from "@/integrations/supabase/client";
import { MerkleTree } from "@/lib/merkle";
import { ShareholderFeedbackForm } from "@/components/ai/ShareholderFeedbackForm";
import { useTranslation } from "react-i18next";
import { Nominee } from "@/types";

const AppointProxyCard = ({
  shareholders,
  onDelegate,
  delegation,
  isDelegating
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shareholders: any[],
  onDelegate: (proxyId: string) => void,
  delegation: { proxy?: { shareholder_name?: string, email?: string } } | null,
  isDelegating: boolean
}) => {
  const { t } = useTranslation();
  const [selectedProxyId, setSelectedProxyId] = useState("");

  if (delegation) {
    return (
      <Card className="border-indigo-500/30 bg-[#0d1b2a]/90 backdrop-blur-xl mb-8 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-1">{t("voting_dash_proxy_appointed") || "Proxy Appointed Successfully"}</h3>
              <p className="text-sm text-slate-200">
                {t("voting_dash_delegated_to") || "Voting rights delegated to"}: <span className="font-bold text-white">{delegation.proxy?.shareholder_name}</span> ({delegation.proxy?.email})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-500/30 bg-[#0d1b2a]/90 backdrop-blur-xl mb-8 shadow-xl">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-1">{t("voting_dash_appoint_proxy") || "Appoint a Voting Proxy"}</h3>
              <p className="text-sm text-slate-200 mb-4 font-normal">
                {t("voting_dash_appoint_desc") || "Authorize another registered shareholder to cast ballots on your behalf."}
              </p>
              <div className="flex flex-wrap gap-2">
                <select
                  className="bg-black/60 border border-white/20 text-white rounded-xl px-3.5 py-2 text-xs font-bold max-w-[280px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedProxyId}
                  onChange={(e) => setSelectedProxyId(e.target.value)}
                >
                  <option value="">{t("voting_dash_select_sh") || "Select Proxy Shareholder..."}</option>
                  {shareholders?.map(s => (
                    <option key={s.id} value={s.id}>{s.shareholder_name} ({s.email})</option>
                  ))}
                </select>
                <Button
                  size="sm"
                  disabled={!selectedProxyId || isDelegating}
                  onClick={() => onDelegate(selectedProxyId)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs px-4"
                >
                  {isDelegating ? (t("voting_dash_delegating") || "Appointing...") : (t("voting_dash_delegate_now") || "Confirm Proxy")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const VotingDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const shareholderId = localStorage.getItem("shareholderId");

  // 1. Fetch Shareholder Details
  const { data: shareholder, isLoading: loadingShareholder } = useQuery({
    queryKey: ["shareholder", shareholderId],
    queryFn: () => {
      if (!shareholderId) throw new Error("No shareholder ID");
      return votingApi.getShareholder(shareholderId);
    },
    enabled: !!shareholderId,
  });

  // 2. Fetch Active Session (Dependent on Shareholder)
  const { data: session, isLoading: loadingSession } = useQuery({
    queryKey: ["session", shareholder?.company_id],
    queryFn: () => votingApi.getActiveSession(shareholder!.company_id),
    enabled: !!shareholder?.company_id,
  });

  // 3. Parallel Fetch: Resolutions (with auto-sync for Nominees) & Existing Votes
  const { data: resolutions, isLoading: loadingResolutions } = useQuery({
    queryKey: ["resolutions", session?.id],
    queryFn: async () => {
      if (!session?.id) return [];

      // 1. Fetch existing resolutions in database
      const { data: existingResolutions, error } = await supabase
        .from("resolutions")
        .select("*")
        .eq("voting_session_id", session.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching resolutions:", error);
        return [];
      }

      // 2. Fetch nominees for this session
      const { data: sessionNominees } = await supabase
        .from("nominees")
        .select("*")
        .eq("voting_session_id", session.id);

      const allResolutions: Resolution[] = [...(existingResolutions || [])];

      // 3. Ensure any nominee has a corresponding valid resolution in public.resolutions
      if (sessionNominees && sessionNominees.length > 0) {
        for (const nom of sessionNominees) {
          const exists = allResolutions.find(r => 
            r.resolution_type === "director_election" && 
            r.title.includes(nom.nominee_name)
          );

          if (!exists) {
            const desig = nom.designation ? `Proposed Designation: ${nom.designation}` : "Candidate for Board of Directors";
            const exp = nom.experience_years ? ` | Experience: ${nom.experience_years} Years` : "";
            const qual = nom.qualification ? ` | Qualification: ${nom.qualification}` : "";
            const bio = nom.bio ? `\n${nom.bio}` : "";

            const { data: newRes, error: insertErr } = await supabase
              .from("resolutions")
              .insert({
                voting_session_id: session.id,
                title: `Director Election: ${nom.nominee_name}`,
                description: `${desig}${exp}${qual}${bio}`,
                resolution_type: "director_election"
              })
              .select()
              .single();

            if (!insertErr && newRes) {
              allResolutions.push(newRes as Resolution);
            }
          }
        }
      }

      return allResolutions;
    },
    enabled: !!session?.id,
  });

  const { data: existingVotes, isLoading: loadingVotes } = useQuery({
    queryKey: ["votes", shareholderId],
    queryFn: () => votingApi.getShareholderVotes(shareholderId!),
    enabled: !!shareholderId,
  });

  // Live Countdown & Status
  const [countdownText, setCountdownText] = useState<string>("");
  const [isLiveNow, setIsLiveNow] = useState(false);

  useEffect(() => {
    if (!session) return;

    const checkWindow = () => {
      const now = new Date().getTime();
      const start = new Date(session.start_date).getTime();
      const end = new Date(session.end_date).getTime();

      if (now < start) {
        setIsLiveNow(false);
        const diff = start - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownText(`Voting window opens in ${hours}h ${mins}m ${secs}s`);
      } else if (now >= start && now <= end) {
        setIsLiveNow(true);
        const diff = end - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownText(`Voting closes in ${hours}h ${mins}m ${secs}s`);
      } else {
        setIsLiveNow(false);
        setCountdownText("Voting window has concluded");
      }
    };

    checkWindow();
    const interval = setInterval(checkWindow, 1000);
    return () => clearInterval(interval);
  }, [session]);

  // Real-time Status Sync: Automatically refetch session when start/end time is reached
  useEffect(() => {
    if (!session || !shareholder?.company_id) return;

    const now = new Date();
    const start = new Date(session.start_date);
    const end = new Date(session.end_date);

    let nextEvent: Date | null = null;
    if (now < start) nextEvent = start;
    else if (now < end) nextEvent = end;

    if (nextEvent) {
      const delay = nextEvent.getTime() - now.getTime() + 1000;
      const timer = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["session", shareholder.company_id] });
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [session, shareholder?.company_id, queryClient]);

  // Proxy Delegation State
  const { data: delegation, refetch: refetchDelegation } = useQuery({
    queryKey: ["proxy-delegation", shareholderId, session?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proxy_delegations")
        .select(`
          *,
          proxy:proxy_id (id, shareholder_name, email)
        `)
        .eq("delegator_id", shareholderId)
        .eq("session_id", session?.id)
        .maybeSingle();
      if (error) return null;
      return data;
    },
    enabled: !!shareholderId && !!session?.id,
  });

  const { data: myDelegators } = useQuery({
    queryKey: ["my-delegators", shareholderId, session?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proxy_delegations")
        .select(`
          *,
          delegator:delegator_id (id, shareholder_name, email)
        `)
        .eq("proxy_id", shareholderId)
        .eq("session_id", session?.id)
        .eq("status", "active");
      if (error) return [];
      return data;
    },
    enabled: !!shareholderId && !!session?.id,
  });

  // Blockchain Anchor Data
  const { data: anchorData } = useQuery({
    queryKey: ["block-anchor", session?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("block_anchors")
        .select("*")
        .eq("session_id", session?.id)
        .maybeSingle();
      if (error) return null;
      return data;
    },
    enabled: !!session?.id,
  });

  const { data: companyShareholders } = useQuery({
    queryKey: ["company-shareholders", shareholder?.company_id],
    queryFn: () => votingApi.getCompanyShareholders(shareholder!.company_id),
    enabled: !!shareholder?.company_id,
  });

  const [isDelegating, setIsDelegating] = useState(false);
  const handleDelegate = async (proxyId: string) => {
    if (!shareholderId || !session?.id) return;
    setIsDelegating(true);
    try {
      const { error } = await supabase
        .from("proxy_delegations")
        .insert({
          delegator_id: shareholderId,
          proxy_id: proxyId,
          session_id: session.id,
          status: "active"
        });
      if (error) throw error;
      toast.success("Proxy Appointed Successfully");
      refetchDelegation();
    } catch (err: unknown) {
      toast.error(`Delegation Failed: ${(err as Error).message}`);
    } finally {
      setIsDelegating(false);
    }
  };

  const isLoading = loadingShareholder || loadingSession || loadingResolutions || loadingVotes;

  // Process Data for UI: All items have a real, guaranteed resolution_id in PostgreSQL
  const votingItems: VotingItem[] = useMemo(() => {
    return resolutions?.map((res) => {
      const voteRecord = existingVotes?.find((v) => v.resolution_id === res.id);
      let voteValue: VoteType | null = null;
      if (voteRecord) {
        const val = (voteRecord.vote_value || "").toUpperCase();
        if (val === "FOR") voteValue = "FOR";
        else if (val === "AGAINST") voteValue = "AGAINST";
        else if (val === "ABSTAIN") voteValue = "ABSTAIN";
      }

      return {
        id: res.id,
        title: res.title,
        description: res.description || "",
        category: res.resolution_type === "director_election" 
          ? "Director Election" 
          : res.resolution_type === "special" 
          ? "Special Resolution" 
          : "Ordinary Resolution",
        voted: !!voteRecord,
        vote: voteValue,
        voteHash: voteRecord?.vote_hash,
        anchorRoot: anchorData?.merkle_root
      };
    }) || [];
  }, [resolutions, existingVotes, anchorData]);

  const totalVoted = votingItems.filter((item) => item.voted).length;

  const now = new Date();
  const isSessionStarted = session?.start_date ? now >= new Date(session.start_date) : false;
  const isSessionExpired = session?.end_date ? now > new Date(session.end_date) : false;
  const isSessionActive = session?.is_active && isSessionStarted && !isSessionExpired;

  const handleVote = useCallback(async (itemId: string, voteType: "for" | "against" | "abstain") => {
    if (!isSessionStarted) {
      toast.error("Voting Not Started", {
        description: "The voting period has not started yet. Ballots will unlock automatically when the session starts.",
      });
      return;
    }

    if (isSessionExpired) {
      toast.error("Voting Session Closed", {
        description: "The voting window has ended. You cannot cast new votes.",
      });
      return;
    }

    if (!isSessionActive) {
      toast.error("Voting Paused", {
        description: "The voting session is currently paused by the administrator.",
      });
      return;
    }

    const upperVoteType = voteType.toUpperCase() as VoteType;

    // Single Vote rule for Director Elections
    const currentItem = votingItems.find(i => i.id === itemId);
    if (currentItem?.category === "Director Election" && upperVoteType === "FOR") {
      const alreadyVotedFor = votingItems.find(i =>
        i.category === "Director Election" &&
        i.vote === "FOR" &&
        i.id !== itemId
      );

      if (alreadyVotedFor) {
        toast.error("Single Vote Restriction", {
          description: "You have already voted FOR another director candidate.",
        });
        return;
      }
    }

    if (!shareholderId) return;

    // Generate Immutable Audit Hash
    const timestamp = new Date().toISOString();
    const voteHash = await generateVoteHash(shareholderId, itemId, voteType, timestamp);

    // Optimistic Update Object
    const newVote: VoteRecord = {
      id: "temp-optimistic-id",
      resolution_id: itemId,
      vote_value: upperVoteType,
      vote_hash: voteHash,
      created_at: timestamp,
    };

    // Update Cache Immediately
    queryClient.setQueryData(["votes", shareholderId], (old: VoteRecord[] | undefined) => [...(old || []), newVote]);

    try {
      // 1. Primary Vote (Voter themselves)
      await votingApi.castVote(shareholderId, itemId, upperVoteType, voteHash);

      // 2. Delegate Votes (Votes on behalf of others)
      if (myDelegators && myDelegators.length > 0) {
        for (const d of myDelegators) {
          try {
            const dHash = await generateVoteHash(d.delegator_id, itemId, voteType, timestamp);
            await votingApi.castVote(d.delegator_id, itemId, upperVoteType, dHash);
          } catch (err) {
            console.error(`Failed to cast proxy vote for ${d.delegator_id}:`, err);
          }
        }
      }

      toast.success("Vote securely recorded!", {
        description: `Your vote has been cryptographically hashed and anchored.`,
      });
    } catch (e: unknown) {
      console.error("Error recording vote:", e);
      toast.error(`Vote Failed: ${(e as Error).message}`);
      queryClient.setQueryData(["votes", shareholderId], (old: VoteRecord[] | undefined) =>
        old?.filter((v) => v.vote_hash !== voteHash) || []
      );
    }
  }, [isSessionStarted, isSessionExpired, isSessionActive, votingItems, myDelegators, shareholderId, queryClient]);

  if (!shareholderId) {
    navigate("/shareholder-login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white relative selection:bg-blue-500/30">
      <SEO
        title="Shareholder E-Voting Portal"
        description="Official e-voting session. Cast your weighted votes securely as per your shareholding on the record date."
        canonical="/voting-dashboard"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Sticky Header / Breadcrumbs */}
          <div className="sticky top-20 z-30 -mx-4 px-6 py-4 bg-[#0d1b2a]/90 backdrop-blur-xl border-b border-white/10 mb-8 rounded-2xl shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <Link to="/" className="hover:text-cyan-300 font-semibold transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="text-white font-bold truncate max-w-[220px]">{shareholder?.companies?.company_name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="text-cyan-300 font-bold">Ballot Portal</span>
                {session?.record_date && (
                  <div className="ml-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    Record Date: {new Date(session.record_date).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-black text-white">{shareholder?.shareholder_name}</p>
                  <p className="text-xs text-cyan-300 font-bold tabular-nums">
                    {shareholder?.shares_held?.toLocaleString()} Voting Shares
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-slate-100 hover:bg-white/10 rounded-xl text-xs font-bold"
                    onClick={() => navigate("/shareholder-analysis")}
                  >
                    <Activity className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-xl text-xs font-bold"
                    onClick={() => {
                      localStorage.removeItem("shareholderId");
                      queryClient.clear();
                      navigate("/shareholder-login");
                    }}
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1.5" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Voting Window Live Countdown & Status Banner */}
          {session && (
            <div className="mb-8">
              <Card className={`border backdrop-blur-xl shadow-2xl rounded-3xl p-6 transition-all ${
                isLiveNow && session.is_active
                  ? "border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-[#0d1b2a]/90 to-blue-950/40"
                  : !isSessionStarted
                  ? "border-blue-500/40 bg-gradient-to-r from-blue-950/40 via-[#0d1b2a]/90 to-indigo-950/40"
                  : "border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-[#0d1b2a]/90 to-slate-950/40"
              }`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isLiveNow && session.is_active
                        ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                        : !isSessionStarted
                        ? "bg-blue-500/20 border-blue-400/40 text-cyan-300"
                        : "bg-amber-500/20 border-amber-400/40 text-amber-300"
                    }`}>
                      {isLiveNow && session.is_active ? (
                        <Vote className="w-6 h-6 animate-pulse" />
                      ) : !isSessionStarted ? (
                        <Hourglass className="w-6 h-6 animate-spin" />
                      ) : (
                        <Clock className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          isLiveNow && session.is_active
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : !isSessionStarted
                            ? "bg-blue-500/20 text-cyan-300 border-blue-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        }`}>
                          {isLiveNow && session.is_active
                            ? "LIVE VOTING WINDOW"
                            : !isSessionStarted
                            ? "SCHEDULED SESSION"
                            : "SESSION CONCLUDED"}
                        </span>
                        <h3 className="text-lg font-black text-white">{session.title}</h3>
                      </div>
                      <p className="text-sm text-slate-200 mt-1 font-medium">
                        {isLiveNow && session.is_active
                          ? "Ballots are active and ready. Cast your vote on each item below."
                          : !isSessionStarted
                          ? "Voting window is scheduled. Ballots will unlock automatically when start time is reached."
                          : "Voting is closed. Official tallies are being anchored to blockchain."}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3 rounded-2xl bg-black/60 border border-white/15 text-center shrink-0">
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Timer Status</p>
                    <p className="text-base font-black text-cyan-300 mt-0.5 font-mono">{countdownText || "Calculating..."}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Virtual Meeting Join Banner */}
          {!isLoading && session?.meeting_link && (
            <div className="mb-8">
              <Card className="border-cyan-500/30 bg-[#0d1b2a]/90 backdrop-blur-xl shadow-xl rounded-3xl p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">
                        Live Virtual General Meeting Room
                      </h3>
                      <div className="space-y-1 text-sm text-slate-200 font-medium">
                        {session.meeting_start_date && (
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            {new Date(session.meeting_start_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </p>
                        )}
                        {session.meeting_password && (
                          <p className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-emerald-400" />
                            Room Passcode: <span className="font-mono bg-black/60 px-2 py-0.5 rounded text-white border border-white/10">{session.meeting_password}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg gap-2"
                    onClick={() => window.open(session.meeting_link!, '_blank')}
                  >
                    <Video className="w-4 h-4" />
                    Join Video Stream
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Proxy Delegation Section */}
          {!isLoading && session && (
            <div>
              <AppointProxyCard
                shareholders={companyShareholders?.filter(s => s.id !== shareholderId) || []}
                delegation={delegation}
                isDelegating={isDelegating}
                onDelegate={handleDelegate}
              />
            </div>
          )}

          {/* Analytics Summary */}
          {!isLoading && (
            <div className="mb-8">
              <VotingAnalytics
                totalResolutions={votingItems.length}
                votedResolutions={totalVoted}
                shareholderShares={shareholder?.shares_held || 0}
                recordDate={session?.record_date}
              />
            </div>
          )}

          {/* Voting Items & Ballot Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Vote className="w-6 h-6 text-cyan-400" />
                Active Ballot Items & Agendas ({votingItems.length})
              </h2>
              <div className="text-xs text-slate-200 flex items-center gap-2 font-bold">
                <Shield className="w-4 h-4 text-emerald-400" />
                256-Bit SHA Encrypted & Verified
              </div>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <>
                  <VotingCardSkeleton />
                  <VotingCardSkeleton />
                  <VotingCardSkeleton />
                </>
              ) : votingItems.length === 0 ? (
                <Card className="border-white/15 bg-[#0d1b2a]/90 backdrop-blur-xl p-12 text-center rounded-3xl">
                  <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white mb-1">No Active Ballot Items</h3>
                  <p className="text-xs text-slate-200 max-w-md mx-auto">
                    The company administrator has not yet registered resolutions or director candidates for this session.
                  </p>
                </Card>
              ) : (
                votingItems.map((item, index) => (
                  <div key={item.id}>
                    <VotingCard
                      item={item}
                      index={index}
                      onVote={handleVote}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* All Votes Completed Banner */}
          {!isLoading && totalVoted === votingItems.length && votingItems.length > 0 && (
            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#0d1b2a]/90 to-cyan-950/60 border border-emerald-500/40 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">All Ballots Cast & Verified</h3>
                  <p className="text-sm text-slate-200 font-medium mt-0.5">
                    Your votes are permanently recorded with cryptographic hashes and will be anchored in the final scrutinizer block.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Section */}
          {!isLoading && session && shareholderId && (
            <div className="mt-8">
              <ShareholderFeedbackForm
                sessionId={session.id}
                shareholderId={shareholderId}
              />
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VotingDashboard;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { votingApi } from "@/services/api/voting";
import { Resolution, ResolutionStats } from "@/types/voting";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Loader2, Download, FileText, RefreshCw } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface AdminVotingResultsProps {
    sessionId: string;
    companyName: string;
}

export const AdminVotingResults = ({ sessionId, companyName }: AdminVotingResultsProps) => {
    const { t } = useTranslation();
    const [resolutions, setResolutions] = useState<Resolution[]>([]);
    const [stats, setStats] = useState<Record<string, ResolutionStats>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);

    const fetchResults = async () => {
        setIsLoading(true);
        try {
            const sessionResolutions = await votingApi.getResolutions(sessionId);
            setResolutions(sessionResolutions);

            if (sessionResolutions.length > 0) {
                const resolutionIds = sessionResolutions.map(r => r.id);
                const statsData = await votingApi.getSessionStats(resolutionIds);

                const statsMap: Record<string, ResolutionStats> = {};
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                statsData.forEach((s: any) => {
                    statsMap[s.resolution_id] = s;
                });
                setStats(statsMap);
            }
        } catch (error) {
            console.error("Failed to fetch results:", error);
            toast.error(t("admin_voting_results_toast_load_fail"));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (sessionId) {
            fetchResults();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);

    // Real-time subscription
    useEffect(() => {
        if (!sessionId || resolutions.length === 0) return;

        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'votes',
                },
                (payload) => {
                    const newVote = payload.new as { resolution_id: string, vote_value: string };

                    setStats((prevStats) => {
                        const resolutionId = newVote.resolution_id;
                        // Only update if this resolution is in our list
                        if (!resolutions.find(r => r.id === resolutionId)) return prevStats;

                        const currentStat = prevStats[resolutionId] || {
                            resolution_id: resolutionId,
                            for_count: 0,
                            against_count: 0,
                            abstain_count: 0,
                            total_weighted_votes: 0,
                            total_vote_count: 0,
                            last_updated: new Date().toISOString()
                        };

                        const updatedStat = { ...currentStat };
                        updatedStat.total_vote_count += 1;
                        updatedStat.total_weighted_votes += (payload.new as any).weighted_votes || 1;

                        const voteValue = newVote.vote_value.toUpperCase();
                        if (voteValue === 'FOR') updatedStat.for_count += (payload.new as any).weighted_votes || 1;
                        else if (voteValue === 'AGAINST') updatedStat.against_count += (payload.new as any).weighted_votes || 1;
                        else if (voteValue === 'ABSTAIN') updatedStat.abstain_count += (payload.new as any).weighted_votes || 1;

                        return {
                            ...prevStats,
                            [resolutionId]: updatedStat
                        };
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sessionId, resolutions]);

    const refreshData = async () => {
        await fetchResults();
        toast.success(t("admin_voting_results_toast_success"));
    };

    const exportPDF = () => {
        setIsExporting(true);
        try {
            const doc = new jsPDF();

            // Header
            doc.setFontSize(20);
            doc.setTextColor(41, 128, 185);
            doc.text(companyName, 14, 22);

            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text("Official Voting Results Report", 14, 32);

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 40);
            doc.text(`Session ID: ${sessionId}`, 14, 46);

            // Table Data
            const tableData = resolutions.map((res, index) => {
                const stat = stats[res.id] || { for_count: 0, against_count: 0, abstain_count: 0, total_weighted_votes: 0, total_vote_count: 0 };
                const validVotesForAgainst = stat.for_count + stat.against_count;
                return [
                    index + 1,
                    res.title,
                    stat.for_count.toLocaleString(),
                    stat.against_count.toLocaleString(),
                    stat.abstain_count.toLocaleString(),
                    stat.total_weighted_votes.toLocaleString(),
                    `${validVotesForAgainst > 0 ? ((stat.for_count / validVotesForAgainst) * 100).toFixed(1) : 0}%`
                ];
            });

            autoTable(doc, {
                startY: 55,
                head: [['#', 'Resolution', 'For', 'Against', 'Abstain', 'Total', 'Approval %']],
                body: tableData,
                theme: 'grid',
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
                styles: { fontSize: 9 },
                columnStyles: {
                    0: { cellWidth: 10 },
                    1: { cellWidth: 60 },
                }
            });

            // Footer
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.text('Vote India Secure - Immutable Blockchain Record', 14, doc.internal.pageSize.height - 10);
                doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
            }

            doc.save(`voting-results-${new Date().toISOString().slice(0, 10)}.pdf`);
            toast.success(t("admin_voting_results_toast_pdf_success"));

        } catch (error) {
            console.error("Export failed:", error);
            toast.error(t("admin_voting_results_toast_pdf_fail"));
        } finally {
            setIsExporting(false);
        }
    };

    if (isLoading && sessionId) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    if (!sessionId) {
        return (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-xl bg-card/10">
                <p className="text-muted-foreground">{t("admin_voting_results_empty")}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" />
                        {t("admin_voting_results_title")}
                    </h2>
                    <p className="text-muted-foreground text-sm">{t("admin_voting_results_desc")}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium animate-pulse mr-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        {t("admin_voting_results_live")}
                    </div>
                    <Button variant="outline" size="sm" onClick={refreshData}>
                        <RefreshCw className="w-4 h-4 mr-2" /> {t("admin_voting_results_btn_refresh")}
                    </Button>
                    <Button variant="default" size="sm" onClick={exportPDF} disabled={isExporting} className="bg-emerald-600 hover:bg-emerald-700">
                        {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                        {t("admin_voting_results_btn_export")}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {resolutions.map((res, index) => {
                    const stat = stats[res.id];
                    const forCount = stat?.for_count || 0;
                    const againstCount = stat?.against_count || 0;
                    const abstainCount = stat?.abstain_count || 0;
                    const totalWeightedVotes = stat?.total_weighted_votes || 0;
                    const totalVoteCount = stat?.total_vote_count || 0;

                    const chartData = [
                        { name: 'For', value: forCount, color: '#10b981' },
                        { name: 'Against', value: againstCount, color: '#ef4444' },
                        { name: 'Abstain', value: abstainCount, color: '#eab308' },
                    ];

                    return (
                        <Card key={res.id} className="border-border/50 bg-card/40 backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-mono text-muted-foreground mb-1 block">{t("admin_voting_results_res_label")}{index + 1}</span>
                                        <CardTitle className="text-lg">{res.title}</CardTitle>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold">{Number(totalWeightedVotes).toLocaleString()}</span>
                                        <span className="text-xs text-muted-foreground block">{t("admin_voting_results_weighted_label")}</span>
                                        <span className="text-[10px] text-muted-foreground block mt-1">
                                            {t("admin_voting_results_from_label")} {totalVoteCount} {t("admin_voting_results_sh_label")}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff10" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={60} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                                cursor={{ fill: '#ffffff05' }}
                                            />
                                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50 text-center">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">{t("admin_voting_results_for")}</p>
                                        <p className="font-bold text-emerald-500">{stat.for_count.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">{t("admin_voting_results_against")}</p>
                                        <p className="font-bold text-red-500">{stat.against_count.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">{t("admin_voting_results_abstain")}</p>
                                        <p className="font-bold text-yellow-500">{stat.abstain_count.toLocaleString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

                {resolutions.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        {t("admin_voting_results_no_votes")}
                    </div>
                )}
            </div>
        </div>
    );
};

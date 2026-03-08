import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentSummarizer } from "@/components/ai/DocumentSummarizer";
import { AIAnalysisDemo } from "@/components/company/AIAnalysisDemo";
import { Sparkles, FileText, BrainCircuit, ArrowLeft } from "lucide-react";
import { LiveSentimentMonitor } from "@/components/ai/LiveSentimentMonitor";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const AIPowerSuite = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/company-login");
                return;
            }
            setLoading(false);
        };
        checkAuth();
    }, [navigate]);

    if (loading) {
        return <div className="min-h-screen" />;
    }

    return (
        <div className="min-h-screen relative">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-foreground">{t("ai_suite_badge")}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                                {t("ai_suite_title_part1")}{" "}
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {t("ai_suite_title_part2")}
                                </span>
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                {t("ai_suite_subtitle")}
                            </p>
                        </div>
                        <Button variant="ghost" onClick={() => navigate("/company-dashboard")} className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            {t("ai_suite_back_btn")}
                        </Button>
                    </div>

                    {/* AI Value Proposition */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="border-blue-500/20 bg-card/10 backdrop-blur-md">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                        <BrainCircuit className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">{t("ai_val_1_title")}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t("ai_val_1_desc")}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-purple-500/20 bg-card/10 backdrop-blur-md">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">{t("ai_val_2_title")}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t("ai_val_2_desc")}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-indigo-500/20 bg-card/10 backdrop-blur-md">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">{t("ai_val_3_title")}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t("ai_val_3_desc")}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-purple-500/20 bg-card/10 backdrop-blur-md overflow-hidden relative min-h-[500px]">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <Sparkles className="w-64 h-64 text-purple-600" />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Sparkles className="w-6 h-6 text-purple-600" />
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {t("ai_feat_title")}
                                </span>
                            </CardTitle>
                            <CardDescription>
                                {t("ai_feat_desc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="summarizer" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-6">
                                    <TabsTrigger value="summarizer" className="gap-2">
                                        <FileText className="w-4 h-4" /> {t("ai_tab_summarizer")}
                                    </TabsTrigger>
                                    <TabsTrigger value="sentiment" className="gap-2">
                                        <BrainCircuit className="w-4 h-4" /> {t("ai_tab_sentiment")}
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="summarizer" className="animate-in fade-in slide-in-from-left-4 duration-500">
                                    <DocumentSummarizer />
                                </TabsContent>

                                <TabsContent value="sentiment" className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="grid lg:grid-cols-12 gap-6">
                                        <div className="lg:col-span-4 h-full">
                                            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm h-full flex flex-col">
                                                <h3 className="font-semibold mb-2 text-lg text-foreground">{t("ai_feedback_title")}</h3>
                                                <p className="text-sm text-muted-foreground mb-6 italic">{t("ai_feedback_desc")}</p>
                                                <div className="flex-1">
                                                    <AIAnalysisDemo />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-8">
                                            <LiveSentimentMonitor />
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </main >

            <Footer />
        </div >
    );
};

export default AIPowerSuite;

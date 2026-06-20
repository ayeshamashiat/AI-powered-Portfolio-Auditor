"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auditGithub } from "@/services/api";
import { PortfolioAuditResponse } from "@/types";
import { LoadingState } from "@/components/LoadingState";
import { ScoreCard } from "@/components/ScoreCard";
import { RepoTable } from "@/components/RepoTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Terminal,
  ShieldAlert,
  Flame,
  Award,
  GitBranch,
  Link,
} from "lucide-react";
import { ExternalLink } from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get("username") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PortfolioAuditResponse | null>(null);

  useEffect(() => {
    if (!username) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await auditGithub(username);
        setData(result);
      } catch (err: any) {
        setError(err.message || "An unexpected system interrupt occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, router]);

  // Derived Summary data
  const summaryStats = useMemo(() => {
    if (!data || !data.audit_results || data.audit_results.length === 0) {
      return { strongest: [], weakest: [] };
    }
    // sort by score descending
    const sorted = [...data.audit_results].sort((a, b) => b.score - a.score);
    const strongest = sorted.slice(0, 3);
    const weakest = [...sorted].reverse().slice(0, 3);
    return { strongest, weakest };
  }, [data]);

  if (loading) {
    return <LoadingState username={username} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-lg mx-auto p-4 font-mono">
        <div className="w-full border border-neon-magenta/40 bg-cyber-card/90 backdrop-blur-md p-6 neon-border-magenta relative">
          <div className="absolute top-[-2px] left-[-2px] size-3 border-t-2 border-l-2 border-neon-magenta" />
          <div className="absolute top-[-2px] right-[-2px] size-3 border-t-2 border-r-2 border-neon-magenta" />
          <div className="absolute bottom-[-2px] left-[-2px] size-3 border-b-2 border-l-2 border-neon-magenta" />
          <div className="absolute bottom-[-2px] right-[-2px] size-3 border-b-2 border-r-2 border-neon-magenta" />

          {/* Crash Header */}
          <div className="flex items-center gap-2 text-neon-magenta border-b border-neon-magenta/20 pb-3 mb-4">
            <ShieldAlert className="size-5 animate-pulse" />
            <span className="text-xs font-black tracking-widest">CRITICAL SYSTEM ERROR</span>
          </div>

          <p className="text-xs text-neon-magenta/90 leading-relaxed mb-6 font-bold">
            &gt; ERROR_CODE: AUDIT_FAILED
            <br />
            &gt; INTERRUPT_CAUSE: {error}
            <br />
            <br />
            &gt; Sarcastic report: "Maybe this user doesn't exist, or maybe the API server is having an existential crisis. Either way, no audit for you."
          </p>

          <Button
            onClick={() => router.push("/")}
            className="w-full neon-btn-magenta h-9 text-[10px] uppercase tracking-wider cursor-pointer"
          >
            <ChevronLeft className="size-3.5 mr-1" />
            Return to Port
          </Button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6 select-none font-mono">
      {/* Header Deck Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neon-cyan/20 pb-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Terminal className="size-4 text-neon-cyan" />
            <span className="text-[10px] text-neon-cyan/50 font-bold uppercase tracking-wider">
              CLIENT_REPORT // PORTFOLIO_READOUT
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-1.5 uppercase">
            TARGET:
            <a
              href={`https://github.com/${data.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan neon-glow-cyan hover:underline cursor-pointer"
            >
              @{data.username}
            </a>
          </h2>
        </div>

        <Button
          variant="outline"
          size="xs"
          onClick={() => router.push("/")}
          className="h-8 border-neon-cyan/30 text-neon-cyan text-[10px] uppercase font-mono tracking-wider flex items-center gap-1.5 px-3 hover:bg-neon-cyan/10 cursor-pointer"
        >
          <ChevronLeft className="size-3.5" />
          Audit Another Client
        </Button>
      </div>

      {/* Main Stats Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ScoreCard - spans 2 columns */}
        <div className="md:col-span-2">
          <ScoreCard score={data.portfolio_score} />
        </div>

        {/* Repository Count Widget */}
        <Card className="bg-cyber-card border border-neon-cyan/20 rounded-none relative overflow-hidden neon-border-cyan flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/30" />
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] text-neon-cyan/50 tracking-widest uppercase font-bold flex items-center gap-1.5">
              <GitBranch className="size-3.5 text-neon-cyan" />
              TOTAL_REPOSITORIES
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-4xl font-black text-white tracking-tighter">
              {data.repo_count}
            </div>
            <p className="text-[10px] text-neon-cyan/70 leading-normal">
              Auditable repositories indexed on public index. Zero private variables extracted.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Summary section (Strongest & Weakest) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strongest Repositories */}
        <Card className="bg-cyber-card border border-neon-cyan/20 rounded-none relative overflow-hidden neon-border-cyan">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-green/30" />
          <CardHeader className="border-b border-neon-cyan/15 bg-black/20 py-3">
            <CardTitle className="text-[10px] text-neon-green font-bold tracking-widest uppercase flex items-center gap-2">
              <Award className="size-4" />
              STRONGEST_MODULES (Top Performance)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {summaryStats.strongest.map((repo, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-neon-cyan/5 pb-2 last:border-b-0 last:pb-0 text-xs">
                <span className="text-white font-bold truncate max-w-[200px] sm:max-w-xs">{repo.repo_name}</span>
                <span className="text-neon-green font-bold bg-neon-green/5 border border-neon-green/20 px-2 py-0.5 text-[10px]">
                  SCORE: {repo.score}
                </span>
              </div>
            ))}
            {summaryStats.strongest.length === 0 && (
              <div className="text-[10px] text-neon-cyan/40 py-2">
                NO COMPARATIVE METRICS AVAILABLE
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weakest Repositories */}
        <Card className="bg-cyber-card border border-neon-cyan/20 rounded-none relative overflow-hidden neon-border-cyan">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-magenta/30" />
          <CardHeader className="border-b border-neon-cyan/15 bg-black/20 py-3">
            <CardTitle className="text-[10px] text-neon-magenta font-bold tracking-widest uppercase flex items-center gap-2">
              <Flame className="size-4 animate-pulse" />
              WEAKEST_MODULES (Immediate Attention)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {summaryStats.weakest.map((repo, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-neon-cyan/5 pb-2 last:border-b-0 last:pb-0 text-xs">
                <span className="text-white font-bold truncate max-w-[200px] sm:max-w-xs">{repo.repo_name}</span>
                <span className="text-neon-magenta font-bold bg-neon-magenta/5 border border-neon-magenta/20 px-2 py-0.5 text-[10px]">
                  SCORE: {repo.score}
                </span>
              </div>
            ))}
            {summaryStats.weakest.length === 0 && (
              <div className="text-[10px] text-neon-cyan/40 py-2">
                NO COMPARATIVE METRICS AVAILABLE
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Repo Table */}
      <div className="space-y-3">
        <h3 className="text-xs text-neon-cyan/60 font-black tracking-widest uppercase pl-1">
          REPOSITORY_AUDIT_LOG
        </h3>
        <RepoTable repos={data.audit_results} />
      </div>
    </div>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div className="text-neon-cyan text-xs p-8">PREPARING TERMINAL DESK...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

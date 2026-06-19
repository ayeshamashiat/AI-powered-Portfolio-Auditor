"use client";

import React, { useState, useMemo } from "react";
import { RepoAuditResult } from "@/types";
import { IssueBadge } from "./IssueBadge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, FolderGit2, CheckCircle2 } from "lucide-react";

interface RepoTableProps {
  repos: RepoAuditResult[];
}

type SortField = "name" | "score";
type SortOrder = "asc" | "desc";

export function RepoTable({ repos }: RepoTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc"); // ascending by default to show weakest repos first!

  // Sort and filter logic
  const filteredSortedRepos = useMemo(() => {
    return repos
      .filter((repo) =>
        repo.repo_name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortField === "name") {
          return sortOrder === "asc"
            ? a.repo_name.localeCompare(b.repo_name)
            : b.repo_name.localeCompare(a.repo_name);
        } else {
          return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
        }
      });
  }, [repos, search, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-neon-green font-bold";
    if (score >= 70) return "text-neon-cyan font-bold";
    if (score >= 45) return "text-neon-yellow font-bold";
    return "text-neon-magenta font-bold animate-pulse";
  };

  return (
    <div className="space-y-4 font-mono w-full">
      {/* Search Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full flex items-center border border-neon-cyan/25 bg-cyber-card px-3 py-1 text-xs">
          <Search className="size-3.5 text-neon-cyan/50 mr-2" />
          <Input
            type="text"
            placeholder="FILTER_REPOSITORIES..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent text-xs text-neon-cyan px-0 h-6 focus-visible:ring-0 w-full placeholder:text-neon-cyan/30"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
          <Button
            variant="outline"
            size="xs"
            onClick={() => toggleSort("name")}
            className="h-8 border-neon-cyan/30 text-neon-cyan text-[10px] uppercase font-mono tracking-wider flex items-center gap-1.5 px-3 hover:bg-neon-cyan/10 cursor-pointer"
          >
            Sort Name
            <ArrowUpDown className="size-3" />
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => toggleSort("score")}
            className="h-8 border-neon-cyan/30 text-neon-cyan text-[10px] uppercase font-mono tracking-wider flex items-center gap-1.5 px-3 hover:bg-neon-cyan/10 cursor-pointer"
          >
            Sort Score
            <ArrowUpDown className="size-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Repo Grid */}
      <div className="border border-neon-cyan/20 bg-cyber-card/65 backdrop-blur-md overflow-hidden w-full relative">
        <Table className="min-w-full">
          <TableHeader className="bg-cyber-card border-b border-neon-cyan/20">
            <TableRow className="border-neon-cyan/15 hover:bg-transparent">
              <TableHead className="text-neon-cyan/60 text-[10px] tracking-widest uppercase font-bold px-4 py-3">
                REPOSITORY_NAME
              </TableHead>
              <TableHead className="text-neon-cyan/60 text-[10px] tracking-widest uppercase font-bold px-4 py-3 text-center w-24">
                SCORE
              </TableHead>
              <TableHead className="text-neon-cyan/60 text-[10px] tracking-widest uppercase font-bold px-4 py-3">
                SECURITY_&_QUALITY_ISSUES
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {filteredSortedRepos.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={3} className="text-center py-8 text-xs text-neon-magenta/60 font-mono">
                  [!] NO MATCHING REPOSITORIES FOUND IN THE DATASTREAM
                </TableCell>
              </TableRow>
            ) : (
              filteredSortedRepos.map((repo) => (
                <TableRow
                  key={repo.repo_name}
                  className="border-neon-cyan/15 hover:bg-neon-cyan/5 transition-colors"
                >
                  {/* Repo Name */}
                  <TableCell className="px-4 py-3.5 text-xs text-white font-semibold">
                    <span className="flex items-center gap-2">
                      <FolderGit2 className="size-3.5 text-neon-cyan/70" />
                      {repo.repo_name}
                    </span>
                  </TableCell>
                  
                  {/* Repo Score */}
                  <TableCell className="px-4 py-3.5 text-center font-bold">
                    <span className={`text-sm ${getScoreColor(repo.score)}`}>
                      {repo.score}
                    </span>
                  </TableCell>
                  
                  {/* Repo Issues */}
                  <TableCell className="px-4 py-3.5">
                    {repo.issues.length === 0 ? (
                      <div className="flex items-center gap-1.5 text-neon-green/80 text-[10px]">
                        <CheckCircle2 className="size-3" />
                        <span>CLEAN - NO IMMEDIATE SHAME</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 max-w-lg">
                        {repo.issues.map((issue, idx) => (
                          <IssueBadge key={idx} issue={issue} />
                        ))}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Table Footer info */}
      <div className="flex justify-between items-center text-[10px] text-neon-cyan/45 px-1">
        <span>GRID STATE: SYNCHRONIZED</span>
        <span>SHADOW REPOS FILTERED: FALSE</span>
      </div>
    </div>
  );
}

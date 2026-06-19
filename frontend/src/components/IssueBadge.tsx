"use client";

import { AlertTriangle, Key, FileWarning, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface IssueBadgeProps {
  issue: string;
}

export function IssueBadge({ issue }: IssueBadgeProps) {
  // Select badge styling and icons dynamically based on content keywords
  const text = issue.toLowerCase();
  
  let colorClass = "border-neon-cyan/40 bg-neon-cyan/5 text-neon-cyan";
  let Icon = HelpCircle;

  if (
    text.includes("leak") ||
    text.includes("credential") ||
    text.includes("security") ||
    text.includes("key") ||
    text.includes("password") ||
    text.includes("token") ||
    text.includes("env") ||
    text.includes("sensitive")
  ) {
    colorClass = "border-red-500/40 bg-red-950/20 text-red-400 shadow-[0_0_6px_rgba(239,68,68,0.2)]";
    Icon = Key;
  } else if (
    text.includes("no readme") ||
    text.includes("readme missing") ||
    text.includes("missing readme") ||
    text.includes("empty") ||
    text.includes("license") ||
    text.includes("documentation")
  ) {
    colorClass = "border-neon-yellow/40 bg-neon-yellow/5 text-neon-yellow";
    Icon = FileWarning;
  } else if (
    text.includes("test") ||
    text.includes("lint") ||
    text.includes("ci") ||
    text.includes("coverage") ||
    text.includes("unstable") ||
    text.includes("build")
  ) {
    colorClass = "border-neon-magenta/40 bg-neon-magenta/5 text-neon-magenta";
    Icon = AlertTriangle;
  }

  return (
    <Badge
      variant="outline"
      className={`rounded-none border px-2 py-0.5 text-[10px] font-mono tracking-tight flex items-center gap-1 w-fit select-none shrink-0 ${colorClass}`}
    >
      <Icon className="size-2.5 shrink-0" />
      <span>{issue}</span>
    </Badge>
  );
}

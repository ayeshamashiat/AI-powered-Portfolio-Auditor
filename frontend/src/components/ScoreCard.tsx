"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Gauge, Award, ShieldAlert, Cpu } from "lucide-react";

interface ScoreCardProps {
  score: number;
}

export function ScoreCard({ score }: ScoreCardProps) {
  // Determine rating thresholds and sarcastic copy
  let ratingLabel = "";
  let ratingColorClass = "";
  let ratingSubtext = "";
  let Icon = Cpu;

  if (score >= 85) {
    ratingLabel = "LEGITIMATE CODER";
    ratingColorClass = "text-neon-cyan drop-shadow-[0_0_8px_#00f0ff]";
    ratingSubtext = "Show-off. Your repositories are suspiciously clean. We suspect either heavy formatting tools, AI assistance, or complete lack of actual complex logic.";
    Icon = Award;
  } else if (score >= 70) {
    ratingLabel = "AVERAGE OPERATOR";
    ratingColorClass = "text-neon-yellow drop-shadow-[0_0_8px_#ffee00]";
    ratingSubtext = "Acceptable, but you're not getting into the cyberdeck mainframe. Your commit history is full of 'fix typo' and your codebase is emotionally unstable.";
    Icon = Gauge;
  } else if (score >= 45) {
    ratingLabel = "VOLATILE CODEBASE";
    ratingColorClass = "text-neon-magenta drop-shadow-[0_0_8px_#ff007f]";
    ratingSubtext = "Some of your source files are crying out for refactoring. We detected high levels of spaghetti copy-pasted from StackOverflow. Proceed with extreme caution.";
    Icon = ShieldAlert;
  } else {
    ratingLabel = "BIOHAZARD DETECTED";
    ratingColorClass = "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse";
    ratingSubtext = "Your GitHub profile is an ecological disaster. Close VS Code immediately, delete your account, and look into organic farming. This code is beyond redemption.";
    Icon = ShieldAlert;
  }

  return (
    <Card className="bg-cyber-card border border-neon-cyan/20 rounded-none relative overflow-hidden neon-border-cyan">
      {/* Decorative scanner bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse-slow" />
      
      <CardContent className="pt-6 pb-6 flex flex-col md:flex-row items-center gap-6">
        {/* Score Ring Dial */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="size-32 transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="64"
              cy="64"
              r="52"
              className="stroke-cyber-bg fill-transparent"
              strokeWidth="8"
            />
            {/* Glow Path */}
            <circle
              cx="64"
              cy="64"
              r="52"
              className="stroke-muted fill-transparent"
              strokeWidth="8"
            />
            {/* Animated Score Arc */}
            <circle
              cx="64"
              cy="64"
              r="52"
              fill="transparent"
              strokeWidth="8"
              className="stroke-primary transition-all duration-1000 ease-out"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - score / 100)}
              style={{
                filter: "drop-shadow(0 0 4px #00f0ff)",
              }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black tracking-tight text-white">{score}</span>
            <span className="text-[10px] text-neon-cyan/50 font-bold uppercase">Score</span>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="text-[10px] text-neon-cyan/40 font-bold tracking-widest uppercase block">
              PORTFOLIO STATE EVALUATION
            </span>
          </div>
          
          <h3 className={`text-lg font-black tracking-widest flex items-center justify-center md:justify-start gap-2 ${ratingColorClass}`}>
            <Icon className="size-5 shrink-0" />
            {ratingLabel}
          </h3>
          
          <p className="text-xs text-neon-cyan/80 leading-relaxed font-mono">
            {ratingSubtext}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

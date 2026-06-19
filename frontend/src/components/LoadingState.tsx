"use client";

import { useEffect, useState } from "react";
import { Terminal, ShieldAlert, Cpu } from "lucide-react";

const sarcasms = [
  "Initializing repository interrogation protocols...",
  "Evaluating your GitHub existence...",
  "Establishing interface link with the source...",
  "Analyzing spaghetti ratio in codebases...",
  "Flagging repositories that should have remained private...",
  "Checking commits for emotional stability...",
  "Determining the level of README neglect...",
  "Auditing code comments for imposter syndrome...",
  "Bribing GitHub API servers for rate limit clearance...",
  "Calculating metrics for public shame...",
  "Formatting final results for the cyberdeck..."
];

export function LoadingState({ username }: { username: string }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Add logs one by one
    let currentLogIndex = 0;
    setLogs([`> AUDIT_INIT: Target client "${username}" identified.`]);

    const logInterval = setInterval(() => {
      if (currentLogIndex < sarcasms.length) {
        setLogs((prev) => [...prev, `> ${sarcasms[currentLogIndex]}`]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 600);

    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random progress jump to feel realistic
        const increment = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + increment, 98); // hold at 98 until finished
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [username]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-2xl mx-auto px-4 font-mono">
      <div className="w-full border border-neon-cyan/30 bg-cyber-card/90 backdrop-blur-md p-6 neon-border-cyan relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-neon-cyan/20 pb-3 mb-4">
          <div className="flex items-center gap-2 text-neon-cyan">
            <Terminal className="size-4 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider">SECURE PORTFOLIO SCANNER // V1.0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-neon-cyan animate-ping" />
            <span className="text-[10px] text-neon-cyan/60 uppercase">Scanning...</span>
          </div>
        </div>

        {/* Loading details */}
        <div className="space-y-2 h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent text-xs text-neon-cyan/80 mb-6 font-mono pr-2">
          {logs.map((log, index) => (
            <div key={index} className="leading-relaxed flex items-start gap-1">
              <span className="text-neon-magenta shrink-0">⌁</span>
              <span className={index === logs.length - 1 ? "terminal-cursor" : ""}>
                {log}
              </span>
            </div>
          ))}
        </div>

        {/* Progress block */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-neon-cyan/60">
            <span className="flex items-center gap-1">
              <Cpu className="size-3 animate-spin" />
              SCANNING CODESPACE
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-cyber-bg border border-neon-cyan/20 h-3 relative overflow-hidden">
            <div
              className="bg-neon-cyan h-full transition-all duration-300 relative shadow-[0_0_10px_#00f0ff]"
              style={{ width: `${progress}%` }}
            >
              {/* Laser stripe effect */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-scanline" />
            </div>
          </div>
        </div>

        {/* Cyberpunk warning bottom */}
        <div className="mt-4 flex items-center gap-2 text-[10px] text-neon-magenta/75 border-t border-neon-magenta/20 pt-3">
          <ShieldAlert className="size-3.5" />
          <span>WARNING: UNOPTIMIZED REPOSITORIES DETECTED. PREPARE FOR MENTAL DAMAGE.</span>
        </div>
      </div>
    </div>
  );
}

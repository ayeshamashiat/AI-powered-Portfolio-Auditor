"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function UsernameInput() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError("ERROR: USERNAME_REQUIRED. Cannot interrogate an empty entity.");
      return;
    }
    setError("");
    router.push(`/dashboard?username=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        <div className="flex items-center border border-neon-cyan/40 bg-cyber-card/85 p-3 rounded-none neon-border-cyan focus-within:border-neon-cyan focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all">
          <span className="text-neon-magenta text-xs font-bold mr-2 select-none shrink-0">
            guest@auditor:~$
          </span>
          <div className="relative flex-1 flex items-center">
            <svg className="size-4 text-neon-cyan/50 mr-2 shrink-0 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <Input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError("");
              }}
              placeholder="github-username"
              className="border-0 bg-transparent text-sm text-neon-cyan focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-6 w-full placeholder:text-neon-cyan/30"
              autoFocus
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-xs text-neon-magenta font-mono animate-pulse border border-neon-magenta/30 bg-neon-magenta/5 px-3 py-1.5 flex items-start gap-1.5">
          <span className="font-bold">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full neon-btn-magenta h-10 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_8px_rgba(255,0,127,0.1)] active:translate-y-0.5"
      >
        <Play className="size-3.5 fill-current" />
        Audit GitHub Existence
      </Button>
    </form>
  );
}

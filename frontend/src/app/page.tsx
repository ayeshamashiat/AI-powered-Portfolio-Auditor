import { UsernameInput } from "@/components/UsernameInput";
import { Terminal, ShieldAlert, Cpu } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 font-mono select-none">
      <div className="w-full max-w-xl terminal-window border border-neon-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative">
        
        {/* Terminal Title Bar */}
        <div className="terminal-header flex items-center justify-between px-4 py-2 border-b border-neon-cyan/25">
          <div className="flex items-center gap-2">
            {/* Terminal Buttons */}
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-neon-magenta/80" />
              <div className="size-2.5 rounded-full bg-neon-yellow/80" />
              <div className="size-2.5 rounded-full bg-neon-cyan/80" />
            </div>
            <span className="text-[10px] text-neon-cyan/50 uppercase font-semibold tracking-widest pl-2">
              PORTFOLIO_AUDITOR_V1.9.0 // TERMINAL_MAIN
            </span>
          </div>
          <span className="text-[9px] text-neon-cyan/30">SECURE_LINK // PORT: 8000</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Cyberpunk Title / Header */}
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-black tracking-widest text-white flex flex-col sm:flex-row items-center gap-2">
              <Cpu className="size-6 text-neon-cyan animate-pulse shrink-0" />
              <span className="neon-glow-cyan text-neon-cyan">PORTFOLIO</span>
              <span className="neon-glow-magenta text-neon-magenta">AUDITOR</span>
            </h1>
            <p className="text-xs text-neon-cyan/70 max-w-md leading-relaxed">
              Retrieve public portfolio parameters. Evaluate codespace stability. 
              Determine emotional stability and shame metrics.
            </p>
          </div>

          {/* Sarcastic Command Logs */}
          <div className="border border-neon-cyan/15 bg-black/40 p-4 space-y-1.5 text-xs text-neon-cyan/60">
            <div className="flex gap-1">
              <span className="text-neon-magenta font-bold">sys@audit:~$</span>
              <span>load module portfolio_auditor.dll</span>
            </div>
            <div className="text-[10px] text-neon-cyan/45 leading-relaxed space-y-0.5">
              <div>[ OK ] module loaded: emotional_instability_detector</div>
              <div>[ OK ] module loaded: spaghetti_code_analyzer</div>
              <div>[ WARN ] API connection local: http://localhost:8000</div>
              <div className="text-neon-magenta/75 flex items-center gap-1 font-bold animate-pulse mt-1">
                <ShieldAlert className="size-3 shrink-0" />
                <span>WARNING: SOME REPOSITORIES REALLY SHOULD NOT BE PUBLIC.</span>
              </div>
            </div>
          </div>

          {/* Form wrapper */}
          <div className="space-y-4">
            <div className="text-xs text-neon-cyan/80 font-semibold uppercase tracking-wider pl-1">
              Enter target username:
            </div>
            <UsernameInput />
          </div>
        </div>

        {/* Decorative Grid Corners / Cyber accents */}
        <div className="absolute top-[-2px] left-[-2px] size-3 border-t-2 border-l-2 border-neon-cyan" />
        <div className="absolute top-[-2px] right-[-2px] size-3 border-t-2 border-r-2 border-neon-cyan" />
        <div className="absolute bottom-[-2px] left-[-2px] size-3 border-b-2 border-l-2 border-neon-cyan" />
        <div className="absolute bottom-[-2px] right-[-2px] size-3 border-b-2 border-r-2 border-neon-cyan" />
      </div>

      {/* Sarcastic microcopy footers */}
      <div className="mt-6 flex flex-col items-center gap-1 text-[10px] text-neon-cyan/35 text-center">
        <div>"This application evaluates your existence."</div>
        <div>SECURE TERMINAL // NO WARRANTY SUPPLIED</div>
      </div>
    </main>
  );
}

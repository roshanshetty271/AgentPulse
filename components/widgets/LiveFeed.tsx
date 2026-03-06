"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, ChevronDown, ChevronUp } from "lucide-react";

interface LogEntry {
  id: string;
  type: "SYS" | "OK" | "WARN" | "USR" | "ERR";
  message: string;
  timestamp: string;
}

const mockLog: LogEntry[] = [
  { id: "1", type: "USR", message: "incoming connection from Sarah K. [IP: hidden]", timestamp: "14:02:11.405" },
  { id: "2", type: "OK", message: "thread <9A2B> resolved by unit_pia", timestamp: "14:05:01.012" },
  { id: "3", type: "SYS", message: "agent henry status -> ONLINE", timestamp: "14:06:22.888" },
  { id: "4", type: "WARN", message: "latency spike detected on routing node 4", timestamp: "14:08:15.111" },
  { id: "5", type: "ERR", message: "escalation triggered: sentiment threshold breached", timestamp: "14:12:44.902" },
  { id: "6", type: "OK", message: "thread <2B1C> resolved by unit_lindsey", timestamp: "14:15:33.204" },
  { id: "7", type: "USR", message: "incoming connection from John D. [IP: hidden]", timestamp: "14:18:05.555" },
  { id: "8", type: "SYS", message: "garbage collection cycle completed (12ms)", timestamp: "14:22:11.001" },
];

const typeStyles = {
  SYS: "text-text-tertiary",
  OK: "text-accent-green font-medium",
  WARN: "text-accent-yellow font-medium bg-accent-yellow/10 px-2 rounded",
  USR: "text-text-primary",
  ERR: "text-accent-rose font-medium bg-accent-rose/10 px-2 rounded",
};

export default function LiveFeed() {
  const [logs, setLogs] = useState<LogEntry[]>(mockLog);
  const [isLive, setIsLive] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll simulation
  useEffect(() => {
    if (scrollRef.current && isLive && !isCollapsed) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isLive, isCollapsed]);

  return (
    <div className="bg-white shadow-soft flex flex-col h-full rounded-[24px] overflow-hidden">
      {/* Terminal Header */}
      <div
        className="px-4 py-3 border-b border-border-subtle/50 flex items-center justify-between bg-bg-base/50 cursor-pointer hover:bg-bg-overlay transition-colors select-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-bg-overlay flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-text-secondary" />
          </div>
          <h3 className="text-[11px] font-mono font-semibold text-text-primary uppercase tracking-widest">Server.Log</h3>
        </div>
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLive(!isLive);
              }}
              className="flex items-center gap-2 group focus:outline-none bg-white border border-border-subtle/50 px-2 py-1 rounded-md shadow-sm"
            >
              <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors">
                {isLive ? "STREAMING" : "PAUSED"}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${isLive ? "bg-accent-green animate-pulse" : "bg-text-tertiary"
                  }`}
              />
            </button>
          )}
          <button
            className="p-1 hover:bg-bg-overlay rounded transition-colors text-text-secondary"
            aria-label={isCollapsed ? "Expand logs" : "Collapse logs"}
            tabIndex={-1}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Log Feed */}
      {!isCollapsed && (
        <>
          <div
            ref={scrollRef}
            className="flex-1 bg-bg-base p-4 overflow-y-auto space-y-1 font-mono text-xs w-full overflow-x-hidden min-h-[300px]"
          >
            {logs.map((log) => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 hover:bg-white transition-colors border-l-2 border-transparent hover:border-black pl-2 py-1">
                <span className="text-text-tertiary w-24 flex-shrink-0 tracking-tighter">[{log.timestamp}]</span>
                <span className={`w-12 flex-shrink-0 ${typeStyles[log.type]}`}>[{log.type}]</span>
                <span className="text-text-primary break-all sm:break-normal">{log.message}</span>
              </div>
            ))}
            {isLive && (
              <div className="flex items-center gap-2 pl-2 mt-4">
                <span className="text-text-tertiary w-24 tracking-tighter">[....:..:......]</span>
                <span className="w-2 h-3 bg-black animate-pulse" />
              </div>
            )}
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-3 border-t border-border-subtle/50 bg-bg-base/50 flex justify-between items-center">
            <span className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase font-medium">
              {logs.length} events logged
            </span>
            <span className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase font-medium">
              tail -f /var/log/agentpulse
            </span>
          </div>
        </>
      )}
    </div>
  );
}


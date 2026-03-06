"use client";

import { MessageSquare, Clock, Zap } from "lucide-react";

import { type Agent } from "@/lib/data";

interface AgentStatusCardProps extends Agent { }

const statusStyles = {
  online: "bg-accent-green",
  busy: "bg-accent-yellow",
  offline: "bg-text-disabled",
};

const statusLabels = {
  online: "Online",
  busy: "Busy",
  offline: "Offline",
};

export default function AgentStatusCard({
  name,
  avatar,
  status,
  conversations,
  avgResponseTime,
  resolutionRate,
}: AgentStatusCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col cursor-pointer group overflow-hidden"
      role="button"
      tabIndex={0}
      onClick={() => window.dispatchEvent(new CustomEvent("open-agent-drawer", { detail: name }))}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("open-agent-drawer", { detail: name }));
        }
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-bg-overlay flex items-center justify-center text-2xl group-hover:bg-accent-blue/10 transition-colors">
            {avatar}
          </div>
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white ${statusStyles[status]}`}
          />
        </div>
        <div>
          <h4 className="text-lg font-sans font-semibold text-text-primary tracking-tight">{name}</h4>
          <p className="text-[11px] font-medium uppercase tracking-wide text-text-secondary mt-0.5">{statusLabels[status]}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 border-t border-border-subtle/50 pt-5 mt-auto">
        <div className="text-center flex flex-col items-center justify-center">
          <MessageSquare className="w-4 h-4 text-text-secondary mb-1.5" />
          <p className="text-sm font-semibold text-text-primary">{conversations}</p>
          <p className="text-[10px] font-medium text-text-tertiary mt-0.5">Chats</p>
        </div>
        <div className="text-center flex flex-col items-center justify-center border-x border-border-subtle/50">
          <Clock className="w-4 h-4 text-text-secondary mb-1.5" />
          <p className="text-sm font-semibold text-text-primary">{avgResponseTime}</p>
          <p className="text-[10px] font-medium text-text-tertiary mt-0.5">Time</p>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <Zap className="w-4 h-4 text-text-secondary mb-1.5" />
          <p className="text-sm font-semibold text-text-primary">{resolutionRate}%</p>
          <p className="text-[10px] font-medium text-text-tertiary mt-0.5">Solved</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X, Activity, MessageSquare, Clock, Zap, Target } from "lucide-react";
import { agents, type Agent } from "@/lib/data";

export default function AgentDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAgentName, setSelectedAgentName] = useState<string | null>(null);

    useEffect(() => {
        const handleOpen = (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            setSelectedAgentName(customEvent.detail);
            setIsOpen(true);
            document.body.style.overflow = "hidden"; // Prevent background scroll
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                document.body.style.overflow = "auto";
            }
        };

        window.addEventListener("open-agent-drawer", handleOpen);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("open-agent-drawer", handleOpen);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const closeDrawer = () => {
        setIsOpen(false);
        setTimeout(() => {
            setSelectedAgentName(null);
        }, 300); // Wait for transition
        document.body.style.overflow = "auto";
    };

    const agent = agents.find((a) => a.name === selectedAgentName);

    if (!agent && !isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeDrawer}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-full md:w-[480px] bg-white border-l border-border-subtle/50 shadow-elevated z-[120] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                role="dialog"
                aria-label="Agent Details"
                aria-modal="true"
            >
                {/* Header */}
                <div className="p-8 border-b border-border-subtle/50 flex justify-between items-start bg-bg-surface">
                    <div className="flex gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-bg-overlay flex items-center justify-center text-3xl">
                            {agent?.avatar}
                        </div>
                        <div>
                            <h2 className="text-2xl font-sans font-bold tracking-tight text-text-primary">{agent?.name}</h2>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full ${agent?.status === "online"
                                        ? "bg-accent-green"
                                        : agent?.status === "busy"
                                            ? "bg-accent-amber"
                                            : "bg-text-disabled"
                                        }`}
                                />
                                <span className="text-[11px] uppercase tracking-wide font-medium text-text-secondary">
                                    {agent?.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={closeDrawer}
                        className="p-2 rounded-full hover:bg-bg-overlay hover:text-text-primary text-text-secondary transition-colors focus:outline-none"
                        aria-label="Close Drawer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
                    {/* Key Metrics Grid */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-text-secondary">Real-time Telemetry</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-bg-base/50 p-5 rounded-xl border border-border-subtle/50">
                                <div className="flex gap-2 text-text-secondary items-center mb-3">
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="text-[11px] font-medium uppercase tracking-wide">Conversations</span>
                                </div>
                                <div className="text-3xl font-sans font-bold text-text-primary">{agent?.conversations}</div>
                            </div>
                            <div className="bg-bg-base/50 p-5 rounded-xl border border-border-subtle/50">
                                <div className="flex gap-2 text-text-secondary items-center mb-3">
                                    <Target className="w-4 h-4" />
                                    <span className="text-[11px] font-medium uppercase tracking-wide">Resolution Rate</span>
                                </div>
                                <div className="text-3xl font-sans font-bold text-text-primary">{agent?.resolutionRate}%</div>
                            </div>
                            <div className="bg-bg-base/50 p-5 rounded-xl border border-border-subtle/50">
                                <div className="flex gap-2 text-text-secondary items-center mb-3">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[11px] font-medium uppercase tracking-wide">Response Time</span>
                                </div>
                                <div className="text-3xl font-sans font-bold text-text-primary">{agent?.avgResponseTime}</div>
                            </div>
                            <div className="bg-bg-base/50 p-5 rounded-xl border border-border-subtle/50">
                                <div className="flex gap-2 text-text-secondary items-center mb-3">
                                    <Zap className="w-4 h-4" />
                                    <span className="text-[11px] font-medium uppercase tracking-wide">API Latency</span>
                                </div>
                                <div className="text-3xl font-sans font-bold text-text-primary">124ms</div>
                            </div>
                        </div>
                    </div>

                    {/* Active Workload Section */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-text-secondary">Current Workload</h3>
                        {agent?.status === "offline" ? (
                            <div className="border border-dashed border-border-subtle rounded-xl p-8 text-center text-text-tertiary text-sm font-medium">
                                Agent is offline. No active threads.
                            </div>
                        ) : (
                            <div className="border border-border-subtle/50 rounded-xl divide-y divide-border-subtle/50 bg-bg-surface overflow-hidden">
                                {/* Mock live threads */}
                                <div className="p-4 flex items-start justify-between hover:bg-bg-base/50 transition-colors cursor-pointer group">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                                            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-blue">Thread 9A2B</span>
                                        </div>
                                        <p className="text-sm text-text-primary pr-4">Analyzing customer billing statement variance...</p>
                                    </div>
                                    <span className="text-[11px] font-mono font-medium text-text-tertiary mt-1">2m 14s</span>
                                </div>
                                {agent?.status === "busy" && (
                                    <div className="p-4 flex items-start justify-between hover:bg-bg-base/50 transition-colors cursor-pointer group">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                                                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-blue">Thread 4F8C</span>
                                            </div>
                                            <p className="text-sm text-text-primary pr-4">Processing enterprise upgrade path.</p>
                                        </div>
                                        <span className="text-[11px] font-mono font-medium text-text-tertiary mt-1">8m 03s</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Configuration Settings */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-text-secondary">System Instructions</h3>
                        <div className="bg-bg-base rounded-xl p-5 font-mono text-[13px] leading-relaxed text-text-primary border border-border-subtle/50 overflow-x-auto whitespace-pre">
                            <span className="text-accent-blue font-medium"># loaded core profile:</span> {agent?.name.toUpperCase()}_SUPPORT<br />
                            <span className="text-accent-green font-medium"># routing clearance:</span> L2_ESCALATION<br />
                            <span className="text-text-tertiary">export BASE_TEMP=</span>0.2<br />
                            <span className="text-text-tertiary">export MEMORY_WINDOW=</span>4096<br />
                        </div>
                        <button className="w-full mt-4 py-3 bg-white border border-border-subtle/50 rounded-xl text-[13px] font-semibold text-text-primary shadow-sm hover:shadow hover:border-border-subtle transition-all">
                            Edit Configuration
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

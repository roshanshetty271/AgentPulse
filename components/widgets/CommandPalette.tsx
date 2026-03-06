"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, ArrowRight, User, Settings, BarChart3, MessageSquare, Maximize } from "lucide-react";
import { useRouter } from "next/navigation";
import { agents, conversations } from "@/lib/data";

type CommandItem = {
    id: string;
    category: string;
    name: string;
    icon: any;
    action: () => void;
};

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Listen for global open event and keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        const handleCustomOpen = () => setIsOpen(true);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("open-command-palette", handleCustomOpen);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("open-command-palette", handleCustomOpen);
        };
    }, []);

    // Run when opened
    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 10);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const baseCommands: CommandItem[] = [
        { id: "act-focus", category: "Actions", name: "Toggle Focus Mode (Zen Mode)", icon: Maximize, action: () => window.dispatchEvent(new CustomEvent("toggle-focus-mode")) },
        { id: "nav-dash", category: "Navigation", name: "Go to Dashboard", icon: BarChart3, action: () => router.push("/dashboard") },
        { id: "nav-conv", category: "Navigation", name: "Go to Conversations", icon: MessageSquare, action: () => router.push("/conversations") },
        { id: "nav-agents", category: "Navigation", name: "Go to Agents", icon: User, action: () => router.push("/agents") },
        { id: "nav-settings", category: "Navigation", name: "Go to Settings", icon: Settings, action: () => router.push("/settings") },
        { id: "act-new", category: "Actions", name: "Create New Agent", icon: Loader2, action: () => alert("New Agent flow initiated.") },
        { id: "act-export", category: "Actions", name: "Export Weekly Report", icon: ArrowRight, action: () => alert("Exporting report to CSV.") },
    ];

    const agentCommands: CommandItem[] = agents.map(agent => ({
        id: `agent-${agent.name}`,
        category: "Agents",
        name: `Agent: ${agent.name} (${agent.status})`,
        icon: User,
        action: () => {
            // Dispatch event to open drawer globally
            window.dispatchEvent(new CustomEvent("open-agent-drawer", { detail: agent.name }));
        }
    }));

    const conversationCommands: CommandItem[] = conversations.map(conv => ({
        id: `conv-${conv.id}`,
        category: "Conversations",
        name: `Chat: ${conv.customer} via ${conv.channel}`,
        icon: MessageSquare,
        action: () => router.push("/conversations")
    }));

    const allCommands = [...baseCommands, ...agentCommands, ...conversationCommands];

    const filteredCommands = allCommands.filter((cmd) =>
        cmd.name.toLowerCase().includes(query.toLowerCase()) ||
        cmd.category.toLowerCase().includes(query.toLowerCase())
    );

    // Keyboard navigation within palette
    useEffect(() => {
        if (!isOpen) return;
        const handleNavigation = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === "Enter" && filteredCommands.length > 0) {
                e.preventDefault();
                filteredCommands[selectedIndex].action();
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleNavigation);
        return () => window.removeEventListener("keydown", handleNavigation);
    }, [isOpen, filteredCommands, selectedIndex]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Palette Modal */}
            <div
                className="bg-white/95 backdrop-blur-xl border border-border-subtle/50 w-full max-w-2xl shadow-floating relative z-10 flex flex-col max-h-[70vh] overflow-hidden rounded-2xl"
                role="dialog"
                aria-modal="true"
                aria-label="Command Palette"
            >
                {/* Search Input */}
                <div className="p-5 border-b border-border-subtle/50 flex items-center gap-4 bg-white/50">
                    <Search className="w-6 h-6 text-text-secondary" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent border-none outline-none text-xl font-sans tracking-tight text-text-primary placeholder:text-text-tertiary"
                        placeholder="Search commands, agents..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[10px] font-mono font-medium uppercase tracking-widest bg-bg-base text-text-secondary px-2 py-1 rounded hover:bg-bg-overlay transition-colors"
                    >
                        ESC
                    </button>
                </div>

                {/* Results List */}
                <div className="overflow-y-auto flex-1 p-2">
                    {filteredCommands.length === 0 ? (
                        <div className="p-8 text-center text-text-tertiary font-medium text-sm">
                            No results found for &quot;{query}&quot;
                        </div>
                    ) : (
                        filteredCommands.map((cmd, idx) => {
                            const isSelected = idx === selectedIndex;
                            return (
                                <button
                                    key={cmd.id}
                                    onClick={() => {
                                        cmd.action();
                                        setIsOpen(false);
                                    }}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-4 rounded-xl ${isSelected ? "bg-accent-blue/10" : "bg-transparent"
                                        } transition-colors focus:outline-none mb-1`}
                                >
                                    <div className={`p-2 rounded-lg ${isSelected ? "bg-white shadow-sm text-accent-blue" : "text-text-secondary bg-bg-base"}`}>
                                        <cmd.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-[11px] font-semibold uppercase tracking-wider ${isSelected ? "text-accent-blue" : "text-text-tertiary"}`}>
                                            {cmd.category}
                                        </span>
                                        <span className={`text-sm font-sans font-medium ${isSelected ? "text-text-primary" : "text-text-primary"}`}>
                                            {cmd.name}
                                        </span>
                                    </div>
                                    {isSelected && (
                                        <ArrowRight className="w-4 h-4 text-accent-blue ml-auto opacity-50" />
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

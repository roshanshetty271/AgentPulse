"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CommandPalette from "@/components/widgets/CommandPalette";
import AgentDrawer from "@/components/drawers/AgentDrawer";
import { Maximize, Minimize } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isFocusMode, setIsFocusMode] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        // Keyboard shortcut to toggle sidebar (⌘B or Ctrl+B)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                setIsSidebarOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        const toggleFocusMode = () => {
            setIsFocusMode(prev => !prev);
        };
        window.addEventListener("toggle-focus-mode", toggleFocusMode);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("toggle-focus-mode", toggleFocusMode);
        };
    }, []);

    // Also block scrolling if drawer is open (done handled in AgentDrawer ideally, but here focus mode is layout level
    useEffect(() => {
        if (isFocusMode) {
            // Optional: You could request full screen here
            // document.documentElement.requestFullscreen().catch(() => {});
        } else {
            // if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        }
    }, [isFocusMode]);

    return (
        <div className="min-h-screen bg-bg-base relative">
            <CommandPalette />
            <AgentDrawer />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {!isFocusMode && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

            {/* Main Content Wrapper */}
            <div
                className={`transition-[padding] duration-300 ease-in-out w-full ${isFocusMode ? "p-0" : (isSidebarOpen ? "lg:pl-56 pl-0" : "lg:pl-16 pl-0")}`}
            >
                {!isFocusMode && (
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />
                )}

                {isFocusMode && (
                    <button
                        onClick={() => setIsFocusMode(false)}
                        className="fixed top-4 right-4 z-[90] bg-white text-text-primary px-4 py-2.5 rounded-xl border border-border-subtle flex items-center gap-2 hover:bg-bg-overlay transition-all shadow-elevated group"
                    >
                        <Minimize className="w-4 h-4 text-text-secondary group-hover:text-text-primary" />
                        <span className="text-xs font-semibold">Exit Focus</span>
                    </button>
                )}

                <div className={isFocusMode ? "p-4 md:p-8 max-w-[1600px] mx-auto transition-all" : ""}>
                    {children}
                </div>
            </div>
        </div>
    );
}

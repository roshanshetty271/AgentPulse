"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Plus, Calendar, ChevronDown, Menu, Maximize, X, Check, Activity, FileText } from "lucide-react";

interface HeaderProps {
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<"date" | "notifications" | "new" | null>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} className="h-16 flex items-center justify-between px-6 bg-white sticky top-0 z-40 relative">
      <div className="flex items-center gap-4">
        {/* Mobile Toggle Button */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 text-text-secondary hover:text-black border border-transparent hover:border-border-subtle transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-black"
            aria-expanded={isSidebarOpen}
            aria-controls="main-sidebar"
            aria-label="Toggle Sidebar Menu"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search */}
        <div className="relative w-72 md:w-96 hidden sm:block">
          <label htmlFor="global-search" className="sr-only">Search</label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" aria-hidden="true" />
          <input
            id="global-search"
            type="text"
            readOnly
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            placeholder="Search agents, conversations [⌘K]..."
            className="w-full pl-10 pr-4 py-2.5 bg-bg-overlay border border-transparent rounded-xl text-sm font-sans tracking-wide text-text-primary placeholder:text-text-tertiary focus:outline-none focus:bg-white focus:border-accent-blue focus:ring-0 transition-colors cursor-pointer disabled:opacity-50"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white border border-border-subtle rounded-md text-[10px] text-text-tertiary font-medium uppercase tracking-widest pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 relative">
        {/* Date range selector */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setActiveDropdown(activeDropdown === "date" ? null : "date")}
            className={`flex flex-row items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors focus:outline-none ${activeDropdown === "date" ? "bg-bg-overlay text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-bg-overlay"}`}
            aria-haspopup="true"
            aria-expanded={activeDropdown === "date"}
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Last 7 days</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "date" ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          {/* Date Dropdown */}
          {activeDropdown === "date" && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-border-subtle rounded-xl shadow-floating z-50 py-2 flex flex-col">
              <button className="px-4 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-bg-overlay transition-colors flex justify-between items-center group">
                Today <span className="opacity-0 group-hover:opacity-100 text-accent-blue"><Check className="w-4 h-4" /></span>
              </button>
              <button className="px-4 py-2.5 text-left text-sm font-medium text-accent-blue bg-accent-blue/10 flex justify-between items-center group">
                Last 7 Days <Check className="w-4 h-4" />
              </button>
              <button className="px-4 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-bg-overlay transition-colors flex justify-between items-center group">
                Last 30 Days <span className="opacity-0 group-hover:opacity-100 text-accent-blue"><Check className="w-4 h-4" /></span>
              </button>
              <button className="px-4 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-bg-overlay transition-colors flex justify-between items-center group">
                Year to Date <span className="opacity-0 group-hover:opacity-100 text-accent-blue"><Check className="w-4 h-4" /></span>
              </button>
              <div className="border-t border-border-subtle my-1"></div>
              <button className="px-4 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-bg-overlay transition-colors">
                Custom Range...
              </button>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-border-subtle mx-2 hidden md:block" />

        {/* Focus Mode */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-focus-mode"))}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-black hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-yellow drop-shadow-sm"
          title="Enter Zen Mode"
        >
          <Maximize className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Focus</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === "notifications" ? null : "notifications")}
            className={`relative p-2.5 rounded-full transition-colors focus:outline-none ${activeDropdown === "notifications" ? "bg-bg-overlay text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-bg-overlay"}`}
            aria-label="View notifications, 1 unread"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-accent-blue ring-2 ring-white" aria-hidden="true" />
          </button>

          {/* Notifications Dropdown */}
          {activeDropdown === "notifications" && (
            <div className="absolute top-full mt-2 right-0 w-80 bg-white border border-border-subtle rounded-2xl shadow-floating z-50 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-bg-base/50">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">System Logs</span>
                <span className="text-[10px] font-bold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">1 NEW</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 border-b border-border-subtle hover:bg-bg-base/50 transition-colors cursor-pointer bg-accent-blue/5 flex gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors">Weekly Report Generated</p>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">Your automated weekly performance digest is ready for review.</p>
                    <p className="text-[10px] font-medium text-text-tertiary mt-2 uppercase tracking-wide">2 hours ago</p>
                  </div>
                </div>
                <div className="p-4 hover:bg-bg-base/50 transition-colors cursor-pointer bg-white flex gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-border-subtle/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Activity className="w-4 h-4 text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors">Traffic Spike Detected</p>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">Unusual volume observed on the support channel between 14:00 and 15:00 UTC.</p>
                    <p className="text-[10px] font-medium text-text-tertiary mt-2 uppercase tracking-wide">Yesterday</p>
                  </div>
                </div>
              </div>
              <button className="p-3 border-t border-border-subtle text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-overlay transition-colors text-center w-full">
                View All Logs
              </button>
            </div>
          )}
        </div>

        {/* New agent */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === "new" ? null : "new")}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className={`w-4 h-4 transition-transform ${activeDropdown === "new" ? "rotate-45" : ""}`} aria-hidden="true" />
            <span className="hidden sm:inline">New Agent</span>
          </button>

          {/* New Agent Dropdown */}
          {activeDropdown === "new" && (
            <div className="absolute top-full mt-2 right-0 w-56 bg-white border border-border-subtle rounded-2xl shadow-floating z-50 flex flex-col p-2 space-y-1">
              <button className="px-4 py-3 rounded-xl text-left hover:bg-bg-overlay transition-colors flex flex-col group">
                <span className="text-sm font-semibold text-text-primary group-hover:text-accent-blue">Blank Template</span>
                <span className="text-xs text-text-tertiary mt-0.5">Start from scratch</span>
              </button>
              <button className="px-4 py-3 rounded-xl text-left hover:bg-bg-overlay transition-colors flex flex-col group">
                <span className="text-sm font-semibold text-text-primary group-hover:text-accent-blue">Customer Support</span>
                <span className="text-xs text-text-tertiary mt-0.5">Trained on knowledgebase</span>
              </button>
              <button className="px-4 py-3 rounded-xl text-left hover:bg-bg-overlay transition-colors flex flex-col group">
                <span className="text-sm font-semibold text-text-primary group-hover:text-accent-blue">Sales Engineer</span>
                <span className="text-xs text-text-tertiary mt-0.5">Technical product expert</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


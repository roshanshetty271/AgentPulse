"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Zap,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Agents", href: "/agents", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Integrations", href: "/integrations", icon: Zap },
];

const bottomNav = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 bg-bg-base flex flex-col z-50 transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0 w-56" : "-translate-x-full lg:translate-x-0 lg:w-16"}`}
      aria-label="Main Navigation"
    >
      {/* Toggle & Logo */}
      <div className={`h-16 flex items-center bg-white transition-all duration-300 ${isOpen ? "px-4 justify-between" : "px-0 justify-center"}`}>
        {isOpen && (
          <div className="flex items-center gap-3 overflow-hidden ml-1">
            <div className="w-8 h-8 rounded-lg min-w-[32px] bg-accent-blue/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Zap className="w-4 h-4 text-accent-blue" />
            </div>
            <span className="font-sans font-semibold text-lg tracking-tight text-text-primary whitespace-nowrap">AgentPulse</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-secondary hover:text-black hover:bg-bg-overlay rounded-lg transition-colors focus:outline-none"
          aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          title="Toggle Sidebar (⌘B)"
        >
          <Menu className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>

      {/* Main navigation */}
      <nav className={`flex-1 py-8 space-y-2 bg-white ${isOpen ? "px-4" : "px-2"}`}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={!isOpen ? item.name : undefined}
              className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-sans font-medium transition-all group ${isActive
                ? "bg-accent-blue/10 text-accent-blue shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-overlay"
                } ${isOpen ? "px-3" : "px-0 justify-center"}`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {isOpen && (
                <>
                  <span className="whitespace-nowrap overflow-hidden">{item.name}</span>
                  {item.name === "Conversations" && (
                    <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-blue/10 text-accent-blue">
                      12
                    </span>
                  )}
                </>
              )}
              {/* Optional: Add screen reader only text when collapsed */}
              {!isOpen && <span className="sr-only">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom navigation */}
      <div className={`py-4 space-y-2 bg-white ${isOpen ? "px-4" : "px-2"}`}>
        {bottomNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={!isOpen ? item.name : undefined}
            className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-sans font-medium text-text-secondary hover:text-text-primary hover:bg-bg-overlay transition-colors ${isOpen ? "px-3" : "px-0 justify-center"}`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {isOpen && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
            {!isOpen && <span className="sr-only">{item.name}</span>}
          </Link>
        ))}
      </div>

      {/* User section */}
      <div className={`p-4 bg-bg-base flex items-center ${isOpen ? "gap-3" : "justify-center flex-col gap-2"}`}>
        <div className="w-9 h-9 rounded-full bg-border-subtle flex items-center justify-center text-text-secondary font-sans font-medium text-sm flex-shrink-0" aria-hidden="true">
          RS
        </div>
        {isOpen && (
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold font-sans text-text-primary truncate tracking-tight">Roshan Shetty</p>
            <p className="text-[11px] font-sans font-medium text-text-tertiary truncate">Admin</p>
          </div>
        )}
        <button
          className="p-2 text-text-tertiary hover:text-black border border-transparent hover:border-border-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          aria-label="Log out"
          title="Log out"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
        </button>
      </div>

    </aside>
  );
}

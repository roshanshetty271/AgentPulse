import DashboardLayout from "@/components/layout/DashboardLayout";
import { User, Bell, Network, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <main className="p-6 md:p-10 lg:p-12">
                <div className="mb-12 border-b border-border-subtle/50 pb-8">
                    <h1 className="text-4xl font-sans font-bold text-text-primary tracking-tight">Settings</h1>
                    <p className="text-sm font-medium text-text-tertiary mt-2">
                        Manage your workspace preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar nav for settings */}
                    <div className="md:col-span-1 space-y-1">
                        <button className="w-full text-left px-4 py-3 bg-accent-blue/10 text-accent-blue rounded-xl flex items-center gap-3 transition-colors font-medium text-sm focus:outline-none">
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-base rounded-xl flex items-center gap-3 transition-colors font-medium text-sm focus:outline-none group">
                            <Network className="w-4 h-4 group-hover:text-text-primary" />
                            <span>Workspace</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-base rounded-xl flex items-center gap-3 transition-colors font-medium text-sm focus:outline-none group">
                            <Bell className="w-4 h-4 group-hover:text-text-primary" />
                            <span>Notifications</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-base rounded-xl flex items-center gap-3 transition-colors font-medium text-sm focus:outline-none group">
                            <Shield className="w-4 h-4 group-hover:text-text-primary" />
                            <span>Security</span>
                        </button>
                    </div>

                    {/* Main Form Area */}
                    <div className="md:col-span-3 bg-white border border-border-subtle/50 rounded-2xl p-8 shadow-soft overflow-hidden">
                        <h2 className="text-xl font-sans font-bold tracking-tight text-text-primary border-b border-border-subtle/50 pb-5 mb-6">Profile Settings</h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">First Name</label>
                                    <input type="text" defaultValue="Roshan" className="w-full border border-border-subtle/50 rounded-xl p-3 bg-bg-base focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all text-text-primary text-sm font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Last Name</label>
                                    <input type="text" defaultValue="Shetty" className="w-full border border-border-subtle/50 rounded-xl p-3 bg-bg-base focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all text-text-primary text-sm font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Email Address</label>
                                <input type="email" defaultValue="admin@agentpulse.io" className="w-full border border-border-subtle/50 rounded-xl p-3 bg-bg-base focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all text-text-primary text-sm font-medium" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Agent Display Name</label>
                                <div className="flex">
                                    <span className="border border-r-0 border-border-subtle/50 rounded-l-xl bg-bg-base p-3 text-text-tertiary font-mono">@</span>
                                    <input type="text" defaultValue="roshan_admin" className="w-full border border-border-subtle/50 rounded-r-xl p-3 bg-bg-base focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all text-text-primary text-sm font-medium" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border-subtle/50 flex justify-end gap-4">
                                <button type="button" className="px-6 py-2.5 rounded-xl border border-border-subtle/50 bg-white hover:bg-bg-base transition-colors text-sm font-medium text-text-secondary hover:text-text-primary shadow-sm">
                                    Cancel
                                </button>
                                <button type="button" className="px-6 py-2.5 rounded-xl bg-accent-blue hover:bg-accent-indigo text-white transition-colors text-sm font-medium shadow-sm">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}

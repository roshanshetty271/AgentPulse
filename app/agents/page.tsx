import DashboardLayout from "@/components/layout/DashboardLayout";
import AgentStatusCard from "@/components/cards/AgentStatusCard";
import { agents } from "@/lib/data";
import { Plus, Settings } from "lucide-react";

export default function AgentsPage() {
    return (
        <DashboardLayout>
            <main className="p-6 md:p-10 lg:p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-subtle/50 pb-8">
                    <div>
                        <h1 className="text-4xl font-sans font-bold text-text-primary tracking-tight">Workforce</h1>
                        <p className="text-sm font-medium text-text-tertiary mt-2">
                            Fleet of {agents.length} specialized AI agents
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-border-subtle/50 bg-white hover:bg-bg-base hover:text-text-primary text-text-secondary rounded-xl font-medium text-sm transition-all shadow-sm">
                            <Settings className="w-4 h-4" />
                            Global Settings
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-accent-blue hover:bg-accent-indigo text-white rounded-xl font-medium text-sm transition-all shadow-sm">
                            <Plus className="w-4 h-4" />
                            Deploy Agent
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {agents.map((agent) => (
                        <AgentStatusCard key={agent.name} {...agent} />
                    ))}

                    {/* Add New Placeholder Card */}
                    <div className="bg-transparent rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer border border-dashed border-border-subtle hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all group min-h-[220px] overflow-hidden text-center">
                        <div className="w-14 h-14 rounded-full bg-white border border-border-subtle/50 flex items-center justify-center group-hover:text-accent-blue group-hover:border-accent-blue/50 group-hover:shadow-soft transition-all mb-4 text-text-tertiary">
                            <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-semibold text-text-secondary group-hover:text-accent-blue transition-colors">Configure New Profile</p>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}

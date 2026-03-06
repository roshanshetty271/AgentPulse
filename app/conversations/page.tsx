import DashboardLayout from "@/components/layout/DashboardLayout";
import ConversationsTable from "@/components/tables/ConversationsTable";
import { conversations } from "@/lib/data";
import { Search, Filter, Download } from "lucide-react";

export default function ConversationsPage() {
    return (
        <DashboardLayout>
            <main className="p-6 md:p-10 lg:p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-subtle/50 pb-8">
                    <div>
                        <h1 className="text-4xl font-sans font-bold text-text-primary tracking-tight">Conversations</h1>
                        <p className="text-sm font-medium text-text-tertiary mt-2">
                            View and manage {conversations.length} active threads
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                            <input
                                type="text"
                                placeholder="Search transcripts..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-subtle/50 rounded-xl text-sm font-medium text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all shadow-sm"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-border-subtle/50 bg-white hover:bg-bg-base hover:text-text-primary text-text-secondary rounded-xl font-medium text-sm transition-all shadow-sm">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-accent-blue hover:bg-accent-indigo text-white rounded-xl font-medium text-sm transition-all shadow-sm">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                <div>
                    <ConversationsTable conversations={conversations} />
                </div>
            </main>
        </DashboardLayout>
    );
}

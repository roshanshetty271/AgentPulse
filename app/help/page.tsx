import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Book, Terminal, MessageSquare, PlayCircle } from "lucide-react";

export default function HelpPage() {
    const categories = [
        { title: "Getting Started", desc: "Quick setup guides for new agents", icon: PlayCircle },
        { title: "Dashboard Manual", desc: "Understanding metrics and telemetry", icon: Book },
        { type: "callout", title: "API Reference", desc: "For developers and technical integrations", icon: Terminal },
        { title: "Community Forum", desc: "Ask questions and share workflows", icon: MessageSquare }
    ];

    return (
        <DashboardLayout>
            <main className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-sans font-bold text-text-primary tracking-tight mb-4">How can we help?</h1>
                    <p className="text-sm font-medium text-text-tertiary">
                        Search our documentation or browse categories below
                    </p>

                    <div className="relative max-w-2xl mx-auto mt-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search guides, tutorials, and API endpoints..."
                            className="w-full pl-12 pr-4 py-4 text-base border border-border-subtle/50 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all shadow-soft text-text-primary placeholder:text-text-tertiary font-medium"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    {categories.map((cat, i) => (
                        <div key={i} className={`p-8 border rounded-2xl flex items-start gap-5 transition-all cursor-pointer group hover:shadow-soft hover:border-accent-blue/50 overflow-hidden ${cat.type === 'callout' ? 'bg-text-primary text-white border-transparent shadow-elevated' : 'bg-white border-border-subtle/50 shadow-sm'}`}>
                            <div className={`p-3 rounded-xl flex items-center justify-center transition-colors ${cat.type === 'callout' ? 'bg-white/10 text-white group-hover:bg-white/20' : 'bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue/20'}`}>
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className={`text-lg font-sans font-bold mb-1.5 ${cat.type === 'callout' ? 'text-white' : 'text-text-primary'}`}>{cat.title}</h3>
                                <p className={`text-sm font-medium ${cat.type === 'callout' ? 'text-zinc-400' : 'text-text-secondary'}`}>{cat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </DashboardLayout>
    );
}

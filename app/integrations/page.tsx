import DashboardLayout from "@/components/layout/DashboardLayout";
import { Zap, MessagesSquare, Mail, Phone, Code2 } from "lucide-react";

export default function IntegrationsPage() {
    const integrations = [
        { name: "Slack", category: "Chat", status: "Connected", icon: MessagesSquare, color: "bg-blue-500/10 text-blue-500" },
        { name: "Discord", category: "Chat", status: "Not Connected", icon: MessagesSquare, color: "bg-indigo-500/10 text-indigo-500" },
        { name: "Zendesk", category: "Support", status: "Connected", icon: Zap, color: "bg-emerald-500/10 text-emerald-500" },
        { name: "Twilio", category: "Voice/SMS", status: "Not Connected", icon: Phone, color: "bg-rose-500/10 text-rose-500" },
        { name: "SendGrid", category: "Email", status: "Not Connected", icon: Mail, color: "bg-sky-500/10 text-sky-500" },
        { name: "Custom Webhook", category: "Developer Tools", status: "Active", icon: Code2, color: "bg-zinc-500/10 text-zinc-500" }
    ];

    return (
        <DashboardLayout>
            <main className="p-6 md:p-10 lg:p-12">
                <div className="mb-12 border-b border-border-subtle/50 pb-8">
                    <h1 className="text-4xl font-sans font-bold text-text-primary tracking-tight">Integrations</h1>
                    <p className="text-sm font-medium text-text-tertiary mt-2">
                        Connect your AI workforce to internal tools
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {integrations.map((app) => (
                        <div key={app.name} className="bg-white border border-border-subtle/50 rounded-2xl p-6 flex flex-col hover:border-accent-blue/50 hover:shadow-soft transition-all cursor-pointer group overflow-hidden">
                            <div className="flex justify-between items-start mb-8 min-w-0">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${app.color}`}>
                                    <app.icon className="w-5 h-5" />
                                </div>
                                <div className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${app.status === 'Connected' || app.status === 'Active' ? 'bg-accent-green/10 text-accent-green border-accent-green/20' : 'bg-transparent text-text-tertiary border-border-subtle/50'}`}>
                                    {app.status}
                                </div>
                            </div>
                            <div className="mt-auto">
                                <h3 className="text-lg font-sans font-bold text-text-primary">{app.name}</h3>
                                <p className="text-sm text-text-secondary mt-1">{app.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </DashboardLayout>
    );
}

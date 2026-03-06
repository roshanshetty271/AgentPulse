import DashboardLayout from "@/components/layout/DashboardLayout";
import ConversationsChart from "@/components/charts/ConversationsChart";
import ResolutionDonut from "@/components/charts/ResolutionDonut";
import ChannelBreakdown from "@/components/charts/ChannelBreakdown";
import { chartData, resolutionData, channelData } from "@/lib/data";

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <main className="p-6 md:p-10 lg:p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-subtle/50 pb-8">
                    <div>
                        <h1 className="text-4xl font-sans font-bold text-text-primary tracking-tight">Analytics</h1>
                        <p className="text-sm font-medium text-text-tertiary mt-2">
                            Deep dive into performance metrics and telemetry
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <select className="px-4 py-2.5 border border-border-subtle/50 bg-white rounded-xl text-sm font-medium text-text-primary outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue shadow-sm cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Year to Date</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2 flex flex-col items-stretch">
                        <ConversationsChart data={chartData} />
                    </div>
                    <div className="flex flex-col items-stretch">
                        <ResolutionDonut
                            data={resolutionData}
                            centerValue="90%"
                            centerLabel="Resolved"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col items-stretch">
                        <ChannelBreakdown data={channelData} />
                    </div>
                    <div className="bg-transparent border border-dashed border-border-subtle rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] overflow-hidden text-center">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-blue mb-2">Beta Module</span>
                        <span className="text-xl font-bold font-sans text-text-primary">Sentiment Heatmap</span>
                        <p className="text-text-secondary text-sm mt-2 text-center max-w-sm">
                            Advanced AI sentiment tracking is currently being rolled out. Check back soon.
                        </p>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}

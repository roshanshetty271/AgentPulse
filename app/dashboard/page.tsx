import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/cards/StatCard";
import AgentStatusCard from "@/components/cards/AgentStatusCard";
import ConversationsChart from "@/components/charts/ConversationsChart";
import ResolutionDonut from "@/components/charts/ResolutionDonut";
import ChannelBreakdown from "@/components/charts/ChannelBreakdown";
import ConversationsTable from "@/components/tables/ConversationsTable";
import LiveFeed from "@/components/widgets/LiveFeed";
import { MessageSquare, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { chartData, resolutionData, agents, conversations, channelData, hourlyData } from "@/lib/data";

export default function DashboardPage() {
  const sparklineValues = hourlyData.map((d) => d.value);
  return (
    <DashboardLayout>
      <main className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto" id="main-content">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-accent-blue focus:border focus:border-accent-blue rounded-lg shadow-elevated">Skip to main content</a>

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-sans font-bold text-text-primary tracking-tight">Dashboard</h1>
          <p className="text-sm font-medium text-text-secondary mt-2">
            Real-time overview of your AI agents&apos; performance
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Conversations"
            value="1,284"
            change={12.5}
            changeLabel="vs last week"
            icon={MessageSquare}
            sparklineData={sparklineValues}
          />
          <StatCard
            title="Resolved"
            value="1,156"
            change={8.2}
            changeLabel="90% resolution rate"
            icon={CheckCircle}
            sparklineData={sparklineValues}
          />
          <StatCard
            title="Avg Response Time"
            value="1.2s"
            change={-15}
            changeLabel="Faster than last week"
            icon={Clock}
            sparklineData={sparklineValues}
          />
          <StatCard
            title="Customer Satisfaction"
            value="4.8"
            change={3.1}
            changeLabel="Out of 5.0"
            icon={TrendingUp}
            sparklineData={sparklineValues}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <ConversationsChart data={chartData} />
          </div>
          <ResolutionDonut
            data={resolutionData}
            centerValue="90%"
            centerLabel="Resolved"
          />
        </div>

        {/* Agents and Channel Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-sans font-semibold text-text-primary tracking-tight">Active Agents</h2>
              <button className="text-xs font-semibold text-accent-blue hover:text-accent-indigo transition-colors px-3 py-1.5 bg-accent-blue/10 hover:bg-accent-blue/20 rounded-lg">
                Manage agents
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <AgentStatusCard key={agent.name} {...agent} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col">
            <ChannelBreakdown data={channelData} />
          </div>
        </div>

        {/* Data Table */}
        <div className="mb-10 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-sans font-semibold text-text-primary tracking-tight">Recent Conversations</h2>
          </div>
          <ConversationsTable conversations={conversations} />
        </div>

        {/* Live Feed (Collapsed by default, at the bottom) */}
        <div className="w-full">
          <LiveFeed />
        </div>
      </main>
    </DashboardLayout>
  );
}

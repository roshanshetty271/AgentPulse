import Link from 'next/link';
import { ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AgentPulse | The Modern Dashboard for AI Agents',
  description: 'Monitor, analyze, and optimize your enterprise AI agents in real-time with AgentPulse.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-8 rounded-lg bg-accent-blue flex items-center justify-center text-white font-bold tracking-tight text-sm">AP</div>
          <span className="text-xl font-bold tracking-tight text-text-primary">AgentPulse</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Sign In</Link>
          <Link href="/dashboard" className="text-sm font-semibold bg-text-primary text-bg-base px-4 py-2 rounded-lg hover:bg-text-secondary transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-semibold uppercase tracking-wider mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
          </span>
          AgentPulse 2.0 is Live
        </div>

        <h1 className="text-5xl md:text-7xl font-sans font-bold text-text-primary tracking-tight max-w-4xl mb-6">
          Analytics for the <span className="text-accent-blue">AI Workforce</span>.
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12">
          Monitor conversations, track resolution rates, and analyze agent performance in real-time with an enterprise-grade telemetry dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 bg-accent-blue text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-indigo transition-all shadow-elevated">
            View Live Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="flex items-center gap-2 bg-white text-text-primary border border-border-subtle px-8 py-4 rounded-xl font-semibold text-lg hover:bg-bg-overlay transition-all shadow-sm">
            Read Documentation
          </button>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-32 text-left">
          <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Real-time Telemetry</h3>
            <p className="text-text-secondary">Watch your support agents handle user inquiries in real-time with live scrolling terminal logs.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Enterprise Security</h3>
            <p className="text-text-secondary">Bank-grade encryption, strict RBAC, and comprehensive audit logs for all agent interactions.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Actionable Insights</h3>
            <p className="text-text-secondary">D3.js powered visualizations that expose exactly where your agents are succeeding or failing.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

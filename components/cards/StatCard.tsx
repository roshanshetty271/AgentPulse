import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import ResponseTimeSparkline from "@/components/charts/ResponseTimeSparkline";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  sparklineData?: number[];
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  sparklineData,
}: StatCardProps) {
  const isPositive = change && change > 0;

  return (
    <div className="relative bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-soft hover:shadow-elevated transition-all group overflow-hidden">
      <div className="flex items-start justify-between mb-8">
        <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue">
          <Icon className="w-5 h-5" />
        </div>
        {change !== undefined && (
          <div className="text-right">
            <div className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${isPositive ? "bg-accent-green/10 text-accent-green" : "bg-accent-rose/10 text-accent-rose"}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(change)}%
            </div>
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div className="space-y-1 max-w-[60%]">
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wider leading-snug">
            {title}
          </p>
          <p className="text-4xl md:text-5xl font-sans font-semibold text-text-primary tracking-tight">
            {value}
          </p>
          {changeLabel && (
            <p className="text-xs text-text-tertiary mt-1 leading-snug">{changeLabel}</p>
          )}
        </div>
        {sparklineData && (
          <div className="flex-shrink-0 h-16 w-24 opacity-60 group-hover:opacity-100 transition-opacity">
            <ResponseTimeSparkline data={sparklineData} color="#3B82F6" width={96} height={64} />
          </div>
        )}
      </div>
    </div>
  );
}

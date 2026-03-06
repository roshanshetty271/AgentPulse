import { ExternalLink, MoreHorizontal, Phone, MessageCircle, Mail } from "lucide-react";

import { type Conversation } from "@/lib/data";

interface ConversationsTableProps {
  conversations: Conversation[];
}

const channelIcons = {
  voice: Phone,
  chat: MessageCircle,
  email: Mail,
};

const channelColors = {
  voice: "text-accent-cyan",
  chat: "text-accent-purple",
  email: "text-accent-green",
};

const statusStyles = {
  resolved: "bg-accent-green/10 text-accent-green border-accent-green/20",
  pending: "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
  escalated: "bg-accent-red/10 text-accent-red border-accent-red/20",
};

export default function ConversationsTable({ conversations }: ConversationsTableProps) {
  return (
    <div className="bg-white shadow-soft rounded-[24px] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-text-tertiary">Last 24 hours</p>
        </div>
        <button className="text-xs font-medium text-accent-blue hover:text-accent-indigo transition-colors flex items-center gap-1.5 focus:outline-none">
          View all <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-base/30">
              <th className="px-6 py-4 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                Agent
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                Channel
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y-0 text-sm">
            {conversations.map((conv) => {
              const ChannelIcon = channelIcons[conv.channel];
              return (
                <tr
                  key={conv.id}
                  className="hover:bg-bg-base/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-accent-blue/10 flex items-center justify-center text-xs font-semibold text-accent-blue">
                        {conv.customer.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-sm font-medium text-text-primary">{conv.customer}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-text-secondary">{conv.agent}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <ChannelIcon className={`w-4 h-4 ${channelColors[conv.channel]}`} />
                      <span className="text-sm capitalize">{conv.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-[11px] font-semibold rounded-md border capitalize ${statusStyles[conv.status]}`}
                    >
                      {conv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-text-secondary font-mono">{conv.duration}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-text-tertiary">{conv.timestamp}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-text-tertiary hover:text-text-primary hover:bg-bg-overlay rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


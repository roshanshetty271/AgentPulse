export const chartData = [
  { date: "Mon", conversations: 145, resolved: 130 },
  { date: "Tue", conversations: 189, resolved: 175 },
  { date: "Wed", conversations: 156, resolved: 142 },
  { date: "Thu", conversations: 210, resolved: 195 },
  { date: "Fri", conversations: 198, resolved: 180 },
  { date: "Sat", conversations: 167, resolved: 155 },
  { date: "Sun", conversations: 219, resolved: 200 },
];

export const resolutionData = [
  { label: "Auto-resolved", value: 65, color: "#3B82F6" },
  { label: "Agent-assisted", value: 25, color: "#94A3B8" },
  { label: "Escalated", value: 10, color: "#6366F1" },
];

export const agents = [
  {
    name: "Nova",
    avatar: "✨",
    status: "online" as const,
    conversations: 89,
    avgResponseTime: "0.8s",
    resolutionRate: 94,
  },
  {
    name: "Atlas",
    avatar: "🌍",
    status: "online" as const,
    conversations: 67,
    avgResponseTime: "1.1s",
    resolutionRate: 91,
  },
  {
    name: "Echo",
    avatar: "🌊",
    status: "busy" as const,
    conversations: 45,
    avgResponseTime: "1.4s",
    resolutionRate: 88,
  },
  {
    name: "Nexus",
    avatar: "⚡",
    status: "offline" as const,
    conversations: 0,
    avgResponseTime: "-",
    resolutionRate: 0,
  },
];

export const conversations = [
  {
    id: "1",
    customer: "Sarah Johnson",
    agent: "Nova",
    channel: "voice" as const,
    status: "resolved" as const,
    duration: "3:24",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    customer: "Mike Chen",
    agent: "Atlas",
    channel: "chat" as const,
    status: "resolved" as const,
    duration: "5:12",
    timestamp: "8 min ago",
  },
  {
    id: "3",
    customer: "Emily Davis",
    agent: "Echo",
    channel: "chat" as const,
    status: "pending" as const,
    duration: "2:45",
    timestamp: "12 min ago",
  },
  {
    id: "4",
    customer: "James Wilson",
    agent: "Nova",
    channel: "email" as const,
    status: "escalated" as const,
    duration: "8:30",
    timestamp: "25 min ago",
  },
  {
    id: "5",
    customer: "Lisa Anderson",
    agent: "Atlas",
    channel: "voice" as const,
    status: "resolved" as const,
    duration: "4:15",
    timestamp: "32 min ago",
  },
  {
    id: "6",
    customer: "Robert Taylor",
    agent: "Nova",
    channel: "chat" as const,
    status: "resolved" as const,
    duration: "2:58",
    timestamp: "45 min ago",
  },
  {
    id: "7",
    customer: "Jennifer Martinez",
    agent: "Echo",
    channel: "voice" as const,
    status: "resolved" as const,
    duration: "6:02",
    timestamp: "1 hr ago",
  },
];

export const channelData = [
  { channel: "Voice", count: 456, percentage: 35.5, color: "#3B82F6" },
  { channel: "Chat", count: 512, percentage: 39.9, color: "#94A3B8" },
  { channel: "Email", count: 198, percentage: 15.4, color: "#CBD5E1" },
  { channel: "SMS", count: 118, percentage: 9.2, color: "#10B981" },
];

export const hourlyData = [
  { hour: "00:00", value: 12 },
  { hour: "02:00", value: 8 },
  { hour: "04:00", value: 5 },
  { hour: "06:00", value: 15 },
  { hour: "08:00", value: 45 },
  { hour: "10:00", value: 78 },
  { hour: "12:00", value: 65 },
  { hour: "14:00", value: 82 },
  { hour: "16:00", value: 91 },
  { hour: "18:00", value: 56 },
  { hour: "20:00", value: 34 },
  { hour: "22:00", value: 22 },
];

export type ChartDataPoint = {
  date: string;
  conversations: number;
  resolved: number;
};

export type ResolutionDataPoint = {
  label: string;
  value: number;
  color: string;
};

export type Agent = {
  name: string;
  avatar: string;
  status: "online" | "busy" | "offline";
  conversations: number;
  avgResponseTime: string;
  resolutionRate: number;
};

export type Conversation = {
  id: string;
  customer: string;
  agent: string;
  channel: "voice" | "chat" | "email";
  status: "resolved" | "pending" | "escalated";
  duration: string;
  timestamp: string;
};

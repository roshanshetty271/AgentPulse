# ⚡ AgentPulse - AI Agent Analytics Dashboard

A premium minimalist analytics dashboard for monitoring AI agents, built with Next.js 14, TypeScript, Tailwind CSS, and D3.js.

## Design Style

**Premium Minimalist Design** — Clean lines, ample whitespace, strict data hierarchy, and elegant typography. Tailored for enterprise productivity and calm data consumption.

### Design Features:
- Soft off-white backgrounds (`#F4F4F5`) with pristine white card surfaces
- Intelligently layered drop-shadows for a subtle 3D hover depth
- Inter / Geist typography for flawless readability
- Refined blue accents (`#0EA5E9`) for primary interactive states
- Distinctly separated floating widgets to isolate context
- D3.js powered interactive charts with smooth bezier curves
- Overlay drawer patterns for deep-dive analytics

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** D3.js v7
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Inter, JetBrains Mono)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Project Structure

```
agentpulse-dashboard/
├── app/
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Redirects to /dashboard
│   ├── globals.css          # Global styles + design system
│   └── dashboard/
│       └── page.tsx         # Main dashboard page
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx      # Fixed sidebar navigation
│   │   └── Header.tsx       # Top header with search
│   ├── cards/
│   │   ├── StatCard.tsx     # Stat cards with gradients
│   │   └── AgentStatusCard.tsx # Agent status display
│   ├── charts/
│   │   ├── ConversationsChart.tsx  # D3 area/line chart
│   │   ├── ResolutionDonut.tsx     # D3 donut chart
│   │   ├── ChannelBreakdown.tsx    # D3 bar chart
│   │   └── ResponseTimeSparkline.tsx # D3 sparkline
│   ├── tables/
│   │   └── ConversationsTable.tsx  # Data table
│   └── widgets/
│       └── LiveFeed.tsx     # Real-time event feed
└── lib/
    └── data.ts              # Mock data and types
```

## Color System

| Layer | Hex | Use |
|-------|-----|-----|
| Base | `#F4F4F5` | Main application background (Off-white) |
| Surface | `#FFFFFF` | Cards, panels, sidebars |
| Overlay | `#00000020` | Modal/Drawer backdrops (with blur) |
| Border | `#E4E4E7` | Subtle structural dividers |

### Typography Colors

| Color | CSS Class | Use |
|-------|-----|-----|
| Primary | `text-text-primary` | Main headings, critical data |
| Secondary | `text-text-secondary` | Labels, axis ticks, sub-headings |
| Tertiary | `text-text-tertiary` | Dimmed metadata, timestamps |

### Accent Colors

| Color | Hex | Use |
|-------|-----|-----|
| Blue | `#0EA5E9` | Primary focus, active navigation, CTAs |
| Indigo | `#4F46E5` | Hover states for primary actions |
| Green | `#10B981` | Success states |
| Yellow | `#F59E0B` | Warning states |
| Rose | `#F43F5E` | Error/Danger states |

## D3.js Charts

### Conversations Over Time
- Area chart with gradient fill
- Dual line comparison (total vs resolved)
- Interactive hover states on data points
- Dashed line for resolved conversations

### Resolution Donut
- Interactive arc segments
- Hover scale animation
- Center metric display
- Legend with percentages

### Channel Breakdown
- Horizontal bar chart
- Color-coded by channel type
- Percentage breakdown below

### Sparklines
- Mini trend visualizations
- Gradient area fill
- End-point indicator

## Key Features

- ✅ Fixed sidebar with navigation
- ✅ Search bar with keyboard shortcut hint (⌘K)
- ✅ 4 stat cards with trend indicators
- ✅ Area chart with dual series (D3.js)
- ✅ Donut chart with hover animations (D3.js)
- ✅ Bar chart for channel distribution (D3.js)
- ✅ 4 agent status cards with metrics
- ✅ Live feed with real-time styling
- ✅ Full conversations table with status badges
- ✅ Notification badge with pulse animation
- ✅ User profile in sidebar

## Typography

- **Headlines:** Inter/Geist, semibold, tight tracking
- **Body:** Inter/Geist, regular
- **Data/Metrics:** Inter, tabular numbers, font-black
- **Labels:** Uppercase, wide tracking, font-mono

## Animations

| Animation | Use |
|-----------|-----|
| `fade-in` | Content appearance |
| `slide-up` | Modal/toast entry |
| `pulse-glow` | Live indicators |
| `pulse` | Notification dots |

## Story Tie-in

This dashboard represents what **EasyBee AI's internal analytics** might look like — showing deep understanding of enterprise AI agent monitoring, spatial visualization, and highly polished operational dashboards.

It demonstrates:
- Complex D3.js data visualization skills (integrated React tooltips, custom scales)
- Implementation of a strict, highly refined Minimalist design system
- Context-preserving structural layouts (overlay drawers, command palettes)
- Information hierarchy in data-dense interfaces without visual clutter
- Premium, stakeholder-ready aesthetic

---

Built with 📊 by Roshan Shetty

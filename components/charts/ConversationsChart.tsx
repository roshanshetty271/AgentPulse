"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { type ChartDataPoint } from "@/lib/data";

interface ConversationsChartProps {
  data: ChartDataPoint[];
}

export default function ConversationsChart({ data }: ConversationsChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: ChartDataPoint | null;
    type: "Total" | "Resolved" | null;
  }>({ visible: false, x: 0, y: 0, data: null, type: null });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !data.length) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);

    // Clear previous
    svg.selectAll("*").remove();

    // Dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 280 - margin.top - margin.bottom;

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.conversations, d.resolved)) || 0])
      .nice()
      .range([height, 0]);

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(() => "")
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g.selectAll(".tick line").attr("stroke", "#E4E4E7").attr("stroke-dasharray", "2,2")
      );

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .call((g) => g.select(".domain").attr("stroke", "#000"))
      .call((g) => g.selectAll(".tick line").attr("stroke", "#000"))
      .call((g) => g.selectAll(".tick text")
        .attr("fill", "#000")
        .attr("font-family", "var(--font-mono), monospace")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("letter-spacing", "0.05em")
        .text((d) => (d as string).toUpperCase())
      );

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").remove())
      .call((g) => g.selectAll(".tick text")
        .attr("fill", "#71717a")
        .attr("font-family", "var(--font-sans), sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "500")
      );

    // Area
    const area = d3
      .area<ChartDataPoint>()
      .x((d) => x(d.date) || 0)
      .y0(height)
      .y1((d) => y(d.conversations))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "#3B82F6")
      .attr("fill-opacity", 0.1)
      .attr("d", area);

    // Line for conversations
    const lineConversations = d3
      .line<ChartDataPoint>()
      .x((d) => x(d.date) || 0)
      .y((d) => y(d.conversations))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 2.5)
      .attr("d", lineConversations);

    // Line for resolved
    const lineResolved = d3
      .line<ChartDataPoint>()
      .x((d) => x(d.date) || 0)
      .y((d) => y(d.resolved))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#71717A")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4,4")
      .attr("d", lineResolved);

    // Interaction Overlays
    g.selectAll(".dot-conversations")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-conversations")
      .attr("cx", (d) => x(d.date) || 0)
      .attr("cy", (d) => y(d.conversations))
      .attr("r", 4)
      .attr("fill", "#fff")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("r", 6).attr("fill", "#3B82F6");
        const cx = (x(d.date) || 0) + margin.left;
        const cy = y(d.conversations) + margin.top;
        setTooltip({ visible: true, x: cx, y: cy, data: d, type: "Total" });
      })
      .on("mouseleave", function () {
        d3.select(this).attr("r", 4).attr("fill", "#fff");
        setTooltip((prev) => ({ ...prev, visible: false }));
      });

    g.selectAll(".dot-resolved")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-resolved")
      .attr("cx", (d) => x(d.date) || 0)
      .attr("cy", (d) => y(d.resolved))
      .attr("r", 4)
      .attr("fill", "#fff")
      .attr("stroke", "#71717A")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("r", 6).attr("fill", "#71717A");
        const cx = (x(d.date) || 0) + margin.left;
        const cy = y(d.resolved) + margin.top;
        setTooltip({ visible: true, x: cx, y: cy, data: d, type: "Resolved" });
      })
      .on("mouseleave", function () {
        d3.select(this).attr("r", 4).attr("fill", "#fff");
        setTooltip((prev) => ({ ...prev, visible: false }));
      });

  }, [data]);

  return (
    <div className="bg-white text-text-primary shadow-soft rounded-[24px] p-6 lg:p-8 h-full flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-sm font-sans font-semibold text-text-primary tracking-tight">Conversations Over Time</h3>
          <p className="text-xs font-medium text-text-tertiary mt-1">Last 7 days</p>
        </div>
        <div className="flex items-center gap-6 text-xs font-medium text-text-secondary">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-accent-blue" />
            <span className="text-text-primary font-semibold">Total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-white border-2 border-text-tertiary" />
            <span className="text-text-tertiary">Resolved</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div ref={containerRef} className="w-full mt-4 flex-grow relative">
        <svg ref={svgRef} className="w-full overflow-visible" />
        {tooltip.visible && tooltip.data && (
          <div
            className="absolute z-50 pointer-events-none bg-white rounded-xl p-4 shadow-elevated border border-border-subtle/50 min-w-[140px]"
            style={{
              left: tooltip.x,
              top: tooltip.y - 10,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="text-xs font-medium text-text-tertiary mb-1">
              {tooltip.data.date}
            </div>
            <div className="font-sans font-bold text-3xl text-text-primary">
              {tooltip.type === "Total" ? tooltip.data.conversations : tooltip.data.resolved}
            </div>
            <div className={`text-[11px] font-semibold uppercase tracking-wider mt-1 ${tooltip.type === "Total" ? "text-accent-blue" : "text-text-secondary"}`}>
              {tooltip.type} Chats
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

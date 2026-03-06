"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface ChannelData {
  channel: string;
  count: number;
  percentage: number;
  color: string;
}

interface ChannelBreakdownProps {
  data: ChannelData[];
}

export default function ChannelBreakdown({ data }: ChannelBreakdownProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: ChannelData | null;
  }>({ visible: false, x: 0, y: 0, data: null });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !data.length) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);

    // Clear previous
    svg.selectAll("*").remove();

    // Dimensions
    const margin = { top: 10, right: 10, bottom: 20, left: 10 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.channel))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 0])
      .nice()
      .range([height, 0]);

    // Background Grid
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .ticks(4)
          .tickSize(-width)
          .tickFormat(() => "")
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g.selectAll(".tick line").attr("stroke", "#E4E4E7").attr("stroke-dasharray", "2,2")
      );

    // Bars
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.channel) || 0)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d) => d.color)
      .attr("stroke", "#000")
      .attr("stroke-width", "1px")
      .attr("rx", 0)
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .attr("stroke-width", "2px")
          .attr("fill", "#000");

        const cx = (x(d.channel) || 0) + margin.left + x.bandwidth() / 2;
        const cy = y(d.count) + margin.top;
        setTooltip({ visible: true, x: cx, y: cy, data: d });
      })
      .on("mouseleave", function (event, d) {
        d3.select(this)
          .attr("stroke-width", "1px")
          .attr("fill", d.color);
        setTooltip((prev) => ({ ...prev, visible: false }));
      });

    // X axis labels
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => (x(d.channel) || 0) + x.bandwidth() / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("fill", "#71717a")
      .attr("font-family", "var(--font-sans), sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "500")
      .attr("letter-spacing", "0")
      .text((d) => d.channel);

  }, [data]);

  return (
    <div className="bg-white text-text-primary shadow-soft rounded-[24px] p-6 lg:p-8 flex flex-col justify-between h-full overflow-hidden">
      <h3 className="text-sm font-sans font-semibold text-text-primary tracking-tight mb-8">Channel Distribution</h3>

      {/* Chart */}
      <div ref={containerRef} className="w-full flex-grow flex items-center relative">
        <svg ref={svgRef} className="w-full overflow-visible" />

        {tooltip.visible && tooltip.data && (
          <div
            className="absolute z-50 pointer-events-none bg-white rounded-xl p-4 shadow-elevated border border-border-subtle/50 min-w-[120px]"
            style={{
              left: tooltip.x,
              top: tooltip.y - 10,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="text-xs font-medium text-text-tertiary mb-1">
              {tooltip.data.channel}
            </div>
            <div className="font-sans font-bold text-3xl text-text-primary">
              {tooltip.data.count}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mt-1">
              VOL
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        {data.map((item) => (
          <div
            key={item.channel}
            className="flex flex-col items-center justify-center p-3 bg-bg-base/50 rounded-xl hover:bg-bg-base transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary group-hover:text-text-primary">{item.channel}</span>
            </div>
            <span className="text-lg font-bold text-text-primary">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

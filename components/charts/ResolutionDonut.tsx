"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { type ResolutionDataPoint } from "@/lib/data";

interface ResolutionDonutProps {
  data: ResolutionDataPoint[];
  centerValue: string;
  centerLabel: string;
}

export default function ResolutionDonut({ data, centerValue, centerLabel }: ResolutionDonutProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: ResolutionDataPoint | null;
  }>({ visible: false, x: 0, y: 0, data: null });

  useEffect(() => {
    if (!svgRef.current || !data.length || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.65;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3
      .pie<ResolutionDataPoint>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.02);

    const arc = d3
      .arc<d3.PieArcDatum<ResolutionDataPoint>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .cornerRadius(0);

    const hoverArc = d3
      .arc<d3.PieArcDatum<ResolutionDataPoint>>()
      .innerRadius(innerRadius)
      .outerRadius(radius + 6)
      .cornerRadius(0);

    // Arcs
    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", (d) => arc(d) as string)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "#000")
      .attr("stroke-width", "1px")
      .attr("opacity", 1)
      .style("cursor", "pointer")
      .style("transition", "all 0.1s ease")
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .attr("d", hoverArc(d) as string)
          .attr("stroke-width", "2px");
      })
      .on("mousemove", function (event, d) {
        const [x, y] = d3.pointer(event, containerRef.current);
        setTooltip({ visible: true, x, y, data: d.data });
      })
      .on("mouseleave", function (event, d) {
        d3.select(this)
          .attr("d", arc(d) as string)
          .attr("stroke-width", "1px");
        setTooltip((prev) => ({ ...prev, visible: false }));
      });

    // Center text
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.1em")
      .attr("fill", "#18181b")
      .attr("font-size", "32px")
      .attr("font-weight", "600")
      .attr("font-family", "var(--font-sans), sans-serif")
      .attr("letter-spacing", "-0.02em")
      .text(centerValue);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.8em")
      .attr("fill", "#71717a")
      .attr("font-size", "11px")
      .attr("font-family", "var(--font-sans), sans-serif")
      .attr("font-weight", "500")
      .attr("letter-spacing", "0.05em")
      .text(centerLabel);

  }, [data, centerValue, centerLabel]);

  return (
    <div className="bg-white text-text-primary shadow-soft rounded-[24px] p-6 lg:p-8 flex flex-col justify-between h-full overflow-hidden">
      <h3 className="text-sm font-sans font-semibold text-text-primary tracking-tight mb-8">Resolution Status</h3>

      <div ref={containerRef} className="flex items-center justify-center flex-1 relative w-full h-[200px]">
        <svg ref={svgRef} className="drop-shadow-sm overflow-visible" />

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
              {tooltip.data.label}
            </div>
            <div className="font-sans font-bold text-2xl text-text-primary">
              {tooltip.data.value}%
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 border-t border-border-subtle/50 pt-6">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2 cursor-pointer group">
            <div
              className="w-3 h-3 rounded-full border border-border-subtle group-hover:scale-125 transition-transform"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary">{item.label}</span>
            <span className="text-xs font-bold text-text-primary ml-1">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

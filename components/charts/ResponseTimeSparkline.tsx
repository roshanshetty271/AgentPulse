"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export default function ResponseTimeSparkline({
  data,
  color = "#22d3ee",
  width = 100,
  height = 32,
}: SparklineProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 2, right: 2, bottom: 2, left: 2 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data) || 0, d3.max(data) || 0])
      .range([innerHeight, 0]);

    // Area gradient
    const areaGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", `sparkline-gradient-${color.replace("#", "")}`)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    areaGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", color)
      .attr("stop-opacity", 0.3);

    areaGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", color)
      .attr("stop-opacity", 0);

    // Area
    const area = d3
      .area<number>()
      .x((_, i) => x(i))
      .y0(innerHeight)
      .y1((d) => y(d))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", `url(#sparkline-gradient-${color.replace("#", "")})`)
      .attr("d", area);

    // Line
    const line = d3
      .line<number>()
      .x((_, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // End dot
    g.append("circle")
      .attr("cx", x(data.length - 1))
      .attr("cy", y(data[data.length - 1]))
      .attr("r", 3)
      .attr("fill", color);

  }, [data, color, width, height]);

  return <svg ref={svgRef} />;
}


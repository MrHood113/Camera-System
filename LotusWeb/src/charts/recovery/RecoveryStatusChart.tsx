import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { wrapLegendText, wrapTickTextMultiline } from "../utils/wrapText";
import { useResizeObserver } from "../../hooks";
import type { ShortageChart } from "../../types/statusChartByShelf.type";
// import { shortageByCategories } from "../../mock/dashboardData";

const RecoveryStatusChart: React.FC<ShortageChart> = ({ labels, barData1, barData2, lineData }) => {
  const { ref: wrapperRef, size: {width, height} } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!width || !height) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 60, bottom: 90, left: 45 };

    // const labels = shortageByCategories.map(c => c.category);
    // const barData1 = shortageByCategories.map(() => Math.floor(Math.random() * 30) + 10); 
    // const barData2 = shortageByCategories.map(c => c.recoveryPercent / 2); 
    // const lineData = shortageByCategories.map(c => c.recoveryPercent);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Title
    svg.append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .style("font-size", "15px")
      .style("font-weight", "bold")
      .style("fill", "gray")
      .text("Recovery status by each shelf");

    // Scale axis
    const xScale = d3
      .scaleBand()
      .domain(labels)
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const yScaleLeft = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const yScaleRight = d3
      .scaleLinear()
      .domain([40, 80])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Draw axis
    // X axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d: string) => {
      return d.replace(/\s+/g, "\n");
    });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .call(g => {
        const domainPath = g.select(".domain");
        domainPath
          .attr("d", `M${margin.left},0H${width - margin.right}`)
          .attr("stroke", "gray");
      })  
      .call(g => g.selectAll(".tick line")
        .remove()
      )
      .call(g => g.selectAll<SVGTextElement, string>(".tick text")   
        .style("font-size", "14px")                    
        .attr("fill", "black")                       
        .style("font-weight", "semibold")
        .call(wrapTickTextMultiline)
      ); 

    // Left y axis
    const yAxis = d3
      .axisLeft(yScaleLeft)
      .ticks(2);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis) 
      .call(g => g.select(".domain")     
        .remove()) 
      .call(g => g.selectAll(".tick line")
        .remove())
      .call(g => g.selectAll(".tick text")   
        .style("font-size", "14px")                    
        .attr("fill", "black")                       
        .style("font-weight", "semibold")
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -105)
      .attr("y", -35)
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Number of times");

    // Right y axis
    const y2Axis = d3
      .axisRight(yScaleRight)
      .ticks(2)
      .tickFormat((d) => d + "%");

    svg
      .append("g")
      .attr("transform", `translate(${width - margin.right},0)`)
      .call(y2Axis)
      .call(g => g.select(".domain")     
        .remove())  
      .call(g => g.selectAll(".tick line")
        .remove())
      .call(g => g.selectAll(".tick text")   
        .style("font-size", "14px")                    
        .attr("fill", "black")                       
        .style("font-weight", "semibold")
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -102)
      .attr("y", 54)
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Rate");

    // Grid X 
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(xScale)
          .tickSize(-(height - margin.top - margin.bottom))
          .tickFormat(() => "")
      )
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#C1C2C7")
        .attr("stroke-dasharray", "5"));

    // Grid Y 
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3.axisLeft(yScaleLeft)
          .ticks(2)
          .tickSize(-(width - margin.left - margin.right))
          .tickFormat(() => "")
      )
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#C1C2C7")
        .attr("stroke-dasharray", "6"))
      .call(g => g.selectAll(".tick")
        .filter(d => d === 0)
        .select("line")
        .remove());

    // Bar 1 shortage
    svg
      .selectAll(".bar1")
      .data(barData1)
      .enter()
      .append("rect")
      .attr("class", "bar1")
      .attr("x", (_, i) => (xScale(labels[i]) ?? 0))
      .attr("y", (d) => yScaleLeft(d))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => height - margin.bottom - yScaleLeft(d))
      .attr("fill", "rgba(255, 99, 132)");

    // Bar 2 shortage
    svg
      .selectAll(".bar2")
      .data(barData2)
      .enter()
      .append("rect")
      .attr("class", "bar2")
      .attr("x", (_, i) => (xScale(labels[i]) ?? 0) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScaleLeft(d))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => height - margin.bottom - yScaleLeft(d))
      .attr("fill", "rgba(54, 162, 235)");

    // Line
    const line = d3
      .line<number>()
      .x((_, i) => (xScale(labels[i]) ?? 0) + xScale.bandwidth() / 2)
      .y((d) => yScaleLeft(d))
      .curve(d3.curveLinear);

    svg
      .append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("d", line);

    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom + 40})`);

    const items = [
      { type: "circle", color: "rgba(255, 99, 132)", label: "Number of replenishment alerts" },
      { type: "circle", color: "rgba(54, 162, 235)", label: "Number of on-time shelf recovery" },
      { type: "line", color: "black", label: "On-time shelf recovery rate" }
    ];

    items.forEach((item, i) => {
      const g = legend.append("g").attr("transform", `translate(${i * 170}, 0)`);

      // Note icon
      if(item.type === "circle") {
        g.append("circle")
          .attr("cx", 0)
          .attr("cy", 25)
          .attr("r", 6)
          .attr("fill", item.color);
      } else {
        g.append("line")
          .attr("x1", -15)
          .attr("x2", 6)
          .attr("y1", 25)
          .attr("y2", 25)
          .attr("stroke", item.color)
          .attr("stroke-width", 1);
        }

      // Note text
      g.append("text")
        .attr("x", 12)
        .attr("y", 29)
        .style("font-size", "14px")
        .text(item.label)
        .call(wrapLegendText, 120);
    });
  }, [width, height, labels, barData1, barData2, lineData]);

  return(
    <div ref={wrapperRef} className="w-full h-[250px]">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RecoveryStatusChart;

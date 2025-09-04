import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { wrapLegendText, wrapTickTextMultiline } from "../utils/wrapText";
import { useResizeObserver } from "../../hooks";
// import { shortageByCategories } from "../../mock/dashboardData";
import type { ShortageChart } from "../../types/statusChartByShelf.type";

const ShortageStatusChart: React.FC<ShortageChart> = ({ labels, barData1, barData2, lineData }) => {
  const { ref: wrapperRef, size: {width, height} } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!width || !height) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 60, bottom: 90, left: 50 };

    // const labels = shortageByCategories.map(c => c.category);
    // const operating = 4; // From mock example
    // const barData1 = shortageByCategories.map(() => operating); // Total operating hours
    // const barData2 = shortageByCategories.map(c => operating * c.shortagePercent / 100); // Shortage hours
    // const lineData = shortageByCategories.map(c => c.shortagePercent);

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
      .text("Shortage status by each shelf");

    // Scale X
    const xScale = d3
      .scaleBand()
      .domain(labels)
      .range([margin.left, width - margin.right])
      .padding(0.5);

    // Scale Y for "Hour"
    const yScaleLeft= d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Scale Y2 for "Rate"
    const yScaleRight = d3
      .scaleLinear()
      .domain([10, 30])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // --- Draw axis ---
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

    // Y axis - Left
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
      .attr("x", -100)
      .attr("y", -40)
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Hour");

    // Y axis - Right
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
      .attr("x", -101)
      .attr("y", 55)
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Rate");

    // Grid X 
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        xAxis
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
        yAxis
          // .ticks(2)
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
      .attr("x", (_, i) => (xScale(labels[i])!))
      .attr("y", (d) => yScaleLeft(d))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => height - margin.bottom - yScaleLeft(d))
      .attr("fill", "rgba(255, 99, 132)");

    // Bar 2 shortage
    svg
      .append("g")
      .selectAll(".bar2")
      .data(barData2)
      .enter()
      .append("rect")
      .attr("class", "bar2")
      .attr("x", (_, i) => (xScale(labels[i])!) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScaleLeft(d))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => height - margin.bottom - yScaleLeft(d))
      .attr("fill", "rgba(54, 162, 235)");

    // Line
    const line = d3
      .line<number>()
      .x((_, i) => (xScale(labels[i]) ?? 0) + xScale.bandwidth() / 2)
      .y((d) => yScaleRight(d))
      .curve(d3.curveLinear);

    svg
      .append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("d", line);

    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height - 50})`);

    const items = [
      { type: "circle", color: "rgba(255, 99, 132)", label: "Total shelf operating hours" },
      { type: "circle", color: "rgba(54, 162, 235)", label: "Total shelf shortage hours" },
      { type: "line", color: "black", label: "Shelf shortage rate" }
    ];

    items.forEach((item, i) => {
      const g = legend.append("g").attr("transform", `translate(${i * 150}, 0)`);

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

export default ShortageStatusChart;

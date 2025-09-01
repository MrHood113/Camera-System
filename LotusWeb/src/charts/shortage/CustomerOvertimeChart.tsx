import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../../hooks";

const CustomerOvertimeChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { ref: wrapperRef, size: {width, height} } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (!width || !height) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 30, right: 70, bottom: 100, left: 50 };

    // fake data
    const labels = Array.from({ length: 10 }, (_, i) => `${i + 1}`);
    const operatingHours = Array(10).fill(8);
    const shortageHours = [2, 3, 1, 2, 3, 2, 2, 3, 1, 2];
    const storeVisits = [8000, 8500, 7900, 7600, 8200, 8100, 8700, 8600, 8300, 8000];
    const shortageVisits = storeVisits.map(
      v => Math.floor(v * (0.4 + Math.random() * 0.4))
    );

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // title
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "gray")
      .text("Customer visits while shelf shortage overtime");

    // Scale axis
    const xScale = d3
      .scaleBand()
      .domain(labels)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScaleLeft = d3
      .scaleLinear()
      .domain([0, 8])
      .range([height - margin.bottom, margin.top]);

    const yScaleRight = d3
      .scaleLinear()
      .domain([2000, 10000])
      .range([height - margin.bottom, margin.top]);

    // Draw axis
    // X axis
    const xAxis = d3
      .axisBottom(xScale);

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
      );

    // Y axis - Left
    const yAxis = d3
      .axisLeft(yScaleLeft)
      .ticks(4);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
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
      .attr("x", -117)
      .attr("y", -35)
      .attr("fill", "black")
      .style("font-size", "14px")
      .attr("text-anchor", "middle")
      .text("Hour");

    // Y axis - Right
    const y2Axis = d3
      .axisRight(yScaleRight)
      .ticks(5);

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
      .attr("x", -120)
      .attr("y", 65)
      .attr("fill", "black")
      .style("font-size", "14px")
      .attr("text-anchor", "middle")
      .text("People");

    // Grid Y 
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        yAxis
          .tickSize(-(width - margin.left - margin.right))
          .tickFormat(() => "")
      )
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#C1C2C7")
        .attr("stroke-dasharray", "7"))
      .call(g => g.selectAll(".tick")
        .filter(d => d === 0)
        .select("line")
        .remove());

    // bar - operatingHours
    svg
      .selectAll(".bar-operating")
      .data(operatingHours)
      .enter()
      .append("rect")
      .attr("class", "bar-operating")
      .attr("x", (_, i) => xScale(labels[i])! + xScale.bandwidth() / 4)
      .attr("y", d => yScaleLeft(d))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", d => yScaleLeft(0) - yScaleLeft(d))
      .attr("fill", "rgba(255,99,132)");

    // bar - shortageHours
    svg
      .selectAll(".bar-shortage")
      .data(shortageHours)
      .enter()
      .append("rect")
      .attr("class", "bar-shortage")
      .attr("x", (_, i) => xScale(labels[i])! + xScale.bandwidth() / 4)
      .attr("y", d => yScaleLeft(d))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", d => yScaleLeft(0) - yScaleLeft(d))
      .attr("fill", "rgba(54,162,235)");

    // Line generators
    // Line - shortageVisits
    const lineShelf = d3
      .line<number>()
      .x((_, i) => xScale(labels[i])! + xScale.bandwidth() / 2)
      .y(d => yScaleRight(d));

    svg
      .append("path")
      .datum(shortageVisits)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 1.5)
      .attr("d", lineShelf);

    // Line - storeVisits
    const lineVisit = d3
      .line<number>()
      .x((_, i) => xScale(labels[i])! + xScale.bandwidth() / 2)
      .y(d => yScaleRight(d));

    svg
      .append("path")
      .datum(storeVisits)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", lineVisit);

    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(10, ${height - 75})`);
    
    const items = [
      { type: "circle", color: "rgba(255, 99, 132)", label: "Operating hour" },
      { type: "circle", color: "rgba(54, 162, 235)", label: "Avg shelf shortage hour" },
      { type: "line", color: "black", label: "Shelf shortage visit" },
      { type: "line", color: "gray", label: "Store visit (people)" },
    ];

    const xSpacing = 200;
    const ySpacing = 30;
    
    items.filter(d => d.type === "circle").forEach((item, i) => {
      const g = legend
        .append("g")
        .attr("transform", `translate(${i * xSpacing}, 0)`);
    
      g.append("circle")
      .attr("cx", 0)
      .attr("cy", 25)
      .attr("r", 6)
      .attr("fill", item.color);

      g.append("text")
        .attr("x", 20)   // offset cho circle
        .attr("y", 29)
        .style("font-size", "14px")
        .text(item.label);
    });

    items.filter(d => d.type === "line").forEach((item, i) => {
      const g = legend.append("g")
        .attr("transform", `translate(${i * xSpacing}, ${ySpacing})`);

      g.append("line")
        .attr("x1", -6)
        .attr("x2", 18)
        .attr("y1", 25)
        .attr("y2", 25)
        .attr("stroke", item.color)
        .attr("stroke-width", 1);

      g.append("text")
        .attr("x", 35)
        .attr("y", 29)
        .style("font-size", "14px")
        .text(item.label);
    });
  }, [width, height]);

  return (
    <div ref={wrapperRef} className="w-full h-[300px]">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CustomerOvertimeChart;

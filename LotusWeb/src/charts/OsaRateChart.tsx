import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../hooks";

const OsaRateChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { ref: wrapperRef, size: { width, height } } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (!width || !height) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 25, bottom: 20, left: 65 };

    // Fake data
    const labels = Array.from({ length: 13 }, (_, i) => {
      const h = 8 + Math.floor((i * 15) / 60);
      const m = (i * 15) % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    });

    const values = Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 20);
    const threshold = 40;

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
      .style("font-weight", 600)
      .style("fill", "black")
      .text(".get(nameShelf)");

    // Scale
    const xScale = d3
      .scaleBand()
      .domain(labels)
      .range([margin.left, width - margin.right])
      .padding(0.6);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Draw axis
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
          .attr("stroke", "gray")
              
        g.append("path")
          .attr(
            "d",
          d3.symbol().type(d3.symbolTriangle).size(20)() 
          )
          .attr("transform", `translate(${width - margin.right},0) rotate(90)`)
          .attr("fill", "gray");
      })
      .call((g) => g.selectAll(".tick line")
        .remove()
      )
      .call(g => g.selectAll(".tick text")
        .style("font-size", "14px")
        .attr("fill", "black"))
        .style("font-weight", "normal")
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("x", width - 30)
      .attr("y", 15)
      .attr("fill", "black")
      .style("font-size", "13px")
      .style("font-weight", 600)
      .style("text-anchor", "middle")
      .text("Hour");

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(2)
      .tickFormat((d) => d + "%");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis)
      .call(g => {
        const domainPath = g.select(".domain");
        domainPath
          .attr("d", `M0,${height - margin.bottom}V${margin.top}`)
          .attr("stroke", "gray");
      }) 
      .call(g => g.selectAll(".tick line")
        .remove()
      )
      .call(g => g.selectAll(".tick text")
        .style("font-size", "14px")
        .attr("fill", "black")
        .style("font-weight", "normal")
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -70)
      .attr("y", -50)
      .attr("fill", "black")
      .style("font-size", "13px")
      .style("font-weight", 600)
      .style("text-anchor", "middle")
      .text("OSA rate");

    // Grid Y 
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
      d3.axisLeft(yScale)
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
        .remove()
      );

    

    // Threshold line
    svg.append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", yScale(threshold))
      .attr("y2", yScale(threshold))
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    // Bars
    svg
      .append("g")
      .selectAll("rect")
      .data(values.slice(0, labels.length)) 
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(labels[i])!)
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(0) - yScale(d))
      .attr("fill", "steelblue")
      ;

    // Threshold label
    svg.append("text")
      .attr("x", width - margin.right - 10)
      .attr("y", yScale(threshold) - 5)
      .attr("text-anchor", "end")
      .style("fill", "black")
      .style("font-size", "12px")
      .style("font-weight", 500)
      .text(`Threshold ${threshold}%`);
  }, [width, height]);

  return (
    <div ref={wrapperRef} className="w-full h-[120px]">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default OsaRateChart;
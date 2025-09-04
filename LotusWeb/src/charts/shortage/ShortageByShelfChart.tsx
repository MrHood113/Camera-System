import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../../hooks";
// import { weeklyShortages } from "../../mock/dashboardData";

const ShortageByShelfChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { ref: wrapperRef, size: {width, height} } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (!width || !height) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 30, right: 5, bottom: 25, left: 38 };

    // fake data
    const labels = ["August 1", "August 2", "August 3", "August 4", "August 5"];
    const values = [10, 20, 17, 20, 21];
    // const labels = weeklyShortages.map(w => w.week);
    // const values = weeklyShortages.map(w => w.shortageRate);
    const maxValue = Math.max(...values);

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
      .text("Average shelf shortage rate");

    // Scale axis
    const xScale = d3
      .scaleBand()
      .domain(labels)
      .range([margin.left, width - margin.right]);
    
    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Draw axis
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
      .call(g => g.selectAll<SVGTextElement, string>(".tick text")   
        .style("font-size", "14px")                    
        .attr("fill", "black")                       
        .style("font-weight", "normal")
      );

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
      );

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
        .attr("stroke-dasharray", "5")
      );
    
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

    // Line
    const line = d3
      .line<number>()
      .x((_, i) => (xScale(labels[i]) ?? 0) + xScale.bandwidth() / 2)
      .y(d => yScale(d))
      ;

    svg.append("path")
      .datum(values)
      .attr("fill", "none")
      .attr("stroke", "rgb(54, 162, 235)")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [width, height]);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ShortageByShelfChart;

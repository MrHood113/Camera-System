import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { useResizeObserver } from "../../hooks";
// import { customerVisits } from "../../mock/dashboardData";

type DataItem = {
  age: string;
  Female: number;
  Male: number;
};

const CustomerAgeGenderChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { ref: wrapperRef, size: {width, height} } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (!width || !height) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 30, right: 10, bottom: 53, left: 50 };

    // Fake data
    const labels = ["10-19", "20-29", "30-39", "40-49"];
    const data: DataItem[] = [
      { age: "10-19", Female: 6000, Male: 12000 },
      { age: "20-29", Female: 8000, Male: 10000 },
      { age: "30-39", Female: 2000, Male: 5000 },
      { age: "40-49", Female: 9000, Male: 20500 },
    ];
    // const labels = [...new Set(customerVisits.map(v => v.ageGroup))];
    // const data: DataItem[] = labels.map(age => ({
    //   age,
    //   Female: customerVisits.find(v => v.ageGroup === age && v.gender === 'Female')?.visitCount || 0,
    //   Male: customerVisits.find(v => v.ageGroup === age && v.gender === 'Male')?.visitCount || 0,
    // }));

    const maxValue = d3.max(data, d => d.Female + d.Male)!;
    const step = 5000; 
    const adjustedMax = Math.ceil(maxValue / step) * step;

    const keys: (keyof Omit<DataItem, "age">)[] = ["Female", "Male"];
    const stack = d3.stack<DataItem>().keys(keys);
    const series = stack(data);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Title
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "gray")
      .text("Customer visit while shelf shortage by age and gender");
    
    // Scale axis
    const xScale = d3
      .scaleLinear()
      .domain([0, adjustedMax])
      .nice()
      .range([margin.left, width - margin.right - 50]);

    const yScale = d3
      .scaleBand()
      .domain(labels)
      .range([margin.top, height - margin.bottom])
      .padding(0.2);

    const color = d3
      .scaleOrdinal<string>()
      .domain(keys)
      .range(["rgba(255,99,132)", "rgba(54,162,235)"]);

    // Draw axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSizeOuter(0)
    
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .call(g => {
        const domainPath = g.select(".domain");
        domainPath
        .attr("d", `M${margin.left},0H${width - margin.right - 10}`)
        .attr("stroke", "gray")
          
        g.append("path")
          .attr(
            "d",                              
            d3.symbol().type(d3.symbolTriangle).size(20)() 
          )
          .attr("transform", `translate(${width - margin.right - 10},0) rotate(90)`) 
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
    
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .call(g => g.selectAll(".domain")
        .remove()
      )
      .call(g => g.selectAll(".tick line")
        .remove()
      )
      .call(g => g.selectAll(".tick text")   
        .style("font-size", "14px")                    
        .attr("fill", "black")                       
        .style("font-weight", "normal")
      );

    // Grid X 
    svg
      .append("g")
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
        .attr("stroke-dasharray", "6")
      );
        
    // Grid Y 
    svg
      .append("g")
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
        .attr("stroke-dasharray", "6"))
      ;

    // Bar
    const barHeight = yScale.bandwidth() * 2/3;
    const offset = (yScale.bandwidth() - barHeight) / 2;

    svg
      .append("g")
      .selectAll("g")
      .data(series)
      .join("g")
      .attr("fill", d => color(d.key)!)
      .selectAll("rect")
      .data(d => d)
      .join("rect")
      .attr("y", d => (yScale(d.data.age)!) + offset)
      .attr("x", d => xScale(d[0]))
      .attr("width", d => xScale(d[1]) - xScale(d[0]))
      .attr("height", yScale.bandwidth() * 2/3);

    // Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height - 20})`);

    keys.forEach((key, i) => {
      const g = legend.append("g").attr("transform", `translate(${i * 120},0)`);

      g.append("circle")
        .attr("cx", -40)
        .attr("cy", 13)
        .attr("r", 6)
        .attr("fill", color(key)!);

      g.append("text")
        .attr("x", -20)
        .attr("y", 18)
        .attr("fill", "black")
        .style("font-size", "14px")
        .text(key);
    });
  }, [width, height]);

  return (
    <div ref={wrapperRef} className="w-full h-[200px]">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CustomerAgeGenderChart;

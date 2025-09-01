import * as d3 from "d3";

export function wrapLegendText<
  Datum,
  PElement extends d3.BaseType,
  PDatum
>(
  selection: d3.Selection<SVGTextElement, Datum, PElement, PDatum>,
  maxWidth: number
) {
  selection.each(function () {
    const textEl = d3.select(this);
    const words = textEl.text().split(/\s+/).reverse();
    let word: string;
    let line: string[] = [];
    let lineNumber = 0;
    const lineHeight = 1.1; // em
    const x = textEl.attr("x");
    const y = textEl.attr("y");

    let tspan = textEl.text(null)
      .append("tspan")
      .attr("x", x)
      .attr("y", y);

    while ((word = words.pop()!)) {
      line.push(word);
      tspan.text(line.join(" "));
      if ((tspan.node() as SVGTextContentElement).getComputedTextLength() > maxWidth) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = textEl.append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + "em")
          .text(word);
      }
    }
  });
}

export function wrapTickTextMultiline(
  text: d3.Selection<SVGTextElement, string, SVGGElement, unknown>
) {
  text.each(function () {
    const textEl = d3.select<SVGTextElement, string>(this);
    const lines = (textEl.text() || "").split("\n");
    textEl.text(null);

    lines.forEach((line, i) => {
      textEl.append("tspan")
        .text(line)
        .attr("x", 0)
        .attr("dy", i === 0 ? "0em" : "1.2em");
    });

    textEl
      .style("text-anchor", "middle") 
      .attr("dominant-baseline", "hanging");
  });
}

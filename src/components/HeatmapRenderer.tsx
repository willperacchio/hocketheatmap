import { useMemo } from "react";
import * as d3 from "d3";
import { InteractionData } from "./Heatmap";

type RendererProps = {
  width: number;
  height: number;
  x_Label: string;
  y_Label: string;
  data: { x: string; y: string; value: number }[];
  max: number;
  setHoveredCell: (hoveredCell: InteractionData | null) => void;
};

export const HeatmapRenderer = ({width, height, x_Label, y_Label, data, max, setHoveredCell}: RendererProps) => {
  // The bounds (=area inside the axis) is calculated by subtracting the margins
  const MARGIN = { top: 50, right: 50, bottom: 60, left: 60 };
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [allXGroups, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [allYGroups, boundsHeight]);

  // Remove old
  d3.select("#heatmap").select("svg").remove()

  // Append the svg object to the body of the page
  const svg = d3.select("#heatmap")
    .append("svg")
    .attr("width", width + MARGIN.left + MARGIN.right)
    .attr("height", height + MARGIN.top + MARGIN.bottom)
    .append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

  var colorScale = d3.scaleSequentialSymlog([0, max], d3.interpolateGnBu)

  // Build the Squares and Numbers on Top of Squares
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    let x = xScale(d.x);
    let y = yScale(d.y);

    if (d.value === null || !x || !y) {
      continue;
    }

    // Build Squares
    svg.append("rect")
      .attr("key", i)
      .attr("r", 2)
      .attr("x", x)
      .attr("y", y)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", colorScale(d.value))
      .attr("rx", 5)
      .attr("stroke", "white")
      .on("mouseenter", (e) => {
        setHoveredCell({
          xLabel: x_Label,
          x: d.x,
          yLabel: y_Label,
          y: d.y,
          xPos: x + xScale.bandwidth() + MARGIN.left,
          yPos: y + xScale.bandwidth() / 2 + MARGIN.top,
          value: Math.round(d.value * 100) / 100,
        });
      })
      .on("mouseleave", () => setHoveredCell(null))
      .attr("cursor", "pointer")

    // Build Number
    svg.append("text")
      .text(d.value)
      .attr("key", "text_x_" + d.x + "_y_" + d.y)
      .attr("x", xScale(d.x) + xScale.bandwidth()/2)
      .attr("y", yScale(d.y) + yScale.bandwidth()/2 + + yScale.bandwidth()/20)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "1.5rem")
      .attr("font-weight", "bold")
      .attr("fill", "black")
      .attr("pointer-events", "none")
  }

  // X Axis Labels
  for (let i = 0; i < allXGroups.length; i++) {
    let name = allXGroups[i]
    let x = xScale(name);
    if (!x) {
      return null;
    }

    svg.append("text")
      .text(name)
      .attr("key", "hm_x_" + i)
      .attr("x", x + xScale.bandwidth() / 2)
      .attr("y", boundsHeight + 15)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "1.5rem")
      .attr("fill", "white")
      .attr("pointer-events", "none")
  }

  // Y Axis Labels
  for (let i = 0; i < allYGroups.length; i++) {
    let name = allYGroups[i]
    let y = yScale(name);
    if (!y) {
      return null;
    }

    svg.append("text")
      .text(name)
      .attr("key", "hm_y_" + i)
      .attr("x", -6)
      .attr("y", y + yScale.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "1.5rem")
      .attr("fill", "white")
      .attr("pointer-events", "none")
  }

  // Bottom Label
  svg.append("text")
    .text("Goals Scored by " + x_Label.split(" ")[0])
    .attr("key", "hm_bottom_label")
    .attr("x", width/2 - 50)
    .attr("y", boundsHeight + 45)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", "1.75rem")
    .attr("fill", "white")
    .attr("pointer-events", "none")

  // Side Label
  svg.append("text")
    .text("Goals Scored by " + x_Label.split(" ")[0])
    .attr("key", "hm_side_label")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90, 0,  0) translate(${-width*.5 + 42}, ${-42})`)
    .attr("dominant-baseline", "middle")
    .attr("font-size", "1.75rem")
    .attr("fill", "white")
    .attr("pointer-events", "none")

  // Top Label
  svg.append("text")
    .text("Heatmap of Score Frequency")
    .attr("key", "hm_side_label")
    .attr("x", width/2 - 50)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", "2rem")
    .attr("fill", "white")
    .attr("pointer-events", "none")

    return (
      <svg width={width} height={height} id={"heatmap"}> </svg>
  )
};

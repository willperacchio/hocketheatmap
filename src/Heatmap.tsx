import { useState } from "react";
import { Renderer } from "./Renderer.tsx";
import { Tooltip } from "./Tooltip.tsx";
import React, { useMemo } from "react";
import Legend from "d3-color-legend";
import * as d3 from "d3";


export type HeatmapProps = {
  width: number;
  height: number;
  x_Label: string;
  y_Label: string;
  data: { x: string; y: string; value: number }[];
  max: number;
};

export type InteractionData = {
  xLabel: string;
  yLabel: string;
  xPos: number;
  yPos: number;
  value: number;
};




export const Heatmap = ({ width, height, x_Label, y_Label, data, max }: HeatmapProps) => {
  const [hoveredCell, setHoveredCell] = useState<InteractionData | null>(null);

  var legendWidth = width;
	var legendHeight = 10;

  const MARGIN = { top: 10, right: 50, bottom: 30, left: 50 };
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
  }, [data, width]);

  // var colorScale = d3
  // .scaleSequentialLog()
  // .interpolator(d3.interpolateRgbBasisClosed(["white", "blue"]))
  // .domain([1, max/2, max]);
  //A color scale
var colorScale = d3.scaleSequentialSymlog([1, max], d3.interpolateGnBu);

//Color Legend container
var legendsvg = d3.select("#legend").attr("class", "legendWrapper");	

var actualColors = ['rgb(255, 255, 255)', 'rgb(0, 0, 255)'];
var coloursRainbow = ["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"];

legendsvg.append("linearGradient")
  .attr("id", "gradient-rainbow-colors")
  .attr("x1", "0%").attr("y1", "0%")
  .attr("x2", "100%").attr("y2", "0%")
  .selectAll("stop") 
	.data(actualColors)                  
	.enter().append("stop") 
	.attr("offset", function(d,i) { return i/(actualColors.length-1); })   
	.attr("stop-color", function(d) { return d; });

//Draw the Rectangle
legendsvg.append("rect")
	.attr("class", "legendRect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", width)
	.attr("height", 10)
	.style("fill", "url(#gradient-rainbow-colors)");

legendsvg.selectAll("stop")
  .data( colorScale.range() )
  .enter().append("stop")
  .attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
  .attr("stop-color", function(d) { return d; });

//Define x-axis
var xAxis = d3.axisBottom().ticks(5).scale(xScale);

//Set up X axis
legendsvg.append("g").attr("class", "axis").attr("transform", "translate(0," + (10) + ")").call(xAxis);

  return (
    <div style={{ position: "relative" }}>
      <Renderer
        width={width}
        height={height}
        x_Label={x_Label}
        y_Label={y_Label}
        data={data}
        setHoveredCell={setHoveredCell}
      />
      <Tooltip interactionData={hoveredCell} width={width} height={height} />
      <svg id="legend" width={500} height={300}/>
    </div>
  );
};

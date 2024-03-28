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

var colorScale = d3.scaleSequentialSymlog([1, max], d3.interpolateGnBu);

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
    </div>
  );
};

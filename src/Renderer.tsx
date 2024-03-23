import React, { useMemo } from "react";
import * as d3 from "d3";
import { InteractionData } from "./Heatmap";
import Legend from "d3-color-legend";
// import Label from "react-d3-library";

const MARGIN = { top: 10, right: 50, bottom: 30, left: 50 };

type RendererProps = {
  width: number;
  height: number;
  x_Label: string;
  y_Label: string;
  data: { x: string; y: string; value: number }[];
  setHoveredCell: (hoveredCell: InteractionData | null) => void;
};

export const Renderer = ({
  width,
  height,
  x_Label,
  y_Label,
  data,
  setHoveredCell,
}: RendererProps) => {
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const min = 0;
  const max = data.reduce((max, coord) => Math.max(max, coord["value"]), 0)
//   const max = d3.extent(data.map((d) => d.value)); // extent can return [undefined, undefined], default to [0,0] to fix types

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [data, height]);


  var colorScale = d3.scaleSequentialSymlog([min +1, max], d3.interpolateGnBu)
  console.log("colorScale")
  console.log(colorScale)
    // .scaleSequentialLog()
    // .interpolator(d3.interpolateRgbBasisClosed(["white", "blue"]))
    

  const title  = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);

    if (d.value === null || !x || !y) {
        return;
    }

    return (
        <text
            key={"text_x_" + d.x + "_y_" + d.y}
            x={xScale(d.x) + xScale.bandwidth()/2}
            y={yScale(d.y) + yScale.bandwidth()/2 + + yScale.bandwidth()/20}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={20}
            fill={"black"}
        >
            {d.value}
        </text>
    )
  });

    
  // Build the rectangles
  const allShapes = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);

    if (d.value === null || !x || !y) {
      return;
    }

    return (
      <rect
        key={i}
        r={2}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={colorScale(d.value)}
        rx={5}
        stroke={"white"}
        onMouseEnter={(e) => {
          setHoveredCell({
            xLabel: x_Label + d.x,
            yLabel: y_Label + d.y,
            xPos: x + xScale.bandwidth() + MARGIN.left,
            yPos: y + xScale.bandwidth() / 2 + MARGIN.top,
            value: Math.round(d.value * 100) / 100,
          });
        }}
        onMouseLeave={() => setHoveredCell(null)}
        cursor="pointer"
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const x = xScale(name);

    if (!x) {
      return null;
    }

    return (
      <text
        key={i}
        x={x + xScale.bandwidth() / 2}
        y={boundsHeight + 15}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={20}
        fill={"white"}
      >
        {name}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const y = yScale(name);

    if (!y) {
      return null;
    }

    return (
      <text
        key={i}
        x={-6}
        y={y + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={20}
        fill={"white"}
      >
        {name}
      </text>
    );
  });

    return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allShapes}
        {xLabels}
        {yLabels}
        {title}
      </g>
    </svg>
  )

  
};

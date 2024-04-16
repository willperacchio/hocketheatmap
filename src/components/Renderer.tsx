import { useMemo } from "react";
import * as d3 from "d3";
import { InteractionData } from "./Heatmap";

const MARGIN = { top: 50, right: 50, bottom: 60, left: 60 };

type RendererProps = {
  width: number;
  height: number;
  x_Label: string;
  y_Label: string;
  data: { x: string; y: string; value: number }[];
  max: number;
  setHoveredCell: (hoveredCell: InteractionData | null) => void;
};

export const Renderer = ({width, height, x_Label, y_Label, data, max, setHoveredCell}: RendererProps) => {
  // The bounds (=area inside the axis) is calculated by subtracting the margins
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

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [data, height]);

  var colorScale = d3.scaleSequentialSymlog([0, max], d3.interpolateGnBu)

  const dataLabels  = data.map((d, i) => {
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
            fontSize={"1.5rem"}
            fontWeight={"bold"}
            fill={"black"}
            pointerEvents={"none"}
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
            xLabel: x_Label,
            x: d.x,
            yLabel: y_Label,
            y: d.y,
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
        fontSize={"1.5rem"}
        fill={"white"}
        pointerEvents={"none"}
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
        fontSize={"1.5rem"}
        fill={"white"}
        pointerEvents={"none"}
      >
        {name}
      </text>
    );
  });

  // Bottom Label
  const bottomLabel = [0].map((d, i) => {
    return (
      <text
        x={width/2 - 50}
        y={boundsHeight + 45}
        key={"BottomLabel"}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={"1.75rem"}
        fill={"white"}
        pointerEvents={"none"}
      >
        Goals Scored by {x_Label.split(" ")[0]}
      </text>
    )
  });

  // Side Label
  const sideLabel = [0].map((d, i) => {
    return (
      <text
        x={0}
        y={0}
        key={"SideLabel"}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(-90, 0,  0) translate(${-width*.5 + 42}, ${-42})`}
        fontSize={"1.75rem"}
        fill={"white"}
        pointerEvents={"none"}
      >
        Goals Scored by {y_Label.split(" ")[0]}
      </text>
    )
  });

  // Top Label
  const heatmapLabel = [0].map((d, i) => {
    return (
      <text
        x={width/2 - 50}
        y={-30}
        key={"TopLabel"}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={"2rem"}
        fill={"white"}
        pointerEvents={"none"}
      >
        Heatmap of Score Frequency
      </text>
    )
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
          {heatmapLabel}
          {dataLabels}
          {bottomLabel}
          {sideLabel}
        </g>
      </svg>
  )
};

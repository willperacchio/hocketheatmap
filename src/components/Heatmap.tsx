import { useState } from "react";
import { Renderer } from "./Renderer";
import { Tooltip } from "./Tooltip";


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
  x: string;
  y: string;
  xPos: number;
  yPos: number;
  value: number;
};

export const Heatmap = ({ width, height, x_Label, y_Label, data, max }: HeatmapProps) => {
  const [hoveredCell, setHoveredCell] = useState<InteractionData | null>(null);

  return (
    <div style={{ position: "relative" }}>
      <Renderer
        width={width}
        height={height}
        x_Label={x_Label}
        y_Label={y_Label}
        data={data}
        max={max}
        setHoveredCell={setHoveredCell}
      />
      <Tooltip interactionData={hoveredCell} width={width} height={height} />
    </div>
  );
};

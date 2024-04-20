import { InteractionData } from "./Heatmap";

type TooltipProps = {
  interactionData: InteractionData | null;
  width: number;
  height: number;
};

export const HeatmapTooltip = ({ interactionData, width, height }: TooltipProps) => {
  if (!interactionData) {
    return null;
  }

  return (
    <div
      style={{
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none"
      }}
    >
      <div
        className="tooltip"
        style={{
          position: "absolute",
          left: interactionData.xPos,
          top: interactionData.yPos,
        }}
      >
        <TooltipRow label={interactionData.xLabel} value={interactionData.x} />
        <TooltipRow label={interactionData.yLabel} value={interactionData.y} />
        <TooltipRow label={"Frequency"} value={String(interactionData.value)} />
      </div>
    </div>
  );
};

type TooltipRowProps = {
  label: string;
  value: string;
};

const TooltipRow = ({ label, value }: TooltipRowProps) => (
  <div>
    <span><b>{label}: {value}</b></span>
  </div>
);

import { HistogramInteractionData } from "./DoubleHistogram";

type HistogramTooltipProps = {
  histogramInteractionData: HistogramInteractionData | null;
  width: number;
  height: number;
};

export const HistogramTooltip = ({ histogramInteractionData, width, height }: HistogramTooltipProps) => {
  if (!histogramInteractionData) {
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
        pointerEvents: "none",
      }}
    >
      <div
        className="tooltip"
        style={{
          position: "absolute",
          left: histogramInteractionData.xPos,
          top: histogramInteractionData.yPos,
        }}
      >
        <TooltipRow label={"Goals"} value={String(histogramInteractionData.bin)} />
        <TooltipRow label={"Frequency"} value={String(histogramInteractionData.sValue)} />
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
    <b>{label}</b>
    <span>: </span>
    <span>{value}</span>
  </div>
);

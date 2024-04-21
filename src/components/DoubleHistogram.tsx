import { HistogramRenderer } from "./HistogramRenderer";
import * as d3 from "d3";


export type DoubleHistogramProps = {
  w: number;
  h: number;
  s1_Label: string;
  s2_Label: string;
  s1: Number[];
  s2: Number[];
  mean1: number;
  mean2: number;
  stdev1: number;
  stdev2: number;
};

export type HistogramInteractionData = {
  label: string;
  xPos: number;
  yPos: number;
  bin: number;
  sValue: number;
};

export const DoubleHistogram = ({ w, h, s1_Label, s2_Label, s1, s2, mean1, mean2, stdev1, stdev2 }: DoubleHistogramProps) => {

  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 60, left: 90},
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;

  // X axis: scale and draw:
  const x = d3.scaleLinear().domain([-1, 12]).range([0, width]);

  // Get Histogram for Data
  const histogram = d3.histogram().value((d) => d).domain(x.domain()).thresholds(x.ticks(13));
  const bins1 = histogram([...s1]);
  const bins2 = histogram([...s2]);

  const maxFreq = Math.max(d3.max(bins1, function(d) { return d.length * 1.25; }), d3.max(bins2, function(d) { return d.length * 1.25; }) )

  // Y axis: scale and draw:
  const y = d3.scaleLinear().domain([0, maxFreq]).range([height, 0]);

  return (
    <div style={{ position: "relative" }} id="double_histogram" className="double_histogram">
      <HistogramRenderer
        id="first"
        x={x}
        y={y}
        label={s1_Label}
        bins={bins1}
        maxFreq={maxFreq}
        width={width}
        height={height}
        margin={margin}
        color="rgb(131, 206, 193)"
        mean={mean1}
        stdev={stdev1}
      />
      <div className="spacer"></div>
      <HistogramRenderer
        id="second"
        x={x}
        y={y}
        label={s2_Label}
        bins={bins2}
        maxFreq={maxFreq}
        width={width}
        height={height}
        margin={margin}
        color="rgb(17, 109, 172)"
        mean={mean2}
        stdev={stdev2}
      />
    </div>
  );
};

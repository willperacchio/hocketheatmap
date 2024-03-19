import React from "react";
import { HeatmapProps } from "./Heatmap";

export default function DataProcessing (data_og, teams, years, types) {
  const nCol = 11;
  const nRow = 11;

  let og = [];
  // console.log("processing")
  // console.log(teams, years, types)

  for (const [t, t_val] of Object.entries(types)) {
    if (t_val) {
      for (const [y, y_val] of Object.entries(years)) {
        if (y_val) {
          let szn =  y + "_" + t;
          // console.log(data_og)
          for (let q = 0; q < data_og[szn]["games"].length; q++) {
            // console.log(szn)
            if (teams[data_og[szn]["games"][q]["home"]["alias"]] || teams[data_og[szn]["games"][q]["away"]["alias"]]) {
              og.push([data_og[szn]["games"][q]["home_points"], data_og[szn]["games"][q]["away_points"]])
            }
          }
        }
      }
    }
  }
  

  let vals = {};

  for (let a = 0; a < nCol; a++) {
    for (let b = 0; b < nRow; b++) {
      vals["" + a + ":" + b] = 0
    }
  }

  for (let g = 0; g < og.length; g++) {
    // console.log("here")
    if (og[g] != null && og[g][0] != null && og[g][1] != null ) {
      vals["" + og[g][0] + ":" + og[g][1]] += 1
    } else {
      // console.log(og[g])
    }
  }

  // console.log(vals)

  type HeatmapData = { x: number; y: number; value: number }[];
  let data: HeatmapData = [];

  for (let x = 0; x < nCol; x++) {
    for (let y = 0; y < nRow; y++) {
      data.push({x: x, y: y, value: vals["" + x + ":" + y]});
    }
  }

  return data;
}

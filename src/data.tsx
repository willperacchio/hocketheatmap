import React from "react";
import { HeatmapProps } from "./Heatmap";

export function DataViz (og) {
  const nCol = 11;
  const nRow = 11;

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

export default function DataProcessing (data_og, checks) {
  // console.log("checks", checks)

  let teams = checks["teams"];
  let years = checks["years"];
  let months = checks["months"];
  let weekdays = checks["weekdays"];
  let types = checks["types"];
  let homeAway = checks["homeawaysplit"]

  let games = [];
  let og = [];
  // console.log("processing")
  // console.log(teams, years, types)

  for (const [t, t_val] of Object.entries(types)) {
    if (t_val) { // Check season type
      for (const [y, y_val] of Object.entries(years)) {
        if (y_val) { // Check year
          let szn =  y + "_" + t;
          // console.log(data_og)
          // console.log(szn)
          for (let q = 0; q < data_og[szn]["games"].length; q++) { // Check games
            if (months[data_og[szn]["games"][q]["scheduled"].substring(5, 7)]) { // Check Month
              let weekday = new Date(data_og[szn]["games"][q]["scheduled"]).getDay();
              // console.log(weekday)
              if (weekdays[weekday]) { // Check Weekday
                if (teams[data_og[szn]["games"][q]["home"]["alias"]] || teams[data_og[szn]["games"][q]["away"]["alias"]]) { // Check teams
                  if (data_og[szn]["games"][q]["status"] == "closed") {
                    games.push(data_og[szn]["games"][q])
                    if (homeAway) {
                      og.push([data_og[szn]["games"][q]["home_points"], data_og[szn]["games"][q]["away_points"]])
                    } else {
                      if (data_og[szn]["games"][q]["home_points"] >= data_og[szn]["games"][q]["away_points"]) {
                        // console.log(data_og[szn]["games"][q])
                        og.push([data_og[szn]["games"][q]["away_points"], data_og[szn]["games"][q]["home_points"]])
                      } else {
                        og.push([data_og[szn]["games"][q]["home_points"], data_og[szn]["games"][q]["away_points"]])
                      }
                    }
                  } else {
                    // console.log(data_og[szn]["games"][q]["status"])
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  

  return [games, og];
}

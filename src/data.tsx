import React from "react";
import { HeatmapProps } from "./components/Heatmap.tsx";
import * as NHLLogos from "./components/Logos.tsx";

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

export function DataProcessing (data_og, checks) {
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

export function GetLogo (key, size) {
  switch (key) {
    case "NHL":
      return <NHLLogos.NHL size={size} />
    case "BOS":
      return <NHLLogos.BOS size={size} />
    case "BUF":
      return <NHLLogos.BUF size={size} />
    case "DET":
      return <NHLLogos.DET size={size} />
    case "FLA":
      return <NHLLogos.FLA size={size} />
    case "MTL":
      return <NHLLogos.MTL size={size} />
    case "OTT":
      return <NHLLogos.OTT size={size} />
    case "TB":
      return <NHLLogos.TB size={size} />
    case "TOR":
      return <NHLLogos.TOR size={size} />
    case "CAR":
      return <NHLLogos.CAR size={size} />
    case "CBJ":
      return <NHLLogos.CBJ size={size} />
    case "NJ":
      return <NHLLogos.NJ size={size} />
    case "NYI":
      return <NHLLogos.NYI size={size} />
    case "NYR":
      return <NHLLogos.NYR size={size} />
    case "PHI":
      return <NHLLogos.PHI size={size} />
    case "PIT":
      return <NHLLogos.PIT size={size} />
    case "WSH":
      return <NHLLogos.WSH size={size} />
    case "ARI":
      return <NHLLogos.ARI size={size} />
    case "CHI":
      return <NHLLogos.CHI size={size} />
    case "COL":
      return <NHLLogos.COL size={size} />
    case "DAL":
      return <NHLLogos.DAL size={size} />
    case "MIN":
      return <NHLLogos.MIN size={size} />
    case "NSH":
      return <NHLLogos.NSH size={size} />
    case "STL":
      return <NHLLogos.STL size={size} />
    case "WPG":
      return <NHLLogos.WPG size={size} />
    case "ANA":
      return <NHLLogos.ANA size={size} />
    case "CGY":
      return <NHLLogos.CGY size={size} />
    case "EDM":
      return <NHLLogos.EDM size={size} />
    case "LA":
      return <NHLLogos.LA size={size} />
    case "SJ":
      return <NHLLogos.SJ size={size} />
    case "SEA":
      return <NHLLogos.SEA size={size} />
    case "VAN":
      return <NHLLogos.VAN size={size} />
    case "VGK":
      return <NHLLogos.VGK size={size} />
    default:
      return <NHLLogos.NHL size={size} />
  }
}
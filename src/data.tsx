import React from "react";
import { HeatmapProps } from "./components/Heatmap";
import * as NHLLogos from "./components/Logos";
import moment from 'moment-timezone';
import { formatInTimeZone, format } from "date-fns-tz";

export function DataViz (og) {
  const nCol = 12;
  const nRow = 12;

  let values = {};

  for (let a = 0; a < nCol; a++) {
    for (let b = 0; b < nRow; b++) {
      values["" + a + ":" + b] = 0
    }
  }

  for (let g = 0; g < og.length; g++) {
    if (og[g] != null && og[g][0] != null && og[g][1] != null ) {
      values["" + og[g][0] + ":" + og[g][1]] += 1
    }
  }

  type HeatmapData = { x: number; y: number; value: number }[];
  let data: HeatmapData = [];

  for (let x = 0; x < nCol; x++) {
    for (let y = 0; y < nRow; y++) {
      data.push({x: x, y: y, value: values["" + x + ":" + y]});
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
  let homeAway = checks["home_away"];
  let timezone = checks["timezones"];
  let country = checks["countries"];
  let start_time = checks["start_times"];

  let games = [];
  let og = [];
  // console.log("processing")
  // console.log(teams, years, types)
  let stats = { "total_away": 0, "total_home": 0, "mov": 0 }

  for (const [t, t_val] of Object.entries(types)) {
    if (t_val) { // Check season type
      for (const [y, y_val] of Object.entries(years)) {
        if (y_val) { // Check year
          let szn =  y + "_" + t;
          // console.log(data_og)
          // console.log(szn)
          for (let q = 0; q < data_og[szn]["games"].length; q++) { // Check games
            let game = data_og[szn]["games"][q]
            let date = formatInTimeZone(game.scheduled, convertTimeZone(game.venue.time_zone, game.venue.country, game.venue.state), 'yyyy/MM/dd')
            if (months[date.substring(5,7)]) { // Check Month
              // console.log(weekday)
              let weekday = new Date(date).getDay();
              if (weekdays[weekday]) { // Check Weekday
                if (teams[game["home"]["alias"]] || teams[game["away"]["alias"]]) { // Check teams
                  if (country[game["venue"]["country"]] // Check country
                    && timezone[game["venue"]["time_zone"]] // check timezone
                    && start_time[formatInTimeZone(game.scheduled, convertTimeZone(game.venue.time_zone, game.venue.country, game.venue.state), 'h:mm a')]) { // Check start time
                    if (game["status"] == "closed") {
                      games.push(game)
                      if (homeAway) {
                        og.push([game["home_points"], game["away_points"]])
                      } else {
                        if (game["home_points"] >= game["away_points"]) {
                          // console.log(game)
                          og.push([game["away_points"], game["home_points"]])
                        } else {
                          og.push([game["home_points"], game["away_points"]])
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
  }
  
  const sg = structuredClone(games)
  stats["average_away"] = (sg.reduce((acc, game) => { return acc += game["away_points"] }, 0 ) / sg.length).toFixed(3)
  stats["average_home"] = (sg.reduce((acc, game) => { return acc += game["home_points"] }, 0 ) / sg.length).toFixed(3)
  stats["average_winner"] = (sg.reduce((acc, game) => { return acc += Math.max(game["away_points"], game["home_points"]) }, 0 ) / sg.length).toFixed(3)
  stats["average_loser"] = (sg.reduce((acc, game) => { return acc += Math.min(game["away_points"], game["home_points"]) }, 0 ) / sg.length).toFixed(3)
  
  
  stats["average_mov"] = (sg.reduce((acc, game) => { return acc += Math.abs(game["away_points"] - game["home_points"]) }, 0 ) / sg.length).toFixed(3)


  stats["home_points"] = sg.map((game, idx) => game["home_points"])
  stats["away_points"] = sg.map((game, idx) => game["away_points"])
  stats["winner_points"] = sg.map((game, idx) => Math.max(game["home_points"], game["away_points"]))
  stats["loser_points"] = sg.map((game, idx) => Math.min(game["home_points"], game["away_points"]))

  const standardDeviation = (arr, usePopulation = false) => {
    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    return Math.sqrt(
      arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
        (arr.length - (usePopulation ? 0 : 1))
    );
  };

  stats["stdev_home"] = standardDeviation(sg.map((game) => game["home_points"]), true).toFixed(2)
  stats["stdev_away"] = standardDeviation(sg.map((game) => game["away_points"]), true).toFixed(2)
  stats["stdev_winner"] = standardDeviation(sg.map((game) => Math.max(game["home_points"], game["away_points"])), true).toFixed(2)
  stats["stdev_loser"] = standardDeviation(sg.map((game) => Math.min(game["home_points"], game["away_points"])), true).toFixed(2)

  stats["stdev_mov"] = standardDeviation(sg.map((game) => Math.abs(game["away_points"] - game["home_points"])), true).toFixed(2)

  return [games, og, stats];
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

export function convertTimeZone(timezone: string, country: string, state: string) {
  if (country === "CZE" || country === "SWE" || country === "FIN") {
    return timezone
  }

  return "America/" + getCityForTimeZone(timezone, country, state)
}

export function getCityForTimeZone (timezone: string, country: string, state: string) {
  if (country === "CZE" || country === "SWE" || country === "FIN") {
    return timezone.split("/")[1]
  }
  
  if (state === "AZ") { // Phoenix doesn't follow DST
    return "Phoenix"
  }

  if (timezone === "US/Eastern") {
    return "New_York"
  } else if (timezone === "US/Central") {
    return "Chicago"
  } else if (timezone === "US/Mountain") {
    return "Denver"
  } else if (timezone === "US/Pacific") {
    return "Los_Angeles"
  }
}

import './App.css';
import React, { useState, useEffect } from "react";
import { Heatmap } from './components/Heatmap';
import { DoubleHistogram } from "./components/DoubleHistogram";
import { DataViz, DataProcessing } from "./data";
import nhl from "./NHL.json"
import * as NHLLogos from "./components/Logos";
import DisplayedGames from "./components/DisplayedGames";
import Filters from "./components/Filters"

function App() {
  const [width, setWidth] = useState(100);

  const homeScoreText = "Home Score";
  const awayScoreText = "Away Score";
  const loserScoreText = "Loser Score";
  const winnerScoreText = "Winner Score";

  let defaultChecked = true;
  let default_home_away = true;

  let teams_list = ["BOS", "BUF", "DET", "FLA", "MTL", "OTT", "TB", "TOR", "CAR", "CBJ", "NJ", "NYI", "NYR", "PHI", "PIT", "WSH", "ARI", "CHI", "COL", "DAL", "MIN", "NSH", "STL", "WPG", "ANA", "CGY", "EDM", "LA", "SJ", "SEA", "VAN", "VGK"]
  
  let months_list = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let months_readable = { "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12":  "December"};
  
  let weekdays_list   = ["0", "1", "2", "3", "4", "5", "6"]
  let weekdays_readable = {"0": "Sunday", "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday", "6": "Saturday"}

  let years_list = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
  let years_readable = {"2016": "2016-17", "2017": "2017-18", "2018": "2018-19", "2019": "2019-20", "2020": "2020-21", "2021": "2021-22", "2022": "2022-23", "2023": "2023-24" }
  
  let types_list = ["REG", "PST"];
  let types_readable = {"REG": "Regular Season", "PST": "Postseason"}

  let countries_list = ["USA", "CAN", "SWE", "FIN", "CZE"]
  let countries_readable = {"USA": "United States 🇺🇸", "CAN": "Canada 🇨🇦", "SWE": "Sweden 🇸🇪", "FIN": "Finland 🇫🇮", "CZE": "Czechia 🇨🇿" }

  let timezones_list = ["US/Eastern", "US/Central", "US/Mountain", "US/Pacific", "Europe/Vienna", "Europe/Sofia"]
  let timezones_readable = {}
  timezones_list.map((tz) => timezones_readable[tz] = tz)

  let start_times_list = [
    "11:00 AM", "11:30 AM", 
    "12:00 PM", "12:30 PM", 
    "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", 
    "3:00 PM", "3:30 PM", 
    "4:00 PM", "4:15 PM", "4:20 PM", "4:30 PM", "4:45 PM",
    "5:00 PM", "5:30 PM", 
    "6:00 PM", "6:30 PM", 
    "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM",
    "8:00 PM", "8:30 PM", "8:45 PM", "8:57 PM",
    "9:00 PM"]
  let start_times_readable = {}
  start_times_list.map((st) => start_times_readable[st] = st)

  let defChecks = { "teams": {}, "years": {}, "months": {}, "weekdays": {}, "types": {}, "countries": {}, "timezones": {}, "start_times": {}, "home_away": default_home_away };

  const setDefChecks = (defChecks, str, list, defaultChecked) => {
    for (let x = 0; x < list.length; x++) {
      defChecks[str][list[x]] = defaultChecked;
    }
  };

  setDefChecks(defChecks, "teams", teams_list, defaultChecked)
  setDefChecks(defChecks, "months", months_list, defaultChecked)
  setDefChecks(defChecks, "weekdays", weekdays_list, defaultChecked)
  setDefChecks(defChecks, "types", types_list, defaultChecked)
  setDefChecks(defChecks, "countries", countries_list, defaultChecked)
  setDefChecks(defChecks, "timezones", timezones_list, defaultChecked)
  setDefChecks(defChecks, "start_times", start_times_list, defaultChecked)
  
  defChecks["years"]["2022"] = true;

  const [checks, setChecks] = useState(defChecks);
  let eligibleGames = DataProcessing(nhl, defChecks)
  const [displayGames, setDisplayGames] = useState(eligibleGames[0]);
  let processed = DataViz(eligibleGames[1]);
  const [stats, setStats] = useState(eligibleGames[2]);
  const [data, setData] = useState(processed);
  const [most_frequent, setMostFrequent] = useState(getMax(processed))

  function getMax (data) {
    return data.reduce(function(prev, current) {
      return (prev && prev.value > current.value) ? prev : current
    })
  }

  function handleChange (e, a) {
    let newChecks = {...checks}

    console.log(e)

    if (e.type=="click") {
      if (teams_list.indexOf(a) !== -1) {
        newChecks["teams"][a] = !newChecks["teams"][a]
      } else if (years_list.indexOf(a) !== -1) {
        newChecks["years"][a] = !newChecks["years"][a]
      } else if (months_list.indexOf(a) !== -1) {
        newChecks["months"][a] = !newChecks["months"][a]
      } else if (weekdays_list.indexOf(a) !== -1) {
        newChecks["weekdays"][a] = !newChecks["weekdays"][a]
      } else if (types_list.indexOf(a) !== -1) {
        newChecks["types"][a] = !newChecks["types"][a]
      } else if (countries_list.indexOf(a) !== -1) {
        newChecks["countries"][a] = !newChecks["countries"][a]
      } else if (timezones_list.indexOf(a) !== -1) {
        newChecks["timezones"][a] = !newChecks["timezones"][a]
      } else if (start_times_list.indexOf(a) !== -1) {
        newChecks["start_times"][a] = !newChecks["start_times"][a]
      } else if (e.target.value === 0 || e.target.value === 1) {
        console.log("HERE")
        newChecks["home_away"] = e.target.value ? false : true
      }
    }

    setChecks(newChecks);
    eligibleGames = DataProcessing(nhl, newChecks)
    setDisplayGames(eligibleGames[0])
    let newly_processed = DataViz(eligibleGames[1])
    setStats(eligibleGames[2])
    setData(newly_processed)
    setMostFrequent(getMax(newly_processed))
  };

  const getMostFrequentOutcome = (home_away) => {
    if (most_frequent["value"] === 0) {
      return "N/A"
    }

    if (home_away) {
      return "Home " + most_frequent["x"] + " - Away " + most_frequent["y"] + " (" + most_frequent["value"] + " times)"
    } else {
      return "Winner " + most_frequent["y"] + " - Loser " + most_frequent["x"] + " (" + most_frequent["value"] + " times)"
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
        // Depending on the layout, you may need to swap inlineSize with blockSize
        // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
        setWidth(event[0].contentBoxSize[0].inlineSize);
    });

    resizeObserver.observe(document.getElementById("right-side"));
});

  return (
    <div className="App">
      <div className="app-body">
        <div className="head-row">
          <NHLLogos.NHL size={200}/>
          <br/>
          NHL Interactive Heatmap
        </div>
        <Filters 
          width={width}
          checks={checks}
          handleChange={handleChange}
          years_list={years_list} years_readable={years_readable}
          months_list={months_list} months_readable={months_readable}
          weekdays_list={weekdays_list} weekdays_readable={weekdays_readable}
          types_list={types_list} types_readable={types_readable}
          countries_list={countries_list} countries_readable={countries_readable}
          timezones_list={timezones_list} timezones_readable={timezones_readable}
          start_times_list={start_times_list} start_times_readable={start_times_readable}
          teams_list={teams_list}
          />
        <span className="right-side" id="right-side">
          <Heatmap 
            data={data} 
            width={width * 0.9} 
            height={width * 0.9} 
            x_Label={checks["home_away"] ? homeScoreText: loserScoreText} 
            y_Label={checks["home_away"] ? awayScoreText: winnerScoreText} 
            max={most_frequent["value"]}
            />
          <div className="summary-stats two_column">
            <div>Number of Eligible Games:</div>
            <div>{data.reduce((n, coord) => n + coord["value"], 0)}</div>
            <div>Most Frequent Outcome:</div>
            <div>{getMostFrequentOutcome(checks["home_away"])}</div>
            <div>Average Margin of Victory:</div>
            <div>{stats["average_mov"]} ± {stats["stdev_mov"]}</div>
          </div>
          <span className="double-histogram">
            <DoubleHistogram 
              w={width*.45} 
              h={width*.45} 
              s1={checks["home_away"] ? [...stats["home_points"]]: [...stats["loser_points"]]}
              s2={checks["home_away"] ? [...stats["away_points"]]: [...stats["winner_points"]]}
              s1_Label={checks["home_away"] ? homeScoreText: loserScoreText} 
              s2_Label={checks["home_away"] ? awayScoreText: winnerScoreText}
              mean1={checks["home_away"] ? stats["average_home"] : stats["average_loser"]}
              mean2={checks["home_away"] ? stats["average_away"] : stats["average_winner"]}
              stdev1={checks["home_away"] ? stats["stdev_home"] : stats["stdev_loser"]}
              stdev2={checks["home_away"] ? stats["stdev_away"] : stats["stdev_winner"]}
              />
          </span>
        </span>
        <span className="displayed-games">
          <DisplayedGames displayed_games={displayGames} />
        </span>
      </div>
    </div>
  );
}

export default App;

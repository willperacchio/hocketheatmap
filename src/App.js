import './App.css';
import React, { useState, setState, useEffect } from "react";
import * as d3 from "d3";
import { Heatmap, InteractionData } from './components/Heatmap';
import { DoubleHistogram } from "./components/DoubleHistogram";
import { DataViz, DataProcessing } from "./data";
import nhl from "./NHL.json"
import Team from "./components/Team";
import * as NHLLogos from "./components/Logos";
import DisplayedGames from "./components/DisplayedGames";
import YearFilter from "./components/YearFilter"
import MonthFilter from "./components/MonthFilter"
import WeekdayFilter from "./components/WeekdayFilter"
import TypeFilter from "./components/TypeFilter"
import CountryFilter from "./components/CountryFilter"

function App() {
  const homeScoreText = "Home Score";
  const awayScoreText = "Away Score";
  const loserScoreText = "Loser Score";
  const winnerScoreText = "Winner Score";

  let defaultChecked = true;
  let defHomeAwaySplit = true;

  let teams_list = ["BOS", "BUF", "DET", "FLA", "MTL", "OTT", "TB", "TOR", "CAR", "CBJ", "NJ", "NYI", "NYR", "PHI", "PIT", "WSH", "ARI", "CHI", "COL", "DAL", "MIN", "NSH", "STL", "WPG", "ANA", "CGY", "EDM", "LA", "SJ", "SEA", "VAN", "VGK"]
  
  let months_list = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let months_readable = { "01": "JAN", "02": "FEB", "03": "MAR", "04": "APR", "05": "MAY", "06": "JUN", "07": "JUL", "08": "AUG", "09": "SEP", "10": "OCT", "11": "NOV", "12":  "DEC"};
  
  let weekdays_list   = ["0", "1", "2", "3", "4", "5", "6"]
  let weekdays_readable = {"0": "SUN", "1": "MON", "2": "TUE", "3": "WED", "4": "THU", "5": "FRI", "6": "SAT"}

  let years_list = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
  
  let types_list = ["REG", "PST"];
  let types_readable = {"REG": "Regular Season", "PST": "Postseason"}

  let countries_list = ["USA", "CAN", "SWE", "FIN", "CZE"]
  let countries_readable = {"USA": "United States 🇺🇸", "CAN": "Canada 🇨🇦", "SWE": "Sweden 🇸🇪", "FIN": "Finland 🇫🇮", "CZE": "Czechia 🇨🇿" }

  let defChecks = { "teams": {}, "years": {}, "months": {}, "weekdays": {}, "types": {}, "countries": {}, "homeawaysplit": defHomeAwaySplit };

  const setDefChecks = (defChecks, str, list, defaultChecked) => {
    for (let x = 0; x < list.length; x++) {
      defChecks[str][list[x]] = defaultChecked;
    }
  };

  setDefChecks(defChecks, "teams", teams_list, defaultChecked)
  setDefChecks(defChecks, "years", years_list, defaultChecked)
  setDefChecks(defChecks, "months", months_list, defaultChecked)
  setDefChecks(defChecks, "weekdays", weekdays_list, defaultChecked)
  setDefChecks(defChecks, "types", types_list, defaultChecked)
  setDefChecks(defChecks, "countries", countries_list, defaultChecked)

  const [checks, setChecks] = useState(defChecks);
  let eligibleGames = DataProcessing(nhl, defChecks)
  const [displayGames, setDisplayGames] = useState(structuredClone([...eligibleGames[0]]));
  let processed = DataViz(eligibleGames[1]);
  const [stats, setStats] = useState(structuredClone(eligibleGames[2]));
  const [data, setData] = useState(processed);
  const [hmmax, setHmmax] = useState(getMax(processed))

  function getMax (data) {
    return data.reduce((max, coord) => Math.max(max, coord["value"]), 0)
  }

  useEffect(() => {
    handleChange();
  }, []) 

  function handleChange (e) {
    console.log(e);
    let newChecks = {...checks}

    if (e != null && teams_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["teams"][e.target.value] = e.target.checked
    } else if (e != null && years_list.indexOf(e.target.value) != -1) {
      newChecks["years"][e.target.value] = e.target.checked
    } else if (e != null && months_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["months"][e.target.value] = e.target.checked
    } else if (e != null && weekdays_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["weekdays"][e.target.value] = e.target.checked
    } else if (e != null && types_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["types"][e.target.value] = e.target.checked
    } else if (e != null && countries_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["countries"][e.target.value] = e.target.checked
    } else if (e != null && e.target.value == "homeawaysplit") {
      newChecks["homeawaysplit"] = e.target.checked
    }

    setChecks(newChecks);
    eligibleGames = DataProcessing(nhl, newChecks)
    setDisplayGames(structuredClone([...eligibleGames[0]]))
    let newprocessed = DataViz(eligibleGames[1])
    setStats(eligibleGames[2])
    setData(newprocessed)
    setHmmax(getMax(newprocessed))
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="head-row">Heatmap and Summary Analysis of NHL Games <br/><NHLLogos.NHL size={200}/></div>
        <span className="filters">
          <span className="checkbox"><input 
                value="homeawaysplit" 
                type="checkbox" 
                defaultChecked={defaultChecked} 
                onChange={handleChange}/>Home Away Split</span>
          
          <div className="filter-descriptor">Season:</div>
          <YearFilter years_list={years_list} defaultChecked={defaultChecked} handleChange={handleChange} />
          
          <div className="filter-descriptor">Month:</div>
          <MonthFilter months_list={months_list} months_readable={months_readable} defaultChecked={defaultChecked} handleChange={handleChange} />
          
          <div className="filter-descriptor">Day of the Week:</div>
          <WeekdayFilter weekdays_list={weekdays_list} weekdays_readable={weekdays_readable} defaultChecked={defaultChecked} handleChange={handleChange} />
          
          <div className="filter-descriptor">Type of Contest:</div>
          <TypeFilter types_list={types_list} types_readable={types_readable} defaultChecked={defaultChecked} handleChange={handleChange} />

          <div className="filter-descriptor">Played in:</div>
          <CountryFilter countries_list={countries_list} countries_readable={countries_readable} defaultChecked={defaultChecked} handleChange={handleChange} />
          
          <div className="filter-descriptor">Team:</div>
          {
            [0, 1, 2, 3].map((a) => <div className="division_row">{teams_list.slice(a*8, a*8 + 8).map((tm, i) => Team(teams_list, defaultChecked, handleChange, a*8 + i))}</div>)
          }
          <div>Number of Eligible Games: {data.reduce((n, coord) => n + coord["value"], 0)}</div>
          <div>Most Common Outcome: {hmmax}</div>
          <div>Average Margin of Victory: {stats["average_mov"]} ± {stats["stdev_mov"]}</div>
        </span>
        <span className="heatmap">
          <Heatmap 
            data={data} 
            width={900} 
            height={900} 
            x_Label={checks["homeawaysplit"] ? homeScoreText: loserScoreText} 
            y_Label={checks["homeawaysplit"] ? awayScoreText: winnerScoreText} 
            max={hmmax}
            />
        </span>
        <span className="double-histogram">
          <DoubleHistogram 
            width={700} 
            height={400} 
            s1={checks["homeawaysplit"] ? [...stats["home_points"]]: [...stats["loser_points"]]}
            s2={checks["homeawaysplit"] ? [...stats["away_points"]]: [...stats["winner_points"]]}
            s1_Label={checks["homeawaysplit"] ? homeScoreText: loserScoreText} 
            s2_Label={checks["homeawaysplit"] ? awayScoreText: winnerScoreText}
            mean1={checks["homeawaysplit"] ? stats["average_home"] : stats["average_loser"]}
            mean2={checks["homeawaysplit"] ? stats["average_away"] : stats["average_winner"]}
            stdev1={checks["homeawaysplit"] ? stats["stdev_home"] : stats["stdev_loser"]}
            stdev2={checks["homeawaysplit"] ? stats["stdev_away"] : stats["stdev_winner"]}
            />
        </span>
        <span className="displayed-games">
          <DisplayedGames displayed_games={displayGames} />
        </span>
      </header>
    </div>
  );
}

export default App;

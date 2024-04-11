import './App.css';
import React, { useState, setState, useEffect } from "react";
import * as d3 from "d3";
import { Heatmap, InteractionData } from './components/Heatmap.tsx';
import { DataViz, DataProcessing } from "./data.tsx";
import nhl from "./NHL.json"
import Team from "./components/Team.tsx";
import * as NHLLogos from "./components/Logos.tsx";
import DisplayedGames from "./components/DisplayedGames.tsx";

function App() {
  const homeScoreText = "Home Score ";
  const awayScoreText = "Away Score ";
  const loserScoreText = "Loser Score ";
  const winnerScoreText = "Winner Score ";

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

  let defChecks = { "teams": {}, "years": {}, "months": {}, "weekdays": {}, "types": {}, "homeawaysplit": defHomeAwaySplit };

  for (let x = 0; x < teams_list.length; x++) {
    defChecks["teams"][teams_list[x]] = defaultChecked;
  }

  for (let x = 0; x < years_list.length; x++) {
    defChecks["years"][years_list[x]] = defaultChecked;
  }

  for (let x = 0; x < months_list.length; x++) {
    defChecks["months"][months_list[x]] = defaultChecked;
  }

  for (let x = 0; x < weekdays_list.length; x++) {
    defChecks["weekdays"][weekdays_list[x]] = defaultChecked;
  }

  for (let x = 0; x < types_list.length; x++) {
    defChecks["types"][types_list[x]] = defaultChecked;
  }

  const [checks, setChecks] = useState(defChecks);
  let eligibleGames = DataProcessing(nhl, defChecks)
  const [displayGames, setDisplayGames] = useState(structuredClone([...eligibleGames[0]]));
  let processed = DataViz(eligibleGames[1]);
  const [data, setData] = useState(processed);
  const [hmmax, setHmmax] = useState(getMax(processed))

  function getMax (data) {
    return data.reduce((max, coord) => Math.max(max, coord["value"]), 0)
  }

  useEffect(() => {
    handleChange();
  }, []) 

  function handleChange (e) {
    // console.log(e);
    let newChecks = {...checks}

    if (e != null && teams_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["teams"][e.target.value] = e.target.checked
    } else if (e != null && years_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["years"][e.target.value] = e.target.checked
    } else if (e != null && months_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["months"][e.target.value] = e.target.checked
    } else if (e != null && weekdays_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["weekdays"][e.target.value] = e.target.checked
    } else if (e != null && types_list.indexOf(e.target.defaultValue) != -1) {
      newChecks["types"][e.target.value] = e.target.checked
    } else if (e != null && e.target.value == "homeawaysplit") {
      newChecks["homeawaysplit"] = e.target.checked
    }

    setChecks(newChecks);
    eligibleGames = DataProcessing(nhl, newChecks)
    setDisplayGames(structuredClone([...eligibleGames[0]]))
    let newprocessed = DataViz(eligibleGames[1])
    setData(newprocessed)
    setHmmax(getMax(newprocessed))
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>NHL <NHLLogos.NHL size={50}/></div>
        <span className="checkbox"><input 
              value="homeawaysplit" 
              type="checkbox" 
              defaultChecked={defaultChecked} 
              onChange={handleChange}/>Home Away Split</span>
        <div className="year_row">
        {
          years_list.map((a) => <span key={"year_" + a} className="year"><span className="checkbox">
            <input 
              value={a} 
              type="checkbox" 
              defaultChecked={defaultChecked} 
              onChange={handleChange}/>{a}
            </span></span>)
        }
        </div>
        <div className="month_row">
        {
          months_list.map((a) => <span key={"month_" + a} className="month"><span className="checkbox">
            <input 
              value={a} 
              type="checkbox" 
              defaultChecked={defaultChecked} 
              onChange={handleChange}/>{months_readable[a]}
            </span></span>)
        }
        </div>
        <div className="weekday_row">
        {
          weekdays_list.map((a) => <span key={"weekday_" + a} className="weekday"><span className="checkbox">
            <input 
              value={a} 
              type="checkbox" 
              defaultChecked={defaultChecked} 
              onChange={handleChange}/>{weekdays_readable[a]}
            </span></span>)
        }
        </div>
        <div className="type_row">
        {
          types_list.map((a) => <span key={"type_" + a} className="type"><span className="checkbox">
            <input 
              value={a} 
              type="checkbox" 
              defaultChecked={defaultChecked} 
              onChange={handleChange}/>{types_readable[a]}
            </span></span>)
        }
        </div>
        {
          [0, 1, 2, 3].map((a) => <div className="division_row">{teams_list.slice(a*8, a*8 + 8).map((tm, i) => Team(teams_list, defaultChecked, handleChange, a*8 + i))}</div>)
        }
        
        <Heatmap 
          data={data} 
          width={700} 
          height={700} 
          x_Label={checks["homeawaysplit"] ? homeScoreText: loserScoreText} 
          y_Label={checks["homeawaysplit"] ? awayScoreText: winnerScoreText} 
          max={hmmax}
          />
        <div>Number of Eligible Games: {data.reduce((n, coord) => n + coord["value"], 0)}</div>
        <div>Mode: {hmmax}</div>
        <DisplayedGames displayed_games={displayGames} />
      </header>
    </div>
  );
}

export default App;

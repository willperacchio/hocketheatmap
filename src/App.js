import logo from './logo.svg';
import './App.css';
import React, { useState, setState, useEffect } from "react";
import * as d3 from "d3";
import { Heatmap, InteractionData } from './Heatmap.tsx';
import DataProcessing from "./data.tsx";
import nhl from "./NHL.json"
import Team from "./team.tsx";

function App() {
  let defaultChecked = true;
  let teams_list = ["BOS", "BUF", "DET", "FLA", "MTL", "OTT", "TB", "TOR", "CAR", "CBJ", "NJ", "NYI", "NYR", "PHI", "PIT", "WSH", "ARI", "CHI", "COL", "DAL", "MIN", "NSH", "STL", "WPG", "ANA", "CGY", "EDM", "LA", "SJ", "SEA", "VAN", "VGK"]
  let years_list = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"]
  let types_list = ["REG"];
  let defTeams = {};
  let defTypes = {};
  let defYears = {};


  for (let x = 0; x < teams_list.length; x++) {
    defTeams[teams_list[x]] = defaultChecked;
  }

  for (let x = 0; x < years_list.length; x++) {
    defYears[years_list[x]] = defaultChecked;
  }

  for (let x = 0; x < types_list.length; x++) {
    defTypes[types_list[x]] = defaultChecked
  }

  const [teams, setTeams] = useState(defTeams);
  const [years, setYears] = useState(defYears);
  const [types, setTypes] = useState(defTypes);
  const [data, setData] = useState(DataProcessing(nhl, defTeams, defYears, defTypes));
  const [hmmax, setHmmax] = useState(getMax(DataProcessing(nhl, defTeams, defYears, defTypes)))

  function getMax (data) {
    return data.reduce((max, coord) => Math.max(max, coord["value"]), 0)
  }

  useEffect(() => {
    handleChange();
  }, []) 

  function handleChange (e) {
    console.log("EVENT");
    console.log(e);

    let newTeams = {...teams}
    if (e != null && teams_list.indexOf(e.target.defaultValue) != -1) {
      newTeams[e.target.value] = e.target.checked
    }

    let newYears = {...years}
    if (e != null && years_list.indexOf(e.target.defaultValue) != -1) {
      newYears[e.target.value] = e.target.checked
    }

    let newTypes = types;

    setTeams(newTeams)
    setYears(newYears)
    setTypes(newTypes)
    setData(DataProcessing(nhl, newTeams, newYears, newTypes))
    setHmmax(getMax(DataProcessing(nhl, newTeams, newYears, newTypes)))
  };

  return (
    <div className="App">
      <header className="App-header">
        NHL
        <div class="year_row">
        {
          years_list.map((a) => <span class="year"><span className="checkbox">
            <input 
              key={a} 
              value={a} 
              type="checkbox" 
              defaultChecked={defaultChecked} 
              onChange={handleChange}/>{a}
            </span></span>)
        }
        </div>
        {
          [0, 1, 2, 3].map((a) => <div class="division_row">{teams_list.slice(a*8, a*8 + 8).map((tm, i) => Team(teams_list, defaultChecked, handleChange, a*8 + i))}</div>)
        }
        
        <Heatmap data={data} width={700} height={700} max={hmmax}/>
        <div>Number of Eligible Games: {data.reduce((n, coord) => n + coord["value"], 0)}</div>
        <div>Mode: {hmmax}</div>
      </header>
    </div>
  );
}

export default App;

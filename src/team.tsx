import React, { useState, useEffect } from "react";
import * as NHLLogos from "./logos.tsx";

export default function Team (teams_list, defaultChecked, handleChange, i) {
    function getLogo (key) {
        let size = 30;
        switch (key) {
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
        }
      }

    return (
        <span className="team" key={"team_" + i}>
            <span className="team_checkbox">
                <span className="checkbox">
                <input 
                    key={teams_list[i]} 
                    value={teams_list[i]} 
                    type="checkbox" 
                    defaultChecked={defaultChecked} 
                    onChange={handleChange}/>
                </span>
            </span>
            <span className="team_logoname">
                <span className="team_logo">{getLogo(teams_list[i])}</span>
                <span className="team_name">{teams_list[i]}</span>
            </span>
        </span>
    );
}

import { GetLogo } from "../data";

export default function TeamFilter ({filters_list, defaultChecked, handleChange, style, grid}) {
  if (filters_list === null || filters_list === undefined) {
    return;
  }

  return (
    <div className={`filter_row ` + grid}>
      { filters_list.map((a) => 
        <span key={"filters_" + a} className={`filter logo ` + style}>
          <span className="checkbox">
              <input 
                  value={a} 
                  type="checkbox" 
                  defaultChecked={defaultChecked} 
                  onChange={handleChange}/>
              <span className="team_logoname">
               <span className="team_logo">{GetLogo(a, 75)}</span>
              </span>
          </span>
        </span>
      )}
    </div>
    // <span className="team" key={"team_" + i}>
    //   <div className="team_format">
    //   <span className="team_checkbox">
    //     <input 
    //         key={teams_list[i]} 
    //         value={teams_list[i]} 
    //         type="checkbox" 
    //         defaultChecked={defaultChecked} 
    //         onChange={handleChange}/>
    //   </span>
    //   <span className="team_logoname">
    //     <span className="team_logo">{GetLogo(teams_list[i], 75)}</span>
    //   </span>
    //   </div>
    // </span>
  );
}

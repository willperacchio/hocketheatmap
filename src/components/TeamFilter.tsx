import { GetLogo } from "../data";

export default function TeamFilter ({filters_list, defaultChecked, handleChange, teamStyle, grid, size}) {
  if (filters_list === null || filters_list === undefined) {
    return;
  }

  return (
    <div className={`filter_row ` + grid}>
      { filters_list.map((a) => 
        <span key={"filters_" + a} className={`filter logo ` + teamStyle}>
          <span className="checkbox">
              <input 
                  value={a} 
                  type="checkbox" 
                  defaultChecked={defaultChecked} 
                  onChange={handleChange}/>
              <span className="team-logo-name">
               <span className="team_logo">{GetLogo(a, size)}</span>
              </span>
          </span>
        </span>
      )}
    </div>
  );
}

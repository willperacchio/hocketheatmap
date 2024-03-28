import { GetLogo } from "./../data.tsx";

export default function Team (teams_list, defaultChecked, handleChange, i) {
  console.log(teams_list)
  return (
    <span className="team" key={"team_" + i}>
      <div className="team_format">
      <span className="team_checkbox">
        <input 
            key={teams_list[i]} 
            value={teams_list[i]} 
            type="checkbox" 
            defaultChecked={defaultChecked} 
            onChange={handleChange}/>
      </span>
      <span className="team_logoname">
        <span className="team_logo">{GetLogo(teams_list[i], 75)}</span>
      </span>
      </div>
    </span>
  );
}

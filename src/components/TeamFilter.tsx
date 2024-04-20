import { GetLogo } from "../data";
import { ToggleButton } from "@mui/material";

export default function TeamFilter ({filters_list, checkAgainst, handleChange, teamStyle, grid, size}) {
  if (filters_list === null || filters_list === undefined) {
    return;
  }

  return (
    <div className={`filter_row ` + grid}>
        { filters_list.map((a) => 
          <ToggleButton 
            key={"filters_" + a} 
            className={`filter team-box logo team-button` + teamStyle} 
            value={a}
            id={a}
            onChange={(e) => {
              handleChange(e, a)
            }}
            selected={checkAgainst[a]}>
            {GetLogo(a, size)}
          </ToggleButton>
        )}
    </div>
  );
}
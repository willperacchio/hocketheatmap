import { ToggleButton } from "@mui/material";

export default function Filter ({filters_list, filters_readable, checkAgainst, handleChange, grid}) {
  if (filters_list === null || filters_list === undefined) {
    return;
  }

  return (
    <div className={`filter_row ` + grid}>
      { filters_list.map((a) => 
        <ToggleButton 
          key={"filters_" + a} 
          className={`filter`} 
          value={a}
          id={a}
          onChange={(e) => {
            handleChange(e, a)
          }}
          selected={checkAgainst[a]}>
          {filters_readable[a]}
        </ToggleButton>
      )}
    </div>
  )
}
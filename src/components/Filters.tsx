import Filter from "./Filter";
import TeamFilter from "./TeamFilter";
import { Select, MenuItem } from "@mui/material";


export default function Filters ({width, checks, handleChange, 
  years_list, years_readable, 
  months_list, months_readable, 
  weekdays_list, weekdays_readable,
  types_list, types_readable, 
  countries_list, countries_readable,
  timezones_list, timezones_readable,
  start_times_list, start_times_readable,
  teams_list}) {

  return (
    <span className="filters">
      <div className={`filter_row`}>
        <div className="filter-descriptor">Compare Between:</div>
        <Select
          fullWidth
          className="filter"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
          defaultValue={0}
        >
          <MenuItem value={0}>Home and Away</MenuItem>
          <MenuItem value={1}>Winner and Loser</MenuItem>
        </Select>

        <div className="filter-descriptor">Season:</div>
        <Filter filters_list={years_list} filters_readable={years_readable} checkAgainst={checks["years"]} handleChange={handleChange} grid={"eight_column"} />
            
        <div className="filter-descriptor">Month:</div>
        <Filter filters_list={months_list} filters_readable={months_readable} checkAgainst={checks["months"]} handleChange={handleChange} grid={"six_column"} />
        
        <div className="filter-descriptor">Day of the Week:</div>
        <Filter filters_list={weekdays_list} filters_readable={weekdays_readable} checkAgainst={checks["weekdays"]} handleChange={handleChange} grid={"seven_column"}/>
        
        <div className="filter-descriptor">Type of Contest:</div>
        <Filter filters_list={types_list} filters_readable={types_readable} checkAgainst={checks["types"]} handleChange={handleChange} grid={"two_column"}/>

        <div className="filter-descriptor">Played in:</div>
        <Filter filters_list={countries_list} filters_readable={countries_readable} checkAgainst={checks["countries"]} handleChange={handleChange} grid={"five_column"} />

        <div className="filter-descriptor">Timezone:</div>
        <Filter filters_list={timezones_list} filters_readable={timezones_readable} checkAgainst={checks["timezones"]} handleChange={handleChange} grid={"six_column"} />
        
        <div className="filter-descriptor">Local Start Time:</div>
        <Filter filters_list={start_times_list} filters_readable={start_times_readable} checkAgainst={checks["start_times"]} handleChange={handleChange} grid={"seven_column"} />

        <div className="filter-descriptor">Include Team:</div>
        <TeamFilter size={width * .0625} checkAgainst={checks["teams"]} filters_list={teams_list} teamStyle={"team"} handleChange={handleChange} grid={"eight_column"} />
      </div>
    </span>
  )
};
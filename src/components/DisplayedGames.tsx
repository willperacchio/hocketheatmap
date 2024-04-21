import FeaturedGame from "./FeaturedGame";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getCityForTimeZone, convertTimeZone } from "../data";
import { formatInTimeZone } from "date-fns-tz";

export default function DisplayedGames (displayed_games: Array<Object>) {


  let games_to_display = displayed_games["displayed_games"];
  

  const flatten = (obj, path = '') => {        
    if (!(obj instanceof Object)) return {[path.replace(/\.$/g, '')]:obj};

    return Object.keys(obj).reduce((output, key) => {
        return obj instanceof Array ? 
             {...output, ...flatten(obj[key], path +  '[' + key + '].')}:
             {...output, ...flatten(obj[key], path + key + '.')};
    }, {});
  }

  function getRandomGames (games) {
    if (games.length <= 10) { return games }
    
    let remaining = 10;
    let random_indices = []
    while (remaining > 0) {
      let num = getRandomInt(0, games.length)
      if (random_indices.indexOf(num) === -1) {
        random_indices.push(num)
        remaining -= 1;
      }
    }
    let random_games = []
    for (let i = 0; i < random_indices.length; i++) {
      random_games.push(games[random_indices[i]])
    }
    return random_games;
  }

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  function compareTimes(v1, v2) {
    let n1 = v1.replace(":", " ").split(" ")
    let t1 = Number(n1[0]) * 100 + Number(n1[1])
    if (Number(n1[0]) !== 12 && n1[2] === "PM") {
      t1 += 1200;
    }
    let n2 = v2.replace(":", " ").split(" ")
    let t2 = Number(n2[0]) * 100 + Number(n2[1]);
    if (Number(n2[0]) !== 12 && n2[2] === "PM") {
      t2 += 1200;
    }
    // console.log(t1, t2)
    return t1 > t2 ? -1 : 1;
  }

  const columns: GridColDef[] = [
    { field: 'localDate',  flex: 1, headerName: 'Date', valueGetter: (value, row) => 
        formatInTimeZone(row.scheduled, convertTimeZone(row["venue.time_zone"], row["venue.country"], row["venue.state"]), 'yyyy/MM/dd'), width: 150},
    { field: 'venue.time_zone',  flex: 1, headerName: 'Time Zone', valueGetter: (value, row) => 
        "" + row["venue.time_zone"] + " (" + getCityForTimeZone(row["venue.time_zone"], row["venue.country"], row["venue.state"]) + ")", width: 150 },
    { field: 'localStartTime',  flex: 1, headerName: 'Local Start Time', 
        valueGetter: (value, row) => 
        formatInTimeZone(row.scheduled, convertTimeZone(row["venue.time_zone"], row["venue.country"], row["venue.state"]), 'h:mm a'), 
        sortComparator: (v1, v2, r1, r2) => compareTimes(v1, v2),
        width: 150},
    { field: 'venue.name', flex: 1, headerName: 'Venue Name', width: 200 },
    { field: 'venue.city',  flex: 1, headerName: 'Venue City', width: 150 },
    { field: 'venue.country',  flex: 1, headerName: 'Venue Country', width: 100 },
    { field: 'away.name',  flex: 1, headerName: 'Away Team', width: 150 },
    { field: 'away_points', flex: 1,  headerName: 'Away Score', width: 100, type: "number" },
    { field: 'home.name', flex: 1,  headerName: 'Home Team', width: 150 },
    { field: 'home_points', flex: 1,  headerName: 'Home Score', width: 100, type: "number" },
    { field: 'scheduled', flex: 1,  headerName: 'Scheduled Time' },
  ];

  return (
      <div className="all-displayed-games">
        <div className="bottom-titles">
          Random Games Matching Criteria:
        </div>
        <div className="featured_games two_column">
          { getRandomGames(games_to_display).map((game, key) => FeaturedGame(game, key)) }
        </div>
        <div className="bottom-titles">
          All Games Matching Criteria:
        </div>
        <DataGrid sx={{ color: "black", minHeight: "100px", backgroundColor: "rgb(8, 76, 142)", fontWeight: "400"}}
          density="compact" 
          initialState={{
            pagination: {paginationModel: { pageSize: 25 }}
          }}
          autosizeOptions={{
            includeOutliers: true,
            includeHeaders: false
          }}
          rows={games_to_display.map((game, key) => flatten(game))} 
          columns={columns} 
          columnVisibilityModel={{scheduled: false}}
          pageSizeOptions={[25, 50, 100]}
          getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'}
      />
      </div>
    )
}
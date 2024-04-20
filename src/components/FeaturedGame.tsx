import { GetLogo, convertTimeZone } from "../data";
import { formatInTimeZone } from "date-fns-tz";


export default function FeaturedGame (game, key) {
    if (game) {
        let tz = formatInTimeZone(game.scheduled, convertTimeZone(game.venue.time_zone, game.venue.country, game.venue.state), 'MMMM d, yyyy, h:mm a z')
        return (
            <div key={"game_" + key} className="featured_game">
                <span className="featured_game_logo_left">
                    <span>{GetLogo(game.away.alias, 50)}</span>
                    <span className="featured_game_points_left">{game.away_points}</span>
                </span>
                <span className="featured_game_details">
                        <div>
                            <span className="featured_game_away_team">{game.away.name}</span>
                            <span className="featured_game_at_sign">@</span>
                            <span className="featured_game_home_team">{game.home.name}</span>
                        </div>
                        <div>
                            <span>{game.venue.name} - {game.venue.city}, {game.venue.country}</span>
                        </div>
                        <div>
                            <span className="featured_game_time">{tz}</span>
                        </div>
                </span>
                <span className="featured_game_logo_right">
                    <span className="featured_game_points_right">{game.home_points}</span>
                    <span>{GetLogo(game.home.alias, 50)}</span>
                </span>
            </div>
        )
    }
}
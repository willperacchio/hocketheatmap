import * as NHLLogos from "./Logos.tsx";
import { GetLogo } from "../data.tsx";
import moment from 'moment-timezone';

export default function FeaturedGame (game, key) {
    return (
        <div key={"game_" + key} className="featured_game">
            <span className="featured_game_logo_left">
                <span>{GetLogo(game.away.alias, 50)}</span>
                <span className="featured_game_points_left">{game.away_points}</span>
            </span>
            <span className="featured_game_details">
                    <div className="featured_game_line_2">
                        <span className="featured_game_away_team">{game.away.name}</span>
                        <span className="featured_game_at_sign">@</span>
                        <span className="featured_game_home_team">{game.home.name}</span>
                    </div>
                    <div className="featured_game_line_3">
                        <span>{game.venue.name} - {game.venue.city}, {game.venue.country}</span>
                    </div>
                    <div className="featured_game_line_1">
                        <span className="featured_game_time">{moment.tz(game.scheduled, game.venue.time_zone).format('MMMM Do YYYY, h:mm A z')}</span>
                    </div>
            </span>
            <span className="featured_game_logo_right">
                <span className="featured_game_points_right">{game.home_points}</span>
                <span className="">{GetLogo(game.home.alias, 50)}</span>
            </span>
        </div>
    )
}
import FeaturedGame from "./FeaturedGame.tsx";

export default function DisplayedGames (displayed_games: Array<Object>) {
  let games_to_display = displayed_games["displayed_games"]
  return (
      <div className="all_displayed_games">Games:
        <div className="featured_games">
          {
            games_to_display.map((game, key) =>  FeaturedGame(game, key))
          }
        </div>
      </div>
    )
}
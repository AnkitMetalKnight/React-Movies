import "../css/MovieCard.css"
import { useSeriesContext } from "../contexts/SeriesContext"

function SeriesCard({series}) {
    const {
      isFavorite, addToFavorites, removeFavorites, addToWatchLater, removeWatchLater, isWatchLater} = useSeriesContext();
    const favorite = isFavorite(series.id)
    const watchLater = isWatchLater(series.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFavorites(series.id)
        else addToFavorites(series)
    }
    function onWatchLaterClick(e) {
      e.preventDefault();
      if (watchLater) removeWatchLater(series.id);
      else addToWatchLater(series);
    }

    return (
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.title}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ♥
            </button>
            <button
              className={`watchLater-btn ${watchLater ? "active" : ""}`}
              onClick={onWatchLaterClick}
            >
              ✪
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{series.title}</h3>
          <p>{series.release_date?.split("-")[0]}</p>
        </div>
      </div>
    );
}

export default SeriesCard
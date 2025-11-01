import "../css/WatchLater.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function WatchLater() {
  const { watchLater } = useMovieContext();

  if (watchLater) {
    return (
      <div className="watchLater">
        <h2>Watch Later List</h2>
        <div className="movies-grid">
          {watchLater.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="watchLater-empty">
      <h2>No Movies Added Yet</h2>
      <p>Start adding movies to watch later and they will appear here!!</p>
    </div>
  );
}

export default WatchLater;

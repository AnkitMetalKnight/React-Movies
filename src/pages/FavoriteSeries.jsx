import "../css/Favorites.css";
import { useSeriesContext } from "../contexts/SeriesContext";
import SeriesCard from "../components/SeriesCard";

function Favorites() {
  const { favorites } = useSeriesContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((series) => (
            <SeriesCard series={series} key={series.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Yet</h2>
      <p>Start adding to favorite and they will appear here!!</p>
    </div>
  );
}

export default Favorites;

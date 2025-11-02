import "../css/WatchLater.css";
import { useSeriesContext } from "../contexts/SeriesContext";
import SeriesCard from "../components/SeriesCard";

function WatchLater() {
  const { watchLater } = useSeriesContext();

  if (watchLater) {
    return (
      <div className="watchLater">
        <h2>Watch Later List</h2>
        <div className="movies-grid">
          {watchLater.map((series) => (
            <SeriesCard series={series} key={series.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="watchLater-empty">
      <h2>No Series Added Yet</h2>
      <p>Start adding series to watch later and they will appear here!!</p>
    </div>
  );
}

export default WatchLater;

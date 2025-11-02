import SeriesCard from "../components/SeriesCard";
import { useState, useEffect } from "react";
import "../css/Movies.css";
import { searchSeries, getPopularSeries } from "../services/seriesApi";

function Series() {
  const [searchQuery, setSearchQuery] = useState("");
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularSeries = async () => {
      try {
        const popularSeries = await getPopularSeries();
        setSeries(popularSeries);
      } catch (err) {
        console.log(err);
        setError("Failed to load series....");
      } finally {
        setLoading(false);
      }
    };

    loadPopularSeries();
  }, []);

  // const series = [
  //   { id: 1, title: "From", release_date: "2020" },
  //   { id: 2, title: "Lost", release_date: "2019" },
  //   { id: 3, title: "AOT", release_date: "2014" },
  //   { id: 4, title: "MHA", release_date: "2016" },
  // ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchSeries(searchQuery);
      setSeries(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search series...");
    } finally {
      setLoading(false);
    }

    // setSearchQuery("");
  };

  return (
    <div className="movies">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for series..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {series
            //   .filter((movie) =>
            //     movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            //   )
            .map((series) => (
              <SeriesCard series={series} key={series.id} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Series;

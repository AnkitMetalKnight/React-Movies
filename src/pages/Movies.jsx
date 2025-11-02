import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Movies.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Movies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies....");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // const movies = [
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
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
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
          placeholder="Search for movies..."
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
          {movies
            //   .filter((movie) =>
            //     movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            //   )
            .map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Movies;

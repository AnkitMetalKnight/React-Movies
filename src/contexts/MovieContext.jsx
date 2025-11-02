import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  // ✅ Load from localStorage
  useEffect(() => {
    const storedFavs = localStorage.getItem("movieFavorites");
    const storedLater = localStorage.getItem("movieWatchLater");

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    if (storedLater) setWatchLater(JSON.parse(storedLater));
  }, []);

  // ✅ Sync favorites
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Sync watch later
  useEffect(() => {
    localStorage.setItem("movieWatchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  const addToFavorites = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => Number(m.id) === Number(movie.id))
        ? prev
        : [...prev, movie]
    );
  };

  const addToWatchLater = (movie) => {
    setWatchLater((prev) =>
      prev.some((m) => Number(m.id) === Number(movie.id))
        ? prev
        : [...prev, movie]
    );
  };

  const removeFavorites = (movieId) => {
    setFavorites((prev) =>
      prev.filter((m) => Number(m.id) !== Number(movieId))
    );
  };

  const removeWatchLater = (movieId) => {
    setWatchLater((prev) =>
      prev.filter((m) => Number(m.id) !== Number(movieId))
    );
  };

  const isFavorite = (movieId) => {
    return favorites.some((m) => Number(m.id) === Number(movieId));
  };

  const isWatchLater = (movieId) => {
    return watchLater.some((m) => Number(m.id) === Number(movieId));
  };

  const value = {
    favorites,
    addToFavorites,
    removeFavorites,
    isFavorite,
    watchLater,
    addToWatchLater,
    removeWatchLater,
    isWatchLater,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

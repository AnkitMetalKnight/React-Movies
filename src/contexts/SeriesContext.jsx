import { createContext, useContext, useState, useEffect } from "react";

const SeriesContext = createContext();

export const useSeriesContext = () => useContext(SeriesContext);

export const SeriesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  // ✅ Load from localStorage
  useEffect(() => {
    const storedFavs = localStorage.getItem("seriesFavorites");
    const storedLater = localStorage.getItem("seriesWatchLater");

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    if (storedLater) setWatchLater(JSON.parse(storedLater));
  }, []);

  // ✅ Sync favorites
  useEffect(() => {
    localStorage.setItem("seriesFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Sync watch later
  useEffect(() => {
    localStorage.setItem("seriesWatchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  const addToFavorites = (series) => {
    setFavorites((prev) =>
      prev.some((m) => Number(m.id) === Number(series.id))
        ? prev
        : [...prev, series]
    );
  };

  const addToWatchLater = (series) => {
    setWatchLater((prev) =>
      prev.some((m) => Number(m.id) === Number(series.id))
        ? prev
        : [...prev, series]
    );
  };

  const removeFavorites = (seriesId) => {
    setFavorites((prev) =>
      prev.filter((m) => Number(m.id) !== Number(seriesId))
    );
  };

  const removeWatchLater = (seriesId) => {
    setWatchLater((prev) =>
      prev.filter((m) => Number(m.id) !== Number(seriesId))
    );
  };

  const isFavorite = (seriesId) => {
    return favorites.some((m) => Number(m.id) === Number(seriesId));
  };

  const isWatchLater = (seriesId) => {
    return watchLater.some((m) => Number(m.id) === Number(seriesId));
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
    <SeriesContext.Provider value={value}>{children}</SeriesContext.Provider>
  );
};

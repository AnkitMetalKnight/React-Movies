import "./css/App.css";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import FavoriteSeries from "./pages/FavoriteSeries"
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import { SeriesProvider } from "./contexts/SeriesContext";
import WatchLater from "./pages/WatchLater";
import WatchLaterSeries from "./pages/WatchLaterSeries";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/favoriteSeries" element={<FavoriteSeries />} />
          <Route path="/watchLater" element={<WatchLater />} />
          <Route path="/watchLaterSeries" element={<WatchLaterSeries />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;

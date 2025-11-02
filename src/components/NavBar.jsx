import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Movies
        </Link>
        <Link to="/series" className="nav-link">
          Series
        </Link>
        <div className="dropdown">
          <button className="dropbtn">Favorites ▾</button>
          <div className="dropdown-content">
            <Link to="/favorites">🎬 Movies</Link>
            <Link to="/favoriteSeries">📺 Series</Link>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Watch Later ▾</button>
          <div className="dropdown-content">
            <Link to="/watchLater">🎬 Movies</Link>
            <Link to="/watchLaterSeries">📺 Series</Link>
          </div>
        </div>

        {/* <Link to="/watchLater" className="nav-link">
          Watch Later
        </Link>
        <Link to="/watchLaterSeries" className="nav-link">
          Watch Later
        </Link> */}
      </div>
    </nav>
  );
}

export default NavBar;

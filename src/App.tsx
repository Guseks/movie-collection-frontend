import { Routes, Route, NavLink } from "react-router-dom";
import { Home } from "./components/Home";

const App = () => {
  return (
    <div className="pt-5 relative bg-gradient-to-br from-stone-800 to-gray-950">
      <nav>
        <ul className="flex gap-8 justify-center relative items-center">
          <li className="font-bold text-3xl">
            <NavLink
              style={({ isActive }) => {
                return isActive ? { textDecoration: "underline" } : {};
              }}
              className="nav-link underline-offset-8"
              to="/"
            >
              Home
            </NavLink>
          </li>

          <li className="font-bold text-3xl">
            <NavLink
              style={({ isActive }) => {
                return isActive ? { textDecoration: "underline" } : {};
              }}
              className="nav-link underline-offset-8"
              to="/genres"
            >
              Genres
            </NavLink>
          </li>
          <li className="font-bold text-3xl underline-offset-8">
            <NavLink
              style={({ isActive }) => {
                return isActive ? { textDecoration: "underline" } : {};
              }}
              className="nav-link"
              to="/discover"
            >
              Discover
            </NavLink>
          </li>
          <li className="font-bold text-3xl">
            <NavLink
              style={({ isActive }) => {
                return isActive ? { textDecoration: "underline" } : {};
              }}
              className="nav-link underline-offset-8"
              to="/myMovies"
            >
              My movies
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

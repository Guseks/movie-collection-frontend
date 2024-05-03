import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-8 justify-center items-center">
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
  );
};

export default Navbar;

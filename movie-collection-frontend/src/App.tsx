import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar";
import Discover from "./pages/Discover";
import { MoviesProvider } from "./contexts/MoviesContext";

/*
TODO: Create pages for discovering new movies. Where user can select search Options and press search. 
Filter on things like genre, rating, release date, etc.

TODO: Find out if pagination is possible. Can you find more than 20 movies?

TODO: page for displaying my list of favorite movies in a grid view
*/

const App = () => {
  return (
    <div className="bg-gradient-to-br from-stone-900 to-gray-950 flex flex-col items-center gap-8 py-5">
      <Navbar />
      <MoviesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
      </MoviesProvider>
    </div>
  );
};

export default App;

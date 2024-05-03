import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="pt-5 bg-gradient-to-br from-stone-900 to-gray-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

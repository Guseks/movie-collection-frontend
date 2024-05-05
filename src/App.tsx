import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-stone-900 to-gray-950 flex flex-col items-center">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

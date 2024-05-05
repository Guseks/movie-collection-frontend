const API_KEY = import.meta.env.VITE_API_KEY;
import { useEffect, useState } from "react";
import axios from "axios";

const useGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function getGenres() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      setGenres(response.data.genres);
    }
    getGenres();
  }, []);

  return { genres, setGenres };
};

export default useGenres;

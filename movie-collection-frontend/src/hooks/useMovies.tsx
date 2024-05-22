import { useState, useEffect } from "react";
import axios from "axios";

interface searchOptions {
  genreID: string[];
  language: string;
  releaseDate: string;
  voteAverage: string;
  originalLanguage: string;
  includeAdult: string;
  page: string;
}

interface useMoviesProps {
  searchOptions: searchOptions;
  apiRoute: string;
}

const useMovies = ({ searchOptions, apiRoute }: useMoviesProps) => {
  const [movieList, setMovieList] = useState([]);

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const queryParams = {
    with_genres: searchOptions.genreID.join(" | "),
    language: searchOptions.language,
    "primary_release_date.gte": searchOptions.releaseDate,
    "vote_average.gte": searchOptions.voteAverage,
    with_original_language: searchOptions.originalLanguage,
    include_adult: searchOptions.includeAdult,
  };

  const formattedParams = new URLSearchParams(queryParams).toString();
  useEffect(() => {
    //const API_URL = `${BASE_API_URL}${apiRoute}?api_key=${API_KEY}`;
    // with_genres=${genreID}&language=en-US&primary_release_date.gte=2011-01-01
    // Genres: Romance = 10749

    //console.log(API_URL);
    async function getMovies() {
      /*
      console.log(
        `${BASE_API_URL}${apiRoute}?api_key=${API_KEY}&${formattedParams}&page=${parseInt(
          searchOptions.page
        )}`
      );
      */
      const response = await axios.get(
        `${BASE_API_URL}${apiRoute}?api_key=${API_KEY}&${formattedParams}&page=${parseInt(
          searchOptions.page
        )}`
      );
      setMovieList(response.data.results);
    }
    getMovies();
  }, [
    searchOptions.genreID,
    searchOptions.releaseDate,
    searchOptions.voteAverage,
  ]);

  return { movieList, setMovieList };
};

export default useMovies;

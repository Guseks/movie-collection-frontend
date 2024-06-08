import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

interface MovieContextProps {
  children: React.ReactNode;
}

interface MovieContextValue {
  myMovies: Movie[];
  setMyMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MoviesContext = createContext<MovieContextValue | undefined>(undefined);

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMoviesContext must be used within MoviesProvider");
  }
  return context;
};

export const MoviesProvider = ({ children }: MovieContextProps) => {
  const [myMovies, setMyMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<Movie[]>(
          "http://localhost:3001/movies"
        );
        console.log("Fetched Movies: ", response.data);
        setMyMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };
    fetchMovies();
  }, []);

  /*
  useEffect(() => {
    console.log("myMovies state updated:", myMovies);
  }, [myMovies]);

  */

  return (
    <MoviesContext.Provider value={{ myMovies, setMyMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};

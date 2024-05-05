import starWarsImageHoth from "../assets/starWarsHoth.jpg";
import starWarsImageRogue from "../assets/starWarsRogue.jpg";
import avatarImage from "../assets/avatarForest.jpg";
import MovieCarousel from "./MovieCarousel";
import { MovieImageContainer, ImageMovie } from "./ui/home";
import { useEffect, useState } from "react";
import useMovies from "../hooks/useMovies";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: string[];
}

export const Home = () => {
  // TODO: Make MovieCarousel a general carousel component. Move logic for what movies each carousel should display to this component.

  //TODO: Add another movieCarousel component for displaying my list of favorite movies.

  const [myMovies, setMyMovies] = useState<Movie[]>([]);

  const searchOptions = {
    genreID: ["10749", "18"], //35 10751 28 "10749", "18"
    language: "en-US",
    releaseDate: "2020-01-01",
    voteAverage: "7.5",
    originalLanguage: "en",
    includeAdult: "false",
    page: 1,
  };
  const API_ROUTE = "/discover/movie";
  const { movieList }: { movieList: Movie[] } = useMovies({
    searchOptions: searchOptions,
    apiRoute: API_ROUTE,
  });

  const movieSuggestions = movieList;

  //TODO: Make this useEffect into a custom hook for reusability
  useEffect(() => {
    //TODO: Code for getting list of favorite movies from my backend
    function getMyMovies() {
      setMyMovies([]);
    }
    getMyMovies();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 mt-8 pb-20">
      <MovieImageContainer className="border-4 rounded-md">
        <ImageMovie src={starWarsImageHoth} className="border-r-4" />
        <ImageMovie src={starWarsImageRogue} className="border-r-4" />
        <ImageMovie src={avatarImage} className="" />
      </MovieImageContainer>
      <MovieCarousel
        title="Suggestions from Romance and Drama"
        movieList={movieSuggestions}
      />
      {myMovies.length !== 0 && (
        <MovieCarousel title="My list of movies" movieList={myMovies} />
      )}
    </div>
  );
};

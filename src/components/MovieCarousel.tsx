import { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import NavButtons from "./NavButtons";
import useMovies from "../hooks/useMovies";
import { Carousell, NewMoviesDisplay } from "./ui/movieCarousel";

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

const MovieCarousel = () => {
  const API_ROUTE = "/discover/movie";

  const searchOptions = {
    genreID: ["10749", "18"], //35 10751 28 "10749", "18"
    language: "en-US",
    releaseDate: "2020-01-01",
    voteAverage: "7.5",
    originalLanguage: "en",
    includeAdult: "false",
    page: 1,
  };

  // Getting new movies
  const { movieList } = useMovies({
    searchOptions: searchOptions,
    apiRoute: API_ROUTE,
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const moviesDisplayRef = useRef<HTMLDivElement>(null);
  const scrolldistance = 248;

  const handleScroll = (direction: "left" | "right") => {
    const container = moviesDisplayRef.current;

    if (!container) return;
    const containerWidth = container.scrollWidth;

    let increment: number = 0;
    if (direction === "left" && scrollPosition >= scrolldistance) {
      increment = -scrolldistance;
    } else if (
      direction === "right" &&
      scrollPosition < containerWidth - container.clientWidth
    ) {
      increment = scrolldistance;
    }

    container.scrollTo({
      left: scrollPosition + increment,
      behavior: "smooth",
    });
    setScrollPosition((prev: number) => prev + increment);
  };

  return (
    <Carousell className="grid grid-flow-row overflow-hidden relative gap-3 bg-black p-5">
      <h4 className="font-bold m-0 text-2xl">
        Recommended for you in Romance and Drama
      </h4>
      <NewMoviesDisplay
        className="h-96 grid grid-flow-col gap-2"
        ref={moviesDisplayRef}
      >
        {movieList.map((movie: Movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </NewMoviesDisplay>
      <NavButtons handleScroll={handleScroll} />
    </Carousell>
  );
};

export default MovieCarousel;

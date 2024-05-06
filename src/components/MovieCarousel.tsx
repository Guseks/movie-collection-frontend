import { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import NavButtons from "./NavButtons";
import { Carousel, NewMoviesDisplay } from "./ui/movieCarousel";
import useGenres from "../hooks/useGenres";

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

interface Genre {
  id: number;
  name: string;
}

interface movieCarouselProps {
  title: string;
  movieList: Movie[];
}

/* 
TODO: Make MovieCarousel a general carousel component. Move code for selecting movies out of this component and into parent component.

//TODO: Make component take props for title
Keep code for scrolling in this component. Move SearchOptions and fetching of movieList into parent Component (Home)
This would enable carousel component to be reusable for displaying things like my list of favorite movies (Hopefully).
On Home page that is. 
*/

const MovieCarousel = ({ title, movieList }: movieCarouselProps) => {
  // Getting new movies

  const { genres }: { genres: Genre[] } = useGenres();

  const [scrollPosition, setScrollPosition] = useState(0);
  const moviesDisplayRef = useRef<HTMLDivElement>(null);
  const scrolldistance = 264;

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
    <Carousel className="grid grid-flow-row overflow-hidden relative p-5 bg-black justify-center items-center rounded-md">
      <h4 className="font-bold m-0 text-2xl">{title}</h4>
      <NewMoviesDisplay
        className="h-96 grid grid-flow-col gap-2"
        ref={moviesDisplayRef}
      >
        {movieList.map((movie: Movie) => (
          <MovieCard key={movie.title} movie={movie} genres={genres} />
        ))}
      </NewMoviesDisplay>
      <NavButtons handleScroll={handleScroll} />
    </Carousel>
  );
};

export default MovieCarousel;

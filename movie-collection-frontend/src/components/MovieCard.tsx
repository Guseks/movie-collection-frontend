import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMoviesContext } from "../contexts/MoviesContext";
import {
  addMovieToList,
  getMovies,
  removeMovieFromList,
} from "../services/movieServices";

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

interface movieCardProps {
  movie: Movie;
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

interface MovieContextValue {
  myMovies: Movie[];
  setMyMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const Card = styled.div``;

const AddButton = styled.button<{ selected: boolean }>`
  ${({ selected }) =>
    selected
      ? `
    background-color: #e2e8f0; // Tailwind CSS class bg-stone-200 equivalent
    border-color: #e2e8f0;
    color: black;
    &:hover {
      background-color: #CBD5E0;
    }
  `
      : `
    &:hover {
      border-color: #e2e8f0;
    }
  `}
`;

const MovieCard = ({ movie, genres }: movieCardProps) => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  const { myMovies, setMyMovies }: MovieContextValue = useMoviesContext();
  const [isMovieInList, setIsMovieInList] = useState(false);
  const [movieGenres, setMovieGenres] = useState<string[]>([]);

  const infoRef = useRef<HTMLDivElement>(null);

  async function checkForMovie() {
    const foundMovie = myMovies.some((m: Movie) => m.id === movie.id);
    if (foundMovie) {
      //console.log(`Movie  ${movie.title} is in list`);
      setIsMovieInList(true);
    } else {
      setIsMovieInList(false);
    }
  }

  useEffect(() => {
    checkForMovie();
  }, []);

  useEffect(() => {
    function getMovieGenres() {
      const foundGenres = genres.filter((genre: Genre) =>
        movie.genre_ids.includes(genre.id)
      );
      return foundGenres.map((genre: Genre) => genre.name);
    }

    setMovieGenres(getMovieGenres());
  }, [genres, movie.genre_ids]);

  function showInfo() {
    if (infoRef.current) {
      infoRef.current.style.display = "flex";
    }
  }

  function hideInfo() {
    if (infoRef.current) {
      infoRef.current.style.display = "none";
    }
  }

  async function handleMovieList(movie: Movie) {
    if (isMovieInList) {
      try {
        await removeMovieFromList(movie);
        const currentMovies = await getMovies();
        console.log(currentMovies);
        setMyMovies(currentMovies);

        setIsMovieInList(false);
      } catch (error) {
        console.error("Error removing movie from list: ", error);
      }
    } else {
      try {
        console.log("Adding movie to list: ", movie);
        await addMovieToList(movie);
        const currentMovies = await getMovies();
        console.log(currentMovies);
        setMyMovies(currentMovies);
        setIsMovieInList(true);
      } catch (error) {
        console.error("Error adding movie to list: ", error);
      }
    }
  }

  return (
    <Card className="h-sm lg:h-lg w-96 lg:w-64 border-2 border-stone-950 shadow-md shadow-black relative rounded-sm pb-3 hover:shadow-sm hover:shadow-white hover:cursor-pointer">
      <img
        className=""
        key={movie.id}
        src={`${IMAGE_URL}${movie.poster_path}`}
      />
      <div
        className="hidden group-hover:block p-3 absolute top-0 w-68 border-2 bg-black z-10  text-sm  font-semibold flex-col gap-4"
        ref={infoRef}
      >
        <p className="border-b-2 text-2xl lg:text-lg">Description</p>
        <p className=" text-lg lg:text-xs">{movie.overview}</p>
        <div className="flex gap-2 items-center">
          <p className=" text-base lg:text-xs font-bold">Genres: </p>
          <div className="flex flex-row gap-1 flex-wrap">
            {movieGenres.map((genre: string) => (
              <p key={genre} className="text-base lg:text-xs">
                {genre},
              </p>
            ))}
          </div>
        </div>
      </div>
      <h4 className="font-bold text-2xl lg:text-base px-3 py-2">
        {movie.title}
      </h4>

      <div className="absolute flex gap-6 lg:gap-1 bottom-2 lg:right-2 right-5 ">
        <button
          onMouseEnter={() => showInfo()}
          onMouseLeave={() => hideInfo()}
          className="lg:text-xs font-semibold left-2 bottom-2 py-2 px-4  lg:px-2 rounded-md hover:bg-stone-900 group text-xl"
        >
          More info
        </button>
        <AddButton
          className="w-28 lg:w-16  lg:text-xs font-semibold right-2 py-2 lg:px-2 bottom-2 rounded-md hover:bg-stone-900 text-xl"
          onClick={() => handleMovieList(movie)}
          selected={isMovieInList}
        >
          {isMovieInList ? "Remove" : "Add"}
        </AddButton>
      </div>
    </Card>
  );
};

export default MovieCard;

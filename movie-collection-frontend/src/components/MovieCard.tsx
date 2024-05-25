import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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

interface movieCardProps {
  movie: Movie;
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

const Card = styled.div``;

const MovieCard = ({ movie, genres }: movieCardProps) => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  const [movieGenres, setMovieGenres] = useState<string[]>([]);

  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function getMovieGenres() {
      const foundGenres = genres.filter((genre: Genre) =>
        movie.genre_ids.includes(genre.id)
      );
      return foundGenres.map((genre: Genre) => genre.name);
    }

    setMovieGenres(getMovieGenres());

    return;
  }, []);

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

  /*


*/

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

      <div className="absolute flex gap-6 lg:gap-1 bottom-2 right-2 ">
        <button
          onMouseEnter={() => showInfo()}
          onMouseLeave={() => hideInfo()}
          className="p-1 lg:text-xs font-semibold left-2 bottom-2 px-2 rounded-md hover:bg-stone-900 group text-xl"
        >
          More info
        </button>
        <button className="py-1 lg:text-xs font-semibold right-2  px-2 bottom-2 rounded-md hover:bg-stone-900 text-xl">
          Add to list
        </button>
      </div>
    </Card>
  );
};

export default MovieCard;

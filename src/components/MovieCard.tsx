import { useEffect, useRef, useState } from "react";

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

  return (
    <div className="w-64 border-2 shadow-md shadow-black relative rounded-sm">
      <img
        className="border-b-2"
        key={movie.id}
        src={`${IMAGE_URL}${movie.poster_path}`}
      />
      <div
        className="hidden group-hover:block p-8 absolute top-3 left-3 w-56 border-2 bg-black z-10 text-sm rounded-md font-semibold flex-col gap-2"
        ref={infoRef}
      >
        <p className="border-b-2 text-lg">Description</p>
        <p className="text-sm">{movie.overview}</p>
      </div>
      <h4 className="font-bold text-lg px-2 py-1">{movie.title}</h4>
      <p className="text-xs px-2">{movieGenres.join(", ")}</p>
      <div className="absolute right-2 flex gap-1 bottom-2">
        <button
          onMouseEnter={() => showInfo()}
          onMouseLeave={() => hideInfo()}
          className="p-1 text-xs font-semibold left-2 bottom-2 px-2 rounded-md hover:bg-stone-900 group "
        >
          More info
        </button>
        <button className="py-1 text-xs font-semibold right-2  px-2 bottom-2 rounded-md hover:bg-stone-900">
          Add to list
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

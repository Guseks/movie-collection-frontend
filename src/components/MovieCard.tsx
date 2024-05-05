import { useEffect, useState } from "react";

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

  return (
    <div className="w-64 border-2 shadow-md shadow-black relative">
      <img
        className="border-b-2"
        key={movie.id}
        src={`${IMAGE_URL}${movie.poster_path}`}
      />
      <h4 className="font-bold text-lg px-2 py-1">{movie.title}</h4>
      <p className="text-xs px-2">{movieGenres.join(", ")}</p>
      <button className="absolute border-2 p-1 text-xs font-semibold right-2 bottom-2 hover:bg-stone-900">
        Add to list
      </button>
    </div>
  );
};

export default MovieCard;

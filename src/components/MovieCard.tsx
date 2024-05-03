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
}

const MovieCard = ({ movie }: movieCardProps) => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  return (
    <div className="w-60 border-2 shadow-md shadow-black relative">
      <img
        className="border-b-2"
        key={movie.id}
        src={`${IMAGE_URL}${movie.poster_path}`}
      />
      <h4 className="font-bold text-xl p-2">{movie.title}</h4>
      <button className="absolute border-2 p-1 text-sm font-semibold right-2 bottom-2 hover:bg-stone-900">
        Add to list
      </button>
    </div>
  );
};

export default MovieCard;

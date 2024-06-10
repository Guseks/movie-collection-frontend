import { useMoviesContext } from "../contexts/MoviesContext";
import MovieCard from "../components/MovieCard";
import useGenres from "../hooks/useGenres";

const MyMovies = () => {
  const { myMovies } = useMoviesContext();
  const { genres } = useGenres();

  return (
    <div className="flex flex-wrap p-7 gap-y-8 gap-3 bg-black ml-16 mr-16 lg:ml-32 lg:mr-32 rounded-md max-[1000px]:justify-center">
      {myMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  );
};

export default MyMovies;

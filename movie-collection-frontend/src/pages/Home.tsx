import starWarsImageHoth from "../assets/starWarsHoth.jpg";
import starWarsImageRogue from "../assets/starWarsRogue.jpg";
import avatarImage from "../assets/avatarForest.jpg";
import MovieCarousel from "../components/MovieCarousel";
import { MovieImageContainer, ImageMovie } from "../components/ui/home";
import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
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

export const Home = () => {
  // TODO: Make MovieCarousel a general carousel component. Move logic for what movies each carousel should display to this component.

  //TODO: Add another movieCarousel component for displaying my list of favorite movies.

  const { genres } = useGenres();

  const searchOptions = {
    genreID: ["10749", "18"], //35 10751 28 "10749", "18"
    language: "en-US",
    releaseDate: "2020-01-01",
    voteAverage: "7.5",
    originalLanguage: "en",
    includeAdult: "false",
    page: "1",
  };
  const API_ROUTE = "/discover/movie";
  const { movieList }: { movieList: Movie[] } = useMovies({
    searchOptions: searchOptions,
    apiRoute: API_ROUTE,
  });

  return (
    <div className="flex flex-col items-center gap-8 pb-20 -mt-10 lg:mt-0">
      <MovieImageContainer className="border-4 rounded-md hidden lg:flex">
        <ImageMovie src={starWarsImageHoth} className="border-r-4" />
        <ImageMovie src={starWarsImageRogue} className="border-r-4" />
        <ImageMovie src={avatarImage} className="" />
      </MovieImageContainer>
      <div className="hidden lg:block">
        <MovieCarousel
          title="Popular in Romance and Drama"
          movieList={movieList}
        />
      </div>
      <div className="flex flex-col py-10 px-5 gap-7 m-6 mt-10 bg-black rounded-md lg:hidden">
        <h4 className="font-bold text-4xl ml-12 ">
          Popular in Romance and Drama
        </h4>
        <div className="flex flex-wrap justify-center">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      </div>
    </div>
  );
};

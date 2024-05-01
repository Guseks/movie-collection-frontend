import useMovies from "./hooks/useMovies";

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

const App = () => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  const API_ROUTE = "/discover/movie";

  const searchOptions = {
    genreID: "10749",
    language: "en-US",
    releaseDate: "2010-01-01",
    voteAverage: "7.5",
    originalLanguage: "en",
    includeAdult: "false",
  };

  const { movieList } = useMovies({
    searchOptions: searchOptions,
    apiRoute: API_ROUTE,
  });

  // /discover/movie?api_key=4d8c7551af1e9566bef295f83f996520`

  return (
    <div className="flex flex-col px-20 justify-center items-center gap-4 mt-8">
      <h1 className="font-bold text-4xl ">Movie Collection</h1>
      <div className="flex justify-center">
        <ul className=" grid grid-cols-8 gap-x-6 gap-y-10">
          {movieList.map((movie: Movie) => (
            <img key={movie.id} src={`${IMAGE_URL}${movie.poster_path}`} />
          ))}
        </ul>
      </div>
      <button onClick={() => console.log(movieList)}>Test</button>
    </div>
  );
};

export default App;

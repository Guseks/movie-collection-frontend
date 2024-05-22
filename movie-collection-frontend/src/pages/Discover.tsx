import styled from "styled-components";
import useGenres from "../hooks/useGenres";
import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

interface Genre {
  id: number;
  name: string;
}

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

interface SelectedOptions {
  releaseYear: number;
  rating: number;
  genres: number[];
}

const SideMenu = styled.div`
  width: 200px;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 95%;

  margin: 0 auto;
`;

const DisplayArea = styled.div``;

const Discover = () => {
  const { genres } = useGenres();

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    releaseYear: 2010,
    rating: 7,
    genres: [],
  });

  const years = [];
  const currentYear = new Date().getFullYear();
  const EndYear = 1970;

  for (let year = currentYear; year >= EndYear; year--) {
    years.push(year);
  }

  const ratings = [];
  for (let i = 10; i >= 0; i--) {
    ratings.push(i);
  }

  function handleReleaseYearChange(year: number) {
    setSelectedOptions({
      ...selectedOptions,
      releaseYear: year,
    });
  }

  function handleGenresChange(genreId: number) {
    const updatedGenres = selectedOptions.genres.includes(genreId)
      ? selectedOptions.genres.filter((genre: number) => genre !== genreId)
      : [...selectedOptions.genres, genreId];

    setSelectedOptions({
      ...selectedOptions,
      genres: updatedGenres,
    });
  }

  function handleRatingChange(rating: number) {
    setSelectedOptions({
      ...selectedOptions,
      rating: rating,
    });
  }

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
    <Container className="flex bg-black px-5 py-5 rounded-md">
      <SideMenu className="min-[200px]:hidden md:hidden lg:flex min-w-52 border-r-4 px-2 flex-col gap-2">
        <h4 className="font-bold text-2xl">Categories</h4>
        <div className="flex flex-col gap-2">
          {genres.map((genre: Genre) => (
            <div key={genre.id} className="flex gap-4">
              <input
                className="w-6"
                type="checkbox"
                onChange={() => handleGenresChange(genre.id)}
              />
              <p className="font-bold">{genre.name}</p>
            </div>
          ))}
        </div>
      </SideMenu>
      <MainContent>
        <div className="relative h-20 p-2 px-5 flex max-[700px]:gap-4  gap-7 border-b-4 items-center max-[700px]:flex-col max-[700px]:h-36 min-[200px]:items-start">
          <div className="flex gap-3 md:py-3">
            <h4 className="font-bold">Released after: </h4>
            <select
              className="h-7 bg-stone-950 rounded-sm px-2"
              value={selectedOptions.releaseYear}
              onChange={(e) =>
                handleReleaseYearChange(parseInt(e.target.value))
              }
            >
              {years.map((year: number) => (
                <option
                  className="rounded-md bg-stone-950"
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 md:py-3">
            <h4 className="font-bold">Rating above </h4>
            <select
              className="h-7 bg-stone-950 rounded-sm px-2"
              defaultValue={selectedOptions.rating}
              onChange={(e) => handleRatingChange(parseInt(e.target.value))}
            >
              {ratings.map((rating: number) => (
                <option
                  className="rounded-md bg-stone-950"
                  key={rating}
                  value={rating}
                >
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 items-center lg:hidden md:py-3">
            <h4>Genre: </h4>
            <select className="bg-stone-950">
              {genres.map((genre: Genre) => (
                <option className="bg-stone-950" key={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <button className="lg:absolute max-[700px]:absolute max-[700px]:right-16 max-[700px]:top-10 lg:right-10 py-4 px-10 rounded-md font-bold hover:bg-stone-900">
            Search
          </button>
        </div>
        <DisplayArea className=" max-[700px]:flex max-[700px]:justify-center max-[700px]:flex-wrap  lg:grid md:flex md:flex-wrap lg:grid-cols-6 gap-3 py-3 px-2">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </DisplayArea>
      </MainContent>
    </Container>
  );
};

export default Discover;

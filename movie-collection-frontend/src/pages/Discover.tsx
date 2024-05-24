import useGenres from "../hooks/useGenres";
import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

import {
  MainContent,
  Container,
  SideMenu,
  GenreButton,
} from "../components/ui/discover";

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
  genres: string[];
  page: number;
}

const Discover = () => {
  const { genres } = useGenres();

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    releaseYear: 2010,
    rating: 7,
    genres: [],
    page: 1,
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

  function handleGenresChange(newGenre: Genre) {
    let updatedGenres: string[] = [];
    if (selectedOptions.genres.includes(newGenre.id.toString())) {
      updatedGenres = selectedOptions.genres.filter(
        (genre: string) => genre !== newGenre.id.toString()
      );
    } else {
      updatedGenres = [...selectedOptions.genres, newGenre.id.toString()];
    }

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

  function handlePrevPage() {
    if (selectedOptions.page === 1) {
      return;
    } else {
      setSelectedOptions({
        ...selectedOptions,
        page: selectedOptions.page - 1,
      });
    }
  }
  function handleNextPage() {
    if (selectedOptions.page === 20) {
      return;
    } else {
      setSelectedOptions({
        ...selectedOptions,
        page: selectedOptions.page + 1,
      });
    }
  }

  const searchOptions = {
    genreID: selectedOptions.genres, //35 10751 28 "10749", "18"
    language: "en-US",
    releaseDate: `${selectedOptions.releaseYear}-01-01`,
    voteAverage: `${selectedOptions.rating}`,
    originalLanguage: "en",
    includeAdult: "false",
    page: `${selectedOptions.page}`,
  };

  const API_ROUTE = "/discover/movie";
  const { movieList }: { movieList: Movie[] } = useMovies({
    searchOptions: searchOptions,
    apiRoute: API_ROUTE,
  });

  return (
    <Container className="flex bg-black px-5 py-5 rounded-md">
      <SideMenu className="min-[200px]:hidden md:hidden lg:flex min-w-30 border-r-4 px-5 flex-col gap-3">
        <h4 className="font-bold text-2xl">Categories</h4>
        <div className="flex flex-col gap-2">
          {genres.map((genre: Genre) => (
            <GenreButton
              key={genre.id}
              selected={selectedOptions.genres.includes(genre.id.toString())}
              onClick={() => handleGenresChange(genre)}
              className="font-bold py-2 border-2 border-stone-700  rounded-lg"
            >
              {genre.name}
            </GenreButton>
          ))}
        </div>
      </SideMenu>
      <MainContent>
        <div className="relative h-20 p-2 px-5 flex max-[700px]:gap-4  gap-7 border-b-4 items-center max-[700px]:flex-col max-[700px]:h-44 min-[200px]:items-start">
          <div className="flex gap-3 md:py-3 items-center">
            <h4 className="font-bold">Released after: </h4>
            <select
              className=" bg-stone-950 rounded-sm px-2 py-2"
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
          <div className="flex justify-center items-center gap-3 md:mt-3 ">
            <h4 className="font-bold">Rating above: </h4>
            <select
              className="bg-stone-950 rounded-sm px-2 py-2"
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
            <select className="bg-stone-950 p-2">
              {genres.map((genre: Genre) => (
                <option className="bg-stone-950 p-3" key={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:absolute lg:right-10 max-[700px]:absolute max-[700px]:right-16 max-[700px]:top-8 h-12 flex justify-center items-center mt-1">
            <div
              onClick={() => handlePrevPage()}
              className="h-full bg-stone-900 w-10 hover:border-2 cursor-pointer rounded-md  flex items-center justify-center"
            >
              <button className=" h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-white -rotate-90" />
            </div>
            <div className="p-5 font-bold text-lg"> {selectedOptions.page}</div>
            <div
              onClick={() => handleNextPage()}
              className="h-full bg-stone-900 w-10 hover:border-2 cursor-pointer rounded-md  flex items-center justify-center"
            >
              <button className="h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-white rotate-90" />
            </div>
          </div>
        </div>
        <div className=" max-[700px]:flex max-[700px]:justify-center max-[700px]:flex-wrap  lg:grid md:flex md:flex-wrap lg:grid-cols-6 gap-3 py-3 px-2">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      </MainContent>
    </Container>
  );
};

export default Discover;

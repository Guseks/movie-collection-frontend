import styled from "styled-components";
import useGenres from "../hooks/useGenres";
import { useState } from "react";

interface Genre {
  id: number;
  name: string;
}

/*
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
*/

interface SelectedOptions {
  releaseYear: number;
  rating: number;
  genres: number[];
}

const SideMenu = styled.div`
  height: 1000px;
`;

const MainContent = styled.div`
  width: 1300px;
`;

const Container = styled.div`
  height: 100%;
`;

const DisplayArea = styled.div`
  height: 920px;
`;

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

  return (
    <Container className="flex bg-black px-10 py-5">
      <SideMenu className="w-72 border-r-4   flex flex-col gap-2">
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
        <div className="h-20 p-2 px-5 flex gap-7 border-b-4">
          <div className="flex gap-3">
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
          <div className="flex gap-3">
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
        </div>
        <DisplayArea className="bg-red-950">Display Area</DisplayArea>
      </MainContent>
    </Container>
  );
};

export default Discover;

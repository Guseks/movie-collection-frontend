import useMovies from "../hooks/useMovies";
import starWarsImageHoth from "../assets/starWarsHoth.jpg";
import starWarsImageRogue from "../assets/starWarsRogue.jpg";
import avatarImage from "../assets/avatarForest.jpg";
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

export const Home = () => {
  const ImageMovie = styled.img`
    height: 350px;
  `;
  const MovieImageContainer = styled.div`
    width: 1065px;
    display: flex;
  `;

  const NewMoviesDisplay = styled.div`
    height: 470px;
    overflow-x: auto;
    scroll-behavior: smooth;
  `;
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  const API_ROUTE = "/discover/movie";

  const searchOptions = {
    genreID: ["10749", "18"], //35 10751 28 "10749", "18"
    language: "en-US",
    releaseDate: "2020-01-01",
    voteAverage: "7.5",
    originalLanguage: "en",
    includeAdult: "false",
    page: 1,
  };

  // Getting new movies
  const { movieList } = useMovies({
    searchOptions: searchOptions,
    apiRoute: API_ROUTE,
  });

  /*
      <div className="flex justify-center">
        <ul className=" grid grid-cols-8 gap-x-6 gap-y-10">
          {movieList.map((movie: Movie) => (
            <img key={movie.id} src={`${IMAGE_URL}${movie.poster_path}`} />
          ))}
        </ul>
      </div>
      

  */

  return (
    <div className="flex flex-col px-20 justify-center items-center gap-4 mt-8">
      <MovieImageContainer className="border-4 ">
        <ImageMovie src={starWarsImageHoth} className="border-r-4" />
        <ImageMovie src={starWarsImageRogue} className="border-r-4" />
        <ImageMovie src={avatarImage} className="" />
      </MovieImageContainer>

      <NewMoviesDisplay className="border-4 w-full h-96 grid grid-flow-col">
        {movieList.map((movie: Movie) => (
          <div className="w-60 border-r-2">
            <img key={movie.id} src={`${IMAGE_URL}${movie.poster_path}`} />
            <h4 className="font-bold text-xl p-2">{movie.title}</h4>
          </div>
        ))}
      </NewMoviesDisplay>
      <div className="border-4 w-full h-80 font-bold p-5">My list</div>
    </div>
  );
};

// /discover/movie?api_key=4d8c7551af1e9566bef295f83f996520`

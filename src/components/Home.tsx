import starWarsImageHoth from "../assets/starWarsHoth.jpg";
import starWarsImageRogue from "../assets/starWarsRogue.jpg";
import avatarImage from "../assets/avatarForest.jpg";
import MovieCarousel from "./MovieCarousel";
import { Container, MovieImageContainer, ImageMovie } from "./ui/home";

export const Home = () => {
  return (
    <Container className="flex flex-col px-0 mr-20 ml-20 justify-center items-center gap-8 mt-8">
      <MovieImageContainer className="border-4">
        <ImageMovie src={starWarsImageHoth} className="border-r-4" />
        <ImageMovie src={starWarsImageRogue} className="border-r-4" />
        <ImageMovie src={avatarImage} className="" />
      </MovieImageContainer>
      <MovieCarousel />

      <div className="border-2 border-red-950 w-full h-80 font-bold p-5">
        My list (Get from backend)
      </div>
    </Container>
  );
};

// /discover/movie?api_key=4d8c7551af1e9566bef295f83f996520`

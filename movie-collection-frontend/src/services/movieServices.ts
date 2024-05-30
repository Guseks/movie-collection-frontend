import axios from "axios";

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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function addMovieToList(movie: Movie){
  try {
    const response = await axios.put(`${BACKEND_URL}/new`, {movie: movie} )
    console.log(response.data);

  }
  catch (error) {
    console.log(error);
  }
}

export async function getMovies() {
  try {
    const response = await axios.get(`${BACKEND_URL}/movies`);
    console.log(response.data);
    return response.data;

  }
  catch (error) {
    console.log(error);
  }
}


export async function removeMovieFromList(movie: Movie){
  try {
    const response = await axios.delete(`${BACKEND_URL}/deleteMovie/${movie.id}`)
    console.log(response.data);
  }
  catch (error) {
    console.log(error);
  }
  
}
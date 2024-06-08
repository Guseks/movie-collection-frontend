
import { Movie } from "./movieModel.js";

export async function saveMovie(movie){
  console.log(`Logging movie to be saved: `, movie);
  const newMovie = new Movie(movie);
  await newMovie.save();
}

export async function deleteMovie(id){
  console.log(`Deleting movie with id: ${id}`);
  try {
    await Movie.deleteOne({id: id});
  }
  catch(error) {
    console.log(error);
  }
  
}

export async function getMovies(){
  const movies =  await Movie.find();
  console.log(movies);
  return movies;
  
}


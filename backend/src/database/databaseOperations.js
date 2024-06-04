//import mongoose from "mongoose";
import { Movie } from "./movieModel.js";

export async function saveMovie(movie){
  console.log(`Logging movie to be saved: `, movie);
  const newMovie = new Movie({
    movieID: movie.id,
    title: movie.title 
  })
  await newMovie.save();
}

export async function deleteMovie(id){
  console.log(`Deleting movie with id: ${id}`);
  try {
    await Movie.deleteOne({movieID: id});
  }
  catch(error) {
    console.log(error);
  }
  
}

export async function getMovies(){
  const movies =  await Movie.find();

  return movies.map((movie) => {
    return {id: movie.movieID, title: movie.title};
  });
  
}


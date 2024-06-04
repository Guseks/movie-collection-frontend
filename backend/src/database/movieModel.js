import mongoose from "mongoose";


// TODO: Match schema to movie object recieved from TMDB API. 
//To effectively remove the need to fetch the movies again to display the list of our movies.

const movieSchema = new mongoose.Schema({
  movieID: Number,
  title: String
});

export const Movie = mongoose.model("Movie", movieSchema);


import mongoose from "mongoose";


// TODO: Match schema to movie object recieved from TMDB API. 
//To effectively remove the need to fetch the movies again to display the list of our movies.

const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  overview: String,
  poster_path: String,
  release_date: String,
  vote_average: Number,
  vote_count: Number,
  genre_ids: Array,
});

export const Movie = mongoose.model("Movie", movieSchema);


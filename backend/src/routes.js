import express from 'express';
import { saveMovie, getMovies, deleteMovie } from '../src/database/databaseOperations.js';


const router = express.Router();


router.get('/movies', async (req, res, next) => {
  try {
      const movies = await getMovies();
      res.status(200).send(movies);
  }
  catch (error){
    next(error);
  }
  
  
  
});



router.put('/new', async (req, res, next) => {
  try {
    const movie = req.body.movie;
    console.log("Adding new movie to list", movie.title);
    
    await saveMovie(movie);
    res.status(200).send("Movie added successfully");
    
  }
  catch (error){
    next(error);
  }
});

router.delete("/deleteMovie/:id", async (req, res, next) => {
  const movieID = req.params.id;
  
  try {
    await deleteMovie(movieID);
    console.log(`Removing movie with id ${movieID} from list`);
    res.status(200).send(`Movie with id ${movieID} removed from list`);
  }
  catch( error) {
    next(error);
  }
  
});

export default router;
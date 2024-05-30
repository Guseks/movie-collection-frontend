import express from 'express';

const router = express.Router();

let movies = [];

router.get('/movies', (req, res, next) => {
  try {
      res.status(200).send(movies);
  }
  catch (error){
    next(error);
  }
  
  
  
});



router.put('/new', (req, res, next) => {
  try {
    const movie = req.body.movie;
    console.log("Adding new movie to list", movie.title);
    if(movies.includes(movie)){
      res.status(400).json({message: "Movie already exists"});
      return;
    }
    else {
      movies.push(movie);
      res.status(200).send("Movie added successfully");
    }
    
  }
  catch (error){
    next(error);
  }
});
router.delete("/deleteMovie/:id", (req, res, next) => {
  const movieID = req.params.id;
  try {
    movies = movies.filter((movie) => movie.id !== parseInt(movieID));
    console.log(`Removing movie with id ${movieID} from list`);
    res.status(200).send(`Movie with id ${movieID} removed from list`);
  }
  catch( error) {
    next(error);
  }
  
});

export default router;
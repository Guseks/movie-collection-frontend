import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
      res.send('Hello World!');
  }
  catch (error){
    next(error);
  }
  
  
  
});

export default router;
import express from 'express';
import movieController from './movie.controller';

export const movieRouter = express.Router();
movieRouter
  .route('/')
  .post(movieController.create)
  .get(movieController.findAll);

movieRouter
  .route('/:id')
  .get(movieController.findOne)
  .delete(movieController.delete)
  .put(movieController.update);

import express from 'express';
import { songRouter } from './resources/song';
import { movieRouter } from './resources/movie';

export const restRouter = express.Router();
restRouter.use('/songs', songRouter);
restRouter.use('/movies', movieRouter);

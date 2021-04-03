import Joi from 'joi';
import Movie from './movie.model';

export default {
  async create(req, res) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required(),
        rating: Joi.number()
          .integer()
          .min(0)
          .max(5)
          .optional(),
      });
      const { value, error } = schema.validate(req.body);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const movie = await Movie.create(value);
      return res.json(movie);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  async findAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
      };
      const movies = await Movie.paginate({}, options);
      return res.json(movies);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({ err: 'could not find movie' });
      }
      return res.json(movie);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.findOneAndRemove({ _id: id });
      if (!movie) {
        return res.status(404).json({ err: 'could not find movie' });
      }
      return res.json(movie);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const schema = Joi.object().keys({
        title: Joi.string().optional(),
        url: Joi.string().optional(),
        rating: Joi.number()
          .integer()
          .min(0)
          .max(5)
          .optional(),
      });
      const { value, error } = schema.validate(req.body);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const movie = await Movie.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!movie) {
        return res.status(404).json({ err: 'could not find movie' });
      }
      return res.json(movie);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
